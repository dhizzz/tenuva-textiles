"use client";

import { LanguageProvider } from "@/lib/LanguageProvider";
import { AppProvider } from "@/lib/AppProvider";
import { LenisProvider } from "@/lib/lenis";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AppProvider>
        <LenisProvider>{children}</LenisProvider>
      </AppProvider>
    </LanguageProvider>
  );
}
