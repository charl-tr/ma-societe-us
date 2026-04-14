"use client";

import { HERO } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative min-h-dvh min-h-[600px] max-h-[1100px] flex flex-col overflow-hidden">
      {/* Abstract background — US color codes */}
      <div className="absolute inset-0 bg-[#0a1628]" />

      {/* Animated gradient orbs */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #1e56a0 0%, transparent 70%)",
          top: "-20%",
          right: "-15%",
          animation: "float1 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #c0392b 0%, transparent 70%)",
          bottom: "-10%",
          left: "-10%",
          animation: "float2 25s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[80px]"
        style={{
          background: "radial-gradient(circle, #ffffff 0%, transparent 60%)",
          top: "30%",
          left: "40%",
          animation: "float3 18s ease-in-out infinite",
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content — centered, conversion-first */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 lg:px-10">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
          <span className="text-[12px] text-white/50">500+ sociétés créées depuis 2014</span>
        </div>

        <h1
          className="text-[clamp(2.4rem,5.5vw,64px)] leading-[1.08] font-normal text-white max-w-4xl tracking-tight whitespace-pre-line"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          {HERO.headline}
        </h1>

        <p className="mt-6 text-[15px] lg:text-[17px] leading-relaxed text-white/50 max-w-md">
          {HERO.subline}
        </p>

        {/* Double CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 rounded-full text-[15px] font-medium transition-all duration-300 bg-white text-[#0a1628] hover:bg-white/90 shadow-[0_4px_24px_rgba(255,255,255,0.15)]"
          >
            {HERO.cta}
          </a>
          <a
            href="/services/pack-llc"
            className="inline-flex items-center px-6 py-3.5 text-[14px] text-white/55 hover:text-white border border-white/[0.1] rounded-full hover:border-white/25 transition-all bg-white/[0.04] backdrop-blur-sm"
          >
            {HERO.ctaSecondary}
          </a>
        </div>

        {/* Trust micro-copy */}
        <p className="mt-5 text-[11px] text-white/25 tracking-wide">
          Gratuit · Sans engagement · Réponse sous 24h
        </p>
      </div>

      {/* Bottom bar — glass, centered states */}
      <div
        className="relative z-10 border-t border-white/[0.06]"
        style={{
          background: "linear-gradient(180deg, rgba(10,22,40,0.3), rgba(220,228,240,0.6))",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="px-6 lg:px-10 py-4 flex items-center justify-center gap-8 sm:gap-14 text-[12px] sm:text-[13px] text-[#1a2a40]/40">
          <span>Nouveau-Mexique</span>
          <span>Colorado</span>
          <span>Wyoming</span>
          <span>Delaware</span>
        </div>
      </div>

      {/* Keyframe animations for orbs */}
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.05); }
          66% { transform: translate(20px, -20px) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.08); }
          66% { transform: translate(-20px, 20px) scale(0.92); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, -30px) scale(1.1); }
        }
      `}</style>
    </section>
  );
}
