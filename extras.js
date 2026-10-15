/* Tabla "Otras tarifas y servicios" — 3 columnas por plan, datos en un solo lugar.
   Uso en cada landing:
     <div id="extras-table" data-expedicion="M" data-esencial="450" data-protegido="650"></div>
     <script src="../extras.js"></script>
   data-expedicion: V, M o R (solo config interna: el cliente ve el valor directo, sin letras).
   data-esencial / data-protegido: honorario de ESA visa (Integral siempre $2.900). */
(function () {
  var EXP_GESTION = { V: "$250", M: "$350", R: "$500" };

  var EXTRAS = [
    { s: "Traducciones oficiales al español <small>(por página)</small>", e: "$20", p: "Máximo 2 páginas", i: "✓" },
    { s: "Análisis de requerimientos + respuesta", e: "$80", p: "Hasta 2", i: "Todos" },
    { s: "Reaplicación por inadmisión", e: "$80", p: "Hasta 1 vez", i: "Todas" },
    { s: "Solicitud de prórroga de permanencia", e: "$17", p: "✓", i: "✓" },
    { s: "Pago de prórroga de permanencia", e: "$143", p: "$143", i: "✓" },
    { s: "Registro FUT + cita de salvoconducto", e: "$90", p: "$90", i: "✓" },
    { s: "Proceso administrativo + primera cita", e: "$90", p: "$90", i: "✓" },
    { s: "Toma de huellas FBI/RCMP en Colombia", e: "$320", p: "$320", i: "✓" },
    { s: "Adquisición de antecedentes EE.UU./CA", e: "$150", p: "$150", i: "✓" },
    { s: "Apostilla de antecedentes EE.UU./CA", e: "$140", p: "$140", i: "✓" },
    { s: "Movimientos migratorios <small>(por certificado)</small>", e: "$90", p: "$90", i: "✓" },
    { s: "Apostillas estatales EE.UU./CA <small>(por apostilla)</small>", e: "$160", p: "$160", i: "✓" },
    { s: "Pago del estudio de la visa <small>(gestión)</small>", e: "$120", p: "$120", i: "✓" },
    { s: "Pago de expedición <small>(gestión)</small>", e: "EXPEDICION", p: "EXPEDICION", i: "✓" },
    { s: "Cita de cédula de extranjería <small>(adicional)</small>", e: "$60", p: "Hasta 2 veces", i: "Todas las necesarias" },
    { s: "Recogida de cédula con poder", e: "$95", p: "$95", i: "✓" },
    { s: "Visa de beneficiario <small>(hereda el plan del titular)</small>", e: "$350", p: "$200", i: "$100" }
  ];

  function cell(v, hl) {
    var bold = v.charAt(0) === "$" ? "<b>" + v + "</b>" : "<small>" + v + "</small>";
    if (v === "✓") bold = "✓";
    return '<td align="center"' + (hl ? ' style="background:#EFF6FF;"' : "") + ">" + bold + "</td>";
  }

  function render() {
    var el = document.getElementById("extras-table");
    if (!el) return;
    var exp = (el.getAttribute("data-expedicion") || "M").toUpperCase();
    if (exp !== "ALL" && !EXP_GESTION[exp]) exp = "M";
    var pe = el.getAttribute("data-esencial") || "450";
    var pp = el.getAttribute("data-protegido") || "650";
    var pi = el.getAttribute("data-integral") || "2.900";

    var rows = EXTRAS.map(function (r) {
      var allExp = "V $250 · M $350 · R $500";
      var e = r.e === "EXPEDICION" ? (exp === "ALL" ? allExp : EXP_GESTION[exp]) : r.e;
      var p = r.p === "EXPEDICION" ? (exp === "ALL" ? allExp : EXP_GESTION[exp]) : r.p;
      return (
        '<tr><td style="padding:9px 14px;">' + r.s + "</td>" +
        cell(e, false) + cell(p, true) + cell(r.i, false) + "</tr>"
      );
    }).join("");

    el.innerHTML =
      '<h3 style="font-size:1.5rem; font-weight:400; text-align:center; color:#0f2040; margin:2.5rem 0 .5rem;">Otras tarifas y servicios</h3>' +
      '<p style="text-align:center; color:#475569; max-width:640px; margin:0 auto 0; font-size:.95rem; font-family:Arial,Helvetica,sans-serif;">Todo lo que tu plan no incluye, a precio fijo y por escrito. ✓ = incluido en tu plan.</p>' +
      '<div class="xtable-wrap"><table class="xtable"><thead><tr><th style="text-align:left; width:40%;">Servicio adicional</th>' +
      "<th>Esencial<br>$" + pe + "</th>" +
      '<th style="background:#f59e0b;">Protegido<br>$' + pp + " ★</th>" +
      "<th>Integral<br>$" + pi + "</th></tr></thead><tbody>" +
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
