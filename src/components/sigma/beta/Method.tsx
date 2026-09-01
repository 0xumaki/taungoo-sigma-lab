"use client";
import * as React from "react";
import { motion } from "motion/react";
import { TECH_DATA } from "./beta-data";
import { SectionHeader } from "./SectionHeader";

const PRINCIPLES = [
  { num: "01", title: "Outcome-First", body: "We define success metrics before writing code. Every deliverable maps to a measurable business outcome." },
  { num: "02", title: "Fixed Scope", body: "Clear deliverables, clear timelines. No scope creep or surprise invoices." },
  { num: "03", title: "Senior Operators", body: "Every project handled by engineers with 7+ years production experience." },
  { num: "04", title: "Production-Grade", body: "Tests, monitoring, CI/CD, documentation. Production systems — not prototypes." },
  { num: "05", title: "Honest Pricing", body: "Reference prices published openly. Final quotes negotiated transparently." },
];

export function Method() {
  // Flatten all tech items for the marquee
  const allTech = React.useMemo(() => {
    return TECH_DATA.flatMap((cat) => cat.items.map((item) => ({ item, color: cat.color })));
  }, []);
  const totalCount = allTech.length;
  const categoryCount = TECH_DATA.length;

  return (
    <section id="method" aria-labelledby="method-title" data-section="method" className="relative" style={{ background: "var(--beta-bg)" }}>
      <div className="px-[4%] py-16 md:py-24">
        <SectionHeader
          index="04"
          eyebrow="METHOD"
          title="What we believe."
          className="mb-16"
          titleId="method-title"
        />

        {/* Principles — horizontal scrolling list with sticky numbers */}
        <div className="space-y-12 md:space-y-16">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.6 }}
              className="bs-method-row group flex items-start gap-4 sm:gap-6 lg:gap-8 relative"
            >
              {/* Ghosted oversized step numeral — anchored behind the content as a watermark */}
              <span className="bs-method-ghost" aria-hidden="true">{p.num}</span>

              {/* Timeline node — circular marker with gold glow ring that pulses on row hover/focus.
                  Step numeral inside is fully visible (the "active" marker). */}
              <div
                className="bs-method-node shrink-0 flex items-center justify-center"
                style={{
                  width: "clamp(3.5rem, 8vw, 5.5rem)",
                  height: "clamp(3.5rem, 8vw, 5.5rem)",
                  border: "1px solid rgba(212, 175, 55, 0.30)",
                  borderRadius: "9999px",
                  background: "rgba(212, 175, 55, 0.04)",
                  boxShadow: "0 0 0 0 rgba(212, 175, 55, 0)",
                }}
                tabIndex={0}
                aria-label={`Principle ${p.num}: ${p.title}`}
              >
                <span
                  className="font-mono font-bold tabular-nums leading-none"
                  style={{
                    fontSize: "clamp(1.25rem, 3.5vw, 2rem)",
                    color: "var(--beta-accent)",
                  }}
                >
                  {p.num}
                </span>
              </div>

              <span
                className="hidden sm:block w-px self-stretch shrink-0 relative z-10"
                style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.4), transparent)" }}
              />
              <div className="pt-1 sm:pt-2 flex-1 relative z-10">
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: "var(--beta-fg-strong)" }}>{p.title}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] hidden sm:inline" style={{ color: "var(--beta-fg-subtle)" }}>PRINCIPLE</span>
                </div>
                <p className="max-w-[600px] text-sm sm:text-base lg:text-lg italic leading-relaxed" style={{ color: "var(--beta-fg-muted)" }}>{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TECH STACK — creative layout: stats sidebar + categorized grid + marquee */}
      <div className="px-[4%] py-16 md:py-24" style={{ borderTop: "1px solid var(--beta-border)" }}>
        <SectionHeader
          index="05"
          eyebrow="TECH STACK"
          title="Built with."
          subtitle={<>Verified from our actual <code className="font-mono px-1.5 py-0.5 not-italic" style={{ background: "rgba(212,175,55,0.08)", color: "var(--beta-accent)", borderRadius: "2px", border: "1px solid rgba(212,175,55,0.2)" }}>package.json</code> — no marketing fluff.</>}
        />

        {/* STATS ROW — 3 KPI tiles */}
        <div data-reveal-stagger className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
          <StatTile value={String(totalCount).padStart(2, "0")} label="TOTAL TOOLS" accent="var(--beta-accent)" />
          <StatTile value={String(categoryCount).padStart(2, "0")} label="CATEGORIES" accent="var(--beta-accent-2)" />
          <StatTile value="100%" label="VERIFIED" accent="var(--beta-accent-3)" />
        </div>

        {/* MARQUEE — all tech scrolling horizontally */}
        <div className="relative mb-8 overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
          <div className="bs-marquee flex gap-3 whitespace-nowrap" style={{ animation: "bs-marquee-scroll 40s linear infinite", width: "max-content" }}>
            {[...allTech, ...allTech].map(({ item, color }, i) => (
              <span
                key={`${item}-${i}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[12px] shrink-0"
                style={{
                  border: `1px solid ${color}30`,
                  color: "var(--beta-fg-muted)",
                  borderRadius: "2px",
                  background: `${color}08`,
                }}
              >
                <span className="h-1 w-1 rounded-full" style={{ background: color }} />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* CATEGORIZED GRID — each card with unique visual treatment */}
        <div data-reveal-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_DATA.map((cat, ci) => (
            <TechCategoryCard key={cat.category} cat={cat} index={ci} />
          ))}
        </div>
      </div>

      {/* Marquee keyframe */}
      <style>{`
        @keyframes bs-marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

/** StatTile — KPI tile for the tech stack stats row */
function StatTile({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative p-4 md:p-5 overflow-hidden"
      style={{
        border: "1px solid var(--beta-border)",
        borderRadius: "2px",
        background: "linear-gradient(135deg, rgba(255,255,255,0.02), transparent)",
      }}
    >
      <span className="absolute top-0 left-0 h-[2px] w-full" style={{ background: accent, opacity: 0.5 }} />
      <div className="font-mono text-2xl md:text-3xl font-bold tabular-nums" style={{ color: accent, textShadow: `0 0 16px ${accent}40` }}>
        {value}
      </div>
      <div className="mt-1 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--beta-fg-subtle)" }}>
        {label}
      </div>
    </motion.div>
  );
}

/** TechCategoryCard — immersive overlay: icon fills card, content overlays at bottom */
function TechCategoryCard({ cat, index }: { cat: typeof TECH_DATA[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group relative overflow-hidden"
      style={{
        border: "1px solid var(--beta-border)",
        borderRadius: "12px",
        background: "var(--beta-bg)",
        minHeight: "200px",
        transition: `border-color var(--dur-normal) var(--ease-out-expo), box-shadow var(--dur-normal) var(--ease-out-expo)`,
      }}
    >
      {/* ICON — fills entire card as the "background portrait" */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute h-40 w-40 rounded-full opacity-15 group-hover:opacity-30 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${cat.color}40 0%, transparent 70%)` }}
        />
        {/* Large icon — centered, acts as the "image" */}
        <span
          className="relative font-bold transition-all duration-500 group-hover:scale-110"
          style={{
            fontSize: "5rem",
            color: cat.color,
            textShadow: `0 0 40px ${cat.color}60, 0 0 20px ${cat.color}40`,
            lineHeight: 1,
            opacity: 0.8,
          }}
        >
          {cat.icon}
        </span>
      </div>

      {/* DARK GRADIENT OVERLAY — transparent top → solid bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.7) 40%, rgba(5,5,8,0.1) 70%, transparent 100%)",
        }}
      />

      {/* ACCENT TINT on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${cat.color}10, transparent 60%)` }}
      />

      {/* TOP BADGE — count (glassmorphism) */}
      <div className="relative z-10 p-4">
        <span
          className="font-mono text-[10px] tabular-nums px-2.5 py-1"
          style={{
            color: cat.color,
            background: "rgba(5,5,8,0.6)",
            borderRadius: "9999px",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: `1px solid ${cat.color}40`,
          }}
        >
          {cat.items.length} TOOLS
        </span>
      </div>

      {/* BOTTOM CONTENT — overlaid on gradient */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 lg:p-5">
        {/* Category title */}
        <h3 className="text-lg font-bold uppercase tracking-[0.1em]" style={{ color: "var(--beta-fg-strong)" }}>{cat.category}</h3>

        {/* Tech chips — pill-shaped, glassmorphism */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {cat.items.map((tech, ti) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 + ti * 0.03 }}
              className="px-2 py-0.5 font-mono text-[10px] font-medium transition-all hover:scale-105 cursor-default"
              style={{
                border: `1px solid ${cat.color}25`,
                color: "var(--beta-fg-muted)",
                borderRadius: "9999px",
                background: "rgba(5,5,8,0.5)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Footer — verified pill */}
        <div className="mt-3 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}` }} />
          <span className="font-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: cat.color }}>VERIFIED</span>
        </div>
      </div>
    </motion.div>
  );
}
