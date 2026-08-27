"use client";

import * as React from "react";
import { SciFiCard } from "./SciFiCard";

const TEAM: { name: string; realName: string; role: string; glyph: string; accent: string; skills: string[] }[] = [
  { name: "THE ARCHITECT", realName: "Aung Min", role: "Lab Director", glyph: "Σ", accent: "#FF4500", skills: ["Strategy", "Architecture", "Partnerships"] },
  { name: "NEURAL HAND", realName: "Su Mon", role: "AI Lead", glyph: "◴", accent: "#00E5FF", skills: ["LLM Orchestration", "Voice AI", "Agent Loops"] },
  { name: "CHAIN WEAVER", realName: "Thet Aung", role: "Web3 Lead", glyph: "⬡", accent: "#C6FF00", skills: ["Solidity", "DeFi", "DAO"] },
  { name: "EDGE RUNNER", realName: "Kyaw Zin", role: "IoT Engineer", glyph: "⌖", accent: "#FFB300", skills: ["LoRa Mesh", "Microgrids", "Sensors"] },
  { name: "QUANTUM SEER", realName: "Nan Khin", role: "Research", glyph: "⟁", accent: "#B388FF", skills: ["Optimization", "Simulation", "Routing"] },
  { name: "SIGNAL TENDER", realName: "Hsu Hsu", role: "Community", glyph: "◍", accent: "#00FF94", skills: ["NLP", "Literacy", "Open Data"] },
  { name: "NULL CIPHER", realName: "Lin Htet", role: "Security", glyph: "⚿", accent: "#FF3D3D", skills: ["Audits", "Pen Test", "Crypto"] },
  { name: "GHOST PRINTER", realName: "Zaw Ye", role: "Hardware", glyph: "⚙", accent: "#FFEB3B", skills: ["PCB", "Oscilloscope", "Rework"] },
];

export function AlphaTeam() {
  return (
    <section id="team" className="relative border-t border-border px-3 py-12 sm:px-6 sm:py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 06 / TEAM</div>
            <h2 className="mt-2 font-sans text-3xl font-black uppercase leading-tight tracking-tight sm:text-5xl md:text-6xl">
              THE <span style={{ color: "#FF4500" }}>COLLECTIVE.</span>
            </h2>
            <p className="mt-2 font-serif text-sm italic text-muted-foreground sm:text-base">8 operators. Zero egos. Deep expertise, handles instead of titles. Code that ships.</p>
          </div>
          <div className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block sm:text-[9px]">
            <span className="text-[#FF4500]">8</span> OPERATORS · <span className="text-[#00FF94]">0</span> EGOS
          </div>
        </div>

        {/* Team grid — SciFiCard dossier style */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-4">
          {TEAM.map((m, i) => (
            <SciFiCard key={m.name} accent={m.accent} label={`OP·${String(i + 1).padStart(2, "0")}`} id={m.role} className="alpha-card-hover" style={{ "--sigma-hover-accent": m.accent } as React.CSSProperties}>
              <div className="p-3">
                {/* Glyph in cut-corner box with background glow + hazard */}
                <div className="relative mb-3 overflow-hidden border border-border/50">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-15"
                    style={{ background: m.accent }}
                  />
                  {/* Hazard stripe corner */}
                  <div
                    className="absolute right-0 top-0 h-6 w-6"
                    style={{
                      background: `repeating-linear-gradient(45deg, ${m.accent} 0, ${m.accent} 2px, transparent 2px, transparent 4px)`,
                    }}
                  />
                  <div className="flex items-center justify-center p-3 sm:p-4">
                    <span
                      className="sigma-spin-slow font-sans text-3xl font-black transition-transform group-hover:scale-110 sm:text-5xl"
                      style={{ color: m.accent }}
                    >
                      {m.glyph}
                    </span>
                  </div>
                  {/* Scanlines on glyph */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-30"
                    style={{
                      background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)",
                    }}
                  />
                </div>

                {/* Name + real identity + role */}
                <h3 className="font-sans text-xs font-bold uppercase tracking-tight sm:text-sm">{m.name}</h3>
                {/* Real identity — italic serif subtitle flanked by accent rules */}
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="h-px w-2" style={{ background: m.accent, opacity: 0.5 }} />
                  <span className="font-serif text-[10px] italic leading-none tracking-wide sm:text-[11px]" style={{ color: m.accent }}>
                    {m.realName}
                  </span>
                  <span className="h-px flex-1" style={{ background: m.accent, opacity: 0.5 }} />
                </div>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] sm:text-[9px]" style={{ color: m.accent }}>{m.role}</p>

                {/* Skills — as hazard-styled tags */}
                <div className="mt-2 flex flex-wrap gap-0.5">
                  {m.skills.map((s) => (
                    <span
                      key={s}
                      className="border px-1 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] sm:text-[7px]"
                      style={{ borderColor: `${m.accent}33`, color: m.accent }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </SciFiCard>
          ))}
        </div>

        {/* Bottom: collective stats — SciFiCard row */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-4">
          {[
            { v: "8/8", k: "ACTIVE NODES", c: "#00FF94", icon: "◉" },
            { v: "3", k: "TIME ZONES", c: "#00E5FF", icon: "◐" },
            { v: "27", k: "SERVICES", c: "#FF4500", icon: "⚙" },
            { v: "100%", k: "NO EGOS", c: "#C6FF00", icon: "✦" },
          ].map((s, i) => (
            <SciFiCard key={s.k} accent={s.c} label={s.k} id={s.v} className="alpha-card-hover" style={{ "--sigma-hover-accent": s.c } as React.CSSProperties}>
              <div className="flex items-center justify-center gap-3 p-3">
                <span className="font-sans text-xl sm:text-2xl" style={{ color: s.c }}>{s.icon}</span>
                <div>
                  <div className="font-sans text-lg font-black sm:text-xl" style={{ color: s.c }}>{s.v}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[7px]">{s.k}</div>
                </div>
              </div>
            </SciFiCard>
          ))}
        </div>
      </div>
    </section>
  );
}
