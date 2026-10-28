---
name: Lujo editorial
comp: 07-luxury-editorial.png
---

# Lujo editorial

Fondo cálido, serif de alto contraste, mucho espacio negativo, foto grande. Lento y caro.
Encaja con **B** (editorial) y **D** (hospitalidad).

## 1. Paleta de entrada
<!-- hex-allowed -->
| Rol | Ejemplo |
|---|---|
| surface | `#FBF9F5` / `#F4F0EA` (hueso, crema) |
| tinta | `#1A1817` (espresso) |
| acento | oro champán `#D4AF37` o salvia `#8A9A86` |
<!-- /hex-allowed -->

## 2. Roles
- `primary`: espresso — el CTA es un bloque oscuro sobrio, no un color.
- `secondary`: el acento (oro o salvia), en filetes y detalles.
- `tertiary`: un segundo neutro cálido para `Section tone="surface"`.
- `outline-variant`: `outline` al 50 % (hairlines).

## 3. Tipografía
- **a (display/headline/title):** Bodoni Moda · Gloock · Italiana (serif alta).
- **b (base) y d (body/subtitle):** Jost · Montserrat 300–400, interletrado amplio.
- **c (label, botones):** la de b en mayúsculas, `letter-spacing: 0.12em`.
- `_text.scss`: display en mayúsculas, line-height 1.0, peso 400; body con line-height
  generoso.
- No Playfair, Cormorant ni Lora (lista de impeccable).
## 4. Forma
`--radius-md: 0` · `--form-radius-btn: 0`. Sin sombras.

## 5. Gestos permitidos en `<slug>.scss`
- Hairlines arriba y abajo del bloque de texto.
- Zoom lento de la imagen en hover (`--duration-slow`).
- Franja de color vertical en un borde de la página (`Cell breakout`).

## 6. Primitivas típicas
`Grid`+`Cell`: imagen `span 5` + texto `start 7 span 5` · `Media ratio="4/3"` ·
`Cell breakout="full"` para foto a sangre · `Section rhythm="airy"` casi siempre.

## 7. Qué muestra la imagen y cómo se construye

La imagen es el **comp aprobado** cuando el usuario la elige: se reproduce su composición
región por región ([comp-led.md](../comp-led.md)). El copy se reescribe para la marca; la
posición, la escala y el material se respetan.

![Lujo editorial](07-luxury-editorial.png)

| Región de la imagen | Kind | En este repo |
|---|---|---|
| Foto vertical de la modelo (col 1–5), con margen | `image` | `Cell span={{lg:5}}` con `Media ratio="3/4" radius="none"` + foto de stock |
| Hairline arriba y abajo del bloque de texto, con etiqueta pequeña | `chrome` | `.<slug>__rule` (`border-top: 1px solid color-mix(outline 50%)`) con `Text label` |
| Titular serif 3 líneas en mayúsculas | `text` | `Text variant="display"` en `Cell start={{lg:7}} span={{lg:5}} align="center"` |
| Bajada sans con interletrado | `text` | `Text variant="subtitle"` |
| CTA rectangular espresso | `control` | `Button variant="primary"` con `primary-btn` = tinta, `--form-radius-btn: 0` |
| Franja salvia vertical en el borde derecho y bloques pálidos arriba | `band` | `Cell breakout="wide-end"` con `.<slug>__strip { background: var(--color-secondary) }`; bloques `surface-container` |

La foto es la mitad de la página: sin foto editorial real, la dirección no funciona. Pedirla; mientras tanto, stock marcado de muestra.

## 8. Anti-patrones
- Mayúsculas + serif + crema + terracota juntos sin más: el cliché exacto.
- Fotos de stock genéricas de "lujo".
- Párrafos largos centrados.
