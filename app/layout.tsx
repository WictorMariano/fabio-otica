import type { Metadata } from "next";
import {
  siteAddress,
  siteDescription,
  siteInstagram,
  siteName,
  sitePhone,
  siteTitle,
  siteUrl,
  siteWhatsApp,
} from "@/lib/site-config";
import "./globals.css";

const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Fábio Ótica — armação em destaque no hero do site",
  type: "image/jpeg",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "Fábio Ótica",
    "ótica João Pessoa",
    "ótica Altiplano",
    "óculos de grau João Pessoa",
    "óculos de sol João Pessoa",
    "lentes oftálmicas",
    "lentes de alta performance",
    "visita em domicílio ótica",
    "armações premium",
    "ótica João Pessoa WhatsApp",
    "agendar ótica João Pessoa",
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
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/logo-otica-fabio.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32.png",
  },
  formatDetection: {
    telephone: true,
    email: false,
    address: true,
  },
  other: {
    "geo.region": "BR-PB",
    "geo.placename": "João Pessoa",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Optician",
  "@id": `${siteUrl}/#optician`,
  name: siteName,
  alternateName: "Fabio Otica",
  image: [`${siteUrl}/og.jpg`, `${siteUrl}/images/hero-oculos.png`, `${siteUrl}/logo-otica-fabio.png`],
  logo: `${siteUrl}/logo-otica-fabio.png`,
  url: siteUrl,
  telephone: sitePhone,
  description: siteDescription,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteAddress.street,
    addressLocality: siteAddress.city,
    addressRegion: siteAddress.region,
    postalCode: siteAddress.postalCode,
    addressCountry: siteAddress.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -7.119495,
    longitude: -34.845011,
  },
  areaServed: [
    { "@type": "City", name: "João Pessoa" },
    { "@type": "AdministrativeArea", name: "Paraíba" },
  ],
  sameAs: [siteInstagram],
  priceRange: "$$",
  currenciesAccepted: "BRL",
  paymentAccepted: "Cash, Credit Card, Debit Card, PIX",
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${siteAddress.street}, ${siteAddress.neighborhood}, ${siteAddress.city} - ${siteAddress.region}`,
  )}`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: sitePhone,
      contactType: "customer service",
      availableLanguage: ["Portuguese"],
      areaServed: "BR",
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: siteWhatsApp,
      availableLanguage: ["Portuguese"],
    },
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Atendimento na loja",
        description: "Experimente armações com orientação especializada na Fábio Ótica.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Visita em domicílio",
        description: "Seleção de armações levada até você, com atendimento personalizado.",
      },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" as="image" href="/images/hero-oculos.png" />
        <link rel="preload" as="image" href="/og.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
