---
id: 0006
slug: landing-restoapp-vidrio
titulo: Landing de Resto App en vidrio (comp Glassmorphism)
estado: in-progress  # draft | approved | in-progress | done | dropped
creada: 2026-10-30
superficie: landing  # landing | admin | panel | auth | api | infra
ruta: /test-2-corto
comp: .impeccable/mocks/test-2-corto-approved.png
---

# SPEC-0006 — Landing de Resto App en vidrio

## Problema

La dueña o el encargado de un restaurante en Venezuela paga comisiones por cada venta y
lleva el local en herramientas sueltas. Cuando busca un sistema, encuentra plataformas
que cobran más cuanto más vende. No tiene una página que le diga, en un vistazo, que
existe un sistema todo-en-uno por un costo fijo y cómo pedir una demo.

## Por qué ahora

Es la segunda variante de landing de Resto App (`/test-1-sin-brief` fue la primera,
SPEC-0005). Esta prueba si un brief corto y una dirección elegida del catálogo
(Glassmorphism) llegan a una página más directa: un solo mensaje, un solo CTA.

## Alcance

Una landing en `/test-2-corto`, **code-led con el comp como referencia** (cambió de comp-led en el build; ver bitácora de `tasks.md`): el primer viewport reproduce la composición
del comp aprobado (`.impeccable/mocks/test-2-corto-approved.png`, catálogo
`03-glassmorphism`) con la marca de Resto App, según la decisión del usuario "Vidrio con
colores Resto" (ver [design.md → Surface: /test-2-corto](../../design.md)).

1. **Header** del toolkit con wordmark TEMPORAL y CTA "Pedir demo".
2. **Hero (comp):** fondo azul profundo con luces coral y celeste fuera de foco; tres
   paneles de vidrio apilados y desplazados; titular de 2 líneas centrado (Oleo Script),
   bajada de 1 línea, CTA coral con halo ("Pedir demo por WhatsApp"); dos mocks de móvil
   en vidrio a la derecha con componentes reales dentro (un ticket de cierre de muestra);
   badge pequeño en vidrio arriba a la derecha.
3. **Qué incluye:** los canales que entran (salón, mostrador, delivery propio, menú web) y
   lo que sale del mismo cierre (cocina, caja, bancos). Fuera del comp: sigue el sistema
   de `design.md` (papel, no vidrio).
4. **Precio:** costo fijo mensual, sin comisión por venta, en formato ticket.
5. **CTA final** a WhatsApp.
6. **Footer** con la nota de valores de referencia y de contenido de muestra.

## Fuera de alcance

- Cambios a la paleta global, a las fuentes, a la escala tipográfica o a los radios
  (ADR-0009: marca de la base). El vidrio y las luces son gestos `.test-2-corto__*`.
- `/`, `/test-1-sin-brief`, admin, panel y `config/site.ts`.
- Prueba gratis de 7 días: el brief corto no la menciona; un solo CTA.
- Calculadora: es la tesis de `/test-1-sin-brief`, no de esta variante.
- Generar imágenes (sin `OPENAI_API_KEY`): los mocks se construyen con componentes y las
  luces con degradados de tokens.
- Contenido real que no se tiene: precio, número de WhatsApp, logo, capturas de la app.
  Van de muestra y marcados.
- Modo oscuro del sistema.

## Criterios de aceptación

### AC-1 — Header
- **Dado** `/test-2-corto` en `sm`, `md` y `lg`
- **Cuando** carga
- **Entonces** se ve el `Header` del toolkit con wordmark "Resto App" marcado TEMPORAL
  (nunca "Matour"), anclas a las secciones y el CTA "Pedir demo".

### AC-2 — Hero fiel a la composición del comp
- **Dado** la captura `lg` (1440×900) del primer viewport
- **Cuando** se corre `impeccable comp-diff` contra el comp aprobado con `spec.json`
- **Entonces** ninguna región sale `missing` y el puntaje queda registrado. **Build
  code-led** (decisión del usuario 2026-10-30, "Cambiar a code-led"): el comp es
  referencia de **composición**, no de píxeles; la meta de 0.72 es orientativa porque
  colores y fuentes son de la marca por decisión del usuario ("Usa los colores de Resto y
  componentes reales en lugar de las imágenes del comp; acepto que el hero no sea idéntico
  al comp").

### AC-3 — CTA en el primer viewport
- **Dado** `sm`, `md` y `lg`
- **Cuando** se corre `npm run shot -- /test-2-corto --cta "#inicio .btn-primary"`
- **Entonces** el CTA coral del hero queda dentro del primer viewport en los tres.

### AC-4 — Vidrio legible
- **Dado** los paneles de vidrio del hero
- **Cuando** se mide el contraste del texto sobre el punto más claro del fondo
- **Entonces** todo texto cumple ≥ 4.5:1 (≥ 3:1 si es grande); hay como máximo dos capas
  de vidrio bajo cualquier texto; `backdrop-filter` solo en el hero y con fallback opaco
  (`@supports not (backdrop-filter: blur(1px))`).

### AC-5 — Mocks honestos
- **Dado** los dos mocks de móvil
- **Cuando** se miran
- **Entonces** contienen componentes reales del toolkit (texto, cifras de un ticket de
  cierre) marcados de muestra, no una captura inventada de la app, y son decorativos para
  lectores de pantalla o describen lo que muestran.

### AC-6 — Qué incluye y precio
- **Dado** las secciones bajo el hero
- **Cuando** se miran en `sm`, `md` y `lg`
- **Entonces** se listan los 4 canales de entrada y las 3 salidas (icono + texto) y el
  precio dice "costo fijo mensual" y "sin comisión por venta" con el monto rotulado como
  de referencia.

### AC-7 — CTA a WhatsApp
- **Dado** cualquier CTA de demo
- **Cuando** se hace clic
- **Entonces** abre `https://wa.me/?text=…` con el mensaje de demo, en pestaña nueva y con
  `noopener,noreferrer`.

### AC-8 — Responsive y verificación visual
- **Dado** `npm run shot -- /test-2-corto`
- **Cuando** termina
- **Entonces** sale con código 0 (sin scroll horizontal, imágenes rotas ni errores de
  consola) en `sm`, `md` y `lg`. En `sm` los mocks se reubican o se ocultan sin tapar el
  titular ni el CTA.

### AC-9 — Contrato, marca y accesibilidad
- **Dado** el código de la ruta
- **Cuando** se corren `typecheck`, `lint:check` y `contract`, y se recorre con teclado
- **Entonces** typecheck 0, sin errores de lint ni violaciones nuevas, sin hex/`rgba()` en
  `.tsx` ni en `test-2-corto.scss`, foco visible en todo control (tabulando), controles
  ≥ 48px y `prefers-reduced-motion` respetado (las luces no se animan).

## Restricciones heredadas

- [x] [Contrato de implementación](../../01-design/implementation-contract.md) — tokens-first, component-first
- [x] [Design system](../../design.md) — marca Resto App + Surface: /test-2-corto (excepción de vidrio acotada)
- [x] [Producto](../../product.md) — Surface: /test-1-sin-brief y Surface: /test-2-corto
- [x] Accesibilidad — ver [DoD sección E](../../00-harness/definition-of-done.md)
- [x] [ADR-0004](../../04-decisions/0004-verificacion-visual-y-assets.md) — verificación visual; ningún placeholder ajeno
- [x] [ADR-0008](../../04-decisions/0008-catalogo-de-estilos-landing.md) — comp-led desde el catálogo
- [x] [ADR-0009](../../04-decisions/0009-resto-app-reemplaza-impulso.md) — marca de la base; CTA coral con texto y borde `#04223F`

## Preguntas abiertas

Ninguna. Las decisiones que aplica esta spec ya están registradas:

- Colores y fuentes de la marca sobre la composición del comp → usuario, 2026-10-30 ("Vidrio con colores Resto").
- CTA de WhatsApp sin número (`wa.me/?text=…`) y USD 120/mes de referencia → SPEC-0005, resueltas el 2026-10-28.

## Verificación

> Se llena en la fase VERIFY. Salidas reales, no checks optimistas.
> Formato en [definition-of-done.md](../../00-harness/definition-of-done.md#bloque-de-reporte).

## Verificación — 2026-10-30

| Punto | Resultado |
|---|---|
| A. typecheck | ✅ 0 errores |
| A. lint:check | ✅ 7 errores / 733 avisos, los mismos de antes (baseline registrado 8); `app/test-2-corto`: 0 problemas |
| A. build | ⚪ **No ejecutado**: `next build` pisa la `.next` del servidor de desarrollo en marcha (el 2026-10-28 lo dejó en 500) y ese servidor no se levantó en esta sesión. Última ejecución (2026-10-28): compila y falla en `/api/s3/presigned` por variables AWS ausentes, ruta no tocada |
| B. npm run contract | ✅ 35 (baseline 36), todas `hex-en-tsx` anteriores; 0 en archivos de la spec. Greps: sin hex/`rgba()`/`clamp()`/`font-family` en `app/test-2-corto` ni `test-2-corto.scss` |
| B. revisión visual | ✅ `Text` en todo texto; layout con `Section`/`Grid`+`Cell`/`Stack`/`Cluster`/`AutoGrid`/`Container`+`Col`; `Header`, `Button`, `Card`, `Icon name=…` del toolkit; `<div>` solo como gesto (`.test-2-corto__phone-slot`) y `<span>` del halo |
| C. criterios | 8/9 ✅ · 1 ⚠️ (AC-2, detalle abajo) |
| D. responsive | ✅ `npm run shot -- /test-2-corto --cta "#inicio .btn-primary"`: "Sin scroll horizontal, sin imágenes rotas, sin errores de consola"; capturas sm/md/lg (fold y completas) abiertas y revisadas. Regresión: `/` exit 0 (avisos de imágenes Unsplash cargando en dev), `/test-1-sin-brief` sin hallazgos |
| D. dark mode | — No aplica (fuera de alcance) |
| D. assets | ✅ Sin "Matour"; wordmark "Resto App" marcado TEMPORAL en `site-header.tsx` y `test-2-corto.scss`; mocks con datos de muestra marcados en código y en el pie; sin fotos |
| E. a11y | ✅ (detalle abajo) |
| F. docs | ✅ `product.md` y `design.md` (Surface: /test-2-corto + excepción de vidrio acotada), sidecar actualizado, ruta en `docs/02-architecture/overview.md`. Sin ADR nuevo: no cambia el contrato ni la marca |
| G. impeccable audit | ✅ corrido · 15/20 (Good) · 6 hallazgos: 2 sancionados, 4 pendientes |

### C — criterios

- **AC-1** ✅ Header con wordmark TEMPORAL, anclas `#incluye` `#precio`, menú hamburguesa en sm, CTA "Pedir demo".
- **AC-2** ⚠️ `comp-diff` del hero contra el comp: **36 %** (structure 28 %, color 33 %); 2 rondas de alineación (§4b) y se paró. El titular dejó de salir `missing` en la ronda 2; **`phone-mocks` sigue `missing` (22 %)** aunque los mocks están en su sitio: el metric castiga el color y el contenido, que son las decisiones del usuario ("Usa los colores de Resto y componentes reales en lugar de las imágenes del comp; acepto que el hero no sea idéntico al comp"), más el `Header` del toolkit. La composición (pila de 3 paneles, titular de 2 líneas centrado, bajada, CTA con halo, mocks solapando a la derecha, badge arriba) se comprobó en el lado a lado. Artefactos en `.impeccable/review/diff/hero/`.
- **AC-3** ✅ CTA en el fold: sm `bottom 405 / 844`; el shot `--cta` pasa en md/lg.
- **AC-4** ✅ Contraste medido píxel a píxel en el peor punto del área de cada texto (captura lg): titular 6.23:1 (grande), bajada 10.42:1, badge 10.12:1, textos de los mocks 8.61–14.19:1; CTA azul profundo sobre coral 4.94:1. Máximo 2 capas de vidrio bajo texto (los traseros no llevan texto). `backdrop-filter` solo en el hero, con fallback `@supports not` opaco.
- **AC-5** ✅ Mocks con `Text` + filas de ticket (datos de muestra), `aria-hidden`, y descripción `sr-only` ("Ejemplo de la app con datos de muestra…").
- **AC-6** ✅ Entra 4 / Sale 3 con icono + texto; precio "Plan mensual USD 120 · Comisión por venta USD 0 · Pagas al mes" + "Precio de referencia".
- **AC-7** ✅ `window.open` interceptado en los 3 CTA de demo: `https://wa.me/?text=Hola, quiero ver una demo de Resto App…`, `"_blank"`, `"noopener,noreferrer"`.
- **AC-8** ✅ ver D; en sm un solo panel y un solo mock bajo el CTA, badge oculto.
- **AC-9** ✅ typecheck 0, sin errores/violaciones nuevas; foco **tabulando** (6 elementos: logo, 2 anclas, CTA del header en azul; CTA del hero en crema sobre vidrio, corregido en el build; CTA final en crema); 0 controles < 48px en sm; las luces son estáticas (no hay movimiento que reducir) y el botón ya respeta `prefers-reduced-motion` (tokens globales).

### E — accesibilidad

Contraste y foco: ver AC-4 y AC-9. Ningún texto fuera de la tinta de la marca (barrido de `color` computado en sm: 0). Las reglas de naranja/Anton son de ImPulso: no hay texto pequeño coral, ni blanco sobre coral, ni Anton. No hay fotos con texto encima.

### G — `/impeccable audit` (detector URL 1440×900 y 390×844 + fuente)

| # | Dimensión | Puntaje | Hallazgo clave |
|---|---|---|---|
| 1 | Accesibilidad | 3 | Contraste medido y foco corregido; stragglers en párrafos |
| 2 | Rendimiento | 3 | `backdrop-filter` en 6 elementos del hero (3 paneles, badge, 2 mocks); peso no medido |
| 3 | Theming | 3 | Todo por tokens y `color-mix()`; modo oscuro fuera de alcance |
| 4 | Responsive | 3 | Sin desborde; en md los dos mocks quedan separados y la composición se afloja |
| 5 | Integridad | 3 | Mundo coherente con la marca; fidelidad al comp limitada por decisión del usuario |
| | **Total** | **15/20** | **Good** |

Hallazgos:
- `dark-glow` (halo coral del CTA sobre azul) — **sancionado**: el comp elegido lo muestra; ignore acotado a `test-2-corto.scss` en `.impeccable/config.json`.
- `cream-palette` — **sancionado**: crema de marca (el hook no admite ignorar el valor; queda sin silenciar).
- **[P2] Composición de los mocks en md** — quedan separados (pequeño abajo a la izquierda, grande a la derecha). Pendiente → `/impeccable adapt`.
- **[P2] Seis `backdrop-filter` en el hero** — coste de pintura en móviles modestos. Pendiente → `/impeccable optimize`.
- **[P3] Stragglers** — "bancos.", "vendas.", "muestra." solos en la última línea. Pendiente → `/impeccable polish` (`text-wrap: pretty`).
- **[P3] `font-size: 28px` fuera de la escala** — wordmark TEMPORAL; se va con el logo real.

Pendiente, en orden:
1. **Build** (DoD A): correr `npm run build` con el servidor de desarrollo detenido; fallará en `/api/s3/presigned` hasta definir las variables AWS en `.env.local` (fuera de esta spec), igual que SPEC-0005.
2. [P2] composición de mocks en md y [P2] `backdrop-filter` en el hero.
3. [P3] stragglers y tamaño del wordmark.
4. Contenido de muestra: número de WhatsApp, USD 120/mes, logo (wordmark TEMPORAL), contenido de los mocks.
5. Dependencia entre rutas: `test-2-corto` importa `app/test-1-sin-brief/components/cuenta.ts`; si ambas siguen, mover a `shared/project-components/`.

**Re-verificación (2026-10-30, sin cambios de código desde la anterior):** typecheck 0 · lint:check 7 errores / 733 avisos · contract 35 · `npm run shot -- /test-2-corto --cta "#inicio .btn-primary"` exit 0, "Sin scroll horizontal, sin imágenes rotas, sin errores de consola"; capturas lg y sm del fold abiertas, idénticas a la pasada anterior. Build sigue sin ejecutar (mismo motivo). Estado: `in-progress`.
