import type { Metadata } from "next";
import { PageHeader } from "@/components/Section";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Industrial labels, stickers and die-cut stickers; pamphlets, brochures, posters and catalogues; duplex boxes and mono cartons — printed in Gondal, Gujarat.",
};

export default function ProductsPage() {
  return (
    <>
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
