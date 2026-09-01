"use client";

import * as React from "react";
import gsap from "gsap";
import { sigmaSound } from "@/lib/sigma/sound";
import { toast } from "sonner";
import { Zap } from "lucide-react";

/**
 * SigmaMCMode — "MC MODE" button that triggers:
 * 1. A randomly generated sci-fi-style matrix filling the screen
 * 2. An overwhelming but systematic glitch effect on the WHOLE SCREEN for 5s with lingering ending
 * 3. Background music playback ("燃える鋼 / Burning Steel")
 *
 * The glitch applies CSS filters + transforms to the document body itself,
 * distorting all content. After 5s the glitch fades with a lingering ending,
 * but the matrix + music continue until the user presses [C] or the button again.
 */
export function SigmaMCMode() {
  const [active, setActive] = React.useState(false);
  const [glitching, setGlitching] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const glitchRef = React.useRef<HTMLDivElement>(null);

  // Initialize audio
  React.useEffect(() => {
    const audio = new Audio("/burning-steel.mp3");
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const deactivate = React.useCallback(() => {
    setActive(false);
    setGlitching(false);
    // remove glitch from body
    if (document.body) {
      document.body.style.filter = "";
      document.body.style.transform = "";
    }
    // fade out music
    if (audioRef.current) {
      const audio = audioRef.current;
      const fadeInterval = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume -= 0.05;
        } else {
          audio.pause();
          audio.volume = 0.6;
          clearInterval(fadeInterval);
        }
      }, 50);
    }
    sigmaSound.play("close");
    toast("▮ MC MODE DISENGAGED");
  }, []);

  const startGlitchSequence = React.useCallback(() => {
    setGlitching(true);
    const body = document.body;
    if (!body) return;

    // Phase 1: overwhelming glitch (0-3.5s) — distort the whole screen
    const tl = gsap.timeline({
      onComplete: () => {
        setGlitching(false);
        // clean up body styles
        body.style.filter = "";
        body.style.transform = "";
      },
    });

    // rapid filter/transform distortion on the body
    tl.to(body, {
      duration: 0.08,
      repeat: 42,
      repeatRefresh: true,
      filter: () => {
        const hue = Math.random() * 360;
        const contrast = 1 + Math.random() * 1.5;
        const saturate = 1 + Math.random() * 3;
        const invert = Math.random() > 0.7 ? Math.random() * 0.3 : 0;
        return `hue-rotate(${hue}deg) contrast(${contrast}) saturate(${saturate}) invert(${invert})`;
      },
      x: () => (Math.random() - 0.5) * 16,
      y: () => (Math.random() - 0.5) * 8,
      skewX: () => (Math.random() - 0.5) * 4,
      ease: "none",
    });

    // Phase 2: lingering ending (3.5-5s) — gradual recovery
    tl.to(body, {
      duration: 1.5,
      filter: "hue-rotate(0deg) contrast(1) saturate(1) invert(0)",
      x: 0,
      y: 0,
      skewX: 0,
      ease: "power2.out",
    });
  }, []);

  const activate = React.useCallback(() => {
    if (active) {
      deactivate();
      return;
    }
    setActive(true);
    sigmaSound.play("transition");

    // play music (may be blocked by autoplay policy — try anyway)
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        toast.warning("▮ AUDIO BLOCKED", {
          description: "Click anywhere to enable music playback",
        });
        // try again on next user interaction
        const enableAudio = () => {
          if (audioRef.current) {
            audioRef.current.play().catch(() => {});
          }
          window.removeEventListener("click", enableAudio);
        };
        window.addEventListener("click", enableAudio, { once: true });
      });
    }

    toast.success("▮ MC MODE ENGAGED", {
      description: "燃える鋼 · BURNING STEEL · Matrix online",
    });

    // start whole-screen glitch for 5s with lingering ending
    startGlitchSequence();
  }, [active, deactivate, startGlitchSequence]);

  // [C] keyboard shortcut
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "c" || e.key === "C") {
        const t = e.target as HTMLElement;
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
        e.preventDefault();
        activate();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activate]);

  // Matrix rain canvas
  React.useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const fontSize = 14;
    let cols = Math.floor(w / fontSize);
    let drops: number[] = Array(cols).fill(1).map(() => Math.random() * (h / fontSize));

    const chars = "ΣΛΒΓΔΨΩΘΦΞΠ0123456789ABCDEF▲▼◄►▮░▒▓█TAUNGOOSIGMALAB燃える鋼HARDSTEELÆØ§¶†‡∞∞≈≠≤≥∫∂√".split("");

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      cols = Math.floor(w / fontSize);
      drops = Array(cols).fill(1).map(() => Math.random() * (h / fontSize));
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    let lastTime = 0;
    const draw = (time: number) => {
      if (time - lastTime < 45) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastTime = time;

      // trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // gradient color: green base with occasional accent flashes
        const r = Math.random();
        if (r > 0.97) {
          ctx.fillStyle = `rgba(255, 179, 0, ${0.8 + Math.random() * 0.2})`; // amber (was pink)
        } else if (r > 0.94) {
          ctx.fillStyle = `rgba(0, 229, 255, ${0.7 + Math.random() * 0.3})`; // cyan
        } else if (r > 0.91) {
          ctx.fillStyle = `rgba(255, 179, 0, ${0.7 + Math.random() * 0.3})`; // amber
        } else {
          ctx.fillStyle = `rgba(0, 255, 148, ${0.6 + Math.random() * 0.4})`; // green
        }

        ctx.fillText(text, x, y);

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      ctx.clearRect(0, 0, w, h);
    };
  }, [active]);

  return (
    <>
      {/* MC MODE button */}
      <button
        onClick={activate}
        className="fixed bottom-9 right-[180px] z-[80] hidden items-center gap-1.5 border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] backdrop-blur-sm transition-all md:flex"
        data-cursor="hover"
        style={active
          ? { borderColor: "#FFB300", background: "#FFB300", color: "#000" }
          : { borderColor: "var(--border)", background: "rgba(0,0,0,0.8)", color: "#FFB300" }
        }
        title="MC MODE [C] — Matrix + Glitch + Music"
      >
        <Zap className="h-3 w-3" style={{ color: active ? "#000" : "#FFB300" }} />
        {active ? "MC ON" : "MC MODE"}
      </button>

      {/* Matrix rain canvas (only when active) */}
      {active && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-[100]"
          style={{ opacity: glitching ? 0.8 : 0.45, transition: `opacity var(--dur-slow) var(--ease-out-expo)` }}
        />
      )}

      {/* MC MODE status badge (when active) */}
      {active && (
        <div className="fixed left-1/2 top-9 z-[102] -translate-x-1/2 flex items-center gap-2 border border-[#FFB300] bg-background/90 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.3em] backdrop-blur-sm">
          <span className="sigma-pulse h-1.5 w-1.5 bg-[#FFB300]" />
          <span className="text-[#FFB300]">MC MODE</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-foreground">燃える鋼 · BURNING STEEL</span>
          {glitching && <span className="text-[#FFB300] sigma-blink">▮ GLITCH</span>}
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">[C] STOP</span>
        </div>
      )}
    </>
  );
}
