"use client";

import * as React from "react";

const STEPS: { num: string; title: string; desc: string; color: string; deliverables: string[]; duration: string }[] = [
  { num: "01", title: "DISCOVERY", color: "#FF4500", duration: "1-2 weeks", desc: "Deep dive into requirements, constraints, and goals. We define scope, timeline, and success metrics.", deliverables: ["Scope document", "Timeline estimate", "Tech stack proposal", "Risk assessment"] },
  { num: "02", title: "ARCHITECTURE", color: "#00E5FF", duration: "1 week", desc: "System design, tech stack selection, and infrastructure planning. Architecture diagrams, API contracts, database schemas.", deliverables: ["Architecture diagrams", "API contracts", "Database schemas", "Infrastructure plan"] },
  { num: "03", title: "BUILD", color: "#C6FF00", duration: "2-8 weeks", desc: "Rapid development with CI/CD, automated testing, and daily deployments to staging. You see progress every day.", deliverables: ["Daily staging deploys", "Automated tests", "Code reviews", "Progress dashboard"] },
  { num: "04", title: "DEPLOY", color: "#00FF94", duration: "1 week +", desc: "Production deployment with monitoring, documentation, and handoff. We don't ship and forget.", deliverables: ["Production deployment", "Monitoring setup", "Documentation", "30-day support"] },
];

export function AlphaProcess() {
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

        {/* Horizontal sci-fi process cards — different design from S3 */}
        <div className="mt-8 space-y-3">
          {STEPS.map((s, idx) => (
            <div
              key={s.num}
              className="group relative flex border border-border bg-card/30 transition-all hover:border-foreground/40"
              style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}
            >
              {/* Left: Large number + accent block */}
              <div className="relative flex w-28 shrink-0 flex-col items-center justify-center border-r border-border/40" style={{ background: `linear-gradient(135deg, ${s.color}15, transparent)` }}>
                <span className="sigma-glitch font-sans text-5xl font-black leading-none" data-text={s.num} style={{ color: s.color }}>{s.num}</span>
                <span className="mt-1 font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground">{s.duration}</span>
                {/* Hazard stripe bottom */}
                <div className="absolute bottom-0 left-0 h-1 w-full" style={{ background: `repeating-linear-gradient(45deg, ${s.color} 0, ${s.color} 3px, transparent 3px, transparent 6px)` }} />
              </div>

              {/* Middle: Title + description */}
              <div className="flex-1 p-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-sans text-lg font-bold uppercase tracking-tight">{s.title}</h3>
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em]" style={{ color: s.color }}>PHASE {s.num}</span>
                </div>
                <p className="mt-1 font-serif text-sm italic text-muted-foreground">{s.desc}</p>

                {/* Deliverables — inline tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {s.deliverables.map((d) => (
                    <span key={d} className="border px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground" style={{ borderColor: `${s.color}33` }}>
                      <span style={{ color: s.color }}>▸</span> {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Phase connector + scanlines */}
              <div className="hidden w-12 shrink-0 items-center justify-center border-l border-border/40 sm:flex">
                {idx < STEPS.length - 1 ? (
                  <span className="font-mono text-2xl text-muted-foreground/30">↓</span>
                ) : (
                  <span className="font-mono text-2xl" style={{ color: s.color }}>✓</span>
                )}
              </div>

              {/* Scanlines */}
              <div className="pointer-events-none absolute inset-0 z-0 opacity-10" style={{ background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)" }} />
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(60% 50% at 50% 50%, ${s.color}08, transparent 70%)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
