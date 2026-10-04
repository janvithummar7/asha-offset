import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, IBM_Plex_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MobileCta } from "@/components/MobileCta";
import { company } from "@/lib/content";
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
  metadataBase: new URL("https://www.ashaoffset.com"),
  title: {
    default: `${company.nameUpper} — ${company.tagline}`,
    template: `%s — ${company.nameUpper}`,
  },
  description:
    "Asha Offset is a printing and packaging manufacturer in Gondal, Gujarat. Industrial labels, stickers, cartons and commercial printing on Heidelberg four colour presses since 1998.",
  keywords: [
    "offset printing Gondal",
    "industrial labels Gujarat",
    "packaging printing",
    "mono cartons",
    "duplex boxes",
    "die-cut stickers",
    "Heidelberg printing",
    "Asha Offset",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: company.name,
    title: `${company.nameUpper} — ${company.tagline}`,
    description:
      "Precision printing, industrial labels and packaging solutions built on 25+ years of experience. Gondal, Gujarat.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4efe5",
  colorScheme: "light",
};

/**
 * Structured data so search engines read the business correctly.
 * Only facts from the company profile are included.
 */
const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  description:
    "Manufacturer and printing service provider specialising in commercial printing, industrial labels, stickers and packaging printing.",
  foundingDate: "1998",
  founder: { "@type": "Person", name: company.founder },
  telephone: company.phone,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gundala Road, Jasmatnagar Main Road, Near Bus Stand",
    addressLocality: company.city,
    addressRegion: company.state,
    postalCode: company.address.postcode,
    addressCountry: "IN",
  },
  slogan: company.tagline,
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
            __html: JSON.stringify(organisationSchema),
          }}
        />
      </body>
    </html>
  );
}
