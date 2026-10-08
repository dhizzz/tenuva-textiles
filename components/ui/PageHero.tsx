"use client";

import { RevealText } from "./RevealText";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { cn } from "@/lib/utils";

type Tone = "dark" | "light" | "sage" | "linen";

const tones: Record<Tone, { bg: string; text: string; surface: "dark" | "light"; muted: string; extra: string }> = {
  dark: { bg: "bg-indigo", text: "text-cotton", surface: "dark", muted: "text-cotton/75", extra: "grain" },
  light: { bg: "bg-cotton", text: "text-indigo", surface: "light", muted: "text-stone", extra: "linen-noise" },
  sage: { bg: "bg-sage", text: "text-indigo", surface: "light", muted: "text-indigo/80", extra: "linen-noise" },
  linen: { bg: "bg-linen", text: "text-indigo", surface: "light", muted: "text-stone", extra: "linen-noise" },
};

interface Props {
  label: string;
  index?: string;
  title: string;
  sub?: string;
  tone?: Tone;
  size?: "xl" | "lg";
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({ label, index = "00", title, sub, tone = "light", size = "lg", children, className }: Props) {
  const c = tones[tone];
  return (
    <section
      data-surface={c.surface}
      className={cn("relative overflow-hidden pb-16 pt-[172px] md:pb-24 md:pt-[220px]", c.bg, c.text, c.extra, className)}
    >
      <div className="pad-x mx-auto max-w-[1800px]">
        <SectionLabel index={index} label={label} className={c.muted} />
        <RevealText
          as="h1"
          text={title}
          waitReady
          className={cn("mt-6", size === "xl" ? "t-hero" : "t-h1", size === "xl" ? "max-w-[14ch]" : "max-w-[18ch]")}
        />
        {sub && (
          <Reveal waitReady delay={0.3} className="mt-8 max-w-xl">
            <p className={cn("t-lead", tone === "dark" ? "text-cotton/85" : "text-indigo/85")}>{sub}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
