# Rebranding — levantar una marca nueva sobre esta base

Este repo es una **base para proyectos**. Este documento es el orden exacto en que se
cambia todo cuando arranca una marca nueva.

## La distinción que evita el error más común

| Capa | Archivos | Qué pasa si solo cambias esto |
|---|---|---|
| **Intención** | `docs/product.md`, `docs/design.md`, `docs/01-design/brand.md` | La pantalla **no cambia**. Son el brief que leen las personas y los agentes. |
| **Render** | `styles/10-tokens/`, `styles/01-settings/`, `fonts/` | La pantalla cambia. Es lo que el navegador ejecuta. |
| **Contenido** | `config/site.ts`, `app/page.tsx`, `public/img/` | Cambian textos, nav y assets. |

Cambiar solo `docs/product.md` **no rebrandea nada visualmente**. Hay que bajar a
`styles/`. Los tres niveles se cambian juntos, en el orden de abajo.

---

## Paso 0 — ¿Marca nueva sobre una base usada? Empieza limpio

Si el repo ya tiene una marca encima —landing construida, specs cerradas— no rebrandees
por encima: **arranca de cero** con

```
/brand-new <nombre-de-la-marca>
```

Borra la superficie anterior (`app/home/components`, `app/page.tsx`, el SCSS de página) y
**todas las specs**, conservando `_template/` y los ADR. Es destructivo y confirma antes.
Ver [ADR-0005](04-decisions/0005-arranque-de-marca.md).

Lo que sigue es el detalle de cada paso, y aplica igual venga de `/brand-new` o de un
rebranding incremental.

## Orden de ejecución

### Paso 1 — Estrategia · `docs/product.md`

Es el archivo canónico del brief y **el que lee la skill `impeccable`**. Secciones a
reescribir completas:

| Sección | Qué va |
|---|---|
| `## Register` | `brand` (landing/marketing, el diseño ES el producto) o `product` (app/admin/dashboard, el diseño SIRVE al producto). Determina qué guía usa impeccable. |
| `## Users` | Para quién es, quién construye, contexto, job-to-be-done |
| `## Product Purpose` | Propuesta de valor y cómo se ve el éxito |
| `## Brand Personality` | Tres palabras, arquetipo, voz y tono, meta emocional, north star de dirección de arte |
| `## Anti-references` | **No la saltes.** Lo que la marca *no* es. Es lo que más disciplina a un agente. |
| `## Design Principles` | 4–5 principios accionables, no adjetivos |
| `## Accessibility & Inclusion` | Piso de contraste y reglas de foco |

> ⚠️ No borres el encabezado `## Register` ni cambies su formato: `impeccable` lo parsea
> literalmente buscando `## Register` y leyendo la primera línea no vacía debajo.

### Paso 2 — Sistema visual · `docs/design.md`

El otro archivo que lee `impeccable`. Paleta, escala tipográfica, gestos de marca,
layout, componentes, motion, do's & don'ts.

Puedes escribirlo a mano, o generarlo desde el código con `/impeccable document` una vez
que los tokens del paso 3 estén puestos.

### Paso 3 — Color real · `styles/10-tokens/web/colors/_palette.scss`

**Este es el archivo que cambia la pantalla.** Fuente única de todos los hex de marca.

```scss
$color-light-primary: #E8622C;              // ← el naranja va aquí
$color-light-on-primary: #FFFFFF;
$color-light-primary-container: #FDEFE8;
$color-light-on-primary-container: #4A1A00;
// … secondary, tertiary, surface, outline, semánticos, y sus variantes -btn
```

Acompañantes en la misma carpeta:
- `_light-theme.scss` y `_dark-theme.scss` — mixins que emiten los `--color-*`
- `../../admin/colors/` — misma estructura para el panel administrativo

### La regla: se cambian los VALORES, nunca los nombres

Los **167 `$color-light-*`** (más otros tantos `dark`, más los 338 del admin) no son
etiquetas: son el contrato que consumen los mixins de tema, los tokens de componente y
todo el SCSS. Renombrar uno no renombra un color — deja `--color-primary` sin definir y
rompe sitios que nadie está mirando.

- ❌ No añadas · ❌ No renombres · ❌ No borres · ❌ Nada de `$color-brand-*`
- ✅ Reasigna el hex de cada variable existente
- ✅ **Recalcula las derivadas.** Cambiar `$color-light-primary` no basta: cada rol tiene
  su familia —`on-*`, `*-container`, `on-*-container`, `*-fixed`, `*-fixed-dim`,
  `on-*-fixed-variant`, y las de `-btn`, `-input`, `-select`, `-textarea`, `-calendar`— y
  todas salen del nuevo color base. Una familia a medias deja la marca nueva mezclada con
  la vieja en hovers y estados de error.

**Lo verifica el hook.** La regla `variables-de-paleta-alteradas` compara el set de
nombres contra `git HEAD` y **bloquea la edición** si difiere. No tolera baseline: o
coincide o no. Si de verdad falta un rol de color, va con ADR.

```bash
npm run contract   # avisa si el set de nombres derivó
```

### Paso 4 — Tipografía · `styles/01-settings/settings.scss` + `fonts/`

1. Copia los `.ttf`/`.woff2` nuevos a [`fonts/`](../fonts/)
2. Declara los `@font-face` (líneas ~30–110 de `settings.scss`)
3. Reasigna los slots (líneas ~114–123):

```scss
$font-family-a: 'Anton', Impact, sans-serif;      // display / headline / title
$font-family-b: 'Lato', 'Helvetica Neue', sans-serif;  // subtitle / body / label
$font-family-c: …    $font-family-d: …
$font-family-a-admin: 'Inter', sans-serif;        // panel admin
```

> Los slots se llaman `a/b/c/d` justamente para que la marca cambie sin renombrar nada.
> No crees `--font-anton`; cambia qué fuente vive en el slot `a`.

4. Ajusta la escala en `styles/10-tokens/web/components/_text.scss` si la nueva
   tipografía necesita otros tamaños por variante.

### Paso 5 — Forma · `styles/10-tokens/web/components/`

| Archivo | Qué controla |
|---|---|
| `_form.scss` | `--form-radius-btn` (pill), `--form-radius-input`, grosores de borde |
| `_button.scss` | Render de las variantes de botón |
| `_input.scss` · `_select.scss` · `_textarea.scss` | Campos |
| `_text.scss` | Escala tipográfica por variante |
| `_calendar.scss` · `_login.scss` | Superficies específicas |

### Paso 6 — Identidad del sitio · `config/site.ts`

```ts
export const siteConfig = {
  name: "New Project",          // ← nombre de la marca
  description: "…",             // ← metadata
  navLinks: [ { title: "…", href: "#…" } ],
};
```

### Paso 7 — Assets · `public/img/`

Logo, favicon, fotografía. Según los principios de la marca nueva, la fotografía suele
ser el activo que más define el resultado.

### Paso 8 — La página · `app/page.tsx` + `styles/webpages-styles/`

El contenido y el ritmo de sección.

**El SCSS de la landing va en `styles/webpages-styles/home.scss`**, que ya existe y ya
está importado. No crees un archivo por marca: reescribe ese. Así el rebranding no toca
`custom.scss` y te ahorras la trampa de abajo.

Crea un archivo nuevo solo si añades **otra página** (no otra marca). El SCSS de página
se reserva para ritmo de sección y gestos de marca que el toolkit no da; el grid
(`Container`/`Col`) más utilidades de Tailwind cubren la mayoría de los layouts.

> ⚠️ **Solo si creas un archivo nuevo: no se carga solo.** `globals.scss` **no** importa
> `webpages-styles/`; el import vive en [`styles/custom.scss`](../styles/custom.scss).
> Si no agregas la línea, escribes todo el SCSS y la pantalla no cambia — falla en
> silencio, sin error de build ni de consola.
>
> ```scss
> // styles/custom.scss
> @import './webpages-styles/sections.scss';
> @import './webpages-styles/home.scss';
> @import './webpages-styles/<marca>.scss';   // ← agrega esta línea
> ```

Aquí siguen aplicando las cuatro reglas del
[contrato](01-design/implementation-contract.md): en este archivo va **layout y ritmo**,
nunca hex ni `font-family`.

### Paso 9 — Brand book extendido · `docs/01-design/brand.md`

Opcional pero recomendado: el libro de marca largo (esencia, logo, fotografía, tono de
voz, checklist de coherencia).

> ⚠️ Si copias la estructura del actual, revisa su §8: lista variables CSS
> (`--color-orange-500`, `--font-display`…) que **no existen en el código**. Es
> nomenclatura conceptual. Los nombres reales son `var(--color-primary)`,
> `var(--font-family-a)`, etc.

### Paso 10 — Sidecar de impeccable · `.impeccable/design.json`

No lo edites a mano. Regenéralo con `/impeccable document` cuando los tokens estén
puestos. La skill avisa sola cuando `design.md` es más nuevo que el sidecar.

---

## Checklist

```
Intención
  [ ] docs/product.md          Register + Users + Purpose + Personality + Anti-refs + Principles
  [ ] docs/design.md           paleta, tipografía, gestos, componentes, motion
  [ ] docs/01-design/brand.md  brand book largo (opcional)

Render
  [ ] styles/10-tokens/web/colors/_palette.scss      ← el que cambia la pantalla
  [ ] styles/10-tokens/admin/colors/_palette.scss    ← si el panel también rebrandea
  [ ] fonts/ + styles/01-settings/settings.scss      ← @font-face + slots a/b/c/d
  [ ] styles/10-tokens/web/components/_text.scss     ← escala
  [ ] styles/10-tokens/web/components/_form.scss     ← radios y bordes

Contenido
  [ ] config/site.ts                    nombre, descripción, navLinks
  [ ] public/img/                       logo, favicon, fotografía
  [ ] app/page.tsx                      contenido
  [ ] styles/webpages-styles/home.scss   layout y ritmo de la landing (ya importado)

Cierre
  [ ] /impeccable document              regenera .impeccable/design.json
  [ ] docs/04-decisions/                ADR si cambió una regla del contrato
  [ ] Definition of Done                docs/00-harness/definition-of-done.md
```

## Compatibilidad con `impeccable`

La skill resuelve su contexto buscando `PRODUCT.md`/`product.md` **y**
`DESIGN.md`/`design.md` **en una misma carpeta**, en este orden:

1. La raíz del repo
2. `.agents/context/`, luego `docs/`  ← **aquí es donde están los nuestros**
3. `$IMPECCABLE_CONTEXT_DIR`

Por eso los dos canónicos viven en `docs/` con esos nombres exactos. **No los renombres
ni los muevas a una subcarpeta**: si `impeccable` no los encuentra, reporta
`NO_PRODUCT_MD` y arranca su flujo de init, que te va a re-entrevistar y sobrescribir el
brief.

Verificación rápida:

```bash
node ~/.claude/skills/impeccable/scripts/context.mjs
```

Debe imprimir el contenido de ambos archivos, no `NO_PRODUCT_MD`.

## Qué NO se toca al rebrandear

- `shared/components/organisms/` — consumen tokens; si están bien escritos, se
  rebrandean solos
- `citrica-ui-toolkit` — es un paquete de npm, no se edita aquí
- `styles/07-objects/` — el grid es estructural, no de marca
- `app/admin/`, `app/hooks/`, `shared/context/` — lógica, no marca
