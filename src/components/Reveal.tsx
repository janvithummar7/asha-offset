"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Settles an element into place as it scrolls into view.
 *
 * The animation lives in globals.css against [data-reveal], scoped to
 * [data-js="on"] — so without JavaScript the content just renders.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "fade",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  /** Stagger, in milliseconds. */
  delay?: number;
  /** "fade" lifts the block; "image" wipes it open like a paper shutter. */
  variant?: "fade" | "image";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const attr = variant === "image" ? "data-reveal-image" : "data-reveal";

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.setAttribute(attr, "in");

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      show();
      return;
    }

    // Threshold stays at 0 deliberately: a block taller than the viewport
    // can never reach a fractional threshold, and would otherwise stay
    // hidden for good. The negative bottom margin is what delays the
    // trigger until the element has properly entered the page.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [attr]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      {...{ [attr]: "out" }}
    >
      {children}
    </Tag>
  );
}
