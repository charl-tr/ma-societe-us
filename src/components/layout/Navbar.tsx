"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // On dark-hero pages (homepage only), start transparent
  const isDark = isHomePage && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isDark
            ? ""
            : "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(10,22,40,0.06)]"
        }`}
      >
        <nav className="flex items-center justify-between px-6 lg:px-10 h-[56px] lg:h-[64px]">
          <a href="/" className="relative z-10 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="MA SOCIETE US"
              width={120}
              height={72}
              className={`h-9 w-auto transition-all duration-500 ${
                isDark ? "brightness-[10] saturate-0" : ""
              }`}
              priority
            />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-[13px] tracking-wide transition-colors duration-300 ${
                  isDark
                    ? "text-white/70 hover:text-white"
                    : "text-[#0A1628]/55 hover:text-[#0A1628]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center flex-shrink-0">
            <a
              href="/contact"
              className={`inline-flex items-center px-6 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                isDark
                  ? "bg-white/[0.08] text-white border border-white/15 hover:bg-white/15"
                  : "bg-[#002868] text-white shadow-[0_4px_20px_rgba(0,40,104,0.22)] hover:bg-[#002868]/90"
              }`}
            >
              Prendre rendez-vous
            </a>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-3 relative z-50">
            <a
              href="/contact"
              className={`inline-flex items-center px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-300 ${
                menuOpen || !isDark
                  ? "bg-[#002868] text-white"
                  : "bg-white/10 text-white border border-white/20"
              }`}
            >
              RDV gratuit
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 flex flex-col justify-center items-center gap-1.5"
              aria-label="Menu"
            >
              <span
                className={`block w-5 h-px transition-all duration-300 ${
                  menuOpen ? "bg-white rotate-45 translate-y-[3.5px]" : isDark ? "bg-white" : "bg-[#0A1628]"
                }`}
              />
              <span
                className={`block w-5 h-px transition-all duration-300 ${
                  menuOpen ? "bg-white -rotate-45 -translate-y-[3.5px]" : isDark ? "bg-white" : "bg-[#0A1628]"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
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
              href="/contact"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + NAV_ITEMS.length * 0.08, duration: 0.4 }}
              className="mt-4 bg-[#002868] text-white px-8 py-3.5 rounded-full text-sm font-medium shadow-[0_4px_20px_rgba(0,40,104,0.3)]"
            >
              Prendre rendez-vous
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
