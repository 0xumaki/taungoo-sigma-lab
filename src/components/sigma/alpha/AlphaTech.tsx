"use client";

import { SciFiCard } from "./SciFiCard";

const TECH_DATA: { category: string; items: string[]; color: string; icon: string }[] = [
  { category: "AI / ML", items: ["GPT-4", "Claude", "Llama", "Whisper", "ElevenLabs", "LangChain", "MCP"], color: "#00FF94", icon: "◴" },
  { category: "WEB3", items: ["Solidity", "Ethereum", "Polygon", "The Graph", "IPFS", "Hardhat", "Web3.js"], color: "#C6FF00", icon: "⬡" },
  { category: "FRONTEND", items: ["React", "Next.js", "TypeScript", "Tailwind", "GSAP", "Three.js"], color: "#00E5FF", icon: "▣" },
  { category: "BACKEND", items: ["Node.js", "Prisma", "PostgreSQL", "Redis", "GraphQL", "tRPC"], color: "#FF2D7E", icon: "⚙" },
  { category: "INFRA", items: ["Docker", "AWS", "Vercel", "Supabase", "Cloudflare", "Linear"], color: "#FFB300", icon: "⬚" },
  { category: "MOBILE", items: ["React Native", "Expo", "Flutter", "Swift", "Kotlin"], color: "#B388FF", icon: "◱" },
];

const INFRA_STATS: { v: string; k: string; c: string }[] = [
  { v: "99.9%", k: "UPTIME SLA", c: "#00FF94" },
  { v: "6", k: "CLOUD REGIONS", c: "#00E5FF" },
  { v: "24/7", k: "MONITORING", c: "#FFB300" },
  { v: "<100ms", k: "API LATENCY", c: "#C6FF00" },
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
            <p className="mt-2 font-serif text-base italic text-muted-foreground">6 categories. 37+ tools. Each chosen for production reliability, not hype.</p>
          </div>
          <div className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            <span className="text-[#FF4500]">6</span> CATEGORIES · <span className="text-[#00FF94]">37+</span> TOOLS
          </div>
        </div>

        {/* Tech grid — SciFiCard */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_DATA.map((t) => (
            <SciFiCard key={t.category} accent={t.color} label={t.category} id={`${t.items.length} TOOLS`}>
              <div className="p-4">
                {/* Icon + category */}
                <div className="flex items-center gap-3 border-b border-border/40 pb-2">
                  <div
                    className="flex h-10 w-10 items-center justify-center border"
                    style={{ borderColor: `${t.color}44` }}
                  >
                    <span className="font-sans text-lg" style={{ color: t.color }}>{t.icon}</span>
                  </div>
                  {/* Hazard stripe accent */}
                  <div
                    className="ml-auto h-6 w-6"
                    style={{
                      background: `repeating-linear-gradient(45deg, ${t.color} 0, ${t.color} 2px, transparent 2px, transparent 4px)`,
                    }}
                  />
                </div>

                {/* Tool tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {t.items.map((item) => (
                    <span
                      key={item}
                      className="border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/40"
                      style={{ borderColor: `${t.color}22` }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </SciFiCard>
          ))}
        </div>

        {/* Infrastructure stats — SciFiCard row */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {INFRA_STATS.map((s) => (
            <SciFiCard key={s.k} accent={s.c} label={s.k}>
              <div className="p-3 text-center">
                <div className="font-sans text-xl font-black" style={{ color: s.c }}>{s.v}</div>
                <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">{s.k}</div>
              </div>
            </SciFiCard>
          ))}
        </div>
      </div>
    </section>
  );
}
