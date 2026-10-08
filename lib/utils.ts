export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export const EASE = [0.22, 1, 0.36, 1] as const;

export function formatNumber(n: number, lang: string) {
  return new Intl.NumberFormat(lang === "id" ? "id-ID" : "en-US").format(n);
}
