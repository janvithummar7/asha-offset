"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company, navLinks } from "@/lib/content";
import { ColourBar } from "./print";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

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

  // Hold the page still while the mobile drawer is open, and let Escape
  // close it — a drawer you can open with the keyboard must close that way.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    const onScroll = () => setOpen(false);
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t?.closest("#mobile-nav, [aria-controls='mobile-nav']")) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  const isActive = (link: { href: string; match?: string[] }) => {
    if (link.href === "/") return pathname === "/";
    return [link.href, ...(link.match ?? [])].some((p) =>
      pathname.startsWith(p),
    );
  };

  /**
   * Every route except the home page opens with the dark <PageHeader>
   * band, so while the masthead is still transparent it has to be set
   * in light ink to stay legible. Once scrolled it sits on paper again.
   */
  // The home page now opens on the dark hero film, so it counts too.
  const onDark = !scrolled;

  return (
    <header
      className={`no-print nav-in fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled
          ? "bg-paper/92 shadow-[0_1px_0_rgb(13_27_46/0.12),0_12px_30px_-24px_rgb(13_27_46/0.5)] backdrop-blur-sm"
          : "on-ink bg-transparent [text-shadow:0_1px_2px_rgb(0_0_0/0.85),0_2px_14px_rgb(0_0_0/0.6)]"
      }`}
    >
      {/* Process-ink hairline across the very top of the sheet. */}
      <ColourBar className="h-[3px] w-full opacity-70" />

      <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-5 sm:px-8">
        {/* Masthead ------------------------------------------------- */}
        <Link
          href="/"
          className={`group flex flex-col justify-center transition-all duration-500 ${
            scrolled ? "py-3 sm:py-4" : "py-3 sm:py-5"
          }`}
        >
          {/* Transparent logo. Over a dark ground the light-blue variant keeps
              "Offset" legible without a backing plate. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={onDark ? "/logo-light.png" : "/logo.png"}
            alt="Asha Offset"
            width={704}
            height={162}
            className={`w-auto transition-all duration-500 ${
              scrolled ? "h-8 sm:h-12" : "h-9 drop-shadow-[0_2px_8px_rgb(0_0_0/0.55)] sm:h-14"
            }`}
          />

          <span
            className={`eyebrow hidden overflow-hidden transition-all duration-500 sm:block ${
              scrolled ? "mt-0 max-h-0 opacity-0" : "mt-1.5 max-h-5 opacity-100"
            } ${onDark ? "text-paper/85" : "text-ink/65"}`}
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
              aria-current={isActive(link) ? "page" : undefined}
              className={`eyebrow relative py-2 text-[0.8125rem] font-semibold transition-colors duration-300 ${
                isActive(link)
                  ? onDark
                    ? "text-brass-light"
                    : "text-burgundy"
                  : onDark
                    ? "text-paper hover:text-brass-light"
                    : "text-ink/75 hover:text-ink"
              }`}
            >
              {link.label}
              {/* Brass underscore marks the current page. */}
              <span
                className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-brass transition-transform duration-300 ${
                  isActive(link) ? "scale-x-100" : "scale-x-0"
                }`}
                aria-hidden="true"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={`eyebrow group hidden items-center gap-2.5 border px-5 py-3 font-semibold shadow-[0_10px_24px_-12px_rgb(183_28_40/0.9)] transition-all duration-300 hover:-translate-y-0.5 sm:inline-flex ${
              onDark
                ? "border-burgundy bg-burgundy text-paper hover:border-paper hover:bg-paper hover:text-burgundy"
                : "border-burgundy bg-burgundy text-paper hover:border-coffee hover:bg-coffee"
            }`}
          >
            Request a Quote
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>

          {/* Drawer toggle ------------------------------------------ */}
          <button
            type="button"
            ref={toggleRef}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className={`group flex h-11 w-11 items-center justify-center border-2 shadow-[0_10px_22px_-10px_rgb(183_28_40/0.85)] transition-all duration-300 active:scale-95 lg:hidden ${
              open
                ? "border-burgundy bg-paper text-burgundy"
                : "border-paper/85 bg-burgundy text-paper hover:bg-paper hover:text-burgundy"
            }`}
          >
            {/* Three bars: the lower two are shorter and right-aligned until
                hover, then every bar settles to full width. Open turns them
                into a cross. */}
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span
                className={`absolute right-0 block h-0.5 rounded-full bg-current transition-all duration-300 ${
                  open ? "top-1.5 w-5 rotate-45" : "top-0 w-5"
                }`}
              />
              <span
                className={`absolute right-0 top-1.5 block h-0.5 rounded-full bg-current transition-all duration-300 ${
                  open ? "w-5 opacity-0" : "w-3.5 opacity-100 group-hover:w-5"
                }`}
              />
              <span
                className={`absolute right-0 block h-0.5 rounded-full bg-current transition-all duration-300 ${
                  open
                    ? "top-1.5 w-5 -rotate-45"
                    : "top-3 w-2.5 group-hover:w-5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer ---------------------------------------------- */}
      {/* `inert` while collapsed: the drawer stays in the DOM so it can
          animate, but its links leave the tab order and the a11y tree. */}
      <div
        id="mobile-nav"
        inert={!open}
        className={`absolute right-3 top-full mt-2 w-56 origin-top-right overflow-y-auto [text-shadow:none] border border-ink/15 bg-paper text-ink shadow-[0_24px_50px_-20px_rgb(13_27_46/0.55)] transition-[opacity,transform] duration-300 sm:right-8 sm:w-64 lg:hidden ${
          open
            ? "max-h-[calc(100svh-6rem)] scale-100 opacity-100"
            : "pointer-events-none max-h-0 scale-95 opacity-0"
        }`}
      >
        <nav aria-label="Primary (mobile)" className="p-3">
          <ul className="space-y-1.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link) ? "page" : undefined}
                  className={`block border px-3.5 py-2.5 text-left text-[0.9375rem] font-medium focus-visible:outline-burgundy transition-colors ${
                    isActive(link)
                      ? "border-burgundy bg-burgundy/8 text-burgundy"
                      : "border-ink/12 text-ink hover:border-ink/35 hover:bg-cream"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="eyebrow mt-3 block bg-burgundy px-4 py-3 text-center font-semibold text-paper shadow-[0_10px_24px_-12px_rgb(183_28_40/0.9)] transition-colors hover:bg-coffee focus-visible:outline-burgundy"
          >
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
