import {defineField, defineType} from 'sanity'
import {portableTextTitle} from './shared/portableTextTitle'

export default defineType({
  name: 'feature',
  title: 'Fonctionnalité',
  type: 'document',
  fields: [
    portableTextTitle('title', 'Titre'),
    defineField({
      name: 'icon',
      title: 'Icône',
      type: 'string',
      description: 'Nom de l\'icône de Heroicons (ex : chart-pie, rocket)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'Analytique', value: 'Analytics'},
          {title: 'Productivité', value: 'Productivity'},
          {title: 'Support', value: 'Support'},
          {title: 'Sécurité', value: 'Security'},
          {title: 'Intégrations', value: 'Integrations'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Ordre dans lequel cette fonctionnalité apparaît',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
})
