import fetch from "node-fetch";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "./utils/functions.js";

import { indexar } from "../utils/functions.js";
import { info } from "../utils/info.js";

const bicicletas = [];

for (let i = 0; i < info.evobikes.URLS.bicicletas.length; i++) {
  const res = await fetch(info.evobikes.URLS.bicicletas[i]);
  const html = await res.text();

  scrape(html, bicicletas, info.evobikes.nombre);
}

const lista = indexar(bicicletas);

const data = JSON.stringify(lista, null, 2);
const filePath = path.join(process.cwd(), "./db/evobike/bicicletas.json");

await writeFile(filePath, data, "utf-8");
