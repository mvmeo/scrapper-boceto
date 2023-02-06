import { getIndumentaria } from "./productos/indumentaria.js";

export const getSmartlife = async () => {
  console.log("-> Indumentaria: ");
  await getIndumentaria();
};
