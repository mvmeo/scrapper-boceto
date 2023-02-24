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

export function scrape(html, lista, tienda) {
  const $ = cheerio.load(html);
  $(SELECTORS.oxford.producto).each((index, el) => {
    const rawNombre = $(el).find(SELECTORS.oxford.nombre).text();
    const Nombre = rawNombre.replace(/[\n\t]+/g, "").trim();
    const rawPrecio = $(el).find(SELECTORS.oxford.precio).text();
    const Precio = eliminarSegundoMonto(rawPrecio);
    const imgURL = $(el)
      .find(SELECTORS.oxford.imagen.selector)
      .attr(SELECTORS.oxford.imagen.atributo);
    const URLproducto = $(el)
      .find(SELECTORS.oxford.URL.selector)
      .attr(SELECTORS.oxford.URL.atributo);
 
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
