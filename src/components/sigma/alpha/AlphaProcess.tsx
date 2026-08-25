"use client";

const STEPS: { num: string; title: string; desc: string; color: string; deliverables: string[]; duration: string }[] = [
  {
    num: "01",
    title: "DISCOVERY",
    desc: "Deep dive into your requirements, constraints, and goals. We define scope, timeline, and success metrics before writing a single line of code.",
    color: "#FF4500",
    deliverables: ["Scope document", "Timeline estimate", "Tech stack proposal", "Risk assessment"],
    duration: "1-2 weeks",
  },
  {
    num: "02",
    title: "ARCHITECTURE",
    desc: "System design, tech stack selection, and infrastructure planning. Architecture diagrams, API contracts, and database schemas — all reviewed and approved before build starts.",
    color: "#00E5FF",
    deliverables: ["Architecture diagrams", "API contracts", "Database schemas", "Infrastructure plan"],
    duration: "1 week",
  },
  {
    num: "03",
    title: "BUILD",
    desc: "Rapid development with CI/CD, automated testing, and daily deployments to staging. You see progress every day, not just at the end.",
    color: "#C6FF00",
    deliverables: ["Daily staging deploys", "Automated tests", "Code reviews", "Progress dashboard"],
    duration: "2-8 weeks",
  },
  {
    num: "04",
    title: "DEPLOY",
    desc: "Production deployment with monitoring, documentation, and handoff. We don't ship and forget — ongoing support and optimization included.",
    color: "#00FF94",
    deliverables: ["Production deployment", "Monitoring setup", "Documentation", "30-day support"],
    duration: "1 week + ongoing",
  },
];

export function AlphaProcess() {
  return (
    <section id="process" className="relative border-t border-border px-6 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header — maximalist */}
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 05 / PROCESS</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              OUR <span style={{ color: "#FF4500" }}>PROCESS.</span>
            </h2>
            <p className="mt-2 font-serif text-base italic text-muted-foreground">
              4 phases. Zero black boxes. Every deliverable documented, every milestone tracked.
            </p>
          </div>
          <div className="hidden shrink-0 space-y-1 text-right font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            <div><span className="text-[#FF4500]">4</span> PHASES</div>
            <div><span className="text-[#00FF94]">16</span> DELIVERABLES</div>
            <div><span className="text-[#00E5FF]">100%</span> TRANSPARENT</div>
          </div>
        </div>

        {/* Process steps — maximalist sci-fi cards */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.num} className="group relative border border-border bg-card/30 transition-all hover:border-foreground/40">
              {/* Top accent bar */}
              <div className="h-1 w-full" style={{ background: s.color }} />

              {/* Card body */}
              <div className="p-4">
                {/* Number + pulse */}
                <div className="flex items-baseline justify-between">
                  <span className="font-sans text-5xl font-black" style={{ color: s.color }}>{s.num}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="sigma-pulse h-1.5 w-1.5" style={{ background: s.color }} />
                    <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">{s.duration}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mt-2 font-sans text-sm font-bold uppercase tracking-tight">{s.title}</h3>

                {/* Description */}
                <p className="mt-1 font-serif text-xs italic leading-relaxed text-muted-foreground">{s.desc}</p>

                {/* Deliverables — sci-fi checklist */}
                <div className="mt-3 border-t border-border/40 pt-2">
                  <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">▸ DELIVERABLES</div>
                  <div className="mt-1 space-y-0.5">
                    {s.deliverables.map((d) => (
                      <div key={d} className="flex items-center gap-1.5">
                        <span style={{ color: s.color }}>✓</span>
                        <span className="font-mono text-[9px] text-foreground/70">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phase progress bar */}
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground">PROGRESS</span>
                  <div className="flex flex-1 gap-0.5">
                    {[1, 2, 3, 4].map((n) => (
                      <span key={n} className="h-1 flex-1" style={{ background: n <= parseInt(s.num) ? s.color : "rgba(255,255,255,0.08)" }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Corner accents */}
              <span className="absolute right-2 top-3 h-2 w-2 border-r border-t opacity-20" style={{ borderColor: s.color }} />
              <span className="absolute bottom-2 left-2 h-2 w-2 border-b border-l opacity-20" style={{ borderColor: s.color }} />

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(60% 50% at 50% 50%, ${s.color}08, transparent 70%)` }} />
            </div>
          ))}
        </div>

        {/* Timeline bar — maximalist */}
        <div className="mt-6 flex items-center gap-2 border border-border/40 bg-card/20 p-3">
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#FF4500]">DISCOVERY</span>
          <div className="flex-1 border-t border-dashed border-border/40" />
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#00E5FF]">ARCHITECTURE</span>
          <div className="flex-1 border-t border-dashed border-border/40" />
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#C6FF00]">BUILD</span>
          <div className="flex-1 border-t border-dashed border-border/40" />
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#00FF94]">DEPLOY ✓</span>
        </div>

        {/* Stats bar */}
        <div className="mt-3 grid grid-cols-2 gap-px border border-border/40 bg-border/40 sm:grid-cols-4">
          {[
            ["4-11", "WEEKS TYPICAL", "#FF4500"],
            ["16", "DELIVERABLES", "#00E5FF"],
            ["100%", "TRANSPARENCY", "#C6FF00"],
            ["30D", "SUPPORT INCLUDED", "#00FF94"],
          ].map(([v, k, c]) => (
            <div key={k} className="bg-card/40 p-3">
              <div className="font-sans text-xl font-black" style={{ color: c }}>{v}</div>
              <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">{k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
