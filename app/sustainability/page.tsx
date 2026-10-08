import type { Metadata } from "next";
import { SustainabilityView } from "@/components/sections/SustainabilityView";

export const metadata: Metadata = {
  title: "Sustainability",
  description: "Water, energy and people: how Tenuva works toward better cloth with a lighter footprint.",
};

export default function SustainabilityPage() {
  return <SustainabilityView />;
}
