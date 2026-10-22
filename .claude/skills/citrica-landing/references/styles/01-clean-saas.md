---
name: Minimalismo funcional (Clean SaaS)
cliche_risk: medio — es el default de la categoría; se diferencia por composición y por un acento con carácter
---

# Minimalismo funcional (Clean SaaS)

Orden, aire y un solo color de acción. La interfaz desaparece y el producto se ve.
Encaja con esqueleto **C** (producto) y **A** (conversión).

## 1. Paleta de entrada
<!-- hex-allowed -->
| Rol | Ejemplo |
|---|---|
| surface (claro / oscuro) | `#FFFFFF` / `#0F172A` |
| outline-variant (claro / oscuro) | `#E2E8F0` / `#1E293B` |
| primary | `#4F46E5` (índigo) o `#2563EB` (azul eléctrico) |
<!-- /hex-allowed -->

## 2. Roles
- `primary`: el único color saturado. Solo CTA, enlaces y un dato destacado.
- `secondary`: gris pizarra casi negro para texto y estructura.
- `tertiary`: verde o ámbar apagado solo para estados (badges).
- Fondo claro por defecto; `Section tone="surface"` en gris muy tenue para alternar.
- `outline-variant` visible: los bordes finos son la estructura.

## 3. Tipografía
- **a (display):** Geist · Manrope · Figtree (peso 600–700).
- **b/c (texto/UI):** la misma familia que a, peso 400–500.
- **d (mono, etiquetas y código):** Geist Mono · JetBrains Mono.
- `_text.scss`: quitar `text-transform: uppercase` de display/headline/title;
  `letter-spacing: -0.02em` en display y headline; line-height de display ~1.05.
- Evitar Inter y Plus Jakarta Sans como display (lista de impeccable).

## 4. Forma
`--radius-md: 12px` · `--form-radius-btn: 8px` (no pill) · `--form-radius-input: 8px`.
Botón primario relleno; secundario con borde `outline`.

## 5. Gestos permitidos en `home.scss`
- Tarjeta con borde fino + micro-sombra (`style-to-render.md` → Forma y Sombra).
- Captura de producto en `Media` con borde fino y sombra difusa del `primary` al 10 %.
- Badge mono en mayúsculas pequeñas sobre el titular del hero.

## 6. Primitivas típicas
`Container` + `Col lg 6/6` para el hero split · `AutoGrid 240` de `Card variant="bordered"`
para features · `Grid`+`Cell span` si el bloque de features es bento · `Accordion` para FAQ.

## 7. Anti-patrones
- Hero centrado con titular genérico + gradiente morado detrás: el cliché SaaS.
- Tres tarjetas idénticas de icono-título-texto como única sección de features.
- Más de un color saturado.
- **Romper el cliché en al menos un eje:** hue de acción inesperado para la categoría,
  composición del hero asimétrica, o la captura del producto como protagonista a sangre.

## 8. Imagen de referencia
![Clean SaaS](01-clean-saas.png)
- Titular a la izquierda, captura del producto a la derecha: el producto es la prueba.
- Un solo azul para CTA; el resto es gris y blanco.
- Botón secundario con borde fino, mismo tamaño que el primario.
