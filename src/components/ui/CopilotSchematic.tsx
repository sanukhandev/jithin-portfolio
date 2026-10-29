"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

// Pipeline Channels connecting architectural stages
const COPILOT_STREAMS = [
  // Intent Engine -> Hybrid RAG Mesh
  {
    d: "M 150 165 C 175 165, 175 122, 200 122",
    duration: 2.6,
    delay: 0,
  },
  // Intent Engine -> ACL Zero-Trust Gateway
  {
    d: "M 150 195 C 175 195, 175 238, 200 238",
    duration: 2.6,
    delay: 0.3,
  },
  // Hybrid RAG -> LLM Synthesis Node
  {
    d: "M 325 122 C 350 122, 350 165, 375 165",
    duration: 2.8,
    delay: 0.6,
  },
  // ACL Gateway -> LLM Synthesis Node
  {
    d: "M 325 238 C 350 238, 350 195, 375 195",
    duration: 2.8,
    delay: 0.9,
  },
  // LLM Synthesis -> Verified Output Node
  {
    d: "M 500 180 L 522 180",
    duration: 1.8,
    delay: 1.2,
  },
];

export function CopilotSchematic({ className = "" }: { className?: string }) {
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
            id="copilotGridPattern"
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
        <rect width="600" height="360" fill="url(#copilotGridPattern)" />

        {/* 2. DYNAMIC PIPELINE SIGNAL STREAMS */}
        <g className="copilot-streams">
          {COPILOT_STREAMS.map((stream, idx) => (
            <React.Fragment key={`c-stream-${idx}`}>
              {/* Static Guide Line */}
              <path
                d={stream.d}
                fill="none"
                className="stroke-ink/20"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              {/* Dynamic Telemetry Pulse */}
              {!shouldReduceMotion && (
                <motion.path
                  d={stream.d}
                  fill="none"
                  className="stroke-ink"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="28 150"
                  animate={{
                    strokeDashoffset: [178, -178],
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

        {/* 3. ARCHITECTURAL NODES */}

        {/* Stage 1: User Query / Intent Engine */}
        <g transform="translate(38, 140)">
          <rect
            x="0"
            y="0"
            width="112"
            height="80"
            rx="8"
            className="fill-surface stroke-ink/35"
            strokeWidth="1.2"
          />
          <line x1="0" y1="26" x2="112" y2="26" className="stroke-ink/15" strokeWidth="1" />
          <text x="10" y="17" className="fill-ink/60 font-mono text-[8.5px] uppercase tracking-wider font-semibold">
            01 · INPUT
          </text>
          <text x="10" y="46" className="fill-ink font-mono text-[11px] font-bold tracking-tight">
            INTENT ENGINE
          </text>
          <text x="10" y="62" className="fill-ink-muted font-sans text-[9px] font-medium">
            Semantic Parsing & Mask
          </text>
          {/* Active Emitting Port */}
          {!shouldReduceMotion && (
            <motion.circle
              cx="112"
              cy="40"
              r="3.5"
              className="fill-ink"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </g>

        {/* Stage 2A: Hybrid RAG Retrieval */}
        <g transform="translate(200, 82)">
          <rect
            x="0"
            y="0"
            width="125"
            height="78"
            rx="8"
            className="fill-surface stroke-ink/35"
            strokeWidth="1.2"
          />
          <line x1="0" y1="26" x2="125" y2="26" className="stroke-ink/15" strokeWidth="1" />
          <text x="10" y="17" className="fill-ink/60 font-mono text-[8.5px] uppercase tracking-wider font-semibold">
            02A · RETRIEVAL
          </text>
          <text x="10" y="46" className="fill-ink font-mono text-[11px] font-bold tracking-tight">
            HYBRID RAG MESH
          </text>
          <text x="10" y="62" className="fill-ink-muted font-sans text-[9px] font-medium">
            Dense Vector + BM25
          </text>
        </g>

        {/* Stage 2B: Security & ACL Zero-Trust Gateway */}
        <g transform="translate(200, 198)">
          <rect
            x="0"
            y="0"
            width="125"
            height="78"
            rx="8"
            className="fill-surface stroke-ink/40"
            strokeWidth="1.2"
          />
          <line x1="0" y1="26" x2="125" y2="26" className="stroke-ink/15" strokeWidth="1" />
          <text x="10" y="17" className="fill-ink/60 font-mono text-[8.5px] uppercase tracking-wider font-semibold">
            02B · SECURITY
          </text>
          <text x="10" y="46" className="fill-ink font-mono text-[11px] font-bold tracking-tight">
            ACL ZERO-TRUST
          </text>
          <text x="10" y="62" className="fill-ink-muted font-sans text-[9px] font-medium">
            Entitlement & Vault
          </text>
          {/* Animated Security Scanner Line */}
          {!shouldReduceMotion && (
            <motion.line
              x1="6"
              y1="34"
              x2="119"
              y2="34"
              className="stroke-ink/60"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              animate={{
                y1: [32, 70, 32],
                y2: [32, 70, 32],
                opacity: [0.3, 0.9, 0.3],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </g>

        {/* Stage 3: Supervised LLM Synthesis */}
        <g transform="translate(375, 140)">
          <rect
            x="0"
            y="0"
            width="125"
            height="80"
            rx="8"
            className="fill-surface stroke-ink/40"
            strokeWidth="1.2"
          />
          <line x1="0" y1="26" x2="125" y2="26" className="stroke-ink/15" strokeWidth="1" />
          <text x="10" y="17" className="fill-ink/60 font-mono text-[8.5px] uppercase tracking-wider font-semibold">
            03 · SYNTHESIS
          </text>
          <text x="10" y="46" className="fill-ink font-mono text-[11px] font-bold tracking-tight">
            LLM SYNTHESIS
          </text>
          <text x="10" y="62" className="fill-ink-muted font-sans text-[9px] font-medium">
            Citation Proof & Grounding
          </text>
        </g>

        {/* Stage 4: Verified Cryptographic Output Node */}
        <g transform="translate(540, 180)">
          {/* Expanding Output Ping Wave */}
          {!shouldReduceMotion && (
            <motion.circle
              cx="0"
              cy="0"
              r="22"
              className="stroke-ink/60 fill-transparent"
              strokeWidth="1.5"
              animate={{
                r: [22, 38],
                opacity: [0.85, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
          {/* Outer Perimeter Ring */}
          <circle
            cx="0"
            cy="0"
            r="26"
            className="stroke-ink/30 fill-surface"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          {/* Solid Core */}
          <circle
            cx="0"
            cy="0"
            r="19"
            className="fill-action-bg"
          />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            className="fill-action-text font-mono font-bold text-[10px] tracking-wider"
          >
            OK
          </text>
        </g>
      </svg>
    </div>
  );
}
