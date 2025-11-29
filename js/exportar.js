import { dadosGlobais } from "./consumo.js";

export function inicializarExportacoes() {
  document.getElementById("btnCSV")?.addEventListener("click", exportarCSV);
  document.getElementById("btnPDF")?.addEventListener("click", exportarPDF);
}

function exportarCSV() {
  if (dadosGlobais.length === 0) return alert("Sem dados para exportar!");
  const linhas = [["Data",  "kWh",  "Custo",  "Observação"]];
  dadosGlobais.forEach((d) =>
    linhas.push([d.data, d.kwh, d.custo, d.observacao || ""])
  );
  const csv = linhas.map((l) => l.join(" - ")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "relatorio_consumo.csv";
  a.click();
}

export async function exportarPDF() {
  if (dadosGlobais.length === 0) {
    alert("Sem dados para exportar!");
    return;
  }

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Relatório de Consumo - Energia+", 20, 20);

  let y = 40;
  dadosGlobais.forEach((d) => {
    doc.text(
      `${d.data} - ${d.kwh} kWh - R$ ${d.custo.toFixed(2)} - ${d.observacao || "-"}`,
      20,
      y
    );
    y += 10;
  });

  doc.save("relatorio_consumo.pdf");
}
