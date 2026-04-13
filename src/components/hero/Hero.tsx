"use client";

import Image from "next/image";
import { HERO } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative h-dvh min-h-[600px] max-h-[1000px] flex flex-col">
      {/* Background image */}
      <Image
        src="/hero-suits.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        quality={90}
      />

      {/* Navy cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/92 via-[#0A1628]/55 to-[#0A1628]/65" />
      {/* Subtle cool tint */}
      <div className="absolute inset-0 bg-[#002868]/[0.10] mix-blend-overlay" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 lg:px-10 pb-24 lg:pb-32">
        <h1
          className="text-[clamp(2.8rem,6.5vw,72px)] leading-[1.05] font-normal text-white max-w-3xl tracking-tight whitespace-pre-line"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.0175em" }}
        >
          {HERO.headline}
        </h1>

        <p className="mt-8 text-[17px] lg:text-[19px] leading-relaxed text-white/60 max-w-lg">
          {HERO.subline}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
          <a
            href="/contact"
            className="inline-flex items-center bg-white text-[#0A1628] px-8 py-4 rounded-full text-[15px] font-medium hover:bg-white/90 transition-colors"
          >
            {HERO.cta}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/[0.08] bg-[#0A1628]/40 backdrop-blur-sm">
        <div className="px-6 lg:px-10 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-8 text-[12px] sm:text-[13px] text-white/40">
            <span>NM</span>
            <span>CO</span>
            <span>WY</span>
            <span>DE</span>
          </div>
          <a
            href="/services/pack-llc"
            className="text-[13px] text-white/60 hover:text-white border border-white/10 px-4 py-2 rounded-full transition-colors"
          >
            Découvrir notre offre
          </a>
        </div>
      </div>
    </section>
  );
}
