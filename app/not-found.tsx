"use client";

import { useT } from "@/lib/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function NotFound() {
  const { t } = useT();
  return (
    <PageHero index="404" label="404" title={t("notFound.title")} sub={t("notFound.text")} tone="dark" size="xl">
      <div className="mt-10">
        <MagneticButton href="/" variant="saffron">
          {t("notFound.cta")}
        </MagneticButton>
      </div>
    </PageHero>
  );
}
