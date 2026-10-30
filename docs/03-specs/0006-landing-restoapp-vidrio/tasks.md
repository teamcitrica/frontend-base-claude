# TASKS — SPEC-0006

Checklist ejecutable. Cada tarea cabe en una sesión y apunta a un criterio de
aceptación de la spec. Se marca al completarla, no al empezarla.

## Preparación

- [x] T-01 · Leer contrato, `conventions.md`, `design.md` (Surface: /test-2-corto) y el Direction contract (`impeccable surface-brief read app/test-2-corto/page.tsx`) → *(prep)*
- [x] T-02 · ~~Forzar `plates`~~ → build **code-led** por decisión del usuario (ver bitácora): `state.json` apartado; `spec.json`/`regions.json` se conservan para `comp-diff` → *(prep)*

## Construcción

- [x] T-03 · Esqueleto: `page.tsx` con `buildMetadata`, wrapper `.test-2-corto`, `test-2-corto.scss` + `@import` → **AC-8**, **AC-9**
- [x] T-04 · Header con wordmark TEMPORAL y CTA "Pedir demo" → **AC-1**, **AC-7**
- [x] T-05 · Hero (composición del comp): ambiente (azul profundo + luces coral/celeste), pila de 3 paneles de vidrio, titular "Todo tu local, un solo cierre", bajada, CTA con halo, 2 mocks con `mock-cierre.tsx`, badge → **AC-2**, **AC-5**
- [x] T-06 · **Medir el hero:** `npm run shot -- /test-2-corto --cta "#inicio .btn-primary"`, `comp-diff` contra el comp (`--spec .impeccable/build/spec.json --out-dir .impeccable/review/diff/hero`), alinear por `inkBox` y luego escala; máx. 2 rondas; registrar el puntaje (sin `build-phase`) → **AC-2**, **AC-3**
- [x] T-07 · Vidrio legible: contraste ≥ 4.5:1 en el punto más claro, ≤ 2 capas bajo texto, fallback `@supports` → **AC-4**
- [x] T-08 · `sm`: un solo panel, un mock bajo el CTA, badge oculto; CTA en el fold → **AC-3**, **AC-8**
- [x] T-09 · Qué incluye (entra 4 → sale 3) en papel crema → **AC-6**
- [x] T-10 · Precio en ticket con banda de total y rótulo de referencia → **AC-6**
- [x] T-11 · CTA final + footer → **AC-7**, **AC-8**
- [x] T-12 · Motion (luces estáticas, `prefers-reduced-motion`) y responsive revisados con capturas → **AC-8**, **AC-9**
- [x] T-13 · Accesibilidad: foco tabulando, controles ≥ 48px, mocks `aria-hidden` o descritos → **AC-5**, **AC-9**

## Cierre

- [x] T-90 · `npm run contract` + greps sobre los archivos tocados → *(DoD B)* **AC-9**
- [x] T-91 · `npm run typecheck` (0) y `npm run lint:check` (sin errores nuevos) → *(DoD A)* **AC-9**
- [x] T-92 · `npm run shot -- /test-2-corto` en sm/md/lg, exit 0, capturas leídas; `comp-diff` final en `diff/final` (comp como referencia de crítica) → *(DoD D)* **AC-2**, **AC-8**
- [x] T-93 · Contraste y foco medidos; `/impeccable audit` sobre la ruta → *(DoD E, G)*
- [x] T-94 · Bloque de verificación en `spec.md` → *(DoD F)*
- [ ] T-95 · Estado `done` en [el índice](../README.md) → *(DoD F)*

---

## Bitácora de desvíos

| Fecha | Qué apareció | Qué se hizo |
|---|---|---|
| 2026-10-30 | El comp elegido (Glassmorphism) choca con la marca registrada (ADR-0009) y con "Paper Not Glass" | Usuario: "Vidrio con colores Resto" — composición del comp, colores y fuentes de marca, solo en esta ruta; `design.md` amplió la excepción acotada |
| 2026-10-30 | `comp-spec` marcaba el resplandor alrededor de los mocks como arte cortado | `bleed: true` en `phone-mocks` (el resplandor es la textura `ambient-light`) |
| 2026-10-30 | El gate `spec` pedía `font-match --rank` | Ranking solo entre candidatas de marca (Oleo Script / Lora); nota en `build-phase` |
| 2026-10-30 | Build: el gate `plates` de impeccable exige 3 rasters del comp y una revisión en navegador; rechazó dos veces el paso forzado aun con las palabras del usuario ("Usa los colores de Resto y componentes reales en lugar de las imágenes del comp; acepto que el hero no sea idéntico al comp") | Usuario: "Cambiar a code-led". Seguimiento de fases retirado (`state.json` apartado al scratchpad); el comp queda como referencia de crítica; `comp-diff` se corre a mano para AC-2. Spec y plan actualizados |
| 2026-10-30 | Build: contraste del texto sobre el vidrio medido píxel a píxel; con tinte 42 % la bajada y los mocks quedaban < 4.5:1 en su peor punto | Tinte del vidrio con texto a 60 % de azul profundo; medición sobre el área real de las letras (bajada 10.42:1, titular 6.23:1, mocks ≥ 8.6:1) |
| 2026-10-30 | Build: foco del CTA del hero en azul sobre vidrio azul | Contorno crema dentro de `.test-2-corto__ambient` |
| 2026-10-30 | Build: teléfonos con proporción 9/17 dejaban un vacío de vidrio en sm/md | Proporción de teléfono solo en lg (como el comp) |
| 2026-10-30 | `comp-diff` del hero: 36 % tras 2 rondas (titular ya no `missing`; mocks `missing` 22 %) | Distancia atribuible a las decisiones del usuario (colores/fuentes de marca, mocks con componentes) y al `Header` del toolkit; se para tras 2 rondas (§4b) y se registra |
