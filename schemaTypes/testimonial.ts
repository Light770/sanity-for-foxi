import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Témoignage',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Citation',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Nom de l\'auteur',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rôle/Poste',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Entreprise',
      type: 'string',
    }),
    defineField({
      name: 'avatar',
      title: 'Image d\'avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'rating',
      title: 'Évaluation',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      description: 'Évaluation de 1 à 5 étoiles',
    }),
    defineField({
      name: 'featured',
      title: 'Témoignage en vedette',
      type: 'boolean',
      description: 'Si ce témoignage doit être affiché en évidence',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Ordre dans lequel ce témoignage apparaît',
    }),
  ],

  preview: {
    select: {
      title: 'author',
      subtitle: 'company',
      media: 'avatar',
    },
  },
})
