import React from "react";

export function AutonomousSchematic({ className = "" }: { className?: string }) {
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
          <pattern id="autoGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" className="stroke-ink/5" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="600" height="360" fill="url(#autoGrid)" />

        {/* State Machine Loop */}
        {/* State 1: Trigger Event */}
        <rect x="50" y="70" width="120" height="60" rx="6" className="fill-surface stroke-ink/30" strokeWidth="1.5" />
        <text x="65" y="98" className="fill-ink text-[11px] font-mono font-medium">EVENT INGEST</text>
        <text x="65" y="115" className="fill-ink/60 text-[9px] font-mono">PUBSUB QUEUE</text>

        {/* State 2: Durable State Machine */}
        <rect x="240" y="70" width="130" height="60" rx="6" className="fill-surface stroke-ink/50" strokeWidth="1.5" />
        <text x="255" y="98" className="fill-ink text-[11px] font-mono font-medium">STATE MACHINE</text>
        <text x="255" y="115" className="fill-ink/60 text-[9px] font-mono">CHECKPOINTING</text>

        {/* State 3: Agent Sandbox Execution */}
        <rect x="430" y="70" width="120" height="60" rx="6" className="fill-surface stroke-ink/30" strokeWidth="1.5" />
        <text x="445" y="98" className="fill-ink text-[11px] font-mono font-medium">AGENT RUNNER</text>
        <text x="445" y="115" className="fill-ink/60 text-[9px] font-mono">SCOPED ACTIONS</text>

        {/* State 4: Human-in-the-Loop Threshold */}
        <rect x="340" y="220" width="140" height="65" rx="6" className="fill-surface stroke-ink/40" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="355" y="248" className="fill-ink text-[11px] font-mono font-medium">SUPERVISOR GATE</text>
        <text x="355" y="265" className="fill-ink/60 text-[9px] font-mono">CONFIDENCE &gt; 98%</text>

        {/* State 5: Immutable Audit Ledger */}
        <rect x="120" y="220" width="140" height="65" rx="6" className="fill-surface stroke-ink/30" strokeWidth="1.5" />
        <text x="135" y="248" className="fill-ink text-[11px] font-mono font-medium">IMMUTABLE LOG</text>
        <text x="135" y="265" className="fill-ink/60 text-[9px] font-mono">CRYPTOGRAPHIC PROOF</text>

        {/* Workflow Arrows */}
        <line x1="170" y1="100" x2="240" y2="100" className="stroke-ink/40" strokeWidth="1.5" />
        <line x1="370" y1="100" x2="430" y2="100" className="stroke-ink/40" strokeWidth="1.5" />
        <line x1="490" y1="130" x2="440" y2="220" className="stroke-ink/40" strokeWidth="1.5" />
        <line x1="340" y1="250" x2="260" y2="250" className="stroke-ink/40" strokeWidth="1.5" />
        <line x1="120" y1="240" x2="80" y2="130" className="stroke-ink/30" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    </div>
  );
}
