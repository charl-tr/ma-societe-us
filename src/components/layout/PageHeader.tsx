"use client";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-20 overflow-hidden">
      {/* Misty gradient background — new DA */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #eef3f9 0%, #e4ecf6 40%, #f2f6fb 100%)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,255,255,0.65), transparent)",
        }}
      />
      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #2a4a70 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 px-6 lg:px-10 max-w-[1200px] mx-auto">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#2a5090]/45 mb-5">
          {subtitle ? "" : ""}
        </p>
        <h1
          className="text-[clamp(2rem,4.5vw,52px)] leading-[1.05] font-bold text-[#0e1e38] max-w-3xl tracking-[-0.025em]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-[16px] text-[#0e1e38]/45 max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
