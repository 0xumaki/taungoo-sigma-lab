"use client";

import * as React from "react";
import gsap from "gsap";
import { useBasketStore, HAGGLE_DICE_TABLE, isValidActivationCode } from "@/lib/sigma/basket";
import { sigmaSound } from "@/lib/sigma/sound";

/**
 * SigmaHaggle — the secret haggle system.
 *
 * === ACTIVATION TRIGGER (Konami-style) ===
 * The user presses the **↑ (Up Arrow) key 4 times** in a row.
 * This is intentionally simpler than the full Konami code (which is already
 * used by SigmaKonami for a different easter egg). 4 up-arrows is the simplest
 * possible secret-code pattern: easy to type, easy to remember ("up up up up"),
 * and easy to verify with the on-screen progress indicator.
 *
 * As the user presses ↑, a small badge appears in the bottom-right corner
 * showing progress (1/4 → 2/4 → 3/4 → 4/4). The badge auto-hides after 2s of
 * inactivity. Any non-↑ keypress resets the counter to 0.
 *
 * === FLOW ===
 *  1. Trigger fires → arcade-style "ACTIVATION CARD" modal pops up
 *  2. User enters activation code → "INSERT COIN" sound plays
 *  3. Dice roller with arcade neon animation
 *  4. After landing → "SUPER SMASH BROS BONUS" song + confetti + result letter
 *  5. Discount is persisted in the basket store (single-use per session),
 *     stacking on top of the bulk discount
 */

const HAGGLE_TRIGGER_KEY = "ArrowUp";
const HAGGLE_TRIGGER_COUNT = 4; // press ↑ 4 times

type HagglePhase = "idle" | "activation" | "rolling" | "result";

export function SigmaHaggle() {
  const [phase, setPhase] = React.useState<HagglePhase>("idle");
  // Progress of the trigger sequence: 0..HAGGLE_TRIGGER_COUNT
  const [triggerProgress, setTriggerProgress] = React.useState(0);
  // The face rolled in the CURRENT animation cycle (used for the result letter
  // display on every replay — the basket store keeps the FIRST roll's discount).
  const [currentRollFace, setCurrentRollFace] = React.useState<number | null>(null);
  const seqCountRef = React.useRef(0);
  const lastKeyTimeRef = React.useRef(0);

  // Subscribe to haggleUsed so we can show "REPLAY" badge in the result letter
  // when the discount is already locked to the first roll.
  // NOTE: We do NOT return early here — the keyboard listener stays active so
  // the user can replay the animation unlimited times. Only the FIRST successful
  // roll applies the discount; subsequent rolls are pure animation replays.
  const haggleUsed = useBasketStore((s) => s.haggleUsed);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignore key presses inside form fields
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) {
          return;
        }
        if (e.metaKey || e.ctrlKey || e.altKey) return;
      }

      // Reset if more than 2s elapsed since the last correct keypress
      const now = Date.now();
      if (now - lastKeyTimeRef.current > 2000) {
        seqCountRef.current = 0;
      }
      lastKeyTimeRef.current = now;

      if (e.key === HAGGLE_TRIGGER_KEY) {
        seqCountRef.current = Math.min(seqCountRef.current + 1, HAGGLE_TRIGGER_COUNT);
        setTriggerProgress(seqCountRef.current);

        if (seqCountRef.current >= HAGGLE_TRIGGER_COUNT) {
          seqCountRef.current = 0;
          // Init sound on first interaction (browser autoplay policy)
          sigmaSound.init();
          setPhase("activation");
          // Hide the progress indicator after trigger fires
          setTimeout(() => setTriggerProgress(0), 200);
        }
      } else {
        // Any other key resets the counter
        seqCountRef.current = 0;
        setTriggerProgress(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ESC closes the activation modal only (not during rolling/result)
  React.useEffect(() => {
    if (phase !== "activation") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPhase("idle");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  if (phase === "idle") {
    // Render the progress indicator badge if user has started typing
    return triggerProgress > 0 ? (
      <TriggerProgressBadge
        count={triggerProgress}
        total={HAGGLE_TRIGGER_COUNT}
        onTimeout={() => {
          seqCountRef.current = 0;
          setTriggerProgress(0);
        }}
      />
    ) : null;
  }

  if (phase === "activation") {
    return (
      <ActivationCard
        onCancel={() => setPhase("idle")}
        onSuccess={() => setPhase("rolling")}
        alreadyHaggled={haggleUsed}
      />
    );
  }

  if (phase === "rolling") {
    return (
      <DiceRoller
        onComplete={(face) => {
          const entry = HAGGLE_DICE_TABLE[face - 1];
          // Apply the haggle discount to the basket ONLY on the FIRST successful
          // roll. Subsequent rolls are pure animation replays — the discount stays
          // locked to the first roll (Option 2: "unlimited replay, no discount change").
          if (!useBasketStore.getState().haggleUsed) {
            useBasketStore.getState().setHaggleResult(entry.face, entry.rate);
          }
          // Track the CURRENT roll's face for the result letter display
          setCurrentRollFace(face);
          setPhase("result");
        }}
      />
    );
  }

  // phase === "result"
  // Display the CURRENT roll's face (not the locked discount) so the user
  // sees their actual dice result on every replay. The `isReplay` flag tells
  // the result letter whether to show a "discount locked to first roll" hint.
  const rollFace = currentRollFace ?? useBasketStore.getState().haggleRoll ?? 1;
  const entry = HAGGLE_DICE_TABLE[rollFace - 1];
  const isReplay = haggleUsed && currentRollFace !== useBasketStore.getState().haggleRoll;

  return (
    <ResultLetter
      face={entry.face}
      rate={entry.rate}
      label={entry.label}
      isReplay={isReplay}
      lockedRoll={useBasketStore.getState().haggleRoll}
      onDismiss={() => {
        setCurrentRollFace(null);
        setPhase("idle");
      }}
    />
  );
}

/**
 * TriggerProgressBadge — a small floating indicator in the bottom-right corner
 * that shows the user how many ↑ keys they've pressed out of the required 4.
 *
 * This solves the "I don't know if I'm typing right or wrong" problem from the
 * user feedback. As the user presses ↑, the badge lights up one segment at a
 * time. If they pause for more than 2s, the badge auto-hides and the counter
 * resets.
 */
function TriggerProgressBadge({
  count,
  total,
  onTimeout,
}: {
  count: number;
  total: number;
  onTimeout: () => void;
}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-hide after 2s of inactivity
  React.useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(onTimeout, 2000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [count, onTimeout]);

  // Pop-in animation when count changes
  React.useEffect(() => {
    if (!rootRef.current) return;
    gsap.fromTo(
      rootRef.current,
      { scale: 0.85 },
      { scale: 1, duration: 0.18, ease: "back.out(2)" }
    );
  }, [count]);

  return (
    <div
      ref={rootRef}
      className="fixed bottom-6 right-6 z-[170] pointer-events-none select-none"
      role="status"
      aria-live="polite"
      aria-label={`Haggle trigger progress: ${count} of ${total} up-arrow presses`}
    >
      <div
        className="flex items-center gap-2 border-2 border-[#FFD700] bg-black/90 px-3 py-2 backdrop-blur-md"
        style={{
          clipPath:
            "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
          boxShadow: "0 0 16px rgba(255,215,0,0.5)",
        }}
      >
        {/* Spinner coin icon */}
        <svg className="sigma-spin-slow h-5 w-5" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="10" fill="#FFD700" stroke="#FF4500" strokeWidth="2" />
          <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="900" fill="#000">$</text>
        </svg>
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#FFD700]/80">
            ▮ SECRET CODE ▮
          </span>
          {/* Progress dots */}
          <div className="flex items-center gap-1">
            {Array.from({ length: total }).map((_, i) => {
              const filled = i < count;
              return (
                <span
                  key={i}
                  className="font-mono text-sm font-black"
                  style={{
                    color: filled ? "#FFD700" : "#444",
                    textShadow: filled ? "0 0 6px rgba(255,215,0,0.8)" : "none",
                    transition: "color 0.1s, text-shadow 0.1s",
                  }}
                >
                  ↑
                </span>
              );
            })}
            <span className="ml-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">
              {count}/{total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 1 — ACTIVATION CARD
// ─────────────────────────────────────────────────────────────────────────────

function ActivationCard({ onCancel, onSuccess, alreadyHaggled = false }: { onCancel: () => void; onSuccess: () => void; alreadyHaggled?: boolean }) {
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
                ↑↑↑↑ TRIGGERED · ENTER ACTIVATION CODE TO ROLL
              </div>
              {alreadyHaggled && (
                <div
                  className="mt-2 inline-flex items-center gap-1.5 border border-[#FFD700]/40 bg-[#FFD700]/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-[#FFD700]"
                >
                  <span className="h-1 w-1 animate-pulse bg-[#FFD700]" />
                  ◆ REPLAY MODE · DISCOUNT LOCKED TO FIRST ROLL
                </div>
              )}
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
// PHASE 2 — DICE ROLLER (significantly improved: 3D-perspective cube + HUD overlay
//                          + particle sparks + screen shake + chromatic aberration
//                          + lock-on reticle)
// ─────────────────────────────────────────────────────────────────────────────

function DiceRoller({ onComplete }: { onComplete: (face: number) => void }) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const diceRef = React.useRef<HTMLDivElement>(null);
  const cubeRef = React.useRef<HTMLDivElement>(null);
  const shakeRef = React.useRef<HTMLDivElement>(null);
  const [displayFace, setDisplayFace] = React.useState(1);
  const [finalFace, setFinalFace] = React.useState<number | null>(null);
  const [rolling, setRolling] = React.useState(true);
  const [powerLevel, setPowerLevel] = React.useState(0); // 0..100 power meter
  const [showReticle, setShowReticle] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Pre-pick the final face so the animation can "land" on it
  const targetFace = React.useMemo(() => Math.floor(Math.random() * 6) + 1, []);

  React.useEffect(() => {
    sigmaSound.play("transition");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Backdrop slam-in
      tl.fromTo(
        "[data-dr-bg]",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // HUD frame fade-in (corner brackets + top/bottom bars)
      tl.fromTo(
        "[data-dr-hud]",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
        "-=0.1"
      );

      // Title slam with chromatic aberration
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

      tl.fromTo(
        "[data-dr-sub]",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.3 },
        "-=0.1"
      );

      // Dice scale-in with rotation
      tl.fromTo(
        "[data-dr-dice]",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.1"
      );

      // Start the 3D tumble + face cycling + screen shake + power meter fill
      tl.call(() => {
        // === POWER METER FILL ===
        const powerObj = { val: 0 };
        gsap.to(powerObj, {
          val: 100,
          duration: 2.4,
          ease: "power1.in",
          onUpdate: () => setPowerLevel(Math.round(powerObj.val)),
        });

        // === 3D TUMBLE ===
        if (cubeRef.current) {
          gsap.to(cubeRef.current, {
            rotateX: "+=1080", // 3 full X rotations
            rotateY: "+=1440", // 4 full Y rotations
            rotateZ: "+=360",  // 1 full Z rotation
            duration: 2.4,
            ease: "power1.inOut",
          });
        }

        // === SCREEN SHAKE ===
        if (shakeRef.current) {
          const shakeTl = gsap.timeline();
          for (let i = 0; i < 24; i++) {
            const intensity = Math.min(i / 24, 1) * 8; // ramp up to 8px
            shakeTl.to(shakeRef.current, {
              x: (Math.random() - 0.5) * intensity * 2,
              y: (Math.random() - 0.5) * intensity * 2,
              duration: 0.1,
              ease: "none",
            });
          }
          shakeTl.to(shakeRef.current, {
            x: 0, y: 0, duration: 0.3, ease: "power2.out",
          });
        }

        // === FACE CYCLING (the "rumble") ===
        let cycles = 0;
        const maxCycles = 28;
        const interval = setInterval(() => {
          setDisplayFace(Math.floor(Math.random() * 6) + 1);
          spawnSpark();
          cycles++;
          if (cycles >= maxCycles) {
            clearInterval(interval);
            let slowTicks = 0;
            const slowInterval = setInterval(() => {
              slowTicks++;
              if (slowTicks < 3) {
                setDisplayFace(Math.floor(Math.random() * 6) + 1);
                spawnSpark();
              } else {
                clearInterval(slowInterval);
                setDisplayFace(targetFace);
                setFinalFace(targetFace);
                setRolling(false);
                setShowReticle(true);
                spawnLandingBurst();
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
            { scale: 1.25, filter: "brightness(2)" },
            { scale: 1, filter: "brightness(1)", duration: 0.5, ease: "power2.out" }
          );
        }
      });

      // Lock-on reticle animation
      tl.fromTo(
        "[data-dr-reticle]",
        { opacity: 0, scale: 3, rotate: -90 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

      // Result flash strobe
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

  // Spawn a single neon spark particle that flies outward + fades
  const spawnSpark = () => {
    if (!rootRef.current) return;
    const container = rootRef.current.querySelector("[data-dr-sparks]");
    if (!container) return;
    const spark = document.createElement("div");
    spark.setAttribute("data-spark", "");
    const colors = ["#FFD700", "#FF4500", "#00FFFF", "#FFFFFF"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 3 + Math.random() * 4;
    spark.style.cssText = `
      position: absolute;
      left: 50%;
      top: 50%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      box-shadow: 0 0 ${size * 2}px ${color};
      pointer-events: none;
      z-index: 5;
    `;
    container.appendChild(spark);
    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 120;
    gsap.to(spark, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      opacity: 0,
      scale: 0,
      duration: 0.5 + Math.random() * 0.3,
      ease: "power2.out",
      onComplete: () => spark.remove(),
    });
  };

  const spawnLandingBurst = () => {
    if (!rootRef.current) return;
    for (let i = 0; i < 32; i++) {
      setTimeout(() => spawnSpark(), i * 12);
    }
  };

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[181] flex items-center justify-center overflow-hidden"
    >
      {/* === SCREEN SHAKE WRAPPER === */}
      <div ref={shakeRef} className="absolute inset-0 flex items-center justify-center">
        {/* Background */}
        <div data-dr-bg className="absolute inset-0 bg-black/95" />

        {/* Grid + scanlines + hazard stripes */}
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

        {/* === HUD FRAME === */}
        <div data-dr-hud className="pointer-events-none absolute inset-0 opacity-0">
          {/* Corner brackets */}
          {[
            "left-6 top-6 border-l-2 border-t-2",
            "right-6 top-6 border-r-2 border-t-2",
            "bottom-6 left-6 border-b-2 border-l-2",
            "bottom-6 right-6 border-b-2 border-r-2",
          ].map((cls, i) => (
            <span
              key={i}
              className={`absolute h-8 w-8 ${cls} border-[#FFD700]/80`}
              style={{ boxShadow: "0 0 12px rgba(255,215,0,0.5)" }}
            />
          ))}

          {/* Top status bar */}
          <div className="absolute left-1/2 top-6 flex -translate-x-1/2 items-center gap-3 border border-[#FFD700]/40 bg-black/80 px-3 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse bg-[#FF0000]" />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#FFD700]/80">
              ▮ ARCADE PROTOCOL · LIVE ▮
            </span>
            <span className="h-1.5 w-1.5 animate-pulse bg-[#FF0000]" />
          </div>

          {/* Left vertical rail — coordinates */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 font-mono text-[8px] uppercase tracking-[0.2em] text-[#FFD700]/40 [writing-mode:vertical-rl]">
            SIG=RANDOMIZE · MODE=ARCADE · SEED=Σ777
          </div>

          {/* Right vertical rail — power meter */}
          <div className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2">
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#FFD700]/80">
              PWR
            </span>
            <div className="relative h-48 w-3 border border-[#FFD700]/40 bg-black/60">
              <div
                className="absolute bottom-0 left-0 w-full transition-all duration-100"
                style={{
                  height: `${powerLevel}%`,
                  background: powerLevel > 80
                    ? "linear-gradient(to top, #FFD700, #FF0000)"
                    : "linear-gradient(to top, #FF4500, #FFD700)",
                  boxShadow: "0 0 8px rgba(255,215,0,0.8)",
                }}
              />
              {[25, 50, 75].map((tick) => (
                <div
                  key={tick}
                  className="absolute left-0 h-px w-full bg-[#FFD700]/30"
                  style={{ bottom: `${tick}%` }}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] font-bold text-[#FFD700]">
              {powerLevel}%
            </span>
          </div>

          {/* Bottom status bar — face counter (slot-machine style) */}
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 border border-[#FFD700]/40 bg-black/80 px-4 py-1.5 backdrop-blur-sm">
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#FFD700]/60">
              FACE
            </span>
            <div
              className="font-sans text-2xl font-black tabular-nums text-[#FFD700]"
              style={{
                textShadow: "0 0 12px rgba(255,215,0,0.8)",
                minWidth: "1.2em",
                textAlign: "center",
              }}
            >
              {displayFace}
            </div>
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#FFD700]/60">
              / 6
            </span>
            <div className="ml-2 h-1 w-12 bg-[#FFD700]/20">
              <div
                className="h-full bg-[#FFD700] transition-all duration-100"
                style={{ width: `${(displayFace / 6) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* === MAIN CONTENT === */}
        <div className="relative z-10 flex flex-col items-center px-4">
          {/* Title with chromatic aberration during roll */}
          <div
            data-dr-title
            className="font-sans text-3xl font-black uppercase tracking-tight sm:text-5xl"
            style={{
              color: "#FFD700",
              textShadow: rolling
                ? `0 0 16px rgba(255,215,0,0.8),
                   0 0 32px rgba(255,69,0,0.5),
                   -4px 0 0 #FF0000,
                   4px 0 0 #00FFFF`
                : `0 0 24px rgba(255,215,0,1)`,
              WebkitTextStroke: "1px #fff",
              transition: "text-shadow 0.2s",
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

          {/* === DICE + RETICLE + SPARKS CONTAINER === */}
          <div
            data-dr-dice
            ref={diceRef}
            className="relative mt-10"
            style={{
              perspective: "800px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            {/* Spark particle container */}
            <div
              data-dr-sparks
              className="pointer-events-none absolute left-1/2 top-1/2 z-20"
              style={{ transform: "translate(-50%, -50%)" }}
            />

            {/* Lock-on reticle (appears after landing) */}
            {showReticle && (
              <div
                data-dr-reticle
                className="pointer-events-none absolute left-1/2 top-1/2 z-30"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <svg
                  width="320"
                  height="320"
                  viewBox="0 0 320 320"
                  fill="none"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(255,215,0,0.8))",
                  }}
                >
                  <circle
                    cx="160"
                    cy="160"
                    r="140"
                    stroke="#FFD700"
                    strokeWidth="2"
                    strokeDasharray="4 8"
                    opacity="0.6"
                  />
                  <circle
                    cx="160"
                    cy="160"
                    r="110"
                    stroke="#FFD700"
                    strokeWidth="1.5"
                    strokeDasharray="2 6"
                    opacity="0.8"
                  />
                  {[
                    { x: 20, y: 20, rot: 0 },
                    { x: 300, y: 20, rot: 90 },
                    { x: 300, y: 300, rot: 180 },
                    { x: 20, y: 300, rot: 270 },
                  ].map((br, i) => (
                    <g key={i} transform={`translate(${br.x}, ${br.y}) rotate(${br.rot})`}>
                      <path
                        d="M 0 20 L 0 0 L 20 0"
                        stroke="#FFD700"
                        strokeWidth="3"
                        fill="none"
                      />
                    </g>
                  ))}
                  <line x1="160" y1="0" x2="160" y2="20" stroke="#FFD700" strokeWidth="2" />
                  <line x1="160" y1="300" x2="160" y2="320" stroke="#FFD700" strokeWidth="2" />
                  <line x1="0" y1="160" x2="20" y2="160" stroke="#FFD700" strokeWidth="2" />
                  <line x1="300" y1="160" x2="320" y2="160" stroke="#FFD700" strokeWidth="2" />
                </svg>
              </div>
            )}

            {/* The 3D cube */}
            <Cube3D ref={cubeRef} face={displayFace} rolling={rolling} finalFace={finalFace} />
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
      </div>
    </div>
  );
}

/**
 * Cube3D — a proper 3D cube using CSS `transform-style: preserve-3d`.
 * Renders 6 faces, each properly positioned at 90° offsets to form a cube.
 * The parent applies rotateX/rotateY/rotateZ to tumble the whole cube.
 *
 * Face positions (standard dice layout — opposite faces sum to 7):
 *   1 → front  (translateZ +size/2)
 *   6 → back   (translateZ -size/2, rotateY 180°)
 *   2 → right  (rotateY 90°, translateZ +size/2)
 *   5 → left   (rotateY -90°, translateZ +size/2)
 *   3 → top    (rotateX 90°, translateZ +size/2)
 *   4 → bottom (rotateX -90°, translateZ +size/2)
 */
const Cube3D = React.forwardRef<
  HTMLDivElement,
  { face: number; rolling: boolean; finalFace: number | null }
>(function Cube3D({ face, rolling, finalFace }, cubeRef) {
  const settled = !rolling && finalFace !== null;
  const accent = settled ? "#FFD700" : "#FF4500";
  const glow = settled ? "rgba(255,215,0,0.8)" : "rgba(255,69,0,0.7)";

  const size = 200;
  const half = size / 2;

  const faces: Array<[number, string]> = [
    [1, `translateZ(${half}px)`],
    [6, `rotateY(180deg) translateZ(${half}px)`],
    [2, `rotateY(90deg) translateZ(${half}px)`],
    [5, `rotateY(-90deg) translateZ(${half}px)`],
    [3, `rotateX(90deg) translateZ(${half}px)`],
    [4, `rotateX(-90deg) translateZ(${half}px)`],
  ];

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: "relative",
      }}
    >
      {/* Outer glow */}
      <div
        className="absolute -inset-8 -z-10"
        style={{
          background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
        }}
      />

      {/* 3D scene */}
      <div
        ref={cubeRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: "rotateX(-20deg) rotateY(20deg)",
        }}
      >
        {faces.map(([faceNum, transform]) => (
          <CubeFace
            key={faceNum}
            faceNum={faceNum}
            isActive={face === faceNum}
            size={size}
            transform={transform}
            accent={accent}
            glow={glow}
            rolling={rolling}
            settled={settled}
          />
        ))}
      </div>
    </div>
  );
});

/**
 * CubeFace — a single face of the 3D cube with proper pip layout.
 */
function CubeFace({
  faceNum,
  isActive,
  size,
  transform,
  accent,
  glow,
}: {
  faceNum: number;
  isActive: boolean;
  size: number;
  transform: string;
  accent: string;
  glow: string;
  rolling: boolean;
  settled: boolean;
}) {
  const PIPS: Record<number, [number, number][]> = {
    1: [[1, 1]],
    2: [[0, 0], [2, 2]],
    3: [[0, 0], [1, 1], [2, 2]],
    4: [[0, 0], [2, 0], [0, 2], [2, 2]],
    5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]],
    6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]],
  };

  const pips = PIPS[faceNum] || [];

  return (
    <div
      style={{
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        transform,
        backfaceVisibility: "visible",
      }}
    >
      <div
        className="relative h-full w-full"
        style={{
          background: isActive
            ? `linear-gradient(135deg, ${accent}22 0%, #0a0a0a 50%, ${accent}11 100%)`
            : `linear-gradient(135deg, #1a0a00 0%, #0a0a0a 50%, #1a0a00 100%)`,
          border: `2px solid ${isActive ? accent : `${accent}60`}`,
          boxShadow: isActive
            ? `0 0 24px ${glow}, inset 0 0 24px ${glow}`
            : `inset 0 0 16px rgba(0,0,0,0.8)`,
          clipPath:
            "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
          transition: "background 0.1s, border-color 0.1s, box-shadow 0.1s",
          opacity: isActive ? 1 : 0.85,
        }}
      >
        {/* Inner frame */}
        <div
          className="absolute inset-2 border"
          style={{ borderColor: `${accent}40` }}
        />

        {/* Pip grid */}
        <div className="absolute inset-5 grid grid-cols-3 grid-rows-3 gap-1">
          {Array.from({ length: 9 }).map((_, idx) => {
            const col = idx % 3;
            const row = Math.floor(idx / 3);
            const hasPip = pips.some(([c, r]) => c === col && r === row);
            return (
              <div key={idx} className="flex items-center justify-center">
                {hasPip && (
                  <div
                    className="rounded-full"
                    style={{
                      width: "18px",
                      height: "18px",
                      background: isActive ? accent : `${accent}cc`,
                      boxShadow: isActive
                        ? `0 0 12px ${accent}, 0 0 20px ${glow}`
                        : `0 0 8px ${accent}80`,
                      transition: "background 0.1s, box-shadow 0.1s",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Face number badge (top-right corner) */}
        <div
          className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center border-2 bg-black font-sans text-base font-black"
          style={{
            borderColor: accent,
            color: accent,
            clipPath:
              "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
            boxShadow: `0 0 12px ${glow}`,
          }}
        >
          {faceNum}
        </div>

        {/* "TAUNGOO·ARCADE" wordmark at bottom */}
        <div className="absolute bottom-2 left-0 right-0 text-center font-mono text-[7px] uppercase tracking-[0.4em] text-muted-foreground/60">
          TAUNGOO·ARCADE
        </div>

        {/* Active face indicator */}
        {isActive && (
          <div
            className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full"
            style={{
              background: accent,
              boxShadow: `0 0 6px ${accent}`,
              animation: "pulse 1s ease-in-out infinite",
            }}
          />
        )}
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
  isReplay = false,
  lockedRoll,
}: {
  face: number;
  rate: number;
  label: string;
  onDismiss: () => void;
  isReplay?: boolean;
  lockedRoll?: number | null;
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

        {/* Replay badge — shows when this is a replay (discount already locked) */}
        {isReplay && (
          <div
            data-rl-line
            className="mt-2 inline-flex items-center gap-2 border border-[#FFD700] bg-[#FFD700]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFD700]"
            style={{
              clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
              boxShadow: "0 0 16px rgba(255,215,0,0.5)",
            }}
          >
            <span className="h-1.5 w-1.5 animate-pulse bg-[#FFD700]" />
            ▮ REPLAY · DISCOUNT LOCKED ◆
          </div>
        )}

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
              {isReplay ? (
                <>
                  ▸ <span className="text-[#FFD700]">REPLAY</span> — your dice rolled {face} ({percent}% extra).
                  <br />
                  ▸ Your discount stays locked to your first roll (<span className="text-[#FFD700]">#{lockedRoll}</span> = {Math.round(HAGGLE_DICE_TABLE[(lockedRoll ?? 1) - 1].rate * 100)}% extra).
                  <br />
                  ▸ You can replay the animation unlimited times — the discount never decreases.
                </>
              ) : (
                <>
                  ▸ This extra {percent}% stacks on top of your bulk-discount total.
                  <br />
                  ▸ Haggle discount is now locked to this roll — your basket has been updated.
                  <br />
                  ▸ You can replay the animation unlimited times — the discount never decreases.
                </>
              )}
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
