# Guía Visual del Sistema de Layout

Una guía visual complementaria para entender rápidamente el sistema de grid responsivo.

## Estructura Visual del Container

```
┌─────────────────────────────────────────────────────────────┐
│                     VIEWPORT (100%)                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              CONTAINER (max 1366px)                   │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │    CONTENT AREA (con padding lateral)           │ │  │
│  │  │                                                  │ │  │
│  │  │    ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐            │ │  │
│  │  │    │ Col │ │ Col │ │ Col │ │ Col │  (Columnas)│ │  │
│  │  │    └─────┘ └─────┘ └─────┘ └─────┘            │ │  │
│  │  │       ↑       ↑       ↑                         │ │  │
│  │  │     gutter  gutter  gutter                      │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  │       ↑                                       ↑       │  │
│  │    padding                                  padding   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Sistema de Grid por Breakpoint

### Mobile (sm) - 0px a 610px

```
┌──────────────────────────────┐
│        Container             │
│  ┌────────────────────────┐  │
│  │ Col 1/4 = 25%          │  │
│  ├────────────────────────┤  │
│  │ Col 2/4 = 50%          │  │
│  ├────────────────────────┤  │
│  │ Col 3/4 = 75%          │  │
│  ├────────────────────────┤  │
│  │ Col 4/4 = 100%         │  │
│  └────────────────────────┘  │
└──────────────────────────────┘

Total Columnas: 4
Gutter: 20px
Padding: 24px
```

### Tablet (md) - 611px a 1190px

```
┌──────────────────────────────────────────────┐
│               Container                      │
│  ┌────────────────────────────────────────┐  │
│  │ 1/6 │ 2/6 │ 3/6 │ 4/6 │ 5/6 │ 6/6   │  │
│  ├─────┼─────┼─────┼─────┼─────┼───────┤  │
│  │16.6%│33.3%│ 50% │66.6%│83.3%│ 100%  │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘

Total Columnas: 6
Gutter: 20px
Padding: 56px
```

### Desktop (lg) - 1191px+

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Container (max 1366px)                         │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ 1│ 2│ 3│ 4│ 5│ 6│ 7│ 8│ 9│10│11│12                                   │  │
│  ├──┼──┼──┼──┼──┼──┼──┼──┼──┼──┼──┼───                                   │  │
│  │8%│16│25│33│41│50│58│66│75│83│91│100%                                 │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘

Total Columnas: 12
Gutter: 56px
Padding: 112px
```

## Ejemplos Visuales de Layouts Comunes

### Layout 1: 3 Tarjetas Responsivas

**Código:**
```tsx
<Container>
  <Col cols={{ sm: 4, md: 3, lg: 4 }}>Card 1</Col>
  <Col cols={{ sm: 4, md: 3, lg: 4 }}>Card 2</Col>
  <Col cols={{ sm: 4, md: 3, lg: 4 }}>Card 3</Col>
</Container>
```

**Mobile (sm):**
```
┌──────────────────┐
│  Card 1 (100%)   │
├──────────────────┤
│  Card 2 (100%)   │
├──────────────────┤
│  Card 3 (100%)   │
└──────────────────┘
```

**Tablet (md):**
```
┌──────────────┬──────────────┐
│  Card 1 50%  │  Card 2 50%  │
├──────────────┴──────────────┤
│      Card 3 (100%)          │
└─────────────────────────────┘
```

**Desktop (lg):**
```
┌──────────┬──────────┬──────────┐
│ Card 1   │ Card 2   │ Card 3   │
│  33%     │  33%     │  33%     │
└──────────┴──────────┴──────────┘
```

---

### Layout 2: Sidebar + Contenido

**Código:**
```tsx
<Container>
  <Col cols={{ sm: 4, md: 2, lg: 3 }}>Sidebar</Col>
  <Col cols={{ sm: 4, md: 4, lg: 9 }}>Content</Col>
</Container>
```

**Mobile (sm):**
```
┌─────────────────────┐
│   Sidebar (100%)    │
├─────────────────────┤
│   Content (100%)    │
└─────────────────────┘
```

**Tablet (md):**
```
┌────────┬────────────────────┐
│Sidebar │     Content        │
│  33%   │       66%          │
│        │                    │
└────────┴────────────────────┘
```

**Desktop (lg):**
```
┌──────┬─────────────────────────────┐
│Side  │         Content             │
│bar   │                             │
│ 25%  │            75%              │
│      │                             │
└──────┴─────────────────────────────┘
```

---

### Layout 3: Grid de Productos (4 cols desktop)

**Código:**
```tsx
<Container>
  <Col cols={{ sm: 4, md: 3, lg: 3 }}>Producto 1</Col>
  <Col cols={{ sm: 4, md: 3, lg: 3 }}>Producto 2</Col>
  <Col cols={{ sm: 4, md: 3, lg: 3 }}>Producto 3</Col>
  <Col cols={{ sm: 4, md: 3, lg: 3 }}>Producto 4</Col>
</Container>
```

**Mobile (sm):**
```
┌──────────────┐
│ Producto 1   │
├──────────────┤
│ Producto 2   │
├──────────────┤
│ Producto 3   │
├──────────────┤
│ Producto 4   │
└──────────────┘
```

**Tablet (md):**
```
┌────────────┬────────────┐
│ Producto 1 │ Producto 2 │
│    50%     │    50%     │
├────────────┼────────────┤
│ Producto 3 │ Producto 4 │
│    50%     │    50%     │
└────────────┴────────────┘
```

**Desktop (lg):**
```
┌──────┬──────┬──────┬──────┐
│Prod 1│Prod 2│Prod 3│Prod 4│
│ 25%  │ 25%  │ 25%  │ 25%  │
└──────┴──────┴──────┴──────┘
```

---

### Layout 4: Hero + 2 Columnas

**Código:**
```tsx
<Container>
  <Col cols={{ sm: 4, md: 6, lg: 12 }}>Hero</Col>
  <Col cols={{ sm: 4, md: 3, lg: 6 }}>Left</Col>
  <Col cols={{ sm: 4, md: 3, lg: 6 }}>Right</Col>
</Container>
```

**Mobile (sm):**
```
┌──────────────────┐
│   Hero (100%)    │
├──────────────────┤
│   Left (100%)    │
├──────────────────┤
│   Right (100%)   │
└──────────────────┘
```

**Tablet (md):**
```
┌────────────────────────────┐
│       Hero (100%)          │
├──────────────┬─────────────┤
│   Left 50%   │  Right 50%  │
└──────────────┴─────────────┘
```

**Desktop (lg):**
```
┌─────────────────────────────────┐
│         Hero (100%)             │
├────────────────┬────────────────┤
│   Left 50%     │   Right 50%    │
└────────────────┴────────────────┘
```

---

## Visualización de Gutter

El gutter es el espacio entre columnas. Se aplica automáticamente:

```
┌─────────────────────────────────────────┐
│              Container                  │
│  ┌───────┐ ┌───────┐ ┌───────┐        │
│  │  Col  │ │  Col  │ │  Col  │        │
│  │       │ │       │ │       │        │
│  └───┬───┘ └───┬───┘ └───┬───┘        │
│      │    20px │    20px │             │
│      └─────────┴─────────┘             │
│         (gutter)                        │
└─────────────────────────────────────────┘

Mobile/Tablet: 20px entre columnas
Desktop: 56px entre columnas
```

### Cómo funciona el Gutter

Cada columna tiene:
```css
padding-left: 10px;  /* gutter/2 */
padding-right: 10px; /* gutter/2 */
```

Cuando dos columnas están juntas:
```
Col1 (padding-right: 10px) + Col2 (padding-left: 10px) = 20px de espacio
```

---

## Cálculo de Anchos

### Fórmula Base

```
ancho_columna = (columnas_usadas / total_columnas) × 100%
```

### Tabla de Conversión Rápida

| sm (4) | md (6) | lg (12) | % Aprox |
|--------|--------|---------|---------|
| 1      | 1      | 1       | 25% / 16% / 8% |
| 2      | 2      | 2       | 50% / 33% / 16% |
| 2      | 3      | 6       | 50% / 50% / 50% |
| 3      | 4      | 8       | 75% / 66% / 66% |
| 4      | 6      | 12      | 100% / 100% / 100% |

### Ejemplos de Cálculo

**Ejemplo 1: Mitad de pantalla en todos los tamaños**
```tsx
cols={{ sm: 2, md: 3, lg: 6 }}
```
- Mobile: 2/4 = 50%
- Tablet: 3/6 = 50%
- Desktop: 6/12 = 50%

**Ejemplo 2: Tercio de pantalla**
```tsx
cols={{ sm: 4, md: 2, lg: 4 }}
```
- Mobile: 4/4 = 100% (apilado)
- Tablet: 2/6 = 33%
- Desktop: 4/12 = 33%

**Ejemplo 3: Layout asimétrico**
```tsx
// Columna izquierda
cols={{ sm: 4, md: 2, lg: 4 }}  // 100%, 33%, 33%

// Columna derecha
cols={{ sm: 4, md: 4, lg: 8 }}  // 100%, 66%, 66%
```

---

## Flujo de Trabajo Visual

### Paso 1: Define tu layout en Desktop (12 columnas)

```
┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐
│ 1│ 2│ 3│ 4│ 5│ 6│ 7│ 8│ 9│10│11│12│
└──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘

Ejemplo: 3 columnas de 4
┌────────┬────────┬────────┐
│   4    │   4    │   4    │
└────────┴────────┴────────┘
```

### Paso 2: Adapta a Tablet (6 columnas)

```
┌────┬────┬────┬────┬────┬────┐
│ 1  │ 2  │ 3  │ 4  │ 5  │ 6  │
└────┴────┴────┴────┴────┴────┘

Mismas 3 columnas → 2 por fila
┌──────────┬──────────┐
│    3     │    3     │
├──────────┴──────────┤
│         6           │
└─────────────────────┘
```

### Paso 3: Adapta a Mobile (4 columnas)

```
┌───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │
└───┴───┴───┴───┘

Mismas 3 columnas → Apiladas
┌─────────────┐
│      4      │
├─────────────┤
│      4      │
├─────────────┤
│      4      │
└─────────────┘
```

### Resultado Final

```tsx
<Col cols={{ sm: 4, md: 3, lg: 4 }}>
  {/* Mobile: 100%, Tablet: 50%, Desktop: 33% */}
</Col>
```

---

## Casos de Uso Comunes

### ✅ Layout de Blog

```tsx
// Artículo principal + Sidebar
<Container>
  <Col cols={{ sm: 4, md: 4, lg: 8 }}>
    <Article /> {/* 100%, 66%, 66% */}
  </Col>
  <Col cols={{ sm: 4, md: 2, lg: 4 }}>
    <Sidebar /> {/* 100%, 33%, 33% */}
  </Col>
</Container>
```

### ✅ Galería de Imágenes

```tsx
// 2 cols en mobile, 3 en tablet, 4 en desktop
<Container>
  {images.map(img => (
    <Col cols={{ sm: 2, md: 2, lg: 3 }}>
      <Image /> {/* 50%, 33%, 25% */}
    </Col>
  ))}
</Container>
```

### ✅ Dashboard con Widgets

```tsx
<Container>
  {/* Row 1: Full width header */}
  <Col cols={{ sm: 4, md: 6, lg: 12 }}>
    <DashboardHeader />
  </Col>

  {/* Row 2: 3 widgets */}
  <Col cols={{ sm: 4, md: 2, lg: 4 }}>
    <Widget1 />
  </Col>
  <Col cols={{ sm: 4, md: 2, lg: 4 }}>
    <Widget2 />
  </Col>
  <Col cols={{ sm: 4, md: 2, lg: 4 }}>
    <Widget3 />
  </Col>
</Container>
```

---

## Cheat Sheet

### Conversión Rápida de Porcentajes

| Quiero | sm | md | lg | Descripción |
|--------|----|----|----|----|
| 100% siempre | 4 | 6 | 12 | Ancho completo |
| 50% siempre | 2 | 3 | 6 | Mitad |
| 33% siempre | - | 2 | 4 | Tercio |
| 25% siempre | 1 | - | 3 | Cuarto |
| Mobile 100%, resto 50% | 4 | 3 | 6 | Apilado en mobile |
| Mobile 100%, resto 33% | 4 | 2 | 4 | Apilado en mobile |
| Mobile 50%, resto 25% | 2 | - | 3 | Grid compacto |

---

## Debugging Visual

### Agregar Bordes Temporales

```css
/* En tu CSS temporal para debugging */
.o-container {
  border: 2px solid red !important;
}

[class^="o-col-"],
[class*=" o-col-"] {
  border: 1px solid blue !important;
  background: rgba(0, 0, 255, 0.1) !important;
}
```

### Ver Breakpoints en Pantalla

```css
/* Agregar en tu CSS */
body::before {
  content: 'Mobile';
  position: fixed;
  top: 0;
  left: 0;
  padding: 5px 10px;
  background: red;
  color: white;
  z-index: 9999;
}

@media (min-width: 611px) {
  body::before {
    content: 'Tablet';
    background: orange;
  }
}

@media (min-width: 1191px) {
  body::before {
    content: 'Desktop';
    background: green;
  }
}
```
