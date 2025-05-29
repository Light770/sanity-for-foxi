import {createClient} from '@sanity/client'
import fs from 'fs'

// Sanity client configuration
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'hg0e82hx',
  dataset: process.env.SANITY_DATASET || 'private-config',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01'
})

async function importPricingData() {
  console.log('🚀 Importing pricing data to Sanity...')
  
  if (!process.env.SANITY_TOKEN) {
    console.error('❌ SANITY_TOKEN environment variable is required')
    console.log('💡 Make sure you have a .env file with SANITY_TOKEN')
    process.exit(1)
  }

  try {
    // Import pricing plans
    console.log('\n📋 Importing pricing plans...')
    const pricingPlansData = JSON.parse(fs.readFileSync('./starter-data/pricingPlans.json', 'utf8'))
    
    // Delete existing pricing plans if --replace flag is used
    if (process.argv.includes('--replace')) {
      console.log('🗑️  Deleting existing pricing plans...')
      const existingPlans = await client.fetch('*[_type == "pricingPlan"]')
      if (existingPlans.length > 0) {
        const deleteTransaction = client.transaction()
        existingPlans.forEach(plan => {
          deleteTransaction.delete(plan._id)
        })
        await deleteTransaction.commit()
        console.log(`✅ Deleted ${existingPlans.length} existing pricing plans`)
      }
    }
    
    // Create pricing plans
    const plansTransaction = client.transaction()
    pricingPlansData.forEach(plan => {
      const { _id, ...planWithoutId } = plan
      plansTransaction.create(planWithoutId)
    })
    
    const plansResult = await plansTransaction.commit()
    console.log(`✅ Successfully imported ${plansResult.length} pricing plans`)

    // Import pricing page
    console.log('\n📄 Importing pricing page...')
    const pricingPageData = JSON.parse(fs.readFileSync('./starter-data/pricingPage.json', 'utf8'))
    
    // Delete existing pricing page if --replace flag is used
    if (process.argv.includes('--replace')) {
      console.log('🗑️  Deleting existing pricing page...')
      const existingPage = await client.fetch('*[_type == "pricingPage"]')
      if (existingPage.length > 0) {
        const deleteTransaction = client.transaction()
        existingPage.forEach(page => {
          deleteTransaction.delete(page._id)
        })
        await deleteTransaction.commit()
        console.log(`✅ Deleted ${existingPage.length} existing pricing page`)
      }
    }
    
    // Create pricing page
    const pageTransaction = client.transaction()
    pricingPageData.forEach(page => {
      const { _id, ...pageWithoutId } = page
      pageTransaction.create(pageWithoutId)
    })
    
    const pageResult = await pageTransaction.commit()
    console.log(`✅ Successfully imported ${pageResult.length} pricing page`)

    console.log('\n🎉 Pricing data import complete!')
    console.log('\n📝 Next steps:')
    console.log('1. Visit Sanity Studio to review imported pricing content')
    console.log('2. Test your pricing page at /pricing')
    console.log('3. Verify that only Sanity pricing plans are displayed')
    
  } catch (error) {
    console.error('❌ Error importing pricing data:', error.message)
    if (error.statusCode === 401) {
      console.error('💡 Make sure SANITY_TOKEN is valid and has write permissions')
    }
    process.exit(1)
  }
}

// Show usage if no arguments
if (process.argv.includes('--help')) {
  console.log('🚀 Sanity Pricing Data Importer')
  console.log('\nUsage:')
  console.log('  node import-pricing-data.js [--replace]')
  console.log('\nOptions:')
  console.log('  --replace    Delete existing pricing data before importing')
  console.log('  --help       Show this help message')
  console.log('\nExamples:')
  console.log('  node import-pricing-data.js')
  console.log('  node import-pricing-data.js --replace')
} else {
  importPricingData()
}