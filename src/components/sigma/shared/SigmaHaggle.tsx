"use client";

import * as React from "react";
import gsap from "gsap";
import { useBasketStore, HAGGLE_DICE_TABLE, isValidActivationCode } from "@/lib/sigma/basket";
import { sigmaSound } from "@/lib/sigma/sound";

/**
 * SigmaHaggle — the secret haggle system.
 *
 * Flow:
 *  1. User types the key binding H-A-G-G-L-E in sequence (anywhere on the page,
 *     except when focused in an input/textarea).
 *  2. An arcade-style "ACTIVATION CARD" modal pops up prompting for a code.
 *  3. If the code is valid → "INSERT COIN" sound plays, modal closes,
 *     and the dice-roller view appears.
 *  4. The dice rolls with an arcade neon animation; after the roll, the final
 *     face (1–6) determines the extra discount rate (2% / 4% / 6% / 9% / 12% / 15%).
 *  5. After the final number is revealed → "SUPER SMASH BROS BONUS" song plays,
 *     confetti bursts, and a big "CONGRATULATIONS — you got X% EXTRA discount
 *     on your HAGGLE" letter is displayed.
 *  6. The discount is persisted in the basket store (single-use per session),
 *     stacking on top of the bulk discount.
 *
 * The component is mounted once globally (via SigmaHaggleProvider) and self-
 * contained — it manages its own visibility state.
 */

const HAGGLE_KEYS = ["h", "a", "g", "g", "l", "e"];

type HagglePhase = "idle" | "activation" | "rolling" | "result";

export function SigmaHaggle() {
  const [phase, setPhase] = React.useState<HagglePhase>("idle");
  const seqRef = React.useRef<string[]>([]);

  // Subscribe to haggleUsed so we can prevent re-triggering after success.
  const haggleUsed = useBasketStore((s) => s.haggleUsed);

  React.useEffect(() => {
    if (haggleUsed) return; // already used — don't listen for the sequence

    const onKey = (e: KeyboardEvent) => {
      // Ignore key presses inside form fields (so users can type "haggle" in a
      // contact form without triggering the easter egg)
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) {
          return;
        }
        // Also ignore when any modifier is held (so Cmd+H doesn't trigger)
        if (e.metaKey || e.ctrlKey || e.altKey) return;
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      seqRef.current = [...seqRef.current, key].slice(-HAGGLE_KEYS.length);
      if (seqRef.current.join(",") === HAGGLE_KEYS.join(",")) {
        seqRef.current = [];
        // Init sound on first interaction (browser autoplay policy)
        sigmaSound.init();
        setPhase("activation");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [haggleUsed]);

  // ESC closes the activation modal only (not during rolling/result)
  React.useEffect(() => {
    if (phase !== "activation") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPhase("idle");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  if (phase === "idle") return null;

  if (phase === "activation") {
    return (
      <ActivationCard
        onCancel={() => setPhase("idle")}
        onSuccess={() => setPhase("rolling")}
      />
    );
  }

  if (phase === "rolling") {
    return (
      <DiceRoller
        onComplete={(face) => {
          const entry = HAGGLE_DICE_TABLE[face - 1];
          // Apply the haggle discount to the basket (single-use)
          useBasketStore.getState().setHaggleResult(entry.face, entry.rate);
          setPhase("result");
        }}
      />
    );
  }

  // phase === "result"
  const roll = useBasketStore.getState().haggleRoll ?? 1;
  const entry = HAGGLE_DICE_TABLE[roll - 1];

  return (
    <ResultLetter
      face={entry.face}
      rate={entry.rate}
      label={entry.label}
      onDismiss={() => setPhase("idle")}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 1 — ACTIVATION CARD
// ─────────────────────────────────────────────────────────────────────────────

function ActivationCard({ onCancel, onSuccess }: { onCancel: () => void; onSuccess: () => void }) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [shakeKey, setShakeKey] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Animate the card in
  React.useEffect(() => {
    inputRef.current?.focus();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        "[data-ha-bg]",
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );
      tl.fromTo(
        "[data-ha-card]",
        { opacity: 0, scale: 0.7, y: 30, filter: "blur(12px)" },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "back.out(1.6)",
        },
        "-=0.1"
      );
      tl.fromTo(
        "[data-ha-line]",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" },
        "-=0.2"
      );
      // Marquee blink on the "INSERT COIN" prompt
      tl.fromTo(
        "[data-ha-blink]",
        { opacity: 0.3 },
        { opacity: 1, duration: 0.4, repeat: -1, yoyo: true, ease: "none" },
        "-=0.1"
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    if (!code.trim()) {
      setError("CODE REQUIRED");
      setShakeKey((k) => k + 1);
      sigmaSound.play("error");
      return;
    }
    if (!isValidActivationCode(code)) {
      setError("INVALID CODE — ACCESS DENIED");
      setShakeKey((k) => k + 1);
      sigmaSound.play("error");
      return;
    }
    // Success! Play INSERT COIN sound, then proceed.
    const audio = new Audio("/sounds/insert-coin.mp3");
    audio.volume = 0.85;
    audio.play().catch(() => {
      // Autoplay blocked — fallback to a synth beep
      sigmaSound.play("complete");
    });
    // Quick "card accepted" flash, then on success fire callback
    const tl = gsap.timeline();
    tl.to(cardRef.current, {
      scale: 1.05,
      duration: 0.12,
      ease: "power2.out",
    });
    tl.to(cardRef.current, {
      scale: 0.85,
      opacity: 0,
      filter: "blur(20px)",
      duration: 0.35,
      ease: "power3.in",
    });
    tl.to(
      "[data-ha-bg]",
      { opacity: 0, duration: 0.3, ease: "power2.in" },
      "-=0.15"
    );
    tl.call(() => {
      onSuccess();
    });
  };

  // Shake on error
  React.useEffect(() => {
    if (shakeKey === 0) return;
    if (!cardRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(
      cardRef.current,
      { x: -10 },
      { x: 10, duration: 0.05, repeat: 5, yoyo: true, ease: "power1.inOut" }
    );
    tl.to(cardRef.current, { x: 0, duration: 0.05 });
  }, [shakeKey]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[180] flex items-center justify-center p-4"
      onClick={(e) => {
        // Click outside the card = cancel
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      {/* Backdrop */}
      <div data-ha-bg className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Grid + scanlines for arcade vibe */}
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-60" />

      {/* Hazard stripes top/bottom */}
      <div
        className="absolute inset-x-0 top-0 h-2"
        style={{
          background:
            "repeating-linear-gradient(45deg, #FF4500 0, #FF4500 8px, #000 8px, #000 16px)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2"
        style={{
          background:
            "repeating-linear-gradient(45deg, #FF4500 0, #FF4500 8px, #000 8px, #000 16px)",
        }}
      />

      {/* Card */}
      <div
        ref={cardRef}
        data-ha-card
        className="relative w-full max-w-md"
        style={{
          clipPath:
            "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
        }}
      >
        <div
          className="border-2 border-[#FF4500] bg-background/95"
          style={{
            boxShadow:
              "0 0 40px rgba(255,69,0,0.6), inset 0 0 24px rgba(255,69,0,0.08)",
          }}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-[#FF4500]/40 bg-[#FF4500]/10 px-4 py-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">
              ▮ HAGGLE PROTOCOL ▮
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              v1.0 · ARCADE
            </span>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Coin icon + blink prompt */}
            <div data-ha-line className="flex flex-col items-center gap-2">
              <div className="relative">
                {/* Spinning coin SVG */}
                <svg
                  className="sigma-spin-slow h-16 w-16"
                  viewBox="0 0 64 64"
                  fill="none"
                  aria-hidden
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="#FF4500"
                    stroke="#FFD700"
                    strokeWidth="3"
                  />
                  <text
                    x="32"
                    y="42"
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontSize="28"
                    fontWeight="900"
                    fill="#000"
                  >
                $
              </text>
                </svg>
                <div
                  className="absolute -inset-2 -z-10 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)",
                  }}
                />
              </div>
              <div
                data-ha-blink
                className="font-sans text-xl font-black uppercase tracking-tight text-[#FFD700]"
                style={{
                  textShadow:
                    "0 0 12px rgba(255,215,0,0.8), 0 0 24px rgba(255,69,0,0.5)",
                }}
              >
                ▸ INSERT COIN ◂
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                ENTER ACTIVATION CODE TO ROLL FOR DISCOUNT
              </div>
            </div>

            {/* Prize table preview */}
            <div
              data-ha-line
              className="mt-5 grid grid-cols-6 gap-1 border border-[#FF4500]/30 bg-black/40 p-2"
            >
              {HAGGLE_DICE_TABLE.map((d) => (
                <div
                  key={d.face}
                  className="flex flex-col items-center border border-[#FF4500]/20 py-1"
                >
                  <span className="font-sans text-base font-black text-[#FFD700]">
                    {d.face}
                  </span>
                  <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-[#00FF94]">
                    {d.label.replace(" EXTRA", "")}
                  </span>
                </div>
              ))}
            </div>
            <div
              data-ha-line
              className="mt-1 text-center font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground"
            >
              ROLL 1 = 2% · ROLL 6 = 15% — SINGLE USE PER SESSION
            </div>

            {/* Input */}
            <div data-ha-line className="mt-5">
              <label
                htmlFor="haggle-code"
                className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground"
              >
                ▸ ACTIVATION CODE
              </label>
              <input
                ref={inputRef}
                id="haggle-code"
                type="text"
                autoComplete="off"
                spellCheck={false}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (error) setError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    validate();
                  }
                }}
                className="mt-1 w-full border-2 border-[#FF4500]/60 bg-black/60 px-3 py-2.5 font-mono text-sm uppercase tracking-[0.2em] text-[#FFD700] outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-[#FFD700] focus:bg-black/80"
                placeholder="████-████"
                style={{ caretColor: "#FFD700" }}
              />
              {error && (
                <div
                  className="mt-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF3D3D]"
                  style={{ textShadow: "0 0 8px rgba(255,61,61,0.6)" }}
                >
                  <span>⚠</span>
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div data-ha-line className="mt-5 flex gap-2">
              <button
                onClick={validate}
                className="flex-1 border-2 border-[#FFD700] bg-[#FFD700] py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-black transition-all hover:shadow-[0_0_16px_rgba(255,215,0,0.8)] active:scale-95"
                style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
              >
                ▸ INSERT COIN
              </button>
              <button
                onClick={onCancel}
                className="border-2 border-border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                [ESC]
              </button>
            </div>

            {/* Footer */}
            <div
              data-ha-line
              className="mt-4 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground"
            >
              <span>▸ TAUNGOO SIGMA LAB</span>
              <span className="text-[#FF4500]/60">HAGGLE-PROTOCOL · ARCADE</span>
            </div>
          </div>
        </div>

        {/* Corner crosshairs */}
        <span className="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-[#FFD700]" />
        <span className="absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2 border-[#FFD700]" />
        <span className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-[#FFD700]" />
        <span className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-[#FFD700]" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 2 — DICE ROLLER (arcade neon, animated 3D-ish dice)
// ─────────────────────────────────────────────────────────────────────────────

function DiceRoller({ onComplete }: { onComplete: (face: number) => void }) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const diceRef = React.useRef<HTMLDivElement>(null);
  const [displayFace, setDisplayFace] = React.useState(1);
  const [finalFace, setFinalFace] = React.useState<number | null>(null);
  const [rolling, setRolling] = React.useState(true);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Pre-pick the final face so the animation can "land" on it
  const targetFace = React.useMemo(() => Math.floor(Math.random() * 6) + 1, []);

  React.useEffect(() => {
    // Start arcade ambient hum
    sigmaSound.play("transition");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Backdrop slam-in
      tl.fromTo(
        "[data-dr-bg]",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Title slam
      tl.fromTo(
        "[data-dr-title]",
        { opacity: 0, scale: 3, filter: "blur(20px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power4.out",
        },
        "-=0.15"
      );

      // Subtitle
      tl.fromTo(
        "[data-dr-sub]",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.3 },
        "-=0.1"
      );

      // Dice scale-in
      tl.fromTo(
        "[data-dr-dice]",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.1"
      );

      // Start cycling faces (the "rumble")
      tl.call(() => {
        let cycles = 0;
        const maxCycles = 28;
        const interval = setInterval(() => {
          // Show a random face during the rumble
          setDisplayFace(Math.floor(Math.random() * 6) + 1);
          cycles++;
          if (cycles >= maxCycles) {
            clearInterval(interval);
            // Final approach: settle in 3 slow ticks toward target
            let slowTicks = 0;
            const slowInterval = setInterval(() => {
              slowTicks++;
              if (slowTicks < 3) {
                setDisplayFace(Math.floor(Math.random() * 6) + 1);
              } else {
                clearInterval(slowInterval);
                // Land on target
                setDisplayFace(targetFace);
                setFinalFace(targetFace);
                setRolling(false);
              }
            }, 180);
          }
        }, 65);
      });

      // Hold for the roll to complete (~3s)
      tl.to({}, { duration: 3.0 });

      // Pulse the dice on land
      tl.call(() => {
        if (diceRef.current) {
          gsap.fromTo(
            diceRef.current,
            { scale: 1.3, filter: "brightness(2)" },
            { scale: 1, filter: "brightness(1)", duration: 0.4, ease: "power2.out" }
          );
        }
      });

      // "RESULT REVEAL" flash
      tl.fromTo(
        "[data-dr-flash]",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.15,
          repeat: 3,
          yoyo: true,
          ease: "none",
        }
      );

      // Reveal result banner
      tl.fromTo(
        "[data-dr-banner]",
        { opacity: 0, y: 30, scale: 0.7 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.6)",
        },
        "-=0.1"
      );

      // Hold banner for 1.8s, then call onComplete (transitions to result letter)
      tl.to({}, { duration: 1.8 });
      tl.call(() => {
        onComplete(targetFace);
      });
    }, rootRef);

    return () => {
      ctx.revert();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [targetFace, onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[181] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div data-dr-bg className="absolute inset-0 bg-black/95" />

      {/* Grid + scanlines + hazard stripes (arcade vibe) */}
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-70" />
      <div
        className="absolute inset-x-0 top-0 h-2"
        style={{
          background:
            "repeating-linear-gradient(45deg, #FFD700 0, #FFD700 8px, #000 8px, #000 16px)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2"
        style={{
          background:
            "repeating-linear-gradient(45deg, #FFD700 0, #FFD700 8px, #000 8px, #000 16px)",
        }}
      />

      {/* Result flash */}
      <div data-dr-flash className="absolute inset-0 bg-[#FFD700]/30 opacity-0" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Title */}
        <div
          data-dr-title
          className="font-sans text-3xl font-black uppercase tracking-tight sm:text-5xl"
          style={{
            color: "#FFD700",
            textShadow:
              "0 0 16px rgba(255,215,0,0.8), 0 0 32px rgba(255,69,0,0.5), -3px 0 0 #FF0000, 3px 0 0 #00FFFF",
            WebkitTextStroke: "1px #fff",
          }}
        >
          {rolling ? "ROLLING..." : "RESULT!"}
        </div>
        <div
          data-dr-sub
          className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFD700]/70"
        >
          ▮ HAGGLE-DICE · ARCADE-PROTOCOL ▮
        </div>

        {/* Dice */}
        <div
          data-dr-dice
          ref={diceRef}
          className="mt-10"
        >
          <ArcadeDice face={displayFace} rolling={rolling} finalFace={finalFace} />
        </div>

        {/* Result banner */}
        <div data-dr-banner className="mt-8 opacity-0">
          <div
            className="border-2 border-[#FFD700] bg-black/80 px-6 py-4 text-center"
            style={{
              clipPath:
                "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
              boxShadow:
                "0 0 32px rgba(255,215,0,0.6), inset 0 0 16px rgba(255,215,0,0.1)",
            }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFD700]/70">
              ▮ DICE LANDED ON ▮
            </div>
            <div
              className="mt-1 font-sans text-5xl font-black text-[#FFD700] sm:text-6xl"
              style={{
                textShadow:
                  "0 0 20px rgba(255,215,0,1), 0 0 40px rgba(255,215,0,0.6)",
              }}
            >
              {finalFace ?? "?"}
            </div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#00FF94]">
              ▸ {HAGGLE_DICE_TABLE[(finalFace ?? 1) - 1].label} DISCOUNT ◂
            </div>
          </div>
        </div>
      </div>

      {/* Corner crosshairs */}
      {[
        "left-6 top-6 border-l-2 border-t-2",
        "right-6 top-6 border-r-2 border-t-2",
        "bottom-6 left-6 border-b-2 border-l-2",
        "bottom-6 right-6 border-b-2 border-r-2",
      ].map((cls, i) => (
        <span
          key={i}
          className={`absolute h-6 w-6 ${cls} border-[#FFD700]/80`}
          style={{ boxShadow: "0 0 10px rgba(255,215,0,0.5)" }}
        />
      ))}
    </div>
  );
}

/**
 * ArcadeDice — a 2D dice with neon pip rendering, "rumble" wobble when rolling.
 * Designed to feel like a vintage arcade slot-machine reel.
 */
function ArcadeDice({
  face,
  rolling,
  finalFace,
}: {
  face: number;
  rolling: boolean;
  finalFace: number | null;
}) {
  // Pip positions for each face (1–6), in a 3x3 grid
  // Coordinates: (col, row) — 0,1,2
  const PIPS: Record<number, [number, number][]> = {
    1: [[1, 1]],
    2: [[0, 0], [2, 2]],
    3: [[0, 0], [1, 1], [2, 2]],
    4: [[0, 0], [2, 0], [0, 2], [2, 2]],
    5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]],
    6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]],
  };

  const settled = !rolling && finalFace !== null;
  const borderColor = settled ? "#FFD700" : "#FF4500";
  const glowColor = settled ? "rgba(255,215,0,0.8)" : "rgba(255,69,0,0.7)";

  return (
    <div
      className="relative"
      style={{
        width: "clamp(180px, 30vw, 260px)",
        height: "clamp(180px, 30vw, 260px)",
      }}
    >
      {/* Outer glow */}
      <div
        className="absolute -inset-4 -z-10"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Dice body */}
      <div
        className="relative h-full w-full border-4 bg-gradient-to-br from-[#1a0a00] via-[#0a0a0a] to-[#1a0a00]"
        style={{
          borderColor,
          boxShadow: `0 0 32px ${glowColor}, inset 0 0 24px rgba(0,0,0,0.8)`,
          clipPath:
            "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
          transform: rolling ? "rotate(0deg)" : "rotate(0deg)",
          transition: "transform 0.1s",
        }}
      >
        {/* Inner frame */}
        <div
          className="absolute inset-2 border"
          style={{ borderColor: `${borderColor}40` }}
        />

        {/* Pip grid */}
        <div className="absolute inset-6 grid grid-cols-3 grid-rows-3 gap-1">
          {Array.from({ length: 9 }).map((_, idx) => {
            const col = idx % 3;
            const row = Math.floor(idx / 3);
            const pips = PIPS[face] || [];
            const hasPip = pips.some(([c, r]) => c === col && r === row);
            return (
              <div key={idx} className="flex items-center justify-center">
                {hasPip && (
                  <div
                    className="h-[18%] w-[18%] rounded-full"
                    style={{
                      width: "16px",
                      height: "16px",
                      background: settled ? "#FFD700" : "#FF4500",
                      boxShadow: settled
                        ? "0 0 12px #FFD700, 0 0 20px rgba(255,215,0,0.6)"
                        : "0 0 10px #FF4500, 0 0 16px rgba(255,69,0,0.5)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Face number badge */}
        <div
          className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center border-2 bg-black font-sans text-base font-black"
          style={{
            borderColor,
            color: borderColor,
            clipPath:
              "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
            boxShadow: `0 0 12px ${glowColor}`,
          }}
        >
          {face}
        </div>

        {/* "TAUNGOO" wordmark at bottom */}
        <div className="absolute bottom-2 left-0 right-0 text-center font-mono text-[7px] uppercase tracking-[0.4em] text-muted-foreground/60">
          TAUNGOO·ARCADE
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 3 — RESULT LETTER (with confetti + super-smash-bros song)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Spawn confetti particles directly into the DOM (via document.body) and
 * animate them with GSAP. Kept as a top-level helper so it can be called from
 * inside a `gsap.timeline().call(...)` callback without hitting
 * "accessed-before-declared" lint errors.
 */
function spawnConfettiParticles(isJackpot: boolean) {
  const colors = isJackpot
    ? ["#FFD700", "#FF4500", "#00FF94", "#00FFFF", "#FF2D7E", "#FFFFFF"]
    : ["#FFD700", "#FF4500", "#00FF94", "#FFFFFF"];
  const container = document.createElement("div");
  container.setAttribute("data-confetti", "root");
  container.style.position = "fixed";
  container.style.inset = "0";
  container.style.pointerEvents = "none";
  container.style.zIndex = "200";
  container.style.overflow = "hidden";
  document.body.appendChild(container);

  const count = isJackpot ? 220 : 140;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.setAttribute("data-confetti", "piece");
    const isSquare = Math.random() > 0.5;
    const size = 6 + Math.random() * 10;
    piece.style.position = "absolute";
    piece.style.left = `${50 + (Math.random() - 0.5) * 30}%`;
    piece.style.top = `${50 + (Math.random() - 0.5) * 10}%`;
    piece.style.width = `${size}px`;
    piece.style.height = isSquare ? `${size}px` : `${size * 0.4}px`;
    piece.style.background = colors[i % colors.length];
    piece.style.opacity = "1";
    piece.style.boxShadow = `0 0 ${size}px ${colors[i % colors.length]}`;
    container.appendChild(piece);

    // GSAP animate — burst outward, then fall with gravity + rotation
    const angle = Math.random() * Math.PI * 2;
    const burstDist = 200 + Math.random() * 400;
    const tx = Math.cos(angle) * burstDist;
    const ty = Math.sin(angle) * burstDist - 100; // initial upward bias
    gsap.to(piece, {
      x: tx,
      y: ty,
      rotation: Math.random() * 720 - 360,
      opacity: 1,
      duration: 0.6 + Math.random() * 0.4,
      ease: "power3.out",
      onComplete: () => {
        // Phase 2: fall with gravity
        gsap.to(piece, {
          y: "+=" + (window.innerHeight + 200),
          x: "+=" + (Math.random() * 200 - 100),
          rotation: "+=" + (Math.random() * 720 - 360),
          opacity: 0,
          duration: 2.5 + Math.random() * 1.5,
          ease: "power1.in",
          delay: Math.random() * 0.4,
          onComplete: () => {
            piece.remove();
          },
        });
      },
    });
  }
}

function ResultLetter({
  face,
  rate,
  label,
  onDismiss,
}: {
  face: number;
  rate: number;
  label: string;
  onDismiss: () => void;
}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const percent = Math.round(rate * 100);
  const isJackpot = face === 6;

  React.useEffect(() => {
    // Play SUPER SMASH BROS BONUS song
    const audio = new Audio("/sounds/smash-bonus.mp3");
    audio.volume = 0.85;
    audioRef.current = audio;
    audio.play().catch(() => {
      sigmaSound.play("complete");
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Backdrop fade in
      tl.fromTo(
        "[data-rl-bg]",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Confetti burst (spawn ~140 particles, or 220 if jackpot)
      tl.call(() => spawnConfettiParticles(isJackpot));

      // "BONUS!" slam
      tl.fromTo(
        "[data-rl-bonus]",
        { opacity: 0, scale: 4, filter: "blur(30px) brightness(3)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px) brightness(1)",
          duration: 0.5,
          ease: "power4.out",
        },
        "-=0.1"
      );

      // Letter card slide in
      tl.fromTo(
        "[data-rl-card]",
        { opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "back.out(1.4)",
        },
        "-=0.1"
      );

      // Big % number counter
      tl.fromTo(
        "[data-rl-percent]",
        { opacity: 0, scale: 0.3 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(2)",
        },
        "-=0.2"
      );

      // Reveal "your haggle" lines stagger
      tl.fromTo(
        "[data-rl-line]",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.1"
      );

      // Footer pulse
      tl.fromTo(
        "[data-rl-cta]",
        { opacity: 0.5 },
        {
          opacity: 1,
          duration: 0.4,
          repeat: -1,
          yoyo: true,
          ease: "none",
        }
      );

      // Hold for 8s for soundtrack + confetti, then auto-dismiss
      tl.to({}, { duration: 9.0 });
      tl.to("[data-rl-bg]", { opacity: 0, duration: 0.6, ease: "power2.in" });
      tl.call(() => onDismiss());
    }, rootRef);

    return () => {
      ctx.revert();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      // Clean up confetti DOM
      document.querySelectorAll("[data-confetti]").forEach((el) => el.remove());
    };
  }, [face, rate, onDismiss, isJackpot]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[182] flex items-center justify-center overflow-hidden p-4"
      onClick={onDismiss}
    >
      {/* Backdrop */}
      <div
        data-rl-bg
        className="absolute inset-0"
        style={{
          background: isJackpot
            ? "radial-gradient(circle at 50% 30%, rgba(255,215,0,0.15) 0%, rgba(0,0,0,0.95) 60%)"
            : "radial-gradient(circle at 50% 30%, rgba(255,69,0,0.12) 0%, rgba(0,0,0,0.95) 60%)",
        }}
      />

      {/* Grid + scanlines */}
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-50" />

      {/* Hazard stripes */}
      <div
        className="absolute inset-x-0 top-0 h-2"
        style={{
          background: isJackpot
            ? "repeating-linear-gradient(45deg, #FFD700 0, #FFD700 8px, #000 8px, #000 16px)"
            : "repeating-linear-gradient(45deg, #FF4500 0, #FF4500 8px, #000 8px, #000 16px)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2"
        style={{
          background: isJackpot
            ? "repeating-linear-gradient(45deg, #FFD700 0, #FFD700 8px, #000 8px, #000 16px)"
            : "repeating-linear-gradient(45deg, #FF4500 0, #FF4500 8px, #000 8px, #000 16px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* BONUS title */}
        <div
          data-rl-bonus
          className="font-sans text-5xl font-black uppercase tracking-tight sm:text-7xl"
          style={{
            color: isJackpot ? "#FFD700" : "#FF4500",
            textShadow: isJackpot
              ? "0 0 30px rgba(255,215,0,1), 0 0 60px rgba(255,215,0,0.6), -4px 0 0 #FF0000, 4px 0 0 #00FFFF"
              : "0 0 24px rgba(255,69,0,1), 0 0 48px rgba(255,69,0,0.5), -3px 0 0 #FF0000, 3px 0 0 #00FFFF",
            WebkitTextStroke: "1.5px #fff",
          }}
        >
          {isJackpot ? "★ JACKPOT ★" : "★ BONUS ★"}
        </div>

        {/* Letter card */}
        <div
          data-rl-card
          className="relative mt-6 w-full"
          style={{
            clipPath:
              "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
          }}
        >
          <div
            className="border-2 bg-background/95 p-6 sm:p-8"
            style={{
              borderColor: isJackpot ? "#FFD700" : "#FF4500",
              boxShadow: isJackpot
                ? "0 0 60px rgba(255,215,0,0.5), inset 0 0 32px rgba(255,215,0,0.05)"
                : "0 0 40px rgba(255,69,0,0.4), inset 0 0 24px rgba(255,69,0,0.05)",
            }}
          >
            {/* Card header */}
            <div
              data-rl-line
              className="flex items-center justify-between border-b pb-3"
              style={{ borderColor: isJackpot ? "#FFD70040" : "#FF450040" }}
            >
              <span
                className="font-mono text-[10px] uppercase tracking-[0.3em]"
                style={{ color: isJackpot ? "#FFD700" : "#FF4500" }}
              >
                ▮ HAGGLE CERTIFICATE ▮
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                ROLL #{face} · {label}
              </span>
            </div>

            {/* "CONGRATULATIONS" */}
            <div
              data-rl-line
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
            >
              ▸ CONGRATULATIONS, OPERATOR ◂
            </div>

            {/* Big % number */}
            <div className="mt-3 flex items-baseline justify-center gap-2">
              <div
                data-rl-percent
                className="font-sans text-7xl font-black leading-none sm:text-8xl"
                style={{
                  color: isJackpot ? "#FFD700" : "#FF4500",
                  textShadow: isJackpot
                    ? "0 0 32px rgba(255,215,0,1), 0 0 64px rgba(255,215,0,0.6)"
                    : "0 0 24px rgba(255,69,0,1), 0 0 48px rgba(255,69,0,0.5)",
                  WebkitTextStroke: "1px #fff",
                }}
              >
                {percent}%
              </div>
              <div
                className="font-mono text-xs uppercase tracking-[0.2em]"
                style={{ color: isJackpot ? "#FFD700" : "#FF4500" }}
              >
                EXTRA
              </div>
            </div>

            {/* "you got X% of Extra discount on your Haggle" */}
            <div
              data-rl-line
              className="mt-4 font-sans text-2xl font-black uppercase tracking-tight sm:text-3xl"
              style={{ color: isJackpot ? "#FFD700" : "#FF4500" }}
            >
              YOU GOT <span className="underline decoration-2 underline-offset-4">{percent}%</span> OF EXTRA DISCOUNT
            </div>
            <div
              data-rl-line
              className="mt-1 font-serif text-base italic text-muted-foreground sm:text-lg"
            >
              on your Haggle
            </div>

            {/* Divider */}
            <div
              data-rl-line
              className="mt-5 flex items-center gap-2"
            >
              <div className="h-px flex-1" style={{ background: isJackpot ? "#FFD70040" : "#FF450040" }} />
              <span
                className="font-mono text-[8px] uppercase tracking-[0.3em]"
                style={{ color: isJackpot ? "#FFD700" : "#FF4500" }}
              >
                APPLIED TO BASKET
              </span>
              <div className="h-px flex-1" style={{ background: isJackpot ? "#FFD70040" : "#FF450040" }} />
            </div>

            {/* Rules / what this means */}
            <div
              data-rl-line
              className="mt-4 grid grid-cols-2 gap-3 text-left"
            >
              <div className="border p-3" style={{ borderColor: isJackpot ? "#FFD70030" : "#FF450030" }}>
                <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
                  DICE FACE
                </div>
                <div
                  className="mt-1 font-sans text-2xl font-black"
                  style={{ color: isJackpot ? "#FFD700" : "#FF4500" }}
                >
                  {face} / 6
                </div>
              </div>
              <div className="border p-3" style={{ borderColor: isJackpot ? "#FFD70030" : "#FF450030" }}>
                <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
                  EXTRA DISCOUNT
                </div>
                <div
                  className="mt-1 font-sans text-2xl font-black"
                  style={{ color: "#00FF94" }}
                >
                  {percent}%
                </div>
              </div>
            </div>

            <div
              data-rl-line
              className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground"
            >
              ▸ This extra {percent}% stacks on top of your bulk-discount total.
              <br />
              ▸ Haggle is single-use per session — your basket has been updated.
            </div>

            {/* Signature */}
            <div
              data-rl-line
              className="mt-5 flex items-center justify-between border-t pt-3"
              style={{ borderColor: isJackpot ? "#FFD70040" : "#FF450040" }}
            >
              <div className="text-left">
                <div className="font-mono text-[7px] uppercase tracking-[0.3em] text-muted-foreground">
                  ISSUED BY
                </div>
                <div
                  className="font-sans text-sm font-black uppercase tracking-tight"
                  style={{ color: isJackpot ? "#FFD700" : "#FF4500" }}
                >
                  TAUNGOO SIGMA LAB
                </div>
                <div className="font-mono text-[7px] uppercase tracking-[0.2em] text-muted-foreground">
                  HAGGLE-PROTOCOL · ARCADE DIVISION
                </div>
              </div>
              {/* Sigma stamp */}
              <div
                className="flex h-14 w-14 items-center justify-center border-2 font-sans text-3xl font-black"
                style={{
                  borderColor: isJackpot ? "#FFD700" : "#FF4500",
                  color: isJackpot ? "#FFD700" : "#FF4500",
                  transform: "rotate(-12deg)",
                  boxShadow: isJackpot
                    ? "0 0 16px rgba(255,215,0,0.5)"
                    : "0 0 12px rgba(255,69,0,0.5)",
                }}
              >
                Σ
              </div>
            </div>
          </div>

          {/* Corner crosshairs on card */}
          <span
            className="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2"
            style={{ borderColor: isJackpot ? "#FFD700" : "#FF4500" }}
          />
          <span
            className="absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2"
            style={{ borderColor: isJackpot ? "#FFD700" : "#FF4500" }}
          />
          <span
            className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2"
            style={{ borderColor: isJackpot ? "#FFD700" : "#FF4500" }}
          />
          <span
            className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2"
            style={{ borderColor: isJackpot ? "#FFD700" : "#FF4500" }}
          />
        </div>

        {/* CTA */}
        <div
          data-rl-cta
          className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          ▮ CLICK ANYWHERE OR WAIT TO CONTINUE · [ESC] ▮
        </div>

        {/* Hint about secret code */}
        {!isJackpot && (
          <div className="mt-3 font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground/60">
            ▸ ROLL A 6 NEXT TIME FOR THE 15% JACKPOT ◂
          </div>
        )}
      </div>
    </div>
  );
}

export default SigmaHaggle;
