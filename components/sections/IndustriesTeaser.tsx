"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/LanguageProvider";
import { INDUSTRIES } from "@/data/industries";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SafeImage } from "@/components/ui/SafeImage";
import { TLink } from "@/components/ui/TLink";
import { Reveal } from "@/components/ui/Reveal";

export function IndustriesTeaser() {
  const { t, raw } = useT();
  const items = raw<{ name: string }[]>("industries.items");
  const [active, setActive] = useState<number | null>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const raf = useRef(0);

  useEffect(() => {
    if (active === null) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    const move = (e: MouseEvent) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
    };
    const tick = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.15;
      p.y += (p.ty - p.y) * 0.15;
      if (floatRef.current) floatRef.current.style.transform = `translate3d(${p.x}px,${p.y}px,0)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", move);
    };
  }, [active]);

  return (
    <section data-surface="light" className="linen-noise relative bg-cotton py-24 md:py-40">
      <div className="pad-x mx-auto max-w-[1800px]">
        <div className="flex items-end justify-between gap-6">
          <div>
            <SectionLabel index="04" label={t("home.industries.label")} className="text-stone" />
            <RevealText text={t("home.industries.title")} className="t-h2 mt-4" />
          </div>
          <Reveal className="hidden md:block">
            <TLink href="/industries" className="t-mono inline-flex min-h-[44px] items-center border-b border-indigo uppercase">
              {t("home.industries.all")}
            </TLink>
          </Reveal>
        </div>

        <ul className="mt-14 border-t border-line md:mt-20" onMouseLeave={() => setActive(null)}>
          {INDUSTRIES.map((ind, i) => (
            <li key={ind.slug} className="border-b border-line">
              <TLink
                href={`/industries#${ind.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group/row flex min-h-[72px] items-center gap-4 py-5 md:gap-8 md:py-7"
              >
                <span className="t-mono w-8 shrink-0 text-stone md:w-12">0{i + 1}</span>
                <span className="font-display text-[clamp(1.9rem,5.2vw,5.5rem)] leading-[1] tracking-[-0.02em] transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/row:translate-x-3 group-hover/row:italic group-focus-visible/row:translate-x-3">
                  {items[i].name}
                </span>
                <span aria-hidden className="relative ml-auto h-14 w-14 shrink-0 overflow-hidden rounded-[10px] md:hidden">
                  <SafeImage name={ind.image} sizes="56px" />
                </span>
                <ArrowUpRight
                  aria-hidden
                  size={32}
                  className="ml-auto hidden shrink-0 -rotate-45 text-indigo transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/row:rotate-0 md:block"
                />
              </TLink>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={floatRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
        style={{ willChange: "transform" }}
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key="float"
              className="relative -ml-[150px] -mt-[190px] h-[380px] w-[300px] overflow-hidden rounded-[20px]"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  animate={{ clipPath: "inset(0% 0 0 0)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <SafeImage name={INDUSTRIES[active].image} sizes="300px" />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
