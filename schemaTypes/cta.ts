import {defineField, defineType} from 'sanity'
import {portableTextTitle} from './shared/portableTextTitle'

export default defineType({
  name: 'cta',
  title: 'Appel à l\'action',
  type: 'document',
  fields: [
    portableTextTitle('title', 'Titre du CTA'),
    defineField({
      name: 'text',
      title: 'Texte de description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'buttonText',
      title: 'Texte du bouton',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Lien du bouton',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notificationText',
      title: 'Texte de notification',
      type: 'string',
      description: 'Petit texte de notification ou de badge',
    }),
    defineField({
      name: 'badgeText',
      title: 'Texte du badge',
      type: 'string',
      description: 'Texte du badge ou de la puce affiché avec le CTA',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Image de fond',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'theme',
      title: 'Thème',
      type: 'string',
      options: {
        list: [
          {title: 'Clair', value: 'light'},
          {title: 'Sombre', value: 'dark'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          {title: 'Accueil', value: 'home'},
          {title: 'Fonctionnalités', value: 'features'},
          {title: 'Tarifs', value: 'pricing'},
          {title: 'Contact', value: 'contact'},
          {title: 'Global', value: 'global'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'page',
      theme: 'theme',
      media: 'backgroundImage',
    },
    prepare(selection) {
      const {title, subtitle, theme} = selection
      return {
        title,
        subtitle: `${subtitle} page - ${theme}`,
      }
    },
  },
})
