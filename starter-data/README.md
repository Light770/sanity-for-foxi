# Foxi Sanity Starter Data

This directory contains JSON files with starter content for the Foxi Astro theme's Sanity CMS integration. These files include all the original template data from the Foxi theme, structured for easy import into Sanity.

## 📁 Files Overview

| File | Content Type | Description |
|------|--------------|-------------|
| `features.json` | Features | 35+ features organized by category (Analytics, Productivity, Security, Support, Integrations) |
| `faq.json` | FAQs | 17 frequently asked questions across pricing, integrations, and features |
| `pricingPlans.json` | Pricing Plans | 3 pricing tiers (Basic, Team, Enterprise) with annual/monthly options |
| `changelog.json` | Changelog Entries | 6 version update entries with release dates and descriptions |
| `testimonials.json` | Testimonials | 5 customer testimonials with ratings and company info |
| `siteConfig.json` | Site Configuration | Global site settings, SEO, and social links |
| `heroes.json` | Hero Sections | Page-specific hero content for home, contact, features, pricing |
| `ctas.json` | Call-to-Actions | 4 CTA variants for different pages and themes |
| `blogPosts.json` | Blog Posts | 3 sample blog posts with Portable Text content |

## 🚀 How to Import Data

### Method 1: One-Click Import (Recommended)

The easiest way to import all starter data:

**Windows:**
```bash
# Run the batch file
./import-starter-data.bat
```

**Mac/Linux:**
```bash
# Run the shell script  
./import-starter-data.sh
```

This will:
1. Convert JSON files to NDJSON format
2. Import all data to your Sanity dataset
3. Show progress and completion status

### Method 2: Manual CLI Import

1. **Convert to NDJSON format**:
   ```bash
   node convert-to-ndjson.js
   ```

2. **Import individual files**:
   ```bash
   sanity dataset import starter-data/features.ndjson private-config
   sanity dataset import starter-data/faq.ndjson private-config
   sanity dataset import starter-data/pricingPlans.ndjson private-config
   sanity dataset import starter-data/changelog.ndjson private-config
   sanity dataset import starter-data/testimonials.ndjson private-config
   sanity dataset import starter-data/heroes.ndjson private-config
   sanity dataset import starter-data/ctas.ndjson private-config
   sanity dataset import starter-data/blogPosts.ndjson private-config
   ```

### Method 3: Programmatic Import

1. **Get Write Token** from https://sanity.io/manage

2. **Run with token**:
   ```bash
   SANITY_TOKEN=your_token_here node import-all-data.js
   ```

### Method 4: Manual Studio Import

1. **Start Sanity Studio**:
   ```bash
   npm run dev
   ```

2. **Access Studio**: Open http://localhost:3333

3. **Create Documents**: For each content type:
   - Click "+" to create new document
   - Select the content type (Feature, FAQ, etc.)
   - Copy/paste data from JSON files
   - Publish

## 📝 Data Structure Notes

### Features
- **Categories**: Analytics, Productivity, Security, Support, Integrations
- **Icons**: All use Heroicons icon names
- **Order**: Each category has ordered items for consistent display

### FAQ
- **Categories**: pricing, integrations, features
- **Open State**: Some items default to expanded view
- **Ordering**: Numbered for each category

### Pricing Plans
- **Types**: Basic (order 1), Team (order 2, featured), Enterprise (order 3)
- **Pricing**: Both annual and monthly rates included
- **Features**: List of included features per plan

### Blog Posts
- **Content**: Basic Portable Text structure included
- **Expandable**: Add more rich content through Sanity Studio
- **Tags**: Organized by topic (getting-started, collaboration, security)

## 🔧 Environment Setup

### Local Development
Make sure your `.env` files have:

**Astro project** (`foxi-astro-theme/.env`):
```env
SANITY_PROJECT_ID=hg0e82hx
SANITY_DATASET=private-config
```

**Sanity Studio** (`studio-foxi-sanity/.env`):
```env
SANITY_PROJECT_ID=hg0e82hx
SANITY_DATASET=private-config
SANITY_TOKEN=your_token_here
```

### Netlify Deployment
Add these environment variables in your Netlify dashboard:
- `SANITY_PROJECT_ID=hg0e82hx`
- `SANITY_DATASET=private-config`
- `SANITY_TOKEN=your_token_here`

## ✅ Post-Import Checklist

After importing the data:

1. **Test Pages**: Visit `/features`, `/faq`, `/pricing`, `/changelog` to verify content loads
2. **Blog Content**: Expand blog post content in Sanity Studio with rich text
3. **Images**: Upload and assign images for:
   - Testimonial avatars
   - Changelog feature images
   - Hero section images
   - Site logo and OG image
4. **Customize**: Update content to match your brand and requirements

## 🎨 Customization Tips

- **Features**: Add new categories or modify existing ones
- **Pricing**: Adjust pricing, features, and plan types
- **Testimonials**: Replace with real customer testimonials
- **Blog**: Expand content with rich formatting, images, and links
- **Branding**: Update site configuration with your brand details

This starter data provides a solid foundation for your Foxi-powered website with all content manageable through Sanity Studio!