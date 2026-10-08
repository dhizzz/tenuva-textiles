"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { TLink } from "@/components/ui/TLink";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { LanguageToggle } from "./LanguageToggle";
import { useT } from "@/lib/LanguageProvider";
import { useLenis } from "@/lib/lenis";
import { cn, EASE } from "@/lib/utils";

const ANNOUNCE_H = 36;
const LINKS = [
  { href: "/products", key: "nav.products" },
  { href: "/industries", key: "nav.industries" },
  { href: "/capabilities", key: "nav.capabilities" },
  { href: "/about", key: "nav.about" },
  { href: "/sustainability", key: "nav.sustainability" },
];

export function AnnouncementBar() {
  const { t } = useT();
  const text = t("nav.announcement");
  return (
    <div className="relative z-[55] h-9 bg-indigo text-cotton" role="note">
      <Marquee
        items={[text, text, text]}
        separator="dot"
        duration={70}
        className="t-mono h-9 leading-9"
        itemClassName="py-0"
      />
    </div>
  );
}

export function Navbar() {
  const { t } = useT();
  const pathname = usePathname();
  const lenis = useLenis();
  const outerRef = useRef<HTMLDivElement>(null);
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (outerRef.current) outerRef.current.style.transform = `translate3d(0,${-Math.min(y, ANNOUNCE_H)}px,0)`;
      setScrolled(y > 40);
      if (y > 240 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y < 240) setHidden(false);
      last = y;

      const probe = 46;
      const surfaces = document.querySelectorAll<HTMLElement>("[data-surface]");
      let next: "dark" | "light" = "light";
      for (const el of surfaces) {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) {
          next = el.dataset.surface === "dark" ? "dark" : "light";
          break;
        }
      }
      setDark(next === "dark");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    const settle = window.setTimeout(update, 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open, lenis]);

  const tone = dark ? "dark" : "light";

  return (
    <>
      <div
        ref={outerRef}
        className="fixed inset-x-0 z-50"
        style={{ top: ANNOUNCE_H, willChange: "transform" }}
      >
        <header
          className={cn(
            "transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            hidden && !open ? "-translate-y-[120%]" : "translate-y-0",
            scrolled
              ? dark
                ? "border-b border-line-dark bg-indigo/92 backdrop-blur-md"
                : "border-b border-line bg-cotton/92 backdrop-blur-md"
              : "border-b border-transparent bg-transparent",
            dark ? "text-cotton" : "text-indigo",
          )}
        >
          <nav
            aria-label={t("nav.mainNav")}
            className="pad-x mx-auto flex h-[72px] max-w-[1800px] items-center justify-between gap-6"
          >
            <TLink href="/" className="shrink-0 rounded-md" data-cursor={t("common.open")}>
              <Logo tone={dark ? "light" : "dark"} />
            </TLink>

            <ul className="hidden items-center gap-9 lg:flex">
              {LINKS.map((l) => {
                const active = pathname === l.href || pathname.startsWith(l.href + "/");
                return (
                  <li key={l.href}>
                    <TLink
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className="group relative inline-block py-2 text-[15px] font-medium"
                    >
                      {t(l.key)}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-saffron transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </TLink>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <LanguageToggle tone={tone} />
              <div className="hidden lg:block">
                <MagneticButton href="/contact?tab=quote" variant="saffron" className="!min-h-[44px] !px-5 !py-2.5">
                  {t("common.requestQuote")}
                </MagneticButton>
              </div>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={t("nav.openMenu")}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full lg:hidden"
              >
                <span className={cn("block h-[2px] w-6", dark ? "bg-cotton" : "bg-indigo")} />
                <span className={cn("block h-[2px] w-6", dark ? "bg-cotton" : "bg-indigo")} />
              </button>
            </div>
          </nav>
        </header>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useT();
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
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
      previous?.focus?.();
    };
  }, [open, onClose]);

  const all = [...LINKS, { href: "/contact", key: "nav.contact" }];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t("nav.mainNav")}
          data-surface="dark"
          className="grain fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-indigo text-cotton"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="pad-x flex h-[72px] shrink-0 items-center justify-between">
            <Logo tone="light" />
            <div className="flex items-center gap-3">
              <LanguageToggle tone="dark" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={t("nav.closeMenu")}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cotton/30"
              >
                <X size={20} aria-hidden />
              </button>
            </div>
          </div>

          <ul className="pad-x flex flex-1 flex-col justify-center gap-1 py-8">
            {all.map((l, i) => {
              const active = pathname === l.href;
              return (
                <li key={l.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.06 }}
                  >
                    <TLink
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block min-h-[48px] py-1 font-display text-[clamp(2.4rem,11vw,4.5rem)] leading-[1.05] tracking-[-0.02em]",
                        active ? "em text-saffron" : "text-cotton",
                      )}
                    >
                      {t(l.key)}
                    </TLink>
                  </motion.div>
                </li>
              );
            })}
          </ul>

          <div className="pad-x pb-10">
            <MagneticButton href="/contact?tab=quote" variant="saffron" className="w-full">
              {t("common.requestQuote")}
            </MagneticButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
