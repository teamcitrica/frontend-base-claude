# Base Admin — Frontend Template

Base Next.js 15 de Citrica. Landing pública (**ImPulso**) + panel administrativo con
Supabase, sobre `citrica-ui-toolkit` y un sistema de estilos ITCSS con tokens.

## Empezar

```bash
npm install
npm run dev        # http://localhost:3000
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Desarrollo con Turbopack |
| `npm run typecheck` | `tsc --noEmit` — **la** puerta de tipos |
| `npm run lint:check` | ESLint sin `--fix` (inspecciona) |
| `npm run lint` | ESLint con `--fix` (⚠️ reformatea archivos — revisa `git diff`) |
| `npm run contract` | Reporte del contrato de implementación |
| `npm run build` | Build de producción |
| `npm start` | Servidor de producción |

> ⚠️ `npm run build` **no verifica tipos ni lint** — `next.config.js` los ignora
> (`ignoreBuildErrors`, `ignoreDuringBuilds`). Usa `npm run typecheck`.

## Documentación

Toda la documentación vive en **[`docs/`](docs/README.md)**. Este README es solo el
punto de entrada.

| Si vas a… | Empieza por |
|---|---|
| **Escribir código de UI** | [Contrato de implementación](docs/01-design/implementation-contract.md) — las 4 reglas innegociables |
| **Empezar una feature** | [Flujo SDD](docs/00-harness/sdd-workflow.md) |
| **Cerrar una feature** | [Definition of Done](docs/00-harness/definition-of-done.md) |
| **Entender el repo** | [Arquitectura](docs/02-architecture/overview.md) |
| **Entender el porqué** | [Producto](docs/product.md) · [Marca](docs/01-design/brand.md) |
| **Crear una web nueva** | [Playbook](docs/01-design/reference/new-web-playbook.md) |
| **Buscar props de un componente** | [Referencia del toolkit](docs/01-design/reference/citrica-ui-toolkit.md) |

## Cómo se trabaja

Este repo usa **Spec-Driven Development**: nada no trivial se implementa sin una spec
aprobada.

```
spec (qué y porqué) → plan (cómo) → build (código) → verify (DoD)
```

Las specs viven en [`docs/03-specs/`](docs/03-specs/README.md); las decisiones que
cambian las reglas del repo, en [`docs/04-decisions/`](docs/04-decisions/README.md).

Si trabajas con Claude Code, el harness está en [`.claude/`](.claude/) y las
instrucciones del agente en [`CLAUDE.md`](CLAUDE.md).

## Las cuatro reglas

Detalle completo en el [contrato](docs/01-design/implementation-contract.md).

1. **Color** solo desde `styles/10-tokens/web/colors/_palette.scss`, consumido como
   `var(--color-*)`. Sin hex en `.tsx`, sin alias intermedios.
2. **Tipografía** con el componente `Text` y su `variant`. Sin `font-family` ni
   `clamp()` en la página.
3. **Botones y formularios** dirigidos por tokens. No se re-estilan por página.
4. **Componentes** de `citrica-ui-toolkit` antes que markup propio. Layout siempre con
   `Container` + `Col`, nunca `<div>` suelto.

## Archivos que se tocan para una web nueva

1. [`app/page.tsx`](app/page.tsx) — contenido
2. [`config/site.ts`](config/site.ts) — nombre, navegación, metadata
3. [`styles/10-tokens/web/colors/_palette.scss`](styles/10-tokens/web/colors/_palette.scss) — colores de marca
4. `styles/10-tokens/web/components/*` — tokens de componente (opcional)
5. `styles/webpages-styles/*.scss` — layout y ritmo de sección

## Stack

Next.js 15.5.9 · React 18.3.1 · TypeScript 5.6.3 (strict) · HeroUI 2.8.7 ·
`citrica-ui-toolkit` 0.0.25 · Tailwind 3.4.17 · SCSS/ITCSS · Supabase 2.45.4 ·
Lucide · Framer Motion · GSAP

Detalle en [arquitectura](docs/02-architecture/overview.md).

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
