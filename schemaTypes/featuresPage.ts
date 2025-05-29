import {defineField, defineType} from 'sanity'
import {portableTextTitleOptional} from './shared/portableTextTitle'

export default defineType({
  name: 'featuresPage',
  title: 'Page des fonctionnalités',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'Référencement (SEO)',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'header',
      title: 'En-tête de page',
      type: 'object',
      fields: [
        portableTextTitleOptional('title', 'Title'),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'featureSections',
      title: 'Sections de fonctionnalités',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            portableTextTitleOptional('title', 'Titre de la section'),
            defineField({
              name: 'text',
              title: 'Description de la section',
              type: 'text',
            }),
            defineField({
              name: 'category',
              title: 'Catégorie de fonctionnalité',
              type: 'string',
              options: {
                list: [
                  { title: 'Analytique', value: 'Analytics' },
                  { title: 'Productivité', value: 'Productivity' },
                  { title: 'Sécurité', value: 'Security' },
                  { title: 'Intégrations', value: 'Integrations' },
                  { title: 'Support', value: 'Support' },
                ],
              },
            }),
            defineField({
              name: 'backgroundColor',
              title: 'Classe de couleur de fond',
              type: 'string',
              description: 'Classes CSS pour l\'arrière-plan (ex : "bg-neutral-50 dark:bg-neutral-900")',
            }),
            defineField({
              name: 'order',
              title: 'Ordre d\'affichage',
              type: 'number',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Appel à l\'action',
      type: 'reference',
      to: [{ type: 'cta' }],
    }),
  ],
})