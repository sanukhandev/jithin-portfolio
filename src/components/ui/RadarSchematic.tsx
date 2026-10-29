"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

// Opportunity data points across the 3 strategic horizons
const OPPORTUNITIES = [
  {
    id: "OPP-01",
    label: "OPP-01",
    name: "Automated Triage",
    score: "94",
    horizon: "H1",
    x: 395,
    y: 125,
    delay: 0,
  },
  {
    id: "OPP-02",
    label: "OPP-02",
    name: "Copilot Mesh",
    score: "88",
    horizon: "H2",
    x: 205,
    y: 110,
    delay: 0.6,
  },
  {
    id: "OPP-03",
    label: "OPP-03",
    name: "Autonomous Ops",
    score: "81",
    horizon: "H3",
    x: 420,
    y: 255,
    delay: 1.2,
  },
  {
    id: "OPP-04",
    label: "OPP-04",
    name: "Knowledge Fabric",
    score: "78",
    horizon: "H2",
    x: 180,
    y: 245,
    delay: 1.8,
  },
];

// Curved stream vector paths connecting nodes into the central enterprise hub
const RADAR_STREAMS = [
  // OPP-01 -> Central Hub
  {
    d: "M 395 125 C 375 165, 340 160, 300 180",
    duration: 2.8,
    delay: 0,
  },
  // OPP-02 -> Central Hub
  {
    d: "M 205 110 C 235 160, 260 155, 300 180",
    duration: 3.1,
    delay: 0.5,
  },
  // OPP-03 -> Central Hub
  {
    d: "M 420 255 C 380 220, 345 210, 300 180",
    duration: 2.9,
    delay: 0.8,
  },
  // OPP-04 -> Central Hub
  {
    d: "M 180 245 C 220 215, 255 210, 300 180",
    duration: 3.2,
    delay: 1.1,
  },
  // Cross-Opportunity Signal: OPP-02 -> OPP-04
  {
    d: "M 205 110 C 165 155, 160 195, 180 245",
    duration: 3.5,
    delay: 1.4,
  },
];

export function RadarSchematic({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  const CENTER = { x: 300, y: 180 };

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
        {/* 1. CLEAR HIGH-CONTRAST TECHNICAL COORDINATE LATTICE */}
        <defs>
          <pattern
            id="radarGridPattern"
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
        <rect width="600" height="360" fill="url(#radarGridPattern)" />

        {/* 2. POLAR HORIZON CONCENTRIC CIRCLES */}
        {/* Outer Perimeter */}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r="155"
          className="stroke-ink/15"
          strokeWidth="1.2"
        />
        {/* H3: Autonomous Scale */}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r="135"
          className="stroke-ink/25"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* H2: Workflow Augmentation */}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r="95"
          className="stroke-ink/30"
          strokeWidth="1.2"
        />
        {/* H1: Operational Efficiency */}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r="55"
          className="stroke-ink/40"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* 3. QUADRANT CROSSHAIR AXES & AXIS LABELS */}
        <line
          x1="120"
          y1={CENTER.y}
          x2="480"
          y2={CENTER.y}
          className="stroke-ink/20"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          x1={CENTER.x}
          y1="15"
          x2={CENTER.x}
          y2="345"
          className="stroke-ink/20"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Axis Direction Indicators */}
        <text
          x="306"
          y="28"
          className="fill-ink/70 font-mono text-[9px] tracking-widest font-semibold"
        >
          VALUE ↑
        </text>
        <text
          x="440"
          y="174"
          className="fill-ink/70 font-mono text-[9px] tracking-widest font-semibold"
        >
          FEASIBILITY →
        </text>

        {/* Horizon Annotation Labels */}
        <text
          x="308"
          y="132"
          className="fill-ink/50 font-mono text-[9px] tracking-wider"
        >
          H1 · EFFICIENCY
        </text>
        <text
          x="308"
          y="92"
          className="fill-ink/50 font-mono text-[9px] tracking-wider"
        >
          H2 · AUGMENTATION
        </text>
        <text
          x="308"
          y="52"
          className="fill-ink/50 font-mono text-[9px] tracking-wider"
        >
          H3 · AUTONOMOUS
        </text>

        {/* 4. DYNAMIC ROTATING RADAR SWEEP BEAM */}
        {!shouldReduceMotion && (
          <motion.g
            animate={{ rotate: 360 }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              transformOrigin: `${CENTER.x}px ${CENTER.y}px`,
            }}
          >
            {/* Sweep Sector / Beam Cone */}
            <path
              d={`M ${CENTER.x} ${CENTER.y} L ${CENTER.x + 155} ${CENTER.y} A 155 155 0 0 0 ${CENTER.x + 142} ${CENTER.y - 62} Z`}
              className="fill-ink/10"
            />
            {/* Leading Sweep Line */}
            <line
              x1={CENTER.x}
              y1={CENTER.y}
              x2={CENTER.x + 155}
              y2={CENTER.y}
              className="stroke-ink/70"
              strokeWidth="1.6"
            />
          </motion.g>
        )}

        {/* 5. FLOWING STREAM VECTOR PATHS & TELEMETRY SIGNALS */}
        <g className="radar-streams">
          {RADAR_STREAMS.map((stream, idx) => (
            <React.Fragment key={`stream-${idx}`}>
              {/* Static Guide Line */}
              <path
                d={stream.d}
                fill="none"
                className="stroke-ink/15"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
              {/* Dynamic Traveling Signal Pulse */}
              {!shouldReduceMotion && (
                <motion.path
                  d={stream.d}
                  fill="none"
                  className="stroke-ink"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeDasharray="32 180"
                  animate={{
                    strokeDashoffset: [212, -212],
                    opacity: [0.2, 0.9, 0.2],
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

        {/* 6. CENTRAL ENTERPRISE CORE HUB */}
        <g className="radar-core-hub">
          {/* Outer Ping Wave */}
          {!shouldReduceMotion && (
            <motion.circle
              cx={CENTER.x}
              cy={CENTER.y}
              r="8"
              className="stroke-ink/60 fill-transparent"
              strokeWidth="1.5"
              animate={{
                r: [8, 48, 8],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
          {/* Inner Protective Ring */}
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r="12"
            className="stroke-ink/40 fill-surface"
            strokeWidth="1.5"
          />
          {/* Core Center Dot */}
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r="5"
            className="fill-ink"
          />
        </g>

        {/* 7. PLOTTED OPPORTUNITY NODES & TELEMETRY BADGES */}
        <g className="opportunity-nodes">
          {OPPORTUNITIES.map((opp) => {
            const isRightSide = opp.x > CENTER.x;
            const badgeX = isRightSide ? opp.x + 14 : opp.x - 124;
            const badgeY = opp.y - 14;

            return (
              <g key={opp.id} className="group">
                {/* Expanding Beacon Ring */}
                {!shouldReduceMotion && (
                  <motion.circle
                    cx={opp.x}
                    cy={opp.y}
                    r="6"
                    className="stroke-ink/50 fill-transparent"
                    strokeWidth="1.2"
                    animate={{
                      r: [6, 20],
                      opacity: [0.85, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: opp.delay,
                      ease: "easeOut",
                    }}
                  />
                )}

                {/* Target Point Dot */}
                <motion.circle
                  cx={opp.x}
                  cy={opp.y}
                  r="5"
                  className="fill-ink"
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: [1, 1.25, 1],
                        }
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: opp.delay,
                    ease: "easeInOut",
                  }}
                />

                {/* Telemetry Badge Card */}
                <g transform={`translate(${badgeX}, ${badgeY})`}>
                  <rect
                    x="0"
                    y="0"
                    width="112"
                    height="28"
                    rx="6"
                    className="fill-surface stroke-ink/35"
                    strokeWidth="1"
                  />
                  {/* Subtle Accent Edge */}
                  <line
                    x1="0"
                    y1="6"
                    x2="0"
                    y2="22"
                    className="stroke-ink"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <text
                    x="8"
                    y="13"
                    className="fill-ink font-mono font-bold text-[9.5px] tracking-wider"
                  >
                    {opp.label} · SCORE {opp.score}
                  </text>
                  <text
                    x="8"
                    y="23"
                    className="fill-ink-muted font-sans text-[8.5px] font-medium"
                  >
                    {opp.name}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
