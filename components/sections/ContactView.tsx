"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useT } from "@/lib/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteForm } from "@/components/forms/QuoteForm";
import type { InquiryType } from "@/components/forms/schema";
import { getProduct } from "@/data/products";

function ContactMap() {
  const { t } = useT();
  return (
    <figure className="overflow-hidden rounded-[20px] border border-line-dark bg-indigo-2">
      <svg viewBox="0 0 600 340" className="block h-auto w-full" role="img" aria-label={t("contact.mapLabel")}>
        <rect width="600" height="340" fill="#222C63" />
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M-20 ${40 + i * 38} C 120 ${10 + i * 38}, 220 ${80 + i * 38}, 340 ${40 + i * 38} S 520 ${20 + i * 38}, 620 ${50 + i * 38}`}
            fill="none"
            stroke="#323C75"
            strokeWidth="1.5"
          />
        ))}
        <path d="M0 250 C 120 230, 200 280, 320 250 S 500 210, 600 240" fill="none" stroke="#A9B8A0" strokeOpacity="0.6" strokeWidth="6" />
        <path d="M300 0 C 310 90, 280 160, 330 340" fill="none" stroke="#6B6B72" strokeWidth="3" strokeDasharray="10 8" />
        <g transform="translate(330 150)">
          <circle r="22" fill="#E8A33D" fillOpacity="0.25">
            <animate attributeName="r" values="14;30;14" dur="3s" repeatCount="indefinite" />
          </circle>
          <path d="M0 -22 C 12 -22, 18 -12, 18 -4 C 18 10, 0 24, 0 24 C 0 24, -18 10, -18 -4 C -18 -12, -12 -22, 0 -22 Z" fill="#E8A33D" />
          <circle cy="-5" r="6" fill="#17204D" />
        </g>
        <text x="362" y="146" fill="#F3EEE4" fontFamily="var(--font-dm-mono), monospace" fontSize="14">
          {t("contact.mapPin")}
        </text>
      </svg>
    </figure>
  );
}

function ContactBody() {
  const { t } = useT();
  const params = useSearchParams();
  const tabParam = params.get("tab");
  const tab: InquiryType = tabParam === "swatches" || tabParam === "partner" ? tabParam : "quote";
  const productParam = params.get("product");
  const product = productParam && getProduct(productParam) ? productParam : undefined;

  const detail = (label: string, value: string, href?: string) => (
    <div className="grid gap-1 border-b border-line-dark py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
      <dt className="t-mono uppercase text-cotton/70">{label}</dt>
      <dd className="text-cotton">
        {href ? (
          <a href={href} className="transition-colors hover:text-saffron">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );

  return (
    <section data-surface="light" className="relative">
      <div className="grid lg:grid-cols-2">
        <div data-surface="dark" className="grain relative bg-indigo px-[var(--pad)] pb-20 pt-10 text-cotton lg:pb-32 lg:pt-10">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="max-w-md t-lead text-cotton/90">{t("contact.lead")}</p>
            </Reveal>
            <dl className="mt-10 border-t border-line-dark">
              {detail(t("contact.detailsTitle"), t("contact.address"))}
              {detail(t("contact.emailLabel"), t("contact.email"), `mailto:${t("contact.email")}`)}
              {detail(t("contact.phoneLabel"), t("contact.phone"), "tel:+62220000000")}
              {detail(t("contact.hoursLabel"), t("contact.hours"))}
            </dl>
            <div className="mt-10">
              <ContactMap />
            </div>
          </div>
        </div>

        <div className="linen-noise relative bg-linen px-[var(--pad)] py-14 lg:py-24">
          <div className="mx-auto max-w-2xl">
            <QuoteForm key={`${tab}-${product ?? ""}`} initialTab={tab} product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactView() {
  const { t } = useT();
  return (
    <>
      <PageHero index="00" label={t("contact.label")} title={t("contact.title")} tone="dark" size="xl" className="!pb-8 md:!pb-12" />
      <Suspense
        fallback={
          <div className="grid min-h-[60svh] place-items-center bg-linen" aria-busy="true">
            <span className="t-mono text-stone">...</span>
          </div>
        }
      >
        <ContactBody />
      </Suspense>
    </>
  );
}
