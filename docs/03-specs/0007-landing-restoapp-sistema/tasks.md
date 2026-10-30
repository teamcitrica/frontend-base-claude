# TASKS — SPEC-0007

Checklist ejecutable. Cada tarea cabe en una sesión y apunta a un criterio de
aceptación de la spec. Se marca al completarla, no al empezarla.

## Preparación

- [x] T-01 · Releer el [contrato](../../01-design/implementation-contract.md) y *Surface: /test-3-sistema* de `docs/design.md` → *(prep)*
- [x] T-02 · Confirmar los tokens que consume cada componente (tabla del plan) y que `--space-12`, `--radius-pill`, `--color-tertiary`, `--color-outline` existen → *(prep)*

## Sistema (antes de la página)

- [x] T-03 · `shared/project-components/resto-app/cuenta.ts`: lógica y constantes (comisión, dígitos, formatos, WhatsApp, URL de prueba) → **AC-6, AC-7**
- [x] T-04 · `styles/08-components/_resto-app.scss` + `@import`: `.c-landing`, `.c-ticket`, `.c-row`, `.c-figure`, `.c-total`, `.c-module`, `.c-logo`, solo tokens → **AC-2**
- [x] T-05 · `_button.scss`: secundario sobre `.o-section--inverse` con la pareja crema → **AC-2**
- [x] T-06 · Componentes: `LandingShell`, `BrandLogo`, `DemoButton`/`TrialButton`/`QuoteButton`, `TicketCard`, `ModuleCard`, `AccountRow`/`CompareRow`/`TotalBand`/`ChannelTag`, `AmountField`, `index.ts` → **AC-2**

## Página

- [x] T-07 · `page.tsx` (servidor, `buildMetadata`) + `site-header.tsx` con el logo real → **AC-3**
- [x] T-08 · Hero: H1, bajada, demo + prueba, ticket "Cierre del turno" (Muestra) → **AC-4**
- [x] T-09 · Medir el hero: `npm run shot -- /test-3-sistema --cta …` en sm/md/lg y mirar las capturas antes de seguir → **AC-4**
- [x] T-10 · Canales + Caos vs. un solo flujo → **AC-5**
- [x] T-11 · Operación en vivo + Finanzas (ejemplo $12 marcado) → **AC-5**
- [x] T-12 · Roles (inverse) → **AC-5**
- [x] T-13 · La cuenta de la comisión: 2 campos, filas mes/año, banda, "Cotiza tu plan fijo" → **AC-6, AC-7**
- [x] T-14 · Preguntas (`Accordion`), cierre (inverse) y pie con logo light → **AC-3, AC-5, AC-7**
- [x] T-15 · Comprobar AC-1: sin `test-3-sistema.scss`, `grep "test-3-sistema__"` = 0, sin `style=` → **AC-1**

## Cierre

- [x] T-90 · `npm run contract` + greps del contrato sobre los archivos tocados → *(DoD B)*
- [x] T-91 · `npm run typecheck` y `npm run lint:check` (el build no verifica) → *(DoD A)*
- [x] T-92 · `npm run shot` en sm/md/lg de `/test-3-sistema` + regresión de `/`, `/test-1-sin-brief` y `/test-2-corto` (por el cambio en `_button.scss`) → *(DoD D)*
- [x] T-93 · Contraste medido, foco tabulando, áreas táctiles, reduced-motion → *(DoD E)*
- [x] T-94 · Pegar bloque de verificación en `spec.md` y ruta en `overview.md` → *(DoD F)*
- [ ] T-95 · Mover estado de la spec a `done` en [el índice](../README.md) → *(DoD F)*

---

## Bitácora de desvíos

Todo lo que apareció y no estaba en la spec. Si algo llega aquí, se actualiza la spec
antes de seguir — no se improvisa.

| Fecha | Qué apareció | Qué se hizo |
|---|---|---|
| 2026-10-30 | La sombra "Papel" y el `outline-offset` del foco eran medidas literales en `_resto-app.scss`: AC-2 (solo tokens) no se cumplía, y la escala de espacio no baja de 4px | Nuevo token de fundamentos `--shadow-paper` en `styles/10-tokens/web/foundations/_elevation.scss` (la sombra que `design.md` ya nombra); offset del foco a `var(--space-1)` (3→4px). Medio para cumplir un AC aprobado, sin alcance nuevo |
| 2026-10-30 | En la cuenta, el plan ponía 3 `ModuleCard` para los argumentos; con el ticket al lado quedaba una retícula de tarjetas iguales (lo que `craft-floor` rechaza) | Los argumentos (monto fijo, 0 %, contrato anual, soporte, actualizaciones) van como `AccountRow` en un `TicketCard` "Con Resto App": misma información, gramática de ticket. `ModuleCard` sigue reutilizada (operación ×3, finanzas ×2) |
| 2026-10-30 | El logo del pie se estiraba a 1216px dentro de la `Stack` (flex en columna) y quedaba centrado | `align-self: flex-start` en `.c-logo` (el componente, no la página) |
