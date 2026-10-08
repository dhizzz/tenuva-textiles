"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useT } from "@/lib/LanguageProvider";
import { useApp } from "@/lib/AppProvider";
import { formatNumber } from "@/lib/utils";

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
  waitReady?: boolean;
}

export function CountUp({ value, prefix = "", suffix = "", className, duration = 1.6, waitReady = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const { ready } = useApp();
  const inView = seen && (!waitReady || ready);
  const reduce = useReducedMotion();
  const { lang } = useT();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0, 0, 0.2, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(inView ? n : 0, lang)}
      {suffix}
    </span>
  );
}
