# PLAN — SPEC-0003

> El *cómo*. Se escribe después de que la spec está `approved`, y se aprueba antes
> de escribir código.

## Enfoque

Tres pasos en orden estricto: **ADR → tokens → migración**. Primero se acepta ADR-0006
(la documentación describe el render) y se corrigen `design.md` y `brand.md`. Después se
crean los tokens en `styles/10-tokens/web/foundations/`, emitidos en `:root` con el mismo
patrón de mixin que `form-tokens`. Por último, `home.scss` cambia cada `--home-*` y cada
literal por su token equivalente, valor por valor. El éxito se mide igual que en
SPEC-0002: capturas idénticas byte a byte.

Superficie `infra`: no aplica `/impeccable shape` ([ADR-0003](../../04-decisions/0003-impeccable-obligatorio.md)).

## Evidencia de investigación (2026-10-20)

- **Sin colisiones de nombres.** `--space-*`, `--radius-md`, `--radius-pill`, `--duration-*`,
  `--ease-out`, `--measure-*` y `--section-y*` no aparecen ni en el repo ni en
  `citrica-ui-toolkit/dist`, `@heroui/theme/dist` o `tailwindcss/lib`.
- **Patrón de emisión existente:** `_form.scss` expone `@mixin form-tokens`, y
  `04-generic/generic.scss` lo importa y lo incluye dentro de `:root`. Se replica.
- **Inventario de `home.scss`:**
  - 8 tokens `--home-*` con 36 usos.
  - 3 × `border-radius: 12px` (l.241, 266, 292) y 1 × `2px` (anillo de foco, l.338).
  - 2 × `cubic-bezier(0.25, 1, 0.5, 1)`.
  - Duraciones: 460ms (rise), 400ms (draw), 200ms (hover).
  - Medidas 68ch y 52ch.
- **Trampa en `brand.md` §8:** su bloque conceptual define `--space-1: 8px … --space-16: 128px`
  y `--radius-card: 8px`. Con esta spec, `--space-1` **real** vale 4px. Un agente que copie
  ese bloque escribiría valores al doble sin error visible.

## Diseño de los tokens

```
styles/10-tokens/web/foundations/        [nuevo]
├── _space.scss     @mixin space-tokens    --space-1 … --space-32, --section-y*
├── _radius.scss    @mixin radius-tokens   --radius-md, --radius-pill
├── _motion.scss    @mixin motion-tokens   --duration-fast/base/slow, --ease-out
├── _measure.scss   @mixin measure-tokens  --measure-prose, --measure-narrow
└── _index.scss     @mixin foundation-tokens  (incluye los cuatro)
```

| Token | Valor | Reemplaza en `home.scss` |
|---|---|---|
| `--space-1` | 4px | `--home-space-2xs` |
| `--space-2` | 8px | `--home-space-xs` |
| `--space-3` | 12px | `--home-space-sm` |
| `--space-4` | 16px | — (escala) |
| `--space-6` | 24px | `--home-space-md` |
| `--space-8` | 32px | — (escala) |
| `--space-10` | 40px | `--home-space-lg` |
| `--space-12` | 48px | — (escala) |
| `--space-16` | 64px | `--home-space-xl` |
| `--space-24` | 96px | `--home-space-2xl` |
| `--space-32` | 128px | — (escala) |
| `--section-y-tight` | `var(--space-10)` | `.home__section--tight` |
| `--section-y` | `var(--space-16)` | `--home-section-y` |
| `--section-y-airy` | `var(--space-24)` | `.home__section--airy` |
| `--radius-md` | 12px | 3 × `border-radius: 12px` |
| `--radius-pill` | 999px | — (hoy solo en `--form-radius-btn`; ver nota) |
| `--duration-fast` | 200ms | transición de hover |
| `--duration-base` | 400ms | `home-draw` |
| `--duration-slow` | 460ms | `home-rise` |
| `--ease-out` | `cubic-bezier(0.25, 1, 0.5, 1)` | 2 × la curva |
| `--measure-prose` | 68ch | `.home__measure` |
| `--measure-narrow` | 52ch | `.home__measure--narrow` |

**Nota sobre `--radius-pill`:** se define porque ya existe en la pantalla (botones), y
`_form.scss` pasa a `--form-radius-btn: var(--radius-pill)`. Así nace con consumidor y
cumple la regla de la spec. El valor es el mismo (999px).

**Ritmo de sección:** hoy `.home` define `--home-section-y` y cada modificador lo
reasigna. Pasa a: `.home__section { padding-block: var(--section-y) }` y los modificadores
`--tight` y `--airy` asignan `padding-block` con su token. Misma especificidad, mismo
resultado.

**Se quedan como gesto de página** (con comentario `// gesto:` en la línea): 92svh del
hero; 15ch, 38ch y 12ch; 240px y 220px de `minmax`; 44px de área táctil; los delays del
stagger (40/110/180/250ms) y del subrayado (380ms); 0.14em y 0.04em; 14px de
`translateY`; 2px del anillo de foco; y los bordes de 1px y 2px.

## Archivos que se tocan

| Archivo | Qué cambia |
|---|---|
| `docs/04-decisions/0006-documentacion-refleja-render.md` [nuevo] | ADR: ante una discrepancia, el render manda y la doc se corrige; registra escala 4pt, radios y grid reales |
| `docs/04-decisions/README.md` | Fila de ADR-0006 |
| `docs/design.md` | Frontmatter: `rounded.card` e `input` pasan a 12px y 10px, `spacing.scale` a 4pt con nombres, `grid` a 1366/56/112. Además §5 (Grid, Spacing, Shape), §6 card (radio) y §7 (tokens de motion) |
| `styles/10-tokens/web/foundations/_space.scss` [nuevo] | Escala y ritmo |
| `styles/10-tokens/web/foundations/_radius.scss` [nuevo] | Radios |
| `styles/10-tokens/web/foundations/_motion.scss` [nuevo] | Duraciones y curva |
| `styles/10-tokens/web/foundations/_measure.scss` [nuevo] | Medidas de lectura |
| `styles/10-tokens/web/foundations/_index.scss` [nuevo] | `@mixin foundation-tokens` |
| `styles/04-generic/generic.scss` | `@import` de `foundations/_index.scss` e `@include foundation-tokens` en `:root` |
| `styles/10-tokens/web/components/_form.scss` | `--form-radius-btn: var(--radius-pill)` (mismo valor) |
| `styles/webpages-styles/home.scss` | Migración completa según la tabla. Sale el bloque de `--home-*` de `.home` |
| `docs/01-design/implementation-contract.md` | Mapa de archivos: fila "Espaciado, radios, motion y medida" |
| `docs/01-design/reference/tokens-system.md` | `foundations/` en el árbol, con la tabla de tokens |
| `docs/rebranding.md` | Paso 5 (Forma): `foundations/_radius.scss` como lo que cambia el carácter de la marca |
| `CLAUDE.md` | Fila en el mapa de documentación: tokens de fundamentos |

## Componentes y tokens

No se escribe UI. Lo que **se reutiliza**: el patrón `@mixin …-tokens` + `:root` de
`_form.scss` y `generic.scss`, y la escala de Tailwind, que ya es N × 4px, así que no hay
que configurarla.

Justificación del SCSS nuevo: son tokens, y su lugar por convención es `styles/10-tokens/`.
El toolkit no trae escala de espaciado.

## Riesgos

| Riesgo | Qué se rompe | Mitigación |
|---|---|---|
| Orden de cascada: `--section-y` en `:root` contra los modificadores de `.home__section` | Una sección con padding distinto (cambio visual) | Mismo selector y misma especificidad que hoy. AC-3 (`cmp` byte a byte) lo detecta |
| `animation` abreviada con `var()` dentro | Si el `var()` no resuelve, se pierde toda la animación del hero | Los tokens se definen en `:root` antes de que `home.scss` cargue. La captura `fold` del hero se toma con la animación terminada; AC-1 comprueba en el navegador que los tokens resuelven |
| El bloque conceptual de `brand.md` con `--space-1: 8px` | Agentes que copien ese ejemplo escribirían espaciados al doble | **Aceptado** (2026-10-20): `brand.md` es un ejemplo y se actualiza después. Los documentos operativos (`design.md`, contrato, `tokens-system.md`, `CLAUDE.md`) apuntan a los tokens reales |
| `_form.scss` es consumido por el toolkit (`--form-radius-btn`) | Si `--radius-pill` no está definido donde se lee `--form-radius-btn`, los botones pierden el pill | Ambos se emiten en el mismo `:root`, con `foundation-tokens` antes que `form-tokens`. Las capturas incluyen botones |
| Compilación sin `.next` limpio (no se puede `rm -rf`) | Capturas con CSS viejo en caché | Reiniciar `next dev`; Sass recompila al cambiar los imports. Si `cmp` da distinto, abrir el par antes de concluir |

## Alternativas descartadas

- **Un solo `_foundations.scss`.** Descartada: replica mal la estructura de `colors/` y `components/`; con un archivo por familia, la IA encuentra cada cosa por nombre.
- **Mantener `--home-space-*` como alias de `--space-*`.** Descartada: el contrato prohíbe los alias intermedios ([regla 1](../../01-design/implementation-contract.md)).
- **Configurar `theme.extend.spacing` en Tailwind apuntando a los tokens.** Descartada: la escala ya coincide (`gap-6` = 24px = `--space-6`); configurarlo solo añade una fuente de verdad más.
- **Emitir los tokens solo dentro de `.home`.** Descartada: es exactamente el problema que resuelve la spec.

## Impacto en la constitución

- [x] **Requiere ADR-0006**, que va **antes** de cualquier commit en `styles/` (AC-6). Cambia `design.md`; las cuatro reglas del contrato no cambian
- [ ] Rompe una regla del contrato: no
