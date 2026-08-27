"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { usePageTransition, KIND_PREFIX } from "@/lib/sigma/page-transition";
import { sigmaSound } from "@/lib/sigma/sound";

const PANEL_COUNT = 8;

/**
 * PageTransitionOverlay — persistent across routes (mounted in root layout).
 *
 * Flow:
 * 1. User clicks a PageTransitionLink → startCover(href, label, kind, accent)
 *    → isCovering=true, label captured
 * 2. Overlay plays GSAP timeline: panels slam down (scaleY 0→1, top origin)
 *    At midpoint: flash + label flies through (left→right)
 * 3. When cover completes (panels fully covering screen): navigate via router.push(href)
 * 4. New page mounts → calls startReveal() → overlay plays reverse: panels retract (scaleY 1→0, bottom origin)
 *
 * The label is the destination NAME (Service name / Project name / Blog title),
 * shown mid-transition instead of sector numbers like Sigma mode.
 */
export function PageTransitionOverlay() {
  const router = useRouter();
  const {
    isCovering,
    isRevealing,
    label,
    kind,
    accent,
    pendingHref,
    coverReady,
    markCoverDone,
    startReveal,
    reset,
  } = usePageTransition();

  const panelsRef = React.useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const flashRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const prefixRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const tlRef = React.useRef<gsap.core.Timeline | null>(null);

  // COVER animation
  React.useEffect(() => {
    if (!isCovering) return;

    const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
    const overlay = overlayRef.current;
    const flash = flashRef.current;
    const labelEl = labelRef.current;
    const prefixEl = prefixRef.current;
    const container = containerRef.current;

    if (panels.length === 0 || !overlay) {
      // No panels — just navigate
      if (pendingHref) router.push(pendingHref);
      return;
    }

    // Make overlay visible
    gsap.set(overlay, { display: "block", pointerEvents: "auto", zIndex: 200 });
    if (container) gsap.set(container, { opacity: 1 });

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Skip animation — navigate immediately
      if (pendingHref) router.push(pendingHref);
      return;
    }

    // Play sound
    sigmaSound.play("transition");

    // Kill any existing timeline
    if (tlRef.current) tlRef.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        // Cover is complete — navigate now (panels are covering the screen)
        if (pendingHref) {
          router.push(pendingHref);
        }
        markCoverDone();
      },
    });
    tlRef.current = tl;

    // 1. COVER — panels slam down from top, staggered
    tl.set(panels, {
      scaleY: 0,
      transformOrigin: "top",
      backgroundColor: accent,
    });
    tl.to(panels, {
      scaleY: 1,
      duration: 0.40,
      ease: "power3.in",
      stagger: { each: 0.035, from: "start" },
    });

    // 2. MIDPOINT — flash + label fly-through
    tl.call(
      () => {
        if (flash) {
          gsap.fromTo(
            flash,
            { opacity: 0.9 },
            { opacity: 0, duration: 0.5, ease: "power2.out" }
          );
        }
      },
      [],
      ">-0.06"
    );

    // Prefix label ("SERVICE" / "PROJECT" / "INSIGHT") — small, top
    if (prefixEl) {
      tl.set(prefixEl, { opacity: 0, y: -16 }, "<");
      tl.to(
        prefixEl,
        { opacity: 1, y: 0, duration: 0.28, ease: "power3.out" },
        "<"
      );
    }

    // Main label (Service name / Project name / Blog title) — flies left → center → right
    if (labelEl) {
      tl.set(labelEl, { opacity: 0, x: -180, scale: 0.96 }, "<");
      tl.to(
        labelEl,
        { opacity: 1, x: 0, scale: 1, duration: 0.30, ease: "power3.out" },
        "<"
      );
      tl.to(
        labelEl,
        { opacity: 0, x: 180, scale: 1.04, duration: 0.30, ease: "power3.in" },
        ">+0.06"
      );
      if (prefixEl) {
        tl.to(prefixEl, { opacity: 0, duration: 0.18, ease: "power2.in" }, "<");
      }
    }

    // Safety: if timeline doesn't complete in 3s, force-navigate
    const safety = setTimeout(() => {
      if (!coverReady && pendingHref) {
        tl.kill();
        router.push(pendingHref);
        markCoverDone();
      }
    }, 3000);

    return () => {
      clearTimeout(safety);
    };
  }, [isCovering]);

  // REVEAL animation — runs when new page mounts and calls startReveal()
  React.useEffect(() => {
    if (!isRevealing) return;

    const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
    const overlay = overlayRef.current;
    const container = containerRef.current;
    const labelEl = labelRef.current;

    if (panels.length === 0 || !overlay) {
      reset();
      return;
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.set(overlay, { display: "none", pointerEvents: "none" });
      reset();
      return;
    }

    if (tlRef.current) tlRef.current.kill();

    // Panels are currently in cover position (scaleY:1, top origin from cover phase)
    // Switch origin to bottom, then retract
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { display: "none", pointerEvents: "none" });
        if (container) gsap.set(container, { opacity: 0 });
        if (labelEl) gsap.set(labelEl, { clearProps: "opacity,transform,scale" });
        reset();
      },
    });
    tlRef.current = tl;

    tl.set(panels, { transformOrigin: "bottom" });
    tl.to(panels, {
      scaleY: 0,
      duration: 0.46,
      ease: "power3.out",
      stagger: { each: 0.035, from: "start" },
      clearProps: "transform,backgroundColor",
    });

    // Safety: if reveal doesn't complete in 2s, force-reset
    const safety = setTimeout(() => {
      tl.kill();
      gsap.set(overlay, { display: "none", pointerEvents: "none" });
      reset();
    }, 2000);

    return () => {
      clearTimeout(safety);
    };
  }, [isRevealing]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[200]"
      style={{ display: "none" }}
    >
      <div ref={containerRef} className="absolute inset-0" style={{ opacity: 0 }}>
        {/* horizontal slam panels — same style as Sigma mode transition */}
        <div className="absolute inset-0 flex flex-col">
          {Array.from({ length: PANEL_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                panelsRef.current[i] = el;
              }}
              className="flex-1"
              style={{
                transform: "scaleY(0)",
                backgroundColor: accent,
                borderBottom:
                  i < PANEL_COUNT - 1 ? "1px solid rgba(0,0,0,0.25)" : "none",
              }}
            />
          ))}
        </div>

        {/* glitch flash */}
        <div
          ref={flashRef}
          className="absolute inset-0 mix-blend-screen"
          style={{ background: accent, opacity: 0 }}
        />

        {/* hazard top edge during transition */}
        <div
          className="absolute inset-x-0 top-0 h-2"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(0,0,0,0.55) 0 8px, transparent 8px 16px)",
          }}
        />

        {/* Label fly-through — destination NAME (Service/Project/Blog title) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          {/* Prefix chip — "SERVICE" / "PROJECT" / "INSIGHT" — high-contrast pill on white bg */}
          <div
            ref={prefixRef}
            className="rounded-full border-2 border-black bg-white px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-black shadow-lg sm:text-[12px]"
            style={{ opacity: 0 }}
          >
            ▸ {KIND_PREFIX[kind]}
          </div>

          {/* Main label — BLACK text on bright accent panels = max contrast on all 3 accent colors */}
          {/* Accent colors: service=#FF4500 (orange), project=#00FF94 (lime), insight=#C6FF00 (yellow) */}
          {/* Black text is high-contrast on ALL of these — white text was invisible on lime/yellow */}
          <div className="overflow-hidden px-4">
            <div
              ref={labelRef}
              className="font-sans text-[6vw] font-black uppercase leading-none text-black sm:text-[5vw] md:text-[4vw]"
              style={{
                opacity: 0,
                maxWidth: "90vw",
                textAlign: "center",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                textShadow:
                  "0 0 4px rgba(255,255,255,0.3), 2px 2px 0 rgba(255,255,255,0.15), -2px -2px 0 rgba(255,255,255,0.15)",
              }}
            >
              {label}
            </div>
          </div>

          {/* Accent dot row — black dots for visibility on bright panels */}
          <div
            className="mt-4 flex gap-1"
            style={{ opacity: 0 }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="block h-1.5 w-1.5 rounded-full bg-black"
              />
            ))}
          </div>
        </div>

        {/* Corner brackets — sci-fi framing (darker for contrast) */}
        <div className="absolute left-6 top-6 h-8 w-8 border-l-2 border-t-2 border-black/80" />
        <div className="absolute right-6 top-6 h-8 w-8 border-r-2 border-t-2 border-black/80" />
        <div className="absolute bottom-6 left-6 h-8 w-8 border-b-2 border-l-2 border-black/80" />
        <div className="absolute bottom-6 right-6 h-8 w-8 border-b-2 border-r-2 border-black/80" />

        {/* Bottom status line — dark text on accent bg */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-black/80">
          ▸ LOADING NODE…
        </div>
      </div>
    </div>
  );
}
