const INSIGHTS = [
  { title: "Sigma-Variable Orchestration of Multi-Model Agent Loops", date: "2024.11.04", tag: "AI" },
  { title: "RWA Tokenization for Agricultural Microgrids", date: "2024.07.15", tag: "Web3" },
  { title: "Local-Language NLP for Low-Resource Myanmar Dialects", date: "2024.04.22", tag: "NLP" },
];

export function AlphaInsights() {
  return (
    <section id="insights" className="border-t border-border px-6 py-20">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">▸ 09 / INSIGHTS</div>
        <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-5xl">
          RESEARCH LOGS.
        </h2>
        
        <div className="mt-8 divide-y divide-border">
          {INSIGHTS.map((i) => (
              <div key={i.title} className="flex items-center gap-4 py-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#00FF94]">{i.tag}</span>
                <span className="flex-1 font-sans text-base font-bold uppercase tracking-tight">{i.title}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{i.date}</span>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
}
