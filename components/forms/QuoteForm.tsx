"use client";

import { useRef, useState } from "react";
import { useT } from "@/lib/LanguageProvider";
import { InquiryForm } from "./InquiryForm";
import type { InquiryType } from "./schema";
import { cn } from "@/lib/utils";

const TABS: InquiryType[] = ["quote", "swatches", "partner"];

export function QuoteForm({ initialTab = "quote", product }: { initialTab?: InquiryType; product?: string }) {
  const { t } = useT();
  const [tab, setTab] = useState<InquiryType>(initialTab);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    else return;
    e.preventDefault();
    setTab(TABS[next]);
    refs.current[TABS[next]]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={t("contact.tabsLabel")} className="flex flex-wrap gap-x-1 gap-y-1 border-b border-line">
        {TABS.map((id, i) => {
          const active = tab === id;
          return (
            <button
              key={id}
              ref={(el) => {
                refs.current[id] = el;
              }}
              role="tab"
              id={`tab-${id}`}
              aria-selected={active}
              aria-controls={`panel-${id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setTab(id)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "relative min-h-[48px] px-4 text-[15px] font-semibold transition-colors md:px-5",
                active ? "text-indigo" : "text-indigo/75 hover:text-indigo",
              )}
            >
              {t(`contact.tabs.${id}`)}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 -bottom-px h-[3px] origin-left bg-saffron transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  active ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="pt-8">
        <InquiryForm key={tab} type={tab} defaultProduct={tab === "partner" ? undefined : product} />
      </div>
    </div>
  );
}
