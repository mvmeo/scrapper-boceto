import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "../utils/functions.js";

import { indexar } from "../../utils/functions.js";
import info from "../../utils/info.json" assert {type: 'json'};

export const getIndumentaria = async () => {
  const indumentaria = [];

  for (let i = 0; i < info.decathlon.URLS.indumentaria.length; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(120000);
    await page.goto(info.decathlon.URLS.indumentaria[i]);

    const html = await page.content();

    scrape(html, indumentaria, info.decathlon.nombre);

    await browser.close();
  }

  const lista = indexar(indumentaria);

  const data = JSON.stringify(lista, null, 2);
  const filePath = path.join(process.cwd(), "./db/decathlon/indumentaria.json");

  await writeFile(filePath, data, "utf-8");
};
