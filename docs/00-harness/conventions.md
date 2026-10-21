# Convenciones

## Idioma

| Qué | Idioma |
|---|---|
| Documentación (`docs/`), specs, ADRs | Español |
| Comentarios en código | Español |
| Nombres de archivo, variables, funciones, tipos | Inglés |
| Ramas y mensajes de commit | Inglés |
| Copy de la interfaz | Español (registro peruano/latino) |

Locale de la app: `es-ES` en el provider de HeroUI.

## Nombres de archivo

- Componentes y páginas: `kebab-case.tsx` (`login-container.tsx`, `site-footer.tsx`)
- Hooks: `camelCase.ts` con prefijo `use` (`useAdminBookings.ts`)
- Parciales SCSS: `_kebab-case.scss` (`_palette.scss`, `_button.scss`)
- Specs: `docs/03-specs/NNNN-slug-en-kebab/`
- ADRs: `docs/04-decisions/NNNN-slug-en-kebab.md`

## Dónde va cada cosa

| Si estás creando… | Va en… |
|---|---|
| Atom o molecule genérico | ⛔ no aquí — vive en `citrica-ui-toolkit` |
| Primitiva de layout (`Section`, `Stack`, `Grid`…) | `shared/components/layout/` + su CSS en `styles/07-objects/` — ver `/dev/layout` |
| Organismo reutilizable | `shared/components/organisms/` |
| Componente atado al dominio | `shared/project-components/` |
| Sección de una sola página | `app/<ruta>/components/` |
| Acceso a datos | `app/hooks/` (nunca Supabase directo en un componente) |
| Estado global | `shared/context/` |
| Token de color o de componente | `styles/10-tokens/` |
| Gestos de marca de la landing | `styles/webpages-styles/home.scss` — ya existe y ya está importado |
| Gestos de marca de otra página | `styles/webpages-styles/<pagina>.scss` — **y su `@import` en `styles/custom.scss`**, o no se carga |

## Estructura de una página

Cada bloque es una `Section`; dentro, columnas con `Container`/`Col` y composición con
las primitivas. Ningún `<div>` de layout, ningún `flex`/`gap` de Tailwind.

```tsx
import { Button, Col, Container, Text } from "citrica-ui-toolkit";

import { Cluster, Section, Stack } from "@/shared/components/layout";

<Section id="problema" rhythm="tight" tone="surface">
  <Container>
    <Col cols={{ sm: 4, md: 6, lg: 6 }}>
      <Stack gap={6}>
        <Text as="h2" variant="headline">Título</Text>
        <Text as="p" className="u-measure-prose" variant="subtitle">Bajada</Text>
        <Cluster align="center" gap={6}>
          <Button label="Acción" variant="primary" />
        </Cluster>
      </Stack>
    </Col>
  </Container>
</Section>
```

- `sm` = 4 columnas · `md` = 6 · `lg` = 12.
- `gap={6}` = `var(--space-6)` = 24px, igual que `gap-6` en Tailwind.
- Para superponer, salir a sangre o componer en asimetría: `Grid` + `Cell`, como hijo
  directo de la `Section`.
- Qué es cada primitiva, cuándo usarla y ejemplos vivos: **`/dev/layout`** (con `npm run dev`).

## Reglas que no se negocian

Viven en el [contrato de implementación](../01-design/implementation-contract.md).
En una línea: **color solo desde tokens, texto solo con `Text`, layout solo con
`Container`/`Col` y las primitivas, componente del toolkit antes que markup propio.**

## Commits

Formato convencional, en inglés, imperativo:

```
feat(landing): add sistema mesa activa section
fix(admin): correct booking date timezone
docs(specs): add 0003 pricing table spec
refactor(header): replace hardcoded hex with tokens
```

Cuando el trabajo sale de una spec, se referencia: `refs SPEC-0003`.

## Antes de abrir PR

Correr la [Definition of Done](definition-of-done.md) completa y pegar el bloque de
verificación en la descripción del PR.
