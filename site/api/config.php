<?php
// Configuración de Mercado Pago & Entrega Digital LAB

// Access Token de Mercado Pago Sandbox
define('MP_ACCESS_TOKEN', 'APP_USR-4347499602251908-072908-511329bd3054feb075ad5ef350835cfe-3575896132');

// Email remitente
define('SENDER_EMAIL', 'contacto@laurabailone.com');
define('SENDER_NAME', 'LAB Consultoria Gastronomica');

// URL del conector de permisos automáticos de Google Drive (Google Apps Script)
define('GOOGLE_APPS_SCRIPT_URL', 'https://script.google.com/macros/s/AKfycbwTYHuMrcYMSFTbpprmJ1utqycuXig-kkObWfjkHb4t2Kd_HLPZonPkE2dDN4G_jxR1pw/exec');

// Mapeo de Accesos y Entregas por ID de Producto / Combo
$PRODUCT_FULFILLMENT = [
    'lab-cost-menu' => [
        'nombre' => 'LAB Cost & Ingenieria de Menu V-1.0',
        'folder_id' => '1gnuONhC2Icw29Jdx1wvXAKfH6-W44syS',
        'link_folder' => 'https://drive.google.com/drive/folders/1gnuONhC2Icw29Jdx1wvXAKfH6-W44syS'
    ],
    'lab-ley-omnes' => [
        'nombre' => 'LAB Ley de Omnes & Ingenieria V-1.1',
        'folder_id' => '1mC7DNYc56jOVqftvpx4i-grcocaw40rh',
        'link_folder' => 'https://drive.google.com/drive/folders/1mC7DNYc56jOVqftvpx4i-grcocaw40rh'
    ],
    'lab-fichas-tecnicas' => [
        'nombre' => 'LAB Fichas Tecnicas PRO',
        'folder_id' => '1aP3Ri9k1Q8LOltPcLZ1AH7wJFhUFRYV7',
        'link_folder' => 'https://drive.google.com/drive/folders/1aP3Ri9k1Q8LOltPcLZ1AH7wJFhUFRYV7'
    ],
    'lab-control-stock' => [
        'nombre' => 'LAB Control de Stock V-1.0',
        'folder_id' => '1BP5T1tt9EtRTc7-FnKcGmt-dY6kQgnnd',
        'link_folder' => 'https://drive.google.com/drive/folders/1BP5T1tt9EtRTc7-FnKcGmt-dY6kQgnnd'
    ],
    'combo-cost-stock' => [
        'nombre' => 'Combo: LAB Cost + Control de Stock',
        'items' => ['lab-cost-menu', 'lab-control-stock']
    ],
    'combo-omnes-stock' => [
        'nombre' => 'Combo: LAB Ley de Omnes + Control de Stock',
        'items' => ['lab-ley-omnes', 'lab-control-stock']
    ],
    'combo-stock-fichas' => [
        'nombre' => 'Combo: Stock + Fichas Tecnicas PRO',
        'items' => ['lab-control-stock', 'lab-fichas-tecnicas']
    ]
];
