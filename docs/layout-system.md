# Sistema de Layout Responsivo

Documentación completa del sistema de grid responsivo y layout de Citrica BaseAdmin.

## Tabla de Contenidos

1. [Conceptos Fundamentales](#conceptos-fundamentales)
2. [Breakpoints y Sistema Responsivo](#breakpoints-y-sistema-responsivo)
3. [Container - Contenedor Principal](#container---contenedor-principal)
4. [Col - Sistema de Columnas](#col---sistema-de-columnas)
5. [Mixins y Utilidades SCSS](#mixins-y-utilidades-scss)
6. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## Conceptos Fundamentales

### Variables CSS Dinámicas

El sistema usa **CSS Custom Properties** (variables CSS) que cambian automáticamente según el breakpoint:

```scss
// Variables que cambian según el tamaño de pantalla
--container-width: 1366px        // Ancho máximo del contenedor
--total-columns: 4, 6 o 12       // Total de columnas disponibles
--grid-gutter: 20px o 56px       // Espacio entre columnas
--container-padding: 24px, 56px o 112px  // Padding del contenedor
```

Estas variables se definen en [01-settings/settings.scss](frontend-baseadmin-cteam/styles/01-settings/settings.scss:167-208).

---

## Breakpoints y Sistema Responsivo

### Breakpoints Definidos

```scss
// Ubicación: styles/01-settings/mixins.scss
$break-tablet: 610px;
$break-desktop: 1190px;
```

### Tamaños de Pantalla

| Nombre | Rango | Columnas | Gutter | Container Padding |
|--------|-------|----------|--------|-------------------|
| **sm** (Mobile) | 0px - 610px | 4 | 20px | 24px |
| **md** (Tablet) | 611px - 1190px | 6 | 20px | 56px |
| **lg** (Desktop) | 1191px+ | 12 | 56px | 112px |

### Configuración Responsiva

```scss
// Definido en: 01-settings/settings.scss
$root-vars: (
    sm: (
        --total-columns: 4,        // 4 columnas en mobile
        --grid-gutter: 20px,       // 20px entre columnas
        --container-padding: 24px, // 24px de padding
    ),
    md: (
        --total-columns: 6,        // 6 columnas en tablet
        --grid-gutter: 20px,
        --container-padding: 56px,
    ),
    lg: (
        --total-columns: 12,       // 12 columnas en desktop
        --grid-gutter: 56px,       // 56px entre columnas
        --container-padding: 112px,
    ),
);
```

---

## Container - Contenedor Principal

El `Container` es el componente que envuelve el contenido y proporciona el layout base.

### Características

- **Centrado automático**: `margin: 0 auto`
- **Flexbox**: `display: flex; flex-wrap: wrap`
- **Ancho máximo**: `max-width: 100%`
- **Padding responsivo**: Se ajusta según el breakpoint
- **Gutter management**: Gestiona el espacio entre columnas

### Uso en TSX/JSX

```tsx
import { Container } from 'citrica-ui-toolkit';
// o
import { Container } from '@/styles/07-objects/objects';

<Container>
  {/* Contenido aquí */}
</Container>
```

### Uso con HTML/CSS

```html
<div className="o-container">
  <!-- Contenido aquí -->
</div>
```

### Variante Full Width

```tsx
<Container full>
  {/* Contenido a ancho completo */}
</Container>
```

```html
<div className="o-container o-container--full">
  <!-- Contenido a ancho completo -->
</div>
```

### Prop `noPadding`

```tsx
<Container noPadding>
  {/* Sin padding lateral */}
</Container>
```

### Código SCSS del Container

```scss
// Ubicación: styles/07-objects/container/container.scss
.o-container{
    max-width: 100%;
    width: calc( var(--container-width) + ( var(--container-padding) * 2 ) );
    padding-left: calc( var(--container-padding) - ( var(--grid-gutter) / 2) );
    padding-right: calc( var(--container-padding) - ( var(--grid-gutter) / 2) );
    display: flex;
    margin: 0 auto;
    flex-wrap: wrap;

    &--full{
        width: 100%;
    }
}
```

---

## Col - Sistema de Columnas

El componente `Col` gestiona el ancho de las columnas de forma responsiva.

### Uso Básico en TSX/JSX

```tsx
import { Col } from 'citrica-ui-toolkit';
// o
import { Col } from '@/styles/07-objects/objects';

<Col cols={{ sm: 4, md: 6, lg: 12 }}>
  {/* Contenido */}
</Col>
```

### Sintaxis del Prop `cols`

```tsx
cols={{
  sm: 4,   // En mobile: ocupa 4 de 4 columnas (100%)
  md: 3,   // En tablet: ocupa 3 de 6 columnas (50%)
  lg: 6    // En desktop: ocupa 6 de 12 columnas (50%)
}}
```

### Ejemplos de Configuraciones Comunes

#### Columna de Ancho Completo

```tsx
<Col cols={{ sm: 4, md: 6, lg: 12 }}>
  {/* 100% en todas las pantallas */}
</Col>
```

#### Columna de 50% (Mitad)

```tsx
<Col cols={{ sm: 4, md: 3, lg: 6 }}>
  {/* Mobile: 100%, Tablet: 50%, Desktop: 50% */}
</Col>
```

#### Columna de 33% (Tercio)

```tsx
<Col cols={{ sm: 4, md: 2, lg: 4 }}>
  {/* Mobile: 100%, Tablet: 33%, Desktop: 33% */}
</Col>
```

#### Columna de 25% (Cuarto)

```tsx
<Col cols={{ sm: 4, md: 3, lg: 3 }}>
  {/* Mobile: 100%, Tablet: 50%, Desktop: 25% */}
</Col>
```

### Uso con Clases CSS Directas

Si no usas el componente React, puedes usar las clases generadas:

```html
<!-- Responsive con @ -->
<div class="o-col-4@sm o-col-3@md o-col-6@lg">
  Contenido
</div>
```

### Sistema de Clases Generadas

El sistema genera automáticamente clases para cada columna:

```scss
// Mobile (sm) - 4 columnas
.o-col-1@sm { width: 25%; }
.o-col-2@sm { width: 50%; }
.o-col-3@sm { width: 75%; }
.o-col-4@sm { width: 100%; }

// Tablet (md) - 6 columnas
.o-col-1@md { width: 16.66%; }
.o-col-2@md { width: 33.33%; }
.o-col-3@md { width: 50%; }
.o-col-4@md { width: 66.66%; }
.o-col-5@md { width: 83.33%; }
.o-col-6@md { width: 100%; }

// Desktop (lg) - 12 columnas
.o-col-1@lg { width: 8.33%; }
.o-col-2@lg { width: 16.66%; }
// ... hasta 12
.o-col-12@lg { width: 100%; }
```

### Gutter (Espacio entre Columnas)

Todas las columnas tienen padding lateral automático:

```scss
[class^="o-col-"],
[class*=" o-col-"]{
    padding-left: calc( (var(--grid-gutter) / 2) );
    padding-right: calc( (var(--grid-gutter) / 2) );
}
```

Esto significa:
- Mobile: 10px de padding a cada lado
- Tablet: 10px de padding a cada lado
- Desktop: 28px de padding a cada lado

---

## Mixins y Utilidades SCSS

### Mixin `a-set`

El mixin más importante para hacer componentes responsivos.

```scss
// Ubicación: styles/01-settings/mixins.scss
@mixin a-set($values){
    // Aplica valores según breakpoint automáticamente
}
```

#### Uso en Componentes

```scss
$mi-componente: (
  sm: (
    padding: 10px,
    font-size: 14px,
  ),
  md: (
    padding: 15px,
    font-size: 16px,
  ),
  lg: (
    padding: 20px,
    font-size: 18px,
  )
);

.mi-componente {
  @include a-set($mi-componente);
}
```

Esto genera:

```css
.mi-componente {
  padding: 10px;
  font-size: 14px;
}

@media (min-width: 611px) {
  .mi-componente {
    padding: 15px;
    font-size: 16px;
  }
}

@media (min-width: 1191px) {
  .mi-componente {
    padding: 20px;
    font-size: 18px;
  }
}
```

### Mixins de Media Queries

```scss
// Solo mobile
@include only-sm {
  // Estilos para 0-610px
}

// Tablet en adelante
@include md {
  // Estilos para 611px+
}

// Solo tablet
@include only-md {
  // Estilos para 611px-1190px
}

// Desktop en adelante
@include lg {
  // Estilos para 1191px+
}

// Solo desktop
@include only-lg {
  // Estilos para 1191px+
}
```

### Mixins de Columnas

```scss
// Ancho de columna manual
@mixin a-col($cols: 1){
    width: calc( ( 100% / var(--total-columns) ) * #{$cols} );
}

// Empujar columna (margin-left)
@mixin a-col-push($cols: 1){
    margin-left: calc( (100%) / var(--total-columns) * #{$cols} );
}
```

#### Uso

```scss
.mi-columna {
  @include a-col(6); // 50% del ancho disponible
}

.mi-columna-offset {
  @include a-col-push(2); // Empuja 2 columnas a la derecha
}
```

---

## Ejemplos Prácticos

### Ejemplo 1: Layout de Home Page

```tsx
// app/page.tsx
import { Container, Col } from 'citrica-ui-toolkit';

const PageHome = () => {
  return (
    <Container noPadding>
      <Col cols={{ sm: 12, md: 6, lg: 4 }}>
        <Card>
          <h2>Card 1</h2>
          <p>Contenido de la tarjeta</p>
        </Card>
      </Col>
      <Col cols={{ sm: 12, md: 6, lg: 4 }}>
        <Card>
          <h2>Card 2</h2>
          <p>Contenido de la tarjeta</p>
        </Card>
      </Col>
      <Col cols={{ sm: 12, md: 6, lg: 4 }}>
        <Card>
          <h2>Card 3</h2>
          <p>Contenido de la tarjeta</p>
        </Card>
      </Col>
    </Container>
  );
};
```

**Resultado:**
- **Mobile**: 3 tarjetas apiladas verticalmente (100% cada una)
- **Tablet**: 2 tarjetas por fila (50% cada una), última tarjeta sola
- **Desktop**: 3 tarjetas por fila (33% cada una)

### Ejemplo 2: Layout de Sidebar + Contenido

```tsx
<Container>
  {/* Sidebar */}
  <Col cols={{ sm: 4, md: 2, lg: 3 }}>
    <Sidebar />
  </Col>

  {/* Contenido principal */}
  <Col cols={{ sm: 4, md: 4, lg: 9 }}>
    <MainContent />
  </Col>
</Container>
```

**Resultado:**
- **Mobile**: Sidebar arriba (100%), contenido abajo (100%)
- **Tablet**: Sidebar izquierda (33%), contenido derecha (66%)
- **Desktop**: Sidebar izquierda (25%), contenido derecha (75%)

### Ejemplo 3: Grid de Productos (4 columnas)

```tsx
<Container>
  {productos.map((producto) => (
    <Col key={producto.id} cols={{ sm: 4, md: 3, lg: 3 }}>
      <ProductCard producto={producto} />
    </Col>
  ))}
</Container>
```

**Resultado:**
- **Mobile**: 1 producto por fila (100%)
- **Tablet**: 2 productos por fila (50% cada uno)
- **Desktop**: 4 productos por fila (25% cada uno)

### Ejemplo 4: Hero Section + Dos Columnas

```tsx
<Container>
  {/* Hero full width */}
  <Col cols={{ sm: 4, md: 6, lg: 12 }}>
    <HeroSection />
  </Col>

  {/* Columna izquierda */}
  <Col cols={{ sm: 4, md: 3, lg: 6 }}>
    <Features />
  </Col>

  {/* Columna derecha */}
  <Col cols={{ sm: 4, md: 3, lg: 6 }}>
    <Testimonials />
  </Col>
</Container>
```

### Ejemplo 5: Componente Responsivo con a-set

```scss
// styles/10-tokens/components/my-component.scss
$my-card: (
  sm: (
    padding: 16px,
    font-size: 14px,
    border-radius: 8px,
  ),
  md: (
    padding: 24px,
    font-size: 16px,
    border-radius: 12px,
  ),
  lg: (
    padding: 32px,
    font-size: 18px,
    border-radius: 16px,
  )
);

.my-card {
  @include a-set($my-card);
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

---

## Tabla de Referencia Rápida

### Anchos de Columnas

| Porcentaje | sm (4 cols) | md (6 cols) | lg (12 cols) |
|------------|-------------|-------------|--------------|
| 100% | 4 | 6 | 12 |
| 83% | - | 5 | 10 |
| 75% | 3 | - | 9 |
| 66% | - | 4 | 8 |
| 50% | 2 | 3 | 6 |
| 33% | - | 2 | 4 |
| 25% | 1 | - | 3 |
| 16% | - | 1 | 2 |
| 8% | - | - | 1 |

### Fórmula de Cálculo

```
ancho_porcentual = (columnas_usadas / total_columnas) * 100%
```

Ejemplos:
- `sm: 2` → (2/4) = 50%
- `md: 3` → (3/6) = 50%
- `lg: 6` → (6/12) = 50%

---

## Tips y Mejores Prácticas

1. **Siempre define los 3 breakpoints**: `sm`, `md`, `lg`
2. **Mobile First**: Diseña primero para mobile, luego adapta a pantallas grandes
3. **Mantén proporciones**: Si usas 50% en mobile, considera mantenerlo en tablet/desktop
4. **Usa Container + Col juntos**: No uses Col sin Container
5. **Gutter automático**: No agregues margin/padding extra a Col
6. **Testing**: Prueba en los 3 breakpoints siempre
7. **Consistencia**: Usa el mismo sistema en toda la aplicación

---

## Archivos de Referencia

- **Settings**: `styles/01-settings/settings.scss` (líneas 146-208)
- **Mixins**: `styles/01-settings/mixins.scss`
- **Container**: `styles/07-objects/container/container.scss`
- **Col**: `styles/07-objects/col/col.scss`
- **Ejemplo Home**: `app/page.tsx`
- **Ejemplo Typography**: `app/home/components/section-typography.tsx`

---

## Debugging

### Ver Variables CSS en el Navegador

```js
// En la consola del navegador
getComputedStyle(document.documentElement).getPropertyValue('--total-columns')
getComputedStyle(document.documentElement).getPropertyValue('--grid-gutter')
getComputedStyle(document.documentElement).getPropertyValue('--container-padding')
```

### Verificar Breakpoint Actual

```js
// En la consola
if (window.matchMedia('(max-width: 610px)').matches) console.log('Mobile');
else if (window.matchMedia('(max-width: 1190px)').matches) console.log('Tablet');
else console.log('Desktop');
```
