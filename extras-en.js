/* "Other fees & services" table — 3 plan columns, single source of truth.
   Use on each landing:
     <div id="extras-table" data-expedicion="M" data-esencial="450" data-protegido="650" data-integral="2900"></div>
     <script src="../../extras-en.js"></script>
   data-expedicion: V, M, R or ALL (internal config only: clients see the direct value, no letters).
   data-esencial / data-protegido / data-integral: THIS visa's fees. */
(function () {
  var EXP_GESTION = { V: "$250", M: "$350", R: "$500" };

  var EXTRAS = [
    { s: "Official Spanish translations <small>(per page)</small>", e: "$20", p: "Up to 2 pages", i: "✓" },
    { s: "Requirements analysis + response", e: "$80", p: "Up to 2", i: "All" },
    { s: "Re-application after inadmission", e: "$80", p: "Up to 1 time", i: "All" },
    { s: "Stay extension request", e: "$17", p: "✓", i: "✓" },
    { s: "Stay extension payment <small>(managed, fee included)</small> <sup style=\"color:#0f2040;font-weight:800;\">1</sup>", e: "$143", p: "$143", i: "✓" },
    { s: "FUT registration + safe-conduct appointment", e: "$90", p: "$90", i: "✓" },
    { s: "Safe-conduct payment <small>(managed, fee included)</small> <sup style=\"color:#0f2040;font-weight:800;\">2</sup>", e: "$70", p: "$70", i: "✓" },
    { s: "Administrative process + first appointment", e: "$90", p: "$90", i: "✓" },
    { s: "Fingerprinting in Colombia for records <small>(FBI only; managed, costs included)</small> <sup style=\"color:#0f2040;font-weight:800;\">3</sup>", e: "$250", p: "$250", i: "✓" },
    { s: "Records procurement USA/CA <small>(managed, costs included)</small> <sup style=\"color:#0f2040;font-weight:800;\">4</sup>", e: "$150", p: "$150", i: "✓" },
    { s: "Records apostille USA/CA <small>(managed, costs included)</small> <sup style=\"color:#0f2040;font-weight:800;\">5</sup>", e: "$140", p: "$140", i: "✓" },
    { s: "Migratory movements <small>(per certificate; managed, fee included)</small> <sup style=\"color:#0f2040;font-weight:800;\">6</sup>", e: "$70", p: "$70", i: "✓" },
    { s: "State apostilles USA/CA <small>(per apostille; managed, costs included)</small> <sup style=\"color:#0f2040;font-weight:800;\">7</sup>", e: "$160", p: "$160", i: "✓" },
    { s: "Study payment <small>(managed, fee included)</small> <sup style=\"color:#0f2040;font-weight:800;\">8</sup>", e: "$120", p: "$120", i: "✓" },
    { s: "Issuance payment <small>(managed, fee included)</small> <sup style=\"color:#0f2040;font-weight:800;\">9</sup>", e: "EXPEDICION", p: "EXPEDICION", i: "✓" },
    { s: "Cédula appointment <small>(additional)</small>", e: "$60", p: "Up to 2 times", i: "All needed" },
    { s: "Cédula pickup with POA", e: "$95", p: "$95", i: "✓" },
    { s: "Marriage registration in Colombia <small>(managed, fee included)</small> <sup style=\"color:#0f2040;font-weight:800;\">10</sup>", e: "$300", p: "$300", i: "✓" },
    { s: "Dependent visa <small>(inherits the holder's plan)</small>", e: "$350", p: "$300", i: "$200" }
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
    var pi = el.getAttribute("data-integral") || "2900";
    var OFF = { V: "183", M: "279", R: "408" };
    var expNote = exp === "ALL"
      ? "Official fee per type (V $183 / M $279 / R $408) or managed with fee included."
      : EXP_GESTION[exp] + " managed = $" + OFF[exp] + " fee + $" + (parseInt(EXP_GESTION[exp].slice(1)) - parseInt(OFF[exp])) + " handling (direct: $" + OFF[exp] + ").";

    var allExp = "V $250 · M $350 · R $500";
    var rows = EXTRAS.map(function (r) {
      var e = r.e === "EXPEDICION" ? (exp === "ALL" ? allExp : EXP_GESTION[exp]) : r.e;
      var p = r.p === "EXPEDICION" ? (exp === "ALL" ? allExp : EXP_GESTION[exp]) : r.p;
      return (
        '<tr><td style="padding:9px 14px;">' + r.s + "</td>" +
        cell(e, false) + cell(p, true) + cell(r.i, false) + "</tr>"
      );
    }).join("");

    el.innerHTML =
      '<h3 style="font-size:1.5rem; font-weight:400; text-align:center; color:#0f2040; margin:2.5rem 0 .5rem;">Other fees &amp; services</h3>' +
      '<p style="text-align:center; color:#475569; max-width:640px; margin:0 auto 0; font-size:.95rem; font-family:Arial,Helvetica,sans-serif;">Everything your plan doesn\u2019t include, at a fixed written price. ✓ = included in your plan.</p>' +
      '<div class="xtable-wrap"><table class="xtable"><thead><tr><th style="text-align:left; width:40%;">Additional service</th>' +
      "<th>Essential<br>$" + pe + "</th>" +
      '<th style="background:#f59e0b;">Protected<br>$' + pp + " ★</th>" +
      "<th>Turnkey<br>$" + pi + "</th></tr></thead><tbody>" +
      rows +
      "</tbody></table></div>" +
      '<p class="extras-note">¹ $143 managed = $150,000 COP official fee (≈$46 USD) + $97 handling (direct: $46).</p>' +
      '<p class="extras-note">² $70 managed = $88,000 COP official fee (≈$27 USD) + $43 handling (direct: $27).</p>' +
      '<p class="extras-note">³ $250 managed = certified provider $400,000 COP (≈$123 USD) + DHL shipping ≈$230,000 COP (≈$71 USD) + $56 handling.</p>' +
      '<p class="extras-note">⁴ $150 managed = official certified provider $75 USD + $75 handling.</p>' +
      '<p class="extras-note">⁵ $140 managed = certified company $70 USD + $70 handling.</p>' +
      '<p class="extras-note">⁶ $70 managed = $89,000 COP official fee (≈$27 USD) + $43 handling (direct: $27).</p>' +
      '<p class="extras-note">⁷ $160 managed = certified company $80 USD + $80 handling.</p>' +
      '<p class="extras-note">⁸ $120 managed = $56 official fee + $64 handling (direct: $56).</p>' +
      '<p class="extras-note">⁹ ' + expNote + '</p>' +
      '<p class="extras-note">¹⁰ $300 managed = notary ≈$300,000 COP (≈$92 USD) + $208 handling.</p>';
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
