"use client";

const STEPS: [string, string, string, string][] = [
  ["01", "DISCOVERY", "Deep dive into your requirements, constraints, and goals. We define scope, timeline, and success metrics before writing a single line of code.", "#FF4500"],
  ["02", "ARCHITECTURE", "System design, tech stack selection, and infrastructure planning. Architecture diagrams, API contracts, and database schemas — all reviewed and approved before build starts.", "#00E5FF"],
  ["03", "BUILD", "Rapid development with CI/CD, automated testing, and daily deployments to staging. You see progress every day, not just at the end.", "#C6FF00"],
  ["04", "DEPLOY", "Production deployment with monitoring, documentation, and handoff. We don't ship and forget — ongoing support and optimization included.", "#00FF94"],
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
          </div>
          <div className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            4 PHASES<br />ZERO BLACK BOXES
          </div>
        </div>

        {/* Process steps — maximalist timeline */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([num, title, desc, color]) => (
            <div key={num} className="group relative border border-border bg-card/30 p-4 transition-all hover:border-foreground/40">
              {/* Accent strip */}
              <div className="absolute left-0 top-0 h-full w-0.5" style={{ background: color }} />

              {/* Number */}
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-5xl font-black" style={{ color }}>{num}</span>
                <span className="sigma-pulse h-1.5 w-1.5" style={{ background: color }} />
              </div>

              {/* Title */}
              <h3 className="mt-2 font-sans text-sm font-bold uppercase tracking-tight">{title}</h3>

              {/* Description */}
              <p className="mt-1 font-serif text-xs italic leading-relaxed text-muted-foreground">{desc}</p>

              {/* Phase indicator */}
              <div className="mt-3 flex items-center gap-1.5">
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">PHASE</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4].map((n) => (
                    <span
                      key={n}
                      className="h-1 w-3"
                      style={{ background: n <= parseInt(num) ? color : "rgba(255,255,255,0.1)" }}
                    />
                  ))}
                </div>
              </div>

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(60% 50% at 50% 50%, ${color}10, transparent 70%)` }} />
            </div>
          ))}
        </div>

        {/* Timeline bar */}
        <div className="mt-6 flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">DISCOVERY</span>
          <div className="flex-1 border-t border-dashed border-border/40" />
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">ARCHITECTURE</span>
          <div className="flex-1 border-t border-dashed border-border/40" />
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">BUILD</span>
          <div className="flex-1 border-t border-dashed border-border/40" />
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#00FF94]">DEPLOY ✓</span>
        </div>
      </div>
    </section>
  );
}
