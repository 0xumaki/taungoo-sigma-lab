"use client";

import { GlitchImage } from "./GlitchImage";

export function AlphaHero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20">
      {/* Background image — higher exposure with glitch effect */}
      <div className="pointer-events-none absolute inset-0">
        <GlitchImage
          src="/alpha-hero-bg.png"
          alt=""
          className="h-full w-full"
          intensity={0.6}
        />
        {/* Dark overlay — only on left side for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-20" />

      {/* Accent glow */}
      <div
        className="pointer-events-none absolute -right-1/4 top-1/4 h-[60vh] w-[60vh] rounded-full opacity-10 blur-[100px]"
        style={{ background: "#FF4500" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          {/* Left: Content */}
          <div>
            {/* Status badge */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border border-border bg-background/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
                <span className="sigma-pulse h-1.5 w-1.5 bg-[#00FF94]" />
                SYSTEM ONLINE
              </div>
              <div className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
                TAUNGOO SIGMA LAB · v2.7
              </div>
            </div>

            <h1 className="mt-5 font-sans text-5xl font-black uppercase leading-[0.88] tracking-tight sm:text-7xl">
              WE BUILD<br />
              <span
                className="sigma-glitch"
                data-text="INTELLIGENT"
                style={{ color: "#FF4500" }}
              >
                INTELLIGENT
              </span><br />
              SYSTEMS.
            </h1>

            <p className="mt-6 max-w-xl font-serif text-base italic text-muted-foreground sm:text-lg">
              A full-stack development lab engineering AI services, automation, Web3, and consumer/enterprise applications. From agent swarms to smart contracts — we ship production systems.
            </p>

            {/* Feature pills */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["AI AGENTS", "WEB3", "AUTOMATION", "FULL-STACK", "VOICE AI", "SMART CONTRACTS"].map((tag) => (
                <span key={tag} className="border border-border/60 bg-background/40 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-sm">{tag}</span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#services"
                className="border border-foreground bg-foreground px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80"
              >
                EXPLORE SERVICES →
              </a>
              <a
                href="#portfolio"
                className="border border-border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground/10"
              >
                VIEW WORK →
              </a>
            </div>
          </div>

          {/* Right: HUD-style data panels */}
          <div className="hidden lg:flex lg:flex-col lg:gap-3">
            {/* System readout panel */}
            <div className="border border-border/60 bg-background/50 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#FF4500]">▸ SYSTEM STATUS</span>
                <span className="sigma-pulse h-1.5 w-1.5 bg-[#00FF94]" />
              </div>
              <div className="mt-2 space-y-1">
                {[
                  ["NEURAL FORGE", "ONLINE", "#00FF94"],
                  ["AGENT SWARM", "ACTIVE", "#00FF94"],
                  ["WEB3 RAIL", "ONLINE", "#00FF94"],
                  ["SIGMA VAR", "1.0000", "#FF4500"],
                ].map(([k, v, c]) => (
                  <div key={k} className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em]">
                    <span className="text-muted-foreground">{k}</span>
                    <span style={{ color: c }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live metrics panel */}
            <div className="border border-border/60 bg-background/50 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#00E5FF]">▸ LIVE METRICS</span>
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">REAL-TIME</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-3">
                {[
                  ["OPS/SEC", "12.4k", "#00FF94"],
                  ["AGENTS", "47", "#00E5FF"],
                  ["UPTIME", "99.9%", "#FFB300"],
                ].map(([k, v, c]) => (
                  <div key={k}>
                    <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">{k}</div>
                    <div className="font-sans text-xl font-black" style={{ color: c }}>{v}</div>
                  </div>
                ))}
              </div>
              {/* Mini bar chart */}
              <div className="mt-3 flex h-8 items-end gap-0.5">
                {[40, 65, 30, 80, 55, 90, 45, 70, 60, 85, 50, 75].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#00FF94]/30" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            {/* Sigma glyph */}
            <div className="flex items-center justify-center gap-3">
              <div
                className="sigma-spin-slow flex h-16 w-16 items-center justify-center border-2 border-[#FF4500]/30 font-sans text-3xl font-black"
                style={{ color: "#FF4500" }}
              >
                Σ
              </div>
              <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground">
                THE SIGMA VARIABLE<br />HOLDING AT 1.0000
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar — maximalist */}
        <div className="mt-10 grid grid-cols-2 gap-px border border-border/60 bg-border/40 sm:grid-cols-4">
          {[
            ["50+", "PROJECTS SHIPPED", "#FF4500"],
            ["8", "ENGINEERS", "#00E5FF"],
            ["11", "RESEARCH PILLARS", "#C6FF00"],
            ["99.9%", "UPTIME", "#00FF94"],
          ].map(([v, k, c]) => (
            <div key={k} className="bg-card/60 p-3 backdrop-blur-sm">
              <div className="font-sans text-2xl font-black sm:text-3xl" style={{ color: c }}>{v}</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{k}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator + ticker */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="sigma-blink">▼</span> SCROLL TO EXPLORE
          </div>
          <div className="hidden font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground/60 sm:block">
            BUILD 2.7.SIGMA · 11 SECTORS · 26 SERVICES · DUAL MODE
          </div>
        </div>
      </div>

      {/* Corner crosshairs */}
      <span className="absolute left-4 top-20 h-4 w-4 border-l border-t border-foreground/40" />
      <span className="absolute right-4 top-20 h-4 w-4 border-r border-t border-foreground/40" />
      <span className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-foreground/40" />
      <span className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-foreground/40" />
    </section>
  );
}
