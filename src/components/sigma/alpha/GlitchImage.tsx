"use client";

import * as React from "react";

/**
 * GlitchImage — renders an image with a partial glitch effect.
 * The image is split into slices; alternate slices get RGB-split + displacement.
 * Uses CSS clip-path + transforms for the glitch.
 */
export function GlitchImage({
  src,
  alt = "",
  className = "",
  intensity = 0.5,
}: {
  src: string;
  alt?: string;
  className?: string;
  intensity?: number;
}) {
  const [glitching, setGlitching] = React.useState(false);

  // Periodically trigger glitch bursts
  React.useEffect(() => {
    const trigger = () => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200 + Math.random() * 300);
    };
    const interval = setInterval(() => {
      if (Math.random() > 0.6) trigger();
    }, 2000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Base image */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />

      {/* Glitch layer 1 — red channel, offset left */}
      <img
        src={src}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover mix-blend-screen transition-all duration-100"
        style={{
          opacity: glitching ? 0.7 : 0,
          transform: glitching ? `translateX(-${4 * intensity}px) skewX(-2deg)` : "translateX(0)",
          filter: "url(#glitch-red) hue-rotate(0deg) saturate(2)",
          clipPath: `polygon(0 ${20 + Math.random() * 10}%, 100% ${15 + Math.random() * 10}%, 100% ${35 + Math.random() * 10}%, 0 ${40 + Math.random() * 10}%)`,
        }}
      />

      {/* Glitch layer 2 — cyan channel, offset right, body section */}
      <img
        src={src}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover mix-blend-screen transition-all duration-100"
        style={{
          opacity: glitching ? 0.5 : 0,
          transform: glitching ? `translateX(${4 * intensity}px) skewX(2deg)` : "translateX(0)",
          filter: "url(#glitch-cyan) hue-rotate(180deg) saturate(2)",
          clipPath: `polygon(0 ${55 + Math.random() * 10}%, 100% ${50 + Math.random() * 10}%, 100% ${75 + Math.random() * 10}%, 0 ${70 + Math.random() * 10}%)`,
        }}
      />

      {/* Scanline slice glitch — horizontal band displacement */}
      <div
        className="pointer-events-none absolute inset-x-0 transition-all duration-75"
        style={{
          top: glitching ? `${30 + Math.random() * 20}%` : "50%",
          height: glitching ? `${5 + Math.random() * 10}%` : "0%",
          transform: glitching ? `translateX(${(Math.random() - 0.5) * 20}px)` : "translateX(0)",
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: glitching ? 0.8 : 0,
        }}
      />

      {/* SVG filters for RGB split */}
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="glitch-red">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            />
          </filter>
          <filter id="glitch-cyan">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
