"use client";

import { useT } from "@/lib/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Parallax } from "@/components/ui/Parallax";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CountUp } from "@/components/ui/CountUp";
import { ThreadDivider } from "@/components/ui/ThreadDivider";
import { CtaBand } from "./CtaBand";
import type { ImageKey } from "@/data/images";
import { cn } from "@/lib/utils";

const PILLAR_IMAGES: ImageKey[] = ["water", "solar", "uniform"];

export function SustainabilityView() {
  const { t, raw } = useT();
  const pillars = raw<{ title: string; text: string; points: string[] }[]>("sustainability.pillars");
  const targets = raw<{ value: number; prefix: string; suffix: string; label: string }[]>("sustainability.targets");

  return (
    <>
      <PageHero index="00" label={t("sustainability.label")} title={t("sustainability.hero")} tone="sage" size="xl" />

      <section data-surface="light" className="linen-noise relative bg-cotton py-24 md:py-40">
        <div className="pad-x mx-auto max-w-[1800px] space-y-20 md:space-y-32">
          {pillars.map((p, i) => (
            <article key={p.title} className="grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
              <Parallax
                className={cn(
                  "rounded-[20px] md:col-span-5",
                  i === 0 ? "aspect-[4/3]" : i === 1 ? "aspect-[5/4] md:col-start-8 md:row-start-1" : "aspect-[3/4] md:col-start-2",
                )}
              >
                <SafeImage name={PILLAR_IMAGES[i]} sizes="(min-width: 768px) 40vw, 100vw" />
              </Parallax>
              <div className={cn("md:col-span-6", i === 1 ? "md:col-start-1 md:row-start-1" : "md:col-start-7")}>
                <p className="t-mono text-stone">0{i + 1} / 03</p>
                <RevealText as="h2" text={p.title} className="t-h2 mt-3" />
                <Reveal delay={0.1}>
                  <p className="t-lead mt-5 max-w-[34ch]">{p.text}</p>
                  <ul className="mt-6 border-t border-line">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-4 border-b border-line py-3.5">
                        <span aria-hidden className="mt-[0.7em] block h-[3px] w-5 shrink-0 bg-saffron" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section data-surface="dark" className="grain relative overflow-hidden bg-indigo py-24 text-cotton md:py-40">
        <div className="pad-x mx-auto max-w-[1800px]">
          <SectionLabel index="02" label={t("sustainability.targetsLabel")} className="text-cotton/75" />
          <RevealText text={t("sustainability.targetsTitle")} className="t-h2 mt-4" />

          <ul className="mt-16 grid gap-px overflow-hidden rounded-[20px] border border-line-dark bg-line-dark md:mt-24 md:grid-cols-3">
            {targets.map((tg, i) => (
              <li key={tg.label} className={cn("bg-indigo-2 p-8 md:p-10", i === 1 && "md:pt-16")}>
                <CountUp
                  value={tg.value}
                  prefix={tg.prefix}
                  suffix={tg.suffix}
                  className="block font-mono text-[clamp(3.5rem,7vw,7rem)] font-medium leading-none tracking-[-0.04em] text-saffron"
                />
                <p className="mt-5 max-w-[22ch] text-[17px] text-cotton/90">{tg.label}</p>
              </li>
            ))}
          </ul>
          <p className="t-mono mt-8 max-w-xl text-cotton/75">{t("sustainability.note")}</p>
        </div>
      </section>

      <div className="bg-saffron">
        <div className="pad-x mx-auto max-w-[1800px] pt-10">
          <ThreadDivider />
        </div>
      </div>
      <CtaBand />
    </>
  );
}
