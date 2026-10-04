import { publicCredentials, vendorDetails } from "@/lib/content";
import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { CropMarks, InkStamp } from "../print";
import { Action, FactRow } from "../ui";

/**
 * B2B vendor-onboarding block.
 *
 * Only non-sensitive fields appear here. PAN, GST number, Udyam number
 * and bank account details are intentionally withheld from the public
 * site and shared directly with a procurement contact instead.
 */
export function VendorRegistration() {
  return (
    <Section id="vendor" tone="paper">
      <SectionHead
        index="12"
        label="Vendor"
        title={
          <>
            Vendor Registration &amp; Business{" "}
            <span className="italic text-burgundy">Details</span>
          </>
        }
      />

      <div className="mt-14 grid gap-7 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Vendor record ------------------------------------------- */}
        <Reveal>
          <div className="relative h-full border border-ink/15 bg-cream p-7 sm:p-10">
            <CropMarks inset="0.7rem" />
            <h3 className="eyebrow text-brass-deep">Business Details</h3>
            <dl className="mt-6">
              {vendorDetails.map((row) => (
                <FactRow
                  key={row.term}
                  term={row.term}
                  detail={row.detail}
                  href={"href" in row ? row.href : undefined}
                />
              ))}
            </dl>
          </div>
        </Reveal>

        {/* Registration status + note ------------------------------ */}
        <div className="flex flex-col gap-7">
          <Reveal delay={110}>
            <div className="relative border border-ink/15 bg-paper p-7 sm:p-8">
              <CropMarks inset="0.55rem" />
              <h3 className="eyebrow text-brass-deep">Registration Status</h3>
              <dl className="mt-6">
                {publicCredentials.map((row) => (
                  <FactRow key={row.term} term={row.term} detail={row.detail} />
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="relative flex flex-1 flex-col justify-between gap-7 border border-ink/15 bg-ink p-7 text-paper sm:p-8 on-ink">
              <div>
                <p className="leading-relaxed text-paper/70">
                  Registration numbers, PAN and banking details are shared
                  directly with your procurement team — not published on this
                  site.
                </p>
                <div className="mt-7">
                  <Action href="/contact" variant="outline-light">
                    Need vendor documents? Contact us
                  </Action>
                </div>
              </div>

              <InkStamp
                lines={["Verified", "Vendor"]}
                rotate={-6}
                className="self-start border-brass/60 text-brass"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
