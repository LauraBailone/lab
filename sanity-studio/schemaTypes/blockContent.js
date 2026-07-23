import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Contenido enriquecido',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Bloque de texto',
      type: 'block',
      styles: [
        {title: 'Párrafo', value: 'normal'},
        {title: 'Título grande (H2)', value: 'h2'},
        {title: 'Subtítulo (H3)', value: 'h3'},
        {title: 'Subtítulo menor (H4)', value: 'h4'},
        {title: 'Cita destacada', value: 'blockquote'},
      ],
      lists: [
        {title: 'Lista con viñetas', value: 'bullet'},
        {title: 'Lista numerada', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Negrita', value: 'strong'},
          {title: 'Cursiva', value: 'em'},
          {title: 'Subrayado', value: 'underline'},
          {title: 'Tachado', value: 'strike-through'},
          {title: 'Código', value: 'code'},
        ],
        annotations: [
          {
            title: 'Enlace / Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL del enlace',
                name: 'href',
                type: 'url',
                validation: Rule =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ['https', 'http', 'mailto', 'tel'],
                  }),
              },
              {
                title: 'Abrir en pestaña nueva',
                name: 'blank',
                type: 'boolean',
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    // Imagen dentro del contenido
    defineArrayMember({
      type: 'image',
      title: 'Imagen',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo (descripción de la imagen)',
          validation: Rule => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Epígrafe / Pie de foto (opcional)',
        },
      ],
    }),
  ],
})
