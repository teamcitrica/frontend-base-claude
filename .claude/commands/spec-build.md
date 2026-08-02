---
description: Ejecuta tasks.md de una spec planeada (fase BUILD del flujo SDD)
argument-hint: <NNNN-slug>
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, TodoWrite
---

Vas a implementar `docs/03-specs/$1/`.

## 1. Puerta de entrada

Lee `spec.md`, `plan.md` y `tasks.md` de esa carpeta. **Si no existe `plan.md`
aprobado, detente** y pide correr `/spec-plan $1` primero.

## 2. Contexto obligatorio

- @docs/01-design/implementation-contract.md — innegociable durante todo el build
- @docs/00-harness/conventions.md

## 3. Diseño — `/impeccable craft` (OBLIGATORIO)

Si la `superficie` de la spec es `landing`, `admin`, `panel` o `auth`, la UI se
construye con:

```
/impeccable craft
```

Trabaja **sobre la dirección de diseño que ya fijó `/impeccable shape` en la fase PLAN**
y sobre `tasks.md`. No es una segunda ronda de diseño: es construir lo que el plan ya
decidió, con el nivel de acabado que `craft` exige.

Si la superficie es `api` o `infra`, sáltalo.

> **Precedencia: donde `impeccable` choque con el contrato, gana el contrato.** Sus
> recomendaciones de `clamp()` y de composición de paleta **no** aplican aquí: la escala
> vive en `_text.scss` y el color en `_palette.scss`. El hook `PostToolUse` lo va a
> bloquear de todos modos — mejor no escribirlo. Ver
> [ADR-0003](../../docs/04-decisions/0003-impeccable-obligatorio.md).

> Su Setup pide `node .agents/skills/impeccable/scripts/context.mjs`. **Esa ruta no
> existe aquí.** Usa `node ~/.claude/skills/impeccable/scripts/context.mjs`.

## 4. Ejecuta

Carga las tareas de `tasks.md` en tu lista de TODOs y ve en orden. Marca cada tarea en
`tasks.md` **al completarla**, no al empezarla.

Mientras construyes, estas cuatro no se negocian:

1. **Cero hex** en `.tsx` y en `styles/webpages-styles/`. El color sale de
   `var(--color-*)`. Si el tono que necesitas no tiene token, derívalo con
   `color-mix()` sobre tokens — no inventes un hex ni un alias `--im-*`.
2. **Texto con `<Text variant="…">`**, nunca `<h1>`/`<p>` crudos, nunca `font-family`
   ni `clamp()` en la página.
3. **Layout con `Container` + `Col`**, nunca `<div>` con flex/grid a mano.
4. **Toolkit antes que markup propio.** Si dudas si existe el componente, revisa
   @docs/01-design/reference/citrica-ui-toolkit.md antes de escribirlo.

Recordatorio: `Icon` usa la prop `name`, no `iconName`.

## 5. Regla de desvío

Si aparece algo que la spec no contempla:

1. **Para.**
2. Anótalo en la *Bitácora de desvíos* de `tasks.md`.
3. Consulta al usuario y actualiza `spec.md`.
4. Recién entonces sigue.

Improvisar fuera de la spec es el fallo más caro de este flujo. Si además el desvío
te obliga a romper una regla del contrato, hace falta un ADR antes de continuar.

## 6. Verificación continua

El hook `PostToolUse` corre solo en cada Edit/Write y **bloquea si tu cambio añade una
violación del contrato**, comparando el archivo contra `git HEAD`. Si te llega ese
error, corrígelo antes de seguir — no lo ignores ni desactives el hook.

Para ver el estado global en cualquier momento:

```bash
npm run contract
```

**Y mira lo que construyes.** No cierres una pasada sin capturas:

```bash
npm run shot                         # sm(390) · md(768) · lg(1440)
npm run shot -- / --cta "#agenda"    # + CTA dentro del primer viewport
```

Falla con código 1 ante scroll horizontal, imagen rota, error de consola o CTA fuera del
fold. **Abre las capturas y míralas** — el verde solo cubre lo medible, no la jerarquía
ni el ritmo. No declares que no puedes inspeccionar visualmente: sí puedes.
Ver [ADR-0004](../../docs/04-decisions/0004-verificacion-visual-y-assets.md).

**Assets:** si falta un logo o una foto, pídelo, pon un sustituto propio marcado
`TEMPORAL`, u omítelo resolviendo el hueco. Nunca dejes el default de la librería — el
`Header` del toolkit sin `logo` pinta "Matour".

Si el archivo ya venía sucio (deuda preexistente, ver
@docs/04-decisions/0002-verificacion-pendiente.md), déjalo limpio al salir.

## 7. Cierra

Al terminar las tareas de construcción, corre `/spec-verify $1`. Reporta qué quedó
hecho y qué quedó abierto — sin adornar.
