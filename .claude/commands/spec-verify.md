---
description: Recorre la Definition of Done sobre una spec y registra el resultado real
argument-hint: <NNNN-slug>
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

Vas a verificar `docs/03-specs/$1/` contra la Definition of Done.

## Contexto

- @docs/00-harness/definition-of-done.md — la lista completa
- @docs/04-decisions/0002-verificacion-pendiente.md — qué NO se puede verificar hoy y por qué

Lee `spec.md` para conocer los criterios de aceptación y los archivos tocados.

## Regla número uno

**Reporta lo que realmente pasó.** Si un comando falla, se dice, con su salida. Si un
punto no se pudo comprobar (por ejemplo, revisión visual sin correr la app), se marca
como **no comprobado** — jamás como aprobado. Un DoD lleno de checks optimistas es
peor que no tener DoD.

## A0. Diseño — `/impeccable audit` (OBLIGATORIO)

Si la `superficie` de la spec es `landing`, `admin`, `panel` o `auth`, **antes** de
llenar el bloque de verificación:

```
/impeccable audit
```

Es una auditoría a nivel de código, medible y verificable — complementa al contrato, no
lo sustituye. El contrato responde "¿está bien implementado?"; `audit` responde "¿está
bien diseñado?". Registra sus hallazgos en la sección *Verificación* de `spec.md`, junto
al resto. Un hallazgo que decides no atender se anota como pendiente, no se borra.

Si la superficie es `api` o `infra`, sáltalo y dilo en el reporte.

> Ver [ADR-0003](../../docs/04-decisions/0003-impeccable-obligatorio.md). Ruta del
> script en este repo: `node ~/.claude/skills/impeccable/scripts/context.mjs`.

## A. Tipos y lint

```bash
npm run typecheck     # LA puerta de tipos
npm run lint:check    # sin --fix
npm run build
```

`npm run build` **no verifica tipos ni lint** (`next.config.js` los ignora). No lo
reportes como puerta. Baseline: **0 errores de tipos**, 8 de lint — la regla es que tu
spec no los aumente. Reporta el conteo, no un ✅ genérico.

El typecheck está en cero: no hay deuda tolerada, así que cualquier error de tipos que
salga aquí lo introdujo esta spec y es bloqueante.

## B. Contrato de implementación

```bash
npm run contract
```

Baseline: 36 violaciones, todas `hex-en-tsx`. Las otras cinco reglas están en cero.
Verifica que
el número **no subió** y que los archivos que tocó esta spec no aparecen con
violaciones nuevas. El hook `PostToolUse` ya bloqueó cualquier violación añadida
durante el build, así que aquí solo confirmas.

Revisión visual: `Text` en vez de tags crudos, `Container`/`Col` en vez de divs,
toolkit antes que markup propio, `Icon` con prop `name`.

## D. Responsive y verificación visual

```bash
npm run shot                         # sm · md · lg
npm run shot -- / --cta "#agenda"
```

Pega el resultado real. Si el script encuentra algo, va al informe; si pasa, di también
que **abriste las capturas**. Una captura no mirada no es una revisión.
Ver [ADR-0004](../../docs/04-decisions/0004-verificacion-visual-y-assets.md).

Comprueba además que ningún placeholder de otra marca llegó al render, y que los
sustitutos temporales están marcados `TEMPORAL` y listados en los pendientes.

## C · E — criterios y accesibilidad

Recorre las secciones C, D y E de la DoD. Para lo que requiera ver la pantalla, dilo:
si no corriste la app, es **no comprobado**.

## F. Documentación

- ¿Cambió alguna verdad del repo? → actualizar constitución + ADR
- ¿Cambió una ruta o comando? → actualizar `docs/02-architecture/overview.md`

## Cierre

Escribe el bloque de verificación en la sección *Verificación* de `spec.md`, con el
formato de la DoD y **salidas reales**. Luego:

- Si todo pasó → estado `done` en `spec.md` y en `docs/03-specs/README.md`
- Si algo falló → el estado se queda en `in-progress` y listas qué falta, en orden

Termina con un veredicto de una línea: qué pasó, qué no, y qué queda pendiente.
