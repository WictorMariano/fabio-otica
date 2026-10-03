import type { Metadata } from "next";
import BioLinks from "@/components/BioLinks";
import { siteName } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Links",
  description:
    "Todos os links da Fábio Ótica em um só lugar: WhatsApp da loja, Instagram, avaliação no Google, catálogo e como chegar.",
  alternates: {
    canonical: "/bio",
  },
  openGraph: {
    title: `Links | ${siteName}`,
    description: "WhatsApp, Instagram, avaliação no Google, catálogo e endereço da Fábio Ótica.",
    url: "/bio",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: siteName }],
  },
};

export default function BioPage() {
  return <BioLinks />;
}
