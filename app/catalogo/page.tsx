import type { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { siteName } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Catálogo real da Fábio Ótica: Ecko, Lougge, Volk's, Ana Hickmann, X-TREME, óculos de sol e esportivos. Modelos com fotos em carrossel.",
  alternates: {
    canonical: "/catalogo",
  },
  openGraph: {
    title: `Catálogo | ${siteName}`,
    description:
      "Seis coleções com modelos reais da loja. Explore os ângulos e peça indicação pelo WhatsApp.",
    url: "/catalogo",
  },
};

export default function CatalogoPage() {
  return <CatalogView />;
}
