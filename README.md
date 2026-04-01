# Base Admin - Frontend Template 2

## 📖 Índice de Navegación Rápida

### 🎯 Para Crear una Nueva Web
- [🚀 REFERENCIA RÁPIDA: Crear Nueva Web](#-referencia-rápida-crear-nueva-web)
- [🏗️ Estructura del Proyecto](#️-estructura-del-proyecto)
- [⚠️ Componente Icon (IMPORTANTE)](#️-importante-componente-icon)

### 📐 Sistema de Layout
- [⚠️ Container + Col (REGLA DE ORO)](#️-importante-sistema-de-layout-responsivo)
- [Grid System - Breakpoints](#-sistema-de-columnas-grid-system)
- [Configuraciones Comunes](#-configuraciones-comunes)
- [Ejemplo Completo de Página](#-ejemplo-completo-de-página)

### 🎨 Componentes y Estilos
- [⚠️ Text Component](#️-importante-usar-componente-text-para-tipografía)
- [⚠️ Sistema de Colores](#️-importante-sistema-de-colores-en-componente-text)
- [Button Component](#️-importante-sistema-de-colores-y-variantes)
- [Componentes Disponibles](#-componentes-disponibles-en-citrica-ui-toolkit)

### 📚 Documentación Detallada
- [Styles System Documentation](#-documentation)
- [Layout Examples](styles/LAYOUT-EXAMPLES.md)
- [Design Tokens](styles/10-tokens/README.md)

---

## 📚 Documentation

### Styles System Documentation

This project includes a comprehensive styles and layout system. Check out the documentation:

- **[styles/README.md](styles/README.md)** - Main styles documentation hub
- **[styles/CITRICA-UI-TOOLKIT_README.md](styles/CITRICA-UI-TOOLKIT_README.md)** - UI Library "citrica-ui-toolkit"
- **[styles/LAYOUT-SYSTEM.md](styles/LAYOUT-SYSTEM.md)** - Complete responsive grid system
- **[styles/LAYOUT-VISUAL-GUIDE.md](styles/LAYOUT-VISUAL-GUIDE.md)** - Visual diagrams and examples
- **[styles/LAYOUT-EXAMPLES.md](styles/LAYOUT-EXAMPLES.md)** - Complete code examples
- **[styles/10-tokens/README.md](styles/10-tokens/README.md)** - Design tokens system (Client & Admin)
- **[styles/10-tokens/EXAMPLES.md](styles/10-tokens/EXAMPLES.md)** - Token usage examples

---

## 🏗️ Estructura del Proyecto

### Stack Tecnológico

**Framework y Librerías Principales:**
- Next.js 15.5.9 con App Router
- React 18.3.1
- TypeScript 5.6.3 (strict mode)
- Turbopack para desarrollo

**UI y Estilos:**
- HeroUI v2.4.25
- citrica-ui-toolkit v0.0.11 (componentes personalizados)
- Tailwind CSS 3.4.17
- SCSS con metodología ITCSS
- next-themes (soporte light/dark mode)

**Backend y Data:**
- Supabase v2.45.4
- React Context para state management

**Librerías Adicionales:**
- Lucide React v0.475.0 (iconos)
- Framer Motion v11.18.2 (animaciones)
- react-hook-form v7.49.2
- Swiper v10.3.1
- GSAP v3.13.0

### Estructura de Directorios

```
/app                          # Next.js App Router
├── page.tsx                  # Página principal (landing page)
├── layout.tsx                # Layout raíz
├── admin/                    # Panel administrativo
│   ├── reservas/
│   ├── clientes/
│   └── config-app/
├── hooks/                    # Custom React hooks
└── api/                      # API routes

/config
└── site.ts                   # Configuración del sitio (nav, metadata)

/styles                       # Sistema de estilos ITCSS
├── 01-settings/
│   └── colors/
│       └── colors.scss       # Tokens de color (IMPORTANTE)
├── 10-tokens/
│   └── components/           # Tokens de componentes
└── globals.scss              # Importación principal

/shared
├── components/               # Componentes compartidos
├── context/                  # React Context providers
├── types/                    # TypeScript types
└── utils/                    # Utilidades

/node_modules/citrica-ui-toolkit  # Librería de componentes
```

### Archivos Clave para Modificar

Al crear una nueva web, SOLO modifica estos archivos:

1. **[app/page.tsx](app/page.tsx)** - Contenido de la landing page
2. **[config/site.ts](config/site.ts)** - Nombre, navegación, metadata
3. **[styles/01-settings/colors/colors.scss](styles/01-settings/colors/colors.scss)** - Colores del tema
4. **styles/10-tokens/components/*** - Tokens de componentes (opcional)

---

## ⚠️ IMPORTANTE: Sistema de Layout Responsivo

### 🚨 REGLA DE ORO: Siempre usa Container + Col

**NUNCA uses `<div>` o componentes directamente para layouts. SIEMPRE usa el sistema Container + Col.**

#### ❌ INCORRECTO:
```tsx
// MAL - No usar divs para layout
<div className="my-section">
  <div className="card">Content</div>
</div>

// MAL - No usar CSS Grid/Flexbox manual
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
  <div>Card 1</div>
</div>
```

#### ✅ CORRECTO:
```tsx
import { Container, Col } from 'citrica-ui-toolkit';

// BIEN - Usar Container + Col
<Container>
  <Col cols={{ sm: 4, md: 3, lg: 6 }}>
    <div className="card">Content</div>
  </Col>
</Container>
```

### 📐 Sistema de Columnas (Grid System)

El sistema usa **3 breakpoints** con diferentes cantidades de columnas:

| Breakpoint | Tamaño | Columnas Totales | Ejemplo |
|------------|--------|------------------|---------|
| **sm** (Mobile) | 0px - 610px | **4 columnas** | `cols={{ sm: 4 }}` = 100% |
| **md** (Tablet) | 611px - 1190px | **6 columnas** | `cols={{ md: 3 }}` = 50% |
| **lg** (Desktop) | 1191px+ | **12 columnas** | `cols={{ lg: 6 }}` = 50% |

### 🎯 Configuraciones Comunes

```tsx
// Full Width (100% en todas las pantallas)
<Col cols={{ sm: 4, md: 6, lg: 12 }}>
  Hero Section
</Col>

// 2 Columnas (50% en todas las pantallas)
<Col cols={{ sm: 4, md: 3, lg: 6 }}>
  Columna Izquierda
</Col>
<Col cols={{ sm: 4, md: 3, lg: 6 }}>
  Columna Derecha
</Col>

// 3 Columnas (33% en tablet y desktop, 100% en mobile)
<Col cols={{ sm: 4, md: 2, lg: 4 }}>Card 1</Col>
<Col cols={{ sm: 4, md: 2, lg: 4 }}>Card 2</Col>
<Col cols={{ sm: 4, md: 2, lg: 4 }}>Card 3</Col>

// 4 Columnas (25% en desktop, 50% en tablet, 100% en mobile)
<Col cols={{ sm: 4, md: 3, lg: 3 }}>Card 1</Col>
<Col cols={{ sm: 4, md: 3, lg: 3 }}>Card 2</Col>
<Col cols={{ sm: 4, md: 3, lg: 3 }}>Card 3</Col>
<Col cols={{ sm: 4, md: 3, lg: 3 }}>Card 4</Col>
```

### 🎨 Container con Props Especiales

```tsx
// Container sin padding (para secciones full-width con backgrounds)
<Container noPadding>
  <Col cols={{ sm: 4, md: 6, lg: 12 }}>
    <section className="hero-section">
      Full width hero con fondo
    </section>
  </Col>
</Container>

// Container sin límite de ancho máximo
<Container noLimit>
  <Col cols={{ sm: 4, md: 6, lg: 12 }}>
    Contenido sin restricción de ancho
  </Col>
</Container>
```

### 📋 Checklist de Desarrollo

Antes de crear cualquier página, asegúrate de:

- [ ] Importar `Container` y `Col` de `citrica-ui-toolkit`
- [ ] Envolver TODAS las secciones con `<Container>`
- [ ] Usar `<Col>` para TODOS los elementos que necesiten ancho específico
- [ ] Definir SIEMPRE los 3 breakpoints: `sm`, `md`, `lg`
- [ ] NO usar CSS Grid/Flexbox manual para layouts
- [ ] NO usar divs con clases de ancho personalizadas

### 🔍 Ejemplo Completo de Página

```tsx
'use client'
import { Container, Col, Button } from 'citrica-ui-toolkit'

export default function Page() {
  return (
    <>
      {/* Hero Full Width */}
      <Container noPadding>
        <Col cols={{ sm: 4, md: 6, lg: 12 }}>
          <section className="hero">Hero Content</section>
        </Col>
      </Container>

      {/* Contenido con 3 Cards */}
      <Container>
        <Col cols={{ sm: 4, md: 6, lg: 12 }}>
          <h2>Título de Sección</h2>
        </Col>

        <Col cols={{ sm: 4, md: 2, lg: 4 }}>
          <div className="card">Card 1</div>
        </Col>
        <Col cols={{ sm: 4, md: 2, lg: 4 }}>
          <div className="card">Card 2</div>
        </Col>
        <Col cols={{ sm: 4, md: 2, lg: 4 }}>
          <div className="card">Card 3</div>
        </Col>
      </Container>

      {/* Dos Columnas 50/50 */}
      <Container>
        <Col cols={{ sm: 4, md: 3, lg: 6 }}>
          <div className="content-left">Izquierda</div>
        </Col>
        <Col cols={{ sm: 4, md: 3, lg: 6 }}>
          <div className="content-right">Derecha</div>
        </Col>
      </Container>
    </>
  )
}
```

### 📚 Más Información

Para detalles completos del sistema de layout, consulta:
- **[styles/LAYOUT-SYSTEM.md](styles/LAYOUT-SYSTEM.md)** - Documentación completa
- **[styles/LAYOUT-EXAMPLES.md](styles/LAYOUT-EXAMPLES.md)** - Ejemplos de código

---

## ⚠️ IMPORTANTE: Sistema de Colores y Variantes

### 🚨 REGLA DE ORO: NUNCA uses estilos inline en componentes

**SIEMPRE usa las variantes del sistema (primary, secondary, flat) en lugar de estilos inline.**

#### ❌ INCORRECTO:
```tsx
// MAL - No usar style directamente en Button
<Button
  label="Click me"
  variant="primary"
  style={{ background: '#D4AF37', color: '#1A0E2E', fontWeight: '600' }}
/>

// MAL - No agregar estilos inline personalizados
<Button
  label="Submit"
  variant="secondary"
  style={{ border: '2px solid #6B3FA0', color: '#6B3FA0' }}
/>
```

#### ✅ CORRECTO:
```tsx
// BIEN - Usar solo las variantes del sistema
<Button
  label="Click me"
  variant="primary"  // Usa colores de $color-light-primary-btn
/>

<Button
  label="Submit"
  variant="secondary"  // Usa colores de $color-light-secondary-btn
/>

<Button
  label="Cancel"
  variant="flat"  // Usa colores de $color-light-flat-btn
/>
```

### 🎨 Modificar Colores del Sistema

**Si necesitas cambiar colores, modifica el archivo `styles/01-settings/colors/colors.scss`:**

```scss
// styles/01-settings/colors/colors.scss

// BUTTON COLORS LIGHT THEME
$color-light-primary-btn: #D4AF37;           // Color del botón primary
$color-light-primary-btn-text: #1A0E2E;      // Color del texto
$color-light-primary-btn-hover: #C29D2F;     // Color hover

$color-light-secondary-btn: #6B3FA0;         // Color del botón secondary
$color-light-secondary-btn-text: #FFFFFF;
$color-light-secondary-btn-hover: #5A3589;

$color-light-flat-btn: transparent;          // Color del botón flat (outline)
$color-light-flat-btn-text: #6B3FA0;
$color-light-flat-btn-border: #6B3FA0;
```

### 📋 Variantes Disponibles

| Variante | Uso | Colores Definidos en |
|----------|-----|---------------------|
| **primary** | CTA principal | `$color-light-primary-btn-*` |
| **secondary** | CTA secundario | `$color-light-secondary-btn-*` |
| **flat** | Botón outline | `$color-light-flat-btn-*` |

### ⚙️ Workflow para Cambiar Colores

1. **Identifica la variante** que usará tu botón (primary, secondary, flat)
2. **Modifica `colors.scss`** con los colores que necesitas
3. **Usa la variante** en tu componente sin estilos inline
4. **NO crees nuevas variantes** - usa las existentes

### 🚫 Lo que NO debes hacer

- ❌ NO uses `style={{ ... }}` en componentes Button
- ❌ NO agregues `className` con estilos personalizados a Button
- ❌ NO crees variantes nuevas como `variant="custom"`
- ❌ NO uses colores hardcodeados en el código

### ✅ Lo que SÍ debes hacer

- ✅ USA solo `variant="primary"`, `variant="secondary"`, o `variant="flat"`
- ✅ MODIFICA `colors.scss` cuando necesites cambiar colores
- ✅ USA las mismas variantes en toda la aplicación
- ✅ MANTÉN la consistencia del sistema de diseño

---

## ⚠️ IMPORTANTE: Usar Componentes de citrica-ui-toolkit

### 🚨 REGLA DE ORO: Usa los componentes del toolkit, NO divs personalizados

**SIEMPRE revisa si existe un componente en citrica-ui-toolkit antes de crear divs con clases.**

#### ❌ INCORRECTO:
```tsx
// MAL - No usar divs cuando existe el componente Card
<div className="pricing-card">
  <h3>Plan Premium</h3>
  <p>Description</p>
  <Button label="Buy Now" />
</div>

// MAL - No crear componentes personalizados que ya existen
<div className="custom-modal">
  <div className="modal-content">
    Content here
  </div>
</div>
```

#### ✅ CORRECTO:
```tsx
// BIEN - Usar el componente Card del toolkit
<Card
  shadow="md"
  radius="lg"
  footer={<Button label="Buy Now" variant="primary" />}
>
  <h3>Plan Premium</h3>
  <p>Description</p>
</Card>

// BIEN - Usar el componente Modal del toolkit
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Title"
>
  Content here
</Modal>
```

### 📦 Componentes Disponibles en citrica-ui-toolkit

Antes de crear cualquier UI, consulta la documentación: **[styles/CITRICA-UI-TOOLKIT_README.md](styles/CITRICA-UI-TOOLKIT_README.md)**

#### Átomos (Atoms)
- `Button` - Botones con variantes
- `Input` - Campos de texto
- `Select` - Dropdown select
- `Autocomplete` - Select con búsqueda
- `Textarea` - Campo de texto multilínea
- `Text` - Tipografía
- **`Icon`** - Iconos de Lucide (ver documentación detallada abajo)
- **`Card`** - Tarjetas con header/footer
- `Container` - Contenedor responsive
- `Col` - Columnas del grid

#### Moléculas (Molecules)
- `Modal` - Ventanas modales
- `Carousel` - Slider de imágenes

#### Organismos (Organisms)
- `Header` - Navegación principal
- `Footer` - Pie de página
- `Sidebar` - Barra lateral con menú

---

## ⚠️ IMPORTANTE: Componente Icon

### 🚨 REGLA DE ORO: Usa la prop "name", NO "iconName"

El componente `Icon` de citrica-ui-toolkit usa la prop **`name`** para especificar el icono de Lucide React.

#### ❌ INCORRECTO:
```tsx
// MAL - No usar "iconName"
import { Icon } from 'citrica-ui-toolkit'

<Icon iconName="Camera" size={24} />
<Icon iconName="Play" size={18} color="#cd29ff" />
```

#### ✅ CORRECTO:
```tsx
// BIEN - Usar "name"
import { Icon } from 'citrica-ui-toolkit'

<Icon name="Camera" size={24} />
<Icon name="Play" size={18} color="#cd29ff" />
```

### 📋 Props del Componente Icon

```tsx
interface IconProps {
  name: IconName;           // Nombre del icono de Lucide (REQUERIDO)
  size?: number;            // Tamaño del icono (default: 24)
  strokeWidth?: number;     // Grosor del trazo
  color?: string;           // Color del icono (hex, rgb, etc.)
  fallback?: IconName;      // Icono de respaldo si el principal no existe
}
```

### 🎯 Ejemplos de Uso Correcto

```tsx
import { Icon } from 'citrica-ui-toolkit'

// Icono básico
<Icon name="Camera" />

// Icono con tamaño personalizado
<Icon name="Film" size={32} />

// Icono con color
<Icon name="Play" size={18} color="#cd29ff" />

// Icono con grosor de trazo personalizado
<Icon name="Menu" size={24} strokeWidth={2} />

// Icono con fallback
<Icon name="CustomIcon" fallback="Circle" size={20} />
```

### 📚 Iconos Disponibles

El componente Icon usa **Lucide React**, que incluye cientos de iconos. Los más comunes:

**UI/Navegación:**
- `Menu`, `X`, `ChevronRight`, `ChevronLeft`, `ChevronDown`, `ChevronUp`
- `ArrowRight`, `ArrowLeft`, `ArrowUp`, `ArrowDown`
- `Home`, `Settings`, `User`, `Users`, `Bell`

**Medios/Contenido:**
- `Camera`, `Film`, `Image`, `Video`, `Music`
- `Play`, `Pause`, `Stop`, `SkipForward`, `SkipBack`
- `Volume`, `VolumeX`, `Volume1`, `Volume2`

**Comunicación:**
- `Mail`, `Phone`, `MessageCircle`, `Send`
- `Share`, `Share2`, `Download`, `Upload`

**Edición:**
- `Edit`, `Edit2`, `Edit3`, `Trash`, `Trash2`
- `Copy`, `Check`, `X`, `Plus`, `Minus`

**Indicadores:**
- `AlertCircle`, `AlertTriangle`, `Info`, `CheckCircle`, `XCircle`
- `Star`, `Heart`, `Eye`, `EyeOff`, `Lock`, `Unlock`

**Negocios:**
- `Briefcase`, `Calendar`, `Clock`, `DollarSign`, `CreditCard`
- `ShoppingCart`, `Package`, `TrendingUp`, `TrendingDown`

**Tecnología:**
- `Code`, `Terminal`, `Database`, `Server`, `Wifi`
- `Smartphone`, `Laptop`, `Monitor`, `Tablet`

**Diseño/Creatividad:**
- `Palette`, `Sparkles`, `Layers`, `Layout`, `Grid`
- `Pen`, `PenTool`, `Brush`, `Eraser`

Ver lista completa en: [https://lucide.dev/icons/](https://lucide.dev/icons/)

### 🔄 Workflow para Usar Icon

1. **Busca el icono** en [lucide.dev](https://lucide.dev/icons/)
2. **Copia el nombre exacto** (case-sensitive, en PascalCase)
3. **Importa Icon** de citrica-ui-toolkit
4. **Usa el componente** con la prop `name`

```tsx
// Ejemplo completo
import { Icon } from 'citrica-ui-toolkit'

<button className="flex items-center gap-2">
  <Icon name="Play" size={18} />
  Ver Video
</button>
```

### 🚫 Errores Comunes a Evitar

```tsx
// ❌ ERROR: Usar "iconName" en lugar de "name"
<Icon iconName="Camera" size={24} />

// ❌ ERROR: Importar iconos de lucide-react directamente
import { Camera } from 'lucide-react'
<Camera size={24} />

// ❌ ERROR: Usar nombres en minúsculas o con guiones
<Icon name="camera" size={24} />
<Icon name="chevron-right" size={24} />

// ✅ CORRECTO: Usar "name" con PascalCase
<Icon name="Camera" size={24} />
<Icon name="ChevronRight" size={24} />
```

### 📋 Checklist para Usar Icon

- [ ] ¿Estoy usando `Icon` de citrica-ui-toolkit?
- [ ] ¿Estoy usando la prop `name` (NO `iconName`)?
- [ ] ¿El nombre del icono está en PascalCase?
- [ ] ¿He verificado que el icono existe en Lucide?
- [ ] ¿He definido el tamaño si no quiero usar el default (24)?

### ✅ Resumen de Buenas Prácticas

1. **SIEMPRE** usa `name` como prop (NO `iconName`)
2. **IMPORTA** solo desde citrica-ui-toolkit (NO desde lucide-react)
3. **USA** nombres en PascalCase exactamente como aparecen en Lucide
4. **VERIFICA** en [lucide.dev](https://lucide.dev/icons/) si no estás seguro del nombre
5. **DEFINE** tamaño y color según las necesidades del diseño

### 📋 Checklist antes de crear componentes

- [ ] ¿Existe este componente en citrica-ui-toolkit?
- [ ] ¿Puedo usar `Card` en lugar de un div con clase?
- [ ] ¿Puedo usar `Modal` en lugar de crear un modal custom?
- [ ] ¿Estoy usando `Button`, `Input`, `Select` del toolkit?
- [ ] ¿He revisado la documentación de CITRICA-UI-TOOLKIT?

### 🎯 Ejemplo: Tarjetas de Pricing

```tsx
// ❌ INCORRECTO
<div className="pricing-card">
  <h3>Plan Name</h3>
  <p>$99/month</p>
  <Button label="Subscribe" />
</div>

// ✅ CORRECTO
<Card
  shadow="md"
  radius="lg"
  className="pricing-card"
  footer={<Button label="Subscribe" variant="primary" fullWidth />}
>
  <h3>Plan Name</h3>
  <p>$99/month</p>
</Card>
```

### 🚫 Lo que NO debes hacer

- ❌ NO crees divs con clases cuando existe un componente en el toolkit
- ❌ NO ignores los componentes disponibles
- ❌ NO reinventes la rueda creando componentes custom

### ✅ Lo que SÍ debes hacer

- ✅ REVISA la documentación de citrica-ui-toolkit primero
- ✅ USA componentes del toolkit siempre que sea posible
- ✅ USA las props del componente (header, footer, shadow, radius, etc.)
- ✅ MANTÉN consistencia usando los mismos componentes

---

## ⚠️ IMPORTANTE: Usar Componente Text para Tipografía

### 🚨 REGLA DE ORO: NUNCA uses elementos HTML directos para texto

**SIEMPRE usa el componente Text de citrica-ui-toolkit en lugar de elementos HTML como `<h1>`, `<h2>`, `<h3>`, `<p>`, etc.**

#### ❌ INCORRECTO:
```tsx
// MAL - No usar elementos HTML directos
<h1 className="hero-title">Título Principal</h1>
<h2 className="section-title">Sección</h2>
<p className="description">Descripción del contenido</p>

// MAL - No usar elementos HTML con estilos inline
<h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>Subtítulo</h3>
<p style={{ color: '#666' }}>Texto</p>
```

#### ✅ CORRECTO:
```tsx
import { Text } from 'citrica-ui-toolkit';

// BIEN - Usar componente Text con variantes
<Text variant="display" as="h1" weight="bold" className="hero-title">
  Título Principal
</Text>

<Text variant="headline" as="h2" weight="bold" className="section-title">
  Sección
</Text>

<Text variant="body" as="p" className="description">
  Descripción del contenido
</Text>
```

### 📝 Variantes Disponibles del Componente Text

El componente Text tiene las siguientes variantes que debes usar según el tipo de contenido:

| Variante | Uso Recomendado | Ejemplo HTML Equivalente |
|----------|-----------------|-------------------------|
| **display** | Títulos principales muy grandes | `<h1>` hero sections |
| **headline** | Títulos de sección importantes | `<h2>` section titles |
| **title** | Títulos de subsección o cards | `<h3>`, `<h4>` card titles |
| **subtitle** | Subtítulos o labels secundarios | `<h5>`, `<h6>` subtitles |
| **body** | Texto de párrafos y contenido | `<p>` paragraphs |
| **label** | Etiquetas pequeñas o badges | `<span>`, `<label>` |

### 🎯 Props del Componente Text

```tsx
<Text
  variant="display" | "headline" | "title" | "subtitle" | "body" | "label"
  as="h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  weight="light" | "normal" | "bold"
  className="your-class"
  color="#hexcolor"
>
  Tu contenido aquí
</Text>
```

- **variant**: Define el tamaño y estilo del texto
- **as**: Define el elemento HTML semántico que se renderizará
- **weight**: Define el peso de la fuente (light, normal, bold)
- **className**: Clases adicionales para estilos custom
- **color**: Color del texto (usar solo cuando sea necesario)

### 📋 Ejemplos de Uso Común

```tsx
// Hero Title
<Text variant="display" as="h1" weight="bold">
  MASTERCLASS: Introducción a la Fotografía
</Text>

// Section Title
<Text variant="headline" as="h2" weight="bold" className="section-title">
  Contenido del Taller
</Text>

// Card Title
<Text variant="title" as="h3" weight="bold" className="card-title">
  Pre-Producción
</Text>

// Description
<Text variant="body" as="p" className="description">
  Aprende a planificar sesiones desde cero...
</Text>

// Label or Badge
<Text variant="label" as="p" className="badge">
  EDICIÓN LIMITADA
</Text>

// Stats or Numbers
<Text variant="title" as="span" weight="bold">
  150+
</Text>
```

### 🔄 Workflow para Usar Text

1. **Identifica el tipo de texto**: ¿Es un título? ¿Un párrafo? ¿Una etiqueta?
2. **Selecciona la variante correcta**: display, headline, title, subtitle, body, label
3. **Define el elemento HTML semántico**: h1, h2, h3, h4, p, span (usando prop `as`)
4. **Agrega weight si es necesario**: bold para títulos, normal para texto regular
5. **Mantén las clases CSS existentes**: usa `className` para estilos adicionales

### 📋 Checklist antes de agregar texto

- [ ] ¿Estoy usando el componente `Text` de citrica-ui-toolkit?
- [ ] ¿He seleccionado la variante correcta (display, headline, title, body, label)?
- [ ] ¿He definido el elemento HTML semántico con la prop `as`?
- [ ] ¿He agregado `weight="bold"` si es un título?
- [ ] ¿He evitado usar elementos HTML directos como `<h1>`, `<p>`, etc.?

### 🚫 Lo que NO debes hacer

- ❌ NO uses `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` directamente
- ❌ NO uses `<p>` o `<span>` directamente para contenido
- ❌ NO agregues estilos de tipografía inline sin usar el componente Text
- ❌ NO ignores las variantes disponibles - úsalas siempre

### ✅ Lo que SÍ debes hacer

- ✅ USA el componente `Text` para TODA la tipografía
- ✅ SELECCIONA la variante apropiada según el contexto
- ✅ DEFINE el elemento HTML semántico con la prop `as`
- ✅ MANTÉN la consistencia usando las mismas variantes en contextos similares
- ✅ USA `weight="bold"` para títulos y encabezados

---

## ⚠️ IMPORTANTE: Sistema de Colores en Componente Text

### 🚨 REGLA DE ORO: NUNCA uses clases de Tailwind para colores en Text

**El componente Text tiene props específicos para manejar colores. NUNCA uses clases de Tailwind como `text-gray-500`, `text-white`, etc. en el prop `className`.**

### 🎨 Props de Color en Text

El componente `Text` tiene **DOS props para manejar colores**:

1. **`color`**: Para colores personalizados (hex, rgb, etc.)
2. **`textColor`**: Para usar tokens de color del sistema (variables CSS)

#### ❌ INCORRECTO:
```tsx
// MAL - No usar clases de Tailwind para colores
<Text variant="body" className="text-gray-500">
  Texto gris
</Text>

<Text variant="title" className="text-white dark:text-black">
  Título con tema
</Text>

<Text variant="label" className="text-[#EAFF00]">
  Label amarillo
</Text>
```

#### ✅ CORRECTO:
```tsx
// BIEN - Usar prop "color" para colores personalizados
<Text variant="body" color="#6B7280">
  Texto gris
</Text>

// BIEN - Usar prop "textColor" para tokens del sistema
<Text variant="title" textColor="color-on-surface">
  Título que se adapta al tema (light/dark)
</Text>

// BIEN - Usar prop "color" para colores hex específicos
<Text variant="label" color="#EAFF00">
  Label amarillo
</Text>
```

### 📋 Cuándo usar cada prop

| Prop | Cuándo usarlo | Ejemplo |
|------|---------------|---------|
| **`color`** | Cuando necesitas un color específico que NO está en el sistema de tokens | `color="#EAFF00"`, `color="#FFF"`, `color="rgb(107, 63, 160)"` |
| **`textColor`** | Cuando el color existe en el sistema de tokens de `colors.scss` | `textColor="color-on-surface"`, `textColor="color-primary"`, `textColor="color-outline"` |
| **Ninguno** | Cuando quieres usar el color por defecto del componente | Sin props de color |

### 🔧 Sistema de Tokens de Color

**Todos los colores deben estar definidos en:** `styles/01-settings/colors/colors.scss`

#### Tokens Comunes Disponibles:

```scss
// Text colors básicos
color-white: #FFFFFF
color-black: #16141F

// Surface colors (se adaptan a light/dark theme)
color-on-surface: #242424 (light) / #E0E0E0 (dark)
color-on-surface-var: #333333 (light) / #FFFFFF (dark)

// Primary colors
color-primary: Varía según el tema
color-on-primary: Color de texto sobre primary

// Semantic colors
color-error: Color para errores
color-warning: Color para advertencias
color-success: Color para éxito

// Outline colors
color-outline: Colores de borde
color-outline-variant: Variante de borde
```

### 🎯 Ejemplos de Uso Correcto

```tsx
// Color específico que no está en tokens (usar color)
<Text variant="display" as="h1" color="#FFF">
  Título blanco con hex específico
</Text>

// Color del sistema que se adapta al tema (usar textColor)
<Text variant="body" as="p" textColor="color-on-surface">
  Texto que se adapta automáticamente a light/dark mode
</Text>

// Color personalizado para marca (usar color)
<Text variant="label" as="span" color="#EAFF00">
  Etiqueta con color de marca
</Text>

// Color primario del sistema (usar textColor)
<Text variant="title" as="h2" textColor="color-primary">
  Título con color primario del tema
</Text>

// Sin color (usa el valor por defecto)
<Text variant="body" as="p">
  Texto con color por defecto
</Text>
```

### 🔄 Workflow para Colores en Text

1. **¿Necesitas color específico?**
   - SÍ → ¿Está en `colors.scss`?
     - SÍ → Usa `textColor="color-name"`
     - NO → Agrégalo a `colors.scss` O usa `color="#hex"`
   - NO → No uses ningún prop de color

2. **Si necesitas un color nuevo:**
   ```scss
   // 1. Agrégalo en styles/01-settings/colors/colors.scss
   $color-light-custom-accent: #EAFF00;
   $color-dark-custom-accent: #FFE500;

   // 2. Úsalo en tu componente
   <Text textColor="color-custom-accent">Texto con nuevo color</Text>
   ```

### 📋 Checklist para Colores en Text

- [ ] ¿Estoy usando `className` con clases de Tailwind de color? → ❌ NO HACER
- [ ] ¿El color necesario está en `colors.scss`? → Usa `textColor`
- [ ] ¿El color NO está en `colors.scss`? → Usa `color` o agrégalo a `colors.scss`
- [ ] ¿Necesito que el color se adapte a light/dark mode? → Usa `textColor`
- [ ] ¿Es un color específico de una sola vez? → Usa `color`

### 🚫 Errores Comunes a Evitar

```tsx
// ❌ ERROR: Usar className con colores de Tailwind
<Text variant="body" className="text-gray-500">Error</Text>
<Text variant="title" className="text-[#EAFF00]">Error</Text>
<Text variant="label" className="text-white dark:text-black">Error</Text>

// ❌ ERROR: Usar color Y className con colores
<Text variant="body" color="#FFF" className="text-white">
  Redundante e incorrecto
</Text>

// ✅ CORRECTO: Usar solo el prop adecuado
<Text variant="body" color="#6B7280">Correcto</Text>
<Text variant="title" textColor="color-on-surface">Correcto</Text>
<Text variant="label" color="#EAFF00">Correcto</Text>
```

### ⚙️ Agregar Nuevos Colores al Sistema

**Archivo:** `styles/01-settings/colors/colors.scss`

```scss
// 1. Define el color en light theme
$color-light-custom-name: #HEXCOLOR;

// 2. Define el color en dark theme
$color-dark-custom-name: #HEXCOLOR;

// 3. Úsalo en tus componentes
```

**Ejemplo completo:**
```scss
// En colors.scss
$color-light-accent-yellow: #EAFF00;
$color-dark-accent-yellow: #FFE500;

// En tu componente
<Text variant="label" textColor="color-accent-yellow">
  Etiqueta amarilla que se adapta al tema
</Text>
```

### 🎨 Colores para Casos Específicos

| Caso de Uso | Solución |
|-------------|----------|
| Texto que se adapta a light/dark | `textColor="color-on-surface"` |
| Color de marca específico | `color="#EAFF00"` (o agrégalo a `colors.scss`) |
| Texto sobre fondos de color | `textColor="color-on-primary"` o `color="#FFF"` |
| Texto deshabilitado / secundario | `textColor="color-outline"` |
| Texto de error | `textColor="color-error"` |
| Texto de éxito | `textColor="color-success"` |

### ✅ Resumen de Buenas Prácticas

1. **NUNCA** uses `className` con clases de color de Tailwind (`text-*`)
2. **USA** `textColor` cuando el color está en el sistema de tokens
3. **USA** `color` cuando necesitas un color específico personalizado
4. **AGREGA** colores nuevos a `colors.scss` cuando sean reutilizables
5. **DEFINE** versiones light y dark para colores que se adaptan al tema

### 🎨 Ejemplo Completo de una Sección

```tsx
import { Container, Col, Text } from 'citrica-ui-toolkit';

<Container>
  <Col cols={{ sm: 4, md: 6, lg: 12 }}>
    <section className="content-section">
      {/* Section Title */}
      <Text variant="headline" as="h2" weight="bold" className="section-title">
        Contenido del Taller
      </Text>

      {/* Section Description */}
      <Text variant="body" as="p" className="section-description">
        Aprende las mejores técnicas de fotografía gastronómica
      </Text>
    </section>
  </Col>

  <Col cols={{ sm: 4, md: 2, lg: 4 }}>
    <div className="card">
      {/* Card Title */}
      <Text variant="title" as="h3" weight="bold" className="card-title">
        Pre-Producción
      </Text>

      {/* Card Description */}
      <Text variant="body" as="p" className="card-description">
        Planificación de sesiones desde cero
      </Text>
    </div>
  </Col>
</Container>
```

---

### Quick Start - Responsive Layout

```tsx
import { Container, Col } from 'citrica-ui-toolkit';

<Container>
  <Col cols={{ sm: 4, md: 3, lg: 6 }}>
    {/* Mobile: 100%, Tablet: 50%, Desktop: 50% */}
    Your content here
  </Col>
</Container>
```

### Quick Start - Component Tokens

**For Client/Public App:**
```tsx
<Button className="btn-citrica-ui btn-primary" />
<Input className="input-citrica-ui input-primary" />
```

**For Admin Panel:**
```tsx
<Button className="btn-citrica-ui-admin btn-primary-admin" />
<Input className="input-citrica-ui-admin input-primary-admin" />
```

---

## 🚀 REFERENCIA RÁPIDA: Crear Nueva Web

### Archivos a Modificar

Cuando recibas la tarea de crear una nueva landing page, SOLO modifica:

1. **[config/site.ts](config/site.ts)** - Nombre del sitio y navegación
2. **[styles/01-settings/colors/colors.scss](styles/01-settings/colors/colors.scss)** - Colores primarios
3. **[app/page.tsx](app/page.tsx)** - Contenido de la página

### Importaciones Obligatorias

```tsx
'use client'
import { Button, Container, Col, Text, Icon } from 'citrica-ui-toolkit'
import { siteConfig } from '@/config/site'
```

### Componentes Clave y Props Correctos

| Componente | Props Importantes | Ejemplo |
|------------|-------------------|---------|
| **Icon** | `name` (NO iconName), `size`, `color` | `<Icon name="Camera" size={24} />` |
| **Text** | `variant`, `as`, `weight`, `color` | `<Text variant="display" as="h1" weight="bold" color="#FFF">` |
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
            <Text variant="display" as="h1" weight="bold" color="#FFF">
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

// Correcto 4: Usar prop color en Text
<Text variant="body" color="#6B7280">Texto</Text>
```

### Cambiar Colores del Tema

**Archivo:** `styles/01-settings/colors/colors.scss`

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

- [ ] **Actualizar [config/site.ts](config/site.ts)**
  ```typescript
  name: "Nombre del Sitio"
  description: "Descripción"
  navLinks: [{ title: "...", href: "#..." }]
  ```

- [ ] **Actualizar colores en [styles/01-settings/colors/colors.scss](styles/01-settings/colors/colors.scss)**
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
- [ ] ✅ Usar `color` prop (NO className con Tailwind)
- [ ] ✅ Ejemplo: `<Text variant="display" as="h1" color="#FFF">`

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
| **Icon** | `color` | `string` (hex, rgb) | `<Icon name="Star" color="#cd29ff" />` |
| **Text** | `variant` | `display`, `headline`, `title`, `subtitle`, `body`, `label` | `<Text variant="display" />` |
| **Text** | `as` | `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`, `span`, `div` | `<Text as="h1" />` |
| **Text** | `weight` | `light`, `normal`, `bold` | `<Text weight="bold" />` |
| **Text** | `color` | `string` (hex, rgb) | `<Text color="#FFF" />` |
| **Button** | `variant` | `primary`, `secondary`, `flat` | `<Button variant="primary" />` |
| **Col** | `cols` | `{ sm: 1-4, md: 1-6, lg: 1-12 }` | `<Col cols={{ sm: 4, md: 3, lg: 6 }} />` |

### 🔗 Links Útiles

- **Iconos Lucide:** [https://lucide.dev/icons/](https://lucide.dev/icons/)
- **Tailwind CSS:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Next.js App Router:** [https://nextjs.org/docs/app](https://nextjs.org/docs/app)

---

## IMPORTANT FOR CREATE NEW WEB
Change only this files:
- app/page.tsx
- config/site.ts
- styles/01-settings/colors/colors.scss
- styles/10-tokens/components/*

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
