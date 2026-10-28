---
name: Glassmorphism
comp: 03-glassmorphism.png
---

# Glassmorphism

Paneles translúcidos con desenfoque flotando sobre luz ambiental de color. Profundidad
por capas. Encaja con **C** (producto) y **A**.

## 1. Paleta de entrada
<!-- hex-allowed -->
| Rol | Ejemplo |
|---|---|
| surface (fondo) | `#1E293B` (pizarra oscura) |
| luz 1 / 2 / 3 | violeta `#8B5CF6` · magenta `#D946EF` · cian `#22D3EE` |
| vidrio | `#FFFFFF` al 5–10 % |
<!-- /hex-allowed -->

## 2. Roles
- Landing **oscura**: `surface*` oscuros, `on-surface*` claros (ver `palette-recipe.md`).
- `primary`: la luz que se usa en el CTA (violeta/índigo).
- `tertiary` y `cuaternary`: las otras luces del fondo.
- `outline-variant`: blanco al 10–20 % sobre el fondo (borde de vidrio).

## 3. Tipografía
- **a (display/headline/title):** Sora · Urbanist, 400–500 (nada pesado).
- **b (base) y d (body/subtitle):** Figtree · Manrope.
- **c (label, botones):** la de b, 500.
- `_text.scss`: display en mayúsculas con `letter-spacing: 0.02em`; headline/title sin
  mayúsculas; pesos medios.
- No Outfit (lista de impeccable); SF Pro no está en Google Fonts.
## 4. Forma
`--radius-md: 20px` · `--form-radius-btn: 12px` · campos `12px`.

## 5. Gestos permitidos en `<slug>.scss`
- `.home__glass`: panel translúcido con `backdrop-filter` y borde claro tenue.
- Fondo de luz ambiental con `radial-gradient` de 2–3 tokens (estático o muy lento).
- Halo difuso del `primary` bajo el CTA.

## 6. Primitivas típicas
`Section tone="base"` con fondo `.home__ambient` · `Grid`+`Cell` con misma `row` para
apilar paneles desplazados · `Stack` dentro del panel · `Media` para el mock flotante.

## 7. Qué muestra la imagen y cómo se construye

La imagen es el **comp aprobado** cuando el usuario la elige: se reproduce su composición
región por región ([comp-led.md](../comp-led.md)). El copy se reescribe para la marca; la
posición, la escala y el material se respetan.

![Glassmorphism](03-glassmorphism.png)

| Región de la imagen | Kind | En este repo |
|---|---|---|
| Fondo pizarra con luces rosa y cian fuera de foco | `texture` | `Section tone="base"` con `.<slug>__ambient` (2 `radial-gradient` con `color-mix`) |
| Tres paneles de vidrio apilados y desplazados | `chrome` | `Grid` con 3 `Cell` en la misma `row`, `start` distinto, `.<slug>__glass` (blur, borde 10 %) |
| Titular 2 líneas blanco, centrado | `text` | `Text variant="display"` en `Stack` centrado |
| Bajada clara | `text` | `Text variant="subtitle" textColor="color-text-white"` |
| CTA violeta con halo | `control` | `Button variant="primary"` + `.<slug>__glow` (halo de `primary`) |
| Dos mocks de móvil en vidrio (derecha) | `plate` | foto de stock de móvil con la app, o `Media ratio="3/4"` con panel `.<slug>__glass` vacío que contenga una `Card` del toolkit |
| Badge "powered by" arriba a la derecha | `chrome` | `Cluster` en `Cell start={{lg:10}} span={{lg:3}}`, `.<slug>__glass` pequeño |

Los mocks son plates: sin producto real, se sustituyen por paneles de vidrio con componentes del toolkit dentro (una `Card`, un `Input`), que es honesto y se parece.

## 8. Anti-patrones
- Vidrio sobre vidrio sobre vidrio: legibilidad cero.
- Texto pequeño sobre el blur sin comprobar contraste (debe pasar 4.5:1 en el punto más
- `backdrop-filter` en elementos que hacen scroll largo (coste de rendimiento).
