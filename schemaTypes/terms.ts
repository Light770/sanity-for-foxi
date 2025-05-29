import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'terms',
  title: 'Page des conditions',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'array',
      of: [{type: 'block'}],
    }),
    // Ajouter d'autres champs spécifiques à la page des conditions ici
  ],
})