"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn, EASE } from "@/lib/utils";

/** A single saffron thread that draws across the viewport and ends in a small knot. */
export function ThreadDivider({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const show = inView || reduce;

  return (
    <div ref={ref} className={cn("relative h-6 w-full", className)} aria-hidden>
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 1000 24" preserveAspectRatio="none">
        <path d="M0 12 H1000" stroke={tone === "dark" ? "#323C75" : "#D9D0BF"} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <motion.path
          d="M0 12 C 120 4, 220 20, 360 12 S 640 4, 760 12 S 920 18, 1000 12"
          fill="none"
          stroke="#E8A33D"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: show ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 1.6, ease: EASE }}
        />
      </svg>
      <motion.span
        className="absolute right-0 top-1/2 block h-3 w-3 -translate-y-1/2 rounded-full bg-saffron"
        initial={{ scale: 0 }}
        animate={{ scale: show ? 1 : 0 }}
        transition={{ duration: 0.4, delay: reduce ? 0 : 1.4, ease: EASE }}
      />
    </div>
  );
}
