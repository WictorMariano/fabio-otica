export type CatalogPhoto = {
  src: string;
  alt: string;
};

export type CatalogModel = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  tags: string[];
  badge?: string;
  photos: CatalogPhoto[];
};

export type CatalogCollection = {
  id: string;
  name: string;
  description: string;
  highlight: string;
  models: CatalogModel[];
};

function photos(basePath: string, modelName: string, count: number): CatalogPhoto[] {
  return Array.from({ length: count }, (_, index) => {
    const n = String(index + 1).padStart(2, "0");
    return {
      src: `${basePath}/${n}.jpg`,
      alt: `${modelName} — foto ${index + 1}`,
    };
  });
}

export const catalogCollections: CatalogCollection[] = [
  {
    id: "ecko",
    name: "Ecko Unltd.",
    highlight: "Street & urban",
    description:
      "Presença urbana com acabamento leve. Ideal para quem busca estilo casual com assinatura de marca.",
    models: [
      {
        id: "ecko-round-metal",
        name: "Ecko Round Metal",
        subtitle: "Metal redondo",
        description: "Armação redonda em metal fino, leve no rosto e com visual clean para o dia a dia.",
        tags: ["Metal", "Redondo", "Unissex"],
        badge: "Disponível",
        photos: photos("/images/catalog/ecko/round-metal", "Ecko Round Metal", 1),
      },
      {
        id: "ecko-ko2017",
        name: "Ecko KO2017 Tartaruga",
        subtitle: "KO2017 C3",
        description: "Retangular em acetato tartaruga com detalhe metálico na haste — clássico com atitude.",
        tags: ["Acetato", "Tartaruga", "Retangular"],
        badge: "Destaque",
        photos: photos("/images/catalog/ecko/ko2017-tartaruga", "Ecko KO2017 Tartaruga", 1),
      },
    ],
  },
  {
    id: "lougge",
    name: "Lougge",
    highlight: "Collezione Milano",
    description:
      "Metal geométrico com pontas em acetato teal. Peças sofisticadas para quem gosta de detalhe fino.",
    models: [
      {
        id: "lougge-lou-830",
        name: "Lougge LOU 830",
        subtitle: "Prata & teal · 60-17-142",
        description: "Silhueta oversized em metal prata com ponteiras teal translúcidas. Leve e marcante.",
        tags: ["Metal", "Geométrico", "Teal"],
        badge: "Mais visto",
        photos: photos("/images/catalog/lougge/lou-830", "Lougge LOU 830", 6),
      },
      {
        id: "lougge-lgo-930",
        name: "Lougge LGO 930",
        subtitle: "Collezione Milano · 60-17-145",
        description: "Linha Milano com filete teal na aro e hastes delicadas. Presença elegante sem exagero.",
        tags: ["Milano", "Oversized", "Premium"],
        badge: "Novo",
        photos: photos("/images/catalog/lougge/lgo-930", "Lougge LGO 930", 4),
      },
    ],
  },
  {
    id: "acetato",
    name: "Volk's & acetato",
    highlight: "Forma & textura",
    description:
      "Acetato com personalidade: cat-eye, redondo, tartaruga e o brilho da linha Ana Hickmann Glam.",
    models: [
      {
        id: "ana-hickmann-glam",
        name: "Ana Hickmann Glam",
        subtitle: "AH6005B · Coleção 20 Anos",
        description: "Frente preta com hastes douradas e cristais. Peça glamourosa para ocasiões especiais.",
        tags: ["Feminino", "Cristais", "Premium"],
        badge: "Glam",
        photos: photos("/images/catalog/acetato/ana-hickmann-glam", "Ana Hickmann Glam", 4),
      },
      {
        id: "volks-tartaruga",
        name: "Volk's Tartaruga",
        subtitle: "Acetato bold",
        description: "Acetato encorpado em tartaruga, com presença forte e acabamento polido.",
        tags: ["Acetato", "Tartaruga", "Bold"],
        photos: photos("/images/catalog/acetato/volks-tartaruga", "Volk's Tartaruga", 3),
      },
      {
        id: "volks-t779",
        name: "Volk's T779",
        subtitle: "T779 C5 · 52-17-145",
        description: "Redondo em nylon translúcido com dobradiça dourada. Leveza e estilo contemporâneo.",
        tags: ["Redondo", "Nylon", "Unissex"],
        photos: photos("/images/catalog/acetato/volks-t779", "Volk's T779", 2),
      },
      {
        id: "volks-7778",
        name: "Volk's 7778 Cat-Eye",
        subtitle: "7778 C5 · 52-17-142",
        description: "Cat-eye em smoke/tartaruga com detalhe dourado na articulação.",
        tags: ["Cat-eye", "Feminino", "Designer"],
        photos: photos("/images/catalog/acetato/volks-7778", "Volk's 7778 Cat-Eye", 1),
      },
      {
        id: "ba1517",
        name: "BA1517 Tartaruga",
        subtitle: "BA1517 C2 · 53-21-145",
        description: "Retangular clássico em tartaruga escuro — versátil para grau no cotidiano.",
        tags: ["Retangular", "Clássico", "Grau"],
        photos: photos("/images/catalog/acetato/ba1517", "BA1517 Tartaruga", 1),
      },
    ],
  },
  {
    id: "xtreme",
    name: "X-TREME",
    highlight: "Sport prescription",
    description:
      "Armações esportivas de grau com metal, tartaruga e acabamentos dourados da linha Way.",
    models: [
      {
        id: "xtreme-way-mt0801b",
        name: "X-TREME Way MT0801B",
        subtitle: "Gold & tartaruga · C2",
        description: "Frente metal dourado com hastes tartaruga. Equilíbrio entre esportivo e casual.",
        tags: ["Way", "Metal", "Tartaruga"],
        badge: "Way",
        photos: photos("/images/catalog/xtreme/way-mt0801b", "X-TREME Way MT0801B", 4),
      },
      {
        id: "xtreme-way-mt0601b",
        name: "X-TREME Way MT0601B",
        subtitle: "Metal & tartaruga · C2",
        description: "Modelo Way com aro metal e hastes em acetato tartaruga, medidas 54-18-140.",
        tags: ["Way", "Misto", "Grau"],
        photos: photos("/images/catalog/xtreme/way-mt0601b", "X-TREME Way MT0601B", 1),
      },
      {
        id: "xtreme-hm60988",
        name: "X-TREME HM60988",
        subtitle: "Preto & ouro · C1",
        description: "Redondo preto com hastes douradas. Visual clássico com contraste marcado.",
        tags: ["Redondo", "Preto", "Ouro"],
        photos: photos("/images/catalog/xtreme/hm60988", "X-TREME HM60988", 1),
      },
      {
        id: "xtreme-ma0774a",
        name: "X-TREME MA0774A",
        subtitle: "Round gold · C2",
        description: "Armação redonda dourada com ponteiras pretas. Leve e versátil para montagem de grau.",
        tags: ["Gold", "Redondo", "Grau"],
        photos: photos("/images/catalog/xtreme/ma0774a", "X-TREME MA0774A", 1),
      },
    ],
  },
  {
    id: "sol",
    name: "Óculos de sol",
    highlight: "Proteção & estilo",
    description:
      "Silhuetas redondas com contraste preto e ouro para o dia a dia com presença.",
    models: [
      {
        id: "sol-round-preto-ouro",
        name: "Orbit Preto & Ouro",
        subtitle: "Redondo misto",
        description: "Frente preta com hastes douradas finas. Sol com estética moderna e contraste elegante.",
        tags: ["Sol", "Redondo", "UV"],
        badge: "Sol",
        photos: photos("/images/catalog/sol/round-preto-ouro", "Orbit Preto & Ouro", 3),
      },
      {
        id: "sol-round-preto",
        name: "Round Preto Fosco",
        subtitle: "Minimalista",
        description: "Redondo fosco all-black. Discreto, contemporâneo e fácil de combinar.",
        tags: ["Sol", "Preto", "Minimal"],
        photos: photos("/images/catalog/sol/round-preto", "Round Preto Fosco", 1),
      },
    ],
  },
  {
    id: "esportivos",
    name: "Esportivos",
    highlight: "Performance",
    description:
      "Proteção e performance: shield iridescente e wrap polarizado com vedação contra vento e poeira.",
    models: [
      {
        id: "shield-splatter",
        name: "Shield Splatter",
        subtitle: "Lente iridescente",
        description: "Shield envolvente com lente espelhada e armação splatter. Ideal para ciclismo e outdoor.",
        tags: ["Shield", "Esporte", "Espelhado"],
        badge: "Performance",
        photos: photos("/images/catalog/esportivos/shield-splatter", "Shield Splatter", 3),
      },
      {
        id: "wrap-floater",
        name: "Wrap Floater",
        subtitle: "Polarizado · preto/cinza",
        description: "Wrap polarizado com vedação interna e ponteiras cinza. Proteção total para atividades intensas.",
        tags: ["Polarizado", "Wrap", "Proteção"],
        badge: "Polarizado",
        photos: photos("/images/catalog/esportivos/wrap-floater", "Wrap Floater", 4),
      },
    ],
  },
];
