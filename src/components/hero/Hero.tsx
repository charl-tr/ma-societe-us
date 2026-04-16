"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex overflow-hidden">
      {/* ── LEFT : texte ── */}
      <div className="relative z-10 flex flex-col justify-center px-8 lg:px-16 py-28 w-full lg:w-[52%] bg-[#0e0d0b]">

        <p
          className="text-[10px] uppercase tracking-[0.4em] mb-10"
          style={{ color: "rgba(240,232,220,0.25)", fontFamily: "var(--font-body)" }}
        >
          Cabinet Franco-Américain · Depuis 2014
        </p>

        <h1
          className="text-[clamp(2.6rem,5.5vw,64px)] leading-[1.0]"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 300, color: "#f0e8dc", letterSpacing: "-0.01em" }}
        >
          Votre société
          <br />
          américaine.
          <br />
          <span style={{ color: "#b89550" }}>
            Jusqu&apos;à 0%
            <br />
            d&apos;imposition.
          </span>
        </h1>

        <p
          className="mt-8 text-[14px] leading-relaxed max-w-sm"
          style={{ color: "rgba(240,232,220,0.38)", fontFamily: "var(--font-body)" }}
        >
          LLC créée en 3 semaines. 100% à distance.
          <br />
          500+ sociétés fondées depuis 2014.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
          <a
            href="https://calendly.com/ypls/decouverte-site"
            className="inline-flex items-center px-7 py-3.5 text-[12px] uppercase tracking-[0.12em] font-medium text-[#0e0d0b] transition-opacity duration-300 hover:opacity-85"
            style={{ background: "linear-gradient(135deg, #b89550, #c8a456)" }}
          >
            Démarrer maintenant
          </a>
          <a
            href="https://formations.ma-societe-us.com/formation-gratuite-llc-site"
            className="inline-flex items-center px-6 py-3.5 text-[12px] uppercase tracking-[0.1em] transition-colors duration-300"
            style={{ color: "rgba(240,232,220,0.32)", border: "1px solid rgba(240,232,220,0.09)" }}
          >
            Formation gratuite →
          </a>
        </div>

        <p
          className="mt-6 text-[10px] uppercase tracking-[0.15em]"
          style={{ color: "rgba(240,232,220,0.12)" }}
        >
          Gratuit · Sans engagement
        </p>

        {/* Fade vers la droite sur desktop */}
        <div className="hidden lg:block absolute top-0 right-0 w-24 h-full bg-gradient-to-r from-transparent to-[#0e0d0b] z-20 pointer-events-none" />
      </div>

      {/* ── RIGHT : photo ── */}
      <div className="hidden lg:block absolute top-0 right-0 w-[52%] h-full">
        {/* Fade gauche */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0e0d0b] to-transparent z-10 pointer-events-none" />
        {/* Vignette top/bottom */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0e0d0b] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0e0d0b] to-transparent z-10 pointer-events-none" />

        <Image
          src="/NYC_offices.jpg"
          alt="Cabinet New-York"
          fill
          className="object-cover object-center"
          style={{ opacity: 0.75 }}
          priority
        />
      </div>

      {/* Mobile : image en fond */}
      <div className="lg:hidden absolute inset-0">
        <div className="absolute inset-0 bg-[#0e0d0b]/80 z-[1]" />
        <Image
          src="/NYC_offices.jpg"
          alt="Cabinet New-York"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </section>
  );
}
