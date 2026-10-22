---
name: Neo-brutalismo
cliche_risk: medio — amarillo+rosa+cian es el pack de stock; se diferencia por la paleta de la marca y la tipografía
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
- **a (display):** Archivo Black · Lexend Mega · Bricolage Grotesque (800).
- **b (texto):** Archivo · Work Sans.
- **c (UI/label):** la misma de b en 700, mayúsculas.
- **d (mono):** JetBrains Mono para etiquetas tipo sello.
- `_text.scss`: display en mayúsculas, `letter-spacing: -0.01em`, line-height ~0.95.
- No Space Grotesk (lista de impeccable).

## 4. Forma
`--radius-md: 0` (o `6px` como máximo) · `--form-radius-btn: 0` · `--form-radius-input: 0`.
Bordes de 2–4px en tarjetas, campos y botones (`_button.scss`: borde = `on-surface`).

## 5. Gestos permitidos en `home.scss`
- Sombra sólida desplazada abajo-derecha en tarjetas y CTA.
- Hover/press que mueve la tarjeta hacia la sombra (`translate` + sombra a 0).
- Diagonal de dos colores en un bloque (`linear-gradient` con parada dura).

## 6. Primitivas típicas
`Grid`+`Cell` para bloques de tamaño desigual · `Section` con fondo de bloque (clase
`.home__block--<rol>`) · `Stack gap={6}` · `Cluster` para etiquetas tipo sello.

## 7. Anti-patrones
- Sombras difusas o con blur: rompen el estilo.
- Gradientes suaves, vidrio, transparencias.
- Usar los tres colores en cada sección: uno domina por sección.
- **Romper el cliché:** la paleta sale de la marca, no del trío amarillo/rosa/cian por
  defecto; o la retícula se vuelve asimétrica en vez de cajas iguales.

## 8. Imagen de referencia
![Neo-brutalismo](02-neo-brutalism.png)
- Dos mitades de color plano con borde negro grueso y sombra sólida.
- Tipografía pesada en mayúsculas apretadas; el CTA es una caja negra.
- Etiquetas encajonadas como sellos.
