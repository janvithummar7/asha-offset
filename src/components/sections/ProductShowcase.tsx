import { productGroups } from "@/lib/content";
import { ProductArt } from "../ProductArt";
import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { CropMarks } from "../print";
import { Action } from "../ui";

/**
 * The printed-catalogue spread: each group is a chapter, each product a
 * numbered entry with its own plate.
 */
export function ProductShowcase({
  heading = true,
  limitTo,
  ctaHref = "/contact",
  ctaLabel = "Discuss Your Printing Requirement",
}: {
  /** Render the section opener. */
  heading?: boolean;
  /** Show only these group slugs — used for the home-page teaser. */
  limitTo?: string[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const groups = limitTo
    ? productGroups.filter((g) => limitTo.includes(g.slug))
    : productGroups;

  return (
    <Section id="products" tone="paper">
      {heading && (
        <SectionHead
          index="03"
          label="Portfolio"
          title={
            <>
              What We <span className="italic text-burgundy">Print</span>
            </>
          }
          lede="From everyday commercial communication to industrial identification and product packaging."
        />
      )}

      <div className={`space-y-20 ${heading ? "mt-16" : ""}`}>
        {groups.map((group) => (
          <div key={group.slug}>
            {/* Chapter rule ------------------------------------------ */}
            <Reveal>
              <div className="rule-tick flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-6">
                <h3 className="font-serif text-[clamp(1.5rem,2.6vw,2.125rem)] text-coffee">
                  <span className="eyebrow mr-4 align-middle text-ink/65">
                    {group.index}
                  </span>
                  {group.title}
                </h3>
                <p className="text-[0.9375rem] text-ink/65">{group.blurb}</p>
              </div>
            </Reveal>

            {/* Entries ----------------------------------------------- */}
            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item, i) => (
                <Reveal key={item.name} delay={i * 100}>
                  <article className="group relative h-full border border-ink/15 bg-cream transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-ink/30 hover:shadow-[0_28px_55px_-40px_rgb(25_24_23/0.6)]">
                    {/* Plate ------------------------------------------ */}
                    <div className="relative aspect-5/4 overflow-hidden border-b border-ink/12">
                      <div className="h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-paper)] group-hover:scale-[1.06]">
                        <ProductArt art={item.art} />
                      </div>
                      {/* Halftone over the plate. */}
                      <div
                        className="halftone pointer-events-none absolute inset-0 opacity-[0.28]"
                        style={{ "--dot": "6px" } as React.CSSProperties}
                        aria-hidden="true"
                      />
                      <span className="eyebrow absolute left-4 top-4 bg-paper/85 px-2.5 py-1 text-ink/65 backdrop-blur-sm">
                        {group.index}.{String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Entry copy ------------------------------------- */}
                    <div className="relative p-6 sm:p-7">
                      <CropMarks inset="0.5rem" />
                      <h4 className="font-serif text-[1.375rem] text-coffee">
                        {item.name}
                      </h4>
                      <div
                        className="mt-4 h-px w-10 bg-brass transition-all duration-500 group-hover:w-20"
                        aria-hidden="true"
                      />
                      <p className="mt-4 text-base leading-relaxed text-ink/65">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-16">
          <Action href={ctaHref}>{ctaLabel}</Action>
        </div>
      </Reveal>
    </Section>
  );
}
