import { WeaveMark } from "./WeaveMark";
import { cn } from "@/lib/utils";

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <WeaveMark className="h-9 w-9 shrink-0 md:h-10 md:w-10" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[26px] font-semibold tracking-[-0.02em] md:text-[28px]",
            light ? "text-cotton" : "text-indigo",
          )}
        >
          Tenuva
        </span>
        <span
          className={cn(
            "mt-1 font-mono text-[8.5px] font-medium tracking-[0.5em] md:text-[9px]",
            light ? "text-sage" : "text-stone",
          )}
        >
          TEXTILES
        </span>
      </span>
    </span>
  );
}
