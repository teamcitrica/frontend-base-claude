---
id: 0007
slug: landing-restoapp-sistema
titulo: Landing de Resto App construida solo con el sistema de diseño
estado: in-progress  # draft | approved | in-progress | done | dropped
creada: 2026-10-30
superficie: landing  # landing | admin | panel | auth | api | infra
---

# SPEC-0007 — Landing de Resto App construida solo con el sistema de diseño

> Ruta: `/test-3-sistema`. Brief: documento "brief testin skill" (Google Docs, leído el
> 2026-10-30). Dirección: "La cuenta clara" de `docs/design.md`, code-led (sin comp).
> Intención: `docs/product.md` y `docs/design.md` → *Surface: /test-3-sistema*.

## Problema

El dueño o encargado de un local en Venezuela abre el enlace desde WhatsApp en el
celular. Hoy opera la comanda en un programa, la caja en otro y el delivery en un
tercero, cuadra a mano al cierre y le pierde la pista a lo que se le va en comisiones.
Necesita entender en un minuto que todo eso sale de un solo cierre, ver **cuánto pierde
hoy en comisiones** y pedir una demo sin fricción.

Del lado del equipo: las dos landings anteriores (`/test-1-sin-brief`, `/test-2-corto`)
repiten en su SCSS de página los mismos gestos (ticket, fila punteada, cifra tabular,
banda de total, botón sobre azul). Cada landing nueva los vuelve a escribir.

## Por qué ahora

El brief pide probar que la base produce una landing **solo con tokens, primitivas y
componentes reutilizables**. Si sale, la siguiente landing de la marca se arma
componiendo, no escribiendo estilos.

## Alcance

**Componentes reutilizables** (en `shared/project-components/`, estilos en
`styles/08-components/` solo con tokens):

- **Botones de conversión:** demo por WhatsApp, prueba de 7 días (enlace), cotizar plan.
- **Tarjetas:** tarjeta ticket (papel) y tarjeta de módulo (icono + título + texto).
- **Filas de cuenta:** fila concepto/cifra, fila de dos columnas (antes / con Resto App)
  y banda de total.
- **Campos:** campo de monto (prefijo `USD` o sufijo `%`, solo dígitos).
- La lógica de la cuenta de comisión y de WhatsApp en un módulo compartido.

**Secciones de `/test-3-sistema`** (contenido del brief, sección 4):

1. **Header** con el logo real, anclas y CTA de demo.
2. **Hero:** H1 "Todo tu restaurante en un solo sistema. Sin comisiones por venta.",
   bajada del brief, CTA demo + CTA prueba 7 días, y un ticket "Cierre del turno" con
   los cuatro canales (datos **de muestra**, marcados).
3. **Cinta de canales:** "Diseñado para el ritmo real de restaurantes, dark kitchens,
   bares y cafeterías" + salón, mostrador, delivery y menú web con icono.
4. **Caos vs. un solo flujo:** las 4 filas de la matriz del brief.
5. **Operación en vivo:** comandero móvil, monitor de cocina (KDS), layout del local.
6. **Finanzas y cierre:** tesorería multi-divisa (VES/USD; Pago Móvil, Zelle, punto de
   venta, transferencias, efectivo) y costo real de empaques con el ejemplo del pedido
   de $12 **marcado como ejemplo** (ver Preguntas abiertas).
7. **Roles:** Super Admin, Administrador, Cajero, Mesero con alcance y bloqueo.
8. **La cuenta de la comisión:** la visitante escribe sus ventas del mes y el % de
   comisión que paga; ve cuánto pierde al mes y al año. Cierra con monto fijo, cero
   comisión, contrato anual y soporte (lun–sáb 9:00–20:00), y **"Cotiza tu plan fijo"**.
   Sin precio.
9. **Preguntas frecuentes:** las 4 del brief, en `Accordion`.
10. **Cierre** en azul: "Cuéntanos cómo trabaja tu local.", texto del brief, demo +
    prueba.
11. **Pie** con el logo light.

## Fuera de alcance

- Migrar `/test-1-sin-brief` y `/test-2-corto` a los componentes nuevos (queda como
  siguiente paso; esta spec no toca sus archivos).
- Cambios de paleta, fuentes o escala: el render global de Resto App no se toca.
- Fotos reales y capturas del sistema (KDS, layout de mesas, reportes): no existen; se
  representan con tickets de muestra y quedan pendientes.
- Precio mensual (el brief: "no hay precio público").
- Métricas de clientes, calificaciones, horas ahorradas, testimonios.
- Análisis de picos por hora (aparece en la estrategia de copy, no como sección).
- `config/site.ts`, admin, panel, páginas internas, modo oscuro.

## Criterios de aceptación

### AC-1 — Cero estilos de página
- **Dado** el build terminado
- **Cuando** busco estilos propios de la ruta
- **Entonces** `styles/webpages-styles/test-3-sistema.scss` no existe, `grep -r
  "test-3-sistema__" app/ styles/` da 0, no hay `style=` en `app/test-3-sistema/`, y
  `npm run contract` no suma violaciones.

### AC-2 — Componentes del sistema, solo con tokens
- **Dado** los componentes nuevos en `shared/project-components/` y su SCSS en
  `styles/08-components/`
- **Cuando** reviso su SCSS
- **Entonces** todo color, espacio, radio y duración sale de `var(--…)`; los únicos
  literales son el grosor de línea (1px/2px) y `0`; sin hex, `rgba()`, `clamp()` ni
  `font-family`. Cada pieza (botón, tarjeta, campo, fila) se usa en **al menos dos
  lugares** de la página o tiene props que la hacen reutilizable fuera de ella.

### AC-3 — Header y logo real
- **Dado** `/test-3-sistema` en sm/md/lg
- **Entonces** el header muestra `logo-resto-app.svg` (azul) con texto alternativo
  "Resto App", anclas a las secciones y CTA "Pedir demo"; en sm, menú hamburguesa.
  El pie y el cierre usan la versión light. Ningún "Matour" ni wordmark de texto.

### AC-4 — Hero y CTA en el fold
- **Dado** el primer viewport en sm (390×844), md y lg
- **Entonces** se ven el H1, la bajada y el CTA de demo dentro del fold
  (`npm run shot --cta`); el CTA de prueba está junto a él; el ticket de muestra dice
  que es de muestra.

### AC-5 — Secciones de contenido
- **Dado** las secciones 3–7 y 9
- **Entonces** cada una muestra el contenido del brief, sin cifras inventadas, con los
  componentes de fila/tarjeta; el ejemplo de $12 lleva la marca "Ejemplo".

### AC-6 — La cuenta de la comisión
- **Dado** el campo de ventas y el de % de comisión
- **Cuando** escribo ventas = 8000 y comisión = 15
- **Entonces** la cuenta muestra USD 1.200 al mes y USD 14.400 al año en comisiones,
  con cifras alineadas; con campos vacíos muestra 0 sin romperse; acepta solo dígitos
  (ventas hasta 9, % hasta 2) y anuncia el cambio (`aria-live`). Cierra con "Cotiza tu
  plan fijo", sin precio en la página.

### AC-7 — Conversión
- **Cuando** pulso cualquier CTA de demo o "Cotiza tu plan fijo"
- **Entonces** abre `https://wa.me/<número>?text=…` en pestaña nueva con
  `noopener,noreferrer` y el mensaje correspondiente;
- **Cuando** pulso "Prueba gratis 7 días"
- **Entonces** abre `https://restoapp.club/registro`.

### AC-8 — Responsive y verificación
- `npm run shot -- /test-3-sistema --cta …` pasa en sm/md/lg (sin scroll horizontal,
  sin imágenes rotas, sin errores de consola) y las capturas se revisan.

### AC-9 — Accesibilidad
- Texto ≥ 4.5:1 (medido), foco visible tabulando en todos los interactivos (incluido
  el `Accordion` y los campos), áreas táctiles ≥ 48px en sm, campos de 56px y 16px,
  `prefers-reduced-motion` respetado; typecheck 0.

## Restricciones heredadas

- [x] [Contrato de implementación](../../01-design/implementation-contract.md) — tokens-first, component-first
- [x] [Design system](../../design.md) — "La cuenta clara" y *Surface: /test-3-sistema*
- [x] [Producto](../../product.md) — *Surface: /test-3-sistema* (tono, anti-referencias)
- [x] Accesibilidad — ver [DoD sección E](../../00-harness/definition-of-done.md)

## Preguntas abiertas

Resueltas por el usuario el 2026-10-30, antes de aprobar:

- [x] **Ejemplo del pedido de $12:** solo lo legible del brief: pedido $12.00, insumos
  −$4.35, empaque −$0.80 y banda "Te queda $6.85" (la resta), marcado **Ejemplo**. El
  "4.45" cortado no se usa.
- [x] **Número de WhatsApp:** vacío (`wa.me/?text=…`, WhatsApp deja elegir contacto)
  hasta tener el real. Pendiente.
- [x] **Teléfono de atención:** no se muestra hasta tener el real. Pendiente.
- [x] **% de comisión inicial:** 15 %, editable, con la nota "valor de ejemplo" (el de
  referencia aprobado en la SPEC-0005).

## Verificación

> Se llena en la fase VERIFY. Salidas reales, no checks optimistas.
> Formato en [definition-of-done.md](../../00-harness/definition-of-done.md#bloque-de-reporte).

## Verificación — 2026-10-30

| Punto | Resultado |
|---|---|
| A. typecheck | ✅ 0 errores |
| A. lint:check | ✅ 7 errores / 733 avisos, los mismos de antes (baseline registrado 8); `app/test-3-sistema` y `shared/project-components/resto-app`: 0 problemas |
| A. build | ⚪ **No ejecutado**: `next.config.js` no tiene `distDir` propio y `next build` pisaría la `.next` del servidor de desarrollo en marcha (PID 36153, no levantado en esta sesión; el 2026-10-28 lo dejó en 500). Última ejecución (2026-10-28): falla en `/api/s3/presigned` por variables AWS, ruta no tocada |
| B. npm run contract | ✅ 35 (baseline 36), todas `hex-en-tsx` anteriores; 0 en los archivos de la spec |
| B. revisión visual | ✅ Todo texto con `Text`; layout con `Section`, `Grid`+`Cell`, `Container`+`Col`, `Stack`, `Cluster`, `AutoGrid`; toolkit: `Header`, `Button` (`href`), `Card`, `Input`, `Accordion`, `Icon name=…`; único `<div>`: el envoltorio `LandingShell` (`.c-landing`) |
| C. criterios | 8/9 ✅ · 1 ⚠️ (AC-3, detalle abajo) |
| D. responsive | ✅ `npm run shot -- /test-3-sistema --cta "#inicio .btn-primary"` exit 0; una pasada "Sin scroll horizontal, sin imágenes rotas, sin errores de consola", otra con el aviso intermitente "imágenes aún cargando a los 20s" (las dos imágenes, comprobadas en el navegador, terminan `complete`: es el logo lazy del pie). Capturas sm/md/lg (fold y completas) abiertas, más capturas por sección en sm (cuenta, finanzas, roles). Regresión por `_button.scss`: `/test-1-sin-brief` y `/test-2-corto` sin hallazgos; `/` exit 0 con sus avisos de siempre (Unsplash) |
| D. dark mode | — No aplica (fuera de alcance) |
| D. assets | ✅ Sin "Matour"; logo real de restoapp.club (azul en header, light en pie, `alt="Resto App"`); tickets de muestra con la marca "Muestra"/"Ejemplo" en el propio ticket; sin fotos |
| E. a11y | ✅ (detalle abajo) |
| F. docs | ✅ `product.md`/`design.md` (*Surface: /test-3-sistema*; sombra "Papel" ahora `--shadow-paper`), ruta y `resto-app/` en `docs/02-architecture/overview.md`. Sin ADR: no cambia ninguna regla (ver pendiente 4) |
| G. impeccable audit | ✅ corrido · 16/20 (Good) · 1 hallazgo atendido, 1 sancionado, 4 pendientes |

### C — criterios

- **AC-1** ✅ `styles/webpages-styles/test-3-sistema.scss` no existe; `grep "test-3-sistema__" app/ styles/` = 0; `style=` en la ruta = 0; únicas clases en la ruta: `u-measure-narrow` (6) y `u-measure-prose` (1), utilidades del sistema.
- **AC-2** ✅ `_resto-app.scss`: todo color, espacio, radio y sombra por `var(--…)`; únicos literales: grosores `1px`/`2px` (tras el desvío `--shadow-paper` y el offset del foco a `--space-1`, ver bitácora). Reuso: `TicketCard` ×7, `AccountRow` ×13 renderizadas (6 usos en 3 secciones), `CompareRow` ×8 (2 secciones), `ModuleCard` ×5 (2 secciones), `TotalBand` ×3, `ChannelTag` ×4, `AmountField` ×2, `DemoButton` ×2, `TrialButton` ×2, `BrandLogo` ×2; `QuoteButton` ×1 con props reutilizables. El secundario sobre `inverse` sale de `_button.scss`.
- **AC-3** ⚠️ Header con `logo-resto-app.svg`, anclas `#flujo` `#cuenta` `#preguntas`, CTA "Pedir demo" y hamburguesa en sm ✅. El **pie** usa la versión light ✅; el **cierre** no lleva logo (forma un solo bloque azul con el pie, que sí lo lleva). El AC pedía logo light en ambos: pendiente decidir si se añade al cierre o se ajusta el AC.
- **AC-4** ✅ H1, bajada, CTA demo y CTA prueba dentro del fold en sm/md/lg (`--cta` pasa); ticket con "Muestra".
- **AC-5** ✅ Canales, caos vs. un solo flujo (4 filas), operación (3 módulos), finanzas (tesorería, empaques y ejemplo de $12 con "Ejemplo": 12,00 − 4,35 − 0,80 = 6,85), roles (4) con el texto del brief; sin cifras inventadas.
- **AC-6** ✅ Ejercitado en el DOM: 8000 y 15 → "USD 1.200" al mes y "USD 14.400" al año; ventas vacías → USD 0; "12a3b4567890123" → "123456789" (9 dígitos); "150" en % → "15" (2 dígitos); `aria-live="polite"`; cierra con "Cotiza tu plan fijo"; sin precio en la página.
- **AC-7** ✅ 5 CTA son `<a target="_blank" rel="noopener noreferrer">`: demo → `https://wa.me/?text=Hola, quiero una demo de Resto App para mi local.`, cotizar → `…cotizar el plan fijo…`, prueba → `https://restoapp.club/registro`; el del Header (sin `href` en el toolkit) llama `window.open(url, "_blank", "noopener,noreferrer")`, interceptado al hacer clic.
- **AC-8** ✅ ver D.
- **AC-9** ✅ ver E; typecheck 0.

### E — accesibilidad

- **Contraste** medido en el navegador sobre el fondo efectivo de cada texto (22 combinaciones color/fondo/tamaño, lg): 0 por debajo del mínimo. Peores: texto del CTA coral 4.94:1, tag "Muestra" 5.35:1, bajada 6.14:1, texto secundario en papel 6.49:1. (Primera medición descartada: el lector de color no limpiaba el canvas y daba 1:1 falsos.)
- **Foco tabulando** (Tab real, 30 pulsaciones): logo, 3 anclas y CTA del Header, 2 CTA del hero, 2 campos, CTA cotizar, 4 cabeceras del FAQ, 2 CTA del cierre. Todos con `outline` 2px azul sobre crema y crema sobre azul; los campos con borde coral `rgb(249, 87, 56)` (`data-focus="true"`; la primera lectura cayó en mitad de la transición y se repitió).
- **Áreas táctiles** en sm (390): 13 controles visibles, 0 por debajo de 48px de alto o 44px de ancho; campos de 56px con texto de 16px.
- **`prefers-reduced-motion: reduce`** emulado: el acordeón abre sin animación (alto constante) y el botón primario sin transición.
- **Semántica:** un `h1`, `h2` por sección, `h3` en tarjetas y en el FAQ (corregido en esta verificación: el `Accordion` pintaba `h2`); `lang="es"`; `alt` en los dos logos.
- Las reglas de naranja/Anton de la DoD son de ImPulso: aquí no hay texto pequeño coral, ni blanco sobre coral, ni Anton, ni fotos con texto encima.

### G — `/impeccable audit` (detector por URL a 1440×900 y 390×844 + fuente)

| # | Dimensión | Puntaje | Hallazgo clave |
|---|---|---|---|
| 1 | Accesibilidad | 3 | Contraste, foco, áreas y reduced-motion medidos; falta landmark `<header>` (toolkit) |
| 2 | Rendimiento | 3 | Sin efectos caros; 2 SVG de 11 KB; todas las secciones son cliente (el toolkit lo exige) |
| 3 | Theming | 3 | Todo por tokens (fuente: 0 hallazgos); modo oscuro fuera de alcance |
| 4 | Responsive | 4 | Sin desborde en sm/md/lg; filas comparativas se apilan solas; áreas ≥ 48px |
| 5 | Integridad | 3 | Sistema coherente y reutilizado; H1 largo a tamaño display en lg |
| | **Total** | **16/20** | **Good** |

Hallazgos:
- **[P2] Encabezados del FAQ en `h2`** — **atendido** (`headingComponent: "h3"`).
- `cream-palette` — **sancionado**: crema de marca fijada por el cliente.
- **[P2] `oversized-h1` en lg** — 76px, 65 caracteres, 53 % del alto de pantalla. El copy es literal del brief y el CTA queda en el fold. Pendiente → `/impeccable typeset` (o acortar el H1 con el cliente).
- **[P3] Línea larga en el pie** — ~88 caracteres con `u-measure-prose`. Pendiente → `/impeccable polish`.
- **[P3] Stragglers** — 2 en lg ("anteriores.", "asignadas."), 8 en sm. Pendiente → `/impeccable polish`.
- **[P3] Sin landmark `<header>`** — el `Header` del toolkit no lo emite. Pendiente en el toolkit.

Pendiente, en orden:
1. **Build** (DoD A): correr `npm run build` con el servidor de desarrollo detenido; fallará en `/api/s3/presigned` hasta definir las variables AWS (fuera de esta spec), igual que 0005 y 0006.
2. **AC-3:** decidir si el cierre lleva también el logo light o si el AC se ajusta a "el pie".
3. [P2] H1 largo en lg; [P3] línea larga del pie, stragglers, landmark `<header>`.
4. **¿Norma?** Si "ruta sin SCSS de página, gestos como componentes en `08-components`" se adopta para las próximas landings: ADR + fila en `conventions.md` / mapa del contrato, y migrar 0005 y 0006 a `resto-app/`.
5. Contenido pendiente: número de WhatsApp, teléfono de atención, capturas reales del sistema (KDS, mesas, reportes) y cifras de muestra del ticket del hero.

**Re-verificación (2026-10-30, sin cambios de código desde la anterior de las 17:17):** typecheck 0 · lint:check 7 errores / 733 avisos · contract 35 · AC-1: `test-3-sistema.scss` no existe, `test-3-sistema__` = 0, `style=` = 0 · `npm run shot -- /test-3-sistema --cta "#inicio .btn-primary"` exit 0 con el aviso "imágenes aún cargando a los 20s" en sm/md/lg (el logo lazy del pie; ya comprobado `complete` en el navegador) · capturas sm y lg del fold abiertas, idénticas a la pasada anterior. Build sigue sin ejecutar (mismo motivo). Estado: `in-progress`.
