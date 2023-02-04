import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const source = "https://pedalpro.cl/";
const URLS = [
  "https://pedalpro.cl/categoria-producto/componentes/aceites-y-lubricantes/"
];

const mantenimiento = []

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

    mantenimiento.push(data);
  });
}

mantenimiento.shift()

for (let i = 0; i < mantenimiento.length; i++) {
  mantenimiento[i] = { id: i + 1, ...mantenimiento[i] };
}

const data = JSON.stringify(mantenimiento, null, 2);
const filePath = path.join(process.cwd(), "./db/pedalpro/mantenimiento.json");

await writeFile(filePath, data, "utf-8");
