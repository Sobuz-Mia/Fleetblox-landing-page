# Schema.org Implementation Guide for FleetBlox

This guide explains how to use the Schema.org structured data components in the FleetBlox website.

## What is Schema.org?

Schema.org is a collaborative, community activity with a mission to create, maintain, and promote schemas for structured data on the Internet, on web pages, in email messages, and beyond. Search engines like Google, Bing, Yahoo, and Yandex use this data to better understand the content of your site and improve search results.

## Available Components

### 1. PageSeo

`PageSeo` is a universal component for adding Schema.org structured data to any page.

```tsx
import PageSeo from '@/components/seo/PageSeo';

<PageSeo 
  title="FleetBlox - Fleet Management Solution"
  description="An advanced AI-powered, cloud-based fleet connectivity solution."
  url="https://fleetblox.site/solutions"
  imageUrl="https://fleetblox.site/brand/Frame%201707481662.png"
  type="WebSite"
  includeOrganization={true}
  includeFaq={false}
/>
```

### 2. BlogSeo

`BlogSeo` is specifically designed for blog posts.

```tsx
import BlogSeo from '@/components/seo/BlogSeo';

<BlogSeo 
  title="How to Build a Winning Fleet Safety Program in 2025"
  description="Learn how to create an effective fleet safety program..."
  url="https://fleetblox.site/blog/fleet-safety-program"
  imageUrl="https://fleetblox.site/blog-image.jpg"
  datePublished="2025-05-12T00:00:00Z"
  authorName="FleetBlox Team"
/>
```

### 3. Utility Functions

You can also use the utility functions directly:

```tsx
import { buildSchemaData, renderSchemaMarkup } from '@/utils/schema';

// In your component
const websiteSchema = buildSchemaData({
  type: 'WebSite',
  title: 'Your Page Title',
  description: 'Your page description',
  url: 'https://fleetblox.site/your-page'
});

return (
  <>
    {/* Your page content */}
    {renderSchemaMarkup(websiteSchema)}
  </>
);
```

## Supported Schema Types

1. **WebSite** - General website information
2. **Organization** - Information about FleetBlox as an organization
3. **Product** - Information about FleetBlox as a product
4. **FAQPage** - FAQ information (automatically pulls from data.ts)
5. **BlogPosting** - Blog post information

## Testing Your Schema

After implementing Schema.org markup, you can test it using:

1. [Google's Rich Results Test](https://search.google.com/test/rich-results)
2. [Schema.org Validator](https://validator.schema.org/)

## Best Practices

1. Always include the most relevant Schema.org markup for each page
2. For the homepage, include WebSite, Organization, Product, and FAQPage schemas
3. For blog posts, use the BlogSeo component
4. For other pages, use the PageSeo component with appropriate type
5. Keep title and description accurate and relevant to the page content
6. Always provide absolute URLs for the url and imageUrl properties

## Examples

### Homepage

```tsx
{renderSchemaMarkup(
  buildSchemaData({
    type: 'WebSite',
    url: 'https://fleetblox.site',
    title: 'FleetBlox - Advanced AI-Powered Fleet Management Solution',
    description: 'FleetBlox is an advanced AI-powered, cloud-based fleet connectivity solution...'
  })
)}
{renderSchemaMarkup(
  buildSchemaData({
    type: 'Organization',
    url: 'https://fleetblox.site'
  })
)}
{renderSchemaMarkup(
  buildSchemaData({
    type: 'Product',
    title: 'FleetBlox Fleet Management Solution',
    url: 'https://fleetblox.site'
  })
)}
{renderSchemaMarkup(
  buildSchemaData({
    type: 'FAQPage',
    url: 'https://fleetblox.site'
  })
)}
```

### Solution Page

```tsx
<PageSeo 
  title="Remote Inspection Solution - FleetBlox"
  description="Optimize fleet operations with AI-powered remote inspection solutions."
  url="https://fleetblox.site/solutions/remote-inspection"
  type="WebSite"
  includeOrganization={true}
/>
```

### Blog Post

```tsx
<BlogSeo 
  title="Fleet Maintenance Management: Solving Today's Challenges"
  description="Learn how to solve today's fleet maintenance challenges..."
  url="https://fleetblox.site/blog/fleet-maintenance-management"
  imageUrl="https://fleetblox.site/blog-image.jpg"
  datePublished="2023-11-23T00:00:00Z"
/>
```
