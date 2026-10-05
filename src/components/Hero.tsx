"use client";

import { Fragment, useEffect, useRef } from "react";
import { Action } from "./ui";

/**
 * Scroll-scrubbed hero film — "From Sheet to Shelf".
 *
 * The page scrolls through 800vh while a pinned stage seeks a 48 s video
 * to match. Four captions ride over the film, a rail marks the current
 * step, and the closing headline lands on the final frame.
 *
 * Anyone who prefers reduced motion gets a static hero instead (see the `STATIC_GATES` CSS
 * in globals.css — the same queries are repeated here and in the
 * <picture> sources below). No video is downloaded in that mode.
 */

const VIDEO_URL = "/hero/hero-scrub.mp4";
const VIDEO_BYTES = 14537714;
/** Scroll progress at which the film reaches its last frame. */
const FILM_END = 0.92;
const START_YEAR = 1998;

const STATIC_GATES = ["(prefers-reduced-motion: reduce)"];

type Step = {
  index: string;
  label: string;
  side: "left" | "right";
  /** Scroll-progress window the caption is visible in. */
  a: number;
  b: number;
  words: string[];
  body: string;
};

const YEARS = new Date().getFullYear() - START_YEAR;

const STEPS: Step[] = [
  {
    index: "01",
    label: "Ink",
    side: "right",
    a: 0,
    b: 0.215,
    words: [`${YEARS}`, "years", "of", "getting", "colour", "right."],
    body: "Every job starts on our own offset press in Gondal.",
  },
  {
    index: "02",
    label: "Press",
    side: "left",
    a: 0.255,
    b: 0.455,
    words: ["One", "press.", "One", "standard."],
    body: "Labels, stickers, brochures and carton prints, checked sheet after sheet.",
  },
  {
    index: "03",
    label: "Fold",
    side: "left",
    a: 0.48,
    b: 0.64,
    words: ["Then", "the", "print", "becomes", "a", "box."],
    body: "Printed sheets are cut, creased and folded into cartons and boxes.",
  },
  {
    index: "04",
    label: "Dispatch",
    side: "left",
    a: 0.725,
    b: 0.875,
    words: ["Packed.", "Stacked.", "Ready", "to", "ship."],
    body: "Orders leave our Gondal works for businesses across Gujarat.",
  },
];

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const smooth = (p: number, a: number, b: number) => {
  const t = clamp((p - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

/** Stagger delay for word `i` of `n`, as a 0–.3 scroll threshold. */
const threshold = (i: number, n: number) =>
  n > 1 ? +((i / (n - 1)) * 0.3).toFixed(3) : 0;

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const settleRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const bandRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const hero = heroRef.current!;
    const stage = stageRef.current!;
    const video = videoRef.current!;
    const settle = settleRef.current!;
    const cue = cueRef.current!;
    const ringc = ringRef.current!;
    const bands = bandRefs.current.map((el, i) => ({
      el: el!,
      a: STEPS[i].a,
      b: STEPS[i].b,
      o: -1,
      k: -1,
    }));
    const rail = railRefs.current;

    const heroProgress = () => {
      const range = hero.offsetHeight - innerHeight;
      if (range <= 0) return 1;
      return clamp(-hero.getBoundingClientRect().top / range, 0, 1);
    };

    /* Seeks are queued: a new one starts only after the last finished. */
    let seekBusy = false;
    let pendingTime: number | null = null;
    const requestSeek = (t: number) => {
      if (!video.duration) return;
      if (seekBusy) {
        pendingTime = t;
        return;
      }
      if (Math.abs(video.currentTime - t) < 0.01) return;
      seekBusy = true;
      video.currentTime = t;
    };
    const onSeeked = () => {
      seekBusy = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        requestSeek(t);
      }
    };

    let lastK = -1;
    let lastRail = -1;
    let lastCue = -1;
    const updateOverlay = (p: number) => {
      const k = Math.round(smooth(p, 0.885, 0.975) * 1000) / 1000;
      if (
        Math.abs(k - lastK) > 0.008 ||
        (k !== lastK && (k === 0 || k === 1))
      ) {
        lastK = k;
        settle.style.setProperty("--k", String(k));
        settle.classList.toggle("live", k > 0.85);
      }

      const c = Math.round((1 - smooth(p, 0.004, 0.04)) * 100) / 100;
      if (c !== lastCue) {
        lastCue = c;
        cue.style.opacity = String(c);
      }

      let on = -1;
      bands.forEach((b, i) => {
        const f = Math.min(0.02, (b.b - b.a) / 3);
        const op =
          (i === 0 ? 1 : smooth(p, b.a, b.a + f)) * (1 - smooth(p, b.b - f, b.b));
        const kk = i === 0 ? 1 : clamp((p - b.a) / 0.03, 0, 1);
        const o = Math.round(op * 100) / 100;
        const kr = Math.round(kk * 100) / 100;
        if (o !== b.o) {
          b.o = o;
          b.el.style.opacity = String(o);
        }
        if (kr !== b.k) {
          b.k = kr;
          b.el.style.setProperty("--k", String(kr));
        }
        const next = bands[i + 1];
        if (p >= b.a - 0.02 && p < (next ? next.a - 0.02 : 0.885)) on = i;
      });
      if (on !== lastRail) {
        lastRail = on;
        rail.forEach((li, i) => li?.classList.toggle("on", i === on));
      }
    };

    let target = 0;
    let shown = 0;
    let rafId: number | null = null;
    let lastTick = 0;
    let heroOnScreen = true;
    let scrubOn = false;

    const tick = (now: number) => {
      const dt = Math.min(100, now - (lastTick || now));
      lastTick = now;
      shown += (target - shown) * (1 - Math.pow(1 - 0.14, dt / 16.667));
      if (Math.abs(target - shown) < 0.0004) {
        shown = target;
        rafId = null;
        lastTick = 0;
      } else {
        rafId = requestAnimationFrame(tick);
      }
      if (video.duration) {
        requestSeek(Math.min(1, shown / FILM_END) * (video.duration - 0.05));
      }
      updateOverlay(shown);
    };
    const onScroll = () => {
      target = heroProgress();
      if (rafId === null && heroOnScreen && scrubOn) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver((es) => {
      heroOnScreen = es[0].isIntersecting;
      if (heroOnScreen) onScroll();
    });
    io.observe(hero);

    /* The film streams into a blob behind a progress ring, so scrubbing
       never waits on the network once it is ready. */
    let blobUrl: string | null = null;
    let blobStarted = false;
    let cancelled = false;
    const ctrl = new AbortController();

    const failVideo = () => {
      stage.classList.add("video-failed");
      video.removeAttribute("src");
      video.style.display = "none";
    };

    const loadBlob = async () => {
      let watchdog = setTimeout(() => ctrl.abort(), 20000);
      try {
        const res = await fetch(VIDEO_URL, {
          priority: "low",
          signal: ctrl.signal,
        } as RequestInit);
        if (!res.ok || !res.body) throw new Error(`video ${res.status}`);
        const total = Number(res.headers.get("Content-Length")) || VIDEO_BYTES;
        const reader = res.body.getReader();
        const chunks: BlobPart[] = [];
        let got = 0;
        let lastRing = 0;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          clearTimeout(watchdog);
          watchdog = setTimeout(() => ctrl.abort(), 20000);
          chunks.push(value);
          got += value.length;
          const frac = Math.min(1, got / total);
          const t = performance.now();
          if (t - lastRing > 100 || frac === 1) {
            lastRing = t;
            ringc.style.setProperty("--ld", String(Math.round(126 * (1 - frac))));
          }
        }
        clearTimeout(watchdog);
        if (cancelled) return;
        ringc.style.setProperty("--ld", "0");
        blobUrl = URL.createObjectURL(new Blob(chunks, { type: "video/mp4" }));
        video.src = blobUrl;
        video.load();
        video.addEventListener(
          "loadeddata",
          () => {
            shown = target = heroProgress();
            requestSeek(
              Math.min(1, shown / FILM_END) * (video.duration - 0.05),
            );
            stage.classList.add("video-ready");
            updateOverlay(shown);
          },
          { once: true },
        );
      } catch {
        clearTimeout(watchdog);
        if (!cancelled) failVideo();
      }
    };
    const startBlob = () => {
      if (blobStarted) return;
      blobStarted = true;
      loadBlob();
    };

    /* Poster first; the heavy film waits until it has painted. */
    let heroInit = false;
    let startTimer: ReturnType<typeof setTimeout> | undefined;
    const initHeroOnce = () => {
      if (heroInit) return;
      heroInit = true;
      const poster = stage.querySelector("img");
      if (poster && !poster.complete) {
        poster.addEventListener("load", startBlob, { once: true });
        poster.addEventListener("error", startBlob, { once: true });
      } else {
        startBlob();
      }
      startTimer = setTimeout(startBlob, 4000);
    };

    const enableScrub = () => {
      if (scrubOn) return;
      scrubOn = true;
      initHeroOnce();
      addEventListener("scroll", onScroll, { passive: true });
      lastK = lastRail = lastCue = -1;
      bands.forEach((b) => {
        b.o = b.k = -1;
      });
      settle.style.removeProperty("--k");
      shown = target = heroProgress();
      updateOverlay(shown);
      onScroll();
    };
    const disableScrub = () => {
      if (!scrubOn) return;
      scrubOn = false;
      removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      settle.style.removeProperty("--k");
      settle.classList.add("live");
    };
    const mqls = STATIC_GATES.map((q) => matchMedia(q));
    const applyMode = () => {
      if (mqls.some((m) => m.matches)) disableScrub();
      else enableScrub();
    };
    mqls.forEach((m) => m.addEventListener("change", applyMode));
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", () => {
      seekBusy = false;
      pendingTime = null;
      failVideo();
    });
    applyMode();

    return () => {
      cancelled = true;
      ctrl.abort();
      clearTimeout(startTimer);
      io.disconnect();
      removeEventListener("scroll", onScroll);
      mqls.forEach((m) => m.removeEventListener("change", applyMode));
      video.removeEventListener("seeked", onSeeked);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  const staticQuery = STATIC_GATES.join(", ");

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Asha Offset film: from ink to finished carton"
      className="hero-film"
    >
      <div ref={stageRef} className="hero-stage on-ink">
        {/* One <img>, three sources: the browser fetches only the one that
            fits, so phones never download the desktop poster. Decorative —
            the headline carries the meaning. */}
        <picture>
          <source
            media="(prefers-reduced-motion: reduce) and (max-width: 720px)"
            srcSet="/hero/hero-ending-phone.jpg"
          />
          <source media={staticQuery} srcSet="/hero/hero-ending.jpg" />
          <img
            src="/hero/hero-poster.jpg"
            alt=""
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className="hero-poster"
          />
        </picture>

        <video
          ref={videoRef}
          preload="none"
          muted
          playsInline
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="hero-scrim" aria-hidden="true" />

        {/* Captions riding over the film -------------------------------- */}
        {STEPS.map((step, i) => (
          <div
            key={step.index}
            ref={(el) => {
              bandRefs.current[i] = el;
            }}
            className={`hero-band ${step.side}`}
          >
            <div className="hero-band-in">
              <span className="eyebrow step">
                {step.index} · {step.label}
              </span>
              <p className="hero-band-title">
                {step.words.map((w, wi) => (
                  <Fragment key={wi}>
                    <span
                      className="w"
                      style={
                        { "--th": threshold(wi, step.words.length) } as React.CSSProperties
                      }
                    >
                      {w}
                    </span>{" "}
                  </Fragment>
                ))}
              </p>
              <p className="hero-band-body">{step.body}</p>
            </div>
          </div>
        ))}

        <ol className="hero-rail eyebrow" aria-hidden="true">
          {STEPS.map((step, i) => (
            <li
              key={step.index}
              ref={(el) => {
                railRefs.current[i] = el;
              }}
            >
              <span>{step.label}</span>
              <i />
            </li>
          ))}
        </ol>

        {/* Closing frame: the page's main heading -------------------- */}
        <div ref={settleRef} className="hero-settle">
          <div className="hero-settle-in">
            <ol className="hero-static-steps eyebrow">
              {STEPS.map((step) => (
                <li key={step.index}>
                  {step.index} · <b>{step.words.join(" ")}</b>
                </li>
              ))}
            </ol>
            <p className="eyebrow hero-eyebrow">
              Printing &amp; packaging · Gondal, Gujarat · Since {START_YEAR}
            </p>
            <h1>
              {["Your", "Partner", "in"].map((w, i) => (
                <Fragment key={w}>
                  <span
                    className="w"
                    style={{ "--th": [0, 0.1, 0.2][i] } as React.CSSProperties}
                  >
                    {w}
                  </span>{" "}
                </Fragment>
              ))}
              <span
                className="w italic text-brass-light"
                style={{ "--th": 0.3 } as React.CSSProperties}
              >
                Print.
              </span>
            </h1>
            <p className="hero-sub">
              Labels, stickers, cartons and commercial printing, made on our
              own presses in Gondal for businesses across Gujarat.
            </p>
            <div className="hero-row">
              <Action href="/contact" variant="outline-light" className="btn-pulse">
                Request a printing quote
              </Action>
              <Action href="/manufacturing" variant="outline-light">
                Explore our printing capabilities
              </Action>
            </div>
          </div>
        </div>

        <div ref={cueRef} className="hero-cue" aria-hidden="true" />
        <a href="#figures" className="hero-skip eyebrow">
          Skip the film ↓
        </a>
        <svg className="hero-ring" viewBox="0 0 48 48" aria-hidden="true">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".25"
            strokeWidth="3"
          />
          <circle
            ref={ringRef}
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="126"
            style={{ strokeDashoffset: "var(--ld, 126)" }}
          />
        </svg>
      </div>
    </section>
  );
}
