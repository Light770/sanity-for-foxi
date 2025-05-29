#!/bin/bash

echo "🚀 Converting JSON to NDJSON format..."
node convert-to-ndjson.js

echo ""
echo "📥 Importing data to Sanity..."
echo ""

echo "Importing image assets..."
sanity dataset import starter-data/imageAssets.ndjson private-config

echo "Importing site configuration..."
sanity dataset import starter-data/siteConfig.ndjson private-config --replace

echo "Importing features..."
sanity dataset import starter-data/features.ndjson private-config

echo "Importing FAQs..."
sanity dataset import starter-data/faq.ndjson private-config

echo "Importing pricing plans..."
sanity dataset import starter-data/pricingPlans.ndjson private-config

echo "Importing changelog..."
sanity dataset import starter-data/changelog.ndjson private-config

echo "Importing testimonials..."
sanity dataset import starter-data/testimonials.ndjson private-config

echo "Importing hero sections..."
sanity dataset import starter-data/heroes.ndjson private-config

echo "Importing CTAs..."
sanity dataset import starter-data/ctas.ndjson private-config

echo "Importing social proof..."
sanity dataset import starter-data/socialProof.ndjson private-config

echo "Importing blog posts..."
sanity dataset import starter-data/blogPosts.ndjson private-config

echo "Importing home page..."
sanity dataset import starter-data/home.ndjson private-config

echo ""
echo "✅ Import complete!"
echo "📝 Next steps:"
echo "1. Visit Sanity Studio to review imported content"
echo "2. Upload images for testimonials, changelog, heroes"
echo "3. Test your Astro site pages"