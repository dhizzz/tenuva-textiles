"use client";

import { useT } from "@/lib/LanguageProvider";
import { CATEGORIES } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { t } = useT();
  return (
    <div role="group" aria-label={t("products.filterLabel")} className="flex flex-wrap gap-2">
      {CATEGORIES.map((c) => {
        const active = value === c;
        return (
          <button
            key={c}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(c)}
            className={cn(
              "t-mono min-h-[44px] rounded-[10px] border px-4 font-medium uppercase transition-colors duration-300",
              active
                ? "border-indigo bg-indigo text-cotton"
                : "border-indigo/30 text-indigo hover:border-saffron hover:bg-saffron/25",
            )}
          >
            {t(`categories.${c}`)}
          </button>
        );
      })}
    </div>
  );
}
