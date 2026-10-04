import { PageHeader } from "@/components/Section";
import { Manufacturing } from "@/components/sections/Manufacturing";
import { Facility } from "@/components/sections/Facility";
import { ContactCta } from "@/components/sections/ContactCta";
import { JsonLd, breadcrumbSchema, pageMetadata, serviceSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Printing & Manufacturing Capabilities | Asha Offset",
  description:
    "Discover Asha Offset's manufacturing capabilities, 1,800 sq. ft. production facility, Heidelberg printing technology and high-volume label production.",
  path: "/manufacturing",
});

export default function ManufacturingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Manufacturing", path: "/manufacturing" },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: "Offset printing and packaging manufacturing",
          description:
            "High-volume offset printing of labels, stickers and packaging from an 1,800 sq. ft. production facility in Gondal, Gujarat, using Heidelberg four colour presses.",
          path: "/manufacturing",
        })}
      />

      <PageHeader
        index="04"
        label="Manufacturing"
        title={
          <>
            Made for Consistency.
            <br />
            Built for <span className="italic text-brass">Volume.</span>
          </>
        }
        lede="An 1,800 sq. ft. production floor in Gondal, Gujarat, geared for consistent quality and dependable turnaround on repeat and bulk orders."
      />
      <Manufacturing showLabel={false} />
      <Facility />
      <ContactCta />
    </>
  );
}
