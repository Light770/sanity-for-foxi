import {createClient} from '@sanity/client'

// Sanity client configuration
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'hg0e82hx',
  dataset: process.env.SANITY_DATASET || 'private-config',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01'
})

async function updatePricingPage() {
  console.log('🔄 Mise à jour de la page de tarification...')
  
  if (!process.env.SANITY_TOKEN) {
    console.error('❌ SANITY_TOKEN environment variable is required')
    console.log('💡 Make sure you have a .env file with SANITY_TOKEN')
    process.exit(1)
  }

  try {
    // Vérifier si une page de tarification existe déjà
    const existingPage = await client.fetch('*[_type == "pricingPage"][0]')
    
    if (existingPage) {
      console.log('📄 Page de tarification existante trouvée')
      
      // Vérifier si elle a déjà les nouveaux champs
      if (existingPage.showFeatures !== undefined) {
        console.log('✅ La page de tarification est déjà à jour')
        return
      }
      
      // Mettre à jour avec les nouveaux champs
      console.log('🔄 Mise à jour des champs manquants...')
      await client
        .patch(existingPage._id)
        .set({
          showFeatures: true,
          testimonialBackgroundPosition: 'left',
          showFAQ: true,
          faqBackgroundClass: 'bg-slate-50 dark:bg-neutral-900/40'
        })
        .commit()
      
      console.log('✅ Page de tarification mise à jour avec succès')
    } else {
      console.log('📄 Aucune page de tarification trouvée, création d\'une nouvelle...')
      
      // Créer une nouvelle page de tarification
      const newPage = {
        _type: 'pricingPage',
        seo: {
          title: 'Foxi | Pricing made simple',
          description: 'Discover the perfect SaaS pricing plan for your business. From startups to enterprises, our scalable solutions offer unparalleled features and 24/7 support.'
        },
        header: {
          title: 'Choose the plan that works for <strong>your</strong> needs',
          text: 'All plans come with a 30-day money-back guarantee.'
        },
        showFeatures: true,
        testimonialBackgroundPosition: 'left',
        showFAQ: true,
        faqBackgroundClass: 'bg-slate-50 dark:bg-neutral-900/40'
      }
      
      await client.create(newPage)
      console.log('✅ Nouvelle page de tarification créée avec succès')
    }

    console.log('\n🎉 Mise à jour terminée!')
    console.log('\n📝 Prochaines étapes:')
    console.log('1. Visitez Sanity Studio → Pages → Page Tarification')
    console.log('2. Personnalisez les composants selon vos besoins')
    console.log('3. Testez la page de tarification sur votre site')
    
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error.message)
    if (error.statusCode === 401) {
      console.error('💡 Vérifiez que SANITY_TOKEN est valide et a les permissions d\'écriture')
    }
    process.exit(1)
  }
}

// Afficher l'aide si demandée
if (process.argv.includes('--help')) {
  console.log('🔄 Script de mise à jour de la page de tarification')
  console.log('\nUtilisation:')
  console.log('  node update-pricing-page.js')
  console.log('\nCe script va:')
  console.log('  1. Vérifier si une page de tarification existe')
  console.log('  2. Mettre à jour les champs manquants ou créer une nouvelle page')
  console.log('  3. Configurer les valeurs par défaut pour les nouveaux champs')
} else {
  updatePricingPage()
}