"use client";

import Image from "next/image";
import { HERO } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative h-dvh min-h-[600px] max-h-[1000px] flex flex-col">
      <Image
        src="/hero-suits.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        quality={90}
      />

      {/* Cold blue overlay — misty, fading to glass bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a2a40]/60 via-[#1a2a40]/40 to-[#DDE3EC]/95" />
      <div className="absolute inset-0 bg-[#2a5090]/[0.08] mix-blend-overlay" />

      {/* Content — CENTERED for conversion focus */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 lg:px-10 pb-16">
        <h1
          className="text-[clamp(2.6rem,6vw,68px)] leading-[1.05] font-normal text-white max-w-4xl tracking-tight whitespace-pre-line"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.0175em" }}
        >
          {HERO.headline}
        </h1>

        <p className="mt-6 text-[16px] lg:text-[18px] leading-relaxed text-white/60 max-w-lg">
          {HERO.subline}
        </p>

        {/* Double CTA — DR style */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 rounded-full text-[15px] font-medium transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(230,235,245,0.9))",
              color: "#1a2a40",
              boxShadow: "0 4px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            {HERO.cta}
          </a>
          <a
            href="/services/pack-llc"
            className="inline-flex items-center px-6 py-3 text-[14px] text-white/60 hover:text-white border border-white/15 rounded-full hover:border-white/30 transition-all bg-white/[0.06] backdrop-blur-sm"
          >
            {HERO.ctaSecondary}
          </a>
        </div>

        {/* Trust micro-copy */}
        <p className="mt-5 text-[12px] text-white/30">
          Gratuit · Sans engagement · Réponse sous 24h
        </p>
      </div>

      {/* Bottom bar — glass */}
      <div
        className="relative z-10 border-t border-white/10"
        style={{
          background: "linear-gradient(180deg, rgba(220,228,240,0.4), rgba(230,235,245,0.7))",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="px-6 lg:px-10 py-4 flex items-center justify-center gap-8 sm:gap-12 text-[12px] sm:text-[13px] text-[#1a2a40]/35">
          <span>Nouveau-Mexique</span>
          <span>Colorado</span>
          <span>Wyoming</span>
          <span>Delaware</span>
        </div>
      </div>
    </section>
  );
}
