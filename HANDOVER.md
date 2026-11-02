# HANDOVER — web track (todas las landings)

> Última actualización: 2026-10-22. Push a `main` = deploy (GitHub Pages directo o vía Netlify según propiedad; verificar en vivo).
> Si retomas aquí: lee este archivo + el `README.md` de cada repo primero, verifica 2-3 URLs en vivo y sigue por "Pendiente".
> OJO: este archivo es PÚBLICO (repos públicos). No meter aquí secretos, solo dónde viven.

## Mapa de propiedades

- `abogadosdemigracion` → `parquesino/abogadosdemigracion` → www.abogadosdemigracion.com (GitHub Pages directo). 32 páginas ES/EN.
- `marriagevisacolombia.com` → `parquesino/marriagevisacolombia.com` → www.marriagevisacolombia.com (GitHub Pages). Landing ×3 copias (index/meta/yt) + citizenship + 3 eligibility-result.
- `residentvisacolombia.com` → **`parquesino/residentvisa.colombianpassport.com.git`** (¡nombre distinto!) → residentvisa.colombianpassport.com (GitHub Pages). Landing + eligibility-result. La cuenta deploy necesita acceso a ese repo.
- `colombiaretirementvisa.com.co` → `parquesino/colombiaretirementvisa.com.co` → apex, DNS a AWS (proxy/Netlify por delante, NO GitHub directo). CNAME creado con el apex. `has_pages: false` en API (sirve igual vía su cadena actual — no tocar DNS).
- `Visanomadadigitalcolombia.com` → `parquesino/Visanomadadigitalcolombia.com` → www (DNS a AWS, igual que arriba). CNAME normalizado a dominio pelado.
- Cada repo tiene su `README.md` con objetivos, modelo y reglas (oct-2026).

## Hecho (con commit)

- `como-trabajamos` rota en `visa-residente` → trasplante de `.how-*` desde `visa.css` + quitar nav duplicado `/#como-trabaj/d`.
- Auditoría 32 páginas (abogados): solo 9 usaban plantilla inline vieja (residente + 8). Resto usa `visa.css` compartido (verificado en vivo).
- **Unificación CSS** (abogados): `visa.css` fuente única; migradas las 9 inline; `.plan3 .amt small` y `.final-cta .header-cta-primary` dorado (#c8a96a) dentro. Home EN también unificado (ya no duplica `visa.css` inline).
- **Anti-fuga global**: badges hero → `#reviews` (o `<span>` donde ya venían sin link); botones Google → `<span>`; fuera link `colombianomadvisa.com`; nav ES "Consulta legal", EN "Legal Consultation"; logo del footer sin enlace en las 5 propiedades (el del navbar sí enlaza).
- **WhatsApp flotante nativo** en todas las propiedades (verde #22C55E, tooltip, mensaje pre-rellenado, aparece a 4s/scroll). Pixel de Chaty eliminado de los 4 repos donde estaba.
- **Copy consulta** con el texto probado ($80 abonable/descontable) + CTA sin repetir el precio (recuerda el descuento de los $80).
- **Testimonios web**: texto íntegro, EN = traducción propia marcada pendiente de aprobación, tag coherente; fotos donde las había.
- **Modelo precio único (oct 2026), en las 5 propiedades**: fuera Esencial e Integral de la web; precio oficial único ex-Protegido ($540 / $650 / $760 según visa; $300 beneficiario unificado); garantía de reaplicación por inadmisión sin honorarios hasta la aprobación ($56 de re-estudio al Estado; no cubre rechazo definitivo); tablas a 2 columnas; "Otros costos" neutrales por visa (matrimonio solo spouse/partner; seguro/apostillas estatales solo donde aplica). `extras.js`/`extras-en.js` huérfanos en abogados (se conservan por decisión).
- Secciones "ensayo y error" + Steven Russo en las 30 landings de abogados; tarjeta única también en homes (`/` y `/en/`, con tabla de 16 filas) usando el componente `.xtable`.
- `citizenship-and-residency-by-marriage` (marriage): añadidas secciones Camila + precio único + tarifas espejo del root.
- READMEs con objetivos/modelo/reglas en los 5 repos. CNAMEs normalizados (apex en retirement, pelado en nómada).

## Pendiente

1. Verificar en vivo tras cada push (caché agresiva: hard refresh; en dominios con proxy dar margen al CDN).
2. Fotos testimoniales pendientes: Kisharna, Joe, Jacob, Neil (+ Lawrence si se rescata).
3. Cancelar la cuenta de Chaty ($15/mes) cuando se confirme el flotante nativo unos días en producción.
4. `sitemap.xml` (abogados): dado de alta en Search Console el 22/10 (dio error transitorio, luego leyó bien). Vigilar indexación + Security Issues.
5. Tiers del home (abogados) listan visas sin landing: "Estudiante", "Médico" e "Independiente". Crear landings o re-marcar el tier.
6. Confirmar cifra de matrimonio en notaría ($250.000 COP publicado vs ≈$300.000 en nota de `extras.js`).
7. Vigilar rebote de leads 48-72h tras quitar los 3 planes (ver "Caída de leads" abajo).
8. Portales Wix (.com EN y .com.co ES): se actualizan en otra conversación (precios, garantía, planes fuera).

## Caída de leads oct-2026 (diagnóstico vigente)

- De 11-18 a 3-4/día, gradual desde ~8/oct. **Coincide con el deploy del modelo de 3 planes (commit 8/oct) + campaña nueva de YouTube.** No es boicot por repos públicos (sin mecanismo posible) ni son nuestros cambios de hoy (posteriores).
- Hipótesis ordenadas: (1) los 3 planes frenaban conversión (ya eliminados — observar rebote); (2) tráfico barato de YT (clics ×2, intención ~0): discriminar por calendarios por canal y placements (Shorts); (3) número de WhatsApp restringido (probar mensaje desde número desconocido); (4) formularios/email rotos (lead de prueba en cada web); (5) artefacto de medición.
- Descartado hackeo con redirección por países: código auditado en los 6 repos (solo terceros conocidos, cero ofuscación) + hosting estático + contenido verificado en vivo.

## Decisiones vigentes

- Precios solo cambian si cambia la landing. Verde WhatsApp #22C55E. Nav sin precio ("Precio"/"Price"; ancla `#planes` intacta).
- Precio oficial único por visa en web (ex-Protegido); Esencial (descuento) e Integral ($2.900) solo en consulta, sin mención web.
- Beneficiario a $300 fijo unificado (los ex-Protegidos locales eran $200).
- No inventar cifras: fuentes válidas son `data-*`/tarjetas Protegido originales, `extras.js`, `colombianpassport.com/our-services/*` y lo pedido por el dueño.
- Lawzana es plataforma de testimonios propia, no competidor ("Top 3 en Lawzana" se mantiene como texto).
- No tocar `visa-mercosur` etc. fuera de lo listado sin revisar.

## Credenciales (dónde, NUNCA el valor)

- GitHub `parquesino/*` (push directo a main). Auth: cuenta `alejomorenoai` con acceso concedido (pedirlo si un repo da 403; si el remoto trae commits, `pull --rebase` antes del push).
- Wix (.com + .com.co): ver skill `wix-publish` en repo SOFI. **API key en `Temp/opencode/wix_key.txt` — VOLÁTIL, pasar a gestor de contraseñas. El archivo NO está commiteado (verificado).**
- Repos públicos: exponen código + historial (precios viejos, estrategia). Los `.env` con keys viven en el repo SOFI **privado** — que siga privado; si se abre, rotar `GEMINI_API_KEY`. Privatizar un repo apaga su Pages en cuenta Free.

## Guías de visas: red de enlaces cruzados (hecho EN+ES 2026-10-31)

**HECHO (verificado en vivo 2026-10-28):** guía EN `colombianpassport.com/colombian-visas/spouse-of-a-colombian-visa-guide` (News1 EN, item `6e70b459-9298-4f66-a44c-9c1a0ce8ad0b`) — sección "Free Tools" ampliada de 11 a 22 enlaces (11 nuevos con `LINK`+`UNDERLINE`, mismo formato de nodo que los existentes). Método: leer item con `consistentRead`, clonar `articleText` en memoria, añadir `LIST_ITEM`s al `BULLETED_LIST` anidado, PATCH solo de `articleText`, re-leer y contar (22 items, 22 links). Rollback: quitar los últimos 11 (son los añadidos, al final de la lista).

**HECHO (verificado 2026-10-31):** guía espejo ES `/visas-para-colombia/guia-visa-conyuge` (News1 ES, MISMO `dataItemId` `6e70b459...`) — sección "Enlaces relevantes para más información" ampliada de 15 a 24 items (9 nuevos con `LINK`, mismo formato que los existentes ES): (a) `visa-conyuge-exterior-lo-que-nadie-te-dice`, (b) `guia-visa-companero-permanente-colombia`, (c) Monitoreo #5, (d) `requisitos-basicos-cualquier-visa-colombiana`, (e) `certificados-migratorios-tiempos-reales`, (f) `tarifas-visas-colombia-precios-cancilleria`, (g) `salvoconducto-migracion-colombia-visa-pendiente`, (h) Monitoreo #3, (i) `el-poder-discrecional-de-cancilleria-fbi-check-consulado-orlando-firma-escrita`. Sin duplicados (verificado por URL). Estructura: `nodes[26].nodes[4].nodes[1]`. Backups en `Temp/opencode/guia_es_backup_2026-10-31.json` y `guia_en_backup_2026-10-31.json`.
**Fechas actualizadas en AMBAS guías al 31-oct-2026** (EN: "Last updated on October 31, 2026"; ES: "Actualizado por última vez el 31 de octubre de 2026", nodo 0). Regla añadida a la skill `wix-publish` (repo SOFI): todo toque a post/guía actualiza fecha visible + se verifica en re-lectura.

**PENDIENTE al retomar:**
1. Verificar en vivo con hard refresh (caché agresiva de Wix; el CDN tarda minutos).

## Hub ciudadanía EN (hecho 2026-10-31, verificado por re-lectura)

**HECHO:** post estrella `colombian-citizenship-by-descent-parents-guide` (Newsroom EN, `697e02b9...`, 238 clics) de 1→9 urls: sección nueva "Keep Exploring: Citizenship Guides and Tools" antes del CTA final (HEADING-3 + spacer + BULLETED_LIST ×8, formato LINK+UNDERLINE): birth-guide, hub-índice complete-guide, deported-children, if-i-marry, parents-by-birth, parents-by-adoption, former-nationals, consultation. **Widget consulta clonado 2026-10-31 (opción B):** nodo HTML `booking-widget-camila-en` ($80, Google Calendar) del post de consulta insertado antes del CTA final con espaciadores; WhatsApp queda secundario. Backup pre-widget en `Temp/opencode/hub_descent_pre_widget.json`. **CTA final reescrito 2026-10-31 (indecisos):** "Not ready to book yet?" + dudas concretas (renuncia/papeles/caso complicado, sin compromiso) + "Chat with us on WhatsApp" con pre-rellenado acorde (not sure I qualify). Lógica: widget cierra al convencido, CTA pesca al indeciso. Medir 2–3 semanas (clics widget vs wa.me + reservas); si funciona, replicar al resto del hub.

**Widget + CTA indecisos replicados 2026-10-31 (verificado):** EN-marry (widget EN + CTA "Not ready to book yet?" con wa.me Spouse Guide), EN-birth (widget EN al final, sin CTA wa.me previo), ES-padres y ES-simecaso (widget ES `booking-widget-camila` $80/100% abonable + CTA "¿Todavía no estás listo para reservar?" con wa.me ES por guía), ES-deport y ES-guía (widget ES al final). Backups pre-widget en `Temp/opencode/hub_{marry,birth,padres,simecaso,deport,guia}_pre_widget.json`. `if-i-marry` (`027329a1...`) de 8→12 (sección "Continue Your Path..." ×4: descent, birth-guide, hub-índice, deported-children). Guía `citizenship-by-birth` (News1 EN, `4101167e...`) de 3→6 (trailing "Free Tools..." ×3: descent, if-i-marry, hub-índice). Fechas EN al 31-oct en las 3. Backups en `Temp/opencode/hub_{descent,marry,birth_en}_backup_2026-10-31.json`. Nota: posts Newsroom usan `textoDeLaNoticia` (no `articleText`); verificar campo antes de PATCH.

## Hub ciudadanía ES (hecho 2026-10-31, verificado por re-lectura)

**HECHO:** post padres (`nacionalidad-por-padres-hijos-usa`, SaladePrensa ES, `59d7d827...`) de 1→8 urls (sección "Sigue explorando..." ×7, formato LINK ES). `si-me-caso` (`116e1497...`) de 9→12 (×3: padres, ciudadania-guía, deportados). `deportados` (`9af71129...`) de 1→3 (×2: padres, si-me-caso). Guía `ciudadania-colombia` (News1 ES, `4101167e...`) de 4→6 (solo 2 nuevos: padres ya estaba, sin duplicar; heading PARAGRAPH-bold estilo guías ES). Sin líneas de fecha en piezas ES: no se inventan. Backups en `Temp/opencode/hub_{padres,simecaso,deport,guia}_es_backup_2026-10-31.json`.

## Guía pensionado: red de enlaces (hecho 2026-10-31)

**HECHO (verificado por re-lectura):** guía ES `/visas-para-colombia/guia-visa-de-pensionado` (News1 ES, item `994f1848-ac94-49ba-b25d-9f7e8a3ef74c`) — sección "Enlace Relevante..." renombrada a "Enlaces Relevantes para Más Información", ampliada de 14 a 23 items (9 nuevos con `LINK`, formato existente ES): salario-mínimo-2026, requisitos-básicos, certificados-migratorios, tarifas-cancillería, salvoconducto, tarifas-migración-2026, Monitoreo #3, Monitoreo #5, nuevo-horario-cédula. Excluidos a petición: cada-vez-más-extranjeros y se-reduce-salario-mínimo. Sin duplicados. Backups en `Temp/opencode/guia_pensionado_{es,en}_backup_2026-10-31.json`.
**Fechas:** ES y EN al 31-oct-2026. EN ampliada hoy de 9 a 21 items (12 nuevos verificados por re-lectura: urls=23, viejas 1 vez cada una; fecha EN al 31-oct con contenido cambiado). Nota: el primer PATCH clonó mal el molde (LIST_ITEM con lista anidada, 119 urls); reparado truncando a 1 nodo y reinsertando items simples. Vetos aplicados: appointment-at-migracion, will-the-minimum-wage (O1), requirements-2025 (legado).

## SEO snippets EN (2026-10-31)

**Plantilla Our Services (usuario en dashboard):** meta con propuesta ($80, fees). **Titles por API (verificado):** `title` de LandingComercial solo alimenta `<title>`/og/twitter + meta (4 ocurrencias, cero en cuerpo visible) → renombrados sin riesgo visual: pensioner `Pensioner Visa Colombia 2026`, spouse `Spouse Visa Colombia 2026 (Type M)` (cortos a propósito: la plantilla añade "Fees, requirements & full legal service..."). Backups en `Temp/opencode/svc_title_*.json`. Deck completo de snippets (home, about, posts sin meta) entregado para pegar en dashboard.

**Titles restantes 2026-10-31 (13/13 OK por re-lectura):** citizenship-by-descent (=query top 302 impr), beneficiary, accumulated-time, former-nationals, parents, common-law-partner, admin/judicial, partner/owner, service-provider, rentista (=query pos 4,5), work (=query 189 impr), investment (=query 351 impr), nomad. Patrón `{keyword} {2026} ({tipo})`. 15/15 servicios con title SEO listo; `<title>` en vivo actualiza con CDN.

## LCP móvil 2,6s (PageSpeed 2026-10-31, key en Temp/ps_key.txt)

FIELD origen p75 = 2636ms AVERAGE (= SC; agregado a nivel origen, mismo en las 4 plantillas), CLS FAST. LAB mobile: home LCP 9,9s score 0,67 (el peor) vs post/guía/servicio 1,7s score 0,83-0,85. Home: `unused-javascript` 425 KiB. TBT 320-460ms todas. Causa: home + JS de plantilla (confirmado 2026-10-31: GTM-MWQWDHLZ dispara tags de OTRO sitio — "visanomadadigitalcolombia.com - Flujo" y "Web Visanomadadigital.com" con GA4s ajenos + AW-16868407032 duplicado con la Etiqueta de Google nativa; explica los 425 KiB unused-JS. **Tags dentro (lista 2026-10-31):** Consent Mode v2 (ok, 2 años), "Etiqueta de Google G-FGEGJHCDLK" = GA4 de visanomadadigital → PAUSAR (no borrar), "Google Tag - Principal (GA4 + Ads)" = abrir y anotar IDs (posible keeper del .com), "Todos los formularios" + "User-provided Data" + "Conversion Linker" = ligados a Ads (solo tocar si no hay campañas activas). NO desconectar GTM entero: verificar Real-time GA4 del .com tras cada cambio. Faltan ~150ms para <2,5s. Embeds nuestros (YouTube 28-oct, widgets reserva hoy) NO rompen posts (1,7s lab). Palancas en dashboard (no API): quitar contenedor sobrante, auditar apps, hero de home. `_gl`/`_ga` en URLs = cross-domain linker GA, sin relación con LCP.

**LCP elemento exacto (lab mobile home):** `medellin.jpeg`, fondo hero a pantalla completa (320×852, `wow-image`, ya con fetchpriority=high pero inyectada por JS → "not discoverable in initial document"). Breakdown: TTFB 25ms + **load delay 490ms** + load 29ms + render 79ms. Receta entregada: `<link rel=preload as=image>` con imagesrcset w_640/w_1024 en head de la home (verificar en DevTools que no descarga doble; ajustar a la URL real del Network tab) + quitar contenedor GTM sobrante. **Preload final aplicado 2026-10-31 (usuario, solo home, URLs reales w_980+w_1350): lab LCP 9,9s → 6,3s** (−3,6s). Resta unused-JS 425 KiB → siguiente: dieta JS (GTM/apps). Field seguirá ~2,6s días (CrUX 28d).

**Por qué ES no sufre (comparativa 2026-10-31):** no son gemelos, divergieron. EN: HTML 930KB vs ES 799KB; unused-JS 425 vs 195 KiB; TBT 320 vs 0ms; GTM doble (MWQWDHLZ+AW) vs uno (P9BWCC8Q); apps instaladas 4 vs 1 (EN trae tienda entre ellas). Mismo asset hero en ambos. Lab ES también flojo (7,4s) pero su field pasa (86 rápidas): importan las condiciones reales + la dieta JS. Receta: adelgazar EN (AW si no hay Ads, auditar apps/tienda), no tocar ES.

## SEO Search Console EN (2026-10-31, 301s importados)

**CSV listo:** `Temp/opencode/wix_301_redirects.csv` (24 filas: 3 duplicados vivos con case distinto → 200 hoy; 20 variantes typo en 404 con impresiones; 1 consolidación 2025→2026). Importar en dashboard Wix: Marketing & SEO → SEO → URL Redirect Manager → Import. Verificado: variantes typo dan 404 (salvo trailing-slash if-i-marry, que Wix ya redirige solo); los 3 con mayúsculas (`-US-`, `-Should-`, `-Do-`) dan 200 = contenido duplicado real. Enlaces internos auditados (News1+Newsroom EN/ES): todos usan slugs correctos, nada que corregir en contenido.

**Verificación post-import (2026-10-31, import hecho por el usuario + sus viejas):** los 404 typo aún NO redirigen (newsrom, how-long-does-take, migracion-colomb-fees → 404 sin location): probable propagación, re-verificar en horas. Las 3 de mayúsculas NO dispararán nunca (Wix resuelve la página case-insensitive antes que los redirects): inofensivas, se pueden borrar. Fila `?-forget` inútil (el `?` inicia query, el manager no matchea queries): borrar; el redirect bare → %-encoded SÍ funciona (301→200 verificado). `copia-de-retirement-visa-colombia` apunta a `/expert-help-digital-nomad-visa-colombia` que da 404: cambiar destino a página viva. retirement-2025 → 2026 no dispara mientras el post 2025 exista (200 directo): para consolidar hay que despublicar el 2025. Opcional: aplanar cadena shifting-sands → inside-trends-1 → monitoring-1.

**2025 borrado 2026-10-31 (usuario en dashboard):** `colombia-retirement-visa-requirements-in-2025` (id `d98d2b3d...`) eliminado; backup íntegro en `Temp/opencode/backup_retirement_2025.json` (restaurable por API). Verificación inmediata: aún 200 (propagación pendiente); re-verificar que dispare 301 → guía 2026.

**Newsroom: warnings "no coincide con Contenido enriquecido" (2026-10-31, cosmético).** 5 posts (spouse-abroad, basic-requirements, migratory-certificates, venezuelan-special, resident-transfer) muestran ⚠️ en `textoDeLaNoticia` por haber sido escritos vía API (otra sesión, 28-oct). Verificado por API: contenido íntegro y válido; verificado en vivo por el usuario: renderizan bien. NO borrar ni convertir. Solo reaccionar si alguno se ve roto (con backup previo por API).

## Search Console API (hecho 2026-10-31)

**Acceso API funcionando:** OAuth escritorio en proyecto sandbox (`gsc_oauth_client.json` + `gsc_token.json` en Temp; cuenta alejo@alejomoreno.ai). OJO: la API debe habilitarse en el proyecto donde vive el cliente (sandbox); habilitarla en otro proyecto da 403/lista vacía. Scripts: `gsc_test.js`, `gsc_query.js [site] [días]`, `gsc_direct.js`. Dato fresco: `immigration lawyer` ↑ 844% impresiones. **OAuth ampliado (pendiente):** scopes GTM edit+publish y Analytics edit+read (`gsc_auth_full.js` listo) para operar GTM/Analytics por API sin dashboard. Requiere habilitar en sandbox: Tag Manager API, Analytics Admin API, Analytics Data API. Autorizar con la cuenta que administre GTM/Analytics (puede ser distinta de la del proyecto Cloud).

## Planes en curso (2026-10-31)

**Plan A — Actualización de guías (red post↔guías + conversión).** Método: auditar enlaces por API → proponer tabla → PATCH + re-lectura + backups en Temp + fechas solo-idioma-tocado. Hecho: spouse EN+ES, pensionado EN+ES, ciudadanía EN (descent×8, marry×4, birth×3) + ES (padres×7, simecaso×3, deportados×2, guía×2), widget consulta EN/ES + CTAs indecisos en 7 piezas, 15 titles Our Services 2026. Pendiente: medir 2–3 sem (widget vs wa.me, subida posiciones 4–6 sem), snippets dashboard (deck entregado), minimum-wage push, SITAC/cédula-2026, SC del ES.

**Plan B — Optimización de carga (.com LCP 2,6s).** Hecho: diagnóstico (FIELD 2636ms = SC; lab home 9,9s→6,3s con preload medellin w_980/w_1350 solo-home; posts sanos 1,7s), comparativa ES (86 rápidas; divergencia: JS 425vs195 KiB, TBT 320vs0, GTM doble vs uno, apps 4vs1), hallazgo tags cruzados con nómada (DLK pausado; Principal = G-XSQBLHT7FR nómada → reapuntar al stream del .com; AW duplicado nativa+GTM). Pendiente (usuario en dashboard): Guardar copia-de-retirement, borrar filas inútiles 301, reapuntar Principal, decidir Ads/tags, Validar corrección en SC cuando el lab baje más. NO tocar el .com.co.

## Plan Integral (excepción 2026-11-02, dictada por el dueño)

`plan-integral/` publicado en este repo (ES, sin versión EN): Plan Integral $2.900 tarifa plana todas las visas, 50/50, alcance íntegro del brief. **Excepción a la regla "Integral solo en consulta, ni mención en web"** (README modelo de precio): el dueño la levanta para esta landing. Sitemap +1 (34 URLs). Pendiente: tarjeta en home (sin hacer: requiere decisión), push a main = deploy, verificar en vivo con hard refresh.
