import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { writeFile} from "node:fs/promises";
import path from "node:path"; 

const source = "https://crossmountain.cl/";

const URLS = "https://crossmountain.cl/c/20/mantenimiento-y-lubricacin";

const res = await fetch(URLS);
const html = await res.text();

const firstPrice = (price) => {
  const Precios = price.split(" ");
  const rawPrecio = Precios[0];
  return rawPrecio;
};

const mantenimiento = []

const $ = cheerio.load(html);
$(".itemProduct").each((index, el) => {
  const id = index + 1;
  const rawNombre = $(el).find(".item-title").text();
  const Nombre = rawNombre.replace(/[\n\t]+/g, "");
  const rawPrecio = $(el).find("span.item-price").text();
  const Precio = firstPrice(rawPrecio);
  const imgURL = $(el).find(".imageContainer img").attr("src");
  const URLproducto = source + $(el).find(".imageContainer a").attr("href");

  const data = {
    id,
    Nombre,
    Precio,
    imgURL,
    URLproducto,
  };

  mantenimiento.push(data);
});

for (let i = 0; i < mantenimiento.length; i++) {
  mantenimiento[i] = { id: i + 1, ...mantenimiento[i] };
}

const data = JSON.stringify(mantenimiento, null, 2);
const filePath = path.join(process.cwd(), "./db/crossmountain/mantenimiento.json");

await writeFile(filePath, data, 'utf-8')