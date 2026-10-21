---
id: 0004
slug: layout-primitives
titulo: Primitivas de layout para la web
estado: in-progress  # draft | approved | in-progress | done | dropped
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
  plan, y `grep -rnE 'className="[^"]*\b(flex|grid|gap-|m[tbxy]?-[0-9]|p[tbxy]?-[0-9])' app/home/components`
  no devuelve nada.

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

## Verificación

> Se llena en la fase VERIFY. Salidas reales, no checks optimistas.
> Formato en [definition-of-done.md](../../00-harness/definition-of-done.md#bloque-de-reporte).
