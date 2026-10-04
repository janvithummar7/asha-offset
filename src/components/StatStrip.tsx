import { stats } from "@/lib/content";
import { Counter } from "./Counter";
import { Reveal } from "./Reveal";

/**
 * Heritage figures, set like the statistics panel of a printed annual
 * report: large serif numerals over small uppercase labels.
 */
export function StatStrip() {
  return (
    <section
      aria-label="Company figures"
      className="on-ink relative overflow-hidden border-y border-ink/15 bg-ink text-paper"
    >
      <div
        className="halftone pointer-events-none absolute inset-0 opacity-[0.08]"
        style={
          {
            "--dot-color": "var(--color-paper)",
            "--dot": "8px",
          } as React.CSSProperties
        }
        aria-hidden="true"
      />

      <dl className="relative mx-auto grid max-w-[88rem] grid-cols-2 gap-px bg-paper/12 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 110}
            className="bg-ink px-5 py-10 sm:px-8 sm:py-14"
          >
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="flex flex-wrap items-baseline gap-x-2 font-serif leading-none text-paper">
                <span className="text-[clamp(2rem,4.4vw,3.5rem)] whitespace-nowrap">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                {stat.unit && (
                  <span className="text-[clamp(1.1rem,2vw,1.75rem)] text-paper/80">
                    {stat.unit}
                  </span>
                )}
              </span>
              <span className="eyebrow mt-4 block text-brass">
                {stat.label}
              </span>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
