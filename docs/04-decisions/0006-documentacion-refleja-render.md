# ADR-0006 — La documentación de diseño describe lo que se renderiza

- **Estado:** Aceptada
- **Fecha:** 2026-10-20

## Contexto

`docs/design.md` es la entrada que lee `impeccable` (ver
[ADR-0003](0003-impeccable-obligatorio.md)), y la primera referencia de cualquier
desarrollador. Al auditar la web para SPEC-0003, la documentación y el código no coincidían:

| | `design.md` | Código |
|---|---|---|
| Escala de espaciado | 8px (8/16/24/32/48/64/96/128) | 4px (4/8/12/24/40/64/96), como `--home-space-*` dentro de `.home` |
| Radio de card / superficie | 8px | 12px (`home.scss`, 3 usos) |
| Radio de input | 8px | 10px (`--form-radius-input`) |
| Grid | máx. 1200–1280px, gutter 24px | 1366px, gutter 56px y padding 112px en `lg` (`settings.scss`) |

Con dos fuentes que se contradicen, cada lector elige una. El agente proponía valores
que no existían en el sistema, y el desarrollador no tenía cómo saber cuál de los dos
mandaba. La landing ImPulso, ya construida y verificada (SPEC-0001), es la que se ve:
cambiarla para que coincida con la documentación sería rediseñar sin motivo.

## Decisión

1. **Ante una discrepancia entre la documentación de diseño y el render, manda el
   render.** Se corrige la documentación. Cambiar la pantalla para que coincida con la
   documentación es un rediseño y requiere su propia spec (con `impeccable`).
2. **La escala de espaciado es de 4px**, expuesta como tokens globales con nombre
   numérico alineado con Tailwind: `--space-N` = N × 4px (`--space-6` = 24px = `gap-6`).
   Los pasos son 1, 2, 3, 4, 6, 8, 10, 12, 16, 24 y 32.
3. **Los fundamentos tienen una sola fuente:** `styles/10-tokens/web/foundations/`
   (espaciado y ritmo de sección, radios, motion y medida de lectura), igual que el color
   vive solo en `_palette.scss` ([ADR-0001](0001-contrato-fuente-unica.md)).
4. **`design.md` cita nombres de token reales.** Un valor documentado que no tiene token
   se describe como valor, no como variable.
5. **Los valores reales que se fijan hoy:** radio de superficie y media de 12px
   (`--radius-md`); pill de 999px (`--radius-pill`); radio de input de 10px (en `_form.scss`);
   grid de 12/6/4 columnas, contenedor de 1366px, gutter de 56/20/20px y padding de
   112/56/24px (`lg`/`md`/`sm`).

## Consecuencias

**Mejora:** una sola respuesta para "¿cuánto espacio va aquí?", y es la que se ve. La IA
puede leer `design.md` y escribir `var(--space-6)` sabiendo que existe y que coincide con
`gap-6`. Una página nueva hereda la escala sin copiarla.

**Empeora:** la escala de 8px de la marca deja de ser la referencia; queda como
subconjunto de la de 4px (los pasos pares). `docs/01-design/brand.md` es un brand book
de ejemplo y **no** se actualiza en esta decisión: su bloque conceptual sigue diciendo
`--space-1: 8px`, que no coincide con el token real. Se corrige cuando se revise el
brand book.

**Riesgo:** la regla "manda el render" puede consagrar un error de implementación. Si
el render está mal, el camino es una spec que lo corrija, no editar la documentación
para encubrirlo.

## Alternativas consideradas

- **Que mande `design.md` (8px, radios de 8px, grid de 1280px).** Descartada: cambia la
  landing verificada sin una razón de diseño, solo para cuadrar un documento.
- **Nombres de talla (`--space-md`).** Descartada: no coinciden con Tailwind, y obligan a
  memorizar una tabla o a mapear Tailwind a mano.
- **Dejar la escala dentro de cada página (`--home-space-*`).** Descartada: cada página
  nueva la copia o la reinventa.
