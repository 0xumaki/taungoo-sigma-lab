"use client";

import * as React from "react";
import gsap from "gsap";
import { sigmaSound } from "@/lib/sigma/sound";
import { toast } from "sonner";

/**
 * SigmaMCController — handles the MC mode state, matrix canvas, glitch,
 * and music playback. Controlled by parent via `active` and `onToggle`.
 * Renders the matrix canvas + glitch overlay + status badge.
 */
export function SigmaMCController({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) {
  const [glitching, setGlitching] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

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

  // When activated: play music + start glitch
  React.useEffect(() => {
    if (!active) return;

    // play music
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        toast.warning("▮ AUDIO BLOCKED", {
          description: "Click anywhere to enable music",
        });
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
    setGlitching(true);
    const body = document.body;
    if (!body) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setGlitching(false);
        body.style.filter = "";
        body.style.transform = "";
      },
    });

    // Phase 1: overwhelming glitch (0-3.5s)
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

    // Phase 2: lingering ending (3.5-5s)
    tl.to(body, {
      duration: 1.5,
      filter: "hue-rotate(0deg) contrast(1) saturate(1) invert(0)",
      x: 0,
      y: 0,
      skewX: 0,
      ease: "power2.out",
    });

    return () => {
      tl.kill();
      body.style.filter = "";
      body.style.transform = "";
    };
  }, [active]);

  // When deactivated: stop music
  React.useEffect(() => {
    if (active) return;
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
  }, [active]);

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

    const chars = "ΣΛΒΓΔΨΩΘΦΞΠ0123456789ABCDEF▲▼◄►▮░▒▓█TAUNGOOSIGMALAB燃える鋼HARDSTEELÆØ§¶†‡".split("");

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

      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const r = Math.random();
        if (r > 0.97) {
          ctx.fillStyle = `rgba(255, 45, 126, ${0.8 + Math.random() * 0.2})`;
        } else if (r > 0.94) {
          ctx.fillStyle = `rgba(0, 229, 255, ${0.7 + Math.random() * 0.3})`;
        } else if (r > 0.91) {
          ctx.fillStyle = `rgba(255, 179, 0, ${0.7 + Math.random() * 0.3})`;
        } else {
          ctx.fillStyle = `rgba(0, 255, 148, ${0.6 + Math.random() * 0.4})`;
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

  if (!active) return null;

  return (
    <>
      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[100]"
        style={{ opacity: glitching ? 0.8 : 0.45, transition: "opacity 0.5s" }}
      />

      {/* MC MODE status badge */}
      <div className="fixed left-1/2 top-9 z-[102] -translate-x-1/2 flex items-center gap-2 border border-[#FF2D7E] bg-background/90 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.3em] backdrop-blur-sm">
        <span className="sigma-pulse h-1.5 w-1.5 bg-[#FF2D7E]" />
        <span className="text-[#FF2D7E]">MC MODE</span>
        <span className="text-muted-foreground">·</span>
        <span className="text-foreground">燃える鋼 · BURNING STEEL</span>
        {glitching && <span className="text-[#FF2D7E] sigma-blink">▮ GLITCH</span>}
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground">[C] STOP</span>
      </div>
    </>
  );
}
