import { reasons, statement } from "@/lib/content";
import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { RegistrationMark } from "../print";

export function WhyUs({
  index = "09",
  tone = "paper",
}: {
  index?: string;
  tone?: "paper" | "stock";
}) {
  return (
    <Section id="why" tone={tone}>
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Heading + pull quote ------------------------------------ */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead
            index={index}
            label="Why Us"
            title={
              <>
                Why Businesses Choose{" "}
                <span className="accent text-burgundy">Asha Offset</span>
              </>
            }
          />

          <Reveal delay={220}>
            <blockquote className="relative mt-12 border-l-2 border-burgundy pl-7">
              <RegistrationMark
                size={22}
                className="absolute -left-[12px] -top-7 bg-paper text-brass"
              />
              <p className="font-display text-[clamp(1.5rem,2.8vw,2.125rem)] leading-snug text-coffee">
                &ldquo;{statement}&rdquo;
              </p>
            </blockquote>
          </Reveal>
        </div>

        {/* Numbered reasons ----------------------------------------- */}
        <ol className="border-t border-ink/15">
          {reasons.map((reason, i) => (
            <Reveal
              key={reason.index}
              as="li"
              delay={i * 90}
              className="group grid grid-cols-[auto_1fr] gap-5 border-b border-ink/12 py-7 transition-colors duration-400 sm:gap-8 sm:py-8"
            >
              <span className="eyebrow pt-2 text-ink/65 transition-colors duration-400 group-hover:text-burgundy">
                {reason.index}
              </span>
              <div>
                <h3 className="font-display text-[1.375rem] leading-snug text-coffee transition-transform duration-400 group-hover:translate-x-1 sm:text-[1.75rem]">
                  {reason.title}
                </h3>
                <p className="measure mt-3 leading-relaxed text-ink/65">
                  {reason.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
