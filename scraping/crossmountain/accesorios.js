import fetch from "node-fetch";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "./utils/functions.js";

import { indexar } from "../utils/functions.js";
import { info } from "../utils/info.js";

const accesorios = [];

for (let i = 0; i < info.crossmountain.URLS.accesorios.length; i++) {
  const res = await fetch(info.crossmountain.URLS.accesorios[i]);
  const html = await res.text();

  scrape(html, accesorios, info.crossmountain.nombre);
}

const lista = indexar(accesorios);

const data = JSON.stringify(lista, null, 2);
const filePath = path.join(process.cwd(), "./db/crossmountain/accesorios.json");

await writeFile(filePath, data, "utf-8");
