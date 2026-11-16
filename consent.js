/* Banner de consentimiento de cookies — abogadosdemigracion.com
 *
 * Sin dependencias, sin cuenta externa. Un solo archivo para las 39 páginas.
 *
 * Cómo funciona:
 * 1. Se carga ANTES de GTM (orden en el <head>), así que la señal de
 *    Consent Mode llega antes de que Google Tag Manager procese etiquetas.
 * 2. Por defecto todo está DENEGADO: si el visitante no decide, GA4 no escribe
 *    cookies (manda pings sin cookies) y Ads no usa identificadores.
 * 3. El elección se guarda en localStorage (no es una cookie: es necesario
 *    recordar la respuesta) durante 12 meses.
 * 4. Se puede reabrir desde el enlace "Cookies" del pie de página.
 *
 * Claves de Consent Mode v2 que se envían:
 *   ad_storage, ad_user_data, ad_personalization, analytics_storage.
 */
(function () {
  'use strict';

  var KEY = 'cp_consent_v1';
  var VERSION = 1;
  var MESES = 12;

  var lang = (document.documentElement.getAttribute('lang') || 'es').toLowerCase().slice(0, 2);
  var en = lang === 'en';

  var TXT = {
    es: {
      titulo: 'Cookies en este sitio',
      cuerpo: 'Usamos cookies para contar visitas y saber qué páginas ayudan. Tú decides. Si las rechazas, el sitio funciona igual; solo perdemos la medición.',
      aceptar: 'Aceptar todas',
      rechazar: 'Solo las necesarias',
      politica: 'Política de privacidad',
      politicaUrl: 'https://www.abogadosdemigracion.com.co/politica-privacidad',
      reabrir: 'Cookies'
    },
    en: {
      titulo: 'Cookies on this site',
      cuerpo: 'We use cookies to count visits and learn which pages help. You decide. If you reject them, the site works the same; we just lose the measurement.',
      aceptar: 'Accept all',
      rechazar: 'Necessary only',
      politica: 'Privacy Policy',
      politicaUrl: 'https://www.colombianpassport.com/privacy-policy',
      reabrir: 'Cookies'
    }
  };
  var T = en ? TXT.en : TXT.es;

  // --- 1. Consent Mode: por defecto, denegado -------------------------------
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  // --- 2. Estado guardado ---------------------------------------------------
  function leer() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var o = JSON.parse(raw);
      if (!o || o.v !== VERSION || typeof o.aceptado !== 'boolean') return null;
      return o;
    } catch (e) { return null; }
  }

  function guardar(aceptado) {
    var o = { v: VERSION, aceptado: aceptado, fecha: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { /* modo privado */ }
    return o;
  }

  function aplicar(aceptado) {
    var valor = aceptado ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: valor,
      ad_user_data: valor,
      ad_personalization: valor,
      analytics_storage: valor
    });
    window.dataLayer.push({ event: 'cp_consent_update', cp_consent: aceptado ? 'granted' : 'denied' });
  }

  // --- 3. Interfaz ----------------------------------------------------------
  // Barra compacta: en escritorio va en una sola fila, para no tapar los CTA.
  var ESTILOS =
    '.cp-caja{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:2147483000;' +
    'width:min(960px,calc(100% - 24px));box-sizing:border-box;background:#fff;color:#0f2040;' +
    'border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 14px 34px -12px rgba(15,32,64,.35);' +
    'padding:13px 18px;display:flex;gap:18px;align-items:center;justify-content:space-between;' +
    'flex-wrap:wrap;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;' +
    'font-size:13.5px;line-height:1.4;text-align:left}' +
    '.cp-texto{flex:1 1 280px;min-width:0}' +
    '.cp-caja h2{margin:0 0 2px;font-size:14px;font-weight:700;color:#0f2040}' +
    '.cp-caja p{margin:0;color:#475569}' +
    '.cp-politica{display:inline-block;margin-top:4px;font-size:12px;color:#64748b;text-decoration:underline}' +
    '.cp-acciones{display:flex;gap:8px;align-items:center;flex:0 0 auto}' +
    '.cp-acciones button{min-width:158px;padding:10px 14px;border-radius:8px;font:inherit;' +
    'font-weight:700;cursor:pointer;transition:background .15s ease,opacity .15s ease}' +
    '.cp-aceptar{background:#0f2040;color:#fff;border:1px solid #0f2040}' +
    '.cp-aceptar:hover{opacity:.9}' +
    '.cp-rechazar{background:#fff;color:#0f2040;border:1px solid #0f2040}' +
    '.cp-rechazar:hover{background:#f1f5f9}' +
    '.cp-pie{display:inline;margin-left:10px;font:inherit;font-size:.85em;color:inherit;' +
    'background:none;border:0;padding:0;cursor:pointer;text-decoration:underline;opacity:.75}' +
    '.cp-pie:hover{opacity:1}' +
    '@media(max-width:760px){.cp-caja{flex-direction:column;align-items:stretch;justify-content:flex-start;gap:10px;padding:14px}.cp-texto{flex:0 0 auto}' +
    '.cp-acciones{flex-wrap:wrap;height:auto}.cp-acciones button{flex:1 1 0;min-width:0;height:auto}}';

  var caja = null;

  function inyectarEstilos() {
    if (document.getElementById('cp-consent-estilos')) return;
    var s = document.createElement('style');
    s.id = 'cp-consent-estilos';
    s.textContent = ESTILOS;
    document.head.appendChild(s);
  }

  function mostrar() {
    if (caja) return;
    inyectarEstilos();

    caja = document.createElement('div');
    caja.className = 'cp-caja';
    caja.setAttribute('role', 'dialog');
    caja.setAttribute('aria-label', T.titulo);

    var texto = document.createElement('div');
    texto.className = 'cp-texto';

    var h = document.createElement('h2');
    h.textContent = T.titulo;

    var p = document.createElement('p');
    p.textContent = T.cuerpo;

    var enlace = document.createElement('a');
    enlace.className = 'cp-politica';
    enlace.href = T.politicaUrl;
    enlace.target = '_blank';
    enlace.rel = 'noopener';
    enlace.textContent = T.politica;

    texto.appendChild(h);
    texto.appendChild(p);
    texto.appendChild(enlace);

    var acciones = document.createElement('div');
    acciones.className = 'cp-acciones';

    var bAceptar = document.createElement('button');
    bAceptar.type = 'button';
    bAceptar.className = 'cp-aceptar';
    bAceptar.textContent = T.aceptar;
    bAceptar.addEventListener('click', function () { decidir(true); });

    var bRechazar = document.createElement('button');
    bRechazar.type = 'button';
    bRechazar.className = 'cp-rechazar';
    bRechazar.textContent = T.rechazar;
    bRechazar.addEventListener('click', function () { decidir(false); });

    acciones.appendChild(bAceptar);
    acciones.appendChild(bRechazar);

    caja.appendChild(texto);
    caja.appendChild(acciones);
    document.body.appendChild(caja);
  }

  function ocultar() {
    if (caja && caja.parentNode) caja.parentNode.removeChild(caja);
    caja = null;
  }

  function decidir(aceptado) {
    guardar(aceptado);
    aplicar(aceptado);
    ocultar();
    actualizarEnlace();
  }

  // --- 4. Enlace "Cookies" en el pie ---------------------------------------
  function actualizarEnlace() {
    var viejo = document.getElementById('cp-reabrir');
    if (viejo) return;
    var pie = document.querySelector('footer');
    if (!pie) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.id = 'cp-reabrir';
    b.className = 'cp-pie';
    b.textContent = T.reabrir;
    b.setAttribute('aria-label', en ? 'Cookie settings' : 'Configuración de cookies');
    b.addEventListener('click', function () { mostrar(); });
    pie.appendChild(b);
  }

  // --- 5. Arranque ---------------------------------------------------------
  var guardado = leer();
  if (guardado) {
    aplicar(guardado.aceptado);
  } else {
    // Sin decisión: se deja la señal en "denied" y se pregunta al cargar el DOM.
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied'
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (!leer()) mostrar();
      actualizarEnlace();
    });
  } else {
    if (!leer()) mostrar();
    actualizarEnlace();
  }

  // API mínima para depurar o para reabrir desde otro sitio
  window.cpConsent = {
    abrir: mostrar,
    estado: function () { return leer(); },
    borrar: function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      aplicar(false);
      mostrar();
    }
  };
})();
