import Image from "next/image";
import Link from "next/link";
import { certificates } from "@/lib/content";
import { certificateFiles } from "@/lib/assets";
import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { CropMarks } from "../print";
import { Action } from "../ui";

/**
 * Home-page teaser for the registration certificates: the scans
 * themselves, each linking to the full page, where they open in a viewer.
 * Only certificates that have a scan in /public/documents appear.
 */
export function HomeCertificates() {
  const files = certificateFiles();
  const shown = certificates.filter((cert) => files[cert.index]);

  return (
    <Section id="certifications" tone="paper">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <SectionHead
            index="06"
            label="Credentials"
            title={
              <>
                Registered. Compliant.{" "}
                <span className="italic text-burgundy">Reliable.</span>
              </>
            }
            lede="GST and Udyam registered, with the certificates open to view. Bank details are shared directly with procurement teams."
          />
          <Reveal variant="blur" delay={250}>
            <div className="mt-9">
              <Action href="/certifications">
                View certificates &amp; vendor details
              </Action>
            </div>
          </Reveal>
        </div>

        {shown.length > 0 && (
          <ul className="grid grid-cols-2 gap-5 sm:gap-8">
            {shown.map((cert, i) => (
              <li key={cert.index}>
                <Reveal variant="drop" delay={i * 150}>
                  <Link
                    href="/certifications#certifications"
                    className="group block"
                  >
                    <figure className="relative border border-ink/15 bg-cream p-3 transition-[transform,box-shadow] duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_26px_46px_-34px_rgb(13_27_46/0.6)]">
                      <CropMarks inset="-0.35rem" className="text-ink/50" />
                      <div className="relative aspect-[396/560] overflow-hidden border border-ink/15 bg-white">
                        <Image
                          src={files[cert.index].src}
                          alt={`${cert.title} of Asha Offset`}
                          fill
                          sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 22vw"
                          className="object-contain"
                        />
                      </div>
                      <figcaption className="eyebrow mt-3 text-ink/65">
                        {cert.title}
                      </figcaption>
                    </figure>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
