"use client";

import * as React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="sigma-noise sigma-scanlines relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4 sm:p-8">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="sigma-vignette pointer-events-none absolute inset-0" />

      {/* Top hazard stripe */}
      <div
        className="absolute inset-x-0 top-0 h-2"
        style={{ background: "repeating-linear-gradient(45deg, #FF3D3D 0, #FF3D3D 8px, #0a0a0a 8px, #0a0a0a 16px)" }}
      />
      {/* Bottom hazard stripe */}
      <div
        className="absolute inset-x-0 bottom-0 h-2"
        style={{ background: "repeating-linear-gradient(45deg, #FF3D3D 0, #FF3D3D 8px, #0a0a0a 8px, #0a0a0a 16px)" }}
      />

      {/* Corner brackets */}
      <span className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-[#FF3D3D]/60 sm:left-4 sm:top-4" />
      <span className="absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-[#FF3D3D]/60 sm:right-4 sm:top-4" />
      <span className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-[#FF3D3D]/60 sm:bottom-4 sm:left-4" />
      <span className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-[#FF3D3D]/60 sm:bottom-4 sm:right-4" />

      {/* Status bar */}
      <div className="absolute left-0 top-0 flex h-8 w-full items-center border-b border-border bg-background/80 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm mt-2">
        <span className="flex items-center gap-2 border-r border-border px-3">
          <span className="sigma-pulse h-1.5 w-1.5 bg-[#FF3D3D]" />
          TAUNGOO SIGMA
        </span>
        <span className="border-r border-border px-3 text-muted-foreground">
          ERROR · 404
        </span>
        <span className="ml-auto border-l border-border px-3 text-muted-foreground">
          SECTOR NOT FOUND
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center" style={{ clipPath: "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)" }}>
        {/* Glitch 404 number */}
        <div
          className="sigma-glitch font-sans text-7xl font-black leading-none text-[#FF3D3D] sm:text-9xl"
          data-text="404"
          style={{ textShadow: "0 0 30px rgba(255,61,61,0.4)" }}
        >
          404
        </div>

        {/* Warning icon */}
        <div
          className="sigma-glitch mt-4 font-mono text-3xl text-[#FF3D3D] sm:text-4xl"
          data-text="⚠"
          style={{ textShadow: "0 0 15px rgba(255,61,61,0.6)" }}
        >
          ⚠
        </div>

        {/* Main label */}
        <div
          className="sigma-glitch mt-3 font-mono text-sm font-bold uppercase tracking-[0.3em] text-[#FF3D3D] sm:text-lg"
          data-text="[ SIGNAL LOST ]"
        >
          [ SIGNAL LOST ]
        </div>

        {/* ASCII separator */}
        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          ━━━━━━ ▣ ━━━━━━
        </div>

        {/* Description */}
        <p className="mt-4 max-w-md font-serif text-sm italic text-muted-foreground sm:text-base">
          The sector you requested does not exist in the sigma mesh. The signal
          has been lost in the void between sectors.
        </p>

        {/* Error details — SCP-style document */}
        <div className="mt-6 w-full max-w-md border border-border bg-card/60 p-4 font-mono text-[10px] uppercase tracking-[0.18em]">
          <div className="flex justify-between gap-4 border-b border-border/40 pb-2">
            <span className="text-muted-foreground">ERROR CODE</span>
            <span className="text-[#FF3D3D]">404 · SECTOR_NOT_FOUND</span>
          </div>
          <div className="flex justify-between gap-4 border-b border-border/40 py-2">
            <span className="text-muted-foreground">SIGMA STATE</span>
            <span className="text-foreground">VARIABLE LOST</span>
          </div>
          <div className="flex justify-between gap-4 border-b border-border/40 py-2">
            <span className="text-muted-foreground">RECOVERY</span>
            <span className="text-[#00FF94]">AVAILABLE</span>
          </div>
          <div className="flex justify-between gap-4 pt-2">
            <span className="text-muted-foreground">RECOMMENDED</span>
            <span className="text-[#FFB300]">RETURN TO NEXUS</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="border border-foreground bg-foreground px-6 py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-background transition-all hover:bg-foreground/85"
          >
            ◄ RETURN TO NEXUS ►
          </Link>
          <button
            onClick={() => window.history.back()}
            className="border border-border px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-all hover:bg-foreground/10"
          >
            ◂ GO BACK
          </button>
        </div>

        {/* Blinking cursor */}
        <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          ▮ STANDING BY FOR INPUT <span className="sigma-blink">▮</span>
        </div>

        {/* Barcode */}
        <div className="mt-6 flex h-5 gap-px">
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
          ▮ TAUNGOO SIGMA LAB · BUILD 2.7.SIGMA · ALL SYSTEMS NOMINAL EXCEPT YOU
        </div>
      </div>
    </div>
  );
}
