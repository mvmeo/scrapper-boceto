import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const source = "https://evobikes.cl/";
const URLS = [
    "https://evobikes.cl/cl/herramientas/",
    "https://evobikes.cl/cl/limpieza-lubircacion/",
    "https://evobikes.cl/cl/sellantes/"
];

const secondPrice = (price) => {
  price = price.replace(/[\n\t]+/g, "");
  return price;
};

const mantenimiento = [];

for (let i = 0; i < URLS.length; i++) {
  const res = await fetch(URLS[i]);
  const html = await res.text();

  const $ = cheerio.load(html);
  $(".item-product").each((index, el) => {
    const rawNombre = $(el).find(".item-title").text();
    const Nombre = rawNombre.replace(/[\n\t]+/g, "");

    const cadena = rawNombre.split(" ");
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

    mantenimiento.push(data);
  });
}

for (let i = 0; i < mantenimiento.length; i++) {
    mantenimiento[i] = { id: i + 1, ...mantenimiento[i] };
  }

const data = JSON.stringify(mantenimiento, null, 2);
const filePath = path.join(process.cwd(), "./db/evobike/mantenimiento.json");

await writeFile(filePath, data, "utf-8");
