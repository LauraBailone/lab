// ============================================================
// CONFIGURACIÓN DE SANITY.IO
// ============================================================
const SANITY_PROJECT_ID = 'v487s9li';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';
// Token de solo lectura (Viewer). Es seguro incluirlo en el frontend.
const SANITY_TOKEN = 'sklhUdNExc3WZyvSsFexFg2L5rNrq01ZWppykvgvM94vu5Fi8DZ8eHx8hL4XoAzDYbIMOYX7lE1kQJBYicbjhz7ovbRBS7aEbYaCym2AsNDU3RoSHAoE1XAA5cnQT2Ngzh4w4HZfYVEqRn0ByvVuSGo4PvcCZg7ufDepDylQGrBtY8HtViWY';

// Query GROQ para traer todos los posts ordenados por fecha descendente
const SANITY_QUERY = encodeURIComponent(`*[_type == "post"] | order(publishedAt desc) {
  "id": slug.current,
  "titulo": title,
  extracto,
  categoria,
  "fecha": publishedAt,
  "imagen": mainImage.asset->url,
  body[]{
    ...,
    asset->{ url }
  }
}`);

const SANITY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${SANITY_QUERY}`;

// ============================================================
// BASE DE DATOS ESTÁTICA (Fallback para pruebas en local)
// Se usa cuando la API de Sanity no es accesible (file://)
// ============================================================
const BLOG_POSTS_FALLBACK = [
    {
        "id": "restaurantes-que-venden-pero-no-ganan",
        "titulo": "Restaurantes que venden pero que no ganan",
        "extracto": "Un problema común en el mundo gastronómico: locales llenos pero cuentas en rojo. Descubre cómo la falta de claridad en los costos está afectando tu rentabilidad.",
        "imagen": "assets/images/laura-bailone-blog-1.webp",
        "categoria": "Gestión Financiera",
        "fecha": "2026-06-30",
        "contenido_md": "# Restaurantes que venden pero que no ganan\n\nUno de los escenarios más frustrantes para un emprendedor gastronómico es ver su salón lleno, las mesas rotando constantemente, pero al final del mes, **los números simplemente no cierran**.\n\nEste es un problema común en el sector. La ilusión óptica de las altas ventas a menudo oculta problemas estructurales profundos:\n\n1.  **Falta de conocimiento del costo real del plato (Food Cost):** Muchos dueños fijan precios multiplicando el costo de los ingredientes principales por un número arbitrario, ignorando mermas, tiempos de preparación y costos ocultos.\n2.  **Mermas y desperdicios no controlados:** Lo que va a la basura es ganancia directa que se pierde.\n3.  **Falta de estandarización:** Si un plato lleva 150g de carne un día y 200g al siguiente, es imposible proyectar rentabilidad.\n\n## La Solución\n\nEl primer paso para revertir esta situación es **medir**. En LAB Gastronomy Advisory, trabajamos implementando tableros de control simples pero efectivos.\n\n*¿Estás vendiendo mucho pero ganando poco? Es hora de revisar tu estructura de costos.*"
    },
    {
        "id": "importancia-menu-inclusivo",
        "titulo": "La rentabilidad oculta de los menús inclusivos",
        "extracto": "Tener opciones sin gluten, veganas o ayurvédicas ya no es una moda, es una necesidad estratégica que fideliza grupos enteros de comensales.",
        "imagen": "assets/images/laura-bailone-blog-2.webp",
        "categoria": "Estrategia",
        "fecha": "2026-06-25",
        "contenido_md": "# La rentabilidad oculta de los menús inclusivos\n\nHistóricamente, los restaurantes han visto las opciones para celíacos o veganos como un \"problema\" operativo. Hoy, esa visión es un error estratégico que cuesta mucho dinero."
    },
    {
        "id": "hospitalidad-consciente-hoteles",
        "titulo": "Hospitalidad Consciente: Más allá del desayuno buffet",
        "extracto": "Cómo transformar la experiencia gastronómica de tu hotel boutique para crear retiros memorables y aumentar el valor percibido.",
        "imagen": "assets/images/laura-bailone-blog-3.webp",
        "categoria": "Hospitality",
        "fecha": "2026-06-15",
        "contenido_md": "# Hospitalidad Consciente: Más allá del desayuno buffet\n\nLa industria de la hospitalidad boutique está experimentando un cambio de paradigma."
    }
];

// ============================================================
// FUNCIÓN PRINCIPAL: Intenta cargar desde Sanity, usa fallback si falla
// ============================================================
async function loadBlogPosts() {
    // Si estamos en local (file://), usamos fallback directamente para evitar CORS
    if (window.location.protocol === 'file:') {
        console.log('[Blog] Modo local detectado → usando datos estáticos de fallback.');
        return BLOG_POSTS_FALLBACK;
    }

    try {
        const response = await fetch(SANITY_URL);

        if (!response.ok) throw new Error(`Sanity API error: ${response.status}`);

        const data = await response.json();
        const posts = data.result;

        if (!posts || posts.length === 0) {
            console.warn('[Blog] Sanity devolvió 0 posts. Usando fallback estático.');
            return BLOG_POSTS_FALLBACK;
        }

        console.log(`[Blog] ${posts.length} post(s) cargados desde Sanity.`);
        return posts;

    } catch (err) {
        console.warn('[Blog] No se pudo conectar con Sanity. Usando fallback estático.', err);
        return BLOG_POSTS_FALLBACK;
    }
}

// ============================================================
// INICIALIZACIÓN
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('[Blog] DOMContentLoaded disparado. URL:', window.location.href);

    const path = window.location.pathname;
    const isPostPage = path.includes('blog-post');
    const isBlogPreview = document.getElementById('blog-preview') !== null;
    const isBlogGrid = document.getElementById('blog-grid-container') !== null;

    console.log('[Blog] isPostPage:', isPostPage, '| isBlogPreview:', isBlogPreview, '| isBlogGrid:', isBlogGrid);

    if (!isPostPage && !isBlogPreview && !isBlogGrid) {
        console.log('[Blog] No se detectó ningún contenedor válido. Saliendo.');
        return;
    }

    const posts = await loadBlogPosts();

    if (isPostPage) {
        renderSinglePost(posts);
    } else if (isBlogPreview) {
        renderMagazineBlogPreview(posts);
    } else if (isBlogGrid) {
        if (window.innerWidth <= 768) {
            // En Mobile: todas las publicaciones en lista sin tarjeta destacada
            const featuredElem = document.getElementById('blog-featured-container');
            if (featuredElem) featuredElem.style.display = 'none';
            renderBlogGrid(posts, 'blog-grid-container');
        } else {
            // En Desktop: primer artículo como destacado
            if (posts.length > 0) {
                renderFeaturedPost(posts[0], 'blog-featured-container');
            }
            renderBlogGrid(posts.slice(1), 'blog-grid-container');
        }
    }

    // Refrescar animaciones GSAP
    if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => { ScrollTrigger.refresh(); }, 200);
    }
});

// ============================================================
// RENDERS
// ============================================================
function renderMagazineBlogPreview(posts) {
    const container = document.getElementById('blog-preview');
    if (!container) return;

    if (!posts || posts.length === 0) {
        container.style.display = 'none';
        return;
    }

    const featured = posts[0];
    const others = posts.slice(1, 4); // Trae hasta los siguientes 3 artículos
    
    const featuredImg = featured.imagen || 'assets/images/laura-bailone-blog-2.webp';
    const featuredLink = `blog-post.html#${featured.id}`;

    // Generar la lista de otros posts
    let othersHtml = '';
    if (others.length > 0) {
        othersHtml = others.map(post => `
            <li class="blog-others-item">
                <a href="blog-post.html#${post.id}" class="blog-others-link">_ ${post.titulo}</a>
            </li>
        `).join('');
    } else {
        othersHtml = '<li class="blog-others-item"><span class="blog-others-link disabled">Próximamente más artículos</span></li>';
    }

    container.innerHTML = `
        <div class="blog-magazine-container">
            <!-- Columna Izquierda: Portada de Revista -->
            <div class="blog-col-left gsap-fade-up">
                <a href="${featuredLink}" class="magazine-cover">
                    <div class="magazine-overlay"></div>
                    <span class="magazine-brand-logo">lab</span>
                    <img src="${featuredImg}" alt="${featured.titulo}" class="magazine-cover-img">
                    <h3 class="magazine-headline">
                        ${featured.titulo}
                    </h3>
                </a>
            </div>
            
            <!-- Columna Derecha: Información del Blog -->
            <div class="blog-col-right gsap-fade-up">
                <span class="blog-tag">BLOG</span>
                <h2 class="blog-main-title">${featured.titulo}</h2>
                <p class="blog-main-excerpt">
                    ${featured.extracto || ''}
                </p>
                <a href="${featuredLink}" class="btn">Leer el artículo</a>
                
                <h4 class="blog-others-title">OTROS ARTÍCULOS</h4>
                <ul class="blog-others-list">
                    ${othersHtml}
                </ul>
            </div>
        </div>
    `;
}

function renderFeaturedPost(post, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const imgSrc = post.imagen || 'assets/images/laura-bailone-blog-1.webp';

    container.innerHTML = `
        <div class="blog-featured-card gsap-fade-up">
            <div class="blog-featured-left">
                <img src="${imgSrc}" alt="${post.titulo}">
            </div>
            <div class="blog-featured-right">
                <span class="blog-featured-category">${post.categoria || ''}</span>
                <h2 class="blog-featured-title">${post.titulo}</h2>
                <p class="blog-featured-excerpt">${post.extracto || ''}</p>
                <a href="blog-post.html#${post.id}" class="blog-featured-link">LEER ➔</a>
            </div>
        </div>
    `;
}

function renderBlogGrid(posts, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = posts.map(post => {
        const imgSrc = post.imagen || 'assets/images/laura-bailone-blog-1.webp';
        return `
        <div class="blog-grid-card gsap-stagger-item">
            <div class="blog-grid-card-img">
                <img src="${imgSrc}" alt="${post.titulo}">
            </div>
            <div class="blog-grid-card-content">
                <span class="blog-grid-card-category">${post.categoria || ''}</span>
                <h3 class="blog-grid-card-title"><a href="blog-post.html#${post.id}" class="blog-post-link">${post.titulo}</a></h3>
                <p class="blog-grid-card-excerpt">${post.extracto || ''}</p>
                <a href="blog-post.html#${post.id}" class="blog-grid-card-link">LEER ➔</a>
            </div>
        </div>`;
    }).join('');
}

function renderSinglePost(posts) {
    try {
        console.log('[Blog-Post] renderSinglePost iniciado. Total posts:', posts ? posts.length : 'null');

        const container = document.getElementById('post-container');
        if (!container) { console.error('[Blog-Post] ERROR: No se encontró #post-container'); return; }

        const postId = window.location.hash ? window.location.hash.slice(1) : null;
        console.log('[Blog-Post] postId buscado (hash):', postId);

        if (!postId) {
            container.innerHTML = `<h2 style="text-align:center;">Artículo no encontrado.</h2><div style="margin-top:2rem; text-align:center;"><a href="blog.html" class="btn">Volver al Blog</a></div>`;
            return;
        }

        const post = posts.find(p => p.id === postId);
        console.log('[Blog-Post] Post encontrado:', post ? post.titulo : 'NO ENCONTRADO - IDs disponibles: ' + posts.map(p=>p.id).join(', '));

        if (!post) {
            container.innerHTML = `<h2 style="text-align:center;">Artículo no encontrado (id: ${postId}).</h2><div style="margin-top:2rem; text-align:center;"><a href="blog.html" class="btn">Volver al Blog</a></div>`;
            return;
        }

        document.title = `${post.titulo} | LAB Gastronomy`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute("content", post.extracto || '');

        let contentHtml = "";
        console.log('[Blog-Post] post.body tipo:', typeof post.body, '| Array?', Array.isArray(post.body));

        if (post.body && Array.isArray(post.body)) {
            contentHtml = portableTextToHtml(post.body);
        } else if (post.contenido_md && typeof marked !== 'undefined') {
            contentHtml = marked.parse(post.contenido_md);
        } else if (post.contenido_md) {
            contentHtml = `<p>${post.contenido_md.replace(/\n/g, '<br>')}</p>`;
        } else {
            console.warn('[Blog-Post] Sin body ni contenido_md en este post.');
        }

        const imgSrc = post.imagen || 'assets/images/laura-bailone-blog-1.webp';

        container.innerHTML = `
            <a href="blog.html" style="font-family: var(--fuente-h3-h4); font-size: 0.85rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-texto-secundario); text-decoration: none; display: inline-block; margin-bottom: 2rem;">← Volver al Blog</a>
            <div class="post-meta gsap-fade-up">
                <span>${post.categoria || ''}</span>
                <span>/</span>
                <span>${post.fecha ? formatDate(post.fecha) : ''}</span>
            </div>
            <div class="post-cover-wrapper gsap-fade-up">
                <img src="${imgSrc}" alt="${post.titulo || ''}" class="post-cover">
            </div>
            <div class="post-content gsap-fade-up">
                <h1>${post.titulo || ''}</h1>
                ${contentHtml}
            </div>
        `;
        console.log('[Blog-Post] Contenido renderizado correctamente.');

    } catch(err) {
        console.error('[Blog-Post] ERROR CRÍTICO:', err.message, err.stack);
    }
}

// ============================================================
// PORTABLE TEXT → HTML (Conversor simple para campos de Sanity)
// ============================================================
function portableTextToHtml(blocks) {
    if (!blocks || !Array.isArray(blocks)) return '';

    const html = [];
    let listBuffer = [];
    let listType = null;

    function flushList() {
        if (listBuffer.length === 0) return;
        const tag = listType === 'number' ? 'ol' : 'ul';
        html.push(`<${tag}>${listBuffer.join('')}</${tag}>`);
        listBuffer = [];
        listType = null;
    }

    function renderSpan(span, markDefs) {
        let text = escapeHtml(span.text || '');
        const marks = span.marks || [];

        // Buscar si algún mark es una anotación (link)
        for (const mark of marks) {
            const def = (markDefs || []).find(m => m._key === mark);
            if (def && def._type === 'link') {
                const target = def.blank ? ' target="_blank" rel="noopener"' : '';
                text = `<a href="${def.href}"${target}>${text}</a>`;
            }
        }

        if (marks.includes('strong')) text = `<strong>${text}</strong>`;
        if (marks.includes('em')) text = `<em>${text}</em>`;
        if (marks.includes('underline')) text = `<u>${text}</u>`;
        if (marks.includes('strike-through')) text = `<s>${text}</s>`;
        if (marks.includes('code')) text = `<code>${text}</code>`;
        return text;
    }

    for (const block of blocks) {
        if (block._type === 'block') {
            const children = (block.children || []).map(span => renderSpan(span, block.markDefs)).join('');
            const style = block.style || 'normal';
            const listItem = block.listItem;

            if (listItem) {
                const currentListType = listItem === 'number' ? 'number' : 'bullet';
                if (listType && listType !== currentListType) flushList();
                listType = currentListType;
                listBuffer.push(`<li>${children}</li>`);
            } else {
                flushList();
                if (style === 'h2') html.push(`<h2>${children}</h2>`);
                else if (style === 'h3') html.push(`<h3>${children}</h3>`);
                else if (style === 'h4') html.push(`<h4>${children}</h4>`);
                else if (style === 'blockquote') html.push(`<blockquote>${children}</blockquote>`);
                else if (children) html.push(`<p>${children}</p>`);
            }
        } else if (block._type === 'image' && block.asset) {
            flushList();
            const url = block.asset.url || '';
            const alt = block.alt ? escapeHtml(block.alt) : 'Imagen del artículo';
            const caption = block.caption ? `<figcaption style="text-align:center; font-size:0.85rem; color:var(--color-texto-secundario); margin-top:0.5rem;">${escapeHtml(block.caption)}</figcaption>` : '';
            if (url) html.push(`<figure style="margin: 2rem 0;""><img src="${url}" alt="${alt}" style="max-width:100%; border-radius: 8px; display:block;">${caption}</figure>`);
        }
    }

    flushList();
    return html.join('\n');
}

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
}
