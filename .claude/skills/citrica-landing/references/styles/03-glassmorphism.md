---
name: Glassmorphism
cliche_risk: alto — vidrio sobre manchas de color es plantilla de 2021; se diferencia con una sola capa de vidrio con función
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
- **a (display):** Sora · Urbanist (400–500, nada pesado).
- **b/c:** Figtree · Manrope.
- **d:** igual a b.
- `_text.scss`: sin mayúsculas forzadas en headline/title (display puede ir en mayúsculas
  con `letter-spacing: 0.02em`); pesos medios.
- No Outfit ni SF Pro (lista de impeccable / no disponible en Google Fonts).

## 4. Forma
`--radius-md: 20px` · `--form-radius-btn: 12px` · campos `12px`.

## 5. Gestos permitidos en `home.scss`
- `.home__glass`: panel translúcido con `backdrop-filter` y borde claro tenue.
- Fondo de luz ambiental con `radial-gradient` de 2–3 tokens (estático o muy lento).
- Halo difuso del `primary` bajo el CTA.

## 6. Primitivas típicas
`Section tone="base"` con fondo `.home__ambient` · `Grid`+`Cell` con misma `row` para
apilar paneles desplazados · `Stack` dentro del panel · `Media` para el mock flotante.

## 7. Anti-patrones
- Vidrio sobre vidrio sobre vidrio: legibilidad cero.
- Texto pequeño sobre el blur sin comprobar contraste (debe pasar 4.5:1 en el punto más
  claro del fondo).
- `backdrop-filter` en elementos que hacen scroll largo (coste de rendimiento).
- **Romper el cliché:** un solo panel de vidrio con función (el formulario, el precio) y el
  resto sólido; o luces con el hue de la marca, no el violeta/cian por defecto.

## 8. Imagen de referencia
![Glassmorphism](03-glassmorphism.png)
- Capas de vidrio apiladas con desplazamiento: profundidad sin sombras duras.
- Manchas de luz cian y magenta detrás, fuera de foco.
- Un mock de app flotando a la derecha, también en vidrio.
