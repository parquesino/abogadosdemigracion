# abogadosdemigracion.com — sitio estático ES/EN

Sitio estático (HTML + `visa.css` + `img/`). Sin build. Deploy = push a `main` → GitHub Pages (dominio vía `CNAME`). Repo: `parquesino/abogadosdemigracion`.

## Objetivos (iguales en todas las landings)

1. Generar leads por WhatsApp.
2. Vender consultas estratégicas de $80 (100% abonables al contratar).
3. Transmitir: (a) contratar un abogado es una decisión inteligente; (b) Camila Ocampo / Colombian Passport es la firma correcta para contratar.

## Estructura

- `index.html` — home ES. `en/index.html` — home EN (ambos solo con bloque `<!-- PAGE-SPECIFIC -->` + link a `visa.css`).
- `visa-*/index.html` — 15 landings ES. `en/*/index.html` — 15 landings EN.
- `visa.css` — **única fuente de verdad de estilos compartidos** (unificado oct-2026).
- `extras.js` / `extras-en.js` — **HUÉRFANOS desde oct-2026**: ninguna landing los carga ya (tablas propias por página). Candidatos a eliminar.
- `sitemap.xml` — 32 URLs, declarado en `robots.txt`. Dar de alta en Search Console tal cual.
- `img/` — pasos (`paso*.jpg`, `step*.jpg`), fotos de testimonios (`nombre-apellido.png`).

## Modelo de precio vigente (oct-2026)

- Precio oficial único por visa en la web (el ex-Protegido): $540 (nómada, pensionado, mercosur, procesos), $650 (resto M/R), $760 (inversionista, socio), $300 beneficiario. Sin nombres de plan (ES: Esencial/Protegido/Integral; EN: Essential/Protected/Turnkey).
- Esencial (descuento por caso robusto con tiempo) e Integral ($2.900) solo existen en consulta; ni mención en web.
- Garantía: reaplicaciones por inadmisión sin honorarios hasta la aprobación. Cada nuevo estudio oficial ($56) lo paga el cliente al Estado. No cubre el rechazo definitivo.
- Tablas a 2 columnas; "Otros costos" neutrales y propios de cada visa (matrimonio solo en cónyuge/compañero).
- Pendiente confirmar: matrimonio en notaría $250.000 COP publicado vs ≈$300.000 en nota de `extras.js`.

## Reglas vigentes (oct-2026)

1. **Nada de `<style>` duplicado**: todo lo compartido vive en `visa.css`. Solo se permite un mini-bloque `<!-- PAGE-SPECIFIC -->` con reglas únicas de esa página.
2. **Cero fugas a competidores**: nada de `share.google`, `lawzana.com` ni dominios externos clicables. Testimonios enlazan a `#opiniones` / `#reviews` de la misma página; el CTA es WhatsApp. ("Top 3 en Lawzana" como texto se mantiene: Lawzana es plataforma de testimonios propia, no competidor.)
3. **WhatsApp verde `#22C55E`** en hero (`header-cta-secondary`), CTA de testimonios y botón flotante `waFloat` (aparece a los 4s o con scroll, con mensaje pre-rellenado por página). Chaty eliminado.
4. **Botón nav sin precio**: ES "Consulta legal", EN "Legal Consultation". Nav de precio: ES "Precio", EN "Price" (ancla `#planes` intacta).
5. **Cards del home**: anteojera `SERVICIOS LEGALES` / `LEGAL SERVICES` + título corto + precio único (los bots leen "servicios", el ojo escanea la visa).
6. **Los precios solo cambian si cambia la tabla de la landing.**
7. Testimonios: texto íntegro sin recortar; tag de idioma coherente (`(traducido al español)` / `(translated from Spanish)`); si no hay foto, iniciales con el patrón `onerror` existente.
8. Commit + push = deploy. Verificar en vivo con hard refresh (hay caché agresiva de `visa.css`).
9. **No inventar cifras**: fuentes válidas son los `data-*` y tarjetas Protegido originales, `extras.js`, `colombianpassport.com/our-services` y lo que pida el dueño.

## Dónde vive cada cosa

- Contenido editable directo en cada `index.html` (hero, cifras/resumen, requisitos, FAQs, precio, testimonios).
- Testimonios SOFI (propuestas) viven en Firestore `system_visas.*.testimonials`, NO aquí. No duplicar lógica: web = prueba social pública, SOFI = prueba de la ficha.
- Publicación en Wix (.com EN y .com.co ES): ver skill `wix-publish` en el repo SOFI (`../Visa-de-Pensionado---Checklist-de-Documentos/.agents/skills/wix-publish/`).
