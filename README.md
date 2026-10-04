# Asha Offset — corporate website

Printing and packaging manufacturer in Gondal, Gujarat. Established 1998.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.
Every route is statically prerendered.

```bash
npm run dev     # http://localhost:3000
npm run build
npm start
npm run lint
```

## Design

A heritage printing-house aesthetic with modern UX — warm paper stock, ink
black, burgundy and brass, editorial serif display type over a workhorse sans.
Decoration is drawn from the pre-press bench: registration targets, crop marks,
CMYK colour bars, halftone screens, catalogue numbering and ink stamps.

Design tokens live in [`src/app/globals.css`](src/app/globals.css) under
`@theme`. Change a colour or a typeface there and it propagates everywhere.

| Token | Value | Use |
| --- | --- | --- |
| `paper` | `#F4EFE5` | Page background |
| `cream` | `#E9E0D0` | Raised panels and cards |
| `beige` | `#D6C8B4` | Fills in the product line-art |
| `ink` | `#191817` | Body text, dark bands |
| `coffee` | `#3A2921` | Headings on light, the closing CTA band |
| `burgundy` | `#6B302D` | Primary accent |
| `brass` | `#A98752` | Secondary accent, accent on dark |

Type: Playfair Display (display), Inter (body), IBM Plex Mono (technical
labels), all self-hosted through `next/font`.

## Structure

```
src/
  app/
    layout.tsx            Fonts, metadata, LocalBusiness JSON-LD, chrome
    page.tsx              Home
    about/ products/ capabilities/ industries/
    quality/ certifications/ contact/
    sitemap.ts robots.ts
  components/
    Nav.tsx Footer.tsx MobileCta.tsx
    Hero.tsx StatStrip.tsx ContactForm.tsx
    Section.tsx           Section, SectionHead, PageHeader
    print.tsx             Registration marks, crop marks, colour bars, stamps
    ProductArt.tsx        Line-art plates for each product category
    Reveal.tsx Counter.tsx ui.tsx
    sections/             The reusable content bands
  lib/
    content.ts            All factual company data — single source of truth
```

`src/lib/content.ts` holds every fact on the site. Edit it there, not in the
components.

## Imagery

Three photographs were extracted from the 2026 company profile and are the only
photographic assets:

- `public/images/press-floor.jpg` — the press room
- `public/images/shopfront.jpg` — the works on Gundala Road
- `public/images/heidelberg.png` — the four colour press, background removed
- `public/images/logo-original.png` — the existing logo, kept for reference

> **`shopfront.jpg` is redacted.** The signboard in the original photograph
> carries the GSTIN in legible type, and an Indian GSTIN has the PAN embedded
> in its middle ten characters. That block — along with the address and mobile
> numbers printed beneath it — is pixelated and blurred irreversibly in the
> committed file. If you ever re-extract this photograph from the source PDF,
> redact it again before publishing.

The two facility photographs are phone shots, so they carry a warm duotone and
a halftone overlay (`.duotone`, `.halftone` in `globals.css`) which makes them
read as intentional editorial rather than as snapshots.

Product categories are illustrated with the drawn plates in `ProductArt.tsx`
rather than photographs. The stock images in the source PDF were generic
mockups — one watermarked "freepik.com", another a supplier's own catalogue
graphic — so they were not used: they are not Asha Offset's work and carry
licensing risk. Replace a plate with a real photograph whenever one exists.

## Content rules

The site deliberately claims nothing that the company profile does not support.
No invented clients, testimonials, certifications, awards, headcount, revenue or
machinery specifications.

**Not published, by design:** GST number, PAN, Udyam number and bank account
details. The certifications page states only that the company is GST and Udyam
registered, and offers the documents on request. Keep it that way — the
cancelled cheque in particular should never go on a public page.

## Things wired up for later

**Testimonials** — `src/components/sections/Testimonials.tsx` renders reserved
placeholder slots. Fill the `testimonials` array and the section switches to
the real layout. Client logos go in `clientLogos` plus `/public/images/clients`.
Add an entry only when a client has actually given it.

**Certificate viewer** — `src/components/sections/Credentials.tsx` has a working
lightbox. Drop scans into `/public/documents` and add them to
`CERTIFICATE_FILES`; the cards become clickable. Redact identifiers first.

**Enquiry form** — there is no backend, so a valid submission opens the
visitor's mail client with the enquiry composed. Nothing is stored or sent
anywhere else. To use a real endpoint, replace the body of `handleSubmit` in
`src/components/ContactForm.tsx` with a POST to your form service or a server
action.

**Domain** — `metadataBase` in `layout.tsx`, and `BASE` in `sitemap.ts` and
`robots.ts`, all point at `https://www.ashaoffset.com`. Update them if the
production domain differs.

## Accessibility and robustness

- Scroll-reveal animations are scoped to `[data-js="on"]`, set by an inline
  script before first paint — without JavaScript the content simply renders
  instead of staying invisible.
- `prefers-reduced-motion` is honoured throughout; the statistic counters jump
  straight to their final values.
- The masthead switches to light ink over the dark page headers so it stays
  legible, and there is a skip link to the main content.
- Phone and email are `tel:` / `mailto:` links, with a persistent call bar on
  small screens.
- Verified free of horizontal overflow and console errors at 360, 414, 768,
  1024 and 1440 px.
