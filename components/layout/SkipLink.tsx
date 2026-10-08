"use client";

import { useT } from "@/lib/LanguageProvider";

export function SkipLink() {
  const { t } = useT();
  return (
    <a
      href="#main"
      className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-[10px] bg-saffron px-4 py-3 font-semibold text-indigo focus:translate-y-0"
    >
      {t("common.skipToContent")}
    </a>
  );
}
