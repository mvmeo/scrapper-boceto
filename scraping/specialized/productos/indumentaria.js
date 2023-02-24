import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { scrape } from "../utils/functions.js";

import { indexar } from "../../utils/functions.js";
import info from "../../utils/info.json" assert {type: 'json'};

export const getIndumentaria = async () => {
  const hombre = [];
  const mujer = [];
  const unisex = [];
  const all = [];

  console.log("Mujer: ");
  for (let i = 0; i < info.specialized.URLS.indumentaria.mujer.length; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(120000);
    await page.goto(info.specialized.URLS.indumentaria.mujer[i]);

    const html = await page.content();

    scrape(html, mujer, info.specialized.nombre, "Mujer");

    await browser.close();
  }

  console.log("Hombre: ");
  for (let i = 0; i < info.specialized.URLS.indumentaria.hombre.length; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(info.specialized.URLS.indumentaria.hombre[i]);
    await page.setDefaultNavigationTimeout(120000);

    const html = await page.content();

    scrape(html, mujer, info.specialized.nombre, "Hombre");

    await browser.close();
  }

  console.log("Unisex: ");
  for (let i = 0; i < info.specialized.URLS.indumentaria.unisex.length; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(info.specialized.URLS.indumentaria.unisex[i]);
    await page.setDefaultNavigationTimeout(120000);

    const html = await page.content();

    scrape(html, mujer, info.specialized.nombre, "Unisex");

    await browser.close();
  }

  all.push(...hombre, ...mujer, ...unisex);

  const lista = indexar(all);

  const data = JSON.stringify(lista, null, 2);
  const filePath = path.join(
    process.cwd(),
    "./db/specialized/indumentaria.json"
  );

  await writeFile(filePath, data, "utf-8");
};
