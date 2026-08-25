"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AlphaNav } from "@/components/sigma/alpha/AlphaNav";
import { AlphaFooter } from "@/components/sigma/alpha/AlphaFooter";

interface ServiceDetail {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  features: string[];
  packages: {
    name: string;
    price: string;
    features: string[];
    popular?: boolean;
  }[];
  comparison: {
    feature: string;
    starter: string;
    pro: string;
    enterprise: string;
  }[];
}

const SERVICES: ServiceDetail[] = [
  {
    slug: "ai-chatbot",
    name: "AI Chatbot",
    icon: "◐",
    tagline: "Custom AI chatbots with multi-model orchestration",
    description: "We build production-grade AI chatbots that handle real workloads — sales, support, onboarding, and internal tools. Multi-model orchestration means your bot uses the right model for each task, optimizing for cost and quality.",
    features: ["Multi-model orchestration (GPT-4, Claude, Llama)", "Custom training on your data", "Web, mobile, and API integration", "Conversation analytics dashboard", "Human handoff escalation", "Multi-language support"],
    packages: [
      { name: "STARTER", price: "$2,500", features: ["1 channel (web)", "10k messages/mo", "2 models", "Email support"] },
      { name: "PRO", price: "$5,000", features: ["3 channels", "50k messages/mo", "5 models", "Analytics dashboard", "Priority support"], popular: true },
      { name: "ENTERPRISE", price: "custom", features: ["Unlimited channels", "Custom volume", "All models + fine-tuned", "Dedicated manager", "SLA + 24/7 support"] },
    ],
    comparison: [
      { feature: "Messages/mo", starter: "10k", pro: "50k", enterprise: "unlimited" },
      { feature: "Models", starter: "2", pro: "5", enterprise: "all + custom" },
      { feature: "Channels", starter: "1", pro: "3", enterprise: "unlimited" },
      { feature: "Analytics", starter: "—", pro: "✓", enterprise: "✓" },
      { feature: "SLA", starter: "—", pro: "—", enterprise: "✓" },
    ],
  },
  {
    slug: "voice-ai",
    name: "Voice AI",
    icon: "♫",
    tagline: "Voice agents for sales, support, and automation",
    description: "Voice AI agents that handle real phone calls — sales, support, scheduling, and intake. Built with ElevenLabs, Whisper, and our proprietary sigma-loop stabilizer for natural-sounding conversations.",
    features: ["Natural voice synthesis (ElevenLabs)", "Real-time speech recognition (Whisper)", "Function calling for bookings/orders", "CRM integration", "Multi-language voice", "Call recording + transcription"],
    packages: [
      { name: "STARTER", price: "$5,000", features: ["100 calls/mo", "1 language", "Basic CRM", "Email support"] },
      { name: "PRO", price: "$12,000", features: ["500 calls/mo", "3 languages", "Full CRM integration", "Analytics dashboard", "Priority support"], popular: true },
      { name: "ENTERPRISE", price: "custom", features: ["Unlimited calls", "All languages", "Custom integrations", "Dedicated infrastructure", "SLA + 24/7 support"] },
    ],
    comparison: [
      { feature: "Calls/mo", starter: "100", pro: "500", enterprise: "unlimited" },
      { feature: "Languages", starter: "1", pro: "3", enterprise: "all" },
      { feature: "CRM Integration", starter: "basic", pro: "full", enterprise: "custom" },
      { feature: "Recording", starter: "✓", pro: "✓", enterprise: "✓" },
      { feature: "SLA", starter: "—", pro: "—", enterprise: "✓" },
    ],
  },
  {
    slug: "agent-swarm",
    name: "Agent Swarm",
    icon: "⬡",
    tagline: "Multi-agent systems for complex workflows",
    description: "Coordinated swarms of AI agents that handle multi-step workflows — research, data enrichment, content generation, code review, and more. Each agent specializes in one task; the swarm orchestrator manages handoffs.",
    features: ["Multi-agent orchestration (up to 50 agents)", "Custom agent specialization", "Workflow builder (N8N + custom)", "Distributed task queue", "Real-time monitoring dashboard", "API access for external triggers"],
    packages: [
      { name: "STARTER", price: "$8,000", features: ["5 agents", "1k tasks/mo", "Basic workflows", "Email support"] },
      { name: "PRO", price: "$20,000", features: ["20 agents", "10k tasks/mo", "Custom workflows", "Monitoring dashboard", "Priority support"], popular: true },
      { name: "ENTERPRISE", price: "custom", features: ["50+ agents", "Unlimited tasks", "Bespoke orchestration", "Dedicated infrastructure", "SLA + 24/7 support"] },
    ],
    comparison: [
      { feature: "Agents", starter: "5", pro: "20", enterprise: "50+" },
      { feature: "Tasks/mo", starter: "1k", pro: "10k", enterprise: "unlimited" },
      { feature: "Workflows", starter: "basic", pro: "custom", enterprise: "bespoke" },
      { feature: "Dashboard", starter: "—", pro: "✓", enterprise: "✓" },
      { feature: "SLA", starter: "—", pro: "—", enterprise: "✓" },
    ],
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    icon: "⚙",
    tagline: "N8N workflows, process automation, CRM loops",
    description: "Automate your business processes with AI-powered workflows. We build N8N pipelines that connect your tools, automate repetitive tasks, and use AI to handle exceptions — reducing manual work by up to 80%.",
    features: ["N8N workflow development", "200+ app integrations", "AI-powered exception handling", "Custom API development", "Process monitoring + alerting", "Team training + documentation"],
    packages: [
      { name: "STARTER", price: "$3,000", features: ["3 workflows", "10 integrations", "Basic monitoring", "Email support"] },
      { name: "PRO", price: "$8,000", features: ["10 workflows", "Unlimited integrations", "Full monitoring", "Team training", "Priority support"], popular: true },
      { name: "ENTERPRISE", price: "custom", features: ["Unlimited workflows", "Custom development", "Dedicated support", "SLA + 24/7", "Process optimization"] },
    ],
    comparison: [
      { feature: "Workflows", starter: "3", pro: "10", enterprise: "unlimited" },
      { feature: "Integrations", starter: "10", pro: "unlimited", enterprise: "unlimited" },
      { feature: "Monitoring", starter: "basic", pro: "full", enterprise: "full" },
      { feature: "Training", starter: "—", pro: "✓", enterprise: "✓" },
      { feature: "SLA", starter: "—", pro: "—", enterprise: "✓" },
    ],
  },
  {
    slug: "api-mcp",
    name: "API & MCP Services",
    icon: "⌗",
    tagline: "Custom APIs, MCP servers, and integration services",
    description: "We design and build REST/GraphQL APIs, MCP (Model Context Protocol) servers, and integration layers that connect your systems. Production-ready with auth, rate limiting, and monitoring.",
    features: ["REST/GraphQL API design", "MCP server development", "Authentication + rate limiting", "API documentation (OpenAPI)", "SDK generation", "Monitoring + logging"],
    packages: [
      { name: "STARTER", price: "$4,000", features: ["1 API endpoint", "Basic auth", "Documentation", "Email support"] },
      { name: "PRO", price: "$10,000", features: ["10 endpoints", "Full auth + rate limiting", "SDK generation", "Monitoring", "Priority support"], popular: true },
      { name: "ENTERPRISE", price: "custom", features: ["Unlimited endpoints", "MCP server", "Custom integrations", "Dedicated infrastructure", "SLA + 24/7"] },
    ],
    comparison: [
      { feature: "Endpoints", starter: "1", pro: "10", enterprise: "unlimited" },
      { feature: "Auth", starter: "basic", pro: "full", enterprise: "custom" },
      { feature: "SDK", starter: "—", pro: "✓", enterprise: "✓" },
      { feature: "Monitoring", starter: "—", pro: "✓", enterprise: "✓" },
      { feature: "SLA", starter: "—", pro: "—", enterprise: "✓" },
    ],
  },
  {
    slug: "web3-wallets",
    name: "Web3 Wallets",
    icon: "⬡",
    tagline: "Non-custodial wallet development and integration",
    description: "Custom non-custodial wallet development for web, mobile, and browser extension. Support for EVM chains, Solana, and custom L2s. Security audited and production-ready.",
    features: ["Multi-chain support (EVM, Solana, custom)", "Non-custodial architecture", "Hardware wallet integration (Ledger, Trezor)", "Biometric authentication", "Transaction simulation + security", "Cross-chain swaps"],
    packages: [
      { name: "STARTER", price: "$15,000", features: ["1 chain", "Web only", "Basic wallet functions", "Security review"] },
      { name: "PRO", price: "$30,000", features: ["5 chains", "Web + mobile", "Hardware wallet support", "Full audit", "Priority support"], popular: true },
      { name: "ENTERPRISE", price: "custom", features: ["All chains", "All platforms", "Custom features", "Full audit + bug bounty", "SLA + 24/7"] },
    ],
    comparison: [
      { feature: "Chains", starter: "1", pro: "5", enterprise: "all" },
      { feature: "Platforms", starter: "web", pro: "web+mobile", enterprise: "all" },
      { feature: "Hardware wallet", starter: "—", pro: "✓", enterprise: "✓" },
      { feature: "Audit", starter: "review", pro: "full", enterprise: "full + bounty" },
      { feature: "SLA", starter: "—", pro: "—", enterprise: "✓" },
    ],
  },
  {
    slug: "smart-contract-development",
    name: "Smart Contract Development",
    icon: "∎",
    tagline: "Solidity/Rust contract development and deployment",
    description: "Production-grade smart contract development in Solidity and Rust (Soroban). Full lifecycle: design, development, testing, auditing, deployment, and monitoring.",
    features: ["Solidity + Rust (Soroban) development", "Formal verification", "Gas optimization", "Upgradeable proxy patterns", "On-chain monitoring", "Multi-sig deployment"],
    packages: [
      { name: "STARTER", price: "$8,000", features: ["1 contract", "Basic testing", "Deployment", "Email support"] },
      { name: "PRO", price: "$20,000", features: ["5 contracts", "Full test suite", "Gas optimization", "Monitoring", "Priority support"], popular: true },
      { name: "ENTERPRISE", price: "custom", features: ["Unlimited contracts", "Formal verification", "Custom architecture", "Full audit", "SLA + 24/7"] },
    ],
    comparison: [
      { feature: "Contracts", starter: "1", pro: "5", enterprise: "unlimited" },
      { feature: "Testing", starter: "basic", pro: "full", enterprise: "formal" },
      { feature: "Gas optimization", starter: "—", pro: "✓", enterprise: "✓" },
      { feature: "Monitoring", starter: "—", pro: "✓", enterprise: "✓" },
      { feature: "SLA", starter: "—", pro: "—", enterprise: "✓" },
    ],
  },
  {
    slug: "dex-amm",
    name: "AMM / DEX",
    icon: "⇄",
    tagline: "Automated market maker and DEX protocol development",
    description: "Full DEX development — AMM pools, order books, limit orders, cross-chain swaps, and liquidity management. Deployed on EVM chains with sub-second finality.",
    features: ["Custom AMM (constant product, stable, weighted)", "Order book matching engine", "Cross-chain swaps (LayerZero, CCIP)", "Liquidity management dashboard", "MEV protection", "Flash loan integration"],
    packages: [
      { name: "STARTER", price: "$20,000", features: ["1 AMM pool type", "1 chain", "Basic frontend", "Security review"] },
      { name: "PRO", price: "$50,000", features: ["3 pool types", "3 chains", "Full DEX frontend", "Full audit", "Priority support"], popular: true },
      { name: "ENTERPRISE", price: "custom", features: ["Custom pool types", "All chains", "White-label DEX", "Full audit + bounty", "SLA + 24/7"] },
    ],
    comparison: [
      { feature: "Pool types", starter: "1", pro: "3", enterprise: "custom" },
      { feature: "Chains", starter: "1", pro: "3", enterprise: "all" },
      { feature: "Frontend", starter: "basic", pro: "full", enterprise: "white-label" },
      { feature: "Audit", starter: "review", pro: "full", enterprise: "full + bounty" },
      { feature: "SLA", starter: "—", pro: "—", enterprise: "✓" },
    ],
  },
  {
    slug: "web-webapp",
    name: "Web / WebApp",
    icon: "▣",
    tagline: "Full-stack web applications with modern frameworks",
    description: "Production web applications built with Next.js, React, and TypeScript. From landing pages to complex SaaS dashboards — we build scalable, performant, and maintainable web apps.",
    features: ["Next.js + React + TypeScript", "Server-side rendering + ISR", "Database design (PostgreSQL + Prisma)", "Authentication (NextAuth)", "Real-time features (WebSocket)", "CI/CD pipeline"],
    packages: [
      { name: "STARTER", price: "$5,000", features: ["5 pages", "Basic CMS", "Responsive design", "Email support"] },
      { name: "PRO", price: "$15,000", features: ["20 pages", "Full CMS + dashboard", "Auth + database", "Real-time features", "Priority support"], popular: true },
      { name: "ENTERPRISE", price: "custom", features: ["Unlimited pages", "Custom architecture", "Microservices", "Dedicated team", "SLA + 24/7"] },
    ],
    comparison: [
      { feature: "Pages", starter: "5", pro: "20", enterprise: "unlimited" },
      { feature: "CMS", starter: "basic", pro: "full", enterprise: "custom" },
      { feature: "Auth", starter: "—", pro: "✓", enterprise: "✓" },
      { feature: "Real-time", starter: "—", pro: "✓", enterprise: "✓" },
      { feature: "SLA", starter: "—", pro: "—", enterprise: "✓" },
    ],
  },
  {
    slug: "android-ios-app",
    name: "Android & iOS App",
    icon: "▣",
    tagline: "Native and cross-platform mobile applications",
    description: "Cross-platform mobile apps with React Native / Expo, or native Swift/Kotlin. From MVP to production — App Store and Play Store ready.",
    features: ["React Native / Expo (cross-platform)", "Native Swift / Kotlin (optional)", "Offline-first architecture", "Push notifications", "In-app purchases", "App Store / Play Store submission"],
    packages: [
      { name: "STARTER", price: "$10,000", features: ["5 screens", "1 platform", "Basic API", "Email support"] },
      { name: "PRO", price: "$25,000", features: ["15 screens", "Both platforms", "Full API + auth", "Push notifications", "Priority support"], popular: true },
      { name: "ENTERPRISE", price: "custom", features: ["Unlimited screens", "Both + web", "Custom integrations", "Dedicated team", "SLA + 24/7"] },
    ],
    comparison: [
      { feature: "Screens", starter: "5", pro: "15", enterprise: "unlimited" },
      { feature: "Platforms", starter: "1", pro: "both", enterprise: "both + web" },
      { feature: "Push notifications", starter: "—", pro: "✓", enterprise: "✓" },
      { feature: "IAP", starter: "—", pro: "✓", enterprise: "✓" },
      { feature: "SLA", starter: "—", pro: "—", enterprise: "✓" },
    ],
  },
];

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-background p-6">
        <AlphaNav />
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <h1 className="font-sans text-4xl font-black uppercase">SERVICE NOT FOUND</h1>
          <Link href="/#services" className="mt-4 inline-block border border-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em]">
            ← BACK TO SERVICES
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AlphaNav />
      
      {/* Hero */}
      <section className="px-6 pt-24 pb-12">
        <div className="mx-auto max-w-5xl">
          <Link href="/#services" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
            ← ALL SERVICES
          </Link>
          <div className="mt-6 flex items-center gap-4">
            <span className="font-sans text-6xl font-black text-[#FF4500]">{service.icon}</span>
            <div>
              <h1 className="font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">{service.name}</h1>
              <p className="font-serif text-lg italic text-muted-foreground">{service.tagline}</p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl font-serif text-base leading-relaxed text-muted-foreground">{service.description}</p>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">▸ WHAT'S INCLUDED</h2>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {service.features.map((f) => (
              <div key={f} className="flex items-center gap-2 border border-border p-2">
                <span className="text-[#00FF94]">▸</span>
                <span className="font-mono text-xs text-foreground/80">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-border px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">▸ PRICING</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {service.packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`border p-4 ${pkg.popular ? "border-[#FF4500] bg-[#FF4500]/5" : "border-border"}`}
              style={pkg.popular ? { boxShadow: "0 0 0 1px #FF4500" } : undefined}
              >
                {pkg.popular && (
                  <div className="mb-2 inline-block bg-[#FF4500] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="font-sans text-xl font-bold uppercase">{pkg.name}</h3>
                <div className="mt-1 font-sans text-3xl font-black">{pkg.price}</div>
                <div className="mt-3 space-y-1">
                  {pkg.features.map((f) => (
                    <div key={f} className="flex items-center gap-1.5">
                      <span className="text-[#00FF94]">✓</span>
                      <span className="font-mono text-[10px] text-foreground/80">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="border-t border-border px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">▸ COMPARISON</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border border-border">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="p-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Feature</th>
                  <th className="p-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">STARTER</th>
                  <th className="p-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF4500]">PRO</th>
                  <th className="p-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">ENTERPRISE</th>
                </tr>
              </thead>
              <tbody>
                {service.comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-card/30" : ""}>
                    <td className="p-3 font-mono text-xs text-foreground/80">{row.feature}</td>
                    <td className="p-3 font-mono text-xs text-muted-foreground">{row.starter}</td>
                    <td className="p-3 font-mono text-xs text-foreground">{row.pro}</td>
                    <td className="p-3 font-mono text-xs text-muted-foreground">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-sans text-3xl font-black uppercase tracking-tight">NOT SURE WHICH PACKAGE?</h2>
          <p className="mt-2 font-serif text-base italic text-muted-foreground">
            Contact our team — we'll help you choose the right plan for your needs.
          </p>
          <a href="mailto:contact@taungoosigma.lab" className="mt-6 inline-block border border-foreground bg-foreground px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80">
            CONTACT OUR TEAM →
          </a>
        </div>
      </section>

      <AlphaFooter />
    </div>
  );
}
