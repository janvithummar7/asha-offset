import Image from "next/image";
import { facilitySteps } from "@/lib/content";
import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { ColourBar, CropMarks } from "../print";

/* ------------------------------------------------------------------ */
/* Process marks — simple shop-floor pictograms for each stage.        */
/* ------------------------------------------------------------------ */

const STAGE_ART: Record<string, React.JSX.Element> = {
  // Printing — sheet passing between impression cylinders.
  "01": (
    <>
      <circle cx="16" cy="18" r="8.5" />
      <circle cx="40" cy="18" r="8.5" />
      <path d="M4 34h48M10 42h36" />
      <path d="M16 26.5v4M40 26.5v4" />
    </>
  ),
  // Lamination — film laid over the sheet.
  "02": (
    <>
      <rect x="8" y="14" width="40" height="16" rx="1.5" />
      <path d="M8 36h40M14 44h28" />
      <path d="M14 14l6-6h24l-6 6" />
    </>
  ),
  // Cutting — blade over a stack.
  "03": (
    <>
      <rect x="8" y="30" width="40" height="14" rx="1.5" />
      <path d="M28 6v18M20 24h16l-8 6z" />
      <path d="M8 36h40" />
    </>
  ),
  // Finishing — checked and stacked for dispatch.
  "04": (
    <>
      <rect x="10" y="12" width="36" height="30" rx="1.5" />
      <path d="M19 27l6 6 12-13" />
      <path d="M4 48h48" />
    </>
  ),
};

function StageMark({ index }: { index: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      className="h-11 w-11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      {STAGE_ART[index]}
    </svg>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Two photographs of the works, each cropped to a different part of the
 * frame so the pair reads as separate plates rather than a repeat.
 */
const PLATES = [
  {
    src: "/images/press-floor.jpg",
    alt: "Printed sheets stacked beside the press controls on the Asha Offset production floor",
    caption: "Press Room",
    plate: "Plate 03",
    ratio: "aspect-3/4",
    // Favours the delivery end of the press and the finished sheets.
    position: "object-[50%_88%]",
  },
  {
    src: "/images/shopfront.jpg",
    alt: "The Asha Offset works on Gundala Road, Gondal, with its original Gujarati signage",
    caption: "Gundala Road Works",
    plate: "Plate 04",
    ratio: "aspect-3/4",
    // Favours the signage above the entrance.
    position: "object-[50%_18%]",
  },
];

export function Facility() {
  return (
    <Section id="facility" tone="paper">
      <SectionHead
        index="06"
        label="Facility"
        title={
          <>
            Inside Our Production{" "}
            <span className="italic text-burgundy">Facility</span>
          </>
        }
        lede="Four stages carry every order from blank stock to packed dispatch."
      />

      {/* Process strip ---------------------------------------------- */}
      <div className="mt-14 grid gap-px border border-ink/15 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
        {facilitySteps.map((step, i) => (
          <Reveal
            key={step.index}
            delay={i * 100}
            className="group relative bg-cream p-7 transition-colors duration-500 hover:bg-paper sm:p-8"
          >
            <div
              className="halftone pointer-events-none absolute inset-0 opacity-[0.25] transition-opacity duration-500 group-hover:opacity-50"
              style={{ "--dot": "8px" } as React.CSSProperties}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-ink/30">{step.index}</span>
                <span
                  className="h-px w-8 bg-brass transition-all duration-500 group-hover:w-14"
                  aria-hidden="true"
                />
              </div>
              <span className="mt-6 block text-coffee transition-transform duration-500 group-hover:-translate-y-0.5">
                <StageMark index={step.index} />
              </span>
              <h3 className="eyebrow mt-6 text-burgundy">{step.label}</h3>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Photographic plates ---------------------------------------- */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {PLATES.map((plate, i) => (
          <Reveal key={plate.src} variant="image" delay={i * 140}>
            <figure className="relative h-full border border-ink/15 bg-cream p-3">
              <CropMarks inset="-0.4rem" />
              <div className={`relative overflow-hidden ${plate.ratio}`}>
                <Image
                  src={plate.src}
                  alt={plate.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, 46vw"
                  className={`duotone object-cover ${plate.position} transition-transform duration-[1.5s] ease-[var(--ease-paper)] hover:scale-[1.06]`}
                />
                <div
                  className="halftone pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-multiply"
                  style={{ "--dot": "5px" } as React.CSSProperties}
                  aria-hidden="true"
                />
              </div>
              <figcaption className="eyebrow mt-3 flex items-center justify-between gap-3 text-ink/45">
                <span>{plate.caption}</span>
                <span className="flex items-center gap-3">
                  <ColourBar className="h-1.5 w-12" />
                  {plate.plate}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
