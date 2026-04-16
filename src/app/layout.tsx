import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const instrumentSerif = Instrument_Serif({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const inter = Inter({
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
    <html lang="fr" className={`${instrumentSerif.variable} ${inter.variable} h-full`}>
      <body className="min-h-full">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
