import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const source = "https://pedalpro.cl/";
const URLS = [
  "https://pedalpro.cl/categoria-producto/accesorios/page/1/",
  "https://pedalpro.cl/categoria-producto/accesorios/page/2/"
];

const accesorios = []

for (let i = 0; i < URLS.length; i++) {
  const res = await fetch(URLS[i]);
  const html = await res.text();

  const $ = cheerio.load(html);
  $(".product").each((index, el) => {
    const rawNombre = $(el).find("h2.woocommerce-loop-product__title").text();
    const Nombre = rawNombre.replace(/[\n\t]+/g, "");
    const Precio = $(el).find(".price span.woocommerce-Price-amount").text();
    const imgURL = $(el)
      .find("a.woocommerce-LoopProduct-link img")
      .attr("src");
    const URLproducto = $(el)
      .find(".woocommerce-LoopProduct-link")
      .attr("href");
    const data = {
      Nombre,
      Precio,
      imgURL,
      URLproducto,
    };

    accesorios.push(data);
  });
}

accesorios.shift()

for (let i = 0; i < accesorios.length; i++) {
  accesorios[i] = { id: i + 1, ...accesorios[i] };
}

const data = JSON.stringify(accesorios, null, 2);
const filePath = path.join(process.cwd(), "./db/pedalpro/accesorios.json");

await writeFile(filePath, data, "utf-8");
