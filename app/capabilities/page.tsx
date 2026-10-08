import type { Metadata } from "next";
import { CapabilitiesView } from "@/components/sections/CapabilitiesView";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Spinning, weaving, knitting, dyeing, finishing and quality testing under one roof, from fiber to finished roll.",
};

export default function CapabilitiesPage() {
  return <CapabilitiesView />;
}
