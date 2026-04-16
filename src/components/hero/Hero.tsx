"use client";

const C = {
  bg: "rgb(22, 24, 29)",
  text: "rgb(242, 242, 242)",
  accent: "rgb(52, 211, 153)",
  muted: "rgba(242, 242, 242, 0.5)",
  dim: "rgba(242, 242, 242, 0.3)",
  border: "rgba(255, 255, 255, 0.06)",
};

export function Hero() {
  return (
    <section className="relative min-h-dvh min-h-[600px] flex flex-col overflow-hidden" style={{ background: C.bg }}>
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,rgba(52,211,153,0.06),transparent)]" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 lg:px-10 pt-20">

        {/* Trustpilot */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] mb-6">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4" style={{ color: C.accent }} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[13px] font-medium text-white/70">4.8/5</span>
          <span className="text-[13px]" style={{ color: C.dim }}>— 27 avis</span>
          <span className="text-[13px] font-medium" style={{ color: C.dim }}>★ Trustpilot</span>
        </div>

        {/* Heading — content from ma-societe-us.com */}
        <h1
          className="text-[clamp(1.8rem,5.5vw,42px)] leading-[1.15] font-extrabold max-w-3xl tracking-tight"
          style={{ color: C.text, letterSpacing: "-1.04px" }}
        >
          Créer une société aux USA
          <br />
          <span style={{ color: C.accent }}>jusqu&apos;à 0% d&apos;imposition</span> !
        </h1>

        {/* Subheading */}
        <p className="mt-4 text-[15px] lg:text-[16px] leading-relaxed max-w-md" style={{ color: C.muted }}>
          Nous vous accompagnons pour créer une société aux USA 100% légale, jusqu&apos;à 0% d&apos;imposition.
        </p>

        {/* Disclaimer */}
        <p className="mt-3 text-[12px]" style={{ color: C.dim }}>
          La fiscalité dépend de votre résidence. Notre approche est légale et structurée.
        </p>

        {/* Double CTA — from ma-societe-us.com */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <a
            href="https://calendly.com/ypls/decouverte-site"
            className="inline-flex items-center px-6 py-3 rounded-full text-[14px] font-semibold transition-all"
            style={{ background: C.accent, color: C.bg }}
          >
            Réservez votre entretien de 15 minutes
          </a>
          <a
            href="https://formations.ma-societe-us.com/formation-gratuite-llc-site"
            className="inline-flex items-center px-6 py-3 rounded-full text-[14px] font-medium transition-all border"
            style={{ borderColor: "rgba(255,255,255,0.15)", color: C.muted }}
          >
            Formation gratuite sur les LLC
          </a>
        </div>

        {/* Meta tags — Partners style */}
        <div className="flex items-center gap-4 mt-5 text-[12px]" style={{ color: C.dim }}>
          <span>⏱ Durée : 4 min</span>
          <span>🌍 Pour : e-com, freelance, agence</span>
        </div>

        {/* Video placeholder */}
        <div className="mt-8 mb-6 w-full max-w-2xl aspect-video rounded-xl border flex items-center justify-center" style={{ background: "rgba(0,0,0,0.3)", borderColor: C.border }}>
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-white/60 ml-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div
        className="sticky bottom-0 z-50"
        style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderTop: `1px solid ${C.border}` }}
      >
        <div className="px-4 lg:px-10 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 lg:gap-4 text-[12px] lg:text-[13px]" style={{ color: C.bg }}>
            <span className="font-semibold">LLC à partir de $997</span>
            <span className="opacity-30">·</span>
            <span className="hidden sm:inline">Création en 2 semaines</span>
            <span className="flex items-center gap-1 opacity-50">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              Sécurisé
            </span>
          </div>
          <a
            href="https://calendly.com/ypls/decouverte-site"
            className="inline-flex items-center px-5 py-2 rounded-full text-[13px] font-semibold"
            style={{ background: C.accent, color: C.bg }}
          >
            Réserver RDV (15 min)
          </a>
        </div>
      </div>
    </section>
  );
}
