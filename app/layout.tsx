import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://fabio-otica-altiplano.marianowictor.chatgpt.site";
const siteName = "Fábio Ótica";
const title = "Fábio Ótica | Óculos de grau, sol e atendimento em João Pessoa";
const description =
  "Ótica em João Pessoa com 15 anos de experiência. Armações selecionadas, lentes de alta performance, visita em domicílio e atendimento personalizado. Agende pelo WhatsApp.";
const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Armação tartaruga da Fábio Ótica sobre o balcão da loja",
  type: "image/jpeg",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description,
  applicationName: siteName,
  keywords: [
    "Fábio Ótica",
    "ótica João Pessoa",
    "óculos de grau João Pessoa",
    "óculos de sol",
    "lentes oftálmicas",
    "visita em domicílio ótica",
    "ótica Altiplano",
    "armações premium",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "shopping",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName,
    title: "Fábio Ótica — Enxergue o mundo com o seu estilo",
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fábio Ótica — Enxergue o mundo com o seu estilo",
    description,
    images: [ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/logo.png",
    shortcut: "/favicon.svg",
  },
  formatDetection: {
    telephone: true,
    email: false,
    address: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Optician",
  name: siteName,
  image: `${siteUrl}/og.jpg`,
  logo: `${siteUrl}/logo.png`,
  url: siteUrl,
  telephone: "+55-83-99625-8437",
  description,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Roberto Paulo Moreira Coutinho, 1960, Sala 104",
    addressLocality: "João Pessoa",
    addressRegion: "PB",
    addressCountry: "BR",
  },
  areaServed: {
    "@type": "City",
    name: "João Pessoa",
  },
  sameAs: ["https://www.instagram.com/fabiootica_jp/"],
  priceRange: "$$",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" as="image" href="/images/hero-oculos.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
