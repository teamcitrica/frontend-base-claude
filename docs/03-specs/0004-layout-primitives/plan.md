# PLAN — SPEC-0004

> El *cómo*. Se escribe después de que la spec está `approved`, y se aprueba antes
> de escribir código.

## Enfoque

Cinco pasos, cada uno con su commit y verificable por separado:

1. ADR-0007 y regla 4 del contrato.
2. Primitivas y su CSS, sin consumidores todavía (cero cambio visual).
3. Migración de la landing sección por sección, con `cmp` después de cada tanda.
4. Página `/dev/layout`.
5. Documentación.

La migración es mecánica salvo el hero, que pasa de capas `absolute` a `Grid` y es el
riesgo principal.

## Dirección de diseño (`/impeccable shape`, confirmada el 2026-10-20)

- **Gestos que `Grid` debe expresar**, cada uno con su demo:
  - texto sobre foto a sangre (lo usa el hero);
  - asimetría con desplazamiento;
  - superposición entre bloques;
  - salida parcial hacia un lado (`wide`).
- **`/dev/layout`:** ImPulso en modo documental. Color restringido: fondo blanco, demos en
  `surface` y el naranja solo para marcar columnas activas. Sin fotos: las cajas `inverse`
  rotuladas "media" ocupan su lugar, y se enlaza al hero real como ejemplo con foto.
- **Lector:** desarrollador junior y la IA. Por primitiva: qué es (una frase), una analogía
  física, cuándo sí, cuándo no (y qué usar en su lugar) y el snippet mínimo.
- **Estructura de la página:**
  1. Introducción con la regla única.
  2. Tabla "¿Necesitas…? → usa…".
  3. Una sección por primitiva.
  4. `Grid` al final, con guía de 12 columnas superpuesta (hecha con el propio `Grid`) y una
     demo lado a lado de `Col` contra `Cell`.
- **Anclas:** *Every Layout* (vocabulario), *Braid* de Seek (props tipadas contra la escala) y
  el patrón de grid "full-bleed" con líneas con nombre.
- **Se evita:** eyebrows y numeración por sección, rejilla de tarjetas para el índice, estética
  editorial y estética de Storybook.
- **Descartado por el contrato:** la fuente monoespaciada para snippets. No hay token de fuente
  mono y `font-family` a mano está prohibido; los snippets van en `Text variant="label"` con
  `white-space: pre` como gesto de página. `clamp()` tampoco se usa.

## Evidencia de investigación (2026-10-20)

- **El toolkit no declara `"use client"`** (`dist/index.mjs`: 0 coincidencias) y su barrel
  importa HeroUI. Importar `Text` en un Server Component es arriesgado: `/dev/layout` será un
  Client Component, como la landing. Las primitivas no tienen hooks ni `"use client"` y sirven
  en ambos lados.
- **Geometría del `Container` (`o-container`):**
  - ancho `calc(--container-width + 2·--container-padding)`, con `max-width: 100%`;
  - padding lateral `padding − gutter/2`, y cada `Col` añade `gutter/2`;
  - por tanto el contenido de la primera columna empieza en `--container-padding` desde el
    borde, y el ancho máximo de contenido es exactamente `--container-width` (1366px).
- **Inventario de la landing:**
  - 24 `<div>`; 15 usos de `home__stack*`; 11 `Container` y 17 `Col` (dos con `lgPush`).
  - Un `mb-4` de Tailwind en `metodo.tsx`.
  - El estado de éxito del formulario (`home__form-status`) **no aparece en ninguna captura**.
- **No hay sitemap ni `robots.ts`**; `buildMetadata({ noIndex: true })` emite el `robots` correcto.

## Diseño técnico

### Escala compartida

`foundations/_space.scss` pasa a declarar la escala una sola vez como lista Sass
(`$space-steps: 1, 2, 3, 4, 6, 8, 10, 12, 16, 24, 32`). De esa lista salen las variables
`--space-N` (la misma salida de hoy) y las clases de `gap` de cada primitiva. En TypeScript,
`Space = 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 16 | 24 | 32` en `shared/components/layout/types.ts`.
**Hay dos copias de la misma lista (Sass y TS).** Un comentario en cada una apunta a la otra;
el chequeo automático va a SPEC-0005.

### Primitivas (`shared/components/layout/`)

Todas aceptan `as`, `id` y `className`, renderizan `<{as}>` con clases `o-*` y no usan estilos
inline. Cada valor de prop tiene un consumidor real en la landing o en `/dev/layout`.

| Primitiva | Props | Clases (`styles/07-objects/`) |
|---|---|---|
| `Section` | `rhythm`: `none` \| `tight` \| `default` \| `airy`; `tone`: `base` \| `surface` \| `inverse` | `o-section`, `--tight`, `--airy`, `--flush`, `--surface`, `--inverse`. Incluye `scroll-margin-block-start: var(--space-16)` (el `Header` es fijo) |
| `Stack` | `gap: Space` | `o-stack`, `o-stack--gap-N` |
| `Cluster` | `gap: Space \| { row, column }`; `align`: `start` \| `center`; `justify`: `start` \| `between`; `wrap: boolean` (por defecto `true`) | `o-cluster`, `--gap-N`, `--row-gap-N`, `--col-gap-N`, `--align-*`, `--justify-*`, `--nowrap` |
| `Media` | `ratio`: `"16/10"` \| `"4/3"`; `radius`: `md` \| `none` | `o-media`, `--16x10`, `--4x3`, `--radius-none` |
| `AutoGrid` | `minItemWidth`: `220` \| `240`; `gap: Space` | `o-autogrid`, `--min-220`, `--min-240`, `--gap-N` |
| `Grid` | `rowGap?: Space`; `minHeight?`: `"hero"` (92svh, solo el hero) | `o-grid`, `--row-gap-N`, `--min-hero` |
| `Cell` | `start` y `span`: número o `{ sm, md, lg }`; `row`: número o `{ sm, md, lg }`; `breakout`: `full` \| `wide-start` \| `wide-end`; `align`: `start` \| `end` | `o-cell`, `o-cell-start-N@bp`, `o-cell-end-N@bp`, `o-cell-row-N@bp`, `--full`, `--wide-start`, `--wide-end`, `--align-*` |

**Grid**, con líneas con nombre y alineado con `Container` por construcción:

```scss
.o-grid {
  display: grid;
  column-gap: var(--grid-gutter);
  grid-template-columns:
    [full-start] minmax(calc(var(--container-padding) - var(--grid-gutter)), 1fr)
    [content-start] repeat(var(--total-columns),
      minmax(0, calc((var(--container-width) - (var(--total-columns) - 1) * var(--grid-gutter)) / var(--total-columns))))
    [content-end] minmax(calc(var(--container-padding) - var(--grid-gutter)), 1fr)
    [full-end];
}
```

- La pista lateral mide `padding − gutter`, y el `column-gap` le suma el `gutter`: el contenido
  empieza en `--container-padding`, igual que el primer `Col`.
- Las pistas de contenido crecen hasta su máximo antes que las `1fr`, así que el ancho máximo
  de contenido es `--container-width`, como en el `Container`.
- Requiere `padding ≥ gutter`. Se cumple en los tres breakpoints: 112 ≥ 56, 56 ≥ 20 y 24 ≥ 20.

**`Cell`:**
- La columna N de contenido es la línea `N+1`. `Cell` calcula por breakpoint `start` y
  `end = start + span − 1` y emite `o-cell-start-N@bp` y `o-cell-end-N@bp`.
- Sin `start`/`span` ocupa `content-start / content-end`.
- Los `breakout` sobrescriben un lado o los dos con `full-start` y `full-end`.
- Las clases se generan con bucles Sass como `col.scss`, mobile-first.

### Mapa de migración (landing)

| Hoy | Pasa a |
|---|---|
| `<section className="home__section …">` | `<Section rhythm tone id>` |
| `home__stack`, `--tight`, `--loose` | `Stack gap={6}`, `{2}`, `{10}` |
| `home__pains` (`ul`) | `Stack as="ul" gap={6}` |
| `home__pain` (`li`) | `Cluster as="li" gap={3} align="start" wrap={false} className="home__pain"`. La clase queda como gesto: borde superior y padding |
| `home__metrics` (`ul`) | `Cluster as="ul" gap={{ row: 10, column: 24 }} align="start"` |
| `home__metric` (`li`) | `Stack as="li" gap={1} className="home__metric"`. Gesto: `min-width` y transición |
| `home__steps` (`ol`) | `AutoGrid as="ol" minItemWidth={240} gap={10}` |
| `home__step` (`li`) | `Stack as="li" gap={2} className="home__step"`. Gesto: regla naranja |
| `home__media --wide`, `--tall` | `Media ratio="16/10"`, `"4/3"` |
| `home__form`, `home__form-row`, `home__form-note` | `Stack gap={6}`, `AutoGrid minItemWidth={220} gap={6}`, `Cluster gap={2} align="start" wrap={false}` |
| `home__measure`, `--narrow` | Utilidad de texto `u-measure-prose` o `u-measure-narrow` en `09-utilities` (no es una primitiva: limita una línea de texto) |
| `home__hero-body` | `Stack gap={6} className="home__hero-body"` (el stagger apunta a sus hijos) |
| `home__hero-actions` | `Cluster gap={6} align="center" className="home__hero-actions"`. **La clase queda como gesto**: `margin-top` de 8px y área táctil de 44px. Ver "Ajustes a la spec" |
| Hero: capas `absolute` | `Section rhythm="none" tone="inverse" className="home__hero"` → `Grid minHeight="hero"` → `Cell breakout="full" row={1} className="home__hero-media"` (foto + scrim) y `Cell span={{ sm: 4, md: 6, lg: 8 }} row={1} align="end" className="home__hero-content"` (padding 96/64 como gesto) |
| `metodo`: `Col lg 8` + `mb-4` + `Col lg 12` | `Grid rowGap={4}` con dos `Cell`. Sale el `mb-4` de Tailwind |
| Footer: `home__footer-top` y `-bottom` | `Stack gap={6}`: `Cluster justify="between"`, `<hr className="home__footer-rule">` (gesto) y `Cluster justify="between"`. `home__footer` sigue como gesto (P-2) |

### `/dev/layout`

- `app/dev/layout/page.tsx` [nuevo], Server Component: solo `metadata = buildMetadata({ …, noIndex: true })`.
- Renderiza `app/dev/layout/components/layout-guide.tsx` [nuevo], con `"use client"` por lo
  que se explicó del toolkit.
- Una sección por primitiva en `app/dev/layout/components/`. El contenido (explicaciones,
  cuándo sí y cuándo no, snippets) va como datos en `content.ts`, para que corregir copy no
  toque layout.
- Estilos en `styles/webpages-styles/dev-layout.scss` [nuevo], con su `@import` en `custom.scss`.
  Solo gestos: caja de demo, etiqueta de columnas, guía de 12 columnas y `white-space: pre`
  para snippets.
- La demo **`Col` contra `Cell`** (mismo ancho, lado a lado) es la que mide AC-5.

## Archivos que se tocan

| Archivo | Qué cambia |
|---|---|
| `docs/04-decisions/0007-layout-con-primitivas.md` [nuevo] + `README.md` | ADR |
| `docs/01-design/implementation-contract.md` | Regla 4 y mapa de archivos |
| `styles/10-tokens/web/foundations/_space.scss` | Lista `$space-steps`; misma salida |
| `styles/07-objects/{section,stack,cluster,media,auto-grid,grid}/*.scss` [nuevo] + `objects.scss` | CSS de las primitivas |
| `styles/09-utilities/utilities.scss` | `u-measure-prose`, `u-measure-narrow` |
| `shared/components/layout/{types,section,stack,cluster,media,auto-grid,grid,index}.ts(x)` [nuevo] | Primitivas |
| `app/home/components/*.tsx` (11 secciones + footer) | Migración |
| `styles/webpages-styles/home.scss` | Salen los patrones; quedan los gestos |
| `app/dev/layout/**` [nuevo], `styles/webpages-styles/dev-layout.scss` [nuevo], `styles/custom.scss` | Página de pruebas |
| `docs/00-harness/conventions.md`, `docs/design.md` §5, `docs/01-design/reference/layout-system.md`, `CLAUDE.md` | Documentación |

## Componentes y tokens

| Necesidad | Del toolkit | Tokens |
|---|---|---|
| Columnas estándar | `Container` / `Col` (sin cambios) | `--total-columns`, `--grid-gutter`, `--container-*` |
| Texto | `Text` (todas las variantes existentes) | `--color-*` vía `textColor` |
| Acciones y campos | `Button`, `Input`, `Textarea`, `Icon` | — |
| Pila, fila, proporción, rejilla automática, grid con superposición | **No existen en el toolkit** → primitivas propias | `--space-*`, `--section-y*`, `--radius-md` |

Justificación del markup propio: el toolkit solo trae `Container`/`Col` para layout, sin `gap`,
proporción, superposición ni salida a sangre. Por eso existe la spec.

## Ajustes a la spec (se aplican en T-03)

1. **AC-3:** `home__hero-actions` sale de la lista de clases prohibidas. Su layout pasa a
   `Cluster`, pero la clase queda como gesto (`margin-top` y área táctil de 44px), porque el
   stagger del hero cuenta a los hijos directos de `home__hero-body` y anidar cambiaría la
   animación.
2. **AC-5** se mide en `/dev/layout`, en la demo lado a lado de `Col` contra `Cell`. En la
   landing ya no queda un `Col` sin `push` comparable con el `Cell` del hero.
3. **AC-1** añade una comprobación del **estado de éxito del formulario**: llenarlo y enviarlo
   con Playwright, capturar `#agenda` antes y después y comparar con `cmp`.
4. **Alcance:** utilidad de medida `u-measure-*`, porque `home__measure` debe desaparecer
   (AC-3) y no es una primitiva de layout.

## Riesgos

| Riesgo | Qué se rompe | Mitigación |
|---|---|---|
| Hero de capas `absolute` a `Grid` | Altura, posición del titular o el CTA fuera del fold en `sm`; el AC-1 byte a byte falla | Se migra solo, en su propio paso, con `cmp` y medición del CTA (`--cta "#hero button"`). Si no da idéntico, se compara visualmente, se anota y se pide aprobación (regla de AC-1) |
| Orden de apilado en el hero: una celda con `position: relative` pinta encima de una hermana sin posicionar | El contenido queda debajo de la foto | `home__hero-media` y `home__hero-content` llevan `position: relative` y un z-index por orden explícito, como gesto |
| Subpíxeles: `Grid` reparte con fracciones y `Col` con porcentajes | Desfase de 1px; capturas distintas | AC-5 tolera ≤ 1px. En la landing solo el hero y `metodo` usan `Grid`; si `metodo` se desalinea, se vuelve a `Col` y se anota |
| `Cluster wrap` en los dolores | El texto salta debajo del icono | `wrap={false}` en `home__pain` y en la nota del formulario |
| Stagger del hero (`.home__hero-body > *:nth-child`) | Cambia el orden o la duración de las animaciones | `home__hero-body` conserva sus 4 hijos directos; se verifica `animationDelay` en el navegador |
| Toolkit sin `"use client"` | `/dev/layout` no compila como Server Component | La página delega en un Client Component |
| Dos copias de la escala (Sass y TS) | Un paso nuevo en una y no en la otra | Comentario cruzado y chequeo en SPEC-0005. AC-4 cubre el rechazo de valores fuera |
| `/dev/layout` es pública en producción | Un cliente la encuentra | `noindex` (decisión de la spec). Ocultarla en producción queda como opción para SPEC-0005 |

## Alternativas descartadas

- **Clases CSS sin componentes:** las descartó el usuario; sin tipos ni autocompletado.
- **`Grid` como envoltorio de `Container`:** no permite salir a sangre sin márgenes negativos.
- **Márgenes negativos para la salida a sangre:** frágiles con scroll horizontal (que `shot` vigila) y no resuelven la salida parcial.
- **`Section` para el footer:** P-2.
- **Una primitiva `Measure` o `Box`:** la medida es de texto, no de layout, y `Box` invita a reconstruir el `<div>` con props.
- **Primitivas en el toolkit desde ya:** decisión del usuario; primero se prueban en el repo.

## Impacto en la constitución

- [x] **Requiere ADR-0007**: cambia la regla 4 del contrato. Va antes de cualquier commit en `styles/` o `shared/`
- [x] `design.md` §5 y `conventions.md` se actualizan como consecuencia
