"use client";

import { SciFiCard } from "./SciFiCard";

const capabilityData: { label: string; pct: number; color: string }[] = [
  { label: "AI / MACHINE LEARNING", pct: 95, color: "#00FF94" },
  { label: "WEB3 / BLOCKCHAIN", pct: 88, color: "#C6FF00" },
  { label: "FULL-STACK DEVELOPMENT", pct: 92, color: "#00E5FF" },
  { label: "DESIGN / UX", pct: 80, color: "#FF2D7E" },
  { label: "AUTOMATION / N8N", pct: 90, color: "#FFB300" },
];

const statData: { v: string; k: string; c: string }[] = [
  { v: "27", k: "SERVICES", c: "#FF4500" },
  { v: "10", k: "PROJECTS", c: "#00FF94" },
  { v: "8", k: "OPERATORS", c: "#00E5FF" },
  { v: "11", k: "SECTORS", c: "#C6FF00" },
];

export function AlphaAbout() {
  return (
    <section id="about" className="relative border-t border-border px-3 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 02 / ABOUT</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              ENGINEERING THE<br />
              <span style={{ color: "#FF4500" }}>FUTURE</span>, TODAY.
            </h2>
          </div>
          <div className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            EST. 2016<br />YANGON, MM
          </div>
        </div>

        {/* Main grid — mission card spans full width on top, stats below */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
          {/* Left: Mission — full height, properly fitted */}
          <SciFiCard className="alpha-card-hover" accent="#FF4500" label="▸ MISSION" id="TSL-001" style={{ "--sigma-hover-accent": "#FF4500" } as React.CSSProperties}>
            <div className="flex h-full flex-col p-5">
              {/* Mission statement — large, readable */}
              <p className="font-serif text-xl italic leading-relaxed text-foreground/90 sm:text-2xl">
                We're a full-stack development lab building AI automation, agent swarms, and Web3 infrastructure for consumer and enterprise clients.
              </p>
              <p className="mt-4 font-serif text-base italic leading-relaxed text-muted-foreground sm:text-lg">
                From multi-model AI agents that handle real workloads, to DeFi protocols that settle on mainnet — every system we build ships to production. No black boxes. No vaporware.
              </p>

              {/* Approach items — 2x2 grid */}
              <div className="mt-6 grid grid-cols-2 gap-2">
                {[
                  { icon: "◐", text: "Production-first", desc: "No demos, no MVPs", color: "#00FF94" },
                  { icon: "⬡", text: "Multi-model AI", desc: "7+ model families", color: "#00E5FF" },
                  { icon: "▤", text: "Documented", desc: "Every commit logged", color: "#C6FF00" },
                  { icon: "⚙", text: "Supported", desc: "30-day support incl.", color: "#FFB300" },
                ].map((item) => (
                  <div key={item.text} className="group relative border border-border/40 p-3 transition-colors hover:border-foreground/30">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-lg" style={{ color: item.color }}>{item.icon}</span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-foreground">{item.text}</span>
                    </div>
                    <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">{item.desc}</div>
                    {/* Accent left strip */}
                    <div className="absolute left-0 top-0 h-full w-0.5 opacity-30 transition-opacity group-hover:opacity-100" style={{ background: item.color }} />
                  </div>
                ))}
              </div>

              {/* Bottom data strip */}
              <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-3 font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>▸ OPERATING SINCE 2016</span>
                <span style={{ color: "#FF4500" }}>▮ SIGMA = 1.0000</span>
                <span className="hidden sm:inline">▸ YANGON, MM</span>
              </div>
            </div>
          </SciFiCard>

          {/* Right: Stats + Sigma stacked */}
          <div className="flex flex-col gap-4">
            <SciFiCard accent="#00FF94" label="▸ STATS" id="LAB.v2" className="alpha-card-hover flex-1" style={{ "--sigma-hover-accent": "#00FF94" } as React.CSSProperties}>
              <div className="flex h-full flex-col p-4">
                <div className="grid flex-1 grid-cols-2 gap-2">
                  {statData.map((s) => (
                    <div key={s.k} className="flex flex-col items-center justify-center border border-border/40 p-3">
                      <div className="font-sans text-3xl font-black" style={{ color: s.c }}>{s.v}</div>
                      <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">{s.k}</div>
                    </div>
                  ))}
                </div>
                {/* Bottom accent bar */}
                <div className="mt-3 flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground">
                  <span>▸ ALL LIVE</span>
                  <span style={{ color: "#00FF94" }}>▮ NOMINAL</span>
                </div>
              </div>
            </SciFiCard>

            <SciFiCard accent="#00E5FF" label="▸ SIGMA" id="1.0000" className="alpha-card-hover" style={{ "--sigma-hover-accent": "#00E5FF" } as React.CSSProperties}>
              <div className="flex items-center justify-center p-4">
                <span className="sigma-spin-slow mr-3 font-sans text-4xl font-black text-[#FF4500]">Σ</span>
                <div>
                  <div className="font-sans text-lg font-black uppercase">THE SIGMA VARIABLE</div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">HOLDING AT 1.0000</div>
                </div>
              </div>
            </SciFiCard>
          </div>
        </div>

        {/* Bottom: Capability cards — wider, better spaced */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {capabilityData.map((cap) => (
            <SciFiCard key={cap.label} accent={cap.color} label={cap.label} id={`${cap.pct}%`} className="alpha-card-hover" style={{ "--sigma-hover-accent": cap.color } as React.CSSProperties}>
              <div className="p-3">
                {/* Visual: large percentage with accent color */}
                <div className="font-sans text-3xl font-black" style={{ color: cap.color }}>{cap.pct}%</div>
                {/* Hazard-style fill bar */}
                <div className="mt-2 h-3 w-full bg-foreground/5">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${cap.pct}%`,
                      background: `repeating-linear-gradient(45deg, ${cap.color} 0, ${cap.color} 4px, ${cap.color}88 4px, ${cap.color}88 8px)`,
                    }}
                  />
                </div>
                {/* Label */}
                <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground">{cap.label}</div>
              </div>
            </SciFiCard>
          ))}
        </div>
      </div>
    </section>
  );
}
