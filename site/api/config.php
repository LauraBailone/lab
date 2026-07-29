<?php
// Configuración de Mercado Pago & Entrega Digital LAB

// Access Token de Mercado Pago Sandbox
define('MP_ACCESS_TOKEN', 'APP_USR-4347499602251908-072908-511329bd3054feb075ad5ef350835cfe-3575896132');

// Email remitente
define('SENDER_EMAIL', 'contacto@laurabailone.com');
define('SENDER_NAME', 'LAB Consultoria Gastronomica');

// Mapeo de Accesos y Entregas por ID de Producto / Combo
$PRODUCT_FULFILLMENT = [
    'lab-cost-menu' => [
        'nombre' => 'LAB Cost & Ingenieria de Menu V-1.0',
        'link_sheets' => 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_COST/copy',
        'link_manual' => 'https://laurabailone.com/assets/manuales/Manual-LAB-Cost.pdf',
        'video_tutorial' => 'https://youtube.com/watch?v=EXAMPLE_COST'
    ],
    'lab-ley-omnes' => [
        'nombre' => 'LAB Ley de Omnes & Ingenieria V-1.1',
        'link_sheets' => 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_OMNES/copy',
        'link_manual' => 'https://laurabailone.com/assets/manuales/Manual-LAB-Omnes.pdf',
        'video_tutorial' => 'https://youtube.com/watch?v=EXAMPLE_OMNES'
    ],
    'lab-fichas-tecnicas' => [
        'nombre' => 'LAB Fichas Tecnicas PRO',
        'link_sheets' => 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_FICHAS/copy',
        'link_manual' => 'https://laurabailone.com/assets/manuales/Manual-LAB-Fichas.pdf',
        'video_tutorial' => 'https://youtube.com/watch?v=EXAMPLE_FICHAS'
    ],
    'lab-control-stock' => [
        'nombre' => 'LAB Control de Stock V-1.0',
        'link_sheets' => 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_STOCK/copy',
        'link_manual' => 'https://laurabailone.com/assets/manuales/Manual-LAB-Stock.pdf',
        'video_tutorial' => 'https://youtube.com/watch?v=EXAMPLE_STOCK'
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
