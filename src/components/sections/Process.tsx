"use client";

import { OFFER } from "@/lib/constants";

export function Process() {
  return (
    // Section 4 — CaseStudy/Offer equivalent (dark bg like Harvey)
    <section className="bg-[#141210] text-[#FAFAF9] py-[120px] lg:py-[180px]">
      <div className="px-6 lg:px-10">
        <p className="text-[13px] uppercase tracking-[0.15em] text-[#FAFAF9]/40 mb-6">
          Notre offre exclusive
        </p>
        <h2
          className="text-[clamp(1.8rem,4vw,48px)] leading-[1.15] font-normal tracking-tight max-w-2xl mb-16"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Un package complet, transparent
          <br />
          et sans surcoûts.
        </h2>

        {/* 3 columns — like Harvey case study cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {OFFER.map((item) => (
            <div
              key={item.title}
              className="bg-[#141210] p-8 lg:p-10 hover:bg-white/[0.02] transition-colors duration-300"
            >
              <h3
                className="text-[20px] font-normal mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {item.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-[#FAFAF9]/50">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
