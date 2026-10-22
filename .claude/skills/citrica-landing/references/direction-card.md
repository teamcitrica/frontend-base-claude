# Tarjeta de dirección

Cada opción de landing se presenta con esta plantilla, en pantalla (no en disco). Son 2 o
3 tarjetas; deben diferir en algo que se vea en el primer viewport, no solo en el texto.

## Qué varía entre tarjetas

- **Esqueleto** — de [landing-structures.md](landing-structures.md) (A/B/C/D, adaptado).
- **Composición del hero** — superposición `Grid`+`Cell`, split 6/6, `Media` a sangre con
  texto en `breakout`, texto solo a escala display.
- **Gesto de firma** — uno, de "Gestos permitidos" del estilo elegido.
- **Mapeo de paleta** — qué hex es acción, cuál estructura; fondo claro u oscuro.

Con estilo de catálogo, las tarjetas comparten estilo y tipografía y varían lo demás. Sin
estilo (impeccable decide), cada tarjeta es una dirección distinta salida de `shape`.

## Plantilla

```markdown
### <Letra> — <Nombre de la dirección, 2–4 palabras>

**Tesis.** <Una frase: la idea que esta landing posee y el arreglo por defecto que rechaza.>

**Estilo base.** <Nombre del catálogo · o "propia (impeccable)">
**Esqueleto.** <A/B/C/D> — <secciones en orden, con su primitiva principal>
**Hero.** <qué va dónde, a qué escala, dónde está el CTA; primitivas: Grid/Cell/Media…>
**Gesto de firma.** <uno; cómo se construye en `home.scss` con tokens/color-mix/keyframes>

**Paleta** (fondo <claro|oscuro>)
| Rol | Hex | Uso |
|---|---|---|
| primary | #… | CTA y acción |
| secondary | #… | estructura / tinta |
| tertiary | #… | acento puntual |
| surface | #… | fondo |

**Tipografía.** a: <display> · b: <texto> · c: <UI/label> · d: <mono o igual a b>
**Forma.** `--radius-md: …` · `--form-radius-btn: …` · bordes: <hairline|duros|ninguno>

**Por qué esta y no las otras.** <una línea>
**Riesgo.** <qué puede salir mal y cómo se nota en pantalla>
**Supuestos.** <lo que no dijo el usuario y se asumió — o "ninguno">
```

## De tarjeta a Direction contract

La tarjeta elegida se convierte en el `## Direction contract` de
`.impeccable/surfaces/landing.md` (6 bloques, ≤ 150 palabras, sin tono de mood board):

| Bloque | Sale de |
|---|---|
| THESIS | Tesis |
| OWN-WORLD | Paleta (roles, no hex) + Tipografía + Forma + Gesto de firma |
| STORY | Esqueleto: qué entiende, cree y hace el visitante, en ese orden |
| FIRST VIEWPORT | Hero, literal |
| FORM | `catalog:<estilo> · esqueleto <letra>` (o la seed key de `concept-seed.mjs` si decidió impeccable) |
| FINISH | Literal: "unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance" |

Y en `plan.md` de la spec 0001, sección "Dirección de diseño": la tarjeta íntegra.
