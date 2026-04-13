"use client";

import { Hero } from "@/components/hero/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { STATS, TESTIMONIALS, VALUE_PROPS } from "@/lib/constants";

/* ─── Simple wrapper ─── */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={className} style={delay > 0 ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}

/* ─── Icons ─── */
function PropIcon({ type }: { type: string }) {
  const cn = "w-5 h-5";
  switch (type) {
    case "percent":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="5" x2="5" y2="19" />
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
      );
    case "shield":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "clock":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "globe":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* ─── Social proof bar ─── */}
      <section className="bg-[#002868] border-t border-white/[0.06]">
        <div className="px-6 lg:px-10 py-6 lg:py-10">
          <div className="grid grid-cols-2 lg:flex lg:items-center lg:justify-between gap-y-4 gap-x-6">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-[clamp(1.4rem,2.5vw,2rem)] font-normal tracking-tight text-white/80"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[13px] text-white/30">
                    {stat.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Value props ─── */}
      <section className="bg-[#FAFAF7] text-[#002868] py-16 lg:py-[140px]">
        <div className="px-6 lg:px-10 max-w-[1400px] mx-auto">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#002868]/40 mb-4">
              Pourquoi passer à la LLC
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-normal leading-[1.1] tracking-[-0.02em] max-w-2xl mb-16 text-[#002868]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ce que votre SARL ou SAS ne pourra jamais vous offrir.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {VALUE_PROPS.map((prop, i) => (
              <Reveal key={prop.title} delay={0.05 * i}>
                <div className="group">
                  <div className="w-10 h-10 rounded-full border border-[#002868]/[0.12] flex items-center justify-center text-[#002868]/40 mb-5 group-hover:border-[#002868]/25 group-hover:text-[#002868]/60 transition-colors">
                    <PropIcon type={prop.icon} />
                  </div>
                  <h3
                    className="text-[18px] font-normal mb-2 tracking-tight text-[#002868]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {prop.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#002868]/50">
                    {prop.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Teaser cards ─── */}
      <section className="bg-[#002868] text-white py-16 lg:py-[140px]">
        <div className="px-6 lg:px-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Reveal>
              <a
                href="/creer-llc"
                className="group relative border border-white/[0.08] rounded-2xl p-7 lg:p-14 hover:bg-white/[0.04] transition-all duration-300 block overflow-hidden"
              >
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/30 mb-4">
                  4 juridictions
                </p>
                <h3
                  className="text-[clamp(1.5rem,2.5vw,2rem)] font-normal tracking-tight mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Le bon état,
                  <br />
                  c&apos;est des milliers d&apos;euros de différence.
                </h3>
                <p className="text-[15px] leading-relaxed text-white/40 mb-8 max-w-md">
                  Nouveau-Mexique, Colorado, Wyoming, Delaware — chaque juridiction
                  a ses avantages. On vous montre laquelle maximise vos gains.
                </p>
                <span className="inline-flex items-center gap-2 text-[13px] text-white/50 group-hover:text-white transition-colors">
                  Comparer les états
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <a
                href="/services/pack-llc"
                className="group relative border border-white/[0.08] rounded-2xl p-7 lg:p-14 hover:bg-white/[0.04] transition-all duration-300 block overflow-hidden"
              >
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/30 mb-4">
                  Pack tout inclus
                </p>
                <h3
                  className="text-[clamp(1.5rem,2.5vw,2rem)] font-normal tracking-tight mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Vous signez.
                  <br />
                  On fait le reste.
                </h3>
                <p className="text-[15px] leading-relaxed text-white/40 mb-8 max-w-md">
                  LLC, EIN, compte bancaire US, documents légaux, suivi
                  post-création — un seul interlocuteur, zéro prise de tête.
                </p>
                <span className="inline-flex items-center gap-2 text-[13px] text-white/50 group-hover:text-white transition-colors">
                  Voir ce qui est inclus
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="bg-[#F4F3F0] text-[#002868] py-16 lg:py-[140px]">
        <div className="px-6 lg:px-10 max-w-[1400px] mx-auto">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#002868]/30 mb-16 text-center">
              Ce qu&apos;ils en disent
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.author} delay={0.08 * i}>
                <div className="flex flex-col h-full">
                  <blockquote
                    className="text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.5] font-normal flex-1 text-[#002868]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    &laquo;&nbsp;{t.quote}&nbsp;&raquo;
                  </blockquote>
                  <div className="mt-8 pt-6 border-t border-[#002868]/[0.08]">
                    <p className="text-[14px] font-medium text-[#002868]">
                      {t.author}
                    </p>
                    <p className="text-[13px] text-[#002868]/40 mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
