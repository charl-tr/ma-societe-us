"use client";

import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/sections/Services";
import { StatesMap } from "@/components/sections/StatesMap";
import { Testimonials } from "@/components/sections/Testimonials";
import { Process } from "@/components/sections/Process";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <StatesMap />
      <Testimonials />
      <Process />
      <CTASection />
    </main>
  );
}
