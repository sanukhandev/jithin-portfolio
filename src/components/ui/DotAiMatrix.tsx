"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FileText, FileCode, Files } from "lucide-react";

// 5x7 Pixel Font Matrix for "HELLO WORLD !"
const CHAR_BITMAPS: Record<string, number[][]> = {
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  E: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  L: [
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  O: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  W: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  R: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  D: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  "!": [
    [1],
    [1],
    [1],
    [1],
    [1],
    [0],
    [1],
  ],
  " ": [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
};

interface PixelItem {
  id: string;
  charIndex: number;
  finalX: number;
  finalY: number;
  scatterX: number;
  scatterY: number;
  delay: number;
}

export function DotAiMatrix({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  // Compute all pixel positions for "HELLO WORLD !"
  const textString = "HELLO WORLD !";
  const startX = 415;
  const startY = 160;
  const pixelSize = 2.4;
  const pixelGap = 1.3;
  const charSpacing = 4.5;

  const pixels: PixelItem[] = useMemo(() => {
    const list: PixelItem[] = [];
    let currentX = startX;

    for (let cIdx = 0; cIdx < textString.length; cIdx++) {
      const char = textString[cIdx];
      const bitmap = CHAR_BITMAPS[char] || CHAR_BITMAPS[" "];
      const cols = bitmap[0].length;

      for (let r = 0; r < bitmap.length; r++) {
        for (let c = 0; c < cols; c++) {
          if (bitmap[r][c] === 1) {
            const finalX = currentX + c * (pixelSize + pixelGap);
            const finalY = startY + r * (pixelSize + pixelGap);

            // Deterministic pseudo-random scatter vector
            const seed = (cIdx * 37 + r * 13 + c * 7) % 31;
            const angle = (seed / 31) * Math.PI * 2;
            const dist = 12 + (seed % 16);

            list.push({
              id: `p-${cIdx}-${r}-${c}`,
              charIndex: cIdx,
              finalX,
              finalY,
              scatterX: Math.cos(angle) * dist,
              scatterY: Math.sin(angle) * dist,
              // Delay wave traveling from left to right as the stream hits
              delay: 1.1 + cIdx * 0.08 + (c * 0.02),
            });
          }
        }
      }
      currentX += cols * (pixelSize + pixelGap) + charSpacing;
    }
    return list;
  }, []);

  // Document sources (Stage 1)
  const DOC_SOURCES = [
    { id: "doc-1", y: 85, icon: FileText },
    { id: "doc-2", y: 175, icon: FileCode },
    { id: "doc-3", y: 265, icon: Files },
  ];

  // Pipeline Coordinates
  const FILTER_1_X = 165;
  const FILTER_2_X = 265;
  const CORE_NODE = { x: 355, y: 175 };

  // Streams from Docs -> Filter 1 -> Filter 2 -> Core Node
  const STREAM_PATHS = [
    {
      d: `M 70 85 L ${FILTER_1_X} 115 L ${FILTER_2_X} 150 L ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 2.8,
      delay: 0,
    },
    {
      d: `M 70 175 L ${FILTER_1_X} 175 L ${FILTER_2_X} 175 L ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 2.6,
      delay: 0.4,
    },
    {
      d: `M 70 265 L ${FILTER_1_X} 235 L ${FILTER_2_X} 200 L ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 3.0,
      delay: 0.8,
    },
    {
      d: `M 70 85 L ${FILTER_1_X} 175 L ${FILTER_2_X} 150 L ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 3.2,
      delay: 1.2,
    },
    {
      d: `M 70 265 L ${FILTER_1_X} 175 L ${FILTER_2_X} 200 L ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 2.9,
      delay: 1.6,
    },
  ];

  // Beam from Core Node to Pixel Matrix Target
  const BEAM_PATH = `M ${CORE_NODE.x + 18} ${CORE_NODE.y} L ${startX - 10} ${startY + 12}`;

  return (
    <div
      className={`relative w-full aspect-[16/9] max-w-[660px] mx-auto flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 680 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Ambient Subtle Grid Dots */}
        <defs>
          <pattern id="ambientMatrix" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="11" cy="11" r="0.65" className="fill-ink/15" />
          </pattern>
        </defs>
        <rect width="680" height="350" fill="url(#ambientMatrix)" opacity={0.5} />

        {/* 1. DOCUMENT ICONS (STAGE 1: GENERATION SOURCE) */}
        <g className="doc-icons">
          {DOC_SOURCES.map((doc) => {
            const Icon = doc.icon;
            return (
              <g key={doc.id} transform={`translate(32, ${doc.y - 19})`}>
                <rect
                  x="0"
                  y="0"
                  width="38"
                  height="38"
                  rx="6"
                  className="fill-surface stroke-ink/30"
                  strokeWidth="1.2"
                />
                <foreignObject x="7" y="7" width="24" height="24">
                  <div className="w-full h-full flex items-center justify-center text-ink">
                    <Icon className="w-5 h-5 text-ink" strokeWidth={1.5} />
                  </div>
                </foreignObject>

                {/* Emitting port dot */}
                <motion.circle
                  cx="38"
                  cy="19"
                  r="3"
                  className="fill-ink"
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: [1, 1.35, 1],
                          opacity: [0.6, 1, 0.6],
                        }
                  }
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: doc.y * 0.004,
                    ease: "easeInOut",
                  }}
                />
              </g>
            );
          })}
        </g>

        {/* 2. TRANSMISSION RAILS */}
        <g className="rails">
          {STREAM_PATHS.map((path, idx) => (
            <path
              key={`rail-${idx}`}
              d={path.d}
              className="stroke-ink/10"
              strokeWidth="0.9"
              strokeDasharray="2 3"
            />
          ))}
        </g>

        {/* 3. TAILING STREAMS (PASSING THROUGH VERTICAL FILTERS) */}
        {!shouldReduceMotion && (
          <g className="tailing-impulses">
            {STREAM_PATHS.map((path, idx) => (
              <React.Fragment key={`impulse-${idx}`}>
                {/* Primary Tailing Line */}
                <motion.path
                  d={path.d}
                  fill="none"
                  className="stroke-ink"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeDasharray="45 320"
                  animate={{
                    strokeDashoffset: [365, -365],
                    opacity: [0, 0.95, 0.95, 0],
                  }}
                  transition={{
                    duration: path.duration,
                    repeat: Infinity,
                    delay: path.delay,
                    ease: "easeInOut",
                  }}
                />
                {/* Secondary Micro-Tail */}
                <motion.path
                  d={path.d}
                  fill="none"
                  className="stroke-ink/40"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray="15 350"
                  animate={{
                    strokeDashoffset: [365, -365],
                    opacity: [0, 0.7, 0.7, 0],
                  }}
                  transition={{
                    duration: path.duration * 0.9,
                    repeat: Infinity,
                    delay: path.delay + 0.25,
                    ease: "easeInOut",
                  }}
                />
              </React.Fragment>
            ))}
          </g>
        )}

        {/* 4. VERTICAL FILTERS (STAGE 2) */}
        {/* Filter 1 */}
        <g className="vertical-filter-1">
          <line
            x1={FILTER_1_X}
            y1="45"
            x2={FILTER_1_X}
            y2="305"
            className="stroke-ink/30"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          {[85, 130, 175, 220, 265].map((y, idx) => (
            <circle
              key={`f1-notch-${idx}`}
              cx={FILTER_1_X}
              cy={y}
              r="2.5"
              className="fill-surface stroke-ink"
              strokeWidth="1.2"
            />
          ))}
          {!shouldReduceMotion && (
            <motion.line
              x1={FILTER_1_X}
              y1="45"
              x2={FILTER_1_X}
              y2="105"
              className="stroke-ink"
              strokeWidth="2.5"
              strokeLinecap="round"
              animate={{
                y1: [45, 245, 45],
                y2: [105, 305, 105],
                opacity: [0.2, 0.85, 0.2],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </g>

        {/* Filter 2 */}
        <g className="vertical-filter-2">
          <line
            x1={FILTER_2_X}
            y1="60"
            x2={FILTER_2_X}
            y2="290"
            className="stroke-ink/30"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          {[110, 150, 175, 200, 240].map((y, idx) => (
            <circle
              key={`f2-notch-${idx}`}
              cx={FILTER_2_X}
              cy={y}
              r="2.5"
              className="fill-surface stroke-ink"
              strokeWidth="1.2"
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
                y1: [230, 60, 230],
                y2: [290, 120, 290],
                opacity: [0.3, 0.9, 0.3],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </g>

        {/* 5. FINAL SINGLE CONVERGENCE NODE (STAGE 3) */}
        <g className="final-single-node">
          <circle
            cx={CORE_NODE.x}
            cy={CORE_NODE.y}
            r="22"
            className="stroke-ink/20 fill-transparent"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <circle
            cx={CORE_NODE.x}
            cy={CORE_NODE.y}
            r="14"
            className="stroke-ink/35 fill-surface"
            strokeWidth="1.2"
          />
          {!shouldReduceMotion && (
            <motion.circle
              cx={CORE_NODE.x}
              cy={CORE_NODE.y}
              r="7"
              className="stroke-ink"
              strokeWidth="1"
              animate={{
                r: [7, 32],
                opacity: [0.75, 0],
              }}
              transition={{
                duration: 2.0,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
          <motion.circle
            cx={CORE_NODE.x}
            cy={CORE_NODE.y}
            r="6.5"
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

        {/* 6. STREAM FIRING INTO PIXEL FIELD (STAGE 4) */}
        <path
          d={BEAM_PATH}
          className="stroke-ink/25"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        {!shouldReduceMotion && (
          <motion.path
            d={BEAM_PATH}
            fill="none"
            className="stroke-ink"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="28 120"
            animate={{
              strokeDashoffset: [148, -148],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* Impact Spark Waves at Target Inception */}
        {!shouldReduceMotion && (
          <motion.circle
            cx={startX - 8}
            cy={startY + 12}
            r={3}
            className="stroke-ink fill-transparent"
            strokeWidth="1"
            animate={{
              r: [3, 16],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}

        {/* 7. DEPIXELATING "HELLO WORLD !" PIXEL MATRIX (STAGE 5) */}
        <g className="depixelating-word">
          {pixels.map((pixel) => (
            <motion.rect
              key={pixel.id}
              width={pixelSize}
              height={pixelSize}
              rx={0.3}
              className="fill-ink"
              initial={false}
              animate={
                shouldReduceMotion
                  ? {
                      x: pixel.finalX,
                      y: pixel.finalY,
                      opacity: 1,
                      scale: 1,
                    }
                  : {
                      // Cycle: Scattered noise -> Hit by stream -> Snaps into sharp pixel -> Holds -> Dissolves
                      x: [
                        pixel.finalX + pixel.scatterX, // 0%: Scattered / blurred noise
                        pixel.finalX,                  // 35%: Snaps to crystal clear coordinate
                        pixel.finalX,                  // 75%: Fully formed word holds
                        pixel.finalX + pixel.scatterX, // 100%: Deconstructs / dissolves
                      ],
                      y: [
                        pixel.finalY + pixel.scatterY,
                        pixel.finalY,
                        pixel.finalY,
                        pixel.finalY + pixel.scatterY,
                      ],
                      opacity: [0.15, 1, 1, 0.15],
                      scale: [0.5, 1.25, 1, 0.5],
                    }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.01 }
                  : {
                      duration: 4.8,
                      repeat: Infinity,
                      delay: pixel.delay,
                      times: [0, 0.35, 0.8, 1],
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
