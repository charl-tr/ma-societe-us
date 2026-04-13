"use client";

import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative bg-[#0F0E0D] pt-32 lg:pt-40 pb-16 lg:pb-24 overflow-hidden">
      {/* NYC background image with heavy overlay */}
      <Image
        src="/hero-nyc.jpg"
        alt=""
        fill
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0E0D]/60 to-[#0F0E0D]" />

      <div className="relative z-10 px-6 lg:px-10">
        <h1
          className="text-[clamp(2.2rem,5vw,56px)] leading-[1.1] font-normal text-[#FAFAF9] max-w-3xl tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-[17px] text-[#FAFAF9]/50 max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
