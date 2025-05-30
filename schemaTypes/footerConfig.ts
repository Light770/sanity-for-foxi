import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footerConfig',
  title: 'Configuration Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'footerAbout',
      title: 'Section À propos',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'aboutText',
          title: 'Texte de description',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'logo',
          title: 'Logo du footer',
          type: 'object',
          fields: [
            {
              name: 'image',
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
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'text',
              title: 'Texte du logo',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerColumns',
      title: 'Colonnes du footer',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'category',
              title: 'Titre de la catégorie',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'subCategories',
              title: 'Liens de la catégorie',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'subCategory',
                      title: 'Nom du lien',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'subCategoryLink',
                      title: 'URL du lien',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'openInNewTab',
                      title: 'Ouvrir dans un nouvel onglet',
                      type: 'boolean',
                      initialValue: false,
                    },
                  ],
                  preview: {
                    select: {
                      title: 'subCategory',
                      subtitle: 'subCategoryLink',
                    },
                  },
                },
              ],
            },
            {
              name: 'order',
              title: 'Ordre d\'affichage',
              type: 'number',
              description: 'Ordre d\'affichage de la colonne (plus petit = plus à gauche)',
            },
          ],
          preview: {
            select: {
              title: 'category',
              subtitle: 'subCategories',
            },
            prepare({title, subCategories}) {
              const count = subCategories ? subCategories.length : 0
              return {
                title,
                subtitle: `${count} lien${count > 1 ? 's' : ''}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'subFooter',
      title: 'Sous-footer',
      type: 'object',
      fields: [
        {
          name: 'copywriteText',
          title: 'Texte de copyright',
          type: 'string',
          validation: (Rule) => Rule.required(),
          placeholder: '© Votre Entreprise 2024',
        },
        {
          name: 'additionalLinks',
          title: 'Liens additionnels',
          type: 'array',
          description: 'Liens supplémentaires dans le sous-footer (ex: Politique de confidentialité)',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Texte du lien',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: 'text',
                  subtitle: 'url',
                },
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerSettings',
      title: 'Paramètres du footer',
      type: 'object',
      fields: [
        {
          name: 'showSocialLinks',
          title: 'Afficher les liens sociaux',
          type: 'boolean',
          description: 'Afficher les liens des réseaux sociaux dans le footer',
          initialValue: true,
        },
        {
          name: 'backgroundColor',
          title: 'Couleur de fond',
          type: 'string',
          options: {
            list: [
              {title: 'Défaut', value: 'default'},
              {title: 'Sombre', value: 'dark'},
              {title: 'Clair', value: 'light'},
              {title: 'Primaire', value: 'primary'},
            ],
          },
          initialValue: 'default',
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Configuration Footer',
        subtitle: 'Colonnes, liens, copyright',
      }
    },
  },
})