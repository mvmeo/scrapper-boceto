import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "../utils/functions.js";

import { indexar } from "../../utils/functions.js";
import { info } from "../../utils/info.js";

export const getAccesorios = async () => {
  const accesorios = [];

  for (let i = 0; i < info.specialized.URLS.accesorios.length; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(info.specialized.URLS.accesorios[i]);
    await page.setDefaultNavigationTimeout(120000);

    const html = await page.content();

    scrape(html, accesorios, info.specialized.nombre);

    await browser.close();
  }

  const lista = indexar(accesorios);

  const data = JSON.stringify(lista, null, 2);
  const filePath = path.join(process.cwd(), "./db/specialized/accesorios.json");

  await writeFile(filePath, data, "utf-8");
};
