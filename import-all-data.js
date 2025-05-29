import {createClient} from '@sanity/client'
import fs from 'fs'

// Sanity client configuration - uses environment variables from Netlify or local .env
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'hg0e82hx',
  dataset: process.env.SANITY_DATASET || 'private-config',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01'
})

// Import function for a single file
async function importData(filename) {
  console.log(`\n📥 Importing ${filename}...`)
  
  try {
    const data = JSON.parse(fs.readFileSync(`./starter-data/${filename}`, 'utf8'))
    
    // Create a transaction for batch import
    const transaction = client.transaction()
    
    data.forEach(item => {
      transaction.create(item)
    })
    
    const result = await transaction.commit()
    console.log(`✅ Successfully imported ${result.length} items from ${filename}`)
    
    return result
  } catch (error) {
    console.error(`❌ Error importing ${filename}:`, error.message)
    if (error.statusCode === 401) {
      console.error('💡 Make sure SANITY_TOKEN is valid and has write permissions')
    }
    return null
  }
}

// Import all data files
async function importAll() {
  console.log('🚀 Starting Foxi data import to Sanity...')
  console.log(`📊 Project: ${process.env.SANITY_PROJECT_ID}`)
  console.log(`📦 Dataset: ${process.env.SANITY_DATASET}`)
  
  if (!process.env.SANITY_TOKEN) {
    console.error('❌ SANITY_TOKEN environment variable is required')
    console.log('💡 Make sure you have a .env file with SANITY_TOKEN')
    process.exit(1)
  }
  
  const files = [
    'siteConfig.json',    // Import site config first
    'features.json',
    'featureList.json',
    'faq.json',
    'pricingPlans.json',
    'pricingPage.json',   // Import pricing page
    'changelog.json',
    'testimonials.json',
    'heroes.json',
    'ctas.json',
    'socialProof.json',
    'home.json',          // Import home page
    'blogPosts.json'
  ]
  
  let totalImported = 0
  
  for (const file of files) {
    const result = await importData(file)
    if (result) {
      totalImported += result.length
    }
    
    // Small delay between imports
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  console.log(`\n🎉 Import complete! Total documents imported: ${totalImported}`)
  console.log('\n📝 Next steps:')
  console.log('1. Visit Sanity Studio to review imported content')
  console.log('2. Upload images for testimonials, changelog, heroes')
  console.log('3. Test your Astro site pages: /features, /faq, /pricing, /changelog')
}

// Run the import
importAll().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})