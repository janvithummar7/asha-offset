import fs from "node:fs";
import path from "node:path";
import { certificates } from "./content";

/**
 * Photo slots.
 *
 * The site looks for photographs by file name in /public. Drop a file into
 * the right folder with the right name and it appears after the next build;
 * until then the page keeps its illustration or its "available on request"
 * note. Server-side only — it reads the file system.
 *
 *   Product photos      /public/images/products/<product-slug>.jpg
 *   Machinery photos    /public/images/machinery/<machine-slug>.jpg
 *   Certificate scans   /public/documents/<file>.jpg — the file names are
 *                       listed against each certificate in content.ts
 *                       (gst-certificate, udyam-certificate)
 *
 * Any of .webp .jpg .jpeg .png .avif works. Slugs are the product or machine
 * name in lower case with dashes, e.g. "Die-Cut Stickers" → die-cut-stickers.
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_EXTENSIONS = ["webp", "jpg", "jpeg", "png", "avif"];

/** "Die-Cut Stickers" → "die-cut-stickers". */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * "/images/products/posters" → "/images/products/posters.jpg" when that
 * file exists under /public, otherwise null.
 */
export function findPublicImage(basePath: string): string | null {
  for (const ext of IMAGE_EXTENSIONS) {
    const url = `${basePath}.${ext}`;
    if (fs.existsSync(path.join(PUBLIC_DIR, url))) return url;
  }
  return null;
}

export const productPhoto = (name: string) =>
  findPublicImage(`/images/products/${slugify(name)}`);

export const machinePhoto = (name: string) =>
  findPublicImage(`/images/machinery/${slugify(name)}`);

/**
 * Certificate scans, keyed by certificate index in content.ts. Only
 * certificates that name a `file` are ever looked up; the cancelled cheque
 * names none, because it carries bank details and stays off the public site.
 */
export function certificateFiles(): Record<string, { src: string; label: string }> {
  const files: Record<string, { src: string; label: string }> = {};

  for (const cert of certificates) {
    if (!cert.file) continue;
    const src = findPublicImage(`/documents/${cert.file}`);
    if (src) files[cert.index] = { src, label: cert.title };
  }

  return files;
}
