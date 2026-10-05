import Image from "next/image";
import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { ColourBar, CropMarks } from "../print";
import { Action } from "../ui";

/**
 * Home-page teaser for production capability. The figures, facility and
 * machinery detail live on /manufacturing and /machinery.
 */
export function HomeCapabilities() {
  return (
    <Section id="manufacturing" tone="ink">
      <div
        className="halftone dot-drift pointer-events-none absolute inset-0 opacity-[0.07]"
        style={
          { "--dot-color": "var(--color-paper)", "--dot": "9px" } as React.CSSProperties
        }
        aria-hidden="true"
      />
      <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal variant="left" className="order-2 lg:order-1">
          <figure className="relative border border-paper/20 p-3">
            <CropMarks inset="-0.4rem" className="text-paper/60" />
            <div className="relative aspect-4/3 overflow-hidden">
              <Image
                src="/images/press-floor.jpg"
                alt="Interior of the Asha Offset press room, showing the four colour offset press and stacked printed sheets"
                fill
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="duotone kenburns object-cover"
              />
            </div>
            <figcaption className="eyebrow mt-3 flex items-center justify-between text-paper/60">
              <span>Heidelberg press room, Gondal</span>
              <ColourBar className="h-1.5 w-16" />
            </figcaption>
          </figure>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHead
            index="03"
            label="Capabilities"
            tone="paper"
            title={
              <>
                Made for Consistency.
                <br />
                Built for <span className="italic text-brass">Volume.</span>
              </>
            }
            lede="A 1,800 sq. ft. production facility with Heidelberg printing technology, capable of up to 300,000 labels a day."
          />
          <Reveal variant="blur" delay={300}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Action href="/manufacturing" variant="outline-light">
                Explore our capabilities
              </Action>
              <Action href="/machinery" variant="outline-light">
                See our machinery
              </Action>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
