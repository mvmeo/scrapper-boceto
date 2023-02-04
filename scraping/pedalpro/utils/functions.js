import * as cheerio from "cheerio";
import { SELECTORS } from "../../utils/selectors.js";

export const scrape = (html, lista, tienda) => {
  const $ = cheerio.load(html);
  $(SELECTORS.pedalpro.producto).each((index, el) => {
    const rawNombre = $(el).find(SELECTORS.pedalpro.nombre).text();
    const Nombre = rawNombre.replace(/[\n\t]+/g, "");
    const Precio = $(el).find(SELECTORS.pedalpro.precio).text();
    const imgURL = $(el)
      .find(SELECTORS.pedalpro.imagen.selector)
      .attr(SELECTORS.pedalpro.imagen.atributo);
    const URLproducto = $(el)
      .find(SELECTORS.pedalpro.URL.selector)
      .attr(SELECTORS.pedalpro.URL.atributo);
    const data = {
      Tienda: tienda,
      Nombre,
      Precio,
      imgURL,
      URLproducto,
    };

    lista.push(data);
  });
};
