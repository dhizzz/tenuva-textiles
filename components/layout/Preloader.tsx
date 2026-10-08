"use client";

import { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import { useApp } from "@/lib/AppProvider";
import { useT } from "@/lib/LanguageProvider";
import { EASE } from "@/lib/utils";

const KEY = "tenuva-preloaded";
const STRIPS = 8;
const WEFT: [number, number][] = [
  [4, 10],
  [48, 10],
  [26, 32],
  [70, 32],
  [4, 54],
  [48, 54],
  [26, 76],
  [70, 76],
];

export function Preloader() {
  const { setReady } = useApp();
  const { t } = useT();
  const [stage, setStage] = useState<"draw" | "lift" | "done">("draw");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setStage("done");
      setReady(true);
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      return;
    }

    document.body.style.overflow = "hidden";
    const timers: number[] = [];
    const controls = animate(0, 100, {
      duration: 1.8,
      ease: [0.45, 0, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        setStage("lift");
        timers.push(
          window.setTimeout(() => setReady(true), 250),
          window.setTimeout(() => {
            setStage("done");
            document.body.style.overflow = "";
            try {
              sessionStorage.setItem(KEY, "1");
            } catch {}
          }, 1000),
        );
      },
    });

    return () => {
      controls.stop();
      timers.forEach((t) => window.clearTimeout(t));
      document.body.style.overflow = "";
    };
  }, [setReady]);

  if (stage === "done") return null;

  return (
    <div
      id="preloader"
      role="status"
      aria-label={t("common.loading")}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ pointerEvents: stage === "lift" ? "none" : "auto" }}
    >
      <div className="absolute inset-0 flex">
        {Array.from({ length: STRIPS }).map((_, i) => (
          <motion.div
            key={i}
            className="grain relative h-full flex-1 bg-indigo"
            animate={stage === "lift" ? { y: "-101%" } : { y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: stage === "lift" ? i * 0.06 : 0 }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-8 text-cotton"
        animate={{ opacity: stage === "lift" ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      >
        <svg viewBox="0 0 96 96" className="h-24 w-24" aria-hidden>
          <motion.rect
            x="2"
            y="2"
            width="92"
            height="92"
            rx="14"
            fill="#F3EEE4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          {[10, 32, 54, 76].map((x, i) => (
            <motion.rect
              key={x}
              x={x}
              y="2"
              width="14"
              height="92"
              fill="#17204D"
              style={{ transformBox: "fill-box", transformOrigin: "center top" }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.1 }}
            />
          ))}
          {WEFT.map(([x, y], i) => (
            <motion.rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="26"
              height="14"
              fill="#E8A33D"
              stroke="#F3EEE4"
              strokeWidth="2.5"
              style={{ transformBox: "fill-box", transformOrigin: "left center" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.7 + i * 0.1 }}
            />
          ))}
          <rect x="2" y="2" width="92" height="92" rx="14" fill="none" stroke="#17204D" strokeWidth="4" />
        </svg>
        <p className="t-mono-lg tabular-nums tracking-[0.2em]">{String(count).padStart(3, "0")}</p>
      </motion.div>
    </div>
  );
}
