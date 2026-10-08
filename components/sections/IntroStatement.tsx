"use client";

import { useRef } from "react";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useT } from "@/lib/LanguageProvider";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const color = useTransform(progress, range, ["rgba(107,107,114,0.3)", "#17204D"]);
  return (
    <motion.span style={{ color }} className="mr-[0.26em] inline-block">
      {word}
    </motion.span>
  );
}

export function IntroStatement() {
  const { t } = useT();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const text = t("home.intro");
  const words = text.split(" ");

  return (
    <section data-surface="light" className="linen-noise relative bg-cotton py-28 md:py-44">
      <div className="pad-x mx-auto max-w-[1800px]">
        <div ref={ref}>
          <p className="t-h2 max-w-[18ch] sm:max-w-[22ch] md:max-w-[26ch] lg:max-w-[30ch]" aria-label={text}>
            {words.map((w, i) =>
              reduce ? (
                <span key={i} className="mr-[0.26em] inline-block text-indigo">
                  {w}
                </span>
              ) : (
                <Word key={`${w}-${i}`} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1.6) / words.length > 1 ? 1 : (i + 1.6) / words.length]} />
              ),
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
