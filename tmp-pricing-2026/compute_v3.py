#!/usr/bin/env python3
"""Compute v3 pricing for all 27 services based on 2026 market research.

Rules:
- Exchange rate: 1 USD = 4,200 MMK
- STARTER USD = market_low × 0.75 (25% below entry market — deepest discount in 15-25% range)
- PRO USD = market_mid × 0.85 (15% below mid market — shallowest discount in 15-25% range)
- STARTER marketPrice = market_low (2026 entry-level agency rate)
- PRO marketPrice = market_mid (2026 mid-market rate)
- Local MMK = USD × 4200 × 0.80 (additional 20% local discount)
- USD rounded to nearest $50
- MMK rounded to nearest 100,000
- ENTERPRISE = custom / custom
"""

USD_MMK = 4200
LOCAL_DISCOUNT = 0.80
STARTER_MULT = 0.75
PRO_MULT = 0.85


def round_usd(v):
    return int(round(v / 50.0) * 50)


def round_mmk(v):
    return int(round(v / 100000.0) * 100000)


SERVICES = [
    {
        "slug": "ai-chatbot",
        "name": "AI Chatbot Development",
        "market_low": 10000,
        "market_mid": 50000,
        "market_high": 250000,
        "sources": [
            "https://appinventiv.com/blog/how-much-is-chatbot-development-cost — Enterprise AI chatbot in 2026: $40K-$400K",
            "https://quickchat.ai/post/how-much-does-chatbot-cost — Agency fees: $10K-$30K rule-based, $75K-$150K moderate AI, $150K-$500K GenAI",
            "https://productcrafters.io/blog/how-much-does-it-cost-to-build-an-ai-agent — AI Agent Dev Cost $5K-$180K+ (2026 Pricing Breakdown)",
            "https://heeya.fr/en/blog/how-much-does-an-ai-chatbot-cost-2026 — AI Chatbot Pricing 2026 (May 14, 2026)",
        ],
        "date_note": "Sources dated 2026 (May 14, 2026 publication on heeya.fr; productcrafters/appinventiv 2026 pricing guides)",
    },
    {
        "slug": "voice-ai",
        "name": "Voice AI / Voice Agent Development",
        "market_low": 15000,
        "market_mid": 60000,
        "market_high": 300000,
        "sources": [
            "https://rudrax.co.uk/blog/how-much-does-an-ai-voice-agent-cost-in-2026-a-buyers-breakdown — AI Voice Agent Dev in 2026: $8K-$500K+ (Jun 26, 2026)",
            "https://masterofcode.com/blog/voice-ai-development-costs — Voice AI: $375/mo subscription to $300K+ custom build",
            "https://www.retellai.com/blog/ai-voice-agent-pricing-full-cost-breakdown-platform-comparison-roi-analysis — AI Voice Agent Pricing in 2026 (Jul 27, 2026)",
            "https://aircall.io/blog/best-practices/ai-voice-agent-cost — AI Voice Agent Pricing 2026 (May 14, 2026)",
        ],
        "date_note": "Sources dated 2026 (Jun 26, Jul 27, May 14, 2026 publications)",
    },
    {
        "slug": "agent-swarm",
        "name": "AI Agent Swarm / Multi-Agent Systems",
        "market_low": 30000,
        "market_mid": 100000,
        "market_high": 400000,
        "sources": [
            "https://devcom.com — How Much Does It Cost to Build an AI Agent in 2026? (Mar 2, 2026) — $20K per workflow multi-agent, large enterprise $400K+",
            "https://www.digitalapplied.com — Multi-Agent Orchestration: 5 Patterns That Work in 2026 (May 17, 2026)",
            "https://www.ayautomate.com — 9 Best Multi-Agent Frameworks for Production in 2026 (Jun 19, 2026)",
            "https://www.anthropic.com — Patterns and problems in emerging multiagent systems (Aug 13, 2026)",
        ],
        "date_note": "Sources dated 2026 (Mar 2, May 17, Jun 19, Aug 13, 2026 publications)",
    },
    {
        "slug": "ai-automation",
        "name": "AI Automation / N8N Workflow",
        "market_low": 5000,
        "market_mid": 20000,
        "market_high": 50000,
        "sources": [
            "https://lets-viz.com/blogs/ai-automation-agency-pricing-2026-what-buyers-pay — AI Automation Agency Pricing 2026: $3K-$50K+ (Aug 19, 2026)",
            "https://goodspeed.studio/blog/n8n-agency-pricing-what-it-costs-to-work-with-an-n8n-partner — n8n Agency Pricing 2026: $0-$5K start, $10K/mo ongoing (Dec 10, 2025; updated for 2026)",
            "https://n8n.io/pricing — n8n Plans and Pricing (Starter EUR50/mo, Business EUR667/mo)",
            "https://www.rapidevelopers.com/review/n8n — n8n Review 2026: Pricing, Pros & Cons",
        ],
        "date_note": "Sources dated 2026 (Aug 19, 2026 lets-viz article; rapidevelopers 2026 review)",
    },
    {
        "slug": "api-mcp",
        "name": "API & MCP Server Development",
        "market_low": 25000,
        "market_mid": 80000,
        "market_high": 300000,
        "sources": [
            "https://launchdayadvisors.com/guides/mcp-server-cost — MCP Server Cost: 2026 Pricing Guide (May 29, 2026): $100K-$300K level-1, $300K-$700K level-2",
            "https://truto.one/blog/build-vs-buy-the-hidden-costs-of-custom-mcp-servers — Custom MCP servers $50K-$150K per integration per year",
            "https://nango.dev/blog/best-mcp-servers-for-agent-api-integrations — Best MCP servers for agent API integrations in 2026 (Jul 15, 2026)",
            "https://www.zenml.io/llmops-database/building-and-pricing-a-commercial-mcp-server-for-documentation-search — Commercial MCP server pricing models",
        ],
        "date_note": "Sources dated 2026 (May 29, Jul 15, 2026 publications)",
    },
    {
        "slug": "hermes-openclaw-grokbot",
        "name": "HERMES / Openclaw / GrokBot (Proprietary Multi-Agent)",
        "market_low": 100000,
        "market_mid": 300000,
        "market_high": 800000,
        "sources": [
            "https://softteco.com — AI Agent Development Cost in 2026 (Jun 9, 2026): $20K-$500K+ for complex autonomous agents",
            "https://www.intellectyx.com — AI Agent Development Cost in 2026: $15K-$800K+ for full enterprise multi-agent system (Aug 6, 2026)",
            "https://www.layer3labs.io — AI Agent Development Company for Small Business 2026: Enterprise multi-agent $100K-$500K+ (Jun 1, 2026)",
            "https://www.ai-agentsplus.com — AI Agent Development Cost 2026: $5K-$500K+ Pricing Guide (Feb 16, 2026)",
        ],
        "date_note": "Sources dated 2026 (Feb 16, Jun 1, Jun 9, Aug 6, 2026 publications). HERMES/Openclaw/GrokBot is Taungoo Sigma Lab's proprietary multi-agent system, positioned at the high end of the multi-agent market.",
    },
    {
        "slug": "ai-video-generation",
        "name": "AI Video Generation",
        "market_low": 5000,
        "market_mid": 25000,
        "market_high": 150000,
        "sources": [
            "https://ltx.io/blog/ai-video-generation-cost — How Much Does AI Video Generation Actually Cost? (2026 Guide, Aug 16, 2026): $13-$220 per finished minute at generation layer",
            "https://www.awesomic.com/blog/ai-video-production-agencies — 11 Best AI Video Production Agencies in 2026 (Aug 11, 2026): AI explainers/commercials $2K-$10K",
            "https://appinventiv.com/blog/cost-to-build-ai-video-generator-like-synthesia — Cost to build AI video generator like Synthesia (custom dev $50K-$500K)",
            "https://monday.com/blog/ai-agents/ai-for-video-creation — AI for Video Creation: 15 Best Platforms in 2026 (Apr 30, 2026)",
        ],
        "date_note": "Sources dated 2026 (Apr 30, Aug 11, Aug 16, 2026 publications)",
    },
    {
        "slug": "3d-modeling",
        "name": "3D Modeling Services",
        "market_low": 1000,
        "market_mid": 5000,
        "market_high": 25000,
        "sources": [
            "https://orbe3d.com/how-to-choose-affordable-3d-modeling-services — How to Choose Affordable 3D Modeling Services (Feb 20, 2026): few hundred to few thousand $ in 2026",
            "https://render3dquick.com/blog/how-much-does-3d-rendering-cost — 2026 Cost of Renderings: $249-$2,500 per image (Apr 9, 2025; updated for 2026 market)",
            "https://www.alpha3d.io/kb/3d-modelling/3d-modeling-prices — Simple 3D models $100-$500, complex $1K-$5K+, freelance $20-$100/hr",
            "https://www.quora.com/How-much-does-it-cost-to-hire-a-3D-modeler — 3D modeler cost reference",
        ],
        "date_note": "Sources dated 2026 (Feb 20, 2026 orbe3d article; render3dquick 2026 guide)",
    },
    {
        "slug": "graphic-design",
        "name": "Graphic Design",
        "market_low": 2000,
        "market_mid": 10000,
        "market_high": 50000,
        "sources": [
            "https://clutch.co/agencies/design/pricing — Design Agency Pricing Guide August 2026: Graphic Design <$10K/project, Product Design $10K-$49,999",
            "https://www.goodfirms.co/blog/how-much-graphic-design-services-cost — Graphic Design Services Cost in 2026 (Jul 13, 2026): agency quotes $3K-$10K pitch deck",
            "https://www.manypixels.co/blog/get-a-designer/design-agency-pricing — Design Agency Pricing: Rates, Models & What to Budget (2026, Jun 15, 2026): $75-$500/hr, $5K-$150K+ project",
            "https://delenzotechnologies.com/graphic-design-services-cost-2026-pricing-guide — Logo design $300-$1,500 freelancers, $1,500-$5K agencies (Jul 3, 2026)",
        ],
        "date_note": "Sources dated 2026 (Jun 15, Jul 3, Jul 13, August 2026 publications)",
    },
    {
        "slug": "content-copywriting",
        "name": "Content & Copywriting",
        "market_low": 1500,
        "market_mid": 8000,
        "market_high": 30000,
        "sources": [
            "https://www.columnfivemedia.com/content-marketing-agency-pricing — Content Marketing Agency Pricing: What to Expect in 2026 (May 1, 2026): $5K-$50K+/mo",
            "https://elnacain.com/blog/copywriting-rates — New Copywriting Rates for 2026 (Jul 15, 2026): $0.50-$0.80/word",
            "https://www.digitalapplied.com/blog/digital-marketing-pricing-2026-agency-costs — Digital Marketing Pricing 2026 (Apr 5, 2026): boutique $1.5K/mo, enterprise $15K+/mo",
            "https://www.darkroomagency.com/observatory/marketing-agency-cost-2026-pricing-by-service — Marketing Agency Cost 2026: $3K-$75K/mo",
        ],
        "date_note": "Sources dated 2026 (Apr 5, May 1, Jul 15, 2026 publications)",
    },
    {
        "slug": "online-media-buying",
        "name": "Online Media Buying / Ad Management",
        "market_low": 3000,
        "market_mid": 12000,
        "market_high": 50000,
        "sources": [
            "https://www.digitalapplied.com/blog/digital-marketing-pricing-2026-agency-costs — Digital Marketing Pricing 2026 (Apr 5, 2026): $1.5K-$15K+/mo",
            "https://directiveconsulting.com/blog/best-media-buying-agencies-in-2026 — 18 Best Media Buying Agencies For B2B (Feb 20, 2026)",
            "https://taskip.net/digital-marketing-agency-pricing-models — 6 Proven Digital Marketing Agency Pricing Models in 2026: hourly $50-$400, retainers $1.5K-$50K/mo",
            "https://lotiva.com/digital-marketing-agency-cost — Digital Marketing Agency Cost: 2026 Pricing Guide (Aug 12, 2026): $1K-$7.5K/mo small business",
        ],
        "date_note": "Sources dated 2026 (Feb 20, Apr 5, Aug 12, 2026 publications)",
    },
    {
        "slug": "ui-ux-design",
        "name": "UI/UX Design",
        "market_low": 15000,
        "market_mid": 50000,
        "market_high": 150000,
        "sources": [
            "https://dribbble.com/resources/tips/ui-ux-design-agency-costs — UI/UX Design Agency Costs: 2026 Budgeting & Pricing Guide (Mar 31, 2026): $10K-$300K+",
            "https://fuselabcreative.com/ui-ux-design-cost — UI UX design agency cost guide for 2026: $25-$300/hr offshore to US",
            "https://www.onething.design/post/ui-ux-design-cost-for-saas — UI/UX Design Cost for SaaS in 2026 (Jan 30, 2026): Early-Stage MVP Design $6K-$35K",
            "https://clutch.co/agencies/ui-ux/pricing — UX UI Design Pricing Guide August 2026: most agencies $25-$49/hr",
        ],
        "date_note": "Sources dated 2026 (Jan 30, Mar 31, August 2026 publications)",
    },
    {
        "slug": "android-ios-app",
        "name": "Android & iOS App Development",
        "market_low": 30000,
        "market_mid": 100000,
        "market_high": 300000,
        "sources": [
            "https://appinventiv.com/guide/mobile-app-development-cost — App Development Cost 2026: $40K-$400K+",
            "https://www.businessofapps.com/app-developers/research/app-development-cost — App Development Cost (2026, Jun 15, 2026): simple $5K-$50K, medium $50K-$120K, complex $120K-$300K+",
            "https://unicoconnect.com/blogs/mobile-app-development-cost-2026 — Mobile App Development Cost in 2026 (Jun 11, 2026): MVP $15K-$50K, growth $50K-$150K",
            "https://www.aalpha.net/blog/ios-app-development-cost — iOS App Development Cost: A Complete Pricing Guide 2026 (Jul 10, 2026): $40K-$400K+",
        ],
        "date_note": "Sources dated 2026 (Jun 11, Jun 15, Jul 10, 2026 publications)",
    },
    {
        "slug": "web-webapp",
        "name": "Web / WebApp Development",
        "market_low": 15000,
        "market_mid": 60000,
        "market_high": 250000,
        "sources": [
            "https://www.digisoftsolution.com/blog/web-app-development-cost — Web App Development Cost: Comprehensive Guide for 2026 (Mar 10, 2026): small $15K-$50K, mid $40K-$120K",
            "https://bubble.io — How Much Does It Cost to Create an App in 2026? (Aug 17, 2026): $5K-$300K traditional builds",
            "https://unicoconnect.com/blogs/mobile-app-development-cost-2026 — Avg agency app $90,780; common $10K-$49,999 (Jun 11, 2026)",
            "https://appinventiv.com — App Development Cost 2026: $40K-$400K+",
        ],
        "date_note": "Sources dated 2026 (Mar 10, Jun 11, Aug 17, 2026 publications)",
    },
    {
        "slug": "chrome-extensions",
        "name": "Chrome Extensions",
        "market_low": 5000,
        "market_mid": 20000,
        "market_high": 55000,
        "sources": [
            "https://plugthis.ai/blog/chrome-extension-builder-pricing-comparison-2026-guide — Chrome Extension Builder Pricing Comparison 2026 Guide (Jun 25, 2026): $5 registration + dev",
            "https://webmobtech.com/blog/real-cost-custom-chrome-extension-development — The Real Cost to Develop a Custom Chrome Extension (Sep 9, 2025): Tier 2 Medium $8K-$25K+ for 2026",
            "https://medium.com/@ryagoel1994/in-house-vs-outsourced-chrome-extension-development-total-cost-of-ownership-compared-6821d5a3939f — First-year total $30K-$55K",
            "https://www.fiverr.com/resources/guides/costs/chrome-extension-developer — Hire a Chrome Extension Developer: Costs Explained (Aug 2, 2026)",
        ],
        "date_note": "Sources dated 2026 (Jun 25, Aug 2, 2026 publications)",
    },
    {
        "slug": "desktop-macbook-apps",
        "name": "Desktop / MacBook Apps",
        "market_low": 30000,
        "market_mid": 100000,
        "market_high": 300000,
        "sources": [
            "https://dribbble.com/resources/tips/app-development-agency-costs — App Development Agency Costs in 2026 (Mar 26, 2026): Desktop+mobile $30K-$250K",
            "https://www.businessofapps.com/app-developers/research/app-development-cost — App Development Cost (2026, Jun 15, 2026): simple $5K-$50K, medium $50K-$120K, complex $120K-$300K+",
            "https://www.digisoftsolution.com/blog/web-app-development-cost — Web App Development Cost (Mar 10, 2026): mid-complexity $40K-$120K",
            "https://www.simpalm.com/blog/how-much-does-it-cost-to-make-an-app — How Much Does It Cost to Develop an App in 2026? (Jun 24, 2026): $30-$150/hr",
        ],
        "date_note": "Sources dated 2026 (Mar 10, Mar 26, Jun 15, Jun 24, 2026 publications)",
    },
    {
        "slug": "aso",
        "name": "App Store Optimization (ASO)",
        "market_low": 2500,
        "market_mid": 7000,
        "market_high": 15000,
        "sources": [
            "https://appagent.com/blog/app-store-optimization-pricing — App Store Optimization Pricing: What ASO Costs in 2026 (Aug 10, 2026): $2.5K-$7K/mo boutique/mid-market",
            "https://admiral.media/aso-agency-pricing — ASO Agency Pricing: How Much Does App Store (Mar 23, 2026): Entry $500-$2K/mo, Mid $2K-$5K/mo, $5K+",
            "https://appfollow.io/blog/app-store-optimization-cost — App Store Optimization Cost 2026 (Jun 12, 2026): tools $53-$404/mo",
            "https://screenshotwhale.com/blog/app-store-optimization-cost — Understanding App Store Optimization Cost (Feb 4, 2026)",
        ],
        "date_note": "Sources dated 2026 (Feb 4, Mar 23, Jun 12, Aug 10, 2026 publications)",
    },
    {
        "slug": "web3-wallets",
        "name": "Web3 Wallets",
        "market_low": 20000,
        "market_mid": 60000,
        "market_high": 250000,
        "sources": [
            "https://pixelplex.io/blog/web3-wallet-development — Complete Guide to Web3 Wallet Development and Its Costs (Mar 17, 2026): MVP $15K-$45K, enterprise $60K+",
            "https://perimattic.com — Web3 Development Cost in 2026 (Jan 2, 2026): $5K-$50K range, agencies $100-$300/hr",
            "https://www.purrweb.com — Web3 Development Cost in 2026: Full Guide (May 4, 2026): $15K-$150K+",
            "https://appinventiv.com — Crypto Wallet Development Cost 2026: $50K-$500K+",
        ],
        "date_note": "Sources dated 2026 (Jan 2, Mar 17, May 4, 2026 publications)",
    },
    {
        "slug": "amm-dex",
        "name": "AMM / DEX Development",
        "market_low": 40000,
        "market_mid": 120000,
        "market_high": 350000,
        "sources": [
            "https://techfyte.com/decentralized-exchange-development-cost — Decentralized Exchange Development Cost 2026 (Aug 6, 2026): basic AMM $80K-$180K, advanced $250K+",
            "https://www.troniextechnologies.com/blog/dex-development-cost — DEX Development Cost: A Realistic 2026 Breakdown (Aug 13, 2026): $30K-$250K+",
            "https://www.pixelwebsolutions.com/cost-to-build-decentralized-exchange — Cost To Build a DEX In 2026: AMM DEX $40K-$120K, Hybrid $70K-$110K",
            "https://www.softean.com/cost-to-start-cryptocurrency-exchange — Crypto Exchange Development Cost in 2026: DEX $30K-$300K+",
        ],
        "date_note": "Sources dated 2026 (Aug 6, Aug 13, 2026 publications)",
    },
    {
        "slug": "dao-governance",
        "name": "DAO Governance",
        "market_low": 15000,
        "market_mid": 50000,
        "market_high": 150000,
        "sources": [
            "https://www.lbmsolution.com/blog/best-10-dao-development-companies-in-2026 — Best 10 DAO Development Companies in 2026 (Feb 24, 2026): basic DAO $10K-$30K",
            "https://4irelabs.com/articles/dao-development-cost — How Much Does It Cost to Build a DAO in 2026? (Feb 27, 2026)",
            "https://elevateconsult.com/insights/ai-governance-framework-costs-and-budget-ranges-to-expect — AI Governance Framework Costs (Apr 17, 2026): governance consulting $25K-$150K",
            "https://www.linkedin.com/pulse/top-7-dao-development-companies-building-trustless-vqpic — Top 7 DAO Development Companies 2026",
        ],
        "date_note": "Sources dated 2026 (Feb 24, Feb 27, Apr 17, 2026 publications)",
    },
    {
        "slug": "nft-systems",
        "name": "NFT Systems",
        "market_low": 25000,
        "market_mid": 80000,
        "market_high": 300000,
        "sources": [
            "https://bitronix.ai/blogs/nft-marketplace-development-cost — NFT Marketplace Development Cost in 2026 (Aug 5, 2026): $20K-$500K+",
            "https://perimattic.com/nft-marketplace-development-cost — NFT Marketplace Development Cost 2026 (Apr 28, 2026): standard $30K-$80K, enterprise more",
            "https://merehead.com/blog/nft-exchange-platform-development — NFT Marketplace Development Cost in 2026 (May 25, 2026): $20K-$150K+",
            "https://www.octalsoftware.com/blog/nft-marketplace-development — NFT Marketplace Development Cost Guide 2026 (May 25, 2026): white-label MVP $25K, custom $500K+",
        ],
        "date_note": "Sources dated 2026 (Apr 28, May 25, Aug 5, 2026 publications)",
    },
    {
        "slug": "security-audit",
        "name": "Security Audit",
        "market_low": 10000,
        "market_mid": 40000,
        "market_high": 250000,
        "sources": [
            "https://sherlock.xyz/post/smart-contract-audit-pricing-a-market-reference-for-2026 — Smart Contract Audit Pricing: A Market Reference for 2026 (Feb 18, 2026): $5K-$250K+",
            "https://bugblow.com/blog/smart-contract-audit-cost-2026-pricing-guide — Smart Contract Audit Cost in 2026: $5K to $500K Breakdown (Feb 17, 2026): token contract $5K-$15K",
            "https://www.zealynx.io/research/audit-ops/audit-pricing-2026 — Smart Contract Audit Cost in 2026, Exact Pricing for Tokens, DeFi (Jan 5, 2026): $5K-$500K+",
            "https://cryptojobslist.com/blog/smart-contract-audit-companies — Top 8 Smart Contract Audit Companies (2026 Updated, Jul 28, 2026): $5K-$15K typical",
        ],
        "date_note": "Sources dated 2026 (Jan 5, Feb 17, Feb 18, Jul 28, 2026 publications)",
    },
    {
        "slug": "smart-contract-development",
        "name": "Smart Contract Development",
        "market_low": 8000,
        "market_mid": 40000,
        "market_high": 200000,
        "sources": [
            "https://www.softean.com/smart-contract-development-cost — Smart Contract Development Cost in 2026: $5K-$100K+",
            "https://zyneto.com/blog/smart-contract-development-cost — Guide to Smart Contract Development Cost in 2026 (Apr 20, 2026): $25K-$200K+",
            "https://www.fluidrwa.com/blog/top-smart-contract-development-companies-web3-tokenization — Top 10 Smart Contract Development Companies 2026 (Jul 16, 2026)",
            "https://clutch.co/developers/blockchain/smart-contract-development — Top Smart Contract Developers Aug 2026 Rankings: $200K-$999,999 avg project",
        ],
        "date_note": "Sources dated 2026 (Apr 20, Jul 16, August 2026 publications)",
    },
    {
        "slug": "rwa-development",
        "name": "RWA Tokenization",
        "market_low": 50000,
        "market_mid": 150000,
        "market_high": 500000,
        "sources": [
            "https://www.inoru.com/blog/rwa-tokenization-cost-2026-pricing — How Much RWA Tokenization Cost in 2026: Pricing Guide (Feb 11, 2026): $50K-$120K (with security), $100K-$250K MVP/startup platforms, $250K+ complex",
            "https://www.antier.com/blogs/how-much-does-it-cost-to-build-an-rwa-tokenization-platform-in-2026 — How Much Does It Cost to Build an RWA Tokenization Platform in 2026 (Jun 17, 2026): full cost breakdown by phase, asset class",
            "https://assettokenizationblog.wordpress.com/2026/05/05/top-10-rwa-tokenization-platforms — Top 10 RWA Tokenization Platforms in 2026 (May 5, 2026): $50K straightforward to $500K+ complex structures",
            "https://cryptiecraft.com/rwa-tokenization-platform-development-cost — RWA Tokenization Platform Development Cost 2026: $30K-$100K+",
            "https://nexvyon.com/blog/cost-to-develop-real-world-asset-tokenization-platform — Cost to Build an RWA Tokenization Platform In 2026 (May 6, 2026)",
            "https://www.fluidrwa.com/blog/rwa-tokenization-platform-comparison-2026 — RWA Tokenization Platform Comparison 2026 (Aug 15, 2026): Securitize, Tokeny, Brickken comparison",
            "https://www.stobox.io/reports/state-of-rwa-2026 — The State of RWA Tokenization 2026 Mid-Year Report: $33.5B on-chain value July 2026",
            "https://www.linkedin.com/pulse/top-rwa-tokenization-platforms-2026-crypticweb3-1eeoe — Top RWA Tokenization Platforms in 2026 (Apr 13, 2026): Brickken tiered, Securitize, Tokeny pricing varies by asset class",
        ],
        "date_note": "Sources dated 2026 (Feb 11, Apr 13, May 5, May 6, Jun 17, Aug 15, 2026 publications + Stobox 2026 Mid-Year Report). Real-world references include BlackRock BUIDL (~$2.67B AUM), Franklin Templeton FOBXX (~$828M), Securitize, Tokeny, Brickken, ADDX.",
    },
    {
        "slug": "money-market-development",
        "name": "Money Market (DeFi Lending)",
        "market_low": 40000,
        "market_mid": 120000,
        "market_high": 300000,
        "sources": [
            "https://vivasoft.com.np/defi-lending-platform-development-guide — DeFi Lending Platform Development Guide [2026] (May 6, 2026): tens of thousands to hundreds of thousands of dollars",
            "https://www.antier.com/defi-lending-platform-development — DeFi Lending and Borrowing Platform Development (Antier, 2026)",
            "https://eco.com/support/en/articles/12272109-stablecoin-lending-platforms-2026 — Stablecoin Lending Platforms 2026 (Aug 17, 2026): current yield rates, risk-tier table",
            "https://www.fortunebusinessinsights.com/decentralized-finance-technology-market-107823 — DeFi market $107.94B in 2026 to $695.44B by 2034 (market sizing)",
        ],
        "date_note": "Sources dated 2026 (May 6, Aug 17, 2026 publications). Money market platforms (Aave/Compound-style forks + custom) typically cost $40K-$300K for full development.",
    },
    {
        "slug": "stablecoin-development",
        "name": "Stablecoin Development",
        "market_low": 30000,
        "market_mid": 90000,
        "market_high": 500000,
        "sources": [
            "https://interexy.com/stablecoin-payment-app-development-cost — Stablecoin Payment App Development Cost in 2026 (Jul 17, 2026): MVP $30K-$90K, production $150K-$500K, licensed $1M+",
            "https://pixelplex.io/blog/stablecoin-development-guide — Stablecoin Development Services: Cost, Process, and Key (Apr 12, 2026): $25K-$250K",
            "https://xchange.avixa.org/posts/stablecoin-development-cost-i-googled-it-and-got-47-different-answers-so-i-figured-it-out-myself — Stablecoin Development Cost: Real Pricing Guide for 2026 (Jun 25, 2026): $5K-$500K range, realistic $8K-$15K small",
            "https://tokenminds.co/blog/top-stablecoin-development-companies — Top Stablecoin Development Companies 2026 (with Pricing): PixelPlex $40-$80/hr",
        ],
        "date_note": "Sources dated 2026 (Apr 12, Jun 25, Jul 17, 2026 publications)",
    },
    {
        "slug": "mobile-web-game-development",
        "name": "Mobile / Web Game Development",
        "market_low": 15000,
        "market_mid": 80000,
        "market_high": 300000,
        "sources": [
            "https://ngssolution.com/blogs/mobile-game-development-cost — How Much Does Mobile Game Development Cost in 2026 (Jun 2, 2026): $15K basic 2D to $300K+ premium 3D",
            "https://ilogos.biz/how-much-does-it-cost-to-develop-a-mobile-game-simple-math — How Much Does it Cost To Develop A Mobile Game (2026): $50K-$200K small/mid-scale",
            "https://studiokrew.com/blog/mobile-game-development-cost — Mobile Game Development Cost in 2026: Real Budgets by Genre (Jul 20, 2026): $15K-$250K+",
            "https://www.linkedin.com/pulse/unity-mobile-game-development-cost-2026-genre-wise-pricing-rana-0mmle — Unity Mobile Game Development Cost in 2026 (Aug 4, 2026): Casual $15K-$50K, Hypercasual $10K+",
        ],
        "date_note": "Sources dated 2026 (Jun 2, Jul 20, Aug 4, 2026 publications)",
    },
]


def compute(service):
    slug = service["slug"]
    name = service["name"]
    low = service["market_low"]
    mid = service["market_mid"]
    high = service["market_high"]

    starter_usd = round_usd(low * STARTER_MULT)
    pro_usd = round_usd(mid * PRO_MULT)
    starter_market_price = round_usd(low)
    pro_market_price = round_usd(mid)
    starter_mmk = round_mmk(starter_usd * USD_MMK * LOCAL_DISCOUNT)
    pro_mmk = round_mmk(pro_usd * USD_MMK * LOCAL_DISCOUNT)
    starter_mmk_in_usd = round_usd(starter_mmk / USD_MMK)
    pro_mmk_in_usd = round_usd(pro_mmk / USD_MMK)
    starter_gap = (starter_usd - starter_mmk_in_usd) / starter_usd * 100
    pro_gap = (pro_usd - pro_mmk_in_usd) / pro_usd * 100

    return {
        "slug": slug, "name": name,
        "market_low": low, "market_mid": mid, "market_high": high,
        "starter_usd": starter_usd, "pro_usd": pro_usd,
        "starter_market_price": starter_market_price,
        "pro_market_price": pro_market_price,
        "starter_mmk": starter_mmk, "pro_mmk": pro_mmk,
        "starter_mmk_in_usd": starter_mmk_in_usd,
        "pro_mmk_in_usd": pro_mmk_in_usd,
        "starter_gap_pct": starter_gap, "pro_gap_pct": pro_gap,
        "sources": service["sources"], "date_note": service["date_note"],
    }


def main():
    results = [compute(s) for s in SERVICES]

    print("=" * 130)
    print("SUMMARY TABLE")
    print("=" * 130)
    print(f"{'#':<3} {'Slug':<32} {'STARTER USD':<14} {'STARTER MMK':<18} {'PRO USD':<14} {'PRO MMK':<18} {'2026 Market range':<25}")
    print("-" * 130)
    for i, r in enumerate(results, 1):
        market_range = f"${r['market_low']:,} - ${r['market_high']:,}"
        print(f"{i:<3} {r['slug']:<32} ${r['starter_usd']:,}{'':<6} {r['starter_mmk']:,} MMK{'':<3} ${r['pro_usd']:,}{'':<6} {r['pro_mmk']:,} MMK{'':<3} {market_range}")
    print()

    print("=" * 130)
    print("VERIFICATION (Local MMK in USD vs International USD, gap %)")
    print("=" * 130)
    for r in results:
        print(f"{r['slug']:<32}  STARTER: ${r['starter_usd']:,} USD vs Local-equiv ${r['starter_mmk_in_usd']:,} (gap {r['starter_gap_pct']:.1f}%)  |  PRO: ${r['pro_usd']:,} vs ${r['pro_mmk_in_usd']:,} (gap {r['pro_gap_pct']:.1f}%)")
    print()

    import json
    with open("/home/z/my-project/tmp-pricing-2026/v3_computed.json", "w") as f:
        json.dump(results, f, indent=2)
    print("Wrote /home/z/my-project/tmp-pricing-2026/v3_computed.json")


if __name__ == "__main__":
    main()
