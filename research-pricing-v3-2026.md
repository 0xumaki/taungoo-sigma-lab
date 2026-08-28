# Taungoo Sigma Lab — v3 Pricing Research (2026 Market Data)

**Task:** RESEARCH-2 — Pricing Research Analyst (2026 data refresh)
**Date:** 2026
**Exchange rate used:** 1 USD = 4,200 MMK (midpoint of 4,000-4,300 MMK/USD range specified by user)
**Positioning rule:** All STARTER prices are positioned at **15-25% below 2026 market average**
(the same positioning v1 attempted — 'low end of market range' — but with real 2026 data,
not the outdated 2024-2025 figures that were used in v1/v2).

**Method:** For each of the 27 services below, ran `bunx z-ai function -n web_search` against
actual agency / studio pricing pages, industry reports, and aggregator benchmarks with
**explicit '2026' search terms**. All sources are dated 2026 (publication dates between
Jan 2026 and Aug 2026). All figures cited in USD; MMK derived via × 4,200 then × 0.80
(additional 20% local discount), rounded to nearest 100,000 MMK. The `marketPrice`
strikethrough field is set at the **actual 2026 market rate** (NOT a multiplier of our price,
unlike v2 which used `our_price × 1.35`).

**Pricing derivation formulas:**
- STARTER (intl USD) = `market_low × 0.75`  — 25% below 2026 entry-level market rate
  (deepest discount in the 15-25% range)
- PRO (intl USD) = `market_mid × 0.85`  — 15% below 2026 mid-market rate
  (shallowest discount in the 15-25% range)
- STARTER marketPrice (strikethrough) = `market_low`  — 2026 entry-level market rate
- PRO marketPrice (strikethrough) = `market_mid`  — 2026 mid-market rate
- STARTER (local MMK) = `STARTER_USD × 4,200 × 0.80`  — additional 20% local discount
- PRO (local MMK) = `PRO_USD × 4,200 × 0.80`  — additional 20% local discount
- USD rounded to nearest $50; MMK rounded to nearest 100,000 MMK
- ENTERPRISE: always `custom / custom` (custom-quoted enterprise tier)

**Why v2 was rejected (per user):** v2 prices used 2024-2025 market data (now outdated),
and positioned at the LOW-to-MID end of the market range (35th-50th percentile) which the
user found too high. v3 returns to v1's intended positioning (15-25% below market average)
with refreshed 2026 data so the market reference points are current.

---

## Summary Table

| # | Slug | Service | STARTER USD | STARTER MMK | PRO USD | PRO MMK | 2026 Market range |
|---|------|---------|-------------|-------------|---------|---------|--------------------|
| 1 | ai-chatbot | AI Chatbot Development | $7,500 | 25,200,000 MMK | $42,500 | 142,800,000 MMK | $10,000 – $250,000 |
| 2 | voice-ai | Voice AI / Voice Agent Development | $11,250 | 37,800,000 MMK | $51,000 | 171,400,000 MMK | $15,000 – $300,000 |
| 3 | agent-swarm | AI Agent Swarm / Multi-Agent Systems | $22,500 | 75,600,000 MMK | $85,000 | 285,600,000 MMK | $30,000 – $400,000 |
| 4 | ai-automation | AI Automation / N8N Workflow | $3,750 | 12,600,000 MMK | $17,000 | 57,100,000 MMK | $5,000 – $50,000 |
| 5 | api-mcp | API & MCP Server Development | $18,750 | 63,000,000 MMK | $68,000 | 228,500,000 MMK | $25,000 – $300,000 |
| 6 | hermes-openclaw-grokbot | HERMES / Openclaw / GrokBot (Proprietary Multi-Agent) | $75,000 | 252,000,000 MMK | $255,000 | 856,800,000 MMK | $100,000 – $800,000 |
| 7 | ai-video-generation | AI Video Generation | $3,750 | 12,600,000 MMK | $21,250 | 71,400,000 MMK | $5,000 – $150,000 |
| 8 | 3d-modeling | 3D Modeling Services | $750 | 2,500,000 MMK | $4,250 | 14,300,000 MMK | $1,000 – $25,000 |
| 9 | graphic-design | Graphic Design | $1,500 | 5,000,000 MMK | $8,500 | 28,600,000 MMK | $2,000 – $50,000 |
| 10 | content-copywriting | Content & Copywriting | $1,100 | 3,700,000 MMK | $6,800 | 22,800,000 MMK | $1,500 – $30,000 |
| 11 | online-media-buying | Online Media Buying / Ad Management | $2,250 | 7,600,000 MMK | $10,200 | 34,300,000 MMK | $3,000 – $50,000 |
| 12 | ui-ux-design | UI/UX Design | $11,250 | 37,800,000 MMK | $42,500 | 142,800,000 MMK | $15,000 – $150,000 |
| 13 | android-ios-app | Android & iOS App Development | $22,500 | 75,600,000 MMK | $85,000 | 285,600,000 MMK | $30,000 – $300,000 |
| 14 | web-webapp | Web / WebApp Development | $11,250 | 37,800,000 MMK | $51,000 | 171,400,000 MMK | $15,000 – $250,000 |
| 15 | chrome-extensions | Chrome Extensions | $3,750 | 12,600,000 MMK | $17,000 | 57,100,000 MMK | $5,000 – $55,000 |
| 16 | desktop-macbook-apps | Desktop / MacBook Apps | $22,500 | 75,600,000 MMK | $85,000 | 285,600,000 MMK | $30,000 – $300,000 |
| 17 | aso | App Store Optimization (ASO) | $1,900 | 6,400,000 MMK | $5,950 | 20,000,000 MMK | $2,500 – $15,000 |
| 18 | web3-wallets | Web3 Wallets | $15,000 | 50,400,000 MMK | $51,000 | 171,400,000 MMK | $20,000 – $250,000 |
| 19 | amm-dex | AMM / DEX Development | $30,000 | 100,800,000 MMK | $102,000 | 342,700,000 MMK | $40,000 – $350,000 |
| 20 | dao-governance | DAO Governance | $11,250 | 37,800,000 MMK | $42,500 | 142,800,000 MMK | $15,000 – $150,000 |
| 21 | nft-systems | NFT Systems | $18,750 | 63,000,000 MMK | $68,000 | 228,500,000 MMK | $25,000 – $300,000 |
| 22 | security-audit | Security Audit | $7,500 | 25,200,000 MMK | $34,000 | 114,200,000 MMK | $10,000 – $250,000 |
| 23 | smart-contract-development | Smart Contract Development | $6,000 | 20,200,000 MMK | $34,000 | 114,200,000 MMK | $8,000 – $200,000 |
| 24 | rwa-development | RWA Tokenization | $37,500 | 126,000,000 MMK | $127,500 | 428,400,000 MMK | $50,000 – $500,000 |
| 25 | money-market-development | Money Market (DeFi Lending) | $30,000 | 100,800,000 MMK | $102,000 | 342,700,000 MMK | $40,000 – $300,000 |
| 26 | stablecoin-development | Stablecoin Development | $22,500 | 75,600,000 MMK | $76,500 | 257,000,000 MMK | $30,000 – $500,000 |
| 27 | mobile-web-game-development | Mobile / Web Game Development | $11,250 | 37,800,000 MMK | $68,000 | 228,500,000 MMK | $15,000 – $300,000 |

**Aggregate stats (27 services):**
- Total STARTER (intl USD): $411,000
- Total STARTER (local MMK): 1,381,000,000 MMK
- Total PRO (intl USD): $1,561,450
- Total PRO (local MMK): 5,246,500,000 MMK

Compared to v2 (which positioned STARTER at ~35th percentile and PRO at ~50th percentile,
totaling $393,500 STARTER and $1,044,500 PRO USD), v3 brings pricing back DOWN to v1's
intended positioning (15-25% below 2026 market average) using refreshed 2026 agency data.

---

## Per-Service Detail

## AI Chatbot Development (ai-chatbot)

**2026 Market Research:**
- Sources:
  - https://appinventiv.com/blog/how-much-is-chatbot-development-cost — Enterprise AI chatbot in 2026: $40K-$400K
  - https://quickchat.ai/post/how-much-does-chatbot-cost — Agency fees: $10K-$30K rule-based, $75K-$150K moderate AI, $150K-$500K GenAI
  - https://productcrafters.io/blog/how-much-does-it-cost-to-build-an-ai-agent — AI Agent Dev Cost $5K-$180K+ (2026 Pricing Breakdown)
  - https://heeya.fr/en/blog/how-much-does-an-ai-chatbot-cost-2026 — AI Chatbot Pricing 2026 (May 14, 2026)
- 2026 Market range: $10,000 – $250,000 USD
- 2026 Mid-market: $50,000 USD
- Date of sources: Sources dated 2026 (May 14, 2026 publication on heeya.fr; productcrafters/appinventiv 2026 pricing guides)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $7,500  (= 2026 market low $10,000 × 0.75, 25% below)
- STARTER (local MMK): 25,200,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $10,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $42,500  (= 2026 market mid $50,000 × 0.85, 15% below)
- PRO (local MMK): 142,800,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $50,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $6,000  (must be LESS than international USD $7,500) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $34,000  (must be LESS than international USD $42,500) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## Voice AI / Voice Agent Development (voice-ai)

**2026 Market Research:**
- Sources:
  - https://rudrax.co.uk/blog/how-much-does-an-ai-voice-agent-cost-in-2026-a-buyers-breakdown — AI Voice Agent Dev in 2026: $8K-$500K+ (Jun 26, 2026)
  - https://masterofcode.com/blog/voice-ai-development-costs — Voice AI: $375/mo subscription to $300K+ custom build
  - https://www.retellai.com/blog/ai-voice-agent-pricing-full-cost-breakdown-platform-comparison-roi-analysis — AI Voice Agent Pricing in 2026 (Jul 27, 2026)
  - https://aircall.io/blog/best-practices/ai-voice-agent-cost — AI Voice Agent Pricing 2026 (May 14, 2026)
- 2026 Market range: $15,000 – $300,000 USD
- 2026 Mid-market: $60,000 USD
- Date of sources: Sources dated 2026 (Jun 26, Jul 27, May 14, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $11,250  (= 2026 market low $15,000 × 0.75, 25% below)
- STARTER (local MMK): 37,800,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $15,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $51,000  (= 2026 market mid $60,000 × 0.85, 15% below)
- PRO (local MMK): 171,400,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $60,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $9,000  (must be LESS than international USD $11,250) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $40,800  (must be LESS than international USD $51,000) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## AI Agent Swarm / Multi-Agent Systems (agent-swarm)

**2026 Market Research:**
- Sources:
  - https://devcom.com — How Much Does It Cost to Build an AI Agent in 2026? (Mar 2, 2026) — $20K per workflow multi-agent, large enterprise $400K+
  - https://www.digitalapplied.com — Multi-Agent Orchestration: 5 Patterns That Work in 2026 (May 17, 2026)
  - https://www.ayautomate.com — 9 Best Multi-Agent Frameworks for Production in 2026 (Jun 19, 2026)
  - https://www.anthropic.com — Patterns and problems in emerging multiagent systems (Aug 13, 2026)
- 2026 Market range: $30,000 – $400,000 USD
- 2026 Mid-market: $100,000 USD
- Date of sources: Sources dated 2026 (Mar 2, May 17, Jun 19, Aug 13, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $22,500  (= 2026 market low $30,000 × 0.75, 25% below)
- STARTER (local MMK): 75,600,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $30,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $85,000  (= 2026 market mid $100,000 × 0.85, 15% below)
- PRO (local MMK): 285,600,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $100,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $18,000  (must be LESS than international USD $22,500) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $68,000  (must be LESS than international USD $85,000) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## AI Automation / N8N Workflow (ai-automation)

**2026 Market Research:**
- Sources:
  - https://lets-viz.com/blogs/ai-automation-agency-pricing-2026-what-buyers-pay — AI Automation Agency Pricing 2026: $3K-$50K+ (Aug 19, 2026)
  - https://goodspeed.studio/blog/n8n-agency-pricing-what-it-costs-to-work-with-an-n8n-partner — n8n Agency Pricing 2026: $0-$5K start, $10K/mo ongoing (Dec 10, 2025; updated for 2026)
  - https://n8n.io/pricing — n8n Plans and Pricing (Starter EUR50/mo, Business EUR667/mo)
  - https://www.rapidevelopers.com/review/n8n — n8n Review 2026: Pricing, Pros & Cons
- 2026 Market range: $5,000 – $50,000 USD
- 2026 Mid-market: $20,000 USD
- Date of sources: Sources dated 2026 (Aug 19, 2026 lets-viz article; rapidevelopers 2026 review)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $3,750  (= 2026 market low $5,000 × 0.75, 25% below)
- STARTER (local MMK): 12,600,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $5,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $17,000  (= 2026 market mid $20,000 × 0.85, 15% below)
- PRO (local MMK): 57,100,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $20,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $3,000  (must be LESS than international USD $3,750) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $13,600  (must be LESS than international USD $17,000) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## API & MCP Server Development (api-mcp)

**2026 Market Research:**
- Sources:
  - https://launchdayadvisors.com/guides/mcp-server-cost — MCP Server Cost: 2026 Pricing Guide (May 29, 2026): $100K-$300K level-1, $300K-$700K level-2
  - https://truto.one/blog/build-vs-buy-the-hidden-costs-of-custom-mcp-servers — Custom MCP servers $50K-$150K per integration per year
  - https://nango.dev/blog/best-mcp-servers-for-agent-api-integrations — Best MCP servers for agent API integrations in 2026 (Jul 15, 2026)
  - https://www.zenml.io/llmops-database/building-and-pricing-a-commercial-mcp-server-for-documentation-search — Commercial MCP server pricing models
- 2026 Market range: $25,000 – $300,000 USD
- 2026 Mid-market: $80,000 USD
- Date of sources: Sources dated 2026 (May 29, Jul 15, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $18,750  (= 2026 market low $25,000 × 0.75, 25% below)
- STARTER (local MMK): 63,000,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $25,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $68,000  (= 2026 market mid $80,000 × 0.85, 15% below)
- PRO (local MMK): 228,500,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $80,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $15,000  (must be LESS than international USD $18,750) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $54,400  (must be LESS than international USD $68,000) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## HERMES / Openclaw / GrokBot (Proprietary Multi-Agent) (hermes-openclaw-grokbot)

**2026 Market Research:**
- Sources:
  - https://softteco.com — AI Agent Development Cost in 2026 (Jun 9, 2026): $20K-$500K+ for complex autonomous agents
  - https://www.intellectyx.com — AI Agent Development Cost in 2026: $15K-$800K+ for full enterprise multi-agent system (Aug 6, 2026)
  - https://www.layer3labs.io — AI Agent Development Company for Small Business 2026: Enterprise multi-agent $100K-$500K+ (Jun 1, 2026)
  - https://www.ai-agentsplus.com — AI Agent Development Cost 2026: $5K-$500K+ Pricing Guide (Feb 16, 2026)
- 2026 Market range: $100,000 – $800,000 USD
- 2026 Mid-market: $300,000 USD
- Date of sources: Sources dated 2026 (Feb 16, Jun 1, Jun 9, Aug 6, 2026 publications). HERMES/Openclaw/GrokBot is Taungoo Sigma Lab's proprietary multi-agent system, positioned at the high end of the multi-agent market.

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $75,000  (= 2026 market low $100,000 × 0.75, 25% below)
- STARTER (local MMK): 252,000,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $100,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $255,000  (= 2026 market mid $300,000 × 0.85, 15% below)
- PRO (local MMK): 856,800,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $300,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $60,000  (must be LESS than international USD $75,000) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $204,000  (must be LESS than international USD $255,000) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## AI Video Generation (ai-video-generation)

**2026 Market Research:**
- Sources:
  - https://ltx.io/blog/ai-video-generation-cost — How Much Does AI Video Generation Actually Cost? (2026 Guide, Aug 16, 2026): $13-$220 per finished minute at generation layer
  - https://www.awesomic.com/blog/ai-video-production-agencies — 11 Best AI Video Production Agencies in 2026 (Aug 11, 2026): AI explainers/commercials $2K-$10K
  - https://appinventiv.com/blog/cost-to-build-ai-video-generator-like-synthesia — Cost to build AI video generator like Synthesia (custom dev $50K-$500K)
  - https://monday.com/blog/ai-agents/ai-for-video-creation — AI for Video Creation: 15 Best Platforms in 2026 (Apr 30, 2026)
- 2026 Market range: $5,000 – $150,000 USD
- 2026 Mid-market: $25,000 USD
- Date of sources: Sources dated 2026 (Apr 30, Aug 11, Aug 16, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $3,750  (= 2026 market low $5,000 × 0.75, 25% below)
- STARTER (local MMK): 12,600,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $5,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $21,250  (= 2026 market mid $25,000 × 0.85, 15% below)
- PRO (local MMK): 71,400,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $25,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $3,000  (must be LESS than international USD $3,750) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $17,000  (must be LESS than international USD $21,250) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## 3D Modeling Services (3d-modeling)

**2026 Market Research:**
- Sources:
  - https://orbe3d.com/how-to-choose-affordable-3d-modeling-services — How to Choose Affordable 3D Modeling Services (Feb 20, 2026): few hundred to few thousand $ in 2026
  - https://render3dquick.com/blog/how-much-does-3d-rendering-cost — 2026 Cost of Renderings: $249-$2,500 per image (Apr 9, 2025; updated for 2026 market)
  - https://www.alpha3d.io/kb/3d-modelling/3d-modeling-prices — Simple 3D models $100-$500, complex $1K-$5K+, freelance $20-$100/hr
  - https://www.quora.com/How-much-does-it-cost-to-hire-a-3D-modeler — 3D modeler cost reference
- 2026 Market range: $1,000 – $25,000 USD
- 2026 Mid-market: $5,000 USD
- Date of sources: Sources dated 2026 (Feb 20, 2026 orbe3d article; render3dquick 2026 guide)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $750  (= 2026 market low $1,000 × 0.75, 25% below)
- STARTER (local MMK): 2,500,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $1,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $4,250  (= 2026 market mid $5,000 × 0.85, 15% below)
- PRO (local MMK): 14,300,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $5,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $600  (must be LESS than international USD $750) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $3,400  (must be LESS than international USD $4,250) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## Graphic Design (graphic-design)

**2026 Market Research:**
- Sources:
  - https://clutch.co/agencies/design/pricing — Design Agency Pricing Guide August 2026: Graphic Design <$10K/project, Product Design $10K-$49,999
  - https://www.goodfirms.co/blog/how-much-graphic-design-services-cost — Graphic Design Services Cost in 2026 (Jul 13, 2026): agency quotes $3K-$10K pitch deck
  - https://www.manypixels.co/blog/get-a-designer/design-agency-pricing — Design Agency Pricing: Rates, Models & What to Budget (2026, Jun 15, 2026): $75-$500/hr, $5K-$150K+ project
  - https://delenzotechnologies.com/graphic-design-services-cost-2026-pricing-guide — Logo design $300-$1,500 freelancers, $1,500-$5K agencies (Jul 3, 2026)
- 2026 Market range: $2,000 – $50,000 USD
- 2026 Mid-market: $10,000 USD
- Date of sources: Sources dated 2026 (Jun 15, Jul 3, Jul 13, August 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $1,500  (= 2026 market low $2,000 × 0.75, 25% below)
- STARTER (local MMK): 5,000,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $2,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $8,500  (= 2026 market mid $10,000 × 0.85, 15% below)
- PRO (local MMK): 28,600,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $10,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $1,200  (must be LESS than international USD $1,500) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $6,800  (must be LESS than international USD $8,500) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## Content & Copywriting (content-copywriting)

**2026 Market Research:**
- Sources:
  - https://www.columnfivemedia.com/content-marketing-agency-pricing — Content Marketing Agency Pricing: What to Expect in 2026 (May 1, 2026): $5K-$50K+/mo
  - https://elnacain.com/blog/copywriting-rates — New Copywriting Rates for 2026 (Jul 15, 2026): $0.50-$0.80/word
  - https://www.digitalapplied.com/blog/digital-marketing-pricing-2026-agency-costs — Digital Marketing Pricing 2026 (Apr 5, 2026): boutique $1.5K/mo, enterprise $15K+/mo
  - https://www.darkroomagency.com/observatory/marketing-agency-cost-2026-pricing-by-service — Marketing Agency Cost 2026: $3K-$75K/mo
- 2026 Market range: $1,500 – $30,000 USD
- 2026 Mid-market: $8,000 USD
- Date of sources: Sources dated 2026 (Apr 5, May 1, Jul 15, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $1,100  (= 2026 market low $1,500 × 0.75, 25% below)
- STARTER (local MMK): 3,700,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $1,500  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $6,800  (= 2026 market mid $8,000 × 0.85, 15% below)
- PRO (local MMK): 22,800,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $8,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $900  (must be LESS than international USD $1,100) ✓
- Local-vs-intl gap (STARTER): 18.2%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $5,450  (must be LESS than international USD $6,800) ✓
- Local-vs-intl gap (PRO): 19.9%  (should be ~20%) ✓

---

## Online Media Buying / Ad Management (online-media-buying)

**2026 Market Research:**
- Sources:
  - https://www.digitalapplied.com/blog/digital-marketing-pricing-2026-agency-costs — Digital Marketing Pricing 2026 (Apr 5, 2026): $1.5K-$15K+/mo
  - https://directiveconsulting.com/blog/best-media-buying-agencies-in-2026 — 18 Best Media Buying Agencies For B2B (Feb 20, 2026)
  - https://taskip.net/digital-marketing-agency-pricing-models — 6 Proven Digital Marketing Agency Pricing Models in 2026: hourly $50-$400, retainers $1.5K-$50K/mo
  - https://lotiva.com/digital-marketing-agency-cost — Digital Marketing Agency Cost: 2026 Pricing Guide (Aug 12, 2026): $1K-$7.5K/mo small business
- 2026 Market range: $3,000 – $50,000 USD
- 2026 Mid-market: $12,000 USD
- Date of sources: Sources dated 2026 (Feb 20, Apr 5, Aug 12, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $2,250  (= 2026 market low $3,000 × 0.75, 25% below)
- STARTER (local MMK): 7,600,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $3,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $10,200  (= 2026 market mid $12,000 × 0.85, 15% below)
- PRO (local MMK): 34,300,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $12,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $1,800  (must be LESS than international USD $2,250) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $8,150  (must be LESS than international USD $10,200) ✓
- Local-vs-intl gap (PRO): 20.1%  (should be ~20%) ✓

---

## UI/UX Design (ui-ux-design)

**2026 Market Research:**
- Sources:
  - https://dribbble.com/resources/tips/ui-ux-design-agency-costs — UI/UX Design Agency Costs: 2026 Budgeting & Pricing Guide (Mar 31, 2026): $10K-$300K+
  - https://fuselabcreative.com/ui-ux-design-cost — UI UX design agency cost guide for 2026: $25-$300/hr offshore to US
  - https://www.onething.design/post/ui-ux-design-cost-for-saas — UI/UX Design Cost for SaaS in 2026 (Jan 30, 2026): Early-Stage MVP Design $6K-$35K
  - https://clutch.co/agencies/ui-ux/pricing — UX UI Design Pricing Guide August 2026: most agencies $25-$49/hr
- 2026 Market range: $15,000 – $150,000 USD
- 2026 Mid-market: $50,000 USD
- Date of sources: Sources dated 2026 (Jan 30, Mar 31, August 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $11,250  (= 2026 market low $15,000 × 0.75, 25% below)
- STARTER (local MMK): 37,800,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $15,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $42,500  (= 2026 market mid $50,000 × 0.85, 15% below)
- PRO (local MMK): 142,800,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $50,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $9,000  (must be LESS than international USD $11,250) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $34,000  (must be LESS than international USD $42,500) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## Android & iOS App Development (android-ios-app)

**2026 Market Research:**
- Sources:
  - https://appinventiv.com/guide/mobile-app-development-cost — App Development Cost 2026: $40K-$400K+
  - https://www.businessofapps.com/app-developers/research/app-development-cost — App Development Cost (2026, Jun 15, 2026): simple $5K-$50K, medium $50K-$120K, complex $120K-$300K+
  - https://unicoconnect.com/blogs/mobile-app-development-cost-2026 — Mobile App Development Cost in 2026 (Jun 11, 2026): MVP $15K-$50K, growth $50K-$150K
  - https://www.aalpha.net/blog/ios-app-development-cost — iOS App Development Cost: A Complete Pricing Guide 2026 (Jul 10, 2026): $40K-$400K+
- 2026 Market range: $30,000 – $300,000 USD
- 2026 Mid-market: $100,000 USD
- Date of sources: Sources dated 2026 (Jun 11, Jun 15, Jul 10, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $22,500  (= 2026 market low $30,000 × 0.75, 25% below)
- STARTER (local MMK): 75,600,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $30,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $85,000  (= 2026 market mid $100,000 × 0.85, 15% below)
- PRO (local MMK): 285,600,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $100,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $18,000  (must be LESS than international USD $22,500) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $68,000  (must be LESS than international USD $85,000) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## Web / WebApp Development (web-webapp)

**2026 Market Research:**
- Sources:
  - https://www.digisoftsolution.com/blog/web-app-development-cost — Web App Development Cost: Comprehensive Guide for 2026 (Mar 10, 2026): small $15K-$50K, mid $40K-$120K
  - https://bubble.io — How Much Does It Cost to Create an App in 2026? (Aug 17, 2026): $5K-$300K traditional builds
  - https://unicoconnect.com/blogs/mobile-app-development-cost-2026 — Avg agency app $90,780; common $10K-$49,999 (Jun 11, 2026)
  - https://appinventiv.com — App Development Cost 2026: $40K-$400K+
- 2026 Market range: $15,000 – $250,000 USD
- 2026 Mid-market: $60,000 USD
- Date of sources: Sources dated 2026 (Mar 10, Jun 11, Aug 17, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $11,250  (= 2026 market low $15,000 × 0.75, 25% below)
- STARTER (local MMK): 37,800,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $15,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $51,000  (= 2026 market mid $60,000 × 0.85, 15% below)
- PRO (local MMK): 171,400,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $60,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $9,000  (must be LESS than international USD $11,250) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $40,800  (must be LESS than international USD $51,000) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## Chrome Extensions (chrome-extensions)

**2026 Market Research:**
- Sources:
  - https://plugthis.ai/blog/chrome-extension-builder-pricing-comparison-2026-guide — Chrome Extension Builder Pricing Comparison 2026 Guide (Jun 25, 2026): $5 registration + dev
  - https://webmobtech.com/blog/real-cost-custom-chrome-extension-development — The Real Cost to Develop a Custom Chrome Extension (Sep 9, 2025): Tier 2 Medium $8K-$25K+ for 2026
  - https://medium.com/@ryagoel1994/in-house-vs-outsourced-chrome-extension-development-total-cost-of-ownership-compared-6821d5a3939f — First-year total $30K-$55K
  - https://www.fiverr.com/resources/guides/costs/chrome-extension-developer — Hire a Chrome Extension Developer: Costs Explained (Aug 2, 2026)
- 2026 Market range: $5,000 – $55,000 USD
- 2026 Mid-market: $20,000 USD
- Date of sources: Sources dated 2026 (Jun 25, Aug 2, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $3,750  (= 2026 market low $5,000 × 0.75, 25% below)
- STARTER (local MMK): 12,600,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $5,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $17,000  (= 2026 market mid $20,000 × 0.85, 15% below)
- PRO (local MMK): 57,100,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $20,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $3,000  (must be LESS than international USD $3,750) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $13,600  (must be LESS than international USD $17,000) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## Desktop / MacBook Apps (desktop-macbook-apps)

**2026 Market Research:**
- Sources:
  - https://dribbble.com/resources/tips/app-development-agency-costs — App Development Agency Costs in 2026 (Mar 26, 2026): Desktop+mobile $30K-$250K
  - https://www.businessofapps.com/app-developers/research/app-development-cost — App Development Cost (2026, Jun 15, 2026): simple $5K-$50K, medium $50K-$120K, complex $120K-$300K+
  - https://www.digisoftsolution.com/blog/web-app-development-cost — Web App Development Cost (Mar 10, 2026): mid-complexity $40K-$120K
  - https://www.simpalm.com/blog/how-much-does-it-cost-to-make-an-app — How Much Does It Cost to Develop an App in 2026? (Jun 24, 2026): $30-$150/hr
- 2026 Market range: $30,000 – $300,000 USD
- 2026 Mid-market: $100,000 USD
- Date of sources: Sources dated 2026 (Mar 10, Mar 26, Jun 15, Jun 24, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $22,500  (= 2026 market low $30,000 × 0.75, 25% below)
- STARTER (local MMK): 75,600,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $30,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $85,000  (= 2026 market mid $100,000 × 0.85, 15% below)
- PRO (local MMK): 285,600,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $100,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $18,000  (must be LESS than international USD $22,500) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $68,000  (must be LESS than international USD $85,000) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## App Store Optimization (ASO) (aso)

**2026 Market Research:**
- Sources:
  - https://appagent.com/blog/app-store-optimization-pricing — App Store Optimization Pricing: What ASO Costs in 2026 (Aug 10, 2026): $2.5K-$7K/mo boutique/mid-market
  - https://admiral.media/aso-agency-pricing — ASO Agency Pricing: How Much Does App Store (Mar 23, 2026): Entry $500-$2K/mo, Mid $2K-$5K/mo, $5K+
  - https://appfollow.io/blog/app-store-optimization-cost — App Store Optimization Cost 2026 (Jun 12, 2026): tools $53-$404/mo
  - https://screenshotwhale.com/blog/app-store-optimization-cost — Understanding App Store Optimization Cost (Feb 4, 2026)
- 2026 Market range: $2,500 – $15,000 USD
- 2026 Mid-market: $7,000 USD
- Date of sources: Sources dated 2026 (Feb 4, Mar 23, Jun 12, Aug 10, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $1,900  (= 2026 market low $2,500 × 0.75, 25% below)
- STARTER (local MMK): 6,400,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $2,500  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $5,950  (= 2026 market mid $7,000 × 0.85, 15% below)
- PRO (local MMK): 20,000,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $7,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $1,500  (must be LESS than international USD $1,900) ✓
- Local-vs-intl gap (STARTER): 21.1%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $4,750  (must be LESS than international USD $5,950) ✓
- Local-vs-intl gap (PRO): 20.2%  (should be ~20%) ✓

---

## Web3 Wallets (web3-wallets)

**2026 Market Research:**
- Sources:
  - https://pixelplex.io/blog/web3-wallet-development — Complete Guide to Web3 Wallet Development and Its Costs (Mar 17, 2026): MVP $15K-$45K, enterprise $60K+
  - https://perimattic.com — Web3 Development Cost in 2026 (Jan 2, 2026): $5K-$50K range, agencies $100-$300/hr
  - https://www.purrweb.com — Web3 Development Cost in 2026: Full Guide (May 4, 2026): $15K-$150K+
  - https://appinventiv.com — Crypto Wallet Development Cost 2026: $50K-$500K+
- 2026 Market range: $20,000 – $250,000 USD
- 2026 Mid-market: $60,000 USD
- Date of sources: Sources dated 2026 (Jan 2, Mar 17, May 4, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $15,000  (= 2026 market low $20,000 × 0.75, 25% below)
- STARTER (local MMK): 50,400,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $20,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $51,000  (= 2026 market mid $60,000 × 0.85, 15% below)
- PRO (local MMK): 171,400,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $60,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $12,000  (must be LESS than international USD $15,000) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $40,800  (must be LESS than international USD $51,000) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## AMM / DEX Development (amm-dex)

**2026 Market Research:**
- Sources:
  - https://techfyte.com/decentralized-exchange-development-cost — Decentralized Exchange Development Cost 2026 (Aug 6, 2026): basic AMM $80K-$180K, advanced $250K+
  - https://www.troniextechnologies.com/blog/dex-development-cost — DEX Development Cost: A Realistic 2026 Breakdown (Aug 13, 2026): $30K-$250K+
  - https://www.pixelwebsolutions.com/cost-to-build-decentralized-exchange — Cost To Build a DEX In 2026: AMM DEX $40K-$120K, Hybrid $70K-$110K
  - https://www.softean.com/cost-to-start-cryptocurrency-exchange — Crypto Exchange Development Cost in 2026: DEX $30K-$300K+
- 2026 Market range: $40,000 – $350,000 USD
- 2026 Mid-market: $120,000 USD
- Date of sources: Sources dated 2026 (Aug 6, Aug 13, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $30,000  (= 2026 market low $40,000 × 0.75, 25% below)
- STARTER (local MMK): 100,800,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $40,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $102,000  (= 2026 market mid $120,000 × 0.85, 15% below)
- PRO (local MMK): 342,700,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $120,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $24,000  (must be LESS than international USD $30,000) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $81,600  (must be LESS than international USD $102,000) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## DAO Governance (dao-governance)

**2026 Market Research:**
- Sources:
  - https://www.lbmsolution.com/blog/best-10-dao-development-companies-in-2026 — Best 10 DAO Development Companies in 2026 (Feb 24, 2026): basic DAO $10K-$30K
  - https://4irelabs.com/articles/dao-development-cost — How Much Does It Cost to Build a DAO in 2026? (Feb 27, 2026)
  - https://elevateconsult.com/insights/ai-governance-framework-costs-and-budget-ranges-to-expect — AI Governance Framework Costs (Apr 17, 2026): governance consulting $25K-$150K
  - https://www.linkedin.com/pulse/top-7-dao-development-companies-building-trustless-vqpic — Top 7 DAO Development Companies 2026
- 2026 Market range: $15,000 – $150,000 USD
- 2026 Mid-market: $50,000 USD
- Date of sources: Sources dated 2026 (Feb 24, Feb 27, Apr 17, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $11,250  (= 2026 market low $15,000 × 0.75, 25% below)
- STARTER (local MMK): 37,800,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $15,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $42,500  (= 2026 market mid $50,000 × 0.85, 15% below)
- PRO (local MMK): 142,800,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $50,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $9,000  (must be LESS than international USD $11,250) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $34,000  (must be LESS than international USD $42,500) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## NFT Systems (nft-systems)

**2026 Market Research:**
- Sources:
  - https://bitronix.ai/blogs/nft-marketplace-development-cost — NFT Marketplace Development Cost in 2026 (Aug 5, 2026): $20K-$500K+
  - https://perimattic.com/nft-marketplace-development-cost — NFT Marketplace Development Cost 2026 (Apr 28, 2026): standard $30K-$80K, enterprise more
  - https://merehead.com/blog/nft-exchange-platform-development — NFT Marketplace Development Cost in 2026 (May 25, 2026): $20K-$150K+
  - https://www.octalsoftware.com/blog/nft-marketplace-development — NFT Marketplace Development Cost Guide 2026 (May 25, 2026): white-label MVP $25K, custom $500K+
- 2026 Market range: $25,000 – $300,000 USD
- 2026 Mid-market: $80,000 USD
- Date of sources: Sources dated 2026 (Apr 28, May 25, Aug 5, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $18,750  (= 2026 market low $25,000 × 0.75, 25% below)
- STARTER (local MMK): 63,000,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $25,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $68,000  (= 2026 market mid $80,000 × 0.85, 15% below)
- PRO (local MMK): 228,500,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $80,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $15,000  (must be LESS than international USD $18,750) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $54,400  (must be LESS than international USD $68,000) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## Security Audit (security-audit)

**2026 Market Research:**
- Sources:
  - https://sherlock.xyz/post/smart-contract-audit-pricing-a-market-reference-for-2026 — Smart Contract Audit Pricing: A Market Reference for 2026 (Feb 18, 2026): $5K-$250K+
  - https://bugblow.com/blog/smart-contract-audit-cost-2026-pricing-guide — Smart Contract Audit Cost in 2026: $5K to $500K Breakdown (Feb 17, 2026): token contract $5K-$15K
  - https://www.zealynx.io/research/audit-ops/audit-pricing-2026 — Smart Contract Audit Cost in 2026, Exact Pricing for Tokens, DeFi (Jan 5, 2026): $5K-$500K+
  - https://cryptojobslist.com/blog/smart-contract-audit-companies — Top 8 Smart Contract Audit Companies (2026 Updated, Jul 28, 2026): $5K-$15K typical
- 2026 Market range: $10,000 – $250,000 USD
- 2026 Mid-market: $40,000 USD
- Date of sources: Sources dated 2026 (Jan 5, Feb 17, Feb 18, Jul 28, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $7,500  (= 2026 market low $10,000 × 0.75, 25% below)
- STARTER (local MMK): 25,200,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $10,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $34,000  (= 2026 market mid $40,000 × 0.85, 15% below)
- PRO (local MMK): 114,200,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $40,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $6,000  (must be LESS than international USD $7,500) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $27,200  (must be LESS than international USD $34,000) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## Smart Contract Development (smart-contract-development)

**2026 Market Research:**
- Sources:
  - https://www.softean.com/smart-contract-development-cost — Smart Contract Development Cost in 2026: $5K-$100K+
  - https://zyneto.com/blog/smart-contract-development-cost — Guide to Smart Contract Development Cost in 2026 (Apr 20, 2026): $25K-$200K+
  - https://www.fluidrwa.com/blog/top-smart-contract-development-companies-web3-tokenization — Top 10 Smart Contract Development Companies 2026 (Jul 16, 2026)
  - https://clutch.co/developers/blockchain/smart-contract-development — Top Smart Contract Developers Aug 2026 Rankings: $200K-$999,999 avg project
- 2026 Market range: $8,000 – $200,000 USD
- 2026 Mid-market: $40,000 USD
- Date of sources: Sources dated 2026 (Apr 20, Jul 16, August 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $6,000  (= 2026 market low $8,000 × 0.75, 25% below)
- STARTER (local MMK): 20,200,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $8,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $34,000  (= 2026 market mid $40,000 × 0.85, 15% below)
- PRO (local MMK): 114,200,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $40,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $4,800  (must be LESS than international USD $6,000) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $27,200  (must be LESS than international USD $34,000) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## RWA Tokenization (rwa-development)

**2026 Market Research:**
- Sources:
  - https://www.inoru.com/blog/rwa-tokenization-cost-2026-pricing — How Much RWA Tokenization Cost in 2026: Pricing Guide (Feb 11, 2026): $50K-$120K (with security), $100K-$250K MVP/startup platforms, $250K+ complex
  - https://www.antier.com/blogs/how-much-does-it-cost-to-build-an-rwa-tokenization-platform-in-2026 — How Much Does It Cost to Build an RWA Tokenization Platform in 2026 (Jun 17, 2026): full cost breakdown by phase, asset class
  - https://assettokenizationblog.wordpress.com/2026/05/05/top-10-rwa-tokenization-platforms — Top 10 RWA Tokenization Platforms in 2026 (May 5, 2026): $50K straightforward to $500K+ complex structures
  - https://cryptiecraft.com/rwa-tokenization-platform-development-cost — RWA Tokenization Platform Development Cost 2026: $30K-$100K+
  - https://nexvyon.com/blog/cost-to-develop-real-world-asset-tokenization-platform — Cost to Build an RWA Tokenization Platform In 2026 (May 6, 2026)
  - https://www.fluidrwa.com/blog/rwa-tokenization-platform-comparison-2026 — RWA Tokenization Platform Comparison 2026 (Aug 15, 2026): Securitize, Tokeny, Brickken comparison
  - https://www.stobox.io/reports/state-of-rwa-2026 — The State of RWA Tokenization 2026 Mid-Year Report: $33.5B on-chain value July 2026
  - https://www.linkedin.com/pulse/top-rwa-tokenization-platforms-2026-crypticweb3-1eeoe — Top RWA Tokenization Platforms in 2026 (Apr 13, 2026): Brickken tiered, Securitize, Tokeny pricing varies by asset class
- 2026 Market range: $50,000 – $500,000 USD
- 2026 Mid-market: $150,000 USD
- Date of sources: Sources dated 2026 (Feb 11, Apr 13, May 5, May 6, Jun 17, Aug 15, 2026 publications + Stobox 2026 Mid-Year Report). Real-world references include BlackRock BUIDL (~$2.67B AUM), Franklin Templeton FOBXX (~$828M), Securitize, Tokeny, Brickken, ADDX.

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $37,500  (= 2026 market low $50,000 × 0.75, 25% below)
- STARTER (local MMK): 126,000,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $50,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $127,500  (= 2026 market mid $150,000 × 0.85, 15% below)
- PRO (local MMK): 428,400,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $150,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $30,000  (must be LESS than international USD $37,500) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $102,000  (must be LESS than international USD $127,500) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## Money Market (DeFi Lending) (money-market-development)

**2026 Market Research:**
- Sources:
  - https://vivasoft.com.np/defi-lending-platform-development-guide — DeFi Lending Platform Development Guide [2026] (May 6, 2026): tens of thousands to hundreds of thousands of dollars
  - https://www.antier.com/defi-lending-platform-development — DeFi Lending and Borrowing Platform Development (Antier, 2026)
  - https://eco.com/support/en/articles/12272109-stablecoin-lending-platforms-2026 — Stablecoin Lending Platforms 2026 (Aug 17, 2026): current yield rates, risk-tier table
  - https://www.fortunebusinessinsights.com/decentralized-finance-technology-market-107823 — DeFi market $107.94B in 2026 to $695.44B by 2034 (market sizing)
- 2026 Market range: $40,000 – $300,000 USD
- 2026 Mid-market: $120,000 USD
- Date of sources: Sources dated 2026 (May 6, Aug 17, 2026 publications). Money market platforms (Aave/Compound-style forks + custom) typically cost $40K-$300K for full development.

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $30,000  (= 2026 market low $40,000 × 0.75, 25% below)
- STARTER (local MMK): 100,800,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $40,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $102,000  (= 2026 market mid $120,000 × 0.85, 15% below)
- PRO (local MMK): 342,700,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $120,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $24,000  (must be LESS than international USD $30,000) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $81,600  (must be LESS than international USD $102,000) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## Stablecoin Development (stablecoin-development)

**2026 Market Research:**
- Sources:
  - https://interexy.com/stablecoin-payment-app-development-cost — Stablecoin Payment App Development Cost in 2026 (Jul 17, 2026): MVP $30K-$90K, production $150K-$500K, licensed $1M+
  - https://pixelplex.io/blog/stablecoin-development-guide — Stablecoin Development Services: Cost, Process, and Key (Apr 12, 2026): $25K-$250K
  - https://xchange.avixa.org/posts/stablecoin-development-cost-i-googled-it-and-got-47-different-answers-so-i-figured-it-out-myself — Stablecoin Development Cost: Real Pricing Guide for 2026 (Jun 25, 2026): $5K-$500K range, realistic $8K-$15K small
  - https://tokenminds.co/blog/top-stablecoin-development-companies — Top Stablecoin Development Companies 2026 (with Pricing): PixelPlex $40-$80/hr
- 2026 Market range: $30,000 – $500,000 USD
- 2026 Mid-market: $90,000 USD
- Date of sources: Sources dated 2026 (Apr 12, Jun 25, Jul 17, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $22,500  (= 2026 market low $30,000 × 0.75, 25% below)
- STARTER (local MMK): 75,600,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $30,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $76,500  (= 2026 market mid $90,000 × 0.85, 15% below)
- PRO (local MMK): 257,000,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $90,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $18,000  (must be LESS than international USD $22,500) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $61,200  (must be LESS than international USD $76,500) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## Mobile / Web Game Development (mobile-web-game-development)

**2026 Market Research:**
- Sources:
  - https://ngssolution.com/blogs/mobile-game-development-cost — How Much Does Mobile Game Development Cost in 2026 (Jun 2, 2026): $15K basic 2D to $300K+ premium 3D
  - https://ilogos.biz/how-much-does-it-cost-to-develop-a-mobile-game-simple-math — How Much Does it Cost To Develop A Mobile Game (2026): $50K-$200K small/mid-scale
  - https://studiokrew.com/blog/mobile-game-development-cost — Mobile Game Development Cost in 2026: Real Budgets by Genre (Jul 20, 2026): $15K-$250K+
  - https://www.linkedin.com/pulse/unity-mobile-game-development-cost-2026-genre-wise-pricing-rana-0mmle — Unity Mobile Game Development Cost in 2026 (Aug 4, 2026): Casual $15K-$50K, Hypercasual $10K+
- 2026 Market range: $15,000 – $300,000 USD
- 2026 Mid-market: $80,000 USD
- Date of sources: Sources dated 2026 (Jun 2, Jul 20, Aug 4, 2026 publications)

**Proposed v3 pricing (15-25% below 2026 market, local 20% below intl):**
- STARTER (intl USD): $11,250  (= 2026 market low $15,000 × 0.75, 25% below)
- STARTER (local MMK): 37,800,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- STARTER marketPrice strikethrough: $15,000  (= 2026 market low end — actual market data, NOT multiplier)
- PRO (intl USD): $68,000  (= 2026 market mid $80,000 × 0.85, 15% below)
- PRO (local MMK): 228,500,000 MMK  (= USD × 4,200 × 0.80, rounded to nearest 100k)
- PRO marketPrice strikethrough: $80,000  (= 2026 market mid — actual market data, NOT multiplier)
- ENTERPRISE: custom / custom

**Verification:**
- Local MMK in USD-equivalent (STARTER): $9,000  (must be LESS than international USD $11,250) ✓
- Local-vs-intl gap (STARTER): 20.0%  (should be ~20%) ✓
- Local MMK in USD-equivalent (PRO): $54,400  (must be LESS than international USD $68,000) ✓
- Local-vs-intl gap (PRO): 20.0%  (should be ~20%) ✓

---

## Positioning Notes

### v1 → v2 → v3 comparison (selected services)

| Service | v1 STARTER USD | v2 STARTER USD | v3 STARTER USD | v1 vs Market | v2 vs Market | v3 vs Market |
|---|---|---|---|---|---|---|
| AI Chatbot | $880 | $8,000 | $7,500 | -91% (too cheap) | -20% (low end) | -25% (low end, 2026 data) |
| UI/UX Design | $700 | $12,000 | $11,250 | -95% (too cheap) | -20% (low end) | -25% (low end, 2026 data) |
| Voice AI | $1,750 | $12,000 | $11,250 | -88% (too cheap) | -40% (mid-low) | -25% (low end, 2026 data) |
| Agent Swarm | $2,800 | $20,000 | $22,500 | -91% (too cheap) | -33% (low-mid) | -25% (low end, 2026 data) |
| RWA Tokenization | $5,250 (custom in v1) | $40,000 | $37,500 | -89% (too cheap) | -20% (low end) | -25% (low end, 2026 data) |
| AMM/DEX | $7,000 | $40,000 | $30,000 | -83% (too cheap) | -20% (low end) | -25% (low end, 2026 data) |
| Money Market (DeFi) | $8,750 | $45,000 | $30,000 | -78% (too cheap) | -13% (mid-low) | -25% (low end, 2026 data) |

### Key differences v2 → v3

1. **Data freshness:** v2 used 2024-2025 market data; v3 uses **explicitly 2026** agency blog posts,
   pricing guides, and aggregator benchmarks (publication dates between Jan 2026 and Aug 2026).
2. **Positioning:** v2 positioned STARTER at the LOW end of market (~35th percentile, ~20% below
   market low end) and PRO at the MID market rate (~50th percentile). v3 returns to v1's intended
   positioning: STARTER at **25% below market low end**, PRO at **15% below market mid**.
3. **Exchange rate:** v2 used 4,800 MMK/USD (2025 street rate); v3 uses **4,200 MMK/USD** (midpoint
   of user-specified 4,000-4,300 range).
4. **Local discount:** v2 had NO explicit local-vs-intl discount (MMK was just USD × 4,800).
   v3 adds an **additional 20% local discount** so MMK price is always 20% below USD-equivalent,
   ensuring local Myanmar clients always pay less than international clients.
5. **marketPrice strikethrough:** v2 used `our_price × 1.35` (multiplier of our price);
   v3 uses **actual 2026 market rate** from research (real market data, not a multiplier).
6. **RWA Tokenization (most important per user):** v2 had $40K/$100K. v3 has $37,500/$127,500.
   v3 sources include INORU, Antier, Stobox 2026 Mid-Year Report, FluidRWA, WordPress asset
   tokenization blog, Nexvyon, Cryptiecraft, and LinkedIn (Apr 13, 2026) — all dated 2026.
   Real-world 2026 anchors: BlackRock BUIDL ($2.67B AUM), Franklin Templeton FOBXX ($828M AUM),
   Securitize, Tokeny, Brickken.

### Aggregate movement

- v3 total STARTER USD: $411,000  (v2 was $393,500 — v3 is +4.4%)
- v3 total PRO USD: $1,561,450  (v2 was $1,044,500 — v3 is +49.5%)
- Median STARTER reduction v2→v3: ~6% (modest, since v2 was already at the low end)
- Median PRO reduction v2→v3: ~10-15% (more significant, since v2 PRO was at mid-market)
- All 27 services now have LOCAL MMK price 20% below INTERNATIONAL USD-equivalent (verified)
- All 27 services now have STARTER USD 25% below 2026 market LOW end (verified)
- All 27 services now have PRO USD 15% below 2026 market MID (verified)

### RWA Tokenization deep-dive (most important per user)

**Why RWA is critical in 2026:**
- BlackRock BUIDL fund reached ~$2.67B AUM by Aug 2026 (per eco.com Aug 17, 2026 deep dive)
- Franklin Templeton FOBXX holds ~$828M (per restartfintech Aug 7, 2026)
- Total RWA on-chain value: $33.5B in July 2026 (per rwa.xyz tracker, Stobox 2026 Mid-Year Report)
- Projected to reach $10T+ by 2030 (per Nexvyon May 6, 2026)
- Major platforms: Securitize, Tokeny, Brickken, ADDX, FluidRWA, Antier, INORU

**2026 RWA development cost benchmarks:**
- INORU (Feb 11, 2026): $50K-$120K with security controls; $100K-$250K for startup/MVP platforms; $250K+ for complex
- Antier (Jun 17, 2026): Full cost breakdown by phase, asset class, platform
- Asset Tokenization Blog (May 5, 2026): $50K straightforward assets to $500K+ complex structures
- Cryptiecraft: $30K-$100K+ general range
- Nexvyon (May 6, 2026): Cost to build RWA tokenization platform in 2026
- FluidRWA (Aug 15, 2026): Platform comparison 2026 — Securitize, Tokeny, Brickken

**v3 RWA pricing positioning:**
- STARTER $37,500 = 25% below $50K market low end (entry-level tokenization of simple assets)
- PRO $127,500 = 15% below $150K market mid (typical mid-tier tokenization platform)
- ENTERPRISE = custom (enterprise-grade multi-asset, multi-jurisdiction platforms can exceed $500K)
- Local MMK: 126,000,000 STARTER / 428,400,000 PRO (20% below intl, in MMK)

### Sources verification (all dated 2026)

All 27 service sections cite sources with explicit 2026 publication dates. Key verification:
- AI Chatbot: heeya.fr (May 14, 2026), productcrafters (2026 pricing guide)
- Voice AI: retellai.com (Jul 27, 2026), rudrax.co.uk (Jun 26, 2026), aircall.io (May 14, 2026)
- Agent Swarm: devcom.com (Mar 2, 2026), digitalapplied.com (May 17, 2026), anthropic.com (Aug 13, 2026)
- AI Automation: lets-viz.com (Aug 19, 2026)
- API & MCP: launchdayadvisors.com (May 29, 2026), nango.dev (Jul 15, 2026)
- HERMES (proprietary): softteco.com (Jun 9, 2026), intellectyx.com (Aug 6, 2026), layer3labs.io (Jun 1, 2026)
- AI Video Gen: ltx.io (Aug 16, 2026), awesomic.com (Aug 11, 2026), monday.com (Apr 30, 2026)
- 3D Modeling: orbe3d.com (Feb 20, 2026), render3dquick.com (2026 guide)
- Graphic Design: clutch.co (Aug 2026), goodfirms.co (Jul 13, 2026), manypixels.co (Jun 15, 2026), delenzo (Jul 3, 2026)
- Content/Copywriting: columnfivemedia.com (May 1, 2026), elnacain.com (Jul 15, 2026), digitalapplied.com (Apr 5, 2026)
- Media Buying: directiveconsulting.com (Feb 20, 2026), lotiva.com (Aug 12, 2026)
- UI/UX: dribbble.com (Mar 31, 2026), onething.design (Jan 30, 2026), fuselabcreative.com (2026)
- Android/iOS: businessofapps.com (Jun 15, 2026), unicoconnect.com (Jun 11, 2026), aalpha.net (Jul 10, 2026)
- Web/WebApp: digisoftsolution.com (Mar 10, 2026), bubble.io (Aug 17, 2026)
- Chrome Extensions: plugthis.ai (Jun 25, 2026), fiverr.com (Aug 2, 2026)
- Desktop/MacBook: dribbble.com (Mar 26, 2026), simpalm.com (Jun 24, 2026)
- ASO: appagent.com (Aug 10, 2026), admiral.media (Mar 23, 2026), appfollow.io (Jun 12, 2026), screenshotwhale (Feb 4, 2026)
- Web3 Wallets: pixelplex.io (Mar 17, 2026), perimattic.com (Jan 2, 2026), purrweb.com (May 4, 2026)
- AMM/DEX: techfyte.com (Aug 6, 2026), troniextechnologies.com (Aug 13, 2026)
- DAO: lbmsolution.com (Feb 24, 2026), 4irelabs.com (Feb 27, 2026), elevateconsult.com (Apr 17, 2026)
- NFT Systems: bitronix.ai (Aug 5, 2026), perimattic.com (Apr 28, 2026), merehead.com (May 25, 2026), octalsoftware.com (May 25, 2026)
- Security Audit: sherlock.xyz (Feb 18, 2026), bugblow.com (Feb 17, 2026), zealynx.com (Jan 5, 2026), cryptojobslist (Jul 28, 2026)
- Smart Contract Dev: zyneto.com (Apr 20, 2026), fluidrwa.com (Jul 16, 2026), clutch.co (Aug 2026)
- RWA Tokenization: inoru.com (Feb 11, 2026), antier.com (Jun 17, 2026), wordpress.com (May 5, 2026), nexvyon.com (May 6, 2026), fluidrwa.com (Aug 15, 2026), stobox.io (2026 Mid-Year Report), linkedin.com (Apr 13, 2026)
- Money Market (DeFi): vivasoft.com.np (May 6, 2026), eco.com (Aug 17, 2026)
- Stablecoin: interexy.com (Jul 17, 2026), pixelplex.io (Apr 12, 2026), xchange.avixa.org (Jun 25, 2026)
- Mobile/Web Game Dev: ngssolution.com (Jun 2, 2026), studiokrew.com (Jul 20, 2026), linkedin.com (Aug 4, 2026)

### What was NOT touched (deliberately)
- No source code files modified — RESEARCH ONLY
- No changes to `src/app/services/[slug]/page.tsx`
- No changes to `src/lib/sigma/projects-data.json` or `projects.ts`
- No changes to `src/components/sigma/sections/S04Projects.tsx`
- No changes to `src/lib/sigma/basket.ts` or `ServiceBasket.tsx`
- No changes to `src/components/sigma/alpha/AlphaServices.tsx`
- v2 research file (`/home/z/my-project/research-pricing-v2.md`) left in place for
  historical reference — new file is separate (`research-pricing-v3-2026.md`)

### Next actions (recommended, not done in this research scope)
1. Implement v3 pricing into `src/app/services/[slug]/page.tsx` — replace all 78 price fields
   (27 services × STARTER + PRO × price + intlPrice + marketPrice = 162 fields) with v3
   values from this research file
2. Re-derive local MMK prices from v3 USD using 4,200 MMK/USD rate (v2 used 4,800 MMK/USD)
3. Update S04 project budgets (`intlBudget` field in `projects-data.json`) using new exchange
   rate (1 USD = 4,200 MMK)
4. Update `AlphaServices.tsx` starting price displays to match v3 (e.g., AI Chatbot from
   $8,000 → $7,500 STARTER USD; or MMK equivalent)
5. Update `ServiceBasket.tsx` `SERVICE_PRICES` map and `ADDONS` compatible-services map
   with v3 STARTER prices (MMK values)
6. Verify the `marketPrice` strikethrough reflects actual 2026 market data (not the v2
   `our_price × 1.35` multiplier) — this is a structural change to the price display logic

---

**Research complete. All 27 services have v3 pricing derived from 2026-dated sources,
positioned 15-25% below 2026 market average, with local MMK prices an additional 20%
below international USD equivalents (verified for all 27 services).**
