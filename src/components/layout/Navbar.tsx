"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
          scrolled ? "shadow-[0_1px_20px_rgba(0,0,0,0.3)]" : ""
        }`}
        style={{
          background: scrolled
            ? "rgba(19,17,16,0.92)"
            : "rgba(19,17,16,0.4)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid rgba(200,160,80,${scrolled ? 0.12 : 0.06})`,
        }}
      >
        <nav className="flex items-center justify-between px-6 lg:px-10 h-[56px] lg:h-[60px] max-w-[1200px] mx-auto">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="MA SOCIETE US"
              width={110}
              height={66}
              className="h-8 w-auto brightness-200"
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[12px] uppercase tracking-[0.15em] text-[#f0e8dc]/50 hover:text-[#c8a050] transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://app.ma-societe-us.com"
              className="text-[12px] text-[#f0e8dc]/35 hover:text-[#f0e8dc] transition-colors"
            >
              Portail
            </a>
            <a
              href="https://calendly.com/ypls/decouverte-site"
              className="inline-flex items-center px-5 py-2 rounded text-[12px] uppercase tracking-[0.1em] font-medium text-[#131110] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(200,160,80,0.3)]"
              style={{
                background: "linear-gradient(135deg, #c8a050, #d4b060)",
              }}
            >
              Prendre rendez-vous
            </a>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href="https://calendly.com/ypls/decouverte-site"
              className="inline-flex items-center px-3 py-1.5 rounded text-[11px] uppercase tracking-wider font-medium text-[#131110]"
              style={{ background: "linear-gradient(135deg, #c8a050, #d4b060)" }}
            >
              RDV
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            >
              <span className={`block w-5 h-px bg-[#f0e8dc]/60 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`block w-5 h-px bg-[#f0e8dc]/60 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-7 pt-16"
          style={{ background: "rgba(19,17,16,0.97)", backdropFilter: "blur(20px)" }}
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-xl text-[#f0e8dc]/60 hover:text-[#c8a050] transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://calendly.com/ypls/decouverte-site"
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-7 py-3 rounded text-[14px] uppercase tracking-wider font-medium text-[#131110]"
            style={{ background: "linear-gradient(135deg, #c8a050, #d4b060)" }}
          >
            Prendre rendez-vous
          </a>
        </div>
      )}
    </>
  );
}
