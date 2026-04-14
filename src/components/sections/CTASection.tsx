"use client";

import Image from "next/image";
import { STATS } from "@/lib/constants";

export function CTASection() {
  return (
    <>
      {/* Final CTA — cinematic image, the one dark moment */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <Image
          src="/nyc-building.jpg"
          alt=""
          fill
          className="object-cover"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/75 to-[#0a1628]/40" />

        <div className="relative z-10 px-6 lg:px-10 py-[80px] max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/35 mb-5">
            Prêt ?
          </p>
          <h2
            className="text-[clamp(1.8rem,4vw,44px)] leading-[1.1] font-normal tracking-tight text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            15 minutes pour changer
            <br />
            votre fiscalité.
          </h2>
          <p className="mt-5 text-[15px] text-white/50 leading-relaxed">
            Entretien gratuit, sans engagement. On analyse votre situation
            et on vous dit si une LLC fait sens pour vous — honnêtement.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
            <a
              href="/contact"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-[14px] font-medium transition-all"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(230,235,245,0.9))",
                color: "#1a2a40",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              Réserver mon créneau gratuit
            </a>
            <span className="text-[13px] text-white/25 self-center">
              Réponse sous 24h
            </span>
          </div>
        </div>
      </section>

      {/* Stats bar — glass strip */}
      <section
        className="border-t border-white/30"
        style={{ background: "linear-gradient(180deg, rgba(225,232,242,0.5), rgba(237,241,246,0.3))", backdropFilter: "blur(8px)" }}
      >
        <div className="px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between py-7 lg:py-9 gap-y-4 max-w-[1200px] mx-auto">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                <span
                  className="text-[clamp(1.3rem,2.5vw,1.8rem)] font-normal tracking-tight text-[#2a5090]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </span>
                <span className="text-[13px] text-[#1a2a40]/25">{stat.label}</span>
                {i < STATS.length - 1 && (
                  <span className="hidden lg:block w-px h-4 bg-[#1a2a40]/[0.06] ml-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
