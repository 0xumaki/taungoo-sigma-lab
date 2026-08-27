"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AlphaNav } from "@/components/sigma/alpha/AlphaNav";
import { AlphaFooter } from "@/components/sigma/alpha/AlphaFooter";
import { ADDONS, SERVICE_PRICES, ServiceBasket } from "@/components/sigma/alpha/ServiceBasket";
import { useBasketStore, parsePrice, formatMMK } from "@/lib/sigma/basket";
import { SERVICE_ADDONS, type AddOn } from "@/lib/sigma/addons-data";
import { toast } from "sonner";
import { Plus, Check } from "lucide-react";
import { usePageReveal } from "@/lib/sigma/use-page-reveal";
import { ContactFormModal } from "@/components/sigma/shared/ContactFormModal";
import { SigmaHaggle } from "@/components/sigma/shared/SigmaHaggle";

interface ServiceDetail {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  features: string[];
  packages: { name: string; price: string; intlPrice?: string; marketPrice?: string; features: string[]; popular?: boolean }[];
  comparison: { feature: string; starter: string; pro: string; enterprise: string }[];
}

type CurrencyMode = "LOCAL" | "INTL";

const SERVICES: ServiceDetail[] = [
  { slug:"ai-chatbot",name:"AI Chatbot",icon:"◐",tagline:"Custom AI chatbots with multi-model orchestration",description:"Production-grade AI chatbots that handle real workloads — sales, support, onboarding, and internal tools.",features:["Multi-model orchestration (Zai, Kimi K3, DeepSeek V4)","Custom training on your data","Web, mobile, and API integration","Conversation analytics dashboard","Human handoff escalation","Multi-language support"],packages:[{name:"STARTER",price:"38,400,000 MMK",intlPrice:"$8,000",marketPrice:"$10,800",features:["Single-model AI","Basic conversational","Standard quality","Email support"]},{name:"PRO",price:"120,000,000 MMK",intlPrice:"$25,000",marketPrice:"$33,750",features:["Multi-model orchestration","Advanced reasoning","Better quality","Analytics dashboard","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Full multi-model + RAG","All features unlocked","Highest quality","Custom integrations","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"Model strategy",starter:"single",pro:"multi-model",enterprise:"multi + RAG"},{feature:"Quality tier",starter:"standard",pro:"better",enterprise:"highest"},{feature:"Reasoning",starter:"basic",pro:"advanced",enterprise:"RAG + tools"},{feature:"Analytics",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"voice-ai",name:"Voice AI",icon:"♫",tagline:"Voice agents for sales, support, and automation",description:"Voice AI agents that handle real phone calls with ElevenLabs, Whisper, and sigma-loop stabilization.",features:["Natural voice synthesis (ElevenLabs)","Real-time speech recognition (Whisper)","Function calling for bookings/orders","CRM integration","Multi-language voice","Call recording + transcription"],packages:[{name:"STARTER",price:"57,600,000 MMK",intlPrice:"$12,000",marketPrice:"$16,200",features:["Basic TTS","Standard voice quality","1 language","Email support"]},{name:"PRO",price:"168,000,000 MMK",intlPrice:"$35,000",marketPrice:"$47,250",features:["Natural voice synthesis","Emotion-aware","Better quality","Analytics dashboard","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Emotion transfer + custom cloning","Highest quality","All languages","Custom integrations","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"Quality tier",starter:"standard",pro:"better",enterprise:"highest"},{feature:"Emotion",starter:"—",pro:"emotion-aware",enterprise:"emotion transfer"},{feature:"Voice cloning",starter:"—",pro:"—",enterprise:"✓"},{feature:"Analytics",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"agent-swarm",name:"Agent Swarm",icon:"⬡",tagline:"Multi-agent systems for complex workflows",description:"Coordinated swarms of AI agents for multi-step workflows — research, data enrichment, content generation, code review.",features:["Multi-agent orchestration (up to 50 agents)","Custom agent specialization","Workflow builder (N8N + custom)","Distributed task queue","Real-time monitoring dashboard","API access for external triggers"],packages:[{name:"STARTER",price:"96,000,000 MMK",intlPrice:"$20,000",marketPrice:"$27,000",features:["2-3 agent orchestration","Basic coordination","Single workflow","Email support"]},{name:"PRO",price:"288,000,000 MMK",intlPrice:"$60,000",marketPrice:"$81,000",features:["5-8 agent coordination","ASOP protocol","Multi-workflow","Monitoring dashboard","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["12+ agents","Full ASOP + sigma-variable load balancing","Custom orchestration","Dedicated infrastructure","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"Agent count",starter:"2-3",pro:"5-8",enterprise:"12+"},{feature:"Coordination",starter:"basic",pro:"ASOP",enterprise:"ASOP + sigma-variable"},{feature:"Workflows",starter:"single",pro:"multi",enterprise:"custom"},{feature:"Dashboard",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"ai-automation",name:"AI Automation",icon:"⚙",tagline:"N8N workflows, process automation, CRM loops",description:"Automate business processes with AI-powered N8N pipelines that connect your tools and handle exceptions.",features:["N8N workflow development","200+ app integrations","AI-powered exception handling","Custom API development","Process monitoring + alerting","Team training + documentation"],packages:[{name:"STARTER",price:"24,000,000 MMK",intlPrice:"$5,000",marketPrice:"$6,750",features:["3 basic workflows","Standard integrations","Basic monitoring","Email support"]},{name:"PRO",price:"72,000,000 MMK",intlPrice:"$15,000",marketPrice:"$20,250",features:["10 advanced workflows","Full integrations","Full monitoring","Team training","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Custom development","Dedicated support","SLA + 24/7","Process optimization","Negotiate with us"]}],comparison:[{feature:"Workflows",starter:"3 basic",pro:"10 advanced",enterprise:"custom"},{feature:"Integrations",starter:"standard",pro:"full",enterprise:"custom"},{feature:"Monitoring",starter:"basic",pro:"full",enterprise:"full + 24/7"},{feature:"Training",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"api-mcp",name:"API & MCP Services",icon:"⌗",tagline:"Custom APIs, MCP servers, and integration services",description:"REST/GraphQL APIs, MCP servers, and integration layers with auth, rate limiting, and monitoring.",features:["REST/GraphQL API design","MCP server development","Authentication + rate limiting","API documentation (OpenAPI)","SDK generation","Monitoring + logging"],packages:[{name:"STARTER",price:"38,400,000 MMK",intlPrice:"$8,000",marketPrice:"$10,800",features:["Basic REST API","Standard endpoints","Documentation","Email support"]},{name:"PRO",price:"120,000,000 MMK",intlPrice:"$25,000",marketPrice:"$33,750",features:["Full MCP server","Advanced integrations","SDK generation","Documentation","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Enterprise MCP","Custom protocols","Dedicated infrastructure","SLA + 24/7","Negotiate with us"]}],comparison:[{feature:"API type",starter:"REST",pro:"MCP server",enterprise:"Enterprise MCP"},{feature:"Protocols",starter:"standard",pro:"advanced",enterprise:"custom"},{feature:"SDK",starter:"—",pro:"✓",enterprise:"✓"},{feature:"Docs",starter:"basic",pro:"full",enterprise:"full"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"hermes-openclaw-grokbot",name:"HERMES / Openclaw / GrokBot",icon:"⚡",tagline:"Specialized AI agent platforms and integrations",description:"Custom AI agent platforms built on HERMES, Openclaw, and GrokBot frameworks for enterprise workflows.",features:["HERMES agent platform integration","Openclaw workflow automation","GrokBot custom training","Enterprise security compliance","Custom plugin development","Multi-tenant architecture"],packages:[{name:"STARTER",price:"custom",intlPrice:"custom",features:["Basic platform setup","1 platform","Documentation","Email support"]},{name:"PRO",price:"custom",intlPrice:"custom",features:["Advanced platform","Custom integrations","2 platforms","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Full custom platform","Dedicated infrastructure","All platforms","SLA + 24/7","Negotiate with us"]}],comparison:[{feature:"Setup",starter:"basic",pro:"advanced",enterprise:"full custom"},{feature:"Platforms",starter:"1",pro:"2",enterprise:"all"},{feature:"Integrations",starter:"—",pro:"custom",enterprise:"dedicated infra"},{feature:"Support",starter:"email",pro:"priority",enterprise:"SLA + 24/7"},{feature:"Custom",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"ai-video-generation",name:"AI Video Generation",icon:"▶",tagline:"Commercial and MV video generation pipelines",description:"AI-powered video generation for commercials, music videos, and content marketing.",features:["Text-to-video generation","Music video pipelines","Commercial ad production","Voice + lip sync","Custom AI model fine-tuning","Batch rendering infrastructure"],packages:[{name:"STARTER",price:"7,200,000 MMK",intlPrice:"$1,500",marketPrice:"$2,050",features:["1 video","Standard quality (720p)","1 revision","Email support"]},{name:"PRO",price:"21,600,000 MMK",intlPrice:"$4,500",marketPrice:"$6,100",features:["1 video","Premium quality (1080p)","Better AI models","3 revisions","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Custom plan","4K + custom models","Dedicated pipeline","SLA + 24/7","Negotiate with us"]}],comparison:[{feature:"Quality",starter:"720p",pro:"1080p",enterprise:"4K + custom"},{feature:"AI models",starter:"standard",pro:"better",enterprise:"custom"},{feature:"Revisions",starter:"1",pro:"3",enterprise:"custom"},{feature:"Pipeline",starter:"shared",pro:"shared",enterprise:"dedicated"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"3d-modeling",name:"3D Modeling",icon:"◈",tagline:"Product visualization, architectural, and game assets",description:"3D modeling for product visualization, architectural rendering, and game asset creation.",features:["Product visualization","Architectural rendering","Game asset creation","PBR texturing","3D printing ready files","WebGL / Three.js integration"],packages:[{name:"STARTER",price:"7,200,000 MMK",intlPrice:"$1,500",marketPrice:"$2,050",features:["1 model","Standard quality (low-poly)","1 revision","Email support"]},{name:"PRO",price:"19,200,000 MMK",intlPrice:"$4,000",marketPrice:"$5,400",features:["1 model","Premium quality (high-poly)","PBR textures","3 revisions","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Custom plan","Custom rigging","Animation-ready","Dedicated artist","Negotiate with us"]}],comparison:[{feature:"Quality",starter:"low-poly",pro:"high-poly + PBR",enterprise:"custom rig"},{feature:"Models",starter:"1",pro:"1",enterprise:"custom"},{feature:"Rigging",starter:"—",pro:"—",enterprise:"✓"},{feature:"Animation",starter:"—",pro:"—",enterprise:"ready"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"graphic-design",name:"Graphic Design",icon:"◆",tagline:"Brand identity, marketing collateral, and UI kits",description:"Full-spectrum graphic design — brand identity, marketing collateral, UI kits, and social media assets.",features:["Brand identity design","Marketing collateral","UI/UX design kits","Social media templates","Print-ready files","Vector + raster assets"],packages:[{name:"STARTER",price:"5,800,000 MMK",intlPrice:"$1,200",marketPrice:"$1,600",features:["20 deliverables","Standard quality","1 revision","Email support"]},{name:"PRO",price:"16,800,000 MMK",intlPrice:"$3,500",marketPrice:"$4,750",features:["30 deliverables","Premium quality","3 revisions","Brand guidelines","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Custom plan","Negotiate with us","Special pricing","Full brand system","SLA + 24/7"]}],comparison:[{feature:"Deliverables",starter:"20",pro:"30",enterprise:"custom"},{feature:"Quality",starter:"standard",pro:"premium",enterprise:"custom"},{feature:"Revisions",starter:"1",pro:"3",enterprise:"custom"},{feature:"Brand guide",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"content-copywriting",name:"Content & Copywriting",icon:"✎",tagline:"Technical writing, marketing copy, and documentation",description:"Technical writing, marketing copy, API documentation, and content strategy. AI-assisted + human-edited.",features:["Technical documentation","Marketing copywriting","API docs (OpenAPI)","Blog + article writing","Content strategy","SEO-optimized content"],packages:[{name:"STARTER",price:"3,800,000 MMK",intlPrice:"$800",marketPrice:"$1,100",features:["20 pieces","Standard quality","1 revision","Email support"]},{name:"PRO",price:"12,000,000 MMK",intlPrice:"$2,500",marketPrice:"$3,400",features:["30 pieces","Premium quality","3 revisions","SEO optimization","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Custom plan","Negotiate with us","Special pricing","Content strategy","SLA + 24/7"]}],comparison:[{feature:"Pieces",starter:"20",pro:"30",enterprise:"custom"},{feature:"Quality",starter:"standard",pro:"premium",enterprise:"custom"},{feature:"Revisions",starter:"1",pro:"3",enterprise:"custom"},{feature:"SEO",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"online-media-buying",name:"Online Media Buying",icon:"▲",tagline:"Ad campaigns, media strategy, and performance marketing",description:"Data-driven ad campaigns across Meta, Google, TikTok with real-time optimization.",features:["Meta Ads management","Google Ads management","TikTok Ads","Creative testing","Conversion tracking","ROI reporting"],packages:[{name:"STARTER",price:"7,200,000 MMK",intlPrice:"$1,500",marketPrice:"$2,050",features:["20 ad creatives","Basic campaign","Weekly reports","Email support"]},{name:"PRO",price:"24,000,000 MMK",intlPrice:"$5,000",marketPrice:"$6,750",features:["30 ad creatives","Advanced campaign","Daily reports","Creative testing","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Custom plan","Negotiate with us","Special pricing","Dedicated manager","SLA + 24/7"]}],comparison:[{feature:"Ad creatives",starter:"20",pro:"30",enterprise:"custom"},{feature:"Campaign",starter:"basic",pro:"advanced",enterprise:"custom"},{feature:"Reports",starter:"weekly",pro:"daily",enterprise:"real-time"},{feature:"Testing",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"ui-ux-design",name:"UI/UX Design",icon:"◡",tagline:"Product design, design systems, and prototyping",description:"End-to-end product design — user research, wireframes, high-fidelity prototypes, and design systems.",features:["User research + personas","Wireframing + prototyping","High-fidelity UI design","Design system creation","Usability testing","Figma handoff"],packages:[{name:"STARTER",price:"57,600,000 MMK",intlPrice:"$12,000",marketPrice:"$16,200",features:["10 screens","Standard design system","Wireframes","Figma handoff"]},{name:"PRO",price:"168,000,000 MMK",intlPrice:"$35,000",marketPrice:"$47,250",features:["Up to 30 screens","Premium design system","Advanced prototyping","Hi-fi UI","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Custom plan","Enterprise design system","Design ops","Dedicated team","Negotiate with us"]}],comparison:[{feature:"Design system",starter:"standard",pro:"premium",enterprise:"enterprise + ops"},{feature:"Screens",starter:"10",pro:"up to 30",enterprise:"custom"},{feature:"Prototyping",starter:"wireframe",pro:"advanced",enterprise:"custom"},{feature:"Hi-fi",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"android-ios-app",name:"Android & iOS App",icon:"▣",tagline:"Native and cross-platform mobile applications",description:"Cross-platform mobile apps with React Native / Expo, or native Swift/Kotlin. From MVP to production.",features:["React Native / Expo","Native Swift / Kotlin","Offline-first architecture","Push notifications","In-app purchases","App Store / Play Store submission"],packages:[{name:"STARTER",price:"96,000,000 MMK",intlPrice:"$20,000",marketPrice:"$27,000",features:["MVP app","Basic features","Single platform","Email support"]},{name:"PRO",price:"288,000,000 MMK",intlPrice:"$60,000",marketPrice:"$81,000",features:["Production app","Advanced features","Both platforms","Push notifications","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Enterprise app","All features","Custom integrations","Dedicated team","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"App tier",starter:"MVP",pro:"production",enterprise:"enterprise"},{feature:"Platforms",starter:"1",pro:"both",enterprise:"both + custom"},{feature:"Features",starter:"basic",pro:"advanced",enterprise:"all"},{feature:"Integrations",starter:"—",pro:"push",enterprise:"custom"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"web-webapp",name:"Web / WebApp",icon:"▣",tagline:"Full-stack web applications with modern frameworks",description:"Production web applications built with Next.js, React, and TypeScript. From landing pages to SaaS dashboards.",features:["Next.js + React + TypeScript","Server-side rendering + ISR","Database design (PostgreSQL + Prisma)","Authentication (NextAuth)","Real-time features (WebSocket)","CI/CD pipeline"],packages:[{name:"STARTER",price:"48,000,000 MMK",intlPrice:"$10,000",marketPrice:"$13,500",features:["MVP webapp","Basic pages","Standard design","Email support"]},{name:"PRO",price:"168,000,000 MMK",intlPrice:"$35,000",marketPrice:"$47,250",features:["Production webapp","Advanced features","Responsive","Auth + database","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Enterprise webapp","Custom features","SLA + 24/7","Dedicated team","Negotiate with us"]}],comparison:[{feature:"Tier",starter:"MVP",pro:"production",enterprise:"enterprise"},{feature:"Design",starter:"standard",pro:"responsive",enterprise:"custom"},{feature:"Auth + DB",starter:"—",pro:"✓",enterprise:"✓"},{feature:"Features",starter:"basic",pro:"advanced",enterprise:"custom"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"chrome-extensions",name:"Chrome Extensions",icon:"⬚",tagline:"Browser automation and productivity extensions",description:"Custom Chrome extensions for browser automation, productivity, and workflow enhancement.",features:["Manifest V3 development","Content script injection","Background service workers","Popup + options pages","Chrome Web Store submission","Cross-browser support (Firefox/Edge)"],packages:[{name:"STARTER",price:"19,200,000 MMK",intlPrice:"$4,000",marketPrice:"$5,400",features:["Basic extension","Core features","1 revision","Email support"]},{name:"PRO",price:"57,600,000 MMK",intlPrice:"$12,000",marketPrice:"$16,200",features:["Advanced extension","Full API integration","3 revisions","Web Store submission","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Custom extension","Enterprise features","Custom APIs","SLA + 24/7","Negotiate with us"]}],comparison:[{feature:"Extension tier",starter:"basic",pro:"advanced",enterprise:"custom"},{feature:"API integration",starter:"—",pro:"full",enterprise:"custom"},{feature:"Revisions",starter:"1",pro:"3",enterprise:"custom"},{feature:"Web Store",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"desktop-macbook-apps",name:"Desktop / MacBook Apps",icon:"◱",tagline:"Cross-platform desktop applications (Electron/Tauri)",description:"Desktop applications for Windows, macOS, and Linux using Electron or Tauri. Native performance with web tech.",features:["Electron / Tauri development","Cross-platform (Win/Mac/Linux)","Native menus + tray","Auto-update system","Code signing + notarization","Installer creation"],packages:[{name:"STARTER",price:"120,000,000 MMK",intlPrice:"$25,000",marketPrice:"$33,750",features:["Basic desktop app","Core features","1 platform","Email support"]},{name:"PRO",price:"360,000,000 MMK",intlPrice:"$75,000",marketPrice:"$101,250",features:["Advanced app","Full features","All platforms","Auto-update","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Enterprise app","Custom integrations","Dedicated team","SLA + 24/7","Negotiate with us"]}],comparison:[{feature:"App tier",starter:"basic",pro:"advanced",enterprise:"enterprise"},{feature:"Platforms",starter:"1",pro:"all",enterprise:"all"},{feature:"Auto-update",starter:"—",pro:"✓",enterprise:"✓"},{feature:"Integrations",starter:"—",pro:"—",enterprise:"custom"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"aso",name:"ASO",icon:"⊙",tagline:"App Store Optimization for mobile and web stores",description:"App Store Optimization services to improve visibility and downloads across App Store, Play Store, and Chrome Web Store.",features:["Keyword research + optimization","Store listing optimization","Screenshot + video creation","Review management","A/B testing","Competitor analysis"],packages:[{name:"STARTER",price:"14,400,000 MMK",intlPrice:"$3,000",marketPrice:"$4,050",features:["Basic ASO","1-month retainer","Keyword research","Email support"]},{name:"PRO",price:"33,600,000 MMK",intlPrice:"$7,000",marketPrice:"$9,450",features:["Advanced ASO","3-month retainer","Better optimization","A/B testing","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Full ASO","6-month retainer","Ongoing monitoring","Competitor tracking","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"ASO tier",starter:"basic",pro:"advanced",enterprise:"full"},{feature:"Retainer",starter:"1 month",pro:"3 months",enterprise:"6 months"},{feature:"A/B testing",starter:"—",pro:"✓",enterprise:"✓"},{feature:"Monitoring",starter:"—",pro:"—",enterprise:"ongoing"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"web3-wallets",name:"Web3 Wallets",icon:"⬡",tagline:"Non-custodial wallet development and integration",description:"Custom non-custodial wallet development for web, mobile, and browser extension. Support for EVM chains, Solana, and custom L2s.",features:["Multi-chain support (EVM, Solana, custom)","Non-custodial architecture","Hardware wallet integration (Ledger, Trezor)","Biometric authentication","Transaction simulation + security","Cross-chain swaps"],packages:[{name:"STARTER",price:"86,400,000 MMK",intlPrice:"$18,000",marketPrice:"$24,300",features:["Single-chain wallet","Standard security","Web only","Security review"]},{name:"PRO",price:"240,000,000 MMK",intlPrice:"$50,000",marketPrice:"$67,500",features:["Multi-chain wallet","Advanced security","Hardware wallet support","Web + mobile","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Omnichain wallet","Enterprise security","Custom features","Full audit + bounty","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"Chain support",starter:"single",pro:"multi-chain",enterprise:"omnichain"},{feature:"Security",starter:"standard",pro:"advanced",enterprise:"enterprise"},{feature:"Hardware wallet",starter:"—",pro:"✓",enterprise:"✓"},{feature:"Audit",starter:"review",pro:"full",enterprise:"full + bounty"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"amm-dex",name:"AMM / DEX",icon:"⇄",tagline:"Automated market maker and DEX protocol development",description:"Full DEX development — AMM pools, order books, limit orders, cross-chain swaps, and liquidity management.",features:["Custom AMM (constant product, stable, weighted)","Order book matching engine","Cross-chain swaps (LayerZero, CCIP)","Liquidity management dashboard","MEV protection","Flash loan integration"],packages:[{name:"STARTER",price:"192,000,000 MMK",intlPrice:"$40,000",marketPrice:"$54,000",features:["Single-chain DEX","Standard features","1 pool type","Security review"]},{name:"PRO",price:"432,000,000 MMK",intlPrice:"$90,000",marketPrice:"$121,500",features:["Multi-chain DEX","Advanced features","MEV protection","3 pool types","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Omnichain DEX","Custom features","Full audit","White-label","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"Chain support",starter:"single",pro:"multi-chain",enterprise:"omnichain"},{feature:"Features",starter:"standard",pro:"advanced + MEV",enterprise:"custom"},{feature:"Pool types",starter:"1",pro:"3",enterprise:"custom"},{feature:"Audit",starter:"review",pro:"full",enterprise:"full audit"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"dao-governance",name:"DAO Governance",icon:"◍",tagline:"DAO frameworks, voting, and treasury management",description:"DAO governance platforms with proposal creation, voting mechanisms, and treasury management.",features:["Proposal creation and voting","Quadratic voting","Treasury management","Delegate system","On-chain reputation","IPFS document storage"],packages:[{name:"STARTER",price:"96,000,000 MMK",intlPrice:"$20,000",marketPrice:"$27,000",features:["Basic DAO framework","Standard governance","Treasury view","Email support"]},{name:"PRO",price:"240,000,000 MMK",intlPrice:"$50,000",marketPrice:"$67,500",features:["Advanced DAO","Custom governance","Treasury management","Delegate system","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Full custom DAO","Multi-chain","Custom proposals","Full reputation system","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"DAO tier",starter:"basic",pro:"advanced",enterprise:"full custom"},{feature:"Governance",starter:"standard",pro:"custom",enterprise:"custom"},{feature:"Chain support",starter:"single",pro:"single",enterprise:"multi-chain"},{feature:"Treasury",starter:"view",pro:"manage",enterprise:"full + custom"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"nft-systems",name:"NFT Systems",icon:"✦",tagline:"NFT minting, marketplace, and royalty infrastructure",description:"Full NFT infrastructure — minting contracts, marketplace, royalty enforcement, and metadata management.",features:["NFT minting contracts (ERC-721/1155)","Marketplace development","Royalty enforcement (EIP-2981)","Metadata management (IPFS)","Lazy minting","Batch minting"],packages:[{name:"STARTER",price:"144,000,000 MMK",intlPrice:"$30,000",marketPrice:"$40,500",features:["3,000 NFT images","Standard quality","Basic minting","Email support"]},{name:"PRO",price:"384,000,000 MMK",intlPrice:"$80,000",marketPrice:"$108,000",features:["3,000 NFT images","Advanced quality (better art, metadata, rare traits)","Full marketplace","Royalty enforcement","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Custom plan","Custom smart contract","Marketplace","More quantity in add-ons","Negotiate with us"]}],comparison:[{feature:"NFT count",starter:"3,000",pro:"3,000",enterprise:"custom"},{feature:"Quality",starter:"standard",pro:"advanced",enterprise:"custom"},{feature:"Smart contract",starter:"basic",pro:"standard",enterprise:"custom"},{feature:"Marketplace",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"security-audit",name:"Security Audit",icon:"⚿",tagline:"Smart contract and protocol security audits",description:"Comprehensive security audits for smart contracts, DeFi protocols, and web applications. Manual + automated review.",features:["Smart contract audit","DeFi protocol review","Automated vulnerability scanning","Manual code review","Gas optimization","Audit report + remediation"],packages:[{name:"STARTER",price:"38,400,000 MMK",intlPrice:"$8,000",marketPrice:"$10,800",features:["1 contract audit","Standard depth","Automated scan","Email support"]},{name:"PRO",price:"144,000,000 MMK",intlPrice:"$30,000",marketPrice:"$40,500",features:["3 contract audits","Full depth","Manual review","Remediation support","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Custom plan","More contracts","Negotiate with us","Full audit team","SLA + 24/7"]}],comparison:[{feature:"Contracts",starter:"1",pro:"3",enterprise:"custom"},{feature:"Depth",starter:"standard",pro:"full",enterprise:"custom"},{feature:"Manual review",starter:"—",pro:"✓",enterprise:"✓"},{feature:"Remediation",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"smart-contract-development",name:"Smart Contract Development",icon:"∎",tagline:"Solidity/Rust contract development and deployment",description:"Production-grade smart contract development in Solidity and Rust. Full lifecycle: design, development, testing, auditing, deployment.",features:["Solidity + Rust (Soroban) development","Formal verification","Gas optimization","Upgradeable proxy patterns","On-chain monitoring","Multi-sig deployment"],packages:[{name:"STARTER",price:"24,000,000 MMK",intlPrice:"$5,000",marketPrice:"$6,750",features:["1 contract","Standard quality","Basic testing","Email support"]},{name:"PRO",price:"120,000,000 MMK",intlPrice:"$25,000",marketPrice:"$33,750",features:["3 contracts","Full quality","Test coverage","Gas optimization","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Custom plan","More contracts","Negotiate with us","Formal verification","SLA + 24/7"]}],comparison:[{feature:"Contracts",starter:"1",pro:"3",enterprise:"custom"},{feature:"Quality",starter:"standard",pro:"full",enterprise:"custom"},{feature:"Test coverage",starter:"basic",pro:"full",enterprise:"formal"},{feature:"Gas optimization",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"rwa-development",name:"RWA Development",icon:"▣",tagline:"Real-world asset tokenization + white-label platform licensing",description:"Two services in one: (1) Custom RWA tokenization — tokenize real estate, commodities, invoices, or art with institutional-grade custody, compliance, and oracle infrastructure. (2) White-label RWA platform — license our battle-tested RWA platform, rebrand it, and launch your own tokenization business in weeks, not months.",features:["Custom asset tokenization (real estate, commodities, invoices, art)","White-label platform licensing","Institutional custody integration (Fireblocks, Anchorage, HSM)","Chainlink oracle + proof-of-reserve","KYC/AML + jurisdiction gating","Secondary market (order book, AMM, OTC desk)"],packages:[{name:"STARTER",price:"192,000,000 MMK",intlPrice:"$40,000",marketPrice:"$54,000",features:["1 asset class","Basic tokenization","Standard custody","Proof-of-reserve","Email support"]},{name:"PRO",price:"480,000,000 MMK",intlPrice:"$100,000",marketPrice:"$135,000",features:["White-label platform","3 asset classes","Institutional custody","Secondary market module","Compliance suite","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Full white-label + source code","Unlimited asset classes","Custom reserve model","Multi-jurisdiction","Dedicated team","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"Service type",starter:"tokenization",pro:"white-label platform",enterprise:"full source code license"},{feature:"Asset classes",starter:"1",pro:"3",enterprise:"unlimited"},{feature:"Custody",starter:"standard",pro:"institutional",enterprise:"custom HSM"},{feature:"Secondary market",starter:"—",pro:"✓",enterprise:"custom"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"money-market-development",name:"Money Market Development",icon:"$",tagline:"DeFi lending, borrowing, and yield protocols",description:"DeFi money market protocols — lending, borrowing, yield farming, and interest rate models. Production-ready and audited.",features:["Lending + borrowing pools","Variable interest rate models","Liquidation engine","Yield farming","Flash loans","Cross-chain lending"],packages:[{name:"STARTER",price:"216,000,000 MMK",intlPrice:"$45,000",marketPrice:"$60,750",features:["Basic lending protocol","1 asset","Liquidation","Security review"]},{name:"PRO",price:"576,000,000 MMK",intlPrice:"$120,000",marketPrice:"$162,000",features:["Advanced protocol","5 assets","Full features","Yield farming","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Custom protocol","Cross-chain","Custom interest models","Full audit + bounty","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"Protocol tier",starter:"basic",pro:"advanced",enterprise:"custom"},{feature:"Assets",starter:"1",pro:"5",enterprise:"custom"},{feature:"Cross-chain",starter:"—",pro:"—",enterprise:"✓"},{feature:"Audit",starter:"review",pro:"full",enterprise:"full + bounty"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"stablecoin-development",name:"Stablecoin Development",icon:"₵",tagline:"Banking-grade stablecoin infrastructure for institutions",description:"Enterprise-grade stablecoin development for banks, corporations, and financial institutions. Custom issuance, redemption, compliance, and cross-border settlement infrastructure built to institutional security standards.",features:["Custom stablecoin issuance (fiat-backed, crypto-backed, algorithmic)","Redemption + burning mechanism","Multi-jurisdiction compliance (KYC/AML, MiCA, FATF)","Institutional-grade custody integration","Cross-border settlement rails","Real-time reserve attestation"],packages:[{name:"STARTER",price:"144,000,000 MMK",intlPrice:"$30,000",marketPrice:"$40,500",features:["1 stablecoin asset","Basic issuance + redemption","Standard compliance","Email support"]},{name:"PRO",price:"384,000,000 MMK",intlPrice:"$80,000",marketPrice:"$108,000",features:["3 stablecoin assets","Full compliance suite","Cross-border settlement","Reserve attestation","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["Unlimited assets","Custom reserve model","Multi-jurisdiction","Dedicated team","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"Assets",starter:"1",pro:"3",enterprise:"unlimited"},{feature:"Compliance",starter:"standard",pro:"full suite",enterprise:"multi-jurisdiction"},{feature:"Cross-border",starter:"—",pro:"✓",enterprise:"✓"},{feature:"Reserve attestation",starter:"—",pro:"✓",enterprise:"real-time"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"mobile-web-game-development",name:"Mobile/Web Game Development",icon:"◆",tagline:"Mobile and web-based game development",description:"Mobile and web-based game development using Unity, Phaser, Three.js, and WebGL. From casual games to complex multiplayer experiences with backend infrastructure.",features:["Unity + Phaser + WebGL","2D and 3D game engines","Multiplayer backend (Socket.io)","In-app purchase integration","Ad SDK integration","Cross-platform deployment"],packages:[{name:"STARTER",price:"72,000,000 MMK",intlPrice:"$15,000",marketPrice:"$20,250",features:["Casual game","Single platform","Basic art","Leaderboard","Email support"]},{name:"PRO",price:"240,000,000 MMK",intlPrice:"$50,000",marketPrice:"$67,500",features:["Mid-core game","Multi-platform","Better quality","Multiplayer + IAP","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",intlPrice:"custom",features:["AAA game","All platforms","Custom engine","LiveOps + analytics","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"Game tier",starter:"casual",pro:"mid-core",enterprise:"AAA"},{feature:"Platforms",starter:"1",pro:"multi",enterprise:"all"},{feature:"Engine",starter:"standard",pro:"standard",enterprise:"custom"},{feature:"LiveOps",starter:"—",pro:"—",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
];

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = SERVICES.find((s) => s.slug === slug);
  // Trigger the page reveal animation (panels retract) when this detail page mounts
  usePageReveal();
  const [contactOpen, setContactOpen] = React.useState(false);
  // Currency toggle: LOCAL (MMK) for domestic clients, INTL (USD) for international clients.
  // In INTL mode, the basket is bypassed — international orders go through the contact form
  // (USD invoicing, custom onboarding). The basket remains MMK-only.
  const [currencyMode, setCurrencyMode] = React.useState<CurrencyMode>("LOCAL");
  const isIntl = currencyMode === "INTL";
  const displayPrice = (pkg: { price: string; intlPrice?: string }) =>
    isIntl ? pkg.intlPrice ?? pkg.price : pkg.price;

  if (!service) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6">
        <AlphaNav />
        <div className="mx-auto mt-12 max-w-2xl text-center sm:mt-20">
          <h1 className="font-sans text-3xl font-black uppercase sm:text-4xl">SERVICE NOT FOUND</h1>
          <Link href="/#services" className="mt-4 inline-block border border-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] sm:text-[10px]">← BACK TO SERVICES</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AlphaNav />
      <section className="px-3 pt-20 pb-8 sm:px-6 sm:pt-24">
        <div className="mx-auto w-full max-w-[1600px]">
          <Link href="/#services" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground sm:text-[10px]">← ALL SERVICES</Link>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="font-sans text-5xl font-black text-[#FF4500] sm:text-6xl">{service.icon}</span>
            <div>
              <h1 className="font-sans text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-6xl">{service.name}</h1>
              <p className="mt-1 font-serif text-base italic text-muted-foreground sm:text-lg">{service.tagline}</p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">{service.description}</p>
        </div>
      </section>
      <section className="px-3 py-8 sm:px-6">
        <div className="mx-auto w-full max-w-[1600px]">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:text-[10px]">▸ WHAT'S INCLUDED</h2>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {service.features.map((f) => (
              <div key={f} className="flex items-center gap-2 border border-border/60 p-2 sm:p-2">
                <span className="text-[#00FF94]">▸</span>
                <span className="font-mono text-xs text-foreground/80 sm:text-xs">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-3 py-8 sm:px-6">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:text-[10px]">▸ PRICING — ADD ANY PACKAGE TO BASKET</h2>
              <p className="mt-1 font-serif text-sm italic text-muted-foreground sm:text-sm">Each package is a standalone main service. Add multiple packages to qualify for bulk discounts.</p>
            </div>
            {/* CURRENCY TOGGLE — LOCAL (MMK) ↔ INTERNATIONAL (USD) */}
            <div className="flex items-center gap-2">
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline sm:text-[9px]">▸ CURRENCY</span>
              <div className="flex border border-foreground/60" role="group" aria-label="Pricing currency">
                <button
                  type="button"
                  onClick={() => setCurrencyMode("LOCAL")}
                  aria-pressed={currencyMode === "LOCAL"}
                  className={`flex items-center gap-1.5 border-r border-foreground/60 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all sm:text-[10px] ${
                    currencyMode === "LOCAL"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 ${currencyMode === "LOCAL" ? "bg-[#00FF94]" : "bg-foreground/40"}`} />
                  LOCAL · MMK
                </button>
                <button
                  type="button"
                  onClick={() => setCurrencyMode("INTL")}
                  aria-pressed={currencyMode === "INTL"}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all sm:text-[10px] ${
                    currencyMode === "INTL"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 ${currencyMode === "INTL" ? "bg-[#FF4500]" : "bg-foreground/40"}`} />
                  INTL · USD
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {service.packages.map((pkg) => (
              <div key={pkg.name} className={`relative flex flex-col border p-4 transition-all ${pkg.popular ? "border-[#FF4500] bg-[#FF4500]/5" : "border-border hover:border-foreground/40"}`} style={pkg.popular ? { boxShadow: "0 0 0 1px #FF4500" } : undefined}>
                {pkg.popular && <div className="mb-2 inline-block self-start bg-[#FF4500] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white sm:text-[9px]">MOST POPULAR</div>}
                <h3 className="font-sans text-lg font-bold uppercase sm:text-xl">{pkg.name}</h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <div className="font-sans text-2xl font-black sm:text-3xl">{displayPrice(pkg)}</div>
                  {isIntl && pkg.marketPrice && pkg.intlPrice && pkg.intlPrice !== "custom" && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground line-through sm:text-[9px]">{pkg.marketPrice}</span>
                  )}
                </div>
                {isIntl && pkg.marketPrice && pkg.intlPrice && pkg.intlPrice !== "custom" && (
                  <div className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-[#00FF94]">▾ BELOW MARKET AVG</div>
                )}
                <div className="mt-3 flex-1 space-y-1">
                  {pkg.features.map((f) => (
                    <div key={f} className="flex items-start gap-1.5">
                      <span className="text-[#00FF94]">✓</span>
                      <span className="font-mono text-[10px] leading-snug text-foreground/80 sm:text-[10px]">{f}</span>
                    </div>
                  ))}
                </div>
                <PackageAddButton
                  slug={`${service.slug}-${pkg.name.toLowerCase()}`}
                  name={`${service.name} — ${pkg.name}`}
                  icon={service.icon}
                  price={pkg.price}
                  intlPrice={pkg.intlPrice}
                  currencyMode={currencyMode}
                  popular={pkg.popular}
                  onRequestQuote={() => setContactOpen(true)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-3 py-8 sm:px-6">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:text-[10px]">▸ COMPARISON</h2>
            {/* Active currency indicator — reflects pricing toggle above */}
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[9px]">
              <span className="text-muted-foreground/70">CURRENCY:</span>
              <span className={`border px-1.5 py-0.5 ${isIntl ? "border-[#FF4500] text-[#FF4500]" : "border-[#00FF94] text-[#00FF94]"}`}>
                {isIntl ? "USD" : "MMK"}
              </span>
            </span>
          </div>
          <div className="mt-4 overflow-x-auto sigma-scroll-hidden">
            <table className="w-full min-w-[480px] border border-border">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="p-2 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:p-3 sm:text-[10px]">Feature</th>
                  <th className="p-2 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:p-3 sm:text-[10px]">STARTER</th>
                  <th className="p-2 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF4500] sm:p-3 sm:text-[10px]">PRO</th>
                  <th className="p-2 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:p-3 sm:text-[10px]">ENTERPRISE</th>
                </tr>
              </thead>
              <tbody>
                {service.comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-card/30" : ""}>
                    <td className="p-2 font-mono text-[11px] text-foreground/80 sm:p-3 sm:text-xs">{row.feature}</td>
                    <td className="p-2 font-mono text-[11px] text-muted-foreground sm:p-3 sm:text-xs">{row.starter}</td>
                    <td className="p-2 font-mono text-[11px] text-foreground sm:p-3 sm:text-xs">{row.pro}</td>
                    <td className="p-2 font-mono text-[11px] text-muted-foreground sm:p-3 sm:text-xs">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ADD-ONS & EXTRAS — researched upsell add-ons for this specific service */}
      {SERVICE_ADDONS[service.slug] && SERVICE_ADDONS[service.slug].length > 0 && (
        <section className="border-t border-border px-3 py-8 sm:px-6">
          <div className="mx-auto w-full max-w-[1600px]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00FF94] sm:text-[10px]">▸ ADD-ONS &amp; EXTRAS</h2>
                <p className="mt-1 font-serif text-sm italic text-muted-foreground sm:text-sm">Enhance {service.name} with these researched add-ons. Add-on prices are not discounted.</p>
              </div>
              <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block sm:text-[9px]">
                <span className="text-[#00FF94]">{SERVICE_ADDONS[service.slug].length}</span> ADD-ONS
              </span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_ADDONS[service.slug].map((addon) => (
                <AddOnCard key={addon.id} addon={addon} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMPATIBLE SERVICES — other main services that pair well */}
      {ADDONS[service.slug] && ADDONS[service.slug].length > 0 && (
        <section className="border-t border-border px-3 py-8 sm:px-6">
          <div className="mx-auto w-full max-w-[1600px]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500] sm:text-[10px]">▸ COMPATIBLE SERVICES</h2>
                <p className="mt-1 font-serif text-sm italic text-muted-foreground sm:text-sm">Other main services that pair perfectly with {service.name}. Add them to qualify for bulk discounts.</p>
              </div>
              <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block sm:text-[9px]">
                <span className="text-[#FF4500]">{ADDONS[service.slug].length}</span> COMPATIBLE
              </span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {ADDONS[service.slug].map((cs) => (
                <CompatibleServiceCard key={cs.slug} cs={cs} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-border px-3 py-12 text-center sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-sans text-2xl font-black uppercase tracking-tight sm:text-3xl">NOT SURE WHICH PACKAGE?</h2>
          <p className="mt-2 font-serif text-sm italic text-muted-foreground sm:text-base">Contact our team — we'll help you choose the right plan for your needs.</p>
          <button onClick={() => setContactOpen(true)} className="mt-6 inline-block border border-foreground bg-foreground px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80 sm:px-8 sm:text-[11px]">CONTACT OUR TEAM →</button>
        </div>
      </section>
      <AlphaFooter />
      <ServiceBasket />
      <ContactFormModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <SigmaHaggle />
    </div>
  );
}

// Add-to-basket button for the main service
function AddToBasketButton({ slug, name, icon, price }: { slug: string; name: string; icon: string; price: string }) {
  const { items, addItem } = useBasketStore();
  const inBasket = items.some((i) => i.slug === slug);
  const priceNum = parsePrice(price);

  const handleAdd = () => {
    addItem({ slug, name, type: "service", price: priceNum, icon });
    toast.success(`▮ ${name} ADDED TO BASKET`);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={inBasket}
      className={`flex items-center gap-2 border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] transition-all ${
        inBasket
          ? "border-[#00FF94] bg-[#00FF94]/10 text-[#00FF94]"
          : "border-[#FF4500] bg-[#FF4500] text-black hover:opacity-80"
      }`}
    >
      {inBasket ? (
        <>
          <Check className="h-3.5 w-3.5" /> IN BASKET
        </>
      ) : (
        <>
          <Plus className="h-3.5 w-3.5" /> ADD TO BASKET
        </>
      )}
    </button>
  );
}

// Per-package add-to-basket button — each of STARTER/PRO/ENTERPRISE can be added individually.
// Adding STARTER of AI Chatbot + ENTERPRISE of Voice AI = 2 main services = 7% discount.
//
// Currency mode behavior:
//   - LOCAL  → adds the LOCAL (MMK) price to the basket. Basket is MMK-only.
//   - INTL   → international orders are not self-serve (USD invoicing, custom onboarding).
//              The button becomes "REQUEST QUOTE" and opens the contact modal.
function PackageAddButton({
  slug,
  name,
  icon,
  price,
  intlPrice,
  currencyMode,
  popular,
  onRequestQuote,
}: {
  slug: string;
  name: string;
  icon: string;
  price: string;
  intlPrice?: string;
  currencyMode: CurrencyMode;
  popular?: boolean;
  onRequestQuote: () => void;
}) {
  const { items, addItem } = useBasketStore();
  const inBasket = items.some((i) => i.slug === slug);
  const priceNum = parsePrice(price);
  const isCustom = price === "custom";
  // In INTL mode, the displayed intlPrice (if it's "custom" or absent) also routes to quote
  const isIntlCustom = currencyMode === "INTL" && (!intlPrice || intlPrice === "custom");
  const routeToQuote = isCustom || isIntlCustom || currencyMode === "INTL";

  const handleAdd = () => {
    if (routeToQuote) {
      if (currencyMode === "INTL") {
        toast.info("▮ INTERNATIONAL USD — REQUEST A QUOTE");
      } else if (isCustom) {
        toast.info("▮ CUSTOM PRICING — CONTACT OUR TEAM");
      }
      onRequestQuote();
      return;
    }
    addItem({ slug, name, type: "service", price: priceNum, icon });
    toast.success(`▮ ${name} ADDED TO BASKET`);
  };

  const buttonLabel = inBasket
    ? "IN BASKET"
    : currencyMode === "INTL"
      ? "REQUEST QUOTE"
      : isCustom
        ? "REQUEST QUOTE"
        : "ADD TO BASKET";

  return (
    <button
      onClick={handleAdd}
      disabled={inBasket}
      className={`mt-4 flex w-full items-center justify-center gap-2 border py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all ${
        inBasket
          ? "border-[#00FF94] bg-[#00FF94]/10 text-[#00FF94]"
          : currencyMode === "INTL"
            ? "border-foreground/60 text-foreground hover:border-[#FF4500] hover:text-[#FF4500]"
            : popular
              ? "border-[#FF4500] bg-[#FF4500] text-black hover:opacity-80"
              : "border-foreground/60 text-foreground hover:border-[#FF4500] hover:text-[#FF4500]"
      }`}
    >
      {inBasket ? (
        <>
          <Check className="h-3 w-3" /> IN BASKET
        </>
      ) : (
        <>
          <Plus className="h-3 w-3" /> {buttonLabel}
        </>
      )}
    </button>
  );
}

// Add-on card for real add-ons (extra screens, E2E testing, extra features, etc.)
// These are type "addon" — they do NOT count toward the bulk discount.
function AddOnCard({ addon }: { addon: AddOn }) {
  const { items, addItem } = useBasketStore();
  const inBasket = items.some((i) => i.slug === addon.id);
  const priceNum = parsePrice(addon.price);

  const handleAdd = () => {
    addItem({ slug: addon.id, name: addon.name, type: "addon", price: priceNum, icon: "+" });
    toast.success(`▮ ${addon.name} ADDED AS ADD-ON`);
  };

  return (
    <div
      className="group relative border border-border bg-card/30 transition-all hover:border-[#00FF94]/40"
      style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
    >
      <div className="flex items-center justify-between border-b border-border/40 px-2 py-1">
        <span className={`font-mono text-[10px] uppercase tracking-[0.14em] sm:text-[7px] ${addon.type === "ongoing" ? "text-[#FFB300]" : "text-[#00FF94]"}`}>
          {addon.type === "ongoing" ? "◈ ONGOING" : "▸ ONE-TIME"}
        </span>
      </div>
      <div className="h-0.5 w-full bg-[#00FF94]/30" />
      <div className="p-3">
        <h4 className="font-sans text-xs font-bold uppercase tracking-tight sm:text-xs">{addon.name}</h4>
        <p className="mt-0.5 font-serif text-[10px] italic text-muted-foreground line-clamp-2 sm:text-[10px]">{addon.description}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="min-w-0 flex-1 truncate font-mono text-[10px] uppercase tracking-[0.12em] text-[#00FF94] sm:text-[8px]" title={addon.price}>{addon.price}</span>
          <button
            onClick={handleAdd}
            disabled={inBasket}
            className={`flex shrink-0 items-center gap-1 border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-all sm:text-[8px] ${
              inBasket ? "border-[#00FF94]/40 text-[#00FF94]" : "border-border text-muted-foreground hover:border-[#00FF94] hover:text-[#00FF94]"
            }`}
          >
            {inBasket ? <Check className="h-2.5 w-2.5" /> : <Plus className="h-2.5 w-2.5" />}
            {inBasket ? "ADDED" : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Add-on card for compatible services
function CompatibleServiceCard({ cs }: { cs: { slug: string; name: string; icon: string; price: string; reason: string } }) {
  const { items, addItem } = useBasketStore();
  const inBasket = items.some((i) => i.slug === cs.slug);
  const priceNum = parsePrice(cs.price);

  const handleAdd = () => {
    // Compatible services are OTHER MAIN SERVICES — added as type "service" so they count toward bulk discount
    addItem({ slug: cs.slug, name: cs.name, type: "service", price: priceNum, icon: cs.icon });
    toast.success(`▮ ${cs.name} ADDED TO BASKET`);
  };

  return (
    <div
      className="group relative border border-border bg-card/30 transition-all hover:border-[#FF4500]/40"
      style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
    >
      <div className="h-0.5 w-full bg-[#FF4500]/40" />
      <div className="p-3">
        <div className="flex items-start gap-3">
          <span className="font-sans text-lg text-[#FF4500] sm:text-xl">{cs.icon}</span>
          <div className="min-w-0 flex-1">
            <h4 className="font-sans text-xs font-bold uppercase tracking-tight sm:text-xs">{cs.name}</h4>
            <p className="mt-0.5 font-serif text-[10px] italic text-muted-foreground sm:text-[10px]">{cs.reason}</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="min-w-0 flex-1 truncate font-mono text-[10px] uppercase tracking-[0.12em] text-[#FF4500] sm:text-[8px]" title={cs.price}>{cs.price}</span>
              <button
                onClick={handleAdd}
                disabled={inBasket}
                className={`flex shrink-0 items-center gap-1 border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-all sm:text-[8px] ${
                  inBasket ? "border-[#00FF94]/40 text-[#00FF94]" : "border-border text-muted-foreground hover:border-[#00FF94] hover:text-[#00FF94]"
                }`}
              >
                {inBasket ? <Check className="h-2.5 w-2.5" /> : <Plus className="h-2.5 w-2.5" />}
                {inBasket ? "ADDED" : "ADD"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
