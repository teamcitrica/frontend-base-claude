# Contrato de implementación

> **Fuente única.** Estas cuatro reglas eran copia-pega en `CLAUDE.md`, `DESIGN.md §10`,
> `PRODUCT.md` y `NEW_BRAND.md §8`. Ahora viven **solo aquí**; el resto apunta a este
> archivo. Si cambia una regla, se cambia en este documento y en ningún otro lado.

El sistema es **tokens-first** y **component-first**. Estas reglas obligan por igual a
ediciones a mano y a pases automatizados (incluida la skill `impeccable`).

---

## 1. Color — una sola fuente de verdad

Todos los hex de marca viven en
[`styles/10-tokens/web/colors/_palette.scss`](../../styles/10-tokens/web/colors/_palette.scss).
**Solo ahí se editan valores de color.**

Todo lo demás consume las variables emitidas:

```scss
var(--color-primary)          /* naranja de marca */
var(--color-text-black)       /* carbón #111111 */
var(--color-surface)          /* neutral-50 */
var(--color-tertiary)         /* amarillo sazón */
var(--color-on-surface-var)
```

- ❌ **Nunca** hex ni `rgba()` literal en `.tsx` ni en `styles/webpages-styles/*.scss`.
- ❌ **Nunca** alias intermedios (`--im-orange`, `--brand-primary`, etc.).
- ✅ Para un tono de carbón sin token propio, derivarlo inline con `color-mix()` sobre tokens.

## 2. Tipografía — componente `Text` + variantes

El texto se renderiza con el componente `Text` del toolkit, eligiendo `variant`.
No se hardcodea `font-family` ni `clamp()` en la página.

| `variant` | Rol | Familia |
|---|---|---|
| `display` | Hero | Anton, uppercase |
| `headline` | Títulos de sección | Anton, uppercase |
| `title` | Títulos de card / paso | Anton, uppercase |
| `subtitle` | Bajadas | Lato |
| `body` | Párrafos | Lato |
| `label` | UI, botones, captions | Lato |

- Escala: [`styles/10-tokens/web/components/_text.scss`](../../styles/10-tokens/web/components/_text.scss)
- Fuentes: [`styles/01-settings/settings.scss`](../../styles/01-settings/settings.scss)
  (`--font-family-a` = Anton, `--font-family-b/c/d` = Lato)
- Anton nunca por debajo de 24px, y nunca en párrafos.
- Los colores del texto salen de las props de color de `Text`, no de clases Tailwind.

## 3. Botones y formularios — dirigidos por tokens

Usar `<Button variant="primary|secondary|flat">`.

- Colores desde `--color-*-btn` en `_palette.scss`
- Render en [`_button.scss`](../../styles/10-tokens/web/components/_button.scss)
- Radio pill desde `--form-radius-btn` en [`_form.scss`](../../styles/10-tokens/web/components/_form.scss)

No se re-estilan botones desde el SCSS de la landing.

## 4. Componentes — el toolkit primero

Antes de escribir markup a mano, buscar en `citrica-ui-toolkit`:
`Button`, `Input`, `Select`, `Textarea`, `Text`, `Icon`, `Card`, `Modal`,
`Carousel`, `Header`, y el grid `Container` / `Col`.

El SCSS propio de página (`.<pagina>__*`) se reserva para **layout, ritmo de sección y
gestos de marca** que el toolkit no cubre — y aun ahí, los colores son tokens. Muchas
páginas no lo necesitan: `Container`/`Col` más utilidades de Tailwind alcanzan.

Nunca `<div>` crudo para layout: siempre `Container` + `Col`.

---

## Mapa de archivos

| Preocupación | Archivo |
|---|---|
| Colores de marca (hex) | `styles/10-tokens/web/colors/_palette.scss` |
| Escala y variantes de tipo | `styles/10-tokens/web/components/_text.scss` |
| Fuentes (Anton / Lato) | `styles/01-settings/settings.scss` |
| Render de botón | `styles/10-tokens/web/components/_button.scss` |
| Radio de botón / form | `styles/10-tokens/web/components/_form.scss` |
| Layout de la landing (solo layout) | `styles/webpages-styles/home.scss` — ya importado |
| Layout de otra página (solo layout) | `styles/webpages-styles/<pagina>.scss` + su `@import` en `styles/custom.scss` |

## Precedencia sobre `impeccable`

La skill `impeccable` es **obligatoria** en las fases con superficie visual
([ADR-0003](../04-decisions/0003-impeccable-obligatorio.md)). Aporta criterio de
**diseño**: jerarquía, ritmo, contraste, densidad, motion, copy.

No aporta criterio de **implementación**. Es una skill genérica y no conoce estas cuatro
reglas. Donde su guía choque con este documento, **manda este documento**:

| `impeccable` propone | Aquí manda |
|---|---|
| `clamp()` en titulares de hero | La escala vive en `_text.scss`. Cero `clamp()` en `styles/webpages-styles/` |
| Componer paleta (OKLCH) | El color vive en `_palette.scss`. Si falta un tono, se crea el token |
| Markup propio bien resuelto | `Text`, `Container`/`Col` y el toolkit primero |

Si una propuesta suya es lo bastante buena como para justificar romper una de las cuatro
reglas, **el ADR va primero** y después el código. Nunca al revés.

## Cómo se verifica

Cada uno de los cuatro puntos es comprobable con un grep. La lista ejecutable está en
[definition-of-done.md](../00-harness/definition-of-done.md).

## Contexto y detalle

- El *porqué* estético: [design.md](../design.md) y [brand.md](brand.md)
- El *porqué* de producto: [../product.md](../product.md)
- Ejemplos largos y errores comunes: [reference/web-guide.md](reference/web-guide.md)
- La decisión registrada: [ADR-0001](../04-decisions/0001-contrato-fuente-unica.md)
