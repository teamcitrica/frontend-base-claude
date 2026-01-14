# Sistema de Tokens

Esta carpeta contiene el sistema de tokens de diseño para componentes de la aplicación.

## Estructura

```
10-tokens/
├── components/              # Tokens para aplicación cliente/pública
│   ├── button-tokens.scss
│   ├── input-tokens.scss
│   ├── select-tokens.scss
│   ├── textarea-tokens.scss
│   ├── form-tokens.scss
│   ├── text-tokens.scss
│   ├── calendar-tokens.scss
│   └── login-tokens.scss
│
├── components-admin/        # Tokens para panel administrativo
│   ├── button-admin-tokens.scss
│   ├── input-admin-tokens.scss
│   ├── select-admin-tokens.scss
│   ├── textarea-admin-tokens.scss
│   ├── form-admin-tokens.scss
│   ├── text-admin-tokens.scss
│   ├── calendar-admin-tokens.scss
│   └── login-admin-tokens.scss
│
├── tokens.scss              # Archivo principal que importa todos los tokens
└── README.md                # Este archivo
```

## Uso

### Aplicación Cliente

Para componentes de la aplicación cliente/pública:

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

## Consistencia con Colores

Este sistema sigue el mismo patrón implementado en `01-settings/`:

```
01-settings/
├── colors/              # Colores cliente
│   ├── colors.scss
│   ├── colors-light-theme.scss
│   └── colors-dark-theme.scss
│
└── colors-admin/        # Colores admin
    ├── colors-admin.scss
    ├── colors-admin-light-theme.scss
    └── colors-admin-dark-theme.scss
```

## Ventajas de esta Estructura

1. **Separación clara** entre cliente y admin
2. **Mantenibilidad** - Cambios en admin no afectan cliente
3. **Escalabilidad** - Fácil agregar más contextos (mobile, tablet, etc.)
4. **Consistencia** - Mismo patrón que colors/colors-admin
5. **Switching fácil** - Similar a cambio de temas light/dark

## Próximos Pasos

- [ ] Completar tokens específicos para text-admin, calendar-admin, login-admin según necesidades
- [ ] Migrar código existente del panel admin a usar las nuevas clases `-admin`
- [ ] Definir tokens específicos para componentes admin que necesiten estilos diferentes al cliente
