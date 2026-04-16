"use client";

/* Partners LLC DNA applied to ma-societe-us.com hero content */
const C = {
  bg: "rgb(22, 24, 29)",
  text: "rgb(242, 242, 242)",
  accent: "rgb(52, 211, 153)",
  muted: "rgba(242, 242, 242, 0.5)",
};

export function Hero() {
  return (
    <section
      className="relative min-h-[90vh] min-h-[550px] flex flex-col items-center justify-center text-center px-5 lg:px-10 pt-24 pb-16 overflow-hidden"
      style={{ background: C.bg }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,rgba(52,211,153,0.05),transparent)]" />

      <h1
        className="relative z-10 text-[clamp(1.8rem,5.5vw,42px)] leading-[1.15] font-extrabold max-w-3xl tracking-tight"
        style={{ color: C.text, letterSpacing: "-1px" }}
      >
        CRÉER UNE SOCIÉTÉ AUX USA
        <br />
        <span style={{ color: C.accent }}>JUSQU&apos;À 0% D&apos;IMPOSITION</span> !
      </h1>

      <p
        className="relative z-10 mt-5 text-[15px] lg:text-[17px] leading-relaxed max-w-lg"
        style={{ color: C.muted }}
      >
        NOUS VOUS ACCOMPAGNONS POUR CRÉER UNE SOCIÉTÉ AUX USA 100% LÉGALE
      </p>

      <div className="relative z-10 mt-8 flex flex-col sm:flex-row items-center gap-3">
        <a
          href="https://calendly.com/ypls/decouverte-site"
          className="inline-flex items-center px-6 py-3 rounded-full text-[14px] font-semibold transition-all"
          style={{ background: C.accent, color: C.bg }}
        >
          Réservez votre entretien découverte de 15 minutes
        </a>
        <a
          href="https://formations.ma-societe-us.com/formation-gratuite-llc-site"
          className="inline-flex items-center px-6 py-3 rounded-full text-[14px] font-medium transition-all"
          style={{ border: "1px solid rgba(255,255,255,0.15)", color: C.muted }}
        >
          Téléchargez votre formation gratuite sur les LLC
        </a>
      </div>
    </section>
  );
}
