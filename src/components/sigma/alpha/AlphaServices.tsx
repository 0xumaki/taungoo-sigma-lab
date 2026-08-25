"use client";

const SERVICES = [
  { name: "AI Chatbot", icon: "◐", desc: "Custom AI chatbots with multi-model orchestration", price: "from 3,020,000 MMK", cat: "AI" },
  { name: "Voice AI", icon: "♫", desc: "Voice agents for sales, support, and automation", price: "from 6,040,000 MMK", cat: "AI" },
  { name: "Agent Swarm", icon: "⬡", desc: "Multi-agent systems for complex workflows", price: "from 9,660,000 MMK", cat: "AI" },
  { name: "AI Automation", icon: "⚙", desc: "N8N workflows, process automation, CRM loops", price: "from 3,620,000 MMK", cat: "AI" },
  { name: "API & MCP", icon: "⌗", desc: "Custom APIs, MCP servers, and integration services", price: "from 4,830,000 MMK", cat: "AI" },
  { name: "HERMES / Openclaw / GrokBot", icon: "⚡", desc: "Specialized AI agent platforms and integrations", price: "custom", cat: "AI" },
  { name: "AI Video Generation", icon: "▶", desc: "Commercial and MV video generation pipelines", price: "from 2,415,000 MMK", cat: "DESIGN" },
  { name: "3D Modeling", icon: "◈", desc: "Product visualization, architectural, and game assets", price: "from 1,810,000 MMK", cat: "DESIGN" },
  { name: "Graphic Design", icon: "◆", desc: "Brand identity, marketing collateral, and UI kits", price: "from 1,210,000 MMK", cat: "DESIGN" },
  { name: "Content & Copywriting", icon: "✎", desc: "Technical writing, marketing copy, and documentation", price: "from 966,000 MMK", cat: "DESIGN" },
  { name: "Online Media Buying", icon: "▲", desc: "Ad campaigns, media strategy, and performance marketing", price: "from 1,810,000 MMK", cat: "DESIGN" },
  { name: "UI/UX Design", icon: "◡", desc: "Product design, design systems, and prototyping", price: "from 2,415,000 MMK", cat: "DESIGN" },
  { name: "Android & iOS App", icon: "▣", desc: "Native and cross-platform mobile applications", price: "from 12,080,000 MMK", cat: "FULL-STACK" },
  { name: "Web / WebApp", icon: "▣", desc: "Full-stack web applications with modern frameworks", price: "from 6,040,000 MMK", cat: "FULL-STACK" },
  { name: "Chrome Extensions", icon: "⬚", desc: "Browser automation and productivity extensions", price: "from 2,415,000 MMK", cat: "FULL-STACK" },
  { name: "Desktop / MacBook Apps", icon: "◱", desc: "Cross-platform desktop applications (Electron/Tauri)", price: "from 9,660,000 MMK", cat: "FULL-STACK" },
  { name: "ASO", icon: "⊙", desc: "App Store Optimization for mobile and web stores", price: "from 1,210,000 MMK", cat: "FULL-STACK" },
  { name: "Web3 Wallets", icon: "⬡", desc: "Non-custodial wallet development and integration", price: "from 18,110,000 MMK", cat: "WEB3" },
  { name: "AMM / DEX", icon: "⇄", desc: "Automated market maker and DEX protocol development", price: "from 24,150,000 MMK", cat: "WEB3" },
  { name: "DAO Governance", icon: "◍", desc: "DAO frameworks, voting, and treasury management", price: "from 18,110,000 MMK", cat: "WEB3" },
  { name: "NFT Systems", icon: "✦", desc: "NFT minting, marketplace, and royalty infrastructure", price: "from 12,080,000 MMK", cat: "WEB3" },
  { name: "Security Audit", icon: "⚿", desc: "Smart contract and protocol security audits", price: "from 6,040,000 MMK", cat: "WEB3" },
  { name: "Smart Contract Dev", icon: "∎", desc: "Solidity/Rust contract development and deployment", price: "from 9,660,000 MMK", cat: "WEB3" },
  { name: "Bug Bounty", icon: "▣", desc: "Security testing and vulnerability assessment programs", price: "from 3,620,000 MMK", cat: "WEB3" },
  { name: "Money Market Development", icon: "$", desc: "DeFi lending, borrowing, and yield protocols", price: "from 30,190,000 MMK", cat: "WEB3" },
  { name: "CBDC Development", icon: "₵", desc: "Central bank digital currency infrastructure", price: "custom", cat: "WEB3" },
];

const CATEGORIES = [
  { id: "ALL", label: "ALL SERVICES", count: 26, color: "#FF4500" },
  { id: "AI", label: "AI / AUTOMATION", count: 6, color: "#00FF94" },
  { id: "WEB3", label: "WEB3 / BLOCKCHAIN", count: 9, color: "#C6FF00" },
  { id: "FULL-STACK", label: "FULL-STACK", count: 5, color: "#00E5FF" },
  { id: "DESIGN", label: "DESIGN / CONTENT", count: 6, color: "#FF2D7E" },
];

const CAT_COLORS: Record<string, string> = {
  "AI": "#00FF94",
  "WEB3": "#C6FF00",
  "FULL-STACK": "#00E5FF",
  "DESIGN": "#FF2D7E",
};

export function AlphaServices() {
  return (
    <section id="services" className="relative border-t border-border px-6 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header — maximalist */}
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 03 / SERVICES</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              WHAT WE <span style={{ color: "#FF4500" }}>BUILD.</span>
            </h2>
            <p className="mt-2 max-w-2xl font-serif text-base italic text-muted-foreground">
              26 services across AI, Web3, and full-stack development. Each with its own detail page, pricing packages, and comparison tables.
            </p>
          </div>
          <div className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            <span className="text-[#FF4500]">26</span> SERVICES<br />
            <span className="text-[#00FF94]">10</span> DETAIL PAGES<br />
            <span className="text-[#00E5FF]">∞</span> POSSIBILITIES
          </div>
        </div>

        {/* Category tabs — maximalist with counts */}
        <div className="mt-6 flex flex-wrap gap-1">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.id}
              className={`flex items-center gap-1.5 border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] transition-all ${
                i === 0
                  ? "border-[#FF4500] bg-[#FF4500] text-black"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {cat.label}
              <span className={`flex h-4 min-w-4 items-center justify-center px-1 text-[8px] ${i === 0 ? "bg-black/20 text-black" : "bg-foreground/10 text-muted-foreground"}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Service grid — maximalist cards */}
        <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const catColor = CAT_COLORS[s.cat] || "#FF4500";
            return (
              <a
                key={s.name}
                href={`/services/${s.name.toLowerCase().replace(/\s+/g, "-").replace(/[/&]/g, "")}`}
                className="group relative border border-border bg-card/30 p-3 transition-all hover:border-foreground/40 hover:bg-foreground/[0.03]"
              >
                {/* Category accent strip */}
                <div className="absolute left-0 top-0 h-full w-0.5 transition-all group-hover:w-1" style={{ background: catColor }} />

                <div className="flex items-start gap-3">
                  <span className="font-sans text-2xl transition-transform group-hover:scale-110" style={{ color: catColor }}>{s.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-sans text-sm font-bold uppercase tracking-tight">{s.name}</h3>
                    </div>
                    <p className="mt-0.5 font-serif text-xs italic text-muted-foreground">{s.desc}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#00FF94]">{s.price}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-foreground">DETAILS →</span>
                    </div>
                  </div>
                </div>

                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(60% 50% at 50% 50%, ${catColor}10, transparent 70%)` }} />
              </a>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-6 flex items-center justify-between border border-border/60 bg-card/30 p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            ▸ NOT SURE WHICH SERVICE YOU NEED?
          </div>
          <a href="#contact" className="border border-foreground bg-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80">
            CONTACT OUR TEAM →
          </a>
        </div>
      </div>
    </section>
  );
}
