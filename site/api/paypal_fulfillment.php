<?php
header('Content-Type: application/json');
require_once 'config.php';
require_once 'webhook.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || empty($data['payer_email']) || empty($data['items'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos de entrega incompletos']);
    exit;
}

$payer_email = filter_var($data['payer_email'], FILTER_VALIDATE_EMAIL);
$customer_name = $data['payer_name'] ?? 'Cliente PayPal';
$items = $data['items'];
$payment_id = $data['order_id'] ?? ('PAYPAL-' . time());

if ($payer_email) {
    // 1. Otorgar permisos en Google Drive al email del comprador
    grantGoogleDrivePermissions($payer_email, $items, $PRODUCT_FULFILLMENT);

    // 2. Enviar el email de entrega con los accesos
    sendDeliveryEmail($payer_email, $customer_name, $items, $payment_id, $PRODUCT_FULFILLMENT);

    echo json_encode(['status' => 'success', 'message' => 'Accesos de PayPal procesados y mail enviado']);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Email invalido']);
}
