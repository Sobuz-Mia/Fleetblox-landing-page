import React from 'react';
import { NextSeo } from 'next-seo';
import { buildSchemaData, renderSchemaMarkup } from '@/utils/schema';

interface BlogSeoProps {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  authorName?: string;
}

const BlogSeo: React.FC<BlogSeoProps> = ({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  authorName = 'FleetBlox Team',
}) => {
  const blogSchema = buildSchemaData({
    type: 'BlogPosting',
    title,
    description,
    url,
    imageUrl,
    datePublished,
    authorName,
  });

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          type: 'article',
          article: {
            publishedTime: datePublished,
            authors: [authorName],
          },
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }}
        twitter={{
          handle: '@fleetblox',
          site: '@fleetblox',
          cardType: 'summary_large_image',
        }}
      />
      {renderSchemaMarkup(blogSchema)}
    </>
  );
};

export default BlogSeo;
