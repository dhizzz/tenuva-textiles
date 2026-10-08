import type { Metadata } from "next";
import { IndustriesView } from "@/components/sections/IndustriesView";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Tenuva supplies garment manufacturers, fashion brands, uniform makers, home textile producers, automotive and medical textile buyers.",
};

export default function IndustriesPage() {
  return <IndustriesView />;
}
