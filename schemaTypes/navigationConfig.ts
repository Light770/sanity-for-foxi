import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navigationConfig',
  title: 'Configuration Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo de navigation',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'Image du logo',
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'text',
          title: 'Texte du logo',
          type: 'string',
          description: 'Texte affiché à côté du logo',
        },
      ],
    }),
    defineField({
      name: 'navItems',
      title: 'Éléments de navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nom',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Lien',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'submenu',
              title: 'Sous-menu',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'name',
                      title: 'Nom',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'link',
                      title: 'Lien',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      subtitle: 'link',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'link',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'navActions',
      title: 'Actions de navigation',
      type: 'array',
      description: 'Boutons d\'action dans la navigation (ex: CTA)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nom du bouton',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Lien',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'style',
              title: 'Style du bouton',
              type: 'string',
              options: {
                list: [
                  {title: 'Primaire', value: 'primary'},
                  {title: 'Secondaire', value: 'secondary'},
                  {title: 'Neutre', value: 'neutral'},
                ],
              },
              initialValue: 'primary',
            },
            {
              name: 'variation',
              title: 'Variation du bouton',
              type: 'string',
              options: {
                list: [
                  {title: 'Normal', value: ''},
                  {title: 'Outline', value: 'outline'},
                  {title: 'Lien', value: 'link'},
                ],
              },
              initialValue: '',
            },
            {
              name: 'size',
              title: 'Taille du bouton',
              type: 'string',
              options: {
                list: [
                  {title: 'Petit', value: 'sm'},
                  {title: 'Moyen', value: 'base'},
                  {title: 'Grand', value: 'lg'},
                ],
              },
              initialValue: 'base',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'style',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'mobileMenuSettings',
      title: 'Paramètres menu mobile',
      type: 'object',
      fields: [
        {
          name: 'showLogo',
          title: 'Afficher le logo',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'closeOnItemClick',
          title: 'Fermer au clic sur un élément',
          type: 'boolean',
          initialValue: true,
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Configuration Navigation',
        subtitle: 'Menu principal, logo, actions',
      }
    },
  },
})