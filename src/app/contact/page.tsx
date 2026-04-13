"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        title="Contactez-nous."
        subtitle="N'hésitez pas à nous contacter pour toutes questions. Nous répondons généralement sous 24h."
      />

      <section className="bg-[#FAFAF9] text-[#0F0E0D] py-[120px] lg:py-[180px]">
        <div className="px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left — booking CTA */}
            <div>
              <p className="text-[13px] uppercase tracking-[0.15em] text-[#0F0E0D]/40 mb-8">
                Entretien découverte
              </p>
              <h2
                className="text-[clamp(1.8rem,3.5vw,40px)] leading-[1.15] font-normal tracking-tight mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Réservez votre consultation
                <br />
                gratuite de 15 minutes.
              </h2>
              <p className="text-[16px] text-[#0F0E0D]/60 leading-relaxed mb-4">
                Profitez d&apos;un entretien personnalisé pour découvrir notre offre
                et voir si elle est adaptée à votre activité.
              </p>
              <p className="text-[14px] text-[#0F0E0D]/40 leading-relaxed mb-10">
                Cet entretien informel n&apos;a pas valeur juridique. Cet échange
                téléphonique (ou via Skype) n&apos;est pas tarifé et ne constitue pas
                un engagement d&apos;achat. Toutes les informations communiquées
                bénéficient d&apos;un traitement strictement confidentiel.
              </p>

              <a
                href="#"
                className="inline-flex items-center bg-[#0F0E0D] text-[#FAFAF9] px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#1a1918] transition-colors"
              >
                Réserver votre entretien 100% gratuit
              </a>
            </div>

            {/* Right — contact info */}
            <div className="lg:pl-12 lg:border-l lg:border-[#0F0E0D]/[0.06]">
              <p className="text-[13px] uppercase tracking-[0.15em] text-[#0F0E0D]/40 mb-8">
                Informations
              </p>

              <div className="space-y-10">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-[#0F0E0D]/30 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[14px] font-medium text-[#0F0E0D] mb-1">Siège social</p>
                    <p className="text-[15px] text-[#0F0E0D]/50 leading-relaxed">
                      120 Madeira Drive NE STE 220
                      <br />
                      87108 Albuquerque, New Mexico
                      <br />
                      USA
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone size={20} className="text-[#0F0E0D]/30 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[14px] font-medium text-[#0F0E0D] mb-1">Téléphone</p>
                    <a href="tel:+13025550147" className="text-[15px] text-[#0F0E0D]/50 hover:text-[#0F0E0D] transition-colors">
                      +1 (302) 555-0147
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail size={20} className="text-[#0F0E0D]/30 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[14px] font-medium text-[#0F0E0D] mb-1">Email</p>
                    <a href="mailto:contact@ma-societe-us.com" className="text-[15px] text-[#0F0E0D]/50 hover:text-[#0F0E0D] transition-colors">
                      contact@ma-societe-us.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock size={20} className="text-[#0F0E0D]/30 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[14px] font-medium text-[#0F0E0D] mb-1">Délai de réponse</p>
                    <p className="text-[15px] text-[#0F0E0D]/50">
                      Sous 24h en moyenne
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
