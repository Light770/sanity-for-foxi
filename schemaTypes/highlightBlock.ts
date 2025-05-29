import {defineField, defineType} from 'sanity'
import {portableTextTitleOptional} from './shared/portableTextTitle'

export default defineType({
  name: 'highlightBlock',
  title: 'Bloc de mise en évidence',
  type: 'object', // On suppose qu'il s'agit d'un bloc réutilisable, pas d'un document complet
  fields: [
    portableTextTitleOptional('heading', 'En-tête'),
    defineField({
      name: 'text',
      title: 'Texte',
      type: 'text',
    }),
    // Ajouter d'autres champs spécifiques au bloc de mise en évidence ici
  ],
})