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
 * FULL "FAIZ HENSHIN" transformation sequence — way cooler than MC mode.
 *
 * Sequence:
 * 1. Screen flash + glitch distortion
 * 2. "HENSHIN!" text slam-in
 * 3. Belt/visor line sweeps across screen (like Kamen Rider Faiz)
 * 4. Sigma symbol materializes center with photon streaks
 * 5. Faiz Henshin soundtrack plays
 * 6. Full screen photon burst at song climax
 * 7. Fades to "SIGMA FORM" status display
 * 8. Auto-dismisses after song ends (~8s)
 */
export function SigmaKonami() {
  const [active, setActive] = React.useState(false);
  const seqRef = React.useRef<string[]>([]);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

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

  return <FaizHenshin onComplete={() => setActive(false)} />;
}

function FaizHenshin({ onComplete }: { onComplete: () => void }) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    // Play the Faiz Henshin soundtrack
    const audio = new Audio("/next-faiz-henshin.mp3");
    audio.volume = 0.6;
    audioRef.current = audio;
    audio.play().catch(() => {
      // autoplay blocked — user needs to interact first
    });

    sigmaSound.play("transition");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Phase 1: Screen flash white (0-0.15s)
      tl.set("[data-fz-flash]", { opacity: 1, background: "#ffffff" });
      tl.to("[data-fz-flash]", { opacity: 0.3, duration: 0.15, ease: "power2.out" });

      // Phase 2: Glitch distortion (0.15-0.5s) — RGB split bars
      tl.set("[data-fz-glitch]", { opacity: 1 }, "<");
      tl.to("[data-fz-glitch]", {
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      });

      // Phase 3: "HENSHIN!" text slams in (0.5-0.8s)
      tl.fromTo("[data-fz-henshin]",
        { opacity: 0, scale: 3, filter: "blur(20px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.3, ease: "power4.out" },
        "-=0.1"
      );
      tl.to("[data-fz-henshin]", {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: "power2.in",
      }, "+=0.3");

      // Phase 4: Belt line sweeps across screen (0.8-1.3s) — like Faiz driver
      tl.fromTo("[data-fz-belt]",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.3, ease: "power3.out" },
        "-=0.1"
      );
      tl.to("[data-fz-belt]", {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.2,
        ease: "power3.in",
      });

      // Phase 5: Sigma materializes with photon streaks (1.3-2.5s)
      tl.fromTo("[data-fz-sigma]",
        { opacity: 0, scale: 0, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.1"
      );

      // Photon streaks radiate from center
      tl.fromTo("[data-fz-streaks]",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1.5, duration: 0.6, ease: "power2.out" },
        "<"
      );
      tl.to("[data-fz-streaks]", { opacity: 0, duration: 0.4, ease: "power2.in" });

      // Phase 6: Photon burst at climax (~2.5-3s)
      tl.fromTo("[data-fz-burst]",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.2, ease: "power4.out" },
        "-=0.2"
      );
      tl.to("[data-fz-burst]", { opacity: 0, duration: 0.6, ease: "power2.in" });

      // Phase 7: "SIGMA FORM" status display (3-7s)
      tl.fromTo("[data-fz-status]",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      );

      // Hold for song
      tl.to({}, { duration: 4 });

      // Phase 8: Fade out
      tl.to("[data-fz-bg]", { opacity: 0, duration: 0.8, ease: "power2.in" });
    }, rootRef);

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
      <div data-fz-bg className="absolute inset-0 bg-black/95" />

      {/* Scanlines + grid */}
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-50" />

      {/* Phase 1: White flash */}
      <div data-fz-flash className="absolute inset-0 opacity-0" />

      {/* Phase 2: Glitch bars */}
      <div data-fz-glitch className="absolute inset-0 opacity-0">
        <div className="absolute inset-x-0 top-1/3 h-2 bg-[#FF0000]/80" />
        <div className="absolute inset-x-0 top-1/2 h-1 bg-[#00FFFF]/80" />
        <div className="absolute inset-x-0 top-2/3 h-3 bg-[#FF00FF]/60" />
        <div className="absolute inset-x-0 top-1/4 h-1 bg-[#00FF00]/70" />
      </div>

      {/* Phase 3: HENSHIN! text */}
      <div
        data-fz-henshin
        className="absolute z-10 opacity-0"
        style={{
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "clamp(3rem, 10vw, 8rem)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: "#FF4500",
          textShadow: "0 0 30px rgba(255,69,0,0.8), 0 0 60px rgba(255,69,0,0.4)",
          WebkitTextStroke: "2px #fff",
        }}
      >
        HENSHIN!
      </div>

      {/* Phase 4: Belt line sweep */}
      <div
        data-fz-belt
        className="absolute top-1/2 left-0 h-1 w-full origin-left scale-x-0"
        style={{
          background: "linear-gradient(90deg, transparent, #FF4500, #fff, #FF4500, transparent)",
          boxShadow: "0 0 20px #FF4500, 0 0 40px rgba(255,69,0,0.6)",
        }}
      />

      {/* Phase 5: Photon streaks (radiating lines) */}
      <div data-fz-streaks className="absolute inset-0 flex items-center justify-center opacity-0">
        <svg className="h-full w-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const x1 = 200 + Math.cos(angle) * 30;
            const y1 = 200 + Math.sin(angle) * 30;
            const x2 = 200 + Math.cos(angle) * 200;
            const y2 = 200 + Math.sin(angle) * 200;
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#FF4500"
                strokeWidth="2"
                opacity="0.8"
              />
            );
          })}
        </svg>
      </div>

      {/* Phase 5: Sigma symbol */}
      <div
        data-fz-sigma
        className="absolute z-10 opacity-0"
        style={{
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "clamp(6rem, 20vw, 14rem)",
          fontWeight: 900,
          color: "#FF4500",
          textShadow: "0 0 40px rgba(255,69,0,1), 0 0 80px rgba(255,69,0,0.6), 0 0 120px rgba(255,69,0,0.3)",
          WebkitTextStroke: "3px #fff",
        }}
      >
        Σ
      </div>

      {/* Phase 6: Photon burst */}
      <div data-fz-burst className="absolute inset-0 flex items-center justify-center opacity-0">
        <div
          className="h-96 w-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,69,0,0.6) 30%, transparent 70%)",
          }}
        />
      </div>

      {/* Phase 7: SIGMA FORM status display */}
      <div data-fz-status className="absolute z-10 flex flex-col items-center opacity-0">
        <div className="border-2 border-[#FF4500] bg-black/80 px-8 py-6 backdrop-blur-md" style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}>
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#FF4500]/70">
            ▮ TRANSFORMATION COMPLETE ▮
          </div>
          <div
            className="sigma-glitch mt-2 font-sans text-5xl font-black uppercase tracking-tight text-[#FF4500]"
            data-text="SIGMA FORM"
          >
            SIGMA FORM
          </div>
          <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            EXCEED CHARGE · PHI-POWER · OVERFLOW
          </div>
          {/* Status bars */}
          <div className="mt-4 space-y-1">
            {["PHOTON", "SIGMA", "OVERFLOW"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <span className="w-16 font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
                <div className="h-1.5 flex-1 bg-foreground/10">
                  <div
                    className="h-full bg-[#FF4500]"
                    style={{ width: ["100%", "100%", "100%"][i], boxShadow: "0 0 8px #FF4500" }}
                  />
                </div>
                <span className="font-mono text-[8px] text-[#FF4500]">MAX</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground">
          ▮ CLICK TO DISMISS ▮
        </div>
      </div>

      {/* Corner brackets */}
      <span className="absolute left-6 top-6 h-5 w-5 border-l-2 border-t-2 border-[#FF4500]/60" />
      <span className="absolute right-6 top-6 h-5 w-5 border-r-2 border-t-2 border-[#FF4500]/60" />
      <span className="absolute bottom-6 left-6 h-5 w-5 border-b-2 border-l-2 border-[#FF4500]/60" />
      <span className="absolute bottom-6 right-6 h-5 w-5 border-b-2 border-r-2 border-[#FF4500]/60" />
    </div>
  );
}
