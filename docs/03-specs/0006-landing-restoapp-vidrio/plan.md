# PLAN — SPEC-0006

> El *cómo*. Se escribe después de que la spec está `approved`, y se aprueba antes
> de escribir código.

## Enfoque

Ruta nueva `app/test-2-corto/` con `page.tsx` de servidor (solo `metadata`) y secciones
cliente. El hero se construye primero y se mide con `comp-diff` contra
`.impeccable/mocks/test-2-corto-approved.png` antes de construir el resto. **Code-led**
(cambio en el build, decisión del usuario): sin seguimiento `build-phase`; el comp es
referencia de composición. Vidrio y luces son gestos `.test-2-corto__*` sobre tokens existentes; la paleta, las
fuentes y la escala globales no se tocan (decisión "Vidrio con colores Resto", ADR-0009).
Debajo del hero la página vuelve al papel crema del sistema.

## Comp aprobado

- **PNG:** `.impeccable/mocks/test-2-corto-approved.png` (catálogo `03-glassmorphism`,
  sidecar `.json` con `approved: true`).
- **Estado:** sin `state.json` (build code-led; el anterior quedó apartado). Breakpoint de medida 1440×900.
- **Spec:** `.impeccable/build/spec.json` + `.impeccable/build/regions.json`.
- **Medidas:** titular cap 33.5px en el comp → **≈47px a 1440** (ratio 1.406); bajada cap
  13.9px → ≈20px. Fuentes fijadas por el usuario (Oleo Script / Lora): `font-match --rank`
  solo entre candidatas de marca, anotado en `build-phase note`.

| Región | Kind | Cómo se construye |
|---|---|---|
| `ambient-ground` | texture | `Section rhythm="none"` + `.test-2-corto__ambient`: fondo `var(--color-on-secondary-container)` (azul profundo). **Sin raster**: decisión del usuario "Vidrio con colores Resto" (el raster del comp es pizarra/violeta) |
| `ambient-light` | texture | mismas `.test-2-corto__ambient`: 2–3 `radial-gradient` con `color-mix` de `--color-primary` (coral) y `--color-secondary-fixed-dim` (celeste), estáticos. Sin raster, misma decisión |
| `glass-stack` | chrome | `Grid` del hero: 3 `Cell` en la misma `row` con `start`/`span` distintos (dos paneles traseros desplazados + el frontal), `.test-2-corto__glass` (`backdrop-filter: blur(20px)`, fondo crema 10 %, borde crema 22 %, `--radius-md`) |
| `headline` | text | `Text as="h1" variant="display" textColor="color-text-white"` centrado: "Todo tu local, un solo cierre" (2 líneas) |
| `subhead` | text | `Text variant="subtitle" textColor="color-text-white"`: "Costo fijo mensual y cero comisión por cada venta." |
| `cta` | control | `Button variant="primary"` "Pedir demo por WhatsApp" + `.test-2-corto__glow` (halo `color-mix` de `--color-primary`) |
| `phone-mocks` | plate | **Sin raster**: dos `Media ratio="3/4"` con `.test-2-corto__glass .test-2-corto__phone` que contienen un ticket "Cierre de hoy" de muestra (`Text` + filas con punteado). Decisión del usuario: mocks con componentes, no captura inventada |
| `badge` | chrome | `Cluster` en `Cell start={{ lg: 10 }} span={{ lg: 3 }}` con `.test-2-corto__glass` pequeño: wordmark TEMPORAL + "Para restaurantes de Venezuela" |

En `sm`: un solo panel de vidrio, titular → bajada → CTA, y **un** mock más pequeño bajo
el CTA (decisión del usuario en shape). Badge oculto en `sm`.

## Archivos que se tocan

| Archivo | Qué cambia |
|---|---|
| `app/test-2-corto/page.tsx` | [nuevo] servidor: `buildMetadata({ title, description, path: "/test-2-corto" })`; wrapper `.test-2-corto` |
| `app/test-2-corto/components/site-header.tsx` | [nuevo] `Header` + wordmark TEMPORAL, CTA "Pedir demo" |
| `app/test-2-corto/components/hero.tsx` | [nuevo] composición del comp (ambiente, pila de vidrio, texto, CTA, mocks, badge) |
| `app/test-2-corto/components/mock-cierre.tsx` | [nuevo] contenido del mock: ticket "Cierre de hoy" de muestra |
| `app/test-2-corto/components/incluye.tsx` | [nuevo] entra (4) → sale (3), filas de ticket con `Icon` |
| `app/test-2-corto/components/precio.tsx` | [nuevo] ticket de precio con banda de total |
| `app/test-2-corto/components/cta-final.tsx` | [nuevo] `Section tone="inverse"` con CTA a WhatsApp |
| `app/test-2-corto/components/site-footer.tsx` | [nuevo] nota de valores de referencia y muestra |
| `styles/webpages-styles/test-2-corto.scss` | [nuevo] gestos `.test-2-corto__*`: tinta, ambiente, vidrio (+ `@supports` fallback), halo, teléfono, ticket, foco |
| `styles/custom.scss` | `@import './webpages-styles/test-2-corto.scss';` |

Se **reutiliza sin modificar** `app/test-1-sin-brief/components/cuenta.ts`
(`COSTO_FIJO_USD`, `MENSAJE_DEMO`, `abrirWhatsapp`, `formatUSD`): los valores de muestra
siguen en un solo lugar.

## Componentes y tokens

| Necesidad | Componente del toolkit | Tokens |
|---|---|---|
| Titular / títulos | `Text variant="display" / "headline"` | `--font-family-a`, `--color-text-white` / `--color-on-surface` |
| Bajada, cuerpo, cifras | `Text variant="subtitle" / "body" / "title"` | `--font-family-d` |
| CTA | `Button variant="primary"` | `--color-primary-btn*`, `--form-radius-btn`, borde `#04223F` (ADR-0009) |
| Iconos de canales | `Icon name=…` (Lucide) | `--color-secondary` |
| Precio | `Card` | `--color-surface-bright`, `--radius-md` |
| Layout | `Section`, `Grid`+`Cell`, `Stack`, `Cluster`, `AutoGrid`, `Media`, `Container`+`Col` | `--space-N` |

SCSS propio (gestos que ni toolkit ni primitivas cubren): vidrio, luces, halo, forma de
teléfono, fila de ticket. Todos con tokens y `color-mix()`; sin hex, sin `clamp()`.

## Riesgos

| Riesgo | Qué se rompe | Mitigación |
|---|---|---|
| Colores y fuentes de marca ≠ comp (pizarra/violeta, sans en mayúsculas) | `comp-diff` baja por color y tipo | Alinear primero posición (`inkBox`), luego escala; si no llega a 0.72 por esa causa, forzar el gate citando "Vidrio con colores Resto" (`comp-led.md` §5) |
| Gate `plates` (3 plates sin raster) | No avanza el build | Forzar con la decisión del usuario citada; anotar en bitácora |
| Texto crema sobre vidrio claro donde está la luz celeste | Contraste < 4.5:1 | Vidrio con tinte azul profundo, no crema puro; medir en el punto más claro con Playwright |
| `backdrop-filter` costoso o no soportado | Jank o vidrio invisible | Solo en el hero; `@supports not (backdrop-filter…)` → fondo azul opaco al 85 % |
| Oleo Script a ~67px en 2 líneas en `sm` | Empuja el CTA fuera del fold | `display` en sm es 44px; medir en T-06 |
| `Header` del toolkit sobre fondo oscuro | Nav ilegible | `Header` con `backgroundColor="var(--color-surface)"` (crema), igual que la variante 1 |
| Importar de otra ruta (`test-1-sin-brief`) | Si se borra esa ruta, se rompe esta | Aceptado para pruebas; si ambas sobreviven, mover `cuenta.ts` a `shared/project-components/` en otra spec |

## Alternativas descartadas

- **Recorte del comp como textura de fondo** — descartado: el raster es pizarra/violeta y
  el usuario eligió los colores de Resto.
- **Captura inventada de la app en los mocks** — descartado: no hay producto real que
  mostrar; un ticket de muestra con componentes es honesto.
- **Vidrio en todas las secciones** — descartado: la excepción de `design.md` lo acota al
  hero.

## Impacto en la constitución

- [x] `design.md` ya amplió la excepción "Paper Not Glass" acotada a `/test-2-corto`
  (decisión del usuario 2026-10-30). No requiere ADR nuevo: no cambia el contrato ni la
  marca, y lo cubre ADR-0008 (la imagen elegida manda en su ruta).
