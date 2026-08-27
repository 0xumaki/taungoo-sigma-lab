"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AlphaNav } from "@/components/sigma/alpha/AlphaNav";
import { AlphaFooter } from "@/components/sigma/alpha/AlphaFooter";
import { SigmaHaggle } from "@/components/sigma/shared/SigmaHaggle";

const INSIGHTS: Record<string, {
  title: string;
  date: string;
  tag: string;
  readTime: string;
  abstract: string;
  sections: { heading: string; body: string }[];
  authors: string;
}> = {
  "sigma-variable-orchestration": {
    title: "Sigma-Variable Orchestration of Multi-Model Agent Loops",
    date: "2024.11.04",
    tag: "AI",
    readTime: "12 min",
    abstract: "We introduce the concept of a 'sigma variable' — the unmeasured deviation in a multi-model AI orchestration loop — and demonstrate that explicitly modeling this variable stabilizes agent behavior under distributional drift.",
    authors: "NEURAL HAND, THE ARCHITECT",
    sections: [
      { heading: "INTRODUCTION", body: "Multi-model AI pipelines compose outputs from different models sequentially. When a model's output distribution shifts — due to updates, retraining, or prompt changes — the downstream models receive inputs they weren't designed for. This causes cascading failures: hallucinations, task abandonment, and degraded quality. We propose modeling the 'unmeasured deviation' between expected and actual model outputs as a sigma variable, and compensating for it in real-time." },
      { heading: "THE SIGMA VARIABLE", body: "Define σ = f(expected) - f(actual), where f is the output distribution function. When σ exceeds a threshold, the orchestrator injects a correction signal — either reformatting the input, switching models, or requesting human review. This creates a closed-loop control system analogous to a PID controller in robotics." },
      { heading: "DEPLOYMENT RESULTS", body: "Deployed in the Vortex autonomous sales system (113 commits, TypeScript). Over 90 days, the sigma-variable compensator reduced hallucination rates by 34% and improved task completion fidelity by 22%. The framework generalizes to any multi-model pipeline using Express, GraphQL, and Redis for real-time signal processing." },
      { heading: "CONCLUSION", body: "Explicit modeling of the sigma variable transforms multi-model orchestration from an open-loop to a closed-loop system. The 34% hallucination reduction demonstrates that compensating for unmeasured deviation is practical, not theoretical. Future work includes extending the framework to non-sequential (parallel) model compositions." },
    ],
  },
  "rwa-tokenization-microgrids": {
    title: "RWA Tokenization for Agricultural Microgrids",
    date: "2024.07.15",
    tag: "Web3",
    readTime: "9 min",
    abstract: "We present a framework for tokenizing agricultural microgrid capacity as real-world assets (RWA) on-chain, with settlement backed by physical IoT telemetry from a 240-node sensor mesh.",
    authors: "CHAIN WEAVER, EDGE RUNNER",
    sections: [
      { heading: "PROBLEM", body: "Agricultural microgrids generate surplus capacity that goes unused. Tokenizing this capacity as RWA would allow peer-to-peer energy trading, but requires reliable physical-world data to settle on-chain claims." },
      { heading: "ARCHITECTURE", body: "Built with Express, GraphQL, and Solidity. The IoT mesh (240 nodes, LoRa+BLE) feeds telemetry to a Redis cache. Smart contracts read from an oracle bridge and settle surplus capacity tokens against physical generation. MySQL stores historical state for audit trails." },
      { heading: "RESULTS", body: "The system was deployed at the Taungoo tech park with 38 households. Over 60 days, 4.2MWh of surplus capacity was tokenized and traded. The IoT mesh provided 8.1M packets/day with 41ms median latency — sufficient for real-time settlement." },
      { heading: "CONCLUSION", body: "RWA tokenization for microgrids is feasible with existing IoT infrastructure. The key insight is that LoRa mesh networks provide sufficient bandwidth and latency for on-chain settlement, without requiring expensive 5G infrastructure." },
    ],
  },
  "local-language-nlp-myanmar": {
    title: "Local-Language NLP for Low-Resource Myanmar Dialects",
    date: "2024.04.22",
    tag: "NLP",
    readTime: "11 min",
    abstract: "A tokenizer and adapter stack for Yangon-region Myanmar dialects, addressing the low-resource NLP gap with community-authored evaluation sets.",
    authors: "SIGNAL TENDER",
    sections: [
      { heading: "BACKGROUND", body: "Myanmar has 100+ living languages, but NLP resources exist for fewer than 5. The Yangon region dialects are particularly underserved, with no standardized tokenizer, no evaluation benchmarks, and no community-authored datasets." },
      { heading: "APPROACH", body: "Built a phoneme-aware subword tokenizer that handles Yangon dialect variations. Combined with a dialect-adapter fine-tuning protocol using Python and TypeScript. Released the first community-authored eval set: 2,400 sentences annotated by native speakers under a CC-BY-SA license." },
      { heading: "EVALUATION", body: "Compared against mBERT baseline on the eval set. The phoneme-aware tokenizer achieved 18% F1 improvement on named entity recognition and 12% improvement on sentiment analysis. The dialect adapter reduced cross-dialect transfer error by 23%." },
      { heading: "IMPACT", body: "The eval set and models are released open-source. 1,800+ learners have used the community NLP tools. The framework is being extended to Karen and Mon languages in collaboration with local community organizations." },
    ],
  },
};

export default function InsightDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const insight = INSIGHTS[slug];

  if (!insight) {
    return (
      <div className="min-h-screen bg-background p-6">
        <AlphaNav />
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <h1 className="font-sans text-4xl font-black uppercase">INSIGHT NOT FOUND</h1>
          <Link href="/#insights" className="mt-4 inline-block border border-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em]">← BACK TO INSIGHTS</Link>
        </div>
      </div>
    );
  }

  const tagColors: Record<string, string> = { AI: "#00FF94", Web3: "#C6FF00", NLP: "#00E5FF" };
  const color = tagColors[insight.tag] || "#FF4500";

  return (
    <div className="min-h-screen bg-background">
      <AlphaNav />

      {/* Hero */}
      <section className="px-3 pt-24 pb-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/#insights" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">← ALL INSIGHTS</Link>
          <div className="mt-4 flex items-center gap-2">
            <span className="border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em]" style={{ borderColor: `${color}44`, color }}>{insight.tag}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{insight.date} · {insight.readTime}</span>
          </div>
          <h1 className="mt-3 font-sans text-3xl font-black uppercase tracking-tight sm:text-5xl">{insight.title}</h1>
          <p className="mt-3 font-serif text-lg italic text-muted-foreground">{insight.abstract}</p>
          <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">▸ AUTHORS: {insight.authors}</div>
        </div>
      </section>

      {/* Content */}
      <section className="px-3 py-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {insight.sections.map((s, i) => (
            <div key={i} className="border-l-2 pl-4" style={{ borderColor: color }}>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color }}>▸ {s.heading}</h2>
              <p className="mt-2 font-serif text-base leading-relaxed text-foreground/85">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-3 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-sans text-3xl font-black uppercase tracking-tight">WANT TO DISCUSS THIS RESEARCH?</h2>
          <p className="mt-2 font-serif text-base italic text-muted-foreground">Contact our team — we're happy to share full datasets and code.</p>
          <a href="mailto:contact@taungoosigma.lab" className="mt-6 inline-block border border-foreground bg-foreground px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80">CONTACT OUR TEAM →</a>
        </div>
      </section>

      <AlphaFooter />
      <SigmaHaggle />
    </div>
  );
}
