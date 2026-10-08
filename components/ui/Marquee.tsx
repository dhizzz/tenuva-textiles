import { Fragment } from "react";
import { WeaveMark } from "./WeaveMark";
import { cn } from "@/lib/utils";

interface Props {
  items: string[];
  className?: string;
  itemClassName?: string;
  duration?: number;
  separator?: "mark" | "dot";
}

export function Marquee({ items, className, itemClassName, duration = 40, separator = "mark" }: Props) {
  const run = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <Fragment key={`${item}-${i}`}>
          <li className={cn("whitespace-nowrap px-6", itemClassName)}>{item}</li>
          <li aria-hidden className="flex items-center">
            {separator === "mark" ? (
              <WeaveMark className="h-5 w-5" />
            ) : (
              <span className="block h-1.5 w-1.5 rounded-full bg-current opacity-60" />
            )}
          </li>
        </Fragment>
      ))}
    </ul>
  );
  return (
    <div className={cn("marquee overflow-hidden", className)}>
      <div className="marquee-track" style={{ ["--marquee-dur" as string]: `${duration}s` }}>
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
