import * as cheerio from "cheerio";
import { SELECTORS } from "../../utils/selectors.js";

export const scrape = (html, lista, tienda) => {
  // Usar Cheerio para analizar el HTML
  const $ = cheerio.load(html);
  $(SELECTORS.decathlon.producto).each((index, el) => {
    const rawNombre = $(el).find(SELECTORS.decathlon.nombre).text();
    const Nombre = rawNombre.replace(/[\n\t]+/g, "").trim();
    const rawPrecio = $(el).find(SELECTORS.decathlon.precio).text();
    const Precio = rawPrecio.replace(/[\n\t]+/g, "").trim();
    const imgURL = $(el)
      .find(SELECTORS.decathlon.imagen.selector)
      .attr(SELECTORS.decathlon.imagen.atributo);
    const URLproducto = $(el)
      .find(SELECTORS.decathlon.URL.selector)
      .attr(SELECTORS.decathlon.URL.atributo);

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
};
