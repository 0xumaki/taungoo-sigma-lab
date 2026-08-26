"use client";

import * as React from "react";

const NAV_ITEMS = [
  { label: "ABOUT", target: "about" },
  { label: "SERVICES", target: "services" },
  { label: "WORK", target: "portfolio" },
  { label: "PROCESS", target: "process" },
  { label: "TEAM", target: "team" },
  { label: "TECH", target: "tech" },
  { label: "CONTACT", target: "contact" },
];

export function AlphaNav() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed inset-x-0 top-0 z-[85] border-b transition-colors ${scrolled ? "border-border bg-background/95 backdrop-blur-md" : "border-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-sans text-2xl font-black">Σ</span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">TAUNGOO SIGMA LAB</span>
        </div>
        {/* Nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.target}
              href={`#${item.target}`}
              className="border border-transparent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
        {/* CTA */}
        <a
          href="#contact"
          className="border border-foreground bg-foreground px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80"
        >
          START A PROJECT →
        </a>
      </div>
    </nav>
  );
}
