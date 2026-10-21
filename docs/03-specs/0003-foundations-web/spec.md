---
id: 0003
slug: foundations-web
titulo: Tokens de fundamentos para la web (espaciado, radios, motion, medida)
estado: in-progress  # draft | approved | in-progress | done | dropped
creada: 2026-10-20
superficie: infra    # sin cambio visual: ver "Superficie" abajo
---

# SPEC-0003 — Tokens de fundamentos para la web

## Problema

Quien construye una página nueva sobre el boilerplate, sea una persona o un agente con
`impeccable`, no encuentra una escala de diseño compartida, salvo para color y tipo:

- **El espaciado vive dentro de la landing.** Los 8 `--home-space-*` (36 usos) están
  declarados en `.home` ([home.scss:8-20](../../../styles/webpages-styles/home.scss)).
  Una página nueva no los hereda: los copia con otro prefijo o inventa valores propios,
  y cada proyecto termina con su propia escala.
- **Radios, duraciones y medidas de lectura se escriben a mano**: 12px de radio en 3
  sitios, 200/400/460ms y una `cubic-bezier` repetida, 68ch y 52ch como clases de página.
  Nadie sabe si 12px es "el radio" o un número suelto.
- **La documentación contradice la pantalla.** `docs/design.md` (que lee `impeccable`)
  dice escala de 8pt, radio de 8px y grid de 1200–1280px con gutter de 24px. El código
  usa 4pt, 12px y 1366px con gutter de 56px. `brand.md` además lista nombres
  (`--space-2`, `--radius-pill`) que no existen. El agente propone valores que no están
  en el sistema, y el desarrollador no sabe a cuál de los dos creerle.

## Por qué ahora

Es la fase 2 del refactor de la web. SPEC-0004 (primitivas de layout: `Section`, `Stack`,
`Grid`…) necesita consumir una escala global; sin esta spec, las primitivas nacerían
atadas a `--home-*` o con valores inventados.

## Superficie

`infra`: la spec **no cambia lo que se ve**. Mueve valores que ya se renderizan a tokens
globales con el mismo resultado. No aplica `impeccable` (ADR-0003), pero sí la
comparación byte a byte de `npm run shot` (AC-5), que en SPEC-0002 se demostró
determinista en la landing.

## Decisiones tomadas (entrevista 2026-10-20)

| Tema | Decisión |
|---|---|
| Escala | **4pt** |
| Nombres de espaciado | **Numéricos alineados con Tailwind**: `--space-N` = N × 4px, así que `gap-6` de Tailwind y `var(--space-6)` valen lo mismo (24px) |
| Radios | **Manda la pantalla**: los tokens toman los valores que hoy se renderizan; se corrige `design.md` |
| Familias | Espaciado y ritmo de sección, radios, motion, medida de lectura |
| Documentación | Un **ADR-0006** ("la documentación de diseño refleja el render") corrige espaciado, radios, motion y grid en `design.md`. `brand.md` es un ejemplo de brand book y se actualiza después (decisión del 2026-10-20) |

**Regla de consumidores:** todo token **semántico** (ritmo, radio, motion, medida) nace
con al menos un consumidor real en esta spec. La escala numérica `--space-*` es la
excepción: se define completa (11 pasos, de 4 a 128px) porque es la regla de medir que
comparte con Tailwind, aunque hoy no se usen todos los pasos.

## Alcance

1. **ADR-0006** escrito y aceptado **antes** de tocar código, porque cambia la constitución
   (`design.md`).
2. **Tokens globales de la web**, emitidos en `:root` como el resto, en
   `styles/10-tokens/web/` (la ubicación exacta la fija el plan):
   - Escala: `--space-1` (4), `-2` (8), `-3` (12), `-4` (16), `-6` (24), `-8` (32),
     `-10` (40), `-12` (48), `-16` (64), `-24` (96), `-32` (128).
   - Ritmo de sección: `--section-y-tight` (40), `--section-y` (64) y `--section-y-airy` (96),
     los valores actuales de `.home__section*`.
   - Radios: `--radius-md` (12px, media y superficies) y `--radius-pill` (999px). El radio
     de inputs sigue en `_form.scss`; el de botón pasa a `--form-radius-btn: var(--radius-pill)`,
     con el mismo valor, para que el token nazca con consumidor (aprobado el 2026-10-20).
   - Motion: `--duration-fast` (200ms, hover), `--duration-base` (400ms, trazo del
     subrayado), `--duration-slow` (460ms, reveal del hero) y `--ease-out`
     (`cubic-bezier(0.25, 1, 0.5, 1)`).
   - Medida de lectura: `--measure-prose` (68ch) y `--measure-narrow` (52ch).
3. **Migración de `home.scss`** a esos tokens: desaparecen los `--home-space-*` y
   `--home-section-y`, y los literales de radio, duración, curva y medida pasan a tokens.
   Los valores que son **gestos de página** se quedan donde están, comentados como tales
   (p. ej. 92svh del hero, 15ch y 38ch del titular, delays del stagger, 44px de área
   táctil, 0.14em del subrayado).
4. **Documentación:**
   - `design.md` (frontmatter y secciones 5, 6 y 7), según ADR-0006.
   - El mapa de archivos del [contrato](../../01-design/implementation-contract.md).
   - `docs/01-design/reference/tokens-system.md`.

## Fuera de alcance

- **Primitivas de layout** (`Section`, `Stack`, `Cluster`, `Grid`…) y cualquier cambio de
  markup en `app/`: SPEC-0004.
- **Cambiar el grid en código** (`$container__width`, gutters, paddings, breakpoints):
  solo se **documenta** el valor real.
- **Configurar Tailwind** (`theme.extend`, `screens`): no hace falta, porque la escala ya
  coincide con la de Tailwind por diseño.
- **Elevación, sombras, z-index, opacidad**: hoy no tienen consumidores en la web. Los
  placeholders vacíos de `settings.scss` (`$border-radious-*`, `$elevation-level-*`,
  `$opacity-*`) se quedan; su limpieza va con SPEC-0005.
- **Admin y panel**: `styles/10-tokens/admin/` y todo `app/admin`, `app/panel`.
- `_palette.scss` y `_text.scss`. De `_form.scss` solo cambia la línea de `--form-radius-btn` (mismo valor).
- **`docs/01-design/brand.md`**: es un ejemplo de brand book y se actualiza más adelante. Sigue
  teniendo un bloque conceptual con `--space-1: 8px` que **no** coincide con el token real (4px);
  queda anotado como pendiente.
- Reglas nuevas en el hook (p. ej. prohibir px literales en SCSS de página): SPEC-0005.
- Tipografía fluida o `clamp()`.

## Criterios de aceptación

### AC-1 — La escala existe y es global
- **Dado** la landing corriendo
- **Cuando** se evalúa en la consola del navegador `getComputedStyle(document.documentElement).getPropertyValue('--space-6')`
  (y lo mismo con `--space-1`, `--space-32`, `--section-y`, `--measure-prose` y un token de radio y uno de motion)
- **Entonces** devuelven `24px`, `4px`, `128px`, `64px`, `68ch` y sus valores definidos,
  leídos desde `:root`, no desde `.home`.

### AC-2 — `home.scss` ya no tiene escala propia
- **Dado** el repo después del build
- **Cuando** se corre `grep -nE -- "--home-(space|section)" -r styles app`
- **Entonces** no devuelve nada, y `grep -nE "cubic-bezier|border-radius: [0-9]+px|[0-9]+ms" styles/webpages-styles/home.scss`
  solo devuelve líneas marcadas con un comentario de gesto de página.

### AC-3 — Cero cambio visual
- **Dado** capturas de `npm run shot -- / --cta "#hero button"` tomadas antes del build
- **Cuando** se toman de nuevo al terminar
- **Entonces** `shot` sale con código 0 y los 6 pares son idénticos byte a byte (`cmp`).

### AC-4 — La documentación dice lo que se renderiza
- **Dado** el repo después del build
- **Cuando** se busca en `docs/design.md`
- **Entonces** la escala dice 4pt; el radio de card y media, 12px; el grid, 1366px con
  gutter de 56px y padding de 112px en `lg`; y cada nombre de token citado como real
  existe en `styles/` (comprobado con grep nombre por nombre). `brand.md` queda excluido.

### AC-5 — Puertas sin regresión
- **Dado** la baseline (typecheck 0, lint 7, contrato 35)
- **Cuando** se corren `npm run typecheck`, `npm run lint:check` y `npm run contract`
- **Entonces** typecheck da 0, lint ≤ 7 y contrato ≤ 35, sin reglas nuevas.

### AC-6 — ADR antes que código
- **Dado** el historial de la rama
- **Cuando** se mira `git log`
- **Entonces** el commit del ADR-0006 es anterior a cualquier commit que toque `styles/`.

## Restricciones heredadas

- [x] [Contrato de implementación](../../01-design/implementation-contract.md): sin hex, sin `clamp()` ni `font-family` en SCSS de página
- [x] [ADR-0001](../../04-decisions/0001-contrato-fuente-unica.md): las reglas viven en un solo sitio; los valores de fundamentos también
- [x] [ADR-0005](../../04-decisions/0005-arranque-de-marca.md): `_palette.scss` no se toca
- [x] [Design system](../../design.md): se **modifica**, vía ADR-0006

## Preguntas abiertas

- [x] ~~**P-1 — Nombres de radio y motion.**~~ Resuelta (2026-10-20): nombres de escala.
      `--radius-md` (12px) y `--radius-pill` (999px); `--duration-fast` (200ms),
      `--duration-base` (400ms), `--duration-slow` (460ms) y `--ease-out`
      (`cubic-bezier(0.25, 1, 0.5, 1)`).
- [x] ~~**P-2 — ¿Ritmo de sección responsive?**~~ Resuelta (2026-10-20): fijo en esta spec
      (64/40/96px en los tres breakpoints). Hacerlo responsive es una mejora de diseño para
      otra spec, con `impeccable`.

## Verificación

> Se llena en la fase VERIFY. Salidas reales, no checks optimistas.
> Formato en [definition-of-done.md](../../00-harness/definition-of-done.md#bloque-de-reporte).
