import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { writeFile} from "node:fs/promises";
import path from "node:path"; 

const source = "https://crossmountain.cl/";

const URLunisex = "https://crossmountain.cl/c/12/indumentaria-ciclismo?c=185,214,69,136,143,135";
const URLhombre = "https://crossmountain.cl/c/12/indumentaria-ciclismo?c=68,67";
const URLmujer = "https://crossmountain.cl/c/12/indumentaria-ciclismo?c=188,186";
const URLcascos = "https://crossmountain.cl/c/9/cascos-ciclismo"

const URLS = [
    URLunisex,
    URLhombre,
    URLmujer,
    URLcascos
]


const indumentariaUnisex = []
const indumentariaHombre = []
const indumentariaMujer = []
const cascos = []

for(let i = 0; i < URLS.length; i++){
    const res = await fetch(URLS[i]);
    const html = await res.text();
    const firstPrice = (price) => {
        const Precios = price.split(" ");
        const rawPrecio = Precios[0];
        return rawPrecio;
    };
    const $ = cheerio.load(html);
    $(".itemProduct").each((index, el) => {
        const id = index + 1;
        const rawNombre = $(el).find(".item-title").text();
        const Nombre = rawNombre.replace(/[\n\t]+/g, "");
        const rawPrecio = $(el).find("span.item-price").text();
        const Precio = firstPrice(rawPrecio);
        const imgURL = $(el).find(".imageContainer img").attr("src");
        const URLproducto = source + $(el).find(".imageContainer a").attr("href");
        switch(i){
            case 0:
                indumentariaUnisex.push({
                    id,
                    Nombre,
                    Precio,
                    Genero: "Unisex",
                    imgURL,
                    URLproducto,
                });
                break;
            case 1:
                indumentariaHombre.push({
                    id,
                    Nombre,
                    Precio,
                    Genero: "Hombre",
                    imgURL,
                    URLproducto,
                });
                break;
            case 2:
                indumentariaMujer.push({
                    id,
                    Nombre,
                    Precio,
                    Genero: "Mujer",
                    imgURL,
                    URLproducto,
                });
                break;
            case 3:
                cascos.push({
                    id,
                    Nombre,
                    Precio,
                    imgURL,
                    URLproducto,
                });
                break;
        }
    });
}


const indumentariaAll = indumentariaUnisex.concat(indumentariaHombre, indumentariaMujer, cascos)

for (let i = 0; i < indumentariaAll.length; i++) {
    indumentariaAll[i] = { id: i + 1, ...indumentariaAll[i] };
  }

const data = JSON.stringify(indumentariaAll, null, 2);
const filePath = path.join(process.cwd(), "./db/crossmountain/indumentaria.json");

await writeFile(filePath, data, 'utf-8')
