"use client";

export function AlphaHero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-20" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-30" />

      {/* Background gradient glow */}
      <div
        className="pointer-events-none absolute -right-1/4 top-1/4 h-[60vh] w-[60vh] rounded-full opacity-20 blur-[100px]"
        style={{ background: "#FF4500" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="sigma-pulse mr-2 inline-block h-1.5 w-1.5 bg-[#00FF94]" />
          TAUNGOO SIGMA LAB · AI AUTOMATION & DEVELOPMENT
        </div>

        <h1 className="mt-4 font-sans text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
          WE BUILD<br />
          <span
            className="sigma-glitch"
            data-text="INTELLIGENT"
            style={{ color: "#FF4500" }}
          >
            INTELLIGENT
          </span><br />
          SYSTEMS.
        </h1>

        <p className="mt-6 max-w-2xl font-serif text-base italic text-muted-foreground sm:text-lg">
          A full-stack development lab engineering AI services, automation, Web3, and consumer/enterprise applications. From agent swarms to smart contracts — we ship production systems.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#services"
            className="border border-foreground bg-foreground px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80"
          >
            EXPLORE SERVICES →
          </a>
          <a
            href="#portfolio"
            className="border border-border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground/10"
          >
            VIEW WORK →
          </a>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ["50+", "PROJECTS SHIPPED"],
            ["8", "ENGINEERS"],
            ["11", "RESEARCH PILLARS"],
            ["99.9%", "UPTIME"],
          ].map(([v, k]) => (
            <div key={k} className="border-l-2 border-[#FF4500] pl-3">
              <div className="font-sans text-2xl font-black sm:text-3xl">{v}</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{k}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="sigma-blink">▼</span> SCROLL TO EXPLORE
        </div>
      </div>

      {/* Corner crosshairs */}
      <span className="absolute left-4 top-20 h-4 w-4 border-l border-t border-foreground/40" />
      <span className="absolute right-4 top-20 h-4 w-4 border-r border-t border-foreground/40" />
      <span className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-foreground/40" />
      <span className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-foreground/40" />
    </section>
  );
}
