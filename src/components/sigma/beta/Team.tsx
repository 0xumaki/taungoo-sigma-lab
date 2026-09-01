"use client";
import * as React from "react";
import { motion } from "motion/react";
import { TEAM } from "./beta-data";
import { SectionHeader } from "./SectionHeader";
import { useTilt3D } from "@/hooks/use-tilt-3d";

export function Team() {
  const [featured, ...rest] = TEAM;

  return (
    <section id="team" aria-labelledby="team-title" data-section="team" className="relative px-[4%] py-16 md:py-24" style={{ background: "var(--beta-bg)" }}>
      <SectionHeader
        index="07"
        eyebrow="TEAM"
        title="The collective."
        subtitle="8 operators. Zero egos. Handles instead of titles."
        titleId="team-title"
      />

      {/* ASYMMETRIC GRID — immersive overlay cards */}
      <div data-reveal-stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {/* FEATURED OPERATORS — 2 large cards spanning 2 cols */}
        <ImmersiveOperator member={TEAM[0]} index={0} variant="featured" className="col-span-2" />
        <ImmersiveOperator member={TEAM[1]} index={1} variant="featured" className="col-span-2" />
        {/* STANDARD OPERATORS */}
        {rest.map((member, i) => (
          <ImmersiveOperator key={member.name} member={member} index={i + 2} variant="standard" />
        ))}
        {/* BRAND IDENTITY CARD */}
        <BrandIdentityCard />
      </div>
    </section>
  );
}

/**
 * ImmersiveOperator — glyph fills card as "portrait", content overlays at bottom on gradient.
 * Matches the reference design pattern: image fills card, dark gradient overlay, content on gradient.
 */
function ImmersiveOperator({ member, index, variant, className = "" }: {
  member: typeof TEAM[0];
  index: number;
  variant: "featured" | "standard";
  className?: string;
}) {
  const isFeatured = variant === "featured";
  const minHeight = isFeatured ? "260px" : "240px";
  const glyphSize = isFeatured ? "6rem" : "3.5rem";
  const titleSize = isFeatured ? "text-xl lg:text-2xl" : "text-[13px]";
  const padding = isFeatured ? "p-5 lg:p-6" : "p-3 lg:p-4";
  // 3D tilt on hover — subtle (max 4deg), perspective 800px, smooth transition.
  // Hook internally disables itself for touch devices + prefers-reduced-motion.
  const tiltRef = useTilt3D<HTMLDivElement>(4);

  return (
    <div ref={tiltRef} className={`bs-team-card ${className}`} style={{ willChange: "transform" }}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative overflow-hidden"
      style={{
        border: "1px solid var(--beta-border)",
        borderRadius: "12px",
        background: "var(--beta-bg)",
        minHeight,
        transition: `border-color var(--dur-normal) var(--ease-out-expo), box-shadow var(--dur-normal) var(--ease-out-expo)`,
      }}
    >
      {/* GLYPH PORTRAIT — fills entire card as the "image" layer */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Background glow — radial accent */}
        <div
          className="absolute h-48 w-48 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${member.accent}30 0%, transparent 70%)` }}
        />
        {/* Hexagon frame — large, centered */}
        <svg
          viewBox="0 0 100 100"
          className="absolute opacity-15 group-hover:opacity-35 transition-opacity duration-500"
          style={{ width: isFeatured ? "70%" : "60%", height: isFeatured ? "70%" : "60%" }}
          aria-hidden="true"
        >
          <polygon
            points="50,5 90,27 90,73 50,95 10,73 10,27"
            fill="none"
            stroke={member.accent}
            strokeWidth="0.5"
            strokeDasharray="2 1.5"
          />
          <polygon
            points="50,15 82,32 82,68 50,85 18,68 18,32"
            fill="none"
            stroke={member.accent}
            strokeWidth="0.3"
            opacity="0.5"
          />
        </svg>
        {/* The glyph itself — large, centered, acts as the "portrait" */}
        <span
          className="relative font-bold transition-all duration-500 group-hover:scale-110"
          style={{
            fontSize: glyphSize,
            color: member.accent,
            textShadow: `0 0 40px ${member.accent}60, 0 0 20px ${member.accent}40`,
            lineHeight: 1,
            opacity: 0.7,
          }}
        >
          {member.glyph}
        </span>
      </div>

      {/* DARK GRADIENT OVERLAY — transparent top → solid bottom (key pattern) */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(5,5,8,0.98) 0%, rgba(5,5,8,0.92) 30%, rgba(5,5,8,0.4) 60%, transparent 100%)",
        }}
      />

      {/* ACCENT TINT on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${member.accent}10, transparent 60%)` }}
      />

      {/* TOP BADGE — CLR level (glassmorphism) */}
      <div className="relative z-10 p-3 lg:p-4">
        <span
          className="font-mono text-[9px] uppercase tracking-[0.1em] px-2 py-0.5"
          style={{
            color: member.accent,
            background: "rgba(5,5,8,0.6)",
            borderRadius: "9999px",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: `1px solid ${member.accent}40`,
          }}
        >
          CLR-{String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* BOTTOM CONTENT — overlaid on gradient */}
      <div className={`absolute bottom-0 left-0 right-0 z-10 ${padding}`}>
        {/* Call-sign label */}
        <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--beta-fg-subtle)" }}>
          CALL-SIGN
        </div>
        {/* Name */}
        <h3 className={`${titleSize} font-bold uppercase tracking-tight leading-tight`} style={{ color: "var(--beta-fg-strong)" }}>
          {member.name}
        </h3>
        {/* Underline divider — draws L→R on hover via CSS (bs-team-name-underline) */}
        <span
          className="bs-team-name-underline block h-px w-12 mt-1.5"
          style={{ background: member.accent, boxShadow: `0 0 6px ${member.accent}80` }}
          aria-hidden="true"
        />
        {/* Real name */}
        <p className="mt-0.5 text-[11px] italic" style={{ color: "var(--beta-fg-subtle)" }}>{member.realName}</p>
        {/* Role */}
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: member.accent }}>{member.role}</p>

        {/* Sigma strength bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[8px] uppercase tracking-[0.15em]" style={{ color: "var(--beta-fg-subtle)" }}>SIGMA</span>
            <span className="font-mono text-[8px] tabular-nums" style={{ color: member.accent }}>{(85 + index * 2).toFixed(0)}%</span>
          </div>
          <div className="h-[2px] w-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${85 + index * 2}%` }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 + 0.3, duration: 0.8, ease: "easeOut" }}
              className="h-full"
              style={{ background: member.accent, boxShadow: `0 0 6px ${member.accent}80` }}
            />
          </div>
        </div>

        {/* Skills — pill chips, glassmorphism */}
        <div className="mt-3 flex flex-wrap gap-1">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 font-mono text-[9px] font-medium"
              style={{
                border: `1px solid ${member.accent}25`,
                color: "var(--beta-fg-muted)",
                borderRadius: "9999px",
                background: "rgba(5,5,8,0.5)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
    </div>
  );
}

/** BrandIdentityCard — orbital Σ with glassmorphism */
function BrandIdentityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden"
      style={{
        border: "1px solid rgba(212, 175, 55, 0.3)",
        borderRadius: "12px",
        background: "linear-gradient(135deg, rgba(212, 175, 55, 0.05), rgba(212, 175, 55, 0.01))",
        minHeight: "240px",
      }}
    >
      {/* Dark gradient overlay for consistency */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(5,5,8,0.98) 0%, rgba(5,5,8,0.5) 50%, transparent 100%)",
        }}
      />

      {/* Orbital rings — animated */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          <svg viewBox="0 0 100 100" width="80" height="80" aria-hidden="true">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="1" strokeDasharray="2 4" />
            <circle cx="50" cy="6" r="2" fill="var(--beta-accent)" />
          </svg>
        </motion.div>
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
          <svg viewBox="0 0 100 100" width="64" height="64" aria-hidden="true">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(212, 175, 55, 0.1)" strokeWidth="1" strokeDasharray="4 2" />
            <circle cx="50" cy="6" r="1.5" fill="var(--beta-accent)" opacity="0.6" />
          </svg>
        </motion.div>
        {/* Center Σ */}
        <span
          className="absolute font-sans font-black"
          style={{ fontSize: "2.5rem", color: "var(--beta-accent)", lineHeight: 1, textShadow: "0 0 20px rgba(212,175,55,0.4)" }}
        >
          Σ
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: "var(--beta-accent)" }}>TAUNGOO Σ Lab</div>
        <div className="mt-2 space-y-0.5">
          <div className="font-mono text-[9px] tabular-nums" style={{ color: "var(--beta-fg-muted)" }}>8 OPERATORS</div>
          <div className="font-mono text-[9px] tabular-nums" style={{ color: "var(--beta-fg-muted)" }}>7+ YEARS AVG</div>
          <div className="font-mono text-[9px] tabular-nums" style={{ color: "var(--beta-fg-muted)" }}>EST. MMXVI</div>
        </div>
      </div>
    </motion.div>
  );
}
