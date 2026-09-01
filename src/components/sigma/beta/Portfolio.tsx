"use client";
import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "./beta-data";
import { ClassifiedCover } from "@/components/sigma/shared/ClassifiedCover";
import { SectionHeader } from "./SectionHeader";

// Projects that DON'T have real screenshots — use glitching ClassifiedCover
const NO_SCREENSHOT = new Set(["asean-swap", "manymarket"]);

// Category accent colors
const CAT_ACCENT: Record<string, string> = {
  AI: "var(--beta-accent-2)",
  WEB3: "var(--beta-accent-3)",
  "FULL-STACK": "#FFB300",
  DESIGN: "#FFB300",
};

function getAccent(cat: string): string {
  if (cat.includes("·")) return "var(--beta-accent)";
  return CAT_ACCENT[cat] || "var(--beta-accent)";
}

function getPrimaryCat(cat: string): string {
  if (cat.includes("·")) return cat.split(" · ")[0];
  return cat;
}

export function Portfolio() {
  const [expanded, setExpanded] = React.useState<number | null>(null);

  return (
    <section id="work" aria-labelledby="work-title" data-section="work" className="relative px-[4%] py-16 md:py-24" style={{ background: "var(--beta-bg)" }}>
      <SectionHeader
        index="03"
        eyebrow="WORK"
        title="Selected operations."
        subtitle="Real production systems — not demos. Click any to expand."
        titleId="work-title"
        rightSlot={
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] hidden md:inline-block" style={{ color: "var(--beta-fg-subtle)" }}>
            <span className="tabular-nums" style={{ color: "var(--beta-accent)" }}>{String(PROJECTS.length).padStart(2, "0")}</span> · DEPLOYED
          </span>
        }
      />

      {/* MINIMALIST LIST — table of contents style, expand on click */}
      <div className="border-t" style={{ borderColor: "var(--beta-border)" }}>
        {PROJECTS.map((project, i) => {
          const isOpen = expanded === i;
          const accent = getAccent(project.cat);
          const primaryCat = getPrimaryCat(project.cat);

          return (
            <div key={project.slug} className="border-b" style={{ borderColor: "var(--beta-border)" }}>
              {/* LIST ROW — clickable, expandable */}
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                className="bs-portfolio-row group relative flex w-full items-center gap-4 py-5 md:py-6 text-left transition-colors hover:bg-white/[0.015]"
                aria-expanded={isOpen}
              >
                {/* Gold corner brackets — top-left + bottom-right, draw in on hover/open */}
                <span className="bs-portfolio-corner tl" />
                <span className="bs-portfolio-corner br" />

                {/* Ghosted oversized "0X" numeral — watermark behind the title, fades in on hover/open */}
                <span className="bs-portfolio-ghost" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Index number — large, monospace, subtle */}
                <span
                  className="relative z-10 font-mono text-sm md:text-base tabular-nums shrink-0 w-10 md:w-12 transition-colors"
                  style={{ color: isOpen ? "var(--beta-accent)" : "var(--beta-fg-subtle)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Project name — large, bold, the hero of the row */}
                <div className="relative z-10 flex-1 min-w-0">
                  <h3
                    className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight transition-colors truncate"
                    style={{ color: isOpen ? "var(--beta-accent)" : "var(--beta-fg-strong)" }}
                  >
                    {project.name}
                  </h3>
                  {/* Description — visible on hover only (subtle) */}
                  <p className="mt-0.5 text-[12px] md:text-[13px] leading-snug truncate opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--beta-fg-muted)" }}>
                    {project.desc}
                  </p>
                </div>

                {/* Category badge — right aligned */}
                <span
                  className="relative z-10 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.15em] shrink-0 hidden sm:inline-block px-2 py-1"
                  style={{
                    color: accent,
                    border: `1px solid ${accent}30`,
                    borderRadius: "0",
                    background: `${accent}08`,
                  }}
                >
                  {primaryCat}
                </span>

                {/* Tech count — right aligned */}
                <span className="relative z-10 font-mono text-[10px] md:text-[11px] tabular-nums shrink-0 hidden md:inline-block" style={{ color: "var(--beta-fg-subtle)" }}>
                  {project.tech.length} TECH
                </span>

                {/* Expand/collapse indicator — arrow rotates */}
                <span
                  className="relative z-10 font-mono text-sm shrink-0 transition-transform duration-300"
                  style={{
                    color: isOpen ? "var(--beta-accent)" : "var(--beta-fg-subtle)",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                >
                  ▸
                </span>
              </button>

              {/* EXPANDED CONTENT — accordion, smooth height animation */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 md:pb-8 pt-2 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-8">
                      {/* LEFT: Screenshot */}
                      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", border: "1px solid var(--beta-border)" }}>
                        {project.image && !NO_SCREENSHOT.has(project.slug) ? (
                          <Image
                            src={project.image}
                            alt={`${project.name} — production screenshot`}
                            // PERF (LOOP-1-LH): next/image auto-serves AVIF/WebP at
                            // the right intrinsic size — replaces a 1.7MB PNG (dukon-pro)
                            // and a 5.2MB PNG (royaldao) on the wire with ~50-100KB variants.
                            // sizes: 1 col mobile (~100vw), 1.2fr on lg (≈55vw).
                            fill
                            sizes="(max-width: 1023px) 100vw, 55vw"
                            loading="lazy"
                            className="bs-portfolio-img object-cover object-top"
                          />
                        ) : (
                          <ClassifiedCover variant="card" />
                        )}
                        {/* Top accent bar */}
                        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: accent }} />
                        {/* LIVE badge */}
                        <span
                          className="absolute top-3 right-3 font-mono text-[8px] uppercase px-2 py-0.5 flex items-center gap-1"
                          style={{
                            background: "rgba(0, 255, 148, 0.15)",
                            color: "var(--beta-accent-3)",
                            border: "1px solid rgba(0, 255, 148, 0.3)",
                          }}
                        >
                          <span className="h-1 w-1 rounded-full" style={{ background: "var(--beta-accent-3)" }} /> LIVE
                        </span>
                      </div>

                      {/* RIGHT: Details */}
                      <div className="flex flex-col justify-between">
                        <div>
                          {/* Category + solution */}
                          <div className="mb-3 flex items-center gap-2 flex-wrap">
                            {project.cat.includes("·") ? (
                              project.cat.split(" · ").map((c) => (
                                <span
                                  key={c}
                                  className="font-mono text-[9px] uppercase px-2 py-0.5"
                                  style={{ color: accent, border: `1px solid ${accent}30`, background: `${accent}08` }}
                                >
                                  {c}
                                </span>
                              ))
                            ) : (
                              <span
                                className="font-mono text-[9px] uppercase px-2 py-0.5"
                                style={{ color: accent, border: `1px solid ${accent}30`, background: `${accent}08` }}
                              >
                                {project.cat}
                              </span>
                            )}
                            <span className="font-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: "var(--beta-fg-subtle)" }}>
                              · {project.solution}
                            </span>
                          </div>

                          {/* Title */}
                          <h4 className="text-lg lg:text-xl font-bold tracking-tight" style={{ color: "var(--beta-fg-strong)" }}>
                            {project.name}
                          </h4>

                          {/* Description */}
                          <p className="mt-3 text-[13px] md:text-[14px] leading-relaxed" style={{ color: "var(--beta-fg-muted)" }}>
                            {project.desc}
                          </p>

                          {/* Tech stack */}
                          <div className="mt-4">
                            <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--beta-fg-subtle)" }}>
                              STACK · {project.tech.length}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {project.tech.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-0.5 font-mono text-[10px] font-medium"
                                  style={{
                                    border: `1px solid ${accent}25`,
                                    color: "var(--beta-fg-muted)",
                                    background: "rgba(255,255,255,0.02)",
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-5">
                          <a
                            href={`/portfolio/${project.slug}`}
                            className="inline-flex items-center gap-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-all hover:gap-3"
                            style={{
                              color: accent,
                              border: `1px solid ${accent}40`,
                              background: `${accent}08`,
                            }}
                          >
                            View case study <span aria-hidden="true">→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-6 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--beta-fg-subtle)" }}>
          {PROJECTS.length} PROJECTS · CLICK TO EXPAND
        </span>
        {expanded !== null && (
          <button
            onClick={() => setExpanded(null)}
            className="font-mono text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-[var(--beta-accent)]"
            style={{ color: "var(--beta-fg-subtle)" }}
          >
            ↑ COLLAPSE ALL
          </button>
        )}
      </div>
    </section>
  );
}
