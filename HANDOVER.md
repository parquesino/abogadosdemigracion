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
