"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface Neuron {
  id: string;
  x: number;
  y: number;
  r: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
  isCore?: boolean;
}

// 1. Primary Layer Neurons
const PRIMARY_NEURONS: Neuron[] = [
  // Layer 0: Input (4 neurons)
  { id: "L0-0", x: 45, y: 80, r: 4, driftX: 3, driftY: 4, duration: 4.2, delay: 0.1 },
  { id: "L0-1", x: 45, y: 160, r: 4.5, driftX: -4, driftY: 3, duration: 3.8, delay: 0.4 },
  { id: "L0-2", x: 45, y: 240, r: 4, driftX: 3, driftY: -4, duration: 4.5, delay: 0.7 },
  { id: "L0-3", x: 45, y: 320, r: 4.5, driftX: -3, driftY: -3, duration: 3.9, delay: 0.2 },

  // Layer 1: Feature Extraction (5 neurons)
  { id: "L1-0", x: 150, y: 50, r: 4, driftX: -3, driftY: 4, duration: 4.1, delay: 0.3 },
  { id: "L1-1", x: 150, y: 125, r: 5, driftX: 4, driftY: -3, duration: 3.7, delay: 0.8 },
  { id: "L1-2", x: 150, y: 200, r: 4.5, driftX: -3, driftY: 4, duration: 4.6, delay: 0.5 },
  { id: "L1-3", x: 150, y: 275, r: 5, driftX: 4, driftY: 3, duration: 4.0, delay: 0.9 },
  { id: "L1-4", x: 150, y: 350, r: 4, driftX: -4, driftY: -4, duration: 3.6, delay: 0.2 },

  // Layer 2: Deep Processing Core (6 neurons)
  { id: "L2-0", x: 260, y: 35, r: 4, driftX: 4, driftY: -3, duration: 4.4, delay: 0.6 },
  { id: "L2-1", x: 260, y: 105, r: 5, driftX: -4, driftY: 4, duration: 3.9, delay: 0.1 },
  { id: "L2-2", x: 260, y: 175, r: 6, driftX: 3, driftY: -4, duration: 4.8, delay: 0.4, isCore: true },
  { id: "L2-3", x: 260, y: 245, r: 6, driftX: -3, driftY: 3, duration: 4.2, delay: 0.7, isCore: true },
  { id: "L2-4", x: 260, y: 315, r: 5, driftX: 4, driftY: -4, duration: 3.8, delay: 0.3 },
  { id: "L2-5", x: 260, y: 385, r: 4, driftX: -3, driftY: 3, duration: 4.5, delay: 0.8 },

  // Layer 3: Decision Synthesis (4 neurons)
  { id: "L3-0", x: 370, y: 85, r: 4.5, driftX: -4, driftY: 3, duration: 4.0, delay: 0.5 },
  { id: "L3-1", x: 370, y: 165, r: 5.5, driftX: 3, driftY: -4, duration: 4.6, delay: 0.2 },
  { id: "L3-2", x: 370, y: 245, r: 5.5, driftX: -3, driftY: 4, duration: 3.7, delay: 0.6 },
  { id: "L3-3", x: 370, y: 325, r: 4.5, driftX: 4, driftY: -3, duration: 4.3, delay: 0.9 },

  // Layer 4: Output Execution (2 neurons)
  { id: "L4-0", x: 470, y: 155, r: 6, driftX: 3, driftY: -4, duration: 4.5, delay: 0.4, isCore: true },
  { id: "L4-1", x: 470, y: 255, r: 6, driftX: -3, driftY: 3, duration: 4.1, delay: 0.7, isCore: true },
];

// 2. Interneurons / Dendritic Nodes (Adding more dots bridging the layers)
const INTER_NEURONS: Neuron[] = [
  { id: "IN-0", x: 100, y: 110, r: 3, driftX: 2, driftY: -3, duration: 3.5, delay: 0.3 },
  { id: "IN-1", x: 100, y: 210, r: 3, driftX: -3, driftY: 2, duration: 4.1, delay: 0.7 },
  { id: "IN-2", x: 100, y: 290, r: 2.5, driftX: 2, driftY: 3, duration: 3.8, delay: 0.1 },
  { id: "IN-3", x: 205, y: 80, r: 3, driftX: -2, driftY: 3, duration: 4.3, delay: 0.5 },
  { id: "IN-4", x: 205, y: 160, r: 3.5, driftX: 3, driftY: -2, duration: 3.9, delay: 0.2 },
  { id: "IN-5", x: 205, y: 240, r: 3.5, driftX: -3, driftY: -3, duration: 4.5, delay: 0.8 },
  { id: "IN-6", x: 205, y: 320, r: 3, driftX: 2, driftY: 3, duration: 3.7, delay: 0.4 },
  { id: "IN-7", x: 315, y: 120, r: 3.5, driftX: -3, driftY: 2, duration: 4.2, delay: 0.6 },
  { id: "IN-8", x: 315, y: 200, r: 4, driftX: 3, driftY: -3, duration: 3.6, delay: 0.1 },
  { id: "IN-9", x: 315, y: 280, r: 3.5, driftX: -2, driftY: 3, duration: 4.7, delay: 0.9 },
  { id: "IN-10", x: 420, y: 130, r: 3, driftX: 3, driftY: -2, duration: 4.0, delay: 0.3 },
  { id: "IN-11", x: 420, y: 210, r: 3.5, driftX: -3, driftY: 3, duration: 3.8, delay: 0.5 },
  { id: "IN-12", x: 420, y: 290, r: 3, driftX: 2, driftY: -3, duration: 4.4, delay: 0.8 },
];

// 3. Ambient Synaptic Micro-Dots (Floating background scatter for rich density)
const AMBIENT_DOTS = [
  { x: 30, y: 40, r: 1.5, d: 3.8 },
  { x: 75, y: 180, r: 1.5, d: 4.2 },
  { x: 80, y: 360, r: 1.5, d: 3.5 },
  { x: 120, y: 400, r: 1.5, d: 4.7 },
  { x: 160, y: 20, r: 1.5, d: 3.9 },
  { x: 180, y: 380, r: 1.5, d: 4.1 },
  { x: 230, y: 410, r: 1.5, d: 4.4 },
  { x: 280, y: 20, r: 1.5, d: 3.6 },
  { x: 340, y: 45, r: 1.5, d: 4.5 },
  { x: 390, y: 390, r: 1.5, d: 3.7 },
  { x: 440, y: 70, r: 1.5, d: 4.3 },
  { x: 490, y: 90, r: 1.5, d: 4.0 },
  { x: 485, y: 330, r: 1.5, d: 4.6 },
  { x: 450, y: 380, r: 1.5, d: 3.8 },
];

// 4. Synaptic Connection Pairs
const STATIC_SYNAPSES: [Neuron, Neuron][] = [
  // L0 -> L1
  [PRIMARY_NEURONS[0], PRIMARY_NEURONS[4]],
  [PRIMARY_NEURONS[0], PRIMARY_NEURONS[5]],
  [PRIMARY_NEURONS[1], PRIMARY_NEURONS[5]],
  [PRIMARY_NEURONS[1], PRIMARY_NEURONS[6]],
  [PRIMARY_NEURONS[2], PRIMARY_NEURONS[6]],
  [PRIMARY_NEURONS[2], PRIMARY_NEURONS[7]],
  [PRIMARY_NEURONS[3], PRIMARY_NEURONS[7]],
  [PRIMARY_NEURONS[3], PRIMARY_NEURONS[8]],
  // Interneuron bridges
  [PRIMARY_NEURONS[0], INTER_NEURONS[0]],
  [INTER_NEURONS[0], PRIMARY_NEURONS[5]],
  [PRIMARY_NEURONS[1], INTER_NEURONS[1]],
  [INTER_NEURONS[1], PRIMARY_NEURONS[6]],
  [PRIMARY_NEURONS[2], INTER_NEURONS[2]],
  [INTER_NEURONS[2], PRIMARY_NEURONS[7]],
  // L1 -> L2
  [PRIMARY_NEURONS[4], PRIMARY_NEURONS[9]],
  [PRIMARY_NEURONS[4], PRIMARY_NEURONS[10]],
  [PRIMARY_NEURONS[5], PRIMARY_NEURONS[10]],
  [PRIMARY_NEURONS[5], PRIMARY_NEURONS[11]],
  [PRIMARY_NEURONS[6], PRIMARY_NEURONS[11]],
  [PRIMARY_NEURONS[6], PRIMARY_NEURONS[12]],
  [PRIMARY_NEURONS[7], PRIMARY_NEURONS[12]],
  [PRIMARY_NEURONS[7], PRIMARY_NEURONS[13]],
  [PRIMARY_NEURONS[8], PRIMARY_NEURONS[13]],
  [PRIMARY_NEURONS[8], PRIMARY_NEURONS[14]],
  // Interneurons L1 -> L2
  [PRIMARY_NEURONS[5], INTER_NEURONS[4]],
  [INTER_NEURONS[4], PRIMARY_NEURONS[11]],
  [PRIMARY_NEURONS[6], INTER_NEURONS[5]],
  [INTER_NEURONS[5], PRIMARY_NEURONS[12]],
  // L2 -> L3
  [PRIMARY_NEURONS[9], PRIMARY_NEURONS[15]],
  [PRIMARY_NEURONS[10], PRIMARY_NEURONS[15]],
  [PRIMARY_NEURONS[10], PRIMARY_NEURONS[16]],
  [PRIMARY_NEURONS[11], PRIMARY_NEURONS[16]],
  [PRIMARY_NEURONS[12], PRIMARY_NEURONS[17]],
  [PRIMARY_NEURONS[13], PRIMARY_NEURONS[17]],
  [PRIMARY_NEURONS[13], PRIMARY_NEURONS[18]],
  [PRIMARY_NEURONS[14], PRIMARY_NEURONS[18]],
  // Interneurons L2 -> L3
  [PRIMARY_NEURONS[11], INTER_NEURONS[8]],
  [INTER_NEURONS[8], PRIMARY_NEURONS[16]],
  [PRIMARY_NEURONS[12], INTER_NEURONS[9]],
  [INTER_NEURONS[9], PRIMARY_NEURONS[17]],
  // L3 -> L4
  [PRIMARY_NEURONS[15], PRIMARY_NEURONS[19]],
  [PRIMARY_NEURONS[16], PRIMARY_NEURONS[19]],
  [PRIMARY_NEURONS[17], PRIMARY_NEURONS[20]],
  [PRIMARY_NEURONS[18], PRIMARY_NEURONS[20]],
  // Interneurons L3 -> L4
  [PRIMARY_NEURONS[16], INTER_NEURONS[11]],
  [INTER_NEURONS[11], PRIMARY_NEURONS[19]],
  [PRIMARY_NEURONS[17], INTER_NEURONS[12]],
  [INTER_NEURONS[12], PRIMARY_NEURONS[20]],
];

// 5. Curved Synaptic Pathways for Tailing Signal Streams (Comet lines)
const TAILING_PATHS = [
  {
    d: "M 45 80 Q 150 50, 260 105 T 370 165 T 470 155",
    duration: 2.8,
    delay: 0,
  },
  {
    d: "M 45 160 Q 150 125, 260 175 T 370 165 T 470 155",
    duration: 3.2,
    delay: 0.9,
  },
  {
    d: "M 45 240 Q 150 200, 260 245 T 370 245 T 470 255",
    duration: 3.0,
    delay: 1.8,
  },
  {
    d: "M 45 320 Q 150 275, 260 245 T 370 245 T 470 255",
    duration: 3.4,
    delay: 0.4,
  },
  {
    d: "M 45 160 Q 150 275, 260 175 T 370 85 T 470 155",
    duration: 3.6,
    delay: 2.2,
  },
  {
    d: "M 45 240 Q 150 125, 260 315 T 370 325 T 470 255",
    duration: 3.5,
    delay: 1.4,
  },
];

export function DotAiMatrix({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  const allNeurons = [...PRIMARY_NEURONS, ...INTER_NEURONS];

  return (
    <div
      className={`relative w-full aspect-[5/4] max-w-[560px] mx-auto flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 520 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Background Static Synapses */}
        <g className="synapse-web">
          {STATIC_SYNAPSES.map(([n1, n2], idx) => (
            <line
              key={`syn-${idx}`}
              x1={n1.x}
              y1={n1.y}
              x2={n2.x}
              y2={n2.y}
              className="stroke-ink/10"
              strokeWidth="0.8"
            />
          ))}
        </g>

        {/* Tailing Lines / Fast Moving Synaptic Signal Trails (Comets) */}
        {!shouldReduceMotion && (
          <g className="tailing-signals">
            {TAILING_PATHS.map((path, idx) => (
              <React.Fragment key={`trail-${idx}`}>
                {/* 1. Long Tailing Stream Line */}
                <motion.path
                  d={path.d}
                  fill="none"
                  className="stroke-ink"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeDasharray="60 380"
                  animate={{
                    strokeDashoffset: [440, -440],
                    opacity: [0, 0.85, 0.85, 0],
                  }}
                  transition={{
                    duration: path.duration,
                    repeat: Infinity,
                    delay: path.delay,
                    ease: "easeInOut",
                  }}
                />

                {/* 2. Secondary Fast Micro-Tail */}
                <motion.path
                  d={path.d}
                  fill="none"
                  className="stroke-ink/40"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  strokeDasharray="25 420"
                  animate={{
                    strokeDashoffset: [440, -440],
                    opacity: [0, 0.6, 0.6, 0],
                  }}
                  transition={{
                    duration: path.duration * 0.9,
                    repeat: Infinity,
                    delay: path.delay + 0.3,
                    ease: "easeInOut",
                  }}
                />
              </React.Fragment>
            ))}
          </g>
        )}

        {/* Dynamic Firing Synapse Highlight Pulses on Segment Lines */}
        {!shouldReduceMotion && (
          <g className="synaptic-pulses">
            {STATIC_SYNAPSES.filter((_, idx) => idx % 4 === 0).map(([n1, n2], idx) => (
              <motion.line
                key={`pulse-line-${idx}`}
                x1={n1.x}
                y1={n1.y}
                x2={n2.x}
                y2={n2.y}
                className="stroke-ink"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeDasharray="16 60"
                animate={{
                  strokeDashoffset: [76, -76],
                  opacity: [0.1, 0.85, 0.1],
                }}
                transition={{
                  duration: 2.0 + (idx % 3) * 0.4,
                  repeat: Infinity,
                  delay: (idx * 0.35) % 2,
                  ease: "linear",
                }}
              />
            ))}
          </g>
        )}

        {/* Ambient Neural Scatter Micro-Dots */}
        <g className="ambient-scatter">
          {AMBIENT_DOTS.map((dot, idx) => (
            <motion.circle
              key={`amb-${idx}`}
              cx={dot.x}
              cy={dot.y}
              r={dot.r}
              className="fill-ink"
              animate={
                shouldReduceMotion
                  ? { opacity: 0.25 }
                  : {
                      opacity: [0.1, 0.45, 0.1],
                      scale: [0.8, 1.4, 0.8],
                    }
              }
              transition={{
                duration: dot.d,
                repeat: Infinity,
                delay: (idx * 0.25) % 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        {/* Moving Neurons (Organic 2D Drift & Pulsing Halos) */}
        <g className="neurons">
          {allNeurons.map((neuron) => (
            <motion.g
              key={neuron.id}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      x: [-neuron.driftX, neuron.driftX, -neuron.driftX],
                      y: [-neuron.driftY, neuron.driftY, -neuron.driftY],
                    }
              }
              transition={{
                duration: neuron.duration,
                repeat: Infinity,
                delay: neuron.delay,
                ease: "easeInOut",
              }}
            >
              {/* Outer Radiant Halo Ring */}
              <motion.circle
                cx={neuron.x}
                cy={neuron.y}
                r={neuron.r + (neuron.isCore ? 6 : 4)}
                className="stroke-ink/20 fill-transparent"
                strokeWidth="0.75"
                strokeDasharray={neuron.isCore ? undefined : "2 2"}
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: neuron.isCore ? [1, 1.35, 1] : [1, 1.2, 1],
                        opacity: [0.2, 0.55, 0.2],
                      }
                }
                transition={{
                  duration: neuron.duration * 0.75,
                  repeat: Infinity,
                  delay: neuron.delay,
                  ease: "easeInOut",
                }}
              />

              {/* Expanding Ripple for Core Neurons */}
              {neuron.isCore && !shouldReduceMotion && (
                <motion.circle
                  cx={neuron.x}
                  cy={neuron.y}
                  r={neuron.r}
                  className="stroke-ink/30"
                  strokeWidth="0.8"
                  animate={{
                    r: [neuron.r, neuron.r + 14],
                    opacity: [0.6, 0],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    delay: neuron.delay * 1.5,
                    ease: "easeOut",
                  }}
                />
              )}

              {/* Primary Neuron Body Dot */}
              <motion.circle
                cx={neuron.x}
                cy={neuron.y}
                r={neuron.r}
                className={neuron.isCore ? "fill-ink" : "fill-ink/80"}
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: [1, 1.15, 1],
                        opacity: [0.75, 1, 0.75],
                      }
                }
                transition={{
                  duration: neuron.duration * 0.6,
                  repeat: Infinity,
                  delay: neuron.delay,
                  ease: "easeInOut",
                }}
              />

              {/* Nucleus Center for Core Output Nodes */}
              {neuron.isCore && (
                <circle
                  cx={neuron.x}
                  cy={neuron.y}
                  r={1.75}
                  className="fill-surface"
                />
              )}
            </motion.g>
          ))}
        </g>
      </svg>
    </div>
  );
}
