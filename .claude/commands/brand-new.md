---
description: Reinicia el repo para una marca nueva — borra la superficie anterior y sus specs, y rebrandea desde cero
argument-hint: <nombre-de-la-marca>
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion
---

Vas a levantar la marca **$1** sobre esta base, partiendo de limpio.

Este repo es una **base para proyectos**: cada marca nueva empieza borrando la anterior.
Ver [ADR-0005](../../docs/04-decisions/0005-arranque-de-marca.md) y
[docs/rebranding.md](../../docs/rebranding.md).

## 0. Confirma antes de borrar nada

**Para y pregunta.** Este comando destruye trabajo, y parte de él **no se recupera con
git** porque nunca se commiteó.

```bash
git status --short app/ docs/03-specs/
```

Todo lo que salga como `??` es **irrecuperable** una vez borrado. Enséñale al usuario la
lista concreta —no un resumen— y pídele confirmación explícita. Si hay trabajo sin
commitear que valga la pena conservar, ofrécele commitearlo o crear una rama antes.

No sigas sin un sí.

## 1. Borra la superficie de la marca anterior

```bash
# Secciones y página de la marca que se va
rm -rf app/home/components app/home/hooks

# La landing: Next necesita que el archivo exista
cat > app/page.tsx <<'EOF'
const HomePage = () => <div>PÁGINA PRINCIPAL</div>;

export default HomePage;
EOF
```

Y el SCSS de página, que se vacía sin borrar el archivo (su `@import` ya está en
`styles/custom.scss` y no queremos tocarlo):

```bash
: > styles/webpages-styles/home.scss
```

Revisa si quedó algo huérfano: assets de la marca anterior en `public/img/`, rutas que
importaban lo borrado, `styles/webpages-styles/*.scss` de marcas viejas.

## 2. Borra las specs

Se empieza limpio. Se conservan **solo** `_template/` y `README.md`:

```bash
ls docs/03-specs/
rm -rf docs/03-specs/[0-9][0-9][0-9][0-9]-*
```

Deja el índice de `docs/03-specs/README.md` con la fila de "sin specs todavía".

> **La numeración vuelve a `0001`.** Es la única excepción sancionada a la regla de que
> los números no se reutilizan: no se reutilizan *dentro* de un proyecto, y un arranque
> de marca empieza un proyecto nuevo. Los ADR **no** se borran: son la historia del
> harness, no del producto.

## 3. Redefine la intención

En este orden, porque cada uno alimenta al siguiente:

1. **`docs/product.md`** — el archivo canónico, y el que lee `impeccable`. Reescribe
   completas: `Register`, `Users`, `Product Purpose`, `Brand Personality`,
   `Anti-references`, `Design Principles`, `Accessibility & Inclusion`.
   No borres el encabezado `## Register` ni cambies su formato: se parsea literal.
2. **`docs/design.md`** — paleta, escala tipográfica, gestos de marca, layout, motion.
3. **`docs/01-design/brand.md`** — brand book largo. Opcional.

**Entrevista al usuario.** No inventes la marca: pregunta por el sector, el público, la
voz, las anti-referencias y los colores. Un brief inventado produce una marca genérica.

## 4. Baja los colores al render — la regla que más se incumple

> ⚠️ **Cambiar `docs/design.md` no cambia la pantalla.** El color que ejecuta el
> navegador vive en `styles/10-tokens/web/colors/_palette.scss` (y su gemelo en
> `admin/`). Mientras no toques ese archivo, la marca nueva se ve como la vieja.

Y al tocarlo, una sola regla:

**Se cambian los VALORES. Nunca los nombres.**

- ❌ No añadas variables. ❌ No renombres. ❌ No borres. ❌ No inventes `$color-brand-*`.
- ✅ Reasigna el hex de cada variable existente al de la marca nueva.
- ✅ **Recalcula las derivadas.** No basta con cambiar `$color-light-primary`: cada rol
  tiene su familia y todas salen del nuevo color base.

Para el primario, la familia completa:

```scss
$color-light-primary: <base de la marca>;
$color-light-on-primary: <texto legible sobre el base, ≥4.5:1>;
$color-light-primary-container: <tinte claro del base>;
$color-light-on-primary-container: <tono oscuro del base>;
$color-light-primary-fixed: …
$color-light-on-primary-fixed: …
$color-light-on-primary-fixed-variant: <versión oscura para texto pequeño, ≥4.5:1 sobre blanco>;
$color-light-primary-fixed-dim: …
$color-light-primary-btn: …        // y el resto de -btn, -input, -select, -textarea, -calendar
```

Lo mismo para `secondary`, `tertiary`, `cuaternary`, `quinary`, `surface`, `outline` y
los semánticos (`error`, `success`, `warning`). Y otra vez para `$color-dark-*` y para
`styles/10-tokens/admin/colors/_palette.scss` si el panel también rebrandea.

**El hook lo verifica.** La regla `variables-de-paleta-alteradas` compara el set de
nombres contra `git HEAD` y **bloquea la edición** si añades, renombras o borras alguna.
Si de verdad falta un rol de color, va con ADR — no con una variable suelta.

Comprueba al terminar:

```bash
npm run contract        # avisa si el set de nombres derivó
```

## 5. El resto del render

- **Tipografía:** `.ttf`/`.woff2` a `fonts/`, `@font-face` y slots `a/b/c/d` en
  `styles/01-settings/settings.scss`. No crees `--font-<nombre>`: cambia qué fuente vive
  en cada slot.
- **Escala:** `styles/10-tokens/web/components/_text.scss` si la tipografía nueva pide
  otros tamaños. Ojo con los pisos de legibilidad de la marca.
- **Forma:** `_form.scss` (radios), `_button.scss`.
- **Identidad:** `config/site.ts` — `name`, `description`, `navLinks`.
- **Assets:** logo y favicon a `public/img/`. Si el logo no existe todavía, **pídelo**;
  si no puede parar el trabajo, wordmark de texto marcado `TEMPORAL`. Nunca el default
  de la librería — el `Header` del toolkit sin `logo` pinta "Matour"
  ([ADR-0004](../../docs/04-decisions/0004-verificacion-visual-y-assets.md)).

## 6. Cierra el arranque

```bash
npm run typecheck && npm run lint:check && npm run contract
npm run dev  &&  npm run shot     # la marca nueva, vista de verdad
```

Actualiza la trampa del baseline en `CLAUDE.md` si los conteos cambiaron, y regenera el
sidecar con `/impeccable document` cuando los tokens estén puestos.

**La landing de la marca nueva no se construye aquí.** Eso es una spec: `/spec-new`.
Este comando deja el repo limpio y la marca definida; el flujo SDD hace el resto.
