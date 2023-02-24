import * as cheerio from "cheerio";
import SELECTORS from "../../utils/selectors.json" assert {type: 'json'};
import info from "../../utils/info.json" assert {type: 'json'};

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
  $(SELECTORS.velo.producto).each((index, el) => {
    const rawNombre = $(el).find(SELECTORS.velo.nombre).text();
    const Nombre = rawNombre.replace(/[\n\t]+/g, "").trim();
    const rawPrecio = $(el)
      .find(SELECTORS.velo.precio)
      .text()
      .replace(/[\n\t]+/g, "")
      .trim();
    const Precio = eliminarSegundoMonto(rawPrecio) === "Desde" ? "" : eliminarSegundoMonto(rawPrecio);
    const rawIMGurl = $(el)
      .find(SELECTORS.velo.imagen.selector)
      .attr(SELECTORS.velo.imagen.atributo);
    const imgURL = rawIMGurl === undefined ? "" : "https:" + rawIMGurl.replace("{width}", "600");
    const URLproducto = info.velo.web + $(el)
      .find(SELECTORS.velo.URL.selector)
      .eq(0)
      .attr(SELECTORS.velo.URL.atributo);

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
