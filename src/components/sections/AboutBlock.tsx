import Image from "next/image";
import { aboutParagraphs, companyFacts, company } from "@/lib/content";
import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { CropMarks, Folio, RegistrationMark } from "../print";
import { Action, FactRow } from "../ui";

export function AboutBlock({
  withCta = false,
  showLabel = true,
}: {
  withCta?: boolean;
  /** Hidden when the page header already carries this running head. */
  showLabel?: boolean;
}) {
  return (
    <Section id="about" tone="stock" className="deckle-bottom">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Photograph column -------------------------------------- */}
        <div className="order-2 lg:order-1">
          <Reveal variant="image">
            <figure className="relative border border-ink/15 bg-paper p-3">
              <CropMarks inset="-0.4rem" />
              <div className="relative aspect-4/5 overflow-hidden">
                <Image
                  src="/images/shopfront.jpg"
                  alt="The Asha Offset premises on Gundala Road, Gondal, with the original Gujarati signage above the entrance"
                  fill
                  sizes="(max-width: 1024px) 92vw, 40vw"
                  className="duotone object-cover transition-transform duration-[1.4s] ease-[var(--ease-paper)] hover:scale-[1.04]"
                />
                <div
                  className="halftone pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-multiply"
                  style={{ "--dot": "5px" } as React.CSSProperties}
                  aria-hidden="true"
                />
              </div>
              <figcaption className="eyebrow mt-3 flex items-center justify-between text-ink/65">
                <span>Gundala Road, Gondal</span>
                <span>Plate 02</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Decorative marginal note. */}
          <Reveal delay={150}>
            <p className="mt-9 flex items-start gap-3 font-serif text-xl italic leading-snug text-burgundy sm:text-2xl">
              <RegistrationMark
                size={18}
                className="mt-1.5 shrink-0 text-brass"
              />
              25 years of making print matter.
            </p>
          </Reveal>
        </div>

        {/* Text column --------------------------------------------- */}
        <div className="order-1 lg:order-2">
          <SectionHead
            showLabel={showLabel}
            index="01"
            label="About"
            title={
              <>
                Built on Experience.
                <br />
                Driven by <span className="italic text-burgundy">Print.</span>
              </>
            }
          />

          <div className="mt-8 space-y-5">
            {aboutParagraphs.map((text, i) => (
              <Reveal key={i} delay={200 + i * 80}>
                <p className="measure text-[1.0625rem] leading-relaxed text-ink/75">
                  {text}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Company information card. */}
          <Reveal delay={420}>
            <div className="relative mt-11 border border-ink/15 bg-paper p-6 sm:p-8">
              <CropMarks inset="0.55rem" />
              <h3 className="eyebrow text-brass-deep">Company Information</h3>
              <dl className="mt-5">
                {companyFacts.map((fact) => (
                  <FactRow
                    key={fact.term}
                    term={fact.term}
                    detail={fact.detail}
                  />
                ))}
              </dl>
              <Folio value={`EST. ${company.since}`} className="mt-6 block" />
            </div>
          </Reveal>

          {withCta && (
            <Reveal delay={500}>
              <div className="mt-10">
                <Action href="/about" variant="outline">
                  Read Our Story
                </Action>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}
