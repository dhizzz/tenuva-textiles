"use client";

import { motion } from "framer-motion";
import { useApp } from "@/lib/AppProvider";
import { EASE } from "@/lib/utils";

const STRIPS = 8;

/** 8 vertical indigo strips wipe up over the page, the route swaps, then they exit upward. */
export function PageTransition() {
  const { phase } = useApp();
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[90] flex"
      style={{ pointerEvents: phase === "idle" ? "none" : "auto" }}
    >
      {Array.from({ length: STRIPS }).map((_, i) => (
        <motion.div
          key={i}
          className="h-full flex-1 bg-indigo"
          style={{ originY: 1 }}
          initial={{ scaleY: 0, originY: 1 }}
          animate={
            phase === "cover"
              ? { scaleY: 1, originY: 1, transition: { duration: 0.26, ease: EASE, delay: i * 0.02 } }
              : phase === "reveal"
                ? {
                    scaleY: 0,
                    originY: 0,
                    transition: { duration: 0.3, ease: EASE, delay: i * 0.02, originY: { duration: 0 } },
                  }
                : { scaleY: 0, originY: 1, transition: { duration: 0 } }
          }
        />
      ))}
    </div>
  );
}
