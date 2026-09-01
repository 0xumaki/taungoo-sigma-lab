"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AlphaNav } from "@/components/sigma/alpha/AlphaNav";
import { AlphaFooter } from "@/components/sigma/alpha/AlphaFooter";
import { ADDONS, SERVICE_PRICES, ServiceBasket } from "@/components/sigma/alpha/ServiceBasket";
import { useBasketStore, parsePrice, formatMMK } from "@/lib/sigma/basket";
import { SERVICE_ADDONS, type AddOn } from "@/lib/sigma/addons-data";
import { toast } from "sonner";
import { Plus, Check } from "lucide-react";
import { usePageReveal } from "@/lib/sigma/use-page-reveal";
import { ContactFormModal } from "@/components/sigma/shared/ContactFormModal";
import { SigmaHaggle } from "@/components/sigma/shared/SigmaHaggle";
// LOOP-3-AGENTIC-SEO: data + types extracted to services-data.ts (server-safe)
// so the parent page.tsx server component can import them for generateMetadata
// + JSON-LD without duplicating the 27-service dataset.
import { SERVICES, type CurrencyMode } from "./services-data";

export function ServiceDetailView() {
  const params = useParams();
  const slug = params.slug as string;
  const service = SERVICES.find((s) => s.slug === slug);
  // Trigger the page reveal animation (panels retract) when this detail page mounts
  usePageReveal();
  const [contactOpen, setContactOpen] = React.useState(false);
  // Currency toggle: LOCAL (MMK) for domestic clients, INTL (USD) for international clients.
  // In INTL mode, the basket is bypassed — international orders go through the contact form
  // (USD invoicing, custom onboarding). The basket remains MMK-only.
  const [currencyMode, setCurrencyMode] = React.useState<CurrencyMode>("LOCAL");
  const isIntl = currencyMode === "INTL";
  const displayPrice = (pkg: { price: string; intlPrice?: string }) =>
    isIntl ? pkg.intlPrice ?? pkg.price : pkg.price;

  if (!service) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6">
        <AlphaNav />
        <main id="main-content" data-section="main" className="mx-auto mt-12 max-w-2xl text-center sm:mt-20">
          <h1 className="font-sans text-3xl font-black uppercase sm:text-4xl">SERVICE NOT FOUND</h1>
          <Link href="/#services" className="mt-4 inline-block border border-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] sm:text-[10px]">← BACK TO SERVICES</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AlphaNav />
      {/* LOOP-3-AGENTIC-SEO: <main> wraps the page's primary content (header
          through CTA) — provides the single per-page main landmark that
          Lighthouse SEO + AI crawlers + screen readers expect. AlphaNav (site
          header) + AlphaFooter (page-level contentinfo footer) stay outside
          <main> as site chrome. id="main-content" matches the skip-link target
          pattern from the homepage. data-section="main" + data-mode="alpha"
          enable AI agent identification of the primary content region. */}
      <main id="main-content" data-section="main" data-mode="alpha">
      <section className="px-3 pt-20 pb-8 sm:px-6 sm:pt-24">
        <div className="mx-auto w-full max-w-[1600px]">
          <Link href="/#services" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground sm:text-[10px]">← ALL SERVICES</Link>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="font-sans text-5xl font-black text-[#FF4500] sm:text-6xl">{service.icon}</span>
            <div>
              <h1 className="font-sans text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-6xl">{service.name}</h1>
              <p className="mt-1 font-serif text-base italic text-muted-foreground sm:text-lg">{service.tagline}</p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">{service.description}</p>
        </div>
      </section>
      <section className="px-3 py-8 sm:px-6">
        <div className="mx-auto w-full max-w-[1600px]">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:text-[10px]">▸ WHAT'S INCLUDED</h2>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {service.features.map((f) => (
              <div key={f} className="flex items-center gap-2 border border-border/60 p-2 sm:p-2">
                <span className="text-[#00FF94]">▸</span>
                <span className="font-mono text-xs text-foreground/80 sm:text-xs">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-3 py-8 sm:px-6">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:text-[10px]">▸ PRICING — ADD ANY PACKAGE TO BASKET</h2>
              <p className="mt-1 font-serif text-sm italic text-muted-foreground sm:text-sm">Each package is a standalone main service. Add multiple packages to qualify for bulk discounts.</p>
              {/* Reference pricing warning */}
              <div
                className="mt-3 flex items-start gap-2 border border-[#FFB300]/40 bg-[#FFB300]/10 p-2.5"
                style={{
                  clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                }}
                role="note"
                aria-label="Reference pricing notice"
              >
                <span className="mt-0.5 shrink-0 text-[#FFB300]">⚠</span>
                <div className="min-w-0">
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#FFB300] sm:text-[9px]">
                    ▸ REFERENCE PRICING ONLY
                  </div>
                  <div className="mt-0.5 font-sans text-[11px] leading-snug text-muted-foreground sm:text-xs">
                    These prices are indicative reference points and do not reflect final pricing. Final quotes depend on scope, complexity, and negotiation. <span className="text-foreground">Contact our team to discuss your specific requirements.</span>
                  </div>
                </div>
              </div>
            </div>
            {/* CURRENCY TOGGLE — LOCAL (MMK) ↔ INTERNATIONAL (USD) */}
            <div className="flex items-center gap-2">
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline sm:text-[9px]">▸ CURRENCY</span>
              <div className="flex border border-foreground/60" role="group" aria-label="Pricing currency">
                <button
                  type="button"
                  onClick={() => setCurrencyMode("LOCAL")}
                  aria-pressed={currencyMode === "LOCAL"}
                  className={`flex items-center gap-1.5 border-r border-foreground/60 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all sm:text-[10px] ${
                    currencyMode === "LOCAL"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 ${currencyMode === "LOCAL" ? "bg-[#00FF94]" : "bg-foreground/40"}`} />
                  LOCAL · MMK
                </button>
                <button
                  type="button"
                  onClick={() => setCurrencyMode("INTL")}
                  aria-pressed={currencyMode === "INTL"}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all sm:text-[10px] ${
                    currencyMode === "INTL"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 ${currencyMode === "INTL" ? "bg-[#FF4500]" : "bg-foreground/40"}`} />
                  INTL · USD
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {service.packages.map((pkg) => (
              <div key={pkg.name} className={`relative flex flex-col border p-4 transition-all ${pkg.popular ? "border-[#FF4500] bg-[#FF4500]/5" : "border-border hover:border-foreground/40"}`} style={pkg.popular ? { boxShadow: "0 0 0 1px #FF4500" } : undefined}>
                {pkg.popular && <div className="mb-2 inline-block self-start bg-[#FF4500] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white sm:text-[9px]">MOST POPULAR</div>}
                <h3 className="font-sans text-lg font-bold uppercase sm:text-xl">{pkg.name}</h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <div className="font-sans text-2xl font-black sm:text-3xl">{displayPrice(pkg)}</div>
                  {isIntl && pkg.marketPrice && pkg.intlPrice && pkg.intlPrice !== "custom" && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground line-through sm:text-[9px]">{pkg.marketPrice}</span>
                  )}
                </div>
                {isIntl && pkg.marketPrice && pkg.intlPrice && pkg.intlPrice !== "custom" && (
                  <div className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-[#00FF94]">▾ BELOW MARKET AVG</div>
                )}
                <div className="mt-3 flex-1 space-y-1">
                  {pkg.features.map((f) => (
                    <div key={f} className="flex items-start gap-1.5">
                      <span className="text-[#00FF94]">✓</span>
                      <span className="font-mono text-[10px] leading-snug text-foreground/80 sm:text-[10px]">{f}</span>
                    </div>
                  ))}
                </div>
                <PackageAddButton
                  slug={`${service.slug}-${pkg.name.toLowerCase()}`}
                  name={`${service.name} — ${pkg.name}`}
                  icon={service.icon}
                  price={pkg.price}
                  intlPrice={pkg.intlPrice}
                  currencyMode={currencyMode}
                  popular={pkg.popular}
                  onRequestQuote={() => setContactOpen(true)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-3 py-8 sm:px-6">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:text-[10px]">▸ COMPARISON</h2>
            {/* Active currency indicator — reflects pricing toggle above */}
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[9px]">
              <span className="text-muted-foreground/70">CURRENCY:</span>
              <span className={`border px-1.5 py-0.5 ${isIntl ? "border-[#FF4500] text-[#FF4500]" : "border-[#00FF94] text-[#00FF94]"}`}>
                {isIntl ? "USD" : "MMK"}
              </span>
            </span>
          </div>
          <div className="mt-4 overflow-x-auto sigma-scroll-hidden">
            <table className="w-full min-w-[480px] border border-border">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="p-2 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:p-3 sm:text-[10px]">Feature</th>
                  <th className="p-2 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:p-3 sm:text-[10px]">STARTER</th>
                  <th className="p-2 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF4500] sm:p-3 sm:text-[10px]">PRO</th>
                  <th className="p-2 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:p-3 sm:text-[10px]">ENTERPRISE</th>
                </tr>
              </thead>
              <tbody>
                {service.comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-card/30" : ""}>
                    <td className="p-2 font-mono text-[11px] text-foreground/80 sm:p-3 sm:text-xs">{row.feature}</td>
                    <td className="p-2 font-mono text-[11px] text-muted-foreground sm:p-3 sm:text-xs">{row.starter}</td>
                    <td className="p-2 font-mono text-[11px] text-foreground sm:p-3 sm:text-xs">{row.pro}</td>
                    <td className="p-2 font-mono text-[11px] text-muted-foreground sm:p-3 sm:text-xs">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ADD-ONS & EXTRAS — researched upsell add-ons for this specific service */}
      {SERVICE_ADDONS[service.slug] && SERVICE_ADDONS[service.slug].length > 0 && (
        <section className="border-t border-border px-3 py-8 sm:px-6">
          <div className="mx-auto w-full max-w-[1600px]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00FF94] sm:text-[10px]">▸ ADD-ONS &amp; EXTRAS</h2>
                <p className="mt-1 font-serif text-sm italic text-muted-foreground sm:text-sm">Enhance {service.name} with these researched add-ons. Add-on prices are not discounted.</p>
              </div>
              <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block sm:text-[9px]">
                <span className="text-[#00FF94]">{SERVICE_ADDONS[service.slug].length}</span> ADD-ONS
              </span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_ADDONS[service.slug].map((addon) => (
                <AddOnCard key={addon.id} addon={addon} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMPATIBLE SERVICES — other main services that pair well */}
      {ADDONS[service.slug] && ADDONS[service.slug].length > 0 && (
        <section className="border-t border-border px-3 py-8 sm:px-6">
          <div className="mx-auto w-full max-w-[1600px]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500] sm:text-[10px]">▸ COMPATIBLE SERVICES</h2>
                <p className="mt-1 font-serif text-sm italic text-muted-foreground sm:text-sm">Other main services that pair perfectly with {service.name}. Add them to qualify for bulk discounts.</p>
              </div>
              <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block sm:text-[9px]">
                <span className="text-[#FF4500]">{ADDONS[service.slug].length}</span> COMPATIBLE
              </span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {ADDONS[service.slug].map((cs) => (
                <CompatibleServiceCard key={cs.slug} cs={cs} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-border px-3 py-12 text-center sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-sans text-2xl font-black uppercase tracking-tight sm:text-3xl">NOT SURE WHICH PACKAGE?</h2>
          <p className="mt-2 font-serif text-sm italic text-muted-foreground sm:text-base">Contact our team — we'll help you choose the right plan for your needs.</p>
          <button onClick={() => setContactOpen(true)} className="mt-6 inline-block border border-foreground bg-foreground px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80 sm:px-8 sm:text-[11px]">CONTACT OUR TEAM →</button>
        </div>
      </section>
      </main>
      <AlphaFooter />
      <ServiceBasket />
      <ContactFormModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <SigmaHaggle />
    </div>
  );
}

// Add-to-basket button for the main service
function AddToBasketButton({ slug, name, icon, price }: { slug: string; name: string; icon: string; price: string }) {
  const { items, addItem } = useBasketStore();
  const inBasket = items.some((i) => i.slug === slug);
  const priceNum = parsePrice(price);

  const handleAdd = () => {
    addItem({ slug, name, type: "service", price: priceNum, icon });
    toast.success(`▮ ${name} ADDED TO BASKET`);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={inBasket}
      className={`flex items-center gap-2 border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] transition-all ${
        inBasket
          ? "border-[#00FF94] bg-[#00FF94]/10 text-[#00FF94]"
          : "border-[#FF4500] bg-[#FF4500] text-black hover:opacity-80"
      }`}
    >
      {inBasket ? (
        <>
          <Check className="h-3.5 w-3.5" /> IN BASKET
        </>
      ) : (
        <>
          <Plus className="h-3.5 w-3.5" /> ADD TO BASKET
        </>
      )}
    </button>
  );
}

// Per-package add-to-basket button — each of STARTER/PRO/ENTERPRISE can be added individually.
// Adding STARTER of AI Chatbot + ENTERPRISE of Voice AI = 2 main services = 7% discount.
//
// Currency mode behavior:
//   - LOCAL  → adds the LOCAL (MMK) price to the basket. Basket is MMK-only.
//   - INTL   → international orders are not self-serve (USD invoicing, custom onboarding).
//              The button becomes "REQUEST QUOTE" and opens the contact modal.
function PackageAddButton({
  slug,
  name,
  icon,
  price,
  intlPrice,
  currencyMode,
  popular,
  onRequestQuote,
}: {
  slug: string;
  name: string;
  icon: string;
  price: string;
  intlPrice?: string;
  currencyMode: CurrencyMode;
  popular?: boolean;
  onRequestQuote: () => void;
}) {
  const { items, addItem } = useBasketStore();
  const inBasket = items.some((i) => i.slug === slug);
  const priceNum = parsePrice(price);
  const isCustom = price === "custom";
  // In INTL mode, the displayed intlPrice (if it's "custom" or absent) also routes to quote
  const isIntlCustom = currencyMode === "INTL" && (!intlPrice || intlPrice === "custom");
  const routeToQuote = isCustom || isIntlCustom || currencyMode === "INTL";

  const handleAdd = () => {
    if (routeToQuote) {
      if (currencyMode === "INTL") {
        toast.info("▮ INTERNATIONAL USD — REQUEST A QUOTE");
      } else if (isCustom) {
        toast.info("▮ CUSTOM PRICING — CONTACT OUR TEAM");
      }
      onRequestQuote();
      return;
    }
    addItem({ slug, name, type: "service", price: priceNum, icon });
    toast.success(`▮ ${name} ADDED TO BASKET`);
  };

  const buttonLabel = inBasket
    ? "IN BASKET"
    : currencyMode === "INTL"
      ? "REQUEST QUOTE"
      : isCustom
        ? "REQUEST QUOTE"
        : "ADD TO BASKET";

  return (
    <button
      onClick={handleAdd}
      disabled={inBasket}
      className={`mt-4 flex w-full items-center justify-center gap-2 border py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all ${
        inBasket
          ? "border-[#00FF94] bg-[#00FF94]/10 text-[#00FF94]"
          : currencyMode === "INTL"
            ? "border-foreground/60 text-foreground hover:border-[#FF4500] hover:text-[#FF4500]"
            : popular
              ? "border-[#FF4500] bg-[#FF4500] text-black hover:opacity-80"
              : "border-foreground/60 text-foreground hover:border-[#FF4500] hover:text-[#FF4500]"
      }`}
    >
      {inBasket ? (
        <>
          <Check className="h-3 w-3" /> IN BASKET
        </>
      ) : (
        <>
          <Plus className="h-3 w-3" /> {buttonLabel}
        </>
      )}
    </button>
  );
}

// Add-on card for real add-ons (extra screens, E2E testing, extra features, etc.)
// These are type "addon" — they do NOT count toward the bulk discount.
function AddOnCard({ addon }: { addon: AddOn }) {
  const { items, addItem } = useBasketStore();
  const inBasket = items.some((i) => i.slug === addon.id);
  const priceNum = parsePrice(addon.price);

  const handleAdd = () => {
    addItem({ slug: addon.id, name: addon.name, type: "addon", price: priceNum, icon: "+" });
    toast.success(`▮ ${addon.name} ADDED AS ADD-ON`);
  };

  return (
    <div
      className="group relative border border-border bg-card/30 transition-all hover:border-[#00FF94]/40"
      style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
    >
      <div className="flex items-center justify-between border-b border-border/40 px-2 py-1">
        <span className={`font-mono text-[10px] uppercase tracking-[0.14em] sm:text-[7px] ${addon.type === "ongoing" ? "text-[#FFB300]" : "text-[#00FF94]"}`}>
          {addon.type === "ongoing" ? "◈ ONGOING" : "▸ ONE-TIME"}
        </span>
      </div>
      <div className="h-0.5 w-full bg-[#00FF94]/30" />
      <div className="p-3">
        <h4 className="font-sans text-xs font-bold uppercase tracking-tight sm:text-xs">{addon.name}</h4>
        <p className="mt-0.5 font-serif text-[10px] italic text-muted-foreground line-clamp-2 sm:text-[10px]">{addon.description}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="min-w-0 flex-1 truncate font-mono text-[10px] uppercase tracking-[0.12em] text-[#00FF94] sm:text-[8px]" title={addon.price}>{addon.price}</span>
          <button
            onClick={handleAdd}
            disabled={inBasket}
            className={`flex shrink-0 items-center gap-1 border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-all sm:text-[8px] ${
              inBasket ? "border-[#00FF94]/40 text-[#00FF94]" : "border-border text-muted-foreground hover:border-[#00FF94] hover:text-[#00FF94]"
            }`}
          >
            {inBasket ? <Check className="h-2.5 w-2.5" /> : <Plus className="h-2.5 w-2.5" />}
            {inBasket ? "ADDED" : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Add-on card for compatible services
function CompatibleServiceCard({ cs }: { cs: { slug: string; name: string; icon: string; price: string; reason: string } }) {
  const { items, addItem } = useBasketStore();
  const inBasket = items.some((i) => i.slug === cs.slug);
  const priceNum = parsePrice(cs.price);

  const handleAdd = () => {
    // Compatible services are OTHER MAIN SERVICES — added as type "service" so they count toward bulk discount
    addItem({ slug: cs.slug, name: cs.name, type: "service", price: priceNum, icon: cs.icon });
    toast.success(`▮ ${cs.name} ADDED TO BASKET`);
  };

  return (
    <div
      className="group relative border border-border bg-card/30 transition-all hover:border-[#FF4500]/40"
      style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
    >
      <div className="h-0.5 w-full bg-[#FF4500]/40" />
      <div className="p-3">
        <div className="flex items-start gap-3">
          <span className="font-sans text-lg text-[#FF4500] sm:text-xl">{cs.icon}</span>
          <div className="min-w-0 flex-1">
            <h4 className="font-sans text-xs font-bold uppercase tracking-tight sm:text-xs">{cs.name}</h4>
            <p className="mt-0.5 font-serif text-[10px] italic text-muted-foreground sm:text-[10px]">{cs.reason}</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="min-w-0 flex-1 truncate font-mono text-[10px] uppercase tracking-[0.12em] text-[#FF4500] sm:text-[8px]" title={cs.price}>{cs.price}</span>
              <button
                onClick={handleAdd}
                disabled={inBasket}
                className={`flex shrink-0 items-center gap-1 border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-all sm:text-[8px] ${
                  inBasket ? "border-[#00FF94]/40 text-[#00FF94]" : "border-border text-muted-foreground hover:border-[#00FF94] hover:text-[#00FF94]"
                }`}
              >
                {inBasket ? <Check className="h-2.5 w-2.5" /> : <Plus className="h-2.5 w-2.5" />}
                {inBasket ? "ADDED" : "ADD"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
