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
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
