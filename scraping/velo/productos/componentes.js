import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "../utils/functions.js";

import { indexar } from "../../utils/functions.js";
import { info } from "../../utils/info.js";

export const getComponentes = async () => {
  const componentes = [];

  for (let i = 0; i < info.velo.URLS.componentes.length; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(info.velo.URLS.componentes[i]);
    await page.setDefaultNavigationTimeout(120000);

    const html = await page.content();

    scrape(html, componentes, info.velo.nombre);

    await browser.close();
  }

  const lista = indexar(componentes);

  const data = JSON.stringify(lista, null, 2);
  const filePath = path.join(process.cwd(), "./db/velo/componentes.json");

  await writeFile(filePath, data, "utf-8");
};
