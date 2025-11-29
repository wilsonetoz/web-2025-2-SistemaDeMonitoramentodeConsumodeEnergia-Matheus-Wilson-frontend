
let metaMensal = localStorage.getItem("metaMensal")
  ? parseFloat(localStorage.getItem("metaMensal"))
  : 150; // valorPadrao

export function verificarMeta(dados) {
  const total = dados.reduce((sum, d) => sum + d.kwh, 0);
  const alerta = document.getElementById("alertaMeta");
  const metaValor = document.getElementById("valorMeta");

  if (!alerta) return;

  metaValor.textContent = metaMensal.toFixed(2);

  if (total > metaMensal) {
    alerta.textContent = " Meta ultrapassada!";
    alerta.className = "text-red-600 font-semibold";
  } else {
    alerta.textContent = ` ${Math.round((total / metaMensal) * 100)}% da meta usada`;
    alerta.className = "text-green-600 font-semibold";
  }
}

export function inicializarMeta() {
  const btnDefinirMeta = document.getElementById("btnDefinirMeta");

  if (!btnDefinirMeta) return;

  btnDefinirMeta.addEventListener("click", () => {
    const novaMeta = prompt("Digite o novo valor da meta mensal (kWh):", metaMensal);
    if (novaMeta && !isNaN(novaMeta) && novaMeta > 0) {
      metaMensal = parseFloat(novaMeta);
      localStorage.setItem("metaMensal", metaMensal);
      alert(`Meta atualizada para ${metaMensal} kWh`);
      window.location.reload();
    } else {
      alert("Valor inválido! Informe um número maior que zero.");
    }
  });
}
