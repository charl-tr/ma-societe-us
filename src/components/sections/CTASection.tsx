"use client";

import Image from "next/image";
import { STATS } from "@/lib/constants";

export function CTASection() {
  return (
    <>
      {/* Final CTA — with NYC building image */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <Image
          src="/nyc-building.jpg"
          alt=""
          fill
          className="object-cover"
          quality={85}
        />
        {/* Navy cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#002868]/92 via-[#002868]/80 to-[#002868]/50" />
        <div className="absolute inset-0 bg-[#002868]/[0.08] mix-blend-overlay" />

        <div className="relative z-10 px-6 lg:px-10 py-[100px] max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/30 mb-6">
            Prêt ?
          </p>
          <h2
            className="text-[clamp(2rem,4.5vw,52px)] leading-[1.1] font-normal tracking-tight text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            15 minutes pour changer
            <br />
            votre fiscalité.
          </h2>
          <p className="mt-6 text-[17px] text-white/50 leading-relaxed">
            Entretien gratuit, sans engagement. On analyse votre situation
            et on vous dit si une LLC fait sens pour vous — honnêtement.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
            <a
              href="/contact"
              className="inline-flex items-center bg-white text-[#002868] px-8 py-4 rounded-full text-[15px] font-medium hover:bg-white/90 transition-colors"
            >
              Réserver mon créneau gratuit
            </a>
            <span className="text-[13px] text-white/30 self-center">
              Réponse sous 24h
            </span>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#002868] border-t border-white/[0.06]">
        <div className="px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between py-10 lg:py-12 gap-y-6">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                <span
                  className="text-[clamp(1.5rem,3vw,2.2rem)] font-normal tracking-tight text-white/80"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </span>
                <span className="text-[13px] text-white/25">
                  {stat.label}
                </span>
                {i < STATS.length - 1 && (
                  <span className="hidden lg:block w-px h-5 bg-white/[0.08] ml-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
