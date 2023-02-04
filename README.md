# arueda.cl - *nombre por confirmar*

## Descripción

El principal objetivo de este proyecto es crear una plataforma que permita a los usuarios tener en un solo lugar la mayor cantidad de productos de ciclismo que se encuentran en venta en Chile (por los momentos solo mediante tiendas oficiales), y que además les permita comparar precios e ir a las respectivas páginas (es posible que la herramienta de comparar se avance con el tiempo).

Articulos que se muestran en la plataforma:

* Bicicletas
    * Bicicletas de montaña
    * Bicicletas de ruta/gravel
* Ropa/indumentaria
* Accesorios
* Artículos de mantenimiento

## Tiendas que se muestran en la plataforma

* [Crossmountain](https://www.crossmountain.cl/)
* [OxfordStore](https://www.oxfordstore.cl/)
* [Smartlife](https://smartlife-sports.cl/)
* [Evobikes](https://evobikes.cl/cl/)
* [Pedal Pro](https://pedalpro.cl/)

## Páginas que no permitieron scraping :(

Estas páginas deben ser scrapeadas simulando una navegación.
* [5norte](https://www.5norte.cl/)
* [Decathlon](https://www.decathlon.cl/)
* [Serjaf](https://www.serjaf.cl/)
* [Velo Boutique](https://veloboutique.cl/)
* [Specialized](https://www.specialized.com/cl/es/shop/c/shop)

Esta página tiene detalles en su código fuente que se podría solucionar para extraer los datos:
* [Montonsports](https://www.montonsports.cl/)


## Tecnologías

* Backend: Node.js + Hono + Cloudflare Workers



# Documentación


## Backend

### Endpoints

- GET `/tiendas`: Devuelve la información de las tiendas.
- GET `/tiendas/:id`: Devuelve la información de una tienda en específico.
- GET `/bicicletas`: Devuelve la información de las bicicletas.
- GET `/bicicletas/:id`: Devuelve la información de una bicicleta en específico.
- GET `/componentes`: Devuelve la información de los componentes.
- GET `/componentes/:id`: Devuelve la información de un componente en específico.
- GET `/ropa`: Devuelve la información de la ropa.
- GET `/ropa/:id`: Devuelve la información de una prenda en específico.
- GET `/accesorios`: Devuelve la información de los accesorios.
- GET `/accesorios/:id`: Devuelve la información de un accesorio en específico.
- GET `/mantenimiento`: Devuelve la información de los artículos de mantenimiento.
- GET `/mantenimiento/:id`: Devuelve la información de un artículo de mantenimiento en específico.



### Estructura de carpetas

    .
    ├── ...
    ├── api
    │   └── index.js
    ├── db
    ├── scrapping
    │   └── index.js
    └── ...

### api/index.js

Este archivo contiene la lógica de la API, se encarga de recibir las peticiones y devolver la información solicitada.

### db

En esta carpeta se encuentran los archivos que contienen la información de los productos y tiendas.

### scrapping/index.js

Este archivo contiene la lógica para obtener la información de los productos y tiendas.
