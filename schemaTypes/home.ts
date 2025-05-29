import {defineField, defineType} from 'sanity'
import {portableTextTitle, portableTextTitleOptional} from './shared/portableTextTitle'

export default defineType({
  name: 'home',
  title: 'Page d\'accueil',
  type: 'document',
  icon: () => '💳',
  fields: [
    defineField({
      name: 'seo',
      title: 'Référencement (SEO)',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'hero',
      title: 'Section héros',
      type: 'reference',
      to: [{ type: 'hero' }],
    }),
    defineField({
      name: 'featureCardHeader',
      title: 'En-tête de la section des cartes de fonctionnalités',
      type: 'object',
      fields: [
        {
          ...portableTextTitle('title', 'Titre'),
          initialValue: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Innovative tools to transform your workflow'
                }
              ]
            }
          ]
        },
        defineField({
          name: 'text',
          title: 'Texte descriptif',
          type: 'text',
          rows: 3,
          initialValue: 'Explore the suite of tools designed to streamline your workflow, enhance productivity, and drive growth. Each product is crafted with precision to meet your needs and exceed your expectations.',
        }),
      ],
    }),
    defineField({
      name: 'featureCardData',
      title: 'Cartes de fonctionnalités',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'featureCard' }] }],
      description: 'Sélectionner les cartes de fonctionnalités à afficher sur la page d\'accueil',
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
      initialValue: 'right',
    }),

    defineField({
      name: 'highlightBlocks',
      title: 'Blocs de mise en évidence',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            portableTextTitle('heading', 'En-tête'),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'mobileImage',
              title: 'Image mobile',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'order',
              title: 'Ordre d\'affichage',
              type: 'number',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'text',
              media: 'image',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Appel à l\'action',
      type: 'reference',
      to: [{ type: 'cta' }],
    }),
  ],
})