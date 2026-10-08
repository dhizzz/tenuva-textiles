import type { ImageKey } from "./images";

export type Category = "yarn" | "woven" | "knit" | "denim" | "technical";
export type FiberKey = "cotton" | "polyester" | "linen" | "rayon" | "elastane" | "frBlend";

export interface Product {
  slug: string;
  name: string;
  category: Category;
  composition: { fiber: FiberKey; pct?: number }[];
  gsm: number | null;
  count?: number;
  width: number | null;
  moq: { kind: "kg" | "m"; n: number };
  lead: [number, number];
  image: ImageKey;
}

const fabricMoq = (n = 1000) => ({ kind: "m" as const, n });
const yarnMoq = { kind: "kg" as const, n: 500 };

export const PRODUCTS: Product[] = [
  {
    slug: "cotton-combed-30s",
    name: "Tenuva CC-30 Combed Cotton Yarn",
    category: "yarn",
    composition: [{ fiber: "cotton", pct: 100 }],
    gsm: null,
    count: 30,
    width: null,
    moq: yarnMoq,
    lead: [20, 30],
    image: "yarnColor",
  },
  {
    slug: "polyester-spun-40s",
    name: "Tenuva PS-40 Spun Polyester Yarn",
    category: "yarn",
    composition: [{ fiber: "polyester", pct: 100 }],
    gsm: null,
    count: 40,
    width: null,
    moq: yarnMoq,
    lead: [20, 30],
    image: "spools",
  },
  {
    slug: "tc-blend-yarn-32s",
    name: "Tenuva TC-32 Blended Yarn",
    category: "yarn",
    composition: [
      { fiber: "polyester", pct: 65 },
      { fiber: "cotton", pct: 35 },
    ],
    gsm: null,
    count: 32,
    width: null,
    moq: yarnMoq,
    lead: [25, 35],
    image: "yarnCones",
  },
  {
    slug: "cotton-poplin-110",
    name: "Tenuva Poplin 110",
    category: "woven",
    composition: [{ fiber: "cotton", pct: 100 }],
    gsm: 115,
    width: 150,
    moq: fabricMoq(),
    lead: [30, 45],
    image: "cottonWhite",
  },
  {
    slug: "cotton-twill-240",
    name: "Tenuva Twill 240",
    category: "denim",
    composition: [{ fiber: "cotton", pct: 100 }],
    gsm: 240,
    width: 150,
    moq: fabricMoq(),
    lead: [30, 45],
    image: "twill",
  },
  {
    slug: "tc-uniform-twill",
    name: "Tenuva Workline TC Twill",
    category: "woven",
    composition: [
      { fiber: "polyester", pct: 65 },
      { fiber: "cotton", pct: 35 },
    ],
    gsm: 210,
    width: 150,
    moq: fabricMoq(1500),
    lead: [30, 45],
    image: "cotton",
  },
  {
    slug: "linen-blend-180",
    name: "Tenuva Linea Linen Blend",
    category: "woven",
    composition: [
      { fiber: "linen", pct: 55 },
      { fiber: "cotton", pct: 45 },
    ],
    gsm: 180,
    width: 145,
    moq: fabricMoq(),
    lead: [35, 50],
    image: "linen",
  },
  {
    slug: "rayon-challis-120",
    name: "Tenuva Drape Rayon Challis",
    category: "woven",
    composition: [{ fiber: "rayon", pct: 100 }],
    gsm: 120,
    width: 145,
    moq: fabricMoq(),
    lead: [30, 45],
    image: "rayon",
  },
  {
    slug: "sheeting-t300",
    name: "Tenuva Rest Cotton Sheeting",
    category: "woven",
    composition: [{ fiber: "cotton", pct: 100 }],
    gsm: 140,
    width: 240,
    moq: fabricMoq(1500),
    lead: [35, 50],
    image: "bedding",
  },
  {
    slug: "denim-indigo-12oz",
    name: "Tenuva Indigo 12oz Denim",
    category: "denim",
    composition: [{ fiber: "cotton", pct: 100 }],
    gsm: 400,
    width: 150,
    moq: fabricMoq(1500),
    lead: [40, 55],
    image: "denimIndigo",
  },
  {
    slug: "denim-stretch-10oz",
    name: "Tenuva Flex 10oz Stretch Denim",
    category: "denim",
    composition: [
      { fiber: "cotton", pct: 98 },
      { fiber: "elastane", pct: 2 },
    ],
    gsm: 340,
    width: 145,
    moq: fabricMoq(1500),
    lead: [40, 55],
    image: "denimMid",
  },
  {
    slug: "jersey-single-160",
    name: "Tenuva Single Jersey 160",
    category: "knit",
    composition: [{ fiber: "cotton", pct: 100 }],
    gsm: 160,
    width: 180,
    moq: fabricMoq(),
    lead: [25, 40],
    image: "knitWhite",
  },
  {
    slug: "pique-polo-220",
    name: "Tenuva Pique Polo Knit",
    category: "knit",
    composition: [
      { fiber: "cotton", pct: 60 },
      { fiber: "polyester", pct: 40 },
    ],
    gsm: 220,
    width: 175,
    moq: fabricMoq(),
    lead: [30, 45],
    image: "knitBeige",
  },
  {
    slug: "fleece-brushed-280",
    name: "Tenuva Brushed Fleece 280",
    category: "knit",
    composition: [
      { fiber: "cotton", pct: 80 },
      { fiber: "polyester", pct: 20 },
    ],
    gsm: 280,
    width: 175,
    moq: fabricMoq(),
    lead: [30, 45],
    image: "fleece",
  },
  {
    slug: "dryfit-mesh-130",
    name: "Tenuva Active Dry Mesh",
    category: "technical",
    composition: [{ fiber: "polyester", pct: 100 }],
    gsm: 130,
    width: 160,
    moq: fabricMoq(),
    lead: [30, 45],
    image: "mesh",
  },
  {
    slug: "fr-workwear-260",
    name: "Tenuva Shield Flame-Retardant Twill",
    category: "technical",
    composition: [{ fiber: "frBlend" }],
    gsm: 260,
    width: 150,
    moq: fabricMoq(2000),
    lead: [45, 60],
    image: "technical",
  },
];

export const CATEGORIES: ("all" | Category)[] = ["all", "yarn", "woven", "knit", "denim", "technical"];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export function relatedProducts(slug: string, n = 3): Product[] {
  const current = getProduct(slug);
  if (!current) return PRODUCTS.slice(0, n);
  const same = PRODUCTS.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = PRODUCTS.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...same, ...rest].slice(0, n);
}
