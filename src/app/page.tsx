"use client";

import { Hero } from "@/components/hero/Hero";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Testimonials />
      <CTASection />
    </main>
  );
}
