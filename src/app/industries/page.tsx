import { PageHeader } from "@/components/Section";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { ContactCta } from "@/components/sections/ContactCta";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries We Serve | Asha Offset",
  description:
    "Asha Offset provides labels, packaging and commercial printing solutions for FMCG, electronics, food & beverage and agriculture businesses.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Industries", path: "/industries" },
        ])}
      />

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
        index="08"
        tone="stock"
        limitTo={["labels-stickers"]}
        ctaHref="/products"
        ctaLabel="View the Full Portfolio"
      />
      <ContactCta />
    </>
  );
}
