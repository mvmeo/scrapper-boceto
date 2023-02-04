import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { info } from "../utils/info.js";
import { SELECTORS } from "../utils/selectors.js";

const source = "https://crossmountain.cl/";

const URLunisex = info.crossmountain.URLS.indumentaria.unisex;
const URLhombre = info.crossmountain.URLS.indumentaria.hombre;
const URLmujer = info.crossmountain.URLS.indumentaria.mujer;
const URLcascos = info.crossmountain.URLS.indumentaria.cascos;

const URLS = URLunisex.concat(URLhombre, URLmujer, URLcascos);

const indumentariaUnisex = [];
const indumentariaHombre = [];
const indumentariaMujer = [];
const cascos = [];

for (let i = 0; i < URLS.length; i++) {
  const res = await fetch(URLS[i]);
  const html = await res.text();
  const firstPrice = (price) => {
    const Precios = price.split(" ");
    const rawPrecio = Precios[0];
    return rawPrecio;
  };
  const $ = cheerio.load(html);
  $(SELECTORS.crossmountain.producto).each((index, el) => {
    const rawNombre = $(el).find(SELECTORS.crossmountain.nombre).text();
    const Nombre = rawNombre.replace(/[\n\t]+/g, "");
    const rawPrecio = $(el).find(SELECTORS.crossmountain.precio).text();
    const Precio = firstPrice(rawPrecio);
    const imgURL = $(el).find(SELECTORS.crossmountain.imagen.selector).attr(SELECTORS.crossmountain.imagen.atributo);
    const URLproducto = source + $(el).find(SELECTORS.crossmountain.URL.selector).attr(SELECTORS.crossmountain.URL.atributo);
    switch (i) {
      case 0:
        indumentariaUnisex.push({
          Tienda: info.crossmountain.nombre,
          Nombre,
          Precio,
          Genero: "Unisex",
          imgURL,
          URLproducto,
        });
        break;
      case 1:
        indumentariaHombre.push({
          Tienda: info.crossmountain.nombre,
          Nombre,
          Precio,
          Genero: "Hombre",
          imgURL,
          URLproducto,
        });
        break;
      case 2:
        indumentariaMujer.push({
          Tienda: info.crossmountain.nombre,
          Nombre,
          Precio,
          Genero: "Mujer",
          imgURL,
          URLproducto,
        });
        break;
      case 3:
        cascos.push({
          Tienda: info.crossmountain.nombre,
          Nombre,
          Precio,
          imgURL,
          URLproducto,
        });
        break;
    }
  });
}

const indumentariaAll = indumentariaUnisex.concat(
  indumentariaHombre,
  indumentariaMujer,
  cascos
);

for (let i = 0; i < indumentariaAll.length; i++) {
  indumentariaAll[i] = { id: i + 1, ...indumentariaAll[i] };
}

const data = JSON.stringify(indumentariaAll, null, 2);
const filePath = path.join(
  process.cwd(),
  "./db/crossmountain/indumentaria.json"
);

await writeFile(filePath, data, "utf-8");
