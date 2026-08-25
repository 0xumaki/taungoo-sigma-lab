"use client";

export function AlphaAbout() {
  const capabilityData: [string, number, string][] = [
    ["AI / MACHINE LEARNING", 95, "#00FF94"],
    ["WEB3 / BLOCKCHAIN", 88, "#C6FF00"],
    ["FULL-STACK DEVELOPMENT", 92, "#00E5FF"],
    ["DESIGN / UX", 80, "#FF2D7E"],
    ["AUTOMATION / N8N", 90, "#FFB300"],
  ];

  const statData: [string, string, string][] = [
    ["26", "SERVICES", "#FF4500"],
    ["10", "DEPLOYED PROJECTS", "#00FF94"],
    ["8", "OPERATORS", "#00E5FF"],
    ["11", "SECTORS", "#C6FF00"],
  ];

  return (
    <section id="about" className="relative border-t border-border px-6 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="mx-auto max-w-7xl">
        {/* Section header — maximalist */}
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 02 / ABOUT</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              ENGINEERING THE<br />
              <span style={{ color: "#FF4500" }}>FUTURE</span>, TODAY.
            </h2>
          </div>
          <div className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            EST. 2024<br />TAUNGOO, MM
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: Mission statement */}
          <div className="lg:col-span-2">
            <div className="border-l-4 border-[#FF4500] pl-4">
              <p className="font-serif text-xl italic leading-relaxed text-foreground/90">
                We're a full-stack development lab building AI automation, agent swarms, and Web3 infrastructure for consumer and enterprise clients.
              </p>
              <p className="mt-4 font-serif text-base italic leading-relaxed text-muted-foreground">
                From multi-model AI agents that handle real workloads, to DeFi protocols that settle on mainnet — every system we build ships to production. No black boxes. No vaporware. Every system ships with monitoring, documentation, and support.
              </p>
              <p className="mt-4 font-serif text-base italic leading-relaxed text-muted-foreground">
                We operate as a collective of specialized operators — each with deep expertise in their domain.
              </p>
            </div>

            {/* Capability bars */}
            <div className="mt-6 space-y-2">
              {capabilityData.map(([label, pct, color]) => (
                <div key={label}>
                  <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em]">
                    <span className="text-muted-foreground">{label}</span>
                    <span style={{ color }}>{pct}%</span>
                  </div>
                  <div className="mt-0.5 h-1.5 w-full bg-foreground/10">
                    <div
                      className="h-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stat cards */}
          <div className="space-y-3">
            {/* Mini stat cards */}
            <div className="grid grid-cols-2 gap-2">
              {statData.map(([v, k, c]) => (
                <div key={k} className="border border-border/60 bg-card/40 p-3">
                  <div className="font-sans text-2xl font-black" style={{ color: c }}>{v}</div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">{k}</div>
                </div>
              ))}
            </div>

            {/* Approach panel */}
            <div className="border border-border/60 bg-card/40 p-4">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#FF4500]">▸ OUR APPROACH</div>
              <div className="mt-2 space-y-1.5">
                {[
                  "Production-first — every system ships",
                  "Multi-model — right tool for each task",
                  "Documented — no black boxes",
                  "Supported — ongoing maintenance",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="text-[#00FF94]">▸</span>
                    <span className="font-mono text-[10px] text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sigma stamp */}
            <div className="flex items-center justify-center border border-border/40 p-3">
              <span className="sigma-spin-slow mr-3 font-sans text-3xl font-black text-[#FF4500]">Σ</span>
              <span className="font-mono text-[8px] uppercase leading-tight tracking-[0.2em] text-muted-foreground">
                THE SIGMA<br />VARIABLE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
