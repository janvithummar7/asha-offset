import type { Metadata } from "next";
import { company } from "./content";

/**
 * Production origin. Change this one constant if the domain differs —
 * canonicals, Open Graph URLs, the sitemap and the JSON-LD all read it.
 */
export const SITE_URL = "https://www.ashaoffset.com";

export const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Asha Offset — Printing Excellence Since 1998. Printing and packaging in Gondal, Gujarat.",
};

/**
 * Per-page metadata: unique title and description, a self-referencing
 * canonical, and matching Open Graph / Twitter cards.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Full <title>, used verbatim — not run through the layout template. */
  title: string;
  description: string;
  /** Route path, e.g. "/products". */
  path: string;
}): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: company.name,
      title,
      description,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/* ------------------------------------------------------------------ */

/**
 * Renders a JSON-LD block. The object is author-controlled and contains
 * no user input, so serialising it directly is safe.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Trail for an inner page: Home › <page>. */
export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: `${SITE_URL}${crumb.path === "/" ? "" : crumb.path}`,
      }),
    ),
  };
}

/**
 * A service Asha Offset actually provides. Deliberately carries no
 * offers, reviews or ratings — none have been supplied, and inventing
 * them would be a fabrication in structured data.
 */
export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: [
      { "@type": "State", name: "Gujarat" },
      { "@type": "Country", name: "India" },
    ],
    url: `${SITE_URL}${path}`,
  };
}
