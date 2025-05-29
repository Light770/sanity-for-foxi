import {defineField} from 'sanity'

// Shared PortableText field for titles with formatting support
export const portableTextTitle = (name: string = 'title', title: string = 'Titre') =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      {
        type: 'block',
        styles: [], // No heading styles for titles
        lists: [], // No lists for titles
        marks: {
          decorators: [
            { title: 'Gras', value: 'strong' },
            { title: 'Italique', value: 'em' }
          ],
          annotations: [] // No links for titles
        }
      }
    ],
    validation: (Rule) => Rule.required(),
  })

// Optional variant for non-required titles
export const portableTextTitleOptional = (name: string = 'title', title: string = 'Titre') =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      {
        type: 'block',
        styles: [],
        lists: [],
        marks: {
          decorators: [
            { title: 'Gras', value: 'strong' },
            { title: 'Italique', value: 'em' }
          ],
          annotations: []
        }
      }
    ],
  })