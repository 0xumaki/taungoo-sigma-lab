"use client";

const TEAM: { name: string; role: string; glyph: string; accent: string; sig: string; skills: string[] }[] = [
  { name: "THE ARCHITECT", role: "Lab Director", glyph: "Σ", accent: "#FF4500", sig: "0.99", skills: ["Strategy", "Architecture", "Partnerships"] },
  { name: "NEURAL HAND", role: "AI Lead", glyph: "◴", accent: "#00E5FF", sig: "0.94", skills: ["LLM Orchestration", "Voice AI", "Agent Loops"] },
  { name: "CHAIN WEAVER", role: "Web3 Lead", glyph: "⬡", accent: "#C6FF00", sig: "0.91", skills: ["Solidity", "DeFi", "DAO"] },
  { name: "EDGE RUNNER", role: "IoT Engineer", glyph: "⌖", accent: "#FFB300", sig: "0.88", skills: ["LoRa Mesh", "Microgrids", "Sensors"] },
  { name: "QUANTUM SEER", role: "Research", glyph: "⟁", accent: "#B388FF", sig: "0.86", skills: ["Optimization", "Simulation", "Routing"] },
  { name: "SIGNAL TENDER", role: "Community", glyph: "◍", accent: "#00FF94", sig: "0.93", skills: ["NLP", "Literacy", "Open Data"] },
  { name: "NULL CIPHER", role: "Security", glyph: "⚿", accent: "#FF3D3D", sig: "0.97", skills: ["Audits", "Pen Test", "Crypto"] },
  { name: "GHOST PRINTER", role: "Hardware", glyph: "⚙", accent: "#FFEB3B", sig: "0.82", skills: ["PCB", "Oscilloscope", "Rework"] },
];

export function AlphaTeam() {
  return (
    <section id="team" className="relative border-t border-border px-6 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 06 / TEAM</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              THE <span style={{ color: "#FF4500" }}>COLLECTIVE.</span>
            </h2>
            <p className="mt-2 font-serif text-base italic text-muted-foreground">
              8 operators. No egos. Each with deep expertise and a handle, not a title.
            </p>
          </div>
          <div className="hidden shrink-0 space-y-1 text-right font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            <div><span className="text-[#FF4500]">8</span> OPERATORS</div>
            <div><span className="text-[#00FF94]">0.91</span> MEAN SIG</div>
            <div><span className="text-[#00E5FF]">3</span> TIME ZONES</div>
          </div>
        </div>

        {/* Team grid — sci-fi dossier cards */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TEAM.map((m) => (
            <div key={m.name} className="group relative border border-border bg-card/30 transition-all hover:border-foreground/40">
              {/* Top accent bar */}
              <div className="h-1 w-full" style={{ background: m.accent }} />

              {/* Card body */}
              <div className="p-3">
                {/* Glyph in bordered box with glow */}
                <div className="relative mb-3 flex items-center justify-center border border-border/50 p-4">
                  <div className="pointer-events-none absolute inset-0 opacity-15" style={{ background: m.accent }} />
                  <span className="sigma-spin-slow font-sans text-4xl font-black transition-transform group-hover:scale-110" style={{ color: m.accent }}>{m.glyph}</span>
                  {/* Corner accents */}
                  <span className="absolute left-0 top-0 h-2 w-2 border-l border-t" style={{ borderColor: m.accent }} />
                  <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b" style={{ borderColor: m.accent }} />
                </div>

                {/* Name + role */}
                <h3 className="font-sans text-sm font-bold uppercase tracking-tight">{m.name}</h3>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: m.accent }}>{m.role}</p>

                {/* Sigma meter */}
                <div className="mt-2">
                  <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.14em]">
                    <span className="text-muted-foreground">SIG</span>
                    <span style={{ color: m.accent }}>{m.sig}</span>
                  </div>
                  <div className="mt-0.5 h-1 w-full bg-foreground/10">
                    <div className="h-full" style={{ width: `${parseFloat(m.sig) * 100}%`, background: m.accent }} />
                  </div>
                </div>

                {/* Skills */}
                <div className="mt-2 flex flex-wrap gap-0.5">
                  {m.skills.map((s) => (
                    <span key={s} className="border border-border/40 px-1 py-0.5 font-mono text-[7px] uppercase tracking-[0.12em] text-muted-foreground">{s}</span>
                  ))}
                </div>
              </div>

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(60% 50% at 50% 50%, ${m.accent}08, transparent 70%)` }} />
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-6 grid grid-cols-2 gap-px border border-border/40 bg-border/40 sm:grid-cols-4">
          {[
            ["8/8", "ACTIVE NODES", "#00FF94"],
            ["0.91", "MEAN SIGMA", "#FF4500"],
            ["3", "TIME ZONES", "#00E5FF"],
            ["100%", "NO EGOS", "#C6FF00"],
          ].map(([v, k, c]) => (
            <div key={k} className="bg-card/40 p-3 text-center">
              <div className="font-sans text-xl font-black" style={{ color: c }}>{v}</div>
              <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">{k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
