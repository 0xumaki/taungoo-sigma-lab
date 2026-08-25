"use client";

const TEAM: [string, string, string, string][] = [
  ["THE ARCHITECT", "Lab Director", "Σ", "#FF4500"],
  ["NEURAL HAND", "AI Lead", "◴", "#00E5FF"],
  ["CHAIN WEAVER", "Web3 Lead", "⬡", "#C6FF00"],
  ["EDGE RUNNER", "IoT Engineer", "⌖", "#FFB300"],
  ["QUANTUM SEER", "Research Scientist", "⟁", "#B388FF"],
  ["SIGNAL TENDER", "Community Lead", "◍", "#00FF94"],
  ["NULL CIPHER", "Security", "⚿", "#FF3D3D"],
  ["GHOST PRINTER", "Hardware", "⚙", "#FFEB3B"],
];

const TECH_DATA: [string, string[]][] = [
  ["AI / ML", ["GPT-4", "Claude", "Llama", "Whisper", "ElevenLabs", "LangChain", "MCP"]],
  ["WEB3", ["Solidity", "Ethereum", "Polygon", "The Graph", "IPFS", "Hardhat", "Web3.js"]],
  ["FRONTEND", ["React", "Next.js", "TypeScript", "Tailwind", "GSAP", "Three.js"]],
  ["BACKEND", ["Node.js", "Prisma", "PostgreSQL", "Redis", "GraphQL", "tRPC"]],
  ["INFRA", ["Docker", "AWS", "Vercel", "Supabase", "Cloudflare", "Linear"]],
  ["MOBILE", ["React Native", "Expo", "Flutter", "Swift", "Kotlin"]],
];

const TESTIMONIALS: [string, string][] = [
  ["The sigma variable approach to AI orchestration is unlike anything we've seen. Our agent loops stabilized immediately.", "CTO, Fintech Startup"],
  ["They shipped our DAO governance system in 3 weeks. Production-ready, audited, deployed.", "Founder, DeFi Protocol"],
  ["The voice AI agent handles 80% of our inbound calls. It pays for itself.", "Head of Sales, SaaS Company"],
];

const INSIGHTS: [string, string, string][] = [
  ["Sigma-Variable Orchestration of Multi-Model Agent Loops", "2024.11.04", "AI"],
  ["RWA Tokenization for Agricultural Microgrids", "2024.07.15", "Web3"],
  ["Local-Language NLP for Low-Resource Myanmar Dialects", "2024.04.22", "NLP"],
];

export function AlphaTeam() {
  return (
    <section id="team" className="relative border-t border-border px-6 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 06 / TEAM</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              THE <span style={{ color: "#FF4500" }}>COLLECTIVE.</span>
            </h2>
          </div>
          <div className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            8 OPERATORS<br />0 EGOS
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TEAM.map(([name, role, glyph, accent]) => (
            <div key={name} className="group border border-border bg-card/30 p-4 transition-all hover:border-foreground/40">
              <div className="relative flex items-center justify-center border border-border/50 p-4">
                {/* Background glow */}
                <div className="pointer-events-none absolute inset-0 opacity-20" style={{ background: accent }} />
                <span className="sigma-spin-slow font-sans text-4xl font-black transition-transform group-hover:scale-110" style={{ color: accent }}>{glyph}</span>
                {/* Corner accents */}
                <span className="absolute left-0 top-0 h-2 w-2 border-l border-t" style={{ borderColor: accent }} />
                <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b" style={{ borderColor: accent }} />
              </div>
              <h3 className="mt-3 font-sans text-sm font-bold uppercase tracking-tight">{name}</h3>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: accent }}>{role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AlphaTech() {
  return (
    <section id="tech" className="relative border-t border-border px-6 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 07 / TECH STACK</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              TOOLS WE <span style={{ color: "#FF4500" }}>WIELD.</span>
            </h2>
          </div>
          <div className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            6 CATEGORIES<br />35+ TOOLS
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_DATA.map(([category, items], i) => {
            const colors = ["#00FF94", "#C6FF00", "#00E5FF", "#FF2D7E", "#FFB300", "#B388FF"];
            const color = colors[i % colors.length];
            return (
              <div key={category} className="group border border-border bg-card/30 p-4 transition-all hover:border-foreground/40">
                <div className="absolute left-0 top-0 h-full w-0.5" style={{ background: color }} />
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color }}>{category}</h3>
                <div className="mt-2 flex flex-wrap gap-1">
                  {items.map((item) => (
                    <span key={item} className="border border-border/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground">{item}</span>
                  ))}
                </div>
                <div className="mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/60">
                  {items.length} TOOLS
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AlphaTestimonials() {
  return (
    <section id="testimonials" className="relative border-t border-border px-6 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 08 / TESTIMONIALS</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              FIELD <span style={{ color: "#FF4500" }}>REPORTS.</span>
            </h2>
          </div>
          <div className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            VERIFIED<br />CLIENTS
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map(([quote, author], i) => {
            const colors = ["#FF4500", "#00FF94", "#00E5FF"];
            const color = colors[i % colors.length];
            return (
              <div key={i} className="group relative border border-border bg-card/30 p-4 transition-all hover:border-foreground/40">
                <div className="absolute left-0 top-0 h-full w-0.5" style={{ background: color }} />
                {/* Quote mark */}
                <div className="font-sans text-6xl font-black leading-none" style={{ color: `${color}33` }}>"</div>
                <p className="-mt-4 font-serif text-base italic leading-relaxed">{quote}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="h-px w-8" style={{ background: color }} />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{author}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AlphaInsights() {
  return (
    <section id="insights" className="relative border-t border-border px-6 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 09 / INSIGHTS</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              RESEARCH <span style={{ color: "#FF4500" }}>LOGS.</span>
            </h2>
          </div>
          <div className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            PEER-REVIEWED<br />OPEN ACCESS
          </div>
        </div>

        <div className="mt-8 divide-y divide-border">
          {INSIGHTS.map(([title, date, tag], i) => {
            const tagColors: Record<string, string> = { AI: "#00FF94", Web3: "#C6FF00", NLP: "#00E5FF" };
            const color = tagColors[tag] || "#FF4500";
            return (
              <div key={i} className="group flex items-center gap-4 py-4 transition-colors hover:bg-foreground/[0.02]">
                <span className="border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em]" style={{ borderColor: `${color}66`, color }}>{tag}</span>
                <span className="flex-1 font-sans text-base font-bold uppercase tracking-tight transition-colors group-hover:text-[#FF4500]">{title}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{date}</span>
                <span className="font-mono text-[9px] text-muted-foreground transition-transform group-hover:translate-x-1">→</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
