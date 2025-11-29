import { inicializarLogin, inicializarLogout } from "./login.js";
import { carregarConsumo } from "./consumo.js";
import { inicializarExportacoes } from "./exportar.js";
import { inicializarMeta } from "./meta.js";
import { inicializarFormulario } from "./form.js";

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("loginForm")) {
    inicializarLogin();
  }

  if (document.getElementById("tabelaConsumo")) {
    inicializarLogout();
    carregarConsumo();
    inicializarFormulario();
    inicializarExportacoes();
    inicializarMeta();
  }
});
