"use client";

import { useEffect, useRef, useState } from "react";

/** Saffron dot that eases after the pointer, grows to a ring or a labelled bubble on interactive elements. */
export function CustomCursor() {
  const wrap = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"dot" | "ring" | "label">("dot");
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      if (wrap.current) wrap.current.style.transform = `translate3d(${pos.x}px,${pos.y}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const move = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const labelled = el?.closest<HTMLElement>("[data-cursor]");
      if (labelled?.dataset.cursor) {
        setLabel(labelled.dataset.cursor);
        setMode("label");
        return;
      }
      if (el?.closest("a, button, [role='button'], input, select, textarea, summary, label")) {
        setMode("ring");
        return;
      }
      setMode("dot");
    };
    const leave = () => setMode("dot");

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={wrap}
      aria-hidden
      className="cursor-layer pointer-events-none fixed left-0 top-0 z-[120]"
      style={{ willChange: "transform" }}
    >
      <span
        className="absolute left-0 top-0 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translate(-50%,-50%) scale(${mode === "dot" ? 1 : 0})` }}
      />
      <span
        className="absolute left-0 top-0 block h-12 w-12 rounded-full border-[1.5px] border-saffron transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translate(-50%,-50%) scale(${mode === "ring" ? 1 : 0})` }}
      />
      <span
        className="t-mono absolute left-0 top-0 flex h-[84px] w-[84px] items-center justify-center rounded-full bg-saffron font-medium uppercase text-indigo transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translate(-50%,-50%) scale(${mode === "label" ? 1 : 0})` }}
      >
        {label}
      </span>
    </div>
  );
}
