# TASKS — SPEC-0004

Checklist ejecutable. Cada tarea cabe en una sesión y apunta a un criterio de
aceptación de la spec. Se marca al completarla, no al empezarla.

## Preparación

- [x] T-01 · Baseline: `typecheck`, `lint:check`, `contract` (esperado 0 / 7 / 35) → *(prep, AC-7)*
- [x] T-02 · Capturas `s4-before` de `/` (dos tomas, comprobar determinismo); captura del estado de éxito del formulario (Playwright: llenar, enviar, `#agenda`); conteo de `section`/`footer`/`ul`/`ol`/`li` e `id` de ancla; `animationDelay` de los 4 hijos del hero → *(prep, AC-1, AC-6)*
- [x] T-03 · Aplicar a `spec.md` los "Ajustes a la spec" del plan (AC-1, AC-3, AC-5 y alcance) → *(prep)*

## Construcción

**Paso 1: ADR** (commit `docs(adr): add 0007 layout with primitives`)

- [x] T-04 · ADR-0007, fila en el índice y regla 4 y mapa del contrato → *(prerrequisito de todo commit en `styles/` o `shared/`)*

**Paso 2: primitivas** (commit `feat(layout): add layout primitives`)

- [ ] T-05 · `$space-steps` en `_space.scss` (misma salida: verificar `--space-*` en el navegador) y `types.ts` → **AC-4**
- [ ] T-06 · `Section`, `Stack`, `Cluster` + su SCSS en `07-objects` → **AC-2**
- [ ] T-07 · `Media`, `AutoGrid` + SCSS; `u-measure-*` en `09-utilities` → **AC-2**
- [ ] T-08 · `Grid` + `Cell` + SCSS (líneas con nombre, clases `start`/`end`/`row` por breakpoint, `breakout`) → **AC-5**
- [ ] T-09 · Barrel `index.ts`. AC-4: archivo temporal con `gap={5}` y `rhythm="huge"` → typecheck falla → borrar → 0. `shot` sin cambios (6/6) → **AC-4**, **AC-1**

**Paso 3: migración de la landing** (commit `refactor(home): compose sections with layout primitives`)

- [ ] T-10 · `prueba-social`, `problema`, `sistema`, `solucion` → `cmp` → **AC-1**, **AC-2**
- [ ] T-11 · `metodo` (`Grid` + `AutoGrid`), `resultados`, `confianza`, `garantia` → `cmp` → **AC-1**, **AC-2**
- [ ] T-12 · `agenda` (formulario) y `site-footer` → `cmp` + estado de éxito del formulario → **AC-1**, **AC-2**
- [ ] T-13 · Hero a `Grid` + `Cell` → `cmp`, CTA en el fold, `animationDelay` → **AC-1**
- [ ] T-14 · `home.scss`: borrar patrones migrados, conservar gestos. Greps de AC-2 y AC-3. Conteo semántico de AC-6 → **AC-2**, **AC-3**, **AC-6**

**Paso 4: `/dev/layout`** (commit `feat(dev): add /dev/layout primitives guide`)

- [ ] T-15 · `page.tsx` (`noIndex`), `layout-guide.tsx`, `content.ts` (explicaciones y snippets de las 7 primitivas) → **AC-8**
- [ ] T-16 · Demos: `Section` (ritmos y tonos), `Stack`, `Cluster`, `Media`, `AutoGrid` → **AC-8**
- [ ] T-17 · `Grid`: guía de 12 columnas, `Col` contra `Cell`, y los 4 gestos (foto a sangre, asimetría, superposición, salida parcial) con su comportamiento en `sm` → **AC-5**, **AC-8**
- [ ] T-18 · `shot -- /dev/layout`, abrir capturas, medir AC-5 en `sm`/`md`/`lg`, comprobar `noindex` en el HTML → **AC-5**, **AC-8**

**Paso 5: documentación** (commit `docs: document layout primitives`)

- [ ] T-19 · `conventions.md` (estructura de una página), `design.md` §5, `layout-system.md`, `CLAUDE.md` → **AC-9**

## Cierre

- [ ] T-90 · Greps del contrato sobre los archivos tocados → *(DoD B)*
- [ ] T-91 · `typecheck`, `lint:check`, `contract` contra T-01. El build falla por S3 desde antes; se reporta → *(DoD A, AC-7)*
- [ ] T-92 · Responsive sm/md/lg de `/` y `/dev/layout` → *(DoD D)*
- [ ] T-93 · Foco tabulando con teclado en `/dev/layout` (página nueva) y en el hero → *(DoD E)*
- [ ] T-94 · `/impeccable audit` y bloque de verificación en `spec.md` → *(DoD F, G, AC-9)*
- [ ] T-95 · Estado `done` en [el índice](../README.md) → *(DoD F)*

---

## Bitácora de desvíos

| Fecha | Qué apareció | Qué se hizo |
|---|---|---|
| 2026-10-20 | Baseline T-01: typecheck 0 · lint 7 · contrato 35. Semántica: 10 `section`, 1 `footer`, 4 `ul`, 1 `ol`, 16 `li`, 1 `h1`, 8 `h2`, 7 `h3`; ids `hero,prueba,problema,sistema,solucion,metodo,resultados,confianza,garantia,agenda`; hijos del hero `home-rise 0.46s` con delay 0.04/0.11/0.18/0.25s. El estado de éxito del formulario es determinista (`cmp`) | Referencias en `.shots/s4-before/` |
| 2026-10-20 | **`npm run shot` dejó de ser determinista**: de tres tomas sin cambios, `md`, `sm` y `sm-fold` difirieron entre la 1 y la 2, y `lg` entre la 2 y la 3. Con el comparador de píxeles: fotos de Unsplash a medio cargar en la primera toma tras reiniciar (hasta 205 por canal), ruido de recodificación después (≤ 11) y el indicador "N" de Next en `sm` | AC-1 pasa a comparar capturas de layout con imágenes ocultas (`visibility: hidden`) y sin el indicador, más las cajas de cada imagen. Piso de ruido medido en tres tomas: 7–18 píxeles y ≤ 11 por canal (antialiasing de iconos SVG); cajas idénticas. Umbral: ≤ 32 px y ≤ 16. `shot` se sigue corriendo para sus chequeos. Spec actualizada (AC-1) |
| 2026-10-20 | T-03 aplicado: AC-1 (método y estado de éxito), AC-3 (`home__hero-actions` se queda como gesto), AC-5 (se mide en `/dev/layout`) y alcance (`u-measure-*`) | — |
