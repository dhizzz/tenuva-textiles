import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, DM_Mono } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "@/components/layout/Providers";
import { Navbar, AnnouncementBar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { PageTransition } from "@/components/layout/PageTransition";
import { SkipLink } from "@/components/layout/SkipLink";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Tenuva Textiles | Woven with discipline.", template: "%s | Tenuva Textiles" },
  description:
    "Tenuva Textiles manufactures yarn, woven and knit fabrics for B2B customers across Asia Pacific.",
  openGraph: {
    type: "website",
    siteName: "Tenuva Textiles",
    title: "Tenuva Textiles | Woven with discipline.",
    description:
      "Tenuva Textiles manufactures yarn, woven and knit fabrics for B2B customers across Asia Pacific.",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#17204D" };

const preloadedScript = `try{if(sessionStorage.getItem("tenuva-preloaded")==="1")document.documentElement.setAttribute("data-preloaded","true")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} ${dmMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloadedScript }} />
      </head>
      <body>
        <Providers>
          <SkipLink />
          <Preloader />
          <PageTransition />
          <CustomCursor />
          <AnnouncementBar />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
