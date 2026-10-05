"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const SEGMENTS = [0, 1, 2] as const;
const MIN_THUMB = 56;

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * The page's scrollbar, drawn as three separate inks — red, yellow, blue —
 * stacked down the right edge. The segments fill with solid colour as the
 * visitor scrolls, and a capsule thumb (draggable, and the track is
 * clickable) takes the colour of the segment it is passing through.
 *
 * It replaces the native scrollbar only once scripts have run (see the
 * html[data-js="on"] rule in globals.css), so without JavaScript the
 * ordinary scrollbar is still there. Scrolling by wheel, touch or keyboard
 * is untouched — this is a view of the scroll position plus a pointer
 * handle — so it is hidden from assistive technology.
 */
export function SideScrollbar() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!root || !track || !thumb) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)");

    const metrics = () => {
      const doc = document.documentElement;
      const view = innerHeight;
      const max = Math.max(0, doc.scrollHeight - view);
      const trackH = track.clientHeight;
      const thumbH = Math.min(
        trackH,
        Math.max(MIN_THUMB, (view / doc.scrollHeight) * trackH),
      );
      return { max, trackH, thumbH };
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      const { max, trackH, thumbH } = metrics();
      const p = max > 0 ? clamp(scrollY / max) : 0;
      const travel = Math.max(0, trackH - thumbH);
      // Where the middle of the thumb sits along the track, 0–1. The
      // segment fills and the thumb colour both follow this, so the colour
      // changes exactly as the thumb crosses from one ink to the next.
      const centre = trackH > 0 ? (p * travel + thumbH / 2) / trackH : 0;

      root.toggleAttribute("data-idle", max <= 0);
      root.dataset.seg = String(Math.min(2, Math.floor(centre * 3)));
      root.style.setProperty("--p", centre.toFixed(4));
      thumb.style.setProperty("--th", `${thumbH.toFixed(1)}px`);
      thumb.style.setProperty("--ty", `${(p * travel).toFixed(1)}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Dragging the thumb ---------------------------------------------
    let drag: { y: number; top: number; ratio: number } | null = null;

    const onThumbDown = (e: PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const { max, trackH, thumbH } = metrics();
      drag = {
        y: e.clientY,
        top: scrollY,
        ratio: trackH > thumbH ? max / (trackH - thumbH) : 0,
      };
      thumb.setPointerCapture(e.pointerId);
      root.setAttribute("data-drag", "");
    };
    const onThumbMove = (e: PointerEvent) => {
      if (!drag) return;
      scrollTo({
        top: drag.top + (e.clientY - drag.y) * drag.ratio,
        behavior: "instant",
      });
    };
    const onThumbUp = () => {
      drag = null;
      root.removeAttribute("data-drag");
    };

    // Clicking the track jumps there, centring the thumb on the click.
    const onTrackDown = (e: PointerEvent) => {
      const { max, trackH, thumbH } = metrics();
      if (trackH <= thumbH) return;
      const y = e.clientY - track.getBoundingClientRect().top - thumbH / 2;
      scrollTo({
        top: clamp(y / (trackH - thumbH)) * max,
        behavior: reduced.matches ? "instant" : "smooth",
      });
    };

    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    // Images and lazy content change the page height without scrolling.
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);

    thumb.addEventListener("pointerdown", onThumbDown);
    thumb.addEventListener("pointermove", onThumbMove);
    thumb.addEventListener("pointerup", onThumbUp);
    thumb.addEventListener("pointercancel", onThumbUp);
    track.addEventListener("pointerdown", onTrackDown);

    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      resize.disconnect();
      thumb.removeEventListener("pointerdown", onThumbDown);
      thumb.removeEventListener("pointermove", onThumbMove);
      thumb.removeEventListener("pointerup", onThumbUp);
      thumb.removeEventListener("pointercancel", onThumbUp);
      track.removeEventListener("pointerdown", onTrackDown);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="side-scroll no-print"
      data-seg="0"
      aria-hidden="true"
    >
      <div ref={trackRef} className="side-track">
        {SEGMENTS.map((i) => (
          <span
            key={i}
            className="side-seg"
            style={{ "--i": i } as CSSProperties}
          />
        ))}
        <div ref={thumbRef} className="side-thumb" />
      </div>
    </div>
  );
}
