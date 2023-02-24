import fetch from "node-fetch";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "../utils/functions.js";

import { indexar } from "../../utils/functions.js";
import info from "../../utils/info.json" assert {type: 'json'};

export const getMantenimiento = async () => {
  const mantenimiento = [];

  for (let i = 0; i < info.oxford.URLS.mantenimiento.length; i++) {
    const res = await fetch(info.oxford.URLS.mantenimiento[i]);
    const html = await res.text();

    scrape(html, mantenimiento, info.oxford.nombre);
  }

  const lista = indexar(mantenimiento);

  const data = JSON.stringify(lista, null, 2);
  const filePath = path.join(process.cwd(), "./db/oxford/mantenimiento.json");

  await writeFile(filePath, data, "utf-8");
};
