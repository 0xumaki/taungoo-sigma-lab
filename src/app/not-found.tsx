"use client";

import * as React from "react";
import { useSigmaStore } from "@/lib/sigma/store";

export default function NotFound() {
  const { navigate } = useSigmaStore();

  return (
    <div className="sigma-noise sigma-scanlines relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-8">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-50" />

      {/* corner crosshairs */}
      <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-foreground/60" />
      <span className="absolute right-4 top-4 h-4 w-4 border-r border-t border-foreground/60" />
      <span className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-foreground/60" />
      <span className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-foreground/60" />

      {/* status bar */}
      <div className="absolute left-0 top-0 flex h-8 w-full items-center border-b border-border bg-background/80 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">
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

      {/* main content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="sigma-spin-slow mb-6 flex h-24 w-24 items-center justify-center border border-[#FF3D3D]/40 font-sans text-6xl font-black text-[#FF3D3D]">
          404
        </div>

        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          ◄ SIGNAL LOST ►
        </div>

        <h1 className="mt-2 font-sans text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl">
          <span className="sigma-glitch" data-text="VOID" style={{ color: "#FF3D3D" }}>
            VOID
          </span>
        </h1>

        <p className="mt-3 max-w-md font-serif text-base italic text-muted-foreground">
          The sector you requested does not exist in the sigma mesh. The signal
          has been lost in the void between sectors.
        </p>

        {/* error details */}
        <div className="mt-6 border border-border bg-card/60 p-4 font-mono text-[10px] uppercase tracking-[0.18em]">
          <div className="flex justify-between gap-8">
            <span className="text-muted-foreground">ERROR CODE</span>
            <span className="text-[#FF3D3D]">404 · SECTOR_NOT_FOUND</span>
          </div>
          <div className="mt-1.5 flex justify-between gap-8">
            <span className="text-muted-foreground">SIGMA STATE</span>
            <span className="text-foreground">VARIABLE LOST</span>
          </div>
          <div className="mt-1.5 flex justify-between gap-8">
            <span className="text-muted-foreground">RECOVERY</span>
            <span className="text-[#00FF94]">AVAILABLE</span>
          </div>
        </div>

        {/* actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate("map")}
            className="border border-border bg-foreground px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition-all hover:bg-foreground/85"
            data-cursor="hover"
          >
            ◄ RETURN TO NEXUS ►
          </button>
          <button
            onClick={() => window.history.back()}
            className="border border-border px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-all hover:bg-foreground/10"
            data-cursor="hover"
          >
            ◂ GO BACK
          </button>
        </div>

        {/* barcode */}
        <div className="mt-8 flex h-6 gap-px">
          {Array.from({ length: 60 }).map((_, i) => (
            <span
              key={i}
              className="bg-foreground"
              style={{ width: i % 3 === 0 ? 3 : 1, opacity: (i * 7) % 10 < 6 ? 0.9 : 0.3 }}
            />
          ))}
        </div>

        <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
          ▮ TAUNGOO SIGMA LAB · BUILD 2.7.SIGMA · ALL SYSTEMS NOMINAL EXCEPT YOU
        </div>
      </div>
    </div>
  );
}
