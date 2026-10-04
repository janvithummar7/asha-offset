import type { Metadata } from "next";
import { PageHeader } from "@/components/Section";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Printing for FMCG, electronics, food & beverage and agriculture — labels, stickers, compliance packaging and branded cartons.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        index="07"
        label="Industries"
        title={
          <>
            Four sectors,
            <br />
            one <span className="italic text-brass">press room.</span>
          </>
        }
        lede="The same press room serves the corner of the shelf, the back of the appliance and the seed sack in the field."
      />
      <IndustriesGrid showLabel={false} />
      <ProductShowcase
        heading
        limitTo={["labels-stickers"]}
        ctaHref="/products"
        ctaLabel="View the Full Portfolio"
      />
      <ContactCta />
    </>
  );
}
