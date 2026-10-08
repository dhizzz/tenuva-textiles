"use client";

import { useT } from "@/lib/LanguageProvider";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SafeImage } from "@/components/ui/SafeImage";
import { TLink } from "@/components/ui/TLink";
import { getProduct } from "@/data/products";
import { formatSpec } from "@/lib/spec";

const TILES: { slug: string; span: string; aspect: string; offset: string }[] = [
  { slug: "cotton-poplin-110", span: "md:col-span-5", aspect: "aspect-[4/5]", offset: "" },
  { slug: "denim-indigo-12oz", span: "md:col-span-4", aspect: "aspect-square", offset: "md:mt-20" },
  { slug: "linen-blend-180", span: "md:col-span-3", aspect: "aspect-[3/4]", offset: "md:mt-8" },
  { slug: "jersey-single-160", span: "md:col-span-3", aspect: "aspect-[3/4]", offset: "" },
  { slug: "rayon-challis-120", span: "md:col-span-5", aspect: "aspect-[5/4]", offset: "md:mt-16" },
  { slug: "fleece-brushed-280", span: "md:col-span-4", aspect: "aspect-[4/5]", offset: "md:mt-4" },
];

export function SwatchGallery() {
  const { t, lang, dict } = useT();

  return (
    <section data-surface="light" className="linen-noise relative bg-linen py-24 md:py-40">
      <div className="pad-x mx-auto max-w-[1800px]">
        <div className="grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel index="03" label={t("home.swatch.label")} className="text-indigo/80" />
            <RevealText text={t("home.swatch.title")} className="t-h2 mt-4" />
          </div>
          <Reveal className="md:col-span-4 md:col-start-9">
            <p className="text-indigo/85">{t("home.swatch.hint")}</p>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-12 md:gap-6">
          {TILES.map((tile, i) => {
            const p = getProduct(tile.slug)!;
            const spec = formatSpec(p, dict, lang);
            return (
              <li key={tile.slug} className={`${tile.span} ${tile.offset} ${i === 0 ? "col-span-2" : ""}`}>
                <TLink
                  href={`/products/${p.slug}`}
                  data-cursor={t("common.feel")}
                  className="group/tile relative block overflow-hidden rounded-[20px]"
                >
                  <div className={`relative ${tile.aspect}`}>
                    <div className="absolute inset-0 transition-[clip-path] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] [clip-path:inset(7%_round_16px)] group-hover/tile:[clip-path:inset(0%_round_20px)] group-focus-visible/tile:[clip-path:inset(0%_round_20px)]">
                      <SafeImage
                        name={p.image}
                        sizes="(min-width: 768px) 40vw, 50vw"
                        imgClassName="transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/tile:scale-[1.06]"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 translate-y-3 bg-indigo/92 px-4 py-3 text-cotton opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/tile:translate-y-0 group-hover/tile:opacity-100 group-focus-visible/tile:translate-y-0 group-focus-visible/tile:opacity-100 max-md:translate-y-0 max-md:opacity-100">
                      <p className="t-mono">{spec.composition}</p>
                      <p className="t-mono text-cotton/80">{spec.line}</p>
                    </div>
                  </div>
                  <span className="sr-only">{p.name}</span>
                </TLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
