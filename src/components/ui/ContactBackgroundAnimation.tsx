"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

export function ContactBackgroundAnimation() {
  const shouldReduceMotion = useReducedMotion();

  // Curving Bézier spline paths converging toward and sweeping around the center
  const STREAM_PATHS = [
    // Left upper sweeping curve
    {
      d: "M -60 180 C 220 80, 420 280, 720 240 C 1020 200, 1220 380, 1500 220",
      duration: 7.2,
      delay: 0,
      width: 1.5,
      dash: "90 540",
      offset: [630, -630],
    },
    // Left lower sweeping wave
    {
      d: "M -40 480 C 240 600, 460 360, 720 440 C 980 520, 1200 280, 1480 460",
      duration: 8.5,
      delay: 1.2,
      width: 1.25,
      dash: "70 490",
      offset: [560, -560],
    },
    // Central harmonic undulating ribbon
    {
      d: "M 0 320 C 320 220, 540 420, 720 320 C 900 220, 1120 420, 1440 320",
      duration: 6.8,
      delay: 2.1,
      width: 1.6,
      dash: "100 600",
      offset: [700, -700],
    },
    // Upper diagonal convergence line
    {
      d: "M 120 -40 C 280 180, 520 260, 720 300 C 920 340, 1160 420, 1320 680",
      duration: 9.1,
      delay: 0.6,
      width: 1.2,
      dash: "80 520",
      offset: [600, -600],
    },
    // Lower diagonal convergence line
    {
      d: "M 100 700 C 300 480, 540 380, 720 340 C 900 300, 1140 220, 1340 -20",
      duration: 8.8,
      delay: 1.8,
      width: 1.2,
      dash: "80 520",
      offset: [600, -600],
    },
  ];

  // Telemetry coordinate crosshairs
  const CROSSHAIRS = [
    { x: 180, y: 140 },
    { x: 1260, y: 140 },
    { x: 180, y: 560 },
    { x: 1260, y: 560 },
    { x: 420, y: 350 },
    { x: 1020, y: 350 },
  ];

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-65"
      >
        <defs>
          {/* Coordinate Dot Matrix Pattern (Matching Hero) */}
          <pattern id="contactAmbientDots" width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="18" cy="18" r="0.75" className="fill-ink/20" />
          </pattern>

          {/* Linear gradient masks for soft edges */}
          <linearGradient id="contactEdgeFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.2" />
            <stop offset="25%" stopColor="white" stopOpacity="1" />
            <stop offset="75%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Ambient Matrix Grid */}
        <rect width="1440" height="700" fill="url(#contactAmbientDots)" opacity={0.6} />

        {/* Static Opaque & Subtle Guide Rails */}
        <g className="guide-rails">
          {STREAM_PATHS.map((stream, idx) => (
            <path
              key={`guide-${idx}`}
              d={stream.d}
              className="stroke-ink/10"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
          ))}
        </g>

        {/* Dynamic Opaque Spline Waves with Traveling Signal Streams */}
        {!shouldReduceMotion && (
          <g className="animated-streams">
            {STREAM_PATHS.map((stream, idx) => (
              <React.Fragment key={`stream-${idx}`}>
                {/* Secondary Soft Glow Stream */}
                <motion.path
                  d={stream.d}
                  fill="none"
                  className="stroke-ink/25"
                  strokeWidth={stream.width * 2}
                  strokeLinecap="round"
                  strokeDasharray={stream.dash}
                  animate={{
                    strokeDashoffset: stream.offset,
                    opacity: [0.15, 0.45, 0.15],
                  }}
                  transition={{
                    duration: stream.duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: stream.delay,
                  }}
                />

                {/* Primary High-Precision Opaque Stream Line */}
                <motion.path
                  d={stream.d}
                  fill="none"
                  className="stroke-ink"
                  strokeWidth={stream.width}
                  strokeLinecap="round"
                  strokeDasharray={stream.dash}
                  animate={{
                    strokeDashoffset: stream.offset,
                    opacity: [0.35, 0.9, 0.35],
                  }}
                  transition={{
                    duration: stream.duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: stream.delay,
                  }}
                />
              </React.Fragment>
            ))}
          </g>
        )}

        {/* Coordinate Crosshairs */}
        <g className="crosshairs">
          {CROSSHAIRS.map((point, idx) => (
            <g key={`cross-${idx}`} transform={`translate(${point.x}, ${point.y})`}>
              <line x1="-6" y1="0" x2="6" y2="0" className="stroke-ink/20" strokeWidth="1" />
              <line x1="0" y1="-6" x2="0" y2="6" className="stroke-ink/20" strokeWidth="1" />
              <circle cx="0" cy="0" r="1.5" className="fill-ink/30" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
