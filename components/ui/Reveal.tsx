"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useApp } from "@/lib/AppProvider";
import { EASE } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "p" | "li" | "section" | "span";
  waitReady?: boolean;
}

/** Body reveal: fade up 24px, once, at 85% viewport. */
export function Reveal({ children, className, delay = 0, y = 24, as = "div", waitReady = false }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const { ready } = useApp();
  const go = inView && (!waitReady || ready);
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      ref={ref as never}
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      animate={go ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: reduce ? 0.3 : 0.7, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}
