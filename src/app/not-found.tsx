"use client";

import * as React from "react";
import Link from "next/link";

/**
 * 404 — sector not found.
 * Branded dark + gold (#D4AF37) treatment with mono typography, scanlines,
 * corner brackets, a fake terminal "RE-ROUTING TO BASE" sequence, and a
 * hard CTA back to /. Red (#B85C2E) is retained ONLY for the danger glyph +
 * status pulse — every other accent is gold to match the site brand.
 */
export default function NotFound() {
  // Static "RE-ROUTING" log lines — fake boot sequence, no timers / rAF.
  // Each line is permanently visible (no progressive disclosure) so the
  // page is server-rendered + accessible with JS off.
  const ROUTE_LINES = [
    { tag: "INIT", text: "> SIGMA MESH PROBE … SECTOR OFFLINE" },
    { tag: "GEO", text: "> LAT 19.76°N · LON 96.04°E … BEACON —" },
    { tag: "REROUTE", text: "> RE-ROUTING TO BASE … OK" },
    { tag: "LINK", text: "> NEXUS:// HOME [200 OK]" },
  ] as const;

  return (
    <div className="sigma-noise sigma-scanlines relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4 sm:p-8">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="sigma-vignette pointer-events-none absolute inset-0" />

      {/* Top + bottom hazard stripe — kept red for "danger" semantics */}
      <div
        className="absolute inset-x-0 top-0 h-2"
        style={{ background: "repeating-linear-gradient(45deg, #B85C2E 0, #B85C2E 8px, #0a0a0a 8px, #0a0a0a 16px)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2"
        style={{ background: "repeating-linear-gradient(45deg, #B85C2E 0, #B85C2E 8px, #0a0a0a 8px, #0a0a0a 16px)" }}
        aria-hidden="true"
      />

      {/* Corner brackets — GOLD brand accent */}
      <span className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-[#D4AF37]/70 sm:left-4 sm:top-4" aria-hidden="true" />
      <span className="absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-[#D4AF37]/70 sm:right-4 sm:top-4" aria-hidden="true" />
      <span className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-[#D4AF37]/70 sm:bottom-4 sm:left-4" aria-hidden="true" />
      <span className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-[#D4AF37]/70 sm:bottom-4 sm:right-4" aria-hidden="true" />

      {/* Status bar */}
      <div className="absolute left-0 top-0 flex h-8 w-full items-center border-b border-border bg-background/80 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm mt-2">
        <span className="flex items-center gap-2 border-r border-border px-3">
          <span className="sigma-pulse h-1.5 w-1.5 bg-[#B85C2E]" aria-hidden="true" />
          TAUNGOO SIGMA
        </span>
        <span className="border-r border-border px-3 text-muted-foreground">ERROR · 404</span>
        <span className="ml-auto border-l border-border px-3" style={{ color: "#D4AF37" }}>
          SECTOR NOT FOUND
        </span>
      </div>

      {/* Main content */}
      <div
        className="relative z-10 flex w-full max-w-md flex-col items-center text-center"
        style={{ clipPath: "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)" }}
      >
        {/* Glitch 404 number — GOLD brand accent */}
        <div
          className="sigma-glitch font-sans text-7xl font-black leading-none sm:text-9xl"
          data-text="404"
          style={{ color: "#D4AF37", textShadow: "0 0 30px rgba(212,175,55,0.4)" }}
        >
          404
        </div>

        {/* Main label */}
        <div
          className="sigma-glitch mt-4 font-mono text-sm font-bold uppercase tracking-[0.3em] sm:text-lg"
          data-text="[ SECTOR NOT FOUND ]"
          style={{ color: "#D4AF37", textShadow: "0 0 15px rgba(212,175,55,0.6)" }}
        >
          [ SECTOR NOT FOUND ]
        </div>

        {/* ASCII separator — gold center node */}
        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground" aria-hidden="true">
          ━━━━━━ <span style={{ color: "#D4AF37" }}>Σ</span> ━━━━━━
        </div>

        {/* Description */}
        <p className="mt-4 max-w-md font-serif text-sm italic text-muted-foreground sm:text-base">
          The sector you requested does not exist in the sigma mesh. The signal
          has been lost in the void between sectors.
        </p>

        {/* Error dossier — terminal-style */}
        <div className="mt-6 w-full border border-border bg-card/60 p-4 font-mono text-[10px] uppercase tracking-[0.18em]">
          <div className="flex justify-between gap-4 border-b border-border/40 pb-2">
            <span className="text-muted-foreground">ERROR CODE</span>
            <span style={{ color: "#B85C2E" }}>404 · SECTOR_NOT_FOUND</span>
          </div>
          <div className="flex justify-between gap-4 border-b border-border/40 py-2">
            <span className="text-muted-foreground">SIGMA STATE</span>
            <span className="text-foreground">VARIABLE LOST</span>
          </div>
          <div className="flex justify-between gap-4 border-b border-border/40 py-2">
            <span className="text-muted-foreground">RECOVERY</span>
            <span style={{ color: "#00FF94" }}>AVAILABLE</span>
          </div>
          <div className="flex justify-between gap-4 pt-2">
            <span className="text-muted-foreground">RECOMMENDED</span>
            <span style={{ color: "#D4AF37" }}>RETURN TO NEXUS</span>
          </div>
        </div>

        {/* Fake RE-ROUTE sequence — static text, no timers */}
        <div className="mt-4 w-full border border-border/60 bg-black/40 p-3 text-left font-mono text-[10px] leading-relaxed">
          {ROUTE_LINES.map((line, i) => (
            <div key={line.tag} className="flex items-start gap-2">
              <span className="shrink-0 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span className="shrink-0" style={{ color: "#D4AF37" }}>{line.tag}</span>
              <span className="text-muted-foreground">{line.text}</span>
            </div>
          ))}
          <div className="mt-1 flex items-center gap-2">
            <span className="text-muted-foreground">{"›"}</span>
            <span style={{ color: "#D4AF37" }}>READY</span>
            <span className="sigma-blink" style={{ color: "#D4AF37" }} aria-hidden="true">▮</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="flex-1 border px-6 py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.2em] transition-all hover:brightness-110 sm:flex-none"
            style={{
              borderColor: "#D4AF37",
              background: "#D4AF37",
              color: "#0a0a0a",
              transitionDuration: "var(--dur-fast)",
              transitionTimingFunction: "var(--ease-out-expo)",
            }}
          >
            ◄ RETURN TO NEXUS ►
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex-1 border border-border px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-all hover:bg-foreground/10 sm:flex-none"
            style={{ transitionDuration: "var(--dur-fast)", transitionTimingFunction: "var(--ease-out-expo)" }}
          >
            ◂ GO BACK
          </button>
        </div>

        {/* Blinking cursor */}
        <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          ▮ STANDING BY FOR INPUT <span className="sigma-blink" style={{ color: "#D4AF37" }} aria-hidden="true">▮</span>
        </div>

        {/* Barcode */}
        <div className="mt-6 flex h-5 gap-px" aria-hidden="true">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="bg-foreground"
              style={{ width: i % 3 === 0 ? 2 : 1, opacity: (i * 7) % 10 < 6 ? 0.7 : 0.2 }}
            />
          ))}
        </div>

        {/* Footer text */}
        <div className="mt-3 font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground sm:text-[9px]">
          ▮ TAUNGOO Σ Lab · BUILD 2.7.SIGMA · ALL SYSTEMS NOMINAL EXCEPT YOU
        </div>
      </div>
    </div>
  );
}
