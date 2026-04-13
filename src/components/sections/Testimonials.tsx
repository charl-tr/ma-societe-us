"use client";

import { TESTIMONIAL } from "@/lib/constants";

export function Testimonials() {
  return (
    <section className="bg-[#F2F1F0] text-[#002868] py-[100px] lg:py-[144px]">
      <div className="px-6 lg:px-10 max-w-4xl mx-auto text-center">
        <p className="text-[13px] uppercase tracking-[0.15em] text-[#002868]/40 mb-12">
          Avis clients
        </p>
        <blockquote
          className="text-[clamp(1.4rem,3vw,32px)] leading-[1.3] font-normal"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          &laquo;&nbsp;{TESTIMONIAL.quote}&nbsp;&raquo;
        </blockquote>
        <p className="mt-8 text-[15px] text-[#002868]/50">
          {TESTIMONIAL.author}
        </p>
      </div>
    </section>
  );
}
