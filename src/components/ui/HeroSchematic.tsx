import React from "react";

export function HeroSchematic({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full aspect-square max-w-[520px] mx-auto flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full stroke-ink/20"
      >
        {/* Concentric orbital rings representing cognitive layers */}
        <circle cx="250" cy="250" r="220" strokeDasharray="3 3" className="stroke-ink/15" />
        <circle cx="250" cy="250" r="160" className="stroke-ink/20" />
        <circle cx="250" cy="250" r="100" strokeDasharray="4 4" className="stroke-ink/25" />
        <circle cx="250" cy="250" r="40" className="stroke-ink/40 fill-surface-raised" />

        {/* Central Core Node */}
        <circle cx="250" cy="250" r="8" className="fill-ink" />

        {/* Coordinate Axes */}
        <line x1="250" y1="20" x2="250" y2="480" className="stroke-ink/10" />
        <line x1="20" y1="250" x2="480" y2="250" className="stroke-ink/10" />

        {/* Diagonal vectors */}
        <line x1="90" y1="90" x2="410" y2="410" strokeDasharray="2 2" className="stroke-ink/10" />
        <line x1="90" y1="410" x2="410" y2="90" strokeDasharray="2 2" className="stroke-ink/10" />

        {/* Distributed Autonomous Nodes */}
        <g className="nodes">
          {/* Node 1: Top Right */}
          <line x1="250" y1="250" x2="360" y2="140" className="stroke-ink/30" />
          <circle cx="360" cy="140" r="5" className="fill-ink" />
          <circle cx="360" cy="140" r="12" className="stroke-ink/25" />

          {/* Node 2: Top Left */}
          <line x1="250" y1="250" x2="150" y2="120" className="stroke-ink/30" />
          <circle cx="150" cy="120" r="4" className="fill-ink" />
          <circle cx="150" cy="120" r="10" className="stroke-ink/25" />

          {/* Node 3: Bottom Left */}
          <line x1="250" y1="250" x2="130" y2="340" className="stroke-ink/30" />
          <circle cx="130" cy="340" r="6" className="fill-ink" />
          <circle cx="130" cy="340" r="14" className="stroke-ink/25" />

          {/* Node 4: Bottom Right */}
          <line x1="250" y1="250" x2="370" y2="330" className="stroke-ink/30" />
          <circle cx="370" cy="330" r="5" className="fill-ink" />
          <circle cx="370" cy="330" r="12" className="stroke-ink/25" />

          {/* Satellite Data Points */}
          <circle cx="250" cy="90" r="3" className="fill-ink/50" />
          <circle cx="410" cy="250" r="3" className="fill-ink/50" />
          <circle cx="250" cy="410" r="3" className="fill-ink/50" />
          <circle cx="90" cy="250" r="3" className="fill-ink/50" />

          {/* Inter-node links */}
          <line x1="150" y1="120" x2="360" y2="140" strokeDasharray="3 3" className="stroke-ink/15" />
          <line x1="360" y1="140" x2="370" y2="330" strokeDasharray="3 3" className="stroke-ink/15" />
          <line x1="370" y1="330" x2="130" y2="340" strokeDasharray="3 3" className="stroke-ink/15" />
          <line x1="130" y1="340" x2="150" y2="120" strokeDasharray="3 3" className="stroke-ink/15" />
        </g>
      </svg>
    </div>
  );
}
