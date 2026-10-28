---
name: Cyberpunk / dark tech
comp: 06-cyberpunk.png
---

# Cyberpunk / dark tech

Interfaz tipo HUD: bordes anidados, esquinas recortadas, datos por todas partes, neón sobre
negro. Solo si el producto es técnico o de juego y la densidad de datos es real. Encaja con
**C**.

## 1. Paleta de entrada
<!-- hex-allowed -->
| Rol | Ejemplo |
|---|---|
| surface | `#05050A` |
| neón 1 | cian eléctrico `#00F0FF` |
| neón 2 | amarillo neón `#FFE600` |
| neón 3 | magenta `#FF0055` |
<!-- /hex-allowed -->

## 2. Roles
- Landing **oscura**.
- `primary`: cian (CTA, bordes activos).
- `tertiary`: amarillo (titular de acción, una vez por viewport).
- `error` teñido con el magenta de la marca; `cuaternary` = magenta para chips.
- `outline`: `primary` al 50 %.

## 3. Tipografía
- **a (display/title):** Orbitron · Chakra Petch (cara ancha para el título de sistema).
- **d (headline, body, subtitle):** Barlow Condensed 700–800 · Saira Extra Condensed: el
  titular y el cuerpo del comp son condensados pesados en mayúsculas; `.text-headline`
  apunta a `--font-family-d` en `_text.scss`. `text-transform: uppercase` en `.text-body`.
- **b (base):** Chakra Petch 400 · Rajdhani.
- **c (label, chips, datos):** JetBrains Mono · Share Tech Mono.
- `_text.scss`: display y headline en mayúsculas con `letter-spacing: 0.04em`.
- No Space Mono ni IBM Plex (lista de impeccable).
## 4. Forma
`--radius-md: 0` · `--form-radius-btn: 0`. Esquinas con `clip-path` en vez de radio.

## 5. Gestos permitidos en `<slug>.scss`
- Brillo neón (`box-shadow` con `color-mix` del `primary`) en CTA y marco principal.
- Esquinas recortadas con `clip-path`.
- Scanlines o retícula tenue de fondo con `repeating-linear-gradient`.

## 6. Primitivas típicas
`Grid`+`Cell` para el HUD (panel principal + paneles laterales) · `Cluster` de chips de
estado · `Stack gap={2}` para bloques densos de datos.

## 7. Qué muestra la imagen y cómo se construye

La imagen es el **comp aprobado** cuando el usuario la elige: se reproduce su composición
región por región ([comp-led.md](../comp-led.md)). El copy se reescribe para la marca; la
posición, la escala y el material se respetan.

![Cyberpunk](06-cyberpunk.png)

| Región de la imagen | Kind | En este repo |
|---|---|---|
| Marco HUD con esquinas en L brillantes | `chrome` | `Section` con `.<slug>__hud` (borde `primary`, `clip-path`, `box-shadow` neón) envolviendo el `Grid` |
| Menú de etiquetas entre corchetes arriba a la derecha | `chrome` | `Header` del toolkit con items `[MENU]`, o `Cluster` de `Text label` mono |
| Columna izquierda: título de sistema, titular amarillo, línea de estado, cuerpo en mayúsculas, CTA cian, 3 chips | `text` | `Cell span={{lg:6}}` con `Stack`; titular `Text headline textColor="color-tertiary"`; `Button variant="primary"` con `clip-path`; chips `Cluster` de `Text label` con borde de su color |
| Panel derecho anidado con grafo de red | `plate` | `Cell start={{lg:8}} span={{lg:5}}` con `.<slug>__panel` anidado; el grafo es SVG propio (círculos + líneas, `stroke: var(--color-primary)`) |
| Etiquetas de datos y mini gráficas de barras alrededor del panel | `text` | `Text label` mono + SVG de barras con tokens |
| Fondo negro con columnas de dígitos tenues y scanlines | `texture` | `.<slug>__scan` con `repeating-linear-gradient`; los dígitos, `Text label` con `opacity` baja en una `Cell` de fondo |

Los datos pseudo-técnicos de la imagen no se copian: cada etiqueta lleva un dato real del producto o se omite.

## 8. Anti-patrones
- Texto de relleno pseudo-técnico (`SYS_LOAD`, `ENCRYPT_KEY`) sin significado: ruido.
- Neón en párrafos: ilegible. El neón es para bordes y titulares.
- Animaciones de glitch permanentes (accesibilidad y fatiga).
