"use client";

import { Marquee } from "@/components/ui/Marquee";
import { useT } from "@/lib/LanguageProvider";

export function BandMarquee() {
  const { raw, t } = useT();
  const items = raw<string[]>("home.marquee");
  return (
    <section data-surface="light" aria-label={t("nav.products")} className="bg-saffron py-5 text-indigo md:py-6">
      <Marquee items={items} duration={45} itemClassName="font-display text-[clamp(1.6rem,3vw,2.6rem)] leading-none italic" />
    </section>
  );
}
