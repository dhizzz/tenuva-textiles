import type { Dict } from "./i18n/en";
import type { Product } from "@/data/products";

const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

export function formatComposition(p: Product, dict: Dict) {
  return p.composition
    .map((c) => (c.pct ? `${c.pct}% ${dict.fibers[c.fiber]}` : dict.fibers[c.fiber]))
    .join(", ");
}

export function formatMoq(p: Product, dict: Dict, lang: string) {
  const n = new Intl.NumberFormat(lang === "id" ? "id-ID" : "en-US").format(p.moq.n);
  return fill(p.moq.kind === "kg" ? dict.units.kgPerCount : dict.units.mPerColor, { n });
}

export function formatLead(p: Product, dict: Dict) {
  return fill(dict.units.days, { a: p.lead[0], b: p.lead[1] });
}

/** Compact spec strings used on cards, tiles and the detail table. */
export function formatSpec(p: Product, dict: Dict, lang: string) {
  const composition = formatComposition(p, dict);
  const isYarn = p.gsm === null;
  const line = isYarn
    ? fill(dict.units.count, { n: p.count ?? "" })
    : [fill(dict.units.gsm, { n: p.gsm ?? "" }), fill(dict.units.width, { n: p.width ?? "" })].join(" / ");
  return {
    composition,
    line,
    full: `${composition} / ${line}`,
    moq: formatMoq(p, dict, lang),
    lead: formatLead(p, dict),
    isYarn,
  };
}
