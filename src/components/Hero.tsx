import Image from "next/image";
import { company } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Action } from "./ui";
import { ColourBar, CropMarks, InkStamp, RegistrationMark } from "./print";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-48">
      {/* Halftone field bleeding in from the right margin. */}
      <div
        className="halftone pointer-events-none absolute -right-20 top-0 h-[70%] w-[55%] opacity-[0.5] [mask-image:radial-gradient(70%_70%_at_70%_30%,#000,transparent)]"
        aria-hidden="true"
      />
      {/* Ruled press lines along the left margin. */}
      <div
        className="print-lines pointer-events-none absolute left-0 top-0 hidden h-full w-28 opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent)] lg:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[88rem] gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        {/* Editorial column ---------------------------------------- */}
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-burgundy">
              <RegistrationMark size={16} className="text-brass" />
              {company.sinceLabel}
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-7 text-[length:var(--text-display)] leading-[0.95] text-balance">
              Your Partner
              <br />
              in <span className="italic text-burgundy">Print.</span>
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-8 max-w-xl font-serif text-xl leading-snug text-coffee sm:text-2xl">
              Precision printing, industrial labels and packaging solutions
              built on 25+ years of experience.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="measure mt-6 leading-relaxed text-ink/65">
              From everyday commercial printing to high-volume industrial labels
              and packaging, Asha Offset combines proven printing expertise,
              modern machinery, and dependable service to bring every project to
              life.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Action href="/capabilities">Explore Our Capabilities</Action>
              <Action href="/contact" variant="outline">
                Request a Quote
              </Action>
            </div>
          </Reveal>
        </div>

        {/* Plate column -------------------------------------------- */}
        {/* The stamp sits outside the reveal, which clips to its own box. */}
        <div className="relative">
          <Reveal delay={200} variant="image">
            {/* The sheet the photograph is mounted on. */}
            <div className="relative border border-ink/15 bg-cream p-3 shadow-[0_30px_60px_-40px_rgb(25_24_23/0.55)] sm:p-4">
              <CropMarks inset="-0.4rem" className="text-ink/35" />

              <div className="relative aspect-4/5 overflow-hidden sm:aspect-3/4">
                <Image
                  src="/images/press-floor.jpg"
                  alt="The Heidelberg four colour press on the Asha Offset production floor in Gondal"
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  className="duotone scale-105 object-cover transition-transform duration-[1.4s] ease-[var(--ease-paper)] hover:scale-100"
                />
                {/* Ink wash keeps the plate caption readable. */}
                <div
                  className="ink-wash pointer-events-none absolute inset-0"
                  aria-hidden="true"
                />
                {/* Halftone laid over the photograph. */}
                <div
                  className="halftone pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
                  style={
                    {
                      "--dot-color": "var(--color-paper)",
                      "--dot": "5px",
                    } as React.CSSProperties
                  }
                  aria-hidden="true"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <p className="eyebrow text-paper/85">Plate 01 — Press Room</p>
                  <ColourBar className="h-1.5 w-20 opacity-90" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Heritage stamp, struck across the top-left corner of the
              sheet — clear of the plate caption along the bottom edge. */}
          <div className="absolute -left-5 -top-8 sm:-left-10 sm:-top-10">
            <InkStamp
              lines={["EST. 1998", "Gondal, Gujarat"]}
              className="border-burgundy/60 bg-paper/95 text-burgundy shadow-[0_10px_30px_-18px_rgb(25_24_23/0.8)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
