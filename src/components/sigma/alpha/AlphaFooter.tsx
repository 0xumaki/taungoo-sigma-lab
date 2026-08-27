"use client";

import { PageTransitionLink } from "@/components/sigma/PageTransitionLink";

// Service slugs — must match the actual /services/[slug] routes
const SERVICE_SLUGS: Record<string, string> = {
  "AI Chatbot": "ai-chatbot",
  "Voice AI": "voice-ai",
  "Agent Swarm": "agent-swarm",
  "AI Automation": "ai-automation",
  "Web3 Wallets": "web3-wallets",
  "Smart Contracts": "smart-contract-development",
};

const FOOTER_LINKS: [string, string[]][] = [
  ["SERVICES", ["AI Chatbot", "Voice AI", "Agent Swarm", "AI Automation", "Web3 Wallets", "Smart Contracts"]],
  ["COMPANY", ["About", "Portfolio", "Team", "Tech Stack", "Process", "Contact"]],
  ["RESOURCES", ["Research Logs", "API Docs", "GitHub", "Changelog", "Health Status"]],
  ["CONNECT", ["Email", "GitHub", "Location", "Response Time"]],
];

export function AlphaFooter() {
  return (
    <footer id="footer" className="relative border-t border-border px-3 py-10 sm:px-6 sm:py-12">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-10" />

      {/* Hazard stripe top */}
      <div className="sigma-hazard-orange absolute inset-x-0 top-0 h-1" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        {/* Top section: logo + links grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-5">
          {/* Logo + tagline */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <span className="sigma-spin-slow font-sans text-2xl font-black text-[#FF4500] sm:text-3xl">Σ</span>
              <div>
                <div className="font-sans text-sm font-black uppercase">TAUNGOO SIGMA LAB</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[8px]">AI AUTOMATION & DEV</div>
              </div>
            </div>
            <p className="mt-3 font-serif text-xs italic text-muted-foreground">
              We are the sigma variable. AI, Web3, full-stack systems — shipped to production, not prototyped.
            </p>
            {/* Status indicators */}
            <div className="mt-3 space-y-1">
              {[
                ["SYSTEM", "ONLINE", "#00FF94"],
                ["SIGMA VAR", "1.0000", "#FF4500"],
                ["BUILD", "2.7.SIGMA", "#00E5FF"],
              ].map(([k, v, c]) => (
                <div key={k} className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] sm:text-[8px]">
                  <span className="text-muted-foreground">{k}</span>
                  <span style={{ color: c }}>
                    <span className="sigma-pulse mr-1 inline-block h-1 w-1" style={{ background: c }} />
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map(([category, items]) => (
            <div key={category}>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF4500] sm:text-[9px]">{category}</div>
              <div className="mt-2 space-y-1">
                {items.map((item) => {
                  // Use PageTransitionLink for service links (with the page transition + service name)
                  if (category === "SERVICES") {
                    const slug = SERVICE_SLUGS[item];
                    if (slug) {
                      return (
                        <PageTransitionLink
                          key={item}
                          href={`/services/${slug}`}
                          label={item}
                          kind="service"
                          className="block font-mono text-[11px] text-foreground/60 transition-colors hover:text-foreground sm:text-[10px]"
                        >
                          {item}
                        </PageTransitionLink>
                      );
                    }
                  }
                  // Plain anchor for hash links (Company/Resources/Connect)
                  return (
                    <a
                      key={item}
                      href="#"
                      className="block font-mono text-[11px] text-foreground/60 transition-colors hover:text-foreground sm:text-[10px]"
                    >
                      {item}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Mid section: API endpoints */}
        <div className="mt-8 border-t border-border/40 pt-4">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[8px]">▸ API ENDPOINTS</div>
          <div className="flex flex-wrap gap-1">
            {["/api/sigma/telemetry", "/api/sigma/transmit", "/api/sigma/health", "/api/sigma/version", "/api/sigma/badge", "/api/sigma/metrics", "/api/sigma/changelog", "/api/sigma/sse"].map((ep) => (
              <a
                key={ep}
                href={`${ep}?XTransformPort=3000`}
                target="_blank"
                rel="noreferrer"
                className="border border-border/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground sm:text-[8px]"
              >
                {ep}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom section: copyright + meta */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-[9px]">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <span>© MMXVI TAUNGOO SIGMA LAB</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline text-[#00FF94]">▮ ALL SYSTEMS NOMINAL</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <span>BUILD 2.7.SIGMA</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">DUAL MODE: Σ / Α</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">11 SECTORS</span>
          </div>
        </div>

        {/* Fake barcode */}
        <div className="mt-4 flex h-4 gap-px overflow-hidden">
          {Array.from({ length: 80 }).map((_, i) => (
            <span
              key={i}
              className="bg-foreground"
              style={{ width: i % 3 === 0 ? 2 : 1, opacity: (i * 7) % 10 < 6 ? 0.4 : 0.15 }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
