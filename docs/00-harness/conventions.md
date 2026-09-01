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

- Componentes y páginas: `kebab-case.tsx` (`login-container.tsx`, `quote-form.tsx`)
- Hooks: `camelCase.ts` con prefijo `use` (`useAdminBookings.ts`)
- Parciales SCSS: `_kebab-case.scss` (`_palette.scss`, `_button.scss`)
- Specs: `docs/03-specs/NNNN-slug-en-kebab/`
- ADRs: `docs/04-decisions/NNNN-slug-en-kebab.md`

## Dónde va cada cosa

| Si estás creando… | Va en… |
|---|---|
| Atom o molecule genérico | ⛔ no aquí — vive en `citrica-ui-toolkit` |
| Organismo reutilizable | `shared/components/organisms/` |
| Componente atado al dominio | `shared/project-components/` |
| Sección de una sola página | `app/<ruta>/components/` |
| Acceso a datos | `app/hooks/` (nunca Supabase directo en un componente) |
| Estado global | `shared/context/` |
| Token de color o de componente | `styles/10-tokens/` |
| Estilos de la landing | `styles/webpages-styles/home.scss` — ya existe y ya está importado |
| Estilos de otra página | `styles/webpages-styles/<pagina>.scss` — **y su `@import` en `styles/custom.scss`**, o no se carga |

## Estructura de una página

```tsx
import { Container, Col, Text, Button } from 'citrica-ui-toolkit';

<Container>
  <Col cols={{ sm: 4, md: 6, lg: 12 }}>
    <Text variant="headline">Título</Text>
  </Col>
</Container>
```

`sm` = 4 columnas · `md` = 6 · `lg` = 12. Detalle en
[layout-system.md](../01-design/reference/layout-system.md).

## Reglas que no se negocian

Viven en el [contrato de implementación](../01-design/implementation-contract.md).
En una línea: **color solo desde tokens, texto solo con `Text`, layout solo con
`Container`/`Col`, componente del toolkit antes que markup propio.**

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
