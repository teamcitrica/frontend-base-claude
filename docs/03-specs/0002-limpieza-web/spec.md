---
id: 0002
slug: limpieza-web
titulo: Limpieza de residuos de proyectos anteriores (web)
estado: in-progress  # draft | approved | in-progress | done | dropped
creada: 2026-10-20
superficie: infra    # sin cambio visual: ver "Superficie" abajo
---

# SPEC-0002 — Limpieza de residuos de proyectos anteriores (web)

## Problema

Este repo es el **boilerplate** del que salen los próximos proyectos de Citrica. Hoy
arrastra código, estilos y configuración de proyectos anteriores (una "masterclass",
"La Magenta", un cotizador de estudio, un carrito) que nadie usa, mezclados con la base
real y con la marca de ejemplo.

Quien trabaja sobre la base —una persona o un agente— no puede distinguir lo vivo de lo
muerto:

- Un agente que lee `styles/custom.scss` encuentra ~600 líneas con hex literales y
  clases como `.pricing-section` o `.gallery-section`, y las toma como patrón válido,
  aunque contradicen el contrato de implementación.
- Un desarrollador que busca "dónde va el nav" encuentra tres listas en `config/site.ts`
  (`navLinks` con "CURSO / EXÁMEN / REDDI", `laMagentaNavLinks`, `impulsoNavLinks`) y
  no sabe cuál se usa.
- Cada proyecto nuevo hereda esa basura y la multiplica.

## Por qué ahora

Es la fase 1 del refactor de la web (tokens → primitivas de layout → tooling de IA).
Las fases siguientes mueven y renombran estilos y componentes; hacerlo con el ruido
encima obliga a migrar código muerto o a decidir caso por caso si es basura.

## Superficie

`infra`: la spec **no cambia lo que se ve**. Solo borra lo que no se renderiza.
Por eso no aplica `impeccable` ([ADR-0003](../../04-decisions/0003-impeccable-obligatorio.md)),
pero sí la comprobación visual de antes/después con `npm run shot` (AC-5). Si durante el
build algo resulta tener efecto visual, se para y se actualiza la spec.

## Alcance

Se borra **solo lo que tiene cero usos**, comprobado con grep en `app/`, `shared/`,
`lib/` y `config/`. Un archivo que solo usaba otro archivo borrado también se borra
(huérfano transitivo).

**1. Estilos y configuración web**

- `styles/custom.scss`: todas las reglas muertas de proyectos anteriores (`.masterclass-hero`,
  `.section-title`, `.content-cards`, `.gallery-section`, `.benefits-section`,
  `.instructor-section`, `.testimonial-section`, `.pricing-section`, `.whatsapp-float`,
  `.bg-black-gradient`, `.max-character-width`). El archivo **se conserva** como punto de
  `@import` de los SCSS de página.
- `styles/08-components/components.scss` (`.card-container`) y
  `styles/11-atomic-design/components.scss` (`.bg-sidebar`, `.container-blue-principal`):
  reglas sin uso y con hex. Los archivos se vacían pero se conservan como capas ITCSS.
- `styles/themes/theme.scss` (un `$color-primary` suelto sin consumidores).
- `styles/webpages-styles/sections.scss` (`.sections-paddings`, sin uso).
- `styles/07-objects/objects.js`: duplica `Container`/`Col` del toolkit, nadie lo
  importa y trae un bug (`smPush` genera `o-col-N@sm` en vez de `o-col-push-N@sm`).
- `@import` de Google Fonts sin uso en `styles/01-settings/settings.scss`: **Roboto** y
  **Poppins**. Se quedan Anton/Lato (web) e Inter (admin).
- `config/site.ts`: una sola clave genérica **`navLinks`** con los enlaces de ImPulso
  (D-1, aprobada el 2026-10-20). Se borran el `navLinks` de la masterclass ("CURSO /
  EXÁMEN / REDDI…"), `laMagentaNavLinks` e `impulsoNavLinks`, y `app/page.tsx` pasa a
  leer `siteConfig.navLinks`. Es lo que ya esperan `docs/rebranding.md`, el playbook y
  `/brand-new`.
- `hero.ts` en la raíz: duplica el plugin HeroUI de `tailwind.config.js` y nadie lo
  consume (es el patrón `@plugin` de Tailwind v4; aquí se usa v3.4).
- Primario lima `#BEF264` de HeroUI en `tailwind.config.js`: se quita el bloque `themes`
  y HeroUI usa su default (P-2). Si AC-5 muestra cualquier diferencia, se para y se decide.

**2. Componentes, hooks y tipos huérfanos**

- `shared/project-components/quote-form.tsx`, más lo que solo existía para él:
  `app/hooks/useQuoteForm.ts`, `app/hooks/useBookingManagement.ts`,
  `shared/project-components/calendar.tsx`, `shared/components/organisms/animated-content.tsx`
  y `shared/constants/phone-codes.ts`.
- `shared/context/cart-context.tsx`
- `shared/components/examples/` (`button-message.tsx`, `form-components-example.tsx`)
- `shared/components/organisms/video.tsx` y su `export` en `organisms/index.ts`
- `app/hooks/useCalendarAvailability.ts`
- `shared/utils/general.tsx`, `shared/types/types.ts`, `shared/types/components/text.type.tsx`
  y `IconSvgProps` en `shared/types/index.ts`, si sigue sin uso.
- `app/home/components/section-typography.tsx` (demo con `color="#F00"` y un placeholder
  "prueba de que sirve johan") y `app/home/components/section-skeleton.tsx`.

**3. Documentación que apunta a lo borrado**

Toda referencia en `docs/`, `.claude/` y `CLAUDE.md` a un archivo o clase borrados se
actualiza o se quita, para que ningún documento mande a buscar algo que ya no existe.
Las specs cerradas (`0001-*`) y los ADR **no** se reescriben: son historia.

Además (P-1):

- **Punteros rotos de `CLAUDE.md`.** La única página de referencia es ImPulso, y su SCSS
  es `styles/webpages-styles/home.scss`; `impulso.scss` no existe. Se corrige ese puntero
  y los siete enlaces a `docs/*.md` que en realidad viven en `docs/01-design/reference/`
  (`citrica-ui-toolkit`, `layout-examples`, `layout-system`, `layout-visual-guide`,
  `styles-overview`, `tokens-examples`, `tokens-system`).
- **Ejemplos de proyectos anteriores en la documentación:** "MASTERCLASS: Introducción a
  la Fotografía" (`docs/01-design/reference/web-guide.md`) y "Agregar al Carrito"
  (`docs/01-design/reference/layout-examples.md`). Se reemplazan por ejemplos de ImPulso
  o neutros. Ampliado en el build (2026-10-20): también "Contenido del Taller / fotografía"
  (`web-guide.md`) y "Tatuajes / Piercings" (`layout-examples.md`, `tokens-examples.md`),
  restos de otros dos proyectos, y las `className` a clases borradas en esos ejemplos.
  "Gáliz" y "Flowblox" en `citrica-ui-toolkit.md` se quedan: son defaults y nombres reales
  del toolkit, igual que "Matour".
- Las menciones a "Matour" **se quedan**: documentan un comportamiento real del `Header`
  del toolkit sin `logo`, no son residuo.

## Fuera de alcance

- **ImPulso.** Es la marca de ejemplo del boilerplate: `app/home/`, `home.scss`, la paleta,
  el contenido de sus enlaces de navegación, `logo-impulso.svg` y `docs/product.md`/`design.md` no se tocan.
  `/brand-new` la reemplaza al arrancar cada proyecto.
- **S3 / video:** `app/api/s3/*`, `shared/project-components/s3-video.tsx`, `shared/utils/s3.ts`.
- **Demo y código comentado:** `app/api/demo`, `app/api/contexts/AvailabilityContext.tsx` y
  los bloques `// DESCOMENTAR PARA USAR SUPABASE` de `app/layout.tsx`.
- **`/fonts`:** Manrope (la usa la imagen OG) y Sansation, con sus `@font-face`, se quedan.
- **`package.json`:** no se quita ninguna dependencia, aunque alguna quede sin uso
  después de esta limpieza (p. ej. `gsap`, `video.js`). Se anotan para una spec aparte.
  **Única excepción (D-2, aprobada el 2026-10-20):** se añade `playwright` como
  `devDependency`, porque `npm run shot` lo requiere y el boilerplate debe traerlo de serie.
- **Admin / panel:** todo `app/admin/`, `app/panel/`, `styles/10-tokens/admin/`, y los
  hooks que el admin todavía usa (`useStudioConfig`, `useStudioAvailability`, …).
- Las 36 violaciones de contrato existentes en admin/organisms (ADR-0002).
- Cualquier otro refactor, renombrado o movimiento de archivos vivos, aparte de D-1 (incluidos los de
  `docs/01-design/reference/`). Eso es SPEC-0003 en adelante.

## Criterios de aceptación

### AC-1 — Cero rastro de lo borrado
- **Dado** el repo después del build
- **Cuando** se corre `grep -rnE "masterclass|laMagenta|impulsoNavLinks|REDDI|card-container|container-blue-principal|sections-paddings|quote-form|cart-context|section-typography|BEF264" app shared lib config styles tailwind.config.js`
- **Entonces** no devuelve ninguna línea, y `grep -c "navLinks:" config/site.ts` devuelve `1`.

### AC-2 — Los archivos borrados no existen
- **Dado** la lista de archivos de la sección *Alcance* (puntos 1 y 2)
- **Cuando** se corre `ls` sobre cada ruta
- **Entonces** todas responden `No such file or directory`, salvo `styles/custom.scss`,
  que existe y solo contiene `@import`s y comentarios.

### AC-3 — Tipos en cero
- **Dado** el repo después del build
- **Cuando** se corre `npm run typecheck`
- **Entonces** sale con código 0 y 0 errores (igual que la baseline).

### AC-4 — Lint y contrato no empeoran
- **Dado** la baseline de 8 errores de lint y 36 violaciones de contrato
- **Cuando** se corren `npm run lint:check` y `npm run contract`
- **Entonces** lint da ≤ 8 errores y el contrato ≤ 36 violaciones, sin ninguna regla nueva.

### AC-5 — La landing se ve igual
- **Dado** capturas de `npm run shot` tomadas **antes** de empezar el build (`sm`, `md`, `lg`)
- **Cuando** se vuelve a correr `npm run shot` al terminar
- **Entonces** sale con código 0 (sin scroll horizontal, CTA dentro del fold, sin imágenes
  rotas ni errores de consola), y las capturas de antes y después son visualmente
  idénticas en los tres breakpoints.

### AC-6 — Las rutas vivas siguen respondiendo
- **Dado** `npm run dev` corriendo
- **Cuando** se piden `/`, `/login`, `/forgot-password`, `/new-password`, `/signup`, `/admin` y `/panel`
- **Entonces** cada una responde sin error de compilación ni error de consola nuevo
  respecto de antes del build.

### AC-7 — Ningún documento apunta a lo borrado
- **Dado** los archivos borrados
- **Cuando** se busca cada nombre de archivo en `docs/` (excepto `docs/03-specs/0001-*`),
  `.claude/` y `CLAUDE.md`
- **Entonces** no queda ninguna referencia que trate al archivo como existente.

### AC-8 — Todo enlace de `CLAUDE.md` y `README.md` resuelve
- **Dado** el repo después del build
- **Cuando** se extrae cada ruta `docs/…`, `styles/…` y `.claude/…` citada en `CLAUDE.md` y
  `README.md` y se comprueba con `test -e`
- **Entonces** todas existen, y `grep -rniE "masterclass|carrito" docs .claude CLAUDE.md`
  (excluyendo `docs/03-specs/` y `docs/04-decisions/`) no devuelve nada; tampoco `grep -rniE "tatuaj|piercing|taller"` con las mismas exclusiones.

## Restricciones heredadas

- [x] [Contrato de implementación](../../01-design/implementation-contract.md): la limpieza no puede introducir violaciones nuevas
- [x] [ADR-0005](../../04-decisions/0005-arranque-de-marca.md): `_palette.scss` no se toca (ni valores ni nombres)
- [x] [ADR-0002](../../04-decisions/0002-verificacion-pendiente.md): regla de no añadir deuda; typecheck se mantiene en cero

## Preguntas abiertas

- [x] ~~**P-1 — Punteros rotos de `CLAUDE.md`.**~~ Resuelta (2026-10-20): entran en esta
      spec. Solo se mantiene ImPulso como página de referencia (`home.scss`), y se limpia todo
      rastro de proyectos anteriores, también en la documentación.
- [x] ~~**P-2 — Color primario de HeroUI.**~~ Resuelta (2026-10-20): se quita el bloque
      lima y se acepta el default de HeroUI. AC-5 vigila el efecto visual.
- [x] ~~**P-3 — ¿`hero.ts` tiene consumidor?**~~ Resuelta: grep en todo el repo sin
      resultados y Tailwind es v3.4 (sin `@plugin`). Pasa al alcance.

## Verificación

> Se llena en la fase VERIFY. Salidas reales, no checks optimistas.
> Formato en [definition-of-done.md](../../00-harness/definition-of-done.md#bloque-de-reporte).
