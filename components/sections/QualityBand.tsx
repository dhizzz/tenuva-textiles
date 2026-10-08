"use client";

import { useT } from "@/lib/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function QualityBand() {
  const { t, raw } = useT();
  const badges = raw<string[]>("home.quality.badges");

  return (
    <section data-surface="light" className="relative bg-linen py-16 md:py-24">
      <div className="pad-x mx-auto grid max-w-[1800px] gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-4">
          <SectionLabel index="06" label={t("home.quality.label")} className="text-indigo/80" />
          <h2 className="t-h3 mt-3">{t("home.quality.title")}</h2>
        </div>
        <Reveal className="md:col-span-8">
          <ul className="flex flex-wrap gap-3">
            {badges.map((b) => (
              <li
                key={b}
                className="t-mono rounded-[8px] border border-indigo/40 bg-cotton px-4 py-3 font-medium uppercase"
              >
                {b}
              </li>
            ))}
          </ul>
          <p className="t-mono mt-5 text-indigo/80">{t("home.quality.note")}</p>
        </Reveal>
      </div>
    </section>
  );
}
