import { NextSeo } from 'next-seo';
import React from 'react';

interface SchemaMarkupProps {
  url?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  type?: 'WebSite' | 'Organization' | 'Product';
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({
  url = 'https://fleetblox.site',
  title = 'FleetBlox - Advanced AI-Powered Fleet Management Solution',
  description = 'FleetBlox is an advanced AI-powered, cloud-based fleet connectivity solution that eliminates the need for traditional hardware, reducing operational costs and optimizing fleet performance.',
  imageUrl = 'https://fleetblox.site/brand/Frame%201707481662.png',
  type = 'WebSite',
}) => {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    url,
    name: title,
    description,
    ...(imageUrl && { image: imageUrl }),
  };

  // Extended schema based on type
  let schema;

  switch (type) {
    case 'Organization':
      schema = {
        ...baseSchema,
        logo: imageUrl,
        sameAs: [
          // Add your social media profiles here
          'https://twitter.com/fleetblox',
          'https://www.linkedin.com/company/fleetblox',
          'https://www.facebook.com/fleetblox',
        ],
      };
      break;
    case 'Product':
      schema = {
        ...baseSchema,
        brand: {
          '@type': 'Brand',
          name: 'FleetBlox',
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/ComingSoon',
        },
      };
      break;
    default:
      schema = baseSchema;
      break;
  }

  return (
    <>
      <NextSeo
        additionalMetaTags={[
          {
            name: 'application-name',
            content: 'FleetBlox',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/Favicon.png',
          },
        ]}
        title={title}
        description={description}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url,
          title,
          description,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: 'FleetBlox',
            },
          ],
          site_name: 'FleetBlox',
        }}
        twitter={{
          handle: '@fleetblox',
          site: '@fleetblox',
          cardType: 'summary_large_image',
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );

  return (
    <NextSeo
      additionalMetaTags={[
        {
          name: 'application-name',
          content: 'FleetBlox',
        },
      ]}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/Favicon.png',
        },
      ]}
      title={title}
      description={description}
      openGraph={{
        type: 'website',
        locale: 'en_US',
        url,
        title,
        description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: 'FleetBlox',
          },
        ],
        site_name: 'FleetBlox',
      }}
      twitter={{
        handle: '@fleetblox',
        site: '@fleetblox',
        cardType: 'summary_large_image',
      }}
    />
  );
};

export default SchemaMarkup;
