"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  siteAddress,
  siteGoogleReviewUrl,
  siteInstagram,
  siteMapsUrl,
  siteName,
  sitePhoneDisplay,
  siteUrl,
  siteWhatsApp,
} from "@/lib/site-config";

type BioLink = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
};

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="currentColor" d="M16.02 3.2A12.8 12.8 0 0 0 4.4 21.7L3.2 28.8l7.28-1.17A12.8 12.8 0 1 0 16.02 3.2Zm0 23.4a10.56 10.56 0 0 1-5.38-1.47l-.38-.23-4.32.7.73-4.21-.25-.4a10.58 10.58 0 1 1 9.6 5.61Zm5.8-7.92c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.87-1.76-2.19-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.55-.08-.16-.71-1.71-.97-2.35-.26-.62-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.75.24 1.44.2 1.98.12.6-.09 1.88-.77 2.15-1.51.26-.74.26-1.37.18-1.51-.08-.13-.29-.21-.6-.37Z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="6.4" y="6.4" width="19.2" height="19.2" rx="5.6" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16" cy="16" r="4.9" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="21.6" cy="10.4" r="1.3" fill="currentColor" />
    </svg>
  );
}

function IconGoogle() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5Z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7Z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44Z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5Z" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 27.6s8.4-7.4 8.4-14.2a8.4 8.4 0 1 0-16.8 0C7.6 20.2 16 27.6 16 27.6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="16" cy="13.4" r="3.1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconContact() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="5.6" y="6.4" width="20.8" height="19.2" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="13.6" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.4 22c1-2.6 3-3.9 5.6-3.9s4.6 1.3 5.6 3.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 19.2V5.6M10.8 10.4 16 5.2l5.2 5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.2 14.4H9.6a2.4 2.4 0 0 0-2.4 2.4v7.6a2.4 2.4 0 0 0 2.4 2.4h12.8a2.4 2.4 0 0 0 2.4-2.4v-7.6a2.4 2.4 0 0 0-2.4-2.4h-1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const whatsappHref = `${siteWhatsApp}?text=${encodeURIComponent("Olá, Fábio Ótica! Vim pelo link da bio e gostaria de atendimento.")}`;
const instagramHandle = `@${siteInstagram.replace(/\/$/, "").split("/").pop()}`;
const siteHost = siteUrl.replace(/^https?:\/\//, "");

const links: BioLink[] = [
  {
    id: "whatsapp",
    title: "Falar no WhatsApp",
    subtitle: sitePhoneDisplay,
    href: whatsappHref,
    icon: <IconWhatsApp />,
    external: true,
  },
  {
    id: "instagram",
    title: "Instagram",
    subtitle: instagramHandle,
    href: siteInstagram,
    icon: <IconInstagram />,
    external: true,
  },
  {
    id: "google",
    title: "Avaliar no Google",
    subtitle: "Sua opinião faz a diferença",
    href: siteGoogleReviewUrl,
    icon: <IconGoogle />,
    external: true,
  },
  {
    id: "site",
    title: "Site oficial",
    subtitle: siteHost,
    href: "/",
    icon: <img src="/logo-otica-fabio.png" alt="" />,
  },
  {
    id: "catalogo",
    title: "Catálogo de armações",
    subtitle: "Coleções e modelos da loja",
    href: "/catalogo",
    icon: <img src="/images/bio/catalogo-icone.jpg" alt="" />,
  },
  {
    id: "maps",
    title: "Como chegar",
    subtitle: `${siteAddress.neighborhood}, ${siteAddress.city}`,
    href: siteMapsUrl,
    icon: <IconPin />,
    external: true,
  },
];

export default function BioLinks() {
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (copiedTimer.current) window.clearTimeout(copiedTimer.current);
  }, []);

  const share = async () => {
    const url = `${siteUrl}/bio`;
    if (navigator.share) {
      try {
        await navigator.share({ title: siteName, text: "Links da Fábio Ótica", url });
        return;
      } catch {
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (copiedTimer.current) window.clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copie o link:", url);
    }
  };

  return (
    <main className="bio">
      <div className="bio__backdrop" aria-hidden="true">
        <span className="bio__glow bio__glow--a" />
        <span className="bio__glow bio__glow--b" />
        <span className="bio__ring bio__ring--a" />
        <span className="bio__ring bio__ring--b" />
        <span className="bio__grain" />
      </div>

      <div className="bio__column">
        <header className="bio__profile">
          <div className="bio__avatar">
            <img src="/logo-otica-fabio.png" alt="Logotipo Ótica Fábio" />
          </div>
          <h1>{siteName}</h1>
          <p className="bio__tagline">
            Ótica no {siteAddress.neighborhood} · {siteAddress.city}
          </p>
          <p className="bio__badge">
            <span aria-hidden="true" />
            15 anos cuidando da sua visão
          </p>
        </header>

        <nav className="bio__links" aria-label="Links da Fábio Ótica">
          {links.map((link, index) => (
            <a
              key={link.id}
              className="bio-link"
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              style={{ "--bio-delay": `${120 + index * 70}ms` } as CSSProperties}
            >
              <span className={`bio-link__icon bio-link__icon--${link.id}`}>{link.icon}</span>
              <span className="bio-link__text">
                <strong>{link.title}</strong>
                <small>{link.subtitle}</small>
              </span>
              <span className="bio-link__arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>

        <div className="bio__tools" style={{ "--bio-delay": `${120 + links.length * 70}ms` } as CSSProperties}>
          <a className="bio-tool" href="/fabio-otica.vcf" download="Fabio-Otica.vcf">
            <IconContact />
            Salvar contato
          </a>
          <button className="bio-tool" type="button" onClick={share}>
            <IconShare />
            {copied ? "Link copiado" : "Compartilhar"}
          </button>
        </div>

        <footer className="bio__footer">
          <p>
            {siteAddress.street}
            <br />
            {siteAddress.neighborhood}, {siteAddress.city} - {siteAddress.region}
          </p>
          <small>© {new Date().getFullYear()} {siteName}</small>
        </footer>
      </div>
    </main>
  );
}
