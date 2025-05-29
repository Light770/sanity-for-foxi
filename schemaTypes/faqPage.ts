import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faqPage',
  title: 'Page FAQ',
  type: 'document',
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
      name: 'header',
      title: 'Page Header',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'faqSections',
      title: 'FAQ Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'text',
              title: 'Section Description',
              type: 'text',
            }),
            defineField({
              name: 'category',
              title: 'FAQ Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Pricing', value: 'pricing' },
                  { title: 'Integrations', value: 'integrations' },
                  { title: 'Features', value: 'features' },
                  { title: 'Support', value: 'support' },
                  { title: 'General', value: 'general' },
                ],
              },
            }),
            defineField({
              name: 'backgroundColor',
              title: 'Background Color Class',
              type: 'string',
              description: 'CSS classes for background (e.g., "bg-neutral-50 dark:bg-neutral-900")',
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'textImageSections',
      title: 'Text & Image Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
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
              title: 'Mobile Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'imagePosition',
              title: 'Image Position',
              type: 'string',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Right', value: 'right' },
                ],
              },
              initialValue: 'right',
            }),
            defineField({
              name: 'offsetImage',
              title: 'Offset Image',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'backgroundColor',
              title: 'Background Color Class',
              type: 'string',
              description: 'CSS classes for background (e.g., "bg-neutral-50 dark:bg-neutral-900 lg:!py-64")',
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'reference',
      to: [{ type: 'cta' }],
    }),
  ],
})