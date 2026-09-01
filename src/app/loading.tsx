/**
 * Global loading state for Next.js App Router route transitions.
 *
 * LOOP-6-DETAILS-EDGE-CASES: branded loading screen — dark void + scanlines +
 * grain + grid + vignette, gold (#D4AF37) corner brackets, a pulsing Σ inside
 * a double hex frame, and a mono "LOADING" caption with staggered blink dots.
 *
 * Deliberately a Server Component (no "use client", no hydration cost) — all
 * animation is pure CSS via the existing sigma-* utility classes, so it even
 * renders correctly before/without JavaScript.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="sigma-noise sigma-scanlines sigma-grid sigma-vignette fixed inset-0 z-[300] flex flex-col items-center justify-center bg-background"
    >
      <span className="sr-only">Loading TAUNGOO Sigma Lab. Please wait…</span>

      {/* Gold corner brackets (4×) */}
      <span className="absolute left-6 top-6 h-8 w-8 border-l-2 border-t-2 border-[#D4AF37]/70" aria-hidden="true" />
      <span className="absolute right-6 top-6 h-8 w-8 border-r-2 border-t-2 border-[#D4AF37]/70" aria-hidden="true" />
      <span className="absolute bottom-6 left-6 h-8 w-8 border-b-2 border-l-2 border-[#D4AF37]/70" aria-hidden="true" />
      <span className="absolute bottom-6 right-6 h-8 w-8 border-b-2 border-r-2 border-[#D4AF37]/70" aria-hidden="true" />

      {/* Hex frame around pulsing Σ — two stacked SVG polygons:
          outer = gold stroke + drop-shadow glow, inner = gold-tinted fill */}
      <div className="relative flex h-28 w-28 items-center justify-center" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none">
          <polygon
            points="50,4 90,27 90,73 50,96 10,73 10,27"
            stroke="#D4AF37"
            strokeWidth="1.5"
            style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.45))" }}
          />
          <polygon points="50,12 83,31 83,69 50,88 17,69 17,31" fill="rgba(212,175,55,0.06)" stroke="rgba(212,175,55,0.25)" strokeWidth="0.75" />
        </svg>
        {/* Pulsing Σ — sigma-pulse = 1.6s scale + opacity loop (globals.css) */}
        <span
          className="sigma-pulse font-mono text-4xl font-bold"
          style={{ color: "#D4AF37", textShadow: "0 0 24px rgba(212,175,55,0.5)" }}
        >
          Σ
        </span>
      </div>

      {/* Mono "LOADING" caption with animated dots — sigma-blink (steps(2)
          opacity blink) staggered 0s / 0.18s / 0.36s */}
      <div className="mt-8 flex items-center font-mono text-[11px] uppercase tracking-[0.4em] text-[#D4AF37]" aria-hidden="true">
        <span>Loading</span>
        <span className="sigma-blink ml-1">.</span>
        <span className="sigma-blink ml-0.5" style={{ animationDelay: "0.18s" }}>.</span>
        <span className="sigma-blink ml-0.5" style={{ animationDelay: "0.36s" }}>.</span>
      </div>

      {/* Sub-caption + blinking gold cursor */}
      <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[#D4AF37]/60" aria-hidden="true">
        ▮ TAUNGOO SIGMA · INITIALIZING SECTOR
      </div>
    </div>
  );
}
