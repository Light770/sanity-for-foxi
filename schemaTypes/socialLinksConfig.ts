import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'socialLinksConfig',
  title: 'Configuration Réseaux Sociaux',
  type: 'document',
  fields: [
    defineField({
      name: 'socialLinks',
      title: 'Liens des réseaux sociaux',
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
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Twitter', value: 'twitter'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'Discord', value: 'discord'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'GitHub', value: 'github'},
                  {title: 'Autre', value: 'other'},
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'customPlatformName',
              title: 'Nom de plateforme personnalisé',
              type: 'string',
              description: 'Utilisé uniquement si "Autre" est sélectionné',
              hidden: ({parent}) => parent?.platform !== 'other',
            },
            {
              name: 'url',
              title: 'URL du profil',
              type: 'url',
              validation: (Rule) => Rule.required().uri({
                scheme: ['http', 'https']
              }),
            },
            {
              name: 'icon',
              title: 'Icône personnalisée',
              type: 'string',
              description: 'Nom de l\'icône (ex: fb-icon, twitter-icon). Laissez vide pour utiliser l\'icône par défaut.',
            },
            {
              name: 'displayName',
              title: 'Nom d\'affichage',
              type: 'string',
              description: 'Nom affiché au survol ou dans les liens texte',
            },
            {
              name: 'openInNewTab',
              title: 'Ouvrir dans un nouvel onglet',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'isActive',
              title: 'Actif',
              type: 'boolean',
              description: 'Afficher ce lien sur le site',
              initialValue: true,
            },
            {
              name: 'order',
              title: 'Ordre d\'affichage',
              type: 'number',
              description: 'Ordre d\'affichage du lien (plus petit = plus à gauche)',
            },
          ],
          preview: {
            select: {
              platform: 'platform',
              customName: 'customPlatformName',
              url: 'url',
              isActive: 'isActive',
            },
            prepare({platform, customName, url, isActive}) {
              const title = platform === 'other' ? customName || 'Plateforme personnalisée' : platform
              const status = isActive ? '✅' : '❌'
              return {
                title: `${status} ${title}`,
                subtitle: url,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'displaySettings',
      title: 'Paramètres d\'affichage',
      type: 'object',
      fields: [
        {
          name: 'showInHeader',
          title: 'Afficher dans l\'en-tête',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'showInFooter',
          title: 'Afficher dans le footer',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showLabels',
          title: 'Afficher les libellés',
          type: 'boolean',
          description: 'Afficher le nom de la plateforme à côté de l\'icône',
          initialValue: false,
        },
        {
          name: 'iconSize',
          title: 'Taille des icônes',
          type: 'string',
          options: {
            list: [
              {title: 'Petit', value: 'sm'},
              {title: 'Moyen', value: 'md'},
              {title: 'Grand', value: 'lg'},
            ],
          },
          initialValue: 'md',
        },
        {
          name: 'style',
          title: 'Style des icônes',
          type: 'string',
          options: {
            list: [
              {title: 'Icônes simples', value: 'simple'},
              {title: 'Icônes avec fond', value: 'filled'},
              {title: 'Icônes avec bordure', value: 'outlined'},
            ],
          },
          initialValue: 'simple',
        },
      ],
    }),
    defineField({
      name: 'seoSettings',
      title: 'Paramètres SEO',
      type: 'object',
      fields: [
        {
          name: 'addNofollow',
          title: 'Ajouter rel="nofollow"',
          type: 'boolean',
          description: 'Ajouter l\'attribut nofollow aux liens sociaux',
          initialValue: false,
        },
        {
          name: 'addNoopener',
          title: 'Ajouter rel="noopener"',
          type: 'boolean',
          description: 'Ajouter l\'attribut noopener pour la sécurité',
          initialValue: true,
        },
      ],
    }),
  ],

  preview: {
    select: {
      socialLinks: 'socialLinks',
    },
    prepare({socialLinks}) {
      const count = socialLinks ? socialLinks.filter((link: any) => link.isActive).length : 0
      return {
        title: 'Configuration Réseaux Sociaux',
        subtitle: `${count} lien${count > 1 ? 's' : ''} actif${count > 1 ? 's' : ''}`,
      }
    },
  },
})