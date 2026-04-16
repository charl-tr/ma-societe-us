"use client";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col overflow-hidden">
      {/* NYC cinematic background — warm amber gradient */}
      <div className="absolute inset-0 bg-[#131110]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(60,40,20,0.8),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(80,50,20,0.4),transparent_50%)]" />
      {/* Subtle warm light leak from top */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_0%,rgba(200,160,80,0.08),transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 lg:px-10 pt-20 pb-16">
        {/* Small label */}
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#c8a050]/60 mb-6">
          Cabinet franco-américain · Depuis 2014
        </p>

        <h1
          className="text-[clamp(2.6rem,6.5vw,68px)] leading-[1.0] text-[#f0e8dc] max-w-3xl"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 300, letterSpacing: "-0.01em" }}
        >
          Créer une société aux USA
          <br />
          <em className="not-italic text-[#c8a050]" style={{ fontStyle: "italic", fontWeight: 400 }}>jusqu&apos;à 0% d&apos;imposition</em>
        </h1>

        <p className="mt-6 text-[16px] lg:text-[18px] leading-relaxed text-[#f0e8dc]/40 max-w-lg">
          Nous vous accompagnons pour créer une société aux USA 100% légale, 100% à distance.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="https://calendly.com/ypls/decouverte-site"
            className="inline-flex items-center px-7 py-3.5 rounded text-[14px] uppercase tracking-[0.08em] font-medium text-[#131110] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(200,160,80,0.3)]"
            style={{
              background: "linear-gradient(135deg, #c8a050, #d4b060)",
            }}
          >
            Entretien découverte — 15 min
          </a>
          <a
            href="https://formations.ma-societe-us.com/formation-gratuite-llc-site"
            className="inline-flex items-center px-7 py-3.5 rounded text-[14px] text-[#f0e8dc]/45 hover:text-[#c8a050] transition-all duration-300 border border-[#f0e8dc]/10 hover:border-[#c8a050]/30"
          >
            Formation gratuite LLC →
          </a>
        </div>

        {/* Trust line */}
        <p className="mt-6 text-[12px] text-[#f0e8dc]/20">
          Gratuit · Sans engagement · Réponse sous 24h
        </p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#131110] to-transparent" />
    </section>
  );
}
