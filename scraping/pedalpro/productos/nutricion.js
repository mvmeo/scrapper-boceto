import fetch from "node-fetch";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "../utils/functions.js";

import { indexar } from "../../utils/functions.js";
import info from "../../utils/info.json" assert {type: 'json'};

export const getNutricion = async () => {
  const nutricion = [];

  for (let i = 0; i < info.pedalpro.URLS.nutricion.length; i++) {
    const res = await fetch(info.pedalpro.URLS.nutricion[i]);
    const html = await res.text();

    scrape(html, nutricion, info.pedalpro.nombre);
  }

  nutricion.shift();

  const lista = indexar(nutricion);

  const data = JSON.stringify(lista, null, 2);
  const filePath = path.join(process.cwd(), "./db/pedalpro/nutricion.json");

  await writeFile(filePath, data, "utf-8");
};
