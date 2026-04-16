"use client";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col overflow-hidden">
      {/* Deep cinematic background */}
      <div className="absolute inset-0 bg-[#0e0d0b]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_25%,rgba(50,35,15,0.9),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_75%_75%,rgba(35,25,10,0.5),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_25%_at_50%_0%,rgba(180,140,60,0.04),transparent_50%)]" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 lg:px-10 pt-24 pb-20">

        <p
          className="text-[10px] uppercase tracking-[0.4em] mb-8"
          style={{ color: "rgba(240,232,220,0.28)", fontFamily: "var(--font-body)" }}
        >
          Cabinet Franco-Américain · Depuis 2014
        </p>

        <h1
          className="text-[clamp(2.8rem,7vw,76px)] leading-[0.98] max-w-3xl"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 300, letterSpacing: "-0.01em", color: "#f0e8dc" }}
        >
          Créer une société aux USA
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 400, color: "#b89550" }}>
            jusqu&apos;à 0% d&apos;imposition
          </em>
        </h1>

        <p
          className="mt-7 text-[15px] lg:text-[17px] leading-relaxed max-w-md"
          style={{ color: "rgba(240,232,220,0.38)" }}
        >
          Nous vous accompagnons pour créer une société aux États-Unis — 100% légal, 100% à distance.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="https://calendly.com/ypls/decouverte-site"
            className="inline-flex items-center px-8 py-3.5 text-[12px] uppercase tracking-[0.12em] font-medium text-[#0e0d0b] transition-all duration-300 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #b89550, #c8a456)" }}
          >
            Entretien découverte — 15 min
          </a>
          <a
            href="https://formations.ma-societe-us.com/formation-gratuite-llc-site"
            className="inline-flex items-center px-7 py-3.5 text-[12px] uppercase tracking-[0.1em] transition-all duration-300"
            style={{ color: "rgba(240,232,220,0.35)", border: "1px solid rgba(240,232,220,0.1)" }}
          >
            Formation gratuite LLC →
          </a>
        </div>

        <p
          className="mt-6 text-[11px] uppercase tracking-[0.15em]"
          style={{ color: "rgba(240,232,220,0.14)" }}
        >
          Gratuit · Sans engagement · Réponse sous 24h
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0e0d0b] to-transparent" />
    </section>
  );
}
