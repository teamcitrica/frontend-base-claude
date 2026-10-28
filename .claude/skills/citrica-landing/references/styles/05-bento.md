---
name: Bento grid
comp: 05-bento.png
---

# Bento grid

Rejilla asimétrica de tarjetas modulares; cada tarjeta es una pieza autónoma (métrica,
gráfico, feature). Encaja con **C** (producto).

## 1. Paleta de entrada
<!-- hex-allowed -->
| Rol | Ejemplo |
|---|---|
| surface | `#09090B` (obsidiana) |
| tarjeta | `#18181B` (grafito) |
| texto | `#FFFFFF` |
| acentos locales | verde de estado, azul de badge |
<!-- /hex-allowed -->

## 2. Roles
- Landing **oscura**: `surface` obsidiana, `surface-container*` grafitos escalonados para
  las tarjetas.
- `primary`: el acento del CTA y de una métrica destacada.
- `tertiary`, `success`: acentos locales en badges y gráficos, nunca en grandes áreas.
- `outline-variant`: blanco al 10 %.

## 3. Tipografía
- **a (display/headline/title):** Geist · Onest, 600–700.
- **b (base) y d (body/subtitle):** la misma, 400.
- **c (label, botones):** la misma en mayúsculas, `letter-spacing: 0.16em`; `Geist Mono`
  para cifras grandes si se quiere, también en `c`.
- `_text.scss`: label en mayúsculas con tracking amplio; display en mayúsculas como la
  imagen.
## 4. Forma
`--radius-md: 24px` · `--form-radius-btn: 12px` · campos `12px`.

## 5. Gestos permitidos en `<slug>.scss`
- Tarjeta con relleno de gradiente radial tenue desde una esquina.
- Borde fino claro al 10 %; en hover, el borde sube al 20 % y aparece un halo del `primary`.
- Micro-gráfico (barras o línea) dibujado en SVG con `stroke: var(--color-*)`.

## 6. Primitivas típicas
`Grid`+`Cell` es obligatorio: `span={{ lg: 8 }}` + `span={{ lg: 4 }}`, celdas altas con
`row`, `rowGap={4}` · `Card` del toolkit dentro de cada celda · `Stack` interno.

## 7. Qué muestra la imagen y cómo se construye

La imagen es el **comp aprobado** cuando el usuario la elige: se reproduce su composición
región por región ([comp-led.md](../comp-led.md)). El copy se reescribe para la marca; la
posición, la escala y el material se respetan.

![Bento](05-bento.png)

| Región de la imagen | Kind | En este repo |
|---|---|---|
| Barra superior: estado + buscador | `chrome` | `Grid`: `Cell span={{lg:3}}` `.<slug>__card` con `Text label` + punto `success`; `Cell span={{lg:6}}` con `Input` |
| Celda hero grande (col 1–8): titular 3 líneas + bajada + botón gris | `text` | `Cell span={{lg:8}} row={{lg:2}}`, `.<slug>__card` con `radial-gradient` tenue; `Text display`; `Button variant="flat"` |
| Columna derecha: 3 tarjetas (proyectos, score con gráfica, equipo) | `text` | `Cell span={{lg:4}}` × 3 con `.<slug>__card`; cifra en `Text headline`; gráfica = SVG `path` con `stroke: var(--color-success)`; avatares = fotos de stock en `Media` redondo |
| Fila inferior: 5 tarjetas pequeñas con icono | `text` | `Cell span={{lg:3|4|2}}` con `Icon` del toolkit y `Text label` en mayúsculas |
| Fondo obsidiana, tarjetas grafito con borde 10 % | `texture` | `Section tone="base"` (surface oscuro), `.<slug>__card { border: 1px solid color-mix(in srgb, var(--color-text-black) 10%, transparent) }` |

Las cifras y gráficas de la imagen son decorativas: en la landing llevan datos reales o se marcan como de muestra.

## 8. Anti-patrones
- Celdas todas del mismo tamaño: eso es `AutoGrid`, no bento.
- Tarjetas vacías con solo un título (relleno decorativo).
- Métricas inventadas presentadas como reales: márcalas como sintéticas.
