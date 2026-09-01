# Specs

Índice vivo de las unidades de trabajo. El flujo completo está en
[sdd-workflow.md](../00-harness/sdd-workflow.md).

## Índice

| # | Spec | Superficie | Estado | Creada |
|---|---|---|---|---|
| 0001 | [Landing de conversión ImPulso](0001-landing-impulso/spec.md) | landing | done | 2026-08-01 |

<!-- Al crear una spec, agregar aquí una fila:
| 0002 | Titulo -> 0002-slug/spec.md | landing | draft | 2026-08-01 |
-->

## Crear una spec

```bash
# vía comando del harness
/spec-new mi-feature

# o a mano
cp -r docs/03-specs/_template docs/03-specs/0001-mi-feature
```

Luego se llena el frontmatter (`id`, `slug`, `titulo`, `creada`, `superficie`) y se
agrega la fila al índice de arriba.

## Anatomía de una spec

```
0001-mi-feature/
├── spec.md      # QUÉ y POR QUÉ  → se aprueba antes de planear
├── plan.md      # CÓMO           → se aprueba antes de construir
└── tasks.md     # checklist ejecutable + bitácora de desvíos
```

## Estados

| Estado | Significado | Siguiente paso |
|---|---|---|
| `draft` | En redacción | Resolver preguntas abiertas y aprobar |
| `approved` | Aprobada | `/spec-plan` |
| `in-progress` | Build en curso | Ejecutar `tasks.md` |
| `done` | Verificada contra la DoD | — |
| `dropped` | Abandonada | — (se conserva con el motivo) |

Los números no se reutilizan, aunque la spec se abandone.

## Reglas

- Una spec **nunca** contradice la constitución (`product.md`, `design.md`,
  `01-design/`, `02-architecture/`). Para contradecirla, primero un [ADR](../04-decisions/).
- Un criterio de aceptación que no se puede comprobar no es un criterio.
- Lo declarado fuera de alcance se queda fuera. Si aparece algo nuevo a mitad del
  build, se anota en la bitácora de desvíos y se actualiza la spec.
