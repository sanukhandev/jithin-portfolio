import React from "react";

export function RadarSchematic({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full aspect-[16/10] bg-surface-raised border border-border-subtle rounded-xl overflow-hidden p-6 flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background Grid */}
        <defs>
          <pattern id="radarGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" className="stroke-ink/5" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="600" height="360" fill="url(#radarGrid)" />

        {/* Polar Circles */}
        <circle cx="300" cy="180" r="140" className="stroke-ink/20" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="300" cy="180" r="95" className="stroke-ink/25" strokeWidth="1" />
        <circle cx="300" cy="180" r="50" className="stroke-ink/35" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="300" cy="180" r="6" className="fill-ink" />

        {/* Quadrant Lines */}
        <line x1="160" y1="180" x2="440" y2="180" className="stroke-ink/20" strokeWidth="1" />
        <line x1="300" y1="40" x2="300" y2="320" className="stroke-ink/20" strokeWidth="1" />

        {/* Horizon Labels */}
        <text x="305" y="140" className="fill-ink/60 text-[10px] font-mono tracking-widest">H1 · EFFICIENCY</text>
        <text x="305" y="95" className="fill-ink/60 text-[10px] font-mono tracking-widest">H2 · AUGMENTATION</text>
        <text x="305" y="50" className="fill-ink/60 text-[10px] font-mono tracking-widest">H3 · AUTONOMOUS</text>

        {/* Plotted Opportunities */}
        {/* Opp 1: High value, high feasibility */}
        <g>
          <circle cx="360" cy="130" r="5" className="fill-ink" />
          <circle cx="360" cy="130" r="12" className="stroke-ink/40" strokeWidth="1" />
          <text x="375" y="133" className="fill-ink text-[11px] font-mono">OPP-01 [SCORE 94]</text>
        </g>

        {/* Opp 2: Workflow augmentation */}
        <g>
          <circle cx="230" cy="120" r="4" className="fill-ink" />
          <circle cx="230" cy="120" r="9" className="stroke-ink/30" strokeWidth="1" />
          <text x="140" y="115" className="fill-ink text-[11px] font-mono">OPP-02 [SCORE 88]</text>
        </g>

        {/* Opp 3: Autonomous scale */}
        <g>
          <circle cx="390" cy="240" r="5" className="fill-ink" />
          <circle cx="390" cy="240" r="14" className="stroke-ink/40" strokeWidth="1" strokeDasharray="3 3" />
          <text x="380" y="265" className="fill-ink text-[11px] font-mono">OPP-03 [SCORE 81]</text>
        </g>

        {/* Opp 4: Candidate gate */}
        <g>
          <circle cx="210" cy="230" r="4" className="fill-ink/60" />
          <circle cx="210" cy="230" r="8" className="stroke-ink/25" strokeWidth="1" />
          <text x="135" y="245" className="fill-ink/60 text-[11px] font-mono">OPP-04 [REVIEW]</text>
        </g>
      </svg>
    </div>
  );
}
