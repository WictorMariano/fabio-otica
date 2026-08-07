"use client";

import { useState } from "react";

const address =
  "Rua Roberto Paulo Moreira Coutinho, 1960, Sala 104, Altiplano, João Pessoa - PB";
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
const googleReviewsUrl = `https://www.google.com/search?q=${encodeURIComponent(`Fábio Ótica ${address} avaliações`)}`;

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand ${compact ? "brand--compact" : ""}`} href="#inicio" aria-label="Fábio Ótica — início">
      <span className="brand__glasses" aria-hidden="true">
        <i />
        <i />
      </span>
      <strong>FÁBIO</strong>
      <span className="brand__sub"><b /> ÓTICA <b /></span>
    </a>
  );
}

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <div className="announcement">
        <span>Inauguração</span>
        <p>08 de agosto · a partir das 10h</p>
        <a href="#visite">Ver detalhes <span aria-hidden="true">→</span></a>
      </div>

      <header className="header">
        <Brand compact />
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "nav nav--open" : "nav"} aria-label="Navegação principal">
          <a href="#experiencia" onClick={() => setMenuOpen(false)}>Experiência</a>
          <a href="#colecoes" onClick={() => setMenuOpen(false)}>Coleções</a>
          <a href="#loja" onClick={() => setMenuOpen(false)}>A loja</a>
          <a href="#depoimentos" onClick={() => setMenuOpen(false)}>Depoimentos</a>
          <a href="#visite" onClick={() => setMenuOpen(false)}>Localização</a>
        </nav>
        <a className="header__cta" href={mapsUrl} target="_blank" rel="noreferrer">
          Como chegar <Arrow />
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero__glow" />
        <div className="hero__content">
          <p className="eyebrow light"><span /> Óculos, estilo e cuidado</p>
          <h1>Enxergue o mundo<br />com o seu <em>estilo.</em></h1>
          <p className="hero__lead">
            Armações selecionadas e uma experiência pensada para você encontrar a combinação certa entre conforto, identidade e personalidade.
          </p>
          <div className="hero__actions">
            <a className="button button--gold" href="#colecoes">Conheça a Fábio Ótica <Arrow /></a>
            <a className="text-link" href="#visite">Visite nossa loja <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="hero__visual" aria-label="Interior real da Fábio Ótica">
          <div className="hero__image-wrap">
            <img src="/images/loja-real-hero.png" alt="Interior real da Fábio Ótica, com mobiliário em madeira, expositores iluminados e pendentes" />
          </div>
          <div className="hero__seal">
            <span>NOVA</span>
            <b>FÁBIO<br />ÓTICA</b>
            <small>ALTIPLANO</small>
          </div>
          <div className="hero__caption">
            <span>01</span>
            <p>Uma nova experiência<br />em ótica espera por você.</p>
          </div>
        </div>
        <a className="scroll-hint" href="#experiencia"><span>Role para descobrir</span><i>↓</i></a>
      </section>

      <section className="manifesto section" id="experiencia">
        <div className="section__number">01</div>
        <div className="manifesto__intro">
          <p className="eyebrow"><span /> A experiência Fábio Ótica</p>
          <h2>Mais do que escolher<br />um <em>óculos.</em></h2>
        </div>
        <div className="manifesto__copy">
          <p className="dropcap">Os óculos acompanham o seu olhar e fazem parte da sua imagem todos os dias.</p>
          <p>Por isso, cada escolha merece tempo, atenção e um olhar cuidadoso para os detalhes. Na Fábio Ótica, você encontra um ambiente feito para experimentar novas possibilidades com calma.</p>
          <a className="line-link" href="#loja">Conheça nosso espaço <Arrow /></a>
        </div>
        <figure className="manifesto__visual">
          <img src="/images/colecao-cinematografica.png" alt="Composição editorial cinematográfica com diferentes modelos de óculos" />
          <figcaption><span>Uma curadoria para cada estilo</span><b>FÁBIO ÓTICA · ALTIPLANO</b></figcaption>
        </figure>
        <div className="values">
          <article><span>01</span><h3>Curadoria</h3><p>Armações escolhidas para diferentes traços, estilos e momentos.</p></article>
          <article><span>02</span><h3>Proximidade</h3><p>Uma boa conversa para entender o que combina com você.</p></article>
          <article><span>03</span><h3>Cuidado</h3><p>Atenção ao encaixe, ao conforto e a cada detalhe da escolha.</p></article>
        </div>
      </section>

      <section className="collections" id="colecoes">
        <div className="collections__heading">
          <p className="eyebrow light"><span /> Para cada olhar</p>
          <h2>Encontre o modelo<br />que acompanha <em>você.</em></h2>
          <p>Clássico, marcante, discreto ou contemporâneo. Venha experimentar e descubra a armação que faz sentido para o seu jeito de ver o mundo.</p>
        </div>
        <div className="collection-list">
          <article className="collection-card collection-card--sun">
            <span>01</span><div><small>ESTILO & PROTEÇÃO</small><h3>Óculos de sol</h3><p>Personalidade para acompanhar os seus dias.</p></div><b>↗</b>
          </article>
          <article className="collection-card collection-card--grade">
            <span>02</span><div><small>CONFORTO & IDENTIDADE</small><h3>Óculos de grau</h3><p>Armações que valorizam seus traços e sua rotina.</p></div><b>↗</b>
          </article>
          <article className="collection-card collection-card--lens">
            <span>03</span><div><small>CLAREZA & PRECISÃO</small><h3>Lentes</h3><p>Soluções pensadas para as necessidades do seu olhar.</p></div><b>↗</b>
          </article>
        </div>
      </section>

      <section className="store section" id="loja">
        <div className="section__number">02</div>
        <div className="store__visual">
          <div className="store__frame store__frame--main">
            <img src="/images/entrada-loja-real.png" alt="Entrada real da Fábio Ótica, com portas de vidro, mobiliário em madeira e identidade visual dourada" />
          </div>
          <div className="store__frame store__frame--secondary">
            <img src="/images/ajuste-editorial.png" alt="Fotografia editorial mostrando o cuidado no ajuste de uma armação" />
          </div>
          <div className="store__tag"><span>●</span> Curadoria · cuidado · estilo</div>
        </div>
        <div className="store__copy">
          <p className="eyebrow"><span /> Nosso espaço</p>
          <h2>Criado para<br /><em>receber você.</em></h2>
          <p>Um ambiente elegante e acolhedor, preparado para que você possa conhecer, experimentar e escolher com tranquilidade.</p>
          <ul>
            <li><span>01</span> Iluminação confortável e ambiente acolhedor</li>
            <li><span>02</span> Exposição pensada para facilitar sua escolha</li>
            <li><span>03</span> Atendimento próximo, no seu tempo</li>
          </ul>
          <a className="button button--dark" href={mapsUrl} target="_blank" rel="noreferrer">Visite a nossa loja <Arrow /></a>
        </div>
      </section>

      <section className="testimonials" id="depoimentos">
        <div className="testimonials__heading">
          <p className="eyebrow light"><span /> Experiências reais</p>
          <h2>O que dizem<br />sobre a <em>Fábio Ótica.</em></h2>
          <p>A confiança se constrói em cada atendimento. Consulte as avaliações públicas e compartilhe também a sua experiência.</p>
        </div>
        <div className="testimonials__google">
          <div className="google-mark" aria-hidden="true">G</div>
          <div className="stars" aria-label="Avaliações do Google">☆ ☆ ☆ ☆ ☆</div>
          <h3>Os primeiros olhares começam agora.</h3>
          <p>Esta é uma nova unidade. Assim que as primeiras avaliações verificadas forem publicadas, elas poderão ser consultadas diretamente no Google.</p>
          <div className="testimonials__actions">
            <a className="button button--gold" href={googleReviewsUrl} target="_blank" rel="noreferrer">Ver avaliações no Google <Arrow /></a>
            <a className="line-link line-link--light" href={mapsUrl} target="_blank" rel="noreferrer">Avaliar no Google <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="contact" id="visite">
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
          <p className="eyebrow"><span /> Endereço e contato</p>
          <h2>Venha conhecer<br />seu novo <em>olhar.</em></h2>
          <div className="contact__details">
            <div><small>ENDEREÇO</small><p>Rua Roberto Paulo Moreira Coutinho, 1960<br />Sala 104 · Altiplano · João Pessoa — PB</p></div>
            <div><small>REFERÊNCIA</small><p>Em frente ao Colégio Kairós</p></div>
            <div><small>INAUGURAÇÃO</small><p>Sábado, 08 de agosto · a partir das 10h</p></div>
          </div>
          <div className="contact__actions">
            <a className="button button--dark" href={mapsUrl} target="_blank" rel="noreferrer">Como chegar <Arrow /></a>
            <a className="line-link" href={googleReviewsUrl} target="_blank" rel="noreferrer">Ver no Google <Arrow /></a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__brand"><Brand /><p>Visão, estilo e cuidado<br />em cada detalhe.</p></div>
        <div className="footer__nav"><small>NAVEGAÇÃO</small><a href="#experiencia">Experiência</a><a href="#colecoes">Coleções</a><a href="#loja">A loja</a></div>
        <div className="footer__address"><small>VISITE-NOS</small><p>Rua Roberto Paulo Moreira Coutinho, 1960<br />Sala 104 · Altiplano · João Pessoa — PB</p><a href={mapsUrl} target="_blank" rel="noreferrer">Como chegar <Arrow /></a></div>
        <div className="footer__bottom"><span>© 2026 Fábio Ótica</span><span>Feito para novos olhares.</span></div>
      </footer>
    </main>
  );
}
