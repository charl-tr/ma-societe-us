"use client";

import { INTRO, ADVANTAGES } from "@/lib/constants";

export function Services() {
  return (
    <>
      {/* Section 2 — ProductSizzle equivalent: big text + intro (light bg) */}
      <section className="bg-[#FAFAF9] text-[#002868] py-[120px] lg:py-[180px]">
        <div className="px-6 lg:px-10 max-w-4xl">
          <h2
            className="text-[clamp(1.8rem,4vw,48px)] leading-[1.15] font-normal tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {INTRO.headline}
          </h2>
          <p className="mt-10 text-[17px] leading-relaxed text-[#002868]/60 max-w-2xl">
            {INTRO.body}
          </p>
        </div>
      </section>

      {/* Section 3 — UseCaseTicker equivalent: horizontal scrolling tags (light bg) */}
      <section id="offre" className="bg-[#FAFAF9] text-[#002868] pb-[120px] lg:pb-[180px]">
        <div className="px-6 lg:px-10">
          <p className="text-[13px] uppercase tracking-[0.15em] text-[#002868]/40 mb-10">
            Avantages à créer une LLC
          </p>
          <div className="flex flex-wrap gap-3">
            {ADVANTAGES.map((adv) => (
              <span
                key={adv}
                className="inline-flex items-center px-5 py-2.5 rounded-full border border-[#002868]/10 text-[15px] text-[#002868]/80 hover:bg-[#002868]/[0.03] transition-colors cursor-default"
              >
                {adv}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
