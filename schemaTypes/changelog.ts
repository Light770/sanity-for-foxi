import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'changelog',
  title: 'Entrée du journal des modifications',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date de sortie',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Contenu HTML décrivant les modifications',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image de fonctionnalité',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image optionnelle pour accompagner cette entrée du journal',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'Aucune date',
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Date de sortie, récent',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Date de sortie, ancien',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
})
