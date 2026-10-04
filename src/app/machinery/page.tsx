import { PageHeader } from "@/components/Section";
import { Machinery } from "@/components/sections/Machinery";
import { ContactCta } from "@/components/sections/ContactCta";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Printing Machinery & Heidelberg Press | Asha Offset",
  description:
    "The machines behind the print at Asha Offset, Gondal — Heidelberg four colour offset printing, lamination, half cutting, die cutting and semi-auto cutting.",
  path: "/machinery",
});

export default function MachineryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: "Machinery", path: "/machinery" }])}
      />

      <PageHeader
        index="05"
        label="Machinery"
        title={
          <>
            German presses,
            <br />
            kept <span className="italic text-brass">running.</span>
          </>
        }
        lede="Offset printing, lamination, cutting and die cutting — the equipment register of our Gondal works."
      />
      <Machinery showLabel={false} />
      <ContactCta />
    </>
  );
}
