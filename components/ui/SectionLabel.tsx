import { cn } from "@/lib/utils";

export function SectionLabel({
  index,
  label,
  className,
}: {
  index?: string;
  label: string;
  className?: string;
}) {
  return (
    <p className={cn("t-mono flex items-center gap-3 uppercase", className)}>
      {index && <span>[{index}]</span>}
      <span>{label}</span>
    </p>
  );
}
