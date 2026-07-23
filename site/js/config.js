// Configuración centralizada de LAB Gastronomy Advisory
// Textos extraídos fielmente de los documentos originales

const SITE_CONFIG = {
    // === CONFIGURACIONES GLOBALES Y ENLACES ===
    "enlaces": {
        "whatsapp": "https://wa.me/5493834925427?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20reuni%C3%B3n%20diagn%C3%B3stico.", // Configurable
        "brochure_gastronomy": "brochure-metodo-lab.html", // Configurable: Ruta al PDF del brochure Gastronomy
        "brochure_hospitality": "brochure-metodo-lab.html", // Configurable: Ruta al PDF del brochure Hospitality
        "instagram": "https://www.instagram.com/", // Configurable
        "facebook": "https://www.facebook.com/" // Configurable
    },

    "imagenes": {
        "logo_navbar": "assets/logo/logo-lab.svg", // Configurable
        "logo_footer": "assets/logo/logo-lab.svg", // Configurable
        "hero_bg": "assets/images/laura-bailone-blog-1.webp",
        "metodo_preview": "assets/images/laura-bailone-metodo-lab.webp",
        "servicios_img_1": "assets/images/laura-bailone-consultoria-gastronomica.webp",
        "servicios_img_2": "assets/images/laura-bailone-optimizacion-menu.webp",
        "servicios_img_3": "assets/images/laura-bailone-experiencias-gastronomicas.webp",
        "cursos_img_1": "assets/images/laura-bailone-hospitalidad-consciente.webp",
        "cursos_img_2": "assets/images/laura-bailone-rentabilidad-gastronomica.webp",
        "cards_img_1": "assets/images/laura-bailone-rentabilidad-gastronomica.webp",
        "cards_img_2": "assets/images/laura-bailone-hospitalidad-consciente.webp",
        "laura_bio": "assets/images/laura-bailone-laura-bio.webp",
        "laura_banner_bg": "assets/images/laura-bailone-laura-bio.webp",
        "metodo_hero": "assets/images/laura-bailone-metodo-lab.webp",
        "gastronomy_plan": "assets/images/laura-bailone-rentabilidad-gastronomica.webp",
        "hospitality_plan": "assets/images/laura-bailone-hospitalidad-consciente.webp",
        "asesorias_hero": "assets/images/laura-bailone-consultoria-gastronomica.webp"
    },

    // === TEMAS (8 OPCIONES: 4 CÁLIDOS, 4 FRÍOS) ===
    "temas": [
        {
            "id": "tema-1",
            "nombre": "LAB Original",
            "tipo": "Cálido",
            "colores": {
                "--color-fondo-general": "#FFF8F0",
                "--color-fondo-secundario": "#F5E6D0",
                "--color-naranja-primario": "#E8913A",
                "--color-naranja-claro": "#F5C88A",
                "--color-texto-principal": "#2D2016",
                "--color-texto-secundario": "#6B5744",
                "--color-blanco": "#FFFBF7",
                "--color-oliva": "#8B9A6B"
            }
        },
        {
            "id": "tema-2",
            "nombre": "Terracotta Sunset",
            "tipo": "Cálido",
            "colores": {
                "--color-fondo-general": "#FFF5F0",
                "--color-fondo-secundario": "#F5DCD0",
                "--color-naranja-primario": "#C86B47",
                "--color-naranja-claro": "#E5A995",
                "--color-texto-principal": "#3D2B24",
                "--color-texto-secundario": "#7A5E53",
                "--color-blanco": "#FFFCFA",
                "--color-oliva": "#9B8B6B"
            }
        },
        {
            "id": "tema-3",
            "nombre": "Golden Hour",
            "tipo": "Cálido",
            "colores": {
                "--color-fondo-general": "#FFFAEE",
                "--color-fondo-secundario": "#F5ECB0",
                "--color-naranja-primario": "#D4A33B",
                "--color-naranja-claro": "#F5D68A",
                "--color-texto-principal": "#332B16",
                "--color-texto-secundario": "#665733",
                "--color-blanco": "#FFFCF7",
                "--color-oliva": "#998A5C"
            }
        },
        {
            "id": "tema-4",
            "nombre": "Sahara Sand",
            "tipo": "Cálido",
            "colores": {
                "--color-fondo-general": "#FDFBF7",
                "--color-fondo-secundario": "#E5DFD3",
                "--color-naranja-primario": "#B38C61",
                "--color-naranja-claro": "#D6C0A5",
                "--color-texto-principal": "#2B241C",
                "--color-texto-secundario": "#5C4E3D",
                "--color-blanco": "#FFFFFF",
                "--color-oliva": "#7A8C6B"
            }
        },
        {
            "id": "tema-5",
            "nombre": "Forest Kitchen",
            "tipo": "Frío",
            "colores": {
                "--color-fondo-general": "#F5F7F5",
                "--color-fondo-secundario": "#E0E5E0",
                "--color-naranja-primario": "#4A6B53",
                "--color-naranja-claro": "#8AA592",
                "--color-texto-principal": "#1E2B21",
                "--color-texto-secundario": "#4B5C4F",
                "--color-blanco": "#FFFFFF",
                "--color-oliva": "#6B7A6B"
            }
        },
        {
            "id": "tema-6",
            "nombre": "Ocean Breeze",
            "tipo": "Frío",
            "colores": {
                "--color-fondo-general": "#F4F7F9",
                "--color-fondo-secundario": "#DEE8EF",
                "--color-naranja-primario": "#3A6C8C",
                "--color-naranja-claro": "#85AEC8",
                "--color-texto-principal": "#172A38",
                "--color-texto-secundario": "#475E6D",
                "--color-blanco": "#FFFFFF",
                "--color-oliva": "#5A7A77"
            }
        },
        {
            "id": "tema-7",
            "nombre": "Nordic Chef",
            "tipo": "Frío",
            "colores": {
                "--color-fondo-general": "#F8F9FA",
                "--color-fondo-secundario": "#E9ECEF",
                "--color-naranja-primario": "#495057",
                "--color-naranja-claro": "#ADB5BD",
                "--color-texto-principal": "#212529",
                "--color-texto-secundario": "#6C757D",
                "--color-blanco": "#FFFFFF",
                "--color-oliva": "#72848F"
            }
        },
        {
            "id": "tema-8",
            "nombre": "Lavender Garden",
            "tipo": "Frío",
            "colores": {
                "--color-fondo-general": "#F7F5F9",
                "--color-fondo-secundario": "#EBE5F0",
                "--color-naranja-primario": "#725C8C",
                "--color-naranja-claro": "#B5A6C8",
                "--color-texto-principal": "#271E36",
                "--color-texto-secundario": "#574C68",
                "--color-blanco": "#FFFFFF",
                "--color-oliva": "#8A829E"
            }
        }
    ],

    // === TEXTOS COMPARTIDOS ===
    "navegacion": [
        { "nombre": "INICIO", "url": "index.html" },
        { "nombre": "ASESORÍAS", "url": "asesorias.html" },
        { "nombre": "MÉTODO LAB", "url": "metodo-lab.html" },
        { "nombre": "QUIÉN SOY", "url": "quien-soy.html" },
        { "nombre": "BLOG", "url": "blog.html" }
    ],

    "contacto_cta": "CONTACTO",

    "banner_laura": {
        "texto": "LAURA BAILONE"
    },

    "quien_soy": {
        "titulo": "Quién Soy",
        "descripcion": "Soy Laura Bailone, directora de LAB Consultoría Gastronómica. Trabajo con cafeterías y espacios gastronómicos que buscan optimizar su rentabilidad, profesionalizar su gestión y fortalecer su posicionamiento. Mi enfoque integra análisis financiero y de gestion, optimización de menú, curaduría de proveedores y desarrollo de identidad culinaria, con una mirada estratégica y sostenible. Comenzamos siempre con un diagnóstico inicial, que nos permite detectar oportunidades concretas y definir un plan de acción a medida, escalable y alineado a los objetivos del negocio.",
        "instagram_cta": "Sigueme en Instagram para conocer más!"
    },

    "footer": {
        "columna_1": {
            "titulo": "MÉTODO LAB",
            "links": [
                { "texto": "Gastronomy Consulting", "url": "metodo-lab.html#gastronomy" },
                { "texto": "Conscious Hospitality", "url": "metodo-lab.html#hospitality" }
            ]
        },
        "columna_2": {
            "titulo": "ASESORÍAS",
            "links": [
                { "texto": "Menús Estratégicos", "url": "asesorias.html" },
                { "texto": "Rentabilidad y Gestión Financiera", "url": "asesorias.html" },
                { "texto": "Experiencias Gastronómicas", "url": "asesorias.html" }
            ]
        },
        "columna_3": {
            "titulo": "QUIÉN SOY",
            "links": [
                { "texto": "Mi Historia", "url": "#quien-soy" },
                { "texto": "Contacto", "url": "#" }
            ]
        },
        "copyright": "©2026 LAB Gastronomy Advisory. Todos los derechos reservados",
        "privacy": "Privacy & Policy",
        "terms": "Terms & Condition"
    },

    // === TEXTOS LANDING PAGE ===
    "landing": {
        "hero": {
            "titulo_arriba": "GASTRONOMÍA",
            "titulo_abajo": "ESTRATÉGICA",
            "script": "Gastronomy Advisory",
            "cita": "\"Transformamos proyectos gastronómicos en negocios más ordenados, rentables y sostenibles.\"",
            "boton": "SOLICITÁ TU DIAGNÓSTICO ESTRATÉGICO GRATUITO"
        },
        "metodo_preview": {
            "script": "Impulsa tu negocio gastronómico",
            "descripcion": "Acompaño cafeterías y proyectos gastronómicos a ordenar, profesionalizar y potenciar sus negocios desde una mirada integral, estratégica y consciente. Ayudo a construir proyectos rentables, sostenibles, con identidad, con finanzas saludables y experiencias que generen conexión y fidelización.",
            "boton": "CONOCE MI MÉTODO"
        },
        "servicios_preview": {
            "titulo": "ASESORÍAS",
            "items": [
                {
                    "titulo": "MENÚS ESTRATÉGICOS",
                    "subtitulo": "Ingeniería de Menú, Pricing y Optimización de la Oferta Gastronómica",
                    "descripcion": "Diseñamos menús que venden mejor y generan mayor rentabilidad. Un menú no es solo una lista de platos y precios. Es una herramienta estratégica que influye en las ventas, la rentabilidad, la operación diaria y la experiencia del cliente."
                },
                {
                    "titulo": "RENTABILIDAD Y GESTIÓN FINANCIERA",
                    "subtitulo": "Ordenamos tus números para que puedas tomar mejores decisiones",
                    "descripcion": "Muchos negocios gastronómicos venden bien, pero toman decisiones basadas en intuición. En LAB transformamos la información diaria de tu operación en indicadores claros que te permiten controlar costos, optimizar procesos y mejorar la rentabilidad de manera sostenible."
                },
                {
                    "titulo": "EXPERIENCIAS GASTRONÓMICAS",
                    "subtitulo": "Diseño de experiencias memorables, identidad y hospitalidad",
                    "descripcion": "En LAB diseñamos propuestas gastronómicas donde cada detalle —desde el concepto del negocio hasta la experiencia del cliente— trabaja para diferenciar tu marca, fortalecer la conexión con las personas y aumentar el valor percibido de tu negocio."
                }
            ]
        },
        "cursos_preview": {
            "titulo": "CAPACITACIÓN EN RECETAS Y PROPUESTAS INCLUSIVAS",
            "items": [
                { "titulo": "Repostería sin azúcar sin gluten" },
                { "titulo": "Panes sin gluten" },
                { "titulo": "Alimentación Ayurvédica" },
                { "titulo": "Alimentos Fermentados" }
            ]
        },
        "metodo_cards": {
            "card_1": {
                "titulo": "LAB GASTRONOMY CONSULTING",
                "descripcion": "Estrategia, rentabilidad e identidad para negocios gastronómicos.",
                "boton": "Ver programa"
            },
            "card_2": {
                "titulo": "LAB CONSCIOUS HOSPITALITY",
                "descripcion": "Experiencias de bienestar, hospitalidad y gastronomía para hoteles boutique y espacios wellness.",
                "boton": "Ver programa"
            }
        }
    },

    // === TEXTOS MÉTODO LAB ===
    "metodo_lab": {
        "hero": {
            "titulo": "MÉTODO LAB",
            "descripcion": "Una metodología que integra estrategia, rentabilidad, identidad, bienestar y experiencia para construir negocios gastronómicos y espacios de hospitalidad más sostenibles, memorables y humanos."
        },
        "filosofia": {
            "l": { "letra": "L", "palabra": "Lead / Learn", "descripcion": "Liderazgo, visión y aprendizaje estratégico" },
            "a": { "letra": "A", "palabra": "Align", "descripcion": "Administración, orden y rentabilidad" },
            "b": { "letra": "B", "palabra": "Build / Balance", "descripcion": "Bienestar, experiencia y crecimiento sostenible" }
        },
        "selector": {
            "titulo": "Elegí el programa que mejor se adapta a tu proyecto",
            "subtitulo": "Dos caminos. Una misma filosofía."
        },
        "plan_gastronomy": {
            "titulo": "LAB GASTRONOMY CONSULTING",
            "subtitulo": "Estrategia, rentabilidad e identidad para negocios gastronómicos",
            "descripcion": "Acompañamos cafeterías, restaurantes y proyectos gastronómicos a construir negocios más rentables, organizados y memorables. Integramos gestión, finanzas, gastronomía e identidad para transformar la operación diaria en una herramienta de crecimiento sostenible.",
            "para_quien": [
                "Cafeterías",
                "Specialty Coffee Shops",
                "Restaurantes",
                "Bares gastronómicos",
                "Wellness cafés",
                "Emprendimientos healthy",
                "Marcas gastronómicas en crecimiento",
                "Emprendimientos y espacios gastronómicos"
            ],
            "que_trabajamos": [
                {
                    "titulo": "Costos, Rentabilidad y Métricas",
                    "descripcion": "Diseñamos sistemas simples y eficientes para comprender la salud financiera del negocio. Incluye: food cost, control de stock, control de mermas, KPI's gastronómicos, dashboard financiero, punto de equilibrio, análisis de rentabilidad, optimización de compras.",
                    "objetivo": "Tomar decisiones basadas en datos y mejorar la rentabilidad."
                },
                {
                    "titulo": "Optimización de Menú y Pricing",
                    "descripcion": "Analizamos la oferta gastronómica para mejorar ventas y márgenes. Incluye: ingeniería de menú, pricing estratégico, costeo de platos, análisis de popularidad, reingeniería de carta, menú inclusivo.",
                    "objetivo": "Optimizar costos y fortalecer la propuesta gastronómica con menues inclusivos y de tendencia."
                },
                {
                    "titulo": "Identidad y Propuesta de Valor",
                    "descripcion": "Construimos marcas gastronómicas coherentes y diferenciadas. Incluye: propósito, posicionamiento, identidad, propuesta de valor, modelo de negocio, experiencia de marca.",
                    "objetivo": "Crear negocios con personalidad y dirección estratégica."
                },
                {
                    "titulo": "Experiencia Gastronómica y Fidelización",
                    "descripcion": "Diseñamos experiencias capaces de generar conexión y recuerdo. Incluye: storytelling gastronómico, experiencia del cliente, hospitalidad, fidelización, diseño emocional de la experiencia.",
                    "objetivo": "Transformar clientes ocasionales en clientes recurrentes."
                }
            ],
            "duracion": "4 semanas intensivas + 3 meses de acompañamiento",
            "resultados": [
                "Mayor rentabilidad",
                "Menús más eficientes",
                "Mejor organización",
                "Procesos más claros",
                "Marca más sólida",
                "Fidelización de clientes",
                "Crecimiento sostenible"
            ],
            "precio": "Desde USD 800"
        },
        "plan_hospitality": {
            "titulo": "LAB CONSCIOUS HOSPITALITY",
            "subtitulo": "Estrategia para experiencias hoteleras",
            "descripcion": "Acompañamos hoteles boutique, hosterías, eco-lodges, retiros y espacios wellness a diseñar experiencias integrales donde gastronomía, bienestar y hospitalidad trabajan en armonía. No trabajamos únicamente el restaurante. Trabajamos la experiencia completa del huésped.",
            "para_quien": [
                "Hoteles boutique",
                "Hosterías",
                "Eco lodges",
                "Espacios de retiros",
                "Centros de yoga y bienestar",
                "Glampings",
                "Proyectos de turismo consciente",
                "Hospitality con propósito"
            ],
            "que_trabajamos": [
                {
                    "titulo": "ESTRATEGIA FINANCIERA Y RENTABILIDAD GASTRONÓMICA",
                    "descripcion": "Porque una experiencia memorable también debe ser sostenible económicamente. Incluye: food cost, ingeniería de menú, pricing estratégico, métricas y KPI's, rentabilidad de restaurante, análisis de costos, optimización operativa, desarrollo de menús inclusivos y acordes para las diferentes experiencias gastronómicas.",
                    "objetivo": "Crear propuestas gastronómicas rentables y sostenibles."
                },
                {
                    "titulo": "DISEÑO DE PROGRAMAS WELLNESS Y EXPERIENCIAS DE BIENESTAR",
                    "descripcion": "Diseñamos propuestas wellness personalizadas que integran hospitalidad, bienestar, gastronomía consciente y experiencias transformadoras. Desarrollamos programas de Yoga, Ayurveda, Detox, Mindfulness, Alimentación consciente.",
                    "objetivo": "Crear experiencias de bienestar únicas, coherentes y rentables que permitan al espacio diferenciarse y atraer nuevos huéspedes."
                },
                {
                    "titulo": "RETREAT DESIGN & CURATION",
                    "descripcion": "Diseño y organización integral de retiros. Incluye concepto del retiro, branding experiencial, programa y cronograma, gastronomía, experiencia del participante.",
                    "objetivo": "Transformar el espacio en una experiencia coherente, memorable y alineada con su propósito."
                }
            ],
            "duracion": "Programa personalizado",
            "resultados": [
                "Mayor diferenciación",
                "Gastronomía alineada con la identidad del espacio",
                "Mejor experiencia del huésped",
                "Mayor fidelización",
                "Menús más rentables",
                "Propuestas wellness coherentes",
                "Identidad más sólida",
                "Crecimiento sostenible"
            ],
            "precio": "Consultar"
        }
    },

    // === TEXTOS ASESORÍAS ===
    "asesorias": {
        "hero": {
            "titulo": "CONSULTORÍA",
            "descripcion": "Consultoría Estratégica para Cafeterías y Proyectos Gastronómicos Conscientes"
        },
        "propuesta_valor": {
            "texto": "Muchos negocios gastronómicos venden. Pocos logran crecer con claridad, rentabilidad y sostenibilidad real. Cuando los números no son claros, los procesos dependen demasiado de usted y la experiencia no logra diferenciarse, el problema no es la falta de esfuerzo: es la falta de estructura, dirección y coherencia. En LAB transformamos proyectos gastronómicos en negocios más ordenados, rentables y sostenibles."
        },
        "servicio_1": {
            "titulo": "COSTOS Y MÉTRICAS FINANCIERAS",
            "subtitulo": "Orden operativo + costos + KPI's + rentabilidad + procesos.",
            "descripcion": "Este es un programa de asesoramiento diseñado para negocios gastronómicos que necesitan ordenar su operación, entender sus números y tomar decisiones más rentables y sostenibles. El objetivo es transformar la información diaria del negocio en herramientas concretas de gestión, permitiendo reducir pérdidas, mejorar márgenes y construir una estructura financiera clara y saludable.",
            "incluye": [
                "PLANTILLA DE CONTROL DE MERMAS",
                "PLANTILLA DE FOOD COST",
                "FICHAS TÉCNICAS ESTANDARIZADAS",
                "CONTROL SIMPLE DE STOCK",
                "DASHBOARD DE RENTABILIDAD",
                "INGENIERÍA DE MENÚ BÁSICA",
                "CONTROL DE PRODUCCIÓN",
                "SISTEMA DE ALERTAS DE COSTOS",
                "MANUAL SIMPLE DE IMPLEMENTACIÓN",
                "PUNTO DE EQUILIBRIO Y SOSTENIBILIDAD FINANCIERA"
            ],
            "ideal_para": [
                "restaurantes",
                "cafeterías",
                "emprendimientos gastronómicos",
                "Viandas saludables",
                "proyectos wellness & healthy food",
                "negocios en crecimiento que necesitan profesionalizar su gestión"
            ],
            "resultados": [
                "Mayor claridad financiera",
                "Reducción de pérdidas y desperdicios",
                "Mejor control operativo",
                "Aumento de rentabilidad",
                "Organización interna",
                "Toma de decisiones basada en métricas reales",
                "Estandarización de procesos",
                "Negocio más sostenible y profesional"
            ],
            "formato": "Sesi\u00f3n 1:1 de 90 minutos (on line o presencial) - plantillas templates de trabajo listos para usar - videos explicativos de uso de los templates - soporte real por un mes - Bonus de regalo: Manual de Sistematizaci\u00f3n consciente",
            "precio": "USD 250"
        },
        "servicio_2": {
            "titulo": "OPTIMIZACIÓN DE MENÚ, REINGENIERÍA, PRICING Y MENÚ INCLUSIVO",
            "subtitulo": "Estrategia gastronómica para crear menús más rentables, coherentes e inclusivos",
            "descripcion": "Un servicio de análisis y rediseño de menú pensado para negocios gastronómicos que desean optimizar su oferta, mejorar la rentabilidad y construir una experiencia más alineada con las nuevas necesidades del consumidor. Trabajamos el menú no solo como una lista de platos, sino como una herramienta estratégica de ventas, identidad y experiencia.",
            "incluye": [
                "ANÁLISIS ESTRATÉGICO DEL MENÚ",
                "MENU ENGINEERING (POPULARIDAD + RENTABILIDAD)",
                "COSTEO DE PLATOS Y ESCANDALLOS",
                "REINGENIERÍA Y OPTIMIZACIÓN DE LA OFERTA",
                "DASHBOARD PROFESIONAL DE KPIs",
                "ESTANDARIZACIÓN Y CONTROL",
                "DESARROLLO DE MENÚ INCLUSIVO Y CONSCIENTE",
                "CAPACITACIÓN EN RECETAS Y PROPUESTAS INCLUSIVAS",
                "EXPERIENCIA Y COHERENCIA DE MARCA"
            ],
            "ideal_para": [
                "restaurantes",
                "cafeterías",
                "healthy cafés",
                "proyectos wellness",
                "hoteles",
                "emprendimientos gastronómicos en crecimiento",
                "marcas que desean modernizar su propuesta"
            ],
            "resultados": [
                "Menú más claro, estratégico y atractivo",
                "Mayor rentabilidad por plato",
                "Optimización de costos y procesos",
                "Reducción de desperdicios",
                "Mejor experiencia del cliente",
                "Oferta más moderna e inclusiva",
                "Mayor coherencia con la identidad de marca",
                "Mejor posicionamiento gastronómico",
                "Carta diseñada para vender mejor y operar de manera más eficiente"
            ],
            "formato": "2 sesiones 1:1 de 90 minutos (on line o presencial) - Templates con plantillas de trabajo listas para usar - talleres de capacitacion de propuestas inclusivas a elección: Reposteria sin azúcar sin gluten, Panes sin gluten, Alimentación Ayurvédica, + PDF de recetas + Bonus: PDF Recetas de pastas sin gluten veganas + PDF Alimentos Fermentados - Entrega de un documento PDF resumen con un análisis de menu engineering con la plantilla de trabajo a implementar, y cómo el menú comunica la identidad del proyecto. BONUS: Manual de Sistematización consciente",
            "precio": "USD 400"
        }
    },
    // === CATÁLOGO DE PRODUCTOS DIGITALES (CARRITO) ===
    "productos_digitales": {
        "herramientas": [
            {
                "id": "lab-cost-menu",
                "titulo": "LAB COST & MENU™",
                "subtitulo": "Ingeniería de Menú y Rentabilidad",
                "resumen": "La herramienta diseñada para ayudarte a conocer el costo real de tus recetas, optimizar tus precios y tomar decisiones basadas en datos.",
                "precio_ars": 15000,
                "precio_usd": 25,
                "imagen": "assets/images/laura-bailone-optimizacion-menu.webp",
                "link_mp": "https://mpago.la/placeholder-cost-menu",
                "link_stripe": "https://buy.stripe.com/placeholder-cost-menu"
            },
            {
                "id": "lab-stock",
                "titulo": "LAB STOCK™",
                "subtitulo": "Sistema de Gestión de Inventarios y Control de Stock",
                "resumen": "Controlá tu inventario de forma simple y profesional para evitar faltantes, reducir desperdicios y mejorar la gestión de compras.",
                "precio_ars": 15000,
                "precio_usd": 25,
                "imagen": "assets/images/laura-bailone-stock.webp",
                "posicion": "center bottom",
                "link_mp": "https://mpago.la/placeholder-stock",
                "link_stripe": "https://buy.stripe.com/placeholder-stock"
            },
            {
                "id": "lab-finance",
                "titulo": "LAB FINANCE™",
                "subtitulo": "Sistema de Gestión Financiera",
                "resumen": "Convertí los números de tu negocio en mejores decisiones. Una herramienta creada para comprender la salud financiera del negocio y proyectar su crecimiento.",
                "precio_ars": 15000,
                "precio_usd": 25,
                "imagen": "assets/images/laura-bailone-finanzas-contabilidad-gastronomica.png",
                "link_mp": "https://mpago.la/placeholder-finance",
                "link_stripe": "https://buy.stripe.com/placeholder-finance"
            },
            {
                "id": "lab-menu-engineering",
                "titulo": "LAB MENU ENGINEERING™",
                "subtitulo": "Ingeniería de Menú + Pricing Estratégico (Omnes)",
                "resumen": "Diseñá una carta que venda más y genere mayor rentabilidad. Analizá cada plato desde rentabilidad, popularidad y percepción de cliente.",
                "precio_ars": 15000,
                "precio_usd": 25,
                "imagen": "assets/images/laura-bailone-consultoria-gastronomica.webp",
                "link_mp": "https://mpago.la/placeholder-menu-eng",
                "link_stripe": "https://buy.stripe.com/placeholder-menu-eng"
            }
        ],
        "academia": [
            {
                "id": "recetas-veganas",
                "titulo": "RECETAS VEGANAS",
                "subtitulo": "Recetario y Costos de Elaboraciones Veganas",
                "resumen": "Recetas de elaboración simple y de tendencia con herramientas de control de costos y preparación paso a paso.",
                "precio_ars": 12000,
                "precio_usd": 20,
                "imagen": "assets/images/laura-bailone-consultoria-gastronomica.webp",
                "link_mp": "https://mpago.la/placeholder-veganas",
                "link_stripe": "https://buy.stripe.com/placeholder-veganas"
            },
            {
                "id": "desserts-saludables",
                "titulo": "DESSERTS SALUDABLES",
                "subtitulo": "Recetario y Planillas para Cafeterías",
                "resumen": "Recetarios paso a paso y tablas de costos pensadas para postres y cafeterías con paladares exigentes.",
                "precio_ars": 12000,
                "precio_usd": 20,
                "imagen": "assets/images/laura-bailone-optimizacion-menu.webp",
                "link_mp": "https://mpago.la/placeholder-desserts",
                "link_stripe": "https://buy.stripe.com/placeholder-desserts"
            }
        ]
    }
};

// Exportar globalmente
window.SITE_CONFIG = SITE_CONFIG;
