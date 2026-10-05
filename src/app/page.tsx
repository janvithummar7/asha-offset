import { Hero } from "@/components/Hero";
import { StatStrip } from "@/components/StatStrip";
import { AboutBlock } from "@/components/sections/AboutBlock";
import { HomeProducts } from "@/components/home/HomeProducts";
import { HomeCapabilities } from "@/components/home/HomeCapabilities";
import { HomeIndustries } from "@/components/home/HomeIndustries";
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
      {/* Each block is a short teaser; the full story sits on its own page. */}
      <AboutBlock withCta index="01" />
      <HomeProducts />
      <HomeCapabilities />
      <HomeIndustries />
      <ContactCta tone="stock" />
    </>
  );
}
