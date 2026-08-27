"use client";

import * as React from "react";
import gsap from "gsap";
import { sigmaSound } from "@/lib/sigma/sound";

const BOOT_STEPS = [
  "MOUNT KERNEL",
  "ALLOC SIGMA VAR",
  "NEURAL FORGE",
  "WEB3 RAIL",
  "EDGE MESH",
  "QUANTUM SIM",
  "COMMUNITY OS",
  "NEXUS MAP",
  "HANDSHAKE OK",
];

/**
 * SigmaBoot — a one-time boot sequence shown on first visit before the map.
 * Uses useEffect + gsap.timeline directly for maximum reliability.
 */
export function SigmaBoot({ onDone }: { onDone: () => void }) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);
  const pctRef = React.useRef<HTMLSpanElement>(null);
  const stepRef = React.useRef<HTMLSpanElement>(null);
  const logRef = React.useRef<HTMLDivElement>(null);
  const doneRef = React.useRef(onDone);
  React.useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Progress via rAF (rock-solid), visual transitions via gsap
    let p = 0;
    let raf = 0;
    const startTs = performance.now();
    const DURATION = 2600;

    const tick = (now: number) => {
      const elapsed = now - startTs;
      // ease-in-out
      const linear = Math.min(1, elapsed / DURATION);
      const eased = linear < 0.5 ? 2 * linear * linear : 1 - Math.pow(-2 * linear + 2, 2) / 2;
      p = Math.round(eased * 100);

      if (barRef.current) barRef.current.style.width = `${p}%`;
      if (pctRef.current) pctRef.current.textContent = String(p).padStart(3, "0");
      const stepIdx = Math.min(BOOT_STEPS.length - 1, Math.floor((p / 100) * BOOT_STEPS.length));
      if (stepRef.current) stepRef.current.textContent = BOOT_STEPS[stepIdx];

      if (linear < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // done — play exit animation
        finish();
      }
    };

    // stream log lines at intervals
    const logTimers: number[] = [];
    BOOT_STEPS.forEach((step, i) => {
      const t = window.setTimeout(() => {
        if (logRef.current) {
          const line = document.createElement("div");
          line.className = "text-[#00FF94]";
          line.textContent = `> [${String(i + 1).padStart(2, "0")}] ${step} ... OK`;
          logRef.current.appendChild(line);
          logRef.current.scrollTop = logRef.current.scrollHeight;
        }
      }, (i + 0.5) * (DURATION / BOOT_STEPS.length));
      logTimers.push(t);
    });

    raf = requestAnimationFrame(tick);

    function finish() {
      // play boot-complete sound
      sigmaSound.play("boot");
      // exit flash + fade
      const flash = root?.querySelector("[data-boot-flash]");
      const tl = gsap.timeline({
        onComplete: () => {
          sigmaSound.play("complete");
          doneRef.current();
        },
      });
      if (flash) {
        tl.to(flash, { opacity: 1, duration: 0.15, ease: "power2.in" });
      }
      tl.to(root, { opacity: 0, duration: 0.4, ease: "power2.in" }, ">-0.05");
    }

    return () => {
      cancelAnimationFrame(raf);
      logTimers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-boot-root
      className="sigma-noise sigma-scanlines fixed inset-0 z-[120] flex flex-col items-center justify-center bg-background"
    >
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-50" />

      {/* center: glyph + title */}
      <div className="relative flex flex-col items-center">
        <div className="sigma-spin-slow mb-6 flex h-28 w-28 items-center justify-center border border-foreground/30 font-sans text-7xl font-black text-foreground">
          Σ
        </div>
        <div className="overflow-hidden">
          <h1 className="font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
            TAUNGOO SIGMA
          </h1>
        </div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          INITIALIZING SECTORS · 11 / 11
        </div>
      </div>

      {/* progress + log */}
      <div className="mt-10 w-full max-w-md px-6">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
          <span ref={stepRef} className="text-foreground">
            {BOOT_STEPS[0]}
          </span>
          <span className="text-muted-foreground">
            <span ref={pctRef}>000</span>%
          </span>
        </div>
        <div className="h-1.5 w-full bg-foreground/10">
          <div
            ref={barRef}
            className="h-full bg-[#00FF94]"
            style={{ width: "0%" }}
          />
        </div>

        {/* terminal log */}
        <div
          ref={logRef}
          className="sigma-scroll-hidden mt-4 h-24 overflow-y-auto border border-border/60 bg-black/60 p-2 font-mono text-[10px] leading-relaxed"
        />

        {/* corner crosshairs */}
        <div className="pointer-events-none absolute inset-0">
          <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-foreground/60" />
          <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-foreground/60" />
          <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-foreground/60" />
          <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-foreground/60" />
        </div>
      </div>

      {/* bottom hint */}
      <div className="absolute bottom-6 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
        ▮ ESTABLISHING SECURE CHANNEL · DO NOT REFRESH
      </div>

      {/* final flash */}
      <div
        data-boot-flash
        className="absolute inset-0 bg-[#00FF94]"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
