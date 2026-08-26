"use client";

import * as React from "react";

/**
 * SciFiCard — a card with cut-corner (chamfered) borders matching the
 * cyberpunk HUD reference design. Uses clip-path for the angled corners.
 *
 * Features:
 * - Cut corners (top-left, bottom-right at 12px)
 * - Inner bordered panel (frame-within-frame)
 * - Top accent strip
 * - Corner crosshair marks
 * - Scanline overlay
 * - Header bar with label + id
 * - Maximalist data overlays
 */
export function SciFiCard({
  children,
  className = "",
  accent = "#FF4500",
  label,
  id,
  scan = true,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
  label?: string;
  id?: string;
  scan?: boolean;
  hover?: boolean;
}) {
  return (
    <div
      className={`group relative ${hover ? "transition-all hover:border-foreground/40" : ""} ${className}`}
    >
      {/* Cut-corner border via clip-path */}
      <div
        className="relative border border-border bg-card/40"
        style={{
          clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
        }}
      >
        {/* Top accent strip */}
        {accent && (
          <div
            className="absolute left-0 top-0 z-20 h-[2px]"
            style={{
              width: "100%",
              background: accent,
              clipPath: "polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 0)",
            }}
          />
        )}

        {/* Header bar */}
        {(label || id) && (
          <div className="relative z-10 flex items-center justify-between border-b border-border/40 px-3 py-1.5">
            {label && (
              <span className="font-mono text-[8px] uppercase tracking-[0.2em]" style={{ color: accent }}>
                {label}
              </span>
            )}
            {id && (
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                {id}
              </span>
            )}
          </div>
        )}

        {/* Body */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Scanline overlay */}
        {scan && (
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-20"
            style={{
              background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)",
            }}
          />
        )}

        {/* Corner crosshair marks — cut-corner style */}
        <svg className="pointer-events-none absolute left-0 top-0 z-20 h-3 w-3" style={{ color: accent }}>
          <path d="M 0 12 L 12 0" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
        </svg>
        <svg className="pointer-events-none absolute bottom-0 right-0 z-20 h-3 w-3" style={{ color: accent }}>
          <path d="M 0 12 L 12 0" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
        </svg>

        {/* Hover glow */}
        {hover && (
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: `radial-gradient(60% 50% at 50% 50%, ${accent}08, transparent 70%)` }}
          />
        )}
      </div>

      {/* Outer corner brackets — sci-fi */}
      <span className="pointer-events-none absolute -left-px -top-px h-2 w-2 border-l border-t" style={{ borderColor: `${accent}88` }} />
      <span className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b border-r" style={{ borderColor: `${accent}88` }} />
    </div>
  );
}
