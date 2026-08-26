"use client";

const PROJECTS = [
  { name: "Omnibridge", desc: "Cross-chain bridge protocol with MCP & A2A server", tech: ["Solidity", "TypeScript", "Express", "GraphQL"], solution: "Multi-chain interoperability", image: "/portfolio/ominibridge.png", accent: "#00FF94", slug: "omnibridge", cat: "WEB3" },
  { name: "Dukon Pro", desc: "Private capital real estate investment platform", tech: ["Next.js", "TypeScript", "Prisma", "NextAuth"], solution: "Real estate tokenization", image: "/portfolio/dukon-pro.png", accent: "#FF4500", slug: "dukon-pro", cat: "FULL-STACK" },
  { name: "Royal DAO", desc: "Decentralized autonomous organization governance", tech: ["Next.js", "Framer Motion", "Tabler Icons"], solution: "On-chain governance", image: "/portfolio/royaldao.png", accent: "#C6FF00", slug: "royaldao", cat: "WEB3" },
  { name: "Vortex Sales OS", desc: "Autonomous AI sales operating system with voice agents", tech: ["Next.js", "Socket.io", "Prisma", "Recharts"], solution: "AI-driven sales automation", image: "/portfolio/vortex-sales-os.png", accent: "#00E5FF", slug: "vortex-sales-os", cat: "AI" },
  { name: "GymMaster", desc: "Gym management software with QR code integration", tech: ["Next.js", "Prisma", "QRCode React", "Recharts"], solution: "Facility management", image: "/portfolio/gymmaster.png", accent: "#FF2D7E", slug: "gymmaster", cat: "FULL-STACK" },
  { name: "Lumina Tarot", desc: "Mystical daily companion with sound frequencies", tech: ["Tone.js", "Socket.io", "Framer Motion", "Next.js"], solution: "Lifestyle app", image: "/portfolio/lumina-tarot.png", accent: "#FFB300", slug: "lumina-tarot", cat: "DESIGN" },
  { name: "Sai Pay", desc: "Digital wallet and payment application", tech: ["Next.js", "Recharts", "Radix UI", "Zod"], solution: "Fintech wallet", image: "/portfolio/sai-pay.png", accent: "#B388FF", slug: "sai-pay", cat: "FULL-STACK" },
  { name: "Brorus", desc: "DeFi protocol with smart contracts and Web3", tech: ["Solidity", "Hardhat", "Ethers.js", "Vite"], solution: "DeFi infrastructure", image: "/portfolio/brorus.png", accent: "#FF3D3D", slug: "brorus", cat: "WEB3" },
  { name: "Asean Swap", desc: "Multi-chain token swap exchange", tech: ["React", "Vite", "TanStack Query", "Recharts"], solution: "DEX trading", image: "/portfolio/asean-swap.png", accent: "#FFEB3B", slug: "asean-swap", cat: "WEB3" },
  { name: "ManyMarket", desc: "3D globe marketplace with Three.js", tech: ["Three.js", "R3F", "tsParticles", "Next.js"], solution: "Marketplace aggregation", image: "/portfolio/manymarket.png", accent: "#2979FF", slug: "manymarket", cat: "FULL-STACK" },
];

export function AlphaPortfolio() {
  return (
    <section id="portfolio" className="relative border-t border-border px-3 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 04 / PORTFOLIO</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              SELECTED <span style={{ color: "#FF4500" }}>WORK.</span>
            </h2>
            <p className="mt-2 font-serif text-base italic text-muted-foreground">10 production projects shipped — real repos, real deployments, real users.</p>
          </div>
          <div className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            <span className="text-[#FF4500]">10</span> PROJECTS · <span className="text-[#00FF94]">100%</span> DEPLOYED
          </div>
        </div>

        {/* Maximalist sci-fi portfolio cards */}
        <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PROJECTS.map((p, i) => (
            <a
              key={p.name}
              href={`/portfolio/${p.slug}`}
              className="group relative flex flex-col overflow-hidden border border-border bg-card/30 transition-all hover:border-foreground/40"
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
            >
              {/* === HEADER BAR === */}
              <div className="flex items-center justify-between border-b border-border/40 px-2 py-1">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5" style={{ background: p.accent }} />
                  <span className="font-mono text-[6px] uppercase tracking-[0.16em]" style={{ color: p.accent }}>{p.cat}</span>
                </div>
                <span className="font-mono text-[6px] uppercase tracking-[0.12em] text-muted-foreground">{String(i + 1).padStart(2, "0")}/10</span>
              </div>

              {/* === SCREENSHOT ZONE === */}
              <div className="relative aspect-video overflow-hidden bg-card">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.3"; }}
                />
                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                {/* Scanlines */}
                <div className="pointer-events-none absolute inset-0 opacity-25" style={{ background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)" }} />
                {/* Hazard stripe corner */}
                <div className="absolute right-0 top-0 h-4 w-4" style={{ background: `repeating-linear-gradient(45deg, ${p.accent} 0, ${p.accent} 2px, transparent 2px, transparent 4px)` }} />
                {/* Solution badge */}
                <span className="absolute bottom-1 left-1 border bg-background/70 px-1 py-0.5 font-mono text-[6px] uppercase tracking-[0.1em] backdrop-blur-sm" style={{ borderColor: `${p.accent}44`, color: p.accent }}>
                  {p.solution}
                </span>
                {/* Hover overlay */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: p.accent }}>▸ VIEW CASE STUDY</span>
                </div>
              </div>

              {/* === CONTENT === */}
              <div className="flex flex-1 flex-col p-2">
                <h3 className="font-sans text-xs font-bold uppercase leading-tight tracking-tight transition-colors group-hover:text-[#FF4500]">{p.name}</h3>
                <p className="mt-0.5 font-serif text-[10px] italic text-muted-foreground line-clamp-2">{p.desc}</p>
                {/* Tech tags */}
                <div className="mt-2 flex flex-wrap gap-0.5">
                  {p.tech.map((t) => (
                    <span key={t} className="border px-1 py-0.5 font-mono text-[7px] uppercase tracking-[0.1em] text-muted-foreground" style={{ borderColor: `${p.accent}22` }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Side accent strip */}
              <div className="absolute left-0 top-0 h-full w-0.5 opacity-30 transition-opacity group-hover:opacity-100" style={{ background: p.accent }} />
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(60% 50% at 50% 50%, ${p.accent}08, transparent 70%)` }} />
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 flex items-center justify-between border border-border/60 bg-card/30 p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">▸ WANT TO SEE MORE? CHECK OUR GITHUB</div>
          <a href="https://github.com/0xumaki" target="_blank" rel="noreferrer" className="border border-foreground bg-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80">GITHUB →</a>
        </div>
      </div>
    </section>
  );
}
