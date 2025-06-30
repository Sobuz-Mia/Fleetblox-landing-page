import { NextSeo } from "next-seo";
import Script from "next/script";
import React from "react";

interface SchemaMarkupProps {
  url?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  type?: "WebSite" | "Organization" | "Product";
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({
  url = "https://fleetblox.site",
  title = "FleetBlox - Advanced AI-Powered Fleet Management Solution",
  description = "FleetBlox is an advanced AI-powered, cloud-based fleet connectivity solution that eliminates the need for traditional hardware, reducing operational costs and optimizing fleet performance.",
  imageUrl = "https://fleetblox.site/brand/Frame%201707481662.png",
  type = "WebSite",
  keywords = [
    "fleet management",
    "AI-powered",
    "cloud-based",
    "telematics",
    "vehicle tracking",
    "fleet optimization",
  ],
  author = "FleetBlox Team",
  publishedTime,
  modifiedTime,
}) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
    url,
    name: title,
    description,
    ...(imageUrl && { image: imageUrl }),
    ...(publishedTime && { datePublished: publishedTime }),
    ...(modifiedTime && { dateModified: modifiedTime }),
  };

  // Extended schema based on type
  let schema;

  switch (type) {
    case "Organization":
      schema = {
        ...baseSchema,
        logo: imageUrl,
        sameAs: [
          "https://twitter.com/fleetblox",
          "https://www.linkedin.com/company/fleetblox",
          "https://www.facebook.com/fleetblox",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-800-FLEETBLOX",
          contactType: "customer service",
          availableLanguage: ["English"],
        },
      };
      break;
    case "Product":
      schema = {
        ...baseSchema,
        brand: {
          "@type": "Brand",
          name: "FleetBlox",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/ComingSoon",
          seller: {
            "@type": "Organization",
            name: "FleetBlox",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "24",
        },
      };
      break;
    default:
      schema = {
        ...baseSchema,
        potentialAction: {
          "@type": "SearchAction",
          target: `${url}?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      };
      break;
  }

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        additionalMetaTags={[
          {
            name: "application-name",
            content: "FleetBlox",
          },
          {
            name: "keywords",
            content: keywords.join(", "),
          },
          {
            name: "author",
            content: author,
          },
          {
            name: "robots",
            content:
              "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
          {
            name: "theme-color",
            content: "#0070f3",
          },
          {
            property: "article:author",
            content: author,
          },
          ...(publishedTime
            ? [{ property: "article:published_time", content: publishedTime }]
            : []),
          ...(modifiedTime
            ? [{ property: "article:modified_time", content: modifiedTime }]
            : []),
        ]}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/Favicon.png",
            type: "image/png",
          },
          {
            rel: "apple-touch-icon",
            href: "/Favicon.png",
            sizes: "180x180",
          },
          {
            rel: "manifest",
            href: "/manifest.json",
          },
          {
            rel: "canonical",
            href: url,
          },
        ]}
        openGraph={{
          type: "website",
          locale: "en_US",
          url,
          title,
          description,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: "FleetBlox - Advanced AI-Powered Fleet Management Solution",
              type: "image/png",
            },
          ],
          site_name: "FleetBlox",
        }}
        twitter={{
          handle: "@fleetblox",
          site: "@fleetblox",
          cardType: "summary_large_image",
        }}
      />

      {/* Enhanced Schema Markup with Next.js 15 optimizations */}
      <Script
        id="schema-markup"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema, null, 0),
        }}
      />
    </>
  );
};

export default SchemaMarkup;
