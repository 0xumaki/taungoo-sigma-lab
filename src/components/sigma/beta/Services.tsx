"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { toast } from "sonner";
import { SERVICES } from "./beta-data";
import { SectionHeader } from "./SectionHeader";
import { useBasketStore, parsePrice, formatMMK } from "@/lib/sigma/basket";
// Import the detail-page SERVICES (single source of truth for pricing) to build
// a slug → intlPrice lookup map for the LOCAL/INTL toggle.
import { SERVICES as DETAIL_SERVICES } from "@/app/services/[slug]/services-data";

// Build a slug → { starterLocal, starterIntl } map from the detail-page data.
// This keeps a SINGLE source of truth for pricing (no duplication).
const PRICE_MAP: Record<string, { local: string; intl: string }> = (() => {
  const map: Record<string, { local: string; intl: string }> = {};
  for (const s of DETAIL_SERVICES) {
    const starter = s.packages.find((p) => p.name === "STARTER");
    map[s.slug] = {
      local: starter ? `from ${starter.price}` : "custom",
      intl: starter && starter.intlPrice ? `from ${starter.intlPrice}` : "custom",
    };
  }
  return map;
})();

type CurrencyMode = "LOCAL" | "INTL";

const DOMAINS = [
  { name: "AI Systems", icon: "◐", cat: "AI", accent: "#00E5FF" },
  { name: "Design & Content", icon: "◆", cat: "DESIGN", accent: "#FFB300" },
  { name: "Full-Stack Engineering", icon: "▣", cat: "FULL-STACK", accent: "#FFB300" },
  { name: "Web3 Infrastructure", icon: "⬡", cat: "WEB3", accent: "#00FF94" },
];

export function Services() {
  // === TWO-LEVEL STATE MACHINE ===
  // Level 1: which sub-square (domain) is expanded
  const [openDomain, setOpenDomain] = React.useState<string | null>(null);
  // Level 2: which service row inside the expanded domain shows its pre-detail dossier
  const [openService, setOpenService] = React.useState<string | null>(null);
  // Transient "✓ ADDED" state on the dossier button that was just clicked
  const [addedSlug, setAddedSlug] = React.useState<string | null>(null);
  // Currency display mode: LOCAL (MMK) or INTL (USD) — per user request to show both rates
  const [currency, setCurrency] = React.useState<CurrencyMode>("LOCAL");

  // Helper: get the display price for a service based on the current currency mode
  const displayPrice = (svc: (typeof SERVICES)[number]) => {
    const p = PRICE_MAP[svc.slug];
    if (!p) return svc.price; // fallback to beta-data default
    return currency === "INTL" ? p.intl : p.local;
  };

  const addItem = useBasketStore((s) => s.addItem);
  const setOpen = useBasketStore((s) => s.setOpen);

  const toggleDomain = (cat: string) => {
    if (openDomain === cat) {
      setOpenDomain(null);
    } else {
      setOpenDomain(cat);
    }
    // switching/leaving a domain always resets the inner service level
    setOpenService(null);
  };

  const toggleService = (slug: string) => {
    setOpenService((prev) => (prev === slug ? null : slug));
  };

  const addToQuote = (svc: (typeof SERVICES)[number]) => {
    const price = parsePrice(svc.price);
    const alreadyIn = useBasketStore
      .getState()
      .items.some((i) => i.slug === svc.slug);

    if (alreadyIn) {
      // Honest feedback — the item is already in the basket
      toast(`${svc.name} is already in your basket`, {
        description: "Adjust quantities or remove items inside the basket.",
        action: { label: "VIEW BASKET", onClick: () => setOpen(true) },
      });
      setOpen(true);
      return;
    }

    addItem({
      slug: svc.slug,
      name: svc.name,
      type: "service",
      price,
      icon: svc.icon,
    });

    const count = useBasketStore.getState().items.length;

    // 1) Basket display — the modal opens so the click has a visible effect
    setOpen(true);
    // 2) Pop-up notification — confirms WHAT was added, price, and basket count
    toast.success(`▮ ${svc.name.toUpperCase()} — ADDED TO QUOTE`, {
      description: `${price === 0 ? "Custom pricing — negotiate with us" : `Starter from ${formatMMK(price)}`} · ${count} service${count === 1 ? "" : "s"} in basket`,
      action: { label: "VIEW BASKET", onClick: () => setOpen(true) },
    });

    // 3) Micro-feedback on the button itself — transient "✓ ADDED" state
    setAddedSlug(svc.slug);
    window.setTimeout(() => {
      setAddedSlug((cur) => (cur === svc.slug ? null : cur));
    }, 1600);
  };

  return (
    <section id="services" aria-labelledby="services-title" data-section="services" className="relative px-[4%] py-16 md:py-24" style={{ background: "var(--beta-bg)" }}>
      <SectionHeader
        index="02"
        eyebrow="SERVICES"
        title="What we offer."
        subtitle="27 services across 4 domains. Click a domain to reveal its services — click any service for pricing + details."
        className="mb-6"
        titleId="services-title"
        rightSlot={
          // Currency toggle — LOCAL (MMK) vs INTL (USD) per user request
          <div className="flex items-center gap-0 border font-mono text-[10px] uppercase tracking-[0.15em]" style={{ borderColor: "var(--beta-border)", borderRadius: "2px" }}>
            <button
              type="button"
              onClick={() => setCurrency("LOCAL")}
              aria-pressed={currency === "LOCAL"}
              className="px-3 py-1.5 transition-all"
              style={{
                background: currency === "LOCAL" ? "var(--beta-accent)" : "transparent",
                color: currency === "LOCAL" ? "#0a0a0a" : "var(--beta-fg-muted)",
                fontWeight: currency === "LOCAL" ? 700 : 400,
              }}
            >
              ◌ LOCAL · MMK
            </button>
            <button
              type="button"
              onClick={() => setCurrency("INTL")}
              aria-pressed={currency === "INTL"}
              className="px-3 py-1.5 transition-all"
              style={{
                background: currency === "INTL" ? "var(--beta-accent)" : "transparent",
                color: currency === "INTL" ? "#0a0a0a" : "var(--beta-fg-muted)",
                fontWeight: currency === "INTL" ? 700 : 400,
              }}
            >
              ◐ INTL · USD
            </button>
          </div>
        }
      />

      {/* Pricing warning — sits directly under the subtitle above the mother square */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 flex items-start gap-3 p-4" style={{ border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "2px", background: "rgba(212, 175, 55, 0.03)" }}>
        <span className="mt-0.5 shrink-0 text-sm" style={{ color: "var(--beta-accent)" }}>⚠</span>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] font-bold" style={{ color: "var(--beta-accent)" }}>REFERENCE PRICING ONLY</div>
          <div className="mt-1 text-[13px]" style={{ color: "var(--beta-fg-muted)" }}>All prices are indicative. Final quotes depend on scope and negotiation. <a href="#contact" style={{ color: "var(--beta-accent)" }} className="underline">Contact us →</a></div>
        </div>
      </motion.div>

      {/* MOTHER SQUARE — grand container holding all 4 sub-squares */}
      <div
        className="relative overflow-hidden"
        style={{
          border: "1px solid var(--beta-border)",
          borderRadius: "12px",
          background: "linear-gradient(135deg, rgba(212,175,55,0.03), rgba(255,255,255,0.01) 40%, transparent)",
          boxShadow: "0 0 60px rgba(212,175,55,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        {/* Mother square top/bottom accent lines */}
        <div className="absolute top-0 left-0 h-[3px] w-full" style={{ background: "linear-gradient(to right, var(--beta-accent), transparent 50%, var(--beta-accent), transparent)" }} />
        <div className="absolute bottom-0 left-0 h-[3px] w-full" style={{ background: "linear-gradient(to right, transparent, var(--beta-accent) 50%, transparent)" }} />
        {/* Mother square corner brackets */}
        <span className="absolute -left-px -top-px h-5 w-5" style={{ borderLeft: "2px solid var(--beta-accent)", borderTop: "2px solid var(--beta-accent)" }} />
        <span className="absolute -right-px -top-px h-5 w-5" style={{ borderRight: "2px solid var(--beta-accent)", borderTop: "2px solid var(--beta-accent)" }} />
        <span className="absolute -left-px -bottom-px h-5 w-5" style={{ borderLeft: "2px solid var(--beta-accent)", borderBottom: "2px solid var(--beta-accent)" }} />
        <span className="absolute -right-px -bottom-px h-5 w-5" style={{ borderRight: "2px solid var(--beta-accent)", borderBottom: "2px solid var(--beta-accent)" }} />

        {/* 2×2 GRID of sub-squares (desktop) / vertical stack (mobile).
            On mobile (< sm), sub-squares stack vertically for better UX. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "var(--beta-border)" }}>
          {DOMAINS.map((domain) => {
            const domainServices = SERVICES.filter((s) => s.cat === domain.cat);
            const isOpen = openDomain === domain.cat;
            const accent = domain.accent;

            return (
              <div
                key={domain.cat}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-label={`${domain.name} — ${isOpen ? "collapse" : "expand"} domain`}
                onClick={() => toggleDomain(domain.cat)}
                onKeyDown={(e) => {
                  // Only toggle when the square itself has focus —
                  // otherwise we'd swallow Enter/Space of inner service buttons.
                  if (e.target !== e.currentTarget) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleDomain(domain.cat);
                  }
                }}
                className="group relative cursor-pointer overflow-hidden text-left outline-none transition-shadow duration-300 focus-visible:shadow-[0_0_0_2px_rgba(212,175,55,0.6)] bs-domain-square"
                style={{ background: "var(--beta-bg)" }}
              >
                {/* STUNNING COVER — full-bleed background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                  <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 35%, ${accent}18, transparent 70%)` }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-bold select-none" style={{ fontSize: "clamp(5rem, 18vw, 8rem)", color: accent, opacity: isOpen ? 0.06 : 0.13, lineHeight: 1, transition: `opacity var(--dur-normal) var(--ease-out-expo)` }}>
                      {domain.icon}
                    </span>
                  </div>
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.2) 50%, transparent 100%)" }} />
                  <div className="absolute inset-0 opacity-30" style={{ background: "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(212,175,55,0.03) 4px, transparent 5px)" }} />
                </div>

                {/* Accent gradient on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${accent}15, transparent 60%)` }} />

                {/* Top accent strip */}
                <div className="absolute top-0 left-0 h-[2px] z-10 transition-all duration-500" style={{ background: `linear-gradient(to right, ${accent}, transparent)`, width: isOpen ? "100%" : "0%" }} />

                {/* CARD CONTENT */}
                <div className="relative z-10 p-5 lg:p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold uppercase tracking-tight leading-tight" style={{ color: isOpen ? accent : "var(--beta-fg-strong)" }}>{domain.name}</h3>
                      <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--beta-fg-subtle)" }}>{domainServices.length} SERVICES</span>
                    </div>
                    <span className="font-mono text-sm shrink-0 transition-transform duration-300" style={{ color: accent, transform: isOpen ? "rotate(90deg)" : "rotate(0)" }}>▸</span>
                  </div>

                  {/* LEVEL 1 EXPANSION — service ledger of this domain */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${accent}20` }}>
                          <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: "var(--beta-fg-subtle)" }}>
                            <span>SERVICE LEDGER</span>
                            <span>CLICK ROW FOR DOSSIER</span>
                          </div>

                          {domainServices.map((svc, si) => {
                            const svcOpen = openService === svc.slug;
                            return (
                              <div key={svc.slug} className="bs-svc-row" data-open={svcOpen ? "true" : "false"} style={{ borderBottom: "1px solid var(--beta-border)", cursor: "default" }}>
                                <span className="bs-svc-strip" />
                                {/* Service row header — a REAL button (sibling, never nested) */}
                                <button
                                  type="button"
                                  aria-expanded={svcOpen}
                                  aria-label={`${svc.name} — ${displayPrice(svc)}. ${svcOpen ? "Collapse" : "Expand"} dossier.`}
                                  title={`${svc.name} — ${displayPrice(svc)}`}
                                  onClick={(e) => {
                                    e.stopPropagation(); // don't toggle the parent domain square
                                    toggleService(svc.slug);
                                  }}
                                  className="bs-svc-head flex w-full items-center gap-2 px-4 py-3 text-left cursor-pointer"
                                >
                                  <span className="font-mono text-[10px] tabular-nums shrink-0 w-6" style={{ color: "var(--beta-fg-subtle)" }}>{String(si + 1).padStart(2, "0")}</span>
                                  {/* min-w-0 + truncate: long names like "HERMES / Openclaw / GrokBot"
                                      truncate gracefully at 390px instead of overflowing horizontally.
                                      title attr above surfaces the full name on hover. */}
                                  <span className="min-w-0 shrink truncate text-[14px] font-semibold tracking-tight transition-colors" style={{ color: svcOpen ? accent : "var(--beta-fg-strong)" }} title={svc.name}>{svc.name}</span>
                                  <span className="bs-svc-leader hidden sm:block" />
                                  <span className="min-w-0 shrink truncate font-mono text-[11px] tabular-nums" style={{ color: "var(--beta-fg-muted)" }} title={displayPrice(svc)}>{displayPrice(svc)}</span>
                                  <span className="font-mono text-[12px] shrink-0 transition-transform duration-300" style={{ color: accent, transform: svcOpen ? "rotate(90deg)" : "rotate(0)" }}>▸</span>
                                </button>

                                {/* LEVEL 2 EXPANSION — pre-detail dossier */}
                                <AnimatePresence initial={false}>
                                  {svcOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3, ease: "easeInOut" }}
                                      className="overflow-hidden"
                                      onClick={(e) => e.stopPropagation()} // dossier is a click shield — inner clicks never collapse the domain
                                    >
                                      <div className="relative" style={{ borderLeft: `2px solid ${accent}` }}>
                                        <div className="px-4 py-3 pl-5" style={{ background: `linear-gradient(135deg, ${accent}08, transparent 70%)` }}>
                                          {/* Dossier header — icon + name */}
                                          <div className="flex items-start gap-3">
                                            <span
                                              aria-hidden="true"
                                              className="flex h-8 w-8 shrink-0 items-center justify-center font-mono text-base"
                                              style={{ border: `1px solid ${accent}55`, color: accent, background: `${accent}0d` }}
                                            >
                                              {svc.icon}
                                            </span>
                                            <div className="min-w-0">
                                              <div className="font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: "var(--beta-fg-subtle)" }}>
                                                SERVICE DOSSIER · {String(si + 1).padStart(2, "0")}
                                              </div>
                                              <div className="text-[15px] font-bold tracking-tight" style={{ color: "var(--beta-fg-strong)" }}>{svc.name}</div>
                                            </div>
                                          </div>

                                          {/* Description */}
                                          <p className="mt-2.5 text-[12.5px] leading-relaxed" style={{ color: "var(--beta-fg-muted)" }}>{svc.desc}</p>

                                          {/* Pricing tiers */}
                                          <div className="mt-3 flex flex-wrap gap-1.5">
                                            <span className="px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]" style={{ border: `1px solid ${accent}30`, color: "var(--beta-fg-muted)", borderRadius: "2px" }}>STARTER · {displayPrice(svc)}</span>
                                            <span className="px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]" style={{ border: `1px solid ${accent}`, color: accent, borderRadius: "2px", background: `${accent}08` }}>PRO · 2× starter</span>
                                            <span className="px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]" style={{ border: "1px solid var(--beta-border)", color: "var(--beta-fg-muted)", borderRadius: "2px" }}>ENTERPRISE · custom</span>
                                          </div>

                                          {/* Actions — quick add to quote + full detail page */}
                                          <div className="mt-4 flex flex-wrap items-center gap-3">
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                addToQuote(svc);
                                              }}
                                              className="inline-flex cursor-pointer items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300 hover:brightness-125"
                                              style={{
                                                border: `1px solid ${addedSlug === svc.slug ? "#00FF94" : `${accent}66`}`,
                                                color: addedSlug === svc.slug ? "#00FF94" : accent,
                                                borderRadius: "2px",
                                                background: addedSlug === svc.slug ? "rgba(0,255,94,0.08)" : `${accent}0a`,
                                              }}
                                            >
                                              {addedSlug === svc.slug ? (
                                                <>
                                                  <span aria-hidden="true">✓</span> ADDED — IN BASKET
                                                </>
                                              ) : (
                                                <>
                                                  <span aria-hidden="true">+</span> ADD TO QUOTE
                                                </>
                                              )}
                                            </button>
                                            <Link
                                              href={`/services/${svc.slug}`}
                                              onClick={(e) => e.stopPropagation()}
                                              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-transform hover:translate-x-1"
                                              style={{ color: accent }}
                                            >
                                              View full dossier <span aria-hidden="true">→</span>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: `inset 0 0 0 1px ${accent}30, 0 8px 32px ${accent}10` }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Collapse all button */}
      {(openDomain || openService) && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              setOpenDomain(null);
              setOpenService(null);
            }}
            className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-[var(--beta-accent)]"
            style={{ color: "var(--beta-fg-subtle)" }}
          >
            ↑ COLLAPSE ALL
          </button>
        </div>
      )}
    </section>
  );
}
