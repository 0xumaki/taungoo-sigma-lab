"use client";

import * as React from "react";

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
 * AlphaNav — INTEGRATED hero-card navigation strip.
 *
 * Designed to render INSIDE the AlphaHero hero card (not as a separate
 * fixed top bar). It forms the top "header strip" of the hero card,
 * visually anchored to the card's cut-corner frame.
 *
 * Layout (desktop):
 *   [ Σ  TAUNGOO SIGMA LAB ]  [ ABOUT · SERVICES · WORK · … ]  [ START A PROJECT → ]
 *
 * Mobile: logo + CTA only (links collapse — full nav available via footer)
 */
export function AlphaNav() {
  return (
    <header
      className="relative z-30 flex items-center justify-between gap-3 border-b border-border/40 bg-card/40 px-3 py-2 backdrop-blur-sm sm:px-5 sm:py-3"
    >
      {/* Left: logo cluster */}
      <a href="#hero" className="group flex items-center gap-2.5">
        {/* Σ glyph in a tiny cut-corner frame */}
        <span
          className="flex h-7 w-7 items-center justify-center border border-[#FF4500]/60 bg-[#FF4500]/10 transition-colors group-hover:border-[#FF4500] group-hover:bg-[#FF4500]/20"
          style={{
            clipPath:
              "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
          }}
        >
          <span className="font-sans text-base font-black text-[#FF4500]">Σ</span>
        </span>
        <div className="hidden flex-col leading-none sm:flex">
          <span className="font-sans text-[11px] font-black uppercase tracking-[0.12em]">
            TAUNGOO SIGMA LAB
          </span>
          <span className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.22em] text-muted-foreground">
            AI · WEB3 · FULL-STACK
          </span>
        </div>
        <span className="font-sans text-base font-black uppercase tracking-[0.1em] sm:hidden">
          Σ LAB
        </span>
      </a>

      {/* Center: nav links — compact brutalist tabs */}
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

      {/* Right: CTA + status pill */}
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
      </div>
    </header>
  );
}

/**
 * AlphaMiniNav — a slim sticky mini-nav that appears when the user
 * scrolls past the hero card. Preserves nav-link accessibility
 * without breaking the integrated hero-card design.
 *
 * Shows: logo (compact) | key nav links | START A PROJECT CTA.
 * Slides down from top when triggered.
 */
export function AlphaMiniNav() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const container = document.querySelector("[data-alpha-scroll]");
    if (!container) return;
    const onScroll = () => {
      // Show after scrolling past 70vh (well past the hero card)
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
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-2 backdrop-blur-md">
        <a href="#hero" className="flex items-center gap-2">
          <span
            className="flex h-6 w-6 items-center justify-center border border-[#FF4500]/60 bg-[#FF4500]/10"
            style={{
              clipPath:
                "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)",
            }}
          >
            <span className="font-sans text-sm font-black text-[#FF4500]">Σ</span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            TAUNGOO SIGMA LAB
          </span>
        </a>
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
        <a
          href="#contact"
          className="border border-foreground bg-foreground px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-background transition-opacity hover:opacity-80"
        >
          START →
        </a>
      </div>
    </div>
  );
}
