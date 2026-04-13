import type { Metadata } from "next";
import { Cardo, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const cardo = Cardo({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MA SOCIETE US — Créer une société aux USA",
  description:
    "Cabinet franco-américain spécialisé dans la création et la gestion de sociétés américaines. Création de LLC, comptabilité, fiscalité, accompagnement juridique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cardo.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
