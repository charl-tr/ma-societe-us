"use client";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#0e0d0b]">

      {/* Grain texture subtil */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Warm light leak très subtil depuis le haut */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_0%,rgba(190,150,70,0.04),transparent_60%)]" />

      {/* Contenu centré */}
      <div className="relative z-10 text-center px-6 lg:px-10 max-w-[900px] mx-auto">

        {/* Eyebrow */}
        <p
          className="text-[10px] uppercase tracking-[0.5em] mb-12"
          style={{ color: "rgba(240,232,220,0.25)", fontFamily: "var(--font-body)", letterSpacing: "0.45em" }}
        >
          Cabinet Franco-Américain · Est. 2014
        </p>

        {/* Headline — Bodoni Moda grande taille */}
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 400,
            fontSize: "clamp(3.2rem, 8vw, 96px)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "#ede8e0",
          }}
        >
          Votre société
          <br />
          américaine.
        </h1>

        {/* Rule */}
        <div className="mx-auto mt-10 mb-10 w-12 h-px bg-[#f0e8dc]/15" />

        {/* Sous-titre sobre */}
        <p
          className="text-[16px] lg:text-[18px] leading-relaxed max-w-md mx-auto"
          style={{ color: "rgba(240,232,220,0.38)", fontFamily: "var(--font-body)", fontWeight: 300 }}
        >
          LLC créée en 3 semaines.
          Jusqu&apos;à 0&nbsp;% d&apos;imposition aux États-Unis.
          100&nbsp;% à distance.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://calendly.com/ypls/decouverte-site"
            className="inline-flex items-center px-8 py-3.5 text-[11px] uppercase tracking-[0.18em] font-medium transition-opacity hover:opacity-80"
            style={{
              background: "#ede8e0",
              color: "#0e0d0b",
            }}
          >
            Prendre rendez-vous
          </a>
          <a
            href="https://formations.ma-societe-us.com/formation-gratuite-llc-site"
            className="inline-flex items-center px-7 py-3.5 text-[11px] uppercase tracking-[0.15em] transition-colors hover:text-[#ede8e0]"
            style={{ color: "rgba(240,232,220,0.35)", border: "1px solid rgba(240,232,220,0.10)" }}
          >
            Formation gratuite →
          </a>
        </div>

        <p
          className="mt-7 text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "rgba(240,232,220,0.10)", fontFamily: "var(--font-body)" }}
        >
          Gratuit · Sans engagement
        </p>
      </div>

      {/* Fade bas */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0e0d0b] to-transparent" />
    </section>
  );
}
