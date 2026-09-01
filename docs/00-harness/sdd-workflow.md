# Flujo SDD (Spec-Driven Development)

Cómo se trabaja en este repo. La regla base: **nada no trivial se implementa sin una
spec aprobada**. La spec es el artefacto negociable; el código es su consecuencia.

## Las dos capas

| Capa | Qué es | Dónde vive | Cambia… |
|---|---|---|---|
| **Constitución** | Verdades del repo: producto, marca, design system, contrato de implementación, arquitectura | `docs/`, `docs/01-design/`, `docs/02-architecture/` | rara vez, y con ADR |
| **Specs** | Una unidad de trabajo concreta: qué, por qué, cómo, criterios de aceptación | `docs/03-specs/NNNN-slug/` | constantemente |

Una spec **nunca contradice** la constitución. Si necesita hacerlo, primero se escribe
un [ADR](../04-decisions/) que cambie la constitución, y luego la spec.

## El ciclo

```
   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
   │  1 SPEC  │ →  │  2 PLAN  │ →  │ 3 BUILD  │ →  │ 4 VERIFY │
   │ qué/porqué│    │  cómo    │    │  código  │    │   DoD    │
   └──────────┘    └──────────┘    └──────────┘    └──────────┘
        │               │                              │
        └── aprobación ─┘                              └→ si falla, vuelve a 3
                                                          si la spec estaba mal, a 1
```

### La skill `impeccable` en el ciclo

| Fase | Comando | Qué aporta |
|---|---|---|
| PLAN | `/impeccable shape` | Planificación de diseño. No escribe código |
| BUILD | `/impeccable craft` | Construcción con acabado de estudio |
| VERIFY | `/impeccable audit` | Auditoría de diseño a nivel de código |

Obligatorio en superficies `landing`, `admin`, `panel` y `auth`. Exento en `api` e
`infra`: no hay interfaz que diseñar. Las excepciones del flujo también aplican — si el
cambio no necesita spec, tampoco necesita `impeccable`.

> ⚠️ **Precedencia: donde `impeccable` choque con el contrato, gana el contrato.**
> `impeccable` es una skill genérica y no conoce las reglas de este repo. Sus
> recomendaciones de `clamp()` en titulares y de composición de paletas OKLCH **no**
> aplican: la escala vive en `_text.scss` y el color en `_palette.scss`. Si una propuesta
> suya amerita romper una regla, el ADR va primero. Ver
> [ADR-0003](../04-decisions/0003-impeccable-obligatorio.md).

> Su Setup pide `node .agents/skills/impeccable/scripts/context.mjs`. **Esa ruta no
> existe en este repo.** La que funciona:
> `node ~/.claude/skills/impeccable/scripts/context.mjs`.

### 1 — SPEC · `/spec-new <slug>`

Crea `docs/03-specs/NNNN-slug/spec.md` desde la plantilla. Define:

- **Problema** en términos del usuario, no de la solución
- **Alcance** y —crítico— **fuera de alcance**
- **Criterios de aceptación** en formato verificable (`Dado / Cuando / Entonces`)
- **Restricciones** heredadas de la constitución que aplican a esta spec

Un criterio de aceptación que no se puede comprobar mirando la pantalla o corriendo
un comando **no es un criterio de aceptación**. Reescribirlo.

**Puerta:** la spec se aprueba antes de planear. Sin aprobación no se pasa a 2.

### 2 — PLAN · `/spec-plan <slug>`

**Diseño primero: `/impeccable shape` es obligatorio** cuando la superficie es `landing`,
`admin`, `panel` o `auth`. `shape` es planificación de diseño y no escribe código; su
salida (jerarquía, estructura, ritmo, dirección tipográfica) es **entrada** del plan, no
un anexo. Ver [ADR-0003](../04-decisions/0003-impeccable-obligatorio.md).

Crea `plan.md` y `tasks.md` junto a la spec. El plan responde *cómo*:

- Archivos concretos que se tocan (rutas reales, verificadas)
- Componentes del toolkit que se usan y tokens que se consumen
- Riesgos, y qué se rompe si el riesgo se materializa
- Alternativas descartadas, con una línea de por qué

`tasks.md` es un checklist ejecutable: cada tarea debe caber en una sesión y
apuntar a un criterio de aceptación de la spec.

**Puerta:** el plan se aprueba antes de escribir código.

### 3 — BUILD · `/spec-build <slug>`

**La UI se construye con `/impeccable craft`** (obligatorio en las mismas superficies),
sobre la dirección que ya fijó `shape`. No es una segunda ronda de diseño.

Se ejecuta `tasks.md` en orden, marcando cada tarea al completarla. Durante esta fase
el [contrato de implementación](../01-design/implementation-contract.md) es
innegociable — no se hardcodea color, no se hace markup a mano habiendo componente.

Si a mitad del build aparece algo que la spec no contempló: **se para y se actualiza
la spec**, no se improvisa. El desvío silencioso es el fallo más caro de este flujo.

### 4 — VERIFY · `/spec-verify <slug>`

**`/impeccable audit` es obligatorio** antes de llenar el bloque de verificación: el
contrato responde "¿está bien implementado?", `audit` responde "¿está bien diseñado?".

Se recorre la [Definition of Done](definition-of-done.md) completa y se registra el
resultado real en `spec.md` (sección *Verificación*). Un criterio no comprobado se
reporta como no comprobado — nunca se asume aprobado.

## Cuándo NO hace falta una spec

- Corrección de typo, copy, o un valor de token
- Bug con causa evidente y fix de una línea
- Cambio puramente mecánico (renombrar, mover, formatear)

Todo lo demás — feature nueva, sección de landing, pantalla de admin, refactor que
cruza archivos, cambio de esquema en Supabase — lleva spec.

## Numeración y estados

Las specs se numeran secuencialmente con cuatro dígitos: `0001-`, `0002-`, …
El número no se reutiliza aunque la spec se abandone.

| Estado | Significado |
|---|---|
| `draft` | En redacción, aún no aprobada |
| `approved` | Aprobada, lista para planear/construir |
| `in-progress` | Build en curso |
| `done` | Verificada contra la DoD |
| `dropped` | Abandonada (se conserva, con el motivo) |

El índice vivo está en [../03-specs/README.md](../03-specs/README.md).
