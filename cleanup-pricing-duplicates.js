import {createClient} from '@sanity/client'

// Sanity client configuration
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'hg0e82hx',
  dataset: process.env.SANITY_DATASET || 'private-config',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01'
})

async function cleanupDuplicates() {
  console.log('🧹 Cleaning up duplicate pricing plans...')
  
  if (!process.env.SANITY_TOKEN) {
    console.error('❌ SANITY_TOKEN environment variable is required')
    console.log('💡 Make sure you have a .env file with SANITY_TOKEN')
    process.exit(1)
  }

  try {
    // Fetch all pricing plans
    const allPlans = await client.fetch('*[_type == "pricingPlan"] | order(_createdAt asc)')
    console.log(`📋 Found ${allPlans.length} pricing plans total`)

    if (allPlans.length === 0) {
      console.log('✅ No pricing plans found - nothing to clean up')
      return
    }

    // Group by title to find duplicates
    const plansByTitle = {}
    allPlans.forEach(plan => {
      if (!plansByTitle[plan.title]) {
        plansByTitle[plan.title] = []
      }
      plansByTitle[plan.title].push(plan)
    })

    // Find duplicates and keep only the first one (oldest)
    const toDelete = []
    Object.keys(plansByTitle).forEach(title => {
      const plans = plansByTitle[title]
      if (plans.length > 1) {
        console.log(`🔍 Found ${plans.length} duplicates for "${title}"`)
        // Keep the first one, mark others for deletion
        const duplicates = plans.slice(1)
        toDelete.push(...duplicates)
      }
    })

    if (toDelete.length === 0) {
      console.log('✅ No duplicates found - all pricing plans are unique')
      return
    }

    console.log(`🗑️  Deleting ${toDelete.length} duplicate pricing plans...`)
    
    // Delete duplicates
    const deleteTransaction = client.transaction()
    toDelete.forEach(plan => {
      console.log(`   - Deleting duplicate "${plan.title}" (${plan._id})`)
      deleteTransaction.delete(plan._id)
    })
    
    await deleteTransaction.commit()
    console.log(`✅ Successfully deleted ${toDelete.length} duplicate pricing plans`)

    // Show final count
    const finalPlans = await client.fetch('*[_type == "pricingPlan"] | order(order asc)')
    console.log(`📊 Final count: ${finalPlans.length} unique pricing plans`)
    finalPlans.forEach((plan, index) => {
      console.log(`   ${index + 1}. ${plan.title} (Order: ${plan.order || 'N/A'})`)
    })

  } catch (error) {
    console.error('❌ Error cleaning up duplicates:', error.message)
    if (error.statusCode === 401) {
      console.error('💡 Make sure SANITY_TOKEN is valid and has write permissions')
    }
    process.exit(1)
  }
}

// Show usage if help requested
if (process.argv.includes('--help')) {
  console.log('🧹 Sanity Pricing Plans Duplicate Cleaner')
  console.log('\nUsage:')
  console.log('  node cleanup-pricing-duplicates.js')
  console.log('\nThis script will:')
  console.log('  1. Find all pricing plans with the same title')
  console.log('  2. Keep the oldest one (first created)')
  console.log('  3. Delete all duplicates')
  console.log('\nNote: This operation cannot be undone!')
} else {
  cleanupDuplicates()
}