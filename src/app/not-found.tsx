import type { Metadata } from "next";
import Link from "next/link";
import { navLinks } from "@/lib/content";
import { Action } from "@/components/ui";
import { ColourBar, CropMarks, RegistrationMark } from "@/components/print";

export const metadata: Metadata = {
  title: "Page Not Found | Asha Offset",
  description:
    "That page could not be found. Browse our printing and packaging pages, or get in touch with Asha Offset in Gondal, Gujarat.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden bg-paper px-5 py-28 sm:px-8">
      <div
        className="halftone pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(60%_60%_at_70%_40%,#000,transparent)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[88rem]">
        <div className="relative max-w-3xl border border-ink/15 bg-cream p-8 sm:p-12">
          <CropMarks inset="0.7rem" />
          <ColourBar className="h-1.5 w-28" />

          <p className="eyebrow mt-7 flex items-center gap-3 text-burgundy">
            <RegistrationMark size={16} className="text-brass" />
            Error 404 — Sheet Not Found
          </p>

          <h1 className="mt-6 text-[length:var(--text-headline)] text-balance">
            This page came off the{" "}
            <span className="accent text-burgundy">press.</span>
          </h1>

          <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-ink/75">
            The page you asked for isn&rsquo;t here — it may have moved, or
            the link may be mistyped. Everything we print is still a click
            away.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Action href="/">Back to the home page</Action>
            <Action href="/contact" variant="outline">
              Request a printing quote
            </Action>
          </div>

          <nav aria-label="All pages" className="mt-11 border-t border-ink/15 pt-7">
            <h2 className="eyebrow text-ink/65">Every page</h2>
            <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-coffee underline decoration-brass-deep decoration-1 underline-offset-4 transition-colors hover:text-burgundy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/machinery"
                  className="text-coffee underline decoration-brass-deep decoration-1 underline-offset-4 transition-colors hover:text-burgundy"
                >
                  Machinery
                </Link>
              </li>
              <li>
                <Link
                  href="/certifications"
                  className="text-coffee underline decoration-brass-deep decoration-1 underline-offset-4 transition-colors hover:text-burgundy"
                >
                  Certifications
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
