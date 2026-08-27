"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AlphaNav } from "@/components/sigma/alpha/AlphaNav";
import { AlphaFooter } from "@/components/sigma/alpha/AlphaFooter";
import { SciFiCard } from "@/components/sigma/alpha/SciFiCard";
import { ClassifiedCover } from "@/components/sigma/shared/ClassifiedCover";
import { usePageReveal } from "@/lib/sigma/use-page-reveal";
import { ContactFormModal } from "@/components/sigma/shared/ContactFormModal";

const PROJECTS: Record<string, {
  name: string;
  tagline: string;
  desc: string;
  image: string;
  tech: string[];
  category: string;
  loc: string;
  size: string;
  features: string[];
  challenge: string;
  approach: string;
  outcome: string;
  created: string;
}> = {
  "omnibridge": {
    name: "Omnibridge",
    tagline: "Cross-chain bridge protocol with MCP & A2A server",
    desc: "A multi-chain interoperability protocol with an MCP server layer for AI agent orchestration. Supports EVM chains with real-time transaction monitoring.",
    image: "/portfolio/ominibridge.png",
    tech: ["TypeScript", "Solidity", "Express", "GraphQL", "React", "MySQL", "Redis", "SQLite", "Python", "Docker"],
    category: "WEB3",
    loc: "~48,000 LOC",
    size: "49.2 MB",
    features: ["Cross-chain asset bridging", "MCP server for AI agents", "A2A protocol support", "GraphQL API layer", "Multi-database support (MySQL, Redis, SQLite)", "Docker deployment"],
    challenge: "Building a bridge protocol that supports both traditional asset transfers and AI agent communication via MCP, across multiple chains with different finality windows.",
    approach: "Designed a modular architecture with Express API servers, GraphQL for flexible queries, Solidity bridge contracts, and a Python-based MCP server layer. Used Redis for caching and MySQL for persistent state.",
    outcome: "Deployed with ~48,000 lines of code across the codebase. Supports EVM chain bridging with MCP integration for autonomous AI agent operations.",
    created: "2026-08-17",
  },
  "dukon-pro": {
    name: "Dukon Pro",
    tagline: "Private capital real estate investment platform",
    desc: "A real estate tokenization platform with fractional ownership, automated distributions, and a comprehensive investor portal.",
    image: "/portfolio/dukon-pro.png",
    tech: ["Next.js", "TypeScript", "Prisma", "NextAuth", "Radix UI", "Tailwind CSS", "Recharts", "Framer Motion", "React Hook Form", "Zod"],
    category: "FULL-STACK",
    loc: "~12,000 LOC",
    size: "12.1 MB",
    features: ["Fractional property ownership", "Investor portal with dashboards", "NextAuth authentication", "Prisma ORM database", "Recharts analytics", "Multi-language (next-intl)", "Responsive design system"],
    challenge: "Creating a compliant real estate investment platform that handles legal requirements, investor onboarding, and portfolio management in one unified interface.",
    approach: "Built with Next.js App Router, Prisma for database management, NextAuth for authentication, and a comprehensive Radix UI component library. Used Recharts for investment analytics and Framer Motion for transitions.",
    outcome: "Production-ready platform with full authentication, database layer, and analytics. The Radix UI integration provides 30+ accessible components out of the box.",
    created: "2026-07-14",
  },
  "vortex-sales-os": {
    name: "Vortex Sales OS",
    tagline: "Autonomous AI sales operating system with voice agents",
    desc: "An AI-powered sales platform with CRM automation, real-time analytics, and Socket.io for live communication.",
    image: "/portfolio/vortex-sales-os.png",
    tech: ["Next.js", "TypeScript", "Prisma", "NextAuth", "Socket.io", "Radix UI", "Tailwind CSS", "Recharts", "Framer Motion", "Zod"],
    category: "AI",
    loc: "~8,500 LOC",
    size: "2.1 MB",
    features: ["Real-time CRM with Socket.io", "Multi-model AI orchestration", "Sales analytics dashboard", "Automated follow-up pipelines", "NextAuth authentication", "Prisma database layer", "Recharts performance metrics"],
    challenge: "Building a sales OS that combines real-time communication (Socket.io), AI orchestration, and CRM functionality without performance degradation.",
    approach: "Used Next.js with Socket.io for real-time features, Prisma for data management, and a comprehensive Radix UI component system. The AI layer orchestrates multiple models for different sales tasks.",
    outcome: "~8,500 lines of code building a full sales automation platform with real-time features, AI orchestration, and complete CRM functionality. Socket.io enables live agent communication.",
    created: "2026-08-11",
  },
  "gymmaster": {
    name: "GymMaster",
    tagline: "Gym management software with QR code integration",
    desc: "A comprehensive gym management platform with member tracking, class scheduling, QR code check-ins, and analytics.",
    image: "/portfolio/gymmaster.png",
    tech: ["Next.js", "TypeScript", "Prisma", "NextAuth", "QRCode React", "Radix UI", "Tailwind CSS", "Recharts", "Framer Motion", "Zod"],
    category: "FULL-STACK",
    loc: "~4,200 LOC",
    size: "1.3 MB",
    features: ["Member management", "QR code check-in system", "Class scheduling", "Automated billing", "Attendance analytics", "Equipment tracking", "Recharts dashboards"],
    challenge: "Building a gym management system that handles member check-ins via QR codes, class scheduling, and billing in one cohesive platform.",
    approach: "Built with Next.js and Prisma for data management. Integrated qrcode.react for check-in generation and Recharts for attendance analytics. Used the full Radix UI component suite for the interface.",
    outcome: "Production-ready gym management system with QR code check-in, scheduling, and analytics. The platform handles member lifecycle from signup to attendance tracking.",
    created: "2026-07-10",
  },
  "lumina-tarot": {
    name: "Lumina Tarot",
    tagline: "Mystical daily companion with sound frequencies",
    desc: "A lifestyle app combining tarot readings with Web Audio API sound therapy, built with a rich multimedia stack.",
    image: "/portfolio/lumina-tarot.png",
    tech: ["Next.js", "TypeScript", "Prisma", "Tone.js", "Socket.io", "Radix UI", "Tailwind CSS", "Recharts", "Framer Motion", "Zod"],
    category: "DESIGN",
    loc: "~210,000 LOC",
    size: "212 MB",
    features: ["Daily tarot draws with animations", "Web Audio API sound therapy (Tone.js)", "Real-time features (Socket.io)", "Mood tracking and journaling", "Custom card spreads", "Reading history with analytics"],
    challenge: "Combining mystical tarot readings with precise Web Audio API sound frequencies while maintaining a beautiful, performant user experience.",
    approach: "Used Tone.js for Web Audio API sound generation, Socket.io for real-time features, and Framer Motion for card flip animations. Built on Next.js with Prisma for data persistence.",
    outcome: "~210,000 lines of code building a feature-rich lifestyle app with 212MB of assets. The Tone.js integration enables precise sound frequency therapy alongside tarot readings.",
    created: "2026-07-31",
  },
  "sai-pay": {
    name: "Sai Pay",
    tagline: "Digital wallet and payment application",
    desc: "A fintech wallet application with transaction management, analytics, and a clean mobile-first interface.",
    image: "/portfolio/sai-pay.png",
    tech: ["Next.js", "TypeScript", "Radix UI", "Tailwind CSS", "Recharts", "React Hook Form", "Zod", "Framer Motion", "Embla Carousel"],
    category: "FULL-STACK",
    loc: "~3,800 LOC",
    size: "1.2 MB",
    features: ["Transaction management", "Balance dashboard", "Recharts analytics", "Carousel onboarding", "Form validation (Zod)", "Responsive mobile design"],
    challenge: "Creating a secure, intuitive payment wallet that handles transactions while maintaining a smooth user experience on mobile devices.",
    approach: "Built with Next.js and Radix UI for accessible components. Used Recharts for spending analytics, Embla Carousel for onboarding, and React Hook Form with Zod for validated inputs.",
    outcome: "6 commits delivering a complete fintech wallet with transaction tracking, analytics dashboard, and mobile-optimized interface.",
    created: "2025-08-30",
  },
  "brorus": {
    name: "Brorus",
    tagline: "DeFi protocol with smart contracts and Web3 integration",
    desc: "A decentralized finance platform built with Hardhat, Ethers.js, and Solidity smart contracts.",
    image: "/portfolio/brorus.png",
    tech: ["React", "Vite", "TypeScript", "Solidity", "Hardhat", "Ethers.js", "Web3.js", "Tailwind CSS", "Framer Motion", "QRCode React"],
    category: "WEB3",
    loc: "~2,500 LOC",
    size: "748 KB",
    features: ["Solidity smart contracts", "Hardhat development environment", "Ethers.js + Web3.js integration", "QR code wallet connections", "DeFi staking interface", "Animated transitions"],
    challenge: "Building a DeFi protocol that's both secure (audited smart contracts) and usable (clean React interface with Web3 wallet integration).",
    approach: "Used Hardhat for Solidity contract development and testing. Built the frontend with Vite + React, integrated Ethers.js and Web3.js for blockchain communication, and added QR code support for wallet connections.",
    outcome: "8 commits delivering a DeFi platform with smart contracts, Hardhat tooling, and dual Web3 library support (Ethers.js + Web3.js).",
    created: "2025-06-29",
  },
  "asean-swap": {
    name: "Asean Swap",
    tagline: "Multi-chain DEX with React Router and TanStack Query",
    desc: "A decentralized exchange supporting multi-chain token swaps with real-time price data.",
    image: "",
    tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "TanStack Query", "React Router", "Recharts", "Framer Motion", "Zod", "React Transition Group"],
    category: "WEB3",
    loc: "~4,200 LOC",
    size: "960 KB",
    features: ["Multi-chain swap interface", "TanStack Query for data fetching", "React Router navigation", "Recharts price charts", "Animated transitions", "Form validation"],
    challenge: "Building a DEX interface that handles real-time price data, multi-chain support, and smooth user experience without performance issues.",
    approach: "Built with Vite + React for fast builds, TanStack Query for efficient data fetching and caching, React Router for multi-page navigation, and Recharts for real-time price visualization.",
    outcome: "A production-ready DEX interface with efficient data fetching, real-time charts, and smooth page transitions. The TanStack Query integration ensures optimal performance.",
    created: "2025-07-02",
  },
  "manymarket": {
    name: "ManyMarket",
    tagline: "3D globe marketplace with Three.js and particles",
    desc: "A visually stunning marketplace platform with a 3D globe visualization, particle effects, and immersive animations.",
    image: "",
    tech: ["Next.js", "TypeScript", "Three.js", "React Three Fiber", "Three Globe", "tsParticles", "Framer Motion", "Tailwind CSS", "Tabler Icons"],
    category: "FULL-STACK",
    loc: "~12,000 LOC",
    size: "114 MB",
    features: ["3D globe visualization (Three.js)", "React Three Fiber integration", "Particle effects (tsParticles)", "Animated marketplace UI", "Immersive scroll experience", "Responsive design"],
    challenge: "Creating a marketplace that stands out visually with 3D globe visualization and particle effects while maintaining performance and usability.",
    approach: "Used Three.js with React Three Fiber for 3D globe rendering, tsParticles for ambient particle effects, and Framer Motion for smooth animations. Built on Next.js for SSR and SEO.",
    outcome: "A visually immersive marketplace platform with 114MB of 3D assets, particle systems, and a globe visualization. The Three.js integration creates a unique brand experience.",
    created: "2025-07-02",
  },
};

export default function PortfolioCaseStudy() {
  const params = useParams();
  const slug = params.slug as string;
  const project = PROJECTS[slug];
  // Trigger the page reveal animation (panels retract) when this case study mounts
  usePageReveal();
  const [contactOpen, setContactOpen] = React.useState(false);

  if (!project) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6">
        <AlphaNav />
        <div className="mx-auto mt-12 max-w-2xl text-center sm:mt-20">
          <h1 className="font-sans text-3xl font-black uppercase sm:text-4xl">PROJECT NOT FOUND</h1>
          <Link href="/#portfolio" className="mt-4 inline-block border border-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] sm:text-[10px]">
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
      <section className="px-3 pt-20 pb-8 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-5xl">
          <Link href="/#portfolio" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground sm:text-[10px]">
            ← ALL PROJECTS
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] sm:text-[9px]" style={{ color: project.category === "WEB3" ? "#C6FF00" : project.category === "AI" ? "#00FF94" : project.category === "DESIGN" ? "#FF2D7E" : "#00E5FF" }}>
              {project.category}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-[9px]">{project.created}</span>
          </div>
          <h1 className="mt-2 font-sans text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-6xl">{project.name}</h1>
          <p className="mt-2 font-serif text-base italic text-muted-foreground sm:text-lg">{project.tagline}</p>
        </div>
      </section>

      {/* Screenshot */}
      <section className="px-3 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden border border-border">
            {project.image ? (
              <img src={project.image} alt={project.name} className="h-auto w-full" />
            ) : (
              /* Retro brutalist glitching green PC screen — replaces the old
                 "[ SCREENSHOT CLASSIFIED ]" cover. */
              <div className="aspect-video w-full">
                <ClassifiedCover variant="page" className="h-full w-full" />
              </div>
            )}
            <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-30" />
          </div>
        </div>
      </section>

      {/* Real metrics — from GitHub data */}
      <section className="px-3 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-3 gap-px border border-border bg-border/40">
            <div className="bg-card/60 p-3 text-center sm:p-4">
              <div className="font-sans text-xl font-black text-[#FF4500] sm:text-3xl">{project.loc}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[9px] sm:tracking-[0.18em]">LINES OF CODE</div>
            </div>
            <div className="bg-card/60 p-3 text-center sm:p-4">
              <div className="font-sans text-xl font-black text-[#00FF94] sm:text-3xl">{project.tech.length}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[9px] sm:tracking-[0.18em]">TECH STACK</div>
            </div>
            <div className="bg-card/60 p-3 text-center sm:p-4">
              <div className="font-sans text-xl font-black text-[#00E5FF] sm:text-3xl">{project.size}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[9px] sm:tracking-[0.18em]">CODEBASE SIZE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge / Approach / Outcome */}
      <section className="px-3 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl space-y-6">
          {([
            ["CHALLENGE", project.challenge, "#FF4500"],
            ["APPROACH", project.approach, "#00E5FF"],
            ["OUTCOME", project.outcome, "#00FF94"],
          ] as const).map(([label, text, color]) => (
            <SciFiCard key={label} accent={color} label={`▸ ${label}`}>
              <div className="p-4 sm:p-4">
                <p className="font-serif text-sm italic leading-relaxed text-foreground/85 sm:text-base">{text}</p>
              </div>
            </SciFiCard>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-3 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:text-[10px]">▸ FEATURES</h2>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {project.features.map((f) => (
              <div key={f} className="flex items-center gap-2 border border-border/60 p-2 sm:p-2">
                <span className="text-[#00FF94]">▸</span>
                <span className="font-mono text-xs text-foreground/80 sm:text-xs">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack — accurate from GitHub */}
      <section className="px-3 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:text-[10px]">▸ TECH STACK</h2>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[9px]">
            Verified from package.json · {project.tech.length} dependencies
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground sm:text-[10px]">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-3 py-12 text-center sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-sans text-2xl font-black uppercase tracking-tight sm:text-3xl">WANT A SIMILAR PROJECT?</h2>
          <p className="mt-2 font-serif text-sm italic text-muted-foreground sm:text-base">Contact our team — we'll build it for you.</p>
          <button onClick={() => setContactOpen(true)} className="mt-6 inline-block border border-foreground bg-foreground px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80 sm:px-8 sm:text-[11px]">
            CONTACT OUR TEAM →
          </button>
        </div>
      </section>

      <AlphaFooter />
      <ContactFormModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
