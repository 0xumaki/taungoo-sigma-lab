"use client";

const PROJECTS = [
  { name: "Omnibridge", desc: "Cross-chain bridge protocol for seamless asset transfers", tech: "Solidity, TypeScript, Web3", solution: "Multi-chain interoperability", image: "/portfolio/ominibridge.png" },
  { name: "Dukon Pro", desc: "Private capital real estate investment platform", tech: "Next.js, TypeScript, Prisma", solution: "Real estate tokenization", image: "/portfolio/dukon-pro.png" },
  { name: "Royal DAO", desc: "Decentralized autonomous organization governance platform", tech: "Solidity, React, The Graph", solution: "On-chain governance", image: "/portfolio/royaldao.png" },
  { name: "Vortex Sales OS", desc: "Autonomous AI sales operating system with voice agents", tech: "TypeScript, OpenAI, Twilio", solution: "AI-driven sales automation", image: "/portfolio/vortex-sales-os.png" },
  { name: "GymMaster", desc: "Gym management software with 4-panel split interface", tech: "TypeScript, Next.js, Prisma", solution: "Facility management", image: "/portfolio/gymmaster.png" },
  { name: "Lumina Tarot", desc: "Mystical daily companion for tarot and sound frequencies", tech: "HTML, CSS, JavaScript", solution: "Lifestyle app", image: "/portfolio/lumina-tarot.png" },
  { name: "Sai Pay", desc: "Digital wallet and payment application", tech: "TypeScript, Next.js", solution: "Fintech wallet", image: "/portfolio/sai-pay.png" },
  { name: "Brorus", desc: "Decentralized finance protocol platform", tech: "TypeScript, Solidity", solution: "DeFi infrastructure", image: "/portfolio/brorus.png" },
  { name: "Asean Swap", desc: "Multi-chain token swap exchange", tech: "TypeScript, Web3", solution: "DEX trading", image: "/portfolio/asean-swap.png" },
  { name: "ManyMarket", desc: "Multi-marketplace aggregation platform", tech: "TypeScript, Next.js", solution: "Marketplace aggregation", image: "/portfolio/manymarket.png" },
];

export function AlphaPortfolio() {
  return (
    <section id="portfolio" className="border-t border-border px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">▸ 04 / PORTFOLIO</div>
        <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-5xl">
          SELECTED WORK.
        </h2>
        <p className="mt-2 max-w-2xl font-serif text-lg italic text-muted-foreground">
          10 production projects shipped — real repos, real deployments, real users.
        </p>
        
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <div key={p.name} className="group border border-border overflow-hidden transition-colors hover:border-foreground/40">
              {/* Screenshot */}
              <div className="relative aspect-video overflow-hidden bg-card">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-30" />
                <span className="absolute left-2 top-2 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground drop-shadow-lg">
                  {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                </span>
              </div>
              {/* Content */}
              <div className="p-4">
                <h3 className="font-sans text-lg font-bold uppercase tracking-tight">{p.name}</h3>
                <p className="mt-1 font-serif text-sm italic text-muted-foreground">{p.desc}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{p.tech}</span>
                </div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#00FF94]">
                  ▸ {p.solution}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
