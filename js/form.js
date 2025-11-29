import { carregarConsumo, dadosGlobais } from "./consumo.js";

const API_URL = "http://127.0.0.1:8000";

export function inicializarFormulario() {
  const form = document.getElementById("formConsumo");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = document.getElementById("data").value;
    const kwh = parseFloat(document.getElementById("kwh").value);
    const custo = parseFloat(document.getElementById("custo").value);
    const observacao = document.getElementById("observacao").value;

    if (window.idEmEdicao) {
      const id = window.idEmEdicao;

      await fetch(`${API_URL}/consumo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, kwh, custo, observacao }),
      });

      alert("Registro atualizado!");
      window.idEmEdicao = null;
      form.reset();
      carregarConsumo();
      return;
    }

    try {
      await fetch(`${API_URL}/consumo/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, kwh, custo, observacao }),
      });

      alert("Consumo adicionado!");
      form.reset();
      carregarConsumo();
    } catch (err) {
      alert("Erro ao adicionar consumo!");
    }
  });
}
