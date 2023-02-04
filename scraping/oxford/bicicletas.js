import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const source = "https://www.oxfordstore.cl/";

const URLS = [
  "https://www.oxfordstore.cl/bicicletas/monta-a.html?p=1",
  "https://www.oxfordstore.cl/bicicletas/monta-a.html?p=2",
  "https://www.oxfordstore.cl/bicicletas/monta-a.html?p=3",
  "https://www.oxfordstore.cl/bicicletas/monta-a.html?p=4",
  "https://www.oxfordstore.cl/bicicletas/monta-a.html?p=5",
  "https://www.oxfordstore.cl/bicicletas/monta-a.html?p=6",
  "https://www.oxfordstore.cl/bicicletas/urbana.html",
  "https://www.oxfordstore.cl/bicicletas/ruta.html?p=1",
  "https://www.oxfordstore.cl/bicicletas/ruta.html?p=2"
];


const bicicletas = [];

function eliminarSegundoMonto(cadena) {
    let result = cadena.match(/^(\$\d{1,3}(?:[.,]\d{3})*)(.*(\$\d{1,3}(?:[.,]\d{3})*))?$/);
    if (result && result[3]) {
        return result[1].trim();
    } else {
        return cadena.trim();
    }
}

for (let i = 0; i < URLS.length; i++) {
  const res = await fetch(URLS[i]);
  const html = await res.text();

  const $ = cheerio.load(html);
  $(".product-item-info").each((index, el) => {
    const rawNombre = $(el).find(".product-item-link").text();
    const Nombre = rawNombre.replace(/[\n\t]+/g, "").trim();
    const rawPrecio = $(el).find(".price").text();
    const Precio = eliminarSegundoMonto(rawPrecio)
    const imgURL = $(el).find(".product-image-wrapper img.product-image-photo").attr("src");
    const URLproducto = $(el).find("a.product-item-link").attr("href");

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
const filePath = path.join(process.cwd(), "./db/oxford/bicicletas.json");

await writeFile(filePath, data, "utf-8");
