import { company } from "@/lib/content";
import { Reveal } from "../Reveal";
import { ColourBar, RegistrationMark } from "../print";
import { Action } from "../ui";

/**
 * Closing band — the last thing a prospect reads before the colophon.
 */
export function ContactCta() {
  return (
    <section className="on-ink relative overflow-hidden bg-coffee px-5 py-20 text-paper sm:px-8 sm:py-28">
      <div
        className="halftone pointer-events-none absolute inset-0 opacity-[0.1]"
        style={
          {
            "--dot-color": "var(--color-paper)",
            "--dot": "8px",
          } as React.CSSProperties
        }
        aria-hidden="true"
      />
      <ColourBar className="absolute inset-x-0 top-0 h-[3px] w-full" />

      <div className="relative mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-brass">
              <RegistrationMark size={16} />
              Request a Quote
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h2 className="mt-7 max-w-3xl text-[length:var(--text-headline)] text-balance">
              Let&rsquo;s Bring Your Next Print to{" "}
              <span className="italic text-brass">Life.</span>
            </h2>
          </Reveal>

          <Reveal delay={170}>
            <p className="measure mt-7 text-lg leading-relaxed text-paper/65">
              Have a packaging, label or commercial printing requirement? Tell
              us what you need and our team will get back to you.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Action href="/contact" variant="outline-light">
                Request a Quote
              </Action>
              <Action
                href={company.phoneHref}
                variant="ghost"
                external
                className="!text-paper/80 hover:!text-brass"
              >
                Call {company.phone}
              </Action>
            </div>
          </Reveal>
        </div>

        {/* Imprint block -------------------------------------------- */}
        <Reveal delay={300}>
          <address className="border-l border-paper/20 pl-7 not-italic">
            <p className="eyebrow text-brass">Works</p>
            <p className="mt-4 leading-relaxed text-paper/70">
              {company.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="mt-5">
              <a
                href={company.emailHref}
                className="break-all text-paper/70 underline decoration-brass underline-offset-4 transition-colors hover:text-paper"
              >
                {company.email}
              </a>
            </p>
          </address>
        </Reveal>
      </div>
    </section>
  );
}
