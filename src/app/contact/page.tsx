import { PageHeader, Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import {
  ColourBar,
  CropMarks,
  InkStamp,
  RegistrationMark,
} from "@/components/print";
import { Action } from "@/components/ui";
import { company, yearsInBusiness } from "@/lib/content";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  company.mapQuery,
)}&output=embed`;

const directionsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

const LOCATIONS = [company.address, company.secondAddress];

export const metadata = pageMetadata({
  title: "Contact Asha Offset | Gondal Printing & Packaging",
  description:
    "Contact Asha Offset in Gondal, Gujarat for labels, stickers, packaging, cartons and commercial printing requirements. Request a quote today.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHeader
        index="13"
        label="Contact"
        title={
          <>
            Let&rsquo;s Bring Your Next Print to{" "}
            <span className="accent text-brass">Life.</span>
          </>
        }
        lede="Have a packaging, label or commercial printing requirement? Tell us what you need and our team will get back to you."
      />

      <Section tone="stock">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Imprint column ---------------------------------------- */}
          <div>
            <Reveal>
              <div className="relative border border-ink/15 bg-paper p-7 sm:p-9">
                <CropMarks inset="0.6rem" />

                <div className="flex items-start justify-between">
                  <h2 className="font-display text-2xl text-coffee sm:text-3xl">
                    {company.name}
                  </h2>
                  <RegistrationMark size={22} className="text-brass" />
                </div>

                <ColourBar className="mt-6 h-1.5 w-24" />

                <address className="mt-7 not-italic">
                  {LOCATIONS.map((location, i) => (
                    <div key={location.area} className={i > 0 ? "mt-6" : ""}>
                      <p className="eyebrow text-ink/65">{location.area}</p>
                      <p className="mt-2.5 leading-relaxed text-ink/75">
                        {location.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}

                  <p className="eyebrow mt-7 text-ink/65">Phone</p>
                  <p className="mt-2">
                    <a
                      href={company.phoneHref}
                      className="font-display text-2xl text-coffee underline decoration-brass decoration-1 underline-offset-4 transition-colors hover:text-burgundy"
                    >
                      {company.phone}
                    </a>
                  </p>

                  <p className="eyebrow mt-6 text-ink/65">Email</p>
                  <p className="mt-2">
                    <a
                      href={company.emailHref}
                      className="break-all text-lg text-coffee underline decoration-brass decoration-1 underline-offset-4 transition-colors hover:text-burgundy"
                    >
                      {company.email}
                    </a>
                  </p>
                </address>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Action href={company.phoneHref} external>
                    Call Us
                  </Action>
                  <Action href={company.emailHref} variant="outline" external>
                    Email Us
                  </Action>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-7 flex items-center gap-6">
                <InkStamp
                  lines={["EST. 1998", "Gondal, Gujarat"]}
                  className="border-burgundy/50 text-burgundy"
                />
                <p className="text-[0.9375rem] leading-relaxed text-ink/65">
                  Printing from the same town for over {yearsInBusiness} years.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form column -------------------------------------------- */}
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      {/* Location ------------------------------------------------- */}
      <Section tone="paper" className="!py-0 sm:!py-0">
        <div className="grid gap-px border border-ink/15 bg-ink/12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="bg-cream p-8 sm:p-10">
            <p className="eyebrow text-brass-deep">Find Us</p>
            <h2 className="mt-5 font-display text-[clamp(1.5rem,2.6vw,2.125rem)] text-coffee">
              {company.city}, {company.state}
            </h2>
            <p className="measure mt-5 leading-relaxed text-ink/65">
              Our works sit on Gundala Road near the bus stand, in the
              Jasmatnagar area of Gondal — a short drive from the Rajkot
              highway. We are also at Jamvadi, on NH-27 near Shubham Zone.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {LOCATIONS.map((location) => (
                <Action
                  key={location.area}
                  href={directionsUrl(location.full)}
                  variant="outline"
                  external
                >
                  Get Directions — {location.area}
                </Action>
              ))}
            </div>
          </Reveal>

          <div className="relative min-h-[22rem] bg-cream lg:min-h-[28rem]">
            <iframe
              src={MAP_SRC}
              title={`Map showing ${company.name} in ${company.shortLocation}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.55] sepia-[0.18] contrast-[1.05]"
            />
          </div>
        </div>
      </Section>

      <div className="h-20 bg-paper sm:h-28" aria-hidden="true" />
    </>
  );
}
