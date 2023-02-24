import fetch from "node-fetch";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "../utils/functions.js";

import { indexar } from "../../utils/functions.js";
import info from "../../utils/info.json" assert {type: 'json'};

export const getBicicletas = async () => {
  const bicicletas = [];

  for (let i = 0; i < info.pedalpro.URLS.bicicletas.length; i++) {
    const res = await fetch(info.pedalpro.URLS.bicicletas[i]);
    const html = await res.text();

    scrape(html, bicicletas, info.pedalpro.nombre);
  }

  bicicletas.shift();

  const lista = indexar(bicicletas);

  const data = JSON.stringify(lista, null, 2);
  const filePath = path.join(process.cwd(), "./db/pedalpro/bicicletas.json");

  await writeFile(filePath, data, "utf-8");
};
