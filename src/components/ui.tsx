import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "outline-light" | "ghost";

const VARIANTS: Record<Variant, string> = {
  solid:
    "bg-burgundy text-paper border border-burgundy hover:bg-coffee hover:border-coffee",
  outline:
    "border border-ink/30 text-ink hover:border-burgundy hover:bg-burgundy hover:text-paper",
  "outline-light":
    "border border-paper/35 text-paper hover:border-brass hover:bg-brass hover:text-ink",
  ghost:
    "border border-transparent text-ink hover:text-burgundy underline-offset-4",
};

/**
 * Letterpress-style action. Square corners, mono label, generous padding —
 * closer to a stamped block than a rounded app button.
 */
export function Action({
  href,
  children,
  variant = "solid",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const classes = `eyebrow group inline-flex items-center justify-center gap-2.5 px-7 py-4 transition-all duration-300 ${VARIANTS[variant]} ${className}`;

  const content = (
    <>
      {children}
      <span
        className="inline-block transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      >
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

/**
 * Definition row used by the company / vendor information cards.
 */
export function FactRow({
  term,
  detail,
  href,
  tone = "ink",
}: {
  term: string;
  detail: string;
  href?: string;
  tone?: "ink" | "paper";
}) {
  const muted = tone === "ink" ? "text-ink/45" : "text-paper/45";
  const border = tone === "ink" ? "border-ink/12" : "border-paper/15";

  return (
    <div
      className={`grid gap-1 border-b py-4 last:border-0 sm:grid-cols-[11rem_1fr] sm:gap-6 ${border}`}
    >
      <dt className={`eyebrow pt-1 ${muted}`}>{term}</dt>
      <dd className="text-[1.0625rem] leading-relaxed">
        {href ? (
          <a
            href={href}
            className="underline decoration-brass decoration-1 underline-offset-4 transition-colors hover:text-burgundy"
          >
            {detail}
          </a>
        ) : (
          detail
        )}
      </dd>
    </div>
  );
}
