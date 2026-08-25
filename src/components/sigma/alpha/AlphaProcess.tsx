const STEPS = [
  { num: "01", title: "DISCOVERY", desc: "Deep dive into your requirements, constraints, and goals. We define scope, timeline, and success metrics before writing a single line of code." },
  { num: "02", title: "ARCHITECTURE", desc: "System design, tech stack selection, and infrastructure planning. Architecture diagrams, API contracts, and database schemas — all reviewed and approved before build starts." },
  { num: "03", title: "BUILD", desc: "Rapid development with CI/CD, automated testing, and daily deployments to staging. You see progress every day, not just at the end." },
  { num: "04", title: "DEPLOY", desc: "Production deployment with monitoring, documentation, and handoff. We don't ship and forget — ongoing support and optimization included." },
];

export function AlphaProcess() {
  return (
    <section id="process" className="border-t border-border px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">▸ 05 / PROCESS</div>
        <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-5xl">
          OUR PROCESS.
        </h2>
        
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.num} className="border border-border p-4">
              <span className="font-sans text-5xl font-black text-foreground/20">{s.num}</span>
              <h3 className="mt-2 font-sans text-sm font-bold uppercase tracking-tight">{s.title}</h3>
              <p className="mt-1 font-serif text-xs italic text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
