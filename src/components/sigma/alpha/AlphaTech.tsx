const TECH = [
  { category: "AI / ML", items: ["GPT-4", "Claude", "Llama", "Whisper", "ElevenLabs", "LangChain", "MCP"] },
  { category: "WEB3", items: ["Solidity", "Ethereum", "Polygon", "The Graph", "IPFS", "Hardhat", "Web3.js"] },
  { category: "FRONTEND", items: ["React", "Next.js", "TypeScript", "Tailwind", "GSAP", "Three.js"] },
  { category: "BACKEND", items: ["Node.js", "Prisma", "PostgreSQL", "Redis", "GraphQL", "tRPC"] },
  { category: "INFRA", items: ["Docker", "AWS", "Vercel", "Supabase", "Cloudflare", "Linear"] },
  { category: "MOBILE", items: ["React Native", "Expo", "Flutter", "Swift", "Kotlin"] },
];

export function AlphaTech() {
  return (
    <section id="tech" className="border-t border-border px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">▸ 07 / TECH STACK</div>
        <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-5xl">
          TOOLS WE WIELD.
        </h2>
        
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TECH.map((t) => (
            <div key={t.category} className="border border-border p-4">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF4500]">{t.category}</h3>
              <div className="mt-2 flex flex-wrap gap-1">
                {t.items.map((item) => (
                  <span key={item} className="border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
