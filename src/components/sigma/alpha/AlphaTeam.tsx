const TEAM = [
  { name: "THE ARCHITECT", role: "Lab Director", glyph: "Σ", accent: "#FF4500" },
  { name: "NEURAL HAND", role: "AI Lead", glyph: "◴", accent: "#00E5FF" },
  { name: "CHAIN WEAVER", role: "Web3 Lead", glyph: "⬡", accent: "#C6FF00" },
  { name: "EDGE RUNNER", role: "IoT Engineer", glyph: "⌖", accent: "#FFB300" },
  { name: "QUANTUM SEER", role: "Research Scientist", glyph: "⟁", accent: "#B388FF" },
  { name: "SIGNAL TENDER", role: "Community Lead", glyph: "◍", accent: "#00FF94" },
  { name: "NULL CIPHER", role: "Security", glyph: "⚿", accent: "#FF3D3D" },
  { name: "GHOST PRINTER", role: "Hardware", glyph: "⚙", accent: "#FFEB3B" },
];

export function AlphaTeam() {
  return (
    <section id="team" className="border-t border-border px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">▸ 06 / TEAM</div>
        <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-5xl">
          THE COLLECTIVE.
        </h2>
        
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TEAM.map((m) => (
            <div key={m.name} className="group border border-border p-4 transition-colors hover:border-foreground/40">
              <div className="flex items-center justify-center border border-border/50 p-4">
                <span className="sigma-spin-slow font-sans text-4xl font-black" style={{ color: m.accent }}>{m.glyph}</span>
              </div>
              <h3 className="mt-3 font-sans text-sm font-bold uppercase tracking-tight">{m.name}</h3>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
