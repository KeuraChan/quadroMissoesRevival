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

function formatarMoedas(valor) {
  const po = Math.floor(valor / 10);
  const pp = valor % 10;

  let resultado = [];
  if (po > 0) resultado.push(`${po} po`);
  if (pp > 0) resultado.push(`${pp} pp`);

  return resultado.join(", ");
}

export function gerarMissao(rand) {
  const tipos = ["resgatar", "matar", "coletar"];
  const tipo = tipos[Math.floor(rand() * tipos.length)];

  const alvo = alvos[tipo][Math.floor(rand() * alvos[tipo].length)];
  const local = locais[Math.floor(rand() * locais.length)];

  // 🎯 Dificuldade
  const dificuldades = [1, 1, 1, 1, 1, 1, 1, 1, 
                        2, 2, 2, 2, 2, 2, 2, 2,
                        3, 3, 3, 3, 3, 3,
                        4, 4, 4, 4, 4, 4,
                        5, 5, 5, 5, 5,
                        6, 6, 6, 6, 6,
                        7, 7, 7, 7,
                        8, 8, 8, 8,
                        9, 9, 9,
                        10, 10, 10,
                        11, 11,
                        12, 12,
                        13, 13,
                        14, 14,
                        15];
  const dificuldade =
    dificuldades[Math.floor(rand() * dificuldades.length)];

  const dias = dificuldade;

  // 💰 Recompensas (valor base em prata)
  let valor = 0;
  let recompensaExtra = null;

  if (tipo === "matar") {
    valor = Math.floor(rand() * 10) + 10;
    recompensaExtra =
      partesDeMonstros[Math.floor(rand() * partesDeMonstros.length)];
  }

  if (tipo === "coletar") {
    valor = Math.floor(rand() * 5) + 5;
    recompensaExtra =
      suprimentosAlquimia[Math.floor(rand() * suprimentosAlquimia.length)];
  }

  if (tipo === "resgatar") {
    valor = Math.floor(rand() * 20) + 20;
  }

  // Escala por dias
  valor = Math.floor(valor * (rand() * 2) + 0.1) * (dias * 0.9);

  return {
    tipo,
    alvo,
    local,
    dificuldade,
    dias,
    ouro: formatarMoedas(valor),
    recompensaExtra
  };
}

