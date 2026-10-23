---
name: citrica-landing
description: Levanta la landing de una marca nueva (o una ruta nueva) sobre esta base con nuestra forma de trabajar — pide solo el brief, enseña en el navegador el catálogo de 9 estilos con imagen o deja que impeccable proponga, y construye fiel a la imagen elegida (comp-led) dentro del contrato. Úsala para "landing nueva", "marca nueva", "opciones de landing", "dirección visual", "catálogo de estilos".
argument-hint: <marca> [brief en una línea] [--ruta <slug>]
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion
---

# Landing fiel a una imagen

Vas a levantar la landing de **$ARGUMENTS**. El argumento trae la marca; opcionalmente
el brief en una línea y `--ruta <slug>`.

Lo que esta skill hace distinto de `/brand-new` + SDD a mano: pregunta **una** cosa, el
usuario **elige mirando imágenes**, y la landing se construye **medida contra la imagen
que eligió**. No reemplaza los gates del SDD: la spec se aprueba antes del plan, el plan
antes del código, y el código lo escribe `/spec-build`.
Ver [ADR-0008](../../../docs/04-decisions/0008-catalogo-de-estilos-landing.md).

Ya viene decidido y no se pregunta:
- El [contrato](../../../docs/01-design/implementation-contract.md): color desde tokens,
  texto con `Text`, layout con `Container`/`Col` y las primitivas de
  `shared/components/layout/`, toolkit antes que markup propio.
- Las reglas operativas de la skill `citrica-ui` y dónde va cada archivo
  ([conventions.md](../../../docs/00-harness/conventions.md)).
- La paleta y la tipografía salen del estilo elegido; el brief solo las ajusta.

## Referencias

| Archivo | Cuándo |
|---|---|
| [references/decision-page.md](references/decision-page.md) | Fase 2 — payload de la página de decisión, fallback a chat, ronda de impeccable |
| [references/comp-led.md](references/comp-led.md) | Fase 4 y build — registrar el comp, regiones, fuentes, medir el hero, plates imposibles |
| [references/styles/](references/styles/) | Fase 3 y 4 — un archivo + imagen por estilo, con la tabla región → repo |
| [references/palette-recipe.md](references/palette-recipe.md) | Fase 3 — de la paleta de entrada a `_palette.scss` |
| [references/style-to-render.md](references/style-to-render.md) | Fase 3 y 4 — gestos del catálogo a tokens, fuentes con `next/font`, toolkit cliente |
| [references/direction-card.md](references/direction-card.md) | Fase 4 — de la tarjeta elegida al Direction contract |
| [references/landing-structures.md](references/landing-structures.md) | Solo ruta "impeccable propone" sin imagen |

Catálogo: `01-clean-saas` · `02-neo-brutalism` · `03-glassmorphism` · `04-swiss` ·
`05-bento` · `06-cyberpunk` · `07-luxury-editorial` · `08-y2k` · `09-aurora`.

---

## Fase 0 — Modo

**Sin `--ruta` = marca nueva.** Destruye la superficie anterior. Copia literal del paso 0
de [`/brand-new`](../../commands/brand-new.md):

```bash
git status --short app/ docs/03-specs/
```

Todo lo que salga como `??` es irrecuperable una vez borrado. Enséñale al usuario la
lista concreta y pide confirmación explícita. No sigas sin un sí.

**Con `--ruta <slug>` = ruta nueva, sin borrar nada.** La landing vive en `app/<slug>/`,
el SCSS en `styles/webpages-styles/<slug>.scss` (clases `.<slug>__*`, `@import` en
`styles/custom.scss`), la spec toma el **siguiente número libre**, `docs/product.md` y
`docs/design.md` se **amplían** con una sección `Surface: /<slug>` en vez de reescribirse,
y `config/site.ts` no se toca. Aviso de una línea: paleta y fuentes son globales, así que
`/` también cambia de color y de letra.

## Fase 1 — Brief

Si el argumento trae el brief, **no preguntes nada**. Si no, una sola `AskUserQuestion`
con una pregunta: "¿Qué vende, a quién, y qué debe hacer la visitante?" con tres ejemplos
como opciones y la respuesta real en "Other". Lee antes `docs/product.md`: si ya describe
esta marca, tampoco preguntes.

Nada de voz, paleta, anti-referencias ni estilo por texto. Todo eso lo decide la imagen.

## Fase 2 — Elegir mirando

Sigue [decision-page.md](references/decision-page.md): escribe el payload de las 10
tarjetas (9 estilos con su PNG en `comp` + "Que impeccable proponga") en el scratchpad y
sirve la página:

```bash
node ~/.claude/skills/impeccable/scripts/serve-question.mjs --payload <payload.json> --timeout 900
```

Lee `ANSWER: {...}` de stdout. Exit 2 → no hay navegador: muestra los PNG en el chat con
`Read` y pregunta con `AskUserQuestion`. Exit 4 → cerró sin elegir: pregunta si repite.

- **Estilo del catálogo:** su PNG es el **comp aprobado**. No hay más rondas. El `steer`
  que haya escrito es un ajuste puntual y se anota.
- **"Que impeccable proponga":** ronda 2 de `decision-page.md` (`concept-seed.mjs
  --scope surface`, tres estructuras con `wireframe` + foto buscada; comps generados solo
  si existe `OPENAI_API_KEY`, avisando el coste). Lo que elija es el comp aprobado, o el
  wireframe si no hubo imagen (build code-led).

## Fase 3 — Render desde la imagen

Lee `references/styles/<estilo>.md` entero y mira su PNG.

1. **Superficie** (solo marca nueva): pasos 1–2 de `/brand-new` — borrar
   `app/home/{components,hooks}`, placeholder en `app/page.tsx`, vaciar `home.scss`,
   borrar specs numeradas conservando `_template/` y `README.md`.
2. **Intención:** `docs/product.md` (header `## Register` literal; `Register` = brand) y
   `docs/design.md` con una sección "Dirección vigente" que nombre el estilo, la imagen
   (`comp:`) y la tabla región → repo del archivo del estilo. En modo ruta, ampliar en vez
   de reescribir.
3. **Paleta:** "Paleta de entrada" del estilo → `_palette.scss` con
   [palette-recipe.md](references/palette-recipe.md). Solo valores. Comprobar los 10
   pares de contraste antes de escribir. Ajustar al brief solo si choca (color propio de
   la marca, claro/oscuro).
4. **Fuentes:** `lib/fonts.ts` con `next/font/google` (familias de la sección 3 del
   estilo; `font-match.mjs` afina cuando ya hay `spec.json`), variables `--font-brand-*`
   en `<html>` (`app/layout.tsx`), slots `$font-family-a/b/c/d` en `settings.scss`.
   **Nunca `@import url()`** en SCSS. Slots: `a` display/headline/title · `b` base ·
   `c` label y botones · `d` body y subtitle.
5. **Escala y forma:** `_text.scss` (casing, tracking, tamaños del estilo),
   `foundations/_radius.scss`, `components/_form.scss`, `components/_button.scss`.
6. **Identidad** (solo marca nueva): `config/site.ts` (`name`, `navLinks`, `seo.*`,
   `seo.colors` en sincronía con la paleta), logo en `public/img/` o wordmark `TEMPORAL`.

Cierre: `npm run typecheck && npm run lint:check && npm run contract`. Typecheck en cero,
sin violaciones nuevas, sin deriva de nombres en la paleta. Luego `/impeccable document`.

## Fase 4 — Spec y comp

```bash
cp -r docs/03-specs/_template docs/03-specs/<NNNN>-landing-<marca>
```

1. **Comp:** [comp-led.md](references/comp-led.md) §1–3 — `build-phase.mjs start --comp`,
   `comp-spec.mjs --grid` / `--auto`, revisar regiones contra la tabla del estilo,
   `font-match`. Si eligió wireframe (sin imagen): build code-led, saltar este punto.
2. **`spec.md`** — `superficie: landing`, `estado: draft`. Problema y Por qué ahora desde
   el brief. Alcance = regiones/secciones del comp. Fuera de alcance: admin, panel, páginas
   internas, contenido real que no se tenga (fotos, precios, cifras → de muestra). AC: uno
   por sección + CTA en el fold sm/md/lg + sin scroll horizontal + **hero ≥ 0.72 en
   `comp-diff`** (si hay comp).
3. **`/impeccable shape`** — obligatorio en PLAN (ADR-0003). Con comp aprobado y
   `design.md` escrito hereda el mundo: solo resuelve jerarquía y estados por sección.
4. **`plan.md`** — "Comp aprobado": ruta del PNG + tabla región → kind → cómo se
   construye (de `comp-led.md` §2 y del archivo del estilo), incluidas las fotos de stock
   verificadas para cada `image`/`plate`. Archivos: un `app/<ruta>/components/<seccion>.tsx`
   por sección, `page.tsx`, `<slug>.scss`. Componentes y tokens por sección.
5. **`tasks.md`** — T-01/02 prep, T-03+ una por sección → AC, una tarea "medir hero con
   `comp-diff`" antes de las secciones, T-90..95.
6. **Direction contract** — `direction-card.md` → `.impeccable/surfaces/` vía
   `surface-brief.mjs write app/<ruta>/page.tsx <cuerpo>` (a mano si el script falla).
   FIRST VIEWPORT = la imagen descrita región por región; FORM = `comp:<png>`.
7. Fila en `docs/03-specs/README.md`.

**Gates:** enseña la spec y pide aprobación explícita (`approved`); luego plan y tasks
(`in-progress`). Con preguntas abiertas no se aprueba.

## Fase 5 — Entrega

Para aquí y di:

> Ejecuta `/spec-build <NNNN>-landing-<marca>` y después `/spec-verify`.

`/spec-build` corre `/impeccable craft` **comp-led**: hero primero, `comp-diff` ≥ 0.72
contra la imagen, luego secciones, motion y responsive; el finish reviewer recibe el comp.
Construir desde la skill duplicaría eso y saltaría el momento en que el usuario aprueba
el plan con la cabeza fría.

Cierra con la lista de lo generado: imagen elegida, archivos de render tocados,
typecheck/lint/contract, ruta de la spec, del surface brief y de `.impeccable/build/`,
fotos de stock usadas y contenido de muestra a reemplazar.

---

## Reglas duras

- **La imagen elegida manda.** Si una regla de `craft-floor` (gradient text, sombra dura,
  vidrio, mayúsculas) choca con lo que la imagen muestra, gana la imagen, escrita con
  tokens. Solo el usuario rebaja la autoridad del comp, con sus palabras.
- Nunca hex ni `rgba()` en `.tsx` ni en `styles/webpages-styles/`. Los hex de los estilos
  y del payload son entrada para `_palette.scss`.
- Nunca una clase de Tailwind del catálogo: se traduce con `style-to-render.md`.
- Nunca un nombre nuevo, renombrado o borrado en `_palette.scss`.
- Nunca `clamp()`, `font-family` ni `@import url()` en SCSS.
- Nunca `<div>` para layout; los gestos van en `<slug>.scss` bajo `.<slug>__*`.
- Todo componente que importe `citrica-ui-toolkit` lleva `"use client"`; `page.tsx` queda
  de servidor solo para `metadata`.
- Nunca métricas, clientes, precios o testimonios inventados como reales. Fotos de stock
  siempre marcadas de muestra y verificadas con `curl -I`.
- No proponer fuentes de la lista de impeccable (Fraunces, Playfair Display, Cormorant,
  Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, Inter como display,
  DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans) salvo que `font-match`
  no dé otra cercana a la imagen.

## Por qué impeccable no compite con el catálogo

impeccable rechaza "carriles estéticos enlatados" cuando inventa un mundo, pero una
dirección fijada por el usuario le gana al azar siempre (`new-work.md` §3), y un comp
aprobado es un contrato espacial que solo el usuario puede rebajar. Por eso la skill fija
`design.md`, el Direction contract y el comp **antes** del build: `shape` hereda, `craft`
mide, el finish reviewer juzga contra la misma imagen.
