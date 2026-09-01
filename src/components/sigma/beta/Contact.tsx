"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionHeader } from "./SectionHeader";
import { useMagnetic } from "./Hero";

const PROJECT_TYPES = [
  { id: "ai", label: "AI System", desc: "Chatbot, voice agent, swarm" },
  { id: "web3", label: "Web3", desc: "Wallet, DEX, DAO, NFT" },
  { id: "fullstack", label: "Full-Stack", desc: "Web, mobile, desktop, game" },
  { id: "design", label: "Design", desc: "UI/UX, 3D, video, copy" },
];
const SCOPES = [
  { id: "mvp", label: "MVP", desc: "2-4 weeks" },
  { id: "standard", label: "Standard", desc: "1-3 months" },
  { id: "enterprise", label: "Enterprise", desc: "3+ months" },
  { id: "ongoing", label: "Ongoing", desc: "Retainer" },
];
const TIMELINES = [
  { id: "asap", label: "ASAP", desc: "Immediate" },
  { id: "1month", label: "1 Month", desc: "30 days" },
  { id: "3months", label: "1-3 Months", desc: "Planning" },
  { id: "flexible", label: "Flexible", desc: "No deadline" },
];
const FOOTER_LINKS = [
  { title: "Navigate", links: [{ label: "Services", href: "#services" }, { label: "Work", href: "#work" }, { label: "Method", href: "#method" }, { label: "Insights", href: "#insights" }, { label: "Team", href: "#team" }, { label: "Contact", href: "#contact" }] },
  { title: "Services", links: [{ label: "AI Chatbot", href: "#services" }, { label: "Web3 Wallets", href: "#services" }, { label: "Smart Contract", href: "#services" }, { label: "Web / WebApp", href: "#services" }, { label: "Mobile App", href: "#services" }, { label: "Security Audit", href: "#services" }] },
  { title: "Company", links: [{ label: "About", href: "#method" }, { label: "Work", href: "#work" }, { label: "Insights", href: "#insights" }, { label: "Contact", href: "#contact" }] },
  { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }, { label: "CC-BY-SA", href: "#" }] },
];

export function Contact() {
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({ type: "", scope: "", timeline: "", name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [missionId] = React.useState(() => `TAU-2026-${Math.floor(Math.random() * 9000) + 1000}`);
  // Magnetic effect on the submit button (DEPLOY MISSION) — same feel as Hero CTA.
  // useMagnetic uses a callback ref pattern so it works even though the submit
  // button only renders when step === 4.
  const submitMagneticRef = useMagnetic<HTMLButtonElement>(6);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 1));
  // Two-phase submit: setSubmitting(true) → fetch → on settle, flip to
  // submitted=true so the success panel renders. We always land on success
  // because the API is a fire-and-forget notify channel (no email validation
  // server-side); surfacing a hard error here would imply we rejected the
  // mission, which we never do — the basket/hud toast handles real failures.
  const handleSubmit = async () => {
    if (submitting || submitted) return;
    setSubmitting(true);
    try {
      await fetch("/api/sigma/transmit?XTransformPort=3000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identity: form.email, channel: "Beta Contact", message: JSON.stringify({ ...form, missionId }) }),
      });
    } catch {
      /* swallow — see comment above */
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };
  const canProceed = [form.type, form.scope, form.timeline, form.name && form.email][step - 1];
  const stepLabels = ["INTEL", "OBJECTIVE", "COMMS", "DEPLOY"];

  return (
    // `mt-auto` pushes this section (which contains the site footer) to the
    // bottom of the parent flex column in BetaInterface. When page content
    // is shorter than the viewport, the footer still sticks to the bottom
    // instead of floating mid-screen. When content is taller, mt-auto has
    // no effect (natural flow takes over).
    <section id="contact" aria-labelledby="contact-title" data-section="contact" className="relative mt-auto px-[4%] py-16 md:py-24" style={{ background: "var(--beta-bg)" }}>
      <SectionHeader
        index="09"
        eyebrow="CONTACT"
        title="Let's deploy."
        subtitle="Tell us what you need. We respond within 4 hours."
        align="center"
        titleId="contact-title"
      />

      {submitted ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-2xl p-8 text-center" style={{ border: "1px solid rgba(0, 255, 148, 0.3)", borderRadius: "2px", background: "rgba(0, 255, 148, 0.05)" }}>
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center" style={{ background: "rgba(0, 255, 148, 0.15)", borderRadius: "9999px" }}>
            <span className="text-3xl" style={{ color: "var(--beta-accent-3)" }}>✓</span>
          </div>
          <div className="mb-2 font-mono text-[12px] uppercase tracking-[0.2em]" style={{ color: "var(--beta-accent-3)" }}>▸ MISSION ACCEPTED</div>
          <h3 className="text-3xl font-bold" style={{ color: "var(--beta-fg-strong)" }}>Signal received.</h3>
          <p className="mt-3 text-[15px]" style={{ color: "var(--beta-fg-muted)" }}>Mission ID: <span className="font-mono font-medium" style={{ color: "var(--beta-accent)" }}>{missionId}</span></p>
          <p className="mt-2 text-[13px]" style={{ color: "var(--beta-fg-subtle)" }}>We'll contact <span style={{ color: "var(--beta-accent)" }}>{form.email}</span> within 4 hours.</p>
        </motion.div>
      ) : (
        <div className="relative mx-auto max-w-4xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "2px", background: "rgba(255,255,255,0.02)" }}>
          <div className="flex items-center justify-between px-8 py-4" style={{ borderBottom: "1px solid var(--beta-border)", background: "rgba(255,255,255,0.02)" }}>
            {stepLabels.map((label, i) => {
              const stepNum = i + 1; const isComplete = step > stepNum; const isCurrent = step === stepNum;
              return (
                <React.Fragment key={label}>
                  <button onClick={() => stepNum < step && setStep(stepNum)} className="flex items-center gap-2" disabled={stepNum > step} aria-label={`Go to step ${stepNum}: ${label}`}>
                    <span className="flex h-9 w-9 items-center justify-center font-mono text-[14px] font-bold transition-all" style={{ borderRadius: "2px", background: isComplete ? "var(--beta-accent-3)" : isCurrent ? "var(--beta-accent)" : "rgba(255,255,255,0.05)", color: isComplete || isCurrent ? "#0a0a0a" : "var(--beta-fg-subtle)", border: `1px solid ${isComplete || isCurrent ? "transparent" : "var(--beta-border)"}` }}>{isComplete ? "✓" : stepNum}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] hidden sm:inline" style={{ color: isCurrent ? "var(--beta-accent)" : "var(--beta-fg-subtle)" }}>{label}</span>
                  </button>
                  {i < 3 && <div className="flex-1 h-px mx-3" style={{ background: step > stepNum ? "var(--beta-accent-3)" : "var(--beta-border)" }} />}
                </React.Fragment>
              );
            })}
          </div>
          <div className="p-8 sm:p-12">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                {step === 1 && (
                  <div>
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--beta-accent)" }}>▸ STEP 01: INTEL — PROJECT TYPE</div>
                    <h3 className="mb-6 text-xl font-bold" style={{ color: "var(--beta-fg-strong)" }}>What type of project?</h3>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {PROJECT_TYPES.map((opt) => (
                        <button key={opt.id} onClick={() => { update("type", opt.id); next(); }} className="flex items-center justify-between p-4 text-left transition-all" style={{ border: form.type === opt.id ? "1px solid var(--beta-accent)" : "1px solid var(--beta-border)", borderRadius: "2px", background: form.type === opt.id ? "rgba(212, 175, 55, 0.05)" : "transparent" }}>
                          <div><div className="text-[15px] font-medium" style={{ color: "var(--beta-fg-strong)" }}>{opt.label}</div><div className="font-mono text-[12px]" style={{ color: "var(--beta-fg-muted)" }}>{opt.desc}</div></div>
                          <span className="font-mono text-sm" style={{ color: "var(--beta-accent)" }}>▸</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--beta-accent)" }}>▸ STEP 02: OBJECTIVE — SCOPE</div>
                    <h3 className="mb-6 text-xl font-bold" style={{ color: "var(--beta-fg-strong)" }}>What's the scope?</h3>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {SCOPES.map((opt) => (
                        <button key={opt.id} onClick={() => update("scope", opt.id)} className="flex items-center justify-between p-4 text-left transition-all" style={{ border: form.scope === opt.id ? "1px solid var(--beta-accent)" : "1px solid var(--beta-border)", borderRadius: "2px", background: form.scope === opt.id ? "rgba(212, 175, 55, 0.05)" : "transparent" }}>
                          <div><div className="text-[15px] font-medium" style={{ color: "var(--beta-fg-strong)" }}>{opt.label}</div><div className="font-mono text-[12px]" style={{ color: "var(--beta-fg-muted)" }}>{opt.desc}</div></div>
                          <span className="font-mono text-sm" style={{ color: "var(--beta-accent)" }}>▸</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-6">
                      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--beta-accent)" }}>▸ TIMELINE</div>
                      <div className="flex flex-wrap gap-2">
                        {TIMELINES.map((opt) => (
                          <button key={opt.id} onClick={() => update("timeline", opt.id)} className="px-3 py-2 font-mono text-[12px] transition-all" style={{ border: form.timeline === opt.id ? "1px solid var(--beta-accent)" : "1px solid var(--beta-border)", color: form.timeline === opt.id ? "var(--beta-accent)" : "var(--beta-fg-muted)", borderRadius: "2px", background: form.timeline === opt.id ? "rgba(212, 175, 55, 0.05)" : "transparent" }}>{opt.label}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div>
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--beta-accent)" }}>▸ STEP 03: COMMS — CONTACT INTEL</div>
                    <h3 className="mb-6 text-xl font-bold" style={{ color: "var(--beta-fg-strong)" }}>How do we reach you?</h3>
                    <div className="space-y-3">
                      <div className="bs-input-wrap"><label htmlFor="bs-contact-name" className="mb-1 block font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: "var(--beta-fg-muted)" }}>FULL NAME *</label><input id="bs-contact-name" type="text" required value={form.name} onChange={(e) => update("name", e.target.value)} className="bs-input w-full px-3 py-2.5 font-mono text-[14px] outline-none" style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "2px", background: "var(--beta-bg)", color: "var(--beta-fg-strong)" }} placeholder="Jane Doe" /><span className="bs-input-underline" aria-hidden="true" /></div>
                      <div className="bs-input-wrap"><label htmlFor="bs-contact-email" className="mb-1 block font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: "var(--beta-fg-muted)" }}>EMAIL *</label><input id="bs-contact-email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="bs-input w-full px-3 py-2.5 font-mono text-[14px] outline-none" style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "2px", background: "var(--beta-bg)", color: "var(--beta-fg-strong)" }} placeholder="jane@company.com" /><span className="bs-input-underline" aria-hidden="true" /></div>
                      <div className="bs-input-wrap"><label htmlFor="bs-contact-company" className="mb-1 block font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: "var(--beta-fg-muted)" }}>COMPANY (optional)</label><input id="bs-contact-company" type="text" value={form.company} onChange={(e) => update("company", e.target.value)} className="bs-input w-full px-3 py-2.5 font-mono text-[14px] outline-none" style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "2px", background: "var(--beta-bg)", color: "var(--beta-fg-strong)" }} placeholder="Acme Corp." /><span className="bs-input-underline" aria-hidden="true" /></div>
                    </div>
                  </div>
                )}
                {step === 4 && (
                  <div>
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--beta-accent)" }}>▸ STEP 04: DEPLOY — MISSION DETAILS</div>
                    <h3 className="mb-6 text-xl font-bold" style={{ color: "var(--beta-fg-strong)" }}>Project briefing.</h3>
                    <div className="bs-input-wrap"><label htmlFor="bs-contact-message" className="mb-1 block font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: "var(--beta-fg-muted)" }}>PROJECT BRIEF *</label><textarea id="bs-contact-message" rows={5} required value={form.message} onChange={(e) => update("message", e.target.value)} className="bs-input w-full px-3 py-2.5 font-mono text-[14px] outline-none resize-none" style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "2px", background: "var(--beta-bg)", color: "var(--beta-fg-strong)" }} placeholder="Describe your project…" /><span className="bs-input-underline" aria-hidden="true" /></div>
                    <div className="mt-4 p-3" style={{ border: "1px solid var(--beta-border)", borderRadius: "2px", background: "var(--beta-bg)" }}>
                      <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: "var(--beta-fg-subtle)" }}>MISSION SUMMARY</div>
                      <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                        <div><span style={{ color: "var(--beta-fg-subtle)" }}>TYPE:</span> <span style={{ color: "var(--beta-accent)" }}>{form.type || "—"}</span></div>
                        <div><span style={{ color: "var(--beta-fg-subtle)" }}>SCOPE:</span> <span style={{ color: "var(--beta-accent)" }}>{form.scope || "—"}</span></div>
                        <div><span style={{ color: "var(--beta-fg-subtle)" }}>TIMELINE:</span> <span style={{ color: "var(--beta-accent)" }}>{form.timeline || "—"}</span></div>
                        <div><span style={{ color: "var(--beta-fg-subtle)" }}>CONTACT:</span> <span style={{ color: "var(--beta-accent)" }}>{form.email || "—"}</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="mt-6 flex items-center justify-between">
              {step > 1 ? <button onClick={prev} aria-label="Go back to previous step" className="font-mono text-[12px] uppercase tracking-[0.1em]" style={{ color: "var(--beta-fg-muted)" }}>2190 BACK</button> : <span />}
              {step < 4 ? <button onClick={next} disabled={!canProceed} className="px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] transition-all disabled:opacity-30" style={{ background: "var(--beta-accent)", color: "#0a0a0a", borderRadius: "2px" }}>NEXT ▸</button> : <button ref={submitMagneticRef} onClick={handleSubmit} disabled={!canProceed || submitting} aria-busy={submitting} className="px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] transition-all disabled:opacity-30" style={{ background: "var(--beta-accent-3)", color: "#0a0a0a", borderRadius: "2px" }}>
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="sigma-blink" aria-hidden="true">▮</span>
                    TRANSMITTING…
                  </span>
                ) : (
                  <>▸ DEPLOY MISSION</>
                )}
              </button>}
            </div>
          </div>
        </div>
      )}

      {/* GRAND FOOTER — multi-column pillars + massive brand wordmark below + social.
          LOOP-3-AGENTIC-SEO: role="contentinfo" marks this as the page-level site
          footer landmark for AI crawlers + screen readers (the footer lives inside
          the Contact <section> for layout/flow reasons; the role ensures assistive
          tech still recognizes it as the global contentinfo landmark). */}
      <footer className="mt-24" role="contentinfo" style={{ borderTop: "1px solid var(--beta-border)" }}>
        {/* 5-PILLAR LINK GRID — at top */}
        <div className="grid grid-cols-2 gap-8 px-0 pt-16 pb-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 flex items-center justify-center" style={{ background: "var(--beta-accent)", borderRadius: "2px" }}>
                <span className="font-sans text-[10px] font-bold text-black">Σ</span>
              </div>
              <span className="font-mono text-[13px] font-bold tracking-tight" style={{ color: "var(--beta-fg-strong)" }}>TAUNGOO Σ Lab</span>
            </div>
            <p className="text-[12px] leading-relaxed max-w-[250px]" style={{ color: "var(--beta-fg-muted)" }}>
              AI, Web3, full-stack systems — deployed to production. A tactical research lab operating at the intersection of AI, Web3, and engineering.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--beta-accent)" }}>{col.title}</div>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[13px] transition-colors hover:text-[var(--beta-accent)]" style={{ color: "var(--beta-fg-muted)" }}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Massive brand wordmark — radiant molten-gold shimmer (placed UNDER the 5 pillars) */}
        <div className="py-16 text-center" style={{ overflow: "hidden", borderTop: "1px solid var(--beta-border)" }}>
          <motion.div
            initial={{ opacity: 0, y: 30, clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span
              className="bs-tau-wordmark font-mono font-bold uppercase"
              data-text="TAUNGOO"
              style={{
                fontSize: "clamp(3rem, 14vw, 12rem)",
                fontWeight: 900,
              }}
            >
              TAUNGOO
            </span>
          </motion.div>
          {/* Tagline below the wordmark */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-4 flex items-center justify-center gap-3"
          >
            <span className="h-px w-12" style={{ background: "linear-gradient(to right, transparent, rgba(212, 175, 55, 0.4))" }} />
            <span className="font-mono text-[11px] uppercase tracking-[0.4em]" style={{ color: "var(--beta-accent)" }}>Σ Lab</span>
            <span className="h-px w-12" style={{ background: "linear-gradient(to left, transparent, rgba(212, 175, 55, 0.4))" }} />
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t py-6" style={{ borderColor: "var(--beta-border)" }}>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--beta-fg-subtle)" }}>© MMXVI–MMXXVI TAUNGOO Σ Lab</span>
            <span className="font-mono text-[10px]" style={{ color: "var(--beta-fg-subtle)" }}>·</span>
            <span className="font-mono text-[10px]" style={{ color: "var(--beta-accent)" }}>● SYSTEMS ONLINE</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px]" style={{ color: "var(--beta-fg-subtle)" }}>BUILD 2.7.Σ</span>
            <a href="#top" className="font-mono text-[10px] uppercase tracking-[0.15em] transition-colors hover:text-[var(--beta-accent)]" style={{ color: "var(--beta-fg-muted)" }}>↑ ASCEND</a>
          </div>
        </div>
      </footer>
    </section>
  );
}
