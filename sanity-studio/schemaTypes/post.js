import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Publicación',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required().min(10).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'URL de la publicación',
      description: 'Se genera automáticamente desde el título. Usá "Generate" y no lo cambies.',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      description: 'Ej: Gestión Financiera, Estrategia, Hospitality, Herramientas',
      type: 'string',
    }),
    defineField({
      name: 'extracto',
      title: 'Extracto / Resumen',
      description: 'Texto corto que aparece en la lista del blog (máximo 200 caracteres).',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(220),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen de portada',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Contenido del artículo',
      description: 'Escribí el artículo completo aquí.',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      categoria: 'categoria',
      media: 'mainImage',
      fecha: 'publishedAt',
    },
    prepare({title, categoria, media, fecha}) {
      const date = fecha ? new Date(fecha).toLocaleDateString('es-ES') : 'Sin fecha'
      return {
        title,
        subtitle: `${categoria || 'Sin categoría'} • ${date}`,
        media,
      }
    },
  },
})
