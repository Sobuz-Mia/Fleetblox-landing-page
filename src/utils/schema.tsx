import { faqData } from '@/Static_data/data';

interface SchemaBuilderOptions {
  type: 'WebSite' | 'Organization' | 'Product' | 'FAQPage' | 'BlogPosting';
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  datePublished?: string;
  authorName?: string;
}

export const buildSchemaData = (options: SchemaBuilderOptions) => {
  const {
    type,
    title = 'FleetBlox - Advanced AI-Powered Fleet Management Solution',
    description = 'FleetBlox is an advanced AI-powered, cloud-based fleet connectivity solution that eliminates the need for traditional hardware.',
    url = 'https://fleetblox.site',
    imageUrl = 'https://fleetblox.site/brand/Frame%201707481662.png',
    datePublished,
    authorName,
  } = options;

  // Base schema structure
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'WebSite':
      return {
        ...baseSchema,
        name: title,
        url,
        description,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${url}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      };

    case 'Organization':
      return {
        ...baseSchema,
        name: 'FleetBlox',
        url,
        logo: imageUrl,
        description,
        sameAs: [
          'https://twitter.com/fleetblox',
          'https://www.linkedin.com/company/fleetblox',
          'https://www.facebook.com/fleetblox',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-800-FLEETBLOX',
          contactType: 'customer service',
          availableLanguage: ['English'],
        },
      };

    case 'Product':
      return {
        ...baseSchema,
        name: title,
        description,
        image: imageUrl,
        brand: {
          '@type': 'Brand',
          name: 'FleetBlox',
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: '0',
          availability: 'https://schema.org/ComingSoon',
          seller: {
            '@type': 'Organization',
            name: 'FleetBlox',
          },
        },
      };

    case 'FAQPage':
      return {
        ...baseSchema,
        mainEntity: faqData.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      };

    case 'BlogPosting':
      return {
        ...baseSchema,
        headline: title,
        description,
        image: imageUrl,
        datePublished: datePublished || new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: authorName || 'FleetBlox Team',
        },
        publisher: {
          '@type': 'Organization',
          name: 'FleetBlox',
          logo: {
            '@type': 'ImageObject',
            url: 'https://fleetblox.site/brand/Frame%201707481662.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
      };

    default:
      return baseSchema;
  }
};

export const renderSchemaMarkup = (schema: Record<string, unknown>) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
