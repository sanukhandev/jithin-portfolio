"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

// Closed-Loop Multi-Agent Circuit Streams
const AUTO_CIRCUIT_STREAMS = [
  // 1. Event Ingest -> Durable State Machine
  {
    d: "M 165 96 L 240 96",
    duration: 2.2,
    delay: 0,
  },
  // 2. State Machine -> Agent Runner Sandbox
  {
    d: "M 368 96 L 435 96",
    duration: 2.2,
    delay: 0.4,
  },
  // 3. Agent Runner -> Supervisor Gate (Evaluation & Threshold)
  {
    d: "M 495 127 C 520 175, 455 230, 416 230",
    duration: 3.2,
    delay: 0.8,
  },
  // 4. Supervisor Gate -> Immutable Cryptographic Log
  {
    d: "M 345 262 L 257 262",
    duration: 2.4,
    delay: 1.4,
  },
  // 5. Immutable Log -> Feedback Loop into Ingest
  {
    d: "M 115 262 C 55 250, 40 165, 105 127",
    duration: 3.6,
    delay: 1.8,
  },
];

export function AutonomousSchematic({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`relative w-full aspect-[16/10] flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* 1. HIGH-CONTRAST TECHNICAL COORDINATE GRID */}
        <defs>
          <pattern
            id="autoGridPattern"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 30 0 L 0 0 0 30"
              fill="none"
              className="stroke-ink/10"
              strokeWidth="0.8"
            />
            <circle cx="0" cy="0" r="0.9" className="fill-ink/20" />
          </pattern>
        </defs>
        <rect width="600" height="360" fill="url(#autoGridPattern)" />

        {/* 2. DYNAMIC CLOSED-LOOP CIRCUIT STREAMS */}
        <g className="auto-circuit-streams">
          {AUTO_CIRCUIT_STREAMS.map((stream, idx) => (
            <React.Fragment key={`auto-stream-${idx}`}>
              {/* Static Guide Line */}
              <path
                d={stream.d}
                fill="none"
                className="stroke-ink/20"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              {/* Animated Traveling Packet Signal */}
              {!shouldReduceMotion && (
                <motion.path
                  d={stream.d}
                  fill="none"
                  className="stroke-ink"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeDasharray="26 140"
                  animate={{
                    strokeDashoffset: [166, -166],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: stream.duration,
                    repeat: Infinity,
                    delay: stream.delay,
                    ease: "linear",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </g>

        {/* 3. ARCHITECTURAL STATE MACHINE NODES */}

        {/* Node 1: Event Ingest Engine */}
        <g transform="translate(45, 65)">
          <rect
            x="0"
            y="0"
            width="120"
            height="62"
            rx="7"
            className="fill-surface stroke-ink/35"
            strokeWidth="1.2"
          />
          <line x1="0" y1="22" x2="120" y2="22" className="stroke-ink/15" strokeWidth="1" />
          <text x="8" y="15" className="fill-ink/60 font-mono text-[8px] uppercase tracking-wider font-semibold">
            01 · TRIGGER
          </text>
          <text x="8" y="38" className="fill-ink font-mono text-[10.5px] font-bold tracking-tight">
            EVENT INGEST
          </text>
          <text x="8" y="52" className="fill-ink-muted font-sans text-[8.5px] font-medium">
            PubSub Streaming Queue
          </text>
        </g>

        {/* Node 2: Durable State Machine */}
        <g transform="translate(240, 65)">
          <rect
            x="0"
            y="0"
            width="128"
            height="62"
            rx="7"
            className="fill-surface stroke-ink/45"
            strokeWidth="1.4"
          />
          <line x1="0" y1="22" x2="128" y2="22" className="stroke-ink/15" strokeWidth="1" />
          <text x="8" y="15" className="fill-ink/60 font-mono text-[8px] uppercase tracking-wider font-semibold">
            02 · ORCHESTRATOR
          </text>
          <text x="8" y="38" className="fill-ink font-mono text-[10.5px] font-bold tracking-tight">
            STATE MACHINE
          </text>
          <text x="8" y="52" className="fill-ink-muted font-sans text-[8.5px] font-medium">
            Durable Checkpoints
          </text>
          {/* Checkpoint Heartbeat Dot */}
          {!shouldReduceMotion && (
            <motion.circle
              cx="118"
              cy="12"
              r="3"
              className="fill-ink"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </g>

        {/* Node 3: Agent Sandbox Runner */}
        <g transform="translate(435, 65)">
          <rect
            x="0"
            y="0"
            width="120"
            height="62"
            rx="7"
            className="fill-surface stroke-ink/35"
            strokeWidth="1.2"
          />
          <line x1="0" y1="22" x2="120" y2="22" className="stroke-ink/15" strokeWidth="1" />
          <text x="8" y="15" className="fill-ink/60 font-mono text-[8px] uppercase tracking-wider font-semibold">
            03 · EXECUTION
          </text>
          <text x="8" y="38" className="fill-ink font-mono text-[10.5px] font-bold tracking-tight">
            AGENT RUNNER
          </text>
          <text x="8" y="52" className="fill-ink-muted font-sans text-[8.5px] font-medium">
            Sandboxed Tool Actions
          </text>
        </g>

        {/* Node 4: Supervisor Gate (Human-in-the-Loop Threshold) */}
        <g transform="translate(345, 230)">
          <rect
            x="0"
            y="0"
            width="142"
            height="65"
            rx="8"
            className="fill-surface stroke-ink/40"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <line x1="0" y1="22" x2="142" y2="22" className="stroke-ink/15" strokeWidth="1" />
          <text x="10" y="15" className="fill-ink/60 font-mono text-[8px] uppercase tracking-wider font-semibold">
            04 · GOVERNANCE
          </text>
          <text x="10" y="38" className="fill-ink font-mono text-[10.5px] font-bold tracking-tight">
            SUPERVISOR GATE
          </text>
          <text x="10" y="54" className="fill-ink font-mono text-[9px] font-bold text-ink">
            CONFIDENCE &gt; 98%
          </text>
          {/* Active Supervisor Pulse Ring */}
          {!shouldReduceMotion && (
            <motion.circle
              cx="130"
              cy="12"
              r="4"
              className="stroke-ink/60 fill-transparent"
              strokeWidth="1.2"
              animate={{
                r: [4, 12],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
        </g>

        {/* Node 5: Immutable Audit Ledger */}
        <g transform="translate(115, 230)">
          <rect
            x="0"
            y="0"
            width="142"
            height="65"
            rx="8"
            className="fill-surface stroke-ink/35"
            strokeWidth="1.2"
          />
          <line x1="0" y1="22" x2="142" y2="22" className="stroke-ink/15" strokeWidth="1" />
          <text x="10" y="15" className="fill-ink/60 font-mono text-[8px] uppercase tracking-wider font-semibold">
            05 · IMMUTABILITY
          </text>
          <text x="10" y="38" className="fill-ink font-mono text-[10.5px] font-bold tracking-tight">
            AUDIT LEDGER
          </text>
          <text x="10" y="54" className="fill-ink-muted font-sans text-[8.5px] font-medium">
            Cryptographic Tamper-Proof
          </text>
          {/* Cryptographic Seal Dot */}
          <circle cx="130" cy="12" r="3" className="fill-ink" />
        </g>
      </svg>
    </div>
  );
}
