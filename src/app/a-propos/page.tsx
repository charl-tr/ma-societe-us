"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Testimonials } from "@/components/sections/Testimonials";
import { STATS } from "@/lib/constants";

export default function AProposPage() {
  return (
    <main>
      <PageHeader
        title="À propos."
        subtitle="Cabinet franco-américain d'expertise comptable et juridique — depuis 2014."
      />

      {/* About content */}
      <section className="bg-[#FAFAF9] text-[#0F0E0D] py-[100px] lg:py-[140px]">
        <div className="px-6 lg:px-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#0F0E0D]/30 mb-5">
                Notre histoire
              </p>
              <h2
                className="font-normal leading-[1.1] mb-8"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)", letterSpacing: "-0.01em" }}
              >
                Plus de 10 ans au service des entrepreneurs francophones aux USA.
              </h2>
              <div className="space-y-5 text-[16px] leading-relaxed text-[#0F0E0D]/60">
                <p>
                  MA SOCIETE US est un cabinet franco-américain spécialisé dans
                  la création et la gestion de sociétés américaines. Depuis 2014,
                  nous accompagnons les entrepreneurs francophones dans leur
                  implantation aux États-Unis.
                </p>
                <p>
                  Notre équipe de 11 professionnels combine une expertise
                  comptable, juridique et fiscale pour offrir un accompagnement
                  complet — de la création de votre LLC à la gestion quotidienne
                  de votre structure.
                </p>
                <p>
                  Basés à Albuquerque, Nouveau-Mexique, nous maîtrisons les
                  spécificités de chaque état de juridiction et vous guidons vers
                  le choix le plus adapté à votre activité.
                </p>
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#0F0E0D]/30 mb-5">
                Nos valeurs
              </p>
              <div className="space-y-8">
                {[
                  {
                    title: "Transparence",
                    desc: "Pas de frais cachés, pas de mauvaises surprises. Tout est clair dès le départ.",
                  },
                  {
                    title: "Réactivité",
                    desc: "Réponse sous 24h en moyenne. Nous restons votre interlocuteur privilégié.",
                  },
                  {
                    title: "Expertise",
                    desc: "10+ ans d'expérience, 500+ sociétés créées, une maîtrise complète de la réglementation US.",
                  },
                  {
                    title: "Accompagnement",
                    desc: "Nous ne vous laissons pas seul après la création. Nous vous suivons dans la durée.",
                  },
                ].map((value) => (
                  <div key={value.title}>
                    <h3
                      className="text-[18px] font-normal mb-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-[#0F0E0D]/50">
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar — same style as homepage */}
      <section className="bg-[#EDF1F6] border-t border-[#1a2a40]/[0.06]">
        <div className="px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between py-10 lg:py-12 gap-y-6">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                <span
                  className="text-[clamp(1.5rem,3vw,2.2rem)] font-normal tracking-tight text-[#1a2a40]/80"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </span>
                <span className="text-[13px] text-[#1a2a40]/25">
                  {stat.label}
                </span>
                {i < STATS.length - 1 && (
                  <span className="hidden lg:block w-px h-5 bg-[#FAFAF9]/[0.06] ml-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <Testimonials />

      {/* CTA */}
      <section className="bg-[#EDF1F6] text-[#1a2a40] py-[100px] lg:py-[140px]">
        <div className="px-6 lg:px-10 max-w-2xl mx-auto text-center">
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] font-normal tracking-[-0.02em] mb-10"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Travaillons ensemble.
          </h2>
          <a
            href="/contact"
            className="inline-flex items-center bg-[#FAFAF9] text-[#0F0E0D] px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#F2F1F0] transition-colors"
          >
            Réservez votre entretien découverte
          </a>
        </div>
      </section>
    </main>
  );
}
