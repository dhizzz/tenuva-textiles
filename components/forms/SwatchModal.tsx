"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useT } from "@/lib/LanguageProvider";
import { useLenis } from "@/lib/lenis";
import { InquiryForm } from "./InquiryForm";
import { EASE } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  productSlug: string;
  productName: string;
  onSent?: () => void;
}

export function SwatchModal({ open, onClose, productSlug, productName, onSent }: Props) {
  const { t } = useT();
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex='-1'])",
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open, onClose, lenis]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-indigo/80 p-0 md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="swatch-title"
            data-surface="light"
            className="max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-[20px] bg-linen p-6 text-indigo md:rounded-[20px] md:p-10"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            data-lenis-prevent
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 id="swatch-title" className="t-h3">
                  {t("products.detail.swatchTitle")}
                </h2>
                <p className="mt-2 text-indigo/85">{t("products.detail.swatchSub", { name: productName })}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={t("common.close")}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-indigo/30 transition-colors hover:bg-saffron"
              >
                <X size={20} aria-hidden />
              </button>
            </div>
            <InquiryForm type="swatches" defaultProduct={productSlug} onSent={onSent} hideInterest />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
