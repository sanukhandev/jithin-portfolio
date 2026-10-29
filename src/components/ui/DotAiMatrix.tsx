"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FileText, FileCode, Files } from "lucide-react";

export function DotAiMatrix({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  // Typewriter effect state for constructing "HELLO WORLD"
  const fullText = "HELLO WORLD";
  const [displayedLength, setDisplayedLength] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedLength(fullText.length);
      return;
    }

    const interval = setInterval(() => {
      setDisplayedLength((prev) => {
        if (prev >= fullText.length) {
          // Pause at full text then reset
          setTimeout(() => setDisplayedLength(0), 1800);
          return fullText.length;
        }
        return prev + 1;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Document sources on the left
  const DOC_SOURCES = [
    { id: "doc-1", y: 90, icon: FileText, label: "DOC_01" },
    { id: "doc-2", y: 190, icon: FileCode, label: "DOC_02" },
    { id: "doc-3", y: 290, icon: Files, label: "DOC_03" },
  ];

  // Two vertical filter stages in the middle
  const FILTER_1_X = 180;
  const FILTER_2_X = 290;
  const CORE_NODE = { x: 400, y: 190 };

  // Streams from Docs -> Filter 1 -> Filter 2 -> Core Node
  const STREAM_PATHS = [
    // Top Doc -> Filter 1 -> Filter 2 -> Core
    {
      d: `M 80 90 L ${FILTER_1_X} 120 L ${FILTER_2_X} 160 L ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 3.0,
      delay: 0,
    },
    // Middle Doc -> Filter 1 -> Filter 2 -> Core
    {
      d: `M 80 190 L ${FILTER_1_X} 190 L ${FILTER_2_X} 190 L ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 2.8,
      delay: 0.6,
    },
    // Bottom Doc -> Filter 1 -> Filter 2 -> Core
    {
      d: `M 80 290 L ${FILTER_1_X} 260 L ${FILTER_2_X} 220 L ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 3.2,
      delay: 1.2,
    },
    // Diagonal cross-harmonics
    {
      d: `M 80 90 L ${FILTER_1_X} 190 L ${FILTER_2_X} 160 L ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 3.4,
      delay: 1.8,
    },
    {
      d: `M 80 290 L ${FILTER_1_X} 190 L ${FILTER_2_X} 220 L ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 3.1,
      delay: 2.2,
    },
  ];

  return (
    <div
      className={`relative w-full aspect-[16/10] max-w-[620px] mx-auto flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 620 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Subtle grid pattern */}
          <pattern id="subtleGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.6" className="fill-ink/15" />
          </pattern>
        </defs>
        <rect width="620" height="380" fill="url(#subtleGrid)" opacity={0.6} />

        {/* 1. DOCUMENT ICONS (STAGE 1: GENERATION SOURCE) */}
        <g className="doc-icons">
          {DOC_SOURCES.map((doc) => {
            const Icon = doc.icon;
            return (
              <g key={doc.id} transform={`translate(40, ${doc.y - 20})`}>
                {/* Doc Icon Outline & Glow */}
                <rect
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  rx="6"
                  className="fill-surface stroke-ink/30"
                  strokeWidth="1.2"
                />
                {/* Embedded Lucide Icon representation */}
                <foreignObject x="8" y="8" width="24" height="24">
                  <div className="w-full h-full flex items-center justify-center text-ink">
                    <Icon className="w-5 h-5 text-ink" strokeWidth={1.5} />
                  </div>
                </foreignObject>

                {/* Emitting Port Dot on right edge */}
                <motion.circle
                  cx="40"
                  cy="20"
                  r="3.5"
                  className="fill-ink"
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: [1, 1.4, 1],
                          opacity: [0.6, 1, 0.6],
                        }
                  }
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: doc.y * 0.005,
                    ease: "easeInOut",
                  }}
                />
              </g>
            );
          })}
        </g>

        {/* 2. STATIC TRANSMISSION RAILS (DOCS -> FILTERS -> CORE) */}
        <g className="transmission-rails">
          {STREAM_PATHS.map((path, idx) => (
            <path
              key={`rail-${idx}`}
              d={path.d}
              className="stroke-ink/10"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
          ))}
        </g>

        {/* 3. TAILING LINES (DATA STREAM IMPULSES PASSING THROUGH FILTERS) */}
        {!shouldReduceMotion && (
          <g className="tailing-impulses">
            {STREAM_PATHS.map((path, idx) => (
              <React.Fragment key={`impulse-${idx}`}>
                {/* Primary Tailing Line */}
                <motion.path
                  d={path.d}
                  fill="none"
                  className="stroke-ink"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeDasharray="50 350"
                  animate={{
                    strokeDashoffset: [400, -400],
                    opacity: [0, 0.9, 0.9, 0],
                  }}
                  transition={{
                    duration: path.duration,
                    repeat: Infinity,
                    delay: path.delay,
                    ease: "easeInOut",
                  }}
                />
                {/* Accompanying Micro Particle */}
                <motion.path
                  d={path.d}
                  fill="none"
                  className="stroke-ink/40"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray="15 385"
                  animate={{
                    strokeDashoffset: [400, -400],
                    opacity: [0, 0.7, 0.7, 0],
                  }}
                  transition={{
                    duration: path.duration * 0.95,
                    repeat: Infinity,
                    delay: path.delay + 0.2,
                    ease: "easeInOut",
                  }}
                />
              </React.Fragment>
            ))}
          </g>
        )}

        {/* 4. VERTICAL FILTERS (STAGE 2) */}
        {/* Filter 1: Ingestion & Feature Extraction */}
        <g className="vertical-filter-1">
          <line
            x1={FILTER_1_X}
            y1="40"
            x2={FILTER_1_X}
            y2="340"
            className="stroke-ink/30"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          {/* Filter Gateway Slits / Notch Dots */}
          {[90, 140, 190, 240, 290].map((y, idx) => (
            <motion.circle
              key={`f1-notch-${idx}`}
              cx={FILTER_1_X}
              cy={y}
              r="3"
              className="fill-surface stroke-ink"
              strokeWidth="1.2"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: [1, 1.25, 1],
                      opacity: [0.5, 1, 0.5],
                    }
              }
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: idx * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
          {/* Vertical Scanner Light */}
          {!shouldReduceMotion && (
            <motion.line
              x1={FILTER_1_X}
              y1="40"
              x2={FILTER_1_X}
              y2="100"
              className="stroke-ink"
              strokeWidth="2.5"
              strokeLinecap="round"
              animate={{
                y1: [40, 280, 40],
                y2: [100, 340, 100],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </g>

        {/* Filter 2: Refinement & Alignment */}
        <g className="vertical-filter-2">
          <line
            x1={FILTER_2_X}
            y1="60"
            x2={FILTER_2_X}
            y2="320"
            className="stroke-ink/30"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          {/* Filter 2 Notches */}
          {[120, 160, 190, 220, 260].map((y, idx) => (
            <motion.circle
              key={`f2-notch-${idx}`}
              cx={FILTER_2_X}
              cy={y}
              r="2.5"
              className="fill-surface stroke-ink"
              strokeWidth="1"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: [1, 1.25, 1],
                      opacity: [0.5, 0.9, 0.5],
                    }
              }
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: idx * 0.25 + 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
          {!shouldReduceMotion && (
            <motion.line
              x1={FILTER_2_X}
              y1="60"
              x2={FILTER_2_X}
              y2="120"
              className="stroke-ink"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{
                y1: [260, 60, 260],
                y2: [320, 120, 320],
                opacity: [0.3, 0.85, 0.3],
              }}
              transition={{
                duration: 3.0,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </g>

        {/* 5. FINAL SINGLE CONVERGENCE NODE (STAGE 3) */}
        <g className="final-single-node">
          {/* Concentric Aura Rings */}
          <circle
            cx={CORE_NODE.x}
            cy={CORE_NODE.y}
            r="24"
            className="stroke-ink/20 fill-transparent"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <circle
            cx={CORE_NODE.x}
            cy={CORE_NODE.y}
            r="16"
            className="stroke-ink/35 fill-surface"
            strokeWidth="1.2"
          />

          {/* Ripple Radiating from Core */}
          {!shouldReduceMotion && (
            <motion.circle
              cx={CORE_NODE.x}
              cy={CORE_NODE.y}
              r="8"
              className="stroke-ink"
              strokeWidth="1"
              animate={{
                r: [8, 36],
                opacity: [0.7, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}

          {/* Core Solid Node */}
          <motion.circle
            cx={CORE_NODE.x}
            cy={CORE_NODE.y}
            r="7"
            className="fill-ink"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [1, 1.25, 1],
                  }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <circle cx={CORE_NODE.x} cy={CORE_NODE.y} r="2" className="fill-surface" />
        </g>

        {/* 6. EMITTING BEAM FROM SINGLE NODE TOWARD TEXT */}
        <line
          x1={CORE_NODE.x + 24}
          y1={CORE_NODE.y}
          x2="455"
          y2={CORE_NODE.y}
          className="stroke-ink/40"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
        {!shouldReduceMotion && (
          <motion.circle
            cx={CORE_NODE.x + 24}
            cy={CORE_NODE.y}
            r="3"
            className="fill-ink"
            animate={{
              cx: [CORE_NODE.x + 24, 455],
              opacity: [0.9, 0.2],
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* 7. CONSTRUCTING "HELLO WORLD" TEXT (STAGE 4) */}
        <g className="text-construction" transform="translate(465, 198)">
          {/* Constructing Text Output */}
          <text
            x="0"
            y="0"
            className="fill-ink font-mono font-bold tracking-widest text-[20px] select-none"
          >
            {fullText.slice(0, displayedLength)}
          </text>

          {/* Typing Blinking Cursor Block */}
          {!shouldReduceMotion && (
            <motion.rect
              x={displayedLength * 14.5 + 4}
              y="-18"
              width="9"
              height="22"
              className="fill-ink"
              animate={{ opacity: [1, 0, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}
        </g>

        {/* Subtle Assembly Scatter Particles around Text */}
        {!shouldReduceMotion && (
          <g className="text-assembly-particles">
            {[
              { x: 475, y: 165, r: 1.5, d: 0.2 },
              { x: 510, y: 170, r: 1.5, d: 0.5 },
              { x: 550, y: 165, r: 1.5, d: 0.8 },
              { x: 490, y: 220, r: 1.5, d: 0.4 },
              { x: 535, y: 225, r: 1.5, d: 0.7 },
              { x: 580, y: 215, r: 1.5, d: 1.0 },
            ].map((p, idx) => (
              <motion.circle
                key={`p-${idx}`}
                cx={p.x}
                cy={p.y}
                r={p.r}
                className="fill-ink/70"
                animate={{
                  y: [p.y - 4, p.y + 4, p.y - 4],
                  opacity: [0.3, 0.9, 0.3],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: p.d,
                  ease: "easeInOut",
                }}
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
