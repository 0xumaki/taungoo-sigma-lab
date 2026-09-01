"use client";

import * as React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AlphaNav } from "@/components/sigma/alpha/AlphaNav";
import { AlphaFooter } from "@/components/sigma/alpha/AlphaFooter";
import { SciFiCard } from "@/components/sigma/alpha/SciFiCard";
import { ClassifiedCover } from "@/components/sigma/shared/ClassifiedCover";
import { usePageReveal } from "@/lib/sigma/use-page-reveal";
import { ContactFormModal } from "@/components/sigma/shared/ContactFormModal";
import { SigmaHaggle } from "@/components/sigma/shared/SigmaHaggle";
// LOOP-3-AGENTIC-SEO: PROJECTS data extracted to projects-data.ts (server-safe)
// so the parent page.tsx server component can import them for generateMetadata
// + JSON-LD without duplicating the 9-project dataset.
import { PROJECTS } from "./projects-data";

export function PortfolioCaseStudyView() {
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
        <main id="main-content" data-section="main" className="mx-auto mt-12 max-w-2xl text-center sm:mt-20">
          <h1 className="font-sans text-3xl font-black uppercase sm:text-4xl">PROJECT NOT FOUND</h1>
          <Link href="/#portfolio" className="mt-4 inline-block border border-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] sm:text-[10px]">
            ← BACK TO PORTFOLIO
          </Link>
        </main>
      </div>
    );
  }

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
      <section className="px-3 pt-20 pb-8 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-5xl">
          <Link href="/#portfolio" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground sm:text-[10px]">
            ← ALL PROJECTS
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] sm:text-[9px]" style={{ color: project.category === "WEB3" ? "#C6FF00" : project.category === "AI" ? "#00FF94" : project.category === "DESIGN" ? "#FFB300" : "#00E5FF" }}>
              {project.category}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-[9px]">{project.created}</span>
          </div>
          <h1 className="mt-2 font-sans text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-6xl">{project.name}</h1>
          <p className="mt-2 font-serif text-base italic text-muted-foreground sm:text-lg">{project.tagline}</p>
        </div>
      </section>

      {/* Screenshot — uniform horizontal full-bleed (16/9) with vertical crop.
          All portfolio screenshots now display identically regardless of native
          aspect ratio (GymMaster, Omnibridge, Vortex Sales OS, etc.) */}
      <section className="px-3 sm:px-6">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="relative w-full overflow-hidden border border-border" style={{ aspectRatio: "16 / 9" }}>
            {project.image ? (
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="100vw"
                priority
                className="object-cover object-top"
              />
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
      </main>

      <AlphaFooter />
      <ContactFormModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <SigmaHaggle />
    </div>
  );
}
