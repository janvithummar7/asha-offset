import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // The repository root sits above this folder, and an unrelated
  // package-lock.json lives higher up the tree — pin the workspace root
  // so Turbopack resolves against this project only.
  turbopack: {
    root: path.resolve(__dirname),
  },

  images: {
    // AVIF first, WebP as the fallback for older mobile browsers.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
  },

  async redirects() {
    return [
      // Capabilities was split into two pages so each can target its own
      // search terms. Keep the old path working.
      {
        source: "/capabilities",
        destination: "/manufacturing",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
