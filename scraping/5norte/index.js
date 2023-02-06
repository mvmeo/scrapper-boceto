import { getAccesorios } from "./productos/accesorios.js";
import { getIndumentaria } from "./productos/indumentaria.js";

export const getCincoNorte = async () => {
  console.log("-> Accesorios: ");
  await getAccesorios();

  console.log("-> Indumentaria: ");
  await getIndumentaria();

};
