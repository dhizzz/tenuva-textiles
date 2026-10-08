"use client";

import { Fragment, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useApp } from "@/lib/AppProvider";
import { EASE } from "@/lib/utils";
import { parseRich, stripRich } from "./RichText";

interface Props {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  className?: string;
  delay?: number;
  /** Hold the animation until the preloader has finished. */
  waitReady?: boolean;
}

/** Headline reveal: each word slides up through a mask, line by line. */
export function RevealText({ text, as = "h2", className, delay = 0, waitReady = false }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const { ready } = useApp();
  const go = inView && (!waitReady || ready);
  const Tag = motion[as] as typeof motion.h2;

  const lines = text.split("\n");

  return (
    <Tag ref={ref as never} className={className} aria-label={stripRich(text)}>
      {lines.map((line, li) => {
        // Adjacent segments with no whitespace between them (e.g. "*discipline*.") stay in one masked word.
        const words: { parts: { text: string; em: boolean }[] }[] = [];
        let startNew = true;
        for (const seg of parseRich(line)) {
          for (const tok of seg.text.split(/(\s+)/)) {
            if (!tok) continue;
            if (/^\s+$/.test(tok)) {
              startNew = true;
              continue;
            }
            if (startNew || words.length === 0) words.push({ parts: [] });
            words[words.length - 1].parts.push({ text: tok, em: seg.em });
            startNew = false;
          }
        }
        return (
          <span key={li} className="block" aria-hidden>
            {words.map((word, wi) => (
              <Fragment key={wi}>
                {wi > 0 && " "}
                <span className="inline-block overflow-hidden pb-[0.14em] pr-[0.06em] -mb-[0.14em] -mr-[0.06em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "112%", opacity: reduce ? 0 : 1 }}
                    animate={go ? { y: 0, opacity: 1 } : undefined}
                    transition={{
                      duration: reduce ? 0.01 : 0.9,
                      ease: EASE,
                      delay: delay + li * 0.08 + wi * 0.035,
                    }}
                  >
                    {word.parts.map((part, pi) =>
                      part.em ? (
                        <em key={pi} className="em">
                          {part.text}
                        </em>
                      ) : (
                        <Fragment key={pi}>{part.text}</Fragment>
                      ),
                    )}
                  </motion.span>
                </span>
              </Fragment>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}
