import { Hero } from "@/components/Hero";
import { StatStrip } from "@/components/StatStrip";
import { AboutBlock } from "@/components/sections/AboutBlock";
import { VisionMission } from "@/components/sections/VisionMission";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Manufacturing } from "@/components/sections/Manufacturing";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { QualitySheet } from "@/components/sections/QualitySheet";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCta } from "@/components/sections/ContactCta";
import { JsonLd, pageMetadata, serviceSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Asha Offset | Printing & Packaging Company in Gondal, Gujarat",
  description:
    "Asha Offset is a printing and packaging company in Gondal, Gujarat, established in 1998. We provide labels, stickers, cartons, commercial printing and packaging solutions.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Printing and packaging services",
          description:
            "Industrial labels, stickers, die-cut stickers, pamphlets, brochures, posters, catalogues, duplex boxes and mono cartons, printed in Gondal, Gujarat.",
          path: "/products",
        })}
      />

      <Hero />
      <StatStrip />
      <AboutBlock withCta />
      <VisionMission />

      {/* Home shows the two flagship ranges; /products carries them all. */}
      <ProductShowcase
        limitTo={["labels-stickers", "packaging-printing"]}
        ctaHref="/products"
        ctaLabel="View the Full Portfolio"
      />

      <Manufacturing />
      <IndustriesGrid />
      <QualitySheet />
      <WhyUs />
      <Testimonials />
      <ContactCta />
    </>
  );
}
