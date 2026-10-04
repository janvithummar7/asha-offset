import { PageHeader } from "@/components/Section";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { ContactCta } from "@/components/sections/ContactCta";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Printing & Packaging Products | Asha Offset",
  description:
    "Explore Asha Offset's labels, stickers, brochures, pamphlets, posters, catalogues, duplex boxes and mono carton printing solutions.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Products", path: "/products" },
        ])}
      />

      <PageHeader
        index="03"
        label="Portfolio"
        title={
          <>
            What We <span className="italic text-brass">Print</span>
          </>
        }
        lede="From everyday commercial communication to industrial identification and product packaging."
      />
      <ProductShowcase heading={false} />
      <ContactCta />
    </>
  );
}
