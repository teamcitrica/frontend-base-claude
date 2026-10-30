---
name: Resto App — Sistema todo-en-uno para restaurantes
description: Crema, azul y coral; Oleo Script en titulares sobre Lora; la página se lee como una cuenta que cuadra — líneas punteadas, cifras alineadas y un total.
fonts:
  display: "Oleo Script"
  body: "Lora"
colors:
  # Marca (fijados por el cliente, 2026-10-28)
  crema-ticket: "#F5F5EA"        # surface — fondo de todas las secciones claras
  azul-resto: "#083D77"          # on-surface / secondary — texto y estructura (9.84:1 sobre crema)
  coral-accion: "#F95738"        # primary — solo CTAs y estados clave
  azul-profundo: "#04223F"       # texto y borde del CTA coral (4.94:1 sobre coral; borde 14.65:1 sobre crema)
  coral-hover: "#FA6A4E"         # hover del CTA (texto azul profundo 5.54:1)
  coral-texto: "#B23A1F"         # coral para texto pequeño sobre crema (5.44:1)
  coral-suave: "#FEE3DC"         # primary-container — fondo de estado clave
  # Derivados (supuestos de la receta, no del cliente)
  arena-ticket: "#E9DFC4"        # tertiary — papel de ticket, bandas de total
  azul-gris: "#4F6D8A"           # cuaternary — lado "comisión" de la cuenta
  gris-pizarra: "#5F6B77"        # quinary — texto terciario sobre claro
  azul-secundario-texto: "#3E5E80"  # on-surface-var — texto secundario (6.14:1)
  linea-punteada: "#6F849A"      # outline — bordes de UI y líneas del ticket (3.51:1)
  divisor: "#D5D9D2"             # outline-variant — divisores decorativos
  papel-claro: "#FBFBF5"         # surface-bright / container-lowest
  # Semánticos (estándar, sin teñir)
  success: "#2E9E5B"
  warning: "#D9BF28"
  error: "#C63A2B"
# Valores reales del render (ADR-0006). Los tokens viven en styles/10-tokens/web/foundations/
rounded:
  card: "16px"      # --radius-md (cards, media, superficies)
  control: "12px"   # --form-radius-btn y --form-radius-input
  pill: "999px"     # --radius-pill (badges)
spacing:
  scale: "4px base — --space-N = N×4px, igual que Tailwind (gap-6 = --space-6 = 24px)"
  steps: "1:4 · 2:8 · 3:12 · 4:16 · 6:24 · 8:32 · 10:40 · 12:48 · 16:64 · 24:96 · 32:128"
  section: "--section-y-tight 40px · --section-y 64px · --section-y-airy 96px"
grid:
  columns: "12 lg / 6 md / 4 sm"
  maxWidth: "1366px"
  gutter: "56px lg / 20px md / 20px sm"
  padding: "112px lg / 56px md / 24px sm"
motion:
  ease: "--ease-out — cubic-bezier(0.25, 1, 0.5, 1)"
  durations: "--duration-fast 200ms · --duration-base 400ms · --duration-slow 460ms"
measure:
  prose: "--measure-prose 68ch"
  narrow: "--measure-narrow 52ch"
typography:
  display:
    fontFamily: "Oleo Script, Georgia, cursive"
    fontSize: "44px sm / 60px md / 76px lg"
    fontWeight: 700
    lineHeight: "50px / 66px / 84px"
  headline:
    fontFamily: "Oleo Script, Georgia, cursive"
    fontSize: "30px sm / 40px md / 46px lg"
    fontWeight: 400
  title:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "24px sm / 26px md / 28px lg"
    fontWeight: 700
    fontFeature: "lnum"
  body:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
    fontFeature: "lnum"
  label:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "12px sm / 13px md-lg"
    fontWeight: 600
    letterSpacing: "0.04em"
    fontFeature: "lnum"
components:
  button-primary:
    backgroundColor: "{colors.coral-accion}"
    textColor: "{colors.azul-profundo}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "10px 20px sm-md / 20px 50px lg"
  button-primary-hover:
    backgroundColor: "{colors.coral-hover}"
    textColor: "{colors.azul-profundo}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.azul-resto}"
    rounded: "{rounded.control}"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.azul-resto}"
    textColor: "{colors.crema-ticket}"
  input:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.azul-resto}"
    rounded: "{rounded.control}"
    height: "56px"
  card:
    backgroundColor: "{colors.papel-claro}"
    textColor: "{colors.azul-resto}"
    rounded: "{rounded.card}"
---

# Design System: Resto App — La cuenta clara

> **Fuente de verdad.** Marca fijada por el cliente el 2026-10-28 durante
> `/citrica-landing restoapp --ruta test-1-sin-brief`: crema `#F5F5EA`, azul `#083D77`,
> coral `#F95738`, Oleo Script en titulares, Lora en cuerpo y cifras, sin monoespaciada.
> Este documento **reemplaza** al de ImPulso (decisión del usuario: sobrescribir). La
> landing de ImPulso sigue en `/` y, como paleta y fuentes son globales, ya se pinta con
> estos valores. La versión anterior está en el historial de git.
>
> **Estado de implementación.** El render ya está en código: `_palette.scss`,
> `lib/fonts.ts` + `settings.scss`, `_text.scss`, `_button.scss`, `_form.scss`,
> `_input.scss` y `_radius.scss`. La landing `/test-1-sin-brief` aún no existe: la
> construye `/spec-build` desde su spec.

## Overview

**Creative North Star: "La cuenta clara"**

Resto App le habla a quien cierra la caja cada noche. La página entera se lee como una
cuenta que cuadra: lo que entra (salón, mostrador, delivery propio, menú web), lo que
sale (cocina, caja, bancos) y un total al final, que es un costo fijo sin comisión. El
efecto ticket no se consigue cambiando de tipografía. Se consigue con **líneas
punteadas, cifras alineadas a la derecha y una banda de total**.

La calidez viene del papel: fondo crema, tinta azul, sombras leves como de hoja apoyada
en el mostrador. El titular en Oleo Script pone la firma de marca, cercana y de barrio.
Lora carga todo lo demás, también los números. El coral es escaso a propósito: cuando
aparece, se hace clic.

**Key Characteristics:**
- Crema de fondo, azul para todo el texto, coral solo para actuar.
- Titulares en Oleo Script; cuerpo y botones en Lora con `lnum`; las cifras comparables suman `tnum`.
- Gramática de ticket: punteado, columnas de cifras alineadas y una banda de total.
- Cálido y cercano, con CTAs firmes: borde definido, 48px de alto y presión visible.

## Colors

Crema de papel, tinta azul y un solo color de acción.

### Primary
- **Coral de acción** (#F95738): fondo del CTA (demo por WhatsApp, prueba de 7 días) y
  de los estados clave (opción seleccionada, total destacado). Nada decorativo.
- **Azul profundo** (#04223F): texto y borde de 2px del CTA coral. El coral sobre la
  crema da 2.97:1; el borde azul profundo lleva el contraste del contorno (14.65:1).
  Excepción aprobada por el usuario el 2026-10-28.
- **Coral texto** (#B23A1F): cuando el coral tiene que ser texto pequeño sobre crema.

### Secondary
- **Azul Resto** (#083D77): todo el texto y la estructura (9.84:1 sobre crema). Fondo de
  las secciones `inverse`, con texto crema encima.

### Tertiary
- **Arena de ticket** (#E9DFC4, supuesto): bandas de total y fondos de "papel" dentro de
  la calculadora. Texto encima en azul (8.14:1).

### Neutral
- **Crema ticket** (#F5F5EA): fondo de página.
- **Papel claro** (#FBFBF5): tarjetas y campos sobre crema.
- **Azul secundario** (#3E5E80): texto secundario (6.14:1).
- **Línea punteada** (#6F849A): bordes de interfaz y punteado del ticket (3.51:1).
- **Divisor** (#D5D9D2): divisores decorativos que no necesitan contraste.
- **Azul gris** (#4F6D8A, supuesto): el lado "comisión" de la cuenta, que se lee como
  pérdida sin usar rojo ni coral.

### Named Rules
**The Coral Means Click Rule.** El coral marca exactamente lo que se pulsa o el estado
que cambió. Si un elemento coral no es accionable ni un estado, es un defecto.

**The One Ink Rule.** Todo el texto es azul (o crema sobre azul). Nada de negro ni de
gris neutro: el azul es la tinta de la marca.

## Typography

**Display Font:** Oleo Script (con Georgia, cursive)
**Body Font:** Lora (con Georgia, serif)
**Label/Buttons:** Lora

**Character:** Una firma de rótulo de restaurante (Oleo Script) sobre una serif de libro
de cuentas (Lora). El script se queda arriba; las cifras y la lectura viven en Lora.

### Hierarchy
- **Display** (Oleo Script 700, 44 / 60 / 76px, interlínea 50 / 66 / 84px): solo el
  titular del hero.
- **Headline** (Oleo Script 400, 30 / 40 / 46px): títulos de sección.
- **Title** (Lora 700, 24 / 26 / 28px, `lnum`): títulos de tarjeta, totales y
  cifras de la calculadora (las cifras suman `tnum`).
- **Body** (Lora 400, 16px / 24px en todos los tamaños, `lnum`): párrafos; medida
  máxima `--measure-prose` (68ch).
- **Label** (Lora 600, 12–13px, tracking 0.04em, `lnum`): etiquetas, nombres de
  canal y encabezados de columna del ticket.

### Named Rules
**The Script Stays Up Top Rule.** Oleo Script solo en display y headline. Nunca en
cifras, botones, etiquetas ni párrafos: un script a 24px deja de leerse.

**The Aligned Figures Rule.** Toda cifra que se compara con otra va en Lora con
`lnum tnum` y alineada a la derecha de su columna, como en un ticket. `tnum` va solo en
la cifra, nunca en el texto corrido: en Lora 700 también ensancha los espacios.

## Layout

Retícula de 12 / 6 / 4 columnas (lg / md / sm), contenedor máximo de 1366px y padding
lateral de 112 / 56 / 24px. Ritmo de sección con `--section-y` (64px), `-tight` (40px) y
`-airy` (96px). Las secciones alternan crema y azul `inverse` para marcar los cambios de
tema. Todo layout se construye con `Container`/`Col` y las primitivas de
`shared/components/layout/` (guía viva en `/dev/layout`).

## Elevation & Depth

Profundidad de papel: superficies planas con sombras leves y cortas, como una hoja
apoyada en el mostrador, nunca halos difusos. El tono (crema → papel claro → arena)
hace la mayor parte del trabajo de jerarquía.

### Shadow Vocabulary
- **Papel** (`var(--shadow-paper)`, en `foundations/_elevation.scss`: `0 1px 2px` al 8 % +
  `0 8px 8px -8px` al 12 % de `--color-shadow`): tarjetas y el ticket sobre la crema.
- **Tecla** (`0 3px 6px color-mix(in srgb, var(--color-shadow) 24%, transparent)`):
  solo el CTA primario; al presionar baja 2px y la sombra se aplasta a `0 1px 2px`.

### Named Rules
**The Paper Not Glass Rule.** Sin blur, sin vidrio, sin sombras de más de 8px de
desenfoque. Si algo flota, es papel, no luz. Única excepción acotada: `/test-2-corto` (ver su sección al
final de este documento).

## Shapes

Esquinas suaves y consistentes: 16px en tarjetas y medios (`--radius-md`), 12px en
botones y campos (`--form-radius-btn`, `--form-radius-input`). Píldora (999px) solo
para badges. El borde punteado (`1px dashed var(--color-outline)`) es la firma del
ticket: separa líneas de la cuenta y antecede al total.

## Components

### Buttons
- **Shape:** 12px de radio, alto mínimo de 48px (área táctil).
- **Primary:** fondo coral #F95738, texto azul profundo #04223F en Lora, borde de 2px
  #04223F y sombra de tecla (ver Elevation). Padding 10px 20px (sm, md) y 20px 50px (lg).
- **Hover / Active:** el fondo pasa a #FA6A4E; al presionar baja 2px y la sombra
  se aplasta. Con `prefers-reduced-motion` solo cambia el color.
- **Secondary:** transparente con borde azul de 2px; al hover se rellena de azul con
  texto crema.
- **Flat:** texto azul sin relleno, tinte azul al 8% en hover.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** papel claro #FBFBF5 sobre crema; arena #E9DFC4 para la banda de total.
- **Shadow Strategy:** "Papel" (ver Elevation).
- **Border:** opcional, 1px `outline-variant`; punteado `outline` entre líneas del ticket.

### Inputs / Fields
- **Style:** fondo blanco, borde de 2px en `outline` (#6F849A) y 12px de radio; 56px
  de alto mínimo y texto de 16px (evita el zoom de iOS).
- **Focus:** el borde pasa a coral #F95738 (3.26:1 sobre blanco).
- **Placeholder:** #5A6B7D (5.48:1).

### Ticket de cuenta (signature)
Lista de líneas con etiqueta a la izquierda y cifra a la derecha (Lora `lnum tnum`),
separadas por punteado; cierra con una banda de total en arena con la cifra en
`title`. Es el gesto que convierte "costo fijo, sin comisión" en algo que se ve cuadrar.

## Do's and Don'ts

### Do:
- **Do** reservar el coral #F95738 para CTAs y estados clave, siempre con texto y borde #04223F.
- **Do** escribir todas las cifras comparables en Lora con `lnum tnum`, alineadas a la derecha.
- **Do** lograr el efecto ticket con punteado, columnas alineadas y una banda de total.
- **Do** mantener 48px de alto mínimo en botones y 56px en campos.

### Don't:
- **Don't** usar tipografía monoespaciada en ningún lugar (decisión del cliente).
- **Don't** usar Oleo Script por debajo de headline (cifras, botones, etiquetas, párrafos).
- **Don't** poner texto blanco ni #083D77 sobre coral: no llegan a 4.5:1.
- **Don't** escribir hex ni `rgba()` en `.tsx` o en `styles/webpages-styles/`: el color sale de `_palette.scss`.

## Implementation contract (tokens-first, component-first)

> Las cuatro reglas vinculantes (color solo desde tokens, tipografía vía `Text`,
> botones dirigidos por tokens, toolkit antes que markup propio) y el mapa de archivos
> viven en un solo lugar:
>
> ### → **[implementation-contract.md](01-design/implementation-contract.md)**
>
> Motivo: [ADR-0001](04-decisions/0001-contrato-fuente-unica.md).

---

# Surface: /test-2-corto — Resto App en vidrio

> Amplía este documento en modo ruta (`/citrica-landing restoapp … --ruta test-2-corto`,
> 2026-10-30). El sistema de arriba sigue vigente para toda la base; esta sección añade
> solo lo propio de la ruta.

## Dirección vigente

- **Estilo:** `03-glassmorphism` del catálogo, elegido mirando la imagen.
- **comp:** `.impeccable/mocks/test-2-corto-approved.png` (copia de
  `.claude/skills/citrica-landing/references/styles/03-glassmorphism.png`).
- **Decisión del usuario (2026-10-30):** "Vidrio con colores Resto". Se respeta la
  **composición** del comp (paneles de vidrio apilados, luces difusas, mocks a la
  derecha, badge arriba a la derecha); los **colores y las fuentes** son los de Resto App.
  La paleta global, las fuentes y la escala **no cambian** (ADR-0009).
- **Steer:** ninguno.

### Traducción de la paleta del comp a la marca

| Comp | Resto App (token existente) |
|---|---|
| Fondo pizarra `#1E293B` | azul profundo: `--color-on-secondary-container` (`#04223F`) |
| Luz violeta / magenta | coral: `--color-primary` (`#F95738`) |
| Luz cian | celeste: `--color-secondary-fixed-dim` (`#9DB6D1`) |
| Vidrio blanco 5–10 % | `--color-text-white` (crema) al 8–12 % con `color-mix()` |
| Texto blanco | `--color-text-white` (crema `#F5F5EA`) |
| CTA violeta con halo | `Button variant="primary"` coral + halo de `--color-primary` |

### Tipografía

El comp usa una sans fina en mayúsculas (cercana a Sora). Se mantiene la marca:
**Oleo Script** en el titular y **Lora** en bajada, botones y mocks. `font-match` no se
usa: la familia la fijó el cliente.

### Regiones del comp → repo

| Región | Kind | En este repo |
|---|---|---|
| Fondo azul profundo con luces coral y celeste fuera de foco | `texture` | `Section` con `.test-2-corto__ambient` (2–3 `radial-gradient` con `color-mix` de tokens) |
| Tres paneles de vidrio apilados y desplazados | `chrome` | `Grid` con 3 `Cell` en la misma `row`, `start` distinto, `.test-2-corto__glass` |
| Titular de 2 líneas, centrado | `text` | `Text variant="display"` (Oleo Script) en `Stack` centrado, crema |
| Bajada | `text` | `Text variant="subtitle" textColor="color-text-white"` |
| CTA con halo | `control` | `Button variant="primary"` + `.test-2-corto__glow` |
| Dos mocks de móvil en vidrio (derecha) | `plate` | paneles `.test-2-corto__glass` con `Media ratio="3/4"` que contienen componentes del toolkit (ticket de cierre, `Card`) — sin producto real, no se inventa una captura |
| Badge "powered by" arriba a la derecha | `chrome` | `Cluster` pequeño en vidrio con el wordmark TEMPORAL |

## Excepción a "The Paper Not Glass Rule"

**Solo en `/test-2-corto`** se permite vidrio: `backdrop-filter: blur()` en paneles
`.test-2-corto__glass` sobre el fondo de luces. Condiciones:

- Nunca vidrio sobre vidrio sobre vidrio: máximo dos capas superpuestas con texto encima.
- Todo texto sobre vidrio cumple 4.5:1 medido en el punto más claro del fondo.
- `backdrop-filter` solo en el hero (no en secciones de scroll largo) y con fallback
  opaco cuando el navegador no lo soporta.
- El resto de la base sigue la regla original: papel, no vidrio.

---

# Surface: /test-3-sistema — La cuenta clara, como sistema

> Brief del 2026-10-30 (`--ruta test-3-sistema`). **Misma dirección que el documento
> principal** ("La cuenta clara", papel, no vidrio); sin imagen del catálogo, build
> code-led. Lo que cambia es **cómo se construye**.

## Dirección vigente

- **Estilo:** "La cuenta clara" (estructura "La cuenta de la comisión"), decidido en el
  brief. Sin `comp:`; la referencia es este documento.
- **Regla de la ruta — The No Page Styles Rule.** `/test-3-sistema` no tiene SCSS de
  página. Todo gesto (ticket, fila punteada, cifra tabular, banda de total, botón sobre
  azul) vive en componentes de `shared/project-components/` con su estilo en
  `styles/08-components/`, escrito solo con tokens (`--color-*`, `--space-*`,
  `--radius-*`, `--form-radius-*`, `--duration-*`). Si una sección necesita un gesto que
  no existe, se crea el componente; no se escribe una clase de página.

## Componentes de la cuenta (reutilizables)

| Pieza | Qué es | Gesto |
|---|---|---|
| Botones de conversión | Demo por WhatsApp, prueba de 7 días, cotizar | `Button` del toolkit; sobre `inverse`, el secundario toma la pareja crema |
| Tarjeta ticket | Papel claro sobre crema | Radio 16px, sombra "Papel" |
| Tarjeta de módulo | Icono + título + texto | Papel claro, borde `outline-variant` |
| Fila de cuenta | Concepto a la izquierda, cifra o detalle a la derecha | Punteado inferior `outline`; la cifra en `lnum tnum`, a la derecha |
| Banda de total | Cierre de la cuenta | Arena `tertiary`, texto `title` |
| Campo de monto | Cifra con prefijo (`USD`) o sufijo (`%`) | `Input` del toolkit, 56px, solo dígitos |

El logo real reemplaza al wordmark: azul sobre crema, versión light sobre azul.
