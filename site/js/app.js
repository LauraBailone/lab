document.addEventListener('DOMContentLoaded', () => {
    if (typeof SITE_CONFIG === 'undefined') {
        console.error("SITE_CONFIG no está definido.");
        return;
    }
    const cfg = SITE_CONFIG;

    // Register GSAP ScrollTrigger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    initThemeSelector(cfg.temas);
    injectNavbar(cfg);
    injectFooter(cfg);
    initCartSystem(cfg);
    injectProductBlocks(cfg);

    const path = window.location.pathname;
    const page = path.split("/").pop();

    if (page === "" || page === "index.html") {
        renderLanding(cfg);
    } else if (page === "metodo-lab.html") {
        renderMetodoLab(cfg);
    } else if (page === "asesorias.html") {
        renderAsesorias(cfg);
    }

    initAccordions();
    initSelector();
    
    // Replace old scroll reveal with GSAP animations
    setTimeout(initGsapAnimations, 100);
});

function initGsapAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Header scroll effect
    const header = document.getElementById('main-header');
    if (header) {
        ScrollTrigger.create({
            start: 'top -50',
            onUpdate: self => {
                if (self.direction === 1) {
                    header.classList.add('scrolled');
                } else if (self.progress === 0) {
                    header.classList.remove('scrolled');
                }
            }
        });
    }


    // Fade in text elements sequentially
    gsap.utils.toArray('.gsap-fade-up').forEach(elem => {
        gsap.from(elem, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // Staggered reveals (e.g., cards, blog grid)
    gsap.utils.toArray('.gsap-stagger-container').forEach(container => {
        const items = container.querySelectorAll('.gsap-stagger-item');
        gsap.from(items, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
}

function initThemeSelector(temas) {
    const selectorContainer = document.createElement('div');
    selectorContainer.className = 'theme-selector';
    
    const label = document.createElement('label');
    label.innerText = 'Seleccionar Tema (Demo):';
    label.style.fontSize = '0.7rem';
    label.style.textTransform = 'uppercase';
    label.style.letterSpacing = '0.1em';
    
    const select = document.createElement('select');
    
    temas.forEach(tema => {
        const option = document.createElement('option');
        option.value = tema.id;
        option.innerText = `${tema.nombre} (${tema.tipo})`;
        select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
        applyTheme(e.target.value, temas);
    });

    selectorContainer.appendChild(label);
    selectorContainer.appendChild(select);
    document.body.appendChild(selectorContainer);
    applyTheme(temas[0].id, temas);
}

function applyTheme(themeId, temas) {
    const tema = temas.find(t => t.id === themeId);
    if (!tema) return;
    const root = document.documentElement;
    for (const [property, value] of Object.entries(tema.colores)) {
        root.style.setProperty(property, value);
    }
}

function injectNavbar(cfg) {
    const header = document.getElementById('main-header');
    if (!header) return;
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    
    const navLinks = cfg.navegacion.map(link => {
        if (link.submenu) {
            const submenuItems = link.submenu.map(sub => 
                `<li><a href="${sub.url}">${sub.nombre}</a></li>`
            ).join('');
            return `
                <li class="has-submenu">
                    <a href="${link.url}" class="dropdown-trigger">${link.nombre} ▾</a>
                    <ul class="dropdown-menu">
                        ${submenuItems}
                    </ul>
                </li>
            `;
        }
        return `<li><a href="${link.url}" class="${currentPath === link.url ? 'active' : ''}">${link.nombre}</a></li>`;
    }).join('') + `<li class="mobile-only-contact"><a href="${cfg.enlaces.whatsapp}" target="_blank" class="mobile-contact-btn">${cfg.contacto_cta}</a></li>`;

    header.innerHTML = `
        <a href="index.html" class="logo">
            <img src="${cfg.imagenes.logo_navbar}" alt="LAB Logo">
        </a>
        <nav>
            <ul id="nav-links">
                ${navLinks}
            </ul>
        </nav>
        <div style="display: flex; align-items: center; gap: 0.4rem;">
            <div class="header-right-actions" style="display: flex; align-items: center;">
                <a href="${cfg.enlaces.whatsapp}" class="btn desktop-contact-btn" style="padding: 0.7rem 1.8rem; font-size: 0.85rem;">${cfg.contacto_cta}</a>
                <button class="cart-nav-btn" id="cart-toggle-btn" aria-label="Ver carrito">
                    <svg class="cart-icon" viewBox="0 0 24 24">
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                    <span class="cart-badge" id="cart-badge-count" style="display: none;">0</span>
                </button>
            </div>
            <button class="mobile-menu-btn" id="mobile-menu-btn">☰</button>
        </div>
    `;

    // Handle Mobile Menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navUl = document.getElementById('nav-links');
    if(mobileBtn && navUl) {
        mobileBtn.addEventListener('click', () => {
            navUl.classList.toggle('active');
        });
    }

    // Handle Mobile Submenu toggle click
    const dropdownTriggers = header.querySelectorAll('.dropdown-trigger');
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const li = trigger.parentElement;
                li.classList.toggle('active-mobile-dropdown');
            }
        });
    });
}

// ==========================================================================
// LÓGICA DEL CARRITO DE COMPRAS (STRIPE / MERCADO PAGO INTEGRATION)
// ==========================================================================
let cart = JSON.parse(localStorage.getItem('lab_cart')) || [];
let cartCurrency = localStorage.getItem('lab_cart_currency') || 'ARS';

function initCartSystem(cfg) {
    // 1. Create Cart HTML elements dynamically on body if they don't exist
    if (!document.getElementById('cart-drawer-container')) {
        const cartMarkup = `
            <div id="cart-drawer-container">
                <div class="cart-overlay" id="cart-overlay"></div>
                <div class="cart-drawer" id="cart-drawer">
                    <div class="cart-header">
                        <h3>TU COMPRA</h3>
                        <button class="cart-close-btn" id="cart-close-btn">&times;</button>
                    </div>
                    <div class="cart-body" id="cart-items-list">
                        <!-- Items will be injected here -->
                    </div>
                    <div class="cart-footer">
                        <div class="currency-selector-wrapper">
                            <span class="currency-label">MONEDA:</span>
                            <div class="currency-options">
                                <button class="currency-btn ${cartCurrency === 'ARS' ? 'active' : ''}" id="currency-ars-btn">ARS ($)</button>
                                <button class="currency-btn ${cartCurrency === 'USD' ? 'active' : ''}" id="currency-usd-btn">USD (u$s)</button>
                            </div>
                        </div>
                        <div class="cart-totals">
                            <span class="cart-total-label">TOTAL</span>
                            <span class="cart-total-value" id="cart-total-value">$0</span>
                        </div>
                        <button class="btn cart-checkout-btn" id="cart-checkout-btn">INICIAR PAGO</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', cartMarkup);
    }

    // 2. Setup event listeners for Cart panel open/close
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');

    if (cartToggleBtn) {
        cartToggleBtn.addEventListener('click', toggleCart);
    }
    if (cartCloseBtn) {
        cartCloseBtn.addEventListener('click', toggleCart);
    }
    if (cartOverlay) {
        cartOverlay.addEventListener('click', toggleCart);
    }

    function toggleCart() {
        cartOverlay.classList.toggle('active');
        cartDrawer.classList.toggle('active');
        renderCart(cfg);
    }

    // 3. Currency Selector event listeners
    const arsBtn = document.getElementById('currency-ars-btn');
    const usdBtn = document.getElementById('currency-usd-btn');
    
    if (arsBtn && usdBtn) {
        arsBtn.addEventListener('click', () => {
            cartCurrency = 'ARS';
            localStorage.setItem('lab_cart_currency', 'ARS');
            arsBtn.classList.add('active');
            usdBtn.classList.remove('active');
            renderCart(cfg);
        });
        usdBtn.addEventListener('click', () => {
            cartCurrency = 'USD';
            localStorage.setItem('lab_cart_currency', 'USD');
            usdBtn.classList.add('active');
            arsBtn.classList.remove('active');
            renderCart(cfg);
        });
    }

    // 4. Checkout button event listener
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            
            // If checking out multiple items in ARS, forward to WhatsApp to close custom order or pay via Mercado Pago
            // If Stripe is used (USD), redirect to Stripe payment links.
            if (cartCurrency === 'USD') {
                // Stripe Payment Link for the items.
                // In a production environment, we could redirect to a pre-built stripe checkout session
                // For this project, redirect to Stripe link of the first item, or a custom WhatsApp order detailing the payment in USD.
                if (cart.length === 1) {
                    const itemData = findProductConfig(cart[0].id, cfg);
                    if (itemData && itemData.link_stripe) {
                        window.open(itemData.link_stripe, '_blank');
                    } else {
                        window.open(`${cfg.enlaces.whatsapp}?text=${encodeURIComponent(generateWhatsAppMessage())}`, '_blank');
                    }
                } else {
                    // Multiple items USD checkout redirects to WhatsApp checkout
                    window.open(`${cfg.enlaces.whatsapp}?text=${encodeURIComponent(generateWhatsAppMessage())}`, '_blank');
                }
            } else {
                // ARS Checkout redirects to WhatsApp checkout
                window.open(`${cfg.enlaces.whatsapp}?text=${encodeURIComponent(generateWhatsAppMessage())}`, '_blank');
            }
        });
    }

    // Initialize display badge count
    updateBadgeCount();
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            subtitle: product.subtitle,
            image: product.image,
            priceArs: product.priceArs,
            priceUsd: product.priceUsd,
            quantity: 1
        });
    }
    saveCart();
    updateBadgeCount();
    
    // Auto-open cart drawer when adding product
    const cartOverlay = document.getElementById('cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');
    if (cartOverlay && cartDrawer) {
        cartOverlay.classList.add('active');
        cartDrawer.classList.add('active');
    }
    
    // Render
    renderCart(window.SITE_CONFIG);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateBadgeCount();
    renderCart(window.SITE_CONFIG);
}

function updateQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
            return;
        }
    }
    saveCart();
    updateBadgeCount();
    renderCart(window.SITE_CONFIG);
}

function saveCart() {
    localStorage.setItem('lab_cart', JSON.stringify(cart));
}

function updateBadgeCount() {
    const badge = document.getElementById('cart-badge-count');
    if (!badge) return;
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (totalQty > 0) {
        badge.textContent = totalQty;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

function renderCart(cfg) {
    const list = document.getElementById('cart-items-list');
    const totalVal = document.getElementById('cart-total-value');
    if (!list || !totalVal) return;

    if (cart.length === 0) {
        list.innerHTML = `
            <div class="cart-empty-message">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="rgba(0,0,0,0.15)">
                    <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/>
                </svg>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        totalVal.textContent = cartCurrency === 'ARS' ? '$0' : 'u$s 0';
        return;
    }

    list.innerHTML = cart.map(item => {
        const price = cartCurrency === 'ARS' ? item.priceArs : item.priceUsd;
        const symbol = cartCurrency === 'ARS' ? '$' : 'u$s ';
        return `
            <div class="cart-item">
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-subtitle">${item.subtitle}</p>
                    <p class="cart-item-price">${symbol}${price.toLocaleString()}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">Eliminar</button>
                    <div class="quantity-selector">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Calculate Total
    const total = cart.reduce((sum, item) => {
        const price = cartCurrency === 'ARS' ? item.priceArs : item.priceUsd;
        return sum + (price * item.quantity);
    }, 0);

    const symbol = cartCurrency === 'ARS' ? '$' : 'u$s ';
    totalVal.textContent = symbol + total.toLocaleString();
}

function findProductConfig(id, cfg) {
    const d = cfg.productos_digitales;
    return d.herramientas.find(i => i.id === id) || d.academia.find(i => i.id === id);
}

function generateWhatsAppMessage() {
    const symbol = cartCurrency === 'ARS' ? '$' : 'u$s ';
    let msg = `Hola Laura, me gustaría comprar las siguientes herramientas digitales:\n\n`;
    
    cart.forEach(item => {
        const price = cartCurrency === 'ARS' ? item.priceArs : item.priceUsd;
        msg += `- ${item.title} (Cant: ${item.quantity}) - Subtotal: ${symbol}${(price * item.quantity).toLocaleString()}\n`;
    });
    
    const total = cart.reduce((sum, item) => {
        const price = cartCurrency === 'ARS' ? item.priceArs : item.priceUsd;
        return sum + (price * item.quantity);
    }, 0);
    
    msg += `\n*TOTAL: ${symbol}${total.toLocaleString()}*\n\n`;
    msg += `Moneda seleccionada: ${cartCurrency}. Aguardo los datos de pago.`;
    return msg;
}

// Export cart helper functions to window for onclick handlers
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;

function injectFooter(cfg) {
    const footer = document.getElementById('main-footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="footer-grid">
            <div class="footer-col gsap-fade-up">
                <img src="${cfg.imagenes.logo_footer}" alt="LAB Logo" style="height: 50px; margin-bottom: 2rem; filter: brightness(0) invert(1);">
                <p style="font-family: var(--fuente-h1-h2); font-size: 1.2rem; margin-bottom: 2rem;">Gastronomía Estratégica</p>
                <div style="display: flex; gap: 1.5rem;">
                    <a href="${cfg.enlaces.instagram}" target="_blank">INSTAGRAM</a>
                    <a href="${cfg.enlaces.facebook}" target="_blank">FACEBOOK</a>
                </div>
            </div>
            <div class="footer-col gsap-fade-up">
                <h4>${cfg.footer.columna_1.titulo}</h4>
                <ul>
                    ${cfg.footer.columna_1.links.map(l => `<li><a href="${l.url}">${l.texto}</a></li>`).join('')}
                </ul>
            </div>
            <div class="footer-col gsap-fade-up">
                <h4>${cfg.footer.columna_2.titulo}</h4>
                <ul>
                    ${cfg.footer.columna_2.links.map(l => `<li><a href="${l.url}">${l.texto}</a></li>`).join('')}
                </ul>
            </div>
            <div class="footer-col gsap-fade-up">
                <h4>${cfg.footer.columna_3.titulo}</h4>
                <ul>
                    ${cfg.footer.columna_3.links.map(l => `<li><a href="${l.url}">${l.texto}</a></li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="footer-bottom gsap-fade-up">
            <p>${cfg.footer.copyright}</p>
            <div>
                <a href="#" style="margin-right: 2rem;">${cfg.footer.privacy}</a>
                <a href="#">${cfg.footer.terms}</a>
            </div>
        </div>
    `;
}

function renderLanding(cfg) {
    const d = cfg.landing;
    const hero = document.getElementById('hero');
    if(hero) {
        hero.innerHTML = `
            <div class="hero-premium-container gsap-fade-up">
                <div class="hero-bg-text-top">${d.hero.titulo_arriba}</div>
                <div class="floating-line-hero"></div>
                <div class="hero-image-center">
                    <img src="${cfg.imagenes.hero_bg}" alt="Laura Bailone" style="object-position: center bottom;">
                    <div class="hero-script-over">${d.hero.script}</div>
                </div>
                <div class="floating-line-hero"></div>
                <div class="hero-bg-text-bottom">${d.hero.titulo_abajo}</div>
            </div>
        `;
    }

    const met = document.getElementById('metodo-preview');
    if(met) {
        met.innerHTML = `
            <div class="presentacion-container">
                <div class="presentacion-texto gsap-fade-up">
                    <div class="presentacion-linea"></div>
                    <p class="presentacion-frase">"Ayudo a restaurantes y hoteles a ganar más dinero sin aumentar las ventas mediante el control financiero y la ingeniería del menú."</p>
                    <div class="presentacion-linea"></div>
                    <a href="${cfg.enlaces.whatsapp}" class="btn" style="margin-top: 1.5rem; width: 100%; max-width: 450px;">INICIA CON UNA REUNIÓN DIAGNÓSTICO GRATUITA</a>
                    <p class="presentacion-refuerzo">Detecta fugas, oportunidades y qué tipo de ayuda requiere tu negocio con Laura Bailone.</p>
                </div>
                <div class="presentacion-imagen gsap-fade-up">
                    <div class="circular-frame">
                        <img src="assets/images/laura-bailone-blog-7.webp" alt="Laura Bailone">
                    </div>
                </div>
            </div>
        `;
    }

    const redir = document.getElementById('metodo-redireccion');
    if(redir) {
        redir.innerHTML = `
            <div class="redir-bg" style="background-image: url('assets/images/laura-bailone-blog-6.webp');">
                <div class="redir-overlay"></div>
                <div class="redir-content gsap-fade-up">
                    <span class="redir-subtitle">MÉTODO LAB</span>
                    <h2 class="redir-title">Impulsa tu<br>negocio gastronómico</h2>
                    <p class="redir-text">Integra estrategia, identidad, bienestar y experiencia para construir negocios gastronómicos y espacios de hospitalidad más rentables, sostenibles, memorables y humanos.</p>
                    <a href="metodo-lab.html" class="btn" style="margin-top: 1.5rem;">CONOCE MI MÉTODO</a>
                </div>
            </div>
            
            <div class="productos-grid gsap-stagger-container" style="max-width: 1200px; margin: -10rem auto 0; padding: 0 5%; position: relative; z-index: 5;">
                <div class="producto-card gsap-stagger-item">
                    <div class="producto-img">
                        <img src="${cfg.imagenes.cards_img_1}" alt="${d.metodo_cards.card_1.titulo}" style="object-position: center 60%;">
                    </div>
                    <span class="producto-categoria">MÉTODO LAB</span>
                    <h4 class="producto-titulo">${d.metodo_cards.card_1.titulo}</h4>
                    <p class="producto-descripcion">${d.metodo_cards.card_1.descripcion}</p>
                    <div class="card-actions-wrapper">
                        <a href="metodo-lab.html#gastronomy" class="link-details">VER DETALLES ➔</a>
                    </div>
                </div>
                <div class="producto-card gsap-stagger-item">
                    <div class="producto-img">
                        <img src="${cfg.imagenes.laura_bio}" alt="${d.metodo_cards.card_2.titulo}" style="object-position: center 70%;">
                    </div>
                    <span class="producto-categoria">MÉTODO LAB</span>
                    <h4 class="producto-titulo">${d.metodo_cards.card_2.titulo}</h4>
                    <p class="producto-descripcion">${d.metodo_cards.card_2.descripcion}</p>
                    <div class="card-actions-wrapper">
                        <a href="metodo-lab.html#hospitality" class="link-details">VER DETALLES ➔</a>
                    </div>
                </div>
            </div>
        `;
    }
    injectBannerAndBio(cfg);
}
function renderMetodoLab(cfg) {
    const d = cfg.metodo_lab;

    const gastro = document.getElementById('gastronomy-plan');
    if (gastro) {
        gastro.innerHTML = `
            <div class="consultancies-timeline-wrapper" style="margin-top: 2rem; margin-bottom: 2rem;">
                <div class="consultancy-grid plan-grid gsap-fade-up">

                    <!-- Área HEADER: subtítulo, título, descripción -->
                    <div class="plan-header-col">
                        <span class="consultancy-subtitle">${d.plan_gastronomy.subtitulo.toUpperCase()}</span>
                        <h2 class="consultancy-title">${d.plan_gastronomy.titulo}</h2>
                        <p class="consultancy-desc">${d.plan_gastronomy.descripcion}</p>
                    </div>

                    <!-- Área PARA: lista de nichos (derecha en desktop, debajo del header en mobile) -->
                    <div class="plan-para-col" style="padding-top: 2.1rem;">
                        <div class="consultancy-para-area">
                            <ul class="consultancy-list">
                                ${d.plan_gastronomy.para_quien.map(i => `<li>${i}</li>`).join('')}
                            </ul>
                        </div>
                    </div>

                    <!-- Área ACCORDION: desplegables y botones -->
                    <div class="plan-accordion-col">
                        <div class="accordion" style="margin-bottom: 2.5rem;">
                            <div class="accordion-item">
                                <button class="accordion-header">¿Qué trabajamos?</button>
                                <div class="accordion-content">
                                    <div class="accordion-content-inner">
                                        <div class="que-trabajamos-sublist">
                                            ${d.plan_gastronomy.que_trabajamos.map((item, idx) => `
                                                <div class="que-trabajamos-subitem" style="margin-bottom: 1.5rem;">
                                                    <h4 style="font-family: var(--fuente-sans); font-size: 0.95rem; font-weight: 700; color: var(--color-naranja-primario); margin-bottom: 0.4rem;">${idx + 1}. ${item.titulo}</h4>
                                                    <p style="font-size: 0.9rem; line-height: 1.45; margin-bottom: 0.3rem;">${item.descripcion}</p>
                                                    <p class="objetivo" style="font-size: 0.85rem; font-style: italic; opacity: 0.85;"><strong>Objetivo:</strong> ${item.objetivo}</p>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <button class="accordion-header">Duración</button>
                                <div class="accordion-content">
                                    <div class="accordion-content-inner">
                                        <p style="font-size: 0.95rem; line-height: 1.5;">${d.plan_gastronomy.duracion}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <button class="accordion-header">Resultados esperados</button>
                                <div class="accordion-content">
                                    <div class="accordion-content-inner">
                                        <ul class="consultancy-list">
                                            ${d.plan_gastronomy.resultados.map(r => `<li>${r}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="consultancy-cta-wrapper">
                            <a href="${cfg.enlaces.whatsapp}" target="_blank" class="btn">INICIA CON UNA REUNIÓN DIAGNÓSTICO GRATUITA</a>
                            <a href="${cfg.enlaces.brochure_gastronomy || '#'}" target="_blank" class="btn-brochure">BROCHURE</a>
                        </div>
                    </div>

                </div>
            </div>
        `;
    }

    const hosp = document.getElementById('hospitality-plan');
    if (hosp) {
        hosp.innerHTML = `
            <div class="consultancies-timeline-wrapper" style="margin-top: 2rem; margin-bottom: 2rem;">
                <div class="consultancy-grid plan-grid gsap-fade-up">

                    <!-- Área HEADER: subtítulo, título, descripción -->
                    <div class="plan-header-col">
                        <span class="consultancy-subtitle">${d.plan_hospitality.subtitulo.toUpperCase()}</span>
                        <h2 class="consultancy-title">${d.plan_hospitality.titulo}</h2>
                        <p class="consultancy-desc">${d.plan_hospitality.descripcion}</p>
                    </div>

                    <!-- Área PARA: lista de nichos (derecha en desktop, debajo del header en mobile) -->
                    <div class="plan-para-col" style="padding-top: 2.1rem;">
                        <div class="consultancy-para-area">
                            <ul class="consultancy-list">
                                ${d.plan_hospitality.para_quien.map(i => `<li>${i}</li>`).join('')}
                            </ul>
                        </div>
                    </div>

                    <!-- Área ACCORDION: desplegables y botones -->
                    <div class="plan-accordion-col">
                        <div class="accordion" style="margin-bottom: 2.5rem;">
                            <div class="accordion-item">
                                <button class="accordion-header">¿Qué trabajamos?</button>
                                <div class="accordion-content">
                                    <div class="accordion-content-inner">
                                        <div class="que-trabajamos-sublist">
                                            ${d.plan_hospitality.que_trabajamos.map((item, idx) => `
                                                <div class="que-trabajamos-subitem" style="margin-bottom: 1.5rem;">
                                                    <h4 style="font-family: var(--fuente-sans); font-size: 0.95rem; font-weight: 700; color: var(--color-naranja-primario); margin-bottom: 0.4rem;">${idx + 1}. ${item.titulo}</h4>
                                                    <p style="font-size: 0.9rem; line-height: 1.45; margin-bottom: 0.3rem;">${item.descripcion}</p>
                                                    <p class="objetivo" style="font-size: 0.85rem; font-style: italic; opacity: 0.85;"><strong>Objetivo:</strong> ${item.objetivo}</p>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <button class="accordion-header">Duración</button>
                                <div class="accordion-content">
                                    <div class="accordion-content-inner">
                                        <p style="font-size: 0.95rem; line-height: 1.5;">${d.plan_hospitality.duracion}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <button class="accordion-header">Resultados esperados</button>
                                <div class="accordion-content">
                                    <div class="accordion-content-inner">
                                        <ul class="consultancy-list">
                                            ${d.plan_hospitality.resultados.map(r => `<li>${r}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="consultancy-cta-wrapper">
                            <a href="${cfg.enlaces.whatsapp}" target="_blank" class="btn">INICIA CON UNA REUNIÓN DIAGNÓSTICO GRATUITA</a>
                            <a href="${cfg.enlaces.brochure_hospitality || '#'}" target="_blank" class="btn-brochure">BROCHURE</a>
                        </div>
                    </div>

                </div>
            </div>
        `;
    }
    injectBannerAndBio(cfg);
}

function renderAsesorias(cfg) {
    injectBannerAndBio(cfg);
}

function injectBannerAndBio(cfg) {
    const banner = document.getElementById('laura-banner');
    if(banner) {
        banner.innerHTML = `<h1 class="text-giant text-light gsap-fade-up" style="margin:0; white-space: nowrap; font-size: 10vw; letter-spacing: 0;">${cfg.banner_laura.texto}</h1>`;
    }

    const bio = document.getElementById('quien-soy');
    if(bio) {
        bio.innerHTML = `
            <div class="bio-img gsap-fade-up">
                <img src="${cfg.imagenes.laura_bio}" alt="Laura Bailone">
            </div>
            <div class="bio-text gsap-fade-up">
                <h2 style="font-size: 3rem;">${cfg.quien_soy.titulo}</h2>
                <p>${cfg.quien_soy.descripcion}</p>
                <a href="${cfg.enlaces.instagram}" target="_blank" class="font-script" style="font-size: 2.5rem; text-decoration: none;">${cfg.quien_soy.instagram_cta}</a>
            </div>
        `;
    }
}

function initAccordions() {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });
}

function initSelector() {
    const cards = document.querySelectorAll('.selector-card');
    const panels = document.querySelectorAll('.selector-result-panel');
    if (!cards.length) return;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            panels.forEach(p => p.classList.remove('active'));
            const targetId = card.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

function injectProductBlocks(cfg) {
    const container = document.getElementById('productos-secciones-globales');
    if (!container) return;

    const d = cfg.productos_digitales;
    const m = cfg.landing.metodo_cards;
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const isIndex = (currentPath === "" || currentPath === "index.html");
    const isMetodoLab = (currentPath === "metodo-lab.html");
    
    container.innerHTML = `
        ${(!isIndex && !isMetodoLab) ? `
        <!-- Bloque 1: Método LAB -->
        <section id="metodo-lab-block" class="productos-seccion" style="padding-top: 6rem;">
            <h2 class="section-title text-light gsap-fade-up">MÉTODO LAB</h2>
            <div class="seccion-linea gsap-fade-up"></div>
            <div class="productos-grid gsap-stagger-container">
                <div class="producto-card gsap-stagger-item">
                    <div class="producto-img">
                        <img src="${cfg.imagenes.cards_img_1}" alt="${m.card_1.titulo}" style="object-position: center 60%;">
                    </div>
                    <span class="producto-categoria">MÉTODO LAB</span>
                    <h4 class="producto-titulo">${m.card_1.titulo}</h4>
                    <p class="producto-descripcion">${m.card_1.descripcion}</p>
                    <div class="card-actions-wrapper">
                        <a href="metodo-lab.html#gastronomy" class="link-details">VER DETALLES ➔</a>
                    </div>
                </div>
                <div class="producto-card gsap-stagger-item">
                    <div class="producto-img">
                        <img src="${cfg.imagenes.laura_bio}" alt="${m.card_2.titulo}" style="object-position: center 70%;">
                    </div>
                    <span class="producto-categoria">MÉTODO LAB</span>
                    <h4 class="producto-titulo">${m.card_2.titulo}</h4>
                    <p class="producto-descripcion">${m.card_2.descripcion}</p>
                    <div class="card-actions-wrapper">
                        <a href="metodo-lab.html#hospitality" class="link-details">VER DETALLES ➔</a>
                    </div>
                </div>
            </div>
        </section>
        ` : ''}

        <!-- Bloque 2: Asesorías (Fondo Naranja Suave, pegado a Herramientas) -->
        <section id="asesorias-block" class="productos-seccion" style="background-color: var(--color-naranja-claro); padding-top: 6rem; padding-bottom: 6rem; margin-bottom: 0;">
            <h2 class="section-title text-light gsap-fade-up" style="color: #C85A17;">ASESORÍAS</h2>
            <div class="seccion-linea gsap-fade-up" style="background: linear-gradient(to right, transparent, #C85A17 50%, transparent);"></div>
            <div class="productos-grid gsap-stagger-container">
                ${cfg.landing.servicios_preview.items.map((item, idx) => {
                    let img = cfg.imagenes.servicios_img_1;
                    if (idx === 0) img = "assets/images/laura-bailone-blog-1.webp";
                    else if (idx === 1) img = "assets/images/laura-bailone-finanzas-contabilidad-gastronomica.png";
                    else if (idx === 2) img = cfg.imagenes.servicios_img_3;
                    return `
                        <div class="producto-card gsap-stagger-item">
                            <div class="producto-img">
                                <img src="${img}" alt="${item.titulo}" style="object-position: center bottom;">
                            </div>
                            <span class="producto-categoria" style="color: #C85A17;">CONSULTORÍA ESTRATÉGICA</span>
                            <h4 class="producto-titulo">${item.titulo}</h4>
                            <p class="producto-descripcion"><strong style="color: #C85A17;">${item.subtitulo}</strong><br><br>${item.descripcion}</p>
                            <div class="card-actions-wrapper">
                                <a href="asesorias.html" class="link-details">VER DETALLES ➔</a>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </section>

        <!-- Bloque 3: Herramientas de Gestión LAB (Pegado a Asesorías) -->
        <section id="herramientas" class="productos-seccion tools-section-highlighted" style="display: none !important; padding: 6rem 5% 8rem; margin-top: 0;">
            <div class="herramientas-split-header gsap-fade-up">
                <!-- Columna Izquierda: Título y Subtítulo -->
                <div class="header-col-left">
                    <span class="tools-subtitle">SISTEMAS EXCEL & GOOGLE SHEETS</span>
                    <h2 class="tools-main-title">Herramientas de<br>gestión LAB™</h2>
                </div>
                
                <!-- Línea Divisora -->
                <div class="header-divider"></div>
                
                <!-- Columna Derecha: Textos -->
                <div class="header-col-right">
                    <p class="tools-quote">
                        "Control financiero, control de stock e ingeniería de menús optimizados para tomar mejores decisiones."
                    </p>
                    <p class="tools-desc">
                        Diseñadas específicamente para el sector gastronómico (cafeterías, restaurantes y hoteles boutique). Estas herramientas digitales te permiten automatizar el cálculo de tu Food Cost, estandarizar recetas con fichas técnicas, registrar inventarios con alertas automáticas y analizar la popularidad y rentabilidad de tu oferta.
                    </p>
                </div>
            </div>
            
            <div class="productos-grid tools-4-cols-clean gsap-stagger-container" style="margin-top: 5rem;">
                ${d.herramientas.map(item => `
                    <div class="producto-card tools-column-card gsap-stagger-item">
                        <div class="producto-img">
                            <img src="${item.imagen}" alt="${item.titulo}" style="object-position: ${item.posicion || 'center'};">
                        </div>
                        <span class="producto-categoria">PLANILLAS Y HERRAMIENTAS</span>
                        <h4 class="producto-titulo">${item.titulo}</h4>
                        <p class="producto-descripcion"><strong>${item.subtitulo}</strong><br><br>${item.resumen}</p>
                        <div class="card-actions-wrapper">
                            <a href="herramientas-gestion.html" class="link-details">VER DETALLES ➔</a>
                            <button class="btn btn-add-to-cart" data-id="${item.id}" data-price-ars="${item.precio_ars}" data-price-usd="${item.precio_usd}" data-title="${item.titulo}" data-subtitle="${item.subtitulo}" data-image="${item.imagen}">AÑADIR AL CARRITO</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <!-- Bloque 4: Academia LAB (Oculto hasta lanzamiento) -->
        <section id="academia" class="productos-seccion" style="display: none; padding-top: 6rem; padding-bottom: 8rem;">
            <h2 class="section-title text-light gsap-fade-up">ACADEMIA LAB</h2>
            <div class="seccion-linea gsap-fade-up"></div>
            <div class="productos-grid gsap-stagger-container">
                ${d.academia.map(item => `
                    <div class="producto-card gsap-stagger-item">
                        <div class="producto-img">
                            <img src="${item.imagen}" alt="${item.titulo}">
                        </div>
                        <span class="producto-categoria">CURSOS Y CAPACITACIONES</span>
                        <h4 class="producto-titulo">${item.titulo}</h4>
                        <p class="producto-descripcion"><strong>${item.subtitulo}</strong><br><br>${item.resumen}</p>
                        <div class="card-actions-wrapper">
                            <a href="academia-lab.html" class="link-details">VER DETALLES ➔</a>
                            <button class="btn btn-add-to-cart" data-id="${item.id}" data-price-ars="${item.precio_ars}" data-price-usd="${item.precio_usd}" data-title="${item.titulo}" data-subtitle="${item.subtitulo}" data-image="${item.imagen}">AÑADIR AL CARRITO</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;

    // Re-trigger click events for newly injected add-to-cart buttons
    const addBtns = container.querySelectorAll('.btn-add-to-cart');
    addBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const priceArs = parseInt(btn.getAttribute('data-price-ars'));
            const priceUsd = parseInt(btn.getAttribute('data-price-usd'));
            const title = btn.getAttribute('data-title');
            const subtitle = btn.getAttribute('data-subtitle');
            const image = btn.getAttribute('data-image');
            
            addToCart({ id, priceArs, priceUsd, title, subtitle, image });
        });
    });
}
