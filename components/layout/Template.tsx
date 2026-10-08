"use client";

import { useEffect } from "react";
import { useApp } from "@/lib/AppProvider";
import { useLenis } from "@/lib/lenis";
import { ScrollTrigger } from "@/lib/gsap";

/** Runs on every route mount: resets scroll, refreshes triggers, then lifts the transition strips. */
export function Template({ children }: { children: React.ReactNode }) {
  const { reveal } = useApp();
  const lenis = useLenis();

  useEffect(() => {
    if (!window.location.hash) {
      lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    }
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    reveal();
    return () => window.clearTimeout(id);
  }, [lenis, reveal]);

  return <>{children}</>;
}
