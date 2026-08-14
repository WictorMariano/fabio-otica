import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fabio-otica-altiplano.marianowictor.chatgpt.site"),
  title: "Fábio Ótica | Óculos, estilo e cuidado no Altiplano",
  description: "Conheça a Fábio Ótica no Altiplano, em João Pessoa. Armações, lentes e uma experiência pensada para o seu estilo.",
  openGraph: {
    title: "Fábio Ótica — Enxergue o mundo com o seu estilo",
    description: "Uma nova experiência em ótica no Altiplano, em João Pessoa.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Fábio Ótica — Enxergue o mundo com o seu estilo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fábio Ótica — Enxergue o mundo com o seu estilo",
    description: "Uma nova experiência em ótica no Altiplano, em João Pessoa.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
