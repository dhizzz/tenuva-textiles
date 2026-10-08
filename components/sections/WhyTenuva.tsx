"use client";

import { useT } from "@/lib/LanguageProvider";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ThreadDivider } from "@/components/ui/ThreadDivider";

export function WhyTenuva() {
  const { t, raw } = useT();
  const items = raw<{ title: string; text: string }[]>("home.why.items");
  const offsets = ["", "md:mt-24", "md:mt-12"];

  return (
    <section data-surface="light" className="linen-noise relative bg-cotton py-24 md:py-40">
      <div className="pad-x mx-auto max-w-[1800px]">
        <SectionLabel index="02" label={t("home.why.label")} className="text-stone" />
        <RevealText text={t("home.why.title")} className="t-h2 mt-4 max-w-[16ch]" />

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-3 md:gap-10">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.1} className={offsets[i]}>
              <p className="font-mono text-[clamp(4rem,8vw,8rem)] font-medium leading-none tracking-[-0.04em] text-indigo">
                0{i + 1}
              </p>
              <span aria-hidden className="mt-4 block h-[3px] w-14 bg-saffron" />
              <h3 className="t-h3 mt-6">{it.title}</h3>
              <p className="mt-4 max-w-[34ch] text-indigo/85">{it.text}</p>
            </Reveal>
          ))}
        </div>
        <ThreadDivider className="mt-24 md:mt-36" />
      </div>
    </section>
  );
}
