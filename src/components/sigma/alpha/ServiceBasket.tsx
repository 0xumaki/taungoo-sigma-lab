"use client";

import * as React from "react";
import { useBasketStore, formatMMK, type BasketItem, DISCOUNT_TIERS, getNextTier } from "@/lib/sigma/basket";
import { toast } from "sonner";
import { ShoppingBag, X, Trash2, Send } from "lucide-react";

// Add-on data — researched compatible services for upselling
export const ADDONS: Record<string, { slug: string; name: string; icon: string; price: string; reason: string }[]> = {
  "ai-chatbot": [
    { slug: "voice-ai", name: "Voice AI", icon: "♫", price: "from 6,040,000 MMK", reason: "Add voice capabilities to your chatbot" },
    { slug: "ai-automation", name: "AI Automation", icon: "⚙", price: "from 3,620,000 MMK", reason: "Automate chatbot-triggered workflows" },
    { slug: "api-mcp", name: "API & MCP", icon: "⌗", price: "from 4,830,000 MMK", reason: "Expose chatbot via API for integrations" },
  ],
  "voice-ai": [
    { slug: "ai-chatbot", name: "AI Chatbot", icon: "◐", price: "from 3,020,000 MMK", reason: "Text fallback when voice unavailable" },
    { slug: "ai-automation", name: "AI Automation", icon: "⚙", price: "from 3,620,000 MMK", reason: "Automate post-call workflows" },
    { slug: "content-copywriting", name: "Content & Copywriting", icon: "✎", price: "from 966,000 MMK", reason: "Call scripts and conversation flows" },
  ],
  "agent-swarm": [
    { slug: "ai-automation", name: "AI Automation", icon: "⚙", price: "from 3,620,000 MMK", reason: "Orchestrate swarm via N8N workflows" },
    { slug: "api-mcp", name: "API & MCP", icon: "⌗", price: "from 4,830,000 MMK", reason: "Expose swarm via MCP for external triggers" },
    { slug: "ai-chatbot", name: "AI Chatbot", icon: "◐", price: "from 3,020,000 MMK", reason: "Human-like interface for swarm outputs" },
  ],
  "ai-automation": [
    { slug: "api-mcp", name: "API & MCP", icon: "⌗", price: "from 4,830,000 MMK", reason: "Custom APIs for workflow integrations" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 6,040,000 MMK", reason: "Dashboard for monitoring automations" },
    { slug: "ai-chatbot", name: "AI Chatbot", icon: "◐", price: "from 3,020,000 MMK", reason: "Chatbot interface for triggering workflows" },
  ],
  "api-mcp": [
    { slug: "ai-automation", name: "AI Automation", icon: "⚙", price: "from 3,620,000 MMK", reason: "Automate API-triggered workflows" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 6,040,000 MMK", reason: "Admin dashboard for API management" },
    { slug: "security-audit", name: "Security Audit", icon: "⚿", price: "from 6,040,000 MMK", reason: "Audit API for vulnerabilities" },
  ],
  "hermes-openclaw-grokbot": [
    { slug: "agent-swarm", name: "Agent Swarm", icon: "⬡", price: "from 9,660,000 MMK", reason: "Multi-agent orchestration layer" },
    { slug: "ai-automation", name: "AI Automation", icon: "⚙", price: "from 3,620,000 MMK", reason: "Workflow automation integration" },
    { slug: "api-mcp", name: "API & MCP", icon: "⌗", price: "from 4,830,000 MMK", reason: "MCP server for external access" },
  ],
  "ai-video-generation": [
    { slug: "graphic-design", name: "Graphic Design", icon: "◆", price: "from 1,210,000 MMK", reason: "Brand-consistent video thumbnails" },
    { slug: "content-copywriting", name: "Content & Copywriting", icon: "✎", price: "from 966,000 MMK", reason: "Video scripts and descriptions" },
    { slug: "online-media-buying", name: "Online Media Buying", icon: "▲", price: "from 1,810,000 MMK", reason: "Distribute videos as ad campaigns" },
  ],
  "3d-modeling": [
    { slug: "ui-ux-design", name: "UI/UX Design", icon: "◡", price: "from 2,415,000 MMK", reason: "Integrate 3D assets into product UI" },
    { slug: "graphic-design", name: "Graphic Design", icon: "◆", price: "from 1,210,000 MMK", reason: "Branded materials with 3D visuals" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 6,040,000 MMK", reason: "WebGL/Three.js integration for 3D" },
  ],
  "graphic-design": [
    { slug: "ui-ux-design", name: "UI/UX Design", icon: "◡", price: "from 2,415,000 MMK", reason: "Apply designs to product interfaces" },
    { slug: "online-media-buying", name: "Online Media Buying", icon: "▲", price: "from 1,810,000 MMK", reason: "Run ad campaigns with designs" },
    { slug: "content-copywriting", name: "Content & Copywriting", icon: "✎", price: "from 966,000 MMK", reason: "Copy to accompany designs" },
  ],
  "content-copywriting": [
    { slug: "graphic-design", name: "Graphic Design", icon: "◆", price: "from 1,210,000 MMK", reason: "Visual assets for written content" },
    { slug: "online-media-buying", name: "Online Media Buying", icon: "▲", price: "from 1,810,000 MMK", reason: "Distribute content via ad campaigns" },
    { slug: "ai-automation", name: "AI Automation", icon: "⚙", price: "from 3,620,000 MMK", reason: "Automate content publishing pipelines" },
  ],
  "online-media-buying": [
    { slug: "graphic-design", name: "Graphic Design", icon: "◆", price: "from 1,210,000 MMK", reason: "Ad creatives and visuals" },
    { slug: "content-copywriting", name: "Content & Copywriting", icon: "✎", price: "from 966,000 MMK", reason: "Ad copy and headlines" },
    { slug: "ai-video-generation", name: "AI Video Generation", icon: "▶", price: "from 2,415,000 MMK", reason: "Video ads for campaigns" },
  ],
  "ui-ux-design": [
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 6,040,000 MMK", reason: "Implement designs in production" },
    { slug: "android-ios-app", name: "Android & iOS App", icon: "▣", price: "from 12,080,000 MMK", reason: "Mobile implementation of designs" },
    { slug: "graphic-design", name: "Graphic Design", icon: "◆", price: "from 1,210,000 MMK", reason: "Brand assets to match UI" },
  ],
  "android-ios-app": [
    { slug: "aso", name: "ASO", icon: "⊙", price: "from 1,210,000 MMK", reason: "Optimize app store visibility" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 6,040,000 MMK", reason: "Companion web app" },
    { slug: "ui-ux-design", name: "UI/UX Design", icon: "◡", price: "from 2,415,000 MMK", reason: "Polished mobile UI/UX" },
  ],
  "web-webapp": [
    { slug: "ai-chatbot", name: "AI Chatbot", icon: "◐", price: "from 3,020,000 MMK", reason: "Add AI support to your web app" },
    { slug: "ui-ux-design", name: "UI/UX Design", icon: "◡", price: "from 2,415,000 MMK", reason: "Professional design system" },
    { slug: "security-audit", name: "Security Audit", icon: "⚿", price: "from 6,040,000 MMK", reason: "Security audit before launch" },
  ],
  "chrome-extensions": [
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 6,040,000 MMK", reason: "Companion web dashboard" },
    { slug: "api-mcp", name: "API & MCP", icon: "⌗", price: "from 4,830,000 MMK", reason: "Backend API for extension" },
    { slug: "graphic-design", name: "Graphic Design", icon: "◆", price: "from 1,210,000 MMK", reason: "Extension icons and branding" },
  ],
  "desktop-macbook-apps": [
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 6,040,000 MMK", reason: "Web companion" },
    { slug: "ui-ux-design", name: "UI/UX Design", icon: "◡", price: "from 2,415,000 MMK", reason: "Native desktop UI design" },
    { slug: "security-audit", name: "Security Audit", icon: "⚿", price: "from 6,040,000 MMK", reason: "Code signing + security review" },
  ],
  "aso": [
    { slug: "android-ios-app", name: "Android & iOS App", icon: "▣", price: "from 12,080,000 MMK", reason: "App development if not yet built" },
    { slug: "graphic-design", name: "Graphic Design", icon: "◆", price: "from 1,210,000 MMK", reason: "Store screenshots and icons" },
    { slug: "online-media-buying", name: "Online Media Buying", icon: "▲", price: "from 1,810,000 MMK", reason: "Boost app installs with ads" },
  ],
  "web3-wallets": [
    { slug: "security-audit", name: "Security Audit", icon: "⚿", price: "from 6,040,000 MMK", reason: "Critical for wallet security" },
    { slug: "smart-contract-development", name: "Smart Contract Dev", icon: "∎", price: "from 9,660,000 MMK", reason: "Wallet smart contracts" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 6,040,000 MMK", reason: "Web interface for wallet" },
  ],
  "amm-dex": [
    { slug: "smart-contract-development", name: "Smart Contract Dev", icon: "∎", price: "from 9,660,000 MMK", reason: "Core DEX contracts" },
    { slug: "security-audit", name: "Security Audit", icon: "⚿", price: "from 6,040,000 MMK", reason: "Audit before mainnet" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 6,040,000 MMK", reason: "DEX frontend dashboard" },
  ],
  "dao-governance": [
    { slug: "smart-contract-development", name: "Smart Contract Dev", icon: "∎", price: "from 9,660,000 MMK", reason: "Governance contracts" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 6,040,000 MMK", reason: "Governance dashboard" },
    { slug: "security-audit", name: "Security Audit", icon: "⚿", price: "from 6,040,000 MMK", reason: "Audit governance contracts" },
  ],
  "nft-systems": [
    { slug: "smart-contract-development", name: "Smart Contract Dev", icon: "∎", price: "from 9,660,000 MMK", reason: "Minting contracts" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 6,040,000 MMK", reason: "Marketplace frontend" },
    { slug: "security-audit", name: "Security Audit", icon: "ʞ", price: "from 6,040,000 MMK", reason: "Audit minting contracts" },
  ],
  "security-audit": [
    { slug: "bug-bounty", name: "Bug Bounty", icon: "▣", price: "from 3,620,000 MMK", reason: "Ongoing security testing" },
    { slug: "smart-contract-development", name: "Smart Contract Dev", icon: "∎", price: "from 9,660,000 MMK", reason: "Fix vulnerabilities found" },
    { slug: "web3-wallets", name: "Web3 Wallets", icon: "⬡", price: "from 18,110,000 MMK", reason: "Secure wallet implementation" },
  ],
  "smart-contract-development": [
    { slug: "security-audit", name: "Security Audit", icon: "ʞ", price: "from 6,040,000 MMK", reason: "Audit before deployment" },
    { slug: "bug-bounty", name: "Bug Bounty", icon: "▣", price: "from 3,620,000 MMK", reason: "Post-deploy vulnerability testing" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 6,040,000 MMK", reason: "DApp frontend" },
  ],
  "bug-bounty": [
    { slug: "security-audit", name: "Security Audit", icon: "ʞ", price: "from 6,040,000 MMK", reason: "Comprehensive security audit" },
    { slug: "smart-contract-development", name: "Smart Contract Dev", icon: "∎", price: "from 9,660,000 MMK", reason: "Fix found vulnerabilities" },
    { slug: "web3-wallets", name: "Web3 Wallets", icon: "⬡", price: "from 18,110,000 MMK", reason: "Secure wallet infrastructure" },
  ],
  "money-market-development": [
    { slug: "security-audit", name: "Security Audit", icon: "ʞ", price: "from 6,040,000 MMK", reason: "Critical for DeFi protocols" },
    { slug: "smart-contract-development", name: "Smart Contract Dev", icon: "∎", price: "from 9,660,000 MMK", reason: "Additional contract modules" },
    { slug: "amm-dex", name: "AMM / DEX", icon: "⇄", price: "from 24,150,000 MMK", reason: "Integrated swap functionality" },
  ],
  "cbdc-development": [
    { slug: "security-audit", name: "Security Audit", icon: "ʞ", price: "from 6,040,000 MMK", reason: "Government-grade security" },
    { slug: "smart-contract-development", name: "Smart Contract Dev", icon: "∎", price: "from 9,660,000 MMK", reason: "Core infrastructure contracts" },
    { slug: "web-webapp", name: "Web / WebApp", icon: "▣", price: "from 6,040,000 MMK", reason: "Admin and user portals" },
  ],
};

// Main service prices for basket
export const SERVICE_PRICES: Record<string, { name: string; icon: string; price: string }> = {
  "ai-chatbot": { name: "AI Chatbot", icon: "◐", price: "from 3,020,000 MMK" },
  "voice-ai": { name: "Voice AI", icon: "♫", price: "from 6,040,000 MMK" },
  "agent-swarm": { name: "Agent Swarm", icon: "⬡", price: "from 9,660,000 MMK" },
  "ai-automation": { name: "AI Automation", icon: "⚙", price: "from 3,620,000 MMK" },
  "api-mcp": { name: "API & MCP", icon: "⌗", price: "from 4,830,000 MMK" },
  "hermes-openclaw-grokbot": { name: "HERMES / Openclaw / GrokBot", icon: "⚡", price: "custom" },
  "ai-video-generation": { name: "AI Video Generation", icon: "▶", price: "from 2,415,000 MMK" },
  "3d-modeling": { name: "3D Modeling", icon: "◈", price: "from 1,810,000 MMK" },
  "graphic-design": { name: "Graphic Design", icon: "◆", price: "from 1,210,000 MMK" },
  "content-copywriting": { name: "Content & Copywriting", icon: "✎", price: "from 966,000 MMK" },
  "online-media-buying": { name: "Online Media Buying", icon: "▲", price: "from 1,810,000 MMK" },
  "ui-ux-design": { name: "UI/UX Design", icon: "◡", price: "from 2,415,000 MMK" },
  "android-ios-app": { name: "Android & iOS App", icon: "▣", price: "from 12,080,000 MMK" },
  "web-webapp": { name: "Web / WebApp", icon: "▣", price: "from 6,040,000 MMK" },
  "chrome-extensions": { name: "Chrome Extensions", icon: "⬚", price: "from 2,415,000 MMK" },
  "desktop-macbook-apps": { name: "Desktop / MacBook Apps", icon: "◱", price: "from 9,660,000 MMK" },
  "aso": { name: "ASO", icon: "⊙", price: "from 1,210,000 MMK" },
  "web3-wallets": { name: "Web3 Wallets", icon: "⬡", price: "from 18,110,000 MMK" },
  "amm-dex": { name: "AMM / DEX", icon: "⇄", price: "from 24,150,000 MMK" },
  "dao-governance": { name: "DAO Governance", icon: "◍", price: "from 18,110,000 MMK" },
  "nft-systems": { name: "NFT Systems", icon: "✦", price: "from 12,080,000 MMK" },
  "security-audit": { name: "Security Audit", icon: "ʞ", price: "from 6,040,000 MMK" },
  "smart-contract-development": { name: "Smart Contract Dev", icon: "∎", price: "from 9,660,000 MMK" },
  "bug-bounty": { name: "Bug Bounty", icon: "▣", price: "from 3,620,000 MMK" },
  "money-market-development": { name: "Money Market Development", icon: "$", price: "from 30,190,000 MMK" },
  "cbdc-development": { name: "CBDC Development", icon: "₵", price: "custom" },
};

export function ServiceBasket() {
  const { items, isOpen, toggleOpen, removeItem, clearBasket, getTotal, getDiscount, getDiscountedTotal, getServiceCount } = useBasketStore();
  const [submitting, setSubmitting] = React.useState(false);

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
            items: items.map((i) => ({ slug: i.slug, name: i.name, type: i.type, price: i.price })),
            total: getTotal(),
            discount: getDiscount(),
            final: getDiscountedTotal(),
            serviceCount: getServiceCount(),
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

  return (
    <>
      {/* Floating basket button */}
      <button
        onClick={toggleOpen}
        className="fixed bottom-9 left-9 z-[85] flex items-center gap-2 border border-[#FF4500] bg-background/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#FF4500] backdrop-blur-sm transition-all hover:bg-[#FF4500] hover:text-black"
      >
        <ShoppingBag className="h-3.5 w-3.5" />
        BASKET
        {items.length > 0 && (
          <span className="flex h-4 min-w-4 items-center justify-center bg-[#FF4500] px-1 text-[8px] text-black">
            {items.length}
          </span>
        )}
      </button>

      {/* Basket panel — sci-fi loot box style */}
      {isOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4" onClick={toggleOpen}>
          <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
          <div
            className="relative z-10 w-full max-w-2xl border border-[#FF4500]/40 bg-card"
            style={{ clipPath: "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-[#FF4500]" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-[#FF4500]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF4500]">▸ SERVICE BASKET</span>
              </div>
              <button onClick={toggleOpen} className="border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-foreground/10">
                <X className="h-3 w-3" />
              </button>
            </div>

            {/* Items list */}
            <div className="max-h-[50vh] overflow-y-auto p-4 sigma-scroll-hidden">
              {items.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">▮ BASKET EMPTY</div>
                  <p className="mt-2 font-serif text-sm italic text-muted-foreground">Browse services and add them to your basket.</p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {items.map((item) => (
                    <div key={item.slug} className="flex items-center gap-3 border border-border/40 bg-background/40 p-2">
                      <span className="font-sans text-lg" style={{ color: item.type === "service" ? "#FF4500" : "#00FF94" }}>{item.icon}</span>
                      <div className="flex-1">
                        <div className="font-sans text-xs font-bold uppercase tracking-tight">{item.name}</div>
                        <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
                          {item.type === "service" ? "MAIN SERVICE" : "ADD-ON"} · {item.price === 0 ? "custom" : formatMMK(item.price)}
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.slug)} className="border border-border/40 p-1 text-muted-foreground transition-colors hover:border-[#FF3D3D] hover:text-[#FF3D3D]">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
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
                      BULK DISCOUNT TIERS
                    </span>
                    <span className="font-mono text-[9px] text-[#00FF94]">
                      ACTIVE: -{getDiscount() > 0 ? Math.round((getDiscount() / Math.max(getTotal(), 1)) * 100) + "%" : "0%"}
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
                            ▸ ADD {next.count - svcCount} MORE FOR {Math.round(next.rate * 100)}% OFF
                          </span>
                          <span className="font-mono text-[7px] text-muted-foreground">{svcCount}/{next.count}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Price breakdown */}
                <div className="space-y-1 font-mono text-[10px] uppercase tracking-[0.14em]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SUBTOTAL</span>
                    <span className="text-foreground">{formatMMK(getTotal())}</span>
                  </div>
                  {getDiscount() > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#00FF94]">DISCOUNT</span>
                      <span className="text-[#00FF94]">-{formatMMK(getDiscount())}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-border/40 pt-1">
                    <span className="text-[#FF4500]">TOTAL</span>
                    <span className="font-sans text-lg font-black text-[#FF4500]">{formatMMK(getDiscountedTotal())}</span>
                  </div>
                </div>

                {/* RFQ button */}
                <button
                  onClick={submitRFQ}
                  disabled={submitting}
                  className="mt-4 w-full border border-[#FF4500] bg-[#FF4500] py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-80 disabled:opacity-50"
                >
                  <Send className="mr-2 inline h-3 w-3" />
                  {submitting ? "▮ SUBMITTING..." : "REQUEST QUOTATION →"}
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
