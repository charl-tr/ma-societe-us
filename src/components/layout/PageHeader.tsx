"use client";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-20 overflow-hidden">
      {/* Misty gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#DDE3EC] via-[#E8ECF2] to-[#EDF1F6]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(255,255,255,0.7),transparent)]" />

      <div className="relative z-10 px-6 lg:px-10 max-w-[1200px] mx-auto">
        <h1
          className="text-[clamp(2rem,4.5vw,52px)] leading-[1.1] font-normal text-[#1a2a40] max-w-3xl tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-[16px] text-[#1a2a40]/45 max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
