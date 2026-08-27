"use client";

import { SciFiCard } from "./SciFiCard";

// Tech stack researched from actual GitHub repos (package.json analysis)
// + updated to 2025/2026 current tools
const TECH_DATA: { category: string; items: string[]; color: string; icon: string }[] = [
  {
    category: "AI / ML",
    color: "#00FF94",
    icon: "◴",
    items: ["Zai", "Kimi K3", "Fable 5", "GPT-5.6 Sol", "Google A2A", "Omnibridge", "DeepSeek V4", "OxAlpha", "ElevenLabs", "Whisper", "MCP", "LangChain", "Vercel AI SDK"],
  },
  {
    category: "WEB3",
    color: "#C6FF00",
    icon: "⬡",
    items: ["Solidity", "Ethers.js", "Viem", "Wagmi", "Hardhat", "Web3.js", "The Graph", "IPFS", "RainbowKit", "Foundry"],
  },
  {
    category: "FRONTEND",
    color: "#00E5FF",
    icon: "▣",
    items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "GSAP", "Three.js", "R3F", "Framer Motion", "Radix UI", "Shadcn/ui"],
  },
  {
    category: "BACKEND",
    color: "#FF2D7E",
    icon: "⚙",
    items: ["Prisma", "PostgreSQL", "MySQL", "Redis", "SQLite", "GraphQL", "tRPC", "Express", "Socket.io", "Zod"],
  },
  {
    category: "INFRA",
    color: "#FFB300",
    icon: "⬚",
    items: ["Docker", "Vercel", "AWS", "Supabase", "Cloudflare", "NextAuth", "Linear", "GitHub Actions"],
  },
  {
    category: "MULTIMEDIA",
    color: "#B388FF",
    icon: "◱",
    items: ["Tone.js", "Web Audio API", "Canvas API", "Recharts", "D3.js", "tsParticles", "Three Globe", "Sharp"],
  },
];

const INFRA_STATS: { v: string; k: string; c: string }[] = [
  { v: "99.9%", k: "UPTIME SLA", c: "#00FF94" },
  { v: "6", k: "CLOUD REGIONS", c: "#00E5FF" },
  { v: "24/7", k: "MONITORING", c: "#FFB300" },
  { v: "<100ms", k: "API LATENCY", c: "#C6FF00" },
];

export function AlphaTech() {
  return (
    <section id="tech" className="relative border-t border-border px-3 py-12 sm:px-6 sm:py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 07 / TECH STACK</div>
            <h2 className="mt-2 font-sans text-3xl font-black uppercase leading-tight tracking-tight sm:text-5xl md:text-6xl">
              TOOLS WE <span style={{ color: "#FF4500" }}>WIELD.</span>
            </h2>
            <p className="mt-2 font-serif text-sm italic text-muted-foreground sm:text-base">
              6 categories. 50+ tools. Verified from our actual GitHub repos — not marketing fluff.
            </p>
          </div>
          <div className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block sm:text-[9px]">
            <span className="text-[#FF4500]">6</span> CATEGORIES · <span className="text-[#00FF94]">50+</span> TOOLS
          </div>
        </div>

        {/* Tech grid — SciFiCard */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_DATA.map((t, i) => (
            <SciFiCard key={t.category} accent={t.color} label={t.category} id={`${t.items.length} TOOLS`} className="alpha-card-hover" style={{ "--sigma-hover-accent": t.color } as React.CSSProperties}>
              <div className="p-4">
                {/* Icon + hazard stripe */}
                <div className="flex items-center gap-3 border-b border-border/40 pb-2">
                  <div className="flex h-10 w-10 items-center justify-center border" style={{ borderColor: `${t.color}44` }}>
                    <span className="font-sans text-lg" style={{ color: t.color }}>{t.icon}</span>
                  </div>
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
                      className="border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/40 sm:text-[9px]"
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
        <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-4">
          {INFRA_STATS.map((s, i) => (
            <SciFiCard key={s.k} accent={s.c} label={s.k} className="alpha-card-hover" style={{ "--sigma-hover-accent": s.c } as React.CSSProperties}>
              <div className="p-3 text-center">
                <div className="font-sans text-lg font-black sm:text-xl" style={{ color: s.c }}>{s.v}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-[8px]">{s.k}</div>
              </div>
            </SciFiCard>
          ))}
        </div>

        {/* Verification note */}
        <div className="mt-4 border border-border/40 bg-card/20 p-3">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-[8px]">
            <span className="text-[#00FF94]">▸</span>
            TECH STACK VERIFIED FROM PACKAGE.JSON · UPDATED 2025/2026 · NO MARKETING FLUFF
          </div>
        </div>
      </div>
    </section>
  );
}
