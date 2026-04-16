"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const C = {
  bg: "rgba(13, 15, 18, 0.95)",
  text: "rgb(242, 242, 242)",
  muted: "rgba(242, 242, 242, 0.6)",
  accent: "rgb(52, 211, 153)",
  border: "rgba(255, 255, 255, 0.06)",
};

const NAV = [
  { label: "Accueil", href: "/" },
  {
    label: "Pack LLC",
    children: [
      { label: "Notre offre", href: "/services/pack-llc" },
      { label: "Banque", href: "/services/compte-bancaire" },
      { label: "FAQ", href: "/creer-llc/faq" },
      { label: "Formation", href: "https://formations.ma-societe-us.com/dashboard/fr/login" },
    ],
  },
  {
    label: "Tarifs",
    children: [
      { label: "Création LLC", href: "/tarifs" },
      { label: "Déclaration LLC", href: "/services/declaration" },
      { label: "Prestations additionnelles", href: "/tarifs" },
    ],
  },
  { label: "Immigration US", href: "/immigration-us" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? C.bg : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        }}
      >
        <nav className="flex items-center justify-between px-5 lg:px-10 h-[56px] lg:h-[64px]">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="MA SOCIETE US"
              width={120}
              height={72}
              className="h-9 w-auto brightness-[10] saturate-0"
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.children ? (
                  <button
                    className="flex items-center gap-1 text-[13px] font-medium transition-colors"
                    style={{ color: C.muted }}
                  >
                    {item.label}
                    <svg className="w-3 h-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="text-[13px] font-medium transition-colors hover:text-white"
                    style={{ color: C.muted }}
                  >
                    {item.label}
                  </a>
                )}

                {/* Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 mt-2 py-2 rounded-lg min-w-[200px]"
                    style={{ background: C.bg, backdropFilter: "blur(12px)", border: `1px solid ${C.border}` }}
                  >
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-[13px] transition-colors hover:bg-white/[0.04]"
                        style={{ color: C.muted }}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://app.ma-societe-us.com"
              className="text-[13px] font-medium"
              style={{ color: C.muted }}
            >
              Connexion
            </a>
            <a
              href="https://calendly.com/ypls/decouverte-site"
              className="inline-flex items-center px-5 py-2 rounded-full text-[13px] font-semibold"
              style={{ border: `1px solid ${C.accent}`, color: C.accent }}
            >
              Prendre RDV
            </a>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href="https://calendly.com/ypls/decouverte-site"
              className="inline-flex items-center px-4 py-1.5 rounded-full text-[12px] font-semibold"
              style={{ background: C.accent, color: "rgb(22,24,29)" }}
            >
              RDV gratuit
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            >
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-5" style={{ background: "rgb(22, 24, 29)" }}>
          {NAV.map((item) => (
            <div key={item.label} className="text-center">
              {item.children ? (
                <>
                  <p className="text-lg font-bold text-white/80 mb-2">{item.label}</p>
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-[14px] text-white/40 py-1"
                    >
                      {child.label}
                    </a>
                  ))}
                </>
              ) : (
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-bold text-white/80"
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
          <a
            href="https://calendly.com/ypls/decouverte-site"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center px-6 py-3 rounded-full text-[14px] font-semibold"
            style={{ background: C.accent, color: "rgb(22,24,29)" }}
          >
            Prendre rendez-vous
          </a>
        </div>
      )}
    </>
  );
}
