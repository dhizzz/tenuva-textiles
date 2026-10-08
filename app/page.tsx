import { Hero } from "@/components/sections/Hero";
import { BandMarquee } from "@/components/sections/BandMarquee";
import { IntroStatement } from "@/components/sections/IntroStatement";
import { HorizontalProducts } from "@/components/sections/HorizontalProducts";
import { WhyTenuva } from "@/components/sections/WhyTenuva";
import { SwatchGallery } from "@/components/sections/SwatchGallery";
import { IndustriesTeaser } from "@/components/sections/IndustriesTeaser";
import { Process } from "@/components/sections/Process";
import { QualityBand } from "@/components/sections/QualityBand";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BandMarquee />
      <IntroStatement />
      <HorizontalProducts />
      <WhyTenuva />
      <SwatchGallery />
      <IndustriesTeaser />
      <Process />
      <QualityBand />
      <CtaBand />
    </>
  );
}
