"use client";

const SERVICES = [
  { name: "AI Chatbot", icon: "◐", desc: "Custom AI chatbots with multi-model orchestration", price: "from $2,500" },
  { name: "Voice AI", icon: "♫", desc: "Voice agents for sales, support, and automation", price: "from $5,000" },
  { name: "Agent Swarm", icon: "⬡", desc: "Multi-agent systems for complex workflows", price: "from $8,000" },
  { name: "AI Automation", icon: "⚙", desc: "N8N workflows, process automation, CRM loops", price: "from $3,000" },
  { name: "API & MCP", icon: "⌗", desc: "Custom APIs, MCP servers, and integration services", price: "from $4,000" },
  { name: "HERMES / Openclaw / GrokBot", icon: "⚡", desc: "Specialized AI agent platforms and integrations", price: "custom" },
  { name: "AI Video Generation", icon: "▶", desc: "Commercial and MV video generation pipelines", price: "from $2,000" },
  { name: "3D Modeling", icon: "◈", desc: "Product visualization, architectural, and game assets", price: "from $1,500" },
  { name: "Graphic Design", icon: "◆", desc: "Brand identity, marketing collateral, and UI kits", price: "from $1,000" },
  { name: "Content & Copywriting", icon: "✎", desc: "Technical writing, marketing copy, and documentation", price: "from $800" },
  { name: "Online Media Buying", icon: "▲", desc: "Ad campaigns, media strategy, and performance marketing", price: "from $1,500" },
  { name: "UI/UX Design", icon: "◡", desc: "Product design, design systems, and prototyping", price: "from $2,000" },
  { name: "Android & iOS App", icon: "▣", desc: "Native and cross-platform mobile applications", price: "from $10,000" },
  { name: "Web / WebApp", icon: "▣", desc: "Full-stack web applications with modern frameworks", price: "from $5,000" },
  { name: "Chrome Extensions", icon: "⬚", desc: "Browser automation and productivity extensions", price: "from $2,000" },
  { name: "Desktop / MacBook Apps", icon: "◱", desc: "Cross-platform desktop applications (Electron/Tauri)", price: "from $8,000" },
  { name: "ASO", icon: "⊙", desc: "App Store Optimization for mobile and web stores", price: "from $1,000" },
  { name: "Web3 Wallets", icon: "⬡", desc: "Non-custodial wallet development and integration", price: "from $15,000" },
  { name: "AMM / DEX", icon: "⇄", desc: "Automated market maker and DEX protocol development", price: "from $20,000" },
  { name: "DAO Governance", icon: "◍", desc: "DAO frameworks, voting, and treasury management", price: "from $15,000" },
  { name: "NFT Systems", icon: "✦", desc: "NFT minting, marketplace, and royalty infrastructure", price: "from $10,000" },
  { name: "Security Audit", icon: "⚿", desc: "Smart contract and protocol security audits", price: "from $5,000" },
  { name: "Smart Contract Dev", icon: "∎", desc: "Solidity/Rust contract development and deployment", price: "from $8,000" },
  { name: "Bug Bounty", icon: "▣", desc: "Security testing and vulnerability assessment programs", price: "from $3,000" },
  { name: "Money Market Development", icon: "$", desc: "DeFi lending, borrowing, and yield protocols", price: "from $25,000" },
  { name: "CBDC Development", icon: "₵", desc: "Central bank digital currency infrastructure", price: "custom" },
];

export function AlphaServices() {
  return (
    <section id="services" className="border-t border-border px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">▸ 03 / SERVICES</div>
        <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-5xl">
          WHAT WE BUILD.
        </h2>
        <p className="mt-2 max-w-2xl font-serif text-lg italic text-muted-foreground">
          26 services across AI, Web3, and full-stack development. Each with its own detail page, pricing, and comparison tables.
        </p>
        
        <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <a
              key={s.name}
              href={`/services/${s.name.toLowerCase().replace(/\s+/g, "-").replace(/[/&]/g, "")}`}
              className="group flex items-start gap-3 border border-border p-3 transition-colors hover:border-foreground/40 hover:bg-foreground/[0.03]"
            >
              <span className="font-sans text-2xl text-[#FF4500]">{s.icon}</span>
              <div className="flex-1">
                <h3 className="font-sans text-sm font-bold uppercase tracking-tight">{s.name}</h3>
                <p className="font-serif text-xs italic text-muted-foreground">{s.desc}</p>
                <span className="mt-1 inline-block font-mono text-[9px] uppercase tracking-[0.18em] text-[#00FF94]">{s.price}</span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground transition-transform group-hover:translate-x-1">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
