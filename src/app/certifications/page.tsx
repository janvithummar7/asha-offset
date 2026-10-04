import type { Metadata } from "next";
import { PageHeader } from "@/components/Section";
import { Credentials } from "@/components/sections/Credentials";
import { VendorRegistration } from "@/components/sections/VendorRegistration";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "Certifications & Vendor Registration",
  description:
    "Asha Offset is GST registered and Udyam registered. Vendor registration details for procurement teams in Gondal, Gujarat.",
};

export default function CertificationsPage() {
  return (
    <>
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
      <Credentials showLabel={false} />
      <VendorRegistration />
      <ContactCta />
    </>
  );
}
