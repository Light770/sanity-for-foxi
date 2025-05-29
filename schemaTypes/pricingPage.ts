import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pricingPage',
  title: 'Page des tarifs',
  type: 'document',
  icon: () => '💳',
  fields: [
    defineField({
      name: 'seo',
      title: 'Paramètres SEO',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titre de la page',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Méta description',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'header',
      title: 'En-tête de page',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titre de l\'en-tête',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'text',
          title: 'Texte de l\'en-tête',
          type: 'text',
        },
      ],
    }),
    defineField({
      name: 'socialProof',
      title: 'Section de preuve sociale',
      type: 'reference',
      to: [{ type: 'socialProof' }],
      description: 'Sélectionner une section de preuve sociale ou laisser vide pour utiliser la section par défaut',
    }),
    defineField({
      name: 'showFeatures',
      title: 'Afficher la section des fonctionnalités',
      type: 'boolean',
      initialValue: true,
      description: 'Activer/désactiver l\'affichage de la section des fonctionnalités',
    }),
    defineField({
      name: 'featureList',
      title: 'Liste de fonctionnalités',
      type: 'reference',
      to: [{ type: 'featureList' }],
      description: 'Sélectionner une liste de fonctionnalités spécifique ou laisser vide pour utiliser la configuration par défaut',
    }),
    defineField({
      name: 'featuredTestimonial',
      title: 'Témoignage en vedette',
      type: 'reference',
      to: [{ type: 'testimonial' }],
      description: 'Sélectionner un témoignage spécifique ou laisser vide pour utiliser le premier témoignage en vedette',
    }),
    defineField({
      name: 'testimonialBackground',
      title: 'Image de fond du témoignage',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image de fond pour la section témoignage',
    }),
    defineField({
      name: 'testimonialBackgroundPosition',
      title: 'Position du fond du témoignage',
      type: 'string',
      options: {
        list: [
          { title: 'Gauche', value: 'left' },
          { title: 'Droite', value: 'right' },
          { title: 'Centre', value: 'center' },
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'showFAQ',
      title: 'Afficher la section FAQ',
      type: 'boolean',
      initialValue: true,
      description: 'Activer/désactiver l\'affichage de la section FAQ',
    }),
    defineField({
      name: 'faqBackgroundClass',
      title: 'Classe CSS de fond pour la FAQ',
      type: 'string',
      initialValue: 'bg-slate-50 dark:bg-neutral-900/40',
      description: 'Classes CSS pour le style de fond de la section FAQ',
    }),
    defineField({
      name: 'cta',
      title: 'Appel à l\'action',
      type: 'reference',
      to: [{type: 'cta'}],
      description: 'Référence à une section CTA',
    }),
  ],

  preview: {
    select: {
      title: 'seo.title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title || 'Page des tarifs',
      }
    },
  },
})