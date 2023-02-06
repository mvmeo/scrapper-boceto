import { getAccesorios } from "./productos/accesorios.js";
import { getBicicletas } from "./productos/bicicletas.js";
import { getComponentes } from "./productos/componentes.js";
import { getIndumentaria } from "./productos/indumentaria.js";
import { getNutricion } from "./productos/nutricion.js";

export const getVelo = async () => {
  console.log("-> Accesorios: ");
  await getAccesorios();

  console.log("-> Bicicletas: ");
  await getBicicletas();

  console.log("-> Componentes: ");
  await getComponentes();

  console.log("-> Indumentaria: ");
  await getIndumentaria();

  console.log("-> Nutricion: ");
  await getNutricion();
};
