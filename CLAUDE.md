# CLAUDE.md

Guía para Claude Code en este repositorio.

## Qué es esto

Base Next.js 15 (App Router) de Citrica, hoy en uso como **ImPulso** — una landing
de marketing gastronómico en español. Sobre la misma base convive un panel
administrativo con Supabase (reservas, clientes, tareas, configuración).

En la landing, **el diseño es el producto**.

## Cómo se trabaja aquí: SDD

Este repo usa **Spec-Driven Development**. Nada no trivial se implementa sin una spec
aprobada.

```
/spec-new <slug>  →  /spec-plan <slug>  →  /spec-build <slug>  →  /spec-verify <slug>
    qué y porqué        cómo                   código                 DoD
```

- Flujo completo y sus puertas: **[docs/00-harness/sdd-workflow.md](docs/00-harness/sdd-workflow.md)**
- Specs vivas: **[docs/03-specs/README.md](docs/03-specs/README.md)**

**La skill `impeccable` es obligatoria** en las fases con superficie visual (`landing`,
`admin`, `panel`, `auth`): `/impeccable shape` en PLAN, `/impeccable craft` en BUILD,
`/impeccable audit` en VERIFY. Exenta en `api` e `infra`.
**Donde choque con el contrato, gana el contrato** — sin `clamp()` en SCSS de página, sin
paletas nuevas. Ver [ADR-0003](docs/04-decisions/0003-impeccable-obligatorio.md).

**Excepciones** (no requieren spec): typo, copy, valor de token, bug de una línea con
causa evidente, cambio puramente mecánico. Todo lo demás sí.

**Regla de desvío:** si a mitad del build aparece algo que la spec no contempla, se
para, se anota en la bitácora de `tasks.md` y se actualiza la spec. No se improvisa.

## Antes de escribir código de UI

Lectura obligatoria, en este orden:

1. **[docs/01-design/implementation-contract.md](docs/01-design/implementation-contract.md)** — las 4 reglas innegociables
2. **[docs/00-harness/conventions.md](docs/00-harness/conventions.md)** — dónde va cada archivo

El contrato en una línea: **color solo desde tokens, texto solo con `Text`, layout solo
con `Container`/`Col`, componente del toolkit antes que markup propio.**
El detalle, el mapa de archivos y los comandos de verificación están en ese documento
y en ningún otro — ver [ADR-0001](docs/04-decisions/0001-contrato-fuente-unica.md).

## Antes de cerrar

**[docs/00-harness/definition-of-done.md](docs/00-harness/definition-of-done.md).**
Se recorre completa y se registra el resultado real en la spec. Un punto no comprobado
se reporta como no comprobado — nunca se asume verde.

## Comandos

```bash
npm run dev          # desarrollo (Turbopack)
npm run typecheck    # tsc --noEmit — LA puerta de tipos
npm run lint:check   # ESLint sin --fix (inspecciona)
npm run contract     # reporte del contrato de implementación
npm run shot         # capturas + mediciones reales del navegador
npm run build        # build de producción
```

**Sí puedes ver.** `npm run shot` levanta el Chrome del sistema vía Playwright, toma
capturas en `sm`/`md`/`lg` y mide el DOM: scroll horizontal, CTA dentro del fold,
imágenes rotas, errores de consola. Falla con código 1. **No declares que no puedes
inspeccionar visualmente** — se declaró una vez y costó cuatro defectos que el usuario
tuvo que encontrar. Ver [ADR-0004](docs/04-decisions/0004-verificacion-visual-y-assets.md).
Requiere `yarn add -D playwright` una vez; no descarga navegadores.

⚠️ **`npm run build` no verifica nada.** `next.config.js` trae `ignoreBuildErrors` e
`ignoreDuringBuilds` en `true`: el build pasa con errores de tipos y de lint. Usa
`npm run typecheck`.

⚠️ **`npm run lint` corre con `--fix`** y reformatea decenas de archivos. Para
verificar, `npm run lint:check`.

Baseline (2026-08-01): **0 errores de tipos**, 8 de lint, 36 violaciones de contrato. La
regla es **no añadir** — el hook `PostToolUse` lo verifica solo en cada edición,
comparando contra `git HEAD`. Ver
[ADR-0002](docs/04-decisions/0002-verificacion-pendiente.md).

⚠️ **`npm run typecheck` está en cero y debe seguir en cero.** Dejó de ser una deuda
tolerada para pasar a ser una puerta dura: cualquier error de tipos que aparezca es
tuyo. No hay margen contra el que compararse.

## Marca nueva sobre esta base

Este repo es una base para proyectos.

**¿Marca nueva sobre una base ya usada?** `/brand-new <marca>` — borra la superficie
anterior y todas las specs, y rebrandea de cero. Es destructivo y confirma antes.
El orden completo está en **[docs/rebranding.md](docs/rebranding.md)**.

⚠️ **En `_palette.scss` se cambian los VALORES, nunca los nombres.** Los 167
`$color-light-*` son el contrato que consume todo el sistema. No añadas, no renombres, no
borres — reasigna el hex y **recalcula las derivadas de cada familia**. El hook lo bloquea
(`variables-de-paleta-alteradas`). Ver
[ADR-0005](docs/04-decisions/0005-arranque-de-marca.md).

Lo esencial: `docs/product.md` y `docs/design.md` son la **intención** (y lo que lee la
skill `impeccable`); `styles/10-tokens/web/colors/_palette.scss` y
`styles/01-settings/settings.scss` son el **render**. Cambiar solo la documentación no
cambia la pantalla.

## Mapa de documentación

Índice completo: **[docs/README.md](docs/README.md)**

| Carpeta | Qué contiene |
|---|---|
| Brand colors (hex) | `styles/10-tokens/web/colors/_palette.scss` |
| Type scale / variants | `styles/10-tokens/web/components/_text.scss` |
| Fonts (Anton/Lato) | `styles/01-settings/settings.scss` |
| Button render | `styles/10-tokens/web/components/_button.scss` |
| Button/form radius | `styles/10-tokens/web/components/_form.scss` |
| Landing layout only | `styles/webpages-styles/impulso.scss` |

## SEO / Open Graph
Social card metadata is centralized so a cloned project only edits one block.

- `config/site.ts` → `siteConfig.seo` is the single source of truth (url, siteName, title, description, tagline, imageAlt, locale, keywords, twitter handles, colors, ogFont, indexable).
- `lib/seo.ts` exports `buildMetadata(page?)` and `viewport`. `SITE_URL` resolves from `NEXT_PUBLIC_SITE_URL` → `seo.url` → Vercel env → localhost, and feeds `metadataBase`, canonical and `og:url`.
- `app/layout.tsx` applies `buildMetadata()` site-wide with the `%s | Marca` title template.
- `app/opengraph-image.tsx` generates the 1200×630 image with `next/og` from `seo.colors` and the brand font in `/fonts` (`next.config.js` traces that folder). `app/twitter-image.tsx` re-exports it.
- Per-route metadata: `export const metadata = buildMetadata({ title, description, path, image, type, noIndex })` from a server `page.tsx` or `layout.tsx`.
- Never hardcode metadata in a page — go through `buildMetadata`. Keep `seo.colors` in sync with `styles/10-tokens/web/colors/_palette.scss`.

Full guide and checklist: `docs/opengraph.md`.

## Documentation
Detailed documentation is available in the `docs/` folder:
- `docs/opengraph.md` - Open Graph / SEO metadata structure
- `docs/styles-overview.md` - Complete styles system overview
- `docs/tokens-system.md` - Design tokens architecture
- `docs/tokens-examples.md` - Token usage examples
- `docs/citrica-ui-toolkit.md` - Component documentation
- `docs/layout-system.md` - Grid system documentation
- `docs/layout-examples.md` - Layout code examples
- `docs/layout-visual-guide.md` - Visual grid diagrams

## Key Features & Patterns
- **Responsive Navbar**: Auto-changing colors on scroll, mobile drawer menu
- **Admin Panel**: Sidebar navigation with nested sub-items using URL search params
  - `/admin/reservas` - Booking management with calendar, weekly, and availability views
  - `/admin/clientes` - Client management
  - `/admin/tareas` - Task management
  - `/admin/config-app` - Application configuration
- **Form Management**: Custom hooks for data management with Supabase integration
- **Authentication**: Supabase auth context with login, forgot password, and new password pages
- **Toast System**: HeroUI toast provider with top-right placement

## Database Integration
- Supabase client with custom hooks in `/app/hooks/`

## File Structure Notes  
- App pages follow Next.js App Router convention
- Shared utilities in `/shared/` with TypeScript types
- Site configuration centralized in `/config/site.ts`
- Custom fonts in `/fonts/` directory
- Static assets in `/public/img/`

## Development Notes
- Uses ES modules and TypeScript strict mode
- Custom icon system with Lucide React icons
- Locale set to Spanish (es-ES) in HeroUI provider
- Environment supports both development and production builds with Turbo mode