"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { TLink } from "./TLink";
import { cn } from "@/lib/utils";

type Variant = "saffron" | "indigo" | "outline-dark" | "outline-light";

const styles: Record<Variant, { base: string; fill: string }> = {
  saffron: { base: "bg-saffron text-indigo", fill: "bg-cotton" },
  indigo: { base: "bg-indigo text-cotton hover:text-indigo focus-visible:text-indigo", fill: "bg-cotton" },
  "outline-dark": {
    base: "border border-cotton/40 text-cotton hover:text-indigo focus-visible:text-indigo",
    fill: "bg-saffron",
  },
  "outline-light": {
    base: "border border-indigo/35 text-indigo hover:text-cotton focus-visible:text-cotton",
    fill: "bg-indigo",
  },
};

interface Props {
  children: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: Variant;
  className?: string;
  cursorLabel?: string;
  external?: boolean;
  ariaLabel?: string;
}

const RADIUS = 80;

export function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  disabled,
  variant = "saffron",
  className,
  cursorLabel,
  external,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const move = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx - 0, dy - 0) - Math.max(r.width, r.height) / 2;
      if (dist < RADIUS) {
        x.set(dx * 0.28);
        y.set(dy * 0.28);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  const s = styles[variant];
  const inner = (
    <>
      <span aria-hidden className={cn("btn-fill", s.fill)} />
      <span className="relative block h-[1.4em] overflow-hidden text-[15px] font-semibold leading-[1.4]">
        <span className="btn-roll">{children}</span>
        <span aria-hidden className="btn-roll absolute left-0 top-full whitespace-nowrap">
          {children}
        </span>
      </span>
    </>
  );
  const cls = cn(
    "btn relative inline-flex min-h-[48px] items-center justify-center overflow-hidden rounded-[12px] px-7 py-3.5 transition-colors duration-500 disabled:cursor-not-allowed disabled:opacity-60",
    s.base,
    className,
  );

  return (
    <motion.span ref={ref} style={{ x: sx, y: sy }} className="inline-block">
      {href ? (
        external || !href.startsWith("/") ? (
          <a href={href} className={cls} data-cursor={cursorLabel} aria-label={ariaLabel}>
            {inner}
          </a>
        ) : (
          <TLink href={href} className={cls} data-cursor={cursorLabel} aria-label={ariaLabel}>
            {inner}
          </TLink>
        )
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={cls} data-cursor={cursorLabel} aria-label={ariaLabel}>
          {inner}
        </button>
      )}
    </motion.span>
  );
}
