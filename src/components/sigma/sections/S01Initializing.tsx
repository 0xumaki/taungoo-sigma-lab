"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { BrutalButton, Crosshair, Panel } from "../shared/components";
import { SigmaParticles } from "../shared/SigmaParticles";

gsap.registerPlugin(useGSAP);

const BOOT_LINES = [
  "[ 0.001 ] TAUNGOO SIGMA KERNEL v2.4.Σ …",
  "[ 0.014 ] mounting /sigma/core … OK",
  "[ 0.031 ] neural-forge: 5 pillars online",
  "[ 0.058 ] calibrating sigma variable … 1.0000",
  "[ 0.092 ] handshake: NEXUS MAP …… OK",
  "[ 0.118 ] access: PUBLIC READ granted",
  "[ 0.207 ] boot complete. welcome, operator.",
];

export function S01Initializing() {
  const { navigate } = useSigmaStore();
  const root = React.useRef<HTMLDivElement>(null);
  const logRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-mark]", {
        opacity: 0,
        scale: 1.1,
        duration: 1.2,
        ease: "power2.out",
      })
        .from(
          "[data-hero-letter]",
          {
            opacity: 0,
            y: 60,
            duration: 0.7,
            stagger: 0.06,
          },
          "-=0.7"
        )
        .from(
          "[data-hero-panel]",
          { opacity: 0, x: (i) => (i % 2 ? 30 : -30), duration: 0.6, stagger: 0.1 },
          "-=0.5"
        )
        .from("[data-hero-cta]", { opacity: 0, y: 16, duration: 0.5 }, "-=0.3");
    },
    { scope: root }
  );

  // typewriter boot log
  React.useEffect(() => {
    if (!logRef.current) return;
    let i = 0;
    let line = 0;
    const full = BOOT_LINES.join("\n");
    const node = logRef.current;
    node.textContent = "";
    const t = setInterval(() => {
      node.textContent = full.slice(0, i);
      i += 2;
      if (i > full.length) {
        clearInterval(t);
      }
      // autoscroll
      node.scrollTop = node.scrollHeight;
    }, 14);
    return () => clearInterval(t);
  }, []);

  const letters = "TAUNGOO".split("");

  return (
    <SectionShell
      id="s01"
      title="INITIALIZING"
      tagline="Boot sequence. The sigma variable is online and holding at 1.0000."
    >
      <div ref={root} className="relative grid h-full grid-cols-12 gap-3 overflow-hidden">
        {/* Ambient boot particles */}
        <SigmaParticles count={16} color="#FFFFFF" />
        {/* LEFT VERTICAL PANEL */}
        <Panel
          data-hero-panel
          label="FIG.01 / EYE"
          id="RETICLE"
          className="col-span-12 md:col-span-2 flex flex-col"
        >
          <div className="flex flex-1 items-center justify-center p-3">
            {/* eye + reticle SVG */}
            <svg viewBox="0 0 200 200" className="sigma-spin-slow h-full max-h-[220px] w-full text-foreground">
              <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="100" cy="100" r="12" fill="currentColor" />
              <circle cx="100" cy="100" r="4" fill="#000" />
              {/* crosshair */}
              <line x1="100" y1="0" x2="100" y2="190" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
              <line x1="0" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
              {/* ticks */}
              {Array.from({ length: 36 }).map((_, i) => {
                const a = (i / 36) * Math.PI * 2;
                const x1 = 100 + Math.cos(a) * 94;
                const y1 = 100 + Math.sin(a) * 94;
                const x2 = 100 + Math.cos(a) * (i % 3 === 0 ? 86 : 90);
                const y2 = 100 + Math.sin(a) * (i % 3 === 0 ? 86 : 90);
                return (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" opacity="0.7" />
                );
              })}
            </svg>
          </div>
          <div className="border-t border-border/70 p-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            APERTURE · ƒ/2.4Σ · FOCUS LOCKED
          </div>
        </Panel>

        {/* CENTER HERO */}
        <div className="col-span-12 flex flex-col md:col-span-8">
          {/* top status bar */}
          <div className="flex items-center justify-between border-b border-border pb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span data-hero-panel>◄ INITIALIZING ►</span>
            <span data-hero-panel>SIGMA.24 / 0114071813</span>
          </div>

          {/* the wordmark */}
          <div className="relative flex flex-1 flex-col items-center justify-center">
            <div
              data-hero-mark
              className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.06]"
            >
              <span className="font-sans text-[42vh] font-black leading-none">Σ</span>
            </div>
            <h1 className="relative text-center">
              <div className="flex justify-center">
                {letters.map((l, i) => (
                  <span
                    key={i}
                    data-hero-letter
                    className="font-sans text-[10vw] font-black leading-[0.85] tracking-tight"
                  >
                    {l}
                  </span>
                ))}
                <span
                  data-hero-letter
                  className="font-sans text-[10vw] font-black leading-[0.85] align-super text-[0.4em]"
                >
                  ™
                </span>
              </div>
              <div className="mt-1 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-foreground/40" />
                <span
                  data-hero-letter
                  className="font-mono text-base uppercase tracking-[0.4em] text-muted-foreground sm:text-xl"
                >
                  SIGMA LAB
                </span>
                <span className="h-px w-12 bg-foreground/40" />
              </div>
            </h1>

            {/* reticle overlay on the wordmark */}
            <Crosshair className="left-6 top-6 text-foreground/50" size={16} />
            <Crosshair className="right-6 top-6 text-foreground/50" size={16} />
            <Crosshair className="bottom-6 left-6 text-foreground/50" size={16} />
            <Crosshair className="bottom-6 right-6 text-foreground/50" size={16} />

            {/* sub header block */}
            <div
              data-hero-panel
              className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
            >
              <span>HUMAN</span>
              <span className="text-foreground">PROCESSING</span>
              <span className="h-3 w-px bg-foreground/30" />
              <span className="text-[#00FF94]">● INITIALIZED_</span>
            </div>
          </div>

          {/* CTA row */}
          <div data-hero-cta className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              ◄ REMODEL · RETRAIN · RE-DEPLOY ►
            </div>
            <div className="flex gap-2">
              <BrutalButton variant="ghost" onClick={() => navigate("map")}>
                ENTER THE MAP
              </BrutalButton>
              <BrutalButton accent="#FF4500" onClick={() => navigate("s02")}>
                PROCEED TO MANIFESTO
              </BrutalButton>
            </div>
          </div>
        </div>

        {/* RIGHT DATA PANELS */}
        <div className="col-span-12 flex flex-col gap-3 md:col-span-2">
          <Panel data-hero-panel label="SYS.01" id="T·S·G·M·A">
            <div className="grid grid-cols-2 gap-px bg-border/60">
              {["T", "S", "G", "M", "A", "L"].map((c, i) => (
                <div key={i} className="bg-card p-2 text-center font-mono text-xl font-bold">
                  {c}
                </div>
              ))}
            </div>
            <div className="p-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              ID · 0114071813
            </div>
          </Panel>

          <Panel data-hero-panel label="BOOT LOG" id="TTY/0">
            <div
              ref={logRef}
              className="sigma-scroll-hidden h-40 overflow-y-auto whitespace-pre-wrap p-2 font-mono text-[10px] leading-relaxed text-[#00FF94]"
            >
              {BOOT_LINES.join("\n")}
            </div>
          </Panel>

          <Panel data-hero-panel label="SIGMA" id="1.0000">
            <div className="p-3">
              <div className="font-mono text-3xl font-black text-foreground">1.0000</div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                VARIABLE HOLDING NOMINAL
              </div>
              <div className="mt-2 h-1 w-full bg-foreground/15">
                <div className="h-full bg-[#00FF94]" style={{ width: "100%" }} />
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </SectionShell>
  );
}
