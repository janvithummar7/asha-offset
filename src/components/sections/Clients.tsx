import { testimonials, yearsInBusiness } from "@/lib/content";
import { ClientGrid } from "../ClientGrid";
import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { CropMarks, RegistrationMark } from "../print";

/**
 * Key clients, with testimonials above the logos once any exist.
 *
 * The logo wall always shows. Testimonials are shown only when real ones
 * are added to `testimonials` in content.ts — there are no placeholder
 * "reserved" cards on a live site.
 */
export function Clients({
  index = "10",
  tone = "paper",
}: {
  index?: string;
  tone?: "paper" | "stock";
}) {
  return (
    <Section id="clients" tone={tone}>
      <SectionHead
        index={index}
        label="Clients"
        title={
          <>
            Trusted by <span className="accent text-burgundy">Businesses</span>
          </>
        }
        lede={`Working relationships built over ${yearsInBusiness} years across FMCG, electronics, food and agriculture.`}
      />

      {testimonials.length > 0 && (
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal key={item.name} variant="drop" delay={i * 110}>
              <figure className="relative h-full border border-ink/15 bg-paper p-8">
                <CropMarks inset="0.6rem" />
                <RegistrationMark size={20} className="text-brass" />
                <blockquote className="mt-6 font-display text-xl leading-snug text-coffee">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 border-t border-ink/12 pt-5">
                  <p className="font-display text-lg text-coffee">{item.name}</p>
                  <p className="eyebrow mt-1.5 text-ink/65">
                    {item.role} — {item.company}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      )}

      <div className="mt-14">
        <ClientGrid />
      </div>
    </Section>
  );
}
