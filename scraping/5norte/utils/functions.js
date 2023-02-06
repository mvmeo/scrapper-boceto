import * as cheerio from "cheerio";
import { SELECTORS } from "../../utils/selectors.js";
import { info } from "../../utils/info.js";


export const scrape = (html, lista, tienda) => {

    // Usar Cheerio para analizar el HTML
    const $ = cheerio.load(html);
    $(SELECTORS.cincoNorte.producto).each((index, el) => {
        const rawNombre = $(el).find(SELECTORS.cincoNorte.nombre).text();
        const Nombre = rawNombre.replace(/[\n\t]+/g, "").trim();
        const rawPrecio = $(el).find(SELECTORS.cincoNorte.precio).text();
        const Precio = rawPrecio.replace(/[\n\t]+/g, "").trim();
        const imgURL = "https:" + $(el)
          .find(SELECTORS.cincoNorte.imagen.selector)
          .attr(SELECTORS.cincoNorte.imagen.atributo);
        const URLproducto = info.cincoNorte.web + $(el)
          .find(SELECTORS.cincoNorte.URL.selector)
          .attr(SELECTORS.cincoNorte.URL.atributo);
     
        const data = {
          Tienda: tienda,
          Nombre,
          Precio,
          imgURL,
          URLproducto,
        };
    
        lista.push(data);
      });
    return lista;
}