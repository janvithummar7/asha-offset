import { mission, vision } from "@/lib/content";
import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { CropMarks, RegistrationMark } from "../print";

const CARDS = [
  { index: "I", title: "Our Vision", body: vision },
  { index: "II", title: "Our Mission", body: mission },
];

export function VisionMission({ index = "02" }: { index?: string }) {
  return (
    <Section tone="paper">
      <SectionHead
        index={index}
        label="Principles"
        title={
          <>
            Where Experience Meets{" "}
            <span className="accent text-burgundy">Ambition</span>
          </>
        }
      />

      <div className="mt-14 grid gap-7 md:grid-cols-2">
        {CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 130}>
            <article className="group relative h-full overflow-hidden border border-ink/15 bg-cream p-8 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-40px_rgb(13_27_46/0.6)] sm:p-11">
              <CropMarks inset="0.7rem" />

              {/* Aged-paper wash in the corner. */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,var(--color-beige),transparent_70%)] opacity-70"
                aria-hidden="true"
              />
              <div
                className="halftone pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{ "--dot": "9px" } as React.CSSProperties}
                aria-hidden="true"
              />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-ink/65">{card.index}</span>
                  <RegistrationMark
                    size={20}
                    className="text-brass/70 transition-transform duration-700 group-hover:rotate-90"
                  />
                </div>

                <h3 className="mt-7 text-[length:var(--text-title)] text-coffee">
                  {card.title}
                </h3>

                <div
                  className="mt-6 h-px w-14 bg-burgundy"
                  aria-hidden="true"
                />

                <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink/75">
                  {card.body}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
