"use client";
import * as React from "react";
import { motion } from "motion/react";
import { INSIGHTS_DATA } from "./beta-data";
import { SectionHeader } from "./SectionHeader";

export function Insights() {
  const featured = INSIGHTS_DATA[0];
  const archive = INSIGHTS_DATA.slice(1, 6);
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <section id="insights" aria-labelledby="insights-title" data-section="insights" className="relative px-[4%] py-16 md:py-24" style={{ background: "var(--beta-bg)" }}>
      <SectionHeader
        index="06"
        eyebrow="INSIGHTS"
        title="Research & writing."
        titleId="insights-title"
        rightSlot={
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] hidden md:inline-block" style={{ color: "var(--beta-fg-subtle)" }}>OPEN ACCESS · CC-BY-SA</span>
        }
      />

      {/* Featured */}
      <motion.a href={`/insights/${featured.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="group mb-8 grid grid-cols-1 overflow-hidden lg:grid-cols-[1.2fr_1fr]"
        style={{ border: "1px solid var(--beta-border)", borderRadius: "2px", background: "rgba(255,255,255,0.02)" }}>
        <div className="relative flex items-center justify-center" style={{ minHeight: "300px", background: "linear-gradient(135deg, rgba(255,255,255,0.03), transparent)" }}>
          <span className="font-mono font-bold opacity-5 select-none" style={{ fontSize: "8rem", color: "var(--beta-accent)" }}>{featured.tag}</span>
          <span className="absolute left-4 top-4 px-2.5 py-1 font-mono text-[10px] font-bold uppercase" style={{ background: "var(--beta-accent)", color: "#0a0a0a", borderRadius: "2px" }}>★ FEATURED</span>
        </div>
        <div className="flex flex-col justify-center p-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="px-2 py-0.5 font-mono text-[10px] font-medium uppercase" style={{ color: "var(--beta-accent)", border: "1px solid var(--beta-accent)", borderRadius: "2px" }}>{featured.tag}</span>
            <span className="font-mono text-[11px]" style={{ color: "var(--beta-fg-subtle)" }}>{featured.date} · {featured.readTime}</span>
          </div>
          <h3 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--beta-fg-strong)" }}>{featured.title}</h3>
          <p className="mt-4 text-[15px] italic" style={{ color: "var(--beta-fg-muted)" }}>{featured.desc}</p>
          <div className="mt-3 font-mono text-[11px]" style={{ color: "var(--beta-fg-subtle)" }}>AUTHORS: {featured.authors || "TSL Research Team"} · {featured.citations} CITATIONS</div>
          <div className="mt-6 flex items-center gap-2 font-mono text-[12px] uppercase" style={{ color: "var(--beta-accent)" }}>▸ READ ARTICLE <span className="transition-transform group-hover:translate-x-1">→</span></div>
        </div>
      </motion.a>

      {/* Archive */}
      <div className="flex flex-col">
        {archive.map((pub, i) => (
          <a key={i} href={`/insights/${pub.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
            className="group flex items-center gap-4 border-t py-5 transition-all" style={{ borderColor: "var(--beta-border)" }}>
            <span className="font-mono text-[12px] tabular-nums w-20 shrink-0" style={{ color: "var(--beta-fg-subtle)" }}>{pub.date}</span>
            <span className="px-2 py-0.5 font-mono text-[10px] font-medium uppercase shrink-0" style={{ color: "var(--beta-accent)", border: "1px solid var(--beta-border)", borderRadius: "2px" }}>{pub.tag}</span>
            <span className="flex-1 text-[15px] font-medium truncate transition-all" style={{ color: hovered === i ? "var(--beta-accent)" : "#FFFFFF", transform: hovered === i ? "translateX(8px)" : "translateX(0)" }}>{pub.title}</span>
            <span className="hidden font-mono text-[12px] sm:inline-block shrink-0" style={{ color: "var(--beta-fg-subtle)" }}>{pub.readTime}</span>
            <span className="font-sans text-base shrink-0 transition-transform" style={{ color: "var(--beta-accent)", transform: hovered === i ? "translateX(4px)" : "translateX(0)" }}>→</span>
          </a>
        ))}
      </div>
    </section>
  );
}
