# Del catálogo al render

El catálogo de estilos describe cada look con clases de Tailwind porque así circula en la
web. **En este repo ninguna de esas clases se escribe.** Esta tabla es la única
traducción autorizada: columna izquierda = lo que dice el catálogo o la imagen, columna
derecha = cómo se construye aquí.

Las clases de la columna "origen" no aparecen en ningún otro archivo de esta skill, ni en
las tarjetas, ni en el código. Si un agente las copia, viola la regla 4 del
[contrato](../../../../docs/01-design/implementation-contract.md).

## Dónde vive cada cosa

| Qué | Dónde | Regla |
|---|---|---|
| Color | `styles/10-tokens/web/colors/_palette.scss` | Solo valores, nunca nombres. Fuera de ahí: `var(--color-*)` o `color-mix()` sobre tokens |
| Tipografía | `styles/01-settings/settings.scss` (slots a/b/c/d) + `styles/10-tokens/web/components/_text.scss` | Nunca `font-family` ni `clamp()` en página |
| Forma | `foundations/_radius.scss`, `components/_form.scss`, `components/_button.scss` | Botones no se re-estilan desde la página |
| Espacio | `--space-N` (N×4px) y `Section rhythm` | Nada de Tailwind de spacing |
| Layout | `Container`/`Col` + `Section`, `Stack`, `Cluster`, `Media`, `AutoGrid`, `Grid`+`Cell` | Guía viva: `/dev/layout` |
| Gesto de marca | `styles/webpages-styles/home.scss`, clases `.home__*` | Solo gestos: sombras, scrims, fondos, keyframes. Prohibido flex/grid/gap ahí |

## Toolkit = cliente

Todo componente que importe `citrica-ui-toolkit` lleva `"use client"` arriba: el toolkit
no lo declara y desde un server component rompe (`createContext is not a function`). El
`page.tsx` de la ruta queda de servidor solo para `export const metadata = buildMetadata(…)`
y compone secciones cliente.

## Traducciones

### Layout

| Origen | En este repo |
|---|---|
| `max-w-7xl mx-auto px-*` | `Container` (ya limita a 1366px con padding lateral por breakpoint) |
| `grid grid-cols-1 md:grid-cols-3 gap-4` | `AutoGrid minItemWidth={240} gap={4}` si las celdas son iguales; `Grid` + `Cell span={{ md: 2, lg: 4 }}` si son asimétricas |
| bento asimétrico (`col-span-2 row-span-2`) | `Grid` + `Cell span={{ lg: 8 }} row={{ lg: 1 }}` y vecinas con `start`; misma `row` = superposición |
| `flex gap-4` / `flex-col gap-*` | `Cluster gap={4}` / `Stack gap={N}` |
| `flex justify-between items-center` | `Cluster justify="between" align="center"` |
| `aspect-video object-cover` | `Media ratio="16/10"` + `next/image fill` |
| imagen a sangre (`w-screen`, `-mx-*`) | `Cell breakout="full"` (o `wide-start` / `wide-end`) |
| `py-24` en sección | `Section rhythm="airy"` (96px) · `default` 64px · `tight` 40px |
| `bg-slate-50` en sección alterna | `Section tone="surface"` |
| sección oscura en página clara | `Section tone="inverse"` |

### Forma

| Origen | En este repo |
|---|---|
| `rounded-none` | `--radius-md: 0` en `_radius.scss`; `--form-radius-btn: 0` en `_form.scss` |
| `rounded-md` / `rounded-lg` | `--radius-md: 6px` / `8px` |
| `rounded-xl` / `rounded-2xl` / `rounded-3xl` | `--radius-md: 12px` / `16px` / `24px` |
| `rounded-full` en botones | `--form-radius-btn: var(--radius-pill)` |
| `border border-slate-200` | `border: 1px solid var(--color-outline-variant)` en una clase `.home__*` |
| `border-2 border-black` / `border-4` | `border: 2px solid var(--color-on-surface)` (o 4px) |
| `border-white/10` | `border: 1px solid color-mix(in srgb, var(--color-on-surface) 10%, transparent)` |

`Card` del toolkit tiene `radius` y `variant="bordered"`: pruébalo antes de una clase propia.

### Sombra y profundidad

| Origen | En este repo |
|---|---|
| `shadow-sm` | `box-shadow: 0 1px 2px color-mix(in srgb, var(--color-shadow) 8%, transparent)` |
| `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]` (brutalista) | `box-shadow: 4px 4px 0 var(--color-on-surface)` |
| `hover:translate-x-1 hover:translate-y-1` (brutalista) | `transform: translate(4px, 4px); box-shadow: 0 0 0 var(--color-on-surface)` en `:hover`, con `transition: transform var(--duration-fast) var(--ease-out)` |
| `shadow-2xl shadow-indigo-500/10` (halo difuso) | `box-shadow: 0 24px 64px color-mix(in srgb, var(--color-primary) 10%, transparent)` |
| `shadow-[0_0_15px_rgba(0,240,255,0.5)]` (neón) | `box-shadow: 0 0 16px color-mix(in srgb, var(--color-primary) 50%, transparent)` |

### Superficies especiales

| Origen | En este repo |
|---|---|
| `backdrop-blur-md` / `-xl` + `bg-white/10` (vidrio) | `.home__glass { background: color-mix(in srgb, var(--color-surface-bright) 10%, transparent); backdrop-filter: blur(16px); border: 1px solid color-mix(in srgb, var(--color-on-surface) 12%, transparent); }` |
| `bg-black/40 backdrop-blur-xl` (aurora) | igual, con `var(--color-surface-dim) 40%` y `blur(24px)` |
| malla de gradiente / aurora | `.home__aurora { background: radial-gradient(at 20% 30%, color-mix(in srgb, var(--color-primary) 45%, transparent), transparent 60%), radial-gradient(at 80% 20%, color-mix(in srgb, var(--color-tertiary) 40%, transparent), transparent 55%), var(--color-surface); }` + `@keyframes` lento (≥ 12s) con fallback en `prefers-reduced-motion` |
| degradado iridiscente / cromado (Y2K) | `linear-gradient` de 3–4 paradas, todas `var(--color-*)` o `color-mix()`; nunca hex |
| scanlines / retícula HUD | `repeating-linear-gradient(0deg, color-mix(in srgb, var(--color-primary) 6%, transparent) 0 1px, transparent 1px 4px)` como fondo de una `.home__*` |
| esquinas recortadas (HUD) | `clip-path: polygon(...)` en `.home__*` |
| fondo holográfico / iridiscente | `conic-gradient` o 2–3 `radial-gradient` con `color-mix` de `primary`, `tertiary`, `cuaternary`, `quinary` + `@keyframes` lento de `background-position`; estático con reduced-motion |
| figura 3D, cromo, blob, estrella grande | es un **plate**: foto de stock en su lugar, SVG propio con `fill` de tokens, o recorte del comp marcado de muestra. Ver [comp-led.md](comp-led.md) §2 y §5 |
| estrella ✦ / icono | `Icon name="Sparkle"` (Lucide), nunca un glifo de texto |
| hairline editorial `border-t border-stone-300/50` | `border-top: 1px solid color-mix(in srgb, var(--color-outline) 50%, transparent)` |
| líneas de retícula visibles (Swiss) | `border-inline-start: 1px solid var(--color-on-surface)` en celdas `.home__*`; nunca un `div` vacío para dibujar líneas |

### Tipografía

Las fuentes se cargan con `next/font/google` en `lib/fonts.ts` (un `@import url()` en SCSS
lo descarta Turbopack sin avisar). Cada fuente expone una variable y los slots de
`settings.scss` la consumen: `a` = display/headline/title · `b` = base del html ·
`c` = label y botones · `d` = body y subtitle. Mono o pixel solo en `c`, nunca en `d`.

| Origen | En este repo |
|---|---|
| titular cromado / degradado | `.<slug>__chrome-text { background: linear-gradient(…tokens…); -webkit-background-clip: text; background-clip: text; color: transparent; }` sobre un `Text`; permitido cuando la imagen lo muestra |
| `text-6xl font-bold` | `<Text variant="display">` (la escala vive en `_text.scss`) |
| `tracking-tight` / `-0.02em` | `letter-spacing: -0.02em` en `.text-display` / `.text-headline` de `_text.scss` |
| `tracking-widest text-xs uppercase` | `.text-label` con `letter-spacing: 0.16em; text-transform: uppercase` en `_text.scss` |
| `font-mono` para etiquetas | una fuente mono en el slot `d` y la variante que la use en `_text.scss` |
| sin mayúsculas en titulares | quitar `text-transform: uppercase` de `.text-display/.text-headline/.text-title` |

### Movimiento

| Origen | En este repo |
|---|---|
| `transition-all duration-200 ease-in-out` | `transition: <propiedad concreta> var(--duration-fast) var(--ease-out)` — nunca `all` |
| `duration-700` (zoom editorial) | `var(--duration-slow)`; si no alcanza, ajusta el token en `_motion.scss` |
| `group-hover:scale-105` | `.home__card:hover .home__card-media img { transform: scale(1.05); }` |

Toda animación con fallback en `@media (prefers-reduced-motion: reduce)`.
