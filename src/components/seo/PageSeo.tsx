import React from 'react';
import { NextSeo } from 'next-seo';
import { buildSchemaData, renderSchemaMarkup } from '@/utils/schema';

interface PageSeoProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  type?: 'WebSite' | 'Organization' | 'Product' | 'FAQPage';
  includeOrganization?: boolean;
  includeFaq?: boolean;
}

const PageSeo: React.FC<PageSeoProps> = ({
  title,
  description,
  url,
  imageUrl = 'https://fleetblox.site/brand/Frame%201707481662.png',
  type = 'WebSite',
  includeOrganization = false,
  includeFaq = false,
}) => {
  const pageSchema = buildSchemaData({
    type,
    title,
    description,
    url,
    imageUrl,
  });
  
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          type: 'website',
          url,
          title,
          description,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
          siteName: 'FleetBlox',
        }}
        twitter={{
          handle: '@fleetblox',
          site: '@fleetblox',
          cardType: 'summary_large_image',
        }}
      />
      
      {renderSchemaMarkup(pageSchema)}
      
      {includeOrganization && 
        renderSchemaMarkup(
          buildSchemaData({
            type: 'Organization',
            url,
          })
        )
      }
      
      {includeFaq && 
        renderSchemaMarkup(
          buildSchemaData({
            type: 'FAQPage',
            url,
          })
        )
      }
    </>
  );
};

export default PageSeo;
