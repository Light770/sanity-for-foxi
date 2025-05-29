import {defineField, defineType} from 'sanity'
import {portableTextTitle} from './shared/portableTextTitle'

export default defineType({
  name: 'pricingPlan',
  title: 'Forfait tarifaire',
  type: 'document',
  fields: [
    portableTextTitle('title', 'Titre du forfait'),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'currency',
      title: 'Symbole de devise',
      type: 'string',
      initialValue: '$',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Prix annuel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceLabel',
      title: 'Libellé du prix annuel',
      type: 'string',
      initialValue: 'mois, facturé annuellement',
    }),
    defineField({
      name: 'priceMonthly',
      title: 'Prix mensuel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceLabelMonthly',
      title: 'Libellé du prix mensuel',
      type: 'string',
      initialValue: 'mois',
    }),
    defineField({
      name: 'buttonName',
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
      name: 'listItems',
      title: 'Liste des fonctionnalités',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'listItem',
              title: 'Fonctionnalité',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Forfait en vedette',
      type: 'boolean',
      description: 'Si ce forfait doit être mis en évidence',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Ordre dans lequel ce forfait apparaît',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})
