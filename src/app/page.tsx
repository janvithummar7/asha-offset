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

export default function HomePage() {
  return (
    <>
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
