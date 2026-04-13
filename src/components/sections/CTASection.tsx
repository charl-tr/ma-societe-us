"use client";

import Image from "next/image";
import { STATS } from "@/lib/constants";

export function CTASection() {
  return (
    <>
      {/* Final CTA — cinematic image (the one dark section) */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="/nyc-building.jpg"
          alt=""
          fill
          className="object-cover"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 via-[#0A1628]/80 to-[#0A1628]/50" />

        <div className="relative z-10 px-6 lg:px-10 py-[80px] max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-5">
            Prêt ?
          </p>
          <h2
            className="text-[clamp(1.8rem,4vw,48px)] leading-[1.1] font-normal tracking-tight text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            15 minutes pour changer
            <br />
            votre fiscalité.
          </h2>
          <p className="mt-5 text-[16px] text-white/50 leading-relaxed">
            Entretien gratuit, sans engagement. On analyse votre situation
            et on vous dit si une LLC fait sens pour vous — honnêtement.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
            <a
              href="/contact"
              className="inline-flex items-center bg-white text-[#0A1628] px-7 py-3.5 rounded-full text-[14px] font-medium hover:bg-white/90 transition-colors"
            >
              Réserver mon créneau gratuit
            </a>
            <span className="text-[13px] text-white/30 self-center">
              Réponse sous 24h
            </span>
          </div>
        </div>
      </section>

      {/* Stats bar — white, subtle */}
      <section className="border-t border-[#0A1628]/[0.06]">
        <div className="px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between py-8 lg:py-10 gap-y-4">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                <span
                  className="text-[clamp(1.3rem,2.5vw,1.8rem)] font-normal tracking-tight text-[#002868]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </span>
                <span className="text-[13px] text-[#0A1628]/30">
                  {stat.label}
                </span>
                {i < STATS.length - 1 && (
                  <span className="hidden lg:block w-px h-4 bg-[#0A1628]/[0.08] ml-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
