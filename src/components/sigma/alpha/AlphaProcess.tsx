"use client";

import * as React from "react";
import { useCardReveal } from "@/lib/sigma/use-card-reveal";

const STEPS: { num: string; title: string; desc: string; color: string; deliverables: string[]; duration: string }[] = [
  { num: "01", title: "DISCOVERY", color: "#FF4500", duration: "1-2 weeks", desc: "Deep dive into requirements, constraints, and goals. We define scope, timeline, and success metrics.", deliverables: ["Scope document", "Timeline estimate", "Tech stack proposal", "Risk assessment"] },
  { num: "02", title: "ARCHITECTURE", color: "#00E5FF", duration: "1 week", desc: "System design, tech stack selection, and infrastructure planning. Architecture diagrams, API contracts, database schemas.", deliverables: ["Architecture diagrams", "API contracts", "Database schemas", "Infrastructure plan"] },
  { num: "03", title: "BUILD", color: "#C6FF00", duration: "2-8 weeks", desc: "Rapid development with CI/CD, automated testing, and daily deployments to staging. You see progress every day.", deliverables: ["Daily staging deploys", "Automated tests", "Code reviews", "Progress dashboard"] },
  { num: "04", title: "DEPLOY", color: "#00FF94", duration: "1 week +", desc: "Production deployment with monitoring, documentation, and handoff. We don't ship and forget.", deliverables: ["Production deployment", "Monitoring setup", "Documentation", "30-day support"] },
];

const PRINCIPLES: { icon: string; text: string; color: string }[] = [
  { icon: "◐", text: "PRODUCTION-FIRST", color: "#00FF94" },
  { icon: "⬡", text: "MULTI-MODEL AI", color: "#00E5FF" },
  { icon: "▤", text: "DOCUMENTED", color: "#C6FF00" },
  { icon: "⚙", text: "SUPPORTED", color: "#FFB300" },
  { icon: "◴", text: "DAILY DEPLOYS", color: "#FF2D7E" },
  { icon: "⚿", text: "SECURITY AUDITED", color: "#FF3D3D" },
  { icon: "◍", text: "OPEN COMMUNICATION", color: "#B388FF" },
  { icon: "✦", text: "30-DAY WARRANTY", color: "#FFEB3B" },
];

export function AlphaProcess() {
  const cardsRef = useCardReveal<HTMLDivElement>({ stagger: true });
  return (
    <section id="process" className="relative border-t border-border px-3 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 05 / PROCESS</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              OUR <span style={{ color: "#FF4500" }}>PROCESS.</span>
            </h2>
            <p className="mt-2 font-serif text-base italic text-muted-foreground">4 phases. Zero black boxes. Every deliverable documented.</p>
          </div>
          <div className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            <span className="text-[#FF4500]">4</span> PHASES · <span className="text-[#00FF94]">16</span> DELIVERABLES
          </div>
        </div>

        {/* Principles bar */}
        <div className="mt-4 flex flex-wrap gap-1">
          {PRINCIPLES.map((p) => (
            <div key={p.text} className="flex items-center gap-1.5 border border-border/40 bg-card/20 px-2 py-1">
              <span className="font-sans text-xs" style={{ color: p.color }}>{p.icon}</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">{p.text}</span>
            </div>
          ))}
        </div>

        {/* Process cards + Maximalist panel in a grid */}
        <div ref={cardsRef} className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_320px]">
          {/* Left: 4 process cards — no right tail */}
          <div className="space-y-2">
            {STEPS.map((s, idx) => (
              <div
                key={s.num}
                className="sigma-card-reveal sigma-hover-card group relative flex border border-border bg-card/30 transition-all hover:border-foreground/40"
                style={{ "--sigma-hover-accent": s.color, transitionDelay: `${idx * 0.08}s`, clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" } as React.CSSProperties}
              >
                {/* Left: number */}
                <div className="relative flex w-24 shrink-0 flex-col items-center justify-center border-r border-border/40" style={{ background: `linear-gradient(135deg, ${s.color}15, transparent)` }}>
                  <span className="sigma-glitch font-sans text-4xl font-black leading-none" data-text={s.num} style={{ color: s.color }}>{s.num}</span>
                  <span className="mt-0.5 font-mono text-[6px] uppercase tracking-[0.14em] text-muted-foreground">{s.duration}</span>
                  <div className="absolute bottom-0 left-0 h-1 w-full" style={{ background: `repeating-linear-gradient(45deg, ${s.color} 0, ${s.color} 3px, transparent 3px, transparent 6px)` }} />
                </div>

                {/* Middle: title + desc + deliverables */}
                <div className="flex-1 p-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-sans text-sm font-bold uppercase tracking-tight">{s.title}</h3>
                    <span className="font-mono text-[7px] uppercase tracking-[0.14em]" style={{ color: s.color }}>PHASE {s.num}</span>
                    {idx < STEPS.length - 1 && <span className="font-mono text-xs text-muted-foreground/30">→</span>}
                    {idx === STEPS.length - 1 && <span className="font-mono text-xs" style={{ color: s.color }}>✓</span>}
                  </div>
                  <p className="mt-1 font-serif text-xs italic text-muted-foreground">{s.desc}</p>
                  <div className="mt-2 flex flex-wrap gap-0.5">
                    {s.deliverables.map((d) => (
                      <span key={d} className="border px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-[0.1em] text-muted-foreground" style={{ borderColor: `${s.color}33` }}>
                        <span style={{ color: s.color }}>▸</span> {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 z-0 opacity-10" style={{ background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)" }} />
              </div>
            ))}
          </div>

          {/* Right: Maximalist stats panel */}
          <div className="space-y-3">
            {/* Stats panel */}
            <div className="sigma-card-reveal sigma-hover-card border border-border bg-card/30" style={{ "--sigma-hover-accent": "#FF4500", transitionDelay: "0.32s", clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" } as React.CSSProperties}>
              <div className="h-1 w-full bg-[#FF4500]" />
              <div className="p-4">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#FF4500]">▸ DELIVERY STATS</div>
                <div className="mt-3 space-y-3">
                  {[
                    ["4-11", "WEEKS TYPICAL", "#FF4500"],
                    ["27", "SERVICES OFFERED", "#00E5FF"],
                    ["100%", "TRANSPARENT", "#C6FF00"],
                    ["30D", "SUPPORT INCLUDED", "#00FF94"],
                    ["0", "BLACK BOXES", "#FF2D7E"],
                    ["24/7", "MONITORING", "#FFB300"],
                  ].map(([v, k, c]) => (
                    <div key={k} className="flex items-center justify-between border-b border-border/30 pb-1.5">
                      <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">{k}</span>
                      <span className="font-sans text-lg font-black" style={{ color: c }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 z-0 opacity-10" style={{ background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)" }} />
            </div>

            {/* ASCII timeline */}
            <div className="sigma-card-reveal sigma-hover-card border border-border/40 bg-black/40 p-3 font-mono text-[7px] leading-tight text-muted-foreground/50" style={{ "--sigma-hover-accent": "#00FF94", transitionDelay: "0.4s" } as React.CSSProperties}>
              <div>┌─ DISCOVERY ─┬─ ARCH ─┬─ BUILD ─┬─ DEPLOY ─┐</div>
              <div>│  ████████   │ ████   │ ██████  │ ████████ │</div>
              <div>│  Week 1-2   │ Wk 3   │ Wk 4-10 │ Wk 11+   │</div>
              <div>│  SCOPE      │ DESIGN │ CODE    │ SHIP      │</div>
              <div>└─────────────┴────────┴─────────┴──────────┘</div>
              <div className="mt-1 text-[#00FF94]">▶ 100% DELIVERY · 0 BLACK BOXES</div>
            </div>

            {/* Sigma stamp */}
            <div className="sigma-card-reveal sigma-hover-card flex items-center justify-center border border-border/40 p-4" style={{ "--sigma-hover-accent": "#FF4500", transitionDelay: "0.48s", clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" } as React.CSSProperties}>
              <span className="font-sans text-4xl font-black text-[#FF4500]">Σ</span>
              <div className="ml-3">
                <div className="font-sans text-sm font-black uppercase">THE SIGMA VARIABLE</div>
                <div className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground">HOLDING AT 1.0000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
