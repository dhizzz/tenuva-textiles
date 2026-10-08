"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/lib/LanguageProvider";
import { getProduct, relatedProducts } from "@/data/products";
import { formatSpec } from "@/lib/spec";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { SafeImage } from "@/components/ui/SafeImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TLink } from "@/components/ui/TLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SwatchModal } from "@/components/forms/SwatchModal";
import { ProductCard } from "./ProductCard";
import { EASE } from "@/lib/utils";

interface ItemCopy {
  short: string;
  construction: string;
  finish: string;
  endUses: string[];
}

export function ProductDetail({ slug }: { slug: string }) {
  const { t, lang, dict } = useT();
  const product = getProduct(slug);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(false), 6000);
    return () => window.clearTimeout(id);
  }, [toast]);

  const closeModal = useCallback(() => setModal(false), []);

  if (!product) {
    return (
      <section data-surface="light" className="bg-cotton px-[var(--pad)] pb-28 pt-[200px]">
        <p role="alert" className="t-h3">
          {t("products.loadError")}
        </p>
      </section>
    );
  }

  const copy = (dict.products.items as Record<string, ItemCopy>)[product.slug];
  const spec = formatSpec(product, dict, lang);
  const isYarn = spec.isYarn;

  const rows: [string, string][] = [
    [t("products.spec.composition"), spec.composition],
    isYarn
      ? [t("products.spec.count"), t("units.count", { n: product.count ?? "" })]
      : [t("products.spec.weight"), t("units.gsm", { n: product.gsm ?? "" })],
    ...(isYarn ? [] : ([[t("products.spec.width"), t("units.width", { n: product.width ?? "" })]] as [string, string][])),
    [t("products.spec.construction"), copy.construction],
    [t("products.spec.finish"), copy.finish],
    [t("products.spec.moq"), spec.moq],
    [t("products.spec.lead"), spec.lead],
    [t("products.spec.colors"), isYarn ? t("products.colors.yarn") : t("products.colors.fabric")],
  ];

  const related = relatedProducts(product.slug, 3);

  return (
    <>
      <section data-surface="light" className="linen-noise relative overflow-hidden bg-cotton pb-20 pt-[160px] md:pb-32 md:pt-[200px]">
        <div className="pad-x mx-auto max-w-[1800px]">
          <TLink
            href="/products"
            className="t-mono inline-flex min-h-[44px] items-center gap-2 uppercase text-stone transition-colors hover:text-indigo"
          >
            <ArrowLeft size={16} aria-hidden />
            {t("products.detail.back")}
          </TLink>

          <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="t-mono uppercase text-stone">{t(`categories.${product.category}`)}</p>
              <RevealText as="h1" text={product.name} waitReady className="t-h1 mt-4 max-w-[14ch] !text-[clamp(2.6rem,6.4vw,6.4rem)]" />
              <Reveal delay={0.25} waitReady className="mt-8 max-w-xl">
                <p className="t-lead text-indigo/90">{copy.short}</p>
              </Reveal>

              <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
                <MagneticButton href={`/contact?tab=quote&product=${product.slug}`} variant="saffron">
                  {t("common.requestQuote")}
                </MagneticButton>
                <MagneticButton onClick={() => setModal(true)} variant="outline-light">
                  {t("common.requestSwatches")}
                </MagneticButton>
              </Reveal>
              <p className="t-mono mt-5 max-w-md text-stone">{t("products.detail.b2b")}</p>
            </div>

            <div className="lg:col-span-5">
              <Parallax className="aspect-[4/5] rounded-[20px]">
                <SafeImage name={product.image} priority sizes="(min-width: 1024px) 40vw, 100vw" />
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      <section data-surface="dark" className="grain relative overflow-hidden bg-indigo py-20 text-cotton md:py-32">
        <div className="pad-x mx-auto grid max-w-[1800px] gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="01" label={t("products.specLabel")} className="text-cotton/75" />
            <dl className="mt-6 border-t border-line-dark">
              {rows.map(([k, v], i) => (
                <Reveal key={k} as="div" delay={i * 0.04} y={12} className="grid gap-1 border-b border-line-dark py-4 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-6">
                  <dt className="t-mono uppercase text-cotton/70">{k}</dt>
                  <dd className="font-mono text-[15px] leading-relaxed">{v}</dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <SectionLabel index="02" label={t("products.detail.endUses")} className="text-cotton/75" />
            <ul className="mt-6 border-t border-line-dark">
              {copy.endUses.map((u) => (
                <li key={u} className="border-b border-line-dark py-4 font-display text-[1.5rem] leading-tight">
                  {u}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-[20px] border border-line-dark p-6">
              <p className="t-mono uppercase text-saffron">{t("products.detail.careTitle")}</p>
              <p className="mt-2 text-cotton/90">{t("products.detail.care")}</p>
            </div>
          </div>
        </div>
      </section>

      <section data-surface="light" className="linen-noise relative bg-cotton py-20 md:py-32">
        <div className="pad-x mx-auto max-w-[1800px]">
          <h2 className="t-h2">{t("products.detail.related")}</h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </ul>
        </div>
      </section>

      <SwatchModal
        open={modal}
        onClose={closeModal}
        productSlug={product.slug}
        productName={product.name}
        onSent={() => setToast(true)}
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className="fixed bottom-6 left-1/2 z-[85] w-[min(92vw,520px)] -translate-x-1/2 rounded-[14px] bg-indigo p-4 pr-5 text-cotton shadow-[0_10px_30px_rgba(23,32,77,0.35)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <span className="mr-3 inline-block h-2.5 w-2.5 rounded-full bg-saffron align-middle" aria-hidden />
            <span className="align-middle text-[15px]">{t("common.toastSent")}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
