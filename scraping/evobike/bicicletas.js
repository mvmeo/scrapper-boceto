import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const source = "https://evobikes.cl/";
const URLS = [
  "https://evobikes.cl/cl/bicicletas/page/1/",
  "https://evobikes.cl/cl/bicicletas/page/2/",
  "https://evobikes.cl/cl/bicicletas/page/3/",
  "https://evobikes.cl/cl/bicicletas/page/4/",
  "https://evobikes.cl/cl/bicicletas/page/5/",
  "https://evobikes.cl/cl/bicicletas/page/6/",
];

const secondPrice = (price) => {
  price = price.replace(/[\n\t]+/g, "");
  return price;
};

const bicicletas = [];

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

    bicicletas.push(data);
  });
}

for (let i = 0; i < bicicletas.length; i++) {
  bicicletas[i] = { id: i + 1, ...bicicletas[i] };
}

const data = JSON.stringify(bicicletas, null, 2);
const filePath = path.join(process.cwd(), "./db/evobike/bicicletas.json");

await writeFile(filePath, data, "utf-8");
