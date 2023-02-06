import { getAccesorios } from "./productos/accesorios.js";
import { getBicicletas } from "./productos/bicicletas.js";
import { getIndumentaria } from "./productos/indumentaria.js";
import { getMantenimiento } from "./productos/mantenimiento.js";

export const getCrossmountain = async () => {
  console.log("-> Accesorios: ");
  await getAccesorios();

  console.log("-> Bicicletas: ");
  await getBicicletas();

  console.log("-> Indumentaria: ");
  await getIndumentaria();

  console.log("-> Mantenimiento: ");
  await getMantenimiento()

};
