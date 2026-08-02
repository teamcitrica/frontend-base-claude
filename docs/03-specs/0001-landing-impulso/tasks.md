# TASKS — SPEC-0001

Checklist ejecutable. Cada tarea cabe en una sesión y apunta a un criterio de
aceptación de la spec. Se marca al completarla, no al empezarla.

## Preparación

- [x] T-01 · Leer [contrato de implementación](../../01-design/implementation-contract.md) → *(prep)*
- [x] T-02 · Localizar tokens existentes que cubran la necesidad de color/tipo → *(prep)*
- [x] T-03 · Subir `$title-responsive.sm` de 22 a 24 px en `styles/10-tokens/web/components/_text.scss`; comprobar los 6 usos de `variant="title"` en web → **AC-11**
- [x] T-04 · Elegir y **verificar con `curl`** las URLs de Unsplash (hero + secciones); anotar id, autor y alt en la tabla de abajo antes de usarlas → **AC-10**

## Construcción — pasada 1 (mid-fi)

Cierra AC-1 a AC-10. Copy real, fotografía real, responsive, contraste y foco.

- [x] T-10 · `home.scss`: ritmo de sección apoyado en `.sections-paddings`, sin `clamp()` ni hex → **AC-4**
- [x] T-11 · `hero.tsx` — carbón a sangre, foto + overlay `color-mix()`, eyebrow, titular `display`, CTA a `#agenda` → **AC-3**, **AC-6**
- [x] T-12 · `prueba-social.tsx` — 3 métricas Anton naranja, sin cards, marcadas `ILUSTRATIVO` → **AC-7**
- [x] T-13 · `problema.tsx` — tres dolores concretos → **AC-1**
- [x] T-14 · `sistema.tsx` — "no es falta de esfuerzo, es falta de sistema" → **AC-1**
- [x] T-15 · `solucion.tsx` — "no es presencia, es flujo de comensales" → **AC-1**
- [x] T-16 · `metodo.tsx` — 4 pasos numerados (única numeración de la página) → **AC-1**
- [x] T-17 · `resultados.tsx` — "en 90 días…", métricas `ILUSTRATIVO` → **AC-1**
- [x] T-18 · `confianza.tsx` — credibilidad de operador → **AC-1**
- [x] T-19 · `garantia.tsx` — 90 días, sin letras pequeñas → **AC-1**
- [x] T-20 · `agenda.tsx` — formulario con validación en cliente y confirmación en pantalla, **sin red** → **AC-9**
- [x] T-21 · `site-footer.tsx` — carbón + línea de créditos Unsplash → *(decisión de la spec)*
- [x] T-22 · `app/page.tsx` — composición, `Header` con `impulsoNavLinks`, metadata desde `siteConfig` → **AC-1**, **AC-2**
- [x] T-23 · Repaso: todo CTA `primary` apunta a `#agenda`; ningún otro compite → **AC-2**
- [x] T-24 · Repaso en 390 px: sin scroll horizontal → **AC-8**

## Construcción — pasada 2 (polish)

Cierra AC-11. No empieza hasta que la pasada 1 esté revisada.

- [x] T-40 · Reveal del hero: titular escalonado + subrayado amarillo (~400 ms). El contenido es visible por defecto; el motion solo lo mejora → **AC-11**
- [x] T-41 · `prefers-reduced-motion` para toda animación (crossfade o instantáneo) → **AC-11**
- [x] T-42 · Foco visible en todo interactivo (outline 2px, offset 2px) → **AC-11**
- [x] T-43 · Contraste: naranja pequeño en `#A83E15`, nunca `#E8622C`; overlay 40–60 % bajo texto sobre foto → **AC-11**
- [x] T-44 · Anton nunca por debajo de 24 px en ningún breakpoint → **AC-11**

## Cierre

> Corre al final de la **pasada 2**, no de la 1.

- [ ] T-90 · Correr greps del contrato sobre los archivos tocados → *(DoD B)*
- [ ] T-91 · `npm run typecheck && npm run lint:check && npm run contract` → *(DoD A/B)*
- [ ] T-92 · Revisar responsive en sm/md/lg → *(DoD D)*
- [ ] T-93 · Revisar contraste y foco visible → *(DoD E)*
- [ ] T-94 · `/impeccable audit` sobre la landing y registrar hallazgos → *(DoD G)*
- [ ] T-95 · Pegar bloque de verificación en `spec.md` → *(DoD F)*
- [ ] T-96 · Mover estado de la spec a `done` en [el índice](../README.md) → *(DoD F)*

---

## Fotografía verificada

Se llena en T-04. Ninguna URL entra al código sin estar aquí con su `200`.

Verificadas dos veces: URL resuelve (`curl` → `200`) **y** contenido inspeccionado
visualmente descargando el archivo. Un `200` solo prueba que existe, no qué muestra.

| Sección | Photo ID | HTTP | Contenido verificado | Trabajo narrativo |
|---|---|---|---|---|
| `#hero` | `photo-1577219491135-ce391730fb2c` | 200 | Cocinero emplatando bajo lámparas de calor, cocina real, luz cálida | Las manos que trabajan. Escena del brief |
| `#problema` | `photo-1555396273-367ea4eb4db5` | 200 | Interior de restaurante con mesas mayormente vacías | El dolor, literal |
| `#resultados` | `photo-1600891964599-f61ba0e24092` | 200 | Mesa llena de platos vista cenital, madera cálida | El resultado, literal |

Arco: local vacío → manos trabajando → mesa llena.

> ⚠️ **Atribución por fotógrafo pendiente.** El CDN no expone el autor y la API de
> Unsplash necesita clave. El footer acredita a Unsplash de forma genérica; el crédito
> nominal queda pendiente y **no se inventa**. Ver pendientes de la spec.

---

## Bitácora de desvíos

Todo lo que apareció y no estaba en la spec. Si algo llega aquí, se actualiza la spec
antes de seguir — no se improvisa.

| Fecha | Qué apareció | Qué se hizo |
|---|---|---|
| 2026-08-01 | `design.md §8` recomienda 11 bloques; la spec fijaba 7 sin motivo registrado | Ampliado a 10 secciones + footer. Alcance y AC-1 actualizados en `spec.md` |
| 2026-08-01 | `text-title` mide 22 px en `sm` y usa Anton, contra la regla de ≥24 px de la constitución | Añadido T-03 para subir el token a 24 px. Sin ADR: es un valor de token en su archivo designado |
| 2026-08-01 | Fidelidad mid-fi elegida en `shape` deja AC-11 y motion fuera de la pasada 1 | Construcción partida en dos pasadas; VERIFY corre al final de la 2. Registrado en `spec.md` |
| 2026-08-01 | **`tailwind.config.js` no escanea `citrica-ui-toolkit`.** Ninguna clase responsive del toolkit (`md:flex`, `lg:flex`, `lg:hidden`…) se genera: comprobado, 0 ocurrencias en el CSS servido. El nav del `Header` queda oculto a cualquier ancho y siempre sale la hamburguesa | **Bloqueaba AC-1 y AC-2.** Añadido `./node_modules/citrica-ui-toolkit/dist/**/*.{js,mjs}` al `content`. Aprobado por el usuario. **Verificado en captura: el nav de 4 links + CTA aparece a 1440px** |
| 2026-08-01 | `siteConfig.name` es `"New Project"`; sale literal en el footer y en la metadata | `name` → "ImPulso" y `description` de marca. Aprobado por el usuario. Verificado en el footer |
| 2026-08-01 | Hero en desktop: `max-width: 24ch` en `.home__hero-body` parte el titular en 6 líneas y empuja el CTA fuera del fold a 1440×900 | `max-width: 15ch` en el titular y `38ch` en la bajada. El titular baja de 6 a 3 líneas y ambos CTA entran en el fold |
| 2026-08-01 | El botón secundario del hero (`flat`, luego `secondary`) era ilegible sobre la foto | Sustituido por enlace de texto subrayado con `textColor`. El contrato prohíbe re-estilar botones desde el SCSS de página, y un segundo botón competía con el CTA único |
| 2026-08-01 | El `Header` sin prop `logo` pinta un placeholder que dice "Matour" en blanco sobre header blanco | Logo real de la marca descargado a `public/img/logo-impulso.svg` y conectado |
| 2026-08-01 | Enlaces y botones no tenían foco visible: HeroUI anula el outline nativo y marca el foco con `data-focus-visible="true"`, no con `:focus-visible` | Regla con los dos selectores, alineada con la convención de `_accordion.scss` y `_calendar.scss`. Verificado con teclado |
| 2026-08-01 | **Regresión introducida y corregida en la misma pasada.** La regla de foco se aplicó a todo lo tabulable, incluidos los campos de formulario, con `!important`. Los inputs ya tenían foco propio del sistema (`_input.scss`: `[data-focus="true"]` → borde naranja de 2px) y el outline negro lo tapaba | Regla acotada a `a` y `button`. Causa raíz: la auditoría midió solo `outline` y `boxShadow`, nunca `border-color`, así que leyó "sin outline" como "sin indicador de foco". Medido después reposo vs foco: 0px `rgb(229,231,235)` → 2px `rgb(232,98,44)` |
| 2026-08-01 | Blanco sobre naranja en botones mide **3.38:1**, por debajo del 4.5 que pide texto pequeño | **Excepción aceptada por la constitución**: `product.md` documenta ese 3.4:1 para botones. Se subió el label de 11px a 14/16 con `textVariant="body"` para mejorar legibilidad. El ratio no cambia — cambiarlo exigiría tocar el naranja de marca |
