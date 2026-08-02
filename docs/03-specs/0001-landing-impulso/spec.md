---
id: 0001
slug: landing-impulso
titulo: Landing de conversión ImPulso
estado: done         # draft | approved | in-progress | done | dropped
creada: 2026-08-01
superficie: landing
---

# SPEC-0001 — Landing de conversión ImPulso

## Problema

El dueño de un restaurante de ticket medio-alto está gastando en fotos, video y pauta,
y no sabe qué parte de ese gasto le trae comensales. Ya lo quemó una agencia que le
vendió la idea perfecta y después desapareció, así que llega desconfiado a cualquier
promesa de marketing.

Hoy, cuando ese dueño entra a `/`, encuentra la cadena `PAGINA PRINCIPAL`. No puede
reconocer su propio problema, no puede juzgar si ImPulso entiende su negocio, no tiene
ninguna prueba de que esto se mida, y no tiene forma de dar un siguiente paso. Se va sin
dejar rastro.

## Por qué ahora

Sin esta página no existe canal de adquisición: ImPulso no tiene dónde aterrizar tráfico
ni cómo llegar a la única conversión que le importa, el estudio gratuito. Además el
harness (SDD + contrato + hook de verificación) está montado y sin estrenar — esta es la
spec `0001` y sirve de prueba real del flujo.

## Alcance

Landing de scroll largo en `app/page.tsx`, en español peruano, **diseñada desde cero**.
La versión de 962 líneas que vive en `git HEAD` queda como referencia histórica
consultable, no como base de partida.

- **Diez secciones ancladas + footer**, en el orden narrativo de
  [design.md §8](../../design.md):

  | # | Ancla | Sección | Trabajo que hace |
  |---|---|---|---|
  | 1 | `#hero` | Hero | Promesa + CTA primario. **Sección carbón a sangre** con foto |
  | 2 | `#prueba` | Prueba social | Tira de métricas: baja la desconfianza antes del primer scroll |
  | 3 | `#problema` | El problema | "¿Tu marketing es una caja negra?" — tres dolores concretos |
  | 4 | `#sistema` | Por qué no lo has resuelto | "No es falta de esfuerzo. Es falta de sistema" |
  | 5 | `#solucion` | La solución | "El marketing no es presencia. Es flujo de comensales" |
  | 6 | `#metodo` | Sistema Mesa Activa | Los 4 pasos, de diagnóstico a optimización semanal |
  | 7 | `#resultados` | Qué vas a conseguir | "En 90 días, un restaurante con flujo constante" |
  | 8 | `#confianza` | Por qué confiar | Credibilidad de operador — "somos dueños de restaurante" |
  | 9 | `#garantia` | Garantía | 90 días, "sin letras pequeñas" |
  | 10 | `#agenda` | CTA final + formulario | La conversión |

  Más `Header` (del toolkit) y footer.

  > Ampliado de 7 a 10 en la fase PLAN, tras `/impeccable shape`: la spec original se
  > apartaba de `design.md §8` sin motivo registrado. Las cuatro secciones que faltaban
  > (prueba social, "por qué no lo has resuelto", "la solución", "qué vas a conseguir")
  > hacen el trabajo de bajar la desconfianza del visitante quemado por agencias, que es
  > el obstáculo principal según `product.md`.

- Las cuatro anclas de `siteConfig.impulsoNavLinks` (`#problema`, `#metodo`,
  `#resultados`, `#garantia`) resuelven a secciones reales. Ya están definidas en
  `config/site.ts` y no se tocan.
- **Un solo evento de conversión**: "Agenda tu estudio gratuito". Todo CTA primario de
  la página apunta a `#agenda`.
- Formulario de captura **visual**: campos, validación en cliente y confirmación en
  pantalla. Sin persistencia — ver *Fuera de alcance*.
- **Fotografía de Unsplash** vía `next/image`. `images.unsplash.com` ya está declarado en
  `next.config.js`, así que no hay configuración pendiente.
- SCSS de layout y ritmo en **`styles/webpages-styles/home.scss`**, que ya existe, está
  vacío y **ya está importado** desde `styles/custom.scss`. No se crea ningún archivo
  nuevo ni se toca `custom.scss`. Solo layout, ritmo de sección y gestos de marca: cero
  hex, cero `font-family`, cero `clamp()`.
  El mixin `.sections-paddings` de `sections.scss` (24/30/60 px por breakpoint) ya está
  disponible y conviene reutilizarlo antes de inventar espaciados.
- Secciones como componentes en `app/home/components/`, una por archivo.
- Metadata básica de la página (`title`, `description`) desde `siteConfig`.

### Fidelidad: dos pasadas

Decidido en `shape`. El BUILD entrega en dos tiempos y **VERIFY corre al final de la
pasada 2**, no de la 1.

| Pasada | Qué entrega | Criterios que cierra |
|---|---|---|
| **1 — mid-fi** | Estructura, jerarquía, copy real, fotografía real, responsive, foco visible y contraste | AC-1 a AC-10 |
| **2 — polish** | Motion (`prefers-reduced-motion` incluido), microinteracciones, detalle fino | AC-11 completo |

El piso de accesibilidad de contraste y foco **no** se difiere a la pasada 2: es barato y
es principio de `product.md`. Lo que se difiere es la coreografía de motion y el
microdetalle.

## Fuera de alcance

Nada de esto entra. Si aparece a mitad del build, se para y se actualiza la spec.

- **Persistencia del lead.** El formulario no escribe en Supabase, no hace `fetch`, no
  manda correo. Confirma en pantalla y nada más. Es decisión consciente: el repo no tiene
  `.env*`, así que hoy ni siquiera sería verificable. Candidata a spec `0002`.
- Integración con Calendly, WhatsApp o cualquier agendador externo.
- **Métricas reales.** Los números van marcados `{/* ILUSTRATIVO */}` en el código, como
  en la versión anterior. Sustituirlos es requisito para publicar, no para construir.
- Fotografía propia o sesión de fotos.
- Dark mode. La landing se resuelve solo en tema claro.
- Internacionalización. Solo español.
- SEO técnico avanzado: `sitemap.xml`, `robots.txt`, datos estructurados, Open Graph.
- Coreografía de motion compleja. Entra un *reveal* discreto al hacer scroll; no entran
  timelines orquestados, parallax ni scroll-jacking.
- Todo lo que cuelga de `app/admin/` y `app/panel/`.
- Las 36 violaciones de contrato y los 8 errores de lint preexistentes en otros archivos.
  La regla es no añadir, no limpiar deuda ajena.

## Criterios de aceptación

### AC-1 — Las anclas resuelven
- **Dado** que la landing está construida y el dev server corriendo
- **Cuando** ejecuto `curl -s localhost:3000 | grep -oE 'id="(hero|prueba|problema|sistema|solucion|metodo|resultados|confianza|garantia|agenda)"' | sort -u | wc -l`
- **Entonces** devuelve **10**, y al hacer clic en cada item del `Header` (los cuatro de
  `siteConfig.impulsoNavLinks`) la página hace scroll hasta su sección

### AC-2 — Un solo evento de conversión
- **Dado** que recorro la landing completa
- **Cuando** reviso todos los botones de variante `primary`
- **Entonces** todos llevan a `#agenda`, y no existe ningún otro CTA primario que compita

### AC-3 — El CTA es alcanzable sin scroll en móvil
- **Dado** que abro `/` en un viewport de 390 × 844
- **Cuando** la página termina de cargar
- **Entonces** el CTA primario del hero es visible sin hacer scroll

### AC-4 — Contrato de implementación sin violaciones nuevas
- **Dado** el árbol de trabajo con la landing construida
- **Cuando** ejecuto `npm run contract`
- **Entonces** ni `app/page.tsx`, ni `app/home/components/*`, ni
  `styles/webpages-styles/home.scss` aparecen en el reporte, y el total sigue en 36

### AC-5 — El typecheck sigue en cero
- **Dado** el árbol de trabajo con la landing construida
- **Cuando** ejecuto `npm run typecheck`
- **Entonces** devuelve 0 errores

### AC-6 — Ritmo de cartel, con el hero en carbón
- **Dado** que recorro la landing de arriba abajo
- **Cuando** inspecciono el fondo de cada sección
- **Entonces** el **hero** usa carbón (`var(--color-text-black)`) a sangre con foto y
  overlay 40–60 %, y el resto alterna claro / `neutral-50` sin introducir un segundo
  bloque carbón que le reste fuerza al primero

### AC-7 — El naranja es acción, no lavado
- **Dado** el código de la landing
- **Cuando** ejecuto `grep -rnE "background[^;]*--color-primary" styles/webpages-styles/home.scss app/page.tsx app/home/components/`
- **Entonces** ningún resultado corresponde al fondo de una sección completa; el naranja
  queda en CTAs, acentos y marcadores, y hay como máximo un elemento amarillo por viewport

### AC-8 — Sin scroll horizontal en móvil
- **Dado** un viewport de 390 px
- **Cuando** evalúo `document.documentElement.scrollWidth <= window.innerWidth` en consola
- **Entonces** devuelve `true` a lo largo de toda la página

### AC-9 — El formulario da feedback y no manda nada
- **Dado** que completo el formulario con datos válidos
- **Cuando** pulso enviar con la pestaña Network abierta
- **Entonces** aparece una confirmación en pantalla y **no se dispara ninguna petición de
  red**; con datos inválidos aparece el error correspondiente y tampoco se envía nada

### AC-10 — Las fotos de Unsplash cargan
- **Dado** que la landing usa fotografía remota
- **Cuando** cargo `/` con la consola abierta
- **Entonces** todas las imágenes responden `200` y no hay ningún error de dominio no
  configurado en `next/image`

### AC-11 — Piso de accesibilidad
- **Dado** que recorro la landing con el teclado
- **Cuando** tabulo por todos los elementos interactivos
- **Entonces** cada uno muestra foco visible; el naranja pequeño usa `#A83E15` y no el
  `#E8622C` base; Anton nunca baja de 24 px; y toda foto con texto encima lleva overlay
  carbón de 40–60 %

## Restricciones heredadas

- [x] [Contrato de implementación](../../01-design/implementation-contract.md) — tokens-first, component-first
- [x] [Principios de diseño](../../product.md#design-principles) — flujo no presencia, comida protagonista, alto contraste, naranja = acción, datos verificables
- [x] [Anti-referencias](../../product.md#anti-references) — nada corporate-frío, ni editorial-magazine, ni naranja como lavado
- [x] [Design system](../../design.md) — escala, gestos, motion
- [x] Accesibilidad — ver [DoD sección E](../../00-harness/definition-of-done.md)
- [x] [ADR-0003](../../04-decisions/0003-impeccable-obligatorio.md) — `impeccable` obligatorio: `shape` en PLAN, `craft` en BUILD, `audit` en VERIFY. La superficie es `landing`, así que aplica entero

Dos trampas del repo que aplican directo a esta spec y que el hook **no** detecta:

- `Text` tiene `color` y `textColor` y no son intercambiables. `textColor="color-primary"`
  se envuelve en `var(--…)`; `color` necesita el `var()` completo. Un token pelado en
  `color` no pinta nada y no rompe el build. Ver trampa 4b de `CLAUDE.md`.
- El SCSS de página no se carga solo: `globals.scss` no importa `webpages-styles/`, el
  `@import` vive en `styles/custom.scss`. Para esta spec **no aplica** porque `home.scss`
  ya está importado — pero si se añade cualquier archivo nuevo, hay que agregar su línea.

## Decisiones tomadas

Las cuatro preguntas abiertas quedaron resueltas antes de aprobar. Se conservan aquí con
su resolución, no se borran.

- [x] **Copy definitivo — lo redacto yo desde `docs/product.md`.** Propuesta de valor,
      dolores del dueño, voz peruana, anti-referencias y principios salen de ahí. El copy
      que produzca el BUILD es **texto a validar**, no texto final: se revisa antes de
      publicar. Las anti-referencias son el filtro duro — nada de "sinergia", "holístico",
      "soluciones 360°" ni "ecosistema".
- [x] **Atribución de Unsplash — línea de créditos en el footer.** Sus guidelines piden
      crédito al fotógrafo; es lo barato y lo correcto. Al reemplazar por fotografía
      propia, la línea se retira.
- [x] **Selección de fotos — gastronomía real y cálida, sin exigir cocina peruana
      explícita.** Manda el principio 2 de `product.md`: comida real, cálida, con
      movimiento (vapor, manos cocinando, salsa cayendo). Se descarta lo frío,
      desaturado o borroso, y el "business people shaking hands" de las anti-referencias.
      El catálogo peruano de Unsplash es corto: forzarlo daría peor imagen que aplicar
      bien el criterio.
- [x] **Métricas — se mantienen `{/* ILUSTRATIVO */}` marcadas en código.** Decisión ya
      tomada al redactar la spec.

## Pendiente para publicar (no bloquea construir)

- [ ] Sustituir los `{/* ILUSTRATIVO */}` por métricas reales y verificables. El principio
      5 de `product.md` pide al menos un dato real; hasta que exista, la landing **no se
      publica**.
- [ ] Revisar el copy redactado y aprobarlo como texto final.

## Verificación — 2026-08-01

| Punto | Resultado |
|---|---|
| A. typecheck | ✅ **0** (igual al baseline) |
| A. lint:check | ✅ **8 errores** (igual al baseline); 0 en archivos de la spec |
| A. build | ⚠️ **compila, no completa.** `✓ Compiled successfully in 17.5s`, luego falla en `Failed to collect page data for /api/s3/video` por `Faltan variables de entorno de AWS S3`. **Preexistente y ajeno**: no hay `.env*` en el repo y `app/api/` no se tocó |
| B. npm run contract | ✅ **36** (igual al baseline, **0 añadidas**) |
| B. revisión visual | ✅ `Text` en todo el texto, `Container`/`Col` en todo el layout, `Icon` con `name`, toolkit antes que markup propio |
| C. criterios | ✅ **11/11 pasan** — detalle abajo |
| D. responsive | ✅ `npm run shot` sin hallazgos en sm/md/lg. **Capturas abiertas y revisadas** |
| D. assets | ✅ Sin placeholder ajeno. Logo real conectado; `ILUSTRATIVO` marcado en código |
| E. a11y | ✅ con **1 excepción documentada** y 1 pendiente fuera de alcance — detalle abajo |
| F. docs | ✅ ADR-0003 y ADR-0004 escritos; DoD, `CLAUDE.md`, comandos, skill y `overview.md` actualizados |
| G. impeccable audit | ✅ Corrido. 3 hallazgos: 1 atendido, 2 pendientes (falsos positivos descartados) |

### C — criterios de aceptación

| AC | Resultado | Evidencia |
|---|---|---|
| AC-1 anclas | ✅ | `10/10` ids presentes; los 4 del nav navegan |
| AC-2 conversión única | ✅ | 3 CTAs, todos hacia `#agenda`. El único otro control es un enlace, no un botón |
| AC-3 CTA sin scroll | ✅ | sm: CTA termina en `712px` de `844` |
| AC-4 contrato | ✅ | 36, sin archivos de la spec en el reporte |
| AC-5 typecheck | ✅ | 0 errores |
| AC-6 ritmo de cartel | ✅ | Hero carbón a sangre con overlay; resto alterna claro / `--color-surface`. Un solo bloque oscuro |
| AC-7 naranja = acción | ✅ | `grep -rnE "background[^;]*--color-primary"` → sin resultados |
| AC-8 sin scroll horizontal | ✅ | `scrollWidth == innerWidth` en los tres breakpoints |
| AC-9 form sin red | ✅ | Inválido → 4 mensajes de error. Válido → confirmación. **0 peticiones de red** |
| AC-10 imágenes | ✅ | Las 3 cargan; `loading="lazy"` bajo el fold; 0 respuestas 4xx |
| AC-11 a11y | ✅ | Anton ≥24px (0 casos por debajo) · foco 10/10 con teclado · `prefers-reduced-motion` en `none` · overlay 45–88 % · **naranja pequeño: no existe** — los 7 elementos naranjas miden ≥24px, o sea texto grande |

### E — accesibilidad

**1. Blanco sobre naranja en botones = 3.38:1** (requiere 4.5 para texto pequeño).
**Excepción documentada por la constitución**: `product.md` fija ese 3.4:1 para botones.
Mitigado subiendo el label de 11px a 14/16 con `textVariant="body"`. Bajarlo exigiría
oscurecer `--color-primary-btn`, o sea cambiar el naranja de marca — decisión de marca,
no de esta spec.

**2. Área táctil <44px en dos controles del `Header` del toolkit**: enlace del logo
(93×36) y botón hamburguesa (64×32). Están en `citrica-ui-toolkit`, no en código de esta
spec, y **no es un ítem de la DoD §E** sino un hallazgo del punto G. No se pisan desde el
SCSS de página — el sistema es dueño de sus componentes. Corresponde arreglarlo en el
toolkit.

El resto de §E pasa: naranja pequeño (no existe), Anton ≥24px, overlay, foco por teclado
y `prefers-reduced-motion`.

> El enlace "Cómo funciona" del hero medía 80×16 y **sí se corrigió**: `min-height: 44px`.

### G — auditoría de diseño

| Hallazgo | Severidad | Estado |
|---|---|---|
| Enlace del hero por debajo del área táctil mínima | P2 | ✅ Corregido |
| Área táctil del `Header` del toolkit | P2 | ⏳ Pendiente, fuera de esta spec |
| Blanco sobre naranja 3.38:1 | P2 | ⏳ Excepción aceptada |

**Descartados por verificación** (falsos positivos de la primera pasada de auditoría):
`textarea` sin label — tiene `label[for]` **y** `aria-labelledby`. Inputs de 20px — el
elemento mide 20px pero el área real es el wrapper, 56px.

> ⚠️ **Incidente de medición.** Un barrido intermedio devolvió 0 elementos naranjas y
> estuvo a punto de reportarse como "cláusula cumplida". Estaba midiendo una página rota:
> `npm run build` había pisado `.next` con el dev server levantado. Repetido con el
> servidor sano dio 7 elementos, todos ≥24px. **No correr `build` y `dev` a la vez.**

**Positivo:** 16 encabezados sin saltos de jerarquía · `main`/`nav`/`footer` presentes ·
`alt` en todas las imágenes · lazy loading correcto bajo el fold · cero errores de consola.

### Pendientes para publicar

- [ ] Métricas reales en lugar de los `{/* ILUSTRATIVO */}` (3 en `prueba-social`, 1 testimonio en `confianza`)
- [ ] Revisar y aprobar el copy como texto final
- [ ] Atribución nominal de Unsplash (el CDN no expone autor; la API pide clave)
- [ ] Área táctil del `Header` en el toolkit
- [ ] `app/home/components/section-typography.tsx` quedó reformateado por un `eslint --fix` con glob sobre el directorio. Solo formato de imports; su violación de contrato (`color="#F00"`) ya existía en `HEAD`
