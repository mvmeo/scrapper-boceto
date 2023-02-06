import fetch from "node-fetch";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "../utils/functions.js";

import { indexar } from "../../utils/functions.js";
import { info } from "../../utils/info.js";

export const getIndumentaria = async () => {
  const indumentaria = [];

  for (let i = 0; i < info.oxford.URLS.indumentaria.length; i++) {
    const res = await fetch(info.oxford.URLS.indumentaria[i]);
    const html = await res.text();

    scrape(html, indumentaria, info.oxford.nombre);
  }

  const lista = indexar(indumentaria);

  const data = JSON.stringify(lista, null, 2);
  const filePath = path.join(process.cwd(), "./db/oxford/indumentaria.json");

  await writeFile(filePath, data, "utf-8");
};
