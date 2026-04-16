"use client";

const C = {
  bg: "rgb(18, 20, 24)",
  text: "rgb(242, 242, 242)",
  muted: "rgba(242, 242, 242, 0.4)",
  accent: "rgb(52, 211, 153)",
  border: "rgba(255, 255, 255, 0.06)",
};

export function Footer() {
  return (
    <footer style={{ background: C.bg, borderTop: `1px solid ${C.border}` }}>
      <div className="px-5 lg:px-10 py-12 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand + CTA */}
          <div className="lg:col-span-1">
            <span className="text-[14px] font-bold tracking-wider uppercase" style={{ color: C.text }}>
              MA SOCIETE US
            </span>
            <p className="mt-3 text-[13px] leading-relaxed" style={{ color: C.muted }}>
              Profitez d&apos;un entretien découverte de 15 minutes pour découvrir notre offre et voir si elle est adaptée à votre activité.
            </p>
            <a
              href="https://calendly.com/ypls/decouverte-site"
              className="inline-flex items-center mt-4 px-5 py-2 rounded-full text-[13px] font-semibold"
              style={{ background: C.accent, color: C.bg }}
            >
              Entretien découverte
            </a>
          </div>

          {/* Col 2: Pack LLC */}
          <div>
            <p className="text-[12px] uppercase tracking-wider font-bold mb-4" style={{ color: "rgba(242,242,242,0.25)" }}>Pack LLC</p>
            <ul className="space-y-2.5">
              {[
                { label: "Notre offre", href: "/services/pack-llc" },
                { label: "Banque", href: "/services/compte-bancaire" },
                { label: "FAQ", href: "/creer-llc/faq" },
                { label: "Formation gratuite", href: "https://formations.ma-societe-us.com/formation-gratuite-llc-site" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[13px] hover:text-white transition-colors" style={{ color: C.muted }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Tarifs + pages */}
          <div>
            <p className="text-[12px] uppercase tracking-wider font-bold mb-4" style={{ color: "rgba(242,242,242,0.25)" }}>Services</p>
            <ul className="space-y-2.5">
              {[
                { label: "Création LLC", href: "/tarifs" },
                { label: "Déclaration LLC", href: "/services/declaration" },
                { label: "Immigration US", href: "/immigration-us" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[13px] hover:text-white transition-colors" style={{ color: C.muted }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Réseaux + légal */}
          <div>
            <p className="text-[12px] uppercase tracking-wider font-bold mb-4" style={{ color: "rgba(242,242,242,0.25)" }}>Suivez-nous</p>
            <div className="flex gap-4 mb-6">
              <a href="https://www.youtube.com/channel/UCS51CrO8h73a3gaDmyWwmbA" className="text-[13px] hover:text-white transition-colors" style={{ color: C.muted }}>YouTube</a>
              <a href="https://www.facebook.com/Justin.gentleman.des.affaires" className="text-[13px] hover:text-white transition-colors" style={{ color: C.muted }}>Facebook</a>
              <a href="https://www.instagram.com/justin_gentleman_des_affaires/" className="text-[13px] hover:text-white transition-colors" style={{ color: C.muted }}>Instagram</a>
            </div>
            <p className="text-[12px] uppercase tracking-wider font-bold mb-3" style={{ color: "rgba(242,242,242,0.25)" }}>Légal</p>
            <ul className="space-y-2">
              {[
                { label: "CGV", href: "/cgv" },
                { label: "CGU", href: "/cgv" },
                { label: "Confidentialité", href: "/confidentialite" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[12px] hover:text-white transition-colors" style={{ color: C.muted }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 text-[12px]" style={{ borderTop: `1px solid ${C.border}`, color: "rgba(242,242,242,0.15)" }}>
          Copyright © {new Date().getFullYear()} - YES PLEASE LLC. Tous droits réservés. Marque déposée. Profession comptable et juridique réglementée.
        </div>
      </div>
    </footer>
  );
}
