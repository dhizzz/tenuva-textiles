import type { ImageKey } from "./images";

export interface Industry {
  slug: string;
  image: ImageKey;
  products: string[];
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "garment",
    image: "garment",
    products: ["cotton-poplin-110", "cotton-twill-240", "jersey-single-160", "pique-polo-220"],
  },
  {
    slug: "fashion",
    image: "swatchFabrics",
    products: ["linen-blend-180", "rayon-challis-120", "denim-stretch-10oz", "cotton-poplin-110"],
  },
  {
    slug: "uniforms",
    image: "uniform",
    products: ["tc-uniform-twill", "cotton-twill-240", "fr-workwear-260", "tc-blend-yarn-32s"],
  },
  {
    slug: "home",
    image: "bedding",
    products: ["sheeting-t300", "linen-blend-180", "cotton-poplin-110"],
  },
  {
    slug: "automotive",
    image: "car",
    products: ["fr-workwear-260", "polyester-spun-40s", "tc-uniform-twill"],
  },
  {
    slug: "medical",
    image: "whiteRolls",
    products: ["sheeting-t300", "tc-uniform-twill", "polyester-spun-40s"],
  },
];
