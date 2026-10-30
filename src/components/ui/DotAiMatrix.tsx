"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FileText, FileCode, Files } from "lucide-react";

// Apple-inspired multilingual greetings with exclamation mark (including English, Italian, and Arabic)
const GREETINGS = [
  { word: "Hello!", script: "Latin" },
  { word: "Ciao!", script: "Latin" },
  { word: "مرحباً!", script: "Arabic" },
  { word: "Bonjour!", script: "Latin" },
  { word: "Hola!", script: "Latin" },
  { word: "Hallo!", script: "Latin" },
];

const GLITCH_GLYPHS = ["█", "▓", "▒", "░", "■", "▪", "0", "1"];

export function DotAiMatrix({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  const [greetingIndex, setGreetingIndex] = useState(0);
  const currentWord = GREETINGS[greetingIndex].word;
  const isArabic = GREETINGS[greetingIndex].script === "Arabic";

  const [resolvedLength, setResolvedLength] = useState(currentWord.length);
  const [displayText, setDisplayText] = useState(currentWord);
  const [beamPulse, setBeamPulse] = useState(false);

  // Cycling multilingual depixelating sequence
  useEffect(() => {
    const target = GREETINGS[greetingIndex].word;

    if (shouldReduceMotion) {
      setDisplayText(target);
      setResolvedLength(target.length);
      return;
    }

    let isMounted = true;

    const runSequence = async () => {
      // 1. Initial state: scrambled digital noise
      setBeamPulse(false);
      setResolvedLength(0);
      setDisplayText(
        target
          .split("")
          .map(() => GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)])
          .join("")
      );

      // 2. Stream travels along curly ribbons through vertical filters to single node
      await new Promise((r) => setTimeout(r, 1100));
      if (!isMounted) return;

      // 3. Beam triggers from single node
      setBeamPulse(true);
      await new Promise((r) => setTimeout(r, 250));
      if (!isMounted) return;

      // 4. Depixelating word character by character
      for (let i = 0; i <= target.length; i++) {
        if (!isMounted) return;
        setResolvedLength(i);
        setDisplayText(
          target
            .split("")
            .map((ch, idx) => {
              if (idx < i) return ch;
              return GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)];
            })
            .join("")
        );
        await new Promise((r) => setTimeout(r, 85));
      }

      // 5. Final sharp word holds in clear focus
      setDisplayText(target);
      await new Promise((r) => setTimeout(r, 2200));
      if (!isMounted) return;

      // Advance to next greeting
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    };

    runSequence();

    return () => {
      isMounted = false;
    };
  }, [greetingIndex, shouldReduceMotion]);

  // Stage Coordinates
  const DOC_SOURCES = [
    { id: "doc-1", y: 75, icon: FileText },
    { id: "doc-2", y: 160, icon: FileCode },
    { id: "doc-3", y: 245, icon: Files },
  ];

  const FILTER_1_X = 145;
  const FILTER_2_X = 235;
  const CORE_NODE = { x: 315, y: 160 };
  const GREETING_X = 405;
  const GREETING_Y = 172;

  // Organic Curly / Bézier Spline Curves (Flowing Ribbons)
  const CURLY_PATHS = [
    // Ribbon 1: Top Doc -> Undulating through Filter 1 & 2 -> Core Node
    {
      d: `M 65 75 C 95 40, 115 130, ${FILTER_1_X} 95 C 175 60, 205 185, ${FILTER_2_X} 135 C 265 95, 290 160, ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 3.1,
      delay: 0,
    },
    // Ribbon 2: Center Doc -> Harmonic Sine Wave -> Core Node
    {
      d: `M 65 160 C 100 120, 115 200, ${FILTER_1_X} 160 C 175 120, 205 200, ${FILTER_2_X} 160 C 265 120, 290 160, ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 2.8,
      delay: 0.4,
    },
    // Ribbon 3: Bottom Doc -> Curving upwards through Filters -> Core Node
    {
      d: `M 65 245 C 95 280, 115 190, ${FILTER_1_X} 225 C 175 260, 205 135, ${FILTER_2_X} 185 C 265 225, 290 160, ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 3.3,
      delay: 0.8,
    },
    // Ribbon 4: Sweeping S-Curve (Top to Bottom Harmonic)
    {
      d: `M 65 75 C 110 110, 125 210, ${FILTER_1_X} 175 C 165 140, 200 230, ${FILTER_2_X} 175 C 260 130, 290 160, ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 3.4,
      delay: 1.2,
    },
    // Ribbon 5: Sweeping S-Curve (Bottom to Top Harmonic)
    {
      d: `M 65 245 C 110 210, 125 110, ${FILTER_1_X} 145 C 165 180, 200 90, ${FILTER_2_X} 145 C 260 190, 290 160, ${CORE_NODE.x} ${CORE_NODE.y}`,
      duration: 3.0,
      delay: 1.6,
    },
  ];

  // Scattering pixel particles around the greeting impact zone
  const IMPACT_PIXELS = [
    { x: GREETING_X - 12, y: GREETING_Y - 24, size: 4 },
    { x: GREETING_X + 24, y: GREETING_Y - 32, size: 4.5 },
    { x: GREETING_X + 68, y: GREETING_Y - 28, size: 4 },
    { x: GREETING_X + 115, y: GREETING_Y - 30, size: 5 },
    { x: GREETING_X + 160, y: GREETING_Y - 26, size: 4 },
    { x: GREETING_X + 18, y: GREETING_Y + 24, size: 4 },
    { x: GREETING_X + 72, y: GREETING_Y + 28, size: 4.5 },
    { x: GREETING_X + 128, y: GREETING_Y + 25, size: 4 },
    { x: GREETING_X + 175, y: GREETING_Y + 22, size: 4 },
  ];

  return (
    <div
      className={`relative w-full aspect-[680/270] max-w-[680px] mx-auto flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 25 680 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Subtle Ambient Dot Lattice */}
        <defs>
          <pattern id="ambientDots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.6" className="fill-ink/15" />
          </pattern>
        </defs>
        <rect y="25" width="680" height="270" fill="url(#ambientDots)" opacity={0.4} />

        {/* 1. DOCUMENT SOURCES (STAGE 1: GENERATION SOURCE) */}
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

        {/* 2. STATIC CURLY GUIDE RAILS */}
        <g className="curly-guide-rails">
          {CURLY_PATHS.map((path, idx) => (
            <path
              key={`rail-${idx}`}
              d={path.d}
              className="stroke-ink/10"
              strokeWidth="0.85"
              strokeDasharray="2 3"
            />
          ))}
        </g>

        {/* 3. DYNAMIC CURLY TAILING IMPULSES (PASSING THROUGH FILTERS) */}
        {!shouldReduceMotion && (
          <g className="curly-tailing-signals">
            {CURLY_PATHS.map((path, idx) => (
              <React.Fragment key={`curly-tail-${idx}`}>
                {/* Primary Curly Tailing Stream */}
                <motion.path
                  d={path.d}
                  fill="none"
                  className="stroke-ink"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeDasharray="50 340"
                  animate={{
                    strokeDashoffset: [390, -390],
                    opacity: [0, 0.95, 0.95, 0],
                  }}
                  transition={{
                    duration: path.duration,
                    repeat: Infinity,
                    delay: path.delay,
                    ease: "easeInOut",
                  }}
                />
                {/* Secondary Micro-Wave Tail */}
                <motion.path
                  d={path.d}
                  fill="none"
                  className="stroke-ink/40"
                  strokeWidth="0.95"
                  strokeLinecap="round"
                  strokeDasharray="16 374"
                  animate={{
                    strokeDashoffset: [390, -390],
                    opacity: [0, 0.7, 0.7, 0],
                  }}
                  transition={{
                    duration: path.duration * 0.92,
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

        {/* 6. STREAM BEAM SHOOTING INTO GREETING AREA (STAGE 4) */}
        <path
          d={`M ${CORE_NODE.x + 20} ${CORE_NODE.y} C ${CORE_NODE.x + 45} ${CORE_NODE.y - 15}, ${GREETING_X - 35} ${GREETING_Y - 5}, ${GREETING_X - 10} ${GREETING_Y - 8}`}
          className="stroke-ink/25"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />

        {/* Dynamic Curved Energy Beam */}
        <motion.path
          d={`M ${CORE_NODE.x + 20} ${CORE_NODE.y} C ${CORE_NODE.x + 45} ${CORE_NODE.y - 15}, ${GREETING_X - 35} ${GREETING_Y - 5}, ${GREETING_X - 10} ${GREETING_Y - 8}`}
          fill="none"
          className="stroke-ink"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="25 60"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  strokeDashoffset: [85, -85],
                  opacity: beamPulse ? [0.4, 1, 0.4] : 0.2,
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
            cx={GREETING_X - 10}
            cy={GREETING_Y - 8}
            r="4"
            className="stroke-ink fill-transparent"
            strokeWidth="1.2"
            animate={{
              r: [4, 20],
              opacity: [0.9, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}

        {/* 7. APPLE-STYLE MULTILINGUAL GREETING & DEPIXELATION (STAGE 5) */}
        <g className="depixelating-target">
          {/* Floating Scatter Pixel Blocks */}
          {!shouldReduceMotion &&
            IMPACT_PIXELS.map((p, idx) => (
              <motion.rect
                key={`impact-pixel-${idx}`}
                width={p.size}
                height={p.size}
                className="fill-ink"
                animate={
                  resolvedLength < currentWord.length
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

          {/* Understated Baseline Guide */}
          <line
            x1={GREETING_X}
            y1={GREETING_Y + 16}
            x2={GREETING_X + 220}
            y2={GREETING_Y + 16}
            className="stroke-ink/20"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Authentic Apple Setup / Loading Typography (SF Pro Display) */}
          <text
            x={GREETING_X}
            y={GREETING_Y}
            className="fill-ink select-none font-sans"
            style={{
              fontSize: "36px",
              fontWeight: 600,
              fontFamily: isArabic
                ? 'var(--font-sf-arabic), "Noto Sans Arabic", -apple-system, BlinkMacSystemFont, "SF Arabic", "Geeza Pro", "Segoe UI Arabic", "Dubai", "Tahoma", sans-serif'
                : 'var(--font-sf-display), "Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro", "SF Pro Text", "Helvetica Neue", "Segoe UI", Arial, sans-serif',
              letterSpacing: isArabic ? "normal" : "-0.035em",
            }}
          >
            {displayText}
          </text>

          {/* Depixelation Beam Spark Indicator */}
          {!shouldReduceMotion && resolvedLength < currentWord.length && (
            <motion.rect
              x={GREETING_X + resolvedLength * (isArabic ? 22 : 18.5)}
              y={GREETING_Y - 28}
              width="5"
              height="34"
              rx="1"
              className="fill-ink"
              animate={{
                opacity: [1, 0.2, 1],
                scaleY: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.25,
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
