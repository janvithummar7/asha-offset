/**
 * Small decorative elements borrowed from the pre-press bench:
 * registration targets, crop marks, colour control bars, ink stamps.
 *
 * All are purely ornamental and hidden from assistive technology.
 */

import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Registration target — the cross-hair used to align the four plates. */
/* ------------------------------------------------------------------ */

export function RegistrationMark({
  className = "",
  size = 26,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        vectorEffect="non-scaling-stroke"
      >
        <circle cx="12" cy="12" r="6.25" />
        <circle cx="12" cy="12" r="2.4" />
        <path d="M12 0v7.2M12 16.8V24M0 12h7.2M16.8 12H24" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Crop marks — the corner ticks showing where the sheet is trimmed.   */
/* ------------------------------------------------------------------ */

export function CropMarks({
  className = "",
  inset = "0.75rem",
}: {
  className?: string;
  inset?: string;
}) {
  const arm = "1.15rem";
  const common =
    "pointer-events-none absolute inset-0 text-ink/65 [&>span]:absolute [&>span]:bg-current";

  return (
    <span className={`${common} ${className}`} aria-hidden="true">
      {/* top-left */}
      <span style={{ top: inset, left: inset, width: arm, height: "1px" }} />
      <span style={{ top: inset, left: inset, width: "1px", height: arm }} />
      {/* top-right */}
      <span style={{ top: inset, right: inset, width: arm, height: "1px" }} />
      <span style={{ top: inset, right: inset, width: "1px", height: arm }} />
      {/* bottom-left */}
      <span style={{ bottom: inset, left: inset, width: arm, height: "1px" }} />
      <span style={{ bottom: inset, left: inset, width: "1px", height: arm }} />
      {/* bottom-right */}
      <span
        style={{ bottom: inset, right: inset, width: arm, height: "1px" }}
      />
      <span
        style={{ bottom: inset, right: inset, width: "1px", height: arm }}
      />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Colour control bar — the CMYK patch strip printed on the sheet edge.*/
/* ------------------------------------------------------------------ */

export function ColourBar({
  className = "",
  vertical = false,
}: {
  className?: string;
  vertical?: boolean;
}) {
  const inks = [
    "var(--color-plate-c)",
    "var(--color-plate-m)",
    "var(--color-plate-y)",
    "var(--color-plate-k)",
  ];

  return (
    <span
      className={`flex ${vertical ? "flex-col" : "flex-row"} ${className}`}
      aria-hidden="true"
    >
      {inks.map((ink) => (
        <span key={ink} className="flex-1" style={{ background: ink }} />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Ink stamp — the rubber-stamp badge, slightly rotated.               */
/* ------------------------------------------------------------------ */

export function InkStamp({
  lines,
  className = "",
  rotate = -7,
}: {
  lines: string[];
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      className={`relative inline-flex aspect-square w-[7.5rem] shrink-0 flex-col items-center justify-center gap-1 rounded-full border-2 border-current text-center ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/* Inner ring, as on a struck rubber stamp. */}
      <span
        className="pointer-events-none absolute inset-[7px] rounded-full border border-current opacity-50"
        aria-hidden="true"
      />
      {lines.map((line, i) => (
        <span
          key={line}
          className={`eyebrow px-3 leading-tight ${
            i === 0
              ? "text-[0.7rem]"
              : "text-[0.52rem] tracking-[0.14em] opacity-80"
          }`}
        >
          {line}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Section label — "01 / ABOUT", the catalogue running head.           */
/* ------------------------------------------------------------------ */

export function SectionLabel({
  index,
  children,
  className = "",
  tone = "ink",
}: {
  index: string;
  children: ReactNode;
  className?: string;
  tone?: "ink" | "paper";
}) {
  const muted = tone === "ink" ? "text-ink/65" : "text-paper/60";
  const rule = tone === "ink" ? "bg-ink/20" : "bg-paper/25";
  const strong = tone === "ink" ? "text-burgundy" : "text-brass";

  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span className={muted}>{index}</span>
      <span className={`h-px w-6 ${rule}`} aria-hidden="true" />
      <span className={strong}>{children}</span>
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Page number — the folio mark at the foot of a catalogue page.       */
/* ------------------------------------------------------------------ */

export function Folio({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  return (
    <span className={`eyebrow text-ink/65 ${className}`} aria-hidden="true">
      — {value} —
    </span>
  );
}
