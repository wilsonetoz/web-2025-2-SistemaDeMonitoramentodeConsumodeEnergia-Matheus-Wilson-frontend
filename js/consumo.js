import { getConsumo } from "./api.js";
import { desenharGrafico } from "./grafico.js";
import { verificarMeta } from "./meta.js";

export let dadosGlobais = [];

export async function carregarConsumo() {
  try {
    const dados = await getConsumo();
    dadosGlobais = dados;

    const tbody = document.getElementById("tabelaConsumo");
    const totalHoje = document.getElementById("totalHoje");
    const custoHoje = document.getElementById("custoHoje");
    const totalDias = document.getElementById("totalDias");

    tbody.innerHTML = "";
    dados.forEach((d) => {
      tbody.innerHTML += `
        <tr class="hover:bg-gray-50">
          <td class="p-2">${d.data}</td>
          <td class="p-2">${d.kwh}</td>
          <td class="p-2">R$ ${d.custo.toFixed(2)}</td>
          <td class="p-2">${d.observacao || "-"}</td>
          <td class="p-2 text-center">
          <button class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700" onclick="editarRegistro(${d.id})">Editar</button>
          <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onclick="excluirRegistro(${d.id})">Excluir</button>
          </td>
        </tr>`;
    });

    if (dados.length > 0) {
      const ultimo = dados[dados.length - 1];
      totalHoje.textContent = ultimo.kwh.toFixed(2);
      custoHoje.textContent = ultimo.custo.toFixed(2);
      totalDias.textContent = dados.length;
    }
    window.editarRegistro = function(id) {
      const registro = dadosGlobais.find(r => r.id === id);
      if (!registro) return alert("Registro não encontrado!");

      document.getElementById("data").value = registro.data;
      document.getElementById("kwh").value = registro.kwh;
      document.getElementById("custo").value = registro.custo;
      document.getElementById("observacao").value = registro.observacao ?? "";

      window.idEmEdicao = id;

      alert("Edite os campos e clique em SALVAR");
    };
    window.excluirRegistro = async function(id) {
      if (!confirm("Deseja remover este registro?")) return;

      await fetch(`http://127.0.0.1:8000/consumo/${id}`, {
        method: "DELETE",
      });

      alert("Registro excluído!");
      carregarConsumo();

  };

    desenharGrafico(dados);
    verificarMeta(dados);
  } catch (error) {
    console.error("Erro ao carregar consumo:", error);
  }
}
