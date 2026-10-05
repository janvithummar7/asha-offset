import Image from "next/image";
import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { ColourBar, CropMarks } from "../print";

const FIGURES = [
  {
    index: "01",
    value: "300,000+",
    unit: "Labels Per Day",
    body: (
      <>
        Maximum daily printing capacity for labels and stickers, using
        Heidelberg printing machines with a maximum printing size of
        approximately{" "}
        <strong className="font-semibold text-paper">146 × 240 mm</strong>.
      </>
    ),
  },
  {
    index: "02",
    value: "20+ Tons",
    unit: "Per Month",
    body: (
      <>
        Average monthly production capacity, supporting both regular repeat work
        and bulk orders.
      </>
    ),
  },
];

export function Manufacturing({
  showLabel = true,
  index = "04",
}: {
  showLabel?: boolean;
  index?: string;
}) {
  return (
    <Section id="manufacturing" tone="ink">
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        {/* Press photograph ---------------------------------------- */}
        <Reveal variant="image" className="order-2 lg:order-1">
          <figure className="relative border border-paper/20 p-3">
            <CropMarks inset="-0.4rem" className="text-paper/60" />
            <div className="relative aspect-4/3 overflow-hidden">
              <Image
                src="/images/press-floor.jpg"
                alt="Interior of the Asha Offset press room, showing the four colour offset press and stacked printed sheets"
                fill
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="duotone-deep object-cover transition-transform duration-[1.4s] ease-[var(--ease-paper)] hover:scale-[1.05]"
              />
              <div
                className="halftone pointer-events-none absolute inset-0 opacity-[0.2] mix-blend-overlay"
                style={
                  {
                    "--dot-color": "var(--color-paper)",
                    "--dot": "5px",
                  } as React.CSSProperties
                }
                aria-hidden="true"
              />
            </div>
            <figcaption className="eyebrow mt-3 flex items-center justify-between text-paper/60">
              <span>1,800 Sq. Ft. Production Floor</span>
              <ColourBar className="h-1.5 w-16" />
            </figcaption>
          </figure>
        </Reveal>

        {/* Copy ----------------------------------------------------- */}
        <div className="order-1 lg:order-2">
          <SectionHead
            showLabel={showLabel}
            index={index}
            label="Capabilities"
            tone="paper"
            title={
              <>
                Made for Consistency.
                <br />
                Built for <span className="accent text-brass">Volume.</span>
              </>
            }
            lede="Our 1,800 sq. ft. production facility is equipped with reliable printing and finishing machinery designed to support consistent quality and timely order fulfillment."
          />

          <div className="mt-12 space-y-8">
            {FIGURES.map((figure, i) => (
              <Reveal key={figure.index} variant="right" delay={200 + i * 140}>
                <div className="rule-tick grid gap-3 pt-6 sm:grid-cols-[auto_1fr] sm:gap-7">
                  <p className="eyebrow pt-2 text-paper/60">{figure.index}</p>
                  <div>
                    <p className="font-stencil text-[clamp(1.75rem,3.5vw,2.75rem)] leading-none text-paper">
                      {figure.value}
                    </p>
                    <p className="eyebrow mt-3 text-brass">{figure.unit}</p>
                    <p className="measure mt-4 leading-relaxed text-paper/60">
                      {figure.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
