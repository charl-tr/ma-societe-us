"use client";

import { TESTIMONIAL } from "@/lib/constants";

export function Testimonials() {
  return (
    <section
      className="py-[80px] lg:py-[120px]"
      style={{ background: "linear-gradient(180deg, rgba(220,228,240,0.3), rgba(237,241,246,0.15))" }}
    >
      <div className="px-6 lg:px-10 max-w-4xl mx-auto text-center">
        <p className="text-[13px] uppercase tracking-[0.15em] text-[#1a2a40]/25 mb-12">
          Avis clients
        </p>
        <blockquote
          className="text-[clamp(1.4rem,3vw,32px)] leading-[1.3] font-normal text-[#1a2a40]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          &laquo;&nbsp;{TESTIMONIAL.quote}&nbsp;&raquo;
        </blockquote>
        <p className="mt-8 text-[15px] text-[#1a2a40]/40">
          {TESTIMONIAL.author}
        </p>
      </div>
    </section>
  );
}
