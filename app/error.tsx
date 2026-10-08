"use client";

import { useT } from "@/lib/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const { t } = useT();
  return (
    <PageHero index="500" label={t("error.label")} title={t("error.title")} sub={t("error.text")} tone="dark" size="xl">
      <div className="mt-10">
        <MagneticButton onClick={reset} variant="saffron">
          {t("error.cta")}
        </MagneticButton>
      </div>
    </PageHero>
  );
}
