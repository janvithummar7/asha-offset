import Link from "next/link";
import { industries } from "@/lib/content";
import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { Action } from "../ui";

/**
 * Home-page teaser for sectors served, with a pointer to the quality
 * process. Full descriptions are on /industries and /quality.
 */
export function HomeIndustries() {
  return (
    <Section id="industries" tone="paper">
      <SectionHead
        index="04"
        label="Industries"
        title={
          <>
            Printing Across{" "}
            <span className="italic text-burgundy">Industries</span>
          </>
        }
        lede="Labels, packaging and commercial print for businesses that need it made right, every time."
      />

      <ul className="mt-12 grid grid-cols-2 gap-px border border-ink/15 bg-ink/12 lg:grid-cols-4">
        {industries.map((industry, i) => (
          <li key={industry.name} className="bg-paper">
            <Reveal delay={i * 90} className="h-full">
              <Link
                href="/industries"
                className="group block h-full px-6 py-8 transition-colors duration-300 hover:bg-cream sm:px-8"
              >
                <span className="eyebrow text-ink/65">{industry.index}</span>
                <span className="mt-4 block font-serif text-[1.375rem] text-coffee sm:text-2xl">
                  {industry.name}
                </span>
                <span
                  className="mt-4 block h-px w-8 bg-brass transition-all duration-500 group-hover:w-16"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={150}>
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Action href="/industries">See industries we serve</Action>
          <Link
            href="/quality"
            className="eyebrow text-burgundy underline decoration-brass underline-offset-4 hover:text-coffee"
          >
            How we keep print quality consistent →
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
