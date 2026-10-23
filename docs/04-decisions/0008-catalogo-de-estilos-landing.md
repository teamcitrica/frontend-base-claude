# ADR-0008 — Catálogo de estilos y skill `citrica-landing`

- **Estado:** Aceptada
- **Fecha:** 2026-10-21 · revisada 2026-10-23 tras el primer dry-run

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

1. Pregunta **una** cosa: el brief (o nada, si viene en el argumento). Voz, paleta y
   tipografía se derivan del estilo elegido.
2. El usuario **elige mirando**: una página de decisión en el navegador
   (`serve-question.mjs` de impeccable) con las 9 imágenes del catálogo y una tarjeta
   "que impeccable proponga". Sin navegador, las imágenes se muestran en el chat.
3. **La imagen elegida es el comp aprobado.** Se registra con `build-phase.mjs start
   --comp`, `comp-spec` la divide en regiones, y `/spec-build` construye el hero medido
   contra ella con `comp-diff` (≥ 0.72). La composición, la escala y los materiales de la
   imagen se respetan; el copy, la paleta de la marca y las fotos se sustituyen.
4. Si elige impeccable, este propone tres estructuras propias (`concept-seed.mjs --scope
   surface`) con esquema y foto buscada; los comps se generan solo si existe
   `OPENAI_API_KEY`, avisando el coste.
5. Ejecuta los pasos de render de `/brand-new` desde el estilo, escribe `docs/design.md`,
   el Direction contract y la spec (gates intactos), y entrega a `/spec-build`.
6. **Modo ruta** (`--ruta <slug>`): misma skill sin borrar nada, para probar una dirección
   junto a la landing existente.

Precedencia: **contrato > imagen elegida > craft-floor de impeccable**. La imagen puede
pedir texto cromado, sombra dura o vidrio; se construye con tokens. La regla de "romper el
cliché" que traía el catálogo se retira: si el usuario eligió esa imagen, quiere esa imagen.

Las fuentes de Google se cargan con `next/font` (`lib/fonts.ts`); el `@import url()` en
SCSS lo descarta Turbopack. Los componentes que importan el toolkit llevan `"use client"`.

`/brand-new` se conserva como camino manual.

## Consecuencias

- Mejora: el usuario ve antes de decidir y la landing se parece a lo que vio; la
  fidelidad se mide, no se opina.
- Mejora: una pregunta en vez de cuatro; la forma de trabajar (primitivas, toolkit,
  tokens) viene incluida.
- Empeora: la skill duplica parte de `/brand-new`; un cambio allí hay que reflejarlo aquí.
- Empeora: sin generación de imágenes, los **plates** de la imagen (figuras 3D, mockups)
  no se pueden producir: se sustituyen por fotos reales en su lugar o por un hueco honesto,
  y el gate `plates` puede exigir `advance --force` con palabras del usuario.
- Riesgo: depende de impeccable 4.1.3 (`serve-question`, `build-phase`, `comp-diff`,
  herencia de mundo). Si cambia, la skill degrada a chat + build code-led; revisar este
  ADR al actualizar impeccable.

## Alternativas consideradas

- **Tarjetas de dirección en markdown** — fue la primera versión; el usuario eligió a
  ciegas y la landing no se pareció a la imagen. Descartado.
- **Previews HTML construidos por opción** — más lento que la página de decisión y deja
  rutas que borrar; la imagen del catálogo ya es el preview.
- **El estilo manda siempre y se salta `impeccable`** — choca con ADR-0003.
- **Que la skill también construya** — duplicaría `/spec-build` y diluiría el gate de plan
  aprobado antes de código.
