# Build fiel a la imagen (comp-led)

Cuando el usuario elige una imagen —del catálogo o generada—, esa imagen es el **comp
aprobado**: un contrato espacial, no un mood board. impeccable lo mide; la skill lo
traduce al contrato del repo. Solo el usuario puede rebajar su autoridad, con sus palabras.

```bash
IMP=~/.claude/skills/impeccable/scripts
```

## 1. Registrar el comp

```bash
node $IMP/build-phase.mjs start --comp <ruta.png> --breakpoint 1440x900
node $IMP/build-phase.mjs status
```

Crea `.impeccable/build/state.json` con la fase `comps` saltada. Si ya hay un estado de
otro build, `--reset` primero. Ruta recomendada: copiar el PNG elegido a
`.impeccable/mocks/<slug>-approved.png` con un sidecar `.json` `{ "approved": true,
"source": "catalog:08-y2k" }`, y registrar esa copia.

## 2. Regiones

```bash
node $IMP/comp-spec.mjs --comp <png> --grid     # comp-grid.png con cuadrícula A–J / 0–9
node $IMP/comp-spec.mjs --comp <png> --auto     # spec.json por bandas
node $IMP/comp-spec.mjs --print
```

Mira `comp-grid.png` y corrige `--auto` con un `--regions regions.json` propio si las
bandas no coinciden con lo que ves. Kinds: `plate` (raster que hay que producir: figura
3D, ilustración), `image` (foto), `texture` (fondo: holográfico, malla, scanlines),
`text`, `control` (botón, campo), `chrome` (nav, marco), `band` (franja de sección).

Cada región va a la tabla "Comp aprobado" de `plan.md` con su traducción:

| Kind | En este repo |
|---|---|
| `text` | `Text variant` según tamaño medido por `font-match.mjs --measure <id>`; el copy del comp se **reescribe** para la marca, la escala y el peso se respetan |
| `control` | `Button` / `Input` del toolkit; su color desde `*-btn` / `*-input` de la paleta |
| `chrome` | `Header` del toolkit; marcos HUD o retículas → `.<slug>__*` con `clip-path`/bordes de tokens |
| `image` | foto de stock buscada (Unsplash, `curl -I`), dentro de `Media` con el `ratio` más cercano; marcada como de muestra |
| `texture` | `.<slug>__*` con `radial-/conic-/repeating-linear-gradient` sobre tokens ([style-to-render.md](style-to-render.md)); si la textura es fotográfica, recorte espejado del comp como fondo (`comp-spec --crop <id> --scale 2`) |
| `plate` | **sin generación de imágenes:** 1) foto de stock que ocupe el mismo lugar y silueta; 2) si es un objeto abstracto (blob, estrella, cromo), SVG propio con `fill` de tokens; 3) recorte del comp solo como última opción y marcado como de muestra. impeccable rechaza el recorte plano como plate: si el gate `plates` falla, ver §5 |
| `band` | `Section rhythm/tone` |

## 3. Fuentes

```bash
node $IMP/font-match.mjs --measure <region-de-titular>
node $IMP/font-match.mjs --rank <region> --text "<titular real>" --category sans
```

El ranking propone caras de Google Fonts cercanas a la del comp. Elige una que no esté en
la lista que impeccable prohíbe (ver SKILL.md) y cárgala con `next/font` en `lib/fonts.ts`
(slot `a` = display/headline/title; `b` base; `c` label/botones; `d` body/subtitle).

## 4. Medir el hero

Tras construir el hero (en `/spec-build`):

```bash
npm run shot -- /<ruta> --cta "#hero-cta"
node $IMP/comp-diff.mjs --comp <png> --build .shots/<slug>-lg-fold.png \
  --spec .impeccable/build/spec.json --out-dir .impeccable/review/diff/hero --json
node $IMP/build-phase.mjs record hero --build .shots/<slug>-lg-fold.png
node $IMP/build-phase.mjs advance
```

El gate pide ≥ 0.72 global, ninguna región `missing` y ningún veto duro. Abre
`side-by-side.png` y el `heatmap.png`: lo que esté en rojo es lo que no se parece. Dos
intentos como máximo; el tercero que solo mueve valores lo rechaza el script.

Al final del build, el mismo diff con `.shots/<slug>-lg.png` en `diff/final` y
`build-phase.mjs finish --disposition ship|fix|rebuild`.

## 5. Cuando la imagen pide lo que no se puede producir

Figuras 3D cromadas, ilustraciones a medida, mockups de producto inexistentes: sin
generación de imágenes no salen. **Una** pregunta al usuario, con las tres salidas:

1. Reemplazar por una foto real que ocupe su lugar (la opción normal en moda, comida,
   personas).
2. Dejar un hueco compositivo honesto (fondo de textura en su sitio, sin figura).
3. Configurar `OPENAI_API_KEY` y generar plates con `generate-image.mjs --plate <id>`.

Si elige 1 o 2 y el gate `plates` sigue fallando:

```bash
node $IMP/build-phase.mjs advance --force --reason "<sus palabras, citadas>"
```

Se anota en la bitácora de `tasks.md`. Nunca se fuerza sin preguntar.

## 6. Qué recibe el finish reviewer

Ruta del comp aprobado, `state.json`, `spec.json`, `diff/hero` y `diff/final`, el
Direction contract y las capturas. Es `/spec-build` quien lo lanza; esta referencia solo
deja los artefactos listos.
