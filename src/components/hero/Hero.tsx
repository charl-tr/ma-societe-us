"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", minHeight: "100vh" }}>

      {/* Image plein format */}
      <Image
        src="/NY_offices_2.jpg"
        alt="Cabinet New-York"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Overlay : dense à gauche, transparent à droite */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(14,13,11,0.88) 0%, rgba(14,13,11,0.70) 38%, rgba(14,13,11,0.30) 65%, rgba(14,13,11,0.05) 100%)",
        }}
      />
      {/* Vignette bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0e0d0b] to-transparent" />

      {/* Texte */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-20 max-w-[640px]">
        <p
          className="text-[10px] uppercase tracking-[0.4em] mb-8"
          style={{ color: "rgba(240,232,220,0.30)", fontFamily: "var(--font-body)" }}
        >
          Cabinet Franco-Américain · Depuis 2014
        </p>

        <h1
          className="text-[clamp(2.8rem,5.5vw,72px)] leading-[1.0]"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 400, color: "#f0e8dc", letterSpacing: "-0.01em" }}
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
          className="mt-7 text-[14px] leading-relaxed max-w-xs"
          style={{ color: "rgba(240,232,220,0.40)" }}
        >
          LLC créée en 3 semaines. 100% à distance.
          <br />
          500+ sociétés fondées depuis 2014.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
          <a
            href="https://calendly.com/ypls/decouverte-site"
            className="inline-flex items-center px-7 py-3.5 text-[12px] uppercase tracking-[0.12em] font-medium text-[#0e0d0b] transition-opacity hover:opacity-85"
            style={{ background: "linear-gradient(135deg, #b89550, #c8a456)" }}
          >
            Démarrer maintenant
          </a>
          <a
            href="https://formations.ma-societe-us.com/formation-gratuite-llc-site"
            className="inline-flex items-center px-6 py-3.5 text-[12px] uppercase tracking-[0.1em] transition-colors"
            style={{ color: "rgba(240,232,220,0.32)", border: "1px solid rgba(240,232,220,0.10)" }}
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
      </div>

    </section>
  );
}
