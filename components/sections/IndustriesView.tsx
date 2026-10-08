"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/LanguageProvider";
import { useLenis } from "@/lib/lenis";
import { INDUSTRIES } from "@/data/industries";
import { getProduct } from "@/data/products";
import { PageHero } from "@/components/ui/PageHero";
import { Parallax } from "@/components/ui/Parallax";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { TLink } from "@/components/ui/TLink";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

export function IndustriesView() {
  const { t, raw } = useT();
  const lenis = useLenis();
  const items = raw<{ name: string; desc: string }[]>("industries.items");
  const [active, setActive] = useState(INDUSTRIES[0].slug);

  useEffect(() => {
    const els = INDUSTRIES.map((i) => document.getElementById(i.slug)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const id = window.setTimeout(() => {
      const el = document.getElementById(hash);
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { offset: -90, immediate: true });
      else el.scrollIntoView();
    }, 300);
    return () => window.clearTimeout(id);
  }, [lenis]);

  const jump = (slug: string) => {
    const el = document.getElementById(slug);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -90 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <PageHero index="00" label={t("industries.label")} title={t("industries.hero")} tone="light" />

      <div data-surface="light" className="linen-noise relative bg-cotton pb-24 md:pb-40">
        <div className="pad-x mx-auto grid max-w-[1800px] gap-10 lg:grid-cols-12">
          <nav aria-label={t("industries.label")} className="hidden lg:col-span-2 lg:block">
            <ul className="sticky top-32 border-l border-line">
              {INDUSTRIES.map((ind, i) => (
                <li key={ind.slug}>
                  <a
                    href={`#${ind.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      jump(ind.slug);
                    }}
                    aria-current={active === ind.slug ? "true" : undefined}
                    className={cn(
                      "t-mono relative flex min-h-[44px] items-center gap-3 py-2 pl-5 transition-colors",
                      active === ind.slug ? "text-indigo" : "text-stone hover:text-indigo",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -left-px top-0 h-full w-[3px] origin-top bg-saffron transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        active === ind.slug ? "scale-y-100" : "scale-y-0",
                      )}
                    />
                    0{i + 1} {items[i].name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-24 md:space-y-40 lg:col-span-10">
            {INDUSTRIES.map((ind, i) => {
              const flip = i % 2 === 1;
              return (
                <section key={ind.slug} id={ind.slug} className="scroll-mt-28">
                  <div className={cn("grid gap-8 md:grid-cols-12 md:items-center md:gap-12", flip && "md:[&>*:first-child]:order-2")}>
                    <Parallax className={cn("aspect-[4/5] rounded-[20px] md:col-span-6", i % 3 === 2 && "md:aspect-square")}>
                      <SafeImage name={ind.image} sizes="(min-width: 768px) 45vw, 100vw" />
                    </Parallax>
                    <div className="md:col-span-6">
                      <p className="t-mono text-stone">0{i + 1} / 06</p>
                      <RevealText as="h2" text={items[i].name} className="t-h2 mt-3 !text-[clamp(2.2rem,5vw,4.8rem)]" />
                      <Reveal delay={0.15}>
                        <p className="t-lead mt-6 max-w-[44ch] text-indigo/90">{items[i].desc}</p>
                        <p className="t-mono mt-8 uppercase text-stone">{t("industries.fabrics")}</p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {ind.products.map((slug) => {
                            const p = getProduct(slug);
                            if (!p) return null;
                            return (
                              <li key={slug}>
                                <TLink
                                  href={`/products/${slug}`}
                                  data-cursor={t("common.view")}
                                  className="inline-flex min-h-[44px] items-center rounded-[8px] border border-indigo/35 px-3 text-[14px] font-medium transition-colors hover:border-saffron hover:bg-saffron/25"
                                >
                                  {p.name.replace("Tenuva ", "")}
                                </TLink>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="mt-8">
                          <MagneticButton href={`/contact?tab=quote&product=${ind.products[0]}`} variant="outline-light">
                            {t("common.requestQuote")}
                          </MagneticButton>
                        </div>
                      </Reveal>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
