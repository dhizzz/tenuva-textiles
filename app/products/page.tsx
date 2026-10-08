import type { Metadata } from "next";
import { ProductsView } from "@/components/products/ProductsView";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The Tenuva range: combed and blended yarns, woven, knit, denim, twill and technical fabrics for business customers only.",
};

export default function ProductsPage() {
  return <ProductsView />;
}
