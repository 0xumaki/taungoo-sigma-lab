"use client";

import * as React from "react";

const INSIGHTS_DATA: { title: string; date: string; tag: string; desc: string; citations: number; readTime: string; sections: { heading: string; body: string }[]; authors: string }[] = [
  {
    title: "Sigma-Variable Orchestration of Multi-Model Agent Loops",
    date: "2024.11.04", tag: "AI", readTime: "12 min", authors: "NEURAL HAND, THE ARCHITECT",
    desc: "We model a research lab as a sigma variable — the unmeasured deviation — and show it stabilizes multi-model agent loops under field drift.",
    citations: 4,
    sections: [
      { heading: "INTRODUCTION", body: "Multi-model AI pipelines compose outputs from different models sequentially. When a model's output distribution shifts, the downstream models receive inputs they weren't designed for. This causes cascading failures: hallucinations, task abandonment, and degraded quality. We propose modeling the 'unmeasured deviation' between expected and actual model outputs as a sigma variable, and compensating for it in real-time." },
      { heading: "THE SIGMA VARIABLE", body: "Define σ = f(expected) - f(actual), where f is the output distribution function. When σ exceeds a threshold, the orchestrator injects a correction signal — either reformatting the input, switching models, or requesting human review. This creates a closed-loop control system analogous to a PID controller in robotics." },
      { heading: "DEPLOYMENT RESULTS", body: "Deployed in the Vortex autonomous sales system (~48,000 LOC, TypeScript). Over 90 days, the sigma-variable compensator reduced hallucination rates by 34% and improved task completion fidelity by 22%. The framework generalizes to any multi-model pipeline using Express, GraphQL, and Redis for real-time signal processing." },
      { heading: "CONCLUSION", body: "Explicit modeling of the sigma variable transforms multi-model orchestration from an open-loop to a closed-loop system. The 34% hallucination reduction demonstrates that compensating for unmeasured deviation is practical, not theoretical." },
    ],
  },
  {
    title: "RWA Tokenization for Agricultural Microgrids",
    date: "2024.07.15", tag: "Web3", readTime: "9 min", authors: "CHAIN WEAVER, EDGE RUNNER",
    desc: "Tokenizing microgrid capacity as on-chain RWA, settling against physical IoT telemetry from a 240-node sensor mesh.",
    citations: 7,
    sections: [
      { heading: "PROBLEM", body: "Agricultural microgrids generate surplus capacity that goes unused. Tokenizing this capacity as RWA would allow peer-to-peer energy trading, but requires reliable physical-world data to settle on-chain claims." },
      { heading: "ARCHITECTURE", body: "Built with Express, GraphQL, and Solidity. The IoT mesh (240 nodes, LoRa+BLE) feeds telemetry to a Redis cache. Smart contracts read from an oracle bridge and settle surplus capacity tokens against physical generation." },
      { heading: "RESULTS", body: "Deployed at the Taungoo tech park with 38 households. Over 60 days, 4.2MWh of surplus capacity was tokenized and traded. The IoT mesh provided 8.1M packets/day with 41ms median latency — sufficient for real-time settlement." },
      { heading: "CONCLUSION", body: "RWA tokenization for microgrids is feasible with existing IoT infrastructure. LoRa mesh networks provide sufficient bandwidth and latency for on-chain settlement without requiring expensive 5G infrastructure." },
    ],
  },
  {
    title: "Local-Language NLP for Low-Resource Myanmar Dialects",
    date: "2024.04.22", tag: "NLP", readTime: "11 min", authors: "SIGNAL TENDER",
    desc: "A tokenizer and adapter stack for Bago-region Myanmar dialects, evaluated on community-authored eval sets.",
    citations: 11,
    sections: [
      { heading: "BACKGROUND", body: "Myanmar has 100+ living languages, but NLP resources exist for fewer than 5. The Bago region dialects are particularly underserved, with no standardized tokenizer, no evaluation benchmarks, and no community-authored datasets." },
      { heading: "APPROACH", body: "Built a phoneme-aware subword tokenizer that handles Bago dialect variations. Combined with a dialect-adapter fine-tuning protocol. Released the first community-authored eval set: 2,400 sentences annotated by native speakers under a CC-BY-SA license." },
      { heading: "EVALUATION", body: "Compared against mBERT baseline on the eval set. The phoneme-aware tokenizer achieved 18% F1 improvement on named entity recognition and 12% improvement on sentiment analysis. The dialect adapter reduced cross-dialect transfer error by 23%." },
      { heading: "IMPACT", body: "The eval set and models are released open-source. 1,800+ learners have used the community NLP tools. The framework is being extended to Karen and Mon languages in collaboration with local community organizations." },
    ],
  },
];

export function AlphaInsights() {
  const [selected, setSelected] = React.useState<number | null>(null);
  const tagColors: Record<string, string> = { AI: "#00FF94", Web3: "#C6FF00", NLP: "#00E5FF" };

  return (
    <section id="insights" className="relative border-t border-border px-3 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 09 / INSIGHTS</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              RESEARCH <span style={{ color: "#FF4500" }}>LOGS.</span>
            </h2>
            <p className="mt-2 font-serif text-base italic text-muted-foreground">Peer-reviewed papers, datasets, and architecture blueprints. Open access.</p>
          </div>
          <div className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            <span className="text-[#FF4500]">3</span> PUBLICATIONS · <span className="text-[#00FF94]">22</span> CITATIONS
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          {INSIGHTS_DATA.map((ins, i) => {
            const color = tagColors[ins.tag] || "#FF4500";
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className="alpha-card-hover group relative flex flex-col border border-border bg-card/30 text-left transition-all hover:border-foreground/40"
                style={{ "--sigma-hover-accent": color, clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" } as React.CSSProperties}
              >
                <div className="h-1 w-full" style={{ background: color }} />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em]" style={{ borderColor: `${color}44`, color }}>{ins.tag}</span>
                    <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
                      <span>{ins.date}</span>
                      <span>·</span>
                      <span>{ins.readTime}</span>
                    </div>
                  </div>
                  <h3 className="mt-3 font-sans text-base font-bold uppercase leading-tight tracking-tight transition-colors group-hover:text-[#FF4500]">{ins.title}</h3>
                  <p className="mt-2 font-serif text-xs italic leading-relaxed text-muted-foreground line-clamp-3">{ins.desc}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                      <span style={{ color }}>{ins.citations}</span> CITATIONS
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-foreground">READ →</span>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 z-0 opacity-10" style={{ background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)" }} />
                <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(60% 50% at 50% 50%, ${color}08, transparent 70%)` }} />
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between border border-border/60 bg-card/30 p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">▸ ALL PUBLICATIONS ARE OPEN ACCESS · CC-BY-SA</div>
          <a href="#contact" className="border border-foreground bg-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80">REQUEST FULL TEXT →</a>
        </div>
      </div>

      {/* Research Log Popup Modal */}
      {selected !== null && INSIGHTS_DATA[selected] && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
          <div
            className="relative z-10 max-h-[85vh] w-full max-w-3xl overflow-y-auto border border-border bg-card"
            style={{ clipPath: "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const ins = INSIGHTS_DATA[selected];
              const color = tagColors[ins.tag] || "#FF4500";
              return (
                <>
                  <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-6 py-3 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <span className="border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em]" style={{ borderColor: `${color}44`, color }}>{ins.tag}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{ins.date} · {ins.readTime}</span>
                    </div>
                    <button onClick={() => setSelected(null)} className="border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-foreground/10">✕ CLOSE</button>
                  </div>
                  <div className="h-1 w-full" style={{ background: color }} />
                  <div className="p-6">
                    <h1 className="font-sans text-2xl font-black uppercase tracking-tight sm:text-3xl">{ins.title}</h1>
                    <p className="mt-3 font-serif text-base italic text-muted-foreground">{ins.desc}</p>
                    <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">▸ AUTHORS: {ins.authors}</div>
                  </div>
                  <div className="px-6 pb-6 space-y-4">
                    {ins.sections.map((s, i) => (
                      <div key={i} className="border-l-2 pl-4" style={{ borderColor: color }}>
                        <h2 className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color }}>▸ {s.heading}</h2>
                        <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/85">{s.body}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border p-4 text-center">
                    <a href="#contact" onClick={() => setSelected(null)} className="inline-block border border-foreground bg-foreground px-6 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80">CONTACT OUR TEAM →</a>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
