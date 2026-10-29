"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

interface NodeData {
  id: string;
  x: number;
  y: number;
  r: number;
  label: string;
  type: "core" | "agent" | "gateway" | "satellite";
}

const PRIMARY_NODES: NodeData[] = [
  { id: "core", x: 250, y: 250, r: 7, label: "EXECUTIVE AI CORE", type: "core" },
  { id: "n1", x: 160, y: 150, r: 5, label: "REASONING ENGINE", type: "agent" },
  { id: "n2", x: 340, y: 140, r: 5, label: "HYBRID RAG MESH", type: "agent" },
  { id: "n3", x: 370, y: 310, r: 5, label: "AUTONOMOUS ACTUATOR", type: "agent" },
  { id: "n4", x: 130, y: 320, r: 5, label: "GOVERNANCE GATEWAY", type: "gateway" },
  { id: "n5", x: 250, y: 100, r: 4, label: "CONTEXT SYNTHESIS", type: "satellite" },
  { id: "n6", x: 390, y: 220, r: 4, label: "DECISION CHECKPOINT", type: "satellite" },
  { id: "n7", x: 250, y: 400, r: 4, label: "AUDIT LEDGER", type: "satellite" },
  { id: "n8", x: 110, y: 220, r: 4, label: "TELEMETRY BUS", type: "satellite" },
];

const CONNECTIONS: [string, string][] = [
  ["core", "n1"],
  ["core", "n2"],
  ["core", "n3"],
  ["core", "n4"],
  ["n1", "n5"],
  ["n2", "n5"],
  ["n2", "n6"],
  ["n3", "n6"],
  ["n3", "n7"],
  ["n4", "n7"],
  ["n4", "n8"],
  ["n1", "n8"],
];

// 8x8 ambient background dot grid
const GRID_DOTS: { cx: number; cy: number; delay: number }[] = [];
for (let col = 0; col < 9; col++) {
  for (let row = 0; row < 9; row++) {
    GRID_DOTS.push({
      cx: 50 + col * 50,
      cy: 50 + row * 50,
      delay: (col * 9 + row) * 0.04,
    });
  }
}

export function DotAiMatrix({ className = "" }: { className?: string }) {
  const [activeNode, setActiveNode] = useState<NodeData | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const nodeMap = new Map<string, NodeData>();
  PRIMARY_NODES.forEach((n) => nodeMap.set(n.id, n));

  return (
    <div
      className={`relative w-full aspect-square max-w-[520px] mx-auto flex items-center justify-center rounded-2xl border border-border-subtle bg-surface-raised/60 p-4 sm:p-6 select-none overflow-hidden ${className}`}
      aria-label="Interactive AI Dot Matrix Animation"
    >
      {/* Top Monospace Status Overlay */}
      <div className="absolute top-4 inset-x-6 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-ink-muted/80 z-10 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-ink animate-pulse" />
          <span>NEURAL LATTICE // ACTIVE</span>
        </div>
        <span className="hidden sm:inline-block">SYNAPSE RATE: 140Hz</span>
      </div>

      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background Dot Matrix */}
        <g className="ambient-grid">
          {GRID_DOTS.map((dot, idx) => (
            <motion.circle
              key={`grid-${idx}`}
              cx={dot.cx}
              cy={dot.cy}
              r={1.25}
              className="fill-ink"
              initial={{ opacity: 0.12 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 0.15 }
                  : {
                      opacity: [0.08, 0.28, 0.08],
                      scale: [1, 1.25, 1],
                    }
              }
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: (idx % 12) * 0.25,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        {/* Concentric Coordinate Rings */}
        <circle
          cx="250"
          cy="250"
          r="190"
          strokeDasharray="3 4"
          className="stroke-ink/15"
          strokeWidth="1"
        />
        <circle
          cx="250"
          cy="250"
          r="130"
          className="stroke-ink/20"
          strokeWidth="1"
        />
        <circle
          cx="250"
          cy="250"
          r="70"
          strokeDasharray="2 3"
          className="stroke-ink/25"
          strokeWidth="1"
        />

        {/* Expanding Wave Rings from Center */}
        {!shouldReduceMotion && (
          <>
            <motion.circle
              cx="250"
              cy="250"
              r="70"
              className="stroke-ink/30"
              strokeWidth="1"
              initial={{ r: 20, opacity: 0.6 }}
              animate={{ r: [20, 180], opacity: [0.6, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.circle
              cx="250"
              cy="250"
              r="70"
              className="stroke-ink/20"
              strokeWidth="1"
              initial={{ r: 20, opacity: 0.5 }}
              animate={{ r: [20, 180], opacity: [0.5, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                delay: 2.25,
                ease: "easeOut",
              }}
            />
          </>
        )}

        {/* Synaptic Connector Lines */}
        <g className="connections">
          {CONNECTIONS.map(([srcId, dstId], idx) => {
            const src = nodeMap.get(srcId);
            const dst = nodeMap.get(dstId);
            if (!src || !dst) return null;

            const isHighlighted =
              activeNode?.id === srcId || activeNode?.id === dstId;

            return (
              <g key={`conn-${idx}`}>
                <motion.line
                  x1={src.x}
                  y1={src.y}
                  x2={dst.x}
                  y2={dst.y}
                  className={
                    isHighlighted
                      ? "stroke-ink transition-all duration-200"
                      : "stroke-ink/25"
                  }
                  strokeWidth={isHighlighted ? 1.75 : 1}
                  strokeDasharray="4 4"
                  initial={false}
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          strokeDashoffset: [0, -16],
                        }
                  }
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </g>
            );
          })}
        </g>

        {/* Primary Interactive AI Feature Dots */}
        <g className="feature-dots">
          {PRIMARY_NODES.map((node) => {
            const isHovered = activeNode?.id === node.id;
            const isCore = node.type === "core";

            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onMouseEnter={() => setActiveNode(node)}
                onMouseLeave={() => setActiveNode(null)}
                tabIndex={0}
                role="button"
                aria-label={node.label}
                onFocus={() => setActiveNode(node)}
                onBlur={() => setActiveNode(null)}
              >
                {/* Outer halo / beacon ring */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r + (isHovered ? 12 : 7)}
                  className={
                    isHovered
                      ? "stroke-ink fill-surface/60"
                      : "stroke-ink/30 fill-transparent"
                  }
                  strokeWidth="1"
                  strokeDasharray={isCore ? undefined : "2 2"}
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: isHovered ? [1.1, 1.25, 1.1] : [1, 1.12, 1],
                        }
                  }
                  transition={{
                    duration: isCore ? 2 : 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Primary Dot Body */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={isHovered ? node.r + 2 : node.r}
                  className={isHovered || isCore ? "fill-ink" : "fill-ink/85"}
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: isHovered ? 1.2 : [1, 1.08, 1],
                        }
                  }
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Satellite Orbital Dot around Core */}
                {isCore && !shouldReduceMotion && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={2.5}
                    className="fill-ink"
                    animate={{
                      cx: [250 + 26, 250, 250 - 26, 250, 250 + 26],
                      cy: [250, 250 + 26, 250, 250 - 26, 250],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Bottom Node Inspector / Active Label */}
      <div className="absolute bottom-4 inset-x-6 flex items-center justify-between text-[11px] font-mono pt-3 border-t border-border-subtle/60 text-ink">
        <div className="flex items-center gap-2">
          <span className="text-ink-muted text-[10px]">INSPECT:</span>
          <span className="font-semibold tracking-wider">
            {activeNode ? activeNode.label : "ORCHESTRATION LAYER"}
          </span>
        </div>
        <span className="text-[10px] text-ink-muted uppercase">
          {activeNode ? `ID: ${activeNode.id.toUpperCase()}` : "AUTONOMOUS"}
        </span>
      </div>
    </div>
  );
}
