"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { en, type Dict } from "./i18n/en";
import { id } from "./i18n/id";

export type Lang = "en" | "id";
const dicts: Record<Lang, Dict> = { en, id };
const STORAGE_KEY = "tenuva-lang";

type Vars = Record<string, string | number>;

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  dict: Dict;
  t: (key: string, vars?: Vars) => string;
  raw: <T = unknown>(key: string) => T;
}

const LanguageContext = createContext<Ctx | null>(null);

function lookup(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[part];
    return undefined;
  }, obj);
}

function interpolate(s: string, vars?: Vars) {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "id") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const apply = () => {
      setLangState(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
    };
    if (reduce) return apply();
    root.dataset.swapping = "true";
    window.setTimeout(() => {
      apply();
      window.setTimeout(() => delete root.dataset.swapping, 40);
    }, 120);
  }, []);

  const value = useMemo<Ctx>(() => {
    const dict = dicts[lang];
    return {
      lang,
      setLang,
      dict,
      t: (key, vars) => {
        const v = lookup(dict, key);
        return typeof v === "string" ? interpolate(v, vars) : key;
      },
      raw: <T,>(key: string) => lookup(dict, key) as T,
    };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used inside LanguageProvider");
  return ctx;
}
