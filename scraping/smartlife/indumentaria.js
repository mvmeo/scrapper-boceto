import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const source = "https://smartlife-sports.cl/";
const URLSmujer = [
  "https://smartlife-sports.cl/product-category/mujer/tricotas-ciclismo-mujer/page/1",
  "https://smartlife-sports.cl/product-category/mujer/tricotas-ciclismo-mujer/page/2/",
  "https://smartlife-sports.cl/product-category/mujer/tricotas-ciclismo-mujer/page/2/",
  "https://smartlife-sports.cl/product-category/mujer/jackets-mujer/",
  "https://smartlife-sports.cl/product-category/mujer/bib-shorts-calzas-mujer/page/1",
  "https://smartlife-sports.cl/product-category/mujer/bib-shorts-calzas-mujer/page/2/",
  "https://smartlife-sports.cl/product-category/mujer/cortavientos-mujer/",
  "https://smartlife-sports.cl/product-category/mujer/manguillas-mujer/",
  "https://smartlife-sports.cl/product-category/mujer/skinsuits-mujer/",
  "https://smartlife-sports.cl/product-category/mujer/trisuits-mujer/",
];

const URLShombre = [
  "https://smartlife-sports.cl/product-category/hombre/tricotas-ciclismo-hombre/page/1/",
  "https://smartlife-sports.cl/product-category/hombre/tricotas-ciclismo-hombre/page/2/",
  "https://smartlife-sports.cl/product-category/hombre/tricotas-ciclismo-hombre/page/3/",
  "https://smartlife-sports.cl/product-category/hombre/jackets-hombre/",
  "https://smartlife-sports.cl/product-category/hombre/bib-shorts-calzas-hombre/page/1/",
  "https://smartlife-sports.cl/product-category/hombre/bib-shorts-calzas-hombre/page/2/",
  "https://smartlife-sports.cl/product-category/hombre/manguillas-hombre/",
  "https://smartlife-sports.cl/product-category/hombre/skinsuits-hombre/",
  "https://smartlife-sports.cl/product-category/hombre/trisuits-hombre/",
];

const indumentariaMujer = [];
const indumentariaHombre = [];

console.log("Scraping indumentaria mujer");

const secondPrice = (price) => {
  price = price.replace(/\$\d+[\.,]\d+(?=\$)/, "");
  return price;
};

for (let i = 0; i < URLSmujer.length; i++) {
  const res = await fetch(URLSmujer[i]);
  const html = await res.text();

  const $ = cheerio.load(html);
  $(".product").each((index, el) => {
    const rawNombre = $(el).find(".woocommerce-loop-product__title").text();
    const Nombre = rawNombre.replace(/[\n\t]+/g, "");
    const rawPrecio = $(el).find(".price span.woocommerce-Price-amount").text();
    const imgURL = $(el)
      .find("a.woocommerce-LoopProduct-link img")
      .attr("data-src");
    const URLproducto = $(el)
      .find(".woocommerce-LoopProduct-link")
      .attr("href");
    const Precio = secondPrice(rawPrecio);
    const mujer = {
      Nombre,
      Precio,
      Genero: "Mujer",
      imgURL,
      URLproducto,
    };

    indumentariaMujer.push(mujer);
  });
}

console.log("Scraping indumentaria hombre");

for (let i = 0; i < URLShombre.length; i++) {
  const res = await fetch(URLShombre[i]);
  const html = await res.text();

  const $ = cheerio.load(html);
  $(".product").each((index, el) => {
    const rawNombre = $(el).find(".woocommerce-loop-product__title").text();
    const Nombre = rawNombre.replace(/[\n\t]+/g, "");
    const rawPrecio = $(el).find(".price span.woocommerce-Price-amount").text();
    const imgURL = $(el)
      .find("a.woocommerce-LoopProduct-link img")
      .attr("data-src");
    const URLproducto = $(el)
      .find(".woocommerce-LoopProduct-link")
      .attr("href");
    const Precio = secondPrice(rawPrecio);
    const hombre = {
      Nombre,
      Precio,
      Genero: "Hombre",
      imgURL,
      URLproducto,
    };

    indumentariaHombre.push(hombre);
  });
}

const unisex = indumentariaMujer.concat(indumentariaHombre);

for (let i = 0; i < unisex.length; i++) {
  unisex[i] = { id: i + 1, ...unisex[i] };
}

const data = JSON.stringify(unisex, null, 2);
const filePath = path.join(process.cwd(), "./db/smartlife/indumentaria.json");

await writeFile(filePath, data, "utf-8");
