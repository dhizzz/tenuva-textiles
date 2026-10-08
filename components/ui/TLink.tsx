"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useApp } from "@/lib/AppProvider";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** Internal link that plays the page-transition strips before routing. */
export function TLink({ href, onClick, children, ...rest }: Props) {
  const { navigate } = useApp();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    if (
      !isInternal ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0 ||
      rest.target === "_blank"
    )
      return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
