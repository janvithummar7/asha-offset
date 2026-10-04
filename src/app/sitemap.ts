import type { MetadataRoute } from "next";

/** Update this once the production domain is live. */
const BASE = "https://www.ashaoffset.com";

const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/products", priority: 0.9 },
  { path: "/capabilities", priority: 0.8 },
  { path: "/industries", priority: 0.7 },
  { path: "/quality", priority: 0.7 },
  { path: "/certifications", priority: 0.6 },
  { path: "/contact", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
