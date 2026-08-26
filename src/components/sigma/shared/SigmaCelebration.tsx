"use client";

import * as React from "react";
import gsap from "gsap";
import { SECTIONS } from "@/lib/sigma/sections";
import { sigmaSound } from "@/lib/sigma/sound";

/**
 * SigmaCelebration — a full-screen celebration overlay that triggers when
 * the user has visited all 11 sectors. Shows a giant spinning Σ glyph,
 * all 11 sector glyphs orbiting, and a "PERFECT SIGMA" message.
 * Auto-dismisses after 6 seconds or on click.
 */
export function SigmaCelebration({ onComplete }: { onComplete: () => void }) {
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    sigmaSound.play("complete");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // backdrop fade in
      tl.fromTo("[data-cel-bg]", { opacity: 0 }, { opacity: 1, duration: 0.3 });

      // Σ glyph scale in with bounce
      tl.from("[data-cel-sigma]", {
        scale: 0,
        rotation: -180,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, "-=0.1");

      // orbiting sector glyphs fly in
      tl.from("[data-cel-orbit]", {
        opacity: 0,
        scale: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: "power2.out",
      }, "-=0.3");

      // text reveal
      tl.from("[data-cel-text]", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.2");

      // hold for 3s
      tl.to({}, { duration: 3 });

      // fade out everything
      tl.to("[data-cel-bg]", { opacity: 0, duration: 0.6, ease: "power2.in" });
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[130] flex items-center justify-center"
      onClick={onComplete}
    >
      <div
        data-cel-bg
        className="absolute inset-0 bg-background/95 backdrop-blur-md"
      />
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-50" />

      {/* center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* orbiting sector glyphs */}
        <div className="relative h-64 w-64">
          {SECTIONS.map((s, i) => {
            const angle = (i / SECTIONS.length) * Math.PI * 2 - Math.PI / 2;
            const r = 110;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            return (
              <div
                key={s.id}
                data-cel-orbit
                className="absolute flex h-10 w-10 items-center justify-center border font-mono text-lg font-bold"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  borderColor: `${s.accent}66`,
                  color: s.accent,
                }}
              >
                {s.glyph}
              </div>
            );
          })}

          {/* center Σ — FIXED: spin is on an INNER element so it doesn't override the centering transform */}
          <div
            data-cel-sigma
            className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-foreground"
          >
            <span className="sigma-spin-slow block font-sans text-6xl font-black">
              Σ
            </span>
          </div>
        </div>

        {/* text */}
        <div
          data-cel-text
          className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
        >
          ▮ ACHIEVEMENT UNLOCKED ▮
        </div>
        <div
          data-cel-text
          className="mt-2 font-sans text-5xl font-black uppercase tracking-tight"
          style={{ color: "#00FF94" }}
        >
          PERFECT SIGMA
        </div>
        <div
          data-cel-text
          className="mt-2 font-serif text-base italic text-muted-foreground"
        >
          You have mapped all 11 sectors of the Taungoo Sigma Lab.
        </div>
        <div
          data-cel-text
          className="mt-4 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          ▮ THE SIGMA VARIABLE IS 1.0000 ▮
        </div>
      </div>

      {/* corner crosshairs */}
      <span className="absolute left-6 top-6 h-4 w-4 border-l border-t border-foreground/60" />
      <span className="absolute right-6 top-6 h-4 w-4 border-r border-t border-foreground/60" />
      <span className="absolute bottom-6 left-6 h-4 w-4 border-b border-l border-foreground/60" />
      <span className="absolute bottom-6 right-6 h-4 w-4 border-b border-r border-foreground/60" />
    </div>
  );
}
