"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FileText, FileCode, Files } from "lucide-react";

// Glitch pixel characters for depixelating effect
const PIXEL_CHARS = ["█", "▓", "▒", "░", "■", "▪", "0", "1"];

export function DotAiMatrix({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  const targetWord = "HELLO WORLD !";
  const [resolvedCount, setResolvedCount] = useState(targetWord.length);
  const [glitchText, setGlitchText] = useState(targetWord);
  const [beamActive, setBeamActive] = useState(false);

  // Depixelation loop cycle
  useEffect(() => {
    if (shouldReduceMotion) {
      setResolvedCount(targetWord.length);
      setGlitchText(targetWord);
      return;
    }

    let isMounted = true;

    const runCycle = async () => {
      while (isMounted) {
        // Phase 1: Reset to pixelated noise
        setBeamActive(false);
        setResolvedCount(0);
        setGlitchText(
          targetWord
            .split("")
            .map((ch) => (ch === " " ? " " : PIXEL_CHARS[Math.floor(Math.random() * PIXEL_CHARS.length)]))
            .join("")
        );

        // Wait for streams to travel through filters to single node
        await new Promise((r) => setTimeout(r, 1200));
        if (!isMounted) break;

        // Phase 2: Beam fires from single node
        setBeamActive(true);
        await new Promise((r) => setTimeout(r, 300));
        if (!isMounted) break;

        // Phase 3: Depixelate character by character from stream impact
        for (let i = 0; i <= targetWord.length; i++) {
          if (!isMounted) break;
          setResolvedCount(i);
          setGlitchText(
            targetWord
              .split("")
              .map((ch, idx) => {
                if (idx < i) return ch;
                if (ch === " ") return " ";
                return PIXEL_CHARS[Math.floor(Math.random() * PIXEL_CHARS.length)];
              })
              .join("")
          );
          await new Promise((r) => setTimeout(r, 90));
        }

        // Phase 4: Fully resolved "HELLO WORLD !" holds in clear focus
        setGlitchText(targetWord);
        await new Promise((r) => setTimeout(r, 2200));
      }
    };

    runCycle();

    return () => {
      isMounted = false;
    };
  }, [shouldReduceMotion]);

  // Stage Coordinates
  const DOC_SOURCES = [
    { id: "doc-1", y: 75, icon: FileText },
    { id: "doc-2", y: 160, icon: FileCode },
    { id: "doc-3", y: 245, icon: Files },
  ];

  const FILTER_1_X = 145;
  const FILTER_2_X = 230;
  const CORE_NODE = { x: 310, y: 160 };
  const TARGET_START_X = 380;
  const TARGET_Y = 168;

  // Stream paths from docs -> filters -> core node
  const STREAM_PATHS = [
    {
      d: `M 65 75 L ${FILTER_1_X} 105 L ${FILTER_2_X} 135 L ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 2.8,
      delay: 0,
    },
    {
      d: `M 65 160 L ${FILTER_1_X} 160 L ${FILTER_2_X} 160 L ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 2.5,
      delay: 0.3,
    },
    {
      d: `M 65 245 L ${FILTER_1_X} 215 L ${FILTER_2_X} 185 L ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 2.9,
      delay: 0.6,
    },
    {
      d: `M 65 75 L ${FILTER_1_X} 160 L ${FILTER_2_X} 135 L ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 3.1,
      delay: 1.0,
    },
    {
      d: `M 65 245 L ${FILTER_1_X} 160 L ${FILTER_2_X} 185 L ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 2.8,
      delay: 1.4,
    },
  ];

  // Scattering pixel particles around the impact zone
  const SCATTER_PIXELS = [
    { x: TARGET_START_X - 10, y: TARGET_Y - 20, size: 4 },
    { x: TARGET_START_X + 20, y: TARGET_Y - 28, size: 5 },
    { x: TARGET_START_X + 60, y: TARGET_Y - 24, size: 4 },
    { x: TARGET_START_X + 110, y: TARGET_Y - 26, size: 5 },
    { x: TARGET_START_X + 160, y: TARGET_Y - 22, size: 4 },
    { x: TARGET_START_X + 210, y: TARGET_Y - 25, size: 4.5 },
    { x: TARGET_START_X + 15, y: TARGET_Y + 22, size: 4 },
    { x: TARGET_START_X + 75, y: TARGET_Y + 26, size: 4.5 },
    { x: TARGET_START_X + 130, y: TARGET_Y + 24, size: 5 },
    { x: TARGET_START_X + 185, y: TARGET_Y + 25, size: 4 },
    { x: TARGET_START_X + 235, y: TARGET_Y + 20, size: 4 },
  ];

  return (
    <div
      className={`relative w-full aspect-[16/9] max-w-[680px] mx-auto flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 680 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Subtle Ambient Grid Background */}
        <defs>
          <pattern id="dotLattice" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.6" className="fill-ink/15" />
          </pattern>
        </defs>
        <rect width="680" height="320" fill="url(#dotLattice)" opacity={0.4} />

        {/* 1. DOCUMENT ICONS (STAGE 1: GENERATION SOURCE) */}
        <g className="doc-icons">
          {DOC_SOURCES.map((doc) => {
            const Icon = doc.icon;
            return (
              <g key={doc.id} transform={`translate(28, ${doc.y - 18})`}>
                <rect
                  x="0"
                  y="0"
                  width="36"
                  height="36"
                  rx="6"
                  className="fill-surface stroke-ink/35"
                  strokeWidth="1.2"
                />
                <foreignObject x="6" y="6" width="24" height="24">
                  <div className="w-full h-full flex items-center justify-center text-ink">
                    <Icon className="w-5 h-5 text-ink" strokeWidth={1.5} />
                  </div>
                </foreignObject>

                {/* Emitting port dot */}
                <motion.circle
                  cx="36"
                  cy="18"
                  r="3.5"
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
                    delay: doc.y * 0.005,
                    ease: "easeInOut",
                  }}
                />
              </g>
            );
          })}
        </g>

        {/* 2. TRANSMISSION RAILS */}
        <g className="stream-rails">
          {STREAM_PATHS.map((path, idx) => (
            <path
              key={`rail-${idx}`}
              d={path.d}
              className="stroke-ink/10"
              strokeWidth="0.8"
              strokeDasharray="2 3"
            />
          ))}
        </g>

        {/* 3. TAILING IMPULSE STREAMS (PASSING THROUGH FILTERS) */}
        {!shouldReduceMotion && (
          <g className="tailing-impulses">
            {STREAM_PATHS.map((path, idx) => (
              <React.Fragment key={`impulse-${idx}`}>
                <motion.path
                  d={path.d}
                  fill="none"
                  className="stroke-ink"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeDasharray="45 280"
                  animate={{
                    strokeDashoffset: [325, -325],
                    opacity: [0, 0.95, 0.95, 0],
                  }}
                  transition={{
                    duration: path.duration,
                    repeat: Infinity,
                    delay: path.delay,
                    ease: "easeInOut",
                  }}
                />
                <motion.path
                  d={path.d}
                  fill="none"
                  className="stroke-ink/40"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  strokeDasharray="14 311"
                  animate={{
                    strokeDashoffset: [325, -325],
                    opacity: [0, 0.7, 0.7, 0],
                  }}
                  transition={{
                    duration: path.duration * 0.9,
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
        {/* Filter 1 */}
        <g className="vertical-filter-1">
          <line
            x1={FILTER_1_X}
            y1="40"
            x2={FILTER_1_X}
            y2="280"
            className="stroke-ink/30"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          {[75, 120, 160, 200, 245].map((y, idx) => (
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
              y1="40"
              x2={FILTER_1_X}
              y2="95"
              className="stroke-ink"
              strokeWidth="2.5"
              strokeLinecap="round"
              animate={{
                y1: [40, 225, 40],
                y2: [95, 280, 95],
                opacity: [0.2, 0.85, 0.2],
              }}
              transition={{
                duration: 3.0,
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
            y1="55"
            x2={FILTER_2_X}
            y2="265"
            className="stroke-ink/30"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          {[95, 135, 160, 185, 225].map((y, idx) => (
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
              y1="55"
              x2={FILTER_2_X}
              y2="110"
              className="stroke-ink"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{
                y1: [210, 55, 210],
                y2: [265, 110, 265],
                opacity: [0.3, 0.9, 0.3],
              }}
              transition={{
                duration: 2.7,
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
            r="20"
            className="stroke-ink/20 fill-transparent"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <circle
            cx={CORE_NODE.x}
            cy={CORE_NODE.y}
            r="13"
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
                r: [7, 30],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 1.8,
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

        {/* 6. EMITTING STREAM BEAM SHOOTING INTO PIXEL MATRIX (STAGE 4) */}
        <line
          x1={CORE_NODE.x + 20}
          y1={CORE_NODE.y}
          x2={TARGET_START_X - 10}
          y2={TARGET_Y - 8}
          className="stroke-ink/25"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />

        {/* High energy beam pulse */}
        <motion.line
          x1={CORE_NODE.x + 20}
          y1={CORE_NODE.y}
          x2={TARGET_START_X - 10}
          y2={TARGET_Y - 8}
          className="stroke-ink"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="25 60"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  strokeDashoffset: [85, -85],
                  opacity: beamActive ? [0.4, 1, 0.4] : 0.2,
                }
          }
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Impact Wave Expanding when Beam Hits */}
        {!shouldReduceMotion && (
          <motion.circle
            cx={TARGET_START_X - 10}
            cy={TARGET_Y - 8}
            r="4"
            className="stroke-ink fill-transparent"
            strokeWidth="1.2"
            animate={{
              r: [4, 18],
              opacity: [0.9, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}

        {/* 7. DEPIXELATING "HELLO WORLD !" TYPOGRAPHY & PIXEL MATRIX (STAGE 5) */}
        <g className="depixelating-target">
          {/* Scatter Pixel Noise Blocks that dissolve / assemble */}
          {!shouldReduceMotion &&
            SCATTER_PIXELS.map((p, idx) => (
              <motion.rect
                key={`scatter-pixel-${idx}`}
                width={p.size}
                height={p.size}
                className="fill-ink"
                animate={
                  resolvedCount < targetWord.length
                    ? {
                        x: [p.x - 6, p.x + 6, p.x],
                        y: [p.y - 4, p.y + 4, p.y],
                        opacity: [0.15, 0.7, 0.15],
                        scale: [0.8, 1.3, 0.8],
                      }
                    : {
                        opacity: 0,
                        scale: 0.2,
                      }
                }
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: (idx * 0.1) % 0.8,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* Clean Baseline Indicator Line */}
          <line
            x1={TARGET_START_X}
            y1={TARGET_Y + 12}
            x2={TARGET_START_X + 270}
            y2={TARGET_Y + 12}
            className="stroke-ink/20"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Prominent Depixelating Text */}
          <text
            x={TARGET_START_X}
            y={TARGET_Y}
            className="fill-ink font-mono font-bold tracking-[0.2em] select-none"
            style={{ fontSize: "24px" }}
          >
            {glitchText}
          </text>

          {/* Spark trail advancing with the depixelation wave */}
          {!shouldReduceMotion && resolvedCount < targetWord.length && (
            <motion.rect
              x={TARGET_START_X + resolvedCount * 19.5}
              y={TARGET_Y - 22}
              width="6"
              height="26"
              className="fill-ink"
              animate={{
                opacity: [1, 0.2, 1],
                scaleY: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}
        </g>
      </svg>
    </div>
  );
}
