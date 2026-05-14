"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";

const PLACEHOLDER_POSTS = [
  {
    title: "LLC vs Corporation : quelle structure choisir pour votre business aux USA ?",
    excerpt: "Comprendre les différences fondamentales entre une LLC et une Corporation pour faire le bon choix selon votre situation.",
    date: "15 mars 2024",
    category: "Guide",
  },
  {
    title: "Nouveau-Mexique, Colorado, Wyoming ou Delaware : quel état choisir ?",
    excerpt: "Chaque état a ses avantages. Analyse comparative pour vous aider à sélectionner le meilleur état d'immatriculation.",
    date: "28 février 2024",
    category: "Analyse",
  },
  {
    title: "Les obligations fiscales d'une LLC américaine pour un non-résident",
    excerpt: "Déclarations annuelles, formulaires IRS, dates limites — tout ce que vous devez savoir pour rester en conformité.",
    date: "10 février 2024",
    category: "Fiscal",
  },
  {
    title: "Ouvrir un compte bancaire américain à distance : le guide complet",
    excerpt: "Mercury, Wise, Chase — comparatif des solutions bancaires disponibles pour les non-résidents propriétaires de LLC.",
    date: "25 janvier 2024",
    category: "Banking",
  },
];

// Framer Motion 12 requires tuple literal for cubic-bezier ease
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

export default function BlogPage() {
  return (
    <main>
      <PageHeader
        title="Publications."
        subtitle="Guides, analyses et actualités pour les entrepreneurs francophones aux États-Unis."
      />

      <section className="bg-[#FAFAF9] text-[#0F0E0D] py-[120px] lg:py-[180px]">
        <div className="px-6 lg:px-10">
          <motion.div
            className="divide-y divide-[#0F0E0D]/[0.06]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {PLACEHOLDER_POSTS.map((post) => (
              <motion.article
                key={post.title}
                variants={rowVariants}
                className="py-12 first:pt-0 last:pb-0"
              >
                <a href="#" className="block group">
                  <motion.div
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    {/* Left meta column */}
                    <div className="lg:col-span-2 flex flex-row lg:flex-col items-start gap-3 lg:gap-0 pt-1">
                      <span className="text-[13px] text-[#0F0E0D]/35 tabular-nums">
                        {post.date}
                      </span>
                      <span className="inline-block mt-0 lg:mt-2 px-2.5 py-0.5 rounded-full bg-[#2a5090]/8 border border-[#2a5090]/15 text-[11px] uppercase tracking-[0.12em] font-medium text-[#2a5090]/70">
                        {post.category}
                      </span>
                    </div>

                    {/* Main content column */}
                    <div className="lg:col-span-9 flex flex-col gap-3">
                      <h2
                        className="text-[clamp(1.375rem,2vw,26px)] font-normal leading-[1.3] tracking-tight text-[#0F0E0D] group-hover:text-[#2a5090] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-cormorant)" }}
                      >
                        {post.title}
                      </h2>
                      <p className="text-[15px] text-[#0F0E0D]/48 leading-relaxed max-w-2xl">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Arrow column — fades in on row hover via CSS group */}
                    <div className="hidden lg:flex lg:col-span-1 items-start justify-end pt-1">
                      <span className="text-[#2a5090]/60 text-[20px] leading-none opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        →
                      </span>
                    </div>
                  </motion.div>
                </a>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
