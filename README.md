# abogadosdemigracion.com — sitio estático ES/EN

Sitio estático (HTML + `visa.css` + `img/`). Sin build. Deploy = push a `main` → GitHub Pages (dominio vía `CNAME`).

## Estructura

- `index.html` — home ES. `en/index.html` — home EN (con bloque `<style>` propio + link a `visa.css`; el resto de EN solo enlaza `visa.css`).
- `visa-*/index.html` — 15 landings ES. `en/*/index.html` — 15 landings EN.
- `visa.css` — **única fuente de verdad de estilos compartidos** (unificado oct-2026).
- `sitemap.xml` — 32 URLs, declarado en `robots.txt`. Dar de alta en Search Console tal cual.
- `img/` — pasos (`paso*.jpg`, `step*.jpg`), fotos de testimonios (`nombre-apellido.png`).

## Reglas vigentes (oct-2026)

1. **Nada de `<style>` duplicado**: todo lo compartido vive en `visa.css`. Solo se permite un mini-bloque `<!-- PAGE-SPECIFIC -->` con reglas únicas de esa página.
2. **Cero fugas a competidores**: nada de `share.google`, `lawzana.com` ni dominios externos clicables. Testimonios enlazan a `#opiniones` / `#reviews` de la misma página; el CTA es WhatsApp.
3. **WhatsApp verde `#22C55E`** en hero (`header-cta-secondary`), CTA de testimonios y botón flotante `waFloat` (aparece a los 4s o con scroll, con mensaje pre-rellenado por página).
4. **Botón nav sin precio**: ES "Consulta legal", EN "Legal Consultation".
5. **Cards del home**: anteojera `SERVICIOS LEGALES` / `LEGAL SERVICES` + título corto (los bots leen "servicios", el ojo escanea la visa).
6. **Los precios solo cambian si la tabla de la landing cambia** (Esencial por visa).
7. Testimonios: texto íntegro sin recortar; tag de idioma coherente (`(traducido al español)` / `(translated from Spanish)`); si no hay foto, iniciales con el patrón `onerror` existente.
8. Commit + push = deploy. Verificar en vivo con hard refresh (hay caché agresiva de `visa.css`).

## Dónde vive cada cosa

- Contenido editable directo en cada `index.html` (hero, cifras, requisitos, FAQs, planes, testimonios).
- Testimonios SOFI (propuestas) viven en Firestore `system_visas.*.testimonials`, NO aquí. No duplicar lógica: web = prueba social pública, SOFI = prueba de la ficha.
- Publicación en Wix (.com EN y .com.co ES): ver skill `wix-publish` en el repo SOFI (`../Visa-de-Pensionado---Checklist-de-Documentos/.agents/skills/wix-publish/`).
