import Image from "next/image";
import { heidelbergCopy, machines } from "@/lib/content";
import { machinePhoto } from "@/lib/assets";
import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { ColourBar, CropMarks, InkStamp } from "../print";

export function Machinery({ showLabel = true }: { showLabel?: boolean }) {
  return (
    <Section id="machinery" tone="stock">
      <SectionHead
        showLabel={showLabel}
        index="06"
        label="Machinery"
        title={
          <>
            The Machines Behind the{" "}
            <span className="italic text-burgundy">Print</span>
          </>
        }
      />

      {/* Featured press -------------------------------------------- */}
      <Reveal delay={120}>
        <article className="relative mt-14 grid items-center gap-10 border border-ink/15 bg-paper p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <CropMarks inset="0.7rem" />

          <div
            className="halftone pointer-events-none absolute inset-0 opacity-[0.3]"
            style={{ "--dot": "9px" } as React.CSSProperties}
            aria-hidden="true"
          />

          {/* Copy */}
          <div className="relative order-2 lg:order-1">
            <p className="eyebrow text-brass-deep">Featured — Plate 01</p>
            <h3 className="mt-5 font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight text-coffee">
              Heidelberg Four Colour Printing Machine
            </h3>
            <div className="mt-6 h-px w-16 bg-burgundy" aria-hidden="true" />
            <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-ink/70">
              {heidelbergCopy}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div>
                <p className="eyebrow text-ink/65">Origin</p>
                <p className="mt-1.5 font-serif text-xl text-coffee">Germany</p>
              </div>
              <div className="h-10 w-px bg-ink/15" aria-hidden="true" />
              <div>
                <p className="eyebrow text-ink/65">Process</p>
                <p className="mt-1.5 font-serif text-xl text-coffee">
                  CMYK Offset
                </p>
              </div>
              <ColourBar className="h-6 w-16" vertical={false} />
            </div>
          </div>

          {/* Machine cutout */}
          <Reveal
            variant="image"
            delay={200}
            className="relative order-1 lg:order-2"
          >
            <div className="relative aspect-16/10">
              <Image
                src="/images/heidelberg.png"
                alt="Heidelberg four colour offset printing press"
                fill
                sizes="(max-width: 1024px) 92vw, 48vw"
                className="object-contain drop-shadow-[0_24px_30px_rgb(13_27_46/0.25)] transition-transform duration-[1.2s] ease-[var(--ease-paper)] hover:scale-[1.04]"
              />
            </div>
            <div className="pointer-events-none absolute -bottom-2 right-0 sm:right-6">
              <InkStamp
                lines={["Four Colour", "Offset Press"]}
                rotate={6}
                className="scale-90 border-brass/60 text-brass-deep sm:scale-100"
              />
            </div>
          </Reveal>
        </article>
      </Reveal>

      {/* Equipment register ----------------------------------------- */}
      <Reveal delay={100}>
        <h3 className="eyebrow mt-20 text-ink/65">Equipment Register</h3>
      </Reveal>

      <div className="mt-6 border-t border-ink/15">
        {machines.map((machine, i) => {
          // A photo of the machine, if one has been dropped into
          // /public/images/machinery (see src/lib/assets.ts).
          const photo = machinePhoto(machine.name);

          return (
          <Reveal key={machine.index} delay={i * 80}>
            <article
              className={`group grid items-center gap-5 border-b border-ink/12 py-6 transition-colors duration-400 hover:bg-cream sm:gap-8 sm:py-7 ${
                photo
                  ? "grid-cols-[auto_auto_1fr_auto]"
                  : "grid-cols-[auto_1fr_auto]"
              }`}
            >
              <span className="eyebrow text-ink/65 transition-colors group-hover:text-burgundy">
                {machine.index}
              </span>

              {photo && (
                <span className="relative block h-16 w-24 overflow-hidden border border-ink/15 sm:h-20 sm:w-32">
                  <Image
                    src={photo}
                    alt={`${machine.name} at the Asha Offset works`}
                    fill
                    sizes="128px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </span>
              )}

              <div>
                <h4 className="font-serif text-[1.25rem] leading-snug text-coffee sm:text-[1.5rem]">
                  {machine.name}
                </h4>
                <p className="mt-1.5 text-[0.9375rem] text-ink/65">{machine.note}</p>
              </div>

              <span className="shrink-0 text-right">
                <span className="eyebrow block text-ink/65">Qty.</span>
                <span className="mt-0.5 block font-serif text-2xl text-burgundy sm:text-3xl">
                  {machine.quantity}
                </span>
              </span>
            </article>
          </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
