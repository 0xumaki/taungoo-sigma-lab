"use client";

import * as React from "react";
import { motion } from "motion/react";

/**
 * SectionHeader — awwwards-tier section eyebrow + headline.
 * Replaces the old "[ 02 / SERVICES ]" marker with a refined:
 *   ─── 02 · SERVICES
 * layout: small uppercase eyebrow + horizontal rule + index + label
 *
 * Layout: 4-cell grid [eyebrow | headline | headline | (right slot)]
 */
type Props = {
  index: string; // e.g. "02"
  eyebrow: string; // e.g. "SERVICES"
  title: string;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  rightSlot?: React.ReactNode;
  className?: string;
  // LOOP-3-AGENTIC-SEO: optional id for the rendered <h2> so the parent
  // <section> can reference it via aria-labelledby (landmark discovery for
  // AI crawlers + Lighthouse SEO audit).
  titleId?: string;
};

export function SectionHeader({ index, eyebrow, title, subtitle, align = "left", rightSlot, className = "mb-12", titleId }: Props) {
  const isCenter = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`${className} flex ${isCenter ? "flex-col items-center text-center" : "items-end justify-between gap-6 flex-col md:flex-row"}`}
    >
      <div className={isCenter ? "flex flex-col items-center" : "flex flex-col"}>
        {/* Refined eyebrow — replaces [ XX / NAME ] with  ── XX · NAME */}
        <div className="mb-3 flex items-center gap-3">
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 24 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-px"
            style={{ background: "var(--beta-accent)" }}
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: "var(--beta-accent)" }}>
            <span className="tabular-nums">{index}</span>
            <span className="mx-2 opacity-60">·</span>
            {eyebrow}
          </span>
        </div>

        <h2
          id={titleId}
          className="font-bold tracking-tight"
          style={{
            color: "var(--beta-fg-strong)",
            fontSize: "clamp(1.875rem, 5vw, 3.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            textShadow: "0 0 40px rgba(212, 175, 55, 0.04)",
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className={`mt-3 sm:mt-4 max-w-[700px] text-sm sm:text-base md:text-lg ${isCenter ? "mx-auto" : ""}`}
            style={{ color: "var(--beta-fg-muted)", lineHeight: 1.5 }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {rightSlot && !isCenter && (
        <div className="shrink-0">{rightSlot}</div>
      )}
    </motion.div>
  );
}
