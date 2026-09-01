"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AlphaNav } from "@/components/sigma/alpha/AlphaNav";
import { AlphaFooter } from "@/components/sigma/alpha/AlphaFooter";
import { SigmaHaggle } from "@/components/sigma/shared/SigmaHaggle";
// LOOP-3-AGENTIC-SEO: INSIGHTS data extracted to insights-data.ts (server-safe)
// so the parent page.tsx server component can import them for generateMetadata
// + JSON-LD without duplicating the insights dataset.
import { INSIGHTS } from "./insights-data";

export function InsightDetailView() {
  const params = useParams();
  const slug = params.slug as string;
  const insight = INSIGHTS[slug];

  if (!insight) {
    return (
      <div className="min-h-screen bg-background p-6">
        <AlphaNav />
        <main id="main-content" data-section="main" className="mx-auto mt-20 max-w-2xl text-center">
          <h1 className="font-sans text-4xl font-black uppercase">INSIGHT NOT FOUND</h1>
          <Link href="/#insights" className="mt-4 inline-block border border-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em]">← BACK TO INSIGHTS</Link>
        </main>
      </div>
    );
  }

  const tagColors: Record<string, string> = { AI: "#00FF94", Web3: "#C6FF00", NLP: "#00E5FF" };
  const color = tagColors[insight.tag] || "#FF4500";

  return (
    <div className="min-h-screen bg-background">
      <AlphaNav />

      {/* LOOP-3-AGENTIC-SEO: <main> wraps the page's primary content (hero
          through CTA) — provides the single per-page main landmark that
          Lighthouse SEO + AI crawlers + screen readers expect. AlphaNav (site
          header) + AlphaFooter (page-level contentinfo footer) stay outside
          <main> as site chrome. id="main-content" matches the skip-link target
          pattern from the homepage. data-section="main" + data-mode="alpha"
          enable AI agent identification of the primary content region. */}
      <main id="main-content" data-section="main" data-mode="alpha">

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
      </main>

      <AlphaFooter />
      <SigmaHaggle />
    </div>
  );
}
