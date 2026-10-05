import { qualitySteps } from "@/lib/content";
import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { ColourBar, RegistrationMark } from "../print";

/**
 * Set as an inspection docket: a ruled sheet with a header block, a
 * numbered check at every stage and a signed-off footer.
 */
export function QualitySheet({
  showLabel = true,
  index = "08",
}: {
  showLabel?: boolean;
  index?: string;
}) {
  return (
    <Section id="quality" tone="stock">
      <SectionHead
        showLabel={showLabel}
        index={index}
        label="Quality"
        title={
          <>
            Quality Is Part of the{" "}
            <span className="italic text-burgundy">Process.</span>
          </>
        }
        lede="Every order passes through defined quality checks to ensure consistent printing, finishing and dispatch standards."
      />

      <Reveal delay={140}>
        <div className="relative mt-14 border border-ink/20 bg-paper shadow-[0_28px_60px_-50px_rgb(13_27_46/0.7)]">
          {/* Docket header ---------------------------------------- */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/20 bg-cream px-6 py-5 sm:px-9">
            <div className="flex items-center gap-4">
              <RegistrationMark size={22} className="text-burgundy" />
              <div>
                <p className="eyebrow text-coffee">
                  Production Inspection Record
                </p>
                <p className="eyebrow mt-1 text-ink/65">
                  Form QC / 04 — Asha Offset
                </p>
              </div>
            </div>
            <ColourBar className="h-5 w-24" />
          </div>

          {/* Ruled check rows -------------------------------------- */}
          <ol className="print-lines">
            {qualitySteps.map((step, i) => (
              <Reveal
                key={step.index}
                as="li"
                delay={i * 110}
                className="group grid gap-4 border-b border-ink/12 px-6 py-7 transition-colors duration-400 last:border-0 hover:bg-cream/70 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-8 sm:px-9 sm:py-8"
              >
                {/* Stage number */}
                <span className="font-serif text-3xl leading-none text-burgundy sm:text-4xl">
                  {step.index}
                </span>

                <div>
                  <h3 className="font-serif text-[1.375rem] text-coffee sm:text-[1.625rem]">
                    {step.title}
                  </h3>
                  <p className="measure mt-3 leading-relaxed text-ink/65">
                    {step.description}
                  </p>
                </div>

                {/* Check box, ticked. */}
                <span
                  className="hidden h-8 w-8 shrink-0 items-center justify-center border border-ink/25 text-burgundy transition-colors duration-400 group-hover:border-burgundy sm:flex"
                  aria-hidden="true"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M4 12.5l5.5 5.5L20 6.5" />
                  </svg>
                </span>
              </Reveal>
            ))}
          </ol>

          {/* Sign-off --------------------------------------------- */}
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/20 bg-cream px-6 py-6 sm:px-9">
            <p className="eyebrow text-ink/65">
              Checked before dispatch — every order
            </p>
            <p className="eyebrow text-ink/65">Asha Offset · Gondal</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
