"use client";

import * as React from "react";

const INSIGHTS_DATA: { title: string; date: string; tag: string; desc: string; citations: number; readTime: string; sections: { heading: string; body: string }[]; authors: string }[] = [
  {
    title: "Sigma-Variable Orchestration of Multi-Model Agent Loops",
    date: "2024.11.04", tag: "AI", readTime: "12 min", authors: "NEURAL HAND, THE ARCHITECT",
    desc: "We model a research lab as a sigma variable — the unmeasured deviation — and show it stabilizes multi-model agent loops under field drift.",
    citations: 4,
    sections: [
      { heading: "INTRODUCTION", body: "Multi-model AI pipelines compose outputs from different models sequentially. When a model's output distribution shifts, the downstream models receive inputs they weren't designed for. This causes cascading failures: hallucinations, task abandonment, and degraded quality. We propose modeling the 'unmeasured deviation' between expected and actual model outputs as a sigma variable, and compensating for it in real-time. The framework draws on classical control theory — specifically the PID controller — but applied to the language-model output domain rather than continuous physical systems." },
      { heading: "BACKGROUND", body: "Prior work on multi-agent LLM orchestration (AutoGPT, BabyAGI, LangChain) treats each model invocation as an open-loop operation. Errors compound across the chain because no feedback signal propagates back from downstream stages. Our hypothesis: if we measure the sigma — the gap between expected and observed output distributions — we can inject compensating signals that stabilize the loop. The Taungoo lab, geographically and economically isolated from frontier compute, was forced into this discipline early: we could not afford brute-force retries." },
      { heading: "THE SIGMA VARIABLE", body: "Define σ = f(expected) - f(actual), where f is the output distribution function. When σ exceeds a threshold, the orchestrator injects a correction signal — either reformatting the input, switching models, or requesting human review. This creates a closed-loop control system analogous to a PID controller in robotics. We compute σ along three axes: (1) semantic drift via embedding cosine distance, (2) structural drift via JSON-schema conformance, (3) tone drift via sentiment polarity delta. The composite σ is a 3-vector, and the compensator selects intervention type based on which axis dominates." },
      { heading: "ARCHITECTURE", body: "Built with Express, GraphQL, and Redis. Each model invocation is wrapped in an instrumentation layer that captures the input, expected output schema, and observed output. A Redis stream aggregates σ measurements across all running pipelines. A compensation worker selects intervention strategy: (a) reformat input, (b) switch to backup model, (c) downgrade task, (d) escalate to human. The dashboard surfaces σ time-series in real time so operators can detect systemic drift across the model fleet." },
      { heading: "DEPLOYMENT RESULTS", body: "Deployed in the Vortex autonomous sales system (~48,000 LOC, TypeScript). Over 90 days, the sigma-variable compensator reduced hallucination rates by 34% and improved task completion fidelity by 22%. The framework generalizes to any multi-model pipeline using Express, GraphQL, and Redis for real-time signal processing. Notably, σ compensation reduced escalation-to-human rate from 14% of tasks to 4.7% — freeing operator time for higher-value interventions." },
      { heading: "FAILURE MODES", body: "The compensator itself can fail in three ways. (1) σ-threshold miscalibration: too low triggers constant compensation, too high misses real drift. We use a Kalman-filter-inspired adaptive threshold that learns per-task-type over ~200 invocations. (2) Backup-model cascade: when primary and backup both drift simultaneously, the system falls through to human escalation. We monitor this rate as a key reliability SLO. (3) Schema drift in downstream consumers: σ compensation can produce outputs that validly satisfy the schema but break consumer assumptions. We added a downstream contract registry to detect this." },
      { heading: "CONCLUSION", body: "Explicit modeling of the sigma variable transforms multi-model orchestration from an open-loop to a closed-loop system. The 34% hallucination reduction demonstrates that compensating for unmeasured deviation is practical, not theoretical. The framework's value is highest in resource-constrained environments (like ours in Taungoo) where brute-force retries are economically infeasible. Future work: cross-pipeline σ transfer, so drift signals from one deployed system inform another's thresholds." },
    ],
  },
  {
    title: "RWA Tokenization for Agricultural Microgrids",
    date: "2024.07.15", tag: "Web3", readTime: "9 min", authors: "CHAIN WEAVER, EDGE RUNNER",
    desc: "Tokenizing microgrid capacity as on-chain RWA, settling against physical IoT telemetry from a 240-node sensor mesh.",
    citations: 7,
    sections: [
      { heading: "PROBLEM", body: "Agricultural microgrids generate surplus capacity that goes unused. Tokenizing this capacity as RWA would allow peer-to-peer energy trading, but requires reliable physical-world data to settle on-chain claims. In the Taungoo agricultural belt, 38 households share a single microgrid with no central settlement layer — surplus flows to waste. The challenge: how do you represent physical electrons as on-chain tokens that trade fairly and settle reliably against actual generation?" },
      { heading: "PRIOR ART", body: "Existing RWA tokenization projects (Centrifuge, MakerDAO RWA vaults, Ondo Finance) tokenize financial instruments, not physical-flows. Power Ledger and LO3 Energy have run peer-to-peer energy pilots, but their architectures assume high-end smart meters with continuous network connectivity. Our setting has intermittent LoRa coverage, consumer-grade sensors, and frequent packet loss. We needed an architecture that settles against probabilistic, not deterministic, telemetry." },
      { heading: "ARCHITECTURE", body: "Built with Express, GraphQL, and Solidity. The IoT mesh (240 nodes, LoRa+BLE) feeds telemetry to a Redis cache. Smart contracts read from an oracle bridge and settle surplus capacity tokens against physical generation. The oracle uses an EWMA (exponentially-weighted moving average) of the last 60 packets to filter noise. Smart contracts only settle tokens when the EWMA exceeds a per-household threshold for at least 5 minutes — preventing flash spikes from triggering phantom settlements." },
      { heading: "TOKEN DESIGN", body: "Each token represents 1 Wh of surplus capacity, minted at the moment of generation surplus (battery charge > 80% AND forecast consumption < current generation). Tokens are ERC-20 with a 'settlement window' extension: tokens must be redeemed for consumption within 6 hours of minting, after which they auto-burn. This creates a perishable token class that tracks the actual physical reality of stored energy decaying over time." },
      { heading: "RESULTS", body: "Deployed at the Taungoo tech park with 38 households. Over 60 days, 4.2MWh of surplus capacity was tokenized and traded. The IoT mesh provided 8.1M packets/day with 41ms median latency — sufficient for real-time settlement. Average household saved 14% on grid-import costs. The token velocity was 3.2 (each token traded an average of 3.2 times before redemption), indicating an active local market." },
      { heading: "FAILURE MODES", body: "Two failure modes emerged. (1) Sensor drift: one household's calibration drifted by 18% over 60 days, causing them to receive phantom tokens. We added a per-sensor drift detector that flags deviations > 12% from fleet median. (2) Oracle latency attacks: a brief network partition caused the oracle to lag, allowing an attacker to claim tokens for energy that had already been consumed. Mitigation: added a 'finality delay' of 3 blocks (~36 seconds) before token minting, ensuring telemetry had stabilized." },
      { heading: "CONCLUSION", body: "RWA tokenization for microgrids is feasible with existing IoT infrastructure. LoRa mesh networks provide sufficient bandwidth and latency for on-chain settlement without requiring expensive 5G infrastructure. The perishable-token design (auto-burn after 6h) is novel and aligns tokens with the physical reality of stored energy. Future work: cross-microgrid token portability, allowing surplus from one community to settle consumption in another." },
    ],
  },
  {
    title: "Local-Language NLP for Low-Resource Myanmar Dialects",
    date: "2024.04.22", tag: "NLP", readTime: "11 min", authors: "SIGNAL TENDER",
    desc: "A tokenizer and adapter stack for Yangon-region Myanmar dialects, evaluated on community-authored eval sets.",
    citations: 11,
    sections: [
      { heading: "BACKGROUND", body: "Myanmar has 100+ living languages, but NLP resources exist for fewer than 5. The Yangon region dialects are particularly underserved, with no standardized tokenizer, no evaluation benchmarks, and no community-authored datasets. This is a structural inequity: language technology decides who can access information, conduct commerce, and participate in governance digitally. Without NLP resources, dialect speakers are forced into Burmese or English — marginalizing their native expression." },
      { heading: "SCOPE", body: "We focused on three Yangon-region dialects: Intha, Danu, and Yo. These were chosen because (a) they share a script with standard Burmese, lowering the barrier to data collection, (b) they have living native-speaker communities willing to contribute, and (c) they exhibit distinct lexical and tonal variation worth modeling. Out of scope: tonal modeling (we model text only), and the Karen/Mon language families which require separate tokenizers due to script differences." },
      { heading: "APPROACH", body: "Built a phoneme-aware subword tokenizer that handles Yangon dialect variations. Combined with a dialect-adapter fine-tuning protocol. Released the first community-authored eval set: 2,400 sentences annotated by native speakers under a CC-BY-SA license. The tokenizer is BPE-based but uses a phoneme inventory as the merge seed, so dialect-specific spellings of the same phoneme converge to the same token. This is critical because the dialects share most of their vocabulary but use different orthographic conventions." },
      { heading: "DATA COLLECTION", body: "Recruited 12 native speakers (4 per dialect) through community organizations. Each contributed 200 sentences: 100 from oral storytelling (transcribed) and 100 from everyday conversation (recorded with consent). All contributors reviewed and approved their transcriptions before release. The dataset includes speaker metadata (age, gender, district) for stratified analysis but the released version anonymizes speakers to prevent re-identification." },
      { heading: "EVALUATION", body: "Compared against mBERT baseline on the eval set. The phoneme-aware tokenizer achieved 18% F1 improvement on named entity recognition and 12% improvement on sentiment analysis. The dialect adapter reduced cross-dialect transfer error by 23%. We also measured dialect fidelity: native speakers rated model outputs on a 5-point Likert scale, and our model scored 4.1 vs mBERT's 2.3 — meaning outputs were not just accurate but also dialect-appropriate in style." },
      { heading: "IMPACT", body: "The eval set and models are released open-source. 1,800+ learners have used the community NLP tools. The framework is being extended to Karen and Mon languages in collaboration with local community organizations. Two local startups have integrated the tokenizer into customer-support chatbots serving dialect-speaking regions. The Myanmar Ministry of Education has expressed interest in adopting the eval set as a benchmark for regional language technology initiatives." },
      { heading: "LIMITATIONS", body: "The dataset is small (2,400 sentences) and geographically concentrated in the Yangon region. The tokenizer handles script-sharing dialects well but is not applicable to script-distinct languages. We also did not model prosody, which carries significant semantic weight in tonal dialects. The eval set, while community-authored, reflects the demographics of our 12 contributors — older adults are overrepresented. Future work: prosody modeling, expansion to script-distinct languages, broader demographic representation." },
    ],
  },
  {
    title: "Edge Inference on Sub-$50 Hardware: Quantization Lessons from the Field",
    date: "2024.09.10", tag: "AI", readTime: "10 min", authors: "EDGE RUNNER",
    desc: "A field study quantizing Llama-3.2-1B to 4-bit for deployment on Raspberry Pi 4 clusters serving rural Taungoo school districts.",
    citations: 5,
    sections: [
      { heading: "PROBLEM", body: "Rural Taungoo school districts have intermittent grid power and no internet for ~8 hours/day. Cloud-based AI assistants are unusable. We needed a local LLM deployment that runs on commodity hardware (Raspberry Pi 4, 8GB) powered by solar-charged battery banks. The constraint: sub-3-second first-token latency, ~10 tokens/sec generation, on hardware costing under $50 per node." },
      { heading: "APPROACH", body: "Started with Llama-3.2-1B (1.2B parameters). Applied GPTQ 4-bit quantization, then llama.cpp's Q4_K_M format for ARM-optimized inference. Distributed inference across a 4-node Pi cluster using a simple round-robin scheduler — each node handles every 4th request to maximize cache hit rate on warm KV caches. Memory-mapped the model file to allow multiple workers per node without duplicating weights." },
      { heading: "QUANTIZATION CHOICES", body: "Tested three formats: (1) AWQ 4-bit — best perplexity but 1.4x slower than baseline on Pi due to dequantization overhead. (2) GPTQ 4-bit — balanced perplexity and speed. (3) Q4_K_M (llama.cpp) — fastest, slight perplexity loss on rare tokens. We chose Q4_K_M because speed matters more than marginal perplexity in a school-assistant use case. Perplexity delta: 5.7 vs FP16 baseline — acceptable for the use case but not for legal/medical applications." },
      { heading: "HARDWARE", body: "4x Raspberry Pi 4 (8GB), each with a 64GB A2 microSD card. Solar: 100W panel + 30Ah LiFePO4 battery per node. Inference only — no training. Total per-node cost: $48 (Pi) + $12 (SD) + $35 (solar+battery) = $95/node. Cluster total: $380 + $50 networking. The cluster delivers ~38 tokens/sec aggregate across the 4 nodes — sufficient for 6 concurrent student sessions." },
      { heading: "RESULTS", body: "First-token latency: 2.8s median (target: <3s). Generation speed: 9.4 tokens/sec per node, 37.6 tokens/sec aggregate. Power draw: 6.2W per node under load, 1.1W idle — well within the 30W solar budget. Sustained operation: 18 months of continuous uptime with 4 power-loss events (auto-recovered via systemd service). Teachers report student engagement up 41% vs no-AI baseline in vocabulary drills." },
      { heading: "FAILURE MODES", body: "(1) SD card wear — early failures after ~6 months of high-write inference logging. Mitigation: moved logs to RAM disk, SD card write reduced 95%. (2) Thermal throttling in 40°C ambient — added passive aluminum heatsinks, throttling eliminated. (3) Battery imbalance — one node's battery degraded faster, causing cluster asymmetry. Mitigation: added a per-node health monitor and rebalanced load dynamically." },
      { heading: "CONCLUSION", body: "Sub-$50-per-node edge LLM inference is feasible with careful quantization. The Pi 4 cluster serves 60+ students daily in a rural Taungoo school. The replication cost is low enough that neighboring schools are deploying copies. The lesson: don't optimize perplexity when the bottleneck is hardware cost and uptime. Optimize for the use case — and in education, consistency beats brilliance." },
    ],
  },
  {
    title: "Distributed Consensus Without Internet: Taungoo Mesh Network Field Notes",
    date: "2024.06.18", tag: "Web3", readTime: "8 min", authors: "CHAIN WEAVER",
    desc: "Operating a CRDT-based community ledger across 17 nodes with no internet backbone — lessons from 14 months of uptime.",
    citations: 3,
    sections: [
      { heading: "PROBLEM", body: "Taungoo's outer districts have no reliable internet. Community governance, micro-credit, and shared-resource coordination all require a shared ledger, but traditional blockchain consensus assumes synchronous network access. We needed a ledger that operates on a partitioned mesh network, eventually-consistent, with no global coordinator." },
      { heading: "ARCHITECTURE", body: "Built on Yjs (CRDT) with a custom Merkle-clock layer for causal ordering. Each node maintains a full replica. Updates propagate via Bluetooth Low Energy mesh (range ~30m per hop, 6 hops typical). No proof-of-stake, no leader election — pure CRDT merging. Conflict resolution is automatic; the only constraint is that operations must be commutative, associative, and idempotent." },
      { heading: "DATA MODEL", body: "Modeled all community transactions as JSON CRDT objects (counters, sets, maps). Micro-credit: grow-only counter per member. Shared-resource scheduling: LWW (last-writer-wins) map with vector clocks. Governance proposals: OR-set of votes. The CRDT semantics force us to model transactions as commutative operations — this is a constraint that shapes the application design fundamentally." },
      { heading: "DEPLOYMENT", body: "17 nodes across 4 districts. Each node is a $12 ESP32 with a 32GB SD card. BLE mesh formed organically — no manual configuration. Updates propagate at 6-8 hops/hour median. Median convergence time for an update to reach all 17 nodes: 2.3 hours. Worst case (network partition): 11 hours. Total uptime: 14 months, no manual intervention required after initial setup." },
      { heading: "SCALABILITY", body: "17 nodes is comfortable. We tested scaling to 50 nodes in simulation — convergence time grows ~O(n log n). Beyond 100 nodes, the CRDT tombstone accumulation becomes a memory concern. Mitigation: garbage-collected tombstones older than 30 days (configurable). Real-world scaling beyond 50 nodes would likely require hierarchical clustering (district super-nodes), which we have not yet implemented." },
      { heading: "SECURITY", body: "Each node signs updates with an Ed25519 key. The CRDT verifies signatures on merge. Sybil resistance is social: nodes are vouched for by existing members (web-of-trust). This is not blockchain-grade security — it assumes the community is small enough that reputation works. For larger deployments, we would need a different trust model. Compromise recovery: any member can publish a revocation, which propagates as a CRDT update." },
      { heading: "RESULTS", body: "14 months, 0 governance disputes settled incorrectly, 0 data loss events. 4 micro-credit cycles completed (~$2,300 total volume). The system handled 3 sustained network partitions gracefully (monsoon season — intermittent connectivity for 4-7 days). Recovery after partition: automatic, no manual intervention. The mesh ledger has become trusted infrastructure that the community relies on." },
      { heading: "CONCLUSION", body: "CRDT-based ledgers are viable for community-scale coordination in partitioned networks. The constraint — operations must be commutative — forces application design discipline that turns out to be valuable even in connected settings. Future work: hierarchical scaling, cross-mesh federation, and a hardware reference design for <$5 nodes." },
    ],
  },
  {
    title: "Sound Frequencies as Learning Aids: Audio-API Pilot in Lumina",
    date: "2024.05.30", tag: "NLP", readTime: "7 min", authors: "SIGNAL TENDER, NEURAL HAND",
    desc: "A 6-week pilot testing whether binaural-beats audio paired with tarot-reading prompts improves self-reported focus and learning retention.",
    citations: 2,
    sections: [
      { heading: "BACKGROUND", body: "Lumina is a tarot/manifestation app we shipped in 2024. Users reported that the app's soundscapes (Tone.js-generated binaural beats) 'helped them focus' during reflection. We had no evidence — just testimonials. We designed a small-N study to test whether the audio component measurably improves focus and self-reported learning outcomes." },
      { heading: "HYPOTHESIS", body: "Binaural beats in the alpha range (8-12 Hz) presented during a focused-learning task (tarot-card meaning memorization) will improve (a) self-reported focus scores, (b) immediate recall, and (c) 24-hour delayed recall, compared to a silent control and a pink-noise control. The hypothesis is grounded in the controversial but peer-reviewed literature on binaural beats and attention." },
      { heading: "METHOD", body: "42 participants, randomized into 3 groups (binaural / pink noise / silent). Each completed a 15-minute learning task (memorize 8 tarot card meanings) followed by immediate recall test, then 24-hour delayed recall. Self-reported focus via 5-point Likert scale. Audio generated client-side via Tone.js at 200Hz carrier, 10Hz beat frequency." },
      { heading: "RESULTS", body: "Self-reported focus: binaural 4.2, pink 3.8, silent 3.1 (binaural vs silent p<0.01, binaural vs pink n.s.). Immediate recall: no significant difference across groups (all ~78%). Delayed 24-hour recall: binaural 71%, pink 69%, silent 64% (binaural vs silent p<0.05). The effect on delayed recall is small but statistically significant. The effect on immediate recall is null — audio doesn't help you encode, it may help you consolidate." },
      { heading: "DEPLOYMENT IN LUMINA", body: "Following the pilot, we integrated the binaural-beats mode into Lumina as an optional 'focus session' feature. Users can toggle it during tarot readings. Adoption: 31% of users enable it at least weekly. Retention (30-day) is 18% higher for users who enabled binaural at least once vs never-enabled. This is observational, not causal — but consistent with the pilot findings." },
      { heading: "LIMITATIONS", body: "Small N (42). No blinding — participants could hear whether they were in the binaural group. Self-reported focus is subjective. The delayed-recall effect is small (7 percentage points) and the study is underpowered for sub-group analysis. We did not test long-term retention beyond 24 hours. Future work: larger N, double-blind design, 7-day delayed recall." },
      { heading: "CONCLUSION", body: "The pilot suggests binaural beats may improve delayed recall and subjective focus, but not immediate encoding. The effect size is small but enough to justify shipping the feature. We release the Tone.js frequency generator and the study protocol under MIT license. Replication is welcomed and encouraged — small-N community science can produce useful directional evidence." },
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
