import type { Metadata } from "next";
import { PageHeader } from "@/components/Section";
import { QualitySheet } from "@/components/sections/QualitySheet";
import { WhyUs } from "@/components/sections/WhyUs";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "Quality Assurance",
  description:
    "Raw material inspection, colour matching and control, print quality inspection and a finishing & dispatch check on every order.",
};

export default function QualityPage() {
  return (
    <>
      <PageHeader
        index="08"
        label="Quality"
        title={
          <>
            Checked at every <span className="italic text-brass">stage.</span>
          </>
        }
        lede="Four checks stand between blank stock and a dispatched order. None of them is optional."
      />
      <QualitySheet showLabel={false} />
      <WhyUs />
      <ContactCta />
    </>
  );
}
