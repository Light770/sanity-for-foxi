import {defineField, defineType} from 'sanity'
import {portableTextTitle} from './shared/portableTextTitle'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    portableTextTitle('question', 'Question'),
    defineField({
      name: 'reply',
      title: 'Réponse',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'Tarifs', value: 'pricing'},
          {title: 'Intégrations', value: 'integrations'},
          {title: 'Fonctionnalités', value: 'features'},
          {title: 'Support', value: 'support'},
          {title: 'Général', value: 'general'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'open',
      title: 'Ouvert par défaut',
      type: 'boolean',
      description: 'Si cet élément FAQ doit être développé par défaut',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Ordre dans lequel cette FAQ apparaît dans sa catégorie',
    }),
  ],

  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
  },
})
