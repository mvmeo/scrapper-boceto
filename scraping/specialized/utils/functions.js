import * as cheerio from "cheerio";
import SELECTORS from "../../utils/selectors.json" assert {type: 'json'};

export function eliminarSegundoMonto(cadena) {
  let result = cadena.match(
    /^(\$\d{1,3}(?:[.,]\d{3})*)(.*(\$\d{1,3}(?:[.,]\d{3})*))?$/
  );
  if (result && result[3]) {
    return result[1].trim();
  } else {
    return cadena.trim();
  }
}

export const scrape = (html, lista, tienda, genero) => {
  // Usar Cheerio para analizar el HTML
  const $ = cheerio.load(html);
  $(SELECTORS.specialized.producto).each((index, el) => {
    const rawNombre = $(el).find(SELECTORS.specialized.nombre).text();
    const Nombre = rawNombre.replace(/[\n\t]+/g, "").trim();
    const rawPrecio = $(el)
      .find(SELECTORS.specialized.precio)
      .text()
      .replace(/[\n\t]+/g, "")
      .trim();
    const Precio =eliminarSegundoMonto(rawPrecio) === undefined ? "" :eliminarSegundoMonto(rawPrecio);
    const imgURL = $(el)
      .find(SELECTORS.specialized.imagen.selector)
      .attr(SELECTORS.specialized.imagen.atributo);
    const URLproducto = "https://www.specialized.com/cl/es" + $(el)
      .find(SELECTORS.specialized.URL.selector)
      .eq(0)
      .attr(SELECTORS.specialized.URL.atributo);

    const data = {
      Tienda: tienda,
      Nombre,
      Genero: genero,
      Precio,
      imgURL,
      URLproducto,
    };

    lista.push(data);
  });
  return lista;
};
