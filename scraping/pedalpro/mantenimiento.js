import fetch from "node-fetch";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "./utils/functions.js";

import { indexar } from "../utils/functions.js";
import { info } from "../utils/info.js";

const mantenimiento = [];

for (let i = 0; i < info.pedalpro.URLS.mantenimiento.length; i++) {
  const res = await fetch(info.pedalpro.URLS.mantenimiento[i]);
  const html = await res.text();

  scrape(html, mantenimiento, info.pedalpro.nombre);
}

mantenimiento.shift();

const lista = indexar(mantenimiento)

const data = JSON.stringify(lista, null, 2);
const filePath = path.join(process.cwd(), "./db/pedalpro/mantenimiento.json");

await writeFile(filePath, data, "utf-8");
