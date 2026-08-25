export function AlphaFooter() {
  return (
    <footer id="footer" className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-2xl font-black">Σ</span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">TAUNGOO SIGMA LAB</span>
            </div>
            <p className="mt-2 font-serif text-xs italic text-muted-foreground">
              AI automation & development lab. We are the sigma variable.
            </p>
          </div>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">SERVICES</div>
            <div className="mt-1 space-y-0.5">
              {["AI Services", "Web3", "Full-Stack", "Design"].map((s) => (
                <div key={s} className="font-mono text-[10px] text-foreground/70">{s}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">COMPANY</div>
            <div className="mt-1 space-y-0.5">
              {["About", "Portfolio", "Team", "Contact"].map((s) => (
                <div key={s} className="font-mono text-[10px] text-foreground/70">{s}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">CONNECT</div>
            <div className="mt-1 space-y-0.5">
              <div className="font-mono text-[10px] text-foreground/70">contact@taungoosigma.lab</div>
              <div className="font-mono text-[10px] text-foreground/70">github.com/0xumaki</div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/60 pt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>© MMXXIV TAUNGOO SIGMA LAB · ALL SYSTEMS NOMINAL</span>
          <span>BUILD 2.7.SIGMA</span>
        </div>
      </div>
    </footer>
  );
}
