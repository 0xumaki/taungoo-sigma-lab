"use client";

import { SciFiCard } from "./SciFiCard";

const STEPS: { num: string; title: string; desc: string; color: string; deliverables: string[]; duration: string }[] = [
  {
    num: "01", title: "DISCOVERY", color: "#FF4500", duration: "1-2 weeks",
    desc: "Deep dive into requirements, constraints, and goals. We define scope, timeline, and success metrics before writing a single line of code.",
    deliverables: ["Scope document", "Timeline estimate", "Tech stack proposal", "Risk assessment"],
  },
  {
    num: "02", title: "ARCHITECTURE", color: "#00E5FF", duration: "1 week",
    desc: "System design, tech stack selection, and infrastructure planning. Architecture diagrams, API contracts, and database schemas — reviewed before build.",
    deliverables: ["Architecture diagrams", "API contracts", "Database schemas", "Infrastructure plan"],
  },
  {
    num: "03", title: "BUILD", color: "#C6FF00", duration: "2-8 weeks",
    desc: "Rapid development with CI/CD, automated testing, and daily deployments to staging. You see progress every day, not just at the end.",
    deliverables: ["Daily staging deploys", "Automated tests", "Code reviews", "Progress dashboard"],
  },
  {
    num: "04", title: "DEPLOY", color: "#00FF94", duration: "1 week +",
    desc: "Production deployment with monitoring, documentation, and handoff. We don't ship and forget — ongoing support and optimization included.",
    deliverables: ["Production deployment", "Monitoring setup", "Documentation", "30-day support"],
  },
];

export function AlphaProcess() {
  return (
    <section id="process" className="relative border-t border-border px-6 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl">
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

        {/* Process steps — SciFiCard with maximalist visuals */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <SciFiCard key={s.num} accent={s.color} label={`PHASE ${s.num}`} id={s.duration}>
              <div className="p-4">
                {/* Large number with glitch */}
                <div className="flex items-baseline justify-between">
                  <span
                    className="sigma-glitch font-sans text-6xl font-black leading-none"
                    data-text={s.num}
                    style={{ color: s.color }}
                  >
                    {s.num}
                  </span>
                  {/* Hazard stripe block */}
                  <div
                    className="h-8 w-8"
                    style={{
                      background: `repeating-linear-gradient(45deg, ${s.color} 0, ${s.color} 3px, transparent 3px, transparent 6px)`,
                    }}
                  />
                </div>

                {/* Title */}
                <h3 className="mt-2 font-sans text-sm font-bold uppercase tracking-tight">{s.title}</h3>

                {/* Description */}
                <p className="mt-1 font-serif text-xs italic leading-relaxed text-muted-foreground">{s.desc}</p>

                {/* Deliverables — sci-fi checklist */}
                <div className="mt-3 border-t border-border/40 pt-2">
                  <div className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground">▸ DELIVERABLES</div>
                  <div className="mt-1 space-y-0.5">
                    {s.deliverables.map((d) => (
                      <div key={d} className="flex items-center gap-1.5">
                        <span style={{ color: s.color }}>▸</span>
                        <span className="font-mono text-[9px] text-foreground/70">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SciFiCard>
          ))}
        </div>

        {/* Timeline — maximalist with hazard connectors */}
        <div className="mt-4 flex items-center gap-1 border border-border/40 bg-card/20 p-3">
          {STEPS.map((s, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2"
                  style={{ background: s.color }}
                />
                <span className="font-mono text-[8px] uppercase tracking-[0.16em]" style={{ color: s.color }}>{s.title}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 border-t-2 border-dashed"
                  style={{ borderColor: `${s.color}44` }}
                />
              )}
            </React.Fragment>
          ))}
          <span className="ml-2 font-mono text-[8px] uppercase tracking-[0.16em] text-[#00FF94]">✓ SHIPPED</span>
        </div>
      </div>
    </section>
  );
}

// Need React import for Fragment
import * as React from "react";
