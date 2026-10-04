import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { CropMarks, RegistrationMark } from "../print";

/**
 * Placeholder testimonial wall.
 *
 * ── Adding real testimonials ──────────────────────────────────────
 * Fill the `testimonials` array below with entries shaped like:
 *
 *   { quote: "…", name: "…", role: "…", company: "…" }
 *
 * The section switches to the real layout automatically once the array
 * is non-empty. Do not add an entry unless the client has actually
 * given it — invented praise is worse than an empty wall.
 *
 * Client logos drop into /public/images/clients and render in the strip
 * below; see `clientLogos`.
 */

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

const testimonials: Testimonial[] = [];

const clientLogos: { src: string; name: string }[] = [];

export function Testimonials() {
  const hasReal = testimonials.length > 0;

  return (
    <Section id="clients" tone="stock">
      <SectionHead
        index="10"
        label="Clients"
        title={
          <>
            Trusted by <span className="italic text-burgundy">Businesses</span>
          </>
        }
        lede={
          hasReal
            ? undefined
            : "Working relationships built over 25 years across FMCG, electronics, food and agriculture."
        }
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {hasReal
          ? testimonials.map((item, i) => (
              <Reveal key={item.name} delay={i * 110}>
                <figure className="relative h-full border border-ink/15 bg-paper p-8">
                  <CropMarks inset="0.6rem" />
                  <RegistrationMark size={20} className="text-brass" />
                  <blockquote className="mt-6 font-serif text-xl italic leading-snug text-coffee">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-7 border-t border-ink/12 pt-5">
                    <p className="font-serif text-lg text-coffee">
                      {item.name}
                    </p>
                    <p className="eyebrow mt-1.5 text-ink/65">
                      {item.role} — {item.company}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))
          : /* Reserved slots, waiting on real feedback. */
            [0, 1, 2].map((i) => (
              <Reveal key={i} delay={i * 110}>
                <figure className="relative flex h-full flex-col border border-dashed border-ink/25 bg-paper/50 p-8">
                  <RegistrationMark size={20} className="text-brass/50" />
                  <blockquote className="mt-6 font-serif text-xl italic leading-snug text-ink/65">
                    &ldquo;Your feedback will appear here.&rdquo;
                  </blockquote>
                  <figcaption className="mt-auto border-t border-ink/12 pt-5">
                    <p className="eyebrow text-ink/65">Client Testimonial</p>
                    <p className="eyebrow mt-1.5 text-ink/65">
                      Slot {String(i + 1).padStart(2, "0")} — Reserved
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
      </div>

      {clientLogos.length > 0 && (
        <div className="mt-12 grid grid-cols-2 gap-px border border-ink/15 bg-ink/12 sm:grid-cols-3 lg:grid-cols-6">
          {clientLogos.map((logo) => (
            <div
              key={logo.src}
              className="flex items-center justify-center bg-paper p-6"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                className="h-10 w-auto opacity-70 transition-opacity hover:opacity-100"
              />
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
