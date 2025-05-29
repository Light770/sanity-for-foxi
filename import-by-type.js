import {createClient} from '@sanity/client'
import fs from 'fs'
import path from 'path'

// Sanity client configuration
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'hg0e82hx',
  dataset: process.env.SANITY_DATASET || 'private-config',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01'
})

// Content type mappings
const contentTypeMap = {
  'blog': 'blogPosts.json',
  'changelog': 'changelog.json',
  'faq': 'faq.json',
  'feature': 'features.json',
  'featureCard': 'featureCards.json',
  'featureList': 'featureList.json',
  'pricingPlan': 'pricingPlans.json',
  'pricingPage': 'pricingPage.json',
  'testimonial': 'testimonials.json',
  'siteConfig': 'siteConfig.json',
  'hero': 'heroes.json',
  'cta': 'ctas.json',
  'socialProof': 'socialProof.json',
  'home': 'home.json'
}

// Import function for a specific content type
async function importContentType(contentType) {
  const filename = contentTypeMap[contentType]
  
  if (!filename) {
    console.error(`❌ Unknown content type: ${contentType}`)
    console.log(`Available types: ${Object.keys(contentTypeMap).join(', ')}`)
    return null
  }

  const filePath = path.join('./starter-data', filename)
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`)
    return null
  }

  console.log(`\n📥 Importing ${contentType} from ${filename}...`)
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    
    // Filter data to only include items of the specified type
    const filteredData = data.filter(item => item._type === contentType)
    
    if (filteredData.length === 0) {
      console.log(`⚠️  No items of type '${contentType}' found in ${filename}`)
      return []
    }

    // Delete existing documents of this type first (optional)
    if (process.argv.includes('--replace')) {
      console.log(`🗑️  Deleting existing ${contentType} documents...`)
      const deleteQuery = `*[_type == "${contentType}"]`
      const existingDocs = await client.fetch(deleteQuery)
      
      if (existingDocs.length > 0) {
        const deleteTransaction = client.transaction()
        existingDocs.forEach(doc => {
          deleteTransaction.delete(doc._id)
        })
        await deleteTransaction.commit()
        console.log(`✅ Deleted ${existingDocs.length} existing ${contentType} documents`)
      }
    }
    
    // Create a transaction for batch import
    const transaction = client.transaction()
    
    filteredData.forEach(item => {
      // Remove _id if it exists to let Sanity generate new ones
      const { _id, ...itemWithoutId } = item
      transaction.create(itemWithoutId)
    })
    
    const result = await transaction.commit()
    console.log(`✅ Successfully imported ${result.length} ${contentType} items`)
    
    return result
  } catch (error) {
    console.error(`❌ Error importing ${contentType}:`, error.message)
    if (error.statusCode === 401) {
      console.error('💡 Make sure SANITY_TOKEN is valid and has write permissions')
    }
    return null
  }
}

// List available content types
function listContentTypes() {
  console.log('\n📋 Available content types:')
  Object.keys(contentTypeMap).forEach(type => {
    const filename = contentTypeMap[type]
    const filePath = path.join('./starter-data', filename)
    const exists = fs.existsSync(filePath) ? '✅' : '❌'
    console.log(`  ${exists} ${type} (${filename})`)
  })
}

// Main function
async function main() {
  const args = process.argv.slice(2)
  
  if (args.length === 0 || args.includes('--help')) {
    console.log('🚀 Sanity Content Type Importer')
    console.log('\nUsage:')
    console.log('  node import-by-type.js <content-type> [--replace]')
    console.log('  node import-by-type.js --list')
    console.log('  node import-by-type.js --all [--replace]')
    console.log('\nOptions:')
    console.log('  --replace    Delete existing documents before importing')
    console.log('  --list       List available content types')
    console.log('  --all        Import all content types')
    console.log('\nExamples:')
    console.log('  node import-by-type.js faq')
    console.log('  node import-by-type.js feature --replace')
    console.log('  node import-by-type.js --all')
    return
  }

  if (!process.env.SANITY_TOKEN) {
    console.error('❌ SANITY_TOKEN environment variable is required')
    console.log('💡 Make sure you have a .env file with SANITY_TOKEN')
    process.exit(1)
  }

  console.log('🚀 Starting Sanity content import...')
  console.log(`📊 Project: ${process.env.SANITY_PROJECT_ID || 'hg0e82hx'}`)
  console.log(`📦 Dataset: ${process.env.SANITY_DATASET || 'private-config'}`)

  if (args.includes('--list')) {
    listContentTypes()
    return
  }

  if (args.includes('--all')) {
    console.log('\n📥 Importing all content types...')
    let totalImported = 0
    
    for (const contentType of Object.keys(contentTypeMap)) {
      const result = await importContentType(contentType)
      if (result) {
        totalImported += result.length
      }
      // Small delay between imports
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    console.log(`\n🎉 Import complete! Total documents imported: ${totalImported}`)
    return
  }

  // Import specific content type
  const contentType = args.find(arg => !arg.startsWith('--'))
  if (contentType) {
    const result = await importContentType(contentType)
    if (result) {
      console.log(`\n🎉 Import complete! Imported ${result.length} ${contentType} documents`)
    }
  } else {
    console.error('❌ Please specify a content type to import')
    console.log('Use --list to see available content types')
  }
}

// Run the import
main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})