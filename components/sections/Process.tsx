"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useT } from "@/lib/LanguageProvider";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EASE } from "@/lib/utils";

export function Process() {
  const { t, raw } = useT();
  const steps = raw<{ title: string; text: string }[]>("home.process.steps");
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const on = inView || reduce;

  return (
    <section data-surface="dark" className="grain relative overflow-hidden bg-indigo py-24 text-cotton md:py-40">
      <div className="pad-x mx-auto max-w-[1800px]">
        <SectionLabel index="05" label={t("home.process.label")} className="text-cotton/75" />
        <RevealText text={t("home.process.title")} className="t-h2 mt-4" />

        <ol ref={ref} className="relative mt-16 grid gap-12 md:mt-24 md:grid-cols-5 md:gap-8">
          <motion.span
            aria-hidden
            className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-[2px] origin-top bg-saffron md:hidden"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: on ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 1.6, ease: EASE }}
          />
          <span aria-hidden className="absolute left-0 top-[7px] hidden h-px w-full bg-line-dark md:block" />
          <motion.span
            aria-hidden
            className="absolute left-0 top-[6px] hidden h-[2px] w-full origin-left bg-saffron md:block"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: on ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 2, ease: EASE }}
          />
          {steps.map((s, i) => (
            <li key={s.title} className="relative pl-9 md:pl-0 md:pt-12">
              <motion.span
                aria-hidden
                className="absolute left-0 top-1 block h-4 w-4 rounded-full border-2 border-saffron bg-indigo md:top-0"
                initial={{ scale: 0 }}
                animate={{ scale: on ? 1 : 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: reduce ? 0 : 0.25 + i * 0.35 }}
              />
              <p className="t-mono text-cotton/70">0{i + 1}</p>
              <h3 className="t-h4 mt-2">{s.title}</h3>
              <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed text-cotton/85">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
