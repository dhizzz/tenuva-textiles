"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/utils";

/** A thread draws a circle, then a check mark, in saffron. */
export function SuccessCheck({ className = "h-24 w-24" }: { className?: string }) {
  const reduce = useReducedMotion();
  const d = reduce ? 0 : 1;
  return (
    <svg viewBox="0 0 96 96" className={className} fill="none" aria-hidden>
      <motion.circle
        cx="48"
        cy="48"
        r="40"
        stroke="#E8A33D"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9 * d, ease: EASE }}
      />
      <motion.path
        d="M30 50 L43 63 L68 36"
        stroke="#E8A33D"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6 * d, ease: EASE, delay: 0.8 * d }}
      />
    </svg>
  );
}
