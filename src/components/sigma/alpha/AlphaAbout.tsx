"use client";

import { SciFiCard } from "./SciFiCard";
import { useCardReveal } from "@/lib/sigma/use-card-reveal";

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
  const cardsRef = useCardReveal<HTMLDivElement>({ stagger: true });
  return (
    <section id="about" className="relative border-t border-border px-3 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div ref={cardsRef} className="relative z-10 mx-auto w-full max-w-[1600px]">
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
            EST. 2024<br />TAUNGOO, MM
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Left: Mission — SciFiCard */}
          <SciFiCard className="sigma-card-reveal sigma-hover-card lg:col-span-2" accent="#FF4500" label="▸ MISSION" id="TSL-001" style={{ "--sigma-hover-accent": "#FF4500" } as React.CSSProperties}>
            <div className="p-4">
              <p className="font-serif text-xl italic leading-relaxed text-foreground/90">
                We're a full-stack development lab building AI automation, agent swarms, and Web3 infrastructure for consumer and enterprise clients.
              </p>
              <p className="mt-4 font-serif text-base italic leading-relaxed text-muted-foreground">
                From multi-model AI agents that handle real workloads, to DeFi protocols that settle on mainnet — every system we build ships to production. No black boxes. No vaporware.
              </p>

              {/* Approach items — maximalist with icons */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  { icon: "◐", text: "Production-first", color: "#00FF94" },
                  { icon: "⬡", text: "Multi-model AI", color: "#00E5FF" },
                  { icon: "▤", text: "Documented", color: "#C6FF00" },
                  { icon: "⚙", text: "Supported", color: "#FFB300" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 border border-border/40 p-2">
                    <span className="font-sans text-lg" style={{ color: item.color }}>{item.icon}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/80">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </SciFiCard>

          {/* Right: Stat cards — SciFiCard */}
          <div className="space-y-4">
            <SciFiCard accent="#00FF94" label="▸ STATS" id="LAB.v2" className="sigma-card-reveal sigma-hover-card" style={{ "--sigma-hover-accent": "#00FF94", transitionDelay: "0.08s" } as React.CSSProperties}>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-2">
                  {statData.map((s) => (
                    <div key={s.k} className="border border-border/40 p-2 text-center">
                      <div className="font-sans text-2xl font-black" style={{ color: s.c }}>{s.v}</div>
                      <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">{s.k}</div>
                    </div>
                  ))}
                </div>
              </div>
            </SciFiCard>

            <SciFiCard accent="#00E5FF" label="▸ SIGMA" id="1.0000" className="sigma-card-reveal sigma-hover-card" style={{ "--sigma-hover-accent": "#00E5FF", transitionDelay: "0.16s" } as React.CSSProperties}>
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

        {/* Bottom: Capability cards — SciFiCard row */}
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {capabilityData.map((cap, i) => (
            <SciFiCard key={cap.label} accent={cap.color} label={cap.label} id={`${cap.pct}%`} className="sigma-card-reveal sigma-hover-card" style={{ "--sigma-hover-accent": cap.color, transitionDelay: `${(i + 3) * 0.08}s` } as React.CSSProperties}>
              <div className="p-3">
                {/* Visual: large percentage with accent color */}
                <div className="font-sans text-3xl font-black" style={{ color: cap.color }}>{cap.pct}%</div>
                {/* Hazard-style fill bar */}
                <div className="mt-2 h-3 w-full bg-foreground/5">
                  <div
                    className="h-full"
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
