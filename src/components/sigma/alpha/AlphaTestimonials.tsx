const TESTIMONIALS = [
  { quote: "The sigma variable approach to AI orchestration is unlike anything we've seen. Our agent loops stabilized immediately.", author: "CTO, Fintech Startup" },
  { quote: "They shipped our DAO governance system in 3 weeks. Production-ready, audited, deployed.", author: "Founder, DeFi Protocol" },
  { quote: "The voice AI agent handles 80% of our inbound calls. It pays for itself.", author: "Head of Sales, SaaS Company" },
];

export function AlphaTestimonials() {
  return (
    <section id="testimonials" className="border-t border-border px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">▸ 08 / TESTIMONIALS</div>
        <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-5xl">
          FIELD REPORTS.
        </h2>
        
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="border border-border p-4">
              <p className="font-serif text-base italic leading-relaxed">"{t.quote}"</p>
              <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">— {t.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
