import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const source = "https://evobikes.cl/";
const URLS = [
  "https://evobikes.cl/cl/bolsos/",
  "https://evobikes.cl/cl/bolsos-de-transporte/",
    "https://evobikes.cl/cl/bombines/",
    "https://evobikes.cl/cl/candados/",
    "https://evobikes.cl/cl/caramagiolas/",
    "https://evobikes.cl/cl/ciclocomputadores/",
    "https://evobikes.cl/cl/luces/",
    "https://evobikes.cl/cl/silla-portabebe-accesorios/"
];

const secondPrice = (price) => {
  price = price.replace(/[\n\t]+/g, "");
  return price;
};

const accesorios = [];

for (let i = 0; i < URLS.length; i++) {
  const res = await fetch(URLS[i]);
  const html = await res.text();

  const $ = cheerio.load(html);
  $(".item-product").each((index, el) => {
    const rawNombre = $(el).find(".item-title").text();
    const Nombre = rawNombre.replace(/[\n\t]+/g, "");
    const rawPrecio = $(el).find(".price").text();
    const Precio = secondPrice(rawPrecio);

    const imgURL = $(el).find(".item-thumb img").attr("data-src");

    const URLproducto = $(el).find(".item-thumb a").attr("href");

    const data = {
      Nombre,
      Precio,
      imgURL,
      URLproducto,
    };

    accesorios.push(data);
  });
}

for (let i = 0; i < accesorios.length; i++) {
  accesorios[i] = { id: i + 1, ...accesorios[i] };
}

const data = JSON.stringify(accesorios, null, 2);
const filePath = path.join(process.cwd(), "./db/evobike/accesorios.json");

await writeFile(filePath, data, "utf-8");
