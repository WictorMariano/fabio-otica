"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import ImageStreamHero from "@/components/ImageStreamHero";
import { BrandButton, BrandLink } from "@/components/BrandButton";
import {
  aboutImage,
  featuredItems,
  serviceStoreImage,
  serviceVisitImage,
  spacePhotos,
  streamImages,
} from "@/lib/site-images";

const address =
  "Rua Roberto Paulo Moreira Coutinho, 1960, Sala 104, Altiplano, João Pessoa - PB";
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
const googleReviewsUrl = `https://www.google.com/search?q=${encodeURIComponent(`Fábio Ótica ${address} avaliações`)}`;
const instagramUrl = "https://www.instagram.com/fabiootica_jp/";
const facebookUrl = "https://www.facebook.com/search/top?q=F%C3%A1bio%20%C3%93tica%20Jo%C3%A3o%20Pessoa";
const youtubeUrl = "https://www.youtube.com/results?search_query=F%C3%A1bio+%C3%93tica+Jo%C3%A3o+Pessoa";
const tiktokUrl = "https://www.tiktok.com/search?q=F%C3%A1bio%20%C3%93tica%20Jo%C3%A3o%20Pessoa";
const kwaiUrl = "https://www.kwai.com/search/video?q=F%C3%A1bio%20%C3%93tica%20Jo%C3%A3o%20Pessoa";
const whatsappNumber = "5583996258437";
const whatsappOffersGroupUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá, Fábio Ótica! Quero entrar no grupo de ofertas relâmpago.")}`;
const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

type ScheduleIntent = "visita" | "loja";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function todayISO() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function formatDate(value: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="currentColor" d="M16.02 3.2A12.8 12.8 0 0 0 4.4 21.7L3.2 28.8l7.28-1.17A12.8 12.8 0 1 0 16.02 3.2Zm0 23.4a10.56 10.56 0 0 1-5.38-1.47l-.38-.23-4.32.7.73-4.21-.25-.4a10.58 10.58 0 1 1 9.6 5.61Zm5.8-7.92c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.87-1.76-2.19-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.55-.08-.16-.71-1.71-.97-2.35-.26-.62-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.75.24 1.44.2 1.98.12.6-.09 1.88-.77 2.15-1.51.26-.74.26-1.37.18-1.51-.08-.13-.29-.21-.6-.37Z" />
    </svg>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand ${compact ? "brand--compact" : ""}`} href="#inicio" aria-label="Fábio Ótica — início">
      <img src="/logo.png" alt="Ótica Fábio" />
    </a>
  );
}

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="6.4" y="6.4" width="19.2" height="19.2" rx="5.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="4.9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="21.6" cy="10.4" r="1.25" fill="currentColor" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4.5" y="8.2" width="23" height="15.6" rx="4.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.8 12.6v6.8l6.4-3.4-6.4-3.4Z" fill="currentColor" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M18.8 28V17.2h3.2l.5-3.6h-3.7v-2.2c0-1 .3-1.8 1.8-1.8h2V6.4h-2.8c-3.1 0-5.2 1.9-5.2 5.3v2h-2.8v3.6H14.6V28h4.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M20.4 6.2c.8 2.4 2.5 4.1 4.9 4.8v3.1c-1.7-.1-3.3-.6-4.7-1.5v6.7c0 4.2-3.4 7.5-7.6 7.5S5.4 23.5 5.4 19.3s3.4-7.5 7.6-7.5c.4 0 .8 0 1.2.1v3.3c-.4-.1-.8-.2-1.2-.2-2.4 0-4.3 1.9-4.3 4.3s1.9 4.3 4.3 4.3 4.3-1.9 4.3-4.3V6.2h3.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconKwai() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M10.2 7.2h3.4l4.2 6.4 2.1-2.6V7.2h3.3v17.6h-3.3v-6.3l-2.6 3.3-3.5 4.7h-3.7l5.1-6.7-4.9-7.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconLight() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 5.2v3.2M16 23.6v3.2M5.2 16h3.2M23.6 16h3.2M8.4 8.4l2.2 2.2M21.4 21.4l2.2 2.2M23.6 8.4l-2.2 2.2M10.6 21.4l-2.2 2.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="16" cy="16" r="4.6" stroke="currentColor" strokeWidth="1.45" />
    </svg>
  );
}

function IconFrames() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="10.2" cy="16.4" r="5.4" stroke="currentColor" strokeWidth="1.45" />
      <circle cx="21.8" cy="16.4" r="5.4" stroke="currentColor" strokeWidth="1.45" />
      <path d="M15.6 16.4h.8" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
      <path d="M4.8 16.4H3.4M28.6 16.4h-1.4" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
    </svg>
  );
}

function IconLenses() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="8.2" stroke="currentColor" strokeWidth="1.45" />
      <circle cx="16" cy="16" r="3.2" stroke="currentColor" strokeWidth="1.35" />
      <path d="M16 7.8V5.6M16 26.4v-2.2M24.2 16h2.2M5.6 16h2.2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M11.2 11.2 9.8 9.8M22.2 22.2l-1.4-1.4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 1.6l1.86 3.9 4.14.56-3.03 2.92.76 4.22L8 11.2l-3.73 2l.76-4.22L2 6.06l4.14-.56L8 1.6Z"
      />
    </svg>
  );
}

function IconService() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="11.2" r="3.6" stroke="currentColor" strokeWidth="1.45" />
      <path d="M9.4 24.4c.8-4.1 3.2-6.2 6.6-6.2s5.8 2.1 6.6 6.2" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
      <circle cx="23.4" cy="12.6" r="2.3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M26.8 21.8c-.4-2.4-1.8-3.7-3.8-3.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSpace, setActiveSpace] = useState(0);
  const [featuredShift, setFeaturedShift] = useState(0);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [intent, setIntent] = useState<ScheduleIntent | "">("");
  const [clientName, setClientName] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [place, setPlace] = useState("");
  const featuredRef = useRef<HTMLElement>(null);

  const lensBrands = [
    { name: "Hoya", src: "/images/brands/hoya.svg" },
    { name: "Zeiss", src: "/images/brands/zeiss.svg" },
    { name: "Essilor", src: "/images/brands/essilor.svg" },
    { name: "Rodenstock", src: "/images/brands/rodenstock.svg" },
    { name: "Shamir", src: "/images/brands/shamir.png" },
    { name: "Tokai Optical", src: "/images/brands/tokai.svg" },
  ];

  const testimonials = [
    { name: "Nome do cliente", role: "Avaliação do Google", content: "Aqui entra o texto da avaliação publicada no Google.", rating: 5 },
    { name: "Nome do cliente", role: "Visita em domicílio", content: "Aqui entra o texto da avaliação publicada no Google.", rating: 5 },
    { name: "Nome do cliente", role: "Atendimento na loja", content: "Aqui entra o texto da avaliação publicada no Google.", rating: 5 },
    { name: "Nome do cliente", role: "Óculos de grau", content: "Aqui entra o texto da avaliação publicada no Google.", rating: 5 },
  ];

  const spaceCount = spacePhotos.length;
  const goSpace = (direction: number) => {
    setActiveSpace((current) => (current + direction + spaceCount) % spaceCount);
  };

  useEffect(() => {
    if (spaceCount < 2) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const timer = window.setInterval(() => {
      setActiveSpace((current) => (current + 1) % spaceCount);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [spaceCount]);

  const openSchedule = (next: ScheduleIntent | "" = "") => {
    setIntent(next);
    setScheduleOpen(true);
    setMenuOpen(false);
  };

  const closeSchedule = () => {
    setScheduleOpen(false);
  };

  const scheduleMessage = () => {
    const lines = ["Olá, Fábio Ótica! Gostaria de atendimento."];
    if (intent === "visita") lines[0] = "Olá, Fábio Ótica! Quero agendar uma visita em domicílio.";
    if (intent === "loja") lines[0] = "Olá, Fábio Ótica! Quero agendar atendimento na loja.";
    if (clientName.trim()) lines.push(`Nome: ${clientName.trim()}`);
    if (visitDate) lines.push(`Data: ${formatDate(visitDate)}`);
    if (visitTime) lines.push(`Horário: ${visitTime}`);
    if (intent === "visita" && place.trim()) lines.push(`Endereço / bairro: ${place.trim()}`);
    lines.push("Aguardo o retorno.");
    return lines.join("\n");
  };

  const canSend = Boolean(intent && visitDate && visitTime);

  const sendToWhatsApp = () => {
    if (!canSend) return;
    window.open(whatsappUrl(scheduleMessage()), "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    document.body.style.overflow = scheduleOpen || menuOpen ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (scheduleOpen) setScheduleOpen(false);
      else setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [scheduleOpen, menuOpen]);

  useEffect(() => {
    const section = featuredRef.current;
    if (!section) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (media.matches) {
        setFeaturedShift(0);
        return;
      }
      const rect = section.getBoundingClientRect();
      const view = window.innerHeight || 1;
      setFeaturedShift((rect.top + rect.height / 2 - view / 2) * -0.22);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    media.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      media.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const src = "https://www.instagram.com/embed.js";
    const process = () => {
      window.instgrm?.Embeds.process();
    };
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      process();
      return;
    }
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    script.onload = process;
    document.body.appendChild(script);
  }, []);

  return (
    <main>
      <header className={menuOpen ? "header header--menu-open" : "header"}>
        <div className="header__bar">
          <Brand compact />
          <button
            className={menuOpen ? "menu-button menu-button--open" : "menu-button"}
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          <nav id="menu-principal" className={menuOpen ? "nav nav--open" : "nav"} aria-label="Navegação principal">
            <p className="nav__label">Menu</p>
            <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
            <a href="#experiencia" onClick={() => setMenuOpen(false)}>Experiência</a>
            <a href="#atendimento" onClick={() => setMenuOpen(false)}>Atendimento</a>
            <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
            <a href="#loja" onClick={() => setMenuOpen(false)}>A loja</a>
            <a href="#galeria" onClick={() => setMenuOpen(false)}>Galeria</a>
            <a href="#agendar" onClick={(event) => { event.preventDefault(); openSchedule(); }}>Agendar</a>
          </nav>
        </div>
        {menuOpen ? (
          <button type="button" className="nav-backdrop" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />
        ) : null}
      </header>

      <section className="hero" id="inicio">
        <div className="hero__glow" />
        <div className="hero__content">
          <p className="eyebrow light">Óculos, estilo e cuidado</p>
          <h1>
            <span>Enxergue o mundo</span>
            <span>com o seu <em>estilo.</em></span>
          </h1>
          <p className="hero__lead">
            Armações selecionadas e lentes modernas para transformar conforto, visão e personalidade.
          </p>
          <div className="hero__actions">
            <BrandLink href="#agendar" onClick={(event) => { event.preventDefault(); openSchedule(); }}>
              Agendar atendimento <span aria-hidden="true">→</span>
            </BrandLink>
            <a className="hero__play" href="#loja">
              <span className="hero__play-icon" aria-hidden="true">▶</span>
              Conhecer a loja
            </a>
          </div>
        </div>
        <img
          className="hero__image"
          src="/images/hero-oculos.png"
          alt="Armação tartaruga da Fábio Ótica sobre o balcão da loja, com a marca ao fundo"
          width={1024}
          height={800}
          fetchPriority="high"
        />
      </section>

      <section className="about" id="sobre" aria-labelledby="about-title">
        <div className="about__visual">
          <span className="about__watermark" aria-hidden="true">15</span>
          <div className="about__frame">
            <img
              src={aboutImage.src}
              alt={aboutImage.alt}
            />
            <span className="about__flare" aria-hidden="true" />
            <div className="about__badge">
              <strong>15</strong>
              <span>Anos de<br />experiência</span>
            </div>
          </div>
        </div>
        <div className="about__copy">
          <div className="about__copy-body">
            <p className="eyebrow light">Nossa história</p>
            <h2 id="about-title">
              <span>Quinze anos</span>
              <span>dedicados</span>
              <em>ao seu olhar.</em>
            </h2>
            <div className="about__copy-text">
              <p>A Fábio Ótica é o encontro de uma trajetória de 15 anos em óptica com um espaço pensado para receber você com calma, precisão e estilo.</p>
              <p>São anos escolhendo armações, ajustando lentes e acompanhando cada cliente até o detalhe final.</p>
              <blockquote>“Cada atendimento começa pela escuta.”</blockquote>
            </div>
            <BrandLink href="#agendar" onClick={(event) => { event.preventDefault(); openSchedule(); }}>
              Agendar atendimento <span aria-hidden="true">→</span>
            </BrandLink>
          </div>
          <div className="about__facts" aria-label="Diferenciais">
            <span>15 anos de experiência</span>
            <span>Curadoria de armações</span>
            <span>Atendimento próximo</span>
          </div>
        </div>
      </section>

      <section
        className="featured"
        id="experiencia"
        aria-labelledby="collections-title"
        ref={featuredRef}
        style={{ "--featured-shift": `${featuredShift}px` } as CSSProperties}
      >
        <div className="featured__parallax" aria-hidden="true">
          <img src="/images/featured-bg.png" alt="" />
        </div>
        <div className="featured__veil" aria-hidden="true" />
        <span className="featured__ring featured__ring--a" aria-hidden="true" />
        <span className="featured__ring featured__ring--b" aria-hidden="true" />
        <div className="featured__shell">
          <div className="featured__intro">
            <p className="featured__eyebrow">Coleções em destaque</p>
            <h2 id="collections-title">
              <span>Design, qualidade</span>
              <em>e autenticidade.</em>
            </h2>
            <p>Uma curadoria de armações escolhidas para unir conforto, personalidade e excelência em cada detalhe.</p>
            <BrandLink
              href={whatsappUrl("Olá, Fábio Ótica! Quero conhecer a coleção de óculos.")}
              target="_blank"
              rel="noreferrer"
            >
              Conhecer coleção <span aria-hidden="true">→</span>
            </BrandLink>
          </div>

          <div className="featured__showcase">
            <div className="featured__cards">
              {featuredItems.map((item) => (
                <article key={item.title} className="featured-card">
                  <div className="featured-card__media">
                    <img src={item.src} alt={item.alt} loading="lazy" />
                  </div>
                  <div className="featured-card__copy">
                    <h3>{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="featured__benefits" aria-label="Diferenciais">
            <span className="featured__shine" aria-hidden="true" />
            <div className="featured__benefit">
              <span className="featured__benefit-icon" aria-hidden="true"><IconFrames /></span>
              <span>Armações<br />premium</span>
            </div>
            <div className="featured__benefit">
              <span className="featured__benefit-icon" aria-hidden="true"><IconLenses /></span>
              <span>Lentes de alta<br />performance</span>
            </div>
            <div className="featured__benefit">
              <span className="featured__benefit-icon" aria-hidden="true"><IconService /></span>
              <span>Atendimento<br />personalizado</span>
            </div>
          </div>
        </div>
      </section>

      <section className="service" id="atendimento">
        <div className="service__backdrop" aria-hidden="true" />
        <div className="service__glow service__glow--left" />
        <div className="service__glow service__glow--right" />
        <div className="service__bokeh" aria-hidden="true" />
        <svg className="service__curves" viewBox="0 0 1440 240" fill="none" aria-hidden="true">
          <path d="M-40 170C180 40 420 210 720 90C980 -10 1220 150 1500 40" stroke="url(#service-gold)" strokeWidth="1.4" />
          <path d="M-20 210C220 90 480 230 760 130C1040 30 1280 180 1520 80" stroke="url(#service-gold)" strokeWidth="1" opacity=".55" />
          <defs>
            <linearGradient id="service-gold" x1="0" y1="0" x2="1440" y2="0">
              <stop stopColor="#c99952" stopOpacity="0" />
              <stop offset=".2" stopColor="#c99952" stopOpacity=".7" />
              <stop offset=".8" stopColor="#e5bd7a" stopOpacity=".7" />
              <stop offset="1" stopColor="#c99952" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="brands" aria-label="Só as melhores lentes">
          <p className="eyebrow">Só as melhores lentes</p>
          <div className="brands__viewport">
            <div className="brands__track">
              {[0, 1].map((copy) => (
                <ul className="brands__group" key={copy} aria-hidden={copy === 1 || undefined}>
                  {lensBrands.map((brand) => (
                    <li key={`${copy}-${brand.name}`}>
                      <img src={brand.src} alt={copy === 0 ? brand.name : ""} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
        <header className="service__intro">
          <h2>A experiência <strong>Fábio Ótica</strong>,<br /><em>onde for melhor para você.</em></h2>
          <p>Escolha como prefere ser atendido e encontre a armação ideal com orientação especializada.</p>
        </header>
        <div className="service__grid">
          <article className="service-card">
            <div className="service-card__media">
              <img src={serviceVisitImage.src} alt={serviceVisitImage.alt} loading="lazy" />
            </div>
            <div className="service-card__panel">
              <h3>Visita em domicílio</h3>
              <p className="service-card__slogan">Seu atendimento, no conforto da sua casa.</p>
              <p>Levamos uma seleção de armações até você para uma escolha tranquila, exclusiva e personalizada.</p>
              <BrandLink href="#agendar" onClick={(event) => { event.preventDefault(); openSchedule("visita"); }}>
                Agendar visita <span aria-hidden="true">→</span>
              </BrandLink>
            </div>
          </article>
          <article className="service-card">
            <div className="service-card__media">
              <img src={serviceStoreImage.src} alt={serviceStoreImage.alt} loading="lazy" />
            </div>
            <div className="service-card__panel">
              <h3>Atendimento na loja</h3>
              <p className="service-card__slogan">Conheça de perto cada detalhe.</p>
              <p>Experimente nossas coleções com calma e receba orientação especializada em um ambiente pensado para você.</p>
              <BrandLink href="#agendar" onClick={(event) => { event.preventDefault(); openSchedule("loja"); }}>
                Agendar na loja <span aria-hidden="true">→</span>
              </BrandLink>
            </div>
          </article>
        </div>
        <p className="service__footer">Em qualquer escolha, você recebe <em>atenção exclusiva</em> do início ao fim.</p>
      </section>

      <section className="process" id="como-funciona">
        <span className="lux-ring lux-ring--tl" aria-hidden="true" />
        <span className="lux-ring lux-ring--br" aria-hidden="true" />
        <div className="process__glow process__glow--a" aria-hidden="true" />
        <div className="process__glow process__glow--b" aria-hidden="true" />
        <div className="process__heading">
          <p className="eyebrow light">Como funciona</p>
          <h2>Do primeiro encontro<br />à entrega, <em>no seu ritmo.</em></h2>
          <p>Três etapas simples, com o cuidado Fábio Ótica em cada uma delas — na loja ou onde você estiver.</p>
          <BrandLink href="#agendar" onClick={(event) => { event.preventDefault(); openSchedule(); }}>
            Começar agora <span aria-hidden="true">→</span>
          </BrandLink>
        </div>
        <ol className="process__list">
          <li className="process-card">
            <span className="process-card__shine" aria-hidden="true" />
            <span className="process-card__step">01</span>
            <div>
              <small>VISITA E PERSONALIZAÇÃO</small>
              <h3>Experimente com calma</h3>
              <p>Na loja ou em casa, você escolhe no seu tempo. Solicite uma ou duas coleções para experimentar e encontrar a armação certa.</p>
              <div className="process-card__tags">
                <span>1 coleção</span>
                <span>2 coleções</span>
              </div>
            </div>
          </li>
          <li className="process-card">
            <span className="process-card__shine" aria-hidden="true" />
            <span className="process-card__step">02</span>
            <div>
              <small>LABORATÓRIO</small>
              <h3>Precisão em cada lente</h3>
              <p>Depois da escolha, as lentes são preparadas com o cuidado técnico que o seu olhar pede — receita, medidas e acabamento.</p>
            </div>
          </li>
          <li className="process-card">
            <span className="process-card__shine" aria-hidden="true" />
            <span className="process-card__step">03</span>
            <div>
              <small>ENTREGA</small>
              <h3>Na loja ou em casa</h3>
              <p>Quando estiver pronto, você recebe na loja ou no conforto do seu endereço. A entrega é do jeito que for melhor para você.</p>
              <div className="process-card__tags">
                <span>Retirada na loja</span>
                <span>Entrega em domicílio</span>
              </div>
            </div>
          </li>
        </ol>
      </section>

      <section className="store" id="loja">
        <div className="store__glow" aria-hidden="true" />
        <span className="lux-ring lux-ring--store" aria-hidden="true" />
        <div className="store__visual">
          <div className="store__carousel">
            <div className="store__slides">
              {spacePhotos.map((photo, index) => (
                <img
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  className={index === activeSpace ? "is-active" : ""}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}
            </div>
            <div className="store__controls">
              <button type="button" aria-label="Foto anterior do espaço" onClick={() => goSpace(-1)}>←</button>
              <button type="button" className="is-next" aria-label="Próxima foto do espaço" onClick={() => goSpace(1)}>→</button>
            </div>
            <div className="store__dots" aria-label="Fotos do espaço">
              {spacePhotos.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  className={index === activeSpace ? "store__dot is-active" : "store__dot"}
                  aria-label={`Ver foto ${index + 1}`}
                  aria-current={index === activeSpace}
                  onClick={() => setActiveSpace(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="store__copy">
          <h2>Criado para<br /><em>receber você.</em></h2>
          <p>Um ambiente elegante e acolhedor, preparado para que você possa conhecer, experimentar e escolher com tranquilidade.</p>
          <ul>
            <li><span aria-hidden="true"><IconLight /></span> Iluminação confortável e ambiente acolhedor</li>
            <li><span aria-hidden="true"><IconFrames /></span> Exposição pensada para facilitar sua escolha</li>
            <li><span aria-hidden="true"><IconService /></span> Atendimento próximo, no seu tempo</li>
          </ul>
          <BrandLink href={mapsUrl} target="_blank" rel="noreferrer">
            Visite a nossa loja <span aria-hidden="true">→</span>
          </BrandLink>
        </div>
      </section>

      <section className="gallery-stream" id="galeria" aria-labelledby="gallery-title">
        <ImageStreamHero images={streamImages} className="gallery-stream__hero">
          <div className="gallery-stream__content">
            <p className="eyebrow light">Nosso espaço</p>
            <h2 id="gallery-title">
              Venha conhecer
              <br />
              <em>a Fábio Ótica.</em>
            </h2>
            <p>Um ambiente pensado para você experimentar, comparar e escolher com calma — do balcão aos expositores.</p>
            <BrandLink href={mapsUrl} target="_blank" rel="noreferrer">
              Visitar a loja <span aria-hidden="true">→</span>
            </BrandLink>
          </div>
        </ImageStreamHero>
      </section>

      <section className="testimonials" id="depoimentos">
        <span className="lux-ring lux-ring--tl" aria-hidden="true" />
        <span className="lux-ring lux-ring--br" aria-hidden="true" />
        <div className="testimonials__heading">
          <p className="eyebrow light">Experiências reais</p>
          <h2>O que dizem<br />sobre a <em>Fábio Ótica.</em></h2>
          <p>A confiança se constrói em cada atendimento. Consulte as avaliações públicas e compartilhe também a sua experiência.</p>
        </div>
        <div className="testimonials__panel">
          <div className="reviews" aria-label="Depoimentos de clientes">
            <div className="reviews__track">
              {[0, 1].map((copy) => (
                <div className="reviews__group" key={copy} aria-hidden={copy === 1 || undefined}>
                  {testimonials.map((item, index) => (
                    <article className="review-card" key={`${copy}-${index}`}>
                      <div className="review-card__head">
                        <span className="review-card__avatar" aria-hidden="true">{item.name.slice(0, 1)}</span>
                        <div>
                          <h4>{item.name}</h4>
                          <p>{item.role}</p>
                        </div>
                      </div>
                      <p className="review-card__text">{item.content}</p>
                      <div className="review-card__stars" aria-label={`${item.rating} de 5 estrelas`}>
                        {Array.from({ length: item.rating }).map((_, star) => (
                          <IconStar key={star} />
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="testimonials__actions">
            <BrandLink href={googleReviewsUrl} target="_blank" rel="noreferrer">
              Ver avaliações no Google <span aria-hidden="true">→</span>
            </BrandLink>
            <a className="line-link line-link--light" href={mapsUrl} target="_blank" rel="noreferrer">Avaliar no Google <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="contact" id="visite">
        <div className="contact__glow contact__glow--left" aria-hidden="true" />
        <div className="contact__glow contact__glow--right" aria-hidden="true" />
        <div className="contact__map">
          <iframe
            src={mapEmbedUrl}
            title="Localização da Fábio Ótica no Altiplano"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <div className="contact__content">
          <p className="eyebrow">Endereço e contato</p>
          <h2>Venha conhecer<br />seu novo <em>olhar.</em></h2>
          <div className="contact__details">
            <div><small>ENDEREÇO</small><p>Rua Roberto Paulo Moreira Coutinho, 1960<br />Sala 104 · Altiplano · João Pessoa — PB</p></div>
            <div><small>REFERÊNCIA</small><p>Em frente ao Colégio Kairós</p></div>
            <div><small>WHATSAPP</small><p>(83) 99625-8437</p></div>
            <div><small>INSTAGRAM</small><p>@fabiootica_jp</p></div>
          </div>
          <div className="contact__actions">
            <BrandLink href="#agendar" onClick={(event) => { event.preventDefault(); openSchedule(); }}>
              Agendar atendimento <span aria-hidden="true">→</span>
            </BrandLink>
            <BrandLink href={whatsappUrl("Olá, Fábio Ótica! Gostaria de atendimento.")} target="_blank" rel="noreferrer">
              <IconWhatsApp /> WhatsApp
            </BrandLink>
            <a className="line-link" href={mapsUrl} target="_blank" rel="noreferrer">Como chegar <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="social" id="redes">
        <span className="lux-ring lux-ring--tl" aria-hidden="true" />
        <span className="lux-ring lux-ring--br" aria-hidden="true" />
        <div className="social__content">
          <p className="eyebrow light">Redes sociais</p>
          <h2>Acompanhe cada<br /><em>novo olhar.</em></h2>
          <p className="social__lead">
            Novidades, lançamentos e bastidores do atendimento. Siga a Fábio Ótica no Instagram e fique por dentro de tudo primeiro.
          </p>
          <div className="social__actions">
            <BrandLink href={instagramUrl} target="_blank" rel="noreferrer">
              <IconInstagram /> Seguir no Instagram
            </BrandLink>
            <a className="line-link line-link--light" href={instagramUrl} target="_blank" rel="noreferrer">@fabiootica_jp <Arrow /></a>
          </div>
        </div>
        <aside className="social__chips" aria-label="Outras redes">
          <a className="social-chip" href={whatsappOffersGroupUrl} target="_blank" rel="noreferrer">
            <span className="social-chip__icon" aria-hidden="true"><IconWhatsApp /></span>
            <span className="social-chip__copy">
              <strong>WhatsApp</strong>
              <em>Ofertas relâmpago</em>
            </span>
          </a>
          <a className="social-chip" href={youtubeUrl} target="_blank" rel="noreferrer">
            <span className="social-chip__icon" aria-hidden="true"><IconYouTube /></span>
            <span className="social-chip__copy">
              <strong>YouTube</strong>
              <em>Vídeos e bastidores</em>
            </span>
          </a>
          <a className="social-chip" href={facebookUrl} target="_blank" rel="noreferrer">
            <span className="social-chip__icon" aria-hidden="true"><IconFacebook /></span>
            <span className="social-chip__copy">
              <strong>Facebook</strong>
              <em>Novidades da loja</em>
            </span>
          </a>
          <a className="social-chip" href={tiktokUrl} target="_blank" rel="noreferrer">
            <span className="social-chip__icon" aria-hidden="true"><IconTikTok /></span>
            <span className="social-chip__copy">
              <strong>TikTok</strong>
              <em>Looks e tendências</em>
            </span>
          </a>
          <a className="social-chip" href={kwaiUrl} target="_blank" rel="noreferrer">
            <span className="social-chip__icon" aria-hidden="true"><IconKwai /></span>
            <span className="social-chip__copy">
              <strong>Kwai</strong>
              <em>Conteúdo e promoções</em>
            </span>
          </a>
        </aside>
        <div className="social__embed">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={instagramUrl}
            data-instgrm-version="14"
          >
            <a href={instagramUrl} target="_blank" rel="noreferrer">Ver @fabiootica_jp no Instagram</a>
          </blockquote>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__brand"><Brand /><p>Visão, estilo e cuidado<br />em cada detalhe.</p></div>
        <div className="footer__nav"><small>NAVEGAÇÃO</small><a href="#sobre">Sobre</a><a href="#experiencia">Experiência</a><a href="#atendimento">Atendimento</a><a href="#como-funciona">Como funciona</a><a href="#loja">A loja</a><a href="#galeria">Galeria</a></div>
        <div className="footer__address"><small>VISITE-NOS</small><p>Rua Roberto Paulo Moreira Coutinho, 1960<br />Sala 104 · Altiplano · João Pessoa — PB</p><a href={mapsUrl} target="_blank" rel="noreferrer">Como chegar <Arrow /></a></div>
        <div className="footer__social">
          <small>SIGA A GENTE</small>
          <a className="footer__social-link" href={instagramUrl} target="_blank" rel="noreferrer">
            <span className="footer__social-icon" aria-hidden="true"><IconInstagram /></span>
            <span>
              <strong>@fabiootica_jp</strong>
              <em>Siga no Instagram</em>
            </span>
          </a>
        </div>
        <div className="footer__bottom"><span>© 2026 Fábio Ótica</span><span>Feito para novos olhares.</span></div>
      </footer>

      {scheduleOpen ? (
        <div className="scheduler" role="dialog" aria-modal="true" aria-labelledby="scheduler-title">
          <button type="button" className="scheduler__backdrop" aria-label="Fechar agendamento" onClick={closeSchedule} />
          <div className="scheduler__panel">
            <div className="scheduler__top">
              <p className="eyebrow">WhatsApp · (83) 99625-8437</p>
              <button type="button" className="scheduler__close" onClick={closeSchedule} aria-label="Fechar">×</button>
            </div>
            <h2 id="scheduler-title">Agende seu atendimento</h2>

            <div className="scheduler__intents">
              <button type="button" className={intent === "visita" ? "is-active" : ""} onClick={() => setIntent("visita")}>Visita em casa</button>
              <button type="button" className={intent === "loja" ? "is-active" : ""} onClick={() => setIntent("loja")}>Atendimento na loja</button>
            </div>

            {intent ? (
              <>
                <label className="scheduler__field">
                  <span>Seu nome</span>
                  <input type="text" value={clientName} onChange={(event) => setClientName(event.target.value)} placeholder="Como devemos te chamar" />
                </label>

                <label className="scheduler__field">
                  <span>Data</span>
                  <input type="date" min={todayISO()} value={visitDate} onChange={(event) => setVisitDate(event.target.value)} />
                </label>
                <div className="scheduler__field">
                  <span>Horário</span>
                  <div className="scheduler__slots">
                    {timeSlots.map((slot) => (
                      <button type="button" key={slot} className={visitTime === slot ? "is-active" : ""} onClick={() => setVisitTime(slot)}>
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {intent === "visita" ? (
                  <label className="scheduler__field">
                    <span>Bairro ou endereço da visita</span>
                    <input type="text" value={place} onChange={(event) => setPlace(event.target.value)} placeholder="Ex.: Altiplano, João Pessoa" />
                  </label>
                ) : null}

                <BrandButton type="button" className="scheduler__send" disabled={!canSend} onClick={sendToWhatsApp}>
                  Confirmar
                </BrandButton>
                {!canSend ? (
                  <p className="scheduler__hint">Escolha data e horário para continuar.</p>
                ) : null}
              </>
            ) : (
              <p className="scheduler__hint">Comece escolhendo visita ou atendimento na loja.</p>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
