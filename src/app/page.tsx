"use client";

import { Hero } from "@/components/hero/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { STATS, TESTIMONIALS, VALUE_PROPS } from "@/lib/constants";

/* ─── Icons ─── */
function PropIcon({ type }: { type: string }) {
  const cn = "w-5 h-5";
  switch (type) {
    case "percent":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" />
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
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "globe":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
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

      {/* ─── Social proof bar — light, understated ─── */}
      <section className="border-b border-[#0A1628]/[0.06]">
        <div className="px-6 lg:px-10 py-6 lg:py-8">
          <div className="grid grid-cols-2 lg:flex lg:items-center lg:justify-between gap-y-4 gap-x-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                <span
                  className="text-[clamp(1.4rem,2.5vw,2rem)] font-normal tracking-tight text-[#002868]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </span>
                <span className="text-[13px] text-[#0A1628]/35">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Value props — white bg, punchy ─── */}
      <section className="py-16 lg:py-[120px]">
        <div className="px-6 lg:px-10 max-w-[1200px] mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#002868]/50 mb-4">
            Pourquoi passer à la LLC
          </p>
          <h2
            className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-normal leading-[1.1] tracking-[-0.02em] max-w-2xl mb-14 text-[#0A1628]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ce que votre SARL ou SAS ne pourra jamais vous offrir.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {VALUE_PROPS.map((prop) => (
              <div key={prop.title} className="group">
                <div className="w-10 h-10 rounded-full bg-[#002868]/[0.06] flex items-center justify-center text-[#002868]/60 mb-5 group-hover:bg-[#002868]/[0.10] transition-colors">
                  <PropIcon type={prop.icon} />
                </div>
                <h3
                  className="text-[17px] font-normal mb-2 tracking-tight text-[#0A1628]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {prop.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#0A1628]/50">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Teaser cards — white bg with border, not dark blocks ─── */}
      <section className="pb-16 lg:pb-[120px]">
        <div className="px-6 lg:px-10 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <a
              href="/creer-llc"
              className="group border border-[#0A1628]/[0.08] rounded-2xl p-7 lg:p-12 hover:border-[#002868]/20 hover:shadow-[0_8px_30px_rgba(0,40,104,0.06)] transition-all duration-300 block"
            >
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#002868]/50 mb-4">
                4 juridictions
              </p>
              <h3
                className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-normal tracking-tight mb-3 text-[#0A1628]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Le bon état, c&apos;est des milliers d&apos;euros de différence.
              </h3>
              <p className="text-[15px] leading-relaxed text-[#0A1628]/45 mb-6">
                Nouveau-Mexique, Colorado, Wyoming, Delaware — on vous montre laquelle maximise vos gains.
              </p>
              <span className="inline-flex items-center gap-2 text-[13px] text-[#002868] font-medium group-hover:gap-3 transition-all">
                Comparer les états →
              </span>
            </a>

            <a
              href="/services/pack-llc"
              className="group border border-[#0A1628]/[0.08] rounded-2xl p-7 lg:p-12 hover:border-[#002868]/20 hover:shadow-[0_8px_30px_rgba(0,40,104,0.06)] transition-all duration-300 block"
            >
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#002868]/50 mb-4">
                Pack tout inclus
              </p>
              <h3
                className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-normal tracking-tight mb-3 text-[#0A1628]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Vous signez. On fait le reste.
              </h3>
              <p className="text-[15px] leading-relaxed text-[#0A1628]/45 mb-6">
                LLC, EIN, compte bancaire US, documents légaux, suivi post-création — zéro prise de tête.
              </p>
              <span className="inline-flex items-center gap-2 text-[13px] text-[#002868] font-medium group-hover:gap-3 transition-all">
                Voir ce qui est inclus →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Testimonials — light gray bg ─── */}
      <section className="bg-[#F5F6F8] py-16 lg:py-[120px]">
        <div className="px-6 lg:px-10 max-w-[1200px] mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#0A1628]/30 mb-14 text-center">
            Ce qu&apos;ils en disent
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="bg-white rounded-xl p-7 border border-[#0A1628]/[0.04]">
                <blockquote
                  className="text-[15px] leading-[1.6] text-[#0A1628]/70"
                >
                  &laquo;&nbsp;{t.quote}&nbsp;&raquo;
                </blockquote>
                <div className="mt-6 pt-5 border-t border-[#0A1628]/[0.06]">
                  <p className="text-[14px] font-medium text-[#0A1628]">
                    {t.author}
                  </p>
                  <p className="text-[13px] text-[#0A1628]/40 mt-0.5">
                    {t.role}
                  </p>
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
