import Link from "next/link";
import { ClientGrid } from "../ClientGrid";
import { Reveal } from "../Reveal";
import { Section } from "../Section";
import { SectionLabel } from "../print";

/**
 * Home-page strip of client logos. The full wall, with the story around
 * it, is on /about.
 */
export function HomeClients() {
  return (
    <Section id="clients" tone="stock" className="!py-16 sm:!py-20">
      <h2 className="sr-only">Our clients</h2>
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <SectionLabel index="05">Trusted by</SectionLabel>
          <Link
            href="/about#clients"
            className="eyebrow text-burgundy underline decoration-brass underline-offset-4 hover:text-coffee"
          >
            Our clients →
          </Link>
        </div>
      </Reveal>

      <div className="mt-8">
        <ClientGrid compact />
      </div>
    </Section>
  );
}
