---
id: 0008
slug: admin-navbar-sidebar
titulo: Barra superior y sidebar del admin con los componentes nuevos del toolkit
estado: in-progress  # draft | approved | in-progress | done | dropped
creada: 2026-11-10
superficie: admin  # landing | admin | panel | auth | api | infra
---

# SPEC-0008 — Barra superior y sidebar del admin con los componentes nuevos del toolkit

## Problema

Quien entra al admin (`/admin/*`) ve una barra superior que solo muestra su nombre en un
desplegable hecho a mano, sin menú en el celular: el botón ☰ está comentado y el
`Drawer` que abre nunca se usa. El sidebar no se puede colapsar ni tiene logo, y el
fondo del panel es un hex suelto (`#EFE6DC`) ajeno a la marca.

Del lado del código, la barra (`organisms/navbar.tsx`), el `UserBox`
(`app/hooks/user-box.tsx`) y su desplegable (`organisms/drop-citrica.tsx`) cargan
**12 de las 35 violaciones de contrato** del repo, y el toolkit ya tiene piezas propias
para lo mismo.

## Por qué ahora

`citrica-ui-toolkit` incorpora `AdminNavbar` (cuenta, avisos, ☰ móvil) y un `Sidebar`
nuevo (colapsable, logo, drawer móvil controlado desde afuera). Usarlos aquí deja la
base al día con la librería y borra la mayor concentración de deuda de contrato.

## Alcance

- **Dependencia:** `citrica-ui-toolkit` de `0.0.26` a `0.0.30` (la publica el equipo
  con los cambios de `AdminNavbar` y `Sidebar`).
- **`app/admin/layout.tsx`:** estructura de dos columnas con el `Sidebar` y el
  `AdminNavbar` del toolkit, como en el ejemplo `example/app/admin-navbar` del toolkit;
  contenido con su propio scroll en escritorio; fondo desde tokens `--color-admin-*`.
- **Sidebar** (vía `organisms/sidebar-nav.tsx`, que se mantiene: navegación con
  `next/navigation`, ítem activo y filtrado por rol):
  - logo de la marca en la cabecera;
  - colapsable en escritorio (el estado lo recuerda el toolkit);
  - drawer móvil abierto desde el ☰ del navbar, con el foco de vuelta al ☰ al cerrar.
- **AdminNavbar:**
  - ☰ + logo compacto en celular, barra fija arriba al hacer scroll;
  - menú de cuenta con el nombre (`first_name last_name` de `userInfo`) y la opción
    **"Cerrar sesión"** (`signOut()` del contexto de auth);
  - **sin campanita** (no hay fuente de avisos todavía).
- **Se borran:** `shared/components/organisms/navbar.tsx`, `app/hooks/user-box.tsx`,
  `shared/components/organisms/drop-citrica.tsx` y su export en `organisms/index.ts`
  (ningún otro archivo los usa).

## Fuera de alcance

- Campanita de avisos y cualquier consulta nueva a Supabase.
- Organización/sede (`organization`) y bloque de usuario dentro del sidebar.
- Opción "Mi perfil" (no existe la página).
- `FilterButtonGroup`, `SortableTable` y los cambios de `DataTable`, `Login`,
  `Signup` del toolkit: llegan con la versión, pero no se adoptan aquí.
- Cambiar el contenido de las páginas del admin (reservas, clientes, tareas…).
- Los `--form-*-border-size-*` de 2px → 1px que el toolkit cambió **solo en su
  ejemplo**: aquí no se tocan.
- `/panel` y las rutas de landing.

## Criterios de aceptación

### AC-1 — Toolkit actualizado sin regresiones
- **Dado** `citrica-ui-toolkit@0.0.30` instalado (versión exacta en `package.json`, no
  un enlace local)
- **Cuando** corro `npm run typecheck` y `npm run shot` sobre `/`, `/test-1-sin-brief`,
  `/test-2-corto` y `/test-3-sistema`
- **Entonces** typecheck da 0 y las cuatro rutas pasan sin hallazgos nuevos (el toolkit
  también cambió `Input` y `Autocomplete`, que usan las landings).

### AC-2 — Escritorio
- **Dado** una sesión de admin en `/admin/reservas` a 1440px
- **Entonces** se ve el sidebar con el logo y los ítems filtrados por rol, el ítem
  activo marcado (también el subítem con `?page=…`), y a la derecha la barra superior
  con el avatar y el nombre; el contenido hace scroll sin mover sidebar ni barra.
- **Cuando** colapso el sidebar
- **Entonces** queda en modo íconos, el contenido gana el ancho, y al recargar sigue
  colapsado.

### AC-3 — Celular
- **Dado** `/admin/reservas` a 390px
- **Entonces** el sidebar no ocupa la pantalla; la barra superior muestra ☰ + logo
  compacto + avatar, y queda fija al hacer scroll.
- **Cuando** pulso ☰
- **Entonces** se abre el menú lateral (`aria-expanded="true"` en el ☰); al elegir un
  ítem navega y se cierra; al cerrarlo con Escape el foco vuelve al ☰.

### AC-4 — Cuenta y cierre de sesión
- **Cuando** abro el menú de la cuenta
- **Entonces** veo mi nombre y "Cerrar sesión"; al elegirlo se llama `signOut()` y
  termino fuera del admin (en `/logout` → `/login`, flujo actual).

### AC-5 — Deuda y contrato
- **Entonces** `navbar.tsx`, `user-box.tsx` y `drop-citrica.tsx` ya no existen,
  `app/admin/layout.tsx` queda sin hex, y `npm run contract` baja de 35 a **23** (−12).

### AC-6 — Accesibilidad
- Foco visible tabulando por sidebar, botón de colapso, ☰, avatar y opciones del menú;
  áreas táctiles ≥ 44px en sm; contraste de texto ≥ 4.5:1 sobre las superficies
  `--color-admin-*`.

## Restricciones heredadas

- [x] [Contrato de implementación](../../01-design/implementation-contract.md) — tokens-first, component-first
- [x] [Design system](../../design.md) — tokens `--color-admin-*` del admin
- [x] Accesibilidad — ver [DoD sección E](../../00-harness/definition-of-done.md)

## Preguntas abiertas

Resueltas por el usuario el 2026-11-10, antes de aprobar:

- [x] **Logo compacto:** `public/img/restoapp-logo-collapsed.svg` (el gorro coral, lo
  subió el usuario) en el sidebar colapsado y en la barra del celular; el logo completo
  `logo-resto-app.svg` en el sidebar abierto.
- [x] **Rol en el menú de la cuenta:** el nombre del rol viene de la BD
  (`get_user_with_role` → `userInfo.name`); sin mapeo en código. *Revisado el
  2026-11-10: primero se resolvió con "Administrador" para `role_id` 1 en
  `config/site.ts`; el usuario lo descartó porque el nombre ya viene de la BD.*

## Verificación

> Se llena en la fase VERIFY. Salidas reales, no checks optimistas.
> Formato en [definition-of-done.md](../../00-harness/definition-of-done.md#bloque-de-reporte).
