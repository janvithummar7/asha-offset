"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { company } from "@/lib/content";

/**
 * Persistent call/enquire bar for small screens — a printing enquiry
 * usually starts with a phone call, so the number stays within thumb
 * reach on every page.
 */
export function MobileCta() {
  const pathname = usePathname();

  // The contact page already puts both actions in front of the reader.
  if (pathname.startsWith("/contact")) return null;

  return (
    <div className="no-print bar-in fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-ink/15 bg-paper/95 backdrop-blur-sm sm:hidden">
      <a
        href={company.phoneHref}
        className="eyebrow flex items-center justify-center gap-2 py-4 text-ink"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
        </svg>
        Call Us
      </a>
      <Link
        href="/contact"
        className="eyebrow flex items-center justify-center bg-burgundy py-4 text-paper"
      >
        Request a Quote
      </Link>
    </div>
  );
}
