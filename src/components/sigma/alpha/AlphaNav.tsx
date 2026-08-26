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
 * AlphaNav — INTEGRATED hero-card navigation strip.
 *
 * Renders INSIDE the AlphaHero hero card (not a separate fixed bar).
 * Uses SigmaBrand (hybrid C+D: Σ pulse + shimmer + RGB-split glitch)
 * for the wordmark in the upper-left.
 *
 * Layout (desktop):
 *   [ Σ  TAUNGOO SIGMA LAB ]  [ ABOUT · SERVICES · WORK · … ]  [ START A PROJECT → ]
 */
export function AlphaNav() {
  return (
    <header
      className="relative z-30 flex items-center justify-between gap-3 border-b border-border/40 bg-card/40 px-3 py-2 backdrop-blur-sm sm:px-5 sm:py-3"
    >
      {/* Left: SigmaBrand wordmark with hybrid C+D treatment */}
      <SigmaBrand size="md" subLabel="AI · WEB3 · FULL-STACK" />

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
 * AlphaMiniNav — slim sticky mini-nav that appears when scrolling past hero.
 * Uses SigmaBrand (compact size) for the wordmark.
 */
export function AlphaMiniNav() {
  const [visible, setVisible] = React.useState(false);

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
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-2 backdrop-blur-md">
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
