"use client";

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

export default function BlogPage() {
  return (
    <main>
      <PageHeader
        title="Publications."
        subtitle="Guides, analyses et actualités pour les entrepreneurs francophones aux États-Unis."
      />

      <section className="bg-[#FAFAF9] text-[#002868] py-[120px] lg:py-[180px]">
        <div className="px-6 lg:px-10">
          <div className="divide-y divide-[#002868]/[0.06]">
            {PLACEHOLDER_POSTS.map((post) => (
              <article
                key={post.title}
                className="group py-12 first:pt-0 last:pb-0"
              >
                <a href="#" className="block">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
                    <div className="lg:col-span-2">
                      <span className="text-[13px] text-[#002868]/30">{post.date}</span>
                      <span className="block text-[12px] uppercase tracking-wider text-[#002868]/40 mt-1">
                        {post.category}
                      </span>
                    </div>
                    <div className="lg:col-span-10">
                      <h2
                        className="text-[clamp(1.3rem,2.5vw,28px)] font-normal text-[#002868] group-hover:text-[#002868]/70 transition-colors duration-300 tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {post.title}
                      </h2>
                      <p className="mt-3 text-[15px] text-[#002868]/50 leading-relaxed max-w-2xl">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
