# Sistema de Tokens

Esta carpeta contiene el sistema de tokens de diseno para componentes de la aplicacion.

## Estructura

```
styles/10-tokens/
├── web/                         # Tokens para aplicacion cliente/publica
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
