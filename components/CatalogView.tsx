"use client";

import { useEffect, useState } from "react";
import CookieConsent from "@/components/CookieConsent";
import { BrandLink } from "@/components/BrandButton";
import ModelCarousel from "@/components/ModelCarousel";
import { catalogCollections } from "@/lib/catalog";

const whatsappNumber = "5583996258437";

function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand ${compact ? "brand--compact" : ""}`} href="/" aria-label="Fábio Ótica, início">
      <img src="/logo-otica-fabio.png" alt="Ótica Fábio" />
    </a>
  );
}

export default function CatalogView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalModels = catalogCollections.reduce((sum, collection) => sum + collection.models.length, 0);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <main className="catalog-page">
      <header className={menuOpen ? "header header--menu-open" : "header"}>
        <div className="header__bar">
          <Brand compact />
          <button
            className={menuOpen ? "menu-button menu-button--open" : "menu-button"}
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="menu-principal-catalogo"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <nav
          id="menu-principal-catalogo"
          className={menuOpen ? "nav nav--open" : "nav"}
          aria-label="Navegação principal"
        >
          <div className="nav__top">
            <p className="nav__label">Menu</p>
            <button type="button" className="nav__close" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}>
              Fechar
            </button>
          </div>
          <a href="/" onClick={() => setMenuOpen(false)}>
            Início
          </a>
          <a href="/#sobre" onClick={() => setMenuOpen(false)}>
            Sobre
          </a>
          <a href="/#experiencia" onClick={() => setMenuOpen(false)}>
            Experiência
          </a>
          <a href="/catalogo" aria-current="page" onClick={() => setMenuOpen(false)}>
            Catálogo
          </a>
          <a href="/#atendimento" onClick={() => setMenuOpen(false)}>
            Atendimento
          </a>
          <a href="/#loja" onClick={() => setMenuOpen(false)}>
            A loja
          </a>
          <a href="/#galeria" onClick={() => setMenuOpen(false)}>
            Galeria
          </a>
          <a href="/#agendar" onClick={() => setMenuOpen(false)}>
            Agendar
          </a>
        </nav>
        {menuOpen ? (
          <button type="button" className="nav-backdrop" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />
        ) : null}
      </header>

      <section className="catalog-hero" id="inicio">
        <div className="catalog-hero__media" aria-hidden="true">
          <img src="/images/real/stream/11-colecao.jpg" alt="" />
        </div>
        <div className="catalog-hero__content">
          <p className="eyebrow light">Loja virtual · Catálogo</p>
          <h1>
            Coleções <em>Fábio Ótica</em>
          </h1>
          <p>
            Explore {catalogCollections.length} linhas e {totalModels} modelos. Amplie as fotos, compare os ângulos e
            consulte disponibilidade pelo WhatsApp.
          </p>
          <div className="catalog-hero__actions">
            <BrandLink href={`#${catalogCollections[0]?.id ?? "ecko"}`}>Começar a comprar</BrandLink>
            <a
              className="line-link line-link--light"
              href={whatsappUrl("Olá, Fábio Ótica! Quero conhecer o catálogo de armações.")}
              target="_blank"
              rel="noreferrer"
            >
              Falar com a loja ↗
            </a>
          </div>
          <ul className="catalog-hero__facts">
            <li>
              <strong>{catalogCollections.length}</strong>
              <span>coleções</span>
            </li>
            <li>
              <strong>{totalModels}</strong>
              <span>modelos</span>
            </li>
            <li>
              <strong>Zoom</strong>
              <span>nas fotos</span>
            </li>
          </ul>
        </div>
      </section>

      <nav className="catalog-jump" aria-label="Ir para coleção">
        <span className="catalog-jump__label">Departamentos</span>
        {catalogCollections.map((collection) => (
          <a key={collection.id} href={`#${collection.id}`}>
            {collection.name}
          </a>
        ))}
      </nav>

      <div className="catalog-sections">
        {catalogCollections.map((collection, index) => (
          <section
            key={collection.id}
            className={index % 2 === 0 ? "catalog-collection" : "catalog-collection catalog-collection--alt"}
            id={collection.id}
          >
            <div className="catalog-collection__intro">
              <p className="eyebrow">{collection.highlight}</p>
              <h2>{collection.name}</h2>
              <p>{collection.description}</p>
            </div>

            <div className="catalog-models">
              {collection.models.map((model) => (
                <article className="catalog-model" key={model.id}>
                  {model.badge ? <span className="catalog-model__badge">{model.badge}</span> : null}
                  <ModelCarousel photos={model.photos} label={`${model.name} — ${model.subtitle}`} />
                  <div className="catalog-model__copy">
                    <p className="catalog-model__sku">{model.subtitle}</p>
                    <h3>{model.name}</h3>
                    <p className="catalog-model__desc">{model.description}</p>
                    <ul className="catalog-model__tags">
                      {model.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <div className="catalog-model__actions">
                      <BrandLink
                        href={whatsappUrl(
                          `Olá, Fábio Ótica! Tenho interesse no modelo ${model.name} da coleção ${collection.name}.`,
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Consultar
                      </BrandLink>
                      <p className="catalog-model__note">Preço e lentes sob consulta</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="catalog-cta">
        <div className="catalog-cta__inner">
          <p className="eyebrow">Atendimento</p>
          <h2>Achou o modelo? A gente monta com você.</h2>
          <p>
            Tire dúvidas de medida, lente e disponibilidade. Atendimento na loja ou por WhatsApp, com a mesma
            atenção de sempre.
          </p>
          <div className="catalog-cta__actions">
            <BrandLink href={whatsappUrl("Olá, Fábio Ótica! Quero ajuda para escolher um óculos do catálogo.")} target="_blank" rel="noreferrer">
              WhatsApp da loja
            </BrandLink>
            <a className="line-link" href="/#agendar">
              Agendar visita ↗
            </a>
          </div>
        </div>
      </section>

      <footer className="footer catalog-footer">
        <div className="footer__brand">
          <img src="/logo-otica-fabio.png" alt="Ótica Fábio" />
          <p>Catálogo de coleções e modelos da Fábio Ótica.</p>
        </div>
        <div className="footer__nav">
          <small>NAVEGAÇÃO</small>
          <a href="/">Início</a>
          <a href="/catalogo">Catálogo</a>
          <a href="/#loja">A loja</a>
          <a href="/#agendar">Agendar</a>
        </div>
        <div className="footer__address">
          <small>VISITE-NOS</small>
          <p>
            Rua Roberto Paulo Moreira Coutinho, 1960
            <br />
            Sala 104, Altiplano, João Pessoa, PB
          </p>
        </div>
      </footer>

      <CookieConsent />
    </main>
  );
}
