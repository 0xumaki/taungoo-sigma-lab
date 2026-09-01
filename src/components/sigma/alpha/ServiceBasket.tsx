"use client";

import * as React from "react";
import { useBasketStore, formatMMK, type BasketItem, DISCOUNT_TIERS, getNextTier } from "@/lib/sigma/basket";
import { toast } from "sonner";
import { ShoppingBag, X, Trash2, Send } from "lucide-react";

// Add-on data — researched compatible services for upselling
export const ADDONS: Record<string, { slug: string; name: string; icon: string; price: string; reason: string }[]> = {
  "ai-chatbot": [
    { slug: "voice-ai", name: "Voice AI", icon: "♫", price: "from 2,500,000 MMK", reason: "Add voice capabilities to your chatbot" },
    { slug: "ai-automation", name: "AI Automation", icon: "⚙", price: "from 1,220,000 MMK", reason: "Automate chatbot-triggered workflows" },
    { slug: "api-mcp", name: "API & MCP", icon: "⌗", price: "from 4,830,000 MMK", reason: "Expose chatbot via API for integrations" },
  ],
  "voice-ai": [
    { slug: "ai-chatbot", name: "AI Chatbot", icon: "◐", price: "from 2,200,000 MMK", reason: "Text fallback when voice unavailable" },
    { slug: "ai-automation", name: "AI Automation", icon: "⚙", price: "from 1,220,000 MMK", reason: "Automate post-call workflows" },
    { slug: "content-copywriting", name: "Content & Copywriting", icon: "✎", price: "from 966,000 MMK", reason: "Call scripts and conversation flows" },
  ],
  "agent-swarm": [
    { slug: "ai-automation", name: "AI Automation", icon: "⚙", price: "from 1,220,000 MMK", reason: "Orchestrate swarm via N8N workflows" },
    { slug: "api-mcp", name: "API & MCP", icon: "⌗", price: "from 4,830,000 MMK", reason: "Expose swarm via MCP for external triggers" },
    { slug: "ai-chatbot", name: "AI Chatbot", icon: "◐", price: "from 2,200,000 MMK", reason: "Human-like interface for swarm outputs" },
  ],
  "ai-automation": [
    { slug: "api-mcp", name: "API & MCP", icon: "⌗", price: "from 4,830,000 MMK", reason: "Custom APIs for workflow integrations" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 2,250,000 MMK", reason: "Dashboard for monitoring automations" },
    { slug: "ai-chatbot", name: "AI Chatbot", icon: "◐", price: "from 2,200,000 MMK", reason: "Chatbot interface for triggering workflows" },
  ],
  "api-mcp": [
    { slug: "ai-automation", name: "AI Automation", icon: "⚙", price: "from 1,220,000 MMK", reason: "Automate API-triggered workflows" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 2,250,000 MMK", reason: "Admin dashboard for API management" },
    { slug: "security-audit", name: "Security Audit", icon: "⚿", price: "from 5,500,000 MMK", reason: "Audit API for vulnerabilities" },
  ],
  "hermes-openclaw-grokbot": [
    { slug: "agent-swarm", name: "Agent Swarm", icon: "⬡", price: "from 3,660,000 MMK", reason: "Multi-agent orchestration layer" },
    { slug: "ai-automation", name: "AI Automation", icon: "⚙", price: "from 1,220,000 MMK", reason: "Workflow automation integration" },
    { slug: "api-mcp", name: "API & MCP", icon: "⌗", price: "from 4,830,000 MMK", reason: "MCP server for external access" },
  ],
  "ai-video-generation": [
    { slug: "graphic-design", name: "Graphic Design", icon: "◆", price: "from 1,210,000 MMK", reason: "Brand-consistent video thumbnails" },
    { slug: "content-copywriting", name: "Content & Copywriting", icon: "✎", price: "from 966,000 MMK", reason: "Video scripts and descriptions" },
    { slug: "online-media-buying", name: "Online Media Buying", icon: "▲", price: "from 10% of ad budget + 1,210,000 MMK", reason: "Distribute videos as ad campaigns" },
  ],
  "3d-modeling": [
    { slug: "ui-ux-design", name: "UI/UX Design", icon: "◡", price: "from 2,400,000 MMK", reason: "Integrate 3D assets into product UI" },
    { slug: "graphic-design", name: "Graphic Design", icon: "◆", price: "from 1,210,000 MMK", reason: "Branded materials with 3D visuals" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 2,250,000 MMK", reason: "WebGL/Three.js integration for 3D" },
  ],
  "graphic-design": [
    { slug: "ui-ux-design", name: "UI/UX Design", icon: "◡", price: "from 2,400,000 MMK", reason: "Apply designs to product interfaces" },
    { slug: "online-media-buying", name: "Online Media Buying", icon: "▲", price: "from 10% of ad budget + 1,210,000 MMK", reason: "Run ad campaigns with designs" },
    { slug: "content-copywriting", name: "Content & Copywriting", icon: "✎", price: "from 966,000 MMK", reason: "Copy to accompany designs" },
  ],
  "content-copywriting": [
    { slug: "graphic-design", name: "Graphic Design", icon: "◆", price: "from 1,210,000 MMK", reason: "Visual assets for written content" },
    { slug: "online-media-buying", name: "Online Media Buying", icon: "▲", price: "from 10% of ad budget + 1,210,000 MMK", reason: "Distribute content via ad campaigns" },
    { slug: "ai-automation", name: "AI Automation", icon: "⚙", price: "from 1,220,000 MMK", reason: "Automate content publishing pipelines" },
  ],
  "online-media-buying": [
    { slug: "graphic-design", name: "Graphic Design", icon: "◆", price: "from 1,210,000 MMK", reason: "Ad creatives and visuals" },
    { slug: "content-copywriting", name: "Content & Copywriting", icon: "✎", price: "from 966,000 MMK", reason: "Ad copy and headlines" },
    { slug: "ai-video-generation", name: "AI Video Generation", icon: "▶", price: "from 2,500,000 MMK", reason: "Video ads for campaigns" },
  ],
  "ui-ux-design": [
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 2,250,000 MMK", reason: "Implement designs in production" },
    { slug: "android-ios-app", name: "Android & iOS App", icon: "▣", price: "from 15,000,000 MMK", reason: "Mobile implementation of designs" },
    { slug: "graphic-design", name: "Graphic Design", icon: "◆", price: "from 1,210,000 MMK", reason: "Brand assets to match UI" },
  ],
  "android-ios-app": [
    { slug: "aso", name: "ASO", icon: "⊙", price: "from 1,200,000 MMK", reason: "Optimize app store visibility" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 2,250,000 MMK", reason: "Companion web app" },
    { slug: "ui-ux-design", name: "UI/UX Design", icon: "◡", price: "from 2,400,000 MMK", reason: "Polished mobile UI/UX" },
  ],
  "web-webapp": [
    { slug: "ai-chatbot", name: "AI Chatbot", icon: "◐", price: "from 2,200,000 MMK", reason: "Add AI support to your web app" },
    { slug: "ui-ux-design", name: "UI/UX Design", icon: "◡", price: "from 2,400,000 MMK", reason: "Professional design system" },
    { slug: "security-audit", name: "Security Audit", icon: "⚿", price: "from 5,500,000 MMK", reason: "Security audit before launch" },
  ],
  "chrome-extensions": [
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 2,250,000 MMK", reason: "Companion web dashboard" },
    { slug: "api-mcp", name: "API & MCP", icon: "⌗", price: "from 4,830,000 MMK", reason: "Backend API for extension" },
    { slug: "graphic-design", name: "Graphic Design", icon: "◆", price: "from 1,210,000 MMK", reason: "Extension icons and branding" },
  ],
  "desktop-macbook-apps": [
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 2,250,000 MMK", reason: "Web companion" },
    { slug: "ui-ux-design", name: "UI/UX Design", icon: "◡", price: "from 2,400,000 MMK", reason: "Native desktop UI design" },
    { slug: "security-audit", name: "Security Audit", icon: "⚿", price: "from 5,500,000 MMK", reason: "Code signing + security review" },
  ],
  "aso": [
    { slug: "android-ios-app", name: "Android & iOS App", icon: "▣", price: "from 15,000,000 MMK", reason: "App development if not yet built" },
    { slug: "graphic-design", name: "Graphic Design", icon: "◆", price: "from 1,210,000 MMK", reason: "Store screenshots and icons" },
    { slug: "online-media-buying", name: "Online Media Buying", icon: "▲", price: "from 10% of ad budget + 1,210,000 MMK", reason: "Boost app installs with ads" },
  ],
  "web3-wallets": [
    { slug: "security-audit", name: "Security Audit", icon: "⚿", price: "from 5,500,000 MMK", reason: "Critical for wallet security" },
    { slug: "smart-contract-development", name: "Smart Contract Dev", icon: "∎", price: "from 10,000,000 MMK", reason: "Wallet smart contracts" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 2,250,000 MMK", reason: "Web interface for wallet" },
  ],
  "amm-dex": [
    { slug: "smart-contract-development", name: "Smart Contract Dev", icon: "∎", price: "from 10,000,000 MMK", reason: "Core DEX contracts" },
    { slug: "security-audit", name: "Security Audit", icon: "⚿", price: "from 5,500,000 MMK", reason: "Audit before mainnet" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 2,250,000 MMK", reason: "DEX frontend dashboard" },
  ],
  "dao-governance": [
    { slug: "smart-contract-development", name: "Smart Contract Dev", icon: "∎", price: "from 10,000,000 MMK", reason: "Governance contracts" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 2,250,000 MMK", reason: "Governance dashboard" },
    { slug: "security-audit", name: "Security Audit", icon: "⚿", price: "from 5,500,000 MMK", reason: "Audit governance contracts" },
  ],
  "nft-systems": [
    { slug: "smart-contract-development", name: "Smart Contract Dev", icon: "∎", price: "from 10,000,000 MMK", reason: "Minting contracts" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 2,250,000 MMK", reason: "Marketplace frontend" },
    { slug: "security-audit", name: "Security Audit", icon: "ʞ", price: "from 5,500,000 MMK", reason: "Audit minting contracts" },
  ],
  "security-audit": [
    { slug: "rwa-development", name: "RWA Development", icon: "▣", price: "from 12,550,000 MMK", reason: "Tokenize real-world assets" },
    { slug: "smart-contract-development", name: "Smart Contract Dev", icon: "∎", price: "from 10,000,000 MMK", reason: "Fix vulnerabilities found" },
    { slug: "web3-wallets", name: "Web3 Wallets", icon: "⬡", price: "from 12,000,000 MMK", reason: "Secure wallet implementation" },
  ],
  "smart-contract-development": [
    { slug: "security-audit", name: "Security Audit", icon: "ʞ", price: "from 5,500,000 MMK", reason: "Audit before deployment" },
    { slug: "rwa-development", name: "RWA Development", icon: "▣", price: "from 12,550,000 MMK", reason: "RWA tokenization for your assets" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 2,250,000 MMK", reason: "DApp frontend" },
  ],
  "rwa-development": [
    { slug: "security-audit", name: "Security Audit", icon: "ʞ", price: "from 5,500,000 MMK", reason: "Comprehensive security audit" },
    { slug: "smart-contract-development", name: "Smart Contract Dev", icon: "∎", price: "from 10,000,000 MMK", reason: "Fix found vulnerabilities" },
    { slug: "web3-wallets", name: "Web3 Wallets", icon: "⬡", price: "from 12,000,000 MMK", reason: "Secure wallet infrastructure" },
  ],
  "money-market-development": [
    { slug: "security-audit", name: "Security Audit", icon: "ʞ", price: "from 5,500,000 MMK", reason: "Critical for DeFi protocols" },
    { slug: "smart-contract-development", name: "Smart Contract Dev", icon: "∎", price: "from 10,000,000 MMK", reason: "Additional contract modules" },
    { slug: "amm-dex", name: "AMM / DEX", icon: "⇄", price: "from 20,000,000 MMK", reason: "Integrated swap functionality" },
  ],
  "stablecoin-development": [
    { slug: "security-audit", name: "Security Audit", icon: "ʞ", price: "from 5,500,000 MMK", reason: "Government-grade security" },
    { slug: "smart-contract-development", name: "Smart Contract Dev", icon: "∎", price: "from 10,000,000 MMK", reason: "Core infrastructure contracts" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 2,250,000 MMK", reason: "Admin and user portals" },
  ],
  "mobile-web-game-development": [
    { slug: "ui-ux-design", name: "UI/UX Design", icon: "◡", price: "from 2,400,000 MMK", reason: "Game UI/UX and level design" },
    { slug: "3d-modeling", name: "3D Modeling", icon: "◈", price: "from 1,800,000 MMK", reason: "Game assets and environments" },
    { slug: "android-ios-app", name: "Android & iOS App", icon: "▣", price: "from 15,000,000 MMK", reason: "Native mobile game port" },
  ],
};

// Main service prices for basket
export const SERVICE_PRICES: Record<string, { name: string; icon: string; price: string }> = {
  "ai-chatbot": { name: "AI Chatbot", icon: "◐", price: "from 2,200,000 MMK" },
  "voice-ai": { name: "Voice AI", icon: "♫", price: "from 2,500,000 MMK" },
  "agent-swarm": { name: "Agent Swarm", icon: "⬡", price: "from 3,660,000 MMK" },
  "ai-automation": { name: "AI Automation", icon: "⚙", price: "from 1,220,000 MMK" },
  "api-mcp": { name: "API & MCP", icon: "⌗", price: "from 4,830,000 MMK" },
  "hermes-openclaw-grokbot": { name: "HERMES / Openclaw / GrokBot", icon: "⚡", price: "custom" },
  "ai-video-generation": { name: "AI Video Generation", icon: "▶", price: "from 2,500,000 MMK" },
  "3d-modeling": { name: "3D Modeling", icon: "◈", price: "from 1,800,000 MMK" },
  "graphic-design": { name: "Graphic Design", icon: "◆", price: "from 1,210,000 MMK" },
  "content-copywriting": { name: "Content & Copywriting", icon: "✎", price: "from 966,000 MMK" },
  "online-media-buying": { name: "Online Media Buying", icon: "▲", price: "from 10% of ad budget + 1,210,000 MMK" },
  "ui-ux-design": { name: "UI/UX Design", icon: "◡", price: "from 2,400,000 MMK" },
  "android-ios-app": { name: "Android & iOS App", icon: "▣", price: "from 15,000,000 MMK" },
  "web-webapp": { name: "Web / WebApp", icon: "▣", price: "from 2,250,000 MMK" },
  "chrome-extensions": { name: "Chrome Extensions", icon: "⬚", price: "from 2,415,000 MMK" },
  "desktop-macbook-apps": { name: "Desktop / MacBook Apps", icon: "◱", price: "from 9,660,000 MMK" },
  "aso": { name: "ASO", icon: "⊙", price: "from 1,200,000 MMK" },
  "web3-wallets": { name: "Web3 Wallets", icon: "⬡", price: "from 12,000,000 MMK" },
  "amm-dex": { name: "AMM / DEX", icon: "⇄", price: "from 20,000,000 MMK" },
  "dao-governance": { name: "DAO Governance", icon: "◍", price: "from 8,500,000 MMK" },
  "nft-systems": { name: "NFT Systems", icon: "✦", price: "from 15,000,000 MMK" },
  "security-audit": { name: "Security Audit", icon: "ʞ", price: "from 5,500,000 MMK" },
  "smart-contract-development": { name: "Smart Contract Dev", icon: "∎", price: "from 10,000,000 MMK" },
  "rwa-development": { name: "RWA Tokenization", icon: "▣", price: "from 12,550,000 MMK" },
  "money-market-development": { name: "Money Market Development", icon: "$", price: "from 33,550,000 MMK" },
  "stablecoin-development": { name: "Stablecoin Development", icon: "₵", price: "from 15,550,000 MMK" },
  "mobile-web-game-development": { name: "Mobile/Web Game Dev", icon: "◆", price: "from 9,570,000 MMK" },
};

/**
 * ServiceBasket — floating basket button + RFQ modal.
 * `accent` rebrands the chrome: default #FF4500 (alpha/detail pages),
 * beta mode mounts it with its gold #D4AF37 accent.
 */
export function ServiceBasket({ accent = "#FF4500" }: { accent?: string }) {
  const { items, isOpen, toggleOpen, removeItem, clearBasket, getTotal, getServicesTotal, getAddonsTotal, getDiscount, getDiscountedTotal, getServiceCount, getAddonCount, haggleUsed, haggleRoll, haggleDiscountRate, getHaggleDiscount, getGrandTotal } = useBasketStore();
  const [submitting, setSubmitting] = React.useState(false);
  const [btnHover, setBtnHover] = React.useState(false);

  // === A11Y: focus management for the basket modal ===
  // - toggleBtnRef:  the floating basket button — focus restored here on close.
  // - closeBtnRef:    the modal's close button — autofocus on open so keyboard
  //                   users land inside the dialog immediately.
  // - panelRef:       the modal panel root — used for the Tab focus trap.
  // - lastFocusedRef: the element that had focus before the modal opened
  //                   (usually the floating basket button or a service card's
  //                   "ADD TO QUOTE" button). Restored on close.
  const toggleBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = React.useRef<HTMLElement | null>(null);

  // Track the previously-focused element + autofocus the close button on open.
  React.useEffect(() => {
    if (!isOpen) return;
    lastFocusedRef.current = (document.activeElement as HTMLElement) ?? null;
    // Defer one tick so the modal panel has rendered.
    const t = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);
    return () => clearTimeout(t);
  }, [isOpen]);

  // Restore focus to the trigger element on close (WCAG 2.4.3 + standard a11y).
  React.useEffect(() => {
    if (isOpen) return;
    if (lastFocusedRef.current && typeof lastFocusedRef.current.focus === "function") {
      lastFocusedRef.current.focus();
      lastFocusedRef.current = null;
    }
  }, [isOpen]);

  // Tab focus trap + Escape-to-close — active only while the modal is open.
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        toggleOpen();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      // Query visible + non-disabled focusables inside the panel.
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !panel.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, toggleOpen]);

  const submitRFQ = async () => {
    if (items.length === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/sigma/transmit?XTransformPort=3000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identity: "basket-rfq",
          channel: "RFQ",
          message: JSON.stringify({
            type: "quotation_request",
            items: items.map((i) => ({ slug: i.slug, name: i.name, type: i.type, addonType: i.addonType, price: i.price })),
            servicesTotal: getServicesTotal(),
            addonsTotal: getAddonsTotal(),
            total: getTotal(),
            discount: getDiscount(),
            final: getDiscountedTotal(),
            serviceCount: getServiceCount(),
            addonCount: getAddonCount(),
            haggleUsed,
            haggleRoll,
            haggleDiscountRate,
            haggleDiscount: getHaggleDiscount(),
            grandTotal: getGrandTotal(),
          }),
        }),
      });
      const data = await res.json();
      if (data.ok) {
        toast.success("▮ QUOTATION REQUESTED", { description: `Ref: ${data.ref}` });
        clearBasket();
        toggleOpen();
      }
    } catch {
      toast.error("SUBMISSION FAILED");
    } finally {
      setSubmitting(false);
    }
  };

  const services = items.filter((i) => i.type === "service");
  const addons = items.filter((i) => i.type === "addon");

  return (
    <>
      {/* Floating basket button — lg:left-20 clears beta mode's left rail */}
      <button
        ref={toggleBtnRef}
        onClick={toggleOpen}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        aria-label={`Open service basket (${items.length} items)`}
        aria-expanded={isOpen}
        className="fixed bottom-4 left-4 z-[85] flex items-center gap-2 border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] backdrop-blur-sm transition-all duration-200 lg:bottom-6 lg:left-20"
        style={{
          borderColor: accent,
          color: btnHover ? "#000000" : accent,
          background: btnHover ? accent : "rgba(10, 10, 12, 0.9)",
          boxShadow: btnHover ? `0 0 24px ${accent}55` : "0 4px 16px rgba(0,0,0,0.4)",
          transitionDuration: "var(--dur-fast)",
          transitionTimingFunction: "var(--ease-out-expo)",
        }}
      >
        <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
        BASKET
        {items.length > 0 && (
          <span className="flex h-4 min-w-4 items-center justify-center px-1 text-[8px] font-bold text-black" style={{ background: accent }}>
            {items.length}
          </span>
        )}
      </button>

      {/* Basket panel — sci-fi loot box style.
          role="dialog" + aria-modal="true" + aria-labelledby announce the
          modal to assistive tech. The outer backdrop click closes; the inner
          panel stops propagation so clicks inside don't dismiss. */}
      {isOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4" onClick={toggleOpen}>
          <div className="absolute inset-0 bg-background/90 backdrop-blur-md" aria-hidden="true" />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="basket-title"
            aria-describedby="basket-desc"
            className="relative z-10 w-full max-w-2xl border bg-card"
            style={{
              borderColor: `${accent}66`,
              clipPath: "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
              boxShadow: `0 0 80px ${accent}22`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent bar */}
            <div className="h-1 w-full" aria-hidden="true" style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }} />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" aria-hidden="true" style={{ color: accent }} />
                <span id="basket-title" className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: accent }}>▸ SERVICE BASKET</span>
              </div>
              <button
                ref={closeBtnRef}
                onClick={toggleOpen}
                aria-label="Close basket"
                className="border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-foreground/10"
                style={{ transitionDuration: "var(--dur-fast)", transitionTimingFunction: "var(--ease-out-expo)" }}
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>

            {/* Screen-reader-only description (gives context for the modal). */}
            <span id="basket-desc" className="sr-only">
              Service quotation basket dialog. Use Tab to navigate between items, totals, and the request quotation button. Press Escape to close.
            </span>

            {/* Items list — grouped by type */}
            <div className="max-h-[50vh] overflow-y-auto p-4 sigma-scroll-hidden">
              {items.length === 0 ? (
                <div className="relative py-16 text-center">
                  {/* Ghost ShoppingBag watermark at 5% opacity — visual weight
                      without distracting from the empty-state message. */}
                  <ShoppingBag
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ opacity: 0.05, color: accent }}
                    strokeWidth={1}
                    aria-hidden="true"
                    width={140}
                    height={140}
                  />
                  {/* Foreground empty-state content */}
                  <div className="relative z-10">
                    <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">▮ BASKET EMPTY</div>
                    <p className="mt-2 font-serif text-sm italic text-muted-foreground">
                      Browse services and add them to your basket.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        // Close the basket modal first, then smooth-scroll to #services.
                        // The 80ms delay lets the modal-close transition start before
                        // scrollIntoView kicks in (avoids the scroll lock fighting the
                        // scroll command on iOS Safari + some Android browsers).
                        toggleOpen();
                        setTimeout(() => {
                          const el = document.getElementById("services");
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                          } else {
                            // Fallback — no #services anchor on this view; go to top.
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }, 80);
                      }}
                      className="mt-4 inline-flex items-center gap-1.5 border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all hover:brightness-110"
                      style={{
                        borderColor: accent,
                        color: accent,
                        background: `${accent}0a`,
                        transitionDuration: "var(--dur-fast)",
                        transitionTimingFunction: "var(--ease-out-expo)",
                      }}
                    >
                      <span aria-hidden="true">▸</span> BROWSE SERVICES
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Main services section */}
                  {services.length > 0 && (
                    <div>
                      <div className="mb-1.5 flex items-center gap-2 border-b pb-1" style={{ borderColor: `${accent}30` }}>
                        <span className="font-mono text-[8px] uppercase tracking-[0.14em]" style={{ color: accent }}>▸ MAIN SERVICES</span>
                        <span className="font-mono text-[7px] text-muted-foreground">({services.length}) — DISCOUNT ELIGIBLE</span>
                      </div>
                      <div className="space-y-1.5">
                        {services.map((item) => (
                          <div key={item.slug} className="flex items-center gap-3 border border-border/40 bg-background/40 p-2">
                            <span className="font-sans text-lg" aria-hidden="true" style={{ color: accent }}>{item.icon}</span>
                            <div className="flex-1">
                              <div className="font-sans text-xs font-bold uppercase tracking-tight">{item.name}</div>
                              <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
                                MAIN SERVICE · {item.price === 0 ? "custom" : formatMMK(item.price)}
                              </div>
                            </div>
                            <button onClick={() => removeItem(item.slug)} aria-label={`Remove ${item.name} from basket`} className="border border-border/40 p-1 text-muted-foreground transition-colors hover:border-[#B85C2E] hover:text-[#B85C2E]" style={{ transitionDuration: "var(--dur-fast)", transitionTimingFunction: "var(--ease-out-expo)" }}>
                              <Trash2 className="h-3 w-3" aria-hidden="true" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add-ons section */}
                  {addons.length > 0 && (
                    <div>
                      <div className="mb-1.5 flex items-center gap-2 border-b border-[#00FF94]/30 pb-1">
                        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#00FF94]">▸ ADD-ONS</span>
                        <span className="font-mono text-[7px] text-muted-foreground">({addons.length}) — NO DISCOUNT</span>
                      </div>
                      <div className="space-y-1.5">
                        {addons.map((item) => (
                          <div key={item.slug} className="flex items-center gap-3 border border-border/40 bg-background/40 p-2">
                            <span className="font-sans text-lg" aria-hidden="true" style={{ color: "#00FF94" }}>{item.icon}</span>
                            <div className="flex-1">
                              <div className="font-sans text-xs font-bold uppercase tracking-tight">{item.name}</div>
                              <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
                                ADD-ON · {item.addonType === "ongoing" ? "ONGOING · " : ""}{item.price === 0 ? "custom" : formatMMK(item.price)}
                              </div>
                            </div>
                            <button onClick={() => removeItem(item.slug)} aria-label={`Remove ${item.name} add-on from basket`} className="border border-border/40 p-1 text-muted-foreground transition-colors hover:border-[#B85C2E] hover:text-[#B85C2E]" style={{ transitionDuration: "var(--dur-fast)", transitionTimingFunction: "var(--ease-out-expo)" }}>
                              <Trash2 className="h-3 w-3" aria-hidden="true" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Summary + checkout */}
            {items.length > 0 && (
              <div className="border-t border-border p-4">
                {/* Discount tier ladder — shows all 4 tiers, highlights current */}
                <div className="mb-3">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
                      BULK DISCOUNT TIERS (MAIN SERVICES ONLY)
                    </span>
                    <span className="font-mono text-[9px] text-[#00FF94]">
                      ACTIVE: -{getDiscount() > 0 ? Math.round((getDiscount() / Math.max(getServicesTotal(), 1)) * 100) + "%" : "0%"}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-0.5">
                    {DISCOUNT_TIERS.map((tier) => {
                      const svcCount = getServiceCount();
                      const isActive = svcCount >= tier.count && (tier.count === DISCOUNT_TIERS[DISCOUNT_TIERS.length - 1].count
                        ? svcCount >= tier.count
                        : svcCount >= tier.count && svcCount < (DISCOUNT_TIERS.find((t) => t.count > tier.count)?.count ?? Infinity));
                      return (
                        <div
                          key={tier.count}
                          className={`border px-1.5 py-1 text-center transition-colors ${
                            isActive
                              ? "border-[#00FF94] bg-[#00FF94]/15"
                              : "border-border/40 opacity-50"
                          }`}
                        >
                          <div className="font-mono text-[7px] uppercase tracking-[0.1em] text-muted-foreground">
                            {tier.label}
                          </div>
                          <div className={`font-sans text-xs font-black ${isActive ? "text-[#00FF94]" : "text-foreground"}`}>
                            {Math.round(tier.rate * 100)}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Next tier incentive */}
                  {(() => {
                    const next = getNextTier(getServiceCount());
                    if (!next) return null;
                    const svcCount = getServiceCount();
                    return (
                      <div className="mt-1.5 border border-[#FFB300]/40 bg-[#FFB300]/5 px-2 py-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-[#FFB300]">
                            ▸ ADD {next.count - svcCount} MORE MAIN SERVICE FOR {Math.round(next.rate * 100)}% OFF
                          </span>
                          <span className="font-mono text-[7px] text-muted-foreground">{svcCount}/{next.count}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Price breakdown — services vs add-ons */}
                <div className="space-y-1 font-mono text-[10px] uppercase tracking-[0.14em]">
                  {services.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SERVICES SUBTOTAL</span>
                      <span className="text-foreground">{formatMMK(getServicesTotal())}</span>
                    </div>
                  )}
                  {addons.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ADD-ONS SUBTOTAL</span>
                      <span className="text-foreground">{formatMMK(getAddonsTotal())}</span>
                    </div>
                  )}
                  {getDiscount() > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#00FF94]">DISCOUNT (BULK)</span>
                      <span className="text-[#00FF94]">-{formatMMK(getDiscount())}</span>
                    </div>
                  )}
                  {haggleUsed && (
                    <div className="flex justify-between border-t border-border/40 pt-1">
                      <span className="text-[#FFD700]" title={`Haggle dice rolled: ${haggleRoll} → ${Math.round(haggleDiscountRate * 100)}% extra`}>
                        ◆ HAGGLE (ROLL {haggleRoll})
                      </span>
                      <span className="text-[#FFD700]">-{formatMMK(getHaggleDiscount())}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-border/40 pt-1">
                    <span style={{ color: haggleUsed ? "#FFD700" : accent }}>
                      {haggleUsed ? "GRAND TOTAL" : "TOTAL"}
                    </span>
                    <span
                      className={`font-sans text-lg font-black ${haggleUsed ? "text-[#FFD700]" : ""}`}
                      style={{ color: haggleUsed ? "#FFD700" : accent, textShadow: haggleUsed ? "0 0 12px rgba(255,215,0,0.6)" : `0 0 12px ${accent}55` }}
                    >
                      {formatMMK(haggleUsed ? getGrandTotal() : getDiscountedTotal())}
                    </span>
                  </div>
                  {haggleUsed && (
                    <div className="flex justify-between pt-0.5">
                      <span className="text-[8px] text-muted-foreground/80">SAVED VS LIST</span>
                      <span className="text-[8px] text-[#00FF94]">
                        -{formatMMK(getTotal() - (haggleUsed ? getGrandTotal() : getDiscountedTotal()))}
                      </span>
                    </div>
                  )}
                </div>

                {/* RFQ button */}
                <button
                  onClick={submitRFQ}
                  disabled={submitting}
                  aria-label="Request quotation for basket items"
                  className="mt-4 w-full border py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-black transition-all hover:brightness-110 disabled:opacity-50"
                  style={{ borderColor: accent, background: accent, boxShadow: `0 0 24px ${accent}44`, transitionDuration: "var(--dur-fast)", transitionTimingFunction: "var(--ease-out-expo)" }}
                >
                  <Send className="mr-2 inline h-3 w-3" aria-hidden="true" />
                  {submitting ? "▮ SUBMITTING…" : "REQUEST QUOTATION →"}
                </button>
                <p className="mt-2 text-center font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
                  ▸ THIS IS A QUOTATION REQUEST, NOT A PURCHASE. PAYMENT HAPPENS OFF-PLATFORM.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
