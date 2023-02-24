import { getSpecialized } from "./specialized/index.js";
import { getVelo } from "./velo/index.js";
import { getSmartlife } from "./smartlife/index.js";
import { getPedalpro } from "./pedalpro/index.js";
import { getCincoNorte } from "./5norte/index.js";
import { getCrossmountain } from "./crossmountain/index.js";
import { getDecathlon } from "./decathlon/index.js";
import { getEvobike } from "./evobike/index.js";
import { getOxford } from "./oxford/index.js";

const scraping = async () => {
  console.log("5norte:");
  await getCincoNorte();
  
  console.log("Crossmountain:");
  await getCrossmountain();


  console.log("Decathlon:");
  await getDecathlon();

  console.log("Evobikes:");
  await getEvobike();

  console.log("Oxford Stores:");
  await getOxford();

  console.log("Pedal Pro:");
  await getPedalpro();

  console.log("Smartlife:");
  await getSmartlife();

  console.log("Specialized:");
  await getSpecialized();

  console.log("Velo:");
  await getVelo();
};

scraping();