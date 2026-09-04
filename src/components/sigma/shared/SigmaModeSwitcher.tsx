"use client";

import * as React from "react";
import gsap from "gsap";
import { syncSigmaTheme } from "./SigmaThemeToggle";
import { sigmaSound } from "@/lib/sigma/sound";

/**
 * SigmaModeSwitcher — floating switcher between Σ (Sigma), Α (Alpha), and
 * Β (Beta) modes.
 *
 * TRANSITION (revised per user spec — Stage 68):
 *   - Slam cover transition: two horizontal panels slide in from top/bottom,
 *     meeting at the center with a flash + mode label, then slide back out
 *   - This is a DIFFERENT effect variable from the section-to-section Sigma
 *     transition (which uses horizontal slam panels). Mode switching uses
 *     VERTICAL slam panels to visually distinguish "mode change" from
 *     "section change".
 *   - Chidori soundtrack: KEPT (per user spec — "Yes, keep the Chidori effect")
 *   - Lightning effect: REMOVED (per user spec — "remove the lightning effect
 *     from both the Alpha & Sigma and Beta section-to-section transitions")
 *
 * The user's spec was specifically about section-to-section transitions, but
 * we apply the same principle to mode transitions for consistency: Chidori
 * sound stays, lightning is gone. The mode transition is a clean vertical slam.
 */

export type Mode = "sigma" | "alpha" | "beta";

const STORAGE_KEY = "sigma-mode";

// PERF (LOOP-5): prefetch the non-default mode chunks on first hover of the
// mode-switcher buttons. Webpack resolves these dynamic imports to the same
// chunks that ExperienceShell's next/dynamic calls reference, so by the time
// the user actually clicks the button, the chunk is likely already in cache.
// Fire-and-forget — promise rejections are swallowed (chunk will re-fetch on click).
let alphaPrefetched = false;
let sigmaPrefetched = false;
function prefetchAlpha() {
  if (alphaPrefetched) return;
  alphaPrefetched = true;
  import("../alpha/AlphaInterface").catch(() => {});
}
function prefetchSigma() {
  if (sigmaPrefetched) return;
  sigmaPrefetched = true;
  // SigmaMap is the entry point for sigma mode — it transitively pulls in
  // S01..S11 sections (each lazy-loaded by ExperienceShell, but SigmaMap itself
  // is the heaviest single chunk in the sigma tree). Prefetching it on hover
  // warms the cache for an instant mode switch.
  import("../SigmaMap").catch(() => {});
}

const MODE_META: Record<Mode, { label: string; symbol: string; accent: string; tagline: string }> = {
  sigma: { label: "SIGMA",  symbol: "Σ", accent: "#FF4500", tagline: "MAP-BASED · BRUTALIST" },
  alpha: { label: "ALPHA",  symbol: "α", accent: "#FF4500", tagline: "SCROLLING · BRUTALIST" },
  beta:  { label: "BETA",   symbol: "β", accent: "#6366F1", tagline: "ENTERPRISE · CLEAN" },
};

export function SigmaModeSwitcher({
  mode,
  onModeChange,
  floating = false,
}: {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  floating?: boolean;
}) {
  const [transitioning, setTransitioning] = React.useState(false);
  const [pendingMode, setPendingMode] = React.useState<Mode | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  // Two panels: top + bottom (vertical slam — different from section's horizontal)
  const topPanelRef = React.useRef<HTMLDivElement>(null);
  const bottomPanelRef = React.useRef<HTMLDivElement>(null);
  // Center flash + label
  const flashRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLDivElement>(null);

  // MODE-RELEVANT COVER COLOUR.
  // The slam panels + flash take the TARGET mode's accent, so switching to Σ/α/β
  // is immediately recognisable instead of a generic black wipe.
  // This is applied as an inline style (not via GSAP `backgroundColor`) so a
  // React re-render during the transition can never clobber it — GSAP only owns
  // transform/opacity. `pendingMode` is set in the same click handler that
  // starts the timeline, and React flushes that update before the next paint,
  // so the accent is present on the first visible frame of the slam.
  const coverAccent = pendingMode ? MODE_META[pendingMode].accent : "#0A0A0A";

  // Initialize audio reference (Audio element is created on-demand in switchMode)
  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Load saved mode — but ONLY if it's a valid Mode. First-time visitors
  // (no saved mode) get "beta" by default (per user spec Q3: "Make Beta the
  // new DEFAULT mode for first-time visitors").
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Mode | null;
      if (saved && (saved === "sigma" || saved === "alpha" || saved === "beta") && saved !== mode) {
        onModeChange(saved);
      }
      // If no saved mode, leave the default ("beta") — don't write to localStorage
      // so the user can still change modes without persistence until they pick one.
    } catch {
      // ignore
    }
  }, [mode, onModeChange]);

  const switchMode = React.useCallback(
    (target: Mode) => {
      if (transitioning) return;
      if (target === mode) return;
      setTransitioning(true);
      setPendingMode(target);

      // === STAR TREK DOOR SOUNDTRACK ===
      // Plays the first 3 seconds of the star trek door sound (song is 9s, we clip at 3s)
      // Audio created on-demand inside the click handler to satisfy browser autoplay policies.
      // Also unlocks the sigmaSound AudioContext on the same gesture so subsequent SFX work.
      try {
        // Unlock the Web Audio API context on this user gesture (some browsers
        // require an explicit init() even within a click handler)
        if (!sigmaSound.enabled) sigmaSound.init();

        const audio = new Audio("/sounds/star-trek-door.mp3");
        audio.volume = 0.6;
        audio.preload = "auto";
        audioRef.current = audio;

        // Use the 'playing' event to know when audio actually starts
        // This fires after buffering is complete, so the 3s timer
        // counts from actual playback start, not from click time
        const onPlaying = () => {
          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
              audioRef.current = null;
            }
          }, 3000);
          audio.removeEventListener("playing", onPlaying);
        };
        audio.addEventListener("playing", onPlaying);

        audio.play().catch(() => {
          // Autoplay blocked — silently continue without sound
          audio.removeEventListener("playing", onPlaying);
        });
      } catch {
        // ignore audio init errors
      }

      const targetMeta = MODE_META[target];

      // === SLAM COVER TRANSITION (vertical — different variable from section transition) ===
      // Phase 1: Two vertical panels slam in from top + bottom, meeting at center
      // Phase 2: Brief flash + mode label appears at center
      // Phase 3: SWAP the mode here (content changes underneath)
      // Phase 4: Panels slide back out (top → up, bottom → down)
      // Phase 5: Final fade of flash + label
      const tl = gsap.timeline({
        onComplete: () => {
          setTransitioning(false);
          setPendingMode(null);
        },
      });

      // Set initial states. Note: panel/flash COLOUR is applied declaratively via
      // the `coverAccent` inline style in the JSX — GSAP only drives transform and
      // opacity here.
      tl.set(topPanelRef.current, { y: "-100%", opacity: 1 });
      tl.set(bottomPanelRef.current, { y: "100%", opacity: 1 });
      tl.set(flashRef.current, { opacity: 0 });
      tl.set(labelRef.current, { opacity: 0, scale: 0.7 });

      // Phase 1: Slam panels in (0 → 0.35s) — fast, forceful
      tl.to(topPanelRef.current, {
        y: "0%",
        duration: 0.35,
        ease: "power4.out",
      });
      tl.to(
        bottomPanelRef.current,
        {
          y: "0%",
          duration: 0.35,
          ease: "power4.out",
        },
        "<" // same time as top panel
      );

      // Phase 2: Flash + label appear (0.35 → ~0.61s)
      // RESTORED: the flash strobes in the target mode's accent at the instant
      // the two panels meet. It is deliberately short and capped at a low peak
      // opacity (0.42, decaying inside ~0.3s) so it reads as an impact flash
      // rather than the full-screen colour wash that got it removed originally.
      tl.to(flashRef.current, {
        opacity: 0.42,
        duration: 0.10,
        ease: "power2.out",
      });
      tl.to(flashRef.current, {
        opacity: 0,
        duration: 0.32,
        ease: "power2.in",
      });
      tl.to(
        labelRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "back.out(1.6)",
        },
        "-=0.36"
      );

      // Phase 3: SWAP mode (content changes underneath the panels)
      tl.call(() => {
        try { localStorage.setItem(STORAGE_KEY, target); } catch { /* ignore */ }
        // Sync sigma-light theme — remove when leaving sigma, restore when returning
        syncSigmaTheme(target);
        onModeChange(target);
      });

      // Hold the label briefly so the user sees it (0.55 → 1.0s)
      tl.to({}, { duration: 0.45 });

      // Phase 4: Panels slide back out (1.0 → 1.45s)
      tl.to(topPanelRef.current, {
        y: "-100%",
        duration: 0.45,
        ease: "power3.inOut",
      });
      tl.to(
        bottomPanelRef.current,
        {
          y: "100%",
          duration: 0.45,
          ease: "power3.inOut",
        },
        "<"
      );

      // Phase 5: Fade flash + label (parallel with panels sliding out)
      tl.to(
        flashRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        },
        "<"
      );
      tl.to(
        labelRef.current,
        {
          opacity: 0,
          scale: 1.3,
          duration: 0.4,
          ease: "power2.in",
        },
        "<"
      );
    },
    [mode, transitioning, onModeChange]
  );

  // Click outside the switcher (or any UI element) doesn't trigger anything
  // — switcher is button-driven only.

  return (
    <>
      {/* Mode switcher — floating variant for Beta mode (compact, no fixed positioning — parent controls position) */}
      {floating ? (
        <div className="flex flex-col items-center gap-0 border border-border bg-background/90 backdrop-blur-sm">
          {(Object.keys(MODE_META) as Mode[]).map((m, i) => {
            const meta = MODE_META[m];
            const active = mode === m;
            return (
              <React.Fragment key={m}>
                {i > 0 && <div className="h-px w-6 bg-border/60" />}
                <button
                  onClick={() => switchMode(m)}
                  onMouseEnter={() => {
                    if (m === "alpha") prefetchAlpha();
                    else if (m === "sigma") prefetchSigma();
                  }}
                  disabled={transitioning}
                  className={`flex items-center justify-center gap-1 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors disabled:opacity-50 ${
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-cursor="hover"
                  title={`${meta.label} Mode — ${meta.tagline}`}
                  aria-label={`${meta.label} mode — ${meta.tagline}${active ? " (active)" : ""}`}
                  aria-pressed={active}
                >
                  <span className="font-sans text-sm font-black" aria-hidden="true">{meta.symbol}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        /* Mode switcher — top center, 3 modes (Sigma/Alpha modes) */
        <div className="fixed left-1/2 top-9 z-[95] flex -translate-x-1/2 items-center gap-0 border border-border bg-background/90 backdrop-blur-sm">
          {(Object.keys(MODE_META) as Mode[]).map((m, i) => {
            const meta = MODE_META[m];
            const active = mode === m;
            return (
              <React.Fragment key={m}>
                {i > 0 && <div className="h-6 w-px bg-border/60" />}
                <button
                  onClick={() => switchMode(m)}
                  onMouseEnter={() => {
                    if (m === "alpha") prefetchAlpha();
                    else if (m === "sigma") prefetchSigma();
                  }}
                  disabled={transitioning}
                  className={`flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors disabled:opacity-50 ${
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-cursor="hover"
                  title={`${meta.label} Mode — ${meta.tagline}`}
                  aria-label={`${meta.label} mode — ${meta.tagline}${active ? " (active)" : ""}`}
                  aria-pressed={active}
                >
                  <span className="font-sans text-sm font-black" aria-hidden="true">{meta.symbol}</span>
                  <span className="hidden sm:inline">{meta.label}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* === SLAM COVER TRANSITION OVERLAY ===
          Two vertical panels (top + bottom) that slam together at center.
          Different from the Sigma section transition (which uses horizontal panels). */}
      <div
        className="pointer-events-none fixed inset-0 z-[200]"
        style={{ display: transitioning ? "block" : "none" }}
      >
        {/* Top panel — slides from -100% to 0% to -100% */}
        <div
          ref={topPanelRef}
          className="absolute inset-x-0 top-0 h-1/2"
          style={{
            y: "-100%",
            // Mode-relevant cover colour — was hard-coded neutral #0A0A0A.
            backgroundColor: coverAccent,
            borderBottom: "2px solid rgba(255,255,255,0.15)",
          }}
        />
        {/* Bottom panel — slides from 100% to 0% to 100% */}
        <div
          ref={bottomPanelRef}
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            y: "100%",
            // Mode-relevant cover colour — was hard-coded neutral #0A0A0A.
            backgroundColor: coverAccent,
            borderTop: "2px solid rgba(255,255,255,0.15)",
          }}
        />

        {/* Center flash — accent-colored overlay that strobes briefly when panels meet */}
        <div
          ref={flashRef}
          className="absolute inset-0 mix-blend-screen"
          style={{ opacity: 0, background: coverAccent }}
        />

        {/* Center label — shows the mode being switched to */}
        <div
          ref={labelRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <div
              className="font-sans text-7xl font-black leading-none sm:text-8xl"
              style={{
                color: "#FFFFFF",
                // Heavier shadow/stroke than before — the panels are now bright
                // accent colours, so the label needs a solid dark scrim to stay
                // legible on both #FF4500 (Σ/α) and #6366F1 (β).
                textShadow:
                  "0 2px 18px rgba(0,0,0,0.55), 0 0 40px rgba(0,0,0,0.35)",
                WebkitTextStroke: "1px rgba(0,0,0,0.25)",
              }}
            >
              {pendingMode ? MODE_META[pendingMode].symbol : ""}
            </div>
            <div
              className="font-mono text-[10px] uppercase tracking-[0.4em]"
              style={{
                color: "rgba(255,255,255,0.95)",
                textShadow: "0 1px 8px rgba(0,0,0,0.6)",
              }}
            >
              {pendingMode ? MODE_META[pendingMode].label : ""} · {pendingMode ? MODE_META[pendingMode].tagline : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
