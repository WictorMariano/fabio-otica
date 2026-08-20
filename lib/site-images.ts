export type SiteImage = {
  src: string;
  alt: string;
};

export type FeaturedItem = SiteImage & {
  title: string;
};

export const aboutImage: SiteImage = {
  src: "/images/real/about/atendimento.jpg",
  alt: "Cliente em atendimento personalizado na Fábio Ótica",
};

export const serviceVisitImage: SiteImage = {
  src: "/images/real/service/visita.jpg",
  alt: "Atendimento personalizado com mostruário de armações na Fábio Ótica",
};

export const serviceStoreImage: SiteImage = {
  src: "/images/real/service/loja.jpg",
  alt: "Visão geral do interior da Fábio Ótica, com expositores e ambiente acolhedor",
};

export const spacePhotos: SiteImage[] = [
  { src: "/images/real/store/05-visao-geral.jpg", alt: "Visão geral do interior da Fábio Ótica, com recepção, mesas de atendimento e expositores" },
  { src: "/images/real/store/01-fachada.jpg", alt: "Fachada da Fábio Ótica em João Pessoa, com identidade visual dourada" },
  { src: "/images/real/store/02-entrada.jpg", alt: "Entrada da loja com portas de vidro e iluminação acolhedora" },
  { src: "/images/real/store/03-recepcao.jpg", alt: "Recepção da Fábio Ótica com a marca em destaque" },
  { src: "/images/real/store/04-armacoes.jpg", alt: "Variedade de armações expostas na loja" },
  { src: "/images/real/store/06-panorama.jpg", alt: "Panorama do ambiente da loja com expositores iluminados" },
  { src: "/images/real/store/07-atendimento.jpg", alt: "Atendimento personalizado na Fábio Ótica" },
  { src: "/images/real/store/08-cliente.jpg", alt: "Cliente sendo atendida na loja" },
  { src: "/images/real/store/09-detalhe.jpg", alt: "Detalhe de armações premium em exposição" },
  { src: "/images/real/store/10-oculos-esportivos.jpg", alt: "Óculos esportivos Mormaii em exposição na loja" },
];

export const featuredItems: FeaturedItem[] = [
  {
    title: "Óculos de grau",
    src: "/images/real/featured/01-variedade-armacoes.jpg",
    alt: "Variedade de armações de grau expostas na Fábio Ótica",
  },
  {
    title: "Óculos de sol",
    src: "/images/real/featured/02-detalhe-armacoes.jpg",
    alt: "Detalhe de armações de sol em exposição na loja",
  },
  {
    title: "Óculos personalizados",
    src: "/images/real/featured/03-oculos-esportivos.jpg",
    alt: "Óculos esportivos Mormaii disponíveis na Fábio Ótica",
  },
];

export const streamImages: SiteImage[] = [
  { src: "/images/real/stream/01-fachada.jpg", alt: "Fachada da Fábio Ótica" },
  { src: "/images/real/stream/02-entrada.jpg", alt: "Entrada da loja" },
  { src: "/images/real/stream/03-recepcao.jpg", alt: "Recepção e marca" },
  { src: "/images/real/stream/04-armacoes.jpg", alt: "Variedade de armações" },
  { src: "/images/real/stream/05-visao-geral.jpg", alt: "Visão geral da loja" },
  { src: "/images/real/stream/06-panorama.jpg", alt: "Panorama do ambiente" },
  { src: "/images/real/stream/07-atendimento.jpg", alt: "Atendimento personalizado" },
  { src: "/images/real/stream/08-cliente.jpg", alt: "Cliente em atendimento" },
  { src: "/images/real/stream/09-detalhe.jpg", alt: "Detalhe das armações" },
  { src: "/images/real/stream/10-oculos-esportivos.jpg", alt: "Óculos esportivos Mormaii" },
  { src: "/images/real/stream/11-expositor.jpg", alt: "Expositor de armações na loja" },
  { src: "/images/real/stream/12-colecao.jpg", alt: "Coleção de óculos em exposição" },
  { src: "/images/real/stream/13-ambiente.jpg", alt: "Ambiente acolhedor da loja" },
  { src: "/images/real/stream/14-armacao.jpg", alt: "Armação em destaque no mostruário" },
  { src: "/images/real/stream/15-mostruario.jpg", alt: "Mostruário com seleção de óculos" },
  { src: "/images/real/stream/16-atendimento.jpg", alt: "Momento de atendimento na Fábio Ótica" },
];
