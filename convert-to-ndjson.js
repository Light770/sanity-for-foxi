import fs from 'fs'
import path from 'path'

// Convert JSON arrays to NDJSON format
function convertToNdjson(inputFile, outputFile) {
  try {
    const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'))
    
    // Convert array to NDJSON (one JSON object per line)
    const ndjsonData = data.map(item => JSON.stringify(item)).join('\n')
    
    fs.writeFileSync(outputFile, ndjsonData)
    console.log(`✅ Converted ${inputFile} to ${outputFile}`)
  } catch (error) {
    console.error(`❌ Error converting ${inputFile}:`, error.message)
  }
}

// List of files to convert
const files = [
  'features.json',
  'faq.json', 
  'pricingPlans.json',
  'changelog.json',
  'testimonials.json',
  'siteConfig.json',
  'heroes.json',
  'ctas.json',
  'socialProof.json',
  'blogPosts.json'
]

// Convert all files
console.log('Converting JSON files to NDJSON format...\n')

files.forEach(file => {
  const inputPath = `./starter-data/${file}`
  const outputPath = `./starter-data/${file.replace('.json', '.ndjson')}`
  convertToNdjson(inputPath, outputPath)
})

console.log('\n✨ All files converted! Now you can run:')
console.log('sanity dataset import starter-data/features.ndjson')
console.log('sanity dataset import starter-data/faq.ndjson')
console.log('# ... and so on for each file')