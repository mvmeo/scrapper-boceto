import { getAccesorios } from "./productos/accesorios.js";
import { getBicicletas } from "./productos/bicicletas.js";
import { getComponentes } from "./productos/componentes.js";
import { getMantenimiento } from "./productos/mantenimiento.js";
import { getNutricion } from "./productos/nutricion.js";

export const getEvobike = async () => {
  console.log("-> Accesorios: ");
  await getAccesorios();

  console.log("-> Bicicletas: ");
  await getBicicletas();

  console.log("-> Componentes: ");
  await getComponentes();

  console.log("-> Mantenimiento: ");
  await getMantenimiento();

  console.log("-> Nutrición:")
  await getNutricion()
};
