import { MetadataRoute } from "next";
import { config } from "../utils/config";

export default function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL from environment config
  const baseUrl = config.siteUrl;
  return Promise.resolve([
    {
      url: `${baseUrl}/`,
      changefreq: "weekly",
      priority: 1,
      lastModified: new Date().toISOString(),
    },
  ]);
}
