"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useT } from "@/lib/LanguageProvider";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SafeImage } from "@/components/ui/SafeImage";
import { TLink } from "@/components/ui/TLink";
import type { ImageKey } from "@/data/images";

const CARDS: { category: string; image: ImageKey }[] = [
  { category: "yarn", image: "yarnCones" },
  { category: "woven", image: "linen" },
  { category: "knit", image: "knitBeige" },
  { category: "denim", image: "denimIndigo" },
  { category: "technical", image: "technical" },
];

export function HorizontalProducts() {
  const { t, raw } = useT();
  const items = raw<{ name: string; line: string }[]>("home.make.items");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
    });
    return () => mm.revert();
  }, [items.length]);

  return (
    // GSAP wraps the pinned element in a pin-spacer. Keeping a React-owned div outside it lets React unmount cleanly.
    <div>
    <section
      ref={sectionRef}
      data-surface="dark"
      className="grain relative overflow-hidden bg-indigo py-20 text-cotton md:flex md:h-svh md:flex-col md:justify-center md:py-0"
    >
      <div className="pad-x mx-auto w-full max-w-[1800px] md:pt-24">
        <SectionLabel index="01" label={t("home.make.label")} className="text-cotton/75" />
        <RevealText text={t("home.make.title")} className="t-h2 mt-4" />
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-10 flex gap-5 overflow-x-auto px-[var(--pad)] pb-4 max-md:snap-x max-md:snap-mandatory md:w-max md:overflow-visible md:pb-0 md:pr-[20vw]"
      >
        {CARDS.map((c, i) => {
          const item = items[i];
          return (
            <TLink
              key={c.category}
              href={`/products?category=${c.category}`}
              data-cursor={t("common.view")}
              className="duotone-hover group/card relative flex h-[min(62vh,520px)] w-[82vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[20px] border border-line-dark bg-indigo-2 p-6 max-md:h-[460px] sm:w-[60vw] md:h-[min(58vh,560px)] md:w-[clamp(340px,34vw,560px)]"
            >
              <SafeImage
                name={c.image}
                sizes="(min-width: 768px) 34vw, 82vw"
                className="!opacity-45 transition-opacity duration-500 group-hover/card:!opacity-65"
                imgClassName="transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.06]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-indigo via-indigo/55 to-indigo/10" />
              <span className="t-mono relative z-10 text-cotton/80">0{i + 1} / 05</span>
              <div className="relative z-10">
                <h3 className="t-h3 max-w-[14ch]">{item.name}</h3>
                <p className="mt-3 max-w-[34ch] text-[15px] leading-snug text-cotton/85">{item.line}</p>
                <span className="mt-5 inline-flex min-h-[44px] items-center gap-2 border-b border-saffron pb-0.5 text-[15px] font-semibold text-saffron">
                  {t("common.viewRange")}
                  <ArrowUpRight
                    size={18}
                    aria-hidden
                    className="-rotate-45 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:rotate-0"
                  />
                </span>
              </div>
            </TLink>
          );
        })}
      </div>

      <div className="pad-x mx-auto mt-8 hidden w-full max-w-[1800px] md:block">
        <div className="h-px w-full bg-line-dark">
          <span ref={barRef} className="block h-px origin-left scale-x-0 bg-saffron" />
        </div>
      </div>
    </section>
    </div>
  );
}
