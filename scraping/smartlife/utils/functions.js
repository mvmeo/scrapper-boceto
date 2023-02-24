import * as cheerio from "cheerio";
import SELECTORS from "../../utils/selectors.json" assert {type: 'json'};

const secondPrice = (price) => {
    price = price.replace(/\$\d+[\.,]\d+(?=\$)/, "");
    return price;
  };

  export const scrape = (html, lista, tienda, genero) => {
    
    const $ = cheerio.load(html);
    const products = $(SELECTORS.smartlife.producto);
  
    for (let i = 0; i < products.length; i++) {
      const el = products[i];
      const rawNombre = $(el).find(SELECTORS.smartlife.nombre).text().trim();
      const imgURL = $(el).find(SELECTORS.smartlife.imagen.selector).attr(SELECTORS.smartlife.imagen.atributo);
      const URLproducto = $(el).find(SELECTORS.smartlife.URL.selector).attr(SELECTORS.smartlife.URL.atributo);
      const rawPrecio = $(el).find(SELECTORS.smartlife.precio).text();
      const Precio = secondPrice(rawPrecio);
  
      const data = {
        Tienda: tienda,
        Nombre: rawNombre,
        Precio,
        Genero: genero,
        imgURL,
        URLproducto,
      };
  
      lista.push(data);
    }

    return lista
  };