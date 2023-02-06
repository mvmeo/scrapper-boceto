import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "../utils/functions.js";

import { indexar } from "../../utils/functions.js";
import { info } from "../../utils/info.js";

export const getIndumentaria = async () => {
  const indumentaria = [];

  for (let i = 0; i < info.cincoNorte.URLS.indumentaria.length; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(info.cincoNorte.URLS.indumentaria[i]);
    await page.setDefaultNavigationTimeout(120000);

    const html = await page.content();

    scrape(html, indumentaria, info.cincoNorte.nombre);

    await browser.close();
  }

  const lista = indexar(indumentaria);

  const data = JSON.stringify(lista, null, 2);
  const filePath = path.join(process.cwd(), "./db/5norte/indumentaria.json");

  await writeFile(filePath, data, "utf-8");
};
