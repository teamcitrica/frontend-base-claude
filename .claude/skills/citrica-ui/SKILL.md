---
name: citrica-ui
description: Reglas y referencia para construir UI en este repo con citrica-ui-toolkit y los tokens de Citrica. Úsala al crear o editar cualquier componente, página o sección — landing o admin — y cuando haya que elegir entre un componente del toolkit y markup propio, o resolver un color, un tamaño de texto o un layout.
---

# Construir UI en este repo

Guía operativa. El contrato completo está en
`docs/01-design/implementation-contract.md`; esto es el atajo para escribir código.

## Antes de escribir markup

Pregúntate en este orden:

1. ¿Existe el componente en `citrica-ui-toolkit`? → úsalo
2. ¿Existe un organismo en `shared/components/organisms/`? → úsalo
3. ¿Es un layout? → `Container` + `Col`, siempre
4. Solo si nada de lo anterior aplica → SCSS propio, **con colores desde tokens**

## Las 4 reglas

### Color

```tsx
// ❌ nunca
<Icon color="#FFFFFF" />
<div style={{ background: '#111' }} />
.seccion { background: rgba(17,17,17,.9); }

// ✅ siempre
<Icon color="var(--color-on-primary)" />
.seccion { background: var(--color-text-black); }
.seccion--elevada { background: color-mix(in srgb, var(--color-text-black) 92%, var(--color-primary)); }
```

Los hex viven **solo** en `styles/10-tokens/web/colors/_palette.scss`.
Tokens disponibles: `--color-primary`, `--color-text-black`, `--color-surface`,
`--color-tertiary`, `--color-on-surface-var`, `--color-outline`,
`--color-outline-variant`, `--color-*-btn`.

Prohibidos los alias intermedios (`--im-orange`, `--brand-primary`).

> ⚠️ `docs/01-design/brand.md` §8 lista nombres como `--color-orange-500` y
> `--font-display`. **No existen en el código.** Es nomenclatura conceptual del brand
> book. Usa los nombres reales de arriba.

### Tipografía

```tsx
// ❌ nunca
<h1 className="text-6xl font-bold">Título</h1>
<p style={{ fontFamily: 'Anton' }}>…</p>

// ✅ siempre
<Text variant="display">Título</Text>
<Text variant="body" textColor="color-on-surface-var">Párrafo</Text>
```

> ⚠️ **`Text` tiene dos props de color y no son intercambiables.**
> `textColor="color-primary"` recibe el **nombre del token sin `--`** y el componente lo
> envuelve en `var(--…)`. `color` recibe un **valor CSS crudo**, así que solo acepta
> `var(--color-primary)` completo.
> Escribir `color="on-surface-var"` no da error ni viola el contrato, pero produce
> `style={{color:"on-surface-var"}}`: CSS inválido que el navegador descarta y el texto
> hereda el color del padre. Falla en silencio.

| `variant` | Rol | Familia |
|---|---|---|
| `display` | Hero | Anton, uppercase |
| `headline` | Título de sección | Anton, uppercase |
| `title` | Título de card/paso | Anton, uppercase |
| `subtitle` | Bajada | Lato |
| `body` | Párrafo | Lato |
| `label` | UI, botón, caption | Lato |

Anton nunca por debajo de 24px, nunca en párrafos. Sin `clamp()` ni `font-family` en
el SCSS de página — la escala vive en `_text.scss`.

### Botones

```tsx
<Button variant="primary" label="Agendar" onPress={handle} />
```

Variantes: `primary`, `secondary`, `flat`, `success`, `warning`, `danger`.
Para el panel admin: `isAdmin`. No re-estiles botones desde el SCSS de la página.

### Layout

```tsx
import { Container, Col } from 'citrica-ui-toolkit';

<Container>
  <Col cols={{ sm: 4, md: 6, lg: 12 }}>…</Col>   {/* ancho completo */}
  <Col cols={{ sm: 4, md: 3, lg: 6 }}>…</Col>    {/* mitad en tablet+ */}
  <Col cols={{ sm: 4, md: 2, lg: 4 }}>…</Col>    {/* tercios */}
</Container>
```

Breakpoints: `sm` = 4 columnas · `md` = 6 · `lg` = 12.
Nunca `<div>` con flex/grid a mano para estructura de página.

## Componentes del toolkit

`Button` · `Input` · `Select` · `Textarea` · `Text` · `Icon` · `Card` · `Modal` ·
`Carousel` · `Header` · `Container` · `Col`

Props completas: `docs/01-design/reference/citrica-ui-toolkit.md`

### Header — pásale siempre `logo`

```tsx
<Header logo={<img alt="Marca" src="/img/logo.svg" className="h-9 w-auto" />} … />
```

Sin la prop `logo` pinta un placeholder que dice **"Matour"** en blanco: sobre el header
blanco de la variante `basic` parece un logo roto. Si el asset no existe todavía,
pídelo o pon un wordmark de texto marcado `TEMPORAL` — nunca dejes el default.

Y para que su nav aparezca, `tailwind.config.js` tiene que escanear el toolkit:
`./node_modules/citrica-ui-toolkit/dist/**/*.{js,mjs}` en `content`. Sin eso las clases
`md:flex`/`lg:flex` no se generan y siempre sale la hamburguesa.

### Icon — la trampa más común

```tsx
<Icon name="Calendar" size={24} color="var(--color-primary)" />  // ✅ prop `name`
<Icon iconName="Calendar" />                                     // ❌ no existe
<Icon name="Calendar" color="primary" />                         // ❌ stroke inválido
```

`Icon` pasa `color` tal cual al SVG de Lucide (`stroke={color}`), así que necesita un
valor CSS completo: `var(--color-primary)`, no `primary`.

Nombres de [lucide.dev/icons](https://lucide.dev/icons/), en PascalCase.

## Dónde va cada archivo

| Creas… | Va en… |
|---|---|
| Atom / molecule genérico | ⛔ no aquí — vive en `citrica-ui-toolkit` |
| Organismo reutilizable | `shared/components/organisms/` |
| Componente de dominio | `shared/project-components/` |
| Sección de una sola página | `app/<ruta>/components/` |
| Acceso a datos | `app/hooks/` (nunca Supabase directo en un componente) |
| Token | `styles/10-tokens/` |
| Layout de la landing | `styles/webpages-styles/home.scss` (ya importado) |
| Layout de otra página | `styles/webpages-styles/<pagina>.scss` + `@import` en `styles/custom.scss` |

## Antes de escribir estilo propio

El SCSS de página es el **último** recurso. `styles/10-tokens/web/components/` ya cubre
botones, campos, calendario, acordeón y texto — **incluidos sus estados de hover y foco**.

El caso que más engaña es el foco: los campos lo marcan con `[data-focus="true"]`
cambiando `border-color`, no con `outline`. Si mides solo `outline` concluirás que no hay
indicador y lo taparás con uno peor. Al auditar un estado visual, mide sus cuatro
mecanismos: `outline`, `border-color`, `box-shadow`, `background-color`.

Y para auditar foco, tabula con teclado: `element.focus()` desde JS **no** dispara
`:focus-visible`, así que lees estilos que no se aplican.

Si tras comprobarlo el estilo de verdad falta, acota el selector a lo que falla. Un
`!important` sobre toda la superficie convierte un diagnóstico equivocado en regresión.

## Precedencia sobre `impeccable`

`impeccable` es obligatoria en PLAN (`shape`), BUILD (`craft`) y VERIFY (`audit`) cuando
hay superficie visual. Aporta criterio de diseño, no de implementación: **donde choque
con el contrato, gana el contrato.** En concreto, no escribas `clamp()` en
`styles/webpages-styles/` ni compongas paletas nuevas, aunque lo sugiera — el hook lo
bloquea y la fuente única es `_text.scss` / `_palette.scss`.
Ver [ADR-0003](../../../docs/04-decisions/0003-impeccable-obligatorio.md).

## Autoverificación

El hook `PostToolUse` corre solo en cada edición y bloquea si **añades** una violación
del contrato (compara contra `git HEAD`). Si te llega ese error, corrígelo — no lo
rodees.

Estado global:

```bash
npm run contract     # reporte por regla y por archivo
npm run typecheck    # tipos (npm run build NO verifica tipos)
npm run shot         # capturas + mediciones en sm/md/lg
```

`npm run shot` es la verificación visual del punto D de la DoD: scroll horizontal,
imágenes rotas, errores de consola y CTA dentro del fold. Míralas, no solo mires que
pase. Ver `docs/04-decisions/0004-verificacion-visual-y-assets.md`.

> Baseline: 36 hex en `.tsx` (`disponibilidad/weekly-schedule-manager.tsx`,
> `organisms/navbar.tsx`, `app/admin/page.tsx`, `organisms/drop-citrica.tsx`).
> Las otras cinco reglas están en cero. Es deuda conocida
> (`docs/04-decisions/0002-verificacion-pendiente.md`): no la repliques, y si tocas uno
> de esos archivos, déjalo limpio.
>
> `organisms/header.tsx` y `organisms/sidebar.tsx` ya no existen — eran organismos sin
> consumidores y se reemplazaron por `Header` y `Sidebar` del toolkit. Se llevaron 30 de
> las 68 violaciones originales.

## Más profundidad

- Reglas con ejemplos largos: `docs/01-design/reference/web-guide.md`
- Grid en detalle: `docs/01-design/reference/layout-system.md`
- Tokens: `docs/01-design/reference/tokens-system.md`
- Web nueva de cero: `docs/01-design/reference/new-web-playbook.md`
