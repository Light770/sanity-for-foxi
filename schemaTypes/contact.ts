import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Page de contact',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'form',
      title: 'Formulaire de contact',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'En-tête',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        // Add other contact form fields here
      ]
    }),
    // Add other fields specific to the Contact page here
  ],
})