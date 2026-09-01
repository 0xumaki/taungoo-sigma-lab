"use client";

import * as React from "react";
import { PROJECTS, SERVICES } from "../beta/beta-data";

/**
 * AlphaDataRiver — persistent bottom data stream (signature element).
 * Shows project names + tech tags scrolling horizontally.
 * Like a stock ticker but for portfolio content.
 */
export function AlphaDataRiver() {
  // Build items from projects + services
  const items = React.useMemo(() => {
    const projectItems = PROJECTS.map((p) => ({ label: p.name, tag: p.cat }));
    const serviceItems = SERVICES.slice(0, 8).map((s) => ({ label: s.name, tag: "SERVICE" }));
    const techItems = ["Next.js 16", "React 19", "TypeScript", "Solidity", "Prisma", "GSAP", "Three.js", "AI / ML"];
    const techTags = techItems.map((t) => ({ label: t, tag: "STACK" }));
    // Interleave: project, tech, service, tech, project...
    const mixed: { label: string; tag: string }[] = [];
    for (let i = 0; i < Math.max(projectItems.length, serviceItems.length); i++) {
      if (projectItems[i]) mixed.push(projectItems[i]);
      if (techTags[i % techTags.length]) mixed.push(techTags[i % techTags.length]);
      if (serviceItems[i]) mixed.push(serviceItems[i]);
    }
    return mixed;
  }, []);

  return (
    <div className="alpha-data-river">
      <div className="alpha-data-river-track">
        {/* Duplicate items for seamless scroll */}
        {[...items, ...items].map((item, i) => (
          <div key={i} className="alpha-data-river-item">
            <span className="dot" />
            <span style={{ color: "var(--alpha-fg)" }}>{item.label}</span>
            <span style={{ color: "var(--alpha-accent)", fontSize: "8px", marginLeft: "4px" }}>{item.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
