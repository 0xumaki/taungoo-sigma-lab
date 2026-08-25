"use client";

import * as React from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * SigmaKonami — listens for the Konami code (↑↑↓↓←→←→BA) and triggers a
 * full-screen glitch/matrix rain overlay for 4 seconds.
 */
export function SigmaKonami() {
  const [active, setActive] = React.useState(false);
  const seqRef = React.useRef<string[]>([]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      seqRef.current = [...seqRef.current, key].slice(-KONAMI.length);
      if (seqRef.current.join(",") === KONAMI.join(",")) {
        setActive(true);
        seqRef.current = [];
        setTimeout(() => setActive(false), 4500);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!active) return null;

  return <MatrixRain />;
}

function MatrixRain() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "Σ0123456789ABCDEF▲▼◄►▮░▒▓█TAUNGOOΣΛΒΓΔ".split("");
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00FF94";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[130] pointer-events-none">
      <canvas ref={canvasRef} className="h-full w-full opacity-70" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="border-2 border-[#00FF94] bg-black/80 px-8 py-4 text-center">
          <div className="sigma-glitch font-sans text-3xl font-black uppercase tracking-tight text-[#00FF94]" data-text="Σ MODE ACTIVATED">
            Σ MODE ACTIVATED
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[#00FF94]/70">
            ▮ THE SIGMA VARIABLE IS UNLEASHED
          </div>
        </div>
      </div>
    </div>
  );
}
