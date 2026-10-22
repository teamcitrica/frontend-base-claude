---
name: Estilo suizo (tipográfico internacional)
cliche_risk: bajo — exigente; falla cuando la retícula es decorativa en vez de estructural
---

# Estilo suizo

Retícula matemática, jerarquía tipográfica rigurosa, cero decoración. La forma sigue a la
estructura. Encaja con **B** (editorial) y **A**.

## 1. Paleta de entrada
<!-- hex-allowed -->
| Rol | Ejemplo |
|---|---|
| surface | `#F8F9FA` (hueso) |
| tinta | `#111111` (carbón) |
| acento único | rojo suizo `#E63946` · ultramar `#0038FF` · ocre |
<!-- /hex-allowed -->

## 2. Roles
- `primary`: el acento único. Aparece poco: CTA y un bloque geométrico.
- `secondary`: carbón — texto, líneas de retícula, todo lo demás.
- `tertiary`: igual a `secondary` o un gris neutro; no hay tercer color.
- `outline` = `outline-variant` = tinta (líneas visibles al 100 %).

## 3. Tipografía
- **a (display):** Archivo (ancho normal, 700–800) · Schibsted Grotesk · Hanken Grotesk.
- **b/c:** la misma familia, 400.
- **d:** igual.
- `_text.scss`: display enorme — lg ~120px, md ~80px, sm ~52px — line-height 0.9,
  `letter-spacing: -0.03em`; label en mayúsculas pequeñas. El contraste de escala es el
  diseño.
- No Inter como display (lista de impeccable); Helvetica no está en Google Fonts.

## 4. Forma
`--radius-md: 0` · `--form-radius-btn: 0` · campos `0`. Sin sombras.

## 5. Gestos permitidos en `home.scss`
- Líneas de retícula visibles como bordes de las celdas (`border-inline-start`,
  `border-top`), nunca `div` vacíos.
- Un bloque geométrico del acento (cuadrado, diagonal) como único elemento gráfico.

## 6. Primitivas típicas
`Grid`+`Cell` asimétrico (titular `span 9`, columnas de texto `span 4/4/4`) ·
`Section rhythm="airy"` · `Stack gap={4}` dentro de columnas estrechas.

## 7. Anti-patrones
- Centrar cosas. La retícula suiza alinea a la izquierda y a líneas.
- Sombras, gradientes, blur, radios.
- Líneas de retícula que no coinciden con las columnas reales (`Cell`).
- **Romper el cliché:** el acento no es rojo por defecto si la marca tiene otro; o la
  retícula se rompe deliberadamente una vez (un titular que cruza columnas).

## 8. Imagen de referencia
![Swiss](04-swiss.png)
- Titular gigante que ocupa casi todo el ancho; el resto es pequeño y ordenado.
- Columnas de texto separadas por líneas verticales finas.
- Un solo bloque azul geométrico como acento.
