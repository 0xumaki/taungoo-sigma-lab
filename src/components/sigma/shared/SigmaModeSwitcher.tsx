"use client";

import * as React from "react";
import gsap from "gsap";

/**
 * SigmaModeSwitcher — a floating switcher between Σ (Sigma) and Α (Alpha) modes.
 * When switching, plays a dramatic "electrical shock" tear-down effect:
 * 1. Chidori soundtrack plays
 * 2. Screen tears with lightning bolts + glitch
 * 3. Content swaps underneath the overlay
 * 4. Tear-down fades with lingering ending
 */

type Mode = "sigma" | "alpha";

const STORAGE_KEY = "sigma-mode";

export function SigmaModeSwitcher({
  mode,
  onModeChange,
}: {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}) {
  const [transitioning, setTransitioning] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const lightningRef = React.useRef<HTMLCanvasElement>(null);

  // Initialize audio reference (Audio element is created on-demand in switchMode to avoid autoplay blocking)
  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Load saved mode
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Mode | null;
      if (saved && saved !== mode) {
        onModeChange(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const switchMode = React.useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);

    const nextMode: Mode = mode === "sigma" ? "alpha" : "sigma";

    // Play chidori soundtrack — create Audio ON-DEMAND inside the click handler
    // This fixes autoplay blocking: browsers require Audio to be created in response
    // to a user interaction, not in useEffect on page load.
    const audio = new Audio("/chidori.mp3");
    audio.volume = 0.15;
    audioRef.current = audio;
    audio.play().catch(() => {
      // autoplay still blocked — try again on next interaction
    });

    // Start lightning + glitch overlay
    const overlay = overlayRef.current;
    const canvas = lightningRef.current;
    if (!overlay || !canvas) {
      // fallback — just swap
      try { localStorage.setItem(STORAGE_KEY, nextMode); } catch {}
      onModeChange(nextMode);
      setTransitioning(false);
      return;
    }

    // Draw lightning bolts on canvas
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const drawLightning = (intensity: number) => {
      ctx.clearRect(0, 0, w, h);
      const numBolts = Math.floor(3 + Math.random() * 5 * intensity);
      for (let i = 0; i < numBolts; i++) {
        const startX = Math.random() * w;
        const startY = 0;
        ctx.strokeStyle = `rgba(${180 + Math.random() * 75}, ${200 + Math.random() * 55}, 255, ${0.6 + Math.random() * 0.4})`;
        ctx.lineWidth = 1 + Math.random() * 3;
        ctx.shadowColor = "rgba(100, 200, 255, 0.8)";
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        let x = startX;
        let y = startY;
        while (y < h) {
          x += (Math.random() - 0.5) * 60 * intensity;
          y += 10 + Math.random() * 40;
          ctx.lineTo(x, y);
          // branches
          if (Math.random() > 0.7) {
            ctx.lineTo(x + (Math.random() - 0.5) * 40, y + Math.random() * 20);
            ctx.moveTo(x, y);
          }
        }
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
    };

    // GSAP timeline for the dramatic transition
    const tl = gsap.timeline({
      onComplete: () => {
        setTransitioning(false);
        ctx.clearRect(0, 0, w, h);
      },
    });

    // Phase 1: Flash white + crack (0-0.3s)
    tl.set(overlay, { opacity: 1, background: "rgba(255,255,255,0.9)" });
    tl.to(overlay, { opacity: 1, duration: 0.05 });

    // Phase 2: Lightning storm (0.3-2s) — rapid bolts + screen distortion
    tl.to(overlay, {
      duration: 0.05,
      repeat: 30,
      repeatRefresh: true,
      background: () => `rgba(${100 + Math.random() * 155}, ${150 + Math.random() * 105}, 255, ${0.1 + Math.random() * 0.4})`,
      ease: "none",
      onStart: () => {
        // rapid lightning drawing
        let frame = 0;
        const lightningInterval = setInterval(() => {
          drawLightning(0.5 + Math.random());
          frame++;
          if (frame > 30) clearInterval(lightningInterval);
        }, 60);
      },
    });

    // Phase 3: Tear-down — the screen splits horizontally (2-2.5s)
    tl.to(overlay, {
      duration: 0.1,
      background: "rgba(0,0,0,0.95)",
      onStart: () => {
        // SWAP the mode here — content changes underneath
        try { localStorage.setItem(STORAGE_KEY, nextMode); } catch {}
        onModeChange(nextMode);
      },
    });

    // Phase 4: Lingering ending — gradual fade (2.5-4s)
    tl.to(overlay, {
      duration: 1.5,
      opacity: 0,
      background: "rgba(0,0,0,0)",
      ease: "power2.out",
    });

    // Final: clear canvas
    tl.call(() => {
      ctx.clearRect(0, 0, w, h);
    });
  }, [mode, transitioning, onModeChange]);

  return (
    <>
      {/* Mode switcher button — top center */}
      <div className="fixed left-1/2 top-9 z-[95] flex -translate-x-1/2 items-center gap-0 border border-border bg-background/90 backdrop-blur-sm">
        <button
          onClick={() => mode !== "sigma" && switchMode()}
          className={`flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
            mode === "sigma"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
          data-cursor="hover"
          title="Sigma Mode — level-select navigation"
        >
          <span className="font-sans text-sm font-black">Σ</span>
          <span>SIGMA</span>
        </button>
        <div className="h-6 w-px bg-border/60" />
        <button
          onClick={() => mode !== "alpha" && switchMode()}
          className={`flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
            mode === "alpha"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
          data-cursor="hover"
          title="Alpha Mode — traditional scrolling website"
        >
          <span className="font-sans text-sm font-black">Α</span>
          <span>ALPHA</span>
        </button>
      </div>

      {/* Transition overlay — always rendered, opacity controlled by GSAP */}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[200]"
        style={{ opacity: 0, display: transitioning ? "block" : "none" }}
      />
      <canvas
        ref={lightningRef}
        className="pointer-events-none fixed inset-0 z-[201]"
        style={{ display: transitioning ? "block" : "none" }}
      />
    </>
  );
}
