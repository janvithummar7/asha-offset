"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, navLinks } from "@/lib/content";
import { ColourBar } from "./print";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Compact the masthead once the reader has left the top of the page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation. Adjusting during render rather than
  // in an effect avoids a second paint with the drawer still open.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Hold the page still while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /**
   * Every route except the home page opens with the dark <PageHeader>
   * band, so while the masthead is still transparent it has to be set
   * in light ink to stay legible. Once scrolled it sits on paper again.
   */
  const onDark = pathname !== "/" && !scrolled;

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled
          ? "bg-paper/92 shadow-[0_1px_0_rgb(25_24_23/0.12),0_12px_30px_-24px_rgb(25_24_23/0.5)] backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      {/* Process-ink hairline across the very top of the sheet. */}
      <ColourBar className="h-[3px] w-full opacity-70" />

      <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-5 sm:px-8">
        {/* Masthead ------------------------------------------------- */}
        <Link
          href="/"
          className={`group flex flex-col justify-center transition-all duration-500 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <span
            className={`font-serif leading-none tracking-tight transition-all duration-500 ${
              scrolled
                ? "text-xl sm:text-[1.35rem]"
                : "text-2xl sm:text-[1.7rem]"
            } ${onDark ? "text-paper" : "text-ink"}`}
          >
            ASHA{" "}
            <span className={onDark ? "text-brass" : "text-burgundy"}>
              OFFSET
            </span>
          </span>
          <span
            className={`eyebrow overflow-hidden transition-all duration-500 ${
              scrolled ? "mt-0 max-h-0 opacity-0" : "mt-1.5 max-h-5 opacity-100"
            } ${onDark ? "text-paper/50" : "text-ink/45"}`}
          >
            Printing Excellence Since {company.since}
          </span>
        </Link>

        {/* Desktop navigation --------------------------------------- */}
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`eyebrow relative py-2 transition-colors duration-300 ${
                isActive(link.href)
                  ? onDark
                    ? "text-brass"
                    : "text-burgundy"
                  : onDark
                    ? "text-paper/70 hover:text-paper"
                    : "text-ink/65 hover:text-ink"
              }`}
            >
              {link.label}
              {/* Brass underscore marks the current page. */}
              <span
                className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-brass transition-transform duration-300 ${
                  isActive(link.href) ? "scale-x-100" : "scale-x-0"
                }`}
                aria-hidden="true"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={`eyebrow hidden px-5 py-3 transition-colors duration-300 sm:inline-block ${
              onDark
                ? "border border-paper/35 text-paper hover:border-brass hover:bg-brass hover:text-ink"
                : "border border-ink/25 text-ink hover:border-burgundy hover:bg-burgundy hover:text-paper"
            }`}
          >
            Request a Quote
          </Link>

          {/* Drawer toggle ------------------------------------------ */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`flex h-11 w-11 items-center justify-center border transition-colors lg:hidden ${
              onDark
                ? "border-paper/30 text-paper hover:border-paper/60"
                : "border-ink/20 text-ink hover:border-ink/45"
            }`}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-px w-5 bg-current transition-opacity duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer ---------------------------------------------- */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-ink/10 bg-paper transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Primary (mobile)" className="px-5 py-3 sm:px-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className="flex items-baseline gap-4 border-b border-ink/10 py-4 last:border-0"
            >
              <span className="eyebrow text-ink/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`font-serif text-2xl ${
                  isActive(link.href) ? "text-burgundy" : "text-ink"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}

          <Link
            href="/contact"
            className="eyebrow mt-5 mb-2 block bg-burgundy px-5 py-4 text-center text-paper"
          >
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
