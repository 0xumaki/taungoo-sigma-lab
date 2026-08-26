"use client";

import * as React from "react";

/**
 * SigmaBrand — the TAUNGOO Σ LAB wordmark with clean gradient-sweep treatment.
 *
 * Alternative effect (replaces the previous RGB-split glitch):
 *   - Animated gradient sweep that moves across the text (like Stripe, Linear, Vercel)
 *   - Uses background-clip: text with a 3-color gradient (white → accent → white)
 *   - 5s ease-in-out infinite (slow, premium "molten metal" feel)
 *   - Σ glyph keeps its pulse animation (scale 1→1.06, NO rotation)
 *
 * Battle-tested reference:
 *   - Stripe.com wordmark (gradient sweep)
 *   - Linear.app (gradient text)
 *   - Vercel.com (clean gradient)
 *
 * Accessibility: respects prefers-reduced-motion (animations disabled via
 * globals.css media query).
 */
interface SigmaBrandProps {
  size?: "sm" | "md" | "lg";
  showSubLabel?: boolean;
  subLabel?: string;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const SigmaBrand = React.memo(function SigmaBrand({
  size = "md",
  showSubLabel = true,
  subLabel = "LAB",
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
      {/* Σ glyph in a tiny cut-corner frame — pulse animation (NO rotation) */}
      <span
        className="flex h-7 w-7 items-center justify-center border border-[#FF4500]/60 bg-[#FF4500]/10 transition-colors hover:border-[#FF4500] hover:bg-[#FF4500]/20 sm:h-8 sm:w-8"
        style={{
          clipPath:
            "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
        }}
      >
        <span className={`sigma-brand__glyph ${sizeClasses.glyph}`}>Σ</span>
      </span>

      {/* Wordmark — "TAUNGOO Σ LAB" with gradient sweep */}
      <div className="flex flex-col leading-none">
        <span className={`sigma-brand__text font-sans font-black uppercase tracking-[0.1em] ${sizeClasses.text}`}>
          TAUNGOO <span className="sigma-brand__sigma">Σ</span> LAB
        </span>
        {showSubLabel && (
          <span className={`sigma-brand__sub mt-0.5 ${sizeClasses.sub}`}>{subLabel}</span>
        )}
      </div>
    </a>
  );
});