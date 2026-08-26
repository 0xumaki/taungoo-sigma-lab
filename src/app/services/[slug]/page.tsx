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

interface ServiceDetail {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  features: string[];
  packages: { name: string; price: string; features: string[]; popular?: boolean }[];
  comparison: { feature: string; starter: string; pro: string; enterprise: string }[];
}

const SERVICES: ServiceDetail[] = [
  { slug:"ai-chatbot",name:"AI Chatbot",icon:"◐",tagline:"Custom AI chatbots with multi-model orchestration",description:"Production-grade AI chatbots that handle real workloads — sales, support, onboarding, and internal tools.",features:["Multi-model orchestration (Zai, Kimi K3, DeepSeek V4)","Custom training on your data","Web, mobile, and API integration","Conversation analytics dashboard","Human handoff escalation","Multi-language support"],packages:[{name:"STARTER",price:"3,020,000 MMK",features:["Single-model AI","Basic conversational","Standard quality","Email support"]},{name:"PRO",price:"6,040,000 MMK",features:["Multi-model orchestration","Advanced reasoning","Better quality","Analytics dashboard","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Full multi-model + RAG","All features unlocked","Highest quality","Custom integrations","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"Model strategy",starter:"single",pro:"multi-model",enterprise:"multi + RAG"},{feature:"Quality tier",starter:"standard",pro:"better",enterprise:"highest"},{feature:"Reasoning",starter:"basic",pro:"advanced",enterprise:"RAG + tools"},{feature:"Analytics",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"voice-ai",name:"Voice AI",icon:"♫",tagline:"Voice agents for sales, support, and automation",description:"Voice AI agents that handle real phone calls with ElevenLabs, Whisper, and sigma-loop stabilization.",features:["Natural voice synthesis (ElevenLabs)","Real-time speech recognition (Whisper)","Function calling for bookings/orders","CRM integration","Multi-language voice","Call recording + transcription"],packages:[{name:"STARTER",price:"6,040,000 MMK",features:["Basic TTS","Standard voice quality","1 language","Email support"]},{name:"PRO",price:"14,490,000 MMK",features:["Natural voice synthesis","Emotion-aware","Better quality","Analytics dashboard","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Emotion transfer + custom cloning","Highest quality","All languages","Custom integrations","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"Quality tier",starter:"standard",pro:"better",enterprise:"highest"},{feature:"Emotion",starter:"—",pro:"emotion-aware",enterprise:"emotion transfer"},{feature:"Voice cloning",starter:"—",pro:"—",enterprise:"✓"},{feature:"Analytics",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"agent-swarm",name:"Agent Swarm",icon:"⬡",tagline:"Multi-agent systems for complex workflows",description:"Coordinated swarms of AI agents for multi-step workflows — research, data enrichment, content generation, code review.",features:["Multi-agent orchestration (up to 50 agents)","Custom agent specialization","Workflow builder (N8N + custom)","Distributed task queue","Real-time monitoring dashboard","API access for external triggers"],packages:[{name:"STARTER",price:"9,660,000 MMK",features:["2-3 agent orchestration","Basic coordination","Single workflow","Email support"]},{name:"PRO",price:"24,150,000 MMK",features:["5-8 agent coordination","ASOP protocol","Multi-workflow","Monitoring dashboard","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["12+ agents","Full ASOP + sigma-variable load balancing","Custom orchestration","Dedicated infrastructure","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"Agent count",starter:"2-3",pro:"5-8",enterprise:"12+"},{feature:"Coordination",starter:"basic",pro:"ASOP",enterprise:"ASOP + sigma-variable"},{feature:"Workflows",starter:"single",pro:"multi",enterprise:"custom"},{feature:"Dashboard",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"ai-automation",name:"AI Automation",icon:"⚙",tagline:"N8N workflows, process automation, CRM loops",description:"Automate business processes with AI-powered N8N pipelines that connect your tools and handle exceptions.",features:["N8N workflow development","200+ app integrations","AI-powered exception handling","Custom API development","Process monitoring + alerting","Team training + documentation"],packages:[{name:"STARTER",price:"3,620,000 MMK",features:["3 basic workflows","Standard integrations","Basic monitoring","Email support"]},{name:"PRO",price:"9,660,000 MMK",features:["10 advanced workflows","Full integrations","Full monitoring","Team training","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Custom development","Dedicated support","SLA + 24/7","Process optimization","Negotiate with us"]}],comparison:[{feature:"Workflows",starter:"3 basic",pro:"10 advanced",enterprise:"custom"},{feature:"Integrations",starter:"standard",pro:"full",enterprise:"custom"},{feature:"Monitoring",starter:"basic",pro:"full",enterprise:"full + 24/7"},{feature:"Training",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"api-mcp",name:"API & MCP Services",icon:"⌗",tagline:"Custom APIs, MCP servers, and integration services",description:"REST/GraphQL APIs, MCP servers, and integration layers with auth, rate limiting, and monitoring.",features:["REST/GraphQL API design","MCP server development","Authentication + rate limiting","API documentation (OpenAPI)","SDK generation","Monitoring + logging"],packages:[{name:"STARTER",price:"4,830,000 MMK",features:["Basic REST API","Standard endpoints","Documentation","Email support"]},{name:"PRO",price:"12,080,000 MMK",features:["Full MCP server","Advanced integrations","SDK generation","Documentation","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Enterprise MCP","Custom protocols","Dedicated infrastructure","SLA + 24/7","Negotiate with us"]}],comparison:[{feature:"API type",starter:"REST",pro:"MCP server",enterprise:"Enterprise MCP"},{feature:"Protocols",starter:"standard",pro:"advanced",enterprise:"custom"},{feature:"SDK",starter:"—",pro:"✓",enterprise:"✓"},{feature:"Docs",starter:"basic",pro:"full",enterprise:"full"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"hermes-openclaw-grokbot",name:"HERMES / Openclaw / GrokBot",icon:"⚡",tagline:"Specialized AI agent platforms and integrations",description:"Custom AI agent platforms built on HERMES, Openclaw, and GrokBot frameworks for enterprise workflows.",features:["HERMES agent platform integration","Openclaw workflow automation","GrokBot custom training","Enterprise security compliance","Custom plugin development","Multi-tenant architecture"],packages:[{name:"STARTER",price:"custom",features:["Basic platform setup","1 platform","Documentation","Email support"]},{name:"PRO",price:"custom",features:["Advanced platform","Custom integrations","2 platforms","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Full custom platform","Dedicated infrastructure","All platforms","SLA + 24/7","Negotiate with us"]}],comparison:[{feature:"Setup",starter:"basic",pro:"advanced",enterprise:"full custom"},{feature:"Platforms",starter:"1",pro:"2",enterprise:"all"},{feature:"Integrations",starter:"—",pro:"custom",enterprise:"dedicated infra"},{feature:"Support",starter:"email",pro:"priority",enterprise:"SLA + 24/7"},{feature:"Custom",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"ai-video-generation",name:"AI Video Generation",icon:"▶",tagline:"Commercial and MV video generation pipelines",description:"AI-powered video generation for commercials, music videos, and content marketing.",features:["Text-to-video generation","Music video pipelines","Commercial ad production","Voice + lip sync","Custom AI model fine-tuning","Batch rendering infrastructure"],packages:[{name:"STARTER",price:"2,415,000 MMK",features:["1 video","Standard quality (720p)","1 revision","Email support"]},{name:"PRO",price:"6,040,000 MMK",features:["1 video","Premium quality (1080p)","Better AI models","3 revisions","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Custom plan","4K + custom models","Dedicated pipeline","SLA + 24/7","Negotiate with us"]}],comparison:[{feature:"Quality",starter:"720p",pro:"1080p",enterprise:"4K + custom"},{feature:"AI models",starter:"standard",pro:"better",enterprise:"custom"},{feature:"Revisions",starter:"1",pro:"3",enterprise:"custom"},{feature:"Pipeline",starter:"shared",pro:"shared",enterprise:"dedicated"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"3d-modeling",name:"3D Modeling",icon:"◈",tagline:"Product visualization, architectural, and game assets",description:"3D modeling for product visualization, architectural rendering, and game asset creation.",features:["Product visualization","Architectural rendering","Game asset creation","PBR texturing","3D printing ready files","WebGL / Three.js integration"],packages:[{name:"STARTER",price:"1,810,000 MMK",features:["1 model","Standard quality (low-poly)","1 revision","Email support"]},{name:"PRO",price:"4,830,000 MMK",features:["1 model","Premium quality (high-poly)","PBR textures","3 revisions","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Custom plan","Custom rigging","Animation-ready","Dedicated artist","Negotiate with us"]}],comparison:[{feature:"Quality",starter:"low-poly",pro:"high-poly + PBR",enterprise:"custom rig"},{feature:"Models",starter:"1",pro:"1",enterprise:"custom"},{feature:"Rigging",starter:"—",pro:"—",enterprise:"✓"},{feature:"Animation",starter:"—",pro:"—",enterprise:"ready"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"graphic-design",name:"Graphic Design",icon:"◆",tagline:"Brand identity, marketing collateral, and UI kits",description:"Full-spectrum graphic design — brand identity, marketing collateral, UI kits, and social media assets.",features:["Brand identity design","Marketing collateral","UI/UX design kits","Social media templates","Print-ready files","Vector + raster assets"],packages:[{name:"STARTER",price:"1,210,000 MMK",features:["20 deliverables","Standard quality","1 revision","Email support"]},{name:"PRO",price:"3,620,000 MMK",features:["30 deliverables","Premium quality","3 revisions","Brand guidelines","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Custom plan","Negotiate with us","Special pricing","Full brand system","SLA + 24/7"]}],comparison:[{feature:"Deliverables",starter:"20",pro:"30",enterprise:"custom"},{feature:"Quality",starter:"standard",pro:"premium",enterprise:"custom"},{feature:"Revisions",starter:"1",pro:"3",enterprise:"custom"},{feature:"Brand guide",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"content-copywriting",name:"Content & Copywriting",icon:"✎",tagline:"Technical writing, marketing copy, and documentation",description:"Technical writing, marketing copy, API documentation, and content strategy. AI-assisted + human-edited.",features:["Technical documentation","Marketing copywriting","API docs (OpenAPI)","Blog + article writing","Content strategy","SEO-optimized content"],packages:[{name:"STARTER",price:"966,000 MMK",features:["20 pieces","Standard quality","1 revision","Email support"]},{name:"PRO",price:"2,415,000 MMK",features:["30 pieces","Premium quality","3 revisions","SEO optimization","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Custom plan","Negotiate with us","Special pricing","Content strategy","SLA + 24/7"]}],comparison:[{feature:"Pieces",starter:"20",pro:"30",enterprise:"custom"},{feature:"Quality",starter:"standard",pro:"premium",enterprise:"custom"},{feature:"Revisions",starter:"1",pro:"3",enterprise:"custom"},{feature:"SEO",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"online-media-buying",name:"Online Media Buying",icon:"▲",tagline:"Ad campaigns, media strategy, and performance marketing",description:"Data-driven ad campaigns across Meta, Google, TikTok with real-time optimization.",features:["Meta Ads management","Google Ads management","TikTok Ads","Creative testing","Conversion tracking","ROI reporting"],packages:[{name:"STARTER",price:"1,810,000 MMK",features:["20 ad creatives","Basic campaign","Weekly reports","Email support"]},{name:"PRO",price:"4,830,000 MMK",features:["30 ad creatives","Advanced campaign","Daily reports","Creative testing","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Custom plan","Negotiate with us","Special pricing","Dedicated manager","SLA + 24/7"]}],comparison:[{feature:"Ad creatives",starter:"20",pro:"30",enterprise:"custom"},{feature:"Campaign",starter:"basic",pro:"advanced",enterprise:"custom"},{feature:"Reports",starter:"weekly",pro:"daily",enterprise:"real-time"},{feature:"Testing",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"ui-ux-design",name:"UI/UX Design",icon:"◡",tagline:"Product design, design systems, and prototyping",description:"End-to-end product design — user research, wireframes, high-fidelity prototypes, and design systems.",features:["User research + personas","Wireframing + prototyping","High-fidelity UI design","Design system creation","Usability testing","Figma handoff"],packages:[{name:"STARTER",price:"2,415,000 MMK",features:["1 screen flow","Standard design system","Wireframes","Figma handoff"]},{name:"PRO",price:"6,040,000 MMK",features:["1 screen flow","Premium design system","Advanced prototyping","Hi-fi UI","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Custom plan","Enterprise design system","Design ops","Dedicated team","Negotiate with us"]}],comparison:[{feature:"Design system",starter:"standard",pro:"premium",enterprise:"enterprise + ops"},{feature:"Screen flows",starter:"1",pro:"1",enterprise:"custom"},{feature:"Prototyping",starter:"wireframe",pro:"advanced",enterprise:"custom"},{feature:"Hi-fi",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"android-ios-app",name:"Android & iOS App",icon:"▣",tagline:"Native and cross-platform mobile applications",description:"Cross-platform mobile apps with React Native / Expo, or native Swift/Kotlin. From MVP to production.",features:["React Native / Expo","Native Swift / Kotlin","Offline-first architecture","Push notifications","In-app purchases","App Store / Play Store submission"],packages:[{name:"STARTER",price:"12,080,000 MMK",features:["MVP app","Basic features","Single platform","Email support"]},{name:"PRO",price:"30,190,000 MMK",features:["Production app","Advanced features","Both platforms","Push notifications","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Enterprise app","All features","Custom integrations","Dedicated team","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"App tier",starter:"MVP",pro:"production",enterprise:"enterprise"},{feature:"Platforms",starter:"1",pro:"both",enterprise:"both + custom"},{feature:"Features",starter:"basic",pro:"advanced",enterprise:"all"},{feature:"Integrations",starter:"—",pro:"push",enterprise:"custom"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"web-webapp",name:"Web / WebApp",icon:"▣",tagline:"Full-stack web applications with modern frameworks",description:"Production web applications built with Next.js, React, and TypeScript. From landing pages to SaaS dashboards.",features:["Next.js + React + TypeScript","Server-side rendering + ISR","Database design (PostgreSQL + Prisma)","Authentication (NextAuth)","Real-time features (WebSocket)","CI/CD pipeline"],packages:[{name:"STARTER",price:"6,040,000 MMK",features:["MVP webapp","Basic pages","Standard design","Email support"]},{name:"PRO",price:"18,110,000 MMK",features:["Production webapp","Advanced features","Responsive","Auth + database","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Enterprise webapp","Custom features","SLA + 24/7","Dedicated team","Negotiate with us"]}],comparison:[{feature:"Tier",starter:"MVP",pro:"production",enterprise:"enterprise"},{feature:"Design",starter:"standard",pro:"responsive",enterprise:"custom"},{feature:"Auth + DB",starter:"—",pro:"✓",enterprise:"✓"},{feature:"Features",starter:"basic",pro:"advanced",enterprise:"custom"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"chrome-extensions",name:"Chrome Extensions",icon:"⬚",tagline:"Browser automation and productivity extensions",description:"Custom Chrome extensions for browser automation, productivity, and workflow enhancement.",features:["Manifest V3 development","Content script injection","Background service workers","Popup + options pages","Chrome Web Store submission","Cross-browser support (Firefox/Edge)"],packages:[{name:"STARTER",price:"2,415,000 MMK",features:["Basic extension","Core features","1 revision","Email support"]},{name:"PRO",price:"6,040,000 MMK",features:["Advanced extension","Full API integration","3 revisions","Web Store submission","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Custom extension","Enterprise features","Custom APIs","SLA + 24/7","Negotiate with us"]}],comparison:[{feature:"Extension tier",starter:"basic",pro:"advanced",enterprise:"custom"},{feature:"API integration",starter:"—",pro:"full",enterprise:"custom"},{feature:"Revisions",starter:"1",pro:"3",enterprise:"custom"},{feature:"Web Store",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"desktop-macbook-apps",name:"Desktop / MacBook Apps",icon:"◱",tagline:"Cross-platform desktop applications (Electron/Tauri)",description:"Desktop applications for Windows, macOS, and Linux using Electron or Tauri. Native performance with web tech.",features:["Electron / Tauri development","Cross-platform (Win/Mac/Linux)","Native menus + tray","Auto-update system","Code signing + notarization","Installer creation"],packages:[{name:"STARTER",price:"9,660,000 MMK",features:["Basic desktop app","Core features","1 platform","Email support"]},{name:"PRO",price:"24,150,000 MMK",features:["Advanced app","Full features","All platforms","Auto-update","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Enterprise app","Custom integrations","Dedicated team","SLA + 24/7","Negotiate with us"]}],comparison:[{feature:"App tier",starter:"basic",pro:"advanced",enterprise:"enterprise"},{feature:"Platforms",starter:"1",pro:"all",enterprise:"all"},{feature:"Auto-update",starter:"—",pro:"✓",enterprise:"✓"},{feature:"Integrations",starter:"—",pro:"—",enterprise:"custom"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"aso",name:"ASO",icon:"⊙",tagline:"App Store Optimization for mobile and web stores",description:"App Store Optimization services to improve visibility and downloads across App Store, Play Store, and Chrome Web Store.",features:["Keyword research + optimization","Store listing optimization","Screenshot + video creation","Review management","A/B testing","Competitor analysis"],packages:[{name:"STARTER",price:"1,210,000 MMK",features:["Basic ASO","1-month retainer","Keyword research","Email support"]},{name:"PRO",price:"3,620,000 MMK",features:["Advanced ASO","3-month retainer","Better optimization","A/B testing","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Full ASO","6-month retainer","Ongoing monitoring","Competitor tracking","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"ASO tier",starter:"basic",pro:"advanced",enterprise:"full"},{feature:"Retainer",starter:"1 month",pro:"3 months",enterprise:"6 months"},{feature:"A/B testing",starter:"—",pro:"✓",enterprise:"✓"},{feature:"Monitoring",starter:"—",pro:"—",enterprise:"ongoing"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"web3-wallets",name:"Web3 Wallets",icon:"⬡",tagline:"Non-custodial wallet development and integration",description:"Custom non-custodial wallet development for web, mobile, and browser extension. Support for EVM chains, Solana, and custom L2s.",features:["Multi-chain support (EVM, Solana, custom)","Non-custodial architecture","Hardware wallet integration (Ledger, Trezor)","Biometric authentication","Transaction simulation + security","Cross-chain swaps"],packages:[{name:"STARTER",price:"18,110,000 MMK",features:["Single-chain wallet","Standard security","Web only","Security review"]},{name:"PRO",price:"36,220,000 MMK",features:["Multi-chain wallet","Advanced security","Hardware wallet support","Web + mobile","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Omnichain wallet","Enterprise security","Custom features","Full audit + bounty","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"Chain support",starter:"single",pro:"multi-chain",enterprise:"omnichain"},{feature:"Security",starter:"standard",pro:"advanced",enterprise:"enterprise"},{feature:"Hardware wallet",starter:"—",pro:"✓",enterprise:"✓"},{feature:"Audit",starter:"review",pro:"full",enterprise:"full + bounty"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"amm-dex",name:"AMM / DEX",icon:"⇄",tagline:"Automated market maker and DEX protocol development",description:"Full DEX development — AMM pools, order books, limit orders, cross-chain swaps, and liquidity management.",features:["Custom AMM (constant product, stable, weighted)","Order book matching engine","Cross-chain swaps (LayerZero, CCIP)","Liquidity management dashboard","MEV protection","Flash loan integration"],packages:[{name:"STARTER",price:"24,150,000 MMK",features:["Single-chain DEX","Standard features","1 pool type","Security review"]},{name:"PRO",price:"60,370,000 MMK",features:["Multi-chain DEX","Advanced features","MEV protection","3 pool types","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Omnichain DEX","Custom features","Full audit","White-label","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"Chain support",starter:"single",pro:"multi-chain",enterprise:"omnichain"},{feature:"Features",starter:"standard",pro:"advanced + MEV",enterprise:"custom"},{feature:"Pool types",starter:"1",pro:"3",enterprise:"custom"},{feature:"Audit",starter:"review",pro:"full",enterprise:"full audit"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"dao-governance",name:"DAO Governance",icon:"◍",tagline:"DAO frameworks, voting, and treasury management",description:"DAO governance platforms with proposal creation, voting mechanisms, and treasury management.",features:["Proposal creation and voting","Quadratic voting","Treasury management","Delegate system","On-chain reputation","IPFS document storage"],packages:[{name:"STARTER",price:"18,110,000 MMK",features:["Basic DAO framework","Standard governance","Treasury view","Email support"]},{name:"PRO",price:"36,220,000 MMK",features:["Advanced DAO","Custom governance","Treasury management","Delegate system","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Full custom DAO","Multi-chain","Custom proposals","Full reputation system","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"DAO tier",starter:"basic",pro:"advanced",enterprise:"full custom"},{feature:"Governance",starter:"standard",pro:"custom",enterprise:"custom"},{feature:"Chain support",starter:"single",pro:"single",enterprise:"multi-chain"},{feature:"Treasury",starter:"view",pro:"manage",enterprise:"full + custom"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"nft-systems",name:"NFT Systems",icon:"✦",tagline:"NFT minting, marketplace, and royalty infrastructure",description:"Full NFT infrastructure — minting contracts, marketplace, royalty enforcement, and metadata management.",features:["NFT minting contracts (ERC-721/1155)","Marketplace development","Royalty enforcement (EIP-2981)","Metadata management (IPFS)","Lazy minting","Batch minting"],packages:[{name:"STARTER",price:"12,080,000 MMK",features:["3,000 NFT images","Standard quality","Basic minting","Email support"]},{name:"PRO",price:"30,190,000 MMK",features:["3,000 NFT images","Advanced quality (better art, metadata, rare traits)","Full marketplace","Royalty enforcement","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Custom plan","Custom smart contract","Marketplace","More quantity in add-ons","Negotiate with us"]}],comparison:[{feature:"NFT count",starter:"3,000",pro:"3,000",enterprise:"custom"},{feature:"Quality",starter:"standard",pro:"advanced",enterprise:"custom"},{feature:"Smart contract",starter:"basic",pro:"standard",enterprise:"custom"},{feature:"Marketplace",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"security-audit",name:"Security Audit",icon:"⚿",tagline:"Smart contract and protocol security audits",description:"Comprehensive security audits for smart contracts, DeFi protocols, and web applications. Manual + automated review.",features:["Smart contract audit","DeFi protocol review","Automated vulnerability scanning","Manual code review","Gas optimization","Audit report + remediation"],packages:[{name:"STARTER",price:"6,040,000 MMK",features:["1 contract audit","Standard depth","Automated scan","Email support"]},{name:"PRO",price:"14,490,000 MMK",features:["3 contract audits","Full depth","Manual review","Remediation support","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Custom plan","More contracts","Negotiate with us","Full audit team","SLA + 24/7"]}],comparison:[{feature:"Contracts",starter:"1",pro:"3",enterprise:"custom"},{feature:"Depth",starter:"standard",pro:"full",enterprise:"custom"},{feature:"Manual review",starter:"—",pro:"✓",enterprise:"✓"},{feature:"Remediation",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"smart-contract-development",name:"Smart Contract Development",icon:"∎",tagline:"Solidity/Rust contract development and deployment",description:"Production-grade smart contract development in Solidity and Rust. Full lifecycle: design, development, testing, auditing, deployment.",features:["Solidity + Rust (Soroban) development","Formal verification","Gas optimization","Upgradeable proxy patterns","On-chain monitoring","Multi-sig deployment"],packages:[{name:"STARTER",price:"9,660,000 MMK",features:["1 contract","Standard quality","Basic testing","Email support"]},{name:"PRO",price:"24,150,000 MMK",features:["3 contracts","Full quality","Test coverage","Gas optimization","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Custom plan","More contracts","Negotiate with us","Formal verification","SLA + 24/7"]}],comparison:[{feature:"Contracts",starter:"1",pro:"3",enterprise:"custom"},{feature:"Quality",starter:"standard",pro:"full",enterprise:"custom"},{feature:"Test coverage",starter:"basic",pro:"full",enterprise:"formal"},{feature:"Gas optimization",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"bug-bounty",name:"Bug Bounty",icon:"▣",tagline:"Security testing and vulnerability assessment programs",description:"Bug bounty program setup, management, and vulnerability assessment for DeFi and web applications.",features:["Bug bounty program setup","Triage + vulnerability assessment","Reward management","Hall of fame page","Integration with Immunefi","Continuous security testing"],packages:[{name:"STARTER",price:"3,620,000 MMK",features:["1 program","Standard triage","Reward management","Email support"]},{name:"PRO",price:"9,660,000 MMK",features:["3 programs","Full triage","Hall of fame","Immunefi integration","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Custom plan","More programs","Negotiate with us","Dedicated team","SLA + 24/7"]}],comparison:[{feature:"Programs",starter:"1",pro:"3",enterprise:"custom"},{feature:"Triage",starter:"standard",pro:"full",enterprise:"dedicated"},{feature:"Hall of fame",starter:"—",pro:"✓",enterprise:"✓"},{feature:"Immunefi",starter:"—",pro:"✓",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"money-market-development",name:"Money Market Development",icon:"$",tagline:"DeFi lending, borrowing, and yield protocols",description:"DeFi money market protocols — lending, borrowing, yield farming, and interest rate models. Production-ready and audited.",features:["Lending + borrowing pools","Variable interest rate models","Liquidation engine","Yield farming","Flash loans","Cross-chain lending"],packages:[{name:"STARTER",price:"30,190,000 MMK",features:["Basic lending protocol","1 asset","Liquidation","Security review"]},{name:"PRO",price:"60,370,000 MMK",features:["Advanced protocol","5 assets","Full features","Yield farming","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Custom protocol","Cross-chain","Custom interest models","Full audit + bounty","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"Protocol tier",starter:"basic",pro:"advanced",enterprise:"custom"},{feature:"Assets",starter:"1",pro:"5",enterprise:"custom"},{feature:"Cross-chain",starter:"—",pro:"—",enterprise:"✓"},{feature:"Audit",starter:"review",pro:"full",enterprise:"full + bounty"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"cbdc-development",name:"CBDC Development",icon:"₵",tagline:"Central bank digital currency infrastructure",description:"Central Bank Digital Currency (CBDC) infrastructure — issuance, distribution, and settlement systems for government and institutional clients.",features:["CBDC issuance system","Distribution network","Settlement layer","KYC/AML integration","Privacy-preserving transactions","Regulatory compliance framework"],packages:[{name:"STARTER",price:"custom",features:["Consultation","Architecture design","Proof of concept","Email support"]},{name:"PRO",price:"custom",features:["Pilot deployment","Regulatory framework","KYC/AML integration","Privacy layer","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["Production deployment","Full infrastructure","Government integration","Dedicated team","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"Phase",starter:"consultation",pro:"pilot",enterprise:"production"},{feature:"Deployment",starter:"—",pro:"pilot",enterprise:"full"},{feature:"Regulatory",starter:"—",pro:"✓",enterprise:"✓"},{feature:"Infrastructure",starter:"—",pro:"—",enterprise:"full"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
  { slug:"mobile-web-game-development",name:"Mobile/Web Game Development",icon:"◆",tagline:"Mobile and web-based game development",description:"Mobile and web-based game development using Unity, Phaser, Three.js, and WebGL. From casual games to complex multiplayer experiences with backend infrastructure.",features:["Unity + Phaser + WebGL","2D and 3D game engines","Multiplayer backend (Socket.io)","In-app purchase integration","Ad SDK integration","Cross-platform deployment"],packages:[{name:"STARTER",price:"7,240,000 MMK",features:["Casual game","Single platform","Basic art","Leaderboard","Email support"]},{name:"PRO",price:"18,110,000 MMK",features:["Mid-core game","Multi-platform","Better quality","Multiplayer + IAP","Priority support"],popular:true},{name:"ENTERPRISE",price:"custom",features:["AAA game","All platforms","Custom engine","LiveOps + analytics","SLA + 24/7 — negotiate with us"]}],comparison:[{feature:"Game tier",starter:"casual",pro:"mid-core",enterprise:"AAA"},{feature:"Platforms",starter:"1",pro:"multi",enterprise:"all"},{feature:"Engine",starter:"standard",pro:"standard",enterprise:"custom"},{feature:"LiveOps",starter:"—",pro:"—",enterprise:"✓"},{feature:"SLA",starter:"—",pro:"—",enterprise:"✓"}]},
];

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = SERVICES.find((s) => s.slug === slug);
  // Trigger the page reveal animation (panels retract) when this detail page mounts
  usePageReveal();

  if (!service) {
    return (
      <div className="min-h-screen bg-background p-6">
        <AlphaNav />
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <h1 className="font-sans text-4xl font-black uppercase">SERVICE NOT FOUND</h1>
          <Link href="/#services" className="mt-4 inline-block border border-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em]">← BACK TO SERVICES</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AlphaNav />
      <section className="px-3 pt-24 pb-8">
        <div className="mx-auto w-full max-w-[1600px]">
          <Link href="/#services" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">← ALL SERVICES</Link>
          <div className="mt-4 flex items-center gap-4">
            <span className="font-sans text-6xl font-black text-[#FF4500]">{service.icon}</span>
            <div>
              <h1 className="font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">{service.name}</h1>
              <p className="font-serif text-lg italic text-muted-foreground">{service.tagline}</p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl font-serif text-base leading-relaxed text-muted-foreground">{service.description}</p>
        </div>
      </section>
      <section className="px-3 py-8">
        <div className="mx-auto w-full max-w-[1600px]">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">▸ WHAT'S INCLUDED</h2>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {service.features.map((f) => (
              <div key={f} className="flex items-center gap-2 border border-border/60 p-2">
                <span className="text-[#00FF94]">▸</span>
                <span className="font-mono text-xs text-foreground/80">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-3 py-8">
        <div className="mx-auto w-full max-w-[1600px]">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">▸ PRICING — ADD ANY PACKAGE TO BASKET</h2>
          <p className="mt-1 font-serif text-sm italic text-muted-foreground">Each package is a standalone main service. Add multiple packages to qualify for bulk discounts.</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {service.packages.map((pkg) => (
              <div key={pkg.name} className={`relative flex flex-col border p-4 transition-all ${pkg.popular ? "border-[#FF4500] bg-[#FF4500]/5" : "border-border hover:border-foreground/40"}`} style={pkg.popular ? { boxShadow: "0 0 0 1px #FF4500" } : undefined}>
                {pkg.popular && <div className="mb-2 inline-block self-start bg-[#FF4500] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white">MOST POPULAR</div>}
                <h3 className="font-sans text-xl font-bold uppercase">{pkg.name}</h3>
                <div className="mt-1 font-sans text-3xl font-black">{pkg.price}</div>
                <div className="mt-3 flex-1 space-y-1">
                  {pkg.features.map((f) => (
                    <div key={f} className="flex items-center gap-1.5">
                      <span className="text-[#00FF94]">✓</span>
                      <span className="font-mono text-[10px] text-foreground/80">{f}</span>
                    </div>
                  ))}
                </div>
                <PackageAddButton
                  slug={`${service.slug}-${pkg.name.toLowerCase()}`}
                  name={`${service.name} — ${pkg.name}`}
                  icon={service.icon}
                  price={pkg.price}
                  popular={pkg.popular}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-3 py-8">
        <div className="mx-auto w-full max-w-[1600px]">
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

      {/* ADD-ONS & EXTRAS — researched upsell add-ons for this specific service */}
      {SERVICE_ADDONS[service.slug] && SERVICE_ADDONS[service.slug].length > 0 && (
        <section className="border-t border-border px-3 py-8">
          <div className="mx-auto w-full max-w-[1600px]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00FF94]">▸ ADD-ONS &amp; EXTRAS</h2>
                <p className="mt-1 font-serif text-sm italic text-muted-foreground">Enhance {service.name} with these researched add-ons. Add-on prices are not discounted.</p>
              </div>
              <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
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
        <section className="border-t border-border px-3 py-8">
          <div className="mx-auto w-full max-w-[1600px]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ COMPATIBLE SERVICES</h2>
                <p className="mt-1 font-serif text-sm italic text-muted-foreground">Other main services that pair perfectly with {service.name}. Add them to qualify for bulk discounts.</p>
              </div>
              <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
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
      <section className="border-t border-border px-3 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-sans text-3xl font-black uppercase tracking-tight">NOT SURE WHICH PACKAGE?</h2>
          <p className="mt-2 font-serif text-base italic text-muted-foreground">Contact our team — we'll help you choose the right plan for your needs.</p>
          <a href="mailto:contact@taungoosigma.lab" className="mt-6 inline-block border border-foreground bg-foreground px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80">CONTACT OUR TEAM →</a>
        </div>
      </section>
      <AlphaFooter />
      <ServiceBasket />
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
function PackageAddButton({ slug, name, icon, price, popular }: { slug: string; name: string; icon: string; price: string; popular?: boolean }) {
  const { items, addItem } = useBasketStore();
  const inBasket = items.some((i) => i.slug === slug);
  const priceNum = parsePrice(price);
  const isCustom = price === "custom";

  const handleAdd = () => {
    if (isCustom) {
      toast.info("▮ CUSTOM PRICING — CONTACT OUR TEAM");
      return;
    }
    addItem({ slug, name, type: "service", price: priceNum, icon });
    toast.success(`▮ ${name} ADDED TO BASKET`);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={inBasket}
      className={`mt-4 flex w-full items-center justify-center gap-2 border py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all ${
        inBasket
          ? "border-[#00FF94] bg-[#00FF94]/10 text-[#00FF94]"
          : popular
            ? "border-[#FF4500] bg-[#FF4500] text-black hover:opacity-80"
            : "border-foreground/60 text-foreground hover:border-[#FF4500] hover:text-[#FF4500]"
      }`}
    >
      {inBasket ? (
        <>
          <Check className="h-3 w-3" /> IN BASKET
        </>
      ) : isCustom ? (
        <>
          <Plus className="h-3 w-3" /> REQUEST QUOTE
        </>
      ) : (
        <>
          <Plus className="h-3 w-3" /> ADD TO BASKET
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
        <span className={`font-mono text-[7px] uppercase tracking-[0.14em] ${addon.type === "ongoing" ? "text-[#FFB300]" : "text-[#00FF94]"}`}>
          {addon.type === "ongoing" ? "◈ ONGOING" : "▸ ONE-TIME"}
        </span>
      </div>
      <div className="h-0.5 w-full bg-[#00FF94]/30" />
      <div className="p-3">
        <h4 className="font-sans text-xs font-bold uppercase tracking-tight">{addon.name}</h4>
        <p className="mt-0.5 font-serif text-[10px] italic text-muted-foreground line-clamp-2">{addon.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#00FF94]">{addon.price}</span>
          <button
            onClick={handleAdd}
            disabled={inBasket}
            className={`flex items-center gap-1 border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] transition-all ${
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
          <span className="font-sans text-xl text-[#FF4500]">{cs.icon}</span>
          <div className="flex-1">
            <h4 className="font-sans text-xs font-bold uppercase tracking-tight">{cs.name}</h4>
            <p className="mt-0.5 font-serif text-[10px] italic text-muted-foreground">{cs.reason}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#FF4500]">{cs.price}</span>
              <button
                onClick={handleAdd}
                disabled={inBasket}
                className={`flex items-center gap-1 border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] transition-all ${
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
