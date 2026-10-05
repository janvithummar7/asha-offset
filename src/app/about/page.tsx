import { PageHeader } from "@/components/Section";
import { StatStrip } from "@/components/StatStrip";
import { AboutBlock } from "@/components/sections/AboutBlock";
import { VisionMission } from "@/components/sections/VisionMission";
import { WhyUs } from "@/components/sections/WhyUs";
import { Clients } from "@/components/sections/Clients";
import { ContactCta } from "@/components/sections/ContactCta";
import { yearsInBusiness } from "@/lib/content";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Asha Offset | Printing Company Since 1998",
  description:
    "Learn about Asha Offset, a Gondal-based printing and packaging company founded in 1998, offering commercial printing, labels, stickers and packaging solutions.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "About", path: "/about" },
        ])}
      />

      <PageHeader
        index="01"
        label="About"
        title={
          <>
            {yearsInBusiness} years at the{" "}
            <span className="accent text-brass">press.</span>
          </>
        }
        lede="A printing house in Gondal, Gujarat — building long-term working relationships one order at a time since 1998."
      />
      <StatStrip />
      <AboutBlock showLabel={false} />
      <VisionMission />
      <WhyUs index="03" tone="stock" />
      <Clients index="04" />
      <ContactCta tone="stock" />
    </>
  );
}
