import Link from "next/link";
import { productGroups } from "@/lib/content";
import { ProductArt } from "../ProductArt";
import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { CropMarks } from "../print";
import { Action } from "../ui";

/**
 * Home-page teaser for the portfolio: one card per product range, not one
 * per product. Every individual product is on /products.
 */
export function HomeProducts() {
  return (
    <Section id="products" tone="paper">
      <SectionHead
        index="02"
        label="Portfolio"
        title={
          <>
            What We <span className="italic text-burgundy">Print</span>
          </>
        }
        lede="Three ranges, from industrial identification to everyday commercial print and product packaging."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {productGroups.map((group, i) => (
          <Reveal key={group.slug} variant="drop" delay={i * 140}>
            <Link
              href="/products"
              className="group relative block h-full border border-ink/15 bg-cream transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-ink/30"
            >
              <div className="relative aspect-5/4 overflow-hidden border-b border-ink/12">
                <div className="float-on-hover h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-paper)] group-hover:scale-[1.06]">
                  <ProductArt art={group.items[0].art} />
                </div>
                <div
                  className="halftone pointer-events-none absolute inset-0 opacity-[0.28]"
                  style={{ "--dot": "6px" } as React.CSSProperties}
                  aria-hidden="true"
                />
              </div>
              <div className="relative p-6 sm:p-7">
                <CropMarks inset="0.5rem" />
                <h3 className="font-serif text-[1.5rem] text-coffee">
                  {group.title}
                </h3>
                <div
                  className="mt-4 h-px w-10 bg-brass transition-all duration-500 group-hover:w-20"
                  aria-hidden="true"
                />
                <p className="mt-4 leading-relaxed text-ink/70">
                  {group.blurb}
                </p>
                <p className="eyebrow mt-5 text-burgundy">
                  See {group.title.toLowerCase()} →
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal variant="blur" delay={200}>
        <div className="mt-12">
          <Action href="/products">View the full portfolio</Action>
        </div>
      </Reveal>
    </Section>
  );
}
