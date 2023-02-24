import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "../utils/functions.js";

import { indexar } from "../../utils/functions.js";
import info from "../../utils/info.json" assert {type: 'json'};

export const getAccesorios = async () => {
  const accesorios = [];

  for (let i = 0; i < info.decathlon.URLS.accesorios.length; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(120000);
    await page.goto(info.decathlon.URLS.accesorios[i]);

    const html = await page.content();

    scrape(html, accesorios, info.decathlon.nombre);

    await browser.close();
  }

  const lista = indexar(accesorios);

  const data = JSON.stringify(lista, null, 2);
  const filePath = path.join(process.cwd(), "./db/decathlon/accesorios.json");

  await writeFile(filePath, data, "utf-8");
};
