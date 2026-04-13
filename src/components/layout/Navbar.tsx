"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { NAV_ITEMS } from "@/lib/constants";

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
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(10,22,40,0.06)]"
            : ""
        }`}
      >
        <nav className="flex items-center justify-between px-6 lg:px-10 h-[56px] lg:h-[64px]">
          {/* Logo */}
          <a href="/" className="relative z-10 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="MA SOCIETE US"
              width={120}
              height={72}
              className={`h-9 w-auto transition-all duration-500 ${
                scrolled ? "" : "brightness-[10] saturate-0"
              }`}
              priority
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-[13px] tracking-wide transition-colors duration-300 ${
                  scrolled
                    ? "text-[#002868]/60 hover:text-[#002868]"
                    : "text-[#FAFAF9]/90 hover:text-[#FAFAF9]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <a
              href="/contact"
              className={`inline-flex items-center px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-300 ${
                scrolled
                  ? "bg-[#002868] text-white hover:bg-[#002868]/90"
                  : "bg-[#FAFAF9] text-[#002868] hover:bg-[#FAFAF9]/90"
              }`}
            >
              Prendre rendez-vous
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative z-10 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            aria-label="Menu"
          >
            <span
              className={`block w-5 h-px transition-all duration-300 ${
                menuOpen || scrolled ? "bg-[#002868]" : "bg-[#FAFAF9]"
              } ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
            />
            <span
              className={`block w-5 h-px transition-all duration-300 ${
                menuOpen || scrolled ? "bg-[#002868]" : "bg-[#FAFAF9]"
              } ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-white flex flex-col justify-center items-center gap-8 transition-all duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-[#002868]/80 hover:text-[#002868]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {item.label}
          </a>
        ))}
        <a
          href="/contact"
          onClick={() => setMenuOpen(false)}
          className="mt-6 bg-[#002868] text-white px-8 py-3 rounded-full text-sm font-medium"
        >
          Prendre rendez-vous
        </a>
      </div>
    </>
  );
}
