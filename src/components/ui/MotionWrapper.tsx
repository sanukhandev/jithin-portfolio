"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface MotionWrapperProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "none";
  className?: string;
}

export function MotionWrapper({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = direction === "up" ? 16 : direction === "down" ? -16 : 0;

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.45,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
