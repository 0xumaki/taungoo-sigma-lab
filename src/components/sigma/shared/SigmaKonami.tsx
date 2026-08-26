"use client";

import * as React from "react";
import gsap from "gsap";
import { sigmaSound } from "@/lib/sigma/sound";

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
 * MAXIMALIST TECHNO BRUTALISM transformation — significantly enhanced.
 *
 * Multi-phase sequence:
 * 1. System alert + screen crack
 * 2. RGB channel split (full screen)
 * 3. Glitch grid overlay + scanline distortion
 * 4. "SYSTEM OVERRIDE" text slam with chromatic aberration
 * 5. Hex grid materializes with photon pulses
 * 6. Giant Σ morphs in with glitch distortion
 * 7. Data stream rain (matrix-style but with Σ and binary)
 * 8. Photon burst + shockwave ring
 * 9. "SIGMA PROTOCOL ACTIVATED" terminal display
 * 10. Full status HUD with live data readouts
 * 11. Faiz Henshin soundtrack plays throughout
 * 12. Auto-dismisses after ~12s
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
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!active) return null;

  return <MaximalistHenshin onComplete={() => setActive(false)} />;
}

function MaximalistHenshin({ onComplete }: { onComplete: () => void }) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    // Play the Faiz Henshin soundtrack
    const audio = new Audio("/next-faiz-henshin.mp3");
    audio.volume = 0.7;
    audioRef.current = audio;
    audio.play().catch(() => {
      // autoplay blocked
    });

    sigmaSound.play("transition");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Phase 1: System alert flash (0-0.3s) — rapid red/white flashing
      tl.set("[data-mx-alert]", { opacity: 1 });
      tl.to("[data-mx-alert]", {
        opacity: 0.3,
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        ease: "none",
      });
      tl.to("[data-mx-alert]", { opacity: 0, duration: 0.1 });

      // Phase 2: Screen crack — glitch bars sweep (0.3-0.8s)
      tl.set("[data-mx-crack]", { opacity: 1 }, "-=0.05");
      tl.fromTo("[data-mx-crack-bar]",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.08, stagger: 0.02, ease: "power4.out" },
        "<"
      );
      tl.to("[data-mx-crack]", { opacity: 0, duration: 0.3, ease: "power2.in" });

      // Phase 3: RGB channel split (0.8-1.2s) — full screen
      tl.set("[data-mx-rgb]", { opacity: 1 }, "-=0.2");
      tl.fromTo("[data-mx-rgb-r]", { x: 0 }, { x: -15, duration: 0.2, ease: "power2.inOut" }, "<");
      tl.fromTo("[data-mx-rgb-b]", { x: 0 }, { x: 15, duration: 0.2, ease: "power2.inOut" }, "<");
      tl.to("[data-mx-rgb]", { opacity: 0, duration: 0.3, ease: "power2.in" });

      // Phase 4: "SYSTEM OVERRIDE" text slam (1.2-1.8s)
      tl.fromTo("[data-mx-override]",
        { opacity: 0, scale: 4, filter: "blur(30px) brightness(3)" },
        { opacity: 1, scale: 1, filter: "blur(0px) brightness(1)", duration: 0.4, ease: "power4.out" },
        "-=0.1"
      );
      tl.to("[data-mx-override]", {
        opacity: 0,
        scale: 0.5,
        filter: "blur(10px)",
        duration: 0.2,
        ease: "power3.in",
      }, "+=0.3");

      // Phase 5: Hex grid materializes (1.8-2.5s)
      tl.fromTo("[data-mx-hex]",
        { opacity: 0, scale: 0.3 },
        { opacity: 0.6, scale: 1, duration: 0.5, ease: "power3.out" },
        "-=0.1"
      );

      // Phase 6: Giant Σ morphs in (2.5-3.5s) — with glitch
      tl.fromTo("[data-mx-sigma]",
        { opacity: 0, scale: 0, rotation: -360, filter: "blur(20px)" },
        { opacity: 1, scale: 1, rotation: 0, filter: "blur(0px)", duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3"
      );

      // Phase 7: Photon streaks radiate (3.5-4.2s)
      tl.fromTo("[data-mx-streaks]",
        { opacity: 0, scale: 0, rotation: 0 },
        { opacity: 1, scale: 1.8, rotation: 60, duration: 0.5, ease: "power2.out" },
        "<"
      );
      tl.to("[data-mx-streaks]", { opacity: 0.3, duration: 0.3, ease: "power2.in" });

      // Phase 8: Shockwave ring (4.2-4.8s)
      tl.fromTo("[data-mx-shockwave]",
        { opacity: 1, scale: 0 },
        { opacity: 0, scale: 3, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );

      // Phase 9: "SIGMA PROTOCOL" terminal display (4.8-5.5s)
      tl.fromTo("[data-mx-terminal]",
        { opacity: 0, y: 30, scaleY: 0 },
        { opacity: 1, y: 0, scaleY: 1, duration: 0.4, ease: "power3.out", transformOrigin: "center" },
        "-=0.2"
      );

      // Phase 10: Status bars fill (5.5-6.5s)
      tl.fromTo("[data-mx-bar]",
        { width: "0%" },
        { width: "100%", duration: 0.3, stagger: 0.08, ease: "power2.out" },
        "-=0.1"
      );

      // Hold for soundtrack (6.5-11s)
      tl.to({}, { duration: 4.5 });

      // Phase 11: Fade out everything
      tl.to("[data-mx-bg]", { opacity: 0, duration: 0.8, ease: "power2.in" });
    }, rootRef);

    // Data stream rain on canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx2d = canvas.getContext("2d");
      if (ctx2d) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const chars = "Σ01Λ▲▼◄►▮░▒▓█TAUNGOO".split("");
        const fontSize = 16;
        const cols = Math.floor(canvas.width / fontSize);
        const drops = Array(cols).fill(1);
        let animId = 0;
        const draw = () => {
          ctx2d.fillStyle = "rgba(0, 0, 0, 0.08)";
          ctx2d.fillRect(0, 0, canvas.width, canvas.height);
          ctx2d.font = `bold ${fontSize}px var(--font-mono), monospace`;
          for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const grad = ctx2d.createLinearGradient(0, drops[i] * fontSize - fontSize, 0, drops[i] * fontSize);
            grad.addColorStop(0, "rgba(255, 69, 0, 0)");
            grad.addColorStop(0.5, "rgba(255, 69, 0, 0.8)");
            grad.addColorStop(1, "rgba(255, 255, 255, 1)");
            ctx2d.fillStyle = grad;
            ctx2d.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i]++;
          }
          animId = requestAnimationFrame(draw);
        };
        // Start rain after phase 4
        setTimeout(() => { draw(); }, 1800);
        return () => {
          cancelAnimationFrame(animId);
          ctx.revert();
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
          }
        };
      }
    }

    return () => {
      ctx.revert();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[150] flex items-center justify-center overflow-hidden"
      onClick={onComplete}
    >
      {/* Background */}
      <div data-mx-bg className="absolute inset-0 bg-black/98" />

      {/* Grid + scanlines */}
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-60" />

      {/* Phase 1: Alert flash (red) */}
      <div data-mx-alert className="absolute inset-0 bg-[#FF0000] opacity-0" />

      {/* Phase 2: Screen crack — glitch bars */}
      <div data-mx-crack className="absolute inset-0 opacity-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            data-mx-crack-bar
            className="absolute h-1 w-full origin-left scale-x-0"
            style={{
              top: `${(i + 1) * 8}%`,
              background: i % 3 === 0 ? "#FF0000" : i % 3 === 1 ? "#00FFFF" : "#FF00FF",
              boxShadow: "0 0 10px currentColor",
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* Phase 3: RGB channel split */}
      <div data-mx-rgb className="absolute inset-0 opacity-0">
        <div data-mx-rgb-r className="absolute inset-0 bg-[#FF0000]/20 mix-blend-screen" />
        <div data-mx-rgb-b className="absolute inset-0 bg-[#00FFFF]/20 mix-blend-screen" />
      </div>

      {/* Phase 4: "SYSTEM OVERRIDE" text */}
      <div
        data-mx-override
        className="absolute z-20 opacity-0"
        style={{
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "clamp(2rem, 8vw, 6rem)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: "#FF4500",
          textShadow: `
            -4px 0 0 #FF0000,
            4px 0 0 #00FFFF,
            0 0 30px rgba(255,69,0,0.8),
            0 0 60px rgba(255,69,0,0.4)
          `,
          WebkitTextStroke: "1px #fff",
        }}
      >
        SYSTEM OVERRIDE
      </div>

      {/* Phase 5: Hex grid */}
      <div data-mx-hex className="absolute inset-0 flex items-center justify-center opacity-0">
        <svg className="h-full w-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
          {Array.from({ length: 7 }).map((_, ring) => {
            const radius = 50 + ring * 35;
            const count = 6 + ring * 3;
            return Array.from({ length: count }).map((_, i) => {
              const angle = (i / count) * Math.PI * 2;
              const x = 200 + Math.cos(angle) * radius;
              const y = 200 + Math.sin(angle) * radius;
              const size = 8 + ring * 2;
              return (
                <polygon
                  key={`${ring}-${i}`}
                  points={Array.from({ length: 6 }).map((_, j) => {
                    const a = (j / 6) * Math.PI * 2;
                    return `${x + Math.cos(a) * size},${y + Math.sin(a) * size}`;
                  }).join(" ")}
                  fill="none"
                  stroke="#FF4500"
                  strokeWidth="1"
                  opacity={0.3 + ring * 0.1}
                />
              );
            });
          })}
        </svg>
      </div>

      {/* Phase 6: Giant Σ */}
      <div
        data-mx-sigma
        className="sigma-glitch absolute z-20 opacity-0"
        data-text="Σ"
        style={{
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "clamp(8rem, 25vw, 18rem)",
          fontWeight: 900,
          color: "#FF4500",
          textShadow: `
            0 0 40px rgba(255,69,0,1),
            0 0 80px rgba(255,69,0,0.6),
            0 0 120px rgba(255,69,0,0.3),
            -6px 0 0 #FF0000,
            6px 0 0 #00FFFF
          `,
          WebkitTextStroke: "2px #fff",
        }}
      >
        Σ
      </div>

      {/* Phase 7: Photon streaks */}
      <div data-mx-streaks className="absolute inset-0 flex items-center justify-center opacity-0">
        <svg className="h-full w-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            const x1 = 200 + Math.cos(angle) * 40;
            const y1 = 200 + Math.sin(angle) * 40;
            const x2 = 200 + Math.cos(angle) * 250;
            const y2 = 200 + Math.sin(angle) * 250;
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={i % 2 === 0 ? "#FF4500" : "#00FFFF"}
                strokeWidth={i % 3 === 0 ? "3" : "1"}
                opacity="0.8"
              />
            );
          })}
        </svg>
      </div>

      {/* Phase 8: Shockwave ring */}
      <div data-mx-shockwave className="absolute inset-0 flex items-center justify-center opacity-0">
        <div
          className="h-32 w-32 rounded-full border-4"
          style={{ borderColor: "#FF4500", boxShadow: "0 0 40px #FF4500" }}
        />
      </div>

      {/* Data stream rain canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-50" />

      {/* Phase 9: Terminal display */}
      <div
        data-mx-terminal
        className="absolute z-30 flex flex-col items-center opacity-0"
        style={{ transformOrigin: "center" }}
      >
        <div
          className="border-2 border-[#FF4500] bg-black/90 px-10 py-8 backdrop-blur-md"
          style={{
            clipPath: "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
            boxShadow: "0 0 40px rgba(255,69,0,0.5), inset 0 0 20px rgba(255,69,0,0.1)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#FF4500]/30 pb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#FF4500]/70">
              ▮ SIGMA PROTOCOL ▮
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
              v2.7.SIGMA
            </span>
          </div>

          {/* Title */}
          <div
            className="sigma-glitch mt-3 font-sans text-5xl font-black uppercase tracking-tight text-[#FF4500]"
            data-text="SIGMA FORM"
            style={{
              textShadow: "0 0 20px rgba(255,69,0,0.8), -3px 0 0 #FF0000, 3px 0 0 #00FFFF",
            }}
          >
            SIGMA FORM
          </div>
          <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            EXCEED CHARGE · PHI-POWER · OVERFLOW
          </div>

          {/* Status bars */}
          <div className="mt-5 space-y-2">
            {["PHOTON", "SIGMA", "OVERFLOW", "CHARGE"].map((label) => (
              <div key={label} className="flex items-center gap-3">
                <span className="w-20 font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
                <div className="h-2 flex-1 bg-foreground/10">
                  <div
                    data-mx-bar
                    className="h-full"
                    style={{ width: "0%", background: "#FF4500", boxShadow: "0 0 8px #FF4500" }}
                  />
                </div>
                <span className="font-mono text-[8px] text-[#FF4500]">MAX</span>
              </div>
            ))}
          </div>

          {/* Data readout */}
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#FF4500]/30 pt-3">
            {[
              ["SIG", "1.0000"],
              ["NODES", "11/11"],
              ["BUILD", "2.7"],
              ["MODE", "OVERFLOW"],
              ["ACCESS", "OMEGA"],
              ["STATUS", "PERFECT"],
            ].map(([k, v]) => (
              <div key={k} className="border border-[#FF4500]/20 p-1.5">
                <div className="font-mono text-[7px] uppercase tracking-[0.18em] text-muted-foreground">{k}</div>
                <div className="font-mono text-xs font-bold text-[#FF4500]">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hint */}
        <div className="mt-4 font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground">
          ▮ CLICK TO DISMISS · [ESC] ▮
        </div>
      </div>

      {/* Corner brackets — animated */}
      {[
        "left-6 top-6 border-l-2 border-t-2",
        "right-6 top-6 border-r-2 border-t-2",
        "bottom-6 left-6 border-b-2 border-l-2",
        "bottom-6 right-6 border-b-2 border-r-2",
      ].map((cls, i) => (
        <span
          key={i}
          data-mx-corner
          className={`absolute h-6 w-6 ${cls} border-[#FF4500]/80`}
          style={{ boxShadow: "0 0 10px rgba(255,69,0,0.5)" }}
        />
      ))}

      {/* Top/bottom hazard stripes */}
      <div
        className="absolute inset-x-0 top-0 h-2"
        style={{
          background: "repeating-linear-gradient(45deg, #FF4500 0, #FF4500 8px, #000 8px, #000 16px)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2"
        style={{
          background: "repeating-linear-gradient(45deg, #FF4500 0, #FF4500 8px, #000 8px, #000 16px)",
        }}
      />
    </div>
  );
}
