<?php
// Webhook / IPN para validacion automatica de pagos y envio de accesos
require_once 'config.php';

// Capturar notificacion de Mercado Pago
$type = $_GET['type'] ?? $_GET['topic'] ?? null;
$id = $_GET['data_id'] ?? $_GET['id'] ?? null;

if (!$id || ($type !== 'payment' && $type !== 'merchant_order')) {
    // Escuchar notificaciones POST
    $input = json_decode(file_get_contents('php://input'), true);
    if (isset($input['type']) && $input['type'] === 'payment') {
        $id = $input['data']['id'] ?? null;
        $type = 'payment';
    }
}

if (!$id) {
    http_response_code(200);
    echo "OK (Sin ID de pago)";
    exit;
}

// Consultar estado del pago a Mercado Pago API
$ch = curl_init("https://api.mercadopago.com/v1/payments/" . $id);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . MP_ACCESS_TOKEN,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code !== 200) {
    http_response_code(200);
    echo "Pago no encontrado";
    exit;
}

$payment = json_decode($response, true);

// Verificar si el pago fue realmente APROBADO
if (isset($payment['status']) && $payment['status'] === 'approved') {
    $payer_email = $payment['payer']['email'] ?? null;
    $payer_first_name = $payment['payer']['first_name'] ?? 'Cliente';
    $payer_last_name = $payment['payer']['last_name'] ?? '';

    if ($payer_email) {
        $purchased_items = $payment['additional_info']['items'] ?? [];
        
        // 1. Otorgar permisos de lectura en Google Drive al email del comprador
        grantGoogleDrivePermissions($payer_email, $purchased_items, $PRODUCT_FULFILLMENT);

        // 2. Enviar el email de entrega con los accesos
        sendDeliveryEmail($payer_email, $payer_first_name . ' ' . $payer_last_name, $purchased_items, $id, $PRODUCT_FULFILLMENT);
    }
}

http_response_code(200);
echo "OK Notification Handled";

function grantGoogleDrivePermissions($email, $items, $fulfillment_data) {
    if (!defined('GOOGLE_APPS_SCRIPT_URL') || strpos(GOOGLE_APPS_SCRIPT_URL, 'YOUR_') === 0) return;
    
    $file_ids = [];
    foreach ($items as $item) {
        $id = $item['id'];
        $sub_keys = isset($fulfillment_data[$id]['items']) ? $fulfillment_data[$id]['items'] : [$id];
        foreach ($sub_keys as $k) {
            if (isset($fulfillment_data[$k]['sheet_id']) && strpos($fulfillment_data[$k]['sheet_id'], 'YOUR_') === false) {
                $file_ids[] = $fulfillment_data[$k]['sheet_id'];
            }
        }
    }
    
    if (empty($file_ids)) return;
    
    $payload = [
        'email' => $email,
        'fileIds' => array_values(array_unique($file_ids))
    ];
    
    $ch = curl_init(GOOGLE_APPS_SCRIPT_URL);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_exec($ch);
    curl_close($ch);
}

function sendDeliveryEmail($to_email, $customer_name, $items, $payment_id, $fulfillment_data) {
    $subject = "Tus accesos a las Herramientas de Gestion LAB (Pago #" . $payment_id . ")";
    
    $links_html = "";
    foreach ($items as $item) {
        $product_id = $item['id'];
        
        // Si es un combo, descomprimir los sub-items
        $sub_item_keys = [];
        if (isset($fulfillment_data[$product_id]['items'])) {
            $sub_item_keys = $fulfillment_data[$product_id]['items'];
        } else {
            $sub_item_keys = [$product_id];
        }

        foreach ($sub_item_keys as $key) {
            if (isset($fulfillment_data[$key])) {
                $p = $fulfillment_data[$key];
                $links_html .= '
                <div style="background-color: #FFF8F0; border-left: 4px solid #E8913A; padding: 15px; margin-bottom: 15px; border-radius: 4px;">
                    <h3 style="margin: 0 0 10px 0; color: #2D2016;">' . htmlspecialchars($p['nombre']) . '</h3>
                    <p style="margin: 5px 0;">👉 <a href="' . htmlspecialchars($p['link_sheets']) . '" target="_blank" style="color: #E8913A; font-weight: bold;">Hacer una copia en Google Sheets</a></p>
                    ' . (isset($p['link_manual']) ? '<p style="margin: 5px 0;">📄 <a href="' . htmlspecialchars($p['link_manual']) . '" target="_blank" style="color: #6B5744;">Descargar Manual de Uso (PDF)</a></p>' : '') . '
                    ' . (isset($p['video_tutorial']) ? '<p style="margin: 5px 0;">▶️ <a href="' . htmlspecialchars($p['video_tutorial']) . '" target="_blank" style="color: #6B5744;">Ver Video Tutorial</a></p>' : '') . '
                </div>';
            }
        }
    }

    $email_body = '
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"></head>
    <body style="font-family: Arial, sans-serif; color: #2D2016; background-color: #F8F9FA; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; padding: 30px; border-radius: 12px; border: 1px solid #EEEEEE;">
            <h2 style="color: #E8913A; margin-top: 0;">¡Gracias por tu compra, ' . htmlspecialchars($customer_name) . '!</h2>
            <p>Tu pago ha sido verificado con éxito (Operación #' . htmlspecialchars($payment_id) . ').</p>
            <p>A continuación tenés los accesos directos e instrucciones para comenzar a utilizar tus herramientas:</p>
            
            <hr style="border: none; border-top: 1px solid #EEEEEE; margin: 20px 0;">
            
            ' . $links_html . '
            
            <hr style="border: none; border-top: 1px solid #EEEEEE; margin: 20px 0;">
            
            <p style="font-size: 0.9em; color: #666666;">
                <strong>¿Necesitás soporte?</strong> Durante 1 mes contás con soporte prioritario vía WhatsApp. Podés responder a este correo o escribirnos a nuestro WhatsApp de soporte.
            </p>
            <p style="font-size: 0.9em; color: #999999; margin-bottom: 0;">
                LAB Consultoría Gastronómica — Laura Bailone
            </p>
        </div>
    </body>
    </html>
    ';

    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . SENDER_NAME . ' <' . SENDER_EMAIL . '>',
        'Reply-To: ' . SENDER_EMAIL,
        'X-Mailer: PHP/' . phpversion()
    ];

    @mail($to_email, $subject, $email_body, implode("
", $headers));
}
