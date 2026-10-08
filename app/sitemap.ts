import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tenuva.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/products", "/industries", "/capabilities", "/sustainability", "/contact"];
  const now = new Date();
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, lastModified: now, priority: p === "" ? 1 : 0.7 })),
    ...PRODUCTS.map((p) => ({ url: `${base}/products/${p.slug}`, lastModified: now, priority: 0.6 })),
  ];
}
