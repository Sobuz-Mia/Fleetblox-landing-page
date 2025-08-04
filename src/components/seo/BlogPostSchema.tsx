import Script from "next/script";
import React from "react";

interface BlogPostSchemaProps {
  url: string;
  title: string;
  description: string;
  imageUrl: string;
  datePublished: string;
  authorName?: string;
}

const BlogPostSchema: React.FC<BlogPostSchemaProps> = ({
  url,
  title,
  description,
  imageUrl,
  datePublished,
  authorName = "FleetBlox Team",
}) => {
  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "FleetBlox",
      logo: {
        "@type": "ImageObject",
        url: "https://fleetblox.site/brand/Frame%201707481662.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <Script
      id="blog-post-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(blogPostSchema),
      }}
    />
  );
};

export default BlogPostSchema;
