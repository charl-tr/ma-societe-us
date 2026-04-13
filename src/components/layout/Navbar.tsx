"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { NAV_ITEMS } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAFAF9] shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-gradient-to-b from-[#0F0E0D]/70 via-[#0F0E0D]/30 to-transparent"
        }`}
      >
        {/* Announcement bar */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            scrolled ? "h-0 opacity-0" : "h-10 opacity-100"
          }`}
        >
          <div className="flex items-center justify-center h-full border-b border-white/[0.06]">
            <span className="text-[11px] tracking-[0.15em] uppercase text-[#FAFAF9]/40">
              Experts comptables &amp; juridiques — Depuis 2014
            </span>
          </div>
        </div>

        {/* Main nav */}
        <nav className="flex items-center justify-between px-6 lg:px-10 h-[60px] lg:h-[64px]">
          {/* Logo */}
          <a href="/" className="relative z-10 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="MA SOCIETE US"
              width={140}
              height={84}
              className={`h-10 w-auto transition-all duration-500 ${
                scrolled ? "" : "brightness-[10] saturate-0"
              }`}
              priority
            />
          </a>

          {/* Desktop nav links — centered */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-[13px] transition-colors duration-300 ${
                  scrolled
                    ? "text-[#141210]/50 hover:text-[#141210]"
                    : "text-[#FAFAF9]/70 hover:text-[#FAFAF9]"
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
                  ? "bg-[#141210] text-[#FAFAF9] hover:bg-[#141210]/90"
                  : "bg-[#FAFAF9] text-[#141210] hover:bg-[#FAFAF9]/90"
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
                menuOpen || scrolled ? "bg-[#141210]" : "bg-[#FAFAF9]"
              } ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
            />
            <span
              className={`block w-5 h-px transition-all duration-300 ${
                menuOpen || scrolled ? "bg-[#141210]" : "bg-[#FAFAF9]"
              } ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#FAFAF9] flex flex-col justify-center items-center gap-8 transition-all duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-[#141210]/80 hover:text-[#141210]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {item.label}
          </a>
        ))}
        <a
          href="/contact"
          onClick={() => setMenuOpen(false)}
          className="mt-6 bg-[#141210] text-[#FAFAF9] px-8 py-3 rounded-full text-sm font-medium"
        >
          Prendre rendez-vous
        </a>
      </div>
    </>
  );
}
