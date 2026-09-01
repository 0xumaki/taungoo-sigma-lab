"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  getSection,
  nextSection,
  prevSection,
  type SectionId,
} from "@/lib/sigma/sections";
import { useSigmaStore } from "@/lib/sigma/store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { Crosshair, Panel } from "./components";

gsap.registerPlugin(useGSAP);

/**
 * ScrambleText — a typewriter/scramble-in effect for section titles.
 * On mount, runs a 600ms scramble where each character cycles through
 * random glyphs from a pool, then settles on the final character.
 *
 * Reduced-motion safe: when prefers-reduced-motion is active, the title
 * is rendered as-is with no animation.
 */
const SCRAMBLE_POOL =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%@!?/*+=Σ<>|/\\";
const SCRAMBLE_DURATION = 600; // ms — matches .sigma-scramble.is-revealing

function ScrambleText({ text, className }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = React.useState(text);

  React.useEffect(() => {
    if (reduced) {
      setDisplay(text);
      return;
    }
    const chars = text.split("");
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / SCRAMBLE_DURATION);
      // ease-out-cubic for the settle
      const eased = 1 - Math.pow(1 - t, 3);
      const next = chars
        .map((c, i) => {
          // Skip non-alphanumeric characters (spaces, punctuation) — keep them as-is
          if (!/[A-Za-z0-9]/.test(c)) return c;
          // Each char settles based on its position (left→right reveal)
          const settleThreshold = (i + 1) / chars.length;
          if (eased >= settleThreshold) return c;
          // Still scrambling — pick a random pool char
          return SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];
        })
        .join("");
      setDisplay(next);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, reduced]);

  return (
    <span
      className={cn("sigma-scramble is-revealing", className)}
      aria-label={text}
    >
      {display}
    </span>
  );
}

/** Wrapper that gives every section its brutalist frame, nav, and intro animation. */
export function SectionShell({
  id,
  title,
  tagline,
  children,
  className,
  dense,
}: {
  id: SectionId;
  title: string;
  tagline: string;
  children: React.ReactNode;
  className?: string;
  dense?: boolean;
}) {
  const meta = getSection(id);
  const { navigate } = useSigmaStore();
  // LOOP-3-AGENTIC-SEO: outer element is now <section> (was <div>) so the
  // type tightens from HTMLDivElement → HTMLElement (the base interface covers
  // both div + section; keeps querySelector/getBoundingClientRect valid).
  const rootRef = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-shell-title]", { opacity: 0, y: 24, duration: 0.6, clearProps: "opacity,transform" })
        .from(
          "[data-shell-tag]",
          { opacity: 0, y: 12, duration: 0.5, stagger: 0.05, clearProps: "opacity,transform" },
          "-=0.4"
        );
      // Only animate [data-shell-block] if any exist in scope — otherwise GSAP
      // logs a "target not found" warning that clutters the console.
      const blocks = rootRef.current?.querySelectorAll("[data-shell-block]");
      if (blocks && blocks.length > 0) {
        tl.from(
          "[data-shell-block]",
          { opacity: 0, y: 30, duration: 0.7, stagger: 0.08, clearProps: "opacity,transform" },
          "-=0.3"
        );
      }
    },
    { scope: rootRef }
  );

  // LOOP-3-AGENTIC-SEO: stable, per-section id on the <h2> so the outer
  // <section> can reference it via aria-labelledby. Stable string (not based
  // on React.useId) so it survives HMR + is identical server-side + client-side
  // (avoids hydration mismatch on the aria-labelledby attribute).
  const titleId = `section-${id}-title`;

  return (
    <section
      ref={rootRef}
      aria-labelledby={titleId}
      data-section={`section-${id}`}
      className={cn(
        "sigma-scanlines relative flex h-full w-full flex-col overflow-y-auto overflow-x-hidden sigma-scroll-hidden",
        className
      )}
    >
      {/* accent ambient */}
      <div
        className="pointer-events-none absolute -left-1/4 -top-1/4 h-[120%] w-[60%] opacity-[0.07] blur-3xl"
        style={{ background: meta.accent }}
      />

      {/* HEADER ROW — extra right padding to avoid overlap with fixed HUD buttons.
          .sigma-shell-header enables the corner-bracket hover effect (CSS-driven). */}
      <header
        className="sigma-shell-header relative z-10 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-3 pr-20"
      >
        {/* Section corner brackets — 4 L-shaped marks that expand on header hover.
            Color resolves to the section's accent (set inline per corner). */}
        <span className="sigma-shell-corner tl" style={{ color: meta.accent }} aria-hidden />
        <span className="sigma-shell-corner tr" style={{ color: meta.accent }} aria-hidden />
        <span className="sigma-shell-corner bl" style={{ color: meta.accent }} aria-hidden />
        <span className="sigma-shell-corner br" style={{ color: meta.accent }} aria-hidden />

        <div className="min-w-0">
          <div
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
            data-shell-tag
          >
            <span
              className="sigma-pulse h-1.5 w-1.5"
              style={{ background: meta.accent }}
            />
            SECTOR {meta.shortCode} / {meta.code} · {meta.role}
          </div>
          <h2
            id={titleId}
            data-shell-title
            className="mt-1 font-sans text-3xl font-black uppercase leading-[0.9] tracking-tight sm:text-5xl"
          >
            <ScrambleText text={title} />
          </h2>
          <p
            data-shell-tag
            className="mt-1 max-w-2xl font-serif text-sm italic text-muted-foreground"
          >
            {tagline}
          </p>
        </div>

        {/* nav cluster — wrapped in <nav> since these are intra-sigma-mode
            navigation controls (prev/next/map). LOOP-3-AGENTIC-SEO. */}
        <nav aria-label="Sector navigation" className="flex shrink-0 items-center gap-2">
          <NavBtn
            label="◂ PREV"
            onClick={() => navigate(prevSection(id))}
            accent={meta.accent}
          />
          <NavBtn
            label="MAP"
            onClick={() => navigate("map")}
            accent={meta.accent}
            primary
          />
          <NavBtn
            label="NEXT ▸"
            onClick={() => navigate(nextSection(id))}
            accent={meta.accent}
          />
        </nav>
      </header>

      {/* CONTENT — <main> wraps the per-section content because in sigma mode
          only ONE section is rendered at a time (this IS the page's primary
          content). LOOP-3-AGENTIC-SEO: ensures exactly one <main> per page
          view per mode (matches BetaInterface + AlphaInterface pattern). */}
      <main className="relative z-10 mt-3 min-h-0 flex-1 overflow-y-auto overflow-x-hidden sigma-scroll-hidden">
        <div className={cn("h-full w-full", dense ? "" : "")}>{children}</div>
      </main>

      {/* FOOTER micro-bar */}
      <footer className="relative z-10 mt-2 flex items-center justify-between border-t border-border/70 pt-2 font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
        <span>TAUNGOO Σ Lab / {meta.code}.{meta.shortCode}</span>
        <span style={{ color: meta.accent }}>{meta.status}</span>
        <span className="hidden sm:inline">SIG=1.00 · BUILD 2.4.SIGMA</span>
      </footer>

      {/* Glitching sector number — lower-right corner of every card.
          sigma-glitch RGB-split animation active.
          Sits at z-0 behind content, in the card's negative space.
          RESTORED per user request — this is the card watermark, NOT the center number. */}
      <div className="pointer-events-none absolute -bottom-4 right-4 z-0 select-none font-sans text-[14vh] font-black leading-none text-foreground/[0.08] sm:text-[16vh]">
        <span
          className="sigma-glitch"
          data-text={meta.shortCode}
        >
          {meta.shortCode}
        </span>
      </div>
    </section>
  );
}

function NavBtn({
  label,
  onClick,
  accent,
  primary,
}: {
  label: string;
  onClick: () => void;
  accent: string;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "whitespace-nowrap border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-200 hover:translate-x-[1px] active:translate-x-[2px]",
        primary
          ? "text-background"
          : "border-border text-foreground hover:bg-foreground/10"
      )}
      style={primary ? { background: accent, borderColor: accent } : undefined}
    >
      {label}
    </button>
  );
}

/** Re-export shared bits for section authors */
export { Crosshair, Panel };
