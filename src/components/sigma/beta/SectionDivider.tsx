"use client";

import * as React from "react";
import { motion } from "motion/react";

/**
 * SectionDivider — awwwards-tier transition between sections.
 *
 * A thin horizontal hairline that draws itself L→R when scrolled into view,
 * with a small accent tick + index label. Sells the "chapter break" feel
 * without being heavy.
 *
 * Usage: <SectionDivider from="02" to="03" />
 */
type Props = {
  from: string;
  to: string;
  label?: string;
};

export function SectionDivider({ from, to, label }: Props) {
  return (
    <div className="relative h-px w-full" style={{ background: "var(--beta-border)" }} aria-hidden="true">
      {/* Animated accent overlay — draws L→R when scrolled into view (0.8s ease-out, origin left) */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-30% 0px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-y-0 left-0 w-full origin-left"
        style={{ background: "linear-gradient(to right, rgba(212,175,55,0.5), transparent 70%)", height: "1px" }}
      />

      {/* Traveling pulse dot — gold dot glides L→R along the divider, 4s infinite loop.
          Respects prefers-reduced-motion via CSS (static center dot fallback). */}
      <span className="bs-divider-dot" />

      {/* Center tick + label — with subtle gold glow on the from/to numerals */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3" style={{ background: "var(--beta-bg)" }}>
        <span
          className="font-mono text-[9px] tracking-[0.2em] tabular-nums"
          style={{ color: "var(--beta-fg-subtle)", textShadow: "0 0 6px rgba(212, 175, 55, 0.45)" }}
        >
          {from}
        </span>
        <span className="font-mono text-[9px] tracking-[0.2em]" style={{ color: "var(--beta-accent)" }}>→</span>
        <span
          className="font-mono text-[9px] tracking-[0.2em] tabular-nums"
          style={{ color: "var(--beta-fg-subtle)", textShadow: "0 0 6px rgba(212, 175, 55, 0.45)" }}
        >
          {to}
        </span>
        {label && (
          <>
            <span className="hidden sm:inline font-mono text-[9px] tracking-[0.2em]" style={{ color: "var(--beta-fg-subtle)" }}>·</span>
            <span className="hidden sm:inline font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: "var(--beta-fg-muted)" }}>{label}</span>
          </>
        )}
      </div>
    </div>
  );
}
