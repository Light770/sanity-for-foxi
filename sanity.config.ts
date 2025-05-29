import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {importTool} from './plugins/import-tool'
import {jsonImportTool} from './plugins/json-import-tool'

export default defineConfig({
  name: 'default',
  title: 'Foxi-Sanity',

  projectId: 'hg0e82hx',
  dataset: 'private-config',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem()
              .title('Accueil')
              .child(
                S.document()
                  .schemaType('home')
                  .documentId('home') // Assuming 'home' is a singleton document
              ),
            S.divider(),
            S.listItem()
              .title('Pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    S.documentTypeListItem('changelog').title('Journal des modifications'),
                    S.documentTypeListItem('faqPage').title('Page FAQ'),
                    S.documentTypeListItem('featuresPage').title('Fonctionnalités'),
                    S.listItem()
                      .title('Page Tarification')
                      .child(
                        S.document()
                          .schemaType('pricingPage')
                          .documentId('pricingPage')
                      ),
                    S.documentTypeListItem('terms').title('Conditions'),
                    S.documentTypeListItem('contact').title('Contact'),
                  ])
              ),
S.listItem()
.title('Création de contenu')
              .child(
                S.list()
                  .title('Création de contenu')
                  .items([
                    S.documentTypeListItem('blog').title('Article de blog'),
                  ])
              ),
            S.listItem()
              .title('Composants')
              .child(
                S.list()
                  .title('Composants')
                  .items([
                    S.documentTypeListItem('hero').title('Héros'),
                    S.documentTypeListItem('feature').title('Fonctionnalités'),
                    S.documentTypeListItem('featureCard').title('Cartes de fonctionnalités'),
                    S.documentTypeListItem('featureList').title('Listes de fonctionnalités'),
                    S.documentTypeListItem('faq').title('FAQ'),
                    S.documentTypeListItem('pricingPlan').title('Plans de tarification'),
                    S.documentTypeListItem('testimonial').title('Témoignage'),
                    S.documentTypeListItem('highlightBlock').title('Blocs de mise en évidence'),
                    S.documentTypeListItem('cta').title('Appel à l\'action'),
                    S.documentTypeListItem('socialProof').title('Preuve sociale'),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title('Configuration')
              .child(
                S.document()
                  .schemaType('siteConfig')
                  .documentId('siteConfig') // Assuming 'siteConfig' is a singleton document
              ),
            // Add a catch-all for documents that haven't been explicitly placed
            ...S.documentTypeListItems().filter(listItem => ![
              'home',
              'changelog',
              'faq',
              'pricingPlan',
              'pricingPage',
              'terms',
              'contact',
              'blog',
              'hero',
              'feature',
              'featureCard',
              'featureList',
              'testimonial',
              'highlightBlock',
              'cta',
              'socialProof',
              'siteConfig',
              'featuresPage',
              'faqPage',
            ].includes(listItem.getId() as string)) // Cast to string after confirming it's not undefined
          ])
    }),
    visionTool(),
    importTool,
    jsonImportTool
  ],

  schema: {
    types: schemaTypes,
  },
})
