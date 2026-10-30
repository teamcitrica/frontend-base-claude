---
id: 0005
slug: landing-restoapp
titulo: Landing de Resto App — la cuenta de la comisión
estado: in-progress  # draft | approved | in-progress | done | dropped
creada: 2026-10-28
superficie: landing  # landing | admin | panel | auth | api | infra
ruta: /test-1-sin-brief
---

# SPEC-0005 — Landing de Resto App: la cuenta de la comisión

## Problema

La dueña o el encargado de un restaurante, dark kitchen, bar o cafetería en Venezuela
lleva el local repartido entre herramientas que no se hablan: el salón por un lado, el
mostrador por otro, el delivery propio y el menú web aparte. Al final del día cuadra a
mano cocina, caja y bancos. Además, muchas plataformas le cobran **una comisión por cada
venta**, y esa comisión crece justo cuando el local vende más. Nunca ha visto en un solo
número cuánto se le va en comisiones al mes.

## Por qué ahora

Resto App ya tiene producto (costo fijo mensual, sin comisión, contrato anual) pero no
tiene una página que lo explique en la cuenta que la dueña ya hace de cabeza. Sin ella,
cada demo empieza desde cero por WhatsApp.

## Alcance

Una landing en `/test-1-sin-brief`, construida desde el wireframe aprobado (estructura
**"La cuenta de la comisión"**; ver [design.md → Dirección vigente](../../design.md) y
el Direction contract en `.impeccable/surfaces/`). Build **code-led**: no hay comp
generado (sin `OPENAI_API_KEY`).

1. **Header**: logo, anclas a las secciones y CTA "Pedir demo por WhatsApp".
2. **Hero**: titular, bajada, CTA primario (demo por WhatsApp) y secundario (prueba de 7
   días) a la izquierda; a la derecha, la **calculadora**: la visitante escribe sus ventas
   del mes y ve, en formato ticket, cuánto pagaría en comisiones frente al costo fijo y
   cuánto se queda.
3. **Foto de mostrador + "Entra → sale"**: foto de stock (de muestra) junto a un esquema
   de los cuatro canales que entran (salón, mostrador, delivery propio, menú web) y las
   tres salidas del mismo cierre (cocina, caja, bancos).
4. **Precio**: costo fijo mensual, sin comisión por venta, contrato anual, en formato
   ticket con banda de total.
5. **CTA final**: sección `inverse` con demo por WhatsApp y prueba gratis de 7 días.
6. **Footer**.
7. **Identidad del sitio** (añadido en el build, decisión del usuario 2026-10-28):
   `config/site.ts` pasa de "New Project" a **Resto App** (`name`, `description`, `seo.*`,
   `seo.colors` en sincronía con la paleta), para que el `<title>` de la ruta no termine
   en "| New Project". `navLinks` no se toca (lo usa `/`).

Todo con la marca fijada en [design.md](../../design.md): crema `#F5F5EA`, azul
`#083D77`, coral `#F95738` solo en CTAs y estados clave, Oleo Script en titulares y Lora
en cuerpo y cifras.

## Fuera de alcance

- Cualquier cambio a `/` (ImPulso), al admin o al panel (modo ruta). `config/site.ts`
  **entró al alcance** en el build (ver Alcance, punto 7).
  `/` hereda la paleta y las fuentes nuevas porque son globales; eso **no** se corrige en
  esta spec ([ADR-0009](../../04-decisions/0009-resto-app-reemplaza-impulso.md)).
- Páginas internas (funciones, precios detallados, legales) y formulario de registro de
  la prueba de 7 días: el CTA secundario apunta a WhatsApp con otro mensaje prellenado.
- Contenido real que no se tiene. Van **de muestra y marcados** en código y en la
  pantalla de verificación: precio mensual, porcentaje de comisión de referencia,
  número de WhatsApp, logo y fotos.
- Testimonios, logos de clientes y métricas de resultados: no existen, no se inventan.
- Modo oscuro de la landing (la paleta oscura queda coherente, pero no se revisa aquí).

## Criterios de aceptación

### AC-1 — Header
- **Dado** la ruta `/test-1-sin-brief` en `sm`, `md` y `lg`
- **Cuando** carga la página
- **Entonces** se ve el `Header` del toolkit con un logo de Resto App (wordmark temporal
  marcado si no llega el asset, nunca el placeholder de otra marca), las anclas a las
  secciones (menú móvil en `sm`) y el CTA "Pedir demo por WhatsApp" en coral.

### AC-2 — Hero y CTA en el primer viewport
- **Dado** los viewports `sm` (390×844), `md` (768×1024) y `lg` (1440×900)
- **Cuando** se corre `npm run shot -- /test-1-sin-brief --cta <selector del CTA>`
- **Entonces** el CTA primario queda dentro del primer viewport en los tres, el titular
  usa `Text variant="display"` (Oleo Script) y el CTA tiene texto y borde `#04223F`.

### AC-3 — Calculadora de comisión
- **Dado** el campo "Ventas del mes" con un valor de muestra prellenado
- **Cuando** la visitante escribe otro monto (o lo borra)
- **Entonces** se actualizan en el momento tres líneas: comisión estimada (lado azul gris),
  costo fijo de Resto App y la banda de total "Te quedas" en arena. Las cifras van en Lora
  con `lnum tnum`, alineadas a la derecha y separadas por punteado. Un campo vacío o en 0
  muestra 0 sin errores. Un monto de 9 dígitos no rompe el layout en `sm`. El porcentaje y
  el precio usados se rotulan visiblemente como valores de referencia.

### AC-4 — Entra → sale
- **Dado** la sección bajo el hero
- **Cuando** se mira en `sm`, `md` y `lg`
- **Entonces** se ven la foto de mostrador (`Media` + `next/image`, verificada con
  `curl -I`, marcada de muestra) y el esquema de 4 entradas → 3 salidas, legible y sin
  depender solo del color.

### AC-5 — Precio
- **Dado** la sección de precio
- **Cuando** se mira
- **Entonces** dice "costo fijo mensual", "sin comisión por venta" y "contrato anual" en
  formato ticket con banda de total. El monto es de muestra y está marcado.

### AC-6 — CTA final
- **Dado** la última sección (`Section tone="inverse"`)
- **Cuando** se hace clic en cada CTA
- **Entonces** "Pedir demo" abre WhatsApp con un mensaje prellenado de demo y "Probar 7
  días gratis" abre WhatsApp con un mensaje prellenado de prueba. Ambos abren en una
  pestaña nueva con `rel="noopener"`.

### AC-7 — Responsive y verificación visual
- **Dado** `npm run shot -- /test-1-sin-brief`
- **Cuando** termina
- **Entonces** sale con código 0: sin scroll horizontal, sin imágenes rotas y sin errores
  de consola en `sm`, `md` y `lg`.

### AC-8 — Contrato y marca
- **Dado** el código de la ruta
- **Cuando** se corren `npm run typecheck`, `npm run lint:check` y `npm run contract`
- **Entonces** typecheck da 0 errores y no hay errores de lint ni violaciones de contrato
  nuevos. No hay hex ni `rgba()` en `.tsx` ni en `styles/webpages-styles/test-1-sin-brief.scss`.
  No hay tipografía monoespaciada. Oleo Script solo en `display`/`headline`. Todo texto
  usa la tinta azul de la marca (incluido el que hoy hereda el casi negro de HeroUI).

### AC-9 — Accesibilidad
- **Dado** la ruta en `sm`
- **Cuando** se miden con Playwright los botones, enlaces y campos
- **Entonces** todo control mide ≥ 48px de alto, el campo de la calculadora ≥ 56px con
  texto de 16px, el foco es visible en todos los controles, el contraste del texto cumple
  [DoD §E](../../00-harness/definition-of-done.md) y la presión del botón se reduce a un
  cambio de color con `prefers-reduced-motion`.

## Restricciones heredadas

- [x] [Contrato de implementación](../../01-design/implementation-contract.md) — tokens-first, component-first
- [x] [Design system](../../design.md) — marca Resto App: paleta, Oleo Script + Lora, gramática de ticket, CTA coral con borde
- [x] [Producto](../../product.md#surface-test-1-sin-brief) — Surface: /test-1-sin-brief (usuarios, conversión primaria y secundaria, anti-referencias)
- [x] Accesibilidad — ver [DoD sección E](../../00-harness/definition-of-done.md)
- [x] [ADR-0004](../../04-decisions/0004-verificacion-visual-y-assets.md) — verificación visual obligatoria; ningún placeholder ajeno
- [x] [ADR-0008](../../04-decisions/0008-catalogo-de-estilos-landing.md) — landing por `/citrica-landing`
- [x] [ADR-0009](../../04-decisions/0009-resto-app-reemplaza-impulso.md) — Resto App es la marca de la base; excepción de contraste del CTA coral

## Preguntas abiertas

Resueltas con el usuario el 2026-10-28:

- [x] **ADR del cambio de constitución** → se escribió
  [ADR-0009](../../04-decisions/0009-resto-app-reemplaza-impulso.md): Resto App es la marca
  de la base y `/` hereda paleta y fuentes sin corregirse aquí.
- [x] **CTA de WhatsApp sin número** → `https://wa.me/?text=…` (abre WhatsApp para elegir
  contacto). El número va como constante de muestra en un solo lugar, vacía hasta que
  llegue el real.
- [x] **Valores de referencia de la calculadora** → 15 % de comisión de referencia y
  USD 120/mes de costo fijo, rotulados en pantalla como "valores de referencia".

## Verificación

> Se llena en la fase VERIFY. Salidas reales, no checks optimistas.
> Formato en [definition-of-done.md](../../00-harness/definition-of-done.md#bloque-de-reporte).

## Verificación — 2026-10-28

| Punto | Resultado |
|---|---|
| A. typecheck | ✅ 0 errores (igual al baseline) |
| A. lint:check | ✅ 7 errores, 733 avisos — los mismos que antes de la spec (baseline registrado: 8). Archivos de la spec: 0 errores; 1 aviso antiguo en `config/site.ts:4` (`ROL_CLIENTE` sin uso, línea no tocada) |
| A. build | ⚠️ **Compila** ("Compiled successfully in 23.1s") pero **falla** al recolectar datos de `/api/s3/presigned`: `Faltan variables de entorno de AWS S3 … en .env.local`. Ruta no tocada por esta spec (`git diff HEAD -- app/api` vacío). Recordatorio: `build` no es puerta de tipos (ADR-0002) |
| B. npm run contract | ✅ 35 violaciones, todas `hex-en-tsx` y anteriores (baseline 36); 0 en archivos de la spec; sin deriva de nombres en `_palette.scss` |
| B. revisión visual | ✅ Texto con `Text`; layout con `Section`/`Grid`+`Cell`/`Stack`/`Cluster`/`AutoGrid`/`Media`/`Container`+`Col`; `Header`, `Button`, `Input`, `Card`, `Icon name=…` del toolkit; únicos elementos propios: wrapper `.test-1-sin-brief` y `<footer>` con clase de gesto |
| C. criterios | 9/9 ✅ (detalle abajo) |
| D. responsive | ✅ `npm run shot -- /test-1-sin-brief --cta "#inicio .btn-primary"`: "Sin scroll horizontal, sin imágenes rotas, sin errores de consola" en sm/md/lg; capturas sm/md/lg (fold y completas) abiertas y revisadas. Regresión `/`: exit 0, avisos "imágenes aún cargando a los 20s" (Unsplash remoto en dev) |
| D. dark mode | — No aplica: fuera de alcance (spec) |
| D. assets | ✅ Sin placeholder ajeno ("Matour" no aparece). Wordmark "Resto App" marcado TEMPORAL en `site-header.tsx` y `test-1-sin-brief.scss`; foto de stock marcada de muestra en código y pie |
| E. a11y | ✅ (detalle abajo) |
| F. docs | ✅ `design.md`, `product.md`, sidecar `.impeccable/design.json` y ADR-0009 actualizados; ruta añadida en `docs/02-architecture/overview.md` |
| G. impeccable audit | ✅ corrido · 15/20 (Good) · 5 hallazgos: 1 sancionado, 4 pendientes (abajo) |

### C — criterios ejercitados

- **AC-1** ✅ Header del toolkit con wordmark TEMPORAL, anclas `#inicio` `#flujo` `#precio`, menú hamburguesa en sm, CTA "Pedir demo" coral.
- **AC-2** ✅ CTA en el fold: sm `bottom 462px / 844`, y el shot `--cta` pasa en md/lg; titular `display` en Oleo Script; texto y borde del CTA `#04223F` (medido).
- **AC-3** ✅ Probado en el navegador: 8.000 → "Te quedas al mes USD 1.080"; 500 → banda neutra "Con este volumen, la comisión te sale más barata · Resto App conviene desde USD 800"; vacío → USD 0 sin error; "12abc34-5,6" → solo dígitos; 10 dígitos → recortado a 9; 999.999.999 → 0 px de desborde en sm; rótulo "Valores de referencia" visible.
- **AC-4** ✅ Foto `Media 4/3` + `next/image` (`curl -I` 200 image/jpeg), entra 4 → sale 3 con icono + nombre + detalle (no solo color).
- **AC-5** ✅ Ticket "Plan mensual USD 120 · Comisión USD 0 · Contrato Anual" + banda "Pagas al mes"; "Precio de referencia".
- **AC-6** ✅ `window.open` interceptado en los 5 CTA: `https://wa.me/?text=…` con mensaje de demo o de prueba según el botón, `"_blank"`, `"noopener,noreferrer"`. Implementado con `onPress` + `window.open`, no con `<a target>` (riesgo previsto en el plan).
- **AC-7** ✅ ver D.
- **AC-8** ✅ typecheck 0; sin errores de lint ni violaciones nuevas; greps sin hex/`rgba()`/`clamp()`/`font-family`/monoespaciada en la ruta; Oleo Script solo en `display`/`headline`; **ningún texto fuera de la tinta** (barrido de `color` computado en sm: 0 elementos fuera de `#083D77`/`#3E5E80`/`#04223F`/`#F5F5EA`).
- **AC-9** ✅ sm: 0 controles < 48px (incluido el logo, 48px tras el ajuste); campo 56px y 16px; foco comprobado **tabulando** por los 10 elementos (outline 2px azul; crema en la banda azul; campo con borde coral); `prefers-reduced-motion` emulado: la regla anula el `transform` al presionar.

### E — accesibilidad

- Contraste: pares de la paleta verificados antes de escribirla (on-surface 9.84, on-surface-var 6.14, CTA 4.94, placeholder 5.48, etc.); excepción coral/crema 2.97:1 cubierta por el borde (14.65:1), ADR-0009.
- Las reglas de "naranja pequeño `#A83E15`", "blanco sobre naranja" y "Anton ≥ 24px" son de ImPulso: no hay texto pequeño en coral, no hay blanco sobre coral y no hay Anton.
- No hay foto con texto encima.
- Foco y movimiento reducido: ver AC-9.

### G — `/impeccable audit` (detector en URL 1440×900 y 390×844 + fuente)

| # | Dimensión | Puntaje | Hallazgo clave |
|---|---|---|---|
| 1 | Accesibilidad | 3 | Foco y etiquetas corregidos en el build; `Input` sin `inputMode` |
| 2 | Rendimiento | 3 | `next/image` con `sizes`; fuentes self-hosted; peso del bundle del toolkit no medido |
| 3 | Theming | 3 | Todo por tokens; modo oscuro no revisado (fuera de alcance) |
| 4 | Responsive | 3 | Sin desborde en 3 tamaños; 9 dígitos probado; teclado numérico solo vía `pattern` |
| 5 | Integridad | 3 | Mundo propio y coherente (ticket, cuenta); titular sobredimensionado en lg |
| | **Total** | **15/20** | **Good** |

Hallazgos:
- `cream-palette` (`rgb(245,245,234)`) — **sancionado**: crema de marca fijada por el cliente. El hook no admite ignorar el valor; queda sin silenciar.
- **[P2] `oversized-h1`** — lg: h1 de 46 caracteres a 76px ocupa 28vh. Pendiente → `/impeccable typeset`.
- **[P2] `Input` sin `inputMode="numeric"`** — Android abre teclado de texto (iOS numérico por `pattern`). El toolkit no expone la prop. Pendiente.
- **[P3] `straggler`** — "fijo." sola en la última línea de un párrafo en lg. Pendiente → `/impeccable polish`.
- **[P3] `font-size: 28px` fuera de la escala** — wordmark TEMPORAL; desaparece con el logo real.

Defectos encontrados y **corregidos** durante build/verify (bitácora en `tasks.md`): secundario invisible sobre azul; foco de teclado invisible en botones (sombra pisaba el anillo) y en enlaces del header; etiqueta/ayuda del `Input` en grises de HeroUI (ayuda ≈2.5:1); cifras de 9 dígitos desbordando; `tnum` ensanchando espacios en Lora 700; sombra en bloque del CTA; título "| New Project".

Pendiente, en orden:
1. **Build**: definir en `.env.local` las variables AWS que pide `/api/s3/presigned` (fuera de esta spec) o decidir que el fallo de entorno no bloquea el cierre.
2. [P2] titular del hero en lg (`/impeccable typeset`).
3. [P2] `inputMode="numeric"` en el campo (requiere soporte del toolkit).
4. [P3] straggler y tamaño del wordmark.
5. Contenido de muestra a reemplazar: número de WhatsApp (`WHATSAPP_NUMERO`), 15 % y USD 120, logo (wordmark TEMPORAL) y foto de mostrador.
6. `ogFont` sigue en Manrope (no hay TTF de Lora/Oleo en `/fonts`).
