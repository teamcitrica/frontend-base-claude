# TASKS — SPEC-0008

Checklist ejecutable. Cada tarea cabe en una sesión y apunta a un criterio de
aceptación de la spec. Se marca al completarla, no al empezarla.

## Preparación

- [x] T-01 · Confirmar `citrica-ui-toolkit@0.0.30` en npm y que su `dist` trae `AdminNavbar` y las props nuevas del `Sidebar` → *(prep)*
- [x] T-02 · Instalar la versión exacta; `npm run typecheck` → **AC-1**

## Construcción

- [x] T-03 · `BrandLogo` con `variant="mark"` y tamaño `sm` → **AC-2, AC-3**
- [x] T-04 · Rol en el menú de la cuenta desde `userInfo.name` (BD); `roleLabels` descartado → **AC-4**
- [x] T-05 · `SidebarNavProps` + `sidebar-nav.tsx` con las props nuevas → **AC-2, AC-3**
- [x] T-06 · `AdminShell` + `_admin-shell.scss` → **AC-2, AC-3, AC-4**
- [x] T-07 · `app/admin/layout.tsx` sobre `AdminShell`, sin Tailwind ni hex → **AC-5**
- [x] T-08 · Borrar `navbar.tsx`, `user-box.tsx`, `drop-citrica.tsx` y su export → **AC-5**
- [x] T-09 · Mirar `/admin/reservas` en sm/md/lg (con sesión) y probar colapso, ☰, Escape y cerrar sesión → **AC-2, AC-3, AC-4**

## Cierre

- [ ] T-90 · `npm run contract` (35 → 23) + greps sobre los archivos tocados → *(DoD B)*
- [ ] T-91 · `npm run typecheck` y `npm run lint:check` → *(DoD A)*
- [ ] T-92 · `npm run shot` de las landings y `/login` (regresión del toolkit) → *(DoD D)*
- [ ] T-93 · Foco tabulando, áreas táctiles, contraste sobre `--color-admin-*` → *(DoD E)*
- [ ] T-94 · Bloque de verificación en `spec.md` y `overview.md` → *(DoD F)*
- [ ] T-95 · Estado `done` en [el índice](../README.md) → *(DoD F)*

---

## Bitácora de desvíos

| Fecha | Qué apareció | Qué se hizo |
|---|---|---|
| 2026-11-10 | La `0.0.29` publicada no trae `AdminNavbar` ni las props nuevas del `Sidebar` (`grep` en su `dist/index.d.ts`: 0); la `0.0.30`, publicada dos minutos después, sí | Se instala la `0.0.30`; spec, plan y tareas actualizados a esa versión |
| 2026-11-10 | El `md` del repo (`$break-tablet` 610px → 611px) no coincide con el `md` de Tailwind (768px) que usan `Sidebar` y `AdminNavbar`: entre 611 y 767px el armazón y el toolkit cambiarían de modo en anchos distintos | Primero un mixin `toolkit-md()` (768px). Luego el usuario ajustó los breakpoints del repo (`$break-tablet` 767px → `md()` desde 768px; `$break-desktop` 1279px → `lg()` desde 1280px): `md()` ya coincide con el toolkit, así que se borró `toolkit-md()` y `_admin-shell.scss` usa `md()` |
| 2026-11-10 | `AuthContextProvider` está comentado en `app/layout.tsx`: `UserAuth()` devuelve `{}` y `/admin` se pinta sin sesión (ya pasaba antes de esta spec); `signOut` no existe | `signOut?.()` en el menú de la cuenta para que no lance error; `/admin` se pudo verificar en el navegador sin sesión |
| 2026-11-10 | **Toolkit:** los ítems principales del `Sidebar` y su botón de colapsar no tienen foco visible (medidos los 4 mecanismos tabulando: sin `outline`, sombra, fondo ni borde nuevos); el ☰ del `AdminNavbar` mide 40×40 (AC-6 pide ≥ 44) | Decisión del usuario: **parche aquí mientras tanto**. `className="c-sidebar"` (pasa por `SidebarNav`) + outline de 2px `--color-admin-primary` en `styles/11-atomic-design/components.scss`, marcado TEMPORAL hasta que el toolkit lo corrija. El ☰ de 40px queda pendiente en el toolkit |
| 2026-11-10 | El nombre del rol ya viene de la BD (`get_user_with_role`); el mapeo `roleLabels` en `config/site.ts` sobraba (decisión del usuario) | Se borró `roleLabels`; `AdminShell` usa `userInfo.name`. No verificable sin sesión real: el usuario confirma el campo al probar |
| 2026-11-10 | Revisión de lo estrictamente necesario con el usuario: el organismo `AdminShell` aparte no lo era (un solo consumidor) | Su contenido pasa a `app/admin/layout.tsx`; se borran `admin-shell.tsx` y su export. Se mantienen el CSS del armazón, el scroll propio, los logos y el parche de foco |
