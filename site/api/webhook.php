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
    
    $resources = [];
    foreach ($items as $item) {
        $id = $item['id'];
        $sub_keys = isset($fulfillment_data[$id]['items']) ? $fulfillment_data[$id]['items'] : [$id];
        foreach ($sub_keys as $k) {
            if (isset($fulfillment_data[$k]['folder_id']) && strpos($fulfillment_data[$k]['folder_id'], 'YOUR_') === false) {
                $resources[] = ['id' => $fulfillment_data[$k]['folder_id'], 'type' => 'folder'];
            }
            if (isset($fulfillment_data[$k]['sheet_id']) && strpos($fulfillment_data[$k]['sheet_id'], 'YOUR_') === false) {
                $resources[] = ['id' => $fulfillment_data[$k]['sheet_id'], 'type' => 'file'];
            }
        }
    }
    
    if (empty($resources)) return;
    
    $payload = [
        'email' => $email,
        'resources' => array_values($resources)
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
                $folder_link = $p['link_folder'] ?? '#';
                $links_html .= '
                <div style="background-color: #FFF8F0; border-left: 4px solid #E8913A; padding: 18px; margin-bottom: 20px; border-radius: 8px;">
                    <h3 style="margin: 0 0 10px 0; color: #2D2016; font-size: 18px;">' . htmlspecialchars($p['nombre']) . '</h3>
                    <p style="margin: 5px 0 15px 0; font-size: 14px; color: #6B5744;">Tu carpeta privada contiene la plantilla de Google Sheets, el manual en PDF y el video tutorial explicativo.</p>
                    <a href="' . htmlspecialchars($folder_link) . '" target="_blank" style="display: inline-block; background-color: #E8913A; color: #FFFFFF; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; font-size: 14px;">📁 ACCEDER A LA CARPETA EN GOOGLE DRIVE</a>
                </div>';
            }
        }
    }

    $email_body = '
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"></head>
    <body style="font-family: Arial, sans-serif; color: #2D2016; background-color: #F8F9FA; padding: 40px 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; padding: 40px 30px; border-radius: 12px; border: 1px solid #EEEEEE; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            
            <div style="text-align: center; margin-bottom: 25px;">
                <h1 style="font-family: Georgia, serif; font-size: 28px; color: #2D2016; margin: 0; letter-spacing: 0.1em; text-transform: uppercase;">lab</h1>
                <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #E8913A; margin-top: 4px; font-weight: bold;">Gastronomy Advisory</p>
            </div>

            <hr style="border: none; border-top: 1px solid #F0ECE8; margin: 20px 0 25px 0;">

            <h2 style="color: #E8913A; margin-top: 0; font-size: 22px; font-weight: 600;">¡Gracias por tu compra, ' . htmlspecialchars($customer_name) . '!</h2>
            <p style="font-size: 15px; line-height: 1.6; color: #4A3E35;">Tu pago ha sido verificado con éxito <strong>(Operación #' . htmlspecialchars($payment_id) . ')</strong>.</p>
            <p style="font-size: 15px; line-height: 1.6; color: #4A3E35;">A continuación tenés los accesos directos e instrucciones para comenzar a utilizar tus herramientas:</p>
            
            <div style="margin: 25px 0;"></div>
            
            ' . $links_html . '
            
            <hr style="border: none; border-top: 1px solid #F0ECE8; margin: 30px 0 20px 0;">
            
            <p style="font-size: 13px; color: #776A5E; line-height: 1.6; margin-bottom: 15px;">
                <strong>¿Necesitás soporte?</strong> Durante 1 mes contás con soporte prioritario vía WhatsApp. Podés responder a este correo o escribirnos a nuestro WhatsApp de soporte.
            </p>
            <p style="font-size: 12px; color: #A09386; margin-bottom: 0; font-weight: 500;">
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
