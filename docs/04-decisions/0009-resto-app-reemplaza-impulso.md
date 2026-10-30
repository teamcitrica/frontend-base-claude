# ADR-0009 — Resto App reemplaza a ImPulso como marca de la base

- **Estado:** Aceptada
- **Fecha:** 2026-10-28

## Contexto

`/citrica-landing restoapp --ruta test-1-sin-brief` levantó Resto App en **modo ruta**:
una landing nueva en `/test-1-sin-brief` junto a la de ImPulso en `/`, sin borrar nada.

El modo ruta tiene un límite que [ADR-0008](0008-catalogo-de-estilos-landing.md) ya
anticipaba: **la paleta (`_palette.scss`) y las fuentes (`lib/fonts.ts` + slots de
`settings.scss`) son globales**. Al escribir el render de Resto App, `/` pasó a pintarse
con la marca nueva.

Durante el registro del sistema (`/impeccable document`), el usuario eligió
**sobrescribir** `docs/design.md` en lugar de fusionarlo, y fijó la marca de Resto App:

- Crema `#F5F5EA` de fondo, azul `#083D77` para el texto, coral `#F95738` solo en CTAs y
  estados clave.
- Oleo Script en titulares; Lora en cuerpo y cifras (con `lnum tnum`). Sin monoespaciada.
- El efecto ticket sale de líneas punteadas, cifras alineadas y totales.

Con eso, la constitución (`docs/design.md`, `.impeccable/design.json` y el render) ya no
describe ImPulso. [docs/03-specs/README.md](../03-specs/README.md) exige un ADR antes de
que una spec contradiga la constitución: este es ese ADR, previo a aprobar
[SPEC-0005](../03-specs/0005-landing-restoapp/spec.md).

## Decisión

1. **Resto App es la marca vigente de la base.** `docs/design.md` y su sidecar
   `.impeccable/design.json` describen Resto App. La versión de ImPulso queda en el
   historial de git (último commit antes del cambio: `d22d614`).
2. **`/` hereda la marca nueva y no se corrige.** La landing de ImPulso sigue en `/` con
   su copy y su estructura, pero con paleta y fuentes de Resto App. No es un defecto que
   tenga que arreglar una spec de Resto App. Si ImPulso vuelve a necesitar su marca, eso
   es otra spec (marca por ruta) o un `/brand-new`.
3. **Excepción de contraste del CTA, aprobada por el usuario.** El coral `#F95738` sobre la
   crema da 2.97:1, por debajo del 3:1 de la receta de paleta. Se conserva el coral exacto
   con texto y borde de 2px en `#04223F`: el texto da 4.94:1 sobre el coral y el
   contorno da 14.65:1 sobre la crema. `.btn-primary` siempre dibuja ese borde.
4. **Lora y Oleo Script se aceptan aunque Lora está en la lista de fuentes que impeccable
   evita proponer.** La skill solo prohíbe *proponerlas*; aquí las fijó el cliente
   ("the brief wins").
5. `docs/product.md` **no** se reescribe: conserva ImPulso arriba y suma la sección
   `Surface: /test-1-sin-brief`.

## Consecuencias

- `npm run shot` sobre `/` mostrará ImPulso con colores y letra de Resto App. Las capturas
  de SPEC-0001 ya no coinciden con el render y no se rehacen.
- Los tokens globales cambiaron: botón primario con borde y sombra de tecla, 48px de alto
  mínimo; campos de 56px con texto de 16px; cuerpo de 16px en `sm`; etiquetas de 12px.
  El admin usa su propia paleta (`styles/10-tokens/admin/`) y no se tocó.
- Futuras landings en modo ruta deben saber que cambiar la marca cambia `/`. Separar la
  marca por ruta (tokens con alcance por superficie) queda como mejora posible, sin spec.
