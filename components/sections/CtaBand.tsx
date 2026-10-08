"use client";

import { useT } from "@/lib/LanguageProvider";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TLink } from "@/components/ui/TLink";

export function CtaBand({ withSub = true }: { withSub?: boolean }) {
  const { t } = useT();
  return (
    <section data-surface="light" className="relative overflow-hidden bg-saffron py-24 text-indigo md:py-40">
      <div className="pad-x mx-auto max-w-[1800px]">
        <RevealText text={t("home.cta.title")} className="t-hero max-w-[12ch]" />
        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {withSub ? (
            <Reveal className="md:max-w-md">
              <p className="t-lead">{t("home.cta.sub")}</p>
            </Reveal>
          ) : (
            <span />
          )}
          <Reveal delay={0.1} className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <MagneticButton href="/contact?tab=swatches" variant="indigo">
              {t("common.requestSwatches")}
            </MagneticButton>
            <TLink
              href="/contact?tab=partner"
              className="inline-flex min-h-[44px] items-center border-b-2 border-indigo text-[17px] font-semibold"
            >
              {t("common.becomePartner")}
            </TLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
