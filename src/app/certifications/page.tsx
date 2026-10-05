import { PageHeader } from "@/components/Section";
import { Credentials } from "@/components/sections/Credentials";
import { VendorRegistration } from "@/components/sections/VendorRegistration";
import { ContactCta } from "@/components/sections/ContactCta";
import { certificateFiles } from "@/lib/assets";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Certifications & Vendor Registration | Asha Offset",
  description:
    "Asha Offset is GST registered and Udyam registered. Vendor registration and business details for procurement teams, from our Gondal, Gujarat works.",
  path: "/certifications",
});

export default function CertificationsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Certifications", path: "/certifications" },
        ])}
      />

      <PageHeader
        index="11"
        label="Credentials"
        title={
          <>
            Open a vendor account
            <br />
            with <span className="italic text-brass">confidence.</span>
          </>
        }
        lede="Everything a procurement team needs to open a vendor account — and nothing that belongs in a private file."
      />
      <Credentials showLabel={false} files={certificateFiles()} />
      <VendorRegistration />
      <ContactCta tone="stock" />
    </>
  );
}
