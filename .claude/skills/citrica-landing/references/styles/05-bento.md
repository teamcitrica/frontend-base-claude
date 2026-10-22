---
name: Bento grid
cliche_risk: medio — negro+tarjetas redondeadas es la página de producto de 2024; se diferencia por qué contiene cada celda
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
- **a (display):** Geist · Onest (600–700).
- **b:** la misma, 400.
- **c (micro-etiquetas):** la misma en mayúsculas, `letter-spacing: 0.16em`.
- **d:** Geist Mono para cifras.
- `_text.scss`: label en mayúsculas con tracking amplio; display sin mayúsculas forzadas
  si la marca lo prefiere.

## 4. Forma
`--radius-md: 24px` · `--form-radius-btn: 12px` · campos `12px`.

## 5. Gestos permitidos en `home.scss`
- Tarjeta con relleno de gradiente radial tenue desde una esquina.
- Borde fino claro al 10 %; en hover, el borde sube al 20 % y aparece un halo del `primary`.
- Micro-gráfico (barras o línea) dibujado en SVG con `stroke: var(--color-*)`.

## 6. Primitivas típicas
`Grid`+`Cell` es obligatorio: `span={{ lg: 8 }}` + `span={{ lg: 4 }}`, celdas altas con
`row`, `rowGap={4}` · `Card` del toolkit dentro de cada celda · `Stack` interno.

## 7. Anti-patrones
- Celdas todas del mismo tamaño: eso es `AutoGrid`, no bento.
- Tarjetas vacías con solo un título (relleno decorativo).
- Métricas inventadas presentadas como reales: márcalas como sintéticas.
- **Romper el cliché:** fondo no negro (grafito cálido, verde muy oscuro, o claro), o
  celdas con contenido real del producto en vez de iconos genéricos.

## 8. Imagen de referencia
![Bento](05-bento.png)
- Celda hero grande a la izquierda y columna de métricas a la derecha.
- Micro-etiquetas en mayúsculas con tracking amplio en cada tarjeta.
- Color solo en el gráfico y en el punto de estado.
