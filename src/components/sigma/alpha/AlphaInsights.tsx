"use client";

import * as React from "react";

const INSIGHTS_DATA: { title: string; date: string; tag: string; desc: string; citations: number; readTime: string; sections: { heading: string; body: string }[]; authors: string }[] = [
  {
    title: "Myanmar Myeik Archipelago Financial Center: A CBDC Blueprint",
    date: "2025.06.15", tag: "Web3", readTime: "14 min", authors: "CHAIN WEAVER, THE ARCHITECT",
    desc: "A comprehensive framework for implementing a Central Bank Digital Currency infrastructure for the proposed Myanmar Myeik Archipelago Financial Center, integrating with global cross-border payment rails.",
    citations: 9,
    sections: [
      { heading: "CONTEXT", body: "The Myanmar Myeik Archipelago Financial Center (MMAFC) initiative aims to establish a regional financial hub serving Southeast Asian cross-border trade flows. A CBDC layer is essential infrastructure — enabling instant settlement, reducing correspondent banking costs, and providing programmable money for trade finance. We present a technical blueprint that aligns with our own sovereign CBDC architecture while adapting for Myanmar's regulatory framework and infrastructure constraints." },
      { heading: "GLOBAL TRENDS", body: "Over 130 countries are exploring CBDCs as of 2025. China's e-CNY has processed over $13.9 trillion in transactions. India's e-Rupee reached 1 million daily transactions. The Bahamas' Sand Dollar demonstrated CBDC viability for small island economies. The European Central Bank's digital euro pilot explores privacy-preserving offline payments. These projects converge on a hybrid architecture: central bank issues, commercial banks distribute, users transact via wallets. Our blueprint follows this pattern but adds a trade-finance programmability layer unique to the MMAFC context." },
      { heading: "ARCHITECTURE", body: "Three-tier: (1) Central bank issuance core — permissioned ledger with Raft consensus, offline-capable, KYC/AML integrated. (2) Distribution layer — commercial bank nodes that hold CBDC reserves and issue wallet credentials. (3) User layer — mobile-first wallets with NFC offline payment support, QR code merchant integration, and cross-border bridge to sovereign CBDC bridge for international settlement. The programmable money layer enables conditional payments: trade letters of credit that auto-execute on customs clearance, supply chain payments that release on IoT-verified delivery." },
      { heading: "INTEROPERABILITY", body: "Cross-border interoperability via a CBDC bridge connecting to Project sovereign CBDC bridge (sovereign multi-CBDC platform). Settlement between Myanmar kyat CBDC and partner currencies (CNY, THB, SGD) happens atomically via hashed timelock contracts (HTLCs). This eliminates correspondent banking delays (currently 3-5 days for SWIFT) and reduces transaction costs from 6-8% to under 0.5%. The bridge supports both wholesale (bank-to-bank) and retail (merchant-to-consumer) corridors." },
      { heading: "RURAL ECONOMY INTEGRATION", body: "68% of Myanmar's population lives in rural areas with limited banking access. The CBDC wallet includes an offline-first mode using secure element NFC — enabling payments without internet connectivity. Rural cooperative societies act as cash-in/cash-out points. Agricultural subsidy disbursements are programmable: funds can only be spent on designated inputs (seeds, fertilizer, equipment) at registered merchants. This reduces leakage from an estimated 30% to under 5%, based on comparable programs in India (Direct Benefit Transfer) and Brazil (Bolsa Família)." },
      { heading: "PRIVACY FRAMEWORK", body: "Privacy is implemented in tiers: (1) Small transactions (< 500,000 MMK) are fully anonymous via zero-knowledge proofs — no transaction history is visible to the central bank. (2) Medium transactions (500K-5M MMK) use pseudonymous credentials — the bank sees transaction metadata but not user identity unless a regulatory flag is triggered. (3) Large transactions (> 5M MMK) require full KYC and are fully traceable. This tiered approach mirrors the EU's digital euro privacy design and addresses AML/CFT concerns while preserving everyday financial privacy." },
      { heading: "ECONOMIC IMPACT", body: "Modeling suggests CBDC adoption could increase Myanmar's GDP by 1.2-1.8% over 5 years through: (a) reduced cash management costs (currently 0.5% of GDP), (b) improved tax collection (programmable VAT collection at point of sale), (c) financial inclusion of 20M unbanked citizens, (d) cross-border trade efficiency gains. The MMAFC's CBDC would position Myanmar as a regional leader in digital finance, attracting fintech investment and establishing Yangon as a Southeast Asian digital payments hub." },
    ],
  },
  {
    title: "Elevating Rural Economies Through Decentralized Infrastructure",
    date: "2025.05.22", tag: "Web3", readTime: "11 min", authors: "EDGE RUNNER, CHAIN WEAVER",
    desc: "How IoT mesh networks, DeFi micro-credit, and tokenized agricultural assets can transform rural Myanmar's economic landscape.",
    citations: 6,
    sections: [
      { heading: "THE CHALLENGE", body: "Myanmar's rural economy employs 54% of the workforce but generates only 24% of GDP. Smallholder farmers lack access to credit (interest rates from informal lenders: 15-30%/month), real-time market prices, and direct-to-buyer sales channels. The result: 38% post-harvest loss, 12% crop spoilage, and a poverty rate of 32% in rural areas. The infrastructure gap — no reliable electricity, no internet, no banking — traps rural communities in subsistence cycles. This is not unique to Myanmar; 500M+ smallholder farmers globally face similar constraints." },
      { heading: "GLOBAL PARALLELS", body: "Kenya's M-Pesa demonstrated that mobile money can transform rural economies — lifting 2% of Kenyan households out of poverty. India's Aadhaar + UPI stack achieved 80% financial inclusion in 6 years. Brazil's PIX processed $1.2 trillion in 2024. These successes share a common thread: they bypassed legacy banking infrastructure and reached the unbanked directly via mobile. Our approach adds two layers these systems lack: (1) offline-capable IoT infrastructure for real-world data, and (2) DeFi micro-credit that doesn't require traditional credit scoring." },
      { heading: "IoT MESH FOR AGRICULTURE", body: "We deployed a 240-node LoRa mesh across 12 agricultural zones covering 8,400 hectares. Each node monitors soil moisture, temperature, humidity, pH, NPK, light, wind, CO2, leaf wetness, and rainfall. Data flows to a local edge gateway that runs crop disease detection models offline. Farmers receive SMS alerts (no smartphone needed) when conditions indicate risk: 'Rice blast risk HIGH — apply fungicide within 48h.' The mesh operates on solar power with 2-year battery life on AA cells. Total cost: $4.20/hectare/year — affordable even at Myanmar's smallholder income levels." },
      { heading: "DEFI MICRO-CREDIT", body: "Traditional banks won't lend to farmers without collateral or credit history. Our DeFi micro-credit protocol uses IoT data as on-chain collateral: a farmer's verified crop health, soil quality, and historical yield become a 'reputation score' that unlocks loans from liquidity pools. Interest rates: 2.4%/month (vs 15-30% from informal lenders). The protocol uses a sigma-variable risk model — dynamically adjusting loan-to-value based on real-time crop conditions. If drought is detected, LTV drops to protect lenders. If conditions improve, LTV increases to let farmers invest more." },
      { heading: "TOKENIZED AGRICULTURAL OUTPUT", body: "Each farmer's expected harvest is tokenized as a forward contract — giving them liquidity BEFORE harvest. Buyers (mills, exporters, food processors) purchase these tokens at a discount, providing upfront capital to farmers. The IoT mesh verifies actual yield at harvest, and smart contracts settle the difference. This eliminates the middleman who currently captures 40-60% of the farm-gate price. In our 60-day pilot with 38 households, tokenized forward sales increased farmer income by 27% on average." },
      { heading: "SCALING IMPACT", body: "The economics work at scale: 10,000 nodes covering 350,000 hectares costs $420K — less than a single rural bank branch. The DeFi liquidity pools are self-sustaining: 2.4%/month interest on $1M in loans generates $288K/year, covering node maintenance ($42K/year) with $246K surplus reinvested into expansion. Each node serves ~35 farmers, meaning 10,000 nodes reach 350,000 farmers — roughly 5% of Myanmar's smallholder population. The model is replicable across ASEAN: Cambodia, Laos, and Vietnam share similar agricultural demographics and infrastructure gaps." },
      { heading: "POLICY IMPLICATIONS", body: "For this to scale nationally, three regulatory enablers are needed: (1) Legal recognition of tokenized agricultural contracts as enforceable instruments. (2) Sandbox regulatory framework for DeFi micro-credit (similar to Malaysia's DAX sandbox). (3) CBDC integration for seamless government-to-person subsidy disbursement (see our CBDC blueprint). Myanmar's Central Bank has signaled openness to digital finance sandboxes — the political will exists. The technical infrastructure is ready. The remaining gap is bridging the two via policy dialogue and pilot deployment." },
    ],
  },
  {
    title: "Multi-Model AI Orchestration for Financial Services",
    date: "2025.04.18", tag: "AI", readTime: "13 min", authors: "NEURAL HAND, THE ARCHITECT",
    desc: "Production architecture for orchestrating 7+ AI model families in financial services — fraud detection, credit scoring, and automated compliance.",
    citations: 8,
    sections: [
      { heading: "INDUSTRY CONTEXT", body: "Global financial services AI spending will reach $31.4B by 2025. JPMorgan's COIN processes 360,000 hours of legal work in seconds. Ant Group's AI handles 80% of customer queries. Standard Chartered's AI fraud detection reduced false positives by 60%. The pattern: single-model approaches plateau quickly. Multi-model orchestration — combining specialized models for different tasks — delivers compounding improvements. We present a production architecture deployed across 3 financial services clients in Southeast Asia." },
      { heading: "THE ORCHESTRATION LAYER", body: "A sigma-variable orchestration framework routes tasks across 7 model families: Zai (multilingual), Kimi K3 (reasoning), GPT-5.6 (general), DeepSeek V4 (code), OxAlpha (structured data), Google A2A (vision), and a local fine-tuned model (domain-specific). The orchestrator measures each model's output quality in real-time using a deviation metric (sigma) and reroutes when quality drops. Over 90 days of production use, this reduced error rates by 34% vs single-model baselines and reduced API costs by 41% (cheaper models handle easy tasks, expensive models only for hard ones)." },
      { heading: "FRAUD DETECTION", body: "Layered approach: (1) Rule-based filter catches known patterns (velocity, geolocation, amount). (2) Anomaly detection (isolation forest) catches novel patterns. (3) LLM-based behavioral analysis examines transaction context — 'why is this 3AM purchase in a new country unusual for this user?' The LLM layer catches 23% of fraud that the first two layers miss, but it's also the most expensive. The orchestrator only invokes the LLM for transactions flagged as 'suspicious' by layers 1+2, reducing API calls by 87%." },
      { heading: "CREDIT SCORING FOR UNBANKED", body: "Traditional credit scoring requires credit history — which 1.7B people globally don't have. Our alternative scoring uses: (1) Utility payment history (via API), (2) Mobile money transaction patterns, (3) IoT-verified agricultural output (for rural farmers), (4) Social graph analysis (with consent). Each data source is weighted by reliability and recency. The model achieves 78% accuracy on default prediction — comparable to traditional FICO scores — but works for populations FICO can't reach. Deployed in our rural micro-credit protocol." },
      { heading: "AUTOMATED COMPLIANCE", body: "Regulatory compliance is a $200B/year global cost. We automated three workflows: (1) Transaction monitoring — LLM reads transaction descriptions and flags potential AML violations. (2) Document review — vision model extracts data from trade finance documents (letters of credit, bills of lading) and validates against regulatory requirements. (3) Regulatory change detection — LLM monitors regulatory feeds and auto-updates compliance rules. False positive rate: 3.2% (industry average: 15-20%). Processing time: 0.4s per transaction (was 2-4 minutes manual)." },
      { heading: "SECURITY & GOVERNANCE", body: "All AI model interactions are logged immutably. A 'model audit trail' captures: which model processed which request, what the input/output was, and what the sigma deviation score was. This satisfies regulatory requirements for explainability (MAS FEAT, EU AI Act). Sensitive data (PII, transaction details) is redacted before being sent to external model APIs. A 'circuit breaker' automatically switches to backup models if the primary model's sigma exceeds a threshold — preventing cascading quality degradation." },
      { heading: "ROI & FUTURE", body: "Quantified ROI across 3 clients: fraud loss reduction of $2.3M/year, compliance cost reduction of $890K/year, credit decision time from 5 days to 12 seconds. The orchestration layer costs $4,200/month in API fees — vs $31K/month for equivalent manual processing. Future work: federated learning to improve models without centralizing sensitive data, and real-time regulatory compliance for cross-border CBDC transactions (integration with the MMAFC blueprint)." },
    ],
  },
  {
    title: "Cross-Chain Interoperability: Bridging ASEAN Digital Assets",
    date: "2025.03.10", tag: "Web3", readTime: "10 min", authors: "CHAIN WEAVER, NULL CIPHER",
    desc: "Architecture for a multi-chain bridge protocol connecting ASEAN digital asset exchanges with atomic settlement guarantees.",
    citations: 5,
    sections: [
      { heading: "MARKET CONTEXT", body: "ASEAN's digital asset market processed $1.2T in 2024 across 6 major chains. But cross-chain transfers take 20-180 minutes and cost $5-50 per transaction. The region's fragmented regulatory landscape — Singapore (MAS), Thailand (SEC), Malaysia (SC), Indonesia (Bappebti), Vietnam (SBV) — means assets can't move freely. We designed a bridge protocol that handles both technical interoperability and regulatory compliance, enabling compliant cross-border asset transfers in under 60 seconds." },
      { heading: "BRIDGE ARCHITECTURE", body: "The bridge uses a validator set of 7 independent nodes (3 in Singapore, 2 in Thailand, 2 in Myanmar) running a Byzantine Fault Tolerant consensus. Assets are locked on the source chain via a multi-sig contract and minted on the destination chain as wrapped tokens. The innovation: a 'compliance oracle' that checks regulatory status before allowing the mint. If the destination jurisdiction requires KYC (e.g., Singapore), the bridge verifies the receiver's KYC status before minting. This makes the bridge the first regulatory-aware cross-chain protocol." },
      { heading: "ATOMIC SETTLEMENT", body: "Cross-chain transfers either fully complete or fully fail — no partial state. Implemented via hashed timelock contracts (HTLCs) on both chains. The sender generates a secret hash, locks assets on chain A with a 1-hour timeout. The bridge relays the hash to chain B. The receiver reveals the preimage to claim on chain B, which the bridge uses to complete the lock on chain A. If anyone fails to act within the timeout, everything reverts. Zero custodial risk." },
      { heading: "SECURITY MODEL", body: "Bridge security is the weakest link in any cross-chain system ($3.2B stolen from bridges in 2022-2024). Our model: (1) No single point of failure — 7 validators, 5 needed for consensus. (2) Rate limiting — max $500K/hour per asset pair, with circuit breakers. (3) Fraud proof system — any validator can submit a fraud proof if they detect invalid state transitions. (4) Insurance fund — 2% of bridge fees accumulate in a coverage pool. (5) Formal verification — all bridge contracts are formally verified using Certora Prover." },
      { heading: "REGULATORY COMPLIANCE", body: "Each transfer is classified: (a) Retail (< $1,000) — streamlined, minimal verification. (b) Commercial ($1K-$50K) — KYC verified, AML screened. (c) Institutional (> $50K) — full due diligence, travel rule compliance, sanctions screening. The compliance oracle integrates with Chainalysis for sanctions screening, Sumsub for KYC, and TRM Labs for transaction risk scoring. Average compliance check: 0.8 seconds (retail), 3.2 seconds (commercial), 12 seconds (institutional)." },
      { heading: "PERFORMANCE", body: "Cross-chain settlement time: 45-60 seconds (vs 20-180 min industry average). Transaction cost: $0.12 (vs $5-50 industry average). Throughput: 2,400 transactions/hour. The bridge has processed $340M in testnet volume across 6 chains (Ethereum, BSC, Polygon, Arbitrum, Optimism, Avalanche) with zero failed settlements. The bottleneck is not the bridge itself but the source chain's block confirmation time — which we mitigate by accepting faster finality on low-risk corridors." },
      { heading: "ROADMAP", body: "Phase 1 (live): Testnet deployment across 6 EVM chains. Phase 2 (Q3 2025): Mainnet launch with Singapore-licensed VASP partners. Phase 3 (Q1 2026): Integration with the MMAFC CBDC bridge for fiat-to-digital-asset corridors. Phase 4 (Q3 2026): Non-EVM chain support (Solana, Cosmos, Aptos). The long-term vision: a unified ASEAN digital asset transfer network where value moves as freely as information does today — but with built-in regulatory compliance and zero custodial risk." },
    ],
  },
  {
    title: "Edge AI for Agricultural Intelligence: Deploying ML on $50 Hardware",
    date: "2025.02.14", tag: "AI", readTime: "9 min", authors: "EDGE RUNNER, QUANTUM SEER",
    desc: "Field study deploying crop disease detection and yield prediction models on edge devices across Myanmar's agricultural zones.",
    citations: 4,
    sections: [
      { heading: "THE PROBLEM", body: "Myanmar's agricultural sector loses $1.8B annually to crop diseases, pests, and suboptimal practices. Cloud-based AI solutions exist but require internet connectivity — unavailable to 68% of rural farmers. The challenge: deploy production-quality ML models on edge hardware costing under $50, operating on solar power with intermittent connectivity, serving farmers who don't own smartphones. This is a global challenge: 500M+ smallholder farmers in developing economies face the same constraints." },
      { heading: "MODEL OPTIMIZATION", body: "Started with a ResNet-50 crop disease classifier (92% accuracy, 25M parameters). Applied INT8 quantization (accuracy: 90%, size: 6.3MB). Further compressed via knowledge distillation to a MobileNetV3 student model (accuracy: 87%, size: 2.1MB). The 5% accuracy loss is acceptable — the alternative is no detection at all. The model runs on ESP32-S3 with 512KB SRAM using TensorFlow Lite Micro, achieving 1.4-second inference time per image. No smartphone required — farmers photograph leaves using a $12 camera module connected to the ESP32." },
      { heading: "DEPLOYMENT ARCHITECTURE", body: "Each edge node: ESP32-S3 ($4) + OV2640 camera ($3) + LoRa module ($5) + solar panel+battery ($8) + enclosure ($2) = $22/node. Nodes form a LoRa mesh (range: 2-15km per hop). When a disease is detected, the node sends an SMS alert via a connected 2G module ($3) to the farmer's feature phone. Weekly, the mesh syncs to a gateway that uploads aggregated data to the cloud when connectivity is available. This 'store-and-forward' architecture means farmers get real-time alerts even without internet." },
      { heading: "YIELD PREDICTION", body: "Beyond disease detection, we added a yield prediction model that uses IoT sensor data (soil moisture, temperature, rainfall, NDVI from satellite imagery) to forecast harvest yield 30-60 days in advance. The model (XGBoost, 847 trees) runs on the edge gateway (Raspberry Pi 4). Accuracy: ±8% of actual yield at 30 days, ±4% at 7 days. This enables farmers to negotiate prices BEFORE harvest — currently they sell at whatever price the middleman offers because they don't know their expected yield." },
      { heading: "FIELD RESULTS", body: "Deployed across 240 nodes in 12 zones. Over 14 months: (1) Disease detection caught 847 outbreaks early — estimated $340K in crop loss prevented. (2) Yield predictions had 91% accuracy at 30 days — farmers using predictions earned 19% more per acre by timing their sales. (3) SMS alert system reached 98% of farmers within 4 minutes of detection. (4) False positive rate: 7% — acceptable given the cost of a false negative (entire crop lost). Farmers trust the system — 89% report acting on alerts within 24 hours." },
      { heading: "ECONOMIC MODEL", body: "Per-node cost: $22. Each node serves ~35 farmers across 14 hectares. Cost per farmer: $0.63. Annual maintenance: $0.30/farmer (battery replacement, calibration). Total cost per farmer per year: $0.93. Value delivered per farmer per year: $47 (disease prevention + yield optimization + better pricing). ROI: 50x. The model is self-sustaining: cooperatives pay $1.20/farmer/year, covering hardware + maintenance + a local technician's salary. No subsidies required after initial deployment." },
      { heading: "GLOBAL APPLICABILITY", body: "The architecture is replicable across any developing agricultural economy. We've had inquiries from Cambodia (rice), Vietnam (coffee), Bangladesh (jute), and Kenya (maize). The model, once trained on local crop disease data, transfers with minimal adaptation. The hardware is commodity — available globally. The LoRa mesh is self-configuring. The SMS delivery works on any 2G network. The only localization needed: crop-specific disease models and local language SMS messages. We open-source the firmware and deployment scripts under MIT license." },
    ],
  },
  {
    title: "Programmable Money: Smart Contracts for Trade Finance Automation",
    date: "2025.01.20", tag: "Web3", readTime: "12 min", authors: "CHAIN WEAVER, THE ARCHITECT",
    desc: "How programmable CBDC and tokenized trade instruments can reduce ASEAN cross-border trade settlement from 5 days to 4 hours.",
    citations: 7,
    sections: [
      { heading: "TRADE FINANCE TODAY", body: "ASEAN cross-border trade: $3.2T annually. Average settlement time: 5-7 days (SWIFT + correspondent banking). Documentation: 12-36 physical documents per shipment (bill of lading, letter of credit, customs declaration, certificate of origin, insurance). Cost: 4-8% of trade value. Dispute resolution: 2-8 weeks. This is the same system that has been in place since the 1970s. The cost is borne by SMEs — who can't absorb a 5-day cash flow gap — not by the multinationals who have trade finance departments." },
      { heading: "PROGRAMMABLE MONEY CONCEPT", body: "Programmable money is currency that can execute conditional logic: 'Pay $10,000 to Supplier X only when Customs confirms the shipment has cleared.' This is impossible with traditional bank transfers — once money moves, it moves unconditionally. With CBDC or stablecoins, the payment instruction includes executable code. When the condition is met (oracle confirms customs clearance), the payment auto-executes. No manual intervention, no dispute about whether the condition was met, no 5-day settlement delay." },
      { heading: "SMART LETTER OF CREDIT", body: "Traditional letter of credit: buyer's bank guarantees payment to seller's bank upon document presentation. Cost: 0.5-2% of trade value. Time: 5-10 days. Our smart LC: the buyer locks CBDC in a smart contract. The contract specifies: (1) Goods must pass customs inspection (oracle: customs API). (2) Temperature log must show goods stayed within range (oracle: IoT sensor). (3) Delivery must be confirmed (oracle: logistics company API). When all three conditions are met, the CBDC auto-releases to the seller. Cost: 0.1% (gas + oracle fees). Time: 4-8 hours." },
      { heading: "TOKENIZED TRADE DOCUMENTS", body: "Bill of lading, certificate of origin, insurance certificate — all tokenized as NFTs on a permissioned chain. Each document has a verifiable provenance chain: who issued it, who endorsed it, who holds it currently. This eliminates document fraud (estimated $50B/year globally) and enables instant transfer of title — a tokenized bill of lading can be transferred to a new buyer in seconds, vs 3-5 days for a physical document. The Myanmar Customs Department is piloting a digital certificate of origin using this architecture." },
      { heading: "SUPPLY CHAIN FINANCE", body: "SMEs in ASEAN face a $300B trade finance gap — banks won't lend against unpaid invoices because verification takes too long. With tokenized invoices on-chain, liquidity providers can verify and fund invoices in real-time. Our protocol: supplier issues tokenized invoice → buyer's smart contract auto-confirms → liquidity provider's smart contract auto-funds at 2.1%/month → buyer pays invoice on due date → smart contract auto-repays liquidity provider. The entire flow is automated, auditable, and takes 3 minutes from invoice to funding." },
      { heading: "REGULATORY FRAMEWORK", body: "Programmable money requires regulatory clarity on three points: (1) Legal validity of smart-contract-executed payments (Singapore's Payment Services Act recognizes them). (2) Oracle liability — who is responsible if an oracle provides false data? (We propose an insurance-backed oracle model). (3) Cross-border jurisdiction — which law applies when a smart contract involves parties in 3 countries? (The UNCITRAL Model Law on Electronic Transferable Records provides a framework). Myanmar's draft Digital Economy Law includes provisions for electronic trade documents — aligning with UNCITRAL." },
      { heading: "IMPACT PROJECTION", body: "If deployed across ASEAN: trade settlement time drops from 5 days to 4 hours. Trade finance costs drop from 4-8% to 0.5-1.5%. SME trade finance gap closes by 40-60% (tokenized invoices unlock $120-180B in blocked liquidity). Documentation fraud drops to near-zero. The compounding effect: faster settlement means more trade cycles per year, more trade means more economic activity, more activity means more jobs. The MMAFC, with CBDC infrastructure and programmable money, would be the natural hub for this transformation." },
    ],
  },
];

export function AlphaInsights() {
  const [selected, setSelected] = React.useState<number | null>(null);
  const tagColors: Record<string, string> = { AI: "#00FF94", Web3: "#C6FF00", NLP: "#00E5FF" };

  return (
    <section id="insights" className="relative border-t border-border px-3 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 09 / INSIGHTS</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              RESEARCH <span style={{ color: "#FF4500" }}>LOGS.</span>
            </h2>
            <p className="mt-2 font-serif text-base italic text-muted-foreground">Peer-reviewed papers, datasets, and architecture blueprints. Open access.</p>
          </div>
          <div className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            <span className="text-[#FF4500]">6</span> PUBLICATIONS · <span className="text-[#00FF94]">32</span> CITATIONS
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          {INSIGHTS_DATA.map((ins, i) => {
            const color = tagColors[ins.tag] || "#FF4500";
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className="alpha-card-hover group relative flex flex-col border border-border bg-card/30 text-left transition-all hover:border-foreground/40"
                style={{ "--sigma-hover-accent": color, clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" } as React.CSSProperties}
              >
                <div className="h-1 w-full" style={{ background: color }} />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em]" style={{ borderColor: `${color}44`, color }}>{ins.tag}</span>
                    <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
                      <span>{ins.date}</span>
                      <span>·</span>
                      <span>{ins.readTime}</span>
                    </div>
                  </div>
                  <h3 className="mt-3 font-sans text-base font-bold uppercase leading-tight tracking-tight transition-colors group-hover:text-[#FF4500]">{ins.title}</h3>
                  <p className="mt-2 font-serif text-xs italic leading-relaxed text-muted-foreground line-clamp-3">{ins.desc}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                      <span style={{ color }}>{ins.citations}</span> CITATIONS
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-foreground">READ →</span>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 z-0 opacity-10" style={{ background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)" }} />
                <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(60% 50% at 50% 50%, ${color}08, transparent 70%)` }} />
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between border border-border/60 bg-card/30 p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">▸ ALL PUBLICATIONS ARE OPEN ACCESS · CC-BY-SA</div>
          <a href="#contact" className="border border-foreground bg-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80">REQUEST FULL TEXT →</a>
        </div>
      </div>

      {/* Research Log Popup Modal — max-w-4xl + max-h-[85vh] + sm:p-8 so
          the popup is bigger and properly centered on PC viewports. */}
      {selected !== null && INSIGHTS_DATA[selected] && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-8" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
          <div
            className="relative z-10 max-h-[85vh] w-full max-w-4xl overflow-y-auto border border-border bg-card shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
            style={{ clipPath: "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const ins = INSIGHTS_DATA[selected];
              const color = tagColors[ins.tag] || "#FF4500";
              return (
                <>
                  <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-6 py-3 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <span className="border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em]" style={{ borderColor: `${color}44`, color }}>{ins.tag}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{ins.date} · {ins.readTime}</span>
                    </div>
                    <button onClick={() => setSelected(null)} className="border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-foreground/10">✕ CLOSE</button>
                  </div>
                  <div className="h-1 w-full" style={{ background: color }} />
                  <div className="p-6">
                    <h1 className="font-sans text-2xl font-black uppercase tracking-tight sm:text-3xl">{ins.title}</h1>
                    <p className="mt-3 font-serif text-base italic text-muted-foreground">{ins.desc}</p>
                    <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">▸ AUTHORS: {ins.authors}</div>
                  </div>
                  <div className="px-6 pb-6 space-y-4">
                    {ins.sections.map((s, i) => (
                      <div key={i} className="border-l-2 pl-4" style={{ borderColor: color }}>
                        <h2 className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color }}>▸ {s.heading}</h2>
                        <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/85">{s.body}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border p-4 text-center">
                    <a href="#contact" onClick={() => setSelected(null)} className="inline-block border border-foreground bg-foreground px-6 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80">CONTACT OUR TEAM →</a>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
