import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// Determine if we're in production environment
const isProd = process.env.NODE_ENV === 'production';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fleetblox.com';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  siteUrl,

  // Environment variables that will be available on the client
  env: {
    NEXT_PUBLIC_SITE_URL: siteUrl,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || (isProd ? 'https://api.fleetblox.com' : 'https://backend.illama360.com'),
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV || 'development',
  },

  // Apply different settings based on environment
  ...(isProd && {
    // Production-only settings
    poweredByHeader: false,
    compress: true,
  }),

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 768, 1024, 1280, 1920],
    imageSizes: [200, 200, 200, 300, 500, 500, 500],
    domains: ["fleetblox.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "logos-world.net",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "ibb.co",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
