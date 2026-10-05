import { industries } from "@/lib/content";
import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { CropMarks } from "../print";

/**
 * Sector pictograms, drawn as flat trade marks rather than photographs —
 * we have no sector photography of our own, and borrowed stock would
 * misrepresent the work.
 */
const SECTOR_ART: Record<string, React.JSX.Element> = {
  // FMCG — retail shelf.
  FMCG: (
    <>
      <rect x="8" y="20" width="14" height="22" />
      <rect x="26" y="12" width="12" height="30" />
      <rect x="42" y="26" width="14" height="16" />
      <path d="M4 42h56" />
    </>
  ),
  // Electronics — integrated circuit.
  Electronics: (
    <>
      <rect x="18" y="18" width="28" height="28" rx="1.5" />
      <rect x="27" y="27" width="10" height="10" />
      <path d="M26 18v-8M38 18v-8M26 46v8M38 46v8M18 26h-8M18 38h-8M46 26h8M46 38h8" />
    </>
  ),
  // Food & Beverage — jar with a wrapped label.
  "Food & Beverage": (
    <>
      <path d="M22 14h20v6l4 6v24a2 2 0 0 1-2 2H20a2 2 0 0 1-2-2V26l4-6z" />
      <path d="M18 30h28M18 40h28" />
    </>
  ),
  // Agriculture — grain ear.
  Agriculture: (
    <>
      <path d="M32 54V20" />
      <path d="M32 24c-7-1-11-5-12-11 7-1 11 3 12 8zM32 24c7-1 11-5 12-11-7-1-11 3-12 8z" />
      <path d="M32 38c-7-1-11-5-12-11 7-1 11 3 12 8zM32 38c7-1 11-5 12-11-7-1-11 3-12 8z" />
      <path d="M22 54h20" />
    </>
  ),
};

function SectorMark({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-14 w-14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      {SECTOR_ART[name]}
    </svg>
  );
}

export function IndustriesGrid({
  showLabel = true,
  index = "07",
}: {
  showLabel?: boolean;
  index?: string;
}) {
  return (
    <Section id="industries" tone="paper">
      <SectionHead
        showLabel={showLabel}
        index={index}
        label="Industries"
        title={
          <>
            Printing Across{" "}
            <span className="accent text-burgundy">Industries</span>
          </>
        }
      />

      <div className="mt-14 grid gap-7 sm:grid-cols-2">
        {industries.map((industry, i) => (
          <Reveal key={industry.name} variant="zoom" delay={i * 110}>
            <article className="group relative h-full overflow-hidden border border-ink/20 bg-cream p-8 transition-[transform,background-color,border-color] duration-500 hover:-translate-y-1 hover:border-ink/40 sm:p-10">
              <CropMarks inset="0.7rem" className="text-ink/50" />

              {/* Brass wash rising on hover. */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-[linear-gradient(to_top,rgb(169_135_82/0.14),transparent)] transition-[height] duration-700 group-hover:h-full"
                aria-hidden="true"
              />

              <div className="relative">
                <div className="flex items-start justify-between gap-6">
                  <span className="text-brass-deep transition-transform duration-500 group-hover:-translate-y-1">
                    <SectorMark name={industry.name} />
                  </span>
                  <span className="eyebrow text-ink/65">
                    {industry.index}
                  </span>
                </div>

                <h3 className="mt-8 font-display text-[clamp(1.5rem,2.6vw,2rem)] text-coffee">
                  {industry.name}
                </h3>

                <div
                  className="mt-5 h-px w-12 bg-brass transition-all duration-500 group-hover:w-24"
                  aria-hidden="true"
                />

                <p className="measure mt-5 leading-relaxed text-ink/70">
                  {industry.description}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
