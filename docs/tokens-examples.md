# Ejemplos de Uso de Tokens

## Componentes Cliente vs Admin

### Botones

```tsx
// ✅ CLIENTE - Aplicación pública
import Button from '@ui/molecules/button';

<Button
  variant="primary"           // Usa tokens de cliente
  className="btn-citrica-ui"
>
  Reservar ahora
</Button>

// ✅ ADMIN - Panel administrativo
import Button from '@ui/molecules/button';

<Button
  variant="primary"                    // Podría necesitar variante "admin"
  className="btn-citrica-ui-admin btn-primary-admin"
>
  Guardar cambios
</Button>
```

### Inputs

```tsx
// ✅ CLIENTE
import { Input } from '@heroui/react';

<Input
  className="input-citrica-ui input-primary"
  label="Email"
  placeholder="tu@email.com"
/>

// ✅ ADMIN
import { Input } from '@heroui/react';

<Input
  className="input-citrica-ui-admin input-primary-admin"
  label="Nombre del cliente"
  placeholder="Ingresa el nombre"
/>
```

### Selects

```tsx
// ✅ CLIENTE
import { Select, SelectItem } from '@heroui/react';

<Select
  className="select-citrica-ui select-primary"
  label="Servicio"
>
  <SelectItem key="1">Tatuaje</SelectItem>
  <SelectItem key="2">Piercing</SelectItem>
</Select>

// ✅ ADMIN
import { Select, SelectItem } from '@heroui/react';

<Select
  className="select-citrica-ui-admin select-primary-admin"
  label="Estado"
>
  <SelectItem key="active">Activo</SelectItem>
  <SelectItem key="inactive">Inactivo</SelectItem>
</Select>
```

### Textareas

```tsx
// ✅ CLIENTE
import { Textarea } from '@heroui/react';

<Textarea
  className="textarea-citrica-ui textarea-primary"
  label="Mensaje"
  placeholder="Cuéntanos sobre tu idea..."
/>

// ✅ ADMIN
import { Textarea } from '@heroui/react';

<Textarea
  className="textarea-citrica-ui-admin textarea-primary-admin"
  label="Notas internas"
  placeholder="Agrega notas..."
/>
```

## Personalización con Variables CSS

### Cliente

```scss
// En tu componente o página cliente
.mi-formulario-cliente {
  .btn-citrica-ui {
    // Personalizar solo para este contexto
    --color-primary-btn: #FF5B00;
    --color-primary-btn-hover: #E65100;
  }

  .input-citrica-ui {
    --form-radius-input: 12px;
  }
}
```

### Admin

```scss
// En tu componente o página admin
.mi-panel-admin {
  .btn-citrica-ui-admin {
    // Personalizar solo para este contexto
    --color-admin-primary-btn: #265197;
    --color-admin-primary-btn-hover: #1e3f7a;
  }

  .input-citrica-ui-admin {
    --form-admin-radius-input: 8px;
  }
}
```

## Casos de Uso Específicos

### Formulario de Reserva (Cliente)

```tsx
<form className="formulario-reserva">
  <Input
    className="input-citrica-ui input-primary"
    label="Nombre completo"
    type="text"
  />

  <Input
    className="input-citrica-ui input-primary"
    label="Teléfono"
    type="tel"
  />

  <Select className="select-citrica-ui select-primary" label="Servicio">
    <SelectItem key="tattoo">Tatuaje</SelectItem>
    <SelectItem key="piercing">Piercing</SelectItem>
  </Select>

  <Textarea
    className="textarea-citrica-ui textarea-primary"
    label="Describe tu idea"
  />

  <Button className="btn-citrica-ui btn-primary">
    Enviar solicitud
  </Button>
</form>
```

### Panel de Configuración (Admin)

```tsx
<form className="panel-config-admin">
  <Input
    className="input-citrica-ui-admin input-primary-admin"
    label="Nombre del estudio"
    type="text"
  />

  <Input
    className="input-citrica-ui-admin input-primary-admin"
    label="Email de contacto"
    type="email"
  />

  <Select
    className="select-citrica-ui-admin select-primary-admin"
    label="Zona horaria"
  >
    <SelectItem key="est">EST (UTC-5)</SelectItem>
    <SelectItem key="pst">PST (UTC-8)</SelectItem>
  </Select>

  <div className="flex gap-4">
    <Button className="btn-citrica-ui-admin btn-primary-admin">
      Guardar cambios
    </Button>
    <Button className="btn-citrica-ui-admin btn-secondary-admin">
      Cancelar
    </Button>
  </div>
</form>
```

## Variables CSS Disponibles

### Cliente - Botones
- `--color-primary-btn`
- `--color-primary-btn-text`
- `--color-primary-btn-hover`
- `--color-primary-btn-text-hover`
- `--color-secondary-btn`
- `--color-secondary-btn-text`
- `--color-secondary-btn-hover`
- `--color-flat-btn-text`
- `--color-flat-btn-hover`
- `--form-radius-btn`

### Admin - Botones
- `--color-admin-primary-btn`
- `--color-admin-primary-btn-text`
- `--color-admin-primary-btn-hover`
- `--color-admin-secondary-btn`
- `--color-admin-secondary-btn-text`
- `--color-admin-secondary-btn-border`
- `--color-admin-flat-btn-text`
- `--color-admin-flat-btn-hover`
- `--form-admin-radius-btn`

### Cliente - Inputs
- `--color-primary-input-bg`
- `--color-primary-input-border`
- `--color-primary-input-border-hover`
- `--color-primary-input-label`
- `--color-primary-input-text`
- `--color-primary-input-text-hover`
- `--color-primary-input-placeholder`
- `--form-radius-input`
- `--form-border-size-input`

### Admin - Inputs
- `--color-admin-primary-input-bg`
- `--color-admin-primary-input-border`
- `--color-admin-primary-input-border-hover`
- `--color-admin-primary-input-label`
- `--color-admin-primary-input-text`
- `--color-admin-primary-input-text-hover`
- `--color-admin-primary-input-placeholder`
- `--form-admin-radius-input`
- `--form-admin-border-size-input`

## Migración de Código Existente

Si tienes código que usa los tokens antiguos sin separación cliente/admin:

### Antes (Ambiguo)
```tsx
<Input className="input-citrica-ui input-primary" />
```

### Después (Específico)

Para código de cliente, mantén igual:
```tsx
<Input className="input-citrica-ui input-primary" />
```

Para código de admin, actualiza a:
```tsx
<Input className="input-citrica-ui-admin input-primary-admin" />
```

## Recomendaciones

1. **Consistencia**: Usa siempre clases cliente para app pública, admin para panel
2. **No mezclar**: Evita usar tokens cliente en admin y viceversa
3. **Variables CSS**: Preferir personalización con variables en lugar de estilos inline
4. **Naming**: Mantén el sufijo `-admin` en todos los componentes administrativos
