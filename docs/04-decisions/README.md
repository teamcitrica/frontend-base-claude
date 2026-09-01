# Decisiones de arquitectura (ADR)

Un ADR registra una decisión que **cambia la constitución del repo** — algo que a
partir de ahora obliga a todas las specs futuras.

Una spec responde "qué construimos esta vez". Un ADR responde "qué es verdad en este
repo de ahora en adelante".

## Índice

| # | Decisión | Estado | Fecha |
|---|---|---|---|
| [0001](0001-contrato-fuente-unica.md) | El contrato de implementación tiene una sola fuente | Aceptada | 2026-08-01 |
| [0002](0002-verificacion-pendiente.md) | Verificación automática: estado y deuda | Aceptada | 2026-08-01 |
| [0003](0003-impeccable-obligatorio.md) | `impeccable` es obligatorio en el ciclo SDD, y el contrato le gana | Aceptada | 2026-08-01 |
| [0004](0004-verificacion-visual-y-assets.md) | La verificación visual es obligatoria, y ningún placeholder ajeno se envía | Aceptada | 2026-08-01 |
| [0005](0005-arranque-de-marca.md) | Arranque de marca: se borra la anterior, y la paleta cambia valores, nunca nombres | Aceptada | 2026-08-01 |

## Cuándo escribir uno

- Se cambia una regla del [contrato de implementación](../01-design/implementation-contract.md)
- Se adopta, cambia o retira una dependencia estructural (Supabase, el toolkit, el sistema de estilos)
- Se acepta conscientemente una deuda técnica
- Una spec necesita romper una regla de la constitución → **el ADR va primero**

## Formato

```markdown
# ADR-NNNN — <título>

- **Estado:** Propuesta | Aceptada | Reemplazada por ADR-XXXX
- **Fecha:** YYYY-MM-DD

## Contexto
Qué situación fuerza la decisión. Hechos, no opiniones.

## Decisión
Qué se decide, en voz activa: "Usamos…", "Prohibimos…".

## Consecuencias
Lo que mejora y lo que empeora. Ambas, honestamente.

## Alternativas consideradas
Qué más se evaluó y por qué no.
```
