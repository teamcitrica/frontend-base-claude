---
name: Aurora / malla de gradiente fluida
cliche_risk: alto — near-black + luces de color roza el cliché que impeccable detecta; se diferencia por el hue y la contención
---

# Aurora / malla de gradiente

Lienzo oscuro con mallas de luz que fluyen; las secciones se definen por zonas de luz, no
por líneas. Encaja con **C** y **A**.

## 1. Paleta de entrada
<!-- hex-allowed -->
| Rol | Ejemplo |
|---|---|
| surface | `#0A0A12` |
| luces | índigo `#4F46E5` · magenta `#C026D3` · turquesa `#14B8A6` · violeta `#7C3AED` |
<!-- /hex-allowed -->

## 2. Roles
- Landing **oscura**.
- `primary`: la luz del CTA (índigo o violeta).
- `tertiary`, `cuaternary`, `quinary`: las otras luces de la malla.
- `outline-variant`: blanco al 10 %.

## 3. Tipografía
- **a (display):** Sora · Lexend (600–700).
- **b/c:** Manrope · Figtree.
- **d:** igual a b; JetBrains Mono si hay código.
- `_text.scss`: display en mayúsculas opcional, `letter-spacing: -0.01em`.
- No Plus Jakarta Sans ni Inter como display (lista de impeccable).

## 4. Forma
`--radius-md: 20px` · `--form-radius-btn: var(--radius-pill)`.

## 5. Gestos permitidos en `home.scss`
- `.home__aurora`: malla de `radial-gradient` con tokens, animada muy lenta (≥ 12s) y
  estática con reduced-motion.
- Tarjeta oscura translúcida con blur y borde claro al 10 %.
- CTA con borde de gradiente animado o halo del `primary`.

## 6. Primitivas típicas
`Section` sin cortes duros entre secciones (mismo fondo, la malla cambia de posición) ·
`Container` + `Col lg 6/6` · `Stack` · `Media` para el panel de código/producto.

## 7. Anti-patrones
- Malla que compite con el texto: el titular siempre sobre la zona más oscura.
- Animación rápida o que reacciona al scroll en todo el fondo.
- **Romper el cliché (obligatorio para pasar `shape`):** lienzo no casi-negro (azul
  medianoche, ciruela profunda), luces con el hue de la marca, o una sola luz dominante.

## 8. Imagen de referencia
![Aurora](09-aurora.png)
- Luz fluida magenta-turquesa ocupando el viewport detrás del titular.
- Titular blanco pesado; CTA con borde de gradiente brillante.
- Panel de código translúcido flotando a la derecha.
