# TASKS — SPEC-0003

Checklist ejecutable. Cada tarea cabe en una sesión y apunta a un criterio de
aceptación de la spec. Se marca al completarla, no al empezarla.

## Preparación

- [x] T-01 · Baseline: `npm run typecheck`, `lint:check` y `contract` (esperado 0 / 7 / 35) → *(prep, AC-5)*
- [x] T-02 · `npm run dev` y `SHOT_DIR=.shots/s3-before npm run shot -- / --cta "#hero button"`. Repetir en `s3-before2` y confirmar con `cmp` que siguen siendo deterministas → *(prep, AC-3)*

## Construcción

**Paso 1: ADR y documentación** (commit `docs(adr): add 0006 design docs reflect the render`)

- [x] T-03 · Escribir ADR-0006 y su fila en `docs/04-decisions/README.md` → **AC-6**
- [x] T-04 · `docs/design.md`: frontmatter (`rounded`, `spacing`, `grid`) y §5, §6 (card) y §7 con los valores y nombres reales → **AC-4**
- [x] ~~T-05 · `brand.md`~~ Fuera de alcance (decisión del 2026-10-20) → —

**Paso 2: tokens** (commit `feat(tokens): add web foundation tokens`)

- [ ] T-06 · Crear `foundations/_space.scss`, `_radius.scss`, `_motion.scss`, `_measure.scss` e `_index.scss` → **AC-1**
- [ ] T-07 · `generic.scss`: importar e incluir `foundation-tokens` en `:root` antes de `form-tokens`. `_form.scss`: `--form-radius-btn: var(--radius-pill)` → **AC-1**
- [ ] T-08 · Comprobar AC-1 en el navegador (Playwright: `getComputedStyle(documentElement)` para los 7 tokens de muestra) → **AC-1**

**Paso 3: migración** (commit `refactor(home): consume foundation tokens`)

- [ ] T-09 · `home.scss`: quitar el bloque `--home-*` de `.home` y reemplazar los 36 usos según la tabla del plan → **AC-2**
- [ ] T-10 · `home.scss`: ritmo de sección con `--section-y*`; radios, duraciones, curva y medidas a tokens. Marcar los gestos de página con `// gesto:` → **AC-2**
- [ ] T-11 · Greps de AC-2 → **AC-2**
- [ ] T-12 · Reiniciar dev, `SHOT_DIR=.shots/s3-after npm run shot -- / --cta "#hero button"`, `cmp` contra `s3-before` y abrir capturas → **AC-3**

**Paso 4: documentación de referencia** (commit `docs: document foundation tokens`)

- [ ] T-13 · Mapa de archivos del contrato, `tokens-system.md`, `rebranding.md` (Paso 5) y `CLAUDE.md` → **AC-4**
- [ ] T-14 · AC-4: cada `--space-*`, `--radius-*`, `--duration-*`, `--ease-out`, `--measure-*` y `--section-y*` citado en `docs/` (fuera de `03-specs` y `04-decisions`) existe en `styles/` → **AC-4**

## Cierre

- [ ] T-90 · Correr greps del contrato sobre los archivos tocados → *(DoD B)*
- [ ] T-91 · `npm run typecheck`, `lint:check` y `contract` contra T-01. `npm run build` falla por S3 desde antes (SPEC-0002); se reporta igual → *(DoD A, AC-5)*
- [ ] T-92 · Revisar responsive en sm/md/lg (cubierto por T-12) → *(DoD D)*
- [ ] T-93 · Contraste y foco: sin cambios esperados, confirmado por `cmp` → *(DoD E)*
- [ ] T-94 · Pegar bloque de verificación en `spec.md` → *(DoD F)*
- [ ] T-95 · Mover estado de la spec a `done` en [el índice](../README.md) → *(DoD F)*

---

## Bitácora de desvíos

Todo lo que apareció y no estaba en la spec. Si algo llega aquí, se actualiza la spec
antes de seguir — no se improvisa.

| Fecha | Qué apareció | Qué se hizo |
|---|---|---|
| 2026-10-20 | `--radius-pill` no tenía consumidor en `home.scss`; el único uso de 999px está en `_form.scss` (`--form-radius-btn`). La spec dejaba `_form.scss` fuera de alcance | El plan propone que `--form-radius-btn` pase a `var(--radius-pill)` (mismo valor) para que el token nazca con consumidor. **Aprobado** (2026-10-20). Spec actualizada |
| 2026-10-20 | Usuario: `brand.md` es un ejemplo de brand book y se actualiza luego; la prioridad es que el sistema sea fácil de usar para desarrolladores y para la IA | `brand.md` sale del alcance (T-05, AC-4). Su bloque `--space-1: 8px` queda como pendiente conocido |
| 2026-10-20 | Baseline T-01: typecheck 0 · lint 7 errores / 733 warnings · contrato 35. T-02: `s3-before` y `s3-before2` idénticas (`cmp` 6/6) e idénticas también al `after` de SPEC-0002 | Referencia para AC-3/AC-5 |
