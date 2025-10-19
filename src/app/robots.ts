import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/collections/checkout/",
        "/result/paymentSuccess",
        "/result/paymentFaild",
        "/collections/select-country",
        "/getting-started",
      ],
    },
    sitemap: "https://fleetblox.com/sitemap.xml",
    host: "https://fleetblox.com",
  };
}
