"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useT } from "@/lib/LanguageProvider";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ProductCard } from "./ProductCard";
import { ProductFilter } from "./ProductFilter";

function Catalog() {
  const { t } = useT();
  const params = useSearchParams();
  const initial = params.get("category") ?? "all";
  const [category, setCategory] = useState(CATEGORIES.includes(initial as never) ? initial : "all");

  useEffect(() => {
    const next = params.get("category") ?? "all";
    if (CATEGORIES.includes(next as never)) setCategory(next);
  }, [params]);

  const change = (c: string) => {
    setCategory(c);
    const url = c === "all" ? "/products" : `/products?category=${c}`;
    window.history.replaceState(null, "", url);
  };

  const visible = PRODUCTS.filter((p) => category === "all" || p.category === category);

  return (
    <section data-surface="light" className="linen-noise relative bg-cotton pb-28 md:pb-40">
      <div className="pad-x mx-auto max-w-[1800px]">
        <Reveal className="mb-10 grid gap-6 rounded-[20px] bg-indigo p-6 text-cotton md:grid-cols-12 md:items-center md:p-8">
          <p className="t-mono uppercase text-saffron md:col-span-2">B2B</p>
          <p className="md:col-span-7">{t("products.notice")}</p>
          <div className="md:col-span-3 md:justify-self-end">
            <MagneticButton href="/contact?tab=swatches" variant="saffron">
              {t("common.requestSwatches")}
            </MagneticButton>
          </div>
        </Reveal>

        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <ProductFilter value={category} onChange={change} />
          <p className="t-mono text-stone" aria-live="polite">
            {t("products.results", { n: visible.length })}
          </p>
        </div>

        <LayoutGroup>
          <motion.ul layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>

        {visible.length === 0 && <p className="mt-10 text-stone">{t("products.empty")}</p>}
      </div>
    </section>
  );
}

function CatalogSkeleton() {
  return (
    <section data-surface="light" className="bg-cotton pb-28">
      <div className="pad-x mx-auto grid max-w-[1800px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[4/6] animate-pulse rounded-[20px] bg-linen" />
        ))}
      </div>
    </section>
  );
}

export function ProductsView() {
  const { t } = useT();
  return (
    <>
      <PageHero index="01" label={t("products.label")} title={t("products.title")} sub={t("products.sub")} tone="light" />
      <Suspense fallback={<CatalogSkeleton />}>
        <Catalog />
      </Suspense>
    </>
  );
}
