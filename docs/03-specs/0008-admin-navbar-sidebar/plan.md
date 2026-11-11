# PLAN — SPEC-0008

> El *cómo*. Se escribe después de que la spec está `approved`, y se aprueba antes
> de escribir código.

## Enfoque

Subir el toolkit a `0.0.30` y montar el admin como lo diseña su ejemplo
`example/app/admin-navbar`: `Sidebar` a la izquierda y, a la derecha, `AdminNavbar` +
contenido con su propio scroll. La estructura de dos columnas deja de ser Tailwind con
hex en `app/admin/layout.tsx` y pasa a un organismo `AdminShell` con su CSS de tokens.
`sidebar-nav.tsx` se queda (router, activo, rol) y solo gana las props nuevas. Lo que
reemplaza el navbar del toolkit se borra.

## Shape — jerarquía y estados (`/impeccable shape`, 2026-11-10)

- **Modo:** *Operate*. Quien entra es el equipo del local que gestiona reservas,
  clientes y disponibilidad, a diario y muchas veces en el celular. Éxito: llegar a la
  sección en un toque y no perder espacio de trabajo. La marca vive en el logo y en la
  precisión, no en gestos.
- **Jerarquía:** el contenido manda. El sidebar es navegación primaria (el ítem activo
  es lo único que resalta); la barra superior es secundaria y en escritorio solo lleva la
  cuenta a la derecha, sin título repetido (la página ya titula). Sin campanita: un
  control sin datos es ruido.
- **Topología:** escritorio (≥ md, 768px): sidebar fijo a altura de pantalla + columna
  con barra arriba y contenido que hace scroll solo. Celular (< md): sin sidebar; barra
  fija arriba con ☰ + gorro + avatar; el ☰ abre el drawer del toolkit.
- **Estados:**
  - Sidebar abierto / colapsado (íconos + gorro); el toolkit lo recuerda en
    `localStorage` (`citrica-sidebar-collapsed`).
  - Drawer móvil cerrado / abierto: overlay, Escape y clic fuera cierran; el foco vuelve
    al ☰; al navegar se cierra.
  - Activo: ítem por `pathname`, subítem por `pathname?query` (como hoy).
  - Cargando sesión / sin sesión: igual que hoy (no se pinta nada y se redirige).
  - Nombre vacío: el menú dice "Usuario" (fallback actual del `UserBox`).
- **Anti-objetivos:** campanita vacía, botón flotante del sidebar compitiendo con el ☰
  (con `mobileOpen` controlado el toolkit no lo dibuja), doble scroll en escritorio,
  hex o Tailwind de layout en el layout.

## Archivos que se tocan

| Archivo | Qué cambia |
|---|---|
| `package.json` + `yarn.lock` | `citrica-ui-toolkit` `0.0.26` → `0.0.30` (exacta) |
| `styles/08-components/_admin-shell.scss` [nuevo] + `components.scss` | `.c-admin-shell` (fila, alto de pantalla en md+), `__column`, `__content` (scroll propio en md+, padding de escala) con `--color-admin-*` y `--space-*` |
| `shared/components/organisms/sidebar-nav.tsx` | Pasa `header`, `collapsedHeader`, `mobileOpen`, `onMobileOpenChange`, `mobileReturnFocusRef`; cierra el drawer al navegar |
| `shared/types/sidebar.ts` | `SidebarNavProps` con esas props opcionales |
| `shared/project-components/resto-app/brand-logo.tsx` + `_resto-app.scss` | `variant="mark"` (gorro, `restoapp-logo-collapsed.svg`, 178×145) y tamaño `sm` (`--space-8`) |
| `app/admin/layout.tsx` | Auth + armazón: estado del drawer, ref del ☰, `SidebarNav` + `AdminNavbar` + `<main>`; sin Tailwind ni hex (el armazón vivía en un organismo `AdminShell`; se recortó, ver bitácora) |
| `shared/components/organisms/navbar.tsx` | **Se borra** |
| `app/hooks/user-box.tsx` | **Se borra** |
| `shared/components/organisms/drop-citrica.tsx` + export en `organisms/index.ts` | **Se borra** |
| `docs/02-architecture/overview.md` | Organismos del admin |

## Componentes y tokens

| Necesidad | Componente | Tokens / datos |
|---|---|---|
| Navegación lateral | `Sidebar` (vía `SidebarNav`) | `--color-admin-*` (el toolkit los lee) |
| Barra superior + cuenta | `AdminNavbar variant="admin"` | `user={{ name, role, menu }}` desde `UserAuth()` (`role` = `userInfo.name`, de la BD) |
| Cerrar sesión | `AdminMenuAction` `danger` | `signOut()` del contexto |
| Logo abierto | `BrandLogo` (`logo-resto-app.svg`) | `.c-logo` 48px |
| Logo colapsado / celular | `BrandLogo variant="mark" size="sm"` | `.c-logo--sm` 32px |
| Fondo del panel y del contenido | `.c-admin-shell` | `--color-admin-surface` |
| Ritmo del contenido | `.c-admin-shell__content` | `--space-4` / `--space-6` |

**Markup propio justificado:** el armazón de dos columnas a altura de pantalla no es una
`Section` de página ni lo cubre el toolkit (su ejemplo lo arma con Tailwind); vive una
vez como organismo con CSS de tokens.

## Riesgos

| Riesgo | Qué se rompe | Mitigación |
|---|---|---|
| La 0.0.30 trae cambios en `Input`, `Autocomplete`, `DataTable`, `Login` | Landings (usan `Input`), login del admin, tablas | `npm run shot` de `/`, `/test-1-sin-brief`, `/test-2-corto`, `/test-3-sistema` y `/login`; typecheck |
| El ☰ del toolkit mide 40×40 | AC-6 (≥ 44px) | No se re-estila el toolkit desde aquí (contrato): se mide y, si falla, se anota y se corrige en el toolkit |
| Toolkit `0.0.30` no publicado | No se puede instalar | El build espera; nada de enlaces `file:` en `package.json` |
| `SidebarNav` cierra el drawer al navegar pero el toolkit también | Doble cierre o parpadeo | Se verifica en sm; si el toolkit ya lo cierra, se quita del wrapper |
| `max-md:` en clases del toolkit | Barra no fija en celular | Tailwind 3.4.17 lo soporta y `tailwind.config.js` ya escanea `node_modules/citrica-ui-toolkit/dist` |

## Alternativas descartadas

- **Copiar el ejemplo del toolkit tal cual en `layout.tsx`** — usa Tailwind de layout y
  hex (`bg-[#ECF0F9]`), que el contrato prohíbe.
- **Mantener `UserBox`/`DropCitrica` dentro del `AdminNavbar`** (`actions`) — duplica el
  menú de cuenta que el toolkit ya trae y conserva 5 violaciones.
- **Instalar el toolkit con `file:../citrica-ui-toolkit`** — solo funciona en una
  máquina y rompe el deploy (decisión del usuario: publicar 0.0.30).

## Impacto en la constitución

- [x] Ninguno — cabe en las reglas actuales (`organisms/` para lo reutilizable,
  `08-components` para su CSS, como en SPEC-0007).
- [ ] Requiere ADR
