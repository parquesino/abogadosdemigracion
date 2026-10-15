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
    { s: "Pago de prórroga de permanencia <small>(gestionado, tasa incluida)</small> <sup style=\"color:#0f2040;font-weight:800;\">1</sup>", e: "$143", p: "$143", i: "✓" },
    { s: "Registro FUT + cita de salvoconducto", e: "$90", p: "$90", i: "✓" },
    { s: "Pago de salvoconducto <small>(gestionado, tasa incluida)</small> <sup style=\"color:#0f2040;font-weight:800;\">2</sup>", e: "$70", p: "$70", i: "✓" },
    { s: "Proceso administrativo + primera cita", e: "$90", p: "$90", i: "✓" },
    { s: "Toma de huellas en Colombia para antecedentes <small>(solo FBI; gestionado, costos incluidos)</small> <sup style=\"color:#0f2040;font-weight:800;\">3</sup>", e: "$250", p: "$250", i: "✓" },
    { s: "Adquisición de antecedentes EE.UU./CA <small>(gestionado, costos incluidos)</small> <sup style=\"color:#0f2040;font-weight:800;\">4</sup>", e: "$150", p: "$150", i: "✓" },
    { s: "Apostilla de antecedentes EE.UU./CA <small>(gestionado, costos incluidos)</small> <sup style=\"color:#0f2040;font-weight:800;\">5</sup>", e: "$140", p: "$140", i: "✓" },
    { s: "Movimientos migratorios <small>(por certificado; gestionado, tasa incluida)</small> <sup style=\"color:#0f2040;font-weight:800;\">6</sup>", e: "$70", p: "$70", i: "✓" },
    { s: "Apostillas estatales EE.UU./CA <small>(por apostilla; gestionado, costos incluidos)</small> <sup style=\"color:#0f2040;font-weight:800;\">7</sup>", e: "$160", p: "$160", i: "✓" },
    { s: "Pago del estudio <small>(gestionado, tasa incluida)</small> <sup style=\"color:#0f2040;font-weight:800;\">8</sup>", e: "$120", p: "$120", i: "✓" },
    { s: "Pago de expedición <small>(gestionado, tasa incluida)</small> <sup style=\"color:#0f2040;font-weight:800;\">9</sup>", e: "EXPEDICION", p: "EXPEDICION", i: "✓" },
    { s: "Cita de cédula de extranjería <small>(adicional)</small>", e: "$60", p: "Hasta 2 veces", i: "Todas las necesarias" },
    { s: "Recogida de cédula con poder", e: "$95", p: "$95", i: "✓" },
    { s: "Registro de matrimonio en Colombia <small>(gestionado, tasa incluida)</small> <sup style=\"color:#0f2040;font-weight:800;\">10</sup>", e: "$300", p: "$250", i: "✓" },
    { s: "Visa de beneficiario <small>(hereda el plan del titular)</small>", e: "$350", p: "$300", i: "$200" }
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
    var OFF = { V: "183", M: "279", R: "408" };
    var expNote = exp === "ALL"
      ? "Tasa oficial según tipo (V $183 / M $279 / R $408) o gestión con tasa incluida."
      : EXP_GESTION[exp] + " gestionado = $" + OFF[exp] + " tasa + $" + (parseInt(EXP_GESTION[exp].slice(1)) - parseInt(OFF[exp])) + " gestión (directo: $" + OFF[exp] + ").";
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
      '<p class="extras-note">¹ $143 gestionado = tasa oficial $150.000 COP (≈$46 USD) + $97 gestión (directo: $46).</p>' +
      '<p class="extras-note">² $70 gestionado = tasa oficial $88.000 COP (≈$27 USD) + $43 gestión (directo: $27).</p>' +
      '<p class="extras-note">³ $250 gestionado = proveedor certificado $400.000 COP (≈$123 USD) + envío DHL ≈$230.000 COP (≈$71 USD) + $56 gestión.</p>' +
      '<p class="extras-note">⁴ $150 gestionado = proveedor certificado oficial $75 USD + $75 gestión.</p>' +
      '<p class="extras-note">⁵ $140 gestionado = empresa certificada $70 USD + $70 gestión.</p>' +
      '<p class="extras-note">⁶ $70 gestionado = tasa oficial $89.000 COP (≈$27 USD) + $43 gestión (directo: $27).</p>' +
      '<p class="extras-note">⁷ $160 gestionado = empresa certificada $80 USD + $80 gestión.</p>' +
      '<p class="extras-note">⁸ $120 gestionado = $56 tasa oficial + $64 gestión (directo: $56).</p>' +
      '<p class="extras-note">⁹ ' + expNote + '</p>' +
      '<p class="extras-note">¹⁰ Notaría ≈$300.000 COP (≈$92 USD). Gestionado: $300 Esencial / $250 Protegido.</p>';
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
