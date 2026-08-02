---
id: NNNN
slug: slug-en-kebab
titulo: <título corto en español>
estado: draft        # draft | approved | in-progress | done | dropped
creada: YYYY-MM-DD
superficie: landing  # landing | admin | panel | auth | api | infra
---

# SPEC-NNNN — <título>

## Problema

Qué le pasa hoy al usuario, en sus términos. Sin mencionar la solución.

> Malo: "falta una sección de precios"
> Bueno: "el visitante llega al CTA sin saber cuánto cuesta y abandona"

## Por qué ahora

Qué se desbloquea o qué se está perdiendo por no hacerlo. Una o dos frases.

## Alcance

Lo que esta spec sí entrega:

- …

## Fuera de alcance

Lo que explícitamente **no** entra. Esta sección evita que el build se desborde;
si algo aparece a mitad de camino y no está aquí arriba, se para y se actualiza la spec.

- …

## Criterios de aceptación

Verificables mirando la pantalla o corriendo un comando. Si no se puede comprobar,
no es un criterio — reescribirlo.

### AC-1 — <nombre>
- **Dado** …
- **Cuando** …
- **Entonces** …

### AC-2 — <nombre>
- **Dado** …
- **Cuando** …
- **Entonces** …

## Restricciones heredadas

De la constitución del repo. Marcar las que aplican y borrar el resto:

- [ ] [Contrato de implementación](../../01-design/implementation-contract.md) — tokens-first, component-first
- [ ] [Principios de diseño](../../product.md#design-principles) — flujo no presencia, comida protagonista, alto contraste, naranja = acción, datos verificables
- [ ] [Anti-referencias](../../product.md#anti-references) — nada corporate-frío, ni editorial-magazine, ni naranja como lavado
- [ ] [Design system](../../design.md) — escala, gestos, motion
- [ ] Accesibilidad — ver [DoD sección E](../../00-harness/definition-of-done.md)

## Preguntas abiertas

Lo que hay que resolver **antes** de aprobar. Una spec con preguntas abiertas no pasa
a `approved`.

- [ ] …

## Verificación

> Se llena en la fase VERIFY. Salidas reales, no checks optimistas.
> Formato en [definition-of-done.md](../../00-harness/definition-of-done.md#bloque-de-reporte).
