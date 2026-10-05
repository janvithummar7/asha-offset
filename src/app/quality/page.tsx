import { PageHeader } from "@/components/Section";
import { QualitySheet } from "@/components/sections/QualitySheet";
import { WhyUs } from "@/components/sections/WhyUs";
import { ContactCta } from "@/components/sections/ContactCta";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Print Quality Assurance | Asha Offset",
  description:
    "Learn how Asha Offset maintains consistent print quality through raw material inspection, colour control, print inspection and finishing checks.",
  path: "/quality",
});

export default function QualityPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Quality", path: "/quality" },
        ])}
      />

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
      <ContactCta tone="stock" />
    </>
  );
}
