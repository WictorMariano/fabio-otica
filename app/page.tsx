"use client";

import { useEffect, useState } from "react";

const address =
  "Rua Roberto Paulo Moreira Coutinho, 1960, Sala 104, Altiplano, João Pessoa - PB";
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const eventDate = new Date("2026-08-08T10:00:00-03:00").getTime();

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(): TimeLeft | null {
  const distance = eventDate - Date.now();
  if (distance <= 0) return null;
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

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
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

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

      <section className="event" id="visite">
        <div className="event__topline"><span>Convite especial</span><span>08 · 08 · 2026</span></div>
        <div className="event__content">
          <div className="event__copy">
            <p className="eyebrow light"><span /> Estamos de portas abertas</p>
            <h2>Um novo olhar<br />acaba de <em>chegar.</em></h2>
            <p>Neste sábado, abrimos as portas de um espaço criado para transformar a escolha dos seus óculos em uma experiência especial.</p>
          </div>
          <div className="event__date">
            <p><strong>08</strong><span>AGOSTO<br /><b>2026</b></span></p>
            <div><span>SÁBADO</span><b>A PARTIR DAS 10H</b></div>
          </div>
        </div>
        <div className="countdown" aria-label="Contagem regressiva para a inauguração">
          {timeLeft ? (
            <>
              {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
                <div key={unit}><strong>{String(timeLeft[unit]).padStart(2, "0")}</strong><span>{{ days: "dias", hours: "horas", minutes: "minutos", seconds: "segundos" }[unit]}</span></div>
              ))}
            </>
          ) : (
            <p className="countdown__open">Já estamos de portas abertas. Esperamos por você!</p>
          )}
        </div>
        <div className="location-card">
          <div className="location-card__pin" aria-hidden="true">⌖</div>
          <div><small>ONDE ESTAMOS</small><h3>Rua Roberto Paulo Moreira Coutinho, 1960</h3><p>Sala 104 · Altiplano · Em frente ao Colégio Kairós</p></div>
          <a className="button button--gold" href={mapsUrl} target="_blank" rel="noreferrer">Abrir no mapa <Arrow /></a>
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
