# Ejemplos de Código Completo - Sistema de Layout

Ejemplos prácticos y listos para usar del sistema de grid responsivo.

## Índice

1. [Páginas Completas](#páginas-completas)
2. [Secciones Comunes](#secciones-comunes)
3. [Componentes SCSS Responsivos](#componentes-scss-responsivos)
4. [Casos Especiales](#casos-especiales)

---

## Páginas Completas

### Ejemplo 1: Landing Page

```tsx
// pages/landing.tsx
import { Button, Card, Container, Col, Text } from 'citrica-ui-toolkit';

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <Container>
        <Col cols={{ sm: 4, md: 6, lg: 12 }}>
          <div className="hero-section">
            <Text variant="display">Bienvenido a Nuestro Producto</Text>
            <Text variant="body">
              La mejor solución para tu negocio
            </Text>
            <Button variant="primary">Empezar Ahora</Button>
          </div>
        </Col>
      </Container>

      {/* Features Section - 3 columnas */}
      <Container>
        <Col cols={{ sm: 4, md: 6, lg: 12 }}>
          <Text variant="headline">Características</Text>
        </Col>

        <Col cols={{ sm: 4, md: 2, lg: 4 }}>
          <Card>
            <Icon name="Zap" />
            <Text variant="title">Rápido</Text>
            <Text variant="body">
              Velocidad increíble en cada operación
            </Text>
          </Card>
        </Col>

        <Col cols={{ sm: 4, md: 2, lg: 4 }}>
          <Card>
            <Icon name="Shield" />
            <Text variant="title">Seguro</Text>
            <Text variant="body">
              Protección de datos de nivel empresarial
            </Text>
          </Card>
        </Col>

        <Col cols={{ sm: 4, md: 2, lg: 4 }}>
          <Card>
            <Icon name="Heart" />
            <Text variant="title">Fácil de Usar</Text>
            <Text variant="body">
              Interfaz intuitiva y amigable
            </Text>
          </Card>
        </Col>
      </Container>

      {/* Testimonials Section - 2 columnas */}
      <Container>
        <Col cols={{ sm: 4, md: 6, lg: 12 }}>
          <Text variant="headline">Lo que dicen nuestros clientes</Text>
        </Col>

        <Col cols={{ sm: 4, md: 3, lg: 6 }}>
          <Card>
            <Text variant="body">
              "Excelente producto, cambió completamente nuestro flujo de trabajo"
            </Text>
            <Text variant="label">- María García, CEO</Text>
          </Card>
        </Col>

        <Col cols={{ sm: 4, md: 3, lg: 6 }}>
          <Card>
            <Text variant="body">
              "La mejor inversión que hemos hecho este año"
            </Text>
            <Text variant="label">- Juan Pérez, CTO</Text>
          </Card>
        </Col>
      </Container>

      {/* CTA Section */}
      <Container>
        <Col cols={{ sm: 4, md: 6, lg: 12 }}>
          <div className="cta-section">
            <Text variant="headline">¿Listo para empezar?</Text>
            <Button variant="primary" size="large">
              Crear Cuenta Gratis
            </Button>
          </div>
        </Col>
      </Container>
    </>
  );
};

export default LandingPage;
```

---

### Ejemplo 2: Dashboard Admin

```tsx
// app/admin/dashboard/page.tsx
import { Card, Container, Col, Text, Button } from 'citrica-ui-toolkit';

const AdminDashboard = () => {
  return (
    <Container>
      {/* Header con título y acciones */}
      <Col cols={{ sm: 4, md: 4, lg: 8 }}>
        <Text variant="display">Dashboard</Text>
      </Col>
      <Col cols={{ sm: 4, md: 2, lg: 4 }}>
        <div className="actions">
          <Button variant="primary">Nueva Reserva</Button>
        </div>
      </Col>

      {/* Stats Cards - 4 métricas */}
      <Col cols={{ sm: 4, md: 3, lg: 3 }}>
        <Card className="stat-card">
          <Text variant="label">Total Ventas</Text>
          <Text variant="display">$12,345</Text>
          <Text variant="body" color="success">+12% vs mes anterior</Text>
        </Card>
      </Col>

      <Col cols={{ sm: 4, md: 3, lg: 3 }}>
        <Card className="stat-card">
          <Text variant="label">Clientes Nuevos</Text>
          <Text variant="display">142</Text>
          <Text variant="body" color="success">+8% vs mes anterior</Text>
        </Card>
      </Col>

      <Col cols={{ sm: 4, md: 3, lg: 3 }}>
        <Card className="stat-card">
          <Text variant="label">Reservas Hoy</Text>
          <Text variant="display">23</Text>
          <Text variant="body" color="warning">-3% vs ayer</Text>
        </Card>
      </Col>

      <Col cols={{ sm: 4, md: 3, lg: 3 }}>
        <Card className="stat-card">
          <Text variant="label">Satisfacción</Text>
          <Text variant="display">4.8/5</Text>
          <Text variant="body" color="success">+0.2 vs mes anterior</Text>
        </Card>
      </Col>

      {/* Gráficos - 2 columnas */}
      <Col cols={{ sm: 4, md: 3, lg: 8 }}>
        <Card>
          <Text variant="title">Ventas del Mes</Text>
          <ChartComponent />
        </Card>
      </Col>

      <Col cols={{ sm: 4, md: 3, lg: 4 }}>
        <Card>
          <Text variant="title">Actividad Reciente</Text>
          <ActivityList />
        </Card>
      </Col>

      {/* Tabla de Reservas - Full width */}
      <Col cols={{ sm: 4, md: 6, lg: 12 }}>
        <Card>
          <Text variant="title">Próximas Reservas</Text>
          <ReservationsTable />
        </Card>
      </Col>
    </Container>
  );
};

export default AdminDashboard;
```

---

### Ejemplo 3: Página de Productos (E-commerce)

```tsx
// app/productos/page.tsx
import { Card, Container, Col, Text, Button } from 'citrica-ui-toolkit';

const ProductosPage = () => {
  const productos = [
    { id: 1, nombre: 'Producto 1', precio: '$99' },
    { id: 2, nombre: 'Producto 2', precio: '$149' },
    { id: 3, nombre: 'Producto 3', precio: '$199' },
    { id: 4, nombre: 'Producto 4', precio: '$249' },
    { id: 5, nombre: 'Producto 5', precio: '$299' },
    { id: 6, nombre: 'Producto 6', precio: '$349' },
  ];

  return (
    <Container>
      {/* Header */}
      <Col cols={{ sm: 4, md: 6, lg: 12 }}>
        <Text variant="display">Nuestros Productos</Text>
      </Col>

      {/* Filtros Sidebar */}
      <Col cols={{ sm: 4, md: 2, lg: 3 }}>
        <Card>
          <Text variant="title">Filtros</Text>
          <div className="filters">
            <Text variant="subtitle">Categoría</Text>
            <Checkbox label="Categoría A" />
            <Checkbox label="Categoría B" />

            <Text variant="subtitle">Precio</Text>
            <Checkbox label="$0 - $100" />
            <Checkbox label="$100 - $200" />
            <Checkbox label="$200+" />
          </div>
        </Card>
      </Col>

      {/* Grid de Productos */}
      <Col cols={{ sm: 4, md: 4, lg: 9 }}>
        <Container noPadding>
          {productos.map((producto) => (
            <Col key={producto.id} cols={{ sm: 4, md: 3, lg: 4 }}>
              <Card>
                <div className="producto-image">
                  <img src="/placeholder.jpg" alt={producto.nombre} />
                </div>
                <Text variant="title">{producto.nombre}</Text>
                <Text variant="headline">{producto.precio}</Text>
                <Button variant="primary" fullWidth>
                  Ver detalle
                </Button>
              </Card>
            </Col>
          ))}
        </Container>
      </Col>
    </Container>
  );
};

export default ProductosPage;
```

---

## Secciones Comunes

### Sección de Hero con Imagen

```tsx
const HeroSection = () => (
  <Container>
    <Col cols={{ sm: 4, md: 3, lg: 6 }}>
      <div className="hero-content">
        <Text variant="display">Transforma tu Negocio</Text>
        <Text variant="body">
          La solución completa que estabas buscando
        </Text>
        <div className="hero-actions">
          <Button variant="primary">Comenzar</Button>
          <Button variant="secondary">Ver Demo</Button>
        </div>
      </div>
    </Col>
    <Col cols={{ sm: 4, md: 3, lg: 6 }}>
      <div className="hero-image">
        <img src="/hero-image.jpg" alt="Hero" />
      </div>
    </Col>
  </Container>
);
```

### Grid de Features con Iconos

```tsx
const FeaturesGrid = () => {
  const features = [
    { icon: 'Zap', title: 'Rápido', desc: 'Velocidad increíble' },
    { icon: 'Shield', title: 'Seguro', desc: 'Máxima protección' },
    { icon: 'Heart', title: 'Confiable', desc: 'Siempre disponible' },
    { icon: 'Star', title: 'Calidad', desc: 'Lo mejor del mercado' },
  ];

  return (
    <Container>
      {features.map((feature) => (
        <Col key={feature.title} cols={{ sm: 4, md: 3, lg: 3 }}>
          <Card className="feature-card">
            <Icon name={feature.icon} size={48} />
            <Text variant="title">{feature.title}</Text>
            <Text variant="body">{feature.desc}</Text>
          </Card>
        </Col>
      ))}
    </Container>
  );
};
```

### Formulario de Contacto

```tsx
const ContactForm = () => (
  <Container>
    <Col cols={{ sm: 4, md: 2, lg: 4 }}>
      <div className="contact-info">
        <Text variant="headline">Contáctanos</Text>
        <Text variant="body">
          Estamos aquí para ayudarte
        </Text>
        <div className="contact-details">
          <Text variant="body">📧 info@empresa.com</Text>
          <Text variant="body">📱 +51 999 999 999</Text>
          <Text variant="body">📍 Lima, Perú</Text>
        </div>
      </div>
    </Col>

    <Col cols={{ sm: 4, md: 4, lg: 8 }}>
      <Card>
        <form className="contact-form">
          <Input
            label="Nombre completo"
            placeholder="Tu nombre"
            variant="primary"
            className="input-citrica-ui"
          />

          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            variant="primary"
            className="input-citrica-ui"
          />

          <Textarea
            label="Mensaje"
            placeholder="¿En qué podemos ayudarte?"
            variant="primary"
            className="textarea-citrica-ui"
          />

          <Button variant="primary" type="submit">
            Enviar Mensaje
          </Button>
        </form>
      </Card>
    </Col>
  </Container>
);
```

### Blog Post Layout

```tsx
const BlogPost = () => (
  <Container>
    {/* Contenido principal */}
    <Col cols={{ sm: 4, md: 4, lg: 8 }}>
      <article>
        <Text variant="display">Título del Artículo</Text>
        <Text variant="label">Por Juan Pérez • 14 Ene 2024</Text>

        <img src="/post-image.jpg" alt="Post" className="featured-image" />

        <Text variant="body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </Text>

        <Text variant="title">Subtítulo</Text>
        <Text variant="body">
          Más contenido del artículo...
        </Text>
      </article>
    </Col>

    {/* Sidebar */}
    <Col cols={{ sm: 4, md: 2, lg: 4 }}>
      <Card>
        <Text variant="title">Sobre el Autor</Text>
        <div className="author-info">
          <img src="/author.jpg" alt="Autor" />
          <Text variant="body">Juan Pérez</Text>
        </div>
      </Card>

      <Card>
        <Text variant="title">Artículos Relacionados</Text>
        <RelatedPosts />
      </Card>
    </Col>
  </Container>
);
```

---

## Componentes SCSS Responsivos

### Card Responsiva

```scss
// components/card.scss
$card-responsive: (
  sm: (
    padding: 16px,
    border-radius: 8px,
    margin-bottom: 16px,
  ),
  md: (
    padding: 20px,
    border-radius: 12px,
    margin-bottom: 20px,
  ),
  lg: (
    padding: 24px,
    border-radius: 16px,
    margin-bottom: 24px,
  )
);

.card {
  @include a-set($card-responsive);
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &__title {
    margin-bottom: 12px;

    @include md {
      margin-bottom: 16px;
    }

    @include lg {
      margin-bottom: 20px;
    }
  }
}
```

### Button Responsivo

```scss
// components/button.scss
$button-responsive: (
  sm: (
    padding: 12px 24px,
    font-size: 14px,
    min-height: 44px,
  ),
  md: (
    padding: 14px 28px,
    font-size: 16px,
    min-height: 48px,
  ),
  lg: (
    padding: 16px 32px,
    font-size: 18px,
    min-height: 52px,
  )
);

.btn-custom {
  @include a-set($button-responsive);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}
```

### Hero Section Responsiva

```scss
// sections/hero.scss
$hero-section: (
  sm: (
    padding-top: 40px,
    padding-bottom: 40px,
    min-height: 400px,
  ),
  md: (
    padding-top: 60px,
    padding-bottom: 60px,
    min-height: 500px,
  ),
  lg: (
    padding-top: 80px,
    padding-bottom: 80px,
    min-height: 600px,
  )
);

.hero-section {
  @include a-set($hero-section);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  &__title {
    @include only-sm {
      font-size: 32px;
    }

    @include md {
      font-size: 48px;
    }

    @include lg {
      font-size: 64px;
    }
  }
}
```

---

## Casos Especiales

### Layout con Orden Diferente en Mobile

```tsx
// Desktop: Imagen | Texto
// Mobile: Texto | Imagen (invertido)

<Container>
  {/* En mobile aparece primero */}
  <Col cols={{ sm: 4, md: 3, lg: 6 }} className="order-first md:order-last">
    <div className="content">
      <Text variant="headline">Título</Text>
      <Text variant="body">Descripción...</Text>
    </div>
  </Col>

  {/* En mobile aparece segundo */}
  <Col cols={{ sm: 4, md: 3, lg: 6 }} className="order-last md:order-first">
    <img src="/image.jpg" alt="Imagen" />
  </Col>
</Container>
```

### Layout con Espaciado Variable

```tsx
<Container>
  <Col cols={{ sm: 4, md: 6, lg: 12 }}>
    <div className="section-with-spacing">
      <Text variant="headline">Sección con Espaciado</Text>
    </div>
  </Col>
</Container>

<style jsx>{`
  .section-with-spacing {
    /* Mobile */
    padding: 20px 0;
  }

  @media (min-width: 611px) {
    .section-with-spacing {
      /* Tablet */
      padding: 40px 0;
    }
  }

  @media (min-width: 1191px) {
    .section-with-spacing {
      /* Desktop */
      padding: 60px 0;
    }
  }
`}</style>
```

### Grid Asimétrico

```tsx
// 70% / 30% en desktop
// 60% / 40% en tablet
// 100% / 100% en mobile

<Container>
  <Col cols={{ sm: 4, md: 4, lg: 8 }}>
    <Card>Contenido Principal (70%)</Card>
  </Col>

  <Col cols={{ sm: 4, md: 2, lg: 4 }}>
    <Card>Sidebar (30%)</Card>
  </Col>
</Container>
```

### Container Anidado

```tsx
<Container>
  <Col cols={{ sm: 4, md: 6, lg: 12 }}>
    <div className="inner-section">
      {/* Container anidado */}
      <Container noPadding>
        <Col cols={{ sm: 4, md: 3, lg: 6 }}>
          <Card>Nested 1</Card>
        </Col>
        <Col cols={{ sm: 4, md: 3, lg: 6 }}>
          <Card>Nested 2</Card>
        </Col>
      </Container>
    </div>
  </Col>
</Container>
```

### Sticky Sidebar

```tsx
<Container>
  <Col cols={{ sm: 4, md: 4, lg: 8 }}>
    <article className="main-content">
      {/* Contenido largo que hace scroll */}
      <Text>Contenido muy largo...</Text>
    </article>
  </Col>

  <Col cols={{ sm: 4, md: 2, lg: 4 }}>
    <aside className="sticky-sidebar">
      <Card>
        <Text variant="title">Menú Fijo</Text>
        {/* Este sidebar se queda fijo al hacer scroll */}
      </Card>
    </aside>
  </Col>
</Container>

<style jsx>{`
  .sticky-sidebar {
    position: sticky;
    top: 20px;
  }

  @media (max-width: 610px) {
    .sticky-sidebar {
      /* Desactivar sticky en mobile */
      position: static;
    }
  }
`}</style>
```

---

## Tips Finales

### 1. Testing Responsivo

```tsx
// Component para debugging
const DebugBreakpoint = () => (
  <div className="debug-breakpoint">
    <span className="sm-only">📱 Mobile</span>
    <span className="md-only">📱 Tablet</span>
    <span className="lg-only">💻 Desktop</span>
  </div>
);

<style jsx>{`
  .debug-breakpoint {
    position: fixed;
    top: 10px;
    right: 10px;
    background: red;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    z-index: 9999;
  }

  .sm-only { display: block; }
  .md-only, .lg-only { display: none; }

  @media (min-width: 611px) {
    .sm-only, .lg-only { display: none; }
    .md-only { display: block; }
  }

  @media (min-width: 1191px) {
    .sm-only, .md-only { display: none; }
    .lg-only { display: block; }
  }
`}</style>
```

### 2. Performance

```tsx
// ✅ Bueno: Cargar imágenes responsivas
<picture>
  <source media="(min-width: 1191px)" srcset="/image-lg.jpg" />
  <source media="(min-width: 611px)" srcset="/image-md.jpg" />
  <img src="/image-sm.jpg" alt="Responsive" />
</picture>

// ✅ Bueno: Lazy loading en grids grandes
<Col cols={{ sm: 4, md: 3, lg: 3 }}>
  <img src="/product.jpg" loading="lazy" alt="Producto" />
</Col>
```

### 3. Accesibilidad

```tsx
// Siempre mantener orden lógico del DOM
// El orden visual (CSS) puede cambiar, pero el DOM debe ser lógico
<Container>
  {/* Orden lógico: 1, 2, 3 */}
  <Col cols={{ sm: 4, md: 3, lg: 4 }}>Primero</Col>
  <Col cols={{ sm: 4, md: 3, lg: 4 }}>Segundo</Col>
  <Col cols={{ sm: 4, md: 3, lg: 4 }}>Tercero</Col>
</Container>
```
