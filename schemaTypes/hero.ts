import {defineField, defineType} from 'sanity'
import {portableTextTitle} from './shared/portableTextTitle'

export default defineType({
  name: 'hero',
  title: 'Section Héros',
  type: 'document',
  fields: [
    portableTextTitle('title', 'Titre du héros'),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaText',
      title: 'Texte du bouton CTA',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Lien du bouton CTA',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Image du héros',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'badge',
      title: 'Texte du badge',
      type: 'string',
      description: 'Petit texte de badge/puce affiché au-dessus du titre',
    }),
    defineField({
      name: 'socialProof',
      title: 'Texte de preuve sociale',
      type: 'string',
      description: 'Texte affiché sous le CTA (ex : "Approuvé par 10 000+ utilisateurs")',
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          {title: 'Accueil', value: 'home'},
          {title: 'Contact', value: 'contact'},
          {title: 'Fonctionnalités', value: 'features'},
          {title: 'Tarifs', value: 'pricing'},
          {title: 'À propos', value: 'about'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'page',
      media: 'image',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title,
        subtitle: `${subtitle} page`,
      }
    },
  },
})
