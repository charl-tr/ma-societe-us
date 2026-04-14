"use client";

import { Hero } from "@/components/hero/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { STATS, TESTIMONIALS, VALUE_PROPS } from "@/lib/constants";

/* ─── Glass panel utility ─── */
const glass = {
  card: "bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,40,104,0.04)]",
  cardHover: "hover:bg-white/70 hover:shadow-[0_8px_32px_rgba(0,40,104,0.07)]",
  cardActive: "bg-white/80 backdrop-blur-xl border-white/80 shadow-[0_8px_32px_rgba(0,40,104,0.08)]",
  chrome: "linear-gradient(90deg, rgba(200,210,225,0.2), rgba(255,255,255,0.8) 30%, rgba(220,230,245,0.5) 50%, rgba(255,255,255,0.8) 70%, rgba(200,210,225,0.2))",
};

/* ─── Icons ─── */
function PropIcon({ type }: { type: string }) {
  const cn = "w-5 h-5";
  switch (type) {
    case "percent":
      return (<svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg>);
    case "shield":
      return (<svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>);
    case "clock":
      return (<svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>);
    case "globe":
      return (<svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>);
    default: return null;
  }
}

export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* ─── Social proof bar — glass strip ─── */}
      <section className="relative">
        <div
          className="px-6 lg:px-10 py-6 lg:py-8 border-b border-white/40"
          style={{ background: "linear-gradient(180deg, rgba(225,232,242,0.6), rgba(237,241,246,0.3))", backdropFilter: "blur(8px)" }}
        >
          <div className="grid grid-cols-2 lg:flex lg:items-center lg:justify-between gap-y-4 gap-x-6 max-w-[1200px] mx-auto">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                <span className="text-[clamp(1.4rem,2.5vw,2rem)] font-normal tracking-tight text-[#2a5090]" style={{ fontFamily: "var(--font-heading)" }}>
                  {stat.value}
                </span>
                <span className="text-[13px] text-[#1a2a40]/30">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Value props — glass cards ─── */}
      <section className="py-16 lg:py-[120px]">
        <div className="px-6 lg:px-10 max-w-[1200px] mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#2a5090]/50 mb-4">
            Pourquoi passer à la LLC
          </p>
          <h2
            className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-normal leading-[1.1] tracking-[-0.02em] max-w-2xl mb-14 text-[#1a2a40]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ce que votre SARL ou SAS ne pourra jamais vous offrir.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUE_PROPS.map((prop) => (
              <div
                key={prop.title}
                className={`rounded-xl overflow-hidden transition-all duration-300 ${glass.cardHover}`}
              >
                {/* Chrome bar */}
                <div className="h-[2px]" style={{ background: glass.chrome }} />
                <div className={`p-6 ${glass.card} border-t-0 rounded-t-none`}>
                  <div className="w-9 h-9 rounded-full bg-[#2a5090]/[0.08] flex items-center justify-center text-[#2a5090]/50 mb-4">
                    <PropIcon type={prop.icon} />
                  </div>
                  <h3
                    className="text-[16px] font-normal mb-2 tracking-tight text-[#1a2a40]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {prop.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#1a2a40]/45">
                    {prop.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Teaser cards — large glass panels ─── */}
      <section className="pb-16 lg:pb-[120px]">
        <div className="px-6 lg:px-10 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {[
              {
                label: "4 juridictions",
                title: "Le bon état,\nc'est des milliers d'euros\nde différence.",
                desc: "Nouveau-Mexique, Colorado, Wyoming, Delaware — on vous montre laquelle maximise vos gains.",
                cta: "Comparer les états",
                href: "/creer-llc",
              },
              {
                label: "Pack tout inclus",
                title: "Vous signez.\nOn fait le reste.",
                desc: "LLC, EIN, compte bancaire US, documents légaux, suivi post-création — zéro prise de tête.",
                cta: "Voir ce qui est inclus",
                href: "/services/pack-llc",
              },
            ].map((card) => (
              <a
                key={card.href}
                href={card.href}
                className="group rounded-xl overflow-hidden transition-all duration-300"
              >
                <div className="h-[2px]" style={{ background: glass.chrome }} />
                <div className={`p-7 lg:p-10 ${glass.card} border-t-0 rounded-t-none transition-all duration-300 ${glass.cardHover}`}>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[#2a5090]/50 mb-4">
                    {card.label}
                  </p>
                  <h3
                    className="text-[clamp(1.3rem,2.2vw,1.7rem)] font-normal tracking-tight mb-3 text-[#1a2a40] whitespace-pre-line"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#1a2a40]/40 mb-6">
                    {card.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[13px] text-[#2a5090] font-medium group-hover:gap-3 transition-all">
                    {card.cta} →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials — glass cards on slightly deeper bg ─── */}
      <section
        className="py-16 lg:py-[120px]"
        style={{ background: "linear-gradient(180deg, rgba(220,228,240,0.4), rgba(237,241,246,0.2))" }}
      >
        <div className="px-6 lg:px-10 max-w-[1200px] mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#1a2a40]/25 mb-14 text-center">
            Ce qu&apos;ils en disent
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="rounded-xl overflow-hidden">
                <div className="h-[2px]" style={{ background: glass.chrome }} />
                <div className={`p-6 lg:p-7 ${glass.card} border-t-0 rounded-t-none h-full flex flex-col`}>
                  <blockquote className="text-[14px] leading-[1.65] text-[#1a2a40]/65 flex-1">
                    &laquo;&nbsp;{t.quote}&nbsp;&raquo;
                  </blockquote>
                  <div className="mt-6 pt-5 border-t border-[#1a2a40]/[0.06]">
                    <p className="text-[14px] font-medium text-[#1a2a40]">{t.author}</p>
                    <p className="text-[12px] text-[#1a2a40]/35 mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
