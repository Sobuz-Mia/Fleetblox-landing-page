import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// Determine if we're in production environment
const isProd = process.env.NODE_ENV === "production";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fleetblox.com";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Environment variables that will be available on the client
  env: {
    NEXT_PUBLIC_SITE_URL: siteUrl,
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL ||
      (isProd ? "https://api.fleetblox.com" : "https://backend.illama360.com"),
    NEXT_PUBLIC_ENV:
      process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV || "development",
  },

  // Apply different settings based on environment
  ...(isProd && {
    // Production-only settings
    poweredByHeader: false,
    compress: true,
  }),

  // Security headers (including HSTS)
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // Cache headers for static images
      {
        source: "/(.*).(jpg|jpeg|png|gif|ico|svg|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache headers for static assets in the public folder
      {
        source: "/public/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 768, 1024, 1280, 1920],
    imageSizes: [200, 200, 200, 300, 500, 500, 500],
    domains: ["fleetblox.com", "static-file.fleetblox.com"],
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
      {
        protocol: "https",
        hostname: "static-file.fleetblox.com",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
