"use client";

import * as React from "react";
import { SigmaBrand } from "@/components/sigma/shared/SigmaBrand";

export const NAV_ITEMS = [
  { label: "ABOUT", target: "about" },
  { label: "SERVICES", target: "services" },
  { label: "WORK", target: "portfolio" },
  { label: "PROCESS", target: "process" },
  { label: "TEAM", target: "team" },
  { label: "TECH", target: "tech" },
  { label: "CONTACT", target: "contact" },
];

/**
 * Mobile hamburger menu — renders a brutalist full-width dropdown panel
 * under the nav strip on small screens (below the lg breakpoint where the
 * inline nav links disappear). Toggle is the small `☰` button on the right.
 */
function AlphaMobileMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Toggle navigation menu"
        className="flex h-9 w-9 items-center justify-center border border-border bg-background/60 font-mono text-base text-foreground transition-colors hover:border-foreground/60 hover:bg-foreground/10 sm:h-10 sm:w-10"
      >
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full z-40 border-b border-border bg-background/98 backdrop-blur-md">
          {/* Hazard strip top */}
          <div
            className="h-1 w-full"
            style={{
              background:
                "repeating-linear-gradient(45deg, #FF4500 0, #FF4500 6px, #0a0a0a 6px, #0a0a0a 12px)",
            }}
            aria-hidden
          />
          <nav className="mx-auto flex max-w-[1600px] flex-col px-3 py-2 sm:px-6">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.target}
                href={`#${item.target}`}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-border/40 px-2 py-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-background/60 hover:text-foreground sm:text-sm"
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-[#FF4500]/70 group-hover:text-[#FF4500]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item.label}</span>
                </span>
                <span className="text-[10px] opacity-50 group-hover:opacity-100">→</span>
              </a>
            ))}
            {/* Mobile-only CTA at bottom */}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 border border-[#FF4500] bg-[#FF4500] px-3 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-black"
            >
              <span className="flex h-3 w-3 items-center justify-center border border-black/40 text-[8px]">▸</span>
              START A PROJECT
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}

/**
 * AlphaNav — INTEGRATED hero-card navigation strip.
 *
 * Renders INSIDE the AlphaHero hero card (not a separate fixed bar).
 * Uses SigmaBrand (hybrid C+D: Σ pulse + shimmer + RGB-split glitch)
 * for the wordmark in the upper-left.
 *
 * Layout (desktop):
 *   [ Σ  TAUNGOO SIGMA LAB ]  [ ABOUT · SERVICES · WORK · … ]  [ START A PROJECT → ]
 *
 * Layout (mobile, below lg):
 *   [ Σ  TAUNGOO SIGMA LAB ]                              [ ☰ ]
 *   — tapping ☰ opens a brutalist dropdown with all nav items
 */
export function AlphaNav() {
  return (
    <header
      className="relative z-30 flex items-center justify-between gap-3 border-b border-border/40 bg-card/40 px-3 py-2 backdrop-blur-sm sm:px-5 sm:py-3"
    >
      {/* Left: SigmaBrand wordmark with hybrid C+D treatment */}
      <SigmaBrand size="md" subLabel="AI · WEB3 · FULL-STACK" />

      {/* Center: nav links — compact brutalist tabs (desktop only) */}
      <nav className="hidden items-center gap-0.5 lg:flex">
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.target}
            href={`#${item.target}`}
            className="group relative flex items-center gap-1.5 border border-transparent px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-border hover:bg-background/60 hover:text-foreground"
          >
            <span className="text-[8px] text-[#FF4500]/60 group-hover:text-[#FF4500]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Right: CTA + status pill + mobile menu toggle */}
      <div className="flex items-center gap-2">
        {/* Live status pill — hidden on small screens */}
        <div className="hidden items-center gap-1.5 border border-border/60 bg-background/60 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground md:flex">
          <span className="sigma-pulse h-1.5 w-1.5 bg-[#00FF94]" />
          ONLINE
        </div>
        <a
          href="#contact"
          className="group relative flex items-center gap-2 border border-[#FF4500] bg-[#FF4500] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black transition-all hover:shadow-[3px_3px_0_0_#FF4500] sm:px-4 sm:py-2"
        >
          <span className="flex h-3 w-3 items-center justify-center border border-black/40 text-[8px]">
            ▸
          </span>
          <span className="hidden sm:inline">START A PROJECT</span>
          <span className="sm:hidden">START</span>
          <span className="text-[8px] opacity-70">→</span>
        </a>
        {/* Mobile hamburger menu */}
        <AlphaMobileMenu />
      </div>
    </header>
  );
}

/**
 * AlphaMiniNav — slim sticky mini-nav that appears when scrolling past hero.
 * Uses SigmaBrand (compact size) for the wordmark.
 */
export function AlphaMiniNav() {
  const [visible, setVisible] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const container = document.querySelector("[data-alpha-scroll]");
    if (!container) return;
    const onScroll = () => {
      const heroH = window.innerHeight * 0.7;
      setVisible(container.scrollTop > heroH);
    };
    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-[85] transition-all duration-300 ${
        visible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 border-b border-border bg-background/95 px-3 py-2 backdrop-blur-md sm:px-4">
        <SigmaBrand size="sm" showSubLabel={false} />
        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.target}
              href={`#${item.target}`}
              className="border border-transparent px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="border border-foreground bg-foreground px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-background transition-opacity hover:opacity-80 sm:px-3 sm:py-1"
          >
            START →
          </a>
          {/* Mobile hamburger for sticky mini-nav */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            className="flex h-8 w-8 items-center justify-center border border-border bg-background/60 font-mono text-sm text-foreground transition-colors hover:border-foreground/60 md:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-b border-border bg-background/98 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-[1600px] flex-col px-3 py-2 sm:px-6">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.target}
                href={`#${item.target}`}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-border/40 px-2 py-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-background/60 hover:text-foreground"
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-[#FF4500]/70 group-hover:text-[#FF4500]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item.label}</span>
                </span>
                <span className="text-[10px] opacity-50 group-hover:opacity-100">→</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
