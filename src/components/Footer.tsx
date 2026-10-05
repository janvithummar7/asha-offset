import Link from "next/link";
import { company, footerLinks, navLinks } from "@/lib/content";
import { ColourBar, RegistrationMark } from "./print";

export function Footer() {
  const year = 2026;

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
      <ColourBar className="h-[3px] w-full" />

      <div className="relative mx-auto max-w-[88rem] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Masthead ---------------------------------------------- */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Asha Offset"
              width={704}
              height={162}
              loading="lazy"
              className="logo-halo h-11 w-auto sm:h-16"
            />
            <p className="mt-4 font-serif text-xl italic text-paper/75">
              {company.tagline}
            </p>
            <p className="eyebrow mt-5 text-paper/60">
              Printing Excellence Since {company.since}.
            </p>

            <RegistrationMark className="mt-8 text-brass/60" size={30} />
          </div>

          {/* Pages -------------------------------------------------- */}
          <nav aria-label="Footer">
            <h2 className="eyebrow text-brass">Pages</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-paper/70 transition-colors hover:text-paper"
                  >
                    <span
                      className="h-px w-0 bg-brass transition-all duration-300 group-hover:w-4"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-paper/70 transition-colors hover:text-paper"
                  >
                    <span
                      className="h-px w-0 bg-brass transition-all duration-300 group-hover:w-4"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact ------------------------------------------------ */}
          <div>
            <h2 className="eyebrow text-brass">Contact</h2>
            <ul className="mt-5 space-y-3 text-paper/70">
              <li>
                <a
                  href={company.phoneHref}
                  className="transition-colors hover:text-paper"
                >
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={company.emailHref}
                  className="break-all transition-colors hover:text-paper"
                >
                  {company.email}
                </a>
              </li>
              <li className="pt-1 leading-relaxed">
                {company.shortLocation}, India
              </li>
            </ul>
          </div>
        </div>

        {/* Colophon ------------------------------------------------- */}
        <div className="mt-16 flex flex-col gap-4 border-t border-paper/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-paper/60">
            © {year} {company.name}. All Rights Reserved.
          </p>
          <p className="eyebrow text-paper/60">
            {company.city}, {company.state} · EST. {company.since}
          </p>
        </div>
      </div>
    </footer>
  );
}
