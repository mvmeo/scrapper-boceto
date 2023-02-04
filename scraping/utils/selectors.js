export const SELECTORS = {
    oxford : {
        producto: ".product-item-info",
        nombre: ".product-item-link",
        URL: { selector: "a.product-item-link", atributo: "href"},
        precio: ".price",
        imagen: { selector: ".product-image-wrapper img.product-image-photo", atributo: "src"}
      },
      pedalpro: {
        producto: ".product",
        nombre: "h2.woocommerce-loop-product__title",
        URL: { selector: ".woocommerce-LoopProduct-link", atributo: "href"},
        precio: ".price span.woocommerce-Price-amount",
        imagen: { selector: "a.woocommerce-LoopProduct-link img", atributo: "src"}
      },
      evobikes: {
        producto: ".item-product",
        nombre: ".item-title",
        URL: { selector: ".item-thumb a", atributo: "href"},
        precio: ".price",
        imagen: { selector: ".item-thumb img", atributo: "data-src"}
      },
      crossmountain: {
        producto: ".itemProduct",
        nombre: ".item-title",
        URL: { selector: ".imageContainer a", atributo: "href"},
        precio: "span.item-price",
        imagen: { selector: ".imageContainer img", atributo: "src"}
      },
      smartlife: {
        producto: ".product",
        nombre: ".woocommerce-loop-product__title",
        URL: { selector: ".woocommerce-LoopProduct-link", atributo: "href"},
        precio: ".price span.woocommerce-Price-amount",
        imagen: { selector: "a.woocommerce-LoopProduct-link img", atributo: "data-src"}
      },
}