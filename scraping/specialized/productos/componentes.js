import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "../utils/functions.js";

import { indexar } from "../../utils/functions.js";
import info from "../../utils/info.json" assert {type: 'json'};

export const getComponentes = async () => {
  const componentes = [];

  for (let i = 0; i < info.specialized.URLS.componentes.length; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(120000);
    await page.goto(info.specialized.URLS.componentes[i]);

    const html = await page.content();

    scrape(html, componentes, info.specialized.nombre);

    await browser.close();
  }

  const lista = indexar(componentes);

  const data = JSON.stringify(lista, null, 2);
  const filePath = path.join(
    process.cwd(),
    "./db/specialized/componentes.json"
  );

  await writeFile(filePath, data, "utf-8");
};
