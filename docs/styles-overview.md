# Sistema de Estilos - Citrica BaseAdmin

Documentacion completa del sistema de estilos, tokens y layout de la aplicacion.

## Documentacion Disponible

### Sistema de Tokens
- **[tokens-system.md](tokens-system.md)** - Sistema de tokens de diseno (Web y Admin)
- **[tokens-examples.md](tokens-examples.md)** - Ejemplos de uso de tokens

### Sistema de Layout
- **[layout-system.md](layout-system.md)** - Documentacion tecnica completa del grid system
- **[layout-visual-guide.md](layout-visual-guide.md)** - Guia visual con diagramas
- **[layout-examples.md](layout-examples.md)** - Ejemplos de codigo completo

### Componentes
- **[citrica-ui-toolkit.md](citrica-ui-toolkit.md)** - Documentacion de componentes del toolkit

## Estructura de Carpetas

```
styles/
├── 01-settings/          # Variables globales, fonts, mixins
│   ├── settings.scss     # Grid system, tipografia, variables responsivas
│   └── mixins.scss       # Mixins responsivos y utilidades
│
├── 02-tools/             # Herramientas y utilidades SCSS
├── 03-external/          # Estilos de librerias externas
├── 04-generic/           # Estilos genericos base (reset, :root con temas)
├── 05-tags/              # Estilos de tags HTML
├── 06-keyframes/         # Animaciones CSS
│
├── 07-objects/           # Sistema de Layout
│   ├── container/        # Contenedor principal
│   └── col/              # Sistema de columnas
│
├── 08-components/        # Componentes especificos
├── 09-utilities/         # Clases de utilidad
│
├── 10-tokens/            # Sistema de Tokens (centralizado)
│   ├── web/              # Web publica
│   │   ├── colors/       # Paleta + temas light/dark
│   │   └── components/   # Tokens de componentes (button, input, etc.)
│   ├── admin/            # Panel administrativo
│   │   ├── colors/       # Paleta + temas light/dark admin
│   │   └── components/   # Tokens de componentes admin
│   └── tokens.scss       # Archivo principal de imports
│
├── 11-atomic-design/     # Atomic Design System
├── themes/               # Temas adicionales
├── webpages-styles/      # Estilos por pagina
│
├── globals.scss          # Archivo principal (importa todo)
└── custom.scss           # Estilos custom del proyecto
```

## Inicio Rapido

### Para Layout Responsivo

```tsx
import { Container, Col } from 'citrica-ui-toolkit';

<Container>
  <Col cols={{ sm: 4, md: 3, lg: 6 }}>
    {/* Tu contenido aqui */}
  </Col>
</Container>
```

**Ver mas:** [layout-system.md](layout-system.md)

### Para Tokens de Componentes

**Web (publica):**
```tsx
<Button className="btn-citrica-ui btn-primary" />
<Input className="input-citrica-ui input-primary" />
```

**Admin:**
```tsx
<Button className="btn-citrica-ui-admin btn-primary-admin" />
<Input className="input-citrica-ui-admin input-primary-admin" />
```

**Ver mas:** [tokens-system.md](tokens-system.md)

## Conceptos Clave

### Breakpoints

```scss
Mobile (sm):  0px - 610px    (4 columnas)
Tablet (md):  611px - 1190px  (6 columnas)
Desktop (lg): 1191px+         (12 columnas)
```

### Variables CSS Dinamicas

El sistema usa CSS Custom Properties que cambian segun el breakpoint:

- `--total-columns`: 4, 6 o 12
- `--grid-gutter`: 20px o 56px
- `--container-padding`: 24px, 56px o 112px

### Tokens Separados

- **Web**: `--color-primary-*`, `--form-radius-*`
- **Admin**: `--color-admin-primary-*`, `--form-admin-radius-*`

## Colores del Sistema

### Web

Definidos en `10-tokens/web/colors/_palette.scss`:
- Primary: `#FF5B00` (Naranja)
- Secondary: `#E1FF00` (Verde lima)
- Tertiary: `#00FFFF` (Cian)

### Admin

Definidos en `10-tokens/admin/colors/_palette.scss`:
- Primary: `#265197` (Azul)
- Secondary, tertiary, etc.

## Temas (Light/Dark)

Los temas se definen en:
- `10-tokens/web/colors/_light-theme.scss`
- `10-tokens/web/colors/_dark-theme.scss`
- `10-tokens/admin/colors/_light-theme.scss`
- `10-tokens/admin/colors/_dark-theme.scss`

Se aplican en `04-generic/generic.scss` dentro de `:root` y `[data-theme="dark"]`.

## Requerimientos de Codigo para Nuevos Proyectos

### 1. SEO y Semantica HTML

**Componente Text:**
- SIEMPRE envuelve el componente `<Text>` en tags HTML semanticos para SEO

```tsx
// CORRECTO
<h1><Text>Titulo Principal</Text></h1>
<p><Text>Parrafo de contenido</Text></p>

// INCORRECTO
<Text>Titulo Principal</Text>
```

### 2. Colores y Estilos

- NUNCA uses `style={{}}` en componentes para colores
- Usa los colores definidos en `10-tokens/web/colors/_palette.scss` o `10-tokens/admin/colors/_palette.scss`
- **Regla critica para `_palette.scss`:** Mantener EXACTAMENTE la misma estructura. Solo cambiar valores hex, no agregar ni eliminar lineas.

### 3. Visibilidad por Tamano de Pantalla

- NO uses `md:hidden` o clases de Tailwind para ocultar elementos
- USA las clases custom: `not-sm`, `not-md`, `not-lg`

```tsx
// CORRECTO
<div className="not-md">Solo visible en movil y desktop</div>

// INCORRECTO
<div className="md:hidden">Contenido</div>
```

### 4. Mixins Responsivos

```scss
@include only-sm { /* Mobile solo */ }
@include md { /* Tablet y desktop */ }
@include only-md { /* Tablet solo */ }
@include lg { /* Desktop */ }
```

### 5. Mixin a-set (Componentes Responsivos)

```scss
$mi-componente: (
  sm: ( padding: 10px ),
  md: ( padding: 15px ),
  lg: ( padding: 20px )
);

.mi-componente {
  @include a-set($mi-componente);
}
```
