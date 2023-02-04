import fetch from "node-fetch";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "./utils/functions.js";

import { indexar } from "../utils/functions.js";
import { info } from "../utils/info.js";

const accesorios = [];

for (let i = 0; i < info.pedalpro.URLS.accesorios.length; i++) {
  const res = await fetch(info.pedalpro.URLS.accesorios[i]);
  const html = await res.text();

  scrape(html, accesorios, info.pedalpro.nombre);
}

accesorios.shift();

const lista = indexar(accesorios)

const data = JSON.stringify(lista, null, 2);
const filePath = path.join(process.cwd(), "./db/pedalpro/accesorios.json");

await writeFile(filePath, data, "utf-8");
