# Arquitectura — visión general

Mapa del repo: qué stack corre, dónde vive cada cosa y qué archivos se tocan para qué.

## Stack

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js (App Router) | 15.5.9 |
| Runtime UI | React | 18.3.1 |
| Lenguaje | TypeScript (strict) | 5.6.3 |
| Dev server | Turbopack | — |
| Componentes (primera opción siempre) | `citrica-ui-toolkit` | 0.0.25 |
| Componentes | HeroUI | 2.8.7 |
| Estilos | SCSS (ITCSS) + Tailwind | 3.4.17 |
| Temas | `next-themes` (light/dark) | 0.4.6 |
| Backend | Supabase | 2.45.4 |
| Formularios | react-hook-form | 7.49.2 |
| Iconos | Lucide React | 0.475.0 |
| Animación | Framer Motion / GSAP | 11.18.2 / 3.13.0 |
| Carousel | Swiper | 10.3.1 |

Estado se maneja con React Context (`shared/context/`) — no hay Redux/Zustand.

## Estructura de directorios

```
app/                          # Next.js App Router
├── page.tsx                  # Landing pública (superficie ImPulso)
├── layout.tsx                # Layout raíz + providers
├── home/                     # Secciones y hooks de la landing
├── admin/                    # Panel administrativo
│   ├── reservas/  clientes/  tareas/  config-app/
├── panel/                    # Panel secundario
├── login/  signup/  forgot-password/  new-password/
├── hooks/                    # Custom hooks de datos (Supabase)
└── api/                      # Route handlers (s3, demo, contexts)

config/
└── site.ts                   # Nombre del sitio, navLinks, metadata

styles/                       # Sistema de estilos ITCSS (ver 01-design/reference/)
├── 01-settings/              # settings.scss (grid, fuentes), mixins.scss
├── 10-tokens/                # ← fuente única de color y tokens de componente
│   ├── web/colors/_palette.scss
│   ├── web/components/*.scss
│   └── admin/…
├── webpages-styles/          # SCSS por página (home = landing, panel, sections)
└── globals.scss              # Punto de entrada

shared/
├── components/organisms/     # Organismos propios (header, footer, navbar, sidebar…)
├── project-components/       # Componentes de dominio (calendar, quote-form)
├── context/                  # auth-context, cart-context, supabase-context
├── types/  utils/
└── providers.tsx

fonts/   public/img/          # Assets estáticos
docs/                         # Esta documentación
.claude/                      # Harness: comandos, agentes, skills, settings
```

Atoms y molecules (`Button`, `Input`, `Sidebar`, `Select`, `Text`, `Icon`, `Card`, `Textarea`,
`Modal`, `Carousel`, `Container`, `Col`) **no viven en el repo** — vienen del paquete
`citrica-ui-toolkit`. Ver [referencia del toolkit](../01-design/reference/citrica-ui-toolkit.md).

## Datos y autenticación

- Cliente Supabase expuesto vía `shared/context/supabase-context.tsx`.
- Sesión y usuario vía `shared/context/auth-context.tsx`; pantallas de login,
  signup, recuperación y cambio de contraseña bajo `app/`.
- Acceso a datos encapsulado en hooks bajo `app/hooks/`
  (`useAdminBookings`, `useCustomers`, `useStudioBooking`, `useQuoteForm`, …).
  Los componentes no llaman a Supabase directamente: consumen un hook.
- Uploads a S3 vía `app/api/s3/` con presigned URLs (`@aws-sdk/s3-request-presigner`).

## Comandos

| Acción | Comando |
|---|---|
| Desarrollo | `npm run dev` (Turbopack) |
| Tipos | `npm run typecheck` (`tsc --noEmit`) |
| Lint (inspección) | `npm run lint:check` |
| Lint (auto-fix) | `npm run lint` |
| Contrato de diseño | `npm run contract` |
| Verificación visual | `npm run shot` (capturas + mediciones en sm/md/lg) |
| Build | `npm run build` |
| Producción | `npm start` |

> ⚠️ `npm run build` **no verifica tipos ni lint**: `next.config.js` trae
> `ignoreBuildErrors` e `ignoreDuringBuilds` en `true`. La puerta real es
> `npm run typecheck`. Y `npm run lint` corre con `--fix` — para inspeccionar sin
> reformatear usa `npm run lint:check`. Ver
> [ADR-0002](../04-decisions/0002-verificacion-pendiente.md).

No hay suite de tests. La verificación funcional es manual y se registra en la spec.

## Archivos que se tocan al crear una web nueva

1. [app/page.tsx](../../app/page.tsx) — contenido de la landing
2. [config/site.ts](../../config/site.ts) — nombre, navegación, metadata
3. [styles/10-tokens/web/colors/_palette.scss](../../styles/10-tokens/web/colors/_palette.scss) — colores de marca
4. `styles/10-tokens/web/components/*` — tokens de componente (opcional)
5. `styles/webpages-styles/home.scss` — layout y ritmo de sección de la landing (ya importado)

Paso a paso completo en el
[playbook de web nueva](../01-design/reference/new-web-playbook.md).

## Convención de idioma

Documentación y comentarios en español. Código, nombres de archivo, ramas y
mensajes de commit en inglés. Ver [convenciones](../00-harness/conventions.md).
