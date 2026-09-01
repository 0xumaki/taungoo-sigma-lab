"use client";

import * as React from "react";
import { motion } from "motion/react";
import { GlitchImage } from "./GlitchImage";
import { AlphaNav } from "./AlphaNav";
import { useMagnetic } from "@/components/sigma/beta/Hero";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * AlphaHero — the FIRST thing a visitor sees in Alpha Mode.
 *
 * DESIGN INTENT (award-winning brutalist sci-fi):
 * - ONE massive hero card fills the viewport (cut-corner clip-path)
 * - Navigation is INTEGRATED into the top of the card (not floating separately)
 * - Card is layered: hazard stripe → nav header → data strip → main content →
 *   stats grid → footer strip — all framed inside the same cut-corner border
 * - Sci-fi framing: 4 corner brackets, side data labels, scanlines, crosshair
 *   marks, hazard stripe edges, accent glow
 * - Brutalist: sharp edges (clip-path chamfers), monospace data labels,
 *   bold typography, accent color #FF4500
 * - Works in both dark and light modes (uses design tokens, not raw colors
 *   for text/bg — accent #FF4500 is theme-aware via .light overrides in globals.css)
 * - Mobile-first responsive: stacks vertically on small screens, asymmetric
 *   grid opens up on lg+
 */

const HERO_STATS: [string, string, string][] = [
  ["50+", "PROJECTS SHIPPED", "#FF4500"],
  ["8", "ENGINEERS", "#00E5FF"],
  ["27", "SERVICES", "#C6FF00"],
  ["99.9%", "UPTIME", "#00FF94"],
];

const FEATURE_TAGS = [
  "AI AGENTS",
  "WEB3",
  "AUTOMATION",
  "FULL-STACK",
  "VOICE AI",
  "SMART CONTRACTS",
  "MCP",
  "N8N",
];

export function AlphaHero() {
  // Magnetic pull on the primary CTA (max 6px). Hook self-disables for
  // touch devices + prefers-reduced-motion, so no extra guards needed here.
  const ctaRef = useMagnetic<HTMLAnchorElement>(6);
  // Respect prefers-reduced-motion — gate the infinite + entrance animations.
  const reducedMotion = useReducedMotion();

  // Headline words — staggered entrance (y + blur + opacity, stagger 0.05s).
  // Each word animates independently so the reveal reads as a typewriter cadence.
  const HEADLINE_WORDS: { text: string; glitch?: boolean; dot?: boolean }[] = [
    { text: "WE SHIP" },
    { text: "INTELLIGENT", glitch: true },
    { text: "SYSTEMS", dot: true },
  ];

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      data-section="hero"
      className="relative h-screen min-h-screen w-full overflow-hidden px-[2vw] pb-[6vh] pt-[80px] sm:px-[3vw] sm:pb-[4vh] sm:pt-[10vh]"
    >
      {/* ============================================================
          BACKGROUND LAYER (full-bleed, behind hero card)
          Reduced gradients so the hero image is more visible
         ============================================================ */}
      <div className="pointer-events-none absolute inset-0">
        {/* PERF (LOOP-1-LH): src switched from .png (1.5MB raw) to .webp (179KB).
            GlitchImage internally renders the same path as a raw <img> for the
            glitch bg-image slice — switching the source here means BOTH the
            visible Image layers AND the bg-image slice fetch the small WebP
            (the prior .png path was fetching 1.5MB raw for the bg-image slice
            because backgroundImage:url() bypasses next/image). The .png
            source stays on disk as a defensive fallback. */}
        <GlitchImage src="/alpha-hero-bg.webp" alt="" className="h-full w-full" intensity={0.35} />
        {/* Lighter gradient — only darkens left side for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />
      </div>

      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-10" />

      {/* Accent glows — orange (primary) + cyan (secondary) */}
      <div
        className="pointer-events-none absolute -right-[15%] top-[10%] h-[55vh] w-[55vh] opacity-20 blur-[110px]"
        style={{ background: "#FF4500" }}
      />
      <div
        className="pointer-events-none absolute -left-[10%] bottom-[5%] h-[40vh] w-[40vh] opacity-15 blur-[100px]"
        style={{ background: "#00E5FF" }}
      />

      {/* ============================================================
          OUTER CROSSHAIR CORNERS (page-level framing) — at padding edge
         ============================================================ */}
      <span className="pointer-events-none absolute left-[2vw] top-[80px] z-40 h-5 w-5 border-l border-t border-[#FF4500]/60 sm:left-[3vw] sm:top-[10vh] sm:h-6 sm:w-6" />
      <span className="pointer-events-none absolute right-[2vw] top-[80px] z-40 h-5 w-5 border-r border-t border-[#FF4500]/60 sm:right-[3vw] sm:top-[10vh] sm:h-6 sm:w-6" />
      <span className="pointer-events-none absolute bottom-[2vh] left-[2vw] z-40 h-5 w-5 border-b border-l border-[#FF4500]/60 sm:bottom-[2.5vh] sm:left-[3vw] sm:h-6 sm:w-6" />
      <span className="pointer-events-none absolute bottom-[2vh] right-[2vw] z-40 h-5 w-5 border-b border-r border-[#FF4500]/60 sm:bottom-[2.5vh] sm:right-[3vw] sm:h-6 sm:w-6" />

      {/* ============================================================
          THE HERO CARD — fills the padded area (10% padding around)
          Inset from viewport so Σ/Α mode switcher doesn't clash with nav
         ============================================================ */}
      <div className="relative z-10 flex h-full w-full flex-col">
        <div
          className="relative flex flex-1 flex-col overflow-hidden border-2 border-[#FF4500]/40 bg-card/40 backdrop-blur-[2px]"
          style={{
            clipPath:
              "polygon(22px 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%, 0 22px)",
            boxShadow:
              "0 0 0 1px rgba(255,69,0,0.15), 0 20px 60px -20px rgba(255,69,0,0.25), inset 0 0 80px -20px rgba(255,69,0,0.06)",
          }}
        >
          {/* Card-local scanlines + grid + vignette */}
          <div className="sigma-scanlines pointer-events-none absolute inset-0 z-0 opacity-15" />
          <div className="sigma-grid-fine pointer-events-none absolute inset-0 z-0 opacity-[0.04]" />
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse at top right, rgba(255,69,0,0.10), transparent 55%), radial-gradient(ellipse at bottom left, rgba(0,229,255,0.06), transparent 60%)",
            }}
          />

          {/* Top hazard stripe edge — animated danger band */}
          <div
            className="relative z-20 h-1.5 w-full"
            style={{
              background:
                "repeating-linear-gradient(45deg, #FF4500 0, #FF4500 8px, #0a0a0a 8px, #0a0a0a 16px)",
            }}
          />

          {/* Side edge accents — vertical hazard stripes on left/right (decorative) */}
          <div
            className="pointer-events-none absolute left-0 top-1.5 z-20 hidden h-[calc(100%-3px)] w-1.5 sm:block"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(255,69,0,0.25) 0, rgba(255,69,0,0.25) 4px, transparent 4px, transparent 10px)",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-1.5 z-20 hidden h-[calc(100%-3px)] w-1.5 sm:block"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(0,229,255,0.20) 0, rgba(0,229,255,0.20) 4px, transparent 4px, transparent 10px)",
            }}
          />

          {/* ============================================================
              1) INTEGRATED NAV HEADER (renders inside hero card)
             ============================================================ */}
          <AlphaNav />

          {/* ============================================================
              2) DATA STRIP — system readouts (mono, like HUD telemetry)
              Compact on mobile, full on desktop. No overflow.
             ============================================================ */}
          <div className="relative z-10 flex items-center justify-between gap-2 overflow-x-auto border-b border-border/40 bg-background/40 px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:px-4 sm:py-1 sm:text-[9px] sm:tracking-[0.18em] sigma-scroll-hidden">
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <span className="flex items-center gap-1.5">
                <span className="sigma-pulse h-1.5 w-1.5 bg-[#00FF94]" />
                <span className="text-[#00FF94]">ONLINE</span>
              </span>
              <span className="hidden text-border sm:inline">│</span>
              <span className="hidden sm:inline">EST. 2016</span>
              <span className="hidden text-border lg:inline">│</span>
              <span className="hidden lg:inline text-[#00E5FF]">NODES: 11</span>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <span className="text-[#C6FF00]">SIG=1.0</span>
              <span className="hidden text-border sm:inline">│</span>
              <span className="text-[#FF4500]">v2.7</span>
              <span className="hidden text-border sm:inline">│</span>
              <span className="hidden sm:inline">Σ/Α</span>
            </div>
          </div>

          {/* ============================================================
              3) MAIN CONTENT — asymmetric grid
                 Left: heading + CTAs
                 Right: Σ glyph with orbiting data labels (lg+ only)
             ============================================================ */}
          <div className="relative z-10 grid flex-1 grid-cols-1 lg:grid-cols-[1.55fr_1fr]">
            {/* ---------- LEFT COLUMN ---------- */}
            <div className="relative flex flex-col justify-center p-4 sm:p-7 lg:p-10">
              {/* Status badges row — maximalist pills */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 border border-border bg-background/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
                  <span className="sigma-pulse h-1.5 w-1.5 bg-[#00FF94]" />
                  SYSTEM ONLINE
                </div>
                <div className="border border-border bg-background/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
                  EST. 2016 · YANGON, MM
                </div>
                <div className="border border-[#FF4500]/40 bg-background/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#FF4500] backdrop-blur-sm">
                  v2.7.SIGMA
                </div>
              </div>

              {/* HUGE heading — the focal statement.
                  Staggered word entrance: y 24→0 + blur 8px→0 + opacity 0→1,
                  0.05s stagger between words, 0.6s ease-out-back per word.
                  Reduced-motion: instant (motion handles undefined props). */}
              <motion.h1
                id="hero-title"
                className="mt-4 font-sans font-black uppercase leading-[0.88] tracking-tight"
                style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
              >
                {HEADLINE_WORDS.map((w, i) => (
                  <motion.span
                    key={w.text}
                    className={w.glitch ? "sigma-glitch block" : "block"}
                    data-text={w.glitch ? w.text : undefined}
                    style={w.glitch ? { color: "#FF4500" } : undefined}
                    initial={reducedMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w.text}
                    {w.dot && <span className="text-[#FF4500]">.</span>}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subtitle */}
              <p className="mt-5 max-w-xl font-serif text-sm italic text-muted-foreground sm:text-base lg:text-lg">
                A tactical research lab at the intersection of AI, Web3, and engineering.
                27 services deployed. 9 live systems. Zero vaporware.
              </p>

              {/* Feature pills */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {FEATURE_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border/60 bg-background/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-sm transition-colors hover:border-foreground/60 hover:text-foreground sm:text-[8px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA buttons — maximalist with data overlays.
                  Primary CTA gets the magnetic ref (max 6px pull). */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  ref={ctaRef}
                  href="#services"
                  className="alpha-magnetic group relative flex items-center gap-2 border border-[#FF4500] bg-[#FF4500] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-black transition-all hover:shadow-[5px_5px_0_0_#FF4500]"
                >
                  <span className="flex h-4 w-4 items-center justify-center border border-black/30 text-[8px]">
                    ▸
                  </span>
                  BROWSE SERVICES
                  <span className="hidden text-[8px] opacity-70 sm:inline">27 SERVICES</span>
                </a>
                <a
                  href="#portfolio"
                  className="group relative flex items-center gap-2 border border-border bg-background/60 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground backdrop-blur-sm transition-all hover:border-foreground/60 hover:bg-foreground/10"
                >
                  <span className="flex h-4 w-4 items-center justify-center border border-foreground/30 text-[8px]">
                    ▸
                  </span>
                  INSPECT WORK
                  <span className="hidden text-[8px] opacity-60 sm:inline">9 PROJECTS</span>
                </a>
                <a
                  href="#contact"
                  className="group relative flex items-center gap-2 border border-foreground/40 bg-background/60 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground backdrop-blur-sm transition-all hover:border-foreground/60 hover:bg-foreground/10"
                >
                  <span className="flex h-4 w-4 items-center justify-center border border-foreground/30 text-[8px]">
                    ✉
                  </span>
                  START NOW
                  <span className="hidden text-[8px] opacity-60 sm:inline">72H RESPONSE</span>
                </a>
              </div>

              {/* Inline scroll indicator (mobile-only — desktop has footer strip) */}
              <div className="mt-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground lg:hidden">
                <span className="alpha-scroll-hint text-[#FF4500]">▼</span> SCROLL TO EXPLORE
              </div>
            </div>

            {/* ---------- RIGHT COLUMN — Σ GLYPH PANEL ---------- */}
            <div className="relative hidden items-center justify-center border-l border-border/40 bg-background/20 p-6 lg:flex">
              {/* Outer dotted ring */}
              <div
                className="pointer-events-none absolute inset-6 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,69,0,0.4) 1px, transparent 1.5px)",
                  backgroundSize: "14px 14px",
                }}
              />

              {/* Crosshair marks inside the right panel */}
              <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-[#FF4500]/50" />
              <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-[#FF4500]/50" />
              <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-[#FF4500]/50" />
              <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-[#FF4500]/50" />

              {/* Σ glyph frame */}
              <div className="relative">
                {/* Cut-corner frame around the Σ */}
                <div
                  className="relative flex h-56 w-56 items-center justify-center border-2 border-[#FF4500]/40 bg-background/40"
                  style={{
                    clipPath:
                      "polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)",
                    boxShadow: "inset 0 0 60px -20px rgba(255,69,0,0.30)",
                  }}
                >
                  <span
                    className="font-sans text-[9rem] font-black leading-none"
                    style={{ color: "#FF4500" }}
                  >
                    Σ
                  </span>

                  {/* Scanlines on glyph */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.30) 3px, rgba(0,0,0,0.30) 4px)",
                    }}
                  />

                  {/* Hazard stripe top-right corner */}
                  <div
                    className="absolute right-0 top-0 h-7 w-7"
                    style={{
                      background:
                        "repeating-linear-gradient(45deg, #FF4500 0, #FF4500 3px, transparent 3px, transparent 6px)",
                    }}
                  />

                  {/* Tiny data ticks around the frame */}
                  <div className="absolute -left-3 top-2 font-mono text-[7px] uppercase tracking-[0.18em] text-muted-foreground">
                    01
                  </div>
                  <div className="absolute -right-3 top-2 font-mono text-[7px] uppercase tracking-[0.18em] text-muted-foreground">
                    02
                  </div>
                  <div className="absolute -bottom-3 left-2 font-mono text-[7px] uppercase tracking-[0.18em] text-muted-foreground">
                    03
                  </div>
                </div>

                {/* Orbiting dots — static positions at N/E/S/W */}
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#00FF94]" />
                <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#00E5FF]" />
                <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#C6FF00]" />
                <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#FFB300]" />

                {/* Floating data labels around the glyph */}
                <div className="absolute -left-24 top-1/4 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                  <div className="text-[#FF4500]">▸ SIG</div>
                  <div>=1.0000</div>
                </div>
                <div className="absolute -right-24 top-1/3 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                  <div className="text-[#00E5FF]">▸ NODES</div>
                  <div>=11 / 11</div>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground">
                  ▸ THE SIGMA VARIABLE
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================
              4) STATS GRID — integrated at bottom of card
              2 cols on mobile (fully visible), 4 cols on desktop
             ============================================================ */}
          <div className="relative z-10 grid grid-cols-2 gap-px border-t border-border/40 bg-border/30 sm:grid-cols-4">
            {HERO_STATS.map(([v, k, c]) => (
              <div
                key={k}
                className="relative bg-card/70 p-2 backdrop-blur-sm transition-colors hover:bg-card sm:p-4"
              >
                {/* Top hazard strip — colored per stat */}
                <div
                  className="absolute left-0 top-0 h-0.5 w-full"
                  style={{
                    background: `repeating-linear-gradient(45deg, ${c} 0, ${c} 3px, transparent 3px, transparent 6px)`,
                  }}
                />
                <div
                  className="mt-1 font-sans text-lg font-black sm:text-3xl"
                  style={{ color: c }}
                >
                  {v}
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[9px] sm:tracking-[0.18em]">
                  {k}
                </div>
                {/* Bottom-right crosshair tick */}
                <span
                  className="absolute bottom-1 right-1 h-2 w-2 border-b border-r opacity-50 sm:bottom-1.5 sm:right-1.5"
                  style={{ borderColor: c }}
                />
              </div>
            ))}
          </div>

          {/* ============================================================
              5) FOOTER STRIP — scroll cue + build info
              Compact on mobile, full on desktop
             ============================================================ */}
          <div className="relative z-10 flex items-center justify-between gap-2 border-t border-border/40 bg-background/40 px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:px-5 sm:text-[9px] sm:tracking-[0.3em]">
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="alpha-scroll-hint text-[#FF4500]" aria-hidden>▼</span>
              <span>SCROLL</span>
            </div>
            <div className="hidden items-center gap-2 text-[10px] tracking-[0.16em] sm:flex sm:text-[8px] sm:tracking-[0.2em]">
              <span>BUILD 2.7.SIGMA</span>
              <span className="text-border">·</span>
              <span>DUAL MODE: Σ/Α</span>
              <span className="text-border">·</span>
              <span>SINCE 2016</span>
              <span className="text-border">·</span>
              <span className="text-[#00FF94]">▮ NOMINAL</span>
            </div>
            {/* Dedicated animated scroll-hint glyph — desktop-only.
                Vertical line draws top→bottom (alpha-scroll-hint-line, 2s loop),
                paired with a chevron pulse below for a gentle nudge. */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 lg:flex" aria-hidden>
              <span
                className="alpha-scroll-hint-line block w-px"
                style={{ height: 14, background: "linear-gradient(to bottom, transparent, #FF4500, transparent)" }}
              />
            </div>
          </div>

          {/* Bottom hazard stripe edge */}
          <div
            className="relative z-20 h-1.5 w-full"
            style={{
              background:
                "repeating-linear-gradient(45deg, #FF4500 0, #FF4500 8px, #0a0a0a 8px, #0a0a0a 16px)",
            }}
          />

          {/* ============================================================
              CARD-LEVEL CORNER BRACKETS — sci-fi L-shaped markers
              placed at the cut-corner chamfers (top-left + bottom-right)
             ============================================================ */}
          {/* Top-left chamfer bracket */}
          <svg
            className="pointer-events-none absolute left-0 top-0 z-30 h-6 w-6"
            style={{ color: "#FF4500" }}
          >
            <path
              d="M 0 22 L 22 0"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="0" cy="22" r="2" fill="currentColor" />
            <circle cx="22" cy="0" r="2" fill="currentColor" />
          </svg>
          {/* Bottom-right chamfer bracket */}
          <svg
            className="pointer-events-none absolute bottom-0 right-0 z-30 h-6 w-6"
            style={{ color: "#FF4500" }}
          >
            <path
              d="M 0 22 L 22 0"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="0" cy="22" r="2" fill="currentColor" />
            <circle cx="22" cy="0" r="2" fill="currentColor" />
          </svg>

          {/* Floating card edge labels — outside the chamfered corners (hidden on mobile to prevent overflow) */}
          <div className="pointer-events-none absolute -left-1 top-7 z-30 hidden -translate-x-full whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.22em] text-muted-foreground sm:top-10 lg:block">
            <span className="text-[#FF4500]">▸</span> NODE_01
          </div>
          <div className="pointer-events-none absolute -right-1 bottom-7 z-30 hidden translate-x-full whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.22em] text-muted-foreground sm:bottom-10 lg:block">
            <span className="text-[#00FF94]">▮</span> NOMINAL
          </div>
        </div>
      </div>
    </section>
  );
}
