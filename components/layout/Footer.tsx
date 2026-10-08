"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { TLink } from "@/components/ui/TLink";
import { useT } from "@/lib/LanguageProvider";
import { useLenis } from "@/lib/lenis";
import { CATEGORIES } from "@/data/products";
import { EASE } from "@/lib/utils";

export function Footer() {
  const { t } = useT();
  const lenis = useLenis();
  const markRef = useRef<HTMLDivElement>(null);
  const inView = useInView(markRef, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const linkCls = "inline-block py-1.5 text-[15px] text-cotton/80 transition-colors hover:text-saffron";

  return (
    <footer data-surface="dark" className="grain relative overflow-hidden bg-indigo text-cotton">
      <div className="pad-x mx-auto max-w-[1800px] pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-xs font-display text-2xl italic text-cotton/90">{t("footer.tagline")}</p>
          </div>

          <nav aria-label={t("footer.products")} className="md:col-span-2 md:col-start-6">
            <h2 className="t-mono mb-4 uppercase text-sage">{t("footer.products")}</h2>
            <ul>
              {CATEGORIES.filter((c) => c !== "all").map((c) => (
                <li key={c}>
                  <TLink href={`/products?category=${c}`} className={linkCls}>
                    {t(`categories.${c}`)}
                  </TLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("footer.company")} className="md:col-span-2">
            <h2 className="t-mono mb-4 uppercase text-sage">{t("footer.company")}</h2>
            <ul>
              {[
                ["/about", "nav.about"],
                ["/industries", "nav.industries"],
                ["/capabilities", "nav.capabilities"],
                ["/sustainability", "nav.sustainability"],
              ].map(([href, key]) => (
                <li key={href}>
                  <TLink href={href} className={linkCls}>
                    {t(key)}
                  </TLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="t-mono mb-4 uppercase text-sage">{t("footer.contact")}</h2>
            <address className="space-y-3 text-[15px] not-italic text-cotton/80">
              <p>{t("contact.address")}</p>
              <p>
                <a className="transition-colors hover:text-saffron" href={`mailto:${t("contact.email")}`}>
                  {t("contact.email")}
                </a>
              </p>
              <p>
                <a className="transition-colors hover:text-saffron" href="tel:+62220000000">
                  {t("contact.phone")}
                </a>
              </p>
              <p className="t-mono text-cotton/70">{t("contact.hours")}</p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex items-start justify-between gap-6 border-t border-line-dark pt-6">
          <p className="max-w-2xl text-[13px] leading-relaxed text-cotton/70">{t("footer.disclaimer")}</p>
          <button
            type="button"
            onClick={toTop}
            data-cursor={t("common.backToTop")}
            className="t-mono min-h-[44px] shrink-0 rounded-[10px] border border-cotton/30 px-4 uppercase transition-colors hover:border-saffron hover:text-saffron"
          >
            {t("common.backToTop")}
          </button>
        </div>
      </div>

      <div ref={markRef} className="relative mt-6 select-none overflow-hidden" aria-hidden>
        <div className="relative mx-auto max-w-[1800px] px-[var(--pad)]">
          <motion.p
            className="font-display font-semibold leading-[0.82] tracking-[-0.045em] text-cotton"
            style={{ fontSize: "clamp(5.5rem, 24.5vw, 32rem)" }}
            initial={{ y: reduce ? 0 : "55%", opacity: reduce ? 0 : 1 }}
            animate={inView ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: reduce ? 0.3 : 1.2, ease: EASE }}
          >
            Tenuva
          </motion.p>
          <svg
            className="pointer-events-none absolute inset-x-0 top-[52%] h-8 w-full -translate-y-1/2"
            viewBox="0 0 1000 32"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0 16 C 140 4, 260 28, 400 16 S 660 4, 800 16 S 940 26, 1000 16"
              fill="none"
              stroke="#E8A33D"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: inView || reduce ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 1.8, ease: EASE, delay: 0.3 }}
            />
          </svg>
        </div>
      </div>
    </footer>
  );
}
