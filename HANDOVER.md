# HANDOVER — web track (abogadosdemigracion.com)

> Última actualización: 2026-10-26. Rama: `main` (push = deploy GitHub Pages).
> Si retomas aquí: lee este archivo + `README.md` primero, verifica 2-3 URLs en vivo y sigue por "Pendiente".

## Hecho (con commit)

- `como-trabajamos` rota en `visa-residente` → trasplante de `.how-*` desde `visa.css` + quitar nav duplicado `/#como-trabaj/d`.
- Auditoría 32 páginas: solo 9 usaban plantilla inline vieja (residente + 8). Resto usa `visa.css` compartido (verificado en vivo).
- **Unificación CSS**: `visa.css` fuente única; migradas las 9 inline; `.plan3 .amt small` y `.final-cta .header-cta-primary` dorado (#c8a96a) dentro.
- **Anti-fuga**: badge hero → `#opiniones`/`#reviews` (en roots sin sección, a `<span>`); fuera botones Google/Lawzana → CTA WhatsApp verde; fuera link `colombianomadvisa.com`; nav ES "Consulta legal", EN "Legal Consultation" (meta/bridge intactos).
- **WhatsApp flotante nativo** en las 32 (verde #22C55E, tooltip ES/EN, mensaje pre-rellenado por página, aparece a 4s o con scroll). Sustituye a Chaty cuando se verifique.
- **Copy consulta** ES/EN con el texto probado (diagnóstico + plantillas + $80 abonable) en root + 30 landings (intro por visa).
- **Cards home**: anteojera SERVICIOS/LEGAL SERVICES + título corto.
- **Testimonios web**: Socio (Viktoria+Joe con foto/iniciales), Trabajador (Gary con foto), Mercosur (John), Inversionista (Neil), Padres (Kisharna), Procesos (Jacob). EN espejo.

## Pendiente (web)

1. Verificar en vivo tras cada push (caché de `visa.css`: usar `?v=` o hard refresh).
2. EN tiene `<style>` inline **además** de `visa.css` (deuda gemela de la ya pagada en ES) — unificar igual cuando se quiera.
3. Fotos testimoniales pendientes: Kisharna, Joe, Jacob, Neil (+ Lawrence si se rescata). Las 2 existentes están en raíz (`viktoria-dolzhenko.png`, `gary-thomas.png`).
4. Decidir Chaty: mantenerlo hasta verificar el flotante nativo en producción unos días, luego cancelar $15/mes.
5. `sitemap.xml`: dado de alta en Search Console el 22/10 (dio error transitorio, luego leyó bien). Vigilar indexación.

## Decisiones vigentes

- Precios solo cambian si cambia la landing. Verde WhatsApp #22C55E. Nav sin precio.
- Testimonios web: texto íntegro, EN = traducción propia marcada pendiente de aprobación, tag coherente.
- No tocar `visa-mercosur` etc. fuera de lo listado sin revisar (plantillas frágiles pre-unificación ya resueltas).

## Credenciales (dónde, NUNCA el valor)

- GitHub `parquesino/abogadosdemigracion` (push directo a main). Auth: cuenta `alejomorenoai` con acceso concedido.
- Wix (.com + .com.co): ver skill `wix-publish` en repo SOFI. **API key en `Temp/opencode/wix_key.txt` — VOLÁTIL, pasar a gestor de contraseñas.**
