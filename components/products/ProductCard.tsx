"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";
import { TLink } from "@/components/ui/TLink";
import { useT } from "@/lib/LanguageProvider";
import { formatSpec } from "@/lib/spec";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const { t, lang, dict } = useT();
  const spec = formatSpec(product, dict, lang);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="h-full list-none"
    >
      <TLink
        href={`/products/${product.slug}`}
        data-cursor={t("common.view")}
        className="duotone-hover group/card flex h-full flex-col overflow-hidden rounded-[20px] border-2 border-line bg-cotton transition-colors duration-500 hover:border-saffron focus-visible:border-saffron"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <SafeImage
            name={product.image}
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
            imgClassName="transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.06]"
          />
        </div>
        <div className="flex flex-1 items-start justify-between gap-4 p-5">
          <div className="min-w-0">
            <p className="t-mono uppercase text-stone">{t(`categories.${product.category}`)}</p>
            <h3 className="t-h4 mt-1.5">{product.name}</h3>
            <p className="t-mono mt-3 text-indigo/80">{spec.composition}</p>
            <p className="t-mono text-indigo/80">{spec.line}</p>
          </div>
          <ArrowUpRight
            aria-hidden
            size={26}
            className="mt-1 shrink-0 -rotate-45 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:rotate-0"
          />
        </div>
      </TLink>
    </motion.li>
  );
}
