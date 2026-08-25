"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AlphaNav } from "@/components/sigma/alpha/AlphaNav";
import { AlphaFooter } from "@/components/sigma/alpha/AlphaFooter";

const PROJECTS: Record<string, {
  name: string;
  tagline: string;
  desc: string;
  image: string;
  tech: string[];
  solution: string;
  features: string[];
  metrics: [string, string][];
  challenge: string;
  approach: string;
  outcome: string;
}> = {
  "omnibridge": {
    name: "Omnibridge",
    tagline: "Cross-chain bridge protocol with MCP & A2A server",
    desc: "A multi-chain interoperability protocol enabling seamless asset transfers between blockchains with an MCP server for AI agent orchestration.",
    image: "/portfolio/ominibridge.png",
    tech: ["Solidity", "TypeScript", "Web3.js", "Node.js"],
    solution: "Multi-chain interoperability",
    features: ["Cross-chain asset bridging", "MCP server for AI agents", "A2A protocol support", "Real-time transaction monitoring", "Multi-signature security", "Gas optimization"],
    metrics: [["CHAINS", "6"], ["TVL", "$2.4M"], ["TRANSACTIONS", "12k+"]],
    challenge: "Building a secure, gas-efficient cross-chain bridge that supports both traditional asset transfers and AI agent orchestration via MCP.",
    approach: "Designed a modular architecture with separate bridge contracts per chain, a central orchestrator, and an MCP server layer for AI agent communication.",
    outcome: "Deployed on 6 chains with $2.4M TVL, processing 12,000+ transactions. The MCP integration allows AI agents to execute cross-chain operations autonomously.",
  },
  "dukon-pro": {
    name: "Dukon Pro",
    tagline: "Private capital real estate investment platform",
    desc: "A real estate tokenization platform enabling fractional ownership of premium properties with automated dividend distribution.",
    image: "/portfolio/dukon-pro.png",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    solution: "Real estate tokenization",
    features: ["Fractional property ownership", "Automated dividend distribution", "KYC/AML integration", "Secondary market trading", "Property management dashboard", "Investor portal"],
    metrics: [["PROPERTIES", "24"], ["INVESTORS", "1.2k"], ["VOLUME", "$8.4M"]],
    challenge: "Creating a compliant real estate investment platform that handles both legal requirements and user experience for non-technical investors.",
    approach: "Built a full-stack Next.js application with Prisma ORM, integrated KYC providers, and automated dividend smart contracts.",
    outcome: "24 properties tokenized with 1,200+ investors and $8.4M in transaction volume.",
  },
  "royaldao": {
    name: "Royal DAO",
    tagline: "Decentralized autonomous organization governance",
    desc: "A DAO governance platform with proposal creation, voting, and treasury management — backed by real-world assets.",
    image: "/portfolio/royaldao.png",
    tech: ["Solidity", "React", "The Graph", "IPFS"],
    solution: "On-chain governance",
    features: ["Proposal creation and voting", "Quadratic voting", "Treasury management", "Delegate system", "On-chain reputation", "IPFS document storage"],
    metrics: [["PROPOSALS", "48"], ["VOTERS", "3.4k"], ["TREASURY", "$12M"]],
    challenge: "Building a governance system that's both secure and usable, with real-world asset backing and quadratic voting for fair representation.",
    approach: "Developed modular smart contracts with OpenZeppelin governance, integrated The Graph for indexing, and built a React frontend with wallet integration.",
    outcome: "48 proposals passed with 3,400+ unique voters and a $12M treasury managed on-chain.",
  },
  "vortex-sales-os": {
    name: "Vortex Sales OS",
    tagline: "Autonomous AI sales operating system",
    desc: "An AI-powered sales platform with voice agents, CRM automation, and self-learning loops that optimize conversion rates.",
    image: "/portfolio/vortex-sales-os.png",
    tech: ["TypeScript", "OpenAI", "Twilio", "Next.js"],
    solution: "AI-driven sales automation",
    features: ["Voice AI agent for calls", "Multi-model orchestration", "CRM integration", "Self-learning loops", "Real-time analytics", "Automated follow-ups"],
    metrics: [["CALLS/DAY", "500+"], ["CONVERSION", "+22%"], ["TIME SAVED", "80%"]],
    challenge: "Creating an AI sales agent that handles real phone calls, integrates with CRM systems, and improves over time through reinforcement learning.",
    approach: "Built a multi-model orchestration layer with Whisper for speech-to-text, ElevenLabs for voice synthesis, and a sigma-variable stabilizer for the learning loop.",
    outcome: "500+ calls per day, 22% improvement in conversion rates, and 80% reduction in manual sales work.",
  },
  "gymmaster": {
    name: "GymMaster",
    tagline: "Gym management software with 4-panel split interface",
    desc: "A comprehensive gym management platform with member management, scheduling, billing, and analytics in a unique 4-panel split interface.",
    image: "/portfolio/gymmaster.png",
    tech: ["TypeScript", "Next.js", "Prisma", "PostgreSQL"],
    solution: "Facility management",
    features: ["Member management", "Class scheduling", "Automated billing", "Attendance tracking", "Equipment management", "Analytics dashboard"],
    metrics: [["FACILITIES", "15"], ["MEMBERS", "8.5k"], ["CLASSES/DAY", "60+"]],
    challenge: "Designing a gym management system that shows all critical information at once without overwhelming the user.",
    approach: "Created a 4-panel split-screen interface showing members, schedule, analytics, and tasks simultaneously with real-time updates.",
    outcome: "Deployed in 15 facilities managing 8,500+ members and 60+ classes per day.",
  },
  "lumina-tarot": {
    name: "Lumina Tarot",
    tagline: "Mystical daily companion for tarot and sound frequencies",
    desc: "A lifestyle app combining tarot readings with sound therapy frequencies for daily mindfulness and manifestation.",
    image: "/portfolio/lumina-tarot.png",
    tech: ["HTML", "CSS", "JavaScript"],
    solution: "Lifestyle app",
    features: ["Daily tarot draws", "Sound frequency therapy", "Manifestation journal", "Reading history", "Custom spreads", "Mood tracking"],
    metrics: [["USERS", "4.2k"], ["READINGS", "120k"], ["RATING", "4.8★"]],
    challenge: "Creating a beautiful, mystical experience that's also functional and performs well on mobile devices.",
    approach: "Built with vanilla HTML/CSS/JS for maximum performance, with CSS animations for card flips and Web Audio API for sound frequencies.",
    outcome: "4,200+ active users with 120k readings generated and a 4.8-star rating.",
  },
  "sai-pay": {
    name: "Sai Pay",
    tagline: "Digital wallet and payment application",
    desc: "A fintech wallet application with peer-to-peer transfers, bill payments, and QR code scanning.",
    image: "/portfolio/sai-pay.png",
    tech: ["TypeScript", "Next.js", "Prisma"],
    solution: "Fintech wallet",
    features: ["P2P transfers", "Bill payments", "QR code scanning", "Transaction history", "Multi-currency", "Biometric auth"],
    metrics: [["USERS", "2.8k"], ["TRANSACTIONS", "45k"], ["VOLUME", "$340k"]],
    challenge: "Building a secure payment app with a smooth user experience and proper transaction handling.",
    approach: "Developed with Next.js and Prisma, integrated with payment gateways, and added biometric authentication for security.",
    outcome: "2,800 users with 45,000 transactions processing $340k in volume.",
  },
  "brorus": {
    name: "Brorus",
    tagline: "Decentralized finance protocol platform",
    desc: "A DeFi platform offering staking, yield farming, and governance tokens with a focus on security and transparency.",
    image: "/portfolio/brorus.png",
    tech: ["TypeScript", "Solidity", "React"],
    solution: "DeFi infrastructure",
    features: ["Staking pools", "Yield farming", "Governance tokens", "Liquidity mining", "Security audits", "Real-time APY"],
    metrics: [["TVL", "$1.8M"], ["HOLDERS", "2.1k"], ["AUDITS", "3"]],
    challenge: "Creating a DeFi protocol that's both profitable for users and secure against common smart contract vulnerabilities.",
    approach: "Built with audited Solidity contracts, a React frontend, and integrated with multiple security audit firms.",
    outcome: "$1.8M TVL with 2,100 token holders and 3 successful security audits.",
  },
  "asean-swap": {
    name: "Asean Swap",
    tagline: "Multi-chain token swap exchange",
    desc: "A DEX supporting multi-chain token swaps with automated market maker pools and minimal slippage.",
    image: "/portfolio/asean-swap.png",
    tech: ["TypeScript", "Web3.js", "Solidity"],
    solution: "DEX trading",
    features: ["Multi-chain swaps", "AMM pools", "Liquidity provision", "Price charts", "Slippage protection", "MEV resistance"],
    metrics: [["PAIRS", "48"], ["VOLUME", "$5.6M"], ["LIQUIDITY", "$890k"]],
    challenge: "Building a DEX that supports multiple chains while maintaining low slippage and protecting users from MEV attacks.",
    approach: "Developed AMM smart contracts with multi-chain support via LayerZero, and built a TypeScript frontend with real-time price charts.",
    outcome: "48 trading pairs with $5.6M volume and $890k in liquidity.",
  },
  "manymarket": {
    name: "ManyMarket",
    tagline: "Multi-marketplace aggregation platform",
    desc: "A platform aggregating multiple marketplaces into one unified interface for buyers and sellers.",
    image: "/portfolio/manymarket.png",
    tech: ["TypeScript", "Next.js"],
    solution: "Marketplace aggregation",
    features: ["Multi-marketplace search", "Unified cart", "Price comparison", "Seller dashboard", "Inventory sync", "Automated listings"],
    metrics: [["MARKETPLACES", "6"], ["LISTINGS", "120k"], ["USERS", "3.5k"]],
    challenge: "Integrating with multiple marketplace APIs while maintaining a unified user experience and real-time inventory sync.",
    approach: "Built a Next.js application with API integrations for 6 marketplaces, real-time webhooks for inventory, and a unified cart system.",
    outcome: "6 marketplaces integrated with 120k aggregated listings and 3,500 active users.",
  },
};

export default function PortfolioCaseStudy() {
  const params = useParams();
  const slug = params.slug as string;
  const project = PROJECTS[slug];

  if (!project) {
    return (
      <div className="min-h-screen bg-background p-6">
        <AlphaNav />
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <h1 className="font-sans text-4xl font-black uppercase">PROJECT NOT FOUND</h1>
          <Link href="/#portfolio" className="mt-4 inline-block border border-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em]">
            ← BACK TO PORTFOLIO
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AlphaNav />

      {/* Hero */}
      <section className="px-6 pt-24 pb-8">
        <div className="mx-auto max-w-5xl">
          <Link href="/#portfolio" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
            ← ALL PROJECTS
          </Link>
          <h1 className="mt-4 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">{project.name}</h1>
          <p className="mt-2 font-serif text-lg italic text-muted-foreground">{project.tagline}</p>
        </div>
      </section>

      {/* Screenshot */}
      <section className="px-6">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden border border-border">
            <img src={project.image} alt={project.name} className="w-full" />
            <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-30" />
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-3 gap-px border border-border bg-border/40">
            {project.metrics.map(([k, v]) => (
              <div key={k} className="bg-card/60 p-4 text-center">
                <div className="font-sans text-3xl font-black text-[#FF4500]">{v}</div>
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge / Approach / Outcome */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-5xl space-y-6">
          {[
            ["CHALLENGE", project.challenge, "#FF4500"],
            ["APPROACH", project.approach, "#00E5FF"],
            ["OUTCOME", project.outcome, "#00FF94"],
          ].map(([label, text, color]) => (
            <div key={label as string} className="border-l-4 pl-4" style={{ borderColor: color as string }}>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: color as string }}>▸ {label as string}</h2>
              <p className="mt-1 font-serif text-base italic leading-relaxed text-foreground/85">{text as string}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">▸ FEATURES</h2>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {project.features.map((f) => (
              <div key={f} className="flex items-center gap-2 border border-border/60 p-2">
                <span className="text-[#00FF94]">▸</span>
                <span className="font-mono text-xs text-foreground/80">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">▸ TECH STACK</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-sans text-3xl font-black uppercase tracking-tight">WANT A SIMILAR PROJECT?</h2>
          <p className="mt-2 font-serif text-base italic text-muted-foreground">Contact our team — we'll build it for you.</p>
          <a href="mailto:contact@taungoosigma.lab" className="mt-6 inline-block border border-foreground bg-foreground px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80">
            CONTACT OUR TEAM →
          </a>
        </div>
      </section>

      <AlphaFooter />
    </div>
  );
}
