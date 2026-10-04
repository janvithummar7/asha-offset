import type { MetadataRoute } from "next";
import { SITE_URL as BASE } from "@/lib/seo";

const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/products", priority: 0.9 },
  { path: "/contact", priority: 0.9 },
  { path: "/manufacturing", priority: 0.8 },
  { path: "/about", priority: 0.8 },
  { path: "/machinery", priority: 0.7 },
  { path: "/industries", priority: 0.7 },
  { path: "/quality", priority: 0.7 },
  { path: "/certifications", priority: 0.6 },
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
