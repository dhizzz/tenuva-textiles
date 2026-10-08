"use client";

import { useRef } from "react";
import { useT } from "@/lib/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Parallax } from "@/components/ui/Parallax";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CountUp } from "@/components/ui/CountUp";
import { CtaBand } from "./CtaBand";
import { cn } from "@/lib/utils";

const MONOGRAMS = [
  { bg: "bg-indigo", fg: "text-cotton", accent: "#E8A33D", line: "#323C75" },
  { bg: "bg-saffron", fg: "text-indigo", accent: "#17204D", line: "#17204D" },
  { bg: "bg-sage", fg: "text-indigo", accent: "#17204D", line: "#17204D" },
];

function initials(name: string) {
  const parts = name.replace(/^(Ir\.|Dr\.)\s*/, "").split(" ");
  return parts[0][0] + parts[parts.length - 1][0];
}

function Monogram({ name, i }: { name: string; i: number }) {
  const m = MONOGRAMS[i % MONOGRAMS.length];
  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden rounded-[20px]", m.bg, m.fg)} role="img" aria-label={name}>
      <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {Array.from({ length: 9 }).map((_, k) => (
          <line key={`v${k}`} x1={12 + k * 22} y1={0} x2={12 + k * 22} y2={250} stroke={m.line} strokeOpacity={0.5} strokeWidth={3} />
        ))}
        {Array.from({ length: 11 }).map((_, k) => (
          <line
            key={`h${k}`}
            x1={0}
            y1={12 + k * 24}
            x2={200}
            y2={12 + k * 24}
            stroke={m.accent}
            strokeOpacity={0.55}
            strokeWidth={5}
            strokeDasharray={`${34 + (k % 3) * 12} ${22 + ((k + i) % 3) * 10}`}
            strokeDashoffset={k * 14}
          />
        ))}
      </svg>
      <span className="absolute bottom-4 left-5 font-display text-[clamp(4.5rem,9vw,7.5rem)] italic leading-none tracking-[-0.03em]">
        {initials(name)}
      </span>
    </div>
  );
}

function Timeline() {
  const { raw, t } = useT();
  const items = raw<{ year: string; text: string }[]>("about.timeline");
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0 });

  return (
    <section data-surface="dark" className="grain relative overflow-hidden bg-indigo py-24 text-cotton md:py-40">
      <div className="pad-x mx-auto max-w-[1800px]">
        <SectionLabel index="02" label={t("about.timelineLabel")} className="text-cotton/75" />
        <RevealText text={t("about.timelineTitle")} className="t-h2 mt-4" />
      </div>
      <div
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label={t("about.timelineLabel")}
        data-cursor={t("common.drag")}
        data-lenis-prevent-wheel
        className="no-scrollbar mt-16 cursor-grab overflow-x-auto px-[var(--pad)] pb-6 active:cursor-grabbing"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !ref.current) return;
          drag.current = { down: true, x: e.clientX, left: ref.current.scrollLeft };
          ref.current.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current.down || !ref.current) return;
          ref.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
        }}
        onPointerUp={() => (drag.current.down = false)}
        onPointerCancel={() => (drag.current.down = false)}
      >
        <ol className="relative flex w-max gap-6 pt-10">
          <span aria-hidden className="absolute left-0 top-[7px] h-px w-full bg-line-dark" />
          {items.map((it, i) => (
            <li key={it.year} className="relative w-[min(78vw,340px)] shrink-0 select-none pr-6">
              <span aria-hidden className="absolute left-0 top-[-33px] block h-4 w-4 rounded-full border-2 border-saffron bg-indigo" />
              <p className="font-display text-[clamp(3.5rem,7vw,6.5rem)] italic leading-none tracking-[-0.03em] text-saffron">{it.year}</p>
              <p className="mt-5 max-w-[26ch] text-[17px] text-cotton/90">{it.text}</p>
              <p className="t-mono mt-4 text-cotton/60">0{i + 1} / 0{items.length}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AboutView() {
  const { t, raw } = useT();
  const values = raw<{ title: string; text: string }[]>("about.values");
  const leaders = raw<{ name: string; role: string }[]>("about.leaders");
  const numbers = raw<{ value: number; suffix: string; label: string }[]>("about.numbers");

  return (
    <>
      <PageHero index="00" label={t("about.label")} title={t("about.hero")} tone="dark" size="xl" />

      <section data-surface="dark" className="relative bg-indigo pb-0">
        <Parallax className="aspect-[16/8] w-full md:aspect-[16/6]">
          <SafeImage name="loom" priority sizes="100vw" />
        </Parallax>
      </section>

      <section data-surface="light" className="linen-noise relative bg-cotton py-24 md:py-40">
        <div className="pad-x mx-auto grid max-w-[1800px] gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel index="01" label={t("about.storyLabel")} className="text-stone" />
            <p className="mt-6 font-display text-[clamp(5rem,12vw,11rem)] italic leading-[0.85] tracking-[-0.04em]">2006</p>
          </div>
          <Reveal className="md:col-span-7 md:col-start-6">
            <p className="font-display text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.25] tracking-[-0.01em]">{t("about.story")}</p>
          </Reveal>
        </div>
      </section>

      <Timeline />

      <section data-surface="light" className="linen-noise relative bg-cotton py-24 md:py-40">
        <div className="pad-x mx-auto max-w-[1800px]">
          <SectionLabel index="03" label={t("about.valuesLabel")} className="text-stone" />
          <RevealText text={t("about.valuesTitle")} className="t-h2 mt-4" />
          <div className="mt-16 grid gap-x-10 gap-y-14 md:mt-24 md:grid-cols-12">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={(i % 2) * 0.1}
                className={cn(
                  "border-t border-indigo pt-6",
                  i === 0 && "md:col-span-6",
                  i === 1 && "md:col-span-5 md:col-start-8 md:mt-20",
                  i === 2 && "md:col-span-5",
                  i === 3 && "md:col-span-6 md:col-start-7 md:mt-20",
                )}
              >
                <p className="t-mono text-stone">0{i + 1}</p>
                <h3 className="t-h3 mt-3">{v.title}</h3>
                <p className="mt-4 max-w-[38ch] text-indigo/85">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-surface="light" className="linen-noise relative bg-linen py-24 md:py-40">
        <div className="pad-x mx-auto max-w-[1800px]">
          <SectionLabel index="04" label={t("about.leadershipLabel")} className="text-indigo/80" />
          <RevealText text={t("about.leadershipTitle")} className="t-h2 mt-4" />
          <ul className="mt-16 grid gap-8 md:grid-cols-3">
            {leaders.map((l, i) => (
              <Reveal as="li" key={l.name} delay={i * 0.1} className={i === 1 ? "md:mt-16" : i === 2 ? "md:mt-8" : ""}>
                <Monogram name={l.name} i={i} />
                <h3 className="t-h4 mt-5">{l.name}</h3>
                <p className="t-mono mt-1 text-indigo/80">{l.role}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section data-surface="dark" className="grain relative overflow-hidden bg-indigo py-20 text-cotton md:py-32">
        <div className="pad-x mx-auto max-w-[1800px]">
          <dl className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
            {numbers.map((n, i) => (
              <div key={n.label} className={cn("pr-4", i > 0 && "md:border-l md:border-line-dark md:pl-8", i % 2 === 1 && "max-md:pl-6")}>
                <dd>
                  <CountUp
                    value={n.value}
                    suffix={n.suffix}
                    className="block font-mono text-[clamp(2.4rem,5vw,4.75rem)] font-medium leading-none tabular-nums"
                  />
                </dd>
                <dt className="t-mono mt-3 text-cotton/75">{n.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
