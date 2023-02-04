import * as cheerio from "cheerio";
import { SELECTORS } from "../../utils/selectors.js";

const secondPrice = (price) => {
  price = price.replace(/[\n\t]+/g, "");
  return price;
};

export const scrape = (html, lista, tienda) => {
    const $ = cheerio.load(html);
    $(SELECTORS.evobikes.producto).each((index, el) => {
      const rawNombre = $(el).find(SELECTORS.evobikes.nombre).text();
      const Nombre = rawNombre.replace(/[\n\t]+/g, "").trim();
      const rawPrecio = $(el).find(SELECTORS.evobikes.precio).text();
      const Precio = secondPrice(rawPrecio);
      const imgURL = $(el)
        .find(SELECTORS.evobikes.imagen.selector)
        .attr(SELECTORS.evobikes.imagen.atributo);
      const URLproducto = $(el)
        .find(SELECTORS.evobikes.URL.selector)
        .attr(SELECTORS.evobikes.URL.atributo);
   
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
