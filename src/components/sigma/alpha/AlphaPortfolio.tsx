"use client";

const PROJECTS = [
  { name: "Omnibridge", desc: "Cross-chain bridge protocol with MCP & A2A server", tech: ["Solidity", "TypeScript", "Web3"], solution: "Multi-chain interoperability", image: "/portfolio/ominibridge.png", accent: "#00FF94", slug: "omnibridge" },
  { name: "Dukon Pro", desc: "Private capital real estate investment platform", tech: ["Next.js", "TypeScript", "Prisma"], solution: "Real estate tokenization", image: "/portfolio/dukon-pro.png", accent: "#FF4500", slug: "dukon-pro" },
  { name: "Royal DAO", desc: "Decentralized autonomous organization governance", tech: ["Solidity", "React", "The Graph"], solution: "On-chain governance", image: "/portfolio/royaldao.png", accent: "#C6FF00", slug: "royaldao" },
  { name: "Vortex Sales OS", desc: "Autonomous AI sales operating system with voice agents", tech: ["TypeScript", "OpenAI", "Twilio"], solution: "AI-driven sales automation", image: "/portfolio/vortex-sales-os.png", accent: "#00E5FF", slug: "vortex-sales-os" },
  { name: "GymMaster", desc: "Gym management software with 4-panel split interface", tech: ["TypeScript", "Next.js", "Prisma"], solution: "Facility management", image: "/portfolio/gymmaster.png", accent: "#FF2D7E", slug: "gymmaster" },
  { name: "Lumina Tarot", desc: "Mystical daily companion for tarot and sound frequencies", tech: ["HTML", "CSS", "JavaScript"], solution: "Lifestyle app", image: "/portfolio/lumina-tarot.png", accent: "#FFB300", slug: "lumina-tarot" },
  { name: "Sai Pay", desc: "Digital wallet and payment application", tech: ["TypeScript", "Next.js"], solution: "Fintech wallet", image: "/portfolio/sai-pay.png", accent: "#B388FF", slug: "sai-pay" },
  { name: "Brorus", desc: "Decentralized finance protocol platform", tech: ["TypeScript", "Solidity"], solution: "DeFi infrastructure", image: "/portfolio/brorus.png", accent: "#FF3D3D", slug: "brorus" },
  { name: "Asean Swap", desc: "Multi-chain token swap exchange", tech: ["TypeScript", "Web3"], solution: "DEX trading", image: "/portfolio/asean-swap.png", accent: "#FFEB3B", slug: "asean-swap" },
  { name: "ManyMarket", desc: "Multi-marketplace aggregation platform", tech: ["TypeScript", "Next.js"], solution: "Marketplace aggregation", image: "/portfolio/manymarket.png", accent: "#2979FF", slug: "manymarket" },
];

export function AlphaPortfolio() {
  return (
    <section id="portfolio" className="relative border-t border-border px-6 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header — maximalist */}
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 04 / PORTFOLIO</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              SELECTED <span style={{ color: "#FF4500" }}>WORK.</span>
            </h2>
            <p className="mt-2 max-w-2xl font-serif text-base italic text-muted-foreground">
              10 production projects shipped — real repos, real deployments, real users.
            </p>
          </div>
          <div className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            <span className="text-[#FF4500]">10</span> PROJECTS<br />
            <span className="text-[#00FF94]">100%</span> DEPLOYED<br />
            <span className="text-[#00E5FF]">∞</span> COMMITS
          </div>
        </div>

        {/* Project grid — maximalist cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <a
              key={p.name}
              href={`/portfolio/${p.slug}`}
              className="group relative block border border-border overflow-hidden transition-all duration-300 hover:border-foreground/40"
            >
              {/* Top accent bar */}
              <div className="absolute left-0 top-0 z-20 h-0.5 w-full" style={{ background: p.accent }} />

              {/* Screenshot */}
              <div className="relative aspect-video overflow-hidden bg-card">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.3"; }}
                />
                <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-30" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Project number */}
                <span className="absolute left-2 top-3 border border-foreground/30 bg-background/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground backdrop-blur-sm">
                  {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                </span>

                {/* Solution badge */}
                <span className="absolute right-2 top-3 border bg-background/70 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] backdrop-blur-sm" style={{ borderColor: `${p.accent}66`, color: p.accent }}>
                  {p.solution}
                </span>

                {/* Hover overlay */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: p.accent }}>▸ VIEW CASE STUDY</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-sans text-lg font-bold uppercase tracking-tight transition-colors group-hover:text-[#FF4500]">{p.name}</h3>
                <p className="mt-1 font-serif text-sm italic text-muted-foreground">{p.desc}</p>
                {/* Tech tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.tech.map((t) => (
                    <span key={t} className="border border-border/60 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(60% 50% at 50% 50%, ${p.accent}10, transparent 70%)` }}
              />
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 flex items-center justify-between border border-border/60 bg-card/30 p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            ▸ WANT TO SEE MORE? CHECK OUR GITHUB
          </div>
          <a href="https://github.com/0xumaki" target="_blank" rel="noreferrer" className="border border-foreground bg-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80">
            GITHUB →
          </a>
        </div>
      </div>
    </section>
  );
}
