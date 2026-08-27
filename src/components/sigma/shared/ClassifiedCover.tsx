"use client";

import * as React from "react";

/**
 * ClassifiedCover
 *
 * Retro brutalist glitching green PC screen.
 * Used wherever a project screenshot is missing — replaces the old
 * plain "[ SCREENSHOT CLASSIFIED ]" placeholder.
 *
 * Aesthetic: 90s CRT terminal, scanlines, hazard stripes, RGB glitch,
 * blinking cursor, green (#00FF94) palette throughout.
 */
export function ClassifiedCover({
  variant = "card",
  className = "",
}: {
  variant?: "card" | "detail" | "page";
  className?: string;
}) {
  const isDetail = variant === "detail";
  const isPage = variant === "page";

  const textSize = isPage
    ? { icon: "text-5xl", title: "text-base sm:text-lg", sub: "text-[11px] sm:text-xs" }
    : isDetail
      ? { icon: "text-4xl", title: "text-sm", sub: "text-[10px]" }
      : { icon: "text-2xl", title: "text-[10px]", sub: "text-[9px]" };

  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden bg-black p-4 ${className}`}
      aria-label="Access restricted — contact us to unlock screenshot"
      role="img"
    >
      {/* Scanlines */}
      <div
        className="sigma-scanlines pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,255,148,0.06) 3px, rgba(0,255,148,0.06) 4px)",
        }}
        aria-hidden
      />
      {/* Green glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,255,148,0.12), transparent 70%)",
        }}
        aria-hidden
      />
      {/* ASCII-art-style border frame */}
      <div
        className="pointer-events-none absolute inset-2 border border-[#00FF94]/30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-4 border border-[#00FF94]/15"
        aria-hidden
      />

      {/* Top status bar — retro terminal header */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between border-b border-[#00FF94]/25 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-[#00FF94]/70">
        <span>TSR-OS v3.14</span>
        <span className="flex items-center gap-1">
          <span className="sigma-pulse h-1.5 w-1.5 bg-[#00FF94]" /> SECURE
        </span>
      </div>

      {/* Warning icon */}
      <div
        className={`sigma-glitch font-mono ${textSize.icon} text-[#00FF94] [text-shadow:0_0_12px_rgba(0,255,148,0.6)]`}
        data-text="⚠"
      >
        ⚠
      </div>

      {/* Main text */}
      <div
        className={`sigma-glitch font-mono ${textSize.title} font-bold uppercase tracking-[0.3em] text-[#00FF94] [text-shadow:0_0_8px_rgba(0,255,148,0.5)]`}
        data-text="[ ACCESS RESTRICTED ]"
      >
        [ ACCESS RESTRICTED ]
      </div>

      {/* ASCII frame line */}
      <div className="font-mono text-[8px] uppercase tracking-[0.4em] text-[#00FF94]/50">
        ━━━━━━ ▣ ━━━━━━
      </div>

      {/* Blinking cursor subtitle */}
      <div className={`font-mono ${textSize.sub} uppercase tracking-[0.2em] text-[#00FF94]/70`}>
        CONTACT US TO UNLOCK <span className="sigma-blink">▮</span>
      </div>

      {/* Bottom telemetry strip */}
      <div className="absolute bottom-2 left-0 right-0 flex items-center justify-between px-3 font-mono text-[7px] uppercase tracking-[0.18em] text-[#00FF94]/40">
        <span>ERR: EACCES</span>
        <span>0x00FF94</span>
      </div>

      {/* Hazard stripe bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2"
        style={{
          background:
            "repeating-linear-gradient(45deg, #00FF94 0, #00FF94 4px, transparent 4px, transparent 8px)",
        }}
        aria-hidden
      />
      {/* Hazard stripe top */}
      <div
        className="absolute left-0 right-0 top-0 h-[2px]"
        style={{
          background:
            "repeating-linear-gradient(45deg, #00FF94 0, #00FF94 4px, transparent 4px, transparent 8px)",
        }}
        aria-hidden
      />
    </div>
  );
}
