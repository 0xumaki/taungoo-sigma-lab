"use client";

const TECH_DATA: { category: string; items: string[]; color: string; icon: string }[] = [
  { category: "AI / ML", items: ["GPT-4", "Claude", "Llama", "Whisper", "ElevenLabs", "LangChain", "MCP"], color: "#00FF94", icon: "◴" },
  { category: "WEB3", items: ["Solidity", "Ethereum", "Polygon", "The Graph", "IPFS", "Hardhat", "Web3.js"], color: "#C6FF00", icon: "⬡" },
  { category: "FRONTEND", items: ["React", "Next.js", "TypeScript", "Tailwind", "GSAP", "Three.js"], color: "#00E5FF", icon: "▣" },
  { category: "BACKEND", items: ["Node.js", "Prisma", "PostgreSQL", "Redis", "GraphQL", "tRPC"], color: "#FF2D7E", icon: "⚙" },
  { category: "INFRA", items: ["Docker", "AWS", "Vercel", "Supabase", "Cloudflare", "Linear"], color: "#FFB300", icon: "⬚" },
  { category: "MOBILE", items: ["React Native", "Expo", "Flutter", "Swift", "Kotlin"], color: "#B388FF", icon: "◱" },
];

export function AlphaTech() {
  return (
    <section id="tech" className="relative border-t border-border px-6 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 07 / TECH STACK</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              TOOLS WE <span style={{ color: "#FF4500" }}>WIELD.</span>
            </h2>
            <p className="mt-2 font-serif text-base italic text-muted-foreground">
              6 categories. 37+ tools. Each chosen for production reliability, not hype.
            </p>
          </div>
          <div className="hidden shrink-0 space-y-1 text-right font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            <div><span className="text-[#FF4500]">6</span> CATEGORIES</div>
            <div><span className="text-[#00FF94]">37+</span> TOOLS</div>
            <div><span className="text-[#00E5FF]">100%</span> PRODUCTION</div>
          </div>
        </div>

        {/* Tech grid — sci-fi panels */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_DATA.map((t) => (
            <div key={t.category} className="group relative border border-border bg-card/30 transition-all hover:border-foreground/40">
              {/* Accent bar */}
              <div className="absolute left-0 top-0 h-full w-0.5" style={{ background: t.color }} />

              {/* Body */}
              <div className="p-4">
                {/* Header row */}
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-lg" style={{ color: t.color }}>{t.icon}</span>
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: t.color }}>{t.category}</h3>
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">{t.items.length} TOOLS</span>
                </div>

                {/* Tool tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {t.items.map((item) => (
                    <span key={item} className="border border-border/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/40">{item}</span>
                  ))}
                </div>

                {/* Usage bar */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground">USAGE</span>
                  <div className="flex flex-1 gap-0.5">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <span key={i} className="h-0.5 flex-1" style={{ background: i < 8 ? t.color : "rgba(255,255,255,0.08)" }} />
                    ))}
                  </div>
                  <span className="font-mono text-[7px] uppercase tracking-[0.14em]" style={{ color: t.color }}>HIGH</span>
                </div>
              </div>

              {/* Corner accent */}
              <span className="absolute right-2 top-2 h-2 w-2 border-r border-t opacity-20" style={{ borderColor: t.color }} />

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(60% 50% at 50% 50%, ${t.color}08, transparent 70%)` }} />
            </div>
          ))}
        </div>

        {/* Infrastructure stats */}
        <div className="mt-6 grid grid-cols-2 gap-px border border-border/40 bg-border/40 sm:grid-cols-4">
          {[
            ["99.9%", "UPTIME SLA", "#00FF94"],
            ["6", "CLOUD REGIONS", "#00E5FF"],
            ["24/7", "MONITORING", "#FFB300"],
            ["<100ms", "API LATENCY", "#C6FF00"],
          ].map(([v, k, c]) => (
            <div key={k} className="bg-card/40 p-3 text-center">
              <div className="font-sans text-xl font-black" style={{ color: c }}>{v}</div>
              <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">{k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
