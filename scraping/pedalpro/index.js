import { getAccesorios } from "./productos/accesorios.js";
import { getBicicletas } from "./productos/bicicletas.js";
import { getIndumentaria } from "./productos/indumentaria.js";
import { getNutricion } from "./productos/nutricion.js";

export const getPedalpro = async () => {
  console.log("-> Accesorios: ");
  await getAccesorios();

  console.log("-> Bicicletas: ");
  await getBicicletas();

  console.log("-> Indumentaria: ");
  await getIndumentaria();

  console.log("-> Nutricion: ");
  await getNutricion();
};
