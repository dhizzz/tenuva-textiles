"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useT } from "@/lib/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Parallax } from "@/components/ui/Parallax";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaBand } from "./CtaBand";
import type { ImageKey } from "@/data/images";
import { cn, EASE } from "@/lib/utils";

const BLOCK_IMAGES: ImageKey[] = ["spools", "loom", "swatchBook", "designer"];

function FiberJourney() {
  const { t, raw } = useT();
  const stages = raw<{ name: string; text: string }[]>("capabilities.stages");
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.55", "end 0.55"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(stages.length - 1, Math.max(0, Math.round(p * (stages.length - 1))));
    setCurrent(idx);
  });

  return (
    <section data-surface="dark" className="grain relative bg-indigo py-24 text-cotton md:py-40">
      <div className="pad-x mx-auto max-w-[1800px]">
        <SectionLabel index="02" label={t("capabilities.journeyLabel")} className="text-cotton/75" />
        <RevealText text={t("capabilities.journeyTitle")} className="t-h2 mt-4" />

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-40" aria-hidden>
              <p className="t-mono text-cotton/70">
                0{current + 1} / 0{stages.length}
              </p>
              <div className="relative mt-4 h-[clamp(7rem,12vw,11rem)] overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={current}
                    className="t-h1 absolute inset-0 italic text-saffron"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
                  >
                    {stages[current].name}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <ol ref={ref} className="relative lg:col-span-6 lg:col-start-7">
            <span aria-hidden className="absolute left-[9px] top-3 h-[calc(100%-1.5rem)] w-px bg-line-dark" />
            <motion.span
              aria-hidden
              className="absolute left-[8px] top-3 h-[calc(100%-1.5rem)] w-[3px] origin-top bg-saffron"
              style={{ scaleY: reduce ? 1 : smooth }}
            />
            {stages.map((s, i) => {
              const lit = i <= current;
              return (
                <li key={s.name} className="relative min-h-[34svh] pl-12 lg:min-h-[44svh]">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-1.5 block h-5 w-5 rounded-full border-2 transition-colors duration-500",
                      lit ? "border-saffron bg-saffron" : "border-line-dark bg-indigo",
                    )}
                  />
                  <p className="t-mono text-cotton/70">0{i + 1}</p>
                  <h3 className={cn("t-h3 mt-2 transition-colors duration-500", lit ? "text-cotton" : "text-cotton/60")}>{s.name}</h3>
                  <p className="mt-3 max-w-[34ch] text-cotton/85">{s.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function CapabilitiesView() {
  const { t, raw } = useT();
  const blocks = raw<{ title: string; text: string; points: string[] }[]>("capabilities.blocks");

  return (
    <>
      <PageHero index="00" label={t("capabilities.label")} title={t("capabilities.hero")} tone="dark" size="xl" />

      <section data-surface="light" className="linen-noise relative bg-cotton py-24 md:py-40">
        <div className="pad-x mx-auto max-w-[1800px] space-y-24 md:space-y-40">
          {blocks.map((b, i) => (
            <article key={b.title} className="grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
              <Parallax className={cn("aspect-[5/4] rounded-[20px] md:col-span-6", i % 2 === 1 && "md:order-2")}>
                <SafeImage name={BLOCK_IMAGES[i]} sizes="(min-width: 768px) 50vw, 100vw" />
              </Parallax>
              <div className={cn("md:col-span-5", i % 2 === 1 ? "md:col-start-1 md:row-start-1" : "md:col-start-8")}>
                <p className="font-mono text-[clamp(3.5rem,6vw,6rem)] font-medium leading-none tracking-[-0.04em]">0{i + 1}</p>
                <span aria-hidden className="mt-3 block h-[3px] w-14 bg-saffron" />
                <RevealText as="h2" text={b.title} className="t-h2 mt-6 !text-[clamp(2.2rem,4.6vw,4.4rem)]" />
                <Reveal delay={0.1}>
                  <p className="t-lead mt-5 max-w-[40ch] text-indigo/90">{b.text}</p>
                  <ul className="mt-6 border-t border-line">
                    {b.points.map((p) => (
                      <li key={p} className="t-mono-lg border-b border-line py-3">
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FiberJourney />

      <section data-surface="light" className="linen-noise relative bg-linen py-24 md:py-40">
        <div className="pad-x mx-auto grid max-w-[1800px] gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <SectionLabel index="03" label={t("capabilities.logisticsLabel")} className="text-indigo/80" />
            <RevealText text={t("capabilities.logisticsTitle")} className="t-h2 mt-4" />
            <Reveal delay={0.1}>
              <p className="t-lead mt-8 max-w-[40ch] text-indigo/90">{t("capabilities.logistics")}</p>
            </Reveal>
          </div>
          <Parallax className="aspect-[4/3] rounded-[20px] md:col-span-4 md:col-start-7">
            <SafeImage name="port" sizes="(min-width: 768px) 33vw, 100vw" />
          </Parallax>
          <Parallax className="aspect-[3/4] rounded-[20px] max-md:hidden md:col-span-2 md:mb-16">
            <SafeImage name="truck" sizes="16vw" />
          </Parallax>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
