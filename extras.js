/* Tabla "Otras tarifas y servicios" — datos en un solo lugar.
   Uso en cada landing: <div id="extras-table" data-expedicion="M"></div>
   + <script src="../extras.js"></script>  (data-expedicion: V, M o R) */
(function () {
  var EXTRAS = [
    { s: "Traducciones oficiales al español <small>(por página)</small>", p: "$20" },
    { s: "Análisis de requerimientos + respuesta <small>(cada uno)</small>", p: "$80" },
    { s: "Reaplicación por inadmisión <small>(cada una)</small>", p: "$80" },
    { s: "Solicitud de prórroga de permanencia", p: "$17" },
    { s: "Pago de prórroga de permanencia", p: "$143" },
    { s: "Registro FUT + cita de salvoconducto", p: "$90" },
    { s: "Proceso administrativo + primera cita", p: "$90" },
    { s: "Toma de huellas FBI/RCMP en Colombia", p: "$320" },
    { s: "Adquisición de antecedentes EE.UU./CA", p: "$150" },
    { s: "Apostilla de antecedentes EE.UU./CA", p: "$140" },
    { s: "Movimientos migratorios <small>(por certificado)</small>", p: "$90" },
    { s: "Apostillas estatales EE.UU./CA <small>(por apostilla)</small>", p: "$160" },
    { s: "Pago del estudio de la visa <small>(gestión)</small>", p: "$120" },
    { s: "Pago de expedición <small>(gestión, según tipo)</small>", p: "EXPEDICION" },
    { s: "Cita de cédula de extranjería <small>(adicional)</small>", p: "$60" },
    { s: "Recogida de cédula con poder", p: "$95" },
    { s: "Visa de beneficiario <small>(según plan del titular)</small>", p: "$350 · $200 · $100" }
  ];

  function esc(s) { return s; }

  function render() {
    var el = document.getElementById("extras-table");
    if (!el) return;
    var exp = (el.getAttribute("data-expedicion") || "M").toUpperCase();
    if (exp !== "V" && exp !== "M" && exp !== "R") exp = "M";

    var rows = EXTRAS.map(function (r) {
      var price = r.p;
      if (price === "EXPEDICION") {
        price = ["V", "M", "R"].map(function (t) {
          var vals = { V: "$250", M: "$350", R: "$500" };
          var txt = t + " " + vals[t];
          return t === exp ? '<span class="hl">' + txt + "</span>" : txt;
        }).join(" · ");
      } else {
        price = "<b>" + price + "</b>";
      }
      return '<tr><td style="text-align:left;">' + esc(r.s) + "</td><td>" + price + "</td></tr>";
    }).join("");

    el.innerHTML =
      '<h3 style="font-size:1.5rem; font-weight:400; text-align:center; color:#0f2040; margin:2.5rem 0 .5rem;">Otras tarifas y servicios</h3>' +
      '<p style="text-align:center; color:#475569; max-width:640px; margin:0 auto 0; font-size:.95rem; font-family:Arial,Helvetica,sans-serif;">Precios fijos por evento, cuando tu plan no los incluye. Si estás en Protegido o Integral, primero se usan tus incluidos — estos precios aplican al agotarlos o en Esencial.</p>' +
      '<div class="xtable-wrap"><table class="xtable"><thead><tr><th>Servicio adicional</th><th>Precio fijo</th></tr></thead><tbody>' +
      rows +
      "</tbody></table></div>" +
      '<p class="extras-note">¿Tasas del gobierno (estudio, expedición oficial, cédula)? Están en la caja amarilla de arriba. Todo adicional se confirma por escrito antes de ejecutarse — sin sorpresas.</p>';
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
