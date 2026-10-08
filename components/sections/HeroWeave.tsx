"use client";

import { useEffect, useRef, useState } from "react";

const W = 1600;
const H = 900;
const WARP_SOLID = "#434A6B"; // cotton at 20% over indigo, flattened so "over" cells can hide the weft

/**
 * Warp threads stay still. Saffron weft threads sweep across, passing over some warps and under others.
 * "Under" is faked by redrawing the warp on top of the weft at alternating cells.
 */
export function HeroWeave() {
  const [dense, setDense] = useState(true);
  const weftRefs = useRef<(SVGLineElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  const cols = dense ? 34 : 16;
  const rows = dense ? 18 : 10;
  const xs = Array.from({ length: cols }, (_, i) => ((i + 0.5) * W) / cols);
  const ys = Array.from({ length: rows }, (_, j) => ((j + 0.5) * H) / rows);

  useEffect(() => {
    setDense(window.innerWidth >= 768);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = weftRefs.current;
    const place = (phase: number) => {
      lines.forEach((el, j) => {
        if (!el) return;
        const dir = j % 2 === 0 ? 1 : -1;
        const offset = ((phase - j * 9) % 100 + 100) % 100;
        el.setAttribute("stroke-dashoffset", String(-dir * offset));
      });
    };

    if (reduce) {
      place(34);
      return;
    }

    let phase = 0;
    let speed = 1;
    let target = 1;
    let last = performance.now();
    let raf = 0;
    let visible = true;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      speed += (target - speed) * 0.06;
      phase = (phase + dt * 12.5 * speed) % 10000; // 100 units per 8s at speed 1
      place(phase);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: MouseEvent) => {
      target = 0.55 + (e.clientX / window.innerWidth) * 1.0;
    };
    const onVis = () => (document.hidden ? stop() : start());
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });
    if (svgRef.current) io.observe(svgRef.current);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    start();
    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [cols, rows]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false"
    >
      {xs.map((x) => (
        <line key={`w${x}`} x1={x} y1={0} x2={x} y2={H} stroke="#F3EEE4" strokeOpacity={0.2} strokeWidth={3} />
      ))}
      {ys.map((y, j) => (
        <g key={`f${y}`}>
          <line x1={0} y1={y} x2={W} y2={y} stroke="#F3EEE4" strokeOpacity={0.07} strokeWidth={3} />
          <line
            ref={(el) => {
              weftRefs.current[j] = el;
            }}
            x1={0}
            y1={y}
            x2={W}
            y2={y}
            pathLength={100}
            stroke="#E8A33D"
            strokeOpacity={0.6}
            strokeWidth={5}
            strokeDasharray="24 76"
          />
        </g>
      ))}
      {xs.map((x, i) =>
        ys.map((y, j) =>
          (i + j) % 2 === 0 ? (
            <line key={`o${i}-${j}`} x1={x} y1={y - 5} x2={x} y2={y + 5} stroke={WARP_SOLID} strokeWidth={3} />
          ) : null,
        ),
      )}
    </svg>
  );
}
