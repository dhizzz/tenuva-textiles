import type { Metadata } from "next";
import { ContactView } from "@/components/sections/ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a quote, request swatches or become a Tenuva partner. Business customers only. Replies within one business day.",
};

export default function ContactPage() {
  return <ContactView />;
}
