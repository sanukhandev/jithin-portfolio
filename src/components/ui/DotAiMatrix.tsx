"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface Neuron {
  id: string;
  x: number;
  y: number;
  layer: number;
  r: number;
}

// 5-layer 2D Neural Network Architecture
const LAYERS: { count: number; x: number; yStart: number; yGap: number }[] = [
  { count: 4, x: 50, yStart: 90, yGap: 80 },   // Layer 0: Input / Perception (4 neurons)
  { count: 5, x: 155, yStart: 55, yGap: 72 },  // Layer 1: Feature Extraction (5 neurons)
  { count: 6, x: 260, yStart: 40, yGap: 64 },  // Layer 2: Deep Processing (6 neurons)
  { count: 4, x: 365, yStart: 90, yGap: 80 },  // Layer 3: Decision Synthesis (4 neurons)
  { count: 2, x: 460, yStart: 160, yGap: 100 }, // Layer 4: Output Execution (2 neurons)
];

const NEURONS: Neuron[] = [];
LAYERS.forEach((layerSpec, layerIndex) => {
  for (let i = 0; i < layerSpec.count; i++) {
    NEURONS.push({
      id: `L${layerIndex}-N${i}`,
      x: layerSpec.x,
      y: layerSpec.yStart + i * layerSpec.yGap,
      layer: layerIndex,
      r: layerIndex === 2 ? 4.5 : layerIndex === 4 ? 5 : 4,
    });
  }
});

// Construct dense synaptic connections between adjacent layers
interface Synapse {
  id: string;
  from: Neuron;
  to: Neuron;
  activePathIndex: number;
}

const SYNAPSES: Synapse[] = [];
let pathCounter = 0;

for (let l = 0; l < LAYERS.length - 1; l++) {
  const currentLayerNeurons = NEURONS.filter((n) => n.layer === l);
  const nextLayerNeurons = NEURONS.filter((n) => n.layer === l + 1);

  currentLayerNeurons.forEach((source) => {
    nextLayerNeurons.forEach((target) => {
      SYNAPSES.push({
        id: `${source.id}->${target.id}`,
        from: source,
        to: target,
        activePathIndex: pathCounter++ % 8,
      });
    });
  });
}

// Select curated primary transmission pathways for animated action-potential pulses
const TRANSMISSION_PATHS: {
  points: { x: number; y: number }[];
  duration: number;
  delay: number;
}[] = [
  {
    points: [
      { x: 50, y: 90 },
      { x: 155, y: 127 },
      { x: 260, y: 168 },
      { x: 365, y: 170 },
      { x: 460, y: 160 },
    ],
    duration: 2.8,
    delay: 0,
  },
  {
    points: [
      { x: 50, y: 250 },
      { x: 155, y: 199 },
      { x: 260, y: 232 },
      { x: 365, y: 250 },
      { x: 460, y: 260 },
    ],
    duration: 3.2,
    delay: 1.0,
  },
  {
    points: [
      { x: 50, y: 170 },
      { x: 155, y: 55 },
      { x: 260, y: 104 },
      { x: 365, y: 90 },
      { x: 460, y: 160 },
    ],
    duration: 3.0,
    delay: 1.8,
  },
  {
    points: [
      { x: 50, y: 330 },
      { x: 155, y: 343 },
      { x: 260, y: 360 },
      { x: 365, y: 330 },
      { x: 460, y: 260 },
    ],
    duration: 2.9,
    delay: 2.4,
  },
];

export function DotAiMatrix({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`relative w-full aspect-[5/4] max-w-[540px] mx-auto flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 510 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Synaptic Pathway Lines (Background) */}
        <g className="synapses">
          {SYNAPSES.map((synapse) => (
            <line
              key={synapse.id}
              x1={synapse.from.x}
              y1={synapse.from.y}
              x2={synapse.to.x}
              y2={synapse.to.y}
              className="stroke-ink/10"
              strokeWidth="0.85"
            />
          ))}
        </g>

        {/* Dynamic Firing Synapse Highlight Pulses */}
        {!shouldReduceMotion && (
          <g className="active-synaptic-traces">
            {SYNAPSES.filter((_, idx) => idx % 6 === 0).map((synapse, idx) => (
              <motion.line
                key={`active-${synapse.id}`}
                x1={synapse.from.x}
                y1={synapse.from.y}
                x2={synapse.to.x}
                y2={synapse.to.y}
                className="stroke-ink/40"
                strokeWidth="1.2"
                strokeDasharray="8 24"
                animate={{
                  strokeDashoffset: [0, -64],
                  opacity: [0.15, 0.7, 0.15],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: (idx * 0.3) % 2,
                  ease: "linear",
                }}
              />
            ))}
          </g>
        )}

        {/* Action Potential Pulses Traveling Across 2D Network */}
        {!shouldReduceMotion && (
          <g className="action-potentials">
            {TRANSMISSION_PATHS.map((path, pIdx) => {
              const xKeyframes = path.points.map((pt) => pt.x);
              const yKeyframes = path.points.map((pt) => pt.y);

              return (
                <motion.circle
                  key={`pulse-${pIdx}`}
                  r={3}
                  className="fill-ink"
                  initial={{
                    cx: path.points[0].x,
                    cy: path.points[0].y,
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    cx: xKeyframes,
                    cy: yKeyframes,
                    opacity: [0, 0.95, 0.95, 0.95, 0],
                    scale: [0.8, 1.3, 1.1, 1.3, 0.8],
                  }}
                  transition={{
                    duration: path.duration,
                    repeat: Infinity,
                    delay: path.delay,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </g>
        )}

        {/* 2D Neurons (Dots) */}
        <g className="neurons">
          {NEURONS.map((neuron, idx) => {
            const isOutput = neuron.layer === 4;
            const isCenterDeep = neuron.layer === 2 && (idx === 10 || idx === 11);

            return (
              <g key={neuron.id}>
                {/* Outer subtle halo ring */}
                <motion.circle
                  cx={neuron.x}
                  cy={neuron.y}
                  r={neuron.r + 5}
                  className="stroke-ink/20 fill-transparent"
                  strokeWidth="0.75"
                  strokeDasharray="2 2"
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: [1, 1.25, 1],
                          opacity: [0.2, 0.5, 0.2],
                        }
                  }
                  transition={{
                    duration: 2.8 + (idx % 4) * 0.4,
                    repeat: Infinity,
                    delay: (idx % 7) * 0.2,
                    ease: "easeInOut",
                  }}
                />

                {/* Primary Neuron Dot Body */}
                <motion.circle
                  cx={neuron.x}
                  cy={neuron.y}
                  r={neuron.r}
                  className={isOutput || isCenterDeep ? "fill-ink" : "fill-ink/80"}
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: [1, 1.18, 1],
                          opacity: [0.75, 1, 0.75],
                        }
                  }
                  transition={{
                    duration: 2.2 + (idx % 5) * 0.3,
                    repeat: Infinity,
                    delay: (idx % 6) * 0.25,
                    ease: "easeInOut",
                  }}
                />

                {/* Core nucleus dot for output / focal neurons */}
                {(isOutput || isCenterDeep) && (
                  <circle
                    cx={neuron.x}
                    cy={neuron.y}
                    r={1.5}
                    className="fill-surface"
                  />
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
