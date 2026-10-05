"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { certificates } from "@/lib/content";
import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { CropMarks, RegistrationMark } from "../print";

/**
 * Certificate wall with a document viewer.
 *
 * ── Adding or replacing a certificate ─────────────────────────────
 * Drop the scan into /public/documents under the file name listed
 * against that certificate in content.ts (gst-certificate.jpg,
 * udyam-certificate.jpg). The page finds it by name at build time (see
 * certificateFiles() in src/lib/assets.ts); the card then shows the real
 * document, and clicking it opens the viewer.
 *
 * Deliberately NOT published here: bank account details. The cancelled
 * cheque in particular stays off the public site — it has no file in
 * content.ts and is shared directly with procurement instead.
 */
type CertificateFiles = Record<string, { src: string; label: string }>;

export function Credentials({
  showLabel = true,
  files = {},
}: {
  showLabel?: boolean;
  /** Scans found in /public/documents — see certificateFiles() in assets.ts. */
  files?: CertificateFiles;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(null), []);

  // Trap the page behind the viewer and wire up Escape. The close button is
  // the only control inside, so Tab simply stays on it.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      // Hand focus back to whatever opened the viewer.
      openerRef.current?.focus();
    };
  }, [open, close]);

  const active = open ? files[open] : null;

  const openViewer = (index: string, opener: HTMLElement) => {
    openerRef.current = opener;
    setOpen(index);
  };

  return (
    <Section id="certifications" tone="stock">
      <SectionHead
        showLabel={showLabel}
        index="11"
        label="Credentials"
        title={
          <>
            Registered. Compliant.{" "}
            <span className="italic text-burgundy">Reliable.</span>
          </>
        }
        lede="Our GST and Udyam registration certificates, open to view. Bank details and the cancelled cheque are shared directly with procurement teams."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {certificates.map((cert, i) => {
          const file = files[cert.index];

          return (
            <Reveal key={cert.index} variant="drop" delay={i * 130}>
              <article className="group relative flex h-full flex-col border border-ink/15 bg-paper p-7 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-42px_rgb(13_27_46/0.6)] sm:p-8">
                <CropMarks inset="0.55rem" />

                {/* Document mark ---------------------------------- */}
                <div className="flex items-start justify-between">
                  <span className="eyebrow text-ink/65">{cert.index}</span>
                  <RegistrationMark size={20} className="text-brass/70" />
                </div>

                {file ? (
                  /* The real scan, laid like a sheet on the desk. Clicking
                     it is a pointer shortcut; the "View Document" button
                     below is the keyboard- and screen-reader route. */
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    onClick={(e) => openViewer(cert.index, e.currentTarget)}
                    className="relative mt-7 block aspect-[396/560] w-full max-w-[13rem] cursor-zoom-in overflow-hidden border border-ink/20 bg-white shadow-[0_22px_34px_-24px_rgb(13_27_46/0.6)] transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-[1.03]"
                  >
                    <Image
                      src={file.src}
                      alt=""
                      fill
                      sizes="208px"
                      className="object-contain"
                    />
                    <span className="eyebrow absolute inset-x-0 bottom-0 translate-y-full bg-ink/85 py-2 text-center text-paper transition-transform duration-300 group-hover:translate-y-0">
                      Enlarge
                    </span>
                  </button>
                ) : (
                  /* A folded-corner sheet standing in for a scan that is
                     not published. */
                  <div
                    className="relative mt-7 aspect-3/4 w-full max-w-[9rem] border border-ink/20 bg-cream"
                    aria-hidden="true"
                  >
                    <div
                      className="halftone absolute inset-0 opacity-40"
                      style={{ "--dot": "6px" } as React.CSSProperties}
                    />
                    {/* Ruled lines standing in for document text. */}
                    <div className="absolute inset-x-4 top-5 space-y-2">
                      <span className="block h-1 w-10 bg-burgundy/70" />
                      {[0, 1, 2, 3, 4].map((l) => (
                        <span
                          key={l}
                          className="block h-px bg-ink/25"
                          style={{ width: `${[90, 70, 85, 60, 78][l]}%` }}
                        />
                      ))}
                    </div>
                    {/* Folded corner. */}
                    <span className="absolute right-0 top-0 h-5 w-5 border-b border-l border-ink/25 bg-paper" />
                  </div>
                )}

                <h3 className="mt-7 font-serif text-[1.25rem] leading-snug text-coffee">
                  {cert.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/65">
                  {cert.description}
                </p>

                <div className="mt-auto pt-6">
                  {file ? (
                    <button
                      type="button"
                      onClick={(e) => openViewer(cert.index, e.currentTarget)}
                      className="eyebrow inline-flex items-center gap-2 text-burgundy underline-offset-4 hover:underline"
                    >
                      View Document
                      <span className="sr-only"> — {cert.title}</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  ) : (
                    <p className="eyebrow text-ink/65">Available on request</p>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* Document viewer ------------------------------------------- */}
      {open && active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.label}
          onClick={close}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/92 p-5 backdrop-blur-sm"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close document viewer"
            className="eyebrow absolute right-5 top-5 border border-paper/30 px-4 py-2.5 text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            Close ✕
          </button>

          <figure
            onClick={(e) => e.stopPropagation()}
            className="max-h-full w-fit max-w-full overflow-auto bg-paper p-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={`${active.label} of Asha Offset`}
              decoding="async"
              className="mx-auto block h-auto max-h-[72vh] w-auto max-w-full"
            />
            <figcaption className="eyebrow mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-ink/65">
              <span>{active.label}</span>
              <a
                href={active.src}
                target="_blank"
                rel="noopener noreferrer"
                className="text-burgundy underline underline-offset-4 hover:text-coffee"
              >
                Open full size ↗
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </figcaption>
          </figure>
        </div>
      )}
    </Section>
  );
}
