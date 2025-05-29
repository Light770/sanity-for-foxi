# Foxi Sanity Studio

Content management system for the Foxi Astro theme, providing a real-time content editing environment connected to the Sanity backend.

## Features

- **Page Management**: Home, FAQ, Features, Pricing pages
- **Content Components**: Heroes, CTAs, Features, Testimonials, Social Proof
- **Blog System**: Full blog management with tags and categories
- **Pricing System**: Complete pricing plans and page management
- **Multilingual**: French interface for better usability

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment**:
   Create a `.env` file with:
   ```
   SANITY_PROJECT_ID=hg0e82hx
   SANITY_DATASET=private-config
   SANITY_TOKEN=your_token_here
   ```

3. **Import starter data**:
   ```bash
   # Import all data
   node import-all-data.js
   
   # Or import pricing data specifically
   node import-pricing-data.js
   ```

4. **Start the studio**:
   ```bash
   npm run dev
   ```

## Pricing Integration

The pricing system includes:

- **Pricing Plans** (`pricingPlan`): Individual pricing plans with features, pricing, and buttons
- **Pricing Page** (`pricingPage`): Complete page management with component selection

### Pricing Page Features

The pricing page now supports:
- **Component Selection**: Choose which sections to display (Features, FAQ, etc.)
- **Content Management**: Manage SEO, headers, and testimonials from Sanity
- **Reference System**: Link to existing testimonials, CTAs, and social proof
- **Conditional Display**: Show/hide sections based on your needs

### Import Pricing Data

```bash
# Import pricing plans and page
node import-pricing-data.js

# Replace existing data
node import-pricing-data.js --replace

# Update existing pricing page with new fields
node update-pricing-page.js
```

### Studio Organization

- **Pages** → **Page Tarification**: Complete page management with component selection
- **Composants** → **Plans de tarification**: Individual pricing plans management

### Usage Guide

See `GUIDE-PAGE-TARIFICATION.md` for detailed instructions on using the pricing page management system.

## Resources

- [Read "getting started" in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)
