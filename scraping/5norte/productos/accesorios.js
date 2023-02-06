import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "../utils/functions.js";

import { indexar } from "../../utils/functions.js";
import { info } from "../../utils/info.js";

export const getAccesorios = async () => {
  const accesorios = [];

  for (let i = 0; i < info.cincoNorte.URLS.accesorios.length; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(info.cincoNorte.URLS.accesorios[i]);
    await page.setDefaultNavigationTimeout(120000);

    const html = await page.content();

    scrape(html, accesorios, info.cincoNorte.nombre);

    await browser.close();
  }

  const lista = indexar(accesorios);

  const data = JSON.stringify(lista, null, 2);
  const filePath = path.join(process.cwd(), "./db/5norte/accesorios.json");

  await writeFile(filePath, data, "utf-8");
};
