import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./print";

/**
 * Standard editorial band. Keeps the rhythm of the page consistent and
 * carries the catalogue running-head ("03 / PRODUCTS").
 */
export function Section({
  children,
  className = "",
  tone = "paper",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "stock" | "ink";
  id?: string;
}) {
  const tones = {
    paper: "bg-paper text-ink",
    stock: "stock text-ink",
    ink: "on-ink bg-ink text-paper",
  } as const;

  return (
    <section
      id={id}
      className={`relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28 ${tones[tone]} ${className}`}
    >
      <div className="mx-auto max-w-[88rem]">{children}</div>
    </section>
  );
}

/**
 * Section opening: running head, serif headline and optional standfirst.
 */
export function SectionHead({
  index,
  label,
  title,
  lede,
  tone = "ink",
  align = "left",
  className = "",
  showLabel = true,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "ink" | "paper";
  align?: "left" | "center";
  className?: string;
  /** Hidden when the page header above already carries this running head. */
  showLabel?: boolean;
}) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto text-center" : ""} ${className}`}>
      {showLabel && (
        <Reveal>
          <SectionLabel
            index={index}
            tone={tone}
            className={centered ? "justify-center" : ""}
          >
            {label}
          </SectionLabel>
        </Reveal>
      )}

      <Reveal delay={showLabel ? 90 : 0}>
        <h2
          className={`max-w-4xl text-[length:var(--text-headline)] text-balance ${
            showLabel ? "mt-6" : ""
          }`}
        >
          {title}
        </h2>
      </Reveal>

      {lede && (
        <Reveal delay={160}>
          <p
            className={`measure mt-6 text-lg leading-relaxed ${
              tone === "ink" ? "text-ink/70" : "text-paper/70"
            } ${centered ? "mx-auto" : ""}`}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/**
 * Inner-page masthead — the title block that opens every route except
 * the home page.
 */
export function PageHeader({
  index,
  label,
  title,
  lede,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-ink px-5 pb-20 pt-36 text-paper sm:px-8 sm:pb-28 sm:pt-44 on-ink">
      {/* Halftone field falling away from the top edge. */}
      <div
        className="halftone-fade pointer-events-none absolute inset-0 opacity-[0.1]"
        style={
          {
            "--dot-color": "var(--color-paper)",
            "--dot": "8px",
          } as React.CSSProperties
        }
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[88rem]">
        <Reveal>
          <SectionLabel index={index} tone="paper">
            {label}
          </SectionLabel>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="mt-7 max-w-5xl text-[length:var(--text-headline)] text-balance">
            {title}
          </h1>
        </Reveal>

        {lede && (
          <Reveal delay={170}>
            <p className="measure mt-7 text-lg leading-relaxed text-paper/65 sm:text-xl">
              {lede}
            </p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
