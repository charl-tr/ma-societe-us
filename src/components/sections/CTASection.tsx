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
        {/* Warm cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1408]/90 via-[#1A1408]/80 to-[#1A1408]/50" />
        <div className="absolute inset-0 bg-[#C4890A]/[0.06] mix-blend-overlay" />

        <div className="relative z-10 px-6 lg:px-10 py-[100px] max-w-2xl">
          <h2
            className="text-[clamp(2rem,4.5vw,56px)] leading-[1.1] font-normal tracking-tight text-[#FAFAF9]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            N&apos;hésitez pas à nous
            <br />
            contacter pour toutes
            <br />
            questions.
          </h2>
          <p className="mt-6 text-[17px] text-[#FAFAF9]/50 leading-relaxed">
            Réservez votre entretien découverte de 15 minutes. Nous évaluons
            votre situation et vous orientons — sans engagement.
          </p>
          <div className="mt-10">
            <a
              href="/contact"
              className="inline-flex items-center bg-[#FAFAF9] text-[#1A1408] px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#F2F1F0] transition-colors"
            >
              Réservez votre entretien découverte
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar — understated, institutional */}
      <section className="bg-[#0F0E0D] border-t border-white/[0.06]">
        <div className="px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between py-10 lg:py-12 gap-y-6">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                <span
                  className="text-[clamp(1.5rem,3vw,2.2rem)] font-normal tracking-tight text-[#FAFAF9]/80"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </span>
                <span className="text-[13px] text-[#FAFAF9]/25">
                  {stat.label}
                </span>
                {i < STATS.length - 1 && (
                  <span className="hidden lg:block w-px h-5 bg-[#FAFAF9]/[0.06] ml-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
