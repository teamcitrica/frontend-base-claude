# Esqueletos de landing

Cuatro esqueletos base. Una tarjeta de dirección elige uno y lo adapta: puede quitar,
reordenar o fusionar secciones, pero nombra el esqueleto del que parte.

Cada sección sigue la forma de [conventions.md](../../../../docs/00-harness/conventions.md):
`Section` → `Container`/`Col` → `Stack`/`Cluster`, o `Section` → `Grid`+`Cell` cuando hay
asimetría, sangrado o superposición. Cada sección es un archivo en
`app/home/components/<seccion>.tsx` y tiene `id` para el ancla del nav.

Ritmo: alterna `rhythm` y `tone` para que dos secciones seguidas no se lean iguales.
Toda la referencia viva de las primitivas: `/dev/layout`.

## A — Conversión directa

Para: servicio con una acción clara (agendar, cotizar, registrarse). Visitante con
intención. Gana el que llega antes al CTA con la prueba suficiente.

| # | Sección | Primitiva principal | Section |
|---|---|---|---|
| 1 | Hero | `Grid`: `Cell breakout="full"` con imagen + `Cell span={{ lg: 7 }} align="end"` con texto, misma `row` (superpuestos) | `rhythm="none" tone="inverse"` |
| 2 | Prueba social | `Cluster` de logos o cifras | `tight` |
| 3 | Problema | `Container` + 2 `Col` (lista `Stack` / `Media 4/3`) | `default tone="surface"` |
| 4 | Beneficios | `AutoGrid minItemWidth={240}` de `Card` | `default` |
| 5 | Proceso | `AutoGrid as="ol"` con índice numerado | `airy` |
| 6 | Testimonios / resultados | `Container` + `Col` + `Media 16/10` | `default tone="surface"` |
| 7 | Garantía / objeciones | `Stack` en `Col lg 8 push 2` | `airy` |
| 8 | CTA final / formulario | `Container` + `AutoGrid minItemWidth={220}` con `Input`/`Select`/`Button` | `airy tone="inverse"` |

navLinks: Problema · Beneficios · Proceso · Resultados · CTA (botón del `Header`).

## B — Editorial / narrativa

Para: marca con historia, producto de autor, lujo, hospitalidad. Visitante que explora.
Gana la atmósfera y el ritmo de lectura.

| # | Sección | Primitiva principal | Section |
|---|---|---|---|
| 1 | Hero | `Grid`: `Cell span={{ lg: 5 }}` con `Media 4/3` + `Cell start={{ lg: 7 }} span={{ lg: 6 }} align="center"` con texto | `rhythm="airy"` |
| 2 | Manifiesto | `Stack` en `Col lg 8 push 2`, una sola idea, mucho aire | `airy` |
| 3 | Colección / casos | `Grid` asimétrico: celdas `span 7` y `span 5` alternando, `breakout="wide-end"` en la destacada | `default` |
| 4 | Detalle / oficio | `Media 16/10` a sangre (`Cell breakout="full"`) + pie en `Col` | `none` |
| 5 | Personas / equipo | `AutoGrid minItemWidth={220}` | `default tone="surface"` |
| 6 | Contacto / visita | `Container` + 2 `Col`: datos `Stack` / formulario | `airy` |

navLinks: Historia · Colección · Oficio · Contacto.

## C — Producto / SaaS

Para: software, herramienta, plataforma. Visitante que compara. Gana quien enseña el
producto rápido y responde objeciones.

| # | Sección | Primitiva principal | Section |
|---|---|---|---|
| 1 | Hero | `Container` + `Col lg 6` texto / `Col lg 6` `Media 16/10` con captura del producto | `airy` |
| 2 | Logos de clientes | `Cluster justify="between"` | `tight tone="surface"` |
| 3 | Features (bento) | `Grid`: `Cell span={{ lg: 8 }}` + `Cell span={{ lg: 4 }}`, luego 3× `span 4` | `default` |
| 4 | Cómo funciona | `AutoGrid as="ol" minItemWidth={240}` | `default tone="surface"` |
| 5 | Precios | `AutoGrid minItemWidth={240}` de `Card` (máx. 3 planes) | `airy` |
| 6 | FAQ | `Accordion` del toolkit en `Col lg 8 push 2` | `default` |
| 7 | CTA final | `Stack` centrado en `Col lg 6 push 3` | `airy tone="inverse"` |

navLinks: Producto · Cómo funciona · Precios · FAQ.

## D — Servicio local / agenda

Para: negocio físico (restaurante, clínica, estudio). Visitante cercano que decide hoy.
Gana el que muestra el lugar y deja reservar en dos toques.

| # | Sección | Primitiva principal | Section |
|---|---|---|---|
| 1 | Hero | `Grid`: imagen `Cell breakout="full"` + formulario corto en `Cell span={{ lg: 4 }} start={{ lg: 9 }}`, misma `row` | `rhythm="none" tone="inverse"` |
| 2 | Servicios / carta | `AutoGrid minItemWidth={240}` de `Card` con `Media 4/3` | `default` |
| 3 | El lugar | `Carousel` del toolkit o `Grid` de 3 `Media` | `none` |
| 4 | Testimonios | `Carousel` o `AutoGrid` | `default tone="surface"` |
| 5 | Horario y ubicación | `Container` + 2 `Col`: `Stack` de datos / mapa en `Media 4/3` | `default` |
| 6 | Reserva | formulario `AutoGrid minItemWidth={220}` | `airy tone="inverse"` |

navLinks: Servicios · El lugar · Opiniones · Ubicación · Reservar (botón).

## Reglas comunes

- El CTA primario está dentro del primer viewport en `sm`, `md` y `lg` (`npm run shot --cta`).
- Un `Header` del toolkit con `logo` siempre; el `SiteFooter` es una sección más.
- Nada de `<div>` para layout; un `<div>` solo para un gesto con clase `.home__*`.
- Imágenes con `next/image` dentro de `Media`. Si no hay foto real, placeholder marcado
  como sintético y anotado en la spec como pendiente.
