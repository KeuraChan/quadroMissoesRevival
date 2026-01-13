import { alvos } from "./dados_alvos.js";
import { locais } from "./dados_locais.js";
import { partesDeMonstros, suprimentosAlquimia } from "./dados_loot.js";

// PRNG
export function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function gerarMissao(rand) {
  const tipos = ["resgatar", "matar", "coletar"];
  const tipo = tipos[Math.floor(rand() * tipos.length)];

  const alvo = alvos[tipo][Math.floor(rand() * alvos[tipo].length)];
  const local = locais[Math.floor(rand() * locais.length)];

  return `${tipo.toUpperCase()}: ${alvo} ${local}`;
}
