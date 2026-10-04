import type { Metadata } from "next";
import { PageHeader } from "@/components/Section";
import { Manufacturing } from "@/components/sections/Manufacturing";
import { Machinery } from "@/components/sections/Machinery";
import { Facility } from "@/components/sections/Facility";
import { ContactCta } from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "An 1,800 sq. ft. production facility printing 300,000+ labels per day on Heidelberg four colour machines, with 20+ tons of monthly production capacity.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader
        index="04"
        label="Capabilities"
        title={
          <>
            An 1,800 sq. ft. floor,
            <br />
            running every <span className="italic text-brass">day.</span>
          </>
        }
        lede="Manufacturing capacity, the machines on the floor, and the stages every order passes through."
      />
      <Manufacturing showLabel={false} />
      <Machinery />
      <Facility />
      <ContactCta />
    </>
  );
}
