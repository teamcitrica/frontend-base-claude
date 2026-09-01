---
description: Redacta plan.md y tasks.md para una spec aprobada (fase PLAN del flujo SDD)
argument-hint: <NNNN-slug>
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

Vas a planear la implementación de `docs/03-specs/$1/`.

## 1. Puerta de entrada

Lee `docs/03-specs/$1/spec.md`. **Si su estado no es `approved`, detente** y dile al
usuario qué falta (preguntas abiertas sin resolver, aprobación pendiente). No planees
sobre una spec en `draft`.

## 2. Contexto obligatorio

- @docs/01-design/implementation-contract.md — las 4 reglas
- @docs/00-harness/conventions.md — dónde va cada archivo
- @docs/01-design/reference/citrica-ui-toolkit.md — qué componentes ya existen

## 3. Diseño — `/impeccable shape` (OBLIGATORIO)

Si la `superficie` de la spec es `landing`, `admin`, `panel` o `auth`, **antes de
escribir una línea de `plan.md`**:

```
/impeccable shape
```

`shape` es planificación de diseño y no escribe código, así que cae exactamente en esta
fase. Su salida —jerarquía, estructura de secciones, ritmo, densidad, dirección
tipográfica— es **entrada** del `plan.md`, no un anexo. Un plan que no la incorpora está
incompleto.

Si la superficie es `api` o `infra`, sáltalo: no hay interfaz que diseñar.

> **Precedencia: donde `impeccable` choque con el contrato, gana el contrato.**
> Sin `clamp()` en `styles/webpages-styles/` (la escala vive en `_text.scss`). Sin
> paletas nuevas ni OKLCH suelto (el color vive en `_palette.scss`). Texto con `Text`,
> layout con `Container`/`Col`. Si su propuesta amerita romper una regla, el ADR va
> primero. Ver [ADR-0003](../../docs/04-decisions/0003-impeccable-obligatorio.md).

> Su Setup pide `node .agents/skills/impeccable/scripts/context.mjs`. **Esa ruta no
> existe aquí.** Usa `node ~/.claude/skills/impeccable/scripts/context.mjs`.

## 4. Investiga antes de planear

No planees a ciegas. Verifica contra el repo real:

```bash
# ¿Qué tokens de color existen ya?
grep -n 'color-' styles/10-tokens/web/colors/_palette.scss

# ¿Qué variantes de texto hay?
grep -n 'variant' styles/10-tokens/web/components/_text.scss

# ¿Ya existe un componente que resuelva esto?
ls shared/components/organisms/ shared/project-components/
```

Toda ruta que pongas en el plan tiene que existir, o ir marcada `[nuevo]`.

## 5. Escribe `plan.md`

Puntos donde se juega la calidad del plan:

- **Componentes y tokens:** llena la tabla con lo que se **reutiliza**. Si vas a
  escribir SCSS o markup propio, justifica ahí mismo por qué el toolkit no alcanza.
  Esta justificación es la puerta que impide reinventar componentes.
- **Riesgos:** qué se rompe, no solo qué podría salir mal.
- **Alternativas descartadas:** una línea de por qué. Evita rediscutir lo mismo después.
- **Impacto en la constitución:** si el plan necesita romper una regla del contrato,
  marca que requiere ADR — y escríbelo **antes** de construir.
- **Dirección de diseño:** resume qué salió de `/impeccable shape` y qué de eso se
  adopta. Si descartaste alguna de sus propuestas por chocar con el contrato, dilo ahí
  con una línea de por qué.

## 6. Escribe `tasks.md`

- Cada tarea cabe en una sesión.
- Cada tarea de construcción apunta a un criterio de aceptación (`→ **AC-1**`).
- No borres las tareas de cierre (T-90 a T-95): son la DoD.

## 7. Cierra

Mueve el estado de la spec a `in-progress` **solo cuando el usuario apruebe el plan**.
Reporta: enfoque en dos líneas, archivos que se tocan, riesgos, y si hace falta ADR.

**No escribas código en esta fase.**
