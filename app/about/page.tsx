import type { Metadata } from "next";
import { AboutView } from "@/components/sections/AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tenuva started in 2006 with 40 shuttle looms in Majalaya. Today it runs an integrated textile mill in Bandung Regency.",
};

export default function AboutPage() {
  return <AboutView />;
}
