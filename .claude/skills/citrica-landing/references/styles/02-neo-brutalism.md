---
name: Neo-brutalismo
comp: 02-neo-brutalism.png
---

# Neo-brutalismo

Bloques planos de color saturado, bordes negros duros y sombras sólidas desplazadas.
Ruidoso a propósito. Encaja con **A** (conversión) y **C** (producto con actitud).

## 1. Paleta de entrada
<!-- hex-allowed -->
| Rol | Ejemplo |
|---|---|
| bloque 1 | `#FACC15` (amarillo) |
| bloque 2 | `#EC4899` (rosa neón) |
| bloque 3 | `#06B6D4` (cian) |
| surface | `#FFFFFF` |
| tinta / borde / sombra | `#000000` |
<!-- /hex-allowed -->

## 2. Roles
- `primary`: el bloque de color de la acción (CTA). `on-primary` = tinta negra.
- `secondary`: negro puro — bordes, sombras, texto.
- `tertiary` y `cuaternary`: los otros dos bloques, para fondos de sección y tarjetas.
- `outline` = `outline-variant` = negro. Nada de bordes grises.
- Fondo blanco o hueso; las secciones alternan bloques de color completos.

## 3. Tipografía
- **a (display/headline/title):** Archivo Black · Lexend Mega · Bricolage Grotesque 800.
- **b (base) y d (body/subtitle):** Archivo · Work Sans, 400. El cuerpo de la imagen es
  mono: si se quiere igual, `JetBrains Mono` en `d` **solo** para párrafos cortos; nunca
  para texto largo.
- **c (label, botones):** la de b en 700, mayúsculas.
- `_text.scss`: display en mayúsculas, `letter-spacing: -0.01em`, line-height ~0.95.
- No Space Grotesk (lista de impeccable).
## 4. Forma
`--radius-md: 0` (o `6px` como máximo) · `--form-radius-btn: 0` · `--form-radius-input: 0`.
Bordes de 2–4px en tarjetas, campos y botones (`_button.scss`: borde = `on-surface`).

## 5. Gestos permitidos en `<slug>.scss`
- Sombra sólida desplazada abajo-derecha en tarjetas y CTA.
- Hover/press que mueve la tarjeta hacia la sombra (`translate` + sombra a 0).
- Diagonal de dos colores en un bloque (`linear-gradient` con parada dura).

## 6. Primitivas típicas
`Grid`+`Cell` para bloques de tamaño desigual · `Section` con fondo de bloque (clase
`.home__block--<rol>`) · `Stack gap={6}` · `Cluster` para etiquetas tipo sello.

## 7. Qué muestra la imagen y cómo se construye

La imagen es el **comp aprobado** cuando el usuario la elige: se reproduce su composición
región por región ([comp-led.md](../comp-led.md)). El copy se reescribe para la marca; la
posición, la escala y el material se respetan.

![Neo-brutalismo](02-neo-brutalism.png)

| Región de la imagen | Kind | En este repo |
|---|---|---|
| Mitad izquierda: bloque amarillo con borde negro 4px | `band` | `Grid` + `Cell span={{lg:7}}`, `.<slug>__block--yellow` (fondo `tertiary`, borde `on-surface`) |
| Titular 3 líneas, negro, pesado | `text` | `Text variant="display"` |
| Cuerpo mono en mayúsculas | `text` | `Text variant="body"` (ver tipografía) |
| CTA caja negra con borde y sombra sólida | `control` | `Button variant="primary"` con `primary-btn` negro; `--form-radius-btn: 0`; sombra en `_button.scss` o `.<slug>__cta` |
| Mitad derecha: diagonal rosa/cian | `texture` | `Cell span={{lg:5}}` con `.<slug>__split { background: linear-gradient(135deg, var(--color-primary) 50%, var(--color-cuaternary) 50%) }` |
| Caja blanca "BUILD WITH US" con borde y sombra | `text` | `Stack` en `.<slug>__box` (borde 4px, `box-shadow: 8px 8px 0 var(--color-on-surface)`) |
| Etiqueta encajonada pequeña | `text` | `Text variant="label"` en `.<slug>__box--sm` |

No hay fotos: todo es color plano y tipografía. El contraste del rosa con texto negro debe pasar 4.5:1 (ajustar el rosa de entrada si no).

## 8. Anti-patrones
- Sombras difusas o con blur: rompen el estilo.
- Gradientes suaves, vidrio, transparencias.
- Usar los tres colores en cada sección: uno domina por sección.
