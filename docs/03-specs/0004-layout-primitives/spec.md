---
id: 0004
slug: layout-primitives
titulo: Primitivas de layout para la web
estado: done         # draft | approved | in-progress | done | dropped
creada: 2026-10-20
superficie: landing  # | admin | panel | auth | api | infra
---

# SPEC-0004 — Primitivas de layout para la web

## Problema

Quien compone una página sobre el boilerplate (una persona o un agente con `impeccable`)
tiene `Container` y `Col` para las columnas y nada más:

- **El contrato pide algo que el sistema no ofrece.** Dice "nunca `<div>` crudo para
  layout", pero no hay forma de apilar, alinear en fila o fijar una proporción sin un
  `<div>` con clase propia. La landing tiene 24 `<div>` y 15 usos de clases `home__stack*`. Una regla
  imposible de cumplir le enseña a la IA a ignorar las reglas.
- **Cada página reinventa lo mismo con otro nombre.** `home__stack`, `home__media`,
  `home__hero-actions`, `home__form-row` son patrones genéricos con nombre de página. Una
  página nueva los copia como `about__stack` o los rehace distinto, y el boilerplate deja
  de ser estándar.
- **Un diseño audaz obliga a salirse del sistema.** `Col` solo ofrece ancho y `push`: no
  hay superposición, ni salida a sangre, ni columna de inicio. El hero tuvo que montar foto,
  scrim y contenido con capas `absolute` hechas a mano. Cualquier composición editorial
  o asimétrica empieza abandonando el grid.
- **Dos formas de hacer lo mismo.** Tailwind (`flex`, `gap-2`, `mb-4`) y SCSS de página
  conviven para el mismo fin. La IA mezcla estilos y nadie sabe cuál es el correcto.

## Por qué ahora

Es la fase 3 del refactor. Con los tokens de SPEC-0003, las primitivas pueden nacer
consumiendo una escala global. La herramienta para la IA (SPEC-0005) necesita un
vocabulario de layout cerrado que enseñar y verificar.

## Decisiones tomadas (entrevista 2026-10-20)

| Tema | Decisión |
|---|---|
| Dónde viven | En el repo (`shared/components/layout/`). Se evaluará pasarlas a `citrica-ui-toolkit` después de usarlas en proyectos reales |
| Primitivas | `Section`, `Stack`, `Cluster`, `Media`, `AutoGrid`, `Grid` + `Cell` |
| API | Componentes React tipados. Las props de espaciado solo aceptan pasos de la escala (`gap={6}`), así que TypeScript rechaza valores inventados. Por dentro emiten clases `o-*` de `styles/07-objects/`: sin estilos inline y compatibles con Server Components |
| Superficie | `landing`, con `impeccable` en las tres fases. La landing debe quedar visualmente idéntica |
| Regla de layout | **Primitivas primero** (ADR-0007): layout solo con `Container`/`Col` y primitivas. Tailwind solo para ajustes que ninguna primitiva cubre (p. ej. `sr-only`, `w-full`), nunca `flex`/`grid`/`gap`/márgenes de layout. `<div>` crudo solo para un gesto de página con su clase `.<pagina>__*` |

**Regla de consumidores:** ninguna primitiva, ni ninguna prop de primitiva, nace sin al
menos un uso real en la landing.

## Alcance

1. **ADR-0007** "layout con primitivas", aceptado antes del código. Cambia la regla 4 del
   [contrato](../../01-design/implementation-contract.md).
2. **Primitivas** en `shared/components/layout/`, con su CSS `o-*` en `styles/07-objects/`,
   consumiendo los tokens de `foundations/`:
   - **`Section`**: ritmo (`tight` / `default` / `airy` → `--section-y*`) y tono
     (`base` / `surface` / `inverse`). Reemplaza `home__section*` y el `<section>` crudo.
   - **`Stack`**: pila vertical con `gap` de la escala. Reemplaza `home__stack*`.
   - **`Cluster`**: fila que se envuelve, con `gap`, `align` y `justify`. Reemplaza las acciones
     del hero, las métricas, las filas del footer y la nota del formulario.
   - **`Media`**: proporción, radio e imagen que cubre. Reemplaza `home__media*`.
   - **`AutoGrid`**: columnas `auto-fit` con ancho mínimo. Reemplaza los pasos del método y las
     filas del formulario.
   - **`Grid` + `Cell`**: CSS Grid sobre las **mismas** columnas (12/6/4) y gutters del
     `Container`, con `start`/`span` por breakpoint (igual sintaxis que `Col`), superposición
     de celdas en la misma área y salida a sangre (`breakout`). Primer consumidor: el hero.
   - Utilidades de texto `u-measure-prose` y `u-measure-narrow` (en `styles/09-utilities/`) que
     reemplazan a `home__measure*`. No son primitivas: limitan el largo de línea de un texto.
   - Toda primitiva acepta `as` para renderizar el elemento semántico correcto (`ul`, `ol`,
     `li`, `section`, `footer`…), `className` y `id`.
3. **Migración de las 12 secciones de la landing** (`app/home/components/`) a las primitivas.
   Los patrones genéricos salen de `home.scss`; ahí quedan solo los gestos de marca (subrayado,
   motion del hero, regla naranja del paso, anillo de foco, scrim).
4. **Página de pruebas `/dev/layout`** (P-1): banco de pruebas y referencia viva del sistema
   de layout.
   - Una sección por primitiva que explica en lenguaje llano **qué es, cuándo usarla y cuándo
     no**, muestra sus variantes renderizadas y el código mínimo para usarla.
   - Incluye las composiciones audaces de `Grid` que la landing no usa: superposición de
     celdas, asimetría (inicio en cualquier columna) y salida a sangre.
   - Marcada `noIndex` vía `buildMetadata` (no hay sitemap en el repo). Cuenta como consumidor
     real a efectos de la regla de consumidores.
   - Construida con las mismas primitivas, `Text` y tokens: es también la prueba de que
     alcanzan sin markup propio.
5. **Documentación:** el contrato (regla 4 y su mapa de archivos), `docs/00-harness/conventions.md`
   ("Estructura de una página"), `docs/design.md` §5, `docs/01-design/reference/layout-system.md`
   y `CLAUDE.md`.

## Fuera de alcance

- Pasar las primitivas a `citrica-ui-toolkit`.
- **Admin, panel y auth**: no se migran ni se les aplica la regla (ADR-0007 se limita a la web).
- Rediseñar la landing: ningún cambio visual intencional. Hacer la landing más audaz es otra spec.
- Props sin consumidor: p. ej. `Grid` con `row`, densidad, `subgrid` o alineación por celda,
  si el hero no las necesita.
- Cambiar `Container`/`Col` del toolkit o el grid en `settings.scss`.
- Quitar `"use client"` de las secciones (SPEC-0006). Las primitivas, en cambio, nacen sin
  `"use client"`.
- La skill `citrica-ui`, reglas nuevas del hook y un catálogo general del design system
  (color, tipo, componentes del toolkit) → SPEC-0005. `/dev/layout` cubre solo layout.
- **Footer**: no se convierte en `Section`. Conserva `home__footer` como gesto de página
  (padding 64/40px) y usa `Cluster` dentro (P-2).
- Configurar Tailwind.

## Criterios de aceptación

### AC-1 — La landing se ve igual
- **Dado** referencias tomadas antes del build: `npm run shot -- / --cta "#hero button"`; capturas
  de layout (imágenes ocultas con `visibility: hidden` y sin el indicador de Next, en sm/md/lg)
  con las cajas de cada imagen; y la captura de `#agenda` en estado de éxito del formulario
- **Cuando** se repiten al terminar
- **Entonces** `shot` sale con código 0; las cajas de las imágenes son idénticas; cada captura de
  layout difiere de su referencia en **≤ 32 píxeles con ≤ 16 de diferencia por canal** (piso
  de ruido medido entre tomas idénticas: 7–18 píxeles y 11 por canal, por el antialiasing de
  los iconos SVG); y la captura del estado de éxito cumple el mismo umbral. Si algo supera el
  umbral, se abre, se explica en la bitácora y la spec no se cierra sin aprobación explícita.

> Ajuste del 2026-10-20: `npm run shot` dejó de ser determinista byte a byte (fotos de Unsplash
> a medio cargar en la primera toma y recodificadas después, más el indicador animado de Next en
> dev). Comparar sus capturas daría falsos positivos o escondería cambios reales. Ver la bitácora.

### AC-2 — Nada de layout a mano en las secciones
- **Dado** `app/home/components/` después del build
- **Cuando** se corre `grep -rnE '<div' app/home/components`
- **Entonces** cada `<div>` restante lleva una clase `home__*` de gesto de marca listada en el
  plan, y `grep -rnE 'className="([^"]* )?(flex|grid|gap-[0-9]+|m[tbxy]?-[0-9]+|p[tbxy]?-[0-9]+)( [^"]*)?"' app/home/components`
  no devuelve nada. (Corregido en el build: la versión anterior usaba `\b`, que da falso positivo
  con `home__hero-grid` porque el guion cuenta como límite de palabra.)

### AC-3 — `home.scss` sin patrones genéricos
- **Dado** `styles/webpages-styles/home.scss` después del build
- **Cuando** se buscan `home__stack`, `home__section`, `home__media`, `home__measure`,
  `home__metrics`, `home__steps`, `home__form-row`, `home__footer-top` y `home__footer-bottom`
  (`home__hero-actions` se queda como gesto: `margin-top` y área táctil; su layout pasa a `Cluster`)
- **Entonces** no existen, ni en el SCSS ni en `app/`.

### AC-4 — Las props rechazan valores fuera del sistema
- **Dado** un archivo temporal que usa `<Stack gap={5}>` y `<Section rhythm="huge">`
- **Cuando** se corre `npm run typecheck`
- **Entonces** falla con un error en cada uso. Al borrar el archivo, vuelve a 0.

### AC-5 — `Grid` se alinea con `Col`
- **Dado** la landing en `lg` (1440px)
- **Cuando** se mide con Playwright, en la demo lado a lado de `/dev/layout`, un `Cell` de
  `span=8` y un `Col` de `lg: 8`
- **Entonces** su borde izquierdo y su ancho coinciden con una diferencia de 1px o menos.
  Lo mismo en `md` (768px) y `sm` (390px) con su `span` correspondiente.

### AC-6 — La semántica se conserva
- **Dado** la landing renderizada
- **Cuando** se cuentan en el DOM `section`, `footer`, `ul`, `ol` y `li`, y los `id` de ancla
- **Entonces** los conteos y los `id` son los mismos que antes del build.

### AC-7 — Puertas sin regresión
- **Dado** la baseline (typecheck 0, lint 7, contrato 35)
- **Cuando** se corren `npm run typecheck`, `lint:check` y `contract`
- **Entonces** typecheck da 0, lint ≤ 7 y contrato ≤ 35.

### AC-8 — La página de pruebas explica y ejercita cada primitiva
- **Dado** `npm run dev`
- **Cuando** se corre `npm run shot -- /dev/layout` y se abren sus capturas
- **Entonces** sale con código 0, hay una sección por cada una de las 7 primitivas con su
  explicación (qué es, cuándo sí, cuándo no) y al menos un ejemplo renderizado; `Grid` muestra
  superposición, asimetría y salida a sangre; y el HTML de la página trae
  `<meta name="robots" content="noindex…">`.

### AC-9 — `impeccable`
- **Dado** el ciclo de la spec
- **Cuando** se revisan plan y verificación
- **Entonces** `plan.md` incorpora la salida de `/impeccable shape`, y la sección *Verificación*
  registra los hallazgos de `/impeccable audit`, con los no atendidos como pendientes.

## Restricciones heredadas

- [x] [Contrato de implementación](../../01-design/implementation-contract.md): regla 4 se **modifica** vía ADR-0007; reglas 1–3 intactas
- [x] [ADR-0006](../../04-decisions/0006-documentacion-refleja-render.md): las primitivas consumen `foundations/`; cero valores nuevos fuera de tokens
- [x] [Principios de diseño](../../product.md#design-principles): las primitivas deben poder expresar el "ritmo de cartel" (alternancia de tono, secciones apretadas y que respiran)
- [x] [Design system](../../design.md): §5 Layout se actualiza
- [x] Accesibilidad: semántica de listas y landmarks intacta (AC-6); foco sin cambios

## Preguntas abiertas

- [x] ~~**P-1 — ¿Página de pruebas `/dev/layout`?**~~ Resuelta (2026-10-20): sí, dentro de esta
      spec, y explicando qué significa cada primitiva. Ver Alcance §4 y AC-8.
- [x] ~~**P-2 — Footer.**~~ Resuelta (2026-10-20): conserva `home__footer` como gesto y usa
      `Cluster` dentro. Ver Fuera de alcance.

## Verificación — 2026-10-20

Rama `develop` (sin push). Commits: `08e6ebe` spec · `59af607` ADR-0007 · `f4f160a`
primitivas · `af140ee` migración de la landing · `2bc21bd` `/dev/layout` + arreglo de `Cell` ·
`2ed4071` docs · (+ cierre).

| Punto | Resultado |
|---|---|
| A. typecheck | ✅ 0 errores |
| A. lint:check | ✅ 7 errores / 733 warnings (igual a la baseline). Antes del cierre eran 852 warnings: 119 de formato (`prettier`, `import/order`) en archivos de esta spec, corregidos con `eslint --fix` limitado a esos archivos |
| A. build | ⚠️ **falla por una causa previa**: `Failed to collect page data for /api/s3/video` (faltan variables de AWS en `.env.local`; ver SPEC-0002). La app compila: `✓ Compiled successfully` |
| B. npm run contract | ✅ 35 `hex-en-tsx` (igual a la baseline); 0 añadidas |
| B. revisión visual | ✅ Texto con `Text`; layout con `Container`/`Col` + primitivas; `Icon` con `name`. Los únicos `<div>` propios: el scrim del hero y las cajas de muestra de `/dev/layout` (gestos con clase de página) |
| C. criterios | 9/9 ✅ (detalle abajo) |
| C. fuera de alcance | ✅ Admin, panel, toolkit, `Container`/`Col`, `settings.scss` y Tailwind sin tocar. La skill `citrica-ui` no se tocó (pendiente) |
| D. responsive | ✅ `npm run shot -- / --cta "#hero button"` y `npm run shot -- /dev/layout`: código 0, sin scroll horizontal, imágenes rotas ni errores de consola. Capturas **abiertas y revisadas**: fold del hero en `lg`; `/dev/layout` completa en escritorio; zona de `Grid` en `lg`; tabla, `Stack`, superposición y salida parcial en `sm` |
| D. dark mode | N/A: la web solo usa el tema light |
| D. placeholders | ✅ Ninguno ajeno. Las cajas "media" de `/dev/layout` son representaciones rotuladas, no sustitutos de contenido |
| E. a11y | ✅ Foco **tabulando con Playwright** (`keyboard.press('Tab')`): `/dev/layout` con outline de 2px carbón; landing sin cambios (carbón en el header, blanco sobre el hero, borde propio en campos). Contraste medido: peor caso real 8.21:1. Áreas táctiles: 8 enlaces de 16px en `/dev/layout`, corregidos a 44px. `prefers-reduced-motion`: el subrayado del hero se ve (medido) |
| F. docs | ✅ ADR-0007; contrato (regla 4 y mapa), `conventions.md`, `design.md` §5, `layout-system.md`, `product.md`, `CLAUDE.md` y `02-architecture/overview.md` (ruta `/dev/layout` y carpetas nuevas) |
| G. impeccable audit | ✅ 16/20 (Good); 4 hallazgos: 1 atendido, 3 pendientes (abajo) |

**Criterios de aceptación**

- **AC-1** ✅ Capturas de layout contra la referencia (imágenes ocultas, umbral ≤ 32 px / ≤ 16):
  sm 18 px · md 0 · lg 0, máx. 11; cajas de imagen idénticas. Folds reales con foto: 0 px de
  diferencia en sm/md/lg tras migrar el hero. Estado de éxito del formulario: 0 px. `shot` código 0.
- **AC-2** ✅ `<div>` en la landing: de 24 a 1 (`home__hero-scrim`, gesto). Grep de utilidades
  Tailwind de layout (expresión corregida, validada con un control): sin coincidencias.
- **AC-3** ✅ Ninguna de las clases listadas existe en `styles/` ni en `app/`. `home.scss`: 433 → 288
  líneas, sin `flex`, `grid` ni `gap`.
- **AC-4** ✅ Archivo temporal: `tsc` rechaza `gap={5}`, `rhythm="huge"`, `span={13}` y `style`
  inline (4/4); borrado → typecheck 0.
- **AC-5** ✅ `/dev/layout`, `Col` contra `Cell`: sm Δx 0 / Δw 0 · md Δx 0 / Δw 0.02px · lg Δx 0 / Δw 0.
- **AC-6** ✅ Semántica idéntica: 10 `section`, 1 `footer`, 4 `ul`, 1 `ol`, 16 `li`, 1 `h1`, 8 `h2`,
  7 `h3`, mismos ids de ancla.
- **AC-7** ✅ typecheck 0 · lint 7 · contrato 35.
- **AC-8** ✅ `/dev/layout`: 200, `<meta name="robots" content="noindex, nofollow, nocache">`, `shot`
  código 0. Seis secciones cubren las siete primitivas (`Grid` y `Cell` comparten sección: una `Cell`
  no existe fuera de un `Grid`), cada una con qué es, analogía, cuándo sí, cuándo no, props, snippet
  y demo. `Grid` muestra la guía de columnas, `Col` contra `Cell` y los cuatro gestos con su
  comportamiento en móvil.
- **AC-9** ✅ `plan.md` incorpora el brief de `/impeccable shape`; audit registrado abajo.

**`/impeccable audit`: 16/20 (Good)**

| # | Dimensión | Puntaje | Hallazgo principal |
|---|---|---|---|
| 1 | Accesibilidad | 3 | Áreas táctiles de 16px en `/dev/layout` (corregido) |
| 2 | Rendimiento | 3 | `/dev/layout` se renderiza en cliente porque el toolkit no declara `"use client"` |
| 3 | Responsive | 4 | Sin scroll horizontal; los gestos se degradan como se documenta |
| 4 | Theming | 3 | Tokens en todo lo nuevo; la web no tiene modo oscuro (previo) |
| 5 | Anti-patrones | 3 | Etiqueta "En vivo" repetida sobre cada demo |

Veredicto de anti-patrones: no parece generado por IA. No hay eyebrows sobre los encabezados,
numeración por sección, rejilla de tarjetas idénticas ni estética editorial. La landing no cambió.

Hallazgos:
- **[P2, atendido]** Enlaces de 16px de alto en `/dev/layout` (tabla "¿Qué uso?" y enlace final):
  gesto de 44px como el del hero.
- **[P2, pendiente]** `/dev/layout` es un Client Component entero, porque `citrica-ui-toolkit` no
  declara `"use client"` y su barrel importa HeroUI. Es sistémico: afecta igual a la landing →
  SPEC-0006 o al toolkit.
- **[P3, pendiente]** El detector marca `border-radius: 2px` del anillo de foco como fuera de la
  escala (en `home.scss` y `dev-layout.scss`). Es la esquina del outline, no de una superficie: se
  mantiene como gesto.
- **[P3, pendiente]** La etiqueta "En vivo" se repite sobre cada demo. En una página de
  documentación orienta; no se repite en ningún encabezado.

**Encontrado y corregido durante el build** (detalle en la bitácora de `tasks.md`):
1. `npm run shot` dejó de ser determinista por las fotos remotas y el indicador de Next: AC-1 pasó a
   capturas de layout con umbral medido.
2. Regresión propia: con `prefers-reduced-motion`, el subrayado del hero quedaba debajo de la foto.
   Arreglado y medido.
3. Bug de `Cell`: los números sueltos solo aplicaban a `sm`. Arreglado; la landing no se veía afectada.

Pendiente:
1. Skill `.claude/skills/citrica-ui/SKILL.md`: no menciona las primitivas (ver desvío en la bitácora).
2. Render en cliente por el toolkit sin `"use client"` (P2 del audit).
3. Dos copias de la escala (`$space-steps` en Sass y `Space` en TS) y de las columnas
   (`$total-columns__*` y `COLUMNS_AT`): chequeo automático → SPEC-0005.
4. Build roto por S3 sin `.env.local` (previo).
