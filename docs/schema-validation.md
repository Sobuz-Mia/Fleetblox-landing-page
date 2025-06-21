# Schema.org Implementation

This guide will help you verify that Schema.org structured data is properly implemented on your site.

## Testing Tools

1. **Google Rich Results Test**:
   - Visit [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Enter the URL of your website
   - Check if Google can detect and validate your schema implementation

2. **Schema.org Markup Validator**:
   - Visit [Schema.org Validator](https://validator.schema.org/)
   - Enter the URL of your website
   - Verify that your schema implementation meets Schema.org specifications

## What We've Implemented

We've implemented the following Schema.org structured data types:

1. **WebSite**: Basic information about your website
2. **Organization**: Information about FleetBlox as a company
3. **Product**: Information about your fleet management solutions
4. **FAQPage**: Structured data for frequently asked questions
5. **BreadcrumbList**: Navigation breadcrumbs for improved SEO

## Implementation Approach

Schema.org structured data is implemented using the following components:

- `/src/components/seo/GlobalSchema.tsx`: Central component that renders all schema data
- `/src/utils/schema.tsx`: Utility functions for building schema structures

The schema is injected into the page using Next.js's layout system, ensuring it's present on all pages.

## Manual Validation

To ensure schema.org markup is being correctly inserted into your pages:

1. Visit your website in a browser
2. Right-click and select "View Page Source"
3. Search for `application/ld+json` to find schema markup
4. Verify that the expected schema types are present

## Validation Script

We've included a validation script that you can run to check schema implementation:

```bash
npm run validate-schema
```

This script will check the schema implementation on key pages and report the results.

## Best Practices

- Keep schema data accurate and up-to-date
- Include only relevant schema types for each page
- Use specific schema types rather than generic ones
- Test schema implementation regularly to ensure it remains valid
