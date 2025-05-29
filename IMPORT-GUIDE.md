# JSON Import Guide for Foxi Sanity Studio

This guide explains how to import JSON data into your Sanity dataset using the built-in import tools.

## Available Import Methods

### 1. Studio Interface (Recommended)
- Open Sanity Studio
- Navigate to the "Import Data" tool in the sidebar (📥 icon)
- Select content type and import options
- Follow the displayed terminal commands

### 2. Command Line Interface

#### Import All Content Types
```bash
# Import all content types
npm run import-data

# Import all with replacement
npm run import-type --all --replace
```

#### Import Specific Content Types
```bash
# Individual content type imports
npm run import-faq
npm run import-features
npm run import-blog
npm run import-testimonials
npm run import-heroes
npm run import-ctas
npm run import-pricing
npm run import-changelog
npm run import-social-proof
npm run import-site-config
npm run import-home

# Generic import with options
npm run import-type <content-type> [--replace]
```

#### List Available Content Types
```bash
npm run list-types
```

## Content Type Mappings

| Content Type | JSON File | Description |
|--------------|-----------|-------------|
| `blog` | `blogPosts.json` | Blog posts and articles |
| `changelog` | `changelog.json` | Product changelog entries |
| `faq` | `faq.json` | Frequently asked questions |
| `feature` | `features.json` | Product features |
| `pricingPlan` | `pricingPlans.json` | Pricing plans and tiers |
| `testimonial` | `testimonials.json` | Customer testimonials |
| `siteConfig` | `siteConfig.json` | Site configuration |
| `hero` | `heroes.json` | Hero sections |
| `cta` | `ctas.json` | Call-to-action sections |
| `socialProof` | `socialProof.json` | Social proof elements |
| `home` | `home.json` | Home page configuration |

## Environment Setup

Make sure you have the following environment variables set in your `.env` file:

```env
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=your-dataset-name
SANITY_TOKEN=your-write-token
```

## Import Options

### Replace Existing Data
Use the `--replace` flag to delete existing documents before importing:

```bash
npm run import-type faq --replace
```

⚠️ **Warning**: This will permanently delete existing data of the specified type.

### Selective Import
The import system automatically filters data by `_type` field, so you can safely run imports without worrying about importing wrong content types.

## Examples

### Import FAQ Data
```bash
# Import FAQ items (adds to existing)
npm run import-faq

# Replace all FAQ items
npm run import-type faq --replace
```

### Import Features
```bash
# Import feature items
npm run import-features

# Import with replacement
npm run import-type feature --replace
```

### Import Everything
```bash
# Import all content types (safe, adds to existing)
npm run import-data

# Import all with replacement (dangerous!)
npm run import-type --all --replace
```

## Troubleshooting

### Common Issues

1. **Authentication Error (401)**
   - Check your `SANITY_TOKEN` in `.env`
   - Ensure the token has write permissions
   - Verify project ID and dataset name

2. **File Not Found**
   - Ensure JSON files exist in `./starter-data/` directory
   - Check file names match the content type mappings

3. **Import Fails**
   - Verify JSON structure matches schema requirements
   - Check for required fields in your schema
   - Ensure `_type` field matches content type

### Getting Help

- Use `npm run list-types` to see available content types
- Check the Studio "Import Data" tool for guided instructions
- Review JSON files in `./starter-data/` for proper structure

## JSON File Structure

Each JSON file should contain an array of objects with the following structure:

```json
[
  {
    "_type": "contentType",
    "field1": "value1",
    "field2": "value2",
    // ... other fields
  }
]
```

The `_type` field is crucial as it determines which Sanity schema the document will use.