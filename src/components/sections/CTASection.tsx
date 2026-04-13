"use client";

import Image from "next/image";
import { STATS } from "@/lib/constants";

export function CTASection() {
  return (
    <>
      {/* Stats — dark section */}
      <section className="bg-[#141210] text-[#FAFAF9] py-[100px] lg:py-[144px] border-t border-white/[0.06]">
        <div className="px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <span
                  className="text-[clamp(2.5rem,5vw,64px)] font-normal tracking-tight text-[#D4A528]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </span>
                <p className="mt-2 text-[14px] text-[#FAFAF9]/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — with NYC building image */}
      <section id="contact" className="relative min-h-[70vh] flex items-center overflow-hidden">
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
              href="#contact"
              className="inline-flex items-center bg-[#FAFAF9] text-[#1A1408] px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#F2F1F0] transition-colors"
            >
              Réservez votre entretien découverte
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
