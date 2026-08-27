"use client";

import * as React from "react";

/**
 * ProfileAvatar — SCP Foundation × ClassifiedCover hybrid.
 * Retro brutalist terminal screen with the person's accent color.
 * Features: scanlines, glitch warning icon, "SUBJECT CLASSIFIED" text,
 * redaction bars, containment status, blinking cursor.
 * Each avatar uses the person's accent color instead of green.
 */
function ProfileAvatar({
  color,
  name,
  role,
}: {
  color: string;
  name: string;
  role: string;
}) {
  // Initials = first letter of name + first letter of role
  const initials = React.useMemo(() => {
    const n = (name || "").trim()[0] || "?";
    const r = (role || "").trim()[0] || "?";
    return (n + r).toUpperCase();
  }, [name, role]);

  // Darken the accent color for background (mix with black)
  const darkBg = color + "15"; // very transparent accent

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden bg-black p-3"
      aria-label={`Subject: ${name}, ${role}`}
    >
      {/* Scanlines in accent color */}
      <div
        className="sigma-scanlines pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `repeating-linear-gradient(0deg, transparent 0px, transparent 2px, ${color}08 3px, ${color}08 4px)`,
        }}
        aria-hidden
      />

      {/* Accent glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, ${color}12, transparent 70%)`,
        }}
        aria-hidden
      />

      {/* ASCII-art border frame (double border like SCP documents) */}
      <div
        className="pointer-events-none absolute inset-2 border"
        style={{ borderColor: `${color}30` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-3 border"
        style={{ borderColor: `${color}15` }}
        aria-hidden
      />

      {/* Top status bar — SCP-style containment header */}
      <div
        className="absolute left-0 right-0 top-0 flex items-center justify-between border-b px-2 py-1 font-mono text-[7px] uppercase tracking-[0.2em] sm:text-[8px]"
        style={{ borderColor: `${color}25`, color: `${color}aa`, background: `${color}08` }}
      >
        <span>SCP-TSL</span>
        <span className="flex items-center gap-1">
          <span className="sigma-pulse h-1 w-1" style={{ background: color }} />
          CONTAINED
        </span>
      </div>

      {/* Glitch warning icon */}
      <div
        className="sigma-glitch font-mono text-2xl sm:text-3xl"
        style={{ color, textShadow: `0 0 12px ${color}60` }}
        data-text="⚠"
      >
        ⚠
      </div>

      {/* "SUBJECT CLASSIFIED" — SCP-style */}
      <div
        className="sigma-glitch font-mono text-[9px] font-bold uppercase tracking-[0.25em] sm:text-[11px]"
        style={{ color, textShadow: `0 0 8px ${color}50` }}
        data-text="SUBJECT CLASSIFIED"
      >
        SUBJECT CLASSIFIED
      </div>

      {/* Redaction bar over the "name" */}
      <div className="flex flex-col items-center gap-0.5">
        <div
          className="h-3 w-20"
          style={{ background: `${color}40` }}
        />
        <div
          className="h-3 w-14"
          style={{ background: `${color}30` }}
        />
      </div>

      {/* Subject ID with initials */}
      <div
        className="font-mono text-[8px] uppercase tracking-[0.2em] sm:text-[9px]"
        style={{ color: `${color}cc` }}
      >
        ID: {initials}-{Math.abs(initials.charCodeAt(0) * 7 % 9999)}
      </div>

      {/* Blinking cursor subtitle */}
      <div
        className="font-mono text-[8px] uppercase tracking-[0.2em] sm:text-[9px]"
        style={{ color: `${color}88` }}
      >
        CLEARANCE REQ <span className="sigma-blink">▮</span>
      </div>

      {/* Bottom telemetry strip — SCP-style */}
      <div
        className="absolute bottom-2 left-0 right-0 flex items-center justify-between px-2 font-mono text-[6px] uppercase tracking-[0.18em] sm:text-[7px]"
        style={{ color: `${color}50` }}
      >
        <span>OBJ CLASS: SAFE</span>
        <span>LVL-{Math.abs(initials.charCodeAt(1) * 3 % 5) + 1}</span>
      </div>

      {/* Hazard stripe bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5"
        style={{
          background: `repeating-linear-gradient(45deg, ${color} 0, ${color} 4px, transparent 4px, transparent 8px)`,
        }}
        aria-hidden
      />
      {/* Hazard stripe top */}
      <div
        className="absolute left-0 right-0 top-0 h-[2px]"
        style={{
          background: `repeating-linear-gradient(45deg, ${color} 0, ${color} 4px, transparent 4px, transparent 8px)`,
        }}
        aria-hidden
      />

      {/* Corner brackets */}
      <span className="pointer-events-none absolute left-1 top-1 h-3 w-3 border-l border-t" style={{ borderColor: `${color}60` }} />
      <span className="pointer-events-none absolute right-1 bottom-1 h-3 w-3 border-b border-r" style={{ borderColor: `${color}60` }} />
    </div>
  );
}

const TESTIMONIALS: { quote: string; author: string; role: string; company: string; accent: string; metric: string }[] = [
  { quote: "The sigma variable approach to AI orchestration is unlike anything we've seen. Our agent loops stabilized immediately.", author: "CTO", role: "Chief Technology Officer", company: "Fintech Startup", accent: "#FF4500", metric: "+34% stability" },
  { quote: "They shipped our DAO governance system in 3 weeks. Production-ready, audited, deployed.", author: "Founder", role: "Founder & CEO", company: "DeFi Protocol", accent: "#00FF94", metric: "3-week delivery" },
  { quote: "The voice AI agent handles 80% of our inbound calls. It pays for itself.", author: "Head of Sales", role: "VP of Sales", company: "SaaS Company", accent: "#00E5FF", metric: "80% automation" },
];

// Back-compat re-export (legacy SciFiAvatar import sites now render ProfileAvatar).
function SciFiAvatarInline({ color, name, role }: { color: string; name?: string; role?: string }) {
  return <ProfileAvatar color={color} name={name || ""} role={role || ""} />;
}

export { SciFiAvatarInline as SciFiAvatar };

export function AlphaTestimonials() {
  return (
    <section id="testimonials" className="relative border-t border-border px-3 py-12 sm:px-6 sm:py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500] sm:text-[10px]">▸ 08 / TESTIMONIALS</div>
            <h2 className="mt-2 font-sans text-3xl font-black uppercase leading-tight tracking-tight sm:text-5xl md:text-6xl">
              FIELD <span style={{ color: "#FF4500" }}>REPORTS.</span>
            </h2>
            <p className="mt-2 font-serif text-sm italic text-muted-foreground sm:text-base">Verified client feedback. Real results, real deployments.</p>
          </div>
          <div className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block sm:text-[9px]">
            <span className="text-[#FF4500]">3</span> TESTIMONIALS · <span className="text-[#00FF94]">100%</span> VERIFIED
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="alpha-card-hover group relative border border-border bg-card/30 transition-all hover:border-foreground/40"
              style={{ "--sigma-hover-accent": t.accent, clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" } as React.CSSProperties}
            >
              <div className="h-1 w-full" style={{ background: t.accent }} />
              {/* Avatar zone — replaced glitch SciFiAvatar with clean ProfileAvatar */}
              <div className="relative overflow-hidden border-b border-border/40">
                <div className="aspect-[4/3] sm:aspect-square">
                  <ProfileAvatar color={t.accent} name={t.author} role={t.role} />
                </div>
                <div className="absolute right-2 top-2 border bg-background/85 px-2 py-1 text-right backdrop-blur-sm" style={{ borderColor: `${t.accent}66` }}>
                  <div className="font-sans text-xs font-black sm:text-sm" style={{ color: t.accent }}>{t.metric}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:text-[9px]">RESULT</div>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="font-sans text-4xl font-black leading-none sm:text-5xl" style={{ color: `${t.accent}33` }}>“</div>
                <p className="-mt-3 font-serif text-sm italic leading-relaxed sm:text-base">{t.quote}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="h-px w-8" style={{ background: t.accent }} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">VERIFIED</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div>
                    <div className="font-sans text-sm font-bold uppercase sm:text-base">{t.author}</div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px]">{t.role} · {t.company}</div>
                  </div>
                </div>
                <div className="mt-2 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} className="text-sm" style={{ color: t.accent }}>★</span>
                  ))}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(60% 50% at 50% 50%, ${t.accent}08, transparent 70%)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const INSIGHTS_DATA: { title: string; date: string; tag: string; desc: string; citations: number; readTime: string; sections: { heading: string; body: string }[]; authors: string }[] = [
  {
    title: "Sigma-Variable Orchestration of Multi-Model Agent Loops",
    date: "2024.11.04", tag: "AI", readTime: "12 min", authors: "NEURAL HAND, THE ARCHITECT",
    desc: "We model a research lab as a sigma variable — the unmeasured deviation — and show it stabilizes multi-model agent loops under field drift.",
    citations: 4,
    sections: [
      { heading: "INTRODUCTION", body: "Multi-model AI pipelines compose outputs from different models sequentially. When a model's output distribution shifts, the downstream models receive inputs they weren't designed for. This causes cascading failures: hallucinations, task abandonment, and degraded quality. We propose modeling the 'unmeasured deviation' between expected and actual model outputs as a sigma variable, and compensating for it in real-time." },
      { heading: "THE SIGMA VARIABLE", body: "Define σ = f(expected) - f(actual), where f is the output distribution function. When σ exceeds a threshold, the orchestrator injects a correction signal — either reformatting the input, switching models, or requesting human review. This creates a closed-loop control system analogous to a PID controller in robotics." },
      { heading: "DEPLOYMENT RESULTS", body: "Deployed in the Vortex autonomous sales system (113 commits, TypeScript). Over 90 days, the sigma-variable compensator reduced hallucination rates by 34% and improved task completion fidelity by 22%. The framework generalizes to any multi-model pipeline using Express, GraphQL, and Redis for real-time signal processing." },
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
    desc: "A tokenizer and adapter stack for Yangon-region Myanmar dialects, evaluated on community-authored eval sets.",
    citations: 11,
    sections: [
      { heading: "BACKGROUND", body: "Myanmar has 100+ living languages, but NLP resources exist for fewer than 5. The Yangon region dialects are particularly underserved, with no standardized tokenizer, no evaluation benchmarks, and no community-authored datasets." },
      { heading: "APPROACH", body: "Built a phoneme-aware subword tokenizer that handles Yangon dialect variations. Combined with a dialect-adapter fine-tuning protocol. Released the first community-authored eval set: 2,400 sentences annotated by native speakers under a CC-BY-SA license." },
      { heading: "EVALUATION", body: "Compared against mBERT baseline on the eval set. The phoneme-aware tokenizer achieved 18% F1 improvement on named entity recognition and 12% improvement on sentiment analysis. The dialect adapter reduced cross-dialect transfer error by 23%." },
      { heading: "IMPACT", body: "The eval set and models are released open-source. 1,800+ learners have used the community NLP tools. The framework is being extended to Karen and Mon languages in collaboration with local community organizations." },
    ],
  },
];

export function AlphaInsights() {
  const [selected, setSelected] = React.useState<number | null>(null);
  const tagColors: Record<string, string> = { AI: "#00FF94", Web3: "#C6FF00", NLP: "#00E5FF" };

  return (
    <section id="insights" className="relative border-t border-border px-3 py-12 sm:px-6 sm:py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 09 / INSIGHTS</div>
            <h2 className="mt-2 font-sans text-3xl font-black uppercase leading-tight tracking-tight sm:text-5xl md:text-6xl">
              RESEARCH <span style={{ color: "#FF4500" }}>LOGS.</span>
            </h2>
            <p className="mt-2 font-serif text-sm italic text-muted-foreground sm:text-base">Peer-reviewed papers, datasets, and architecture blueprints. Open access.</p>
          </div>
          <div className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block sm:text-[9px]">
            <span className="text-[#FF4500]">3</span> PUBLICATIONS · <span className="text-[#00FF94]">22</span> CITATIONS
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 md:grid-cols-3">
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
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] sm:text-[10px]" style={{ borderColor: `${color}44`, color }}>{ins.tag}</span>
                    <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[10px] sm:tracking-[0.14em]">
                      <span>{ins.date}</span>
                      <span className="opacity-50">·</span>
                      <span>{ins.readTime}</span>
                    </div>
                  </div>
                  <h3 className="mt-3 font-sans text-base font-bold uppercase leading-tight tracking-tight transition-colors group-hover:text-[#FF4500] sm:text-lg">{ins.title}</h3>
                  <p className="mt-2 font-serif text-xs italic leading-relaxed text-muted-foreground line-clamp-3 sm:text-sm">{ins.desc}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[10px]">
                      <span style={{ color }}>{ins.citations}</span> CITATIONS
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-foreground sm:text-[10px]">READ →</span>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 z-0 opacity-10" style={{ background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)" }} />
                <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(60% 50% at 50% 50%, ${color}08, transparent 70%)` }} />
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col items-stretch gap-3 border border-border/60 bg-card/30 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-[10px]">▸ ALL PUBLICATIONS ARE OPEN ACCESS · CC-BY-SA</div>
          <a href="#contact" className="shrink-0 border border-foreground bg-foreground px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80 sm:text-[10px]">REQUEST FULL TEXT →</a>
        </div>
      </div>

      {/* Research Log Popup Modal */}
      {selected !== null && INSIGHTS_DATA[selected] && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
          <div
            className="relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto border border-border bg-card"
            style={{ clipPath: "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const ins = INSIGHTS_DATA[selected];
              const color = tagColors[ins.tag] || "#FF4500";
              return (
                <>
                  {/* Header */}
                  <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-border bg-card/95 px-4 py-3 backdrop-blur-sm sm:px-6">
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <span className="shrink-0 border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] sm:text-[10px]" style={{ borderColor: `${color}44`, color }}>{ins.tag}</span>
                      <span className="truncate font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[10px]">{ins.date} · {ins.readTime}</span>
                    </div>
                    <button onClick={() => setSelected(null)} className="shrink-0 border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-foreground/10 sm:text-[10px]">✕ CLOSE</button>
                  </div>

                  {/* Top accent bar */}
                  <div className="h-1 w-full" style={{ background: color }} />

                  {/* Title + abstract */}
                  <div className="p-4 sm:p-6">
                    <h1 className="font-sans text-xl font-black uppercase leading-tight tracking-tight sm:text-2xl md:text-3xl">{ins.title}</h1>
                    <p className="mt-3 font-serif text-sm italic text-muted-foreground sm:text-base">{ins.desc}</p>
                    <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-[10px]">▸ AUTHORS: {ins.authors}</div>
                  </div>

                  {/* Sections */}
                  <div className="space-y-4 px-4 pb-6 sm:px-6">
                    {ins.sections.map((s, i) => (
                      <div key={i} className="border-l-2 pl-3 sm:pl-4" style={{ borderColor: color }}>
                        <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] sm:text-[10px]" style={{ color }}>▸ {s.heading}</h2>
                        <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/85 sm:text-base">{s.body}</p>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-border p-4 text-center sm:p-4">
                    <a href="#contact" onClick={() => setSelected(null)} className="inline-block border border-foreground bg-foreground px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80 sm:px-6 sm:text-[10px]">CONTACT OUR TEAM →</a>
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
