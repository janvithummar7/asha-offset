"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { certificates } from "@/lib/content";
import { Reveal } from "../Reveal";
import { Section, SectionHead } from "../Section";
import { CropMarks, RegistrationMark } from "../print";

/**
 * Certificate wall with a document viewer.
 *
 * ── Adding the real certificates ──────────────────────────────────
 * Drop the scans into /public/documents and add the matching `src` to
 * the CERTIFICATE_FILES map below, keyed by certificate index. The card
 * then becomes clickable and opens in the lightbox.
 *
 * Deliberately NOT published here: GST number, PAN, Udyam number and
 * bank account details. The cancelled cheque in particular should stay
 * off the public site — share it directly with procurement instead.
 */
const CERTIFICATE_FILES: Record<string, { src: string; label: string }> = {
  // "01": { src: "/documents/gst-certificate.jpg", label: "GST Registration Certificate" },
  // "02": { src: "/documents/udyam-certificate.jpg", label: "Udyam Registration Certificate" },
};

export function Credentials({ showLabel = true }: { showLabel?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(null), []);

  // Trap the page behind the viewer and wire up Escape.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
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

  const active = open ? CERTIFICATE_FILES[open] : null;

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
        lede="Registration documents are available to procurement teams on request. Identifiers and banking details are shared directly, not published."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {certificates.map((cert, i) => {
          const file = CERTIFICATE_FILES[cert.index];

          return (
            <Reveal key={cert.index} delay={i * 110}>
              <article className="group relative flex h-full flex-col border border-ink/15 bg-paper p-7 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-42px_rgb(25_24_23/0.6)] sm:p-8">
                <CropMarks inset="0.55rem" />

                {/* Document mark ---------------------------------- */}
                <div className="flex items-start justify-between">
                  <span className="eyebrow text-ink/65">{cert.index}</span>
                  <RegistrationMark size={20} className="text-brass/70" />
                </div>

                {/* A folded-corner sheet standing in for the scan. */}
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
                      onClick={(e) => {
                        openerRef.current = e.currentTarget;
                        setOpen(cert.index);
                      }}
                      className="eyebrow inline-flex items-center gap-2 text-burgundy underline-offset-4 hover:underline"
                    >
                      View Document
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
            className="max-h-full w-full max-w-3xl overflow-auto bg-paper p-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={active.label}
              decoding="async"
              className="h-auto w-full"
            />
            <figcaption className="eyebrow mt-4 text-ink/65">
              {active.label}
            </figcaption>
          </figure>
        </div>
      )}
    </Section>
  );
}
