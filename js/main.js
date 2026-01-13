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
    const div = document.createElement("div");
    div.className = "missao";
    div.textContent = gerarMissao(rand);
    container.appendChild(div);
  }
};