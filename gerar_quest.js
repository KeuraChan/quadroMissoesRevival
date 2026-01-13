// PRNG com seed - função leve
function mulberry32(a) {
  return function () {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Elementos da missão
const alvos = {
  resgatar: [
    "criança",
    "camponês",
    "ferreiro",
    "mercador",
    "caçador",
    "mago iniciante",
    "curandeiro",
    "vendedora",
    "apotecário",
    "soldado ferido",
    "carpinteiro",
    "padeiro",
    "lavrador",
    "escrivão",
    "bibliotecário",
    "homem do campo",
    "mestre de campo",
    "pastor",
    "mestre de ervas",
    "artesão",
    "vigarista",
    "mestre de ferros",
    "trovador",
    "mulher grávida",
    "cozinheira",
    "pequeno nobre",
    "jovem aprendiz",
    "curandeiro ancião",
    "ancião da aldeia",
    "herdeiro perdido",
    "pescador",
    "poetisa",
    "pescador perdido",
    "garoto fugitivo",
    "músico",
    "arborista",
  ],
  matar: [
    "esqueleto",
    "goblin",
    "orc",
    "bandido",
    "bandidos",
    "criminosos",
    "assaltantes",
    "ladrões",
    "golpistas",
    "zumbi",
    "ratos",
    "aranha venenosa",
    "rato gigante",
    "lobo selvagem",
    "besta do mato",
    "javali selvagem",
    "serpente venenosa",
    "corvo hostil",
    "vaca zumbi",
    "lagarto mutante",
    "mosca gigante",
  ],
  coletar: [
    "ervas medicinais",
    "frutas silvestres",
    "pedras pequenas",
    "sementes comuns",
    "poeira de elfo",
    "flores do campo",
    "cogumelos comestíveis",
    "galhos secos",
    "pedaços de madeira",
    "ramos de flor",
    "raízes curativas",
    "pedras preciosas pequenas",
    "frutas tropicais",
    "plumas de aves",
    "casca de árvore",
    "folhas mágicas",
    "bagas do bosque",
    "pedaços de cristal",
    "fios de teia de aranha gigante",
    "pelos de lobo",
    "cordas do campo",
    "sementes raras",
    "bolotas de carvalho",
    "casulos de insetos",
    "seiva de árvore",
    "excrementos de criaturas",
    "pedaços de corais",
    "gotas de orvalho",
    "pó de fada",
    "escamas de peixe",
    "larvas mágicas",
    "sementes de flores raras",
  ],
};

const locais = [
  "nas florestas próximas",
  "nas montanhas",
  "em uma caverna",
  "nas estradas",
  "nos túneis",
  "em ruínas nas montanhas",
  "no topo de uma colina",
  "na beira de um rio",
  "na floresta densa",
  "no templo antigo",
  "em um acampamento próximo",
  "nas cavernas subterrâneas",
  "no cemitério de espadas",
  "no campo de batalha antigo",
];

const partesDeMonstros = [
  // Itens Comuns (frequente)
  "Couro de criatura",
  "Couro de criatura",
  "Couro de criatura",
  "Couro de criatura",
  "Sangue Grosso",
  "Sangue Grosso",
  "Sangue Grosso",
  "Sangue Grosso",
  "Pelagem Rústica",
  "Pelagem Rústica",
  "Pelagem Rústica",
  "Pelagem Rústica",
  "Osso de Monstro",
  "Osso de Monstro",
  "Osso de Monstro",
  "Osso de Monstro",
  
  // Itens Incomuns (médio)
  "Pote de Veneno Básico",
  "Pote de Veneno Básico",
  "Pote de Veneno Básico",
  "Pote de Ácido",
  "Pote de Ácido",
  "Pote de Ácido",
  "Adaga de Osso",
  "Adaga de Osso",
  "Adaga de Osso",
  
  // Itens Raros (baixo)
  "Gema Menor Aleatória",
  "Gema Menor Aleatória",
  "Pote de Veneno Potente",
  "Pote de Veneno Potente",
  "Frasco de Ácido Concentrado",
  "Frasco de Ácido Concentrado",
  
  // Itens Ultra Raros (raríssimo)
  "Gema Maior Aleatória",
  "Escamas Raras"
];

const suprimentosAlquimia = [
  // Ingredientes comuns (mais chances)
  "Flor de Sangue (Poção de Cura)",
  "Flor de Sangue (Poção de Cura)",
  "Flor de Sangue (Poção de Cura)",
  "Flor de Sangue (Poção de Cura)",
  "Flor de Sangue (Poção de Cura)",
  "Folhas de Eldoria (Poção de Cura)",
  "Folhas de Eldoria (Poção de Cura)",
  "Folhas de Eldoria (Poção de Cura)",
  "Folhas de Eldoria (Poção de Cura)",
  "Folhas de Eldoria (Poção de Cura)",
  "Musgo Dourado (Poção de Resistência)",
  "Musgo Dourado (Poção de Resistência)",
  "Musgo Dourado (Poção de Resistência)",
  "Musgo Dourado (Poção de Resistência)",
  "Musgo Dourado (Poção de Resistência)",
  "Musgo Dourado (Poção de Resistência)",

  // Ingredientes incomuns (menos chances)
  "Raiz de Mandrágora (Poção de Força de Gigante)",
  "Raiz de Mandrágora (Poção de Força de Gigante)",
  "Raiz de Mandrágora (Poção de Força de Gigante)",
  "Pétalas de Fogo (Poção de Sopro de Fogo)",
  "Pétalas de Fogo (Poção de Sopro de Fogo)",
  "Pétalas de Fogo (Poção de Sopro de Fogo)",
  "Raiz de Dragão (Elixir de Vitalidade)",
  "Raiz de Dragão (Elixir de Vitalidade)",
  "Raiz de Dragão (Elixir de Vitalidade)",
  "Erva Sombria (Poção de Visão Noturna)",
  "Erva Sombria (Poção de Visão Noturna)",
  "Erva Sombria (Poção de Visão Noturna)",
  "Pólen de Alvorada (Poção de Resistência a Fogo)",
  "Pólen de Alvorada (Poção de Resistência a Fogo)",
  "Pólen de Alvorada (Poção de Resistência a Fogo)",
  "Flor de Cristal (Poção de Magia)",
  "Flor de Cristal (Poção de Magia)",
  "Flor de Cristal (Poção de Magia)",

  // Ingredientes Raros
  "2x Flor de Sangue (Poção de Cura)",
  "2x Flor de Sangue (Poção de Cura)",
  "Raiz de Chifre-de-Águia (Poção de Voo)",
  "Raiz de Chifre-de-Águia (Poção de Voo)",
  "Flor da Lua (Poção de Invisibilidade)",
  "Flor da Lua (Poção de Invisibilidade)",
  "1x Poção de Cura",
  "1x Poção de Cura",
  "Erva-dos-Ventos (Poção de Velocidade)",
  "Erva-dos-Ventos (Poção de Velocidade)",
  "Cacto Espinhoso (Poção de Regeneração)",
  "Cacto Espinhoso (Poção de Regeneração)",
  "Cascas de Fungo Negro (Antídoto)",
  "Cascas de Fungo Negro (Antídoto)",

  // Poções de Ultra Raras
  "1x Poção de Cura Maior",
  "2x Poções de Cura",
  "1x Elixir de Resistência"
];

// ===============================
// Utilidades
// ===============================
function gerarDificuldade(rand) {
  return Math.floor(rand() * 16); // 0–15
}

function gerarTempo(rand) {
  return Math.floor(rand() * 10) + 1; // 1–10 dias
}

// Converte cobre → ouro / prata / cobre
function converterMoedas(cobreTotal) {
  const ouro = Math.floor(cobreTotal / 100);
  cobreTotal %= 100;

  const prata = Math.floor(cobreTotal / 10);
  const cobre = cobreTotal % 10;

  let resultado = [];
  if (ouro > 0) resultado.push(`${ouro} ouro`);
  if (prata > 0) resultado.push(`${prata} prata`);
  if (cobre > 0) resultado.push(`${cobre} cobre`);

  return resultado.join(", ");
}

// ===============================
// Recompensa
// ===============================
function gerarRecompensa(tipo, rand, dias) {
  let ouroBase =
    tipo === "resgatar"
      ? Math.floor(rand() * 21) + 30
      : tipo === "matar"
      ? Math.floor(rand() * 21)
      : tipo === "coletar"
      ? Math.floor(rand() * 5)
      : 0;

  // Converte para cobre
  let cobreBase = ouroBase * 100;

  // Fórmula: base * dias * 0.6
  let cobreFinal = Math.floor(cobreBase * dias * 0.6);

  let extra;
  if (tipo === "matar") {
    extra = partesDeMonstros[Math.floor(rand() * partesDeMonstros.length)];
  } else if (tipo === "coletar") {
    extra = suprimentosAlquimia[Math.floor(rand() * suprimentosAlquimia.length)];
  } else {
    extra = "gratificação do contratante";
  }

  return `${converterMoedas(cobreFinal)} + ${extra}`;
}

// ===============================
// Missão
// ===============================
function gerarMissao(rand) {
  const tipos = ["resgatar", "matar", "coletar"];
  const tipo = tipos[Math.floor(rand() * tipos.length)];
  const alvo = alvos[tipo][Math.floor(rand() * alvos[tipo].length)];
  const local = locais[Math.floor(rand() * locais.length)];

  const dificuldade = gerarDificuldade(rand);
  const dias = gerarTempo(rand);
  const recompensa = gerarRecompensa(tipo, rand, dias);

  const verbos = {
    resgatar: "Resgatar",
    matar: "Eliminar",
    coletar: "Coletar"
  };

  return {
    tipo,
    dificuldade,
    dias,
    descricao: `${verbos[tipo]} o(a) ${alvo} ${local}`,
    recompensa
  };
}

// ===============================
// Geração na Tela
// ===============================
function gerarMissoesNaTela() {
  const container = document.getElementById("missoesContainer");
  container.innerHTML = "";

  // Seed diária DDMMYYYY
  const hoje = new Date();
  const seed = parseInt(
    `${String(hoje.getDate()).padStart(2, "0")}${String(
      hoje.getMonth() + 1
    ).padStart(2, "0")}${hoje.getFullYear()}`
  );

  const rand = mulberry32(seed);

  for (let i = 0; i < 9; i++) {
    const missao = gerarMissao(rand);

    const div = document.createElement("div");
    div.className = "missao";
    div.innerHTML = `
      <strong>Missão ${i + 1}</strong><br>
      📜 ${missao.descricao}<br>
      ⏳ Tempo: ${missao.dias} dia(s)<br>
      ⚔️ Dificuldade: ${missao.dificuldade}/15<br>
      🎁 Recompensa: ${missao.recompensa}<br>
      🏷️ Tipo: ${missao.tipo === "matar" ? "caçar" : missao.tipo}
    `;
    container.appendChild(div);
  }
}

