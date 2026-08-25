export function AlphaContact() {
  return (
    <section id="contact" className="border-t border-border px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">▸ 10 / CONTACT</div>
        <h2 className="mt-2 font-sans text-5xl font-black uppercase tracking-tight sm:text-7xl">
          LET'S BUILD SOMETHING.
        </h2>
        <p className="mt-4 font-serif text-lg italic text-muted-foreground">
          Have a project in mind? Not sure which service fits? Reach out — we respond within 72 hours with a tailored proposal.
        </p>
        
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <a href="mailto:contact@taungoosigma.lab" className="border border-border p-4 text-center transition-colors hover:bg-foreground/10">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">EMAIL</div>
            <div className="mt-1 font-mono text-sm text-foreground">contact@taungoosigma.lab</div>
          </a>
          <div className="border border-border p-4 text-center">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">RESPONSE TIME</div>
            <div className="mt-1 font-mono text-sm text-foreground">72 hours</div>
          </div>
          <div className="border border-border p-4 text-center">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">LOCATION</div>
            <div className="mt-1 font-mono text-sm text-foreground">Taungoo, MM</div>
          </div>
        </div>
        
        <a href="mailto:contact@taungoosigma.lab" className="mt-8 inline-block border border-foreground bg-foreground px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80">
          START A PROJECT →
        </a>
      </div>
    </section>
  );
}
