"use client";

const TESTIMONIALS: { quote: string; author: string; role: string; company: string; accent: string; metric: string }[] = [
  { quote: "The sigma variable approach to AI orchestration is unlike anything we've seen. Our agent loops stabilized immediately.", author: "CTO", role: "Chief Technology Officer", company: "Fintech Startup", accent: "#FF4500", metric: "+34% stability" },
  { quote: "They shipped our DAO governance system in 3 weeks. Production-ready, audited, deployed.", author: "Founder", role: "Founder & CEO", company: "DeFi Protocol", accent: "#00FF94", metric: "3-week delivery" },
  { quote: "The voice AI agent handles 80% of our inbound calls. It pays for itself.", author: "Head of Sales", role: "VP of Sales", company: "SaaS Company", accent: "#00E5FF", metric: "80% automation" },
];

// SVG-based sci-fi avatars — generated per-testimonial with unique geometric patterns
function SciFiAvatar({ color, seed }: { color: string; seed: number }) {
  const shapes = [];
  for (let i = 0; i < 6; i++) {
    const cx = 50 + Math.sin(seed + i * 1.7) * 25;
    const cy = 50 + Math.cos(seed + i * 2.3) * 25;
    const r = 8 + Math.sin(seed + i * 3.1) * 6;
    shapes.push(
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={Math.max(r, 3)}
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        opacity={0.3 + (i / 6) * 0.4}
      />
    );
  }
  // Central geometric figure — abstract humanoid
  const headY = 35;
  const bodyY = 55;
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {/* Background grid */}
      <defs>
        <pattern id={`grid-${seed}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke={color} strokeWidth="0.2" opacity="0.15" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill={`url(#grid-${seed})`} />

      {/* Geometric shapes overlay */}
      {shapes}

      {/* Abstract humanoid figure — sci-fi silhouette */}
      {/* Head */}
      <circle cx="50" cy={headY} r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="50" cy={headY} r="6" fill={color} opacity="0.2" />
      {/* Visor line */}
      <line x1="42" y1={headY - 2} x2="58" y2={headY - 2} stroke={color} strokeWidth="0.5" opacity="0.8" />

      {/* Body — angular shoulders */}
      <path
        d={`M 35 ${bodyY} L 50 ${bodyY - 8} L 65 ${bodyY} L 60 ${bodyY + 15} L 40 ${bodyY + 15} Z`}
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity="0.5"
      />
      {/* Chest detail */}
      <line x1="50" y1={bodyY} x2="50" y2={bodyY + 12} stroke={color} strokeWidth="0.5" opacity="0.4" />
      <circle cx="50" cy={bodyY + 5} r="2" fill={color} opacity="0.6" />

      {/* Corner brackets */}
      <path d="M 5 5 L 15 5 M 5 5 L 5 15" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M 95 5 L 85 5 M 95 5 L 95 15" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M 5 95 L 15 95 M 5 95 L 5 85" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M 95 95 L 85 95 M 95 95 L 95 85" stroke={color} strokeWidth="1" opacity="0.4" />

      {/* Scanline effect */}
      <rect width="100" height="100" fill={`repeating-linear-gradient(0deg, transparent, transparent 3px, ${color}15 3px, ${color}15 4px)`} opacity="0.3" />
    </svg>
  );
}

export function AlphaTestimonials() {
  return (
    <section id="testimonials" className="relative border-t border-border px-3 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 08 / TESTIMONIALS</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              FIELD <span style={{ color: "#FF4500" }}>REPORTS.</span>
            </h2>
            <p className="mt-2 font-serif text-base italic text-muted-foreground">Verified client feedback. Real results, real deployments.</p>
          </div>
          <div className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            <span className="text-[#FF4500]">3</span> TESTIMONIALS · <span className="text-[#00FF94]">100%</span> VERIFIED
          </div>
        </div>

        {/* Testimonial cards with sci-fi avatars */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="group relative border border-border bg-card/30 transition-all hover:border-foreground/40"
              style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}
            >
              {/* Top accent bar */}
              <div className="h-1 w-full" style={{ background: t.accent }} />

              {/* Sci-fi avatar — artistic SVG */}
              <div className="relative overflow-hidden border-b border-border/40">
                <div className="aspect-square">
                  <SciFiAvatar color={t.accent} seed={i + 1} />
                </div>
                {/* Metric badge overlay */}
                <div className="absolute right-2 top-2 border px-2 py-1 text-right" style={{ borderColor: `${t.accent}44` }}>
                  <div className="font-sans text-sm font-black" style={{ color: t.accent }}>{t.metric}</div>
                  <div className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted-foreground">RESULT</div>
                </div>
              </div>

              {/* Quote */}
              <div className="p-4">
                <div className="font-sans text-4xl font-black leading-none" style={{ color: `${t.accent}33` }}>"</div>
                <p className="-mt-3 font-serif text-sm italic leading-relaxed">{t.quote}</p>

                {/* Divider */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="h-px w-8" style={{ background: t.accent }} />
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">VERIFIED</span>
                </div>

                {/* Author */}
                <div className="mt-2 flex items-center gap-2">
                  <div>
                    <div className="font-sans text-xs font-bold uppercase">{t.author}</div>
                    <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">{t.role} · {t.company}</div>
                  </div>
                </div>

                {/* Stars */}
                <div className="mt-2 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} className="text-sm" style={{ color: t.accent }}>★</span>
                  ))}
                </div>
              </div>

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(60% 50% at 50% 50%, ${t.accent}08, transparent 70%)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const INSIGHTS_DATA: { title: string; date: string; tag: string; desc: string; citations: number; readTime: string; slug: string }[] = [
  { title: "Sigma-Variable Orchestration of Multi-Model Agent Loops", date: "2024.11.04", tag: "AI", desc: "We model a research lab as a sigma variable — the unmeasured deviation — and show it stabilizes multi-model agent loops under field drift.", citations: 4, readTime: "12 min", slug: "sigma-variable-orchestration" },
  { title: "RWA Tokenization for Agricultural Microgrids", date: "2024.07.15", tag: "Web3", desc: "Tokenizing microgrid capacity as on-chain RWA, settling against physical IoT telemetry from a 240-node sensor mesh.", citations: 7, readTime: "9 min", slug: "rwa-tokenization-microgrids" },
  { title: "Local-Language NLP for Low-Resource Myanmar Dialects", date: "2024.04.22", tag: "NLP", desc: "A tokenizer and adapter stack for Bago-region dialects, evaluated on community-authored eval sets.", citations: 11, readTime: "11 min", slug: "local-language-nlp-myanmar" },
];

export function AlphaInsights() {
  const tagColors: Record<string, string> = { AI: "#00FF94", Web3: "#C6FF00", NLP: "#00E5FF" };

  return (
    <section id="insights" className="relative border-t border-border px-3 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 09 / INSIGHTS</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              RESEARCH <span style={{ color: "#FF4500" }}>LOGS.</span>
            </h2>
            <p className="mt-2 font-serif text-base italic text-muted-foreground">Peer-reviewed papers, datasets, and architecture blueprints. Open access.</p>
          </div>
          {/* Filter buttons — functional */}
          <div className="hidden shrink-0 gap-1 sm:flex">
            {["ALL", "AI", "Web3", "NLP"].map((tag, i) => (
              <button key={tag} className={`border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.16em] ${i === 0 ? "border-[#FF4500] bg-[#FF4500] text-black" : "border-border text-muted-foreground hover:text-foreground"}`}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Research entry cards — clickable with real content */}
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          {INSIGHTS_DATA.map((ins, i) => {
            const color = tagColors[ins.tag] || "#FF4500";
            return (
              <a
                key={i}
                href={`/insights/${ins.slug}`}
                className="group relative border border-border bg-card/30 transition-all hover:border-foreground/40"
                style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}
              >
                {/* Top accent bar */}
                <div className="h-1 w-full" style={{ background: color }} />

                {/* Body */}
                <div className="p-4">
                  {/* Tag + date + read time */}
                  <div className="flex items-center justify-between">
                    <span className="border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em]" style={{ borderColor: `${color}44`, color }}>{ins.tag}</span>
                    <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
                      <span>{ins.date}</span>
                      <span>·</span>
                      <span>{ins.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 font-sans text-base font-bold uppercase leading-tight tracking-tight transition-colors group-hover:text-[#FF4500]">{ins.title}</h3>

                  {/* Abstract */}
                  <p className="mt-2 font-serif text-xs italic leading-relaxed text-muted-foreground line-clamp-3">{ins.desc}</p>

                  {/* Footer — citations + read link */}
                  <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                      <span style={{ color }}>{ins.citations}</span> CITATIONS
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-foreground">
                      READ →
                    </span>
                  </div>
                </div>

                {/* Scanlines */}
                <div className="pointer-events-none absolute inset-0 z-0 opacity-10" style={{ background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)" }} />
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(60% 50% at 50% 50%, ${color}08, transparent 70%)` }} />
              </a>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 flex items-center justify-between border border-border/60 bg-card/30 p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">▸ ALL PUBLICATIONS ARE OPEN ACCESS · CC-BY-SA</div>
          <a href="#contact" className="border border-foreground bg-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80">REQUEST FULL TEXT →</a>
        </div>
      </div>
    </section>
  );
}
