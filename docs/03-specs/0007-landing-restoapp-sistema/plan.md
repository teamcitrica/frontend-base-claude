# PLAN — SPEC-0007

> El *cómo*. Se escribe después de que la spec está `approved`, y se aprueba antes
> de escribir código.

## Enfoque

Primero el **sistema**, después la página. Los gestos que las dos rutas anteriores
escribían en su SCSS de página (ticket, fila punteada, cifra tabular, banda de total,
botón secundario sobre azul, tinta única y foco) pasan a **componentes de dominio** en
`shared/project-components/resto-app/`, con su estilo en `styles/08-components/` y
escrito solo con tokens. Lo que es del sistema (secundario sobre `inverse`) va a
`_button.scss`. La página `/test-3-sistema` solo **compone**: primitivas, `Text`,
toolkit y esos componentes, **sin un solo `className` de ruta**. Build code-led: no hay
comp; la referencia es "La cuenta clara" en `docs/design.md`.

## Shape — jerarquía y estados (`/impeccable shape`, 2026-10-30)

- **Modo y visitante:** *Persuade*. Dueño o encargado que abre el enlace desde
  WhatsApp en el **celular** (sm es el caso principal), con poca paciencia técnica. Éxito:
  pide la demo; plan B, la prueba de 7 días.
- **Tesis estructural:** la página es una cuenta que se va llenando. Arriba, el
  **cierre del turno** (todo cuadra en un ticket); en el medio, los renglones de la
  cuenta (canales → caos vs. un solo flujo → operación → finanzas → roles); al final,
  **la cuenta de la comisión** con la cifra que pierde hoy, que es el segundo momento
  focal. Después vienen las dudas y el cierre en azul.
- **Momentos focales:**
  1. El H1 en Oleo Script con el ticket "Cierre del turno" al lado (lg) o debajo de los
     CTA (sm).
  2. La cifra anual de comisiones en la calculadora (`title`, banda arena).
  El resto de la página es deliberadamente más plano: filas y tarjetas de papel.
- **Ritmo:** crema → crema → crema (filas) → crema (tarjetas) → crema (tickets) →
  **azul** (roles: el control vive en el tono serio) → crema (cuenta) → crema
  (preguntas) → **azul** (cierre + pie como un solo bloque). Las bandas de tono las da
  la primitiva `Section tone`, no clases.
- **Estados que importan:**
  - Calculadora: valores iniciales 8 000 y 15 % (ejemplo); campo vacío = 0 sin romper;
    ventas hasta 9 dígitos, % hasta 2; la cifra no se parte y cede el concepto;
    `aria-live="polite"` en el resultado.
  - CTA: foco visible en crema sobre azul y en azul sobre crema; presión visible; con
    `prefers-reduced-motion`, sin desplazamiento.
  - FAQ: todas cerradas al cargar, una abierta a la vez; foco de la cabecera visible.
  - Contenido de muestra: el ticket del hero y el ejemplo de $12 llevan la etiqueta
    "Muestra" / "Ejemplo" en el propio ticket, no en una nota al pie.
- **Anti-objetivos:** precio en la página, cifras de clientes, horas ahorradas, fotos de
  banco, vidrio, coral fuera de CTA y estados, clases de página.

## Secciones → composición

| # | Sección | Tono | Composición | Componentes de cuenta |
|---|---|---|---|---|
| 1 | Header | crema | `Header` del toolkit, `variant="basic"` | `BrandLogo`, `abrirWhatsapp` |
| 2 | Hero `#inicio` | base | `Grid`: copy `Cell` lg 7 · ticket `Cell` lg 5 (start 8); sm apilado | `DemoButton`, `TrialButton`, `TicketCard`, `AccountRow` ×4, `TotalBand` |
| 3 | Canales | base, `tight` | `Container`/`Col` + `AutoGrid` de 4 | `ChannelTag` (icono + nombre) dentro de `TicketCard` |
| 4 | Caos vs. un solo flujo `#flujo` | base | `Stack` de 4 filas comparativas; cabecera "Hoy / Con Resto App" en md+ | `CompareRow` ×4 |
| 5 | Operación en vivo `#operacion` | base | `AutoGrid` de 3 | `ModuleCard` ×3 |
| 6 | Finanzas y cierre | base | `Grid` 2 columnas lg | `ModuleCard` (tesorería) + `TicketCard` con `AccountRow` ×3 y `TotalBand` "Te queda" (Ejemplo) |
| 7 | Roles | **inverse** | `Container`/`Col`, `TicketCard` | `CompareRow` ×4 (rol + alcance · control) |
| 8 | La cuenta de la comisión `#cuenta` | base, `airy` | `Grid`: argumentos `Cell` lg 5 · calculadora `Cell` lg 6 (start 7) | `ModuleCard` ×3 (fijo, cero comisión, contrato + soporte), `AmountField` ×2, `AccountRow` ×2, `TotalBand`, `QuoteButton` |
| 9 | Preguntas `#preguntas` | base | `Container`/`Col` lg 8 | `Accordion` del toolkit (4) |
| 10 | Cierre | **inverse** | `Stack` centrado | `DemoButton`, `TrialButton` |
| 11 | Pie | **inverse** | `Container`/`Col` | `BrandLogo tone="light"` |

## Archivos que se tocan

| Archivo | Qué cambia |
|---|---|
| `shared/project-components/resto-app/cuenta.ts` [nuevo] | Lógica compartida: `comisionPerdida`, `leerDigitos`, `formatUSD` (con decimales opcionales), `porcentaje`, `whatsappUrl`, `abrirWhatsapp`, mensajes, `URL_PRUEBA`, `COMISION_EJEMPLO = 0.15`, `WHATSAPP_NUMERO = ""` |
| `shared/project-components/resto-app/landing-shell.tsx` [nuevo] | Envoltorio de landing: tinta única, selección y foco visible (`.c-landing`) |
| `shared/project-components/resto-app/brand-logo.tsx` [nuevo] | `next/image` del logo, `tone="default" \| "light"`, alt "Resto App" |
| `shared/project-components/resto-app/conversion-buttons.tsx` [nuevo] | `DemoButton`, `TrialButton`, `QuoteButton` sobre `Button` (`href` + `isExternal`) |
| `shared/project-components/resto-app/ticket-card.tsx` [nuevo] | `TicketCard` (`Card` + papel, con `tag` opcional "Muestra"/"Ejemplo") |
| `shared/project-components/resto-app/module-card.tsx` [nuevo] | `ModuleCard` (icono + título + texto) |
| `shared/project-components/resto-app/account-row.tsx` [nuevo] | `AccountRow`, `CompareRow`, `TotalBand`, `ChannelTag` |
| `shared/project-components/resto-app/amount-field.tsx` [nuevo] | `AmountField` (`Input`, prefijo/sufijo, solo dígitos, `maxDigits`) |
| `shared/project-components/resto-app/index.ts` [nuevo] | Barril de exportaciones |
| `styles/08-components/_resto-app.scss` [nuevo] | `.c-landing`, `.c-ticket`, `.c-ticket__tag`, `.c-row`, `.c-figure`, `.c-total`, `.c-module`, `.c-logo` — solo tokens |
| `styles/08-components/components.scss` | `@import` del parcial |
| `styles/10-tokens/web/foundations/_elevation.scss` [nuevo, desvío] + `_index.scss` | Token `--shadow-paper` (ver bitácora de `tasks.md`) |
| `styles/10-tokens/web/components/_button.scss` | `.o-section--inverse` reasigna `--color-secondary-btn-*` a la pareja crema (sistema, no página) |
| `app/test-3-sistema/page.tsx` [nuevo] | Servidor: `buildMetadata` + composición |
| `app/test-3-sistema/components/*.tsx` [nuevo] | Una por sección (`site-header`, `hero`, `canales`, `flujo`, `operacion`, `finanzas`, `roles`, `cuenta`, `preguntas`, `cierre`, `site-footer`) |
| `public/img/logo-resto-app.svg`, `logo-resto-app-light.svg` | Ya copiados (restoapp.club, revisados: sin scripts) |
| `docs/02-architecture/overview.md` | Ruta `/test-3-sistema` y `shared/project-components/resto-app/` |

**No se toca:** `/test-1-sin-brief`, `/test-2-corto`, `_palette.scss`, fuentes, `_text.scss`.
**No se crea:** `styles/webpages-styles/test-3-sistema.scss`.

## Componentes y tokens

| Necesidad | Componente | Tokens que consume |
|---|---|---|
| Titulares | `Text variant="display" / "headline"` | escala de `_text.scss` |
| Cifras | `Text` + `.c-figure` | `font-variant-numeric` (sin color propio) |
| CTA demo / cotizar | `Button variant="primary"` (`href` wa.me, `isExternal`) | `--color-primary-btn*`, `--form-radius-btn` |
| CTA prueba | `Button variant="secondary"` (`href` registro, `isExternal`) | `--color-secondary-btn*`; en `inverse`, la pareja crema |
| Tarjeta ticket | `Card` + `.c-ticket` | `--color-surface-bright`, `--radius-md`, `--color-shadow`, `--space-3` |
| Tag "Muestra" | `Text variant="label"` + `.c-ticket__tag` | `--color-surface-container-high`, `--radius-pill`, `--space-1/3` |
| Fila | `Cluster` + `.c-row` | `--color-outline`, `--space-3` |
| Banda de total | `Cluster` + `.c-total` | `--color-tertiary`, `--form-radius-input`, `--space-4`, `--duration-base` |
| Tarjeta de módulo | `Card` + `.c-module` | `--color-surface-bright`, `--color-outline-variant`, `--color-secondary` (icono) |
| Campo | `Input` del toolkit | `_input.scss` (56px, 16px, foco coral) |
| Logo | `next/image` + `.c-logo` | alto `--space-12` (48px) en el header, `--space-16` en el pie |
| FAQ | `Accordion` del toolkit | `_accordion.scss` |
| Tono de sección | `Section tone="inverse"` | `--color-text-black` + pareja crema |

**Markup propio justificado:** filas, banda de total, tag y tarjeta de módulo no existen
en el toolkit (son gestos de marca de "La cuenta clara"); se construyen con primitivas +
`Text` y viven una sola vez en `shared/`.

## Riesgos

| Riesgo | Qué se rompe | Mitigación |
|---|---|---|
| Reasignar el secundario en `.o-section--inverse` cambia otras páginas | Botones secundarios sobre azul en `/`, `/test-1-sin-brief`, `/test-2-corto` | Las dos rutas ya hacen exactamente eso con su clase local (mismo resultado); `npm run shot` de las tres como regresión |
| H1 largo en sm empuja el CTA fuera del fold | AC-4 | `display` de 44px en sm, bajada `subtitle`, `rhythm="tight"` en el hero; medir con `--cta` y, si no entra, partir el H1 en dos `Text` dentro del mismo `h1` |
| `Header` del toolkit quita el `outline` | Foco invisible (ya pasó en 0005) | `.c-landing :focus-visible` con `!important`, comprobado tabulando |
| `next/image` con SVG | Imagen rota o advertencia | Next sirve los SVG locales sin optimizar; `width`/`height` de atributo (513×351) para reservar el espacio. Si avisa en consola, `unoptimized` en `BrandLogo` |
| `Accordion` con grises de HeroUI | Texto fuera de la tinta | `_accordion.scss` ya tokeniza; verificar con barrido de `color` computado |
| `CompareRow` en sm con textos largos | Filas ilegibles | En sm apila "Hoy" sobre "Con Resto App" con su etiqueta; en md+ dos columnas |

## Alternativas descartadas

- **Un SCSS de página mínimo "solo para gestos"** — descartado: es exactamente lo que
  el brief prohíbe y lo que se repitió en 0005 y 0006.
- **Utilidades nuevas en `09-utilities/`** (`.u-dashed`, `.u-tabular`) — descartado:
  convierten el gesto en clases sueltas que cualquier página combina a mano; un
  componente con nombre de dominio es más difícil de usar mal.
- **Migrar ya las rutas 0005 y 0006** — fuera de alcance; queda como siguiente paso.
- **`window.open` en los CTA** — reemplazado por `href` + `isExternal`: enlace real,
  funciona sin JS y con clic medio. Solo el botón del `Header` (que solo acepta
  `onButtonClick`) usa `abrirWhatsapp`.

## Impacto en la constitución

- [x] Ninguno — el plan cabe dentro de las reglas actuales (`08-components` existe
  "para estilos de componentes propios que el toolkit no cubre"; `project-components`
  para lo atado al dominio, según `conventions.md`).
- [ ] Requiere ADR. Si el patrón "ruta sin SCSS de página" se adopta como norma, se
  escribe un ADR **después** de verificar esta spec, no antes.
