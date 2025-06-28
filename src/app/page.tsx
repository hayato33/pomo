"use client";

import { HeroSection } from "@/app/(public)/(top)/_components/HeroSection";
import { PainPointsSection } from "@/app/(public)/(top)/_components/PainPointsSection";
import { FeaturesSection } from "@/app/(public)/(top)/_components/FeaturesSection";
import { FaqSection } from "@/app/(public)/(top)/_components/FaqSection";
import { CtaSection } from "@/app/(public)/(top)/_components/CtaSection";

export default function Page() {
  return (
    <>
      <HeroSection />
      <PainPointsSection />
      <FeaturesSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
