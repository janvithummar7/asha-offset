import Link from "next/link";
import { company } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionDivider } from "./SectionDivider";
import { Action } from "./ui";

const directionsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

const LOCATIONS = [company.address, company.secondAddress];

/** Two short lists read faster than one long one of nine. */
const EXPLORE = [
  {
    heading: "What we do",
    links: [
      { label: "Products", href: "/products" },
      { label: "Capabilities", href: "/manufacturing" },
      { label: "Machinery", href: "/machinery" },
      { label: "Industries", href: "/industries" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Quality", href: "/quality" },
      { label: "Certifications", href: "/certifications" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

const LINK =
  "group inline-flex items-center gap-2 py-1 text-paper/80 transition-colors hover:text-paper";
const RULE =
  "h-px w-0 bg-brass-light transition-all duration-300 group-hover:w-4";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-ink no-print relative overflow-hidden bg-ink text-paper">
      {/* Halftone wash climbing out of the fold. */}
      <div
        className="halftone pointer-events-none absolute inset-0 opacity-[0.07]"
        style={
          {
            "--dot-color": "var(--color-paper)",
            "--dot": "9px",
          } as React.CSSProperties
        }
        aria-hidden="true"
      />
      <SectionDivider placement="flow" />

      <div className="relative mx-auto max-w-[88rem] px-5 pb-8 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr_1fr] lg:gap-12">
          {/* Brand ------------------------------------------------- */}
          <Reveal variant="drop">
            <Link href="/" className="inline-block" aria-label="Asha Offset, home">
              {/* Light-blue variant of the logo, made for dark grounds. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-light.png"
                alt="Asha Offset"
                width={704}
                height={162}
                loading="lazy"
                className="h-14 w-auto sm:h-16"
              />
            </Link>

            <p className="mt-6 font-serif text-2xl italic leading-snug text-paper">
              {company.tagline}
            </p>
            <p className="measure mt-4 leading-relaxed text-paper/75">
              Printing and packaging in {company.shortLocation}, since{" "}
              {company.since}. Labels, stickers, cartons and commercial
              printing, made on our own presses.
            </p>

            <div className="mt-8">
              <Action href="/contact" variant="outline-light">
                Request a printing quote
              </Action>
            </div>
          </Reveal>

          {/* Explore ----------------------------------------------- */}
          <nav aria-label="Footer">
            <Reveal variant="drop" delay={140} className="grid grid-cols-2 gap-8">
              {EXPLORE.map((group) => (
                <div key={group.heading}>
                  <h2 className="eyebrow text-brass-light">{group.heading}</h2>
                  <ul className="mt-5 space-y-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className={LINK}>
                          <span className={RULE} aria-hidden="true" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          </nav>

          {/* Visit & contact --------------------------------------- */}
          <Reveal variant="drop" delay={280}>
            <h2 className="eyebrow text-brass-light">Visit &amp; contact</h2>
            <address className="mt-5 space-y-5 not-italic">
              {LOCATIONS.map((location) => (
                <div key={location.area}>
                  <p className="eyebrow text-paper/60">{location.area}</p>
                  <p className="mt-2 leading-relaxed text-paper/80">
                    {location.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                  <p className="mt-2">
                    <a
                      href={directionsUrl(location.full)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="eyebrow inline-flex items-center gap-2 text-brass-light underline decoration-brass-light/50 underline-offset-4 transition-colors hover:text-paper"
                    >
                      Get directions
                      <span aria-hidden="true">↗</span>
                      <span className="sr-only">
                        to {location.area} (opens Google Maps in a new tab)
                      </span>
                    </a>
                  </p>
                </div>
              ))}

              <ul className="space-y-2 text-paper/80">
                <li>
                  <span className="eyebrow mr-3 text-paper/60">Call</span>
                  <a
                    href={company.phoneHref}
                    className="transition-colors hover:text-paper"
                  >
                    {company.phone}
                  </a>
                </li>
                <li>
                  <span className="eyebrow mr-3 text-paper/60">Email</span>
                  <a
                    href={company.emailHref}
                    className="break-all transition-colors hover:text-paper"
                  >
                    {company.email}
                  </a>
                </li>
              </ul>
            </address>
          </Reveal>
        </div>

        {/* Colophon ------------------------------------------------- */}
        <div className="mt-16 flex flex-col gap-4 border-t border-paper/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-paper/65">
            © {year} {company.name}. All rights reserved.
          </p>
          <p className="eyebrow text-paper/65">
            {company.city}, {company.state} · Est. {company.since}
          </p>
          <a
            href="#main"
            className="eyebrow text-paper/80 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
