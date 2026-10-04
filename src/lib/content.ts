/**
 * Single source of truth for all factual company data.
 *
 * Everything here comes from the ASHA OFFSET Company Profile 2026.
 * Do not add clients, testimonials, certifications, awards, headcount,
 * revenue or machinery specs that are not in that profile.
 */

export const company = {
  name: "Asha Offset",
  nameUpper: "ASHA OFFSET",
  tagline: "Your Partner in Print.",
  since: 1998,
  sinceLabel: "Printing Excellence Since 1998",
  founder: "Mr. Ashokbhai Thummar",
  businessType: "Manufacturer & Printing Service Provider",
  industry: "Commercial Printing & Packaging Printing",
  city: "Gondal",
  state: "Gujarat",
  shortLocation: "Gondal, Gujarat",
  experience: "25+ Years",
  phone: "+91 98252 46380",
  phoneHref: "tel:+919825246380",
  email: "ashaoffset01@gmail.com",
  emailHref: "mailto:ashaoffset01@gmail.com",
  address: {
    lines: [
      "Gundala Road, Jasmatnagar Main Road,",
      "Near Bus Stand, Gondal, Gujarat – 360311, India",
    ],
    full: "Gundala Road, Jasmatnagar Main Road, Near Bus Stand, Gondal, Gujarat – 360311, India",
    postcode: "360311",
  },
  /** Used for the map embed — Gondal, Gujarat. */
  mapQuery: "Gondal, Gujarat 360311, India",
} as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

/**
 * `match` lists any additional routes that should light up this nav item.
 * Capabilities covers both the manufacturing and machinery pages, which
 * are separate URLs so each can target its own search terms.
 */
export const navLinks: {
  label: string;
  href: string;
  match?: string[];
}[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Capabilities", href: "/manufacturing", match: ["/machinery"] },
  { label: "Industries", href: "/industries" },
  { label: "Quality", href: "/quality" },
  { label: "Contact", href: "/contact" },
];

/** Secondary links, surfaced in the footer rather than the masthead. */
export const footerLinks = [
  { label: "Machinery", href: "/machinery" },
  { label: "Certifications", href: "/certifications" },
] as const;

/* ------------------------------------------------------------------ */
/* Heritage statistics                                                 */
/* ------------------------------------------------------------------ */

export type Stat = {
  /** Numeric portion, animated by the counter. */
  value: number;
  /** Sits tight against the number, e.g. the "+" in "25+". */
  suffix?: string;
  /** Set smaller beside the number, e.g. "Sq. Ft." — keeps it on one line. */
  unit?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 25, suffix: "+", label: "Years of Printing Excellence" },
  { value: 1800, unit: "Sq. Ft.", label: "Production Facility" },
  { value: 300000, suffix: "+", label: "Labels Per Day" },
  { value: 20, suffix: "+", unit: "Tons", label: "Monthly Production" },
];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const aboutParagraphs = [
  "Established in 1998, Asha Offset has grown from a traditional printing business into a dependable printing and packaging partner for businesses across industries.",
  "Founded by Mr. Ashokbhai Thummar, the company continues to combine hands-on printing knowledge with modern production capabilities.",
  "From labels and stickers to cartons, brochures and corporate printing, every project is handled with attention to detail, consistency and timely delivery.",
];

export const companyFacts = [
  { term: "Company Name", detail: company.name },
  { term: "Established", detail: "1998" },
  { term: "Founder", detail: company.founder },
  { term: "Business Type", detail: company.businessType },
  { term: "Industry", detail: company.industry },
  { term: "Location", detail: company.shortLocation },
];

export const vision =
  "To become one of India's most trusted printing partners by delivering innovative, high-quality and cost-effective printing solutions.";

export const mission =
  "To provide premium printing services through advanced technology, skilled craftsmanship, timely delivery and customer-focused solutions that help our clients succeed in their markets.";

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

export type ProductItem = {
  name: string;
  description: string;
  /** Key for the generated print-art illustration. */
  art: ArtKey;
};

export type ArtKey =
  | "label"
  | "sticker"
  | "diecut"
  | "pamphlet"
  | "brochure"
  | "poster"
  | "catalogue"
  | "duplex"
  | "carton";

export type ProductGroup = {
  slug: string;
  index: string;
  title: string;
  blurb: string;
  items: ProductItem[];
};

export const productGroups: ProductGroup[] = [
  {
    slug: "labels-stickers",
    index: "01",
    title: "Labels & Stickers",
    blurb:
      "Product identification built to survive handling, storage and the shelf.",
    items: [
      {
        name: "Industrial Labels",
        art: "label",
        description:
          "Durable labels for machinery, equipment, chemicals and industrial product identification with strong adhesion.",
      },
      {
        name: "Industrial Stickers",
        art: "sticker",
        description:
          "Heavy-duty stickers designed for industrial applications with resistance to heat, moisture and abrasion.",
      },
      {
        name: "Die-Cut Stickers",
        art: "diecut",
        description:
          "Precision die-cut stickers in custom shapes and sizes for branding, packaging and product labeling.",
      },
    ],
  },
  {
    slug: "commercial-printing",
    index: "02",
    title: "Commercial Printing",
    blurb:
      "Printed communication for promotions, campaigns and everyday business.",
    items: [
      {
        name: "Pamphlets",
        art: "pamphlet",
        description:
          "Effective printed material for promotions, campaigns and business communication.",
      },
      {
        name: "Brochures",
        art: "brochure",
        description:
          "Professional brochures designed to present products, services and company information.",
      },
      {
        name: "Posters",
        art: "poster",
        description:
          "High-impact printed posters for promotions, events and brand communication.",
      },
      {
        name: "Catalogues",
        art: "catalogue",
        description:
          "Detailed product catalogues designed for professional presentation and customer engagement.",
      },
    ],
  },
  {
    slug: "packaging-printing",
    index: "03",
    title: "Packaging Printing",
    blurb:
      "Cartons and boxes that protect the product and carry the brand.",
    items: [
      {
        name: "Duplex Boxes",
        art: "duplex",
        description:
          "Durable and professionally printed packaging solutions for product presentation and protection.",
      },
      {
        name: "Mono Cartons",
        art: "carton",
        description:
          "Custom printed mono cartons designed for product packaging, branding and retail presentation.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Machinery                                                           */
/* ------------------------------------------------------------------ */

export type Machine = {
  index: string;
  name: string;
  quantity: number;
  note: string;
};

export const machines: Machine[] = [
  {
    index: "01",
    name: "Heidelberg Four Colour Printing Machine",
    quantity: 1,
    note: "German-built four colour offset press for CMYK production printing.",
  },
  {
    index: "02",
    name: "Lamination Machine",
    quantity: 1,
    note: "Surface lamination for finish, durability and protection.",
  },
  {
    index: "03",
    name: "Half Cutting Machine",
    quantity: 2,
    note: "Kiss-cutting for labels and sticker sheets.",
  },
  {
    index: "04",
    name: "Die Cutting Machine",
    quantity: 1,
    note: "Shaped cutting for die-cut stickers and carton forms.",
  },
  {
    index: "05",
    name: "Semi-Auto Cutting Machine",
    quantity: 1,
    note: "Sheet trimming and sizing through the finishing stage.",
  },
];

export const heidelbergCopy =
  "Our Heidelberg Four Colour Printing Machines from Germany deliver excellent CMYK print quality, strong colour consistency, sharp image reproduction and efficient bulk production capability.";

/* ------------------------------------------------------------------ */
/* Facility process captions                                           */
/* ------------------------------------------------------------------ */

export const facilitySteps = [
  { index: "01", label: "Printing" },
  { index: "02", label: "Lamination" },
  { index: "03", label: "Cutting" },
  { index: "04", label: "Finishing" },
] as const;

/* ------------------------------------------------------------------ */
/* Industries                                                          */
/* ------------------------------------------------------------------ */

export type Industry = {
  index: string;
  name: string;
  description: string;
};

export const industries: Industry[] = [
  {
    index: "01",
    name: "FMCG",
    description:
      "High-volume product labels, stickers and retail packaging for fast-moving consumer goods brands.",
  },
  {
    index: "02",
    name: "Electronics",
    description:
      "Precision-printed labels, compliance packaging and regulated product stickers.",
  },
  {
    index: "03",
    name: "Food & Beverage",
    description:
      "Food-grade labels, attractive packaging and branded cartons for food and beverage products.",
  },
  {
    index: "04",
    name: "Agriculture",
    description:
      "Weather-resistant labels, product stickers and packaging for seeds, fertilizers and agricultural products.",
  },
];

/* ------------------------------------------------------------------ */
/* Quality                                                             */
/* ------------------------------------------------------------------ */

export const qualitySteps = [
  {
    index: "01",
    title: "Raw Material Inspection",
    description:
      "Every raw material is inspected before production to ensure print quality and consistency.",
  },
  {
    index: "02",
    title: "Colour Matching & Control",
    description:
      "Precise colour calibration and CMYK matching help maintain vibrant and consistent results.",
  },
  {
    index: "03",
    title: "Print Quality Inspection",
    description:
      "Each print batch is inspected for sharpness, alignment and overall print quality.",
  },
  {
    index: "04",
    title: "Finishing & Dispatch Check",
    description:
      "Final finishing and dispatch verification ensure the completed order meets required standards before delivery.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Why Asha Offset                                                     */
/* ------------------------------------------------------------------ */

export const reasons = [
  {
    index: "01",
    title: "25+ Years of Experience",
    description:
      "Printing continuously from Gondal since 1998, through every change in the trade.",
  },
  {
    index: "02",
    title: "Reliable Production Capability",
    description:
      "An 1,800 sq. ft. floor geared for consistent output and dependable turnaround.",
  },
  {
    index: "03",
    title: "Heidelberg Printing Technology",
    description:
      "German four colour offset at the centre of the press room.",
  },
  {
    index: "04",
    title: "Consistent Print Quality",
    description:
      "Colour control and batch inspection applied to every run, not just the first sheet.",
  },
  {
    index: "05",
    title: "Customer-Focused Service",
    description:
      "Direct conversations with the people who actually run the press.",
  },
] as const;

export const statement =
  "From the first sheet to the final box, every detail matters.";

/* ------------------------------------------------------------------ */
/* Credentials                                                         */
/* ------------------------------------------------------------------ */

/**
 * Public-facing only. PAN, GST number and bank account details are
 * deliberately NOT published here — they are shared on request.
 */
export const publicCredentials = [
  { term: "Company Name", detail: company.name },
  { term: "GST Registered", detail: "Yes" },
  { term: "Udyam Registered", detail: "Yes" },
];

export const certificates = [
  {
    index: "01",
    title: "GST Registration Certificate",
    description:
      "Goods & Services Tax registration issued under the Gujarat State Tax authority.",
  },
  {
    index: "02",
    title: "Udyam Registration Certificate",
    description:
      "MSME registration under the Ministry of Micro, Small & Medium Enterprises.",
  },
  {
    index: "03",
    title: "Cancelled Cheque",
    description:
      "Bank verification document, shared directly with procurement teams on request.",
  },
] as const;

export const vendorDetails = [
  { term: "Company Name", detail: company.name },
  { term: "Authorized Person", detail: company.founder },
  { term: "Business Type", detail: company.businessType },
  { term: "Location", detail: company.shortLocation },
  { term: "Email", detail: company.email, href: company.emailHref },
  { term: "Phone", detail: company.phone, href: company.phoneHref },
];

/* ------------------------------------------------------------------ */
/* Contact form                                                        */
/* ------------------------------------------------------------------ */

export const printingNeeds = [
  "Labels & Stickers",
  "Commercial Printing",
  "Packaging & Cartons",
  "Something else",
] as const;
