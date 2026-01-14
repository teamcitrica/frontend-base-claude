# Sistema de Estilos - Citrica BaseAdmin

Documentación completa del sistema de estilos, tokens y layout de la aplicación.

## 📚 Documentación Disponible

### 🎨 Sistema de Tokens

- **[10-tokens/README.md](10-tokens/README.md)** - Sistema de tokens de diseño (Cliente y Admin)
- **[10-tokens/EXAMPLES.md](10-tokens/EXAMPLES.md)** - Ejemplos de uso de tokens

### 📐 Sistema de Layout

- **[LAYOUT-SYSTEM.md](LAYOUT-SYSTEM.md)** - Documentación técnica completa del grid system
- **[LAYOUT-VISUAL-GUIDE.md](LAYOUT-VISUAL-GUIDE.md)** - Guía visual con diagramas
- **[LAYOUT-EXAMPLES.md](LAYOUT-EXAMPLES.md)** - Ejemplos de código completo

## 🗂️ Estructura de Carpetas

```
styles/
├── 01-settings/          # Variables, colores, mixins
│   ├── colors/          # Colores cliente
│   ├── colors-admin/    # Colores admin
│   ├── settings.scss    # Variables globales
│   └── mixins.scss      # Mixins responsivos
│
├── 02-tools/            # Herramientas y utilidades
├── 03-external/         # Estilos externos (librerías)
├── 04-generic/          # Estilos genéricos base
├── 05-tags/             # Estilos de tags HTML
├── 06-keyframes/        # Animaciones CSS
│
├── 07-objects/          # Sistema de Layout
│   ├── container/       # Contenedor principal
│   └── col/            # Sistema de columnas
│
├── 08-components/       # Componentes específicos
├── 09-utilities/        # Clases de utilidad
│
├── 10-tokens/          # Sistema de Tokens
│   ├── components/      # Tokens cliente
│   └── components-admin/# Tokens admin
│
├── 11-atomic-design/   # Atomic Design System
├── themes/             # Temas (light/dark)
├── webpages-styles/    # Estilos por página
│
├── globals.scss        # Archivo principal
├── custom.scss         # Estilos custom
└── README.md          # Este archivo
```

## 🚀 Inicio Rápido

### Para Layout Responsivo

```tsx
import { Container, Col } from 'citrica-ui-toolkit';

<Container>
  <Col cols={{ sm: 4, md: 3, lg: 6 }}>
    {/* Tu contenido aquí */}
  </Col>
</Container>
```

**Ver más:** [LAYOUT-SYSTEM.md](LAYOUT-SYSTEM.md)

### Para Tokens de Componentes

**Cliente:**
```tsx
<Button className="btn-citrica-ui btn-primary" />
<Input className="input-citrica-ui input-primary" />
```

**Admin:**
```tsx
<Button className="btn-citrica-ui-admin btn-primary-admin" />
<Input className="input-citrica-ui-admin input-primary-admin" />
```

**Ver más:** [10-tokens/README.md](10-tokens/README.md)

## 📖 Guías por Tarea

### "Quiero crear un layout responsivo"

1. Lee [LAYOUT-VISUAL-GUIDE.md](LAYOUT-VISUAL-GUIDE.md) para ver diagramas
2. Revisa [LAYOUT-EXAMPLES.md](LAYOUT-EXAMPLES.md) para código completo
3. Consulta [LAYOUT-SYSTEM.md](LAYOUT-SYSTEM.md) para detalles técnicos

### "Quiero estilizar un botón/input"

1. Lee [10-tokens/README.md](10-tokens/README.md) para entender el sistema
2. Revisa [10-tokens/EXAMPLES.md](10-tokens/EXAMPLES.md) para ejemplos prácticos
3. Consulta los archivos en `10-tokens/components/` o `10-tokens/components-admin/`

### "Quiero crear un componente responsivo en SCSS"

1. Usa el mixin `a-set` documentado en [LAYOUT-SYSTEM.md](LAYOUT-SYSTEM.md#mixins-y-utilidades-scss)
2. Revisa ejemplos en [LAYOUT-EXAMPLES.md](LAYOUT-EXAMPLES.md#componentes-scss-responsivos)

## 🎯 Conceptos Clave

### Breakpoints

```scss
Mobile (sm):  0px - 610px    (4 columnas)
Tablet (md):  611px - 1190px  (6 columnas)
Desktop (lg): 1191px+         (12 columnas)
```

### Variables CSS Dinámicas

El sistema usa CSS Custom Properties que cambian según el breakpoint:

- `--total-columns`: 4, 6 o 12
- `--grid-gutter`: 20px o 56px
- `--container-padding`: 24px, 56px o 112px

### Tokens Separados

- **Cliente**: `--color-primary-*`, `--form-radius-*`
- **Admin**: `--color-admin-primary-*`, `--form-admin-radius-*`

## 🔧 Herramientas Disponibles

### Mixins Responsivos

```scss
@include only-sm { /* Mobile solo */ }
@include md { /* Tablet y desktop */ }
@include only-md { /* Tablet solo */ }
@include lg { /* Desktop */ }
```

### Mixin a-set (Componentes Responsivos)

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

### Mixins de Columnas

```scss
@include a-col(6);        // 50% de ancho
@include a-col-push(2);   // Margen izquierdo
```

## 📊 Sistema de Grid

### Fórmula de Cálculo

```
ancho_porcentual = (columnas_usadas / total_columnas) × 100%
```

### Ejemplos Rápidos

| Objetivo | sm | md | lg | Resultado |
|----------|----|----|----|----|
| Ancho completo | 4 | 6 | 12 | 100% siempre |
| Mitad | 2 | 3 | 6 | 50% siempre |
| Tercio | - | 2 | 4 | 33% (66% en mobile) |
| Cuarto | 1 | - | 3 | 25% (25% mobile, 50% tablet) |

## 🎨 Colores del Sistema

### Cliente

Definidos en `01-settings/colors/`:
- Primary: `#FF5B00` (Naranja)
- Secondary: `#E1FF00` (Verde lima)
- Tertiary: `#00FFFF` (Cian)

### Admin

Definidos en `01-settings/colors-admin/`:
- Primary: `#265197` (Azul)
- Secondary, tertiary, etc.

**Ver más:** [01-settings/colors/colors.scss](01-settings/colors/colors.scss)

## 🌓 Temas (Light/Dark)

Los temas se definen en:
- `01-settings/colors/colors-light-theme.scss`
- `01-settings/colors/colors-dark-theme.scss`
- `01-settings/colors-admin/colors-admin-light-theme.scss`
- `01-settings/colors-admin/colors-admin-dark-theme.scss`

## 📝 Convenciones de Nomenclatura

### Clases CSS

```scss
// Objects (layout)
.o-container
.o-col-4@sm

// Components
.c-button
.c-card

// Utilities
.u-text-center
.u-mb-20
```

### Tokens

```scss
// Cliente
--color-primary-btn
--form-radius-input

// Admin
--color-admin-primary-btn
--form-admin-radius-input
```

### Archivos

```
// Cliente
button-tokens.scss
input-tokens.scss

// Admin
button-admin-tokens.scss
input-admin-tokens.scss
```

## 🐛 Debugging

### Ver Breakpoint Actual

```js
// En la consola del navegador
if (window.matchMedia('(max-width: 610px)').matches) console.log('Mobile');
else if (window.matchMedia('(max-width: 1190px)').matches) console.log('Tablet');
else console.log('Desktop');
```

### Ver Variables CSS

```js
// En la consola del navegador
getComputedStyle(document.documentElement).getPropertyValue('--total-columns')
getComputedStyle(document.documentElement).getPropertyValue('--grid-gutter')
```

### Agregar Bordes Visuales

```css
.o-container {
  border: 2px solid red !important;
}

[class^="o-col-"] {
  border: 1px solid blue !important;
  background: rgba(0, 0, 255, 0.1) !important;
}
```

## 📚 Recursos Adicionales

### Documentación Interna

- [LAYOUT-SYSTEM.md](LAYOUT-SYSTEM.md) - Sistema de layout completo
- [LAYOUT-VISUAL-GUIDE.md](LAYOUT-VISUAL-GUIDE.md) - Diagramas visuales
- [LAYOUT-EXAMPLES.md](LAYOUT-EXAMPLES.md) - Ejemplos de código
- [10-tokens/README.md](10-tokens/README.md) - Sistema de tokens
- [10-tokens/EXAMPLES.md](10-tokens/EXAMPLES.md) - Ejemplos de tokens

### Archivos de Código

- [01-settings/settings.scss](01-settings/settings.scss) - Variables globales
- [01-settings/mixins.scss](01-settings/mixins.scss) - Mixins responsivos
- [07-objects/container/container.scss](07-objects/container/container.scss) - Container
- [07-objects/col/col.scss](07-objects/col/col.scss) - Sistema de columnas
- [10-tokens/tokens.scss](10-tokens/tokens.scss) - Tokens principal

## 🤝 Contribuir

Para mantener la consistencia:

1. **Layout**: Usa siempre `Container` + `Col` con los 3 breakpoints
2. **Tokens**: Usa tokens cliente para app pública, admin para panel
3. **Responsivo**: Usa `a-set` mixin para componentes SCSS
4. **Naming**: Sigue las convenciones de nomenclatura
5. **Documentación**: Actualiza la documentación cuando agregues features

## 📋 Requerimientos de Código para Nuevos Proyectos

Cuando crees nuevos proyectos basados en este template, sigue estos requerimientos críticos:

### 1. SEO y Semántica HTML

**Componente Text:**
- SIEMPRE envuelve el componente `<Text>` (atoms/text) en tags HTML semánticos para SEO
- Usa los tags correctos como lo haría un experto en SEO

```tsx
// ✅ CORRECTO
<h1><Text>Título Principal</Text></h1>
<h2><Text>Subtítulo</Text></h2>
<p><Text>Párrafo de contenido</Text></p>

// ❌ INCORRECTO
<Text>Título Principal</Text>
```

### 2. Colores y Estilos

**NO usar Inline Styles:**
- NUNCA uses `style={{}}` en componentes para colores
- Haz propuestas de colores en [styles/01-settings/colors.scss](01-settings/colors.scss)
- Usa los colores de la marca del cliente

**Archivo colors.scss - CRÍTICO:**
- **Mantén EXACTAMENTE la misma estructura de archivos**
- **Reglas estrictas:**
  1. NO agregues ni elimines NINGUNA línea (incluidas líneas en blanco y comentarios)
  2. SOLO cambia los VALORES de colores (códigos hex)
  3. Mantén todos los nombres de variables, comentarios y espaciado idénticos
  4. Verifica que el conteo de líneas coincida con el original antes de entregar

### 3. Visibilidad por Tamaño de Pantalla

**Clases de Utilidad:**
- NO uses `md:hidden` o clases de Tailwind para ocultar elementos
- USA las clases personalizadas del sistema:
  - `not-sm` - Ocultar en móvil
  - `not-md` - Ocultar en tablet
  - `not-lg` - Ocultar en desktop

```tsx
// ✅ CORRECTO
<div className="not-md">Solo visible en móvil y desktop</div>
<div className="not-sm not-md">Solo visible en desktop</div>

// ❌ INCORRECTO
<div className="md:hidden">Contenido</div>
```

**Referencia:** Revisa [styles/09-utilities/utilities.scss](09-utilities/utilities.scss)

### 4. Archivos Requeridos en Nuevos Proyectos

Cuando inicies un nuevo proyecto, crea propuestas para:

1. **app/page.tsx** - Página HOME principal
2. **styles/01-settings/colors.scss** - Colores de marca (PRESERVAR CONTEO EXACTO DE LÍNEAS)
3. **config/site.ts** - Configuración del sitio

### 5. Verificación antes de Entregar

**Checklist obligatorio:**

- [ ] `colors.scss` tiene el MISMO número de líneas que el archivo original
- [ ] Solo se modificaron valores hex de colores, no nombres de variables
- [ ] Todos los comentarios y líneas en blanco se mantienen
- [ ] Componentes `<Text>` están envueltos en tags semánticos
- [ ] No hay inline styles para colores
- [ ] Se usan clases `not-*` en lugar de `md:hidden`

**Si el conteo de líneas difiere, corrige inmediatamente.**

## ⚡ Tips de Performance

1. **Lazy Loading**: Usa `loading="lazy"` en imágenes de grids
2. **Imágenes Responsivas**: Usa `<picture>` con diferentes tamaños
3. **CSS Variables**: Aprovecha las variables CSS dinámicas
4. **Gutter**: No agregues margin/padding extra, usa el gutter automático

## 🔗 Links Útiles

- [Citrica UI Toolkit](https://github.com/citrica/ui-toolkit)
- [HeroUI (NextUI)](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Última actualización:** Enero 2026
**Versión del sistema:** 2.0
**Mantenedores:** Citrica Dev Team
