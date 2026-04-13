"use client";

import { SITE, NAV_ITEMS, FOOTER_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[#002868] border-t border-white/[0.06]">
      <div className="px-6 lg:px-10 py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div>
            <span
              className="text-[14px] tracking-[0.2em] uppercase text-[#FAFAF9]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {SITE.name}
            </span>
            <p className="mt-3 text-[13px] text-[#FAFAF9]/30 max-w-xs leading-relaxed">
              Cabinet franco-américain spécialisé dans la création et la gestion de sociétés aux États-Unis. Marque déposée Yes Please LLC. Profession comptable et juridique réglementée.
            </p>
          </div>

          <div className="flex gap-16 flex-wrap">
            <div>
              <p className="text-[12px] uppercase tracking-[0.15em] text-[#FAFAF9]/30 mb-4">Services</p>
              <ul className="space-y-3">
                {FOOTER_LINKS.services.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[14px] text-[#FAFAF9]/50 hover:text-[#FAFAF9] transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[12px] uppercase tracking-[0.15em] text-[#FAFAF9]/30 mb-4">Cabinet</p>
              <ul className="space-y-3">
                {FOOTER_LINKS.cabinet.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[14px] text-[#FAFAF9]/50 hover:text-[#FAFAF9] transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[12px] uppercase tracking-[0.15em] text-[#FAFAF9]/30 mb-4">Légal</p>
              <ul className="space-y-3">
                {FOOTER_LINKS.legal.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[14px] text-[#FAFAF9]/50 hover:text-[#FAFAF9] transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[12px] uppercase tracking-[0.15em] text-[#FAFAF9]/30 mb-4">Contact</p>
              <ul className="space-y-3">
                <li><a href={`tel:${SITE.phone}`} className="text-[14px] text-[#FAFAF9]/50 hover:text-[#FAFAF9] transition-colors">{SITE.phone}</a></li>
                <li><a href={`mailto:${SITE.email}`} className="text-[14px] text-[#FAFAF9]/50 hover:text-[#FAFAF9] transition-colors">{SITE.email}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] text-[12px] text-[#FAFAF9]/20">
          Copyright {new Date().getFullYear()} - YES PLEASE LLC. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
