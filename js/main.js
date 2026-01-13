import { mulberry32, gerarMissao } from "./gerador.js";

window.onload = () => {
  const container = document.getElementById("missoesContainer");

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
      <h3>${missao.tipo} ${missao.alvo} ${missao.local}</h3>
      <p><strong>Dificuldade:</strong> ${missao.dificuldade}/15</p>
      <p><strong>Recompensa</strong></p>
      <p>${missao.ouro} ${
        missao.recompensaExtra
          ? `<p>e ${missao.recompensaExtra}</p>`
          : ""
      }</p>   
      <p><strong>Prazo:</strong> ${missao.dias} dia(s)</p>
    `;

    container.appendChild(div);
  }
};



