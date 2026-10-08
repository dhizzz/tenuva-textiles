"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export type Phase = "idle" | "cover" | "reveal";

interface Ctx {
  ready: boolean;
  setReady: (v: boolean) => void;
  phase: Phase;
  navigate: (href: string) => void;
  reveal: () => void;
}

const AppContext = createContext<Ctx | null>(null);
const COVER_MS = 440;
const REVEAL_MS = 520;

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const timers = useRef<number[]>([]);

  const set = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const reveal = useCallback(() => {
    if (phaseRef.current !== "cover") return;
    clearTimers();
    set("reveal");
    timers.current.push(window.setTimeout(() => set("idle"), REVEAL_MS));
  }, [set]);

  const navigate = useCallback(
    (href: string) => {
      const target = href.split("#")[0].split("?")[0] || "/";
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || target === pathname || phaseRef.current !== "idle") {
        router.push(href);
        return;
      }
      set("cover");
      timers.current.push(
        window.setTimeout(() => router.push(href), COVER_MS),
        // Safety net: never leave the screen covered if a route fails to mount.
        window.setTimeout(() => reveal(), 4000),
      );
    },
    [pathname, reveal, router, set],
  );

  useEffect(() => () => clearTimers(), []);

  const value = useMemo(
    () => ({ ready, setReady, phase, navigate, reveal }),
    [ready, phase, navigate, reveal],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
