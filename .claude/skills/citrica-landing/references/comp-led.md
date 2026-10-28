# Build fiel a la imagen (comp-led)

Cuando el usuario elige una imagen —del catálogo o generada—, esa imagen es el **comp
aprobado**: un contrato espacial, no un mood board. impeccable lo mide; la skill lo
traduce al contrato del repo. Solo el usuario puede rebajar su autoridad, con sus palabras.

```bash
IMP=~/.claude/skills/impeccable/scripts
```

## 1. Registrar el comp

```bash
$IMP/impeccable build-phase start --comp <ruta.png> --breakpoint 1440x900
$IMP/impeccable build-phase status
```

Crea `.impeccable/build/state.json` con la fase `comps` saltada. Si ya hay un estado de
otro build, `--reset` primero. Ruta recomendada: copiar el PNG elegido a
`.impeccable/mocks/<slug>-approved.png` con un sidecar `.json` `{ "approved": true,
"source": "catalog:08-y2k" }`, y registrar esa copia.

## 2. Regiones

```bash
$IMP/impeccable comp-spec --comp <png> --grid     # comp-grid.png con cuadrícula A–J / 0–9
$IMP/impeccable comp-spec --comp <png> --auto     # spec.json por bandas
$IMP/impeccable comp-spec --print
```

Mira `comp-grid.png` y corrige `--auto` con un `--regions regions.json` propio si las
bandas no coinciden con lo que ves. Kinds: `plate` (raster que hay que producir: figura
3D, ilustración), `image` (foto), `texture` (fondo: holográfico, malla, scanlines),
`text`, `control` (botón, campo), `chrome` (nav, marco), `band` (franja de sección).

Cada región va a la tabla "Comp aprobado" de `plan.md` con su traducción:

| Kind | En este repo |
|---|---|
| `text` | `Text variant` según tamaño medido por `font-impeccable match --measure <id>`; el copy del comp se **reescribe** para la marca, la escala y el peso se respetan |
| `control` | `Button` / `Input` del toolkit; su color desde `*-btn` / `*-input` de la paleta |
| `chrome` | `Header` del toolkit; marcos HUD o retículas → `.<slug>__*` con `clip-path`/bordes de tokens |
| `image` | foto de stock buscada (Unsplash, `curl -I`), dentro de `Media` con el `ratio` más cercano; marcada como de muestra |
| `texture` | `.<slug>__*` con `radial-/conic-/repeating-linear-gradient` sobre tokens ([style-to-render.md](style-to-render.md)); si la textura es fotográfica, recorte espejado del comp como fondo (`comp-spec --crop <id> --scale 2`) |
| `plate` | **sin generación de imágenes:** 1) foto de stock que ocupe el mismo lugar y silueta; 2) si es un objeto abstracto (blob, estrella, cromo), SVG propio con `fill` de tokens; 3) recorte del comp solo como última opción y marcado como de muestra. impeccable rechaza el recorte plano como plate: si el gate `plates` falla, ver §5 |
| `band` | `Section rhythm/tone` |

## 3. Fuentes

```bash
$IMP/impeccable font-match --measure <region-de-titular>
$IMP/impeccable font-match --rank <region> --text "<titular real>" --category sans
```

El ranking propone caras de Google Fonts cercanas a la del comp. Elige una que no esté en
la lista que impeccable prohíbe (ver SKILL.md) y cárgala con `next/font` en `lib/fonts.ts`
(slot `a` = display/headline/title; `b` base; `c` label/botones; `d` body/subtitle).

## 4. Medir el hero

Tras construir el hero (en `/spec-build`):

```bash
npm run shot -- /<ruta> --cta "#hero-cta"
$IMP/impeccable comp-diff --comp <png> --build .shots/<slug>-lg-fold.png \
  --spec .impeccable/build/spec.json --out-dir .impeccable/review/diff/hero --json
$IMP/impeccable build-phase record hero --build .shots/<slug>-lg-fold.png
$IMP/impeccable build-phase advance
```

El gate pide ≥ 0.72 global, ninguna región `missing` y ningún veto duro. Abre
`side-by-side.png` y el `heatmap.png`: lo que esté en rojo es lo que no se parece. Dos
intentos como máximo; el tercero que solo mueve valores lo rechaza el script.

Al final del build, el mismo diff con `.shots/<slug>-lg.png` en `diff/final` y
`build-impeccable phase finish --disposition ship|fix|rebuild`.

## 4b. Alinear antes de afinar

`comp-diff` escala el build al **ancho** del comp y compara las filas de arriba (el comp
es el primer viewport). Un comp de 1024×572 contra una captura de 1440×900 se compara a
1440×804: lo que en el comp está al 30 % de alto tiene que estar al 30 % de 804px en la
captura. Orden de trabajo, sin excepciones:

1. **Posición primero.** Lee `report.json` → `regions[].inkBox` (comp vs build): si la
   tinta del build está en otra fila, nada de tamaños todavía. Ajusta `padding-block` del
   grid del hero, `align="start"` en las `Cell` y los `gap` del `Stack` hasta que cada
   bloque caiga en su banda.
2. **Escala después.** Cap height medida × (ancho del build / ancho del comp) = cap
   height objetivo. `font-size ≈ cap / 0.7`. Elige la variante de `_text.scss` más cercana;
   si ninguna sirve, cambia **valores** de la escala (no clases en página).
3. **Copy al largo del comp.** Mismo número de líneas y de glifos ± 20 %; `max-width` en
   `ch` como gesto de página si hace falta.
4. Dos capturas con diff, y para. La tercera que solo mueve valores la rechaza el script.

Después de cada edición con `eslint --fix` **relee el archivo** antes del siguiente
reemplazo: el formateador cambia la indentación y un reemplazo textual deja de encontrar
su destino sin avisar.

## 5. Gates que no se pueden pasar: la skill los fuerza sola

Hay fallos de gate que no son defectos del build, sino consecuencias de decisiones ya
registradas o del contrato. La skill **no vuelve a preguntar**: construye la razón con las
palabras que el usuario ya dijo y fuerza.

| Gate | Causa legítima | Qué cita |
|---|---|---|
| `plates` | el usuario eligió foto/SVG/hueco en vez del plate del comp (decisión de la página de decisión o del plan) | la opción elegida, entre comillas |
| `hero` / `responsive` | el resto de la distancia viene del toolkit (`Header`, `Button`) o de una región reemplazada por decisión del usuario | la misma decisión + "the Header and Button are toolkit components the contract does not let us restyle" |

`impeccable build-phase` acepta `--force` solo si la razón **nombra al usuario**, **cita sus
palabras entre comillas**, **nombra el comp/plate/region** y lleva un **verbo de rebaja**
(`instead of`, `proceed`, `accept`, `skip`…). Plantilla que pasa:

```bash
$IMP/impeccable build-phase advance --force --reason \
  "The user chose \"<opción elegida>\" for the <id> plate instead of the comp's <qué era> and said \"<sus palabras>\": proceed past the plate and comp fidelity gates; the Header and Button are toolkit components the contract does not let us restyle."
```

Solo se pregunta cuando la decisión **no existe todavía** (ninguna opción registrada para
ese plate). Entonces, una vez, con las tres salidas: foto real en su lugar · hueco honesto
· `OPENAI_API_KEY` y `generate-impeccable image --plate <id>`. Todo se anota en la bitácora.

## 5b. Fases sin gate y `responsive`

`sections` y `motion` avanzan sin gate. `responsive` pide `.impeccable/review/desktop.png`
(1440 de ancho) y `mobile.png` (390): copia ahí `.shots/<slug>-lg.png` y
`.shots/<slug>-sm.png`. Mide el desktop contra el comp (≥ 0.65); si falla por las mismas
causas de §5, misma razón forzada.

## 5c. Lo que el finish reviewer va a pedir

Del segundo dry-run, para no repetirlo:

- **Kickers numerados** (`[01 COLECCIÓN]` sobre un titular) los rechaza el craft-floor
  aunque el mundo sea HUD; una línea separadora sin etiqueta visible pasa.
- **Chips de color:** `Text` pinta su propio color; el `color` de un modificador CSS no
  gana. Pasa `textColor="color-<rol>"` y usa `border: 1px solid currentColor`.
- **Texturas de texto** (columnas de dígitos, código): escríbelas como `Text` mono sobre
  el plate con `mix-blend-mode: screen`; un recorte plano del comp sale como un bloque
  opaco.
- **Titulares con `_`** no cortan: `<wbr />` tras cada guion bajo, no `overflow-wrap`.
- **Voz tipográfica:** si el comp tiene un titular condensado pesado, una sola cara ancha
  (Orbitron, Unbounded) en todo el slot `a` no lo reproduce. Reparte: `a` para
  display/title, `d` para headline y cuerpo con la condensada (`.text-headline` puede
  apuntar a `--font-family-d` en `_text.scss`).
- **`Text variant="headlinecustom"`** pinta `.text-headlinecustom`: esa clase tiene que
  existir en `_text.scss` (es la variante de cuerpo grande).
- **`hero-repro.png`** se captura al breakpoint declarado en `build-phase start`
  (1440×900 por defecto): a 1024 el grid del toolkit está en `md` y la composición cambia.
  Anótalo con `build-phase note` para que el reviewer no lo tome por captura equivocada.
- Lo que no pasa de ~55–60 % con el toolkit intacto: la barra de menú (`Header`), la masa
  visual del botón, el marco como hairlines. Son límites del contrato, no defectos: la
  skill los fuerza y los declara (§5).

## 6. Qué recibe el finish reviewer

Ruta del comp aprobado, `state.json`, `spec.json`, `diff/hero` y `diff/final`, el
Direction contract y las capturas. Es `/spec-build` quien lo lanza; esta referencia solo
deja los artefactos listos.
