# Product

## Register

brand

> This repo was forked from the Citrica base template and is now the **ImPulso** project. The surface in focus is a brand/marketing landing page — design IS the product. The Supabase-backed admin scaffolding from the base still exists in the repo but is secondary; the landing page is what this document defaults to.

## Users

**Who it's for:** Owners and managers of gastronomic businesses — restaurants of medium-to-high ticket, cafés, dark kitchens, food trucks, F&B brands, and culinary ventures. The specific buyer is a restaurant owner who is spending on marketing (photos, video, paid ads) and cannot tell what actually brings diners through the door. They are frustrated by a "black box" of marketing spend and by leads slipping away.

**Who builds on it:** The ImPulso / Citrica team, extending this landing into a live acquisition page and any follow-on marketing surfaces.

**Context:** A single, conversion-focused long-scroll landing page in Spanish (Peruvian/Latin American register). The visitor arrives skeptical — they've been burned by agencies that "sell the perfect idea and then disappear." The page's whole job is to convert that skepticism into one booked call: the free "estudio gratuito" / diagnosis.

**Job to be done:** Convince a busy, results-oriented restaurant owner that ImPulso runs marketing as a measurable system for filling tables — not as vanity "presence" — and get them to book a free diagnostic call.

## Product Purpose

ImPulso is a **growth & content agency for the gastronomic sector**. The value proposition: *"Le damos impulso a tu marca gastronómica: del plato a la pantalla, de la pantalla a la mesa llena."* The landing page sells the **Sistema Mesa Activa** — a 4-step method (visibility diagnosis → local positioning → diner acquisition → weekly optimization) that turns marketing spend into a predictable flow of diners, with full transparency on ROI.

**Success looks like:** a restaurant owner who lands, recognizes their own pain in the copy ("metes plata y no sabes si vuelve"), trusts that ImPulso are operators who own restaurants themselves, and books the free diagnostic call. The single conversion event is **"Agendar mi estudio gratuito."**

## Brand Personality

**Three words:** Energetic, direct, appetite-driven.

**Archetype:** *El Motivador con hambre de resultados* — part coach, part foodie. Speaks like the restaurant owner, not like a consultant.

**Voice & tone:** Direct, sensory, backed by data, close/familiar. Says "Llenamos tus mesas," not "Ofrecemos soluciones integrales de comunicación." Every claim earns trust with a real, verifiable number ("+180% de reservas en 3 meses"). Warm Peruvian/Latin Spanish, never corporate.

**Emotional goal:** The visitor should feel *understood* and *in control*. Understood, because ImPulso are restaurant owners who know what an empty Tuesday night feels like. In control, because for the first time they'll know exactly what each sol invested returns.

**Art-direction north star:** *"La carta del mercado moderno"* — the bluntness of a market poster (Anton, carbón black, orange) meeting the discipline of a growth agency (clean grids, visible metrics, generous white). High contrast between light sections and carbón (`#111111`) sections; orange **always** means action.

## Anti-references

- **The marketing black box.** The product exists to kill "creo que funcionó" marketing; the page must never itself feel like vague agency fluff. Every section pushes toward a measurable claim or a concrete next step.
- **Corporate/consultant coldness.** No "sinergia," "holístico," "disruptivo," "soluciones 360°," "ecosistema." No stock "business people shaking hands." This brand is *not* corporate-cold, pretentious, over-technical, or generic.
- **Editorial-magazine aesthetic.** Anton is a poster/sports-headline voice, not a Klim display-serif specimen. No display-serif + italic + drop-caps + ruled-column magazine affectation. The lane is *market poster / results scoreboard*, deliberately un-editorial.
- **Generic 3D / corporate-memphis illustration.** Food photography is the protagonist; the brand is the amplifier. No generic 3D blobs, no memphis characters, no sketchy SVG.
- **Orange as a wash.** Orange is 10% (action & accent only). Spreading it everywhere kills its force. Yellow is a condiment, max one yellow element per viewport.
- **Hardcoded styling / hand-rolled components.** The system is single-sourced: brand colors live only in the `_palette.scss` tokens and UI is built on `citrica-ui-toolkit`. Hardcoded hex, intermediate CSS aliases (`--im-*`), or bespoke markup that duplicates a toolkit component are defects, not shortcuts. (See the Implementation contract below and DESIGN.md §10.)

## Design Principles

1. **Flujo, no presencia.** Marketing is diner flow, not "presence." Every section answers, implicitly, "how many new diners did this bring?" The page sells a measurable system, so the design keeps metrics visible and claims concrete.
2. **La comida es la protagonista.** Real, warm, kinetic food photography leads; ImPulso amplifies it. Cold, desaturated, or blurry food imagery is a defect. Motion in the imagery (falling sauce, steam, hands cooking) echoes the name *ImPulso*.
3. **Alto contraste, ritmo de cartel.** Alternate white / `neutral-50` / carbón sections for rhythm. At least one carbón section per page — that's the "poster moment" of the brand. Restraint everywhere so the loud moments land.
4. **El naranja es acción.** Orange marks exactly what to click or notice, nowhere else. Respect 60-30-10 (neutral / carbón / orange). One bicolor "pulso" gesture per page, max; one yellow highlight per viewport, max.
5. **Datos que se pueden verificar.** Trust is built with real numbers, an honest guarantee, and operator credibility ("somos dueños de restaurante"), not adjectives. At least one real, verifiable metric visible.

## Implementation contract

La superficie ImPulso es **tokens-first** y **component-first**. Las reglas obligan por
igual a ediciones a mano y a pases automatizados (incluida la skill `impeccable`).

> Las cuatro reglas completas, con su mapa de archivos y sus comandos de verificación,
> viven en **[docs/01-design/implementation-contract.md](01-design/implementation-contract.md)**.
> Fuente única — ver [ADR-0001](04-decisions/0001-contrato-fuente-unica.md).

En una línea: **color solo desde `_palette.scss`, texto solo con `Text`, layout solo con
`Container`/`Col` y las primitivas de layout, componente del toolkit antes que markup propio.**

## Accessibility & Inclusion

Best-effort with sensible, verified-contrast defaults (per the brand book's WCAG table):

- Body text and small UI text meet ≥4.5:1. Small orange text uses `#A83E15` (7.0:1 on white), **never** the `#E8622C` base. White-on-orange is reserved for large/bold text and buttons only (3.4:1).
- Anton never below 24px (legibility floor). It carries titles only, never paragraphs.
- Every photo with text over it gets a carbón overlay (40–60%) for contrast.
- Visible focus on every interactive element (outline 2px `#111111`, offset 2px).
- `prefers-reduced-motion` honored: the one orchestrated hero reveal (slide-up + yellow underline draw) degrades to a crossfade or instant state.

---

## Surface: /test-1-sin-brief

> **Provisional** — escrito desde el brief de `/citrica-landing restoapp --ruta test-1-sin-brief`
> (2026-10-28). Amplía este documento sin reemplazar ImPulso: lo de arriba sigue siendo la
> superficie `/`. Esta sección manda solo en la ruta `/test-1-sin-brief`.

### Register

brand

### Users

**Who it's for:** Dueños y encargados de restaurantes, dark kitchens, bares y cafeterías
en **Venezuela**. Llevan el día a día del local: el salón, el mostrador, el delivery propio
y el cierre de caja. Hoy ese día vive repartido entre herramientas que no se hablan, y el
cierre (cocina, caja y bancos) se cuadra a mano.

**Context:** Landing de conversión en español de Venezuela. La visitante evalúa si cambiar
su forma de operar vale el esfuerzo y el contrato anual.

**Job to be done:** Que la dueña o el encargado vea que todo el local entra a un solo flujo
y sale en un solo cierre, por un costo fijo, y **solicite una demo por WhatsApp**.

### Product Purpose

**Resto App** es un sistema todo-en-uno para la operación gastronómica. Salón, mostrador,
delivery propio y menú web entran al mismo flujo; cocina, caja y bancos salen del mismo
cierre. **Costo fijo mensual, sin comisión por venta, contrato anual.**

**Conversión primaria:** solicitar una demo por WhatsApp.
**Conversión secundaria:** prueba gratis de 7 días.

### Brand Personality

**North star:** *La cuenta clara* — la página se lee como una cuenta que cuadra.

**Marca fijada por el cliente (2026-10-28):** crema `#F5F5EA`, texto azul `#083D77`,
coral `#F95738` solo en CTAs y estados clave. Titulares en Oleo Script; cuerpo y cifras
en Lora. Sin tipografía monoespaciada. El efecto ticket sale de líneas punteadas,
cifras alineadas y totales, no de la tipografía.

**Tono:** cálido y cercano (crema y tinta suaves, sombras leves de papel), con CTAs
firmes y bien visibles. Claridad operativa sobre adjetivos; precio sin letra pequeña
(fijo, sin comisión).

**Accesibilidad de marca:** texto y borde del CTA coral en azul profundo `#04223F`
(ni blanco ni `#083D77` alcanzan 4.5:1 sobre coral). Área táctil mínima de 48px;
campos de 56px y texto de 16px en móvil.

### Anti-references

- Prometer cifras, clientes o testimonios que no existen: todo lo que no venga del brief
  va como contenido de muestra marcado.
- El lenguaje de "plataforma 360°" y "ecosistema": el producto se explica por el flujo
  (entra → sale), no por adjetivos.

### Open questions

- Logo y nombre exacto de marca (¿"Resto App" o "RestoApp"?).
- Número de WhatsApp de destino para la demo.
- Precio mensual a mostrar (o si se oculta hasta la demo).
- Moneda y medios de pago que debe nombrar el cierre de bancos.

---

## Surface: /test-2-corto

> Escrito desde el brief de `/citrica-landing restoapp "sistema todo-en-uno para
> restaurantes en Venezuela, costo fijo sin comisión por venta, CTA demo por WhatsApp"
> --ruta test-2-corto` (2026-10-30). Comparte usuarios, propósito y marca con
> `Surface: /test-1-sin-brief`; esta sección solo fija lo que cambia.

### Register

brand

### Diferencia con /test-1-sin-brief

- **Brief corto:** sistema todo-en-uno para restaurantes en Venezuela, costo fijo sin
  comisión por venta. **Una sola conversión:** demo por WhatsApp (sin prueba de 7 días,
  que el brief no menciona).
- **Dirección visual:** Glassmorphism del catálogo (ver `docs/design.md` → Surface:
  /test-2-corto), con la marca de Resto App.

---

## Surface: /test-3-sistema

> Escrito desde el brief del documento "brief testin skill" (Google Docs, 2026-10-30)
> pasado a `/citrica-landing restoapp … --ruta test-3-sistema`. Comparte usuarios,
> propósito y marca con `Surface: /test-1-sin-brief`; esta sección fija lo que cambia.

### Register

brand

### Objetivo del test

Construir la landing **solo con los tokens y las primitivas del sistema de diseño**: sin
colores, tamaños ni estilos sueltos, y con **componentes reutilizables** para botones,
tarjetas, campos y filas de cuenta.

### Diferencia con /test-1-sin-brief

- **Público ampliado:** dueños y encargados de bajo a medio nivel técnico, que priorizan
  lo práctico y **abren el enlace desde WhatsApp en el celular** (sm es el caso principal).
  Dolor: herramientas dispersas, conciliación manual al cierre, fugas de caja y
  comisiones de las apps de reparto.
- **Sin precio público:** la sección de comisión muestra cuánto se pierde hoy y cierra
  con **cotizar el plan fijo**. No hay monto mensual en la página.
- **Conversión:** primaria, demo por WhatsApp; secundaria, prueba gratis de 7 días en
  `https://restoapp.club/registro`.
- **Contenido:** solo el del brief (hero, canales, caos vs. un solo flujo, operación en
  vivo, finanzas y cierre, roles, modelo de cobro, preguntas frecuentes, cierre). Lo que
  falte se marca pendiente, no se inventa.
- **Logo real:** `public/img/logo-resto-app.svg` (azul, para crema) y
  `logo-resto-app-light.svg` (crema, para azul), tomados de restoapp.club.

### Tono

Directo, pragmático, sin humo corporativo. Lenguaje de restaurante: comanda, arqueo,
mesa, KDS, turno, caja.

### Anti-references

- Métricas de clientes, calificaciones u horas ahorradas: el brief las prohíbe.
- "Solución disruptiva", "innovación 360°" y cualquier jerga corporativa vacía.
- Fotos de banco de imágenes genéricas.

### Conflictos del brief (resueltos así)

- El contenido fuente pide "sans-serif moderna"; la sección *Marca* del mismo brief fija
  Oleo Script + Lora. Gana *Marca* (más específica y ya decidida).
- El contenido fuente pide fotos reales y capturas del sistema; no las hay. Se
  representan con tickets de muestra marcados, y las capturas quedan pendientes.
