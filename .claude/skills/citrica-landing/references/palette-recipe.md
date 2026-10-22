# Receta de paleta: de 3–5 hex a `_palette.scss`

`styles/10-tokens/web/colors/_palette.scss` tiene 167 variables `$color-light-*` y 167
`$color-dark-*`, más `$color-text-white` y `$color-text-black`. **Se reasignan los
valores; los nombres no se tocan** — el hook `variables-de-paleta-alteradas` bloquea la
edición si añades, renombras o borras uno ([ADR-0005](../../../../docs/04-decisions/0005-arranque-de-marca.md)).

## Entrada

De la tarjeta elegida:

| Entrada | Va a | Obligatoria |
|---|---|---|
| Color de acción (CTA) | `primary` | sí |
| Color de estructura / tinta | `secondary` | sí |
| Acento puntual | `tertiary` | no — se deriva |
| Neutro de fondo | `surface` | no — se deriva |
| Modo dominante | claro u oscuro | sí |

Si el usuario dijo "sugiere", la tarjeta propone los hex. Si dio menos de tres, deriva el
resto y márcalo `Supuesto` en la tarjeta.

## Landing oscura: el punto que más confunde

La landing consume las variables **`$color-light-*`** (el body pinta `var(--color-surface)`).
Para una landing de fondo oscuro (Aurora, Cyberpunk, Bento, Glass) **no** se cambia de
juego de variables: se escriben valores oscuros en `$color-light-surface*` y valores claros
en `$color-light-on-surface*`.

Lo mismo con `$color-text-black` / `$color-text-white`: el nombre es histórico.
`text-black` = color de texto principal, `text-white` = texto sobre `inverse`. En una
landing oscura, `text-black` toma un valor claro. `Section tone="inverse"` usa
`--color-text-black` como fondo: en una landing oscura eso da una sección clara, que es
exactamente el contraste que se busca.

`$color-dark-*` sigue la misma lógica para el modo oscuro del sistema; si la marca no lo
usa, deja una versión coherente (mismo hue) para no romper el admin ni el toggle.

## Receta por familia

Para cada rol de color `R` en `primary`, `secondary`, `tertiary`, `cuaternary`, `quinary`
(con la misma escala tonal 0–100 de luminosidad, conservando el hue):

| Variable | Valor |
|---|---|
| `R` | hex de entrada |
| `on-R` | blanco o `text-black`, el que dé ≥ 4.5:1 sobre `R` |
| `R-container` | `R` al 15–20 % sobre `surface` (tono ~90 en claro, ~30 en oscuro) |
| `on-R-container` | tono ~10 del hue (≥ 4.5:1 sobre `R-container`) |
| `R-fixed` | tono 90 |
| `R-fixed-dim` | tono 80 |
| `on-R-fixed` | tono 10 |
| `on-R-fixed-variant` | tono 30 (texto pequeño de color: ≥ 4.5:1 sobre `surface`) |

`cuaternary` y `quinary`: si no hay entrada, rota el hue de `tertiary` ±30°, o repite
`secondary` desaturado. Nunca los dejes con los valores de la marca anterior.

### Semánticos

`error`, `warning`, `success` (+ `on-`, `-container`, `on-…-container`): valores
estándar legibles. Solo se tiñen si el estilo lo pide (p. ej. Cyberpunk usa el magenta de
la marca para `error`).

### Superficies

| Variable | Valor |
|---|---|
| `surface` | neutro con 2–4 % del hue de `primary` |
| `surface-dim` / `surface-bright` | ±6 de luminosidad |
| `surface-container-lowest` → `-highest` | escalera de 5 pasos, 2–3 de luminosidad cada uno, alejándose de `surface` hacia el contraste |
| `on-surface` | texto principal (≥ 7:1 sobre `surface`) |
| `on-surface-var` | texto secundario (≥ 4.5:1 sobre `surface`) |
| `outline` | `on-surface` al ~40 % sobre `surface` (≥ 3:1: es borde de UI) |
| `outline-variant` | `on-surface` al ~15–20 % (divisor decorativo) |
| `inverse-surface` / `inverse-on-surface` | `on-surface` / `surface` intercambiados |
| `inverse-primary` | `primary` versión clara si la base es clara, oscura si es oscura |
| `scrim`, `shadow` | casi negro del hue (o negro) |

### Botones (`-btn-*`)

| Familia | bg | text | hover | border |
|---|---|---|---|---|
| `primary-btn` | `primary` | `on-primary` | `primary` −8 de luminosidad | = bg / = hover |
| `secondary-btn` | `secondary` o transparente con borde | `on-secondary` o `secondary` | tono +/−8 | `secondary` |
| `flat-btn` | `surface-container-high` | `on-surface` | `surface-container-highest` | transparente |

Neo-brutalismo: borde = `on-surface` en las tres.

### Campos (`-input-*`, `-select-*`, `-textarea-*`, `-calendar-*`)

Fondo `surface-container-lowest`, borde `outline`, borde hover/foco `primary`, texto
`on-surface`, placeholder `on-surface-var` (≥ 4.5:1 — no lo laves). `secondary-*` es la
variante sobre fondo `inverse`: invierte los papeles.

## Comprobar antes de escribir

Calcula estos pares y no escribas la paleta si alguno falla:

| Par | Mínimo |
|---|---|
| `on-primary` / `primary` | 4.5 |
| `primary-btn-text` / `primary-btn` | 4.5 |
| `primary-btn-text-hover` / `primary-btn-hover` | 4.5 |
| `on-surface` / `surface` | 7 |
| `on-surface-var` / `surface` | 4.5 |
| `text-white` / `text-black` (sección inverse) | 4.5 |
| `primary-input-placeholder` / `primary-input-bg` | 4.5 |
| `outline` / `surface` | 3 |
| `on-primary-fixed-variant` / `surface` | 4.5 |
| `primary` / `surface` (color de acción visible como UI) | 3 |

```bash
node -e '
const L=h=>{const c=h.match(/\w\w/g).map(x=>parseInt(x,16)/255).map(v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const r=(a,b)=>{const[x,y]=[L(a),L(b)].sort((m,n)=>n-m);return((x+.05)/(y+.05)).toFixed(2)};
for(const [a,b] of process.argv.slice(1).map(p=>p.split(":"))) console.log(a,b,r(a,b));
' FFFFFF:E8622C 111111:FAFAF7
```

Pasa los pares como `fg:bg` sin `#`.

## Después de escribir

1. `npm run contract` — sin aviso de deriva de nombres.
2. Sincroniza `config/site.ts` → `siteConfig.seo.colors` con `primary`/`surface`/texto.
3. Si el panel admin también rebrandea: `styles/10-tokens/admin/colors/_palette.scss`,
   misma receta. Si no, no lo toques.
