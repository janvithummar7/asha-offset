import type { Metadata } from "next";
import { PageHeader } from "@/components/Section";
import { StatStrip } from "@/components/StatStrip";
import { AboutBlock } from "@/components/sections/AboutBlock";
import { VisionMission } from "@/components/sections/VisionMission";
import { WhyUs } from "@/components/sections/WhyUs";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Established in 1998 by Mr. Ashokbhai Thummar, Asha Offset has grown from a traditional printing business into a printing and packaging partner for businesses across industries.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        index="01"
        label="About"
        title={
          <>
            Twenty-five years at the{" "}
            <span className="italic text-brass">press.</span>
          </>
        }
        lede="A printing house in Gondal, Gujarat — building long-term working relationships one order at a time since 1998."
      />
      <StatStrip />
      <AboutBlock showLabel={false} />
      <VisionMission />
      <WhyUs />
      <ContactCta />
    </>
  );
}
