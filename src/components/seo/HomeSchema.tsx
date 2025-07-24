import React from "react";
import SchemaMarkup from "./SchemaMarkup";
import Script from "next/script";

interface HomeSchemaProps {
  url?: string;
}

const HomeSchema: React.FC<HomeSchemaProps> = ({
  url = "https://fleetblox.site",
}) => {
  return (
    <>
      {/* Website Schema */}
      <SchemaMarkup
        url={url}
        title="FleetBlox - Advanced AI-Powered Fleet Management Solution"
        description="FleetBlox is an advanced AI-powered, cloud-based fleet connectivity solution that eliminates the need for traditional hardware, reducing operational costs and optimizing fleet performance."
        imageUrl="https://fleetblox.site/brand/Frame%201707481662.png"
        type="WebSite"
      />

      {/* Organization Schema - Added separately */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "FleetBlox",
            url: url,
            logo: `${url}/brand/Frame%201707481662.png`,
            description:
              "FleetBlox is an advanced AI-powered, cloud-based fleet connectivity solution that eliminates the need for traditional hardware.",
            sameAs: [
              // Add your social media profiles here
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
          }),
        }}
      />
      {/* Product Schema - Added separately */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "FleetBlox Fleet Management Solution",
            description:
              "An advanced AI-powered, cloud-based fleet connectivity solution that eliminates the need for traditional hardware.",
            image: `${url}/brand/Frame%201707481662.png`,
            brand: {
              "@type": "Brand",
              name: "FleetBlox",
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: "0",
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
          }),
        }}
      />

      {/* FAQPage Schema - Based on your FAQ data */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is FleetBlox?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "FleetBlox is an advanced AI-powered, cloud-based fleet connectivity solution that eliminates the need for traditional hardware. It seamlessly integrates with your fleet, reducing operational costs, minimizing downtime, and optimizing performance. By leveraging real-time data and intelligent automation, FleetBlox transforms fleet management, enhancing efficiency, reliability, and overall business productivity.",
                },
              },
              {
                "@type": "Question",
                name: "How does FleetBlox works?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "FleetBlox integrates vehicles with the cloud, enabling seamless access to real-time data and leveraging advanced AI-driven technology to deliver comprehensive fleet management solutions. By continuously collecting and analyzing key vehicle metrics, FleetBlox optimizes fleet performance, enhances operational efficiency, and reduces downtime. This cloud-based approach eliminates the need for traditional hardware, streamlining operations and lowering costs.",
                },
              },
              {
                "@type": "Question",
                name: "What are the benefits of using FleetBlox?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Fleetblox offers several benefits, including cost efficiency through its subscription-based model, which reduces upfront and maintenance costs. Its quick setup allows businesses to get started in minutes, avoiding the long installation processes of traditional systems. Scalability is a major advantage, enabling businesses to adjust fleet size without added costs.",
                },
              },
              {
                "@type": "Question",
                name: "Will I need any extra hardware if I choose FleetBlox?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No, you will not need any extra hardware if you choose FleetBlox. It is a fully cloud-based platform, meaning it requires no costly hardware installations or setup. Everything is managed through the cloud, allowing for an intuitive, hassle-free setup with no additional hardware requirements.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
};

export default HomeSchema;
