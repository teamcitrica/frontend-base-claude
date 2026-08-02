# ADR-0001 — El contrato de implementación tiene una sola fuente

- **Estado:** Aceptada
- **Fecha:** 2026-08-01

## Contexto

Las mismas cuatro reglas (color solo desde tokens, tipografía vía `Text`, botones
dirigidos por tokens, toolkit antes que markup propio) estaban escritas **cuatro
veces**, con redacciones ligeramente distintas:

| Copia | Ubicación original |
|---|---|
| 1 | `CLAUDE.md` § "ImPulso Design-System Rules", líneas 111–131 |
| 2 | `DESIGN.md` §10 "Implementation contract" |
| 3 | `PRODUCT.md` § "Implementation contract" |
| 4 | `NEW_BRAND.md` §8 "Tokens CSS de referencia" |

Cuatro copias significan cuatro oportunidades de divergir. Ya había señales: el
`README.md` apuntaba a `styles/01-settings/colors/colors.scss` como archivo de color,
ruta que **no existe** — el archivo real es
`styles/10-tokens/web/colors/_palette.scss`. Ese link roto se propagó por cinco
secciones del README, y cualquiera (persona o agente) que lo siguiera habría editado
color en el lugar equivocado, o creado el archivo que faltaba.

## Decisión

El contrato vive **solo** en
[`docs/01-design/implementation-contract.md`](../01-design/implementation-contract.md).

Los demás documentos **apuntan** a ese archivo y no reproducen las reglas. En
concreto:

- `CLAUDE.md` enlaza y resume en una línea, sin detallar
- `design.md` (ex `DESIGN.md`) §10 se reemplaza por un puntero
- `product.md` (ex `PRODUCT.md`) enlaza desde su sección de contrato
- `brand.md` (ex `NEW_BRAND.md`) enlaza desde §8

Además, cada regla del contrato debe ser **comprobable por un comando**. Los comandos
viven en la [Definition of Done](../00-harness/definition-of-done.md#b-contrato-de-implementación).
Una regla que no se puede verificar no entra al contrato.

## Consecuencias

**Mejora:** una sola edición para cambiar una regla. Los agentes leen un archivo corto
en vez de cuatro largos y contradictorios. Cada regla trae su verificación.

**Empeora:** hay que seguir un link para leer las reglas completas desde
`CLAUDE.md` — un salto de indirección más. Es aceptable: el resumen de una línea cubre
el caso común y el link cubre el detalle.

**Riesgo residual:** nada impide mecánicamente que alguien vuelva a copiar las reglas
en otro documento. Se mitiga con revisión, no con automatización.

## Alternativas consideradas

- **Dejar `DESIGN.md §10` como fuente.** Descartada: `DESIGN.md` mezcla el *porqué*
  estético (paleta, gestos, motion) con el *cómo* operativo. Un agente que solo
  necesita el contrato tendría que cargar 18KB de brand rationale.
- **Generar las copias desde un fragmento incluido.** Descartada: Markdown plano no
  tiene includes, y montar un paso de build para cuatro documentos es peor que el
  problema.
