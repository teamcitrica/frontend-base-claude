# ADR-0008 — Catálogo de estilos y skill `citrica-landing`

- **Estado:** Aceptada
- **Fecha:** 2026-10-21

## Contexto

Levantar una marca nueva sobre esta base pasaba por `/brand-new` (entrevista libre y
rebrand manual del render) y luego por el ciclo SDD completo, con `impeccable` abriendo su
propia ronda de dirección en `/spec-plan`.

- La entrevista libre producía briefs dispares y una sola dirección. No había forma de
  comparar opciones antes de comprometer paleta, tipografía y estructura.
- El equipo trabaja con un repertorio conocido de estilos (minimalismo SaaS,
  neo-brutalismo, glassmorphism, suizo, bento, cyberpunk, lujo editorial, Y2K, aurora), pero
  ese repertorio circula descrito en clases de Tailwind, que el contrato prohíbe en layout.
- `impeccable` v4.1.3 no acepta "carriles estéticos enlatados" cuando crea un mundo nuevo,
  pero **hereda** un mundo establecido (`docs/design.md` coherente + surface brief con
  Direction contract) sin abrir torneo de conceptos.

## Decisión

Creamos la skill de proyecto `citrica-landing` (`.claude/skills/citrica-landing/`):

1. Pregunta solo brief, paleta y estilo, en una ronda.
2. El **catálogo de 9 estilos es opcional**: el usuario elige uno o deja que `impeccable`
   proponga la dirección (`/impeccable shape`).
3. Propone 2–3 **tarjetas de dirección** con una plantilla fija; el usuario elige.
4. Ejecuta los pasos de render de `/brand-new` desde la tarjeta elegida.
5. Escribe `docs/design.md` y `.impeccable/surfaces/landing.md` con el Direction contract
   **antes** del build, para que `impeccable` herede la dirección en vez de competir con ella.
6. Escribe la spec 0001 (spec, plan, tasks) respetando los gates, y entrega a `/spec-build`.

Precedencia: **contrato > estilo de catálogo > impeccable**. Los hex de los archivos de
estilo son entrada para `_palette.scss`, nunca valores para el código; las clases de
Tailwind del catálogo solo existen en la columna "origen" de `style-to-render.md`.

`/brand-new` se conserva como camino manual.

## Consecuencias

- Mejora: direcciones comparables antes de tocar código; menos preguntas; la forma de
  trabajar (primitivas, toolkit, tokens) viene incluida.
- Mejora: `shape` sigue siendo obligatorio en PLAN (ADR-0003) y es barato, porque hereda.
- Empeora: la skill duplica parte de `/brand-new`; un cambio en sus pasos hay que reflejarlo
  en ambos sitios.
- Riesgo: depende del comportamiento de `impeccable` 4.1.3 (herencia de mundo,
  `surface-brief.mjs`). Si cambia, la skill degrada a escribir el brief a mano; revisar este
  ADR al actualizar `impeccable`.
- Riesgo: los estilos con cliché conocido (lujo editorial, cyberpunk, aurora) exigen que la
  tarjeta rompa el cliché en algún eje, o `shape`/`audit` los marcarán.

## Alternativas consideradas

- **Previews HTML por opción** — descartado por ahora: más lento y deja rutas que borrar.
  Las tarjetas en markdown bastan para decidir.
- **El estilo manda siempre y se salta `impeccable`** — choca con ADR-0003.
- **Que la skill también construya** — duplicaría `/spec-build` y diluiría el gate de plan
  aprobado antes de código.
