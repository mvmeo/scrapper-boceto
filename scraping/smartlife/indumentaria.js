import fetch from "node-fetch";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { scrape } from "./utils/functions.js";


import { indexar } from "../utils/functions.js";
import { info } from "../utils/info.js";

const Mujer = [];
const Hombre = [];

console.log("Scraping indumentaria mujer");


for (let i = 0; i < info.smartlife.URLS.indumentaria.mujer.length; i++) {
  const res = await fetch(info.smartlife.URLS.indumentaria.mujer[i]);
  const html = await res.text();

  scrape(html, Mujer, info.smartlife.nombre, "Mujer")  
}

console.log("Scraping indumentaria hombre");

for (let i = 0; i < info.smartlife.URLS.indumentaria.hombre.length; i++) {
  const res = await fetch(info.smartlife.URLS.indumentaria.hombre[i]);
  const html = await res.text();

  
  scrape(html, Hombre, info.smartlife.nombre, "Hombre")  
}

const unisex = Mujer.concat(Hombre);

const lista = indexar(unisex)

const data = JSON.stringify(lista, null, 2);
const filePath = path.join(process.cwd(), "./db/smartlife/indumentaria.json");

await writeFile(filePath, data, "utf-8");
