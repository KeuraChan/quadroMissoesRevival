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
  "em uma caverna esquecida",
  "nas estradas",
  "nos túneis",
  "em ruínas nas montanhas",
  "no topo de uma colina",
  "na beira de um rio",
  "na floresta densa",
  "no pântano venenoso",
  "no templo antigo",
  "em um vilarejo próximo",
  "nas cavernas subterrâneas",
  "no cemitério de espadas",
  "no campo de batalha antigo",
];

const partesDeMonstros = [
  "couro resistente",
  "dentes afiados",
  "garras afiadas",
  "escamas",
  "sangue mágico",
  "osso forte",
  "pelagem rara",
  "chifres",
  "pelo venenoso",
  "pedaço de crânio",
  "cauda de monstro",
  "tendão resistente",
  "ferrão venenoso",
  "unha de ferocidade",
  "1x adaga de osso",
];

const suprimentosAlquimia = [
  // Ingredientes comuns (mais chances)
  "Flor de Sangue (Poção de Cura)",
  "Flor de Sangue (Poção de Cura)",
  "Flor de Sangue (Poção de Cura)",
  "Flor de Sangue (Poção de Cura)",
  "Folhas de Eldoria (Poção de Cura)",
  "Folhas de Eldoria (Poção de Cura)",
  "Folhas de Eldoria (Poção de Cura)",
  "Folhas de Eldoria (Poção de Cura)",
  "Musgo Dourado (Poção de Resistência)",
  "Musgo Dourado (Poção de Resistência)",
  "Musgo Dourado (Poção de Resistência)",
  "Musgo Dourado (Poção de Resistência)",
  "Erva-dos-Ventos (Poção de Velocidade)",
  "Erva-dos-Ventos (Poção de Velocidade)",
  "Cacto Espinhoso (Poção de Regeneração)",
  "Cacto Espinhoso (Poção de Regeneração)",
  "Cascas de Fungo Negro (Antídoto)",
  "Cascas de Fungo Negro (Antídoto)",
  // Ingredientes mais raros (menos chances)
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

  // Poções de muito Raras
  "2x Flor de Sangue (Poção de Cura)",
  "2x Flor de Sangue (Poção de Cura)",
  "Raiz de Chifre-de-Águia (Poção de Voo)",
  "Raiz de Chifre-de-Águia (Poção de Voo)",
  "Flor da Lua (Poção de Invisibilidade)",
  "Flor da Lua (Poção de Invisibilidade)",
  "1x Poção de Cura",
  "1x Poção de Cura",

  // Poções de Ultra Raras
  "1x Poção de Cura Maior",
  "2x Poções de Cura",
  "1x Elixir de Resistência"
];

function gerarRecompensa(tipo, rand) {
  const ouro =
    tipo === "resgatar"
      ? Math.floor(rand() * 21) + 30
      : tipo === "matar"
      ? Math.floor(rand() * 29)
      : tipo === "coletar"
      ? Math.floor(rand() * 5)
      : 0;

  let extra;
  if (tipo === "matar") {
    extra = partesDeMonstros[Math.floor(rand() * partesDeMonstros.length)];
  } else if (tipo === "coletar") {
    extra =
      suprimentosAlquimia[Math.floor(rand() * suprimentosAlquimia.length)];
  } else {
    extra = "e uma gratificação do contratante";
  }

  return `${ouro} peças de ouro + ${extra}`;
}

function gerarMissao(rand) {
  const tipos = ["resgatar", "matar", "coletar"];
  const tipo = tipos[Math.floor(rand() * tipos.length)];
  const alvo = alvos[tipo][Math.floor(rand() * alvos[tipo].length)];
  const local = locais[Math.floor(rand() * locais.length)];
  const recompensa = gerarRecompensa(tipo, rand);

  const verbos = {
    resgatar: "Resgatar",
    matar: "Eliminar",
    coletar: "Coletar",
  };

  return {
    tipo,
    descricao: `${verbos[tipo]} o(a) ${alvo} ${local}`,
    recompensa,
  };
}

function gerarMissoesNaTela() {
  const container = document.getElementById("missoesContainer");
  container.innerHTML = "";

  // Sempre usa a data atual como seed (DDMMYYYY)
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = hoje.getFullYear();
  const seed = parseInt(`${dia}${mes}${ano}`);

  const rand = mulberry32(seed);

  for (let i = 0; i < 9; i++) {
    const missao = gerarMissao(rand);

    const div = document.createElement("div");
    div.className = "missao";
    div.innerHTML = `
        <strong>Missão ${i + 1}</strong><br>
        📜 ${missao.descricao}<br>
        🎁 Recompensa: ${missao.recompensa}<br>
        🏷️ Tipo: ${missao.tipo}
      `;
    container.appendChild(div);
  }
}
