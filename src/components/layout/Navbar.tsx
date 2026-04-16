"use client";

import { useState, useEffect } from "react";

const NAV = [
  { label: "Accueil", href: "/" },
  { label: "Pack LLC", href: "/services/pack-llc" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Immigration US", href: "/immigration-us" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "shadow-[0_1px_30px_rgba(0,0,0,0.4)]" : ""
        }`}
        style={{
          background: scrolled ? "rgba(14,13,11,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: `1px solid rgba(240,232,220,${scrolled ? 0.06 : 0})`,
        }}
      >
        <nav className="flex items-center justify-between px-6 lg:px-10 h-[56px] lg:h-[64px] max-w-[1200px] mx-auto">
          {/* Wordmark */}
          <a href="/" className="flex-shrink-0 flex flex-col gap-[3px]">
            <span
              className="text-[11px] uppercase text-[#f0e8dc]/90 leading-none"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 300, letterSpacing: "0.28em" }}
            >
              Ma Société US
            </span>
            <span
              className="text-[9px] uppercase text-[#f0e8dc]/28 leading-none"
              style={{ fontFamily: "var(--font-body)", letterSpacing: "0.18em" }}
            >
              Cabinet Franco-Américain
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[11px] uppercase tracking-[0.14em] text-[#f0e8dc]/40 hover:text-[#f0e8dc]/80 transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="https://app.ma-societe-us.com"
              className="text-[11px] text-[#f0e8dc]/30 hover:text-[#f0e8dc]/60 transition-colors tracking-wide"
            >
              Portail client
            </a>
            <a
              href="https://calendly.com/ypls/decouverte-site"
              className="inline-flex items-center px-5 py-2 text-[11px] uppercase tracking-[0.12em] font-medium text-[#0e0d0b] transition-all duration-300 hover:opacity-90"
              style={{ background: "#ede8e0", color: "#0e0d0b" }}
            >
              Prendre rendez-vous
            </a>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-4">
            <a
              href="https://calendly.com/ypls/decouverte-site"
              className="inline-flex items-center px-3.5 py-1.5 text-[10px] uppercase tracking-wider font-medium text-[#0e0d0b]"
              style={{ background: "#ede8e0", color: "#0e0d0b" }}
            >
              RDV
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            >
              <span className={`block w-5 h-px bg-[#f0e8dc]/50 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`block w-5 h-px bg-[#f0e8dc]/50 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-8 pt-16"
          style={{ background: "rgba(14,13,11,0.98)", backdropFilter: "blur(24px)" }}
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-[20px] text-[#f0e8dc]/50 hover:text-[#f0e8dc]/90 transition-colors"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 300, letterSpacing: "0.05em" }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://calendly.com/ypls/decouverte-site"
            onClick={() => setMenuOpen(false)}
            className="mt-6 px-8 py-3.5 text-[12px] uppercase tracking-[0.12em] font-medium text-[#0e0d0b]"
            style={{ background: "#ede8e0", color: "#0e0d0b" }}
          >
            Prendre rendez-vous
          </a>
        </div>
      )}
    </>
  );
}
