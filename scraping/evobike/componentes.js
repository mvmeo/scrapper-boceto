import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const source = "https://evobikes.cl/";
const URLS = [
  "https://evobikes.cl/cl/componentes/page/1/",
  "https://evobikes.cl/cl/componentes/page/2/",
  "https://evobikes.cl/cl/componentes/page/3/",
  "https://evobikes.cl/cl/componentes/page/4/",
  "https://evobikes.cl/cl/componentes/page/5/",
  "https://evobikes.cl/cl/componentes/page/6/",
  "https://evobikes.cl/cl/componentes/page/7/",
  "https://evobikes.cl/cl/componentes/page/8/",
  "https://evobikes.cl/cl/componentes/page/9/",
  "https://evobikes.cl/cl/componentes/page/10/",
  "https://evobikes.cl/cl/componentes/page/11/",
  "https://evobikes.cl/cl/componentes/page/12/",
  "https://evobikes.cl/cl/componentes/page/13/",
  "https://evobikes.cl/cl/componentes/page/14/",
  "https://evobikes.cl/cl/componentes/page/15/",
  "https://evobikes.cl/cl/componentes/page/16/",
  "https://evobikes.cl/cl/componentes/page/17/",
  "https://evobikes.cl/cl/componentes/page/18/",
  "https://evobikes.cl/cl/componentes/page/19/",
  "https://evobikes.cl/cl/componentes/page/20/",
  "https://evobikes.cl/cl/componentes/page/21/",
  "https://evobikes.cl/cl/componentes/page/22/",
  "https://evobikes.cl/cl/componentes/page/23/"
];

const secondPrice = (price) => {
  price = price.replace(/[\n\t]+/g, "");
  return price;
};

const componentes = [];

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

    componentes.push(data);
  });
}

for (let i = 0; i < componentes.length; i++) {
  componentes[i] = { id: i + 1, ...componentes[i] };
}

const data = JSON.stringify(componentes, null, 2);
const filePath = path.join(process.cwd(), "./db/evobike/componentes.json");

await writeFile(filePath, data, "utf-8");
