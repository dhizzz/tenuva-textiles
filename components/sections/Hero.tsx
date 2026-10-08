"use client";

import { HeroWeave } from "./HeroWeave";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CountUp } from "@/components/ui/CountUp";
import { useT } from "@/lib/LanguageProvider";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export function Hero() {
  const { t, raw } = useT();
  const stats = raw<Stat[]>("home.hero.stats");

  return (
    <section
      data-surface="dark"
      className="grain relative flex min-h-svh flex-col justify-between overflow-hidden bg-indigo text-cotton"
    >
      <HeroWeave />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-2/5 bg-gradient-to-t from-indigo via-indigo/70 to-transparent" />

      <div className="pad-x relative z-10 mx-auto w-full max-w-[1800px] pt-[148px] md:pt-[170px]">
        <Reveal waitReady>
          <p className="t-mono uppercase text-cotton/80">{t("home.hero.label")}</p>
        </Reveal>
        <RevealText as="h1" text={t("home.hero.title")} className="t-hero mt-6" waitReady delay={0.1} />
      </div>

      <div className="pad-x relative z-10 mx-auto w-full max-w-[1800px] pb-8 pt-12">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <Reveal waitReady delay={0.5} className="md:col-span-6 lg:col-span-5">
            <p className="t-lead max-w-xl text-cotton/90">{t("home.hero.sub")}</p>
          </Reveal>
          <Reveal waitReady delay={0.6} className="flex flex-wrap gap-3 md:col-span-6 md:justify-end lg:col-span-7">
            <MagneticButton href="/contact?tab=quote" variant="saffron">
              {t("common.requestQuote")}
            </MagneticButton>
            <MagneticButton href="/products" variant="outline-dark">
              {t("common.exploreFabrics")}
            </MagneticButton>
          </Reveal>
        </div>

        <dl className="mt-12 grid grid-cols-2 border-t border-line-dark md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-5 pr-4 md:py-7 ${i > 0 ? "md:border-l md:border-line-dark md:pl-6" : ""} ${i % 2 === 1 ? "pl-4 max-md:border-l max-md:border-line-dark" : ""} ${i >= 2 ? "max-md:border-t max-md:border-line-dark" : ""}`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <CountUp
                  value={s.value}
                  suffix={s.suffix}
                  waitReady
                  className="block font-mono text-[clamp(2rem,4.2vw,3.75rem)] font-medium leading-none tabular-nums text-cotton"
                />
                <span className="t-mono mt-2 block text-cotton/75">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
