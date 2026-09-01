"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS } from "./beta-data";
import { SectionHeader } from "./SectionHeader";

export function Testimonials() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => setActive((prev) => (prev + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(interval);
  }, [paused]);

  const t = TESTIMONIALS[active];

  return (
    <section
      id="voices"
      aria-labelledby="voices-title"
      data-section="voices"
      className="relative px-[4%] py-16 md:py-24"
      style={{ background: "var(--beta-bg)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <SectionHeader
        index="08"
        eyebrow="VOICES"
        title="What clients say."
        align="center"
        className="mb-16"
        titleId="voices-title"
      />

      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        {/* Metric badge — gold accent, refined */}
        <motion.div
          key={`metric-${active}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2"
          style={{
            border: "1px solid var(--beta-accent)",
            borderRadius: "9999px",
            background: "rgba(212, 175, 55, 0.08)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--beta-accent)", boxShadow: "0 0 6px var(--beta-accent)" }}
          />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--beta-accent)" }}>
            {t.metric}
          </span>
        </motion.div>

        {/* Quote — large, centered, with amplified decorative quotation marks.
            Marks are oversized (text-[14rem] on desktop, text-7xl on mobile),
            ghosted at 8% opacity gold, and layered BEHIND the quote text so they
            read as a typographic backdrop rather than literal punctuation. */}
        <div className="relative max-w-4xl">
          {/* Decorative opening quote mark — oversized gold watermark */}
          <span
            className="absolute -left-6 -top-12 sm:-left-12 sm:-top-16 font-serif leading-none select-none pointer-events-none z-0"
            style={{
              color: "var(--beta-accent)",
              opacity: 0.08,
              fontSize: "clamp(7rem, 14vw, 14rem)",
              textShadow: "0 0 40px rgba(212, 175, 55, 0.25)",
            }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center relative z-10"
            >
              <p
                className="text-xl sm:text-3xl lg:text-4xl font-medium leading-relaxed"
                style={{ color: "var(--beta-fg-strong)", letterSpacing: "-0.01em" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
            </motion.blockquote>
          </AnimatePresence>

          {/* Closing quote mark — oversized gold watermark, mirrored position */}
          <span
            className="absolute -right-6 -bottom-12 sm:-right-12 sm:-bottom-16 font-serif leading-none select-none pointer-events-none z-0"
            style={{
              color: "var(--beta-accent)",
              opacity: 0.08,
              fontSize: "clamp(7rem, 14vw, 14rem)",
              textShadow: "0 0 40px rgba(212, 175, 55, 0.25)",
            }}
            aria-hidden="true"
          >
            &rdquo;
          </span>
        </div>

        {/* Author info — card-like with accent ring */}
        <motion.div
          key={`author-${active}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-12 flex items-center gap-4"
        >
          {/* Avatar with accent ring */}
          <div
            className="flex h-14 w-14 items-center justify-center font-sans text-lg font-bold"
            style={{
              background: `${t.accent}15`,
              color: t.accent,
              border: `2px solid ${t.accent}`,
              borderRadius: "9999px",
              boxShadow: `0 0 16px ${t.accent}30`,
            }}
          >
            {t.author.charAt(0)}
          </div>
          <div className="text-left">
            <div className="text-[16px] font-bold" style={{ color: "var(--beta-fg-strong)" }}>
              {t.author}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: "var(--beta-fg-muted)" }}>
              {t.role} · {t.company}
            </div>
          </div>
        </motion.div>

        {/* Navigation dots — refined pill style */}
        <div className="mt-10 flex items-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all duration-300"
              style={{
                width: i === active ? "32px" : "8px",
                height: "4px",
                borderRadius: "9999px",
                background: i === active ? "var(--beta-accent)" : "var(--beta-fg-subtle)",
                boxShadow: i === active ? "0 0 8px var(--beta-accent)" : "none",
              }}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: "var(--beta-fg-subtle)" }}>
          {String(active + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
}
