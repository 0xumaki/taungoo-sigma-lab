"use client";

import { GlitchImage } from "./GlitchImage";

export function AlphaHero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20">
      {/* Background image — reduced brightness with glitch */}
      <div className="pointer-events-none absolute inset-0">
        <GlitchImage src="/alpha-hero-bg.png" alt="" className="h-full w-full" intensity={0.5} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-15" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-20" />

      {/* Accent glow */}
      <div className="pointer-events-none absolute -right-1/4 top-1/4 h-[60vh] w-[60vh] rounded-full opacity-10 blur-[100px]" style={{ background: "#FF4500" }} />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          {/* Left: Content */}
          <div>
            {/* Status badges — maximalist row */}
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

            <h1 className="mt-5 font-sans text-5xl font-black uppercase leading-[0.88] tracking-tight sm:text-7xl">
              WE BUILD<br />
              <span className="sigma-glitch" data-text="INTELLIGENT" style={{ color: "#FF4500" }}>
                INTELLIGENT
              </span><br />
              SYSTEMS.
            </h1>

            <p className="mt-6 max-w-xl font-serif text-base italic text-muted-foreground sm:text-lg">
              A full-stack development lab engineering AI services, automation, Web3, and consumer/enterprise applications. From agent swarms to smart contracts — we ship production systems.
            </p>

            {/* Feature pills — maximalist */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["AI AGENTS", "WEB3", "AUTOMATION", "FULL-STACK", "VOICE AI", "SMART CONTRACTS", "MCP", "N8N"].map((tag) => (
                <span key={tag} className="border border-border/60 bg-background/40 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-sm">{tag}</span>
              ))}
            </div>

            {/* Buttons — maximalist with data overlays */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#services"
                className="group relative border border-[#FF4500] bg-[#FF4500] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-black transition-all hover:shadow-[4px_4px_0_0_#FF4500]"
              >
                <span className="flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center border border-black/30 text-[8px]">▸</span>
                  EXPLORE SERVICES
                  <span className="text-[8px] opacity-60">26 SERVICES</span>
                </span>
              </a>
              <a
                href="#portfolio"
                className="group relative border border-border bg-background/60 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground backdrop-blur-sm transition-all hover:border-foreground/60 hover:bg-foreground/10"
              >
                <span className="flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center border border-foreground/30 text-[8px]">▸</span>
                  VIEW WORK
                  <span className="text-[8px] opacity-60">10 PROJECTS</span>
                </span>
              </a>
              <a
                href="#contact"
                className="group relative border border-foreground/40 bg-background/60 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground backdrop-blur-sm transition-all hover:border-foreground/60 hover:bg-foreground/10"
              >
                <span className="flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center border border-foreground/30 text-[8px]">✉</span>
                  CONTACT
                  <span className="text-[8px] opacity-60">72H RESPONSE</span>
                </span>
              </a>
            </div>
          </div>

          {/* Right: Static Σ glyph with maximalist data overlays */}
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <div className="relative">
              {/* Static (no spin) Σ in a cut-corner frame */}
              <div
                className="relative flex h-64 w-64 items-center justify-center border-2 border-[#FF4500]/30"
                style={{ clipPath: "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)" }}
              >
                <span className="font-sans text-[10rem] font-black" style={{ color: "#FF4500" }}>Σ</span>
                {/* Scanlines on glyph */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{ background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px)" }}
                />
                {/* Hazard stripe corner */}
                <div
                  className="absolute right-0 top-0 h-8 w-8"
                  style={{ background: "repeating-linear-gradient(45deg, #FF4500 0, #FF4500 3px, transparent 3px, transparent 6px)" }}
                />
              </div>

              {/* Orbiting dots — static positions */}
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#00FF94]" />
              <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#00E5FF]" />
              <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#C6FF00]" />
              <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#FF2D7E]" />

              {/* Data labels around the glyph */}
              <div className="absolute -left-16 top-1/4 font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground">
                SIG=1.0000
              </div>
              <div className="absolute -right-20 top-1/3 font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground">
                NODES: 11
              </div>
              <div className="absolute -left-12 bottom-1/4 font-mono text-[7px] uppercase tracking-[0.16em] text-[#00FF94]">
                STATUS: ONLINE
              </div>

              {/* Label below */}
              <div className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                THE SIGMA VARIABLE
              </div>
            </div>
          </div>
        </div>

        {/* Stats — maximalist with hazard fills */}
        <div className="mt-12 grid grid-cols-2 gap-px border border-border/40 bg-border/40 sm:grid-cols-4">
          {[
            ["50+", "PROJECTS SHIPPED", "#FF4500"],
            ["8", "ENGINEERS", "#00E5FF"],
            ["26", "SERVICES", "#C6FF00"],
            ["99.9%", "UPTIME", "#00FF94"],
          ].map(([v, k, c]) => (
            <div key={k} className="relative bg-card/60 p-3 backdrop-blur-sm">
              {/* Top hazard strip */}
              <div className="absolute left-0 top-0 h-0.5 w-full" style={{ background: `repeating-linear-gradient(45deg, ${c} 0, ${c} 3px, transparent 3px, transparent 6px)` }} />
              <div className="mt-1 font-sans text-2xl font-black sm:text-3xl" style={{ color: c }}>{v}</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{k}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator + build info */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="sigma-blink">▼</span> SCROLL TO EXPLORE
          </div>
          <div className="hidden font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground/60 sm:block">
            BUILD 2.7.SIGMA · DUAL MODE: Σ/Α · SINCE 2016 · YANGON
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
