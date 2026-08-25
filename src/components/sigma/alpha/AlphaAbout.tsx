export function AlphaAbout() {
  return (
    <section id="about" className="border-t border-border px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">▸ 02 / ABOUT</div>
        <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-5xl">
          A LAB THAT BUILDS WHAT OTHERS CAN'T.
        </h2>
        
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <p className="font-serif text-lg italic leading-relaxed text-muted-foreground">
              Taungoo Sigma Lab is a full-stack development lab specializing in AI automation, agent swarms, and Web3 infrastructure. We engineer production systems — from multi-model AI agents that handle real workloads, to DeFi protocols that settle on mainnet.
            </p>
            <p className="mt-4 font-serif text-lg italic leading-relaxed text-muted-foreground">
              We operate as a collective of specialized operators, each with deep expertise in their domain. No black boxes, no vaporware — every system we build ships to production with monitoring, documentation, and support.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="border-l-2 border-[#FF4500] pl-4">
              <h3 className="font-sans text-xl font-bold uppercase">AI Services</h3>
              <p className="font-serif text-sm italic text-muted-foreground">Chatbots, voice AI, agent swarms, MCP services, and automation pipelines.</p>
            </div>
            <div className="border-l-2 border-[#00E5FF] pl-4">
              <h3 className="font-sans text-xl font-bold uppercase">Web3</h3>
              <p className="font-serif text-sm italic text-muted-foreground">Wallets, AMMs, DEXs, DAOs, NFTs, smart contracts, and security audits.</p>
            </div>
            <div className="border-l-2 border-[#C6FF00] pl-4">
              <h3 className="font-sans text-xl font-bold uppercase">Full-Stack</h3>
              <p className="font-serif text-sm italic text-muted-foreground">Web apps, mobile apps, desktop apps, Chrome extensions, and UI/UX design.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
