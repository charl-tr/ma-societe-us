"use client";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] min-h-[550px] flex flex-col overflow-hidden">
      {/* Misty background */}
      <div className="absolute inset-0 bg-[#E8ECF2]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(255,255,255,0.8),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_70%,rgba(255,255,255,0.4),transparent)]" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 lg:px-10 pt-20 pb-12">

        <h1
          className="text-[clamp(2rem,5vw,48px)] leading-[1.1] font-normal text-[#1a2a40] max-w-3xl tracking-tight"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          CRÉER UNE SOCIÉTÉ AUX USA
          <br />
          JUSQU&apos;À 0% D&apos;IMPOSITION !
        </h1>

        <p className="mt-5 text-[15px] lg:text-[17px] leading-relaxed text-[#1a2a40]/45 max-w-lg">
          Nous vous accompagnons pour créer une société aux USA 100% légale
        </p>

        {/* 2 CTAs — exact same as ma-societe-us.com */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <a
            href="https://calendly.com/ypls/decouverte-site"
            className="inline-flex items-center px-6 py-3 rounded-lg text-[14px] font-medium text-[#1a2a40] transition-all hover:shadow-[0_8px_24px_rgba(26,42,64,0.08)]"
            style={{
              background: "rgba(255,255,255,0.65)",
              border: "1px solid rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 16px rgba(26,42,64,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            Réservez votre entretien découverte de 15 minutes
          </a>
          <a
            href="https://formations.ma-societe-us.com/formation-gratuite-llc-site"
            className="inline-flex items-center px-6 py-3 rounded-lg text-[14px] text-[#1a2a40]/50 hover:text-[#1a2a40] transition-all"
            style={{
              border: "1px solid rgba(26,42,64,0.08)",
            }}
          >
            Téléchargez votre formation gratuite sur les LLC
          </a>
        </div>
      </div>
    </section>
  );
}
