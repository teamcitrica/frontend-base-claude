# PLAN — SPEC-0002

> El *cómo*. Se escribe después de que la spec está `approved`, y se aprueba antes
> de escribir código.

## Enfoque

Borrado por evidencia, en tres pasadas independientes (estilos y config → TS huérfano →
documentación), cada una cerrada con `typecheck` y su grep de AC. Antes de tocar nada se
toman capturas de referencia con `npm run shot`, y al final se comparan con las nuevas:
el criterio de éxito es que **no cambie nada visible**.

Superficie `infra`: no aplica `/impeccable shape` ([ADR-0003](../../04-decisions/0003-impeccable-obligatorio.md)).

## Evidencia de investigación (2026-10-20)

- **Clases CSS:** ninguna de las clases a borrar aparece en `app/`, `shared/` ni `lib/`,
  ni la emite el toolkit (`grep` sobre `node_modules/citrica-ui-toolkit/dist/index.mjs`:
  0 coincidencias). La doc de `Sidebar` dice que usa `bg-sidebar`, pero el build del
  toolkit no la emite: la doc está desactualizada.
- **Cierre transitivo de TS:** ningún archivo fuera de la lista de borrado importa algo de
  ella. El único consumidor encontrado es el barrel `organisms/index.ts`, que reexporta
  `video` y se edita.
- **`IconSvgProps`** (el único contenido de `shared/types/index.ts`): 0 usos. Nadie importa
  `@/shared/types`.
- **`styles/themes/theme.scss`:** ningún `@import` lo carga.
- **`hero.ts`:** 0 consumidores. Tailwind es 3.4 y no usa `@plugin`.
- **Corrección a la spec:** `.card-container` vive en `08-components/components.scss`;
  `.bg-sidebar` y `.container-blue-principal`, en `11-atomic-design/components.scss`.
  La spec agrupaba las tres en `08-components`. Se corrige en T-03.

## Archivos que se tocan

### Se borran

| Archivo | Por qué |
|---|---|
| `styles/webpages-styles/sections.scss` | `.sections-paddings`, 0 usos |
| `styles/themes/theme.scss` (y la carpeta) | No lo importa nadie |
| `styles/07-objects/objects.js` | Duplica `Container`/`Col` del toolkit, 0 importadores, bug en `smPush` |
| `hero.ts` | Duplica el plugin de `tailwind.config.js`, 0 consumidores |
| `shared/project-components/quote-form.tsx` | 0 importadores |
| `app/hooks/useQuoteForm.ts` | Solo lo usaba `quote-form` |
| `app/hooks/useBookingManagement.ts` | Solo lo usaba `useQuoteForm` |
| `shared/project-components/calendar.tsx` | Solo lo usaba `quote-form` |
| `shared/components/organisms/animated-content.tsx` | Solo lo usaba `quote-form` |
| `shared/constants/phone-codes.ts` (y la carpeta) | Solo lo usaba `quote-form` |
| `shared/context/cart-context.tsx` | 0 importadores |
| `shared/components/examples/` (2 archivos y la carpeta) | 0 importadores |
| `shared/components/organisms/video.tsx` | Solo lo reexportaba el barrel |
| `app/hooks/useCalendarAvailability.ts` | 0 importadores |
| `shared/utils/general.tsx` | 0 importadores |
| `shared/types/types.ts` | 0 importadores |
| `shared/types/components/text.type.tsx` (y la carpeta) | 0 importadores |
| `shared/types/index.ts` | Solo contenía `IconSvgProps`, 0 usos |
| `app/home/components/section-typography.tsx` | Demo, 0 importadores, `color="#F00"` |
| `app/home/components/section-skeleton.tsx` | 0 importadores |

### Se editan

| Archivo | Qué cambia |
|---|---|
| `styles/custom.scss` | Quedan solo el comentario de cabecera y `@import './webpages-styles/home.scss';`. Salen las ~620 líneas muertas y el `@import` de `sections.scss` |
| `styles/08-components/components.scss` | Se vacía (`.card-container`). Se conserva el archivo y su `@import`: es una capa ITCSS de la base; la reorganización es de SPEC-0003 |
| `styles/11-atomic-design/components.scss` | Se vacía (`.bg-sidebar`, `.container-blue-principal`). Mismo criterio |
| `styles/01-settings/settings.scss` | Salen los `@import` de Roboto y Poppins. Se quedan Anton/Lato, Inter y los `@font-face` locales |
| `tailwind.config.js` | `heroui({ themes: {…} })` pasa a `heroui()` |
| `config/site.ts` | Una sola clave `navLinks` con los enlaces de ImPulso; salen `impulsoNavLinks`, `laMagentaNavLinks` y el `navLinks` de la masterclass (D-1) |
| `app/page.tsx` | `siteConfig.impulsoNavLinks` pasa a `siteConfig.navLinks` (D-1) |
| `package.json` · `yarn.lock` | `+ playwright` en `devDependencies` (D-2) |
| `shared/components/organisms/index.ts` | Sale `export { default as Video }` |
| `CLAUDE.md` | `impulso.scss` pasa a `home.scss`; los 7 enlaces `docs/*.md` pasan a `docs/01-design/reference/*.md` |
| `docs/rebranding.md` | Ejemplo de `custom.scss` sin `sections.scss` (l.165) |
| `docs/02-architecture/overview.md` | Sin `quote-form`, `calendar`, `cart-context`, `useQuoteForm` (l.53-54, 73) |
| `docs/00-harness/conventions.md` | El ejemplo `quote-form.tsx` pasa a `site-footer.tsx` (l.17) |
| `docs/01-design/reference/styles-overview.md` | Sin `themes/` (l.50) |
| `docs/01-design/reference/layout-system.md` | Sin el enlace a `section-typography.tsx` (l.561) |
| `docs/01-design/reference/citrica-ui-toolkit.md` | Sin la línea de `bg-sidebar` (l.953), que el toolkit no emite |
| `docs/01-design/reference/web-guide.md` | El ejemplo "MASTERCLASS: Introducción a la Fotografía" pasa a un ejemplo ImPulso (l.595) |
| `docs/01-design/reference/layout-examples.md` | "Agregar al Carrito" pasa a un CTA neutro (l.255) |
| `.claude/agents/design-guardian.md` | Sin la mención a `quote-form.tsx` como deuda (l.64) |

### No se tocan (confirmado fuera de alcance)

`styles/webpages-styles/panel.scss` (vacío, del admin), `/fonts`, `package.json`,
`app/api/*`, `app/layout.tsx`, todo `app/admin`, `app/panel`, `docs/03-specs/0001-*` y `docs/04-decisions/*`.

## Decisiones (aprobadas el 2026-10-20)

### D-1 — `navLinks` genérico en `config/site.ts` ✅ aprobada
`docs/rebranding.md`, `docs/01-design/reference/new-web-playbook.md` y `/brand-new`
mandan a editar **`siteConfig.navLinks`**. Pero el `navLinks` actual es el de la masterclass,
y el que se usa se llama `impulsoNavLinks`. Si solo se borra lo viejo, el boilerplate queda
con un nombre atado a la marca y la documentación apunta a una clave que no existe.

**Propuesta:** dejar una sola clave `navLinks` con el contenido de ImPulso, borrar
`impulsoNavLinks` y `laMagentaNavLinks`, y cambiar la referencia en `app/page.tsx`.
Es un renombrado de una línea, pero es un renombrado de algo vivo, y la spec lo excluía.
Con aprobación, se ajusta el alcance de la spec y el AC-1.

### D-2 — Playwright para `npm run shot` ✅ aprobada: `devDependency`
`node_modules/playwright` **no está instalado**, y AC-5 depende de `npm run shot`.
`CLAUDE.md` pide `yarn add -D playwright`, pero eso toca `package.json`, que está fuera
de alcance.

**Propuesta:** como excepción explícita, añadir `playwright` como `devDependency` en esta
spec. Es requisito documentado del harness, y un boilerplate debería traerlo de serie.
Alternativa: instalarlo aparte (fuera del repo) solo para esta verificación, sin tocar
`package.json`.

## Componentes y tokens

No aplica: no se escribe UI ni SCSS nuevo. El único cambio con efecto potencial en tokens
es el del tema HeroUI (ver riesgos).

## Riesgos

| Riesgo | Qué se rompe | Mitigación |
|---|---|---|
| Quitar el tema HeroUI cambia el `primary` de lima `#BEF264` al azul por defecto | En la landing, nada esperado: los componentes del toolkit pintan con tokens propios. **En el admin sí cambia:** `<Spinner color="primary">` (`app/admin/clientes/page.tsx:212`) y un `color="primary"` en `weekly-schedule-manager.tsx:253` pasan de lima a azul | Aceptado: la lima era de otra marca. Se anota en la verificación. AC-5 vigila la landing |
| Una clase CSS "muerta" se usa por un nombre construido dinámicamente | Un estilo desaparece en runtime | Grep negativo en `app/`, `shared/` y toolkit ya hecho. AC-5 y AC-6 lo detectarían |
| Turbopack o Sass falla por un `@import` a un archivo borrado | Toda la web sin estilos | Cada borrado de SCSS va con su `@import`. `npm run dev` y `shot` lo detectan al instante |
| Capturas no deterministas (animación del hero de 460 ms, fotos remotas de Unsplash) | Falsos positivos en la comparación de AC-5 | Comparar primero con `cmp`. Si difieren, inspección visual de ambas capturas (lectura de las PNG) y registro honesto de lo observado |
| Borrar `shared/types/index.ts` rompe algún `import … from "@/shared/types"` | Error de tipos | Grep previo: 0 importadores. `npm run typecheck` en T-06 |

## Alternativas descartadas

- **Borrar las capas `08-components` y `11-atomic-design` completas, con su `@import`.** Descartada: es reestructurar ITCSS, que es SPEC-0003. Vaciarlas tiene el mismo efecto sin decidir la arquitectura.
- **Dejar `navLinks` de la masterclass y no tocar `impulsoNavLinks`.** Descartada: deja la doc de rebranding apuntando a datos basura (ver D-1).
- **Un solo commit gigante.** Descartado: tres commits (estilos y config / TS / docs) permiten revertir por partes si AC-5 o AC-6 fallan.

## Impacto en la constitución

- [x] Ninguno: el plan cabe dentro de las reglas actuales y reduce deuda (quita hex muertos de SCSS fuera de `webpages-styles`)
- [ ] Requiere ADR: no
