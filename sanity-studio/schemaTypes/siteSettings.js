export default {
  name: 'siteSettings',
  title: 'Configuración de la Web',
  type: 'document',
  groups: [
    { name: 'general', title: 'General & Redes' },
    { name: 'home', title: 'Home (Inicio)' },
    { name: 'bio', title: 'Detrás de LAB (Bio)' },
    { name: 'asesorias', title: 'Asesorías' },
    { name: 'metodo', title: 'Método LAB' },
    { name: 'herramientas', title: 'Herramientas' },
  ],
  fields: [
    // === GRUPO: GENERAL ===
    {
      name: 'logoFooter',
      title: 'Logo del Footer',
      type: 'image',
      options: { hotspot: true },
      group: 'general',
    },
    {
      name: 'whatsappLink',
      title: 'Enlace de WhatsApp',
      type: 'string',
      description: 'Enlace completo al chat, ej: https://wa.me/5493834925427',
      group: 'general',
    },
    {
      name: 'instagramLink',
      title: 'Enlace de Instagram',
      type: 'string',
      group: 'general',
    },
    {
      name: 'facebookLink',
      title: 'Enlace de Facebook',
      type: 'string',
      group: 'general',
    },
    {
      name: 'contactoCta',
      title: 'Texto del Botón de Contacto',
      type: 'string',
      description: 'Texto para los botones de llamada a la acción (CTA) de WhatsApp',
      group: 'general',
    },
    {
      name: 'copyright',
      title: 'Texto de Copyright',
      type: 'string',
      group: 'general',
    },

    // === GRUPO: HOME ===
    {
      name: 'heroTituloTop',
      title: 'Título Hero Superior',
      type: 'string',
      group: 'home',
    },
    {
      name: 'heroTituloBottom',
      title: 'Título Hero Inferior',
      type: 'string',
      group: 'home',
    },
    {
      name: 'heroImagen',
      title: 'Imagen de Fondo del Hero',
      type: 'image',
      options: { hotspot: true },
      group: 'home',
    },
    {
      name: 'metodoPreviewTexto',
      title: 'Texto de Presentación del Método',
      type: 'text',
      group: 'home',
    },
    {
      name: 'metodoPreviewImagen',
      title: 'Imagen de Presentación del Método',
      type: 'image',
      options: { hotspot: true },
      group: 'home',
    },

    // === GRUPO: DETRÁS DE LAB ===
    {
      name: 'bioTituloHero',
      title: 'Título del Hero (Bio)',
      type: 'string',
      group: 'bio',
    },
    {
      name: 'bioIntro',
      title: 'Texto Introductorio (Cursiva)',
      type: 'text',
      group: 'bio',
    },
    // Bloques overlap de trayectoria
    {
      name: 'bloque1',
      title: 'Bloque 1: Europa & Finanzas',
      type: 'object',
      group: 'bio',
      fields: [
        { name: 'titulo', title: 'Título', type: 'string' },
        { name: 'descripcion', title: 'Descripción', type: 'text' },
        { name: 'imagen', title: 'Imagen', type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'bloque2',
      title: 'Bloque 2: Wellness & Yoga',
      type: 'object',
      group: 'bio',
      fields: [
        { name: 'titulo', title: 'Título', type: 'string' },
        { name: 'descripcion', title: 'Descripción', type: 'text' },
        { name: 'imagen', title: 'Imagen', type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'bloque3',
      title: 'Bloque 3: Hospitalidad & Costa Rica',
      type: 'object',
      group: 'bio',
      fields: [
        { name: 'titulo', title: 'Título', type: 'string' },
        { name: 'descripcion', title: 'Descripción', type: 'text' },
        { name: 'imagen', title: 'Imagen', type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'bioDestacadoFinal',
      title: 'Texto Destacado Final (Negrita)',
      type: 'text',
      group: 'bio',
    },
    {
      name: 'bioTarjetaTitular',
      title: 'Titular para Tarjeta Home (ej: Soy Laura Bailone...)',
      type: 'string',
      group: 'bio',
    },
    {
      name: 'bioTarjetaResumen',
      title: 'Resumen para Tarjeta Home',
      type: 'text',
      group: 'bio',
    },
    {
      name: 'bioTarjetaImagenPaisaje',
      title: 'Imagen Apaisada para Tarjeta Home',
      type: 'image',
      options: { hotspot: true },
      group: 'bio',
    },
    {
      name: 'bioTarjetaImagenPerfil',
      title: 'Imagen Retrato para Tarjeta Home',
      type: 'image',
      options: { hotspot: true },
      group: 'bio',
    },

    // === GRUPO: ASESORÍAS ===
    {
      name: 'asesoriasTituloHero',
      title: 'Título del Hero (Asesorías)',
      type: 'string',
      group: 'asesorias',
    },
    {
      name: 'asesoriasImagenHero',
      title: 'Imagen de Fondo del Hero',
      type: 'image',
      options: { hotspot: true },
      group: 'asesorias',
    },
    {
      name: 'asesoriasIntroSubtitulo',
      title: 'Subtítulo Introducción (ej. "Mi trabajo consiste en...")',
      type: 'string',
      group: 'asesorias',
    },
    {
      name: 'asesoriasIntroTitulo',
      title: 'Título Introducción Destacado (ej. "Un punto menos de Food Cost...")',
      type: 'string',
      group: 'asesorias',
    },
    {
      name: 'asesoriasServicios',
      title: 'Servicios de Asesorías',
      type: 'array',
      group: 'asesorias',
      of: [
        {
          type: 'object',
          name: 'servicioItem',
          title: 'Servicio',
          fields: [
            { name: 'subtitulo', title: 'Subtítulo (en mayúsculas, ej: CONTROL DE NÚMEROS)', type: 'string' },
            { name: 'titulo', title: 'Título Principal (ej: COSTOS Y MÉTRICAS FINANCIERAS)', type: 'string' },
            { name: 'descripcion', title: 'Descripción / Resumen', type: 'text' },
            { name: 'para', title: 'Puntos de "PARA" (uno por línea)', type: 'text', description: 'Escribe cada ítem en una línea distinta.' },
            { name: 'resultados', title: 'Puntos de "RESULTADOS" (uno por línea)', type: 'text', description: 'Escribe cada ítem en una línea distinta.' },
            { name: 'imagenTarjeta', title: 'Imagen para la Tarjeta Global', type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    },
    {
      name: 'fasesGastronomy',
      title: 'Cronograma: Consultoría Gastronómica',
      type: 'array',
      group: 'metodo',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'titulo', title: 'Título de la Fase', type: 'string' },
            { name: 'descripcion', title: 'Descripción', type: 'text' },
            { name: 'objetivo', title: 'Objetivo de la Fase', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'fasesHospitality',
      title: 'Cronograma: Consultoría de Hospitalidad',
      type: 'array',
      group: 'metodo',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'titulo', title: 'Título de la Fase', type: 'string' },
            { name: 'descripcion', title: 'Descripción', type: 'text' },
            { name: 'objetivo', title: 'Objetivo de la Fase', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'inversionTexto',
      title: 'Texto Explicativo de Inversión',
      type: 'text',
      group: 'asesorias',
    },
    {
      name: 'brochureAsesoriasFile',
      title: 'Archivo PDF del Brochure (Asesorías)',
      type: 'file',
      group: 'asesorias',
    },

    // === GRUPO: MÉTODO LAB ===
    {
      name: 'metodoTituloHero',
      title: 'Título del Hero (Método)',
      type: 'string',
      group: 'metodo',
    },
    {
      name: 'metodoImagenHero',
      title: 'Imagen de Fondo del Hero',
      type: 'image',
      options: { hotspot: true },
      group: 'metodo',
    },
    {
      name: 'metodoDetallesGastronomy',
      title: 'Detalle: Gastronomía Estratégica',
      type: 'text',
      group: 'metodo',
    },
    {
      name: 'metodoDetallesHospitality',
      title: 'Detalle: Hospitalidad y Wellness',
      type: 'text',
      group: 'metodo',
    },
    {
      name: 'brochureMetodoFile',
      title: 'Archivo PDF del Brochure (Método)',
      type: 'file',
      group: 'metodo',
    },
    {
      name: 'metodoTarjetaGastronomyResumen',
      title: 'Resumen Tarjeta: Gastronomía Estratégica',
      type: 'text',
      group: 'metodo',
    },
    {
      name: 'metodoTarjetaHospitalityResumen',
      title: 'Resumen Tarjeta: Hospitalidad y Wellness',
      type: 'text',
      group: 'metodo',
    },

    // === GRUPO: HERRAMIENTAS ===
    {
      name: 'herramientasTituloHero',
      title: 'Título del Hero (Herramientas)',
      type: 'string',
      group: 'herramientas',
    },
    {
      name: 'herramientasImagenHero',
      title: 'Imagen de Fondo del Hero',
      type: 'image',
      options: { hotspot: true },
      group: 'herramientas',
    },
    {
      name: 'herramientasLista',
      title: 'Listado de Herramientas',
      type: 'array',
      group: 'herramientas',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'titulo', title: 'Título', type: 'string' },
            { name: 'subtitulo', title: 'Subtítulo', type: 'string' },
            { name: 'resumen', title: 'Resumen', type: 'text' },
            { name: 'imagen', title: 'Imagen', type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    },
  ],
}
