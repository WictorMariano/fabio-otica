import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const source = path.join(root, "imagens gerais 2");
const output = path.join(root, "public", "images", "real");

const presets = {
  store: { width: 1200, height: 750 },
  featured: { width: 800, height: 1000 },
  service: { width: 1200, height: 750 },
  about: { width: 900, height: 900 },
  stream: { width: 800, height: 1000 },
};

async function cropResize(input, dest, { width, height }) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await sharp(input)
    .rotate()
    .resize(width, height, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);
}

const jobs = [
  // Store carousel — numbered Google Maps photos
  ...[
    ["google maps/01-fachada-fabio-otica.jpg", "store/01-fachada.jpg"],
    ["google maps/02-entrada-da-loja.jpg", "store/02-entrada.jpg"],
    ["google maps/03-recepcao-e-marca.jpg", "store/03-recepcao.jpg"],
    ["google maps/04-variedade-de-armacoes.jpg", "store/04-armacoes.jpg"],
    ["google maps/05-visao-geral-da-loja.jpg", "store/05-visao-geral.jpg"],
    ["google maps/06-panorama-do-ambiente.jpg", "store/06-panorama.jpg"],
    ["google maps/07-atendimento-personalizado.jpg", "store/07-atendimento.jpg"],
    ["google maps/08-cliente-em-atendimento.jpg", "store/08-cliente.jpg"],
    ["google maps/09-detalhe-das-armacoes.jpg", "store/09-detalhe.jpg"],
    ["google maps/10-oculos-esportivos-mormaii.jpg", "store/10-oculos-esportivos.jpg"],
  ].map(([src, dest]) => ({ src, dest, preset: "store" })),

  // Featured carousel
  { src: "google maps/04-variedade-de-armacoes.jpg", dest: "featured/01-variedade-armacoes.jpg", preset: "featured" },
  { src: "google maps/09-detalhe-das-armacoes.jpg", dest: "featured/02-detalhe-armacoes.jpg", preset: "featured" },
  { src: "google maps/10-oculos-esportivos-mormaii.jpg", dest: "featured/03-oculos-esportivos.jpg", preset: "featured" },

  // Service cards
  { src: "google maps/07-atendimento-personalizado.jpg", dest: "service/visita.jpg", preset: "service" },
  { src: "google maps/05-visao-geral-da-loja.jpg", dest: "service/loja.jpg", preset: "service" },

  // About
  { src: "google maps/08-cliente-em-atendimento.jpg", dest: "about/atendimento.jpg", preset: "about" },

  // ImageStream corridor
  ...[
    ["google maps/01-fachada-fabio-otica.jpg", "stream/01-fachada.jpg"],
    ["google maps/02-entrada-da-loja.jpg", "stream/02-entrada.jpg"],
    ["google maps/03-recepcao-e-marca.jpg", "stream/03-recepcao.jpg"],
    ["google maps/04-variedade-de-armacoes.jpg", "stream/04-armacoes.jpg"],
    ["google maps/05-visao-geral-da-loja.jpg", "stream/05-visao-geral.jpg"],
    ["google maps/06-panorama-do-ambiente.jpg", "stream/06-panorama.jpg"],
    ["google maps/07-atendimento-personalizado.jpg", "stream/07-atendimento.jpg"],
    ["google maps/08-cliente-em-atendimento.jpg", "stream/08-cliente.jpg"],
    ["google maps/09-detalhe-das-armacoes.jpg", "stream/09-detalhe.jpg"],
    ["google maps/10-oculos-esportivos-mormaii.jpg", "stream/10-oculos-esportivos.jpg"],
    ["google maps/foto-fabio-otica-011.jpg", "stream/11-expositor.jpg"],
    ["google maps/foto-fabio-otica-040.jpg", "stream/12-colecao.jpg"],
    ["google maps/foto-fabio-otica-052.jpg", "stream/13-ambiente.jpg"],
    ["fotos/foto-fabio-otica-015.jpg", "stream/14-armacao.jpg"],
    ["fotos/foto-fabio-otica-033.jpg", "stream/15-mostruario.jpg"],
    ["fotos/foto-fabio-otica-048.jpg", "stream/16-atendimento.jpg"],
  ].map(([src, dest]) => ({ src, dest, preset: "stream" })),
];

let totalBytes = 0;

for (const job of jobs) {
  const input = path.join(source, job.src);
  const dest = path.join(output, job.dest);
  await cropResize(input, dest, presets[job.preset]);
  const stat = await fs.stat(dest);
  totalBytes += stat.size;
  console.log(`✓ ${job.dest} (${Math.round(stat.size / 1024)} KB)`);
}

console.log(`\nDone: ${jobs.length} images, ${(totalBytes / 1024 / 1024).toFixed(2)} MB total`);
