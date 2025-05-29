import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featureList',
  title: 'Liste de fonctionnalités',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la section',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Whats included on all foxi plans',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
      initialValue: 'Explore the suite of tools designed to streamline your workflow, enhance productivity, and drive growth. Each product is crafted with precision to meet your needs and exceed your expectations.',
    }),
    defineField({
      name: 'featuresSelection',
      title: 'Sélection des fonctionnalités',
      type: 'string',
      options: {
        list: [
          { title: 'Toutes les fonctionnalités (par ordre)', value: 'all' },
          { title: 'Par catégorie', value: 'category' },
          { title: 'Sélection manuelle', value: 'manual' },
        ],
      },
      initialValue: 'all',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie à afficher',
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
      hidden: ({document}) => document?.featuresSelection !== 'category',
      description: 'Sélectionner une catégorie spécifique à afficher',
    }),
    defineField({
      name: 'selectedFeatures',
      title: 'Fonctionnalités sélectionnées',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'feature' }],
        },
      ],
      hidden: ({document}) => document?.featuresSelection !== 'manual',
      description: 'Sélectionner manuellement les fonctionnalités à afficher',
    }),
    defineField({
      name: 'maxFeatures',
      title: 'Nombre maximum de fonctionnalités',
      type: 'number',
      initialValue: 8,
      validation: (Rule) => Rule.min(1).max(20),
      description: 'Nombre maximum de fonctionnalités à afficher (1-20)',
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      options: {
        list: [
          { title: '4 colonnes (3 par ligne)', value: '3' },
          { title: '3 colonnes (4 par ligne)', value: '4' },
          { title: '2 colonnes (6 par ligne)', value: '6' },
        ],
      },
      initialValue: '3',
      description: 'Nombre de colonnes par fonctionnalité',
    }),
    defineField({
      name: 'alignment',
      title: 'Alignement des fonctionnalités',
      type: 'string',
      options: {
        list: [
          { title: 'Gauche', value: 'left' },
          { title: 'Centre', value: 'center' },
        ],
      },
      initialValue: 'left',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      featuresSelection: 'featuresSelection',
      category: 'category',
    },
    prepare(selection) {
      const { title, featuresSelection, category } = selection
      let subtitle = ''
      
      switch (featuresSelection) {
        case 'all':
          subtitle = 'Toutes les fonctionnalités'
          break
        case 'category':
          subtitle = `Catégorie: ${category || 'Non définie'}`
          break
        case 'manual':
          subtitle = 'Sélection manuelle'
          break
        default:
          subtitle = featuresSelection
      }
      
      return {
        title: title || 'Liste de fonctionnalités',
        subtitle,
      }
    },
  },
})