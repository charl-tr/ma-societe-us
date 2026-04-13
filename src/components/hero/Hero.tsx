"use client";

import Image from "next/image";
import { HERO } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative h-dvh min-h-[600px] max-h-[1000px] flex flex-col">
      {/* Background image — NYC street level */}
      <Image
        src="/hero-suits.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        quality={90}
      />

      {/* Cinematic warm overlay — golden hour grade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1408]/90 via-[#1A1408]/50 to-[#1A1408]/30" />
      {/* Warm amber tint */}
      <div className="absolute inset-0 bg-[#C4890A]/[0.08] mix-blend-overlay" />

      {/* Content — low positioned like Harvey */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 lg:px-10 pb-24 lg:pb-32">
        {/* Headline */}
        <h1
          className="text-[clamp(3rem,7vw,80px)] leading-[1.05] font-normal text-[#FAFAF9] max-w-3xl tracking-tight"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.0175em" }}
        >
          Créer une société
          <br />
          aux USA.
        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-[17px] lg:text-[19px] leading-relaxed text-[#FAFAF9]/60 max-w-lg">
          {HERO.subline}
        </p>

        {/* CTA — Harvey pill style */}
        <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
          <a
            href="#contact"
            className="inline-flex items-center bg-[#FAFAF9] text-[#1A1408] px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#F2F1F0] transition-colors"
          >
            {HERO.cta}
          </a>
        </div>
      </div>

      {/* Bottom bar — states + secondary CTA */}
      <div className="relative z-10 border-t border-white/[0.08] bg-[#1A1408]/40 backdrop-blur-sm">
        <div className="px-6 lg:px-10 py-5 flex items-center justify-between">
          <div className="flex items-center gap-10 text-[13px] text-[#FAFAF9]/40">
            <span>Nouveau-Mexique</span>
            <span className="hidden sm:inline">Colorado</span>
            <span className="hidden sm:inline">Wyoming</span>
            <span className="hidden md:inline">Delaware</span>
          </div>
          <a
            href="#offre"
            className="text-[13px] text-[#FAFAF9]/60 hover:text-[#FAFAF9] border border-white/10 px-4 py-2 rounded-full transition-colors"
          >
            Découvrir notre offre
          </a>
        </div>
      </div>
    </section>
  );
}
