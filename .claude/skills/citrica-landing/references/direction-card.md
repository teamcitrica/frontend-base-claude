# Tarjeta de dirección

Una opción de landing es una **tarjeta con imagen** en la página de decisión
([decision-page.md](decision-page.md)), no un bloque de markdown. Sus campos son los de
`serve-question.mjs`:

| Campo | Qué va |
|---|---|
| `id` | slug estable; vuelve en `ANSWER.optionId` |
| `label` | nombre de la dirección, 2–4 palabras |
| `thesis` | una frase: la idea que esta landing posee y lo que rechaza |
| `palette` | 3–5 hex de **entrada** (los que bajarán a `_palette.scss`) |
| `materials` | 2–4 gestos: "cromo", "hairlines", "borde 4px" |
| `viewport` | el primer viewport en una frase: qué va dónde y dónde está el CTA |
| `risk` | qué puede salir mal y cómo se nota en pantalla |
| `comp` | la imagen: PNG del catálogo o comp generado. Es lo que el usuario mira |
| `hero` | foto de inspiración (stock buscada) cuando no hay `comp` |
| `wireframe` | esquema `{cols, rows, regions[]}` cuando no hay imagen |
| `kicker` | `"THE ROLL"` en la que lidera el reparto de impeccable |

Lo que no cabe en la tarjeta (esqueleto, primitivas por sección, supuestos) va a
`plan.md`, no a la página.

## De la elegida al Direction contract

`.impeccable/surfaces/<…>.md`, bloque `## Direction contract`, 6 bloques, ≤ 150 palabras:

| Bloque | Sale de |
|---|---|
| THESIS | `thesis` |
| OWN-WORLD | `palette` como roles (no hex), tipografía elegida con `font-match`, forma, `materials` |
| STORY | qué entiende, cree y hace la visitante, en ese orden, desde el brief |
| FIRST VIEWPORT | **descripción literal de la imagen**: regiones de `spec.json` con su posición y escala, y dónde está el CTA |
| FORM | `comp:<ruta del png aprobado>` · `catalog:<id>` o la seed key de `concept-seed` |
| FINISH | literal: "unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance" |

El `steer` que escribió el usuario se añade como una línea "AJUSTE:" después de THESIS.
