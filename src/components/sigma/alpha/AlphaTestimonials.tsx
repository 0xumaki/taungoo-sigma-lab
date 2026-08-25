"use client";

const TESTIMONIALS: { quote: string; author: string; role: string; company: string; accent: string; metric: string }[] = [
  { quote: "The sigma variable approach to AI orchestration is unlike anything we've seen. Our agent loops stabilized immediately.", author: "CTO", role: "Chief Technology Officer", company: "Fintech Startup", accent: "#FF4500", metric: "+34% stability" },
  { quote: "They shipped our DAO governance system in 3 weeks. Production-ready, audited, deployed.", author: "Founder", role: "Founder & CEO", company: "DeFi Protocol", accent: "#00FF94", metric: "3-week delivery" },
  { quote: "The voice AI agent handles 80% of our inbound calls. It pays for itself.", author: "Head of Sales", role: "VP of Sales", company: "SaaS Company", accent: "#00E5FF", metric: "80% automation" },
];

export function AlphaTestimonials() {
  return (
    <section id="testimonials" className="relative border-t border-border px-6 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 08 / TESTIMONIALS</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              FIELD <span style={{ color: "#FF4500" }}>REPORTS.</span>
            </h2>
            <p className="mt-2 font-serif text-base italic text-muted-foreground">
              Verified client feedback. Real results, real metrics, real deployments.
            </p>
          </div>
          <div className="hidden shrink-0 space-y-1 text-right font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            <div><span className="text-[#FF4500]">3</span> TESTIMONIALS</div>
            <div><span className="text-[#00FF94]">100%</span> VERIFIED</div>
            <div><span className="text-[#00E5FF]">4.8★</span> AVG RATING</div>
          </div>
        </div>

        {/* Testimonial cards — maximalist */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="group relative border border-border bg-card/30 transition-all hover:border-foreground/40">
              {/* Top accent bar */}
              <div className="h-1 w-full" style={{ background: t.accent }} />

              {/* Body */}
              <div className="p-4">
                {/* Quote mark + metric */}
                <div className="flex items-start justify-between">
                  <div className="font-sans text-6xl font-black leading-none" style={{ color: `${t.accent}33` }}>"</div>
                  {/* Metric badge */}
                  <div className="border px-2 py-1 text-right" style={{ borderColor: `${t.accent}44` }}>
                    <div className="font-sans text-sm font-black" style={{ color: t.accent }}>{t.metric}</div>
                    <div className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted-foreground">RESULT</div>
                  </div>
                </div>

                {/* Quote */}
                <p className="-mt-4 font-serif text-base italic leading-relaxed">{t.quote}</p>

                {/* Divider */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="h-px w-8" style={{ background: t.accent }} />
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">VERIFIED CLIENT</span>
                </div>

                {/* Author */}
                <div className="mt-2 flex items-center gap-3">
                  {/* Avatar — geometric */}
                  <div className="flex h-8 w-8 items-center justify-center border" style={{ borderColor: `${t.accent}44` }}>
                    <span className="font-sans text-sm font-black" style={{ color: t.accent }}>{t.author[0]}</span>
                  </div>
                  <div>
                    <div className="font-sans text-xs font-bold uppercase tracking-tight">{t.author}</div>
                    <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">{t.role} · {t.company}</div>
                  </div>
                </div>

                {/* Star rating */}
                <div className="mt-3 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} className="text-sm" style={{ color: t.accent }}>★</span>
                  ))}
                </div>
              </div>

              {/* Corner accents */}
              <span className="absolute right-2 top-3 h-2 w-2 border-r border-t opacity-20" style={{ borderColor: t.accent }} />
              <span className="absolute bottom-2 left-2 h-2 w-2 border-b border-l opacity-20" style={{ borderColor: t.accent }} />

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(60% 50% at 50% 50%, ${t.accent}08, transparent 70%)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const INSIGHTS: { title: string; date: string; tag: string; desc: string; citations: number }[] = [
  { title: "Sigma-Variable Orchestration of Multi-Model Agent Loops", date: "2024.11.04", tag: "AI", desc: "We model a research lab as a sigma variable — the unmeasured deviation — and show it stabilizes multi-model agent loops.", citations: 4 },
  { title: "RWA Tokenization for Agricultural Microgrids", date: "2024.07.15", tag: "Web3", desc: "Tokenizing microgrid capacity as on-chain RWA, settling against physical IoT telemetry.", citations: 7 },
  { title: "Local-Language NLP for Low-Resource Myanmar Dialects", date: "2024.04.22", tag: "NLP", desc: "A tokenizer and adapter stack for Bago-region dialects, evaluated on community-authored eval sets.", citations: 11 },
];

export function AlphaInsights() {
  const tagColors: Record<string, string> = { AI: "#00FF94", Web3: "#C6FF00", NLP: "#00E5FF" };

  return (
    <section id="insights" className="relative border-t border-border px-6 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 09 / INSIGHTS</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              RESEARCH <span style={{ color: "#FF4500" }}>LOGS.</span>
            </h2>
            <p className="mt-2 font-serif text-base italic text-muted-foreground">
              Peer-reviewed papers, datasets, and architecture blueprints. Open access.
            </p>
          </div>
          <div className="hidden shrink-0 space-y-1 text-right font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            <div><span className="text-[#FF4500]">9</span> PUBLICATIONS</div>
            <div><span className="text-[#00FF94]">22</span> CITATIONS</div>
            <div><span className="text-[#00E5FF]">CC-BY-SA</span> LICENSE</div>
          </div>
        </div>

        {/* Insights — maximalist list with data panels */}
        <div className="mt-8 divide-y divide-border">
          {INSIGHTS.map((ins, i) => {
            const color = tagColors[ins.tag] || "#FF4500";
            return (
              <div key={i} className="group grid grid-cols-12 items-center gap-3 py-4 transition-colors hover:bg-foreground/[0.02]">
                {/* Number */}
                <span className="col-span-1 font-sans text-2xl font-black text-foreground/15">{String(i + 1).padStart(2, "0")}</span>

                {/* Tag badge */}
                <span className="col-span-1 border px-2 py-1 text-center font-mono text-[8px] uppercase tracking-[0.16em]" style={{ borderColor: `${color}44`, color }}>{ins.tag}</span>

                {/* Title + desc */}
                <div className="col-span-12 md:col-span-5">
                  <h3 className="font-sans text-base font-bold uppercase leading-tight tracking-tight transition-colors group-hover:text-[#FF4500]">{ins.title}</h3>
                  <p className="mt-0.5 font-serif text-xs italic text-muted-foreground">{ins.desc}</p>
                </div>

                {/* Citations */}
                <div className="col-span-3 hidden md:block">
                  <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">CITATIONS</div>
                  <div className="font-sans text-lg font-black" style={{ color }}>{ins.citations}</div>
                </div>

                {/* Date */}
                <div className="col-span-3 hidden md:block">
                  <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">PUBLISHED</div>
                  <div className="font-mono text-xs text-foreground">{ins.date}</div>
                </div>

                {/* Arrow */}
                <span className="col-span-1 font-mono text-sm text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground">→</span>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 flex items-center justify-between border border-border/60 bg-card/30 p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            ▸ ALL PUBLICATIONS ARE OPEN ACCESS · CC-BY-SA
          </div>
          <a href="#contact" className="border border-foreground bg-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80">
            REQUEST FULL TEXT →
          </a>
        </div>
      </div>
    </section>
  );
}
