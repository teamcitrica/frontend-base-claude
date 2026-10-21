# TASKS — SPEC-0002

Checklist ejecutable. Cada tarea cabe en una sesión y apunta a un criterio de
aceptación de la spec. Se marca al completarla, no al empezarla.

## Preparación

- [x] T-01 · Medir la baseline real: `npm run typecheck`, `npm run lint:check`, `npm run contract`. Anotar las cifras en la bitácora → *(prep, AC-3, AC-4)*
- [x] T-02 · Capturas de referencia: `npm run dev` y `SHOT_DIR=.shots/before npm run shot -- --cta "#hero button"`. Abrir `/login`, `/forgot-password`, `/new-password`, `/signup`, `/admin` y `/panel` y anotar los errores de consola existentes. Antes, `yarn add -D playwright` (D-2) → *(prep, AC-5, AC-6)*
- [x] T-03 · Ajustar `spec.md` con D-1 y D-2 (alcance, AC-1) y corregir la ubicación de `.card-container` frente a `.bg-sidebar`/`.container-blue-principal` → *(prep)*

## Construcción

**Pasada 1: estilos y config** (commit `chore(styles): remove dead styles and config from previous projects`)

- [x] T-04 · `styles/custom.scss`: dejar solo la cabecera y `@import './webpages-styles/home.scss';`. Borrar `webpages-styles/sections.scss` y `themes/` → **AC-1**, **AC-2**
- [x] T-05 · Vaciar `08-components/components.scss` y `11-atomic-design/components.scss`, dejando un comentario de una línea con la función de la capa. Borrar `07-objects/objects.js`. Quitar Roboto y Poppins de `01-settings/settings.scss` → **AC-1**, **AC-2**
- [x] T-06 · `tailwind.config.js`: `heroui()` sin `themes`. Borrar `hero.ts`. `config/site.ts` (y `app/page.tsx` según D-1). `npm run typecheck` → **AC-1**, **AC-3**

**Pasada 2: TS huérfano** (commit `chore: remove orphan components, hooks and types`)

- [x] T-07 · Borrar la cadena de `quote-form`: `quote-form.tsx`, `useQuoteForm.ts`, `useBookingManagement.ts`, `calendar.tsx`, `animated-content.tsx`, `phone-codes.ts` → **AC-2**
- [x] T-08 · Borrar `cart-context.tsx`, `examples/`, `video.tsx` (y su export en `organisms/index.ts`), `useCalendarAvailability.ts`, `general.tsx`, `types.ts`, `types/components/`, `types/index.ts`, `section-typography.tsx`, `section-skeleton.tsx`. Borrar las carpetas que queden vacías → **AC-2**
- [x] T-09 · `npm run typecheck` en 0, y grep de AC-1 sin resultados → **AC-1**, **AC-3**

**Pasada 3: documentación** (commit `docs: drop references to removed files and previous projects`)

- [x] T-10 · `CLAUDE.md`: `impulso.scss` pasa a `home.scss`, y los 7 enlaces `docs/*.md` pasan a `docs/01-design/reference/*.md` → **AC-8**
- [x] T-11 · Editar `rebranding.md`, `02-architecture/overview.md`, `conventions.md`, `styles-overview.md`, `layout-system.md`, `citrica-ui-toolkit.md` y `.claude/agents/design-guardian.md` (líneas del plan) → **AC-7**
- [x] T-12 · Reemplazar los ejemplos "MASTERCLASS" (`web-guide.md`) y "Agregar al Carrito" (`layout-examples.md`) → **AC-8**
- [x] T-13 · Script de verificación: cada ruta citada en `CLAUDE.md`/`README.md` con `test -e`, y grep de nombres borrados en `docs/` (sin `03-specs/0001-*` ni `04-decisions`), `.claude/` y `CLAUDE.md` → **AC-7**, **AC-8**

**Comprobación visual**

- [ ] T-14 · `SHOT_DIR=.shots/after npm run shot -- --cta "#hero button"`. Código de salida 0. Comparar `before` contra `after` con `cmp`; si difieren, inspección visual de los pares y registro → **AC-5**
- [ ] T-15 · Recorrer las 7 rutas de AC-6 y comparar la consola con la de T-02 → **AC-6**

## Cierre

- [ ] T-90 · Correr greps del contrato sobre los archivos tocados → *(DoD B)*
- [ ] T-91 · `npm run typecheck`, `npm run lint:check`, `npm run contract` contra la baseline de T-01 (`npm run build` no verifica: ver CLAUDE.md) → *(DoD A, AC-3, AC-4)*
- [ ] T-92 · Revisar responsive en sm/md/lg (cubierto por T-14) → *(DoD D)*
- [ ] T-93 · Revisar contraste y foco visible: sin cambios esperados, se confirma en las capturas → *(DoD E)*
- [ ] T-94 · Pegar bloque de verificación en `spec.md` → *(DoD F)*
- [ ] T-95 · Mover estado de la spec a `done` en [el índice](../README.md) → *(DoD F)*

---

## Bitácora de desvíos

Todo lo que apareció y no estaba en la spec. Si algo llega aquí, se actualiza la spec
antes de seguir — no se improvisa.

| Fecha | Qué apareció | Qué se hizo |
|---|---|---|
| 2026-10-20 | `.card-container` está en `08-components`; `.bg-sidebar` y `.container-blue-principal`, en `11-atomic-design` (la spec las agrupaba) | Se corrige la spec en T-03. Sin cambio de alcance |
| 2026-10-20 | La doc de rebranding y `/brand-new` usan `siteConfig.navLinks`, pero la clave viva es `impulsoNavLinks` | D-1 aprobada: una sola clave `navLinks`. Spec actualizada |
| 2026-10-20 | Playwright no está instalado; AC-5 depende de `npm run shot` | D-2 aprobada: `playwright` como `devDependency`. Spec actualizada |
| 2026-10-20 | Quitar la lima de HeroUI afecta a 2 usos de `color="primary"` en el admin | Riesgo aceptado (era de otra marca); se registra en la verificación |
| 2026-10-20 | Baseline T-01: typecheck 0 · lint 8 errores / 751 warnings · contrato 36 en 16 archivos | Referencia para AC-3/AC-4 |
| 2026-10-20 | T-02: `playwright@1.64.1` instalado (D-2). `shot` determinista: dos tomas sin cambios dan bytes idénticos (`cmp`), así que AC-5 se puede comprobar byte a byte. Consola previa: solo `/admin` da 1 error (`Error fetching month stats`, sin Supabase). Capturas también de `/admin/clientes` para registrar el efecto HeroUI | Capturas en `.shots/before/` (gitignored) |
| 2026-10-20 | Consecuencia de D-1: `shared/components/organisms/navbar.tsx` (el `Navbar` del admin) también lee `siteConfig.navLinks` en su cajón móvil. Antes mostraba los enlaces de la masterclass y ahora los de ImPulso; en los dos casos son anclas de la landing que no existen en `/admin` | Sin cambio de código en el admin (fuera de alcance). Se reporta en la verificación |
| 2026-10-20 | Pasada 1 terminada: typecheck 0; `shot` de la landing idéntico byte a byte con la baseline (6/6) | — |
| 2026-10-20 | En T-12 aparecieron restos de dos proyectos más en los docs de referencia: "Taller / fotografía" (`web-guide.md:870`) y "Tatuajes / Piercings" (`layout-examples.md`, `tokens-examples.md`) | Cubiertos por la decisión del usuario en P-1 ("todos los proyectos anteriores hay que limpiarlos"). Reemplazados por copy ImPulso o neutro; spec (alcance y AC-8) ampliada |
