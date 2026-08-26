"use client";

import * as React from "react";

/**
 * SigmaBrand — the TAUNGOO SIGMA LAB wordmark with hybrid C+D treatment.
 *
 * C = RGB-split chromatic aberration (always-on subtle 2px) + on-hover
 *     one-shot 0.4s glitch burst via ::before/::after with clip-path
 * D = Σ glyph pulse (2.4s, scale 1→1.06, NO rotation) + 6s text shimmer
 *
 * Layers (each does a different job — no redundancy, per brutalist layer rule):
 *   1. Σ glyph — identity (pulses to feel "alive")
 *   2. Main wordmark text — RGB-split text-shadow (subtle "always-on" aberration)
 *   3. Shimmer overlay — animated gradient highlight band (molten metal)
 *   4. Hover glitch burst — one-shot RGB clip-path glitch (on hover only)
 *
 * The shimmer + glitch layers are positioned absolutely OVER the text and use
 * `attr(data-text)` via CSS ::before/::after — they do NOT render their own
 * text content (which would cause layout issues and screen reader duplicates).
 *
 * Battle-tested values from Awwwards SOTD research (see /research-findings.md):
 *   - Rest RGB offset: 2px (subtle premium-tech, not broken)
 *   - Hover RGB offset: 6px (dramatic glitch split)
 *   - Glitch cadence: 10% active (fires once on hover, doesn't loop)
 *   - Shimmer period: 6s ease-in-out (breathing, not mechanical)
 *
 * Accessibility: respects prefers-reduced-motion (animations disabled via
 * globals.css media query). aria-hidden on decorative layers.
 */
interface SigmaBrandProps {
  /** Size variant — affects glyph + text size */
  size?: "sm" | "md" | "lg";
  /** Whether to show the "SIGMA LAB" sub-label below the wordmark */
  showSubLabel?: boolean;
  /** Custom sub-label text (defaults to "SIGMA LAB") */
  subLabel?: string;
  /** Additional class names */
  className?: string;
  /** Click handler (usually navigates to #hero) */
  onClick?: () => void;
  /** Href for the anchor (defaults to "#hero") */
  href?: string;
}

export function SigmaBrand({
  size = "md",
  showSubLabel = true,
  subLabel = "SIGMA LAB",
  className = "",
  onClick,
  href = "#hero",
}: SigmaBrandProps) {
  const sizeClasses = {
    sm: { glyph: "text-base", text: "text-[11px]", sub: "text-[7px]" },
    md: { glyph: "text-lg", text: "text-sm", sub: "text-[8px]" },
    lg: { glyph: "text-2xl", text: "text-lg", sub: "text-[9px]" },
  }[size];

  return (
    <a
      href={href}
      onClick={onClick}
      className={`sigma-brand ${className}`}
      aria-label="Taungoo Sigma Lab — home"
    >
      {/* Σ glyph in a tiny cut-corner frame (matches existing sci-fi card design) */}
      <span
        className="flex h-7 w-7 items-center justify-center border border-[#FF4500]/60 bg-[#FF4500]/10 transition-colors hover:border-[#FF4500] hover:bg-[#FF4500]/20 sm:h-8 sm:w-8"
        style={{
          clipPath:
            "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
        }}
      >
        <span className={`sigma-brand__glyph ${sizeClasses.glyph}`}>Σ</span>
      </span>

      {/* Wordmark container — holds the text + shimmer + glitch layers.
          The text is the only visible content; shimmer + glitch are absolute
          overlays that use the text via CSS attr(data-text). */}
      <div className="flex flex-col leading-none">
        <span
          className={`sigma-brand__text font-sans font-black uppercase tracking-[0.1em] ${sizeClasses.text}`}
          data-text="TAUNGOO"
        >
          TAUNGOO
          {/* Shimmer overlay — absolute, uses data-text attr via ::before.
              No text content here to avoid layout duplication. */}
          <span className="sigma-brand__shimmer" aria-hidden="true" data-text="TAUNGOO" />
          {/* Glitch burst overlay — absolute, fires on hover only */}
          <span className="sigma-brand__glitch" aria-hidden="true" data-text="TAUNGOO" />
        </span>
        {showSubLabel && (
          <span className={`sigma-brand__sub mt-0.5 ${sizeClasses.sub}`}>{subLabel}</span>
        )}
      </div>
    </a>
  );
}
