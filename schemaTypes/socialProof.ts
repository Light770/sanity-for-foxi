import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'socialProof',
  title: 'Preuve sociale',
  type: 'document',
  fields: [
    defineField({
      name: 'trustText',
      title: 'Texte de confiance',
      type: 'string',
      initialValue: 'Approuvé par',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'businessCount',
      title: 'Nombre d\'entreprises',
      type: 'string',
      description: 'Nombre d\'entreprises (ex : "50 000+")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logos',
      title: 'Logos des partenaires',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Nom de la plateforme',
              type: 'string',
            },
            {
              name: 'logo',
              title: 'Image du logo',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Configuration de la preuve sociale',
      }
    },
  },
})