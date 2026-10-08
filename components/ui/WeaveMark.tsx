import { cn } from "@/lib/utils";

/** The Tenuva "Warp and Weft" mark: four indigo warp threads, saffron weft passing over on alternating cells. */
export function WeaveMark({ className, title }: { className?: string; title?: string }) {
  const weft: [number, number][] = [
    [4, 10],
    [48, 10],
    [26, 32],
    [70, 32],
    [4, 54],
    [48, 54],
    [26, 76],
    [70, 76],
  ];
  return (
    <svg
      viewBox="0 0 96 96"
      className={cn("block", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <rect x="2" y="2" width="92" height="92" rx="14" fill="#F3EEE4" />
      {[10, 32, 54, 76].map((x) => (
        <rect key={x} x={x} y="2" width="14" height="92" fill="#17204D" />
      ))}
      <g stroke="#F3EEE4" strokeWidth="2.5" fill="#E8A33D">
        {weft.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="26" height="14" />
        ))}
      </g>
      <rect x="2" y="2" width="92" height="92" rx="14" fill="none" stroke="#17204D" strokeWidth="4" />
    </svg>
  );
}
