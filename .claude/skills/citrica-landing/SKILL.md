---
name: citrica-landing
description: Levanta una landing de marca nueva sobre esta base con nuestra forma de trabajar — pregunta solo brief, paleta y estilo (catálogo de 9 estilos o dirección de impeccable), propone 2–3 tarjetas de dirección, rebrandea el render y deja la spec 0001 lista para /spec-build. Úsala para "landing nueva", "marca nueva", "opciones de landing", "dirección visual" o "catálogo de estilos".
argument-hint: <marca>
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion
---

# Landing de marca nueva

Vas a levantar la landing de la marca **$ARGUMENTS** sobre esta base. Si no hay
argumento, pregunta la marca en la Fase 1.

Esta skill **reemplaza la entrevista de `/brand-new`** y ejecuta sus pasos de render desde
una dirección elegida. **No reemplaza los gates del SDD**: la spec se aprueba antes del plan,
el plan antes del código, y el código lo escribe `/spec-build`.
Ver [ADR-0008](../../../docs/04-decisions/0008-catalogo-de-estilos-landing.md).

Lo que ya trae decidido —no se pregunta—:
- El [contrato de implementación](../../../docs/01-design/implementation-contract.md):
  color solo desde tokens, texto solo con `Text`, layout solo con `Container`/`Col` y las
  primitivas de `shared/components/layout/`, toolkit antes que markup propio.
- Las reglas operativas de la skill `citrica-ui` (trampas de `Text`, `Icon`, `Header`).
- Dónde va cada archivo: [conventions.md](../../../docs/00-harness/conventions.md).

## Referencias de esta skill

| Archivo | Cuándo |
|---|---|
| [references/direction-card.md](references/direction-card.md) | Fase 2 y 5 — plantilla de tarjeta y su paso a Direction contract |
| [references/landing-structures.md](references/landing-structures.md) | Fase 2 — los 4 esqueletos con primitivas |
| [references/styles/](references/styles/) | Fase 2 — un archivo + imagen por estilo |
| [references/palette-recipe.md](references/palette-recipe.md) | Fase 4 — de 3–5 hex a `_palette.scss` |
| [references/style-to-render.md](references/style-to-render.md) | Fase 2, 4 y en el build — traducción del catálogo a tokens/primitivas |

Catálogo: `01-clean-saas` · `02-neo-brutalism` · `03-glassmorphism` · `04-swiss` ·
`05-bento` · `06-cyberpunk` · `07-luxury-editorial` · `08-y2k` · `09-aurora`.

---

## Fase 0 — Confirma antes de borrar nada

**Para y pregunta.** Esta skill destruye la superficie anterior, y parte de ella **no se
recupera con git** porque nunca se commiteó.

```bash
git status --short app/ docs/03-specs/
```

Todo lo que salga como `??` es **irrecuperable** una vez borrado. Enséñale al usuario la
lista concreta —no un resumen— y pídele confirmación explícita. Si hay trabajo sin
commitear que valga la pena conservar, ofrécele commitearlo o crear una rama antes.

No sigas sin un sí.

## Fase 1 — Brief en una sola ronda

Un único `AskUserQuestion` con estas cuatro preguntas (las opciones son ejemplos; el usuario
responde en "Other" con su texto):

1. **Negocio** — sector, público y la acción que debe hacer el visitante (CTA primario).
2. **Voz** — tres adjetivos y lo que la marca **no** debe parecer (anti-referencias).
3. **Paleta** — 3–5 hex (acción, estructura, acento, fondo, claro/oscuro) o "sugiere".
4. **Estilo** — uno del catálogo (usa los nombres de arriba; muestra la imagen de
   referencia si el usuario la pide) o **"que impeccable decida"**.

Antes de preguntar, lee `docs/product.md` y `docs/design.md`: si ya traen datos de esta
marca, no los vuelvas a pedir.

Lo que falte se **asume** y se marca como `Supuesto` en la tarjeta. No hay segunda ronda de
preguntas.

## Fase 2 — Genera 2–3 tarjetas de dirección

Lee `references/direction-card.md` y `references/landing-structures.md`.

**Con estilo de catálogo:** lee `references/styles/<estilo>.md` y mira su `.png`. Las
tarjetas comparten estilo, tipografía y forma, y varían en esqueleto, composición del hero,
gesto de firma y mapeo de paleta. Cada tarjeta rompe el cliché del estilo en al menos un
eje (sección 7 del archivo del estilo).

**Con "que impeccable decida":** ejecuta `/impeccable shape` con el brief de la Fase 1
como contexto (modo Persuade, superficie landing). Convierte las direcciones que proponga
en tarjetas con la misma plantilla. Si impeccable produce una seed key, va en el bloque
FORM. El contrato le gana a impeccable: sin `clamp()` en SCSS de página, sin paletas
OKLCH paralelas — la paleta baja a `_palette.scss` como en cualquier otro caso.

Todas las tarjetas:
- usan solo primitivas, componentes del toolkit y tokens existentes;
- no proponen fuentes de la lista de impeccable (Fraunces, Playfair Display, Cormorant,
  Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, Inter como display,
  DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans) salvo razón explícita;
- tienen el CTA primario en el primer viewport.

Muestra las tarjetas en pantalla. No las escribas a disco.

## Fase 3 — Elección

`AskUserQuestion` con una opción por tarjeta, más "mezclar" (el usuario dice qué toma de
cada una). Una sola iteración de ajuste; si después sigue sin convencer, vuelve a la Fase 2
con lo aprendido, no a la Fase 1.

## Fase 4 — Capa de render

Ejecuta los pasos 1–5 de [`/brand-new`](../../commands/brand-new.md) usando la tarjeta
elegida como brief. En resumen:

1. **Borra la superficie anterior:** `app/home/components`, `app/home/hooks`, placeholder en
   `app/page.tsx`, `styles/webpages-styles/home.scss` vacío (sin borrar el archivo). Revisa
   huérfanos en `public/img/`.
2. **Borra las specs** numeradas; conserva `_template/` y `README.md` (con la fila "sin specs
   todavía"). La numeración vuelve a `0001` ([ADR-0005](../../../docs/04-decisions/0005-arranque-de-marca.md)).
3. **Intención:** reescribe `docs/product.md` desde el brief (no toques el encabezado
   `## Register` ni su formato: se parsea literal; `Register` = brand) y `docs/design.md`
   desde la tarjeta, con una sección "Dirección vigente" que la cite. Actualiza las
   "Restricciones heredadas" de `docs/03-specs/_template/spec.md` si mencionan la marca anterior.
4. **Paleta:** `styles/10-tokens/web/colors/_palette.scss` con
   [palette-recipe.md](references/palette-recipe.md). **Solo valores.** Comprueba los 10
   pares de contraste antes de escribir.
5. **Resto del render:**
   - fuentes: `@import` de Google Fonts y `$font-family-a/b/c/d` en
     `styles/01-settings/settings.scss` (no inventes `--font-<nombre>`);
   - escala y casing: `styles/10-tokens/web/components/_text.scss` según la sección 3 del
     estilo;
   - forma: `foundations/_radius.scss`, `components/_form.scss`, `components/_button.scss`;
   - identidad: `config/site.ts` (`name`, `navLinks` del esqueleto, `seo.*`, `seo.colors`
     sincronizado con la paleta);
   - logo en `public/img/`; si no existe, pídelo, y si no puede parar el trabajo, wordmark
     de texto marcado `TEMPORAL`. Nunca el default del `Header` ("Matour").

Cierra la fase:

```bash
npm run typecheck && npm run lint:check && npm run contract
```

Typecheck en cero, lint y contrato sin violaciones nuevas, sin aviso de deriva de la
paleta. Después, `/impeccable document` para regenerar `.impeccable/design.json`.

## Fase 5 — Spec 0001 y Direction contract

```bash
cp -r docs/03-specs/_template docs/03-specs/0001-landing-<marca-en-kebab>
```

- **`spec.md`** — frontmatter (`id: 0001`, `superficie: landing`, `estado: draft`,
  `creada` = hoy). Problema y Por qué ahora desde el brief, en términos del visitante.
  Alcance = las secciones del esqueleto elegido. Fuera de alcance: admin, panel, páginas
  internas, contenido real que no se tenga (fotos, testimonios, cifras: se marcan como
  sintéticos). Criterios: un AC por sección + CTA dentro del fold en sm/md/lg + sin scroll
  horizontal + contraste. Restricciones heredadas: las que aplican.
- **`/impeccable shape`** — obligatorio en PLAN ([ADR-0003](../../../docs/04-decisions/0003-impeccable-obligatorio.md)).
  Con estilo de catálogo, córrelo ahora: con `design.md` y la tarjeta ya escritos, hereda el
  mundo y solo resuelve jerarquía y composición por sección. Con "que impeccable decida", el
  `shape` de la Fase 2 ya cumple. Su salida entra al plan.
- **`plan.md`** — "Dirección de diseño" = la tarjeta íntegra + lo que aportó `shape`. Archivos: un
  `app/home/components/<seccion>.tsx` `[nuevo]` por sección, `app/page.tsx`,
  `styles/webpages-styles/home.scss`. Componentes y tokens: la primitiva y los componentes
  del toolkit de cada sección; cada gesto de `home.scss` con su traducción de
  `style-to-render.md`.
- **`tasks.md`** — T-01/02 preparación, T-03+ una tarea por sección → su AC, T-90..95 de
  la plantilla.
- **Índice:** fila en `docs/03-specs/README.md`.
- **Direction contract:** escribe el cuerpo del surface brief con el mapa de
  `direction-card.md` (6 bloques, ≤ 150 palabras) bajo `## Direction contract` y guárdalo con

  ```bash
  node ~/.claude/skills/impeccable/scripts/surface-brief.mjs write app/page.tsx <archivo-del-cuerpo>
  ```

  Si el script no existe o cambió de interfaz, escribe `.impeccable/surfaces/landing.md` a
  mano y anótalo en la bitácora de `tasks.md`.

**Gates:** enseña la spec y pide aprobación explícita antes de pasarla a `approved`. Luego
enseña plan y tasks y pide aprobación antes de `in-progress`. Si hay preguntas abiertas, la
spec no se aprueba.

## Fase 6 — Entrega

Para aquí. Dile al usuario:

> Ejecuta `/spec-build 0001-landing-<marca>` y después `/spec-verify 0001-landing-<marca>`.

`/spec-build` ya corre `/impeccable craft` sobre el Direction contract (como hay
`design.md` y contrato, impeccable **hereda el mundo** en lugar de abrir otro torneo de
conceptos), hace `npm run shot` y lleva la bitácora. Construir desde aquí duplicaría todo
eso y saltaría el momento en que el usuario aprueba el plan con la cabeza fría.

Cierra con una lista de lo generado: tarjeta elegida, archivos de render tocados,
resultado de typecheck/lint/contract, ruta de la spec y del surface brief, supuestos
pendientes de confirmar y contenido sintético a reemplazar.

---

## Reglas duras

- Nunca hex ni `rgba()` en `.tsx` ni en `styles/webpages-styles/`. Los hex de los archivos
  de estilo son **entrada para la paleta**, no valores para el código.
- Nunca una clase de Tailwind del catálogo en el código: se traduce con
  `style-to-render.md`.
- Nunca un nombre nuevo, renombrado o borrado en `_palette.scss`.
- Nunca `clamp()` ni `font-family` en SCSS de página.
- Nunca `<div>` para layout; los gestos van en `home.scss` bajo `.home__*`.
- Nunca métricas, clientes, precios o testimonios inventados presentados como reales.

## Por qué impeccable hereda en vez de competir

impeccable no acepta "carriles estéticos enlatados" cuando abre un mundo nuevo, pero ante
un **mundo establecido** —`docs/design.md` con identidad coherente y un surface brief con
Direction contract— lo hereda y solo resuelve composición y oficio. Por eso esta skill
escribe ambos **antes** del build: el estilo de catálogo se vuelve mundo de la marca, y
`/impeccable craft` y `/impeccable audit` trabajan dentro de él. Si el usuario eligió "que
impeccable decida", el mundo lo propuso impeccable en la Fase 2 y el resultado es el mismo.
