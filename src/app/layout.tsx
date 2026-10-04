import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, IBM_Plex_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MobileCta } from "@/components/MobileCta";
import { company, productGroups } from "@/lib/content";
import { SITE_URL, OG_IMAGE } from "@/lib/seo";
import "./globals.css";

/* Editorial serif for display type. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

/* Workhorse sans for body copy. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/* Monospace for catalogue numbering and technical labels. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Each page sets its own absolute title; this is the fallback.
  title: {
    default: "Asha Offset | Printing & Packaging Company in Gondal, Gujarat",
    template: `%s | ${company.name}`,
  },
  description:
    "Asha Offset is a printing and packaging company in Gondal, Gujarat, established in 1998. We provide labels, stickers, cartons, commercial printing and packaging solutions.",
  applicationName: company.name,
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: company.name,
    url: SITE_URL,
    title: "Asha Offset | Printing & Packaging Company in Gondal, Gujarat",
    description:
      "Precision printing, industrial labels and packaging solutions built on 25+ years of experience. Gondal, Gujarat.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asha Offset | Printing & Packaging Company in Gondal, Gujarat",
    description:
      "Precision printing, industrial labels and packaging solutions built on 25+ years of experience. Gondal, Gujarat.",
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#f4efe5",
  colorScheme: "light",
};

/**
 * Site-wide structured data. Every value is drawn from the company
 * profile — there are deliberately no reviews, ratings or aggregate
 * ratings, because none have been supplied.
 */
const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "PrintingService"],
      "@id": `${SITE_URL}/#business`,
      name: company.name,
      legalName: company.name,
      url: SITE_URL,
      logo: `${SITE_URL}/opengraph-image.png`,
      image: `${SITE_URL}/images/press-floor.jpg`,
      description:
        "Printing and packaging company in Gondal, Gujarat. Manufacturer of industrial labels, stickers, duplex boxes and mono cartons, and a provider of commercial offset printing since 1998.",
      slogan: company.tagline,
      foundingDate: "1998",
      founder: { "@type": "Person", name: company.founder },
      telephone: company.phone,
      email: company.email,
      currenciesAccepted: "INR",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Gundala Road, Jasmatnagar Main Road, Near Bus Stand",
        addressLocality: company.city,
        addressRegion: company.state,
        postalCode: company.address.postcode,
        addressCountry: "IN",
      },
      areaServed: [
        { "@type": "City", name: "Gondal" },
        { "@type": "AdministrativeArea", name: "Rajkot district" },
        { "@type": "State", name: "Gujarat" },
        { "@type": "Country", name: "India" },
      ],
      knowsAbout: [
        "Offset printing",
        "Industrial label printing",
        "Die-cut sticker printing",
        "Mono carton manufacturing",
        "Duplex box printing",
        "Packaging printing",
        "Commercial printing",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Printing and packaging products",
        itemListElement: productGroups.map((group) => ({
          "@type": "OfferCatalog",
          name: group.title,
          itemListElement: group.items.map((item) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: item.name,
              description: item.description,
            },
          })),
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: company.nameUpper,
      description:
        "Printing and packaging company in Gondal, Gujarat, established 1998.",
      publisher: { "@id": `${SITE_URL}/#business` },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${playfair.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <head>
        {/* Marks the document as scripted before first paint, which is
            what arms the scroll-reveal animations. Without this the
            content renders plainly rather than staying hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.js="on"`,
          }}
        />
      </head>
      <body className="grain antialiased">
        {/* Keyboard users can jump straight past the masthead. */}
        <a
          href="#main"
          className="eyebrow sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>

        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <MobileCta />

        {/* Padding so the mobile CTA bar never covers the colophon. */}
        <div className="h-14 bg-ink sm:hidden" aria-hidden="true" />

        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteSchema),
          }}
        />
      </body>
    </html>
  );
}
