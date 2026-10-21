# Sistema de Tokens

Esta carpeta contiene el sistema de tokens de diseno para componentes de la aplicacion.

## Estructura

```
styles/10-tokens/
├── web/                         # Tokens para aplicacion cliente/publica
│   ├── foundations/             # Espaciado, radios, motion, medida (ADR-0006)
│   │   ├── _space.scss          # --space-1…32 (N×4px) y --section-y*
│   │   ├── _radius.scss         # --radius-md, --radius-pill
│   │   ├── _motion.scss         # --ease-out, --duration-fast/base/slow
│   │   ├── _measure.scss        # --measure-prose, --measure-narrow
│   │   └── _index.scss          # @mixin foundation-tokens → :root
│   ├── colors/
│   │   ├── _palette.scss        # Variables SCSS de colores ($color-light-*, $color-dark-*)
│   │   ├── _light-theme.scss    # Mixin light-theme (CSS custom properties)
│   │   └── _dark-theme.scss     # Mixin dark-theme (CSS custom properties)
│   └── components/
│       ├── _button.scss
│       ├── _input.scss
│       ├── _select.scss
│       ├── _textarea.scss
│       ├── _form.scss
│       ├── _text.scss
│       ├── _calendar.scss
│       └── _login.scss
│
├── admin/                       # Tokens para panel administrativo
│   ├── colors/
│   │   ├── _palette.scss        # Variables SCSS de colores ($color-admin-*)
│   │   ├── _light-theme.scss    # Mixin admin-light-theme
│   │   └── _dark-theme.scss     # Mixin admin-dark-theme
│   └── components/
│       ├── _button.scss
│       ├── _input.scss
│       ├── _select.scss
│       ├── _textarea.scss
│       ├── _form.scss
│       ├── _text.scss
│       ├── _calendar.scss
│       └── _login.scss
│
└── tokens.scss                  # Archivo principal que importa todos los tokens
```

## Fundamentos (web)

Tokens globales en `:root`, disponibles en cualquier página. Fuente:
`styles/10-tokens/web/foundations/`. Decisión: [ADR-0006](../../04-decisions/0006-documentacion-refleja-render.md).

### Espaciado — `--space-N` = N × 4px

La escala coincide con la de Tailwind, así que `gap-6` y `var(--space-6)` valen lo mismo.

| Token | Valor | Tailwind |
|---|---|---|
| `--space-1` | 4px | `*-1` |
| `--space-2` | 8px | `*-2` |
| `--space-3` | 12px | `*-3` |
| `--space-4` | 16px | `*-4` |
| `--space-6` | 24px | `*-6` |
| `--space-8` | 32px | `*-8` |
| `--space-10` | 40px | `*-10` |
| `--space-12` | 48px | `*-12` |
| `--space-16` | 64px | `*-16` |
| `--space-24` | 96px | `*-24` |
| `--space-32` | 128px | `*-32` |

Ritmo vertical de sección: `--section-y` (64px), `--section-y-tight` (40px) y
`--section-y-airy` (96px).

### Radios, motion y medida

| Token | Valor | Uso |
|---|---|---|
| `--radius-md` | 12px | Cards, media, superficies |
| `--radius-pill` | 999px | Botones (vía `--form-radius-btn`), badges |
| `--ease-out` | `cubic-bezier(0.25, 1, 0.5, 1)` | Toda entrada y salida |
| `--duration-fast` | 200ms | Hovers |
| `--duration-base` | 400ms | Trazos, reveals cortos |
| `--duration-slow` | 460ms | Entrada orquestada del hero |
| `--measure-prose` | 68ch | Ancho máximo de párrafos |
| `--measure-narrow` | 52ch | Bajadas cortas |

```scss
.pricing__card {
  padding: var(--space-8);
  border-radius: var(--radius-md);
  transition: transform var(--duration-fast) var(--ease-out);
}
```

Un valor de espaciado, radio o duración escrito a mano en un SCSS de página es un
**gesto de página**, y va marcado `// gesto:` con su motivo.

## Uso

### Aplicacion Cliente

Para componentes de la aplicacion cliente/publica:

```tsx
// Botones
<button className="btn-citrica-ui btn-primary">Click me</button>
<button className="btn-citrica-ui btn-secondary">Cancel</button>

// Inputs
<Input className="input-citrica-ui input-primary" />
<Input className="input-citrica-ui input-secondary" />

// Selects
<Select className="select-citrica-ui select-primary" />

// Textareas
<Textarea className="textarea-citrica-ui textarea-primary" />
```

### Panel Administrativo

Para componentes del panel administrativo:

```tsx
// Botones
<button className="btn-citrica-ui-admin btn-primary-admin">Save</button>
<button className="btn-citrica-ui-admin btn-secondary-admin">Cancel</button>

// Inputs
<Input className="input-citrica-ui-admin input-primary-admin" />

// Selects
<Select className="select-citrica-ui-admin select-primary-admin" />

// Textareas
<Textarea className="textarea-citrica-ui-admin textarea-primary-admin" />
```

## Variables CSS

### Cliente

Los tokens del cliente usan estas variables CSS:

- **Colores**: `--color-primary-*`, `--color-secondary-*`
- **Formularios**: `--form-radius-*`, `--form-border-size-*`

Ejemplos:
- `--color-primary-btn`
- `--color-primary-btn-hover`
- `--color-primary-input-bg`
- `--form-radius-btn`
- `--form-border-size-input`

### Admin

Los tokens del admin usan estas variables CSS:

- **Colores**: `--color-admin-primary-*`, `--color-admin-secondary-*`
- **Formularios**: `--form-admin-radius-*`, `--form-admin-border-size-*`

Ejemplos:
- `--color-admin-primary-btn`
- `--color-admin-primary-btn-hover`
- `--color-admin-primary-input-bg`
- `--form-admin-radius-btn`
- `--form-admin-border-size-input`

## Arquitectura de Colores y Temas

Los colores se definen en tres capas:

1. **Palette** (`_palette.scss`): Variables SCSS con valores hex (`$color-light-primary: #FF5B00`)
2. **Theme mixins** (`_light-theme.scss`, `_dark-theme.scss`): Mapean variables SCSS a CSS custom properties (`--color-primary: #{$color-light-primary}`)
3. **Aplicacion** (`04-generic/generic.scss`): Incluye los mixins en `:root` y `[data-theme="dark"]`

### Flujo de datos:

```
_palette.scss ($color-light-primary: #FF5B00)
    ↓
_light-theme.scss (--color-primary: #{$color-light-primary})
    ↓
generic.scss (:root { @include light-theme; })
    ↓
Componentes (background-color: var(--color-primary-btn))
```

## Ventajas de esta Estructura

1. **Todo centralizado** - Colores + componentes en un solo lugar (`10-tokens/`)
2. **Separacion clara** entre web y admin
3. **Mantenibilidad** - Cambios en admin no afectan cliente
4. **Escalabilidad** - Facil agregar mas contextos
5. **Trazabilidad** - Para entender un componente, todo esta en una carpeta
