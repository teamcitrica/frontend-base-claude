# PLAN — SPEC-0005

> El *cómo*. Se escribe después de que la spec está `approved`, y se aprueba antes
> de escribir código.

## Enfoque

Ruta nueva `app/test-1-sin-brief/` con un `page.tsx` de servidor (solo `metadata`) que
compone seis secciones cliente, una por archivo. La lógica de la cuenta (comisión, costo
fijo, ahorro, umbral, formato y enlaces de WhatsApp) vive en un módulo puro sin React,
así la calculadora, el precio y los CTA leen los mismos valores de referencia desde un
solo lugar. El build es **code-led** desde el wireframe aprobado: no hay comp contra el
que medir con `comp-diff`, así que el hero se mide con `npm run shot --cta` antes de
construir el resto.

## Comp aprobado

**No hay comp.** Ruta "Que impeccable proponga" sin `OPENAI_API_KEY` → se eligió un
**wireframe** (12 × 10), no una imagen. Seed de `concept-seed`:
`4dc13dc090c5e19b3ffb1ccabb2f24c3`. Foto de inspiración (de muestra, verificada `200
image/jpeg`): `https://images.unsplash.com/photo-1556742393-d75f468bfcb0`.

| Región (x, y, w, h) | Kind | Cómo se construye |
|---|---|---|
| Nav · Demo por WhatsApp (0, 0, 12, 1) | chrome | `Header` del toolkit, `logo` = wordmark temporal "Resto App" (`Text variant="headline"`, marcado TEMPORAL), `navItems` a las anclas, `onButtonClick` abre WhatsApp |
| Titular + CTA WhatsApp (0, 1, 6, 4) | text | `Grid` + `Cell span={{ lg: 6 }}`; `Text variant="display"` (Oleo Script), bajada `subtitle`, `Cluster` con dos `Button` |
| Calculadora (6, 1, 6, 4) | interactive | `Cell start={{ lg: 7 }} span={{ lg: 6 }}`; `Card` + `Input` del toolkit + ticket (`Stack` de filas `.test-1-sin-brief__ticket-row`) + banda de total |
| Foto mostrador (0, 5, 5, 3) | image | `Media ratio="4/3"` + `next/image fill`, foto de stock marcada de muestra |
| Entra → sale (5, 5, 7, 3) | diagram | `Grid`: `Stack` de 4 entradas → separador → `Stack` de 3 salidas; flecha con `Icon` Lucide, nunca un glifo |
| Precio fijo · contrato anual (0, 8, 6, 2) | text | `Card` en formato ticket con banda de total |
| CTA final + prueba 7 días (6, 8, 6, 2) | text | `Section tone="inverse"`; `Stack` + `Cluster` de dos `Button` |

En `sm` todo apila en este orden: titular → CTA → calculadora → foto → entra/sale →
precio → CTA final, para que el CTA quede en el primer viewport (AC-2).

## Archivos que se tocan

| Archivo | Qué cambia |
|---|---|
| `app/test-1-sin-brief/page.tsx` | [nuevo] servidor: `export const metadata = buildMetadata({ title, description, path: "/test-1-sin-brief" })`; compone las secciones dentro de `<div className="test-1-sin-brief">` |
| `app/test-1-sin-brief/components/cuenta.ts` | [nuevo] módulo puro: `COMISION_REFERENCIA = 0.15`, `COSTO_FIJO_USD = 120`, `WHATSAPP_NUMERO = ""` (muestra), `calcularCuenta(ventas)`, `umbralConveniencia()`, `formatUSD()` (es-VE, `USD 1.200`), `whatsappUrl(mensaje)` |
| `app/test-1-sin-brief/components/site-header.tsx` | [nuevo] `Header` + wordmark temporal |
| `app/test-1-sin-brief/components/hero.tsx` | [nuevo] titular "Haz la cuenta: ¿cuánto se te va en comisiones?", bajada, CTAs; monta `<Calculadora />` |
| `app/test-1-sin-brief/components/calculadora.tsx` | [nuevo] `Input` controlado, ticket de 3 líneas, banda de total con dos estados (ahorro / la comisión sale más barata), `aria-live="polite"` |
| `app/test-1-sin-brief/components/flujo.tsx` | [nuevo] foto + entra → sale |
| `app/test-1-sin-brief/components/precio.tsx` | [nuevo] ticket de precio |
| `app/test-1-sin-brief/components/cta-final.tsx` | [nuevo] sección `inverse` |
| `app/test-1-sin-brief/components/site-footer.tsx` | [nuevo] pie mínimo: marca, "valores de referencia" explicados, © |
| `styles/webpages-styles/test-1-sin-brief.scss` | [nuevo] solo gestos `.test-1-sin-brief__*`: color de tinta del wrapper, fila de ticket (punteado, cifra a la derecha), banda de total, flecha del flujo, sombra de papel. Sin flex/grid/gap, sin hex, sin `clamp()` |
| `styles/custom.scss` | `@import './webpages-styles/test-1-sin-brief.scss';` |

No se tocan: `app/page.tsx`, `app/home/**`, `config/site.ts`, `_palette.scss` ni los
tokens (ya escritos en la fase de render).

## Componentes y tokens

| Necesidad | Componente del toolkit | Tokens que consume |
|---|---|---|
| Titular del hero | `Text variant="display"` | `--font-family-a`, `--color-text-black` |
| Títulos de sección | `Text variant="headline"` | `--font-family-a` |
| Cifras, totales | `Text variant="title"` (Lora `lnum tnum`) | `--font-family-d`, `--color-on-surface` |
| CTA demo | `Button variant="primary"` | `--color-primary-btn*`, `--form-radius-btn`, `--form-border-size-btn` |
| CTA prueba 7 días | `Button variant="secondary"` | `--color-secondary-btn*` |
| Campo de ventas | `Input variant="primary"` (`type="text"`, `pattern="[0-9]*"`, `startContent="USD"`) | `--color-primary-input-*`, `--form-radius-input` |
| Tarjeta calculadora / precio | `Card` | `--color-surface-bright`, `--radius-md` |
| Flecha y canales | `Icon` (Lucide: `ArrowRight`, `Utensils`, `Store`, `Bike`, `Globe`, `ChefHat`, `Wallet`, `Landmark`) | `--color-on-surface` |
| Layout | `Section`, `Grid`+`Cell`, `Stack`, `Cluster`, `Media` | `--space-N`, `--section-y*` |

Lo que **no** existe en el toolkit y justifica SCSS propio:

- **Fila de ticket** (etiqueta izquierda, cifra derecha, punteado inferior): es el gesto de
  marca de `design.md` ("Ticket de cuenta"). Se compone con `Cluster justify="between"`;
  el SCSS solo pone `border-bottom: 1px dashed var(--color-outline)` y `text-align: end`.
- **Banda de total** en arena: fondo `var(--color-tertiary)`, radio `var(--form-radius-input)`.
- **Tinta del wrapper**: `.test-1-sin-brief { color: var(--color-on-surface); }` para que
  el texto suelto no herede el casi negro de HeroUI (AC-8), con alcance solo en esta ruta.

## Riesgos

| Riesgo | Qué se rompe | Mitigación |
|---|---|---|
| `Input` del toolkit no expone `inputMode` | En Android sale teclado de texto | `pattern="[0-9]*"` (iOS numérico); se filtra a dígitos en `onValueChange`; se comprueba en el shot `sm` |
| `Button` como enlace externo | El CTA no abre WhatsApp en pestaña nueva | `Button` hereda de HeroUI: `as="a"`, `href`, `target="_blank"`, `rel="noopener noreferrer"`. Si no compila, `onPress={() => window.open(url, "_blank", "noopener")}` |
| `Header.onButtonClick` sin `href` | El CTA del header no es enlace (sin "abrir en pestaña nueva") | `window.open(..., "noopener")`; se acepta |
| `wa.me/?text=` sin número | Algunos navegadores de escritorio sin WhatsApp muestran la página de wa.me | Aceptado como muestra (spec, pregunta resuelta); el número va en `WHATSAPP_NUMERO` |
| Oleo Script a 44px en `sm` con titular largo | El titular empuja el CTA fuera del fold | Titular corto; si no cabe, `display` → `headline` solo en `sm` por clase de la ruta, no tocando `_text.scss`; se mide en T-07 |
| Monto de 9 dígitos | La cifra desborda la tarjeta en `sm` | `overflow-wrap: anywhere` en la cifra + `tnum`; caso probado en T-06 |
| Coral en estado clave sobre crema (2.97:1) | Un estado solo coral no se distingue | Todo estado coral lleva borde o texto `#04223F` (ADR-0009) |

## Alternativas descartadas

- **Slider de ventas en lugar de campo** — descartado: el toolkit no trae slider, y la
  dueña sabe su número exacto; escribirlo es más rápido que arrastrar.
- **Calculadora en una sección aparte bajo el hero** — descartado: el wireframe aprobado la
  pone en el primer viewport, y es la tesis de la estructura elegida.
- **Ocultar el caso de ventas bajas** — descartado por el usuario: la banda muestra con
  honestidad cuándo la comisión sale más barata y desde qué monto conviene Resto App.

## Impacto en la constitución

- [x] Requiere ADR: [ADR-0009](../../04-decisions/0009-resto-app-reemplaza-impulso.md) —
  **ya escrito** antes de aprobar la spec (Resto App es la marca de la base, `/` hereda
  paleta y fuentes, excepción de contraste del CTA coral).
- Fuera de eso, el plan cabe en las reglas actuales.
