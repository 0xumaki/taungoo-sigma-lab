"use client";

import * as React from "react";

interface Mote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  char: string;
  life: number;
  maxLife: number;
}

const CHARS = ["0", "1", "Σ", "▲", "▮", "░", "⬡", "◍", "Λ", "Δ"];

/**
 * SigmaParticles — floating data motes that drift across the background.
 * Renders ASCII-like particles that fade in/out, giving a "data in the void" feel.
 * Canvas-based for performance.
 */
export function SigmaParticles({ count = 30 }: { count?: number }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const motes: Mote[] = [];
    const spawn = (): Mote => {
      const maxLife = 200 + Math.random() * 300;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.4,
        size: 8 + Math.random() * 6,
        opacity: 0,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        life: 0,
        maxLife,
      };
    };

    for (let i = 0; i < count; i++) {
      const m = spawn();
      m.life = Math.random() * m.maxLife;
      motes.push(m);
    }

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = "10px monospace";
      ctx.textAlign = "center";

      for (let i = motes.length - 1; i >= 0; i--) {
        const m = motes[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life++;

        // fade in/out
        const lifeRatio = m.life / m.maxLife;
        if (lifeRatio < 0.2) {
          m.opacity = lifeRatio / 0.2;
        } else if (lifeRatio > 0.8) {
          m.opacity = (1 - lifeRatio) / 0.2;
        } else {
          m.opacity = 1;
        }
        m.opacity *= 0.5;

        // draw
        ctx.fillStyle = `rgba(0, 255, 148, ${m.opacity})`;
        ctx.font = `${m.size}px monospace`;
        ctx.fillText(m.char, m.x, m.y);

        // reset if dead or off-screen
        if (m.life >= m.maxLife || m.y < -10 || m.x < -10 || m.x > w + 10) {
          motes[i] = spawn();
          motes[i].y = h + 10; // spawn from bottom
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      aria-hidden
    />
  );
}
