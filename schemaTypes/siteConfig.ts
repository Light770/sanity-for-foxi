import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteConfig',
  title: 'Configuration du site',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Titre du site',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Description du site',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ogImage',
      title: 'Image Open Graph',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image de partage social par défaut',
    }),
    defineField({
      name: 'logo',
      title: 'Logo du site',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoAlt',
      title: 'Texte alternatif du logo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'canonical',
      title: 'Utiliser des URL canoniques',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'noindex',
      title: 'Empêcher l\'indexation par les moteurs de recherche',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'mode',
      title: 'Mode de thème par défaut',
      type: 'string',
      options: {
        list: [
          {title: 'Auto (Préférence système)', value: 'auto'},
          {title: 'Mode clair', value: 'light'},
          {title: 'Mode sombre', value: 'dark'},
        ],
      },
      initialValue: 'auto',
    }),
    defineField({
      name: 'scrollAnimations',
      title: 'Activer les animations au défilement',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Liens de réseaux sociaux',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Plateforme',
              type: 'string',
              options: {
                list: [
                  {title: 'Twitter', value: 'twitter'},
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'Discord', value: 'discord'},
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Configuration du site',
      }
    },
  },
})
