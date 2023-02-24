import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "../utils/functions.js";

import { indexar } from "../../utils/functions.js";
import info from "../../utils/info.json" assert {type: 'json'};

export const getBicicletas = async () => {
  const bicicletas = [];

  for (let i = 0; i < info.specialized.URLS.bicicletas.length; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(120000);
    await page.goto(info.specialized.URLS.bicicletas[i]);

    const html = await page.content();

    scrape(html, bicicletas, info.specialized.nombre);

    await browser.close();
  }

  const lista = indexar(bicicletas);

  const data = JSON.stringify(lista, null, 2);
  const filePath = path.join(process.cwd(), "./db/specialized/bicicletas.json");

  await writeFile(filePath, data, "utf-8");
};
