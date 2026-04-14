"use client";

import { INTRO, ADVANTAGES } from "@/lib/constants";

export function Services() {
  return (
    <>
      <section className="py-[100px] lg:py-[140px]">
        <div className="px-6 lg:px-10 max-w-4xl">
          <h2
            className="text-[clamp(1.8rem,4vw,48px)] leading-[1.15] font-normal tracking-tight text-[#1a2a40]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {INTRO.headline}
          </h2>
          <p className="mt-10 text-[17px] leading-relaxed text-[#1a2a40]/55 max-w-2xl">
            {INTRO.body}
          </p>
        </div>
      </section>

      <section id="offre" className="pb-[100px] lg:pb-[140px]">
        <div className="px-6 lg:px-10">
          <p className="text-[13px] uppercase tracking-[0.15em] text-[#2a5090]/40 mb-10">
            Avantages à créer une LLC
          </p>
          <div className="flex flex-wrap gap-3">
            {ADVANTAGES.map((adv) => (
              <span
                key={adv}
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/50 backdrop-blur-sm border border-white/60 text-[15px] text-[#1a2a40]/70 hover:bg-white/70 transition-colors cursor-default shadow-[0_2px_8px_rgba(0,40,104,0.03)]"
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
