"use client";

import { useT, type Lang } from "@/lib/LanguageProvider";
import { cn } from "@/lib/utils";

export function LanguageToggle({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const { lang, setLang, t } = useT();
  const items: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "id", label: "ID" },
  ];
  const dark = tone === "dark";

  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      className={cn(
        "relative inline-flex rounded-full border p-0.5",
        dark ? "border-cotton/30" : "border-indigo/25",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute left-0.5 top-0.5 h-[calc(100%-4px)] w-[calc(50%-2px)] rounded-full bg-saffron transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: lang === "id" ? "translateX(100%)" : "translateX(0)" }}
      />
      {items.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLang(item.code)}
          aria-pressed={lang === item.code}
          aria-label={item.code === "en" ? "EN (English)" : "ID (Bahasa Indonesia)"}
          lang={item.code}
          className={cn(
            "t-mono relative z-10 flex h-9 min-w-11 items-center justify-center rounded-full px-3 font-medium transition-colors duration-300",
            lang === item.code ? "text-indigo" : dark ? "text-cotton" : "text-indigo",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
