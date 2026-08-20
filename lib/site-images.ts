export type SiteImage = {
  src: string;
  alt: string;
};

export type FeaturedItem = SiteImage & {
  title: string;
};

export const aboutImage: SiteImage = {
  src: "/images/real/about/atendimento.jpg",
  alt: "Atendimento na Fábio Ótica: cliente sentada à mesa de consulta e profissional ao lado, com expositores de armações ao fundo",
};

export const serviceVisitImage: SiteImage = {
  src: "/images/visita-domicilio.png",
  alt: "Óptico profissional realizando atendimento em domicílio, apresentando mostruário de armações para uma cliente",
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
    src: "/images/real/featured/02-detalhe-armacoes.jpg",
    alt: "Detalhe de armações de grau em exposição na Fábio Ótica",
  },
  {
    title: "Óculos de sol",
    src: "/images/real/featured/04-oculos-de-sol.jpg",
    alt: "Óculos de sol em exposição na Fábio Ótica, com destaque para modelos Louge",
  },
  {
    title: "Óculos personalizados",
    src: "/images/real/featured/05-oculos-personalizados.jpg",
    alt: "Armações variadas em exposição na Fábio Ótica, prontas para montagem personalizada",
  },
];

export { streamImages } from "./stream-images.generated";
