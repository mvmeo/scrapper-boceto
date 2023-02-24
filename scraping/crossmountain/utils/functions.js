import * as cheerio from "cheerio";
import SELECTORS from "../../utils/selectors.json" assert {type: 'json'};

const firstPrice = (price) => {
  const Precios = price.split(" ");
  const rawPrecio = Precios[0];
  return rawPrecio;
};

const source = "https://www.crossmountain.cl/"

export const scrape = (html, lista, tienda) => {
  const $ = cheerio.load(html);
  $(SELECTORS.crossmountain.producto).each((index, el) => {
    const rawNombre = $(el).find(SELECTORS.crossmountain.nombre).text();
    const Nombre = rawNombre.replace(/[\n\t]+/g, "").trim();
    const rawPrecio = $(el).find(SELECTORS.crossmountain.precio).text();
    const Precio = firstPrice(rawPrecio);
    const imgURL = $(el)
      .find(SELECTORS.crossmountain.imagen.selector)
      .attr(SELECTORS.crossmountain.imagen.atributo);
    const URLproducto = source + $(el)
      .find(SELECTORS.crossmountain.URL.selector)
      .attr(SELECTORS.crossmountain.URL.atributo);

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
