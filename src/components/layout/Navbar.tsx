"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(238,243,249,0.96)"
            : "rgba(240,245,251,0.72)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          borderBottom: scrolled
            ? "1px solid rgba(26,42,64,0.08)"
            : "1px solid rgba(255,255,255,0.6)",
          boxShadow: scrolled
            ? "0 2px 20px rgba(80,120,180,0.07)"
            : "0 1px 0 rgba(255,255,255,0.7)",
        }}
      >
        <nav className="flex items-center justify-between px-6 lg:px-10 h-[56px] lg:h-[64px]">
          <a href="/" className="relative z-10 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="MA SOCIETE US"
              width={120}
              height={72}
              className="h-9 w-auto transition-all duration-500"
              priority
            />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[14px] font-medium tracking-wide transition-colors duration-300 text-[#0e1e38]/70 hover:text-[#0e1e38]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center flex-shrink-0">
            <a
              href="https://calendly.com/ma-societe-us/entretien-gratuit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 rounded-full text-[13px] font-semibold text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #1a3a6a 0%, #2a5090 100%)",
                boxShadow: "0 4px 16px rgba(42,80,144,0.25)",
              }}
            >
              Entretien gratuit — 15 min
            </a>
          </div>

          {/* Mobile: CTA + hamburger */}
          <div className="lg:hidden flex items-center gap-3 relative z-50">
            <a
              href="https://calendly.com/ma-societe-us/entretien-gratuit"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-300 ${
                menuOpen
                  ? "text-white"
                  : "text-white"
              }`}
              style={{
                background: menuOpen ? "transparent" : "linear-gradient(135deg, #1a3a6a, #2a5090)",
                boxShadow: menuOpen ? "none" : "0 2px 12px rgba(42,80,144,0.25)",
              }}
            >
              RDV gratuit
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 flex flex-col justify-center items-center gap-1.5"
              aria-label="Menu"
            >
              <span className={`block w-5 h-px transition-all duration-300 ${menuOpen ? "bg-white rotate-45 translate-y-[3.5px]" : "bg-[#0e1e38]"}`} />
              <span className={`block w-5 h-px transition-all duration-300 ${menuOpen ? "bg-white -rotate-45 -translate-y-[3.5px]" : "bg-[#0e1e38]"}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — dark, stagger-animated */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0a1628] flex flex-col justify-center items-center gap-6"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.08, duration: 0.4 }}
                className="text-2xl text-white/80 hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="https://calendly.com/ma-societe-us/entretien-gratuit"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + NAV_ITEMS.length * 0.08, duration: 0.4 }}
              className="mt-4 bg-[#002868] text-white px-8 py-3.5 rounded-full text-sm font-medium shadow-[0_4px_20px_rgba(0,40,104,0.3)]"
            >
              Entretien gratuit — 15 min
            </motion.a>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[11px] text-white/25 mt-2"
            >
              Gratuit · Sans engagement
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
