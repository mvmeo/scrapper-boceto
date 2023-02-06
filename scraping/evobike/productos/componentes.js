import fetch from "node-fetch";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "../utils/functions.js";

import { indexar } from "../../utils/functions.js";
import { info } from "../../utils/info.js";

export const getComponentes = async () => {
  const componentes = [];

  for (let i = 0; i < info.evobikes.URLS.componentes.length; i++) {
    const res = await fetch(info.evobikes.URLS.componentes[i]);
    const html = await res.text();

    scrape(html, componentes, info.evobikes.nombre);
  }

  const lista = indexar(componentes);

  const data = JSON.stringify(lista, null, 2);
  const filePath = path.join(process.cwd(), "./db/evobike/componentes.json");

  await writeFile(filePath, data, "utf-8");
};
