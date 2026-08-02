# Playbook: crear una web nueva

> Extraído del README histórico. Referencia rápida operativa.

> ⚠️ **Este documento es anterior al [contrato de implementación](../implementation-contract.md).**
> Sus ejemplos fueron corregidos el 2026-08-01 porque enseñaban `color="#FFF"` en `.tsx`,
> justo lo que la regla `hex-en-tsx` del hook `PostToolUse` bloquea. Si algo aquí choca
> con el contrato, **manda el contrato**.
>
> La regla de color en una línea: en `.tsx` se usa `textColor="<token-sin-el--->"`, que
> el componente `Text` resuelve a `var(--<token>)`. El hex literal solo existe en
> `styles/10-tokens/web/colors/_palette.scss`.

## 🚀 REFERENCIA RÁPIDA: Crear Nueva Web

### Archivos a Modificar

Cuando recibas la tarea de crear una nueva landing page, SOLO modifica:

1. **[config/site.ts](../../../config/site.ts)** - Nombre del sitio y navegación
2. **[styles/10-tokens/web/colors/_palette.scss](../../../styles/10-tokens/web/colors/_palette.scss)** - Colores primarios
3. **[app/page.tsx](../../../app/page.tsx)** - Contenido de la página
4. **[styles/webpages-styles/home.scss](../../../styles/webpages-styles/home.scss)** -
   Layout y ritmo de sección de la landing (nunca color). Ya existe y **ya está
   importado**: no crees un archivo nuevo ni toques `custom.scss`.

> Solo si añades **otra página** creas `styles/webpages-styles/<pagina>.scss`, y entonces
> sí tienes que agregar su `@import` a [styles/custom.scss](../../../styles/custom.scss):
> `globals.scss` no importa esa carpeta, y sin esa línea el SCSS no se carga sin dar
> ningún error.

### Importaciones Obligatorias

```tsx
'use client'
import { Button, Container, Col, Text, Icon } from 'citrica-ui-toolkit'
import { siteConfig } from '@/config/site'
```

### Componentes Clave y Props Correctos

| Componente | Props Importantes | Ejemplo |
|------------|-------------------|---------|
| **Icon** | `name` (NO iconName), `size`, `color` | `<Icon name="Camera" size={24} color="var(--color-primary)" />` |
| **Text** | `variant`, `as`, `weight`, `textColor` | `<Text variant="display" as="h1" weight="bold" textColor="color-text-white">` |
| **Button** | `variant="primary\|secondary\|flat"` | `<Button variant="primary">` |
| **Container** | `noPadding`, `noLimit` | `<Container noPadding>` |
| **Col** | `cols={{ sm: 4, md: 6, lg: 12 }}` | `<Col cols={{ sm: 4, md: 3, lg: 6 }}>` |

### Estructura Base de Página

```tsx
'use client'
import { Button, Container, Col, Text, Icon } from 'citrica-ui-toolkit'
import { siteConfig } from '@/config/site'

export default function Page() {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 w-full z-50">
        <Container noPadding>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            {/* Navegación */}
          </Col>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen pt-20">
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            <Text variant="display" as="h1" weight="bold" textColor="color-text-white">
              Título Principal
            </Text>
          </Col>
        </Container>
      </section>

      {/* Content Sections */}
      <section className="py-24">
        <Container>
          {/* 3 columnas en desktop, 1 en mobile */}
          <Col cols={{ sm: 4, md: 2, lg: 4 }}>Card 1</Col>
          <Col cols={{ sm: 4, md: 2, lg: 4 }}>Card 2</Col>
          <Col cols={{ sm: 4, md: 2, lg: 4 }}>Card 3</Col>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-12">
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            {/* Footer content */}
          </Col>
        </Container>
      </footer>
    </>
  )
}
```

### Errores Comunes a Evitar

❌ **NO hacer:**
```tsx
// Error 1: Usar iconName en lugar de name
<Icon iconName="Camera" size={24} />

// Error 2: No usar Container + Col
<div className="container">
  <div className="grid grid-cols-3">Content</div>
</div>

// Error 3: Usar elementos HTML directos
<h1>Título</h1>
<p>Texto</p>

// Error 4: Usar clases de Tailwind para colores en Text
<Text variant="body" className="text-gray-500">Texto</Text>

// Error 5: Hex literal en .tsx — lo bloquea el hook (regla hex-en-tsx)
<Text variant="body" color="#6B7280">Texto</Text>
<Icon name="Star" color="#cd29ff" />
```

✅ **SÍ hacer:**
```tsx
// Correcto 1: Usar name en Icon
<Icon name="Camera" size={24} />

// Correcto 2: Usar Container + Col
<Container>
  <Col cols={{ sm: 4, md: 2, lg: 4 }}>Content</Col>
</Container>

// Correcto 3: Usar componente Text
<Text variant="display" as="h1">Título</Text>
<Text variant="body" as="p">Texto</Text>

// Correcto 4: Usar textColor con un token (sin el prefijo `--`)
<Text variant="body" textColor="color-on-surface">Texto</Text>
<Icon name="Star" color="var(--color-primary)" />
```

Tokens de color disponibles (los reales, emitidos por `_light-theme.scss`):
`color-primary` · `color-on-primary` · `color-secondary` · `color-tertiary` ·
`color-surface` · `color-on-surface` · `color-on-surface-var` · `color-text-black` ·
`color-text-white`

### Cambiar Colores del Tema

**Archivo:** `styles/10-tokens/web/colors/_palette.scss`

```scss
// Color primario del sitio
$color-light-primary: #cd29ff;  // Cambia este valor

// Color del botón primario
$color-light-primary-btn: #cd29ff;  // Cambia este valor
$color-light-primary-btn-text: #FFFFFF;
$color-light-primary-btn-hover: #b820e6;
```

### Configurar Navegación

**Archivo:** `config/site.ts`

```typescript
export const siteConfig = {
  name: "Nombre del Sitio",
  description: "Descripción del sitio",
  navLinks: [
    { title: "Inicio", href: "#inicio" },
    { title: "Servicios", href: "#servicios" },
    { title: "Contacto", href: "#contacto" }
  ],
  // ... resto de la configuración
}
```

### Grid System - Configuraciones Comunes

```tsx
// Full Width (100%)
<Col cols={{ sm: 4, md: 6, lg: 12 }}>Full width</Col>

// 2 Columnas (50% cada una)
<Col cols={{ sm: 4, md: 3, lg: 6 }}>Columna 1</Col>
<Col cols={{ sm: 4, md: 3, lg: 6 }}>Columna 2</Col>

// 3 Columnas (33% cada una)
<Col cols={{ sm: 4, md: 2, lg: 4 }}>Card 1</Col>
<Col cols={{ sm: 4, md: 2, lg: 4 }}>Card 2</Col>
<Col cols={{ sm: 4, md: 2, lg: 4 }}>Card 3</Col>

// 4 Columnas (25% cada una)
<Col cols={{ sm: 4, md: 3, lg: 3 }}>Card 1</Col>
<Col cols={{ sm: 4, md: 3, lg: 3 }}>Card 2</Col>
<Col cols={{ sm: 4, md: 3, lg: 3 }}>Card 3</Col>
<Col cols={{ sm: 4, md: 3, lg: 3 }}>Card 4</Col>
```

---

---

## 📝 RESUMEN: Checklist Completo para Nueva Web

### ✅ Paso 1: Configuración Inicial

- [ ] **Actualizar [config/site.ts](../../../config/site.ts)**
  ```typescript
  name: "Nombre del Sitio"
  description: "Descripción"
  navLinks: [{ title: "...", href: "#..." }]
  ```

- [ ] **Actualizar colores en [styles/10-tokens/web/colors/_palette.scss](../../../styles/10-tokens/web/colors/_palette.scss)**
  ```scss
  $color-light-primary: #HEXCOLOR;
  $color-light-primary-btn: #HEXCOLOR;
  ```

### ✅ Paso 2: Importaciones en app/page.tsx

```tsx
'use client'
import { Button, Container, Col, Text, Icon } from 'citrica-ui-toolkit'
import { siteConfig } from '@/config/site'
```

### ✅ Paso 3: Verificar Uso Correcto de Componentes

**Icon Component:**
- [ ] ✅ Usar `name` (NO `iconName`)
- [ ] ✅ Verificar nombre en PascalCase
- [ ] ✅ Ejemplo: `<Icon name="Camera" size={24} />`

**Text Component:**
- [ ] ✅ Usar variante correcta (display, headline, title, body, label)
- [ ] ✅ Definir elemento semántico con `as`
- [ ] ✅ Usar `textColor` con un token (NO className de Tailwind, NO hex)
- [ ] ✅ Ejemplo: `<Text variant="display" as="h1" textColor="color-text-white">`

**Container + Col:**
- [ ] ✅ TODAS las secciones usan `<Container>`
- [ ] ✅ TODOS los elementos usan `<Col>`
- [ ] ✅ Definir 3 breakpoints: `cols={{ sm: 4, md: 6, lg: 12 }}`

**Button Component:**
- [ ] ✅ Usar solo variantes del sistema (primary, secondary, flat)
- [ ] ✅ NO usar estilos inline
- [ ] ✅ Ejemplo: `<Button variant="primary">`

### ✅ Paso 4: Estructura de Layout

```tsx
// ✅ CORRECTO
<Container>
  <Col cols={{ sm: 4, md: 3, lg: 6 }}>
    <Text variant="display" as="h1">Título</Text>
  </Col>
</Container>

// ❌ INCORRECTO
<div className="container">
  <h1>Título</h1>
</div>
```

### 🎨 Referencia Visual de Props

| Componente | Prop Key | Valores | Ejemplo |
|------------|----------|---------|---------|
| **Icon** | `name` | `"Camera"`, `"Play"`, etc. | `<Icon name="Camera" />` |
| **Icon** | `size` | `number` (default: 24) | `<Icon name="Play" size={18} />` |
| **Icon** | `color` | `string` — usa `var(--token)` | `<Icon name="Star" color="var(--color-primary)" />` |
| **Text** | `variant` | `display`, `headline`, `title`, `subtitle`, `body`, `label` | `<Text variant="display" />` |
| **Text** | `as` | `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`, `span`, `div` | `<Text as="h1" />` |
| **Text** | `weight` | `light`, `normal`, `bold` | `<Text weight="bold" />` |
| **Text** | `textColor` | nombre de token sin `--` | `<Text textColor="color-text-white" />` |
| **Button** | `variant` | `primary`, `secondary`, `flat` | `<Button variant="primary" />` |
| **Col** | `cols` | `{ sm: 1-4, md: 1-6, lg: 1-12 }` | `<Col cols={{ sm: 4, md: 3, lg: 6 }} />` |

### 🔗 Links Útiles

- **Iconos Lucide:** [https://lucide.dev/icons/](https://lucide.dev/icons/)
- **Tailwind CSS:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Next.js App Router:** [https://nextjs.org/docs/app](https://nextjs.org/docs/app)

---
