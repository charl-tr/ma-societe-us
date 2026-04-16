"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/* ─── Same nav items as ma-societe-us.com ─── */
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
          scrolled
            ? "shadow-[0_1px_0_rgba(26,42,64,0.06)]"
            : ""
        }`}
        style={{
          background: scrolled
            ? "rgba(255,255,255,0.7)"
            : "rgba(232,236,242,0.5)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid rgba(26,42,64,0.06)" : "1px solid rgba(255,255,255,0.3)",
        }}
      >
        {/* Chrome highlight bar */}
        <div
          className="h-[2px]"
          style={{
            background: "linear-gradient(90deg, rgba(180,190,210,0.1), rgba(255,255,255,0.6) 30%, rgba(200,210,225,0.3) 50%, rgba(255,255,255,0.6) 70%, rgba(180,190,210,0.1))",
          }}
        />

        <nav className="flex items-center justify-between px-6 lg:px-10 h-[52px] lg:h-[56px] max-w-[1200px] mx-auto">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="MA SOCIETE US"
              width={110}
              height={66}
              className="h-8 w-auto"
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[12px] tracking-wide text-[#1a2a40]/50 hover:text-[#1a2a40] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://app.ma-societe-us.com"
              className="text-[12px] text-[#1a2a40]/40 hover:text-[#1a2a40] transition-colors"
            >
              Portail
            </a>
            <a
              href="https://calendly.com/ypls/decouverte-site"
              className="inline-flex items-center px-4 py-1.5 rounded-md text-[12px] font-medium text-[#1a2a40] transition-all"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.8)",
                backdropFilter: "blur(8px)",
              }}
            >
              Prendre rendez-vous
            </a>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href="https://calendly.com/ypls/decouverte-site"
              className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-medium text-[#1a2a40]"
              style={{
                background: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.7)",
              }}
            >
              RDV
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            >
              <span className={`block w-4 h-px bg-[#1a2a40]/50 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`block w-4 h-px bg-[#1a2a40]/50 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — glass */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-6 pt-16"
          style={{ background: "rgba(232,236,242,0.95)", backdropFilter: "blur(20px)" }}
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-xl text-[#1a2a40]/70 hover:text-[#1a2a40] transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://calendly.com/ypls/decouverte-site"
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-6 py-3 rounded-lg text-[14px] font-medium text-[#1a2a40]"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.8)",
            }}
          >
            Prendre rendez-vous
          </a>
        </div>
      )}
    </>
  );
}
