<?php
header('Content-Type: application/json');
require_once 'config.php';

// Obtener datos enviados desde el carrito
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || empty($data['items'])) {
    http_response_code(400);
    echo json_encode(['error' => 'El carrito esta vacio']);
    exit;
}

// Preparar los ítems para Mercado Pago
$mp_items = [];
foreach ($data['items'] as $item) {
    $mp_items[] = [
        'id' => $item['id'],
        'title' => $item['title'],
        'description' => $item['subtitle'] ?? 'Herramienta de Gestion LAB',
        'picture_url' => $item['image'] ?? '',
        'quantity' => (int) $item['quantity'],
        'currency_id' => 'ARS',
        'unit_price' => (float) $item['priceArs']
    ];
}

$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
$host = $_SERVER['HTTP_HOST'];
$base_url = $protocol . "://" . $host;

// Crear payload para la API de Mercado Pago
$preference_data = [
    'items' => $mp_items,
    'back_urls' => [
        'success' => $base_url . '/herramientas-gestion.html?status=success',
        'failure' => $base_url . '/herramientas-gestion.html?status=failure',
        'pending' => $base_url . '/herramientas-gestion.html?status=pending'
    ],
    'auto_return' => 'approved',
    'notification_url' => $base_url . '/api/webhook.php'
];

// Hacer request cURL a Mercado Pago API
$ch = curl_init('https://api.mercadopago.com/checkout/preferences');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . MP_ACCESS_TOKEN,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($preference_data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code >= 200 && $http_code < 300) {
    $res_data = json_decode($response, true);
    echo json_encode([
        'init_point' => $res_data['init_point'],
        'sandbox_init_point' => $res_data['sandbox_init_point'] ?? $res_data['init_point'],
        'id' => $res_data['id']
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al comunicarse con Mercado Pago', 'details' => json_decode($response)]);
}
