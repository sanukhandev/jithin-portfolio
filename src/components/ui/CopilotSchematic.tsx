import React from "react";

export function CopilotSchematic({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full aspect-[16/10] flex items-center justify-center select-none pointer-events-none ${className}`}
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
          <pattern id="copilotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" className="stroke-ink/5" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="600" height="360" fill="url(#copilotGrid)" />

        {/* Pipeline Nodes */}
        {/* Step 1: User Query / Intent */}
        <rect x="40" y="140" width="110" height="80" rx="8" className="fill-surface stroke-ink/30" strokeWidth="1.5" />
        <text x="55" y="175" className="fill-ink text-[11px] font-mono font-medium">INTENT ENGINE</text>
        <text x="55" y="195" className="fill-ink/60 text-[9px] font-mono">PARSING & MASK</text>

        {/* Step 2: Retrieval & Context Mesh */}
        <rect x="200" y="90" width="120" height="80" rx="8" className="fill-surface stroke-ink/30" strokeWidth="1.5" />
        <text x="215" y="125" className="fill-ink text-[11px] font-mono font-medium">HYBRID RAG</text>
        <text x="215" y="145" className="fill-ink/60 text-[9px] font-mono">VECTOR + BM25</text>

        {/* Step 3: Security & ACL Gateway */}
        <rect x="200" y="190" width="120" height="80" rx="8" className="fill-surface stroke-ink/40" strokeWidth="1.5" />
        <text x="215" y="225" className="fill-ink text-[11px] font-mono font-medium">ACL GATEWAY</text>
        <text x="215" y="245" className="fill-ink/60 text-[9px] font-mono">ZERO-TRUST AUTH</text>

        {/* Step 4: Supervised LLM Synthesis */}
        <rect x="370" y="140" width="120" height="80" rx="8" className="fill-surface stroke-ink/40" strokeWidth="1.5" />
        <text x="385" y="175" className="fill-ink text-[11px] font-mono font-medium">SYNTHESIS</text>
        <text x="385" y="195" className="fill-ink/60 text-[9px] font-mono">CITATION PROOF</text>

        {/* Step 5: Output */}
        <circle cx="530" cy="180" r="22" className="fill-action-bg" />
        <circle cx="530" cy="180" r="30" className="stroke-ink/30" strokeWidth="1" strokeDasharray="3 3" />
        <text x="522" y="184" className="fill-action-text text-[10px] font-mono font-bold">OK</text>

        {/* Connecting Lines */}
        <line x1="150" y1="180" x2="200" y2="130" className="stroke-ink/40" strokeWidth="1.5" />
        <line x1="150" y1="180" x2="200" y2="230" className="stroke-ink/40" strokeWidth="1.5" />
        <line x1="320" y1="130" x2="370" y2="180" className="stroke-ink/40" strokeWidth="1.5" />
        <line x1="320" y1="230" x2="370" y2="180" className="stroke-ink/40" strokeWidth="1.5" />
        <line x1="490" y1="180" x2="500" y2="180" className="stroke-ink/60" strokeWidth="2" />
      </svg>
    </div>
  );
}
