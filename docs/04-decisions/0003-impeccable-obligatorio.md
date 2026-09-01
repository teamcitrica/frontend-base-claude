# ADR-0003 — `impeccable` es obligatorio en el ciclo SDD, y el contrato le gana

- **Estado:** Aceptada
- **Fecha:** 2026-08-01

## Contexto

El harness sabía verificar la **implementación** (contrato de implementación + hook
`PostToolUse` + Definition of Done) pero no tenía nada que empujara la **calidad de
diseño**. Un cambio podía pasar las cuatro puertas —tokens correctos, `Text` en vez de
`<h1>`, `Container`/`Col`, cero hex— y aun así ser una pantalla mediocre: jerarquía
plana, ritmo inexistente, tipografía sin criterio.

El contrato responde "¿está bien implementado?". Nadie respondía "¿está bien diseñado?".

En la máquina existe la skill `impeccable` (v3.7.1), que cubre exactamente ese hueco y
además **ya lee la constitución de este repo**: resuelve `docs/product.md` y
`docs/design.md` correctamente y arranca del register `brand`.

Sus sub-comandos mapean sobre las fases del SDD casi sin fricción:

| Sub-comando | Qué es | Fase SDD |
|---|---|---|
| `shape` | "Design planning only. This command does NOT write code." | PLAN |
| `craft` | Construir con calidad de estudio, iterando en navegador | BUILD |
| `audit` | Auditoría a nivel de código, medible y verificable | VERIFY |

### Las colisiones que había que resolver primero

`impeccable` es una skill genérica: no conoce el contrato de este repo. Se verificaron
tres choques concretos antes de hacerla obligatoria:

1. **`clamp()`.** `impeccable` lo usa para titulares de hero (`SKILL.md:34`, techo de
   6rem). La regla `clamp-en-scss-de-pagina` del hook lo **bloquea** en
   `styles/webpages-styles/`, porque la escala tipográfica vive en `_text.scss`.
2. **Composición de paleta.** El Setup paso 5 de `impeccable` compone paletas en OKLCH
   cuando no encuentra colores de marca comprometidos. Aquí sí los hay
   (`_palette.scss`), así que su propia regla dice *"identity-preservation wins"* y debe
   saltarse el paso — pero su guía general sigue empujando a componer color.
3. **Ruta rota en el Setup.** Manda correr
   `node .agents/skills/impeccable/scripts/context.mjs`. En este repo **`.agents/` no
   existe**; la ruta que funciona es
   `node ~/.claude/skills/impeccable/scripts/context.mjs`.

Sin una regla de precedencia explícita, estas colisiones se resuelven por accidente:
gana quien haya leído último. Y como el hook bloquea de verdad, el resultado práctico
sería un build trabado a mitad de camino.

## Decisión

**1. `impeccable` es obligatorio en las tres fases donde hay superficie visual.**

| Fase | Comando | Cuándo |
|---|---|---|
| PLAN | `/impeccable shape` | Antes de escribir `plan.md`. No escribe código |
| BUILD | `/impeccable craft` | Al construir la UI |
| VERIFY | `/impeccable audit` | Antes de llenar el bloque de verificación |

Aplica a las specs cuya `superficie` sea `landing`, `admin`, `panel` o `auth`. Las de
`api` e `infra` quedan exentas: no hay interfaz que diseñar.

**2. Donde `impeccable` y el contrato de implementación choquen, gana el contrato.**

`impeccable` aporta **criterio de diseño**: jerarquía, ritmo, contraste, motion, densidad,
copy. No aporta criterio de implementación. En concreto:

- La escala tipográfica vive en `styles/10-tokens/web/components/_text.scss`. **No se
  escribe `clamp()`** en `styles/webpages-styles/`. Si una variante necesita otra escala,
  se cambia el token, no la página.
- El color vive en `styles/10-tokens/web/colors/_palette.scss`. **No se componen paletas
  nuevas** ni se introduce OKLCH suelto. Si falta un tono, se crea el token.
- El texto se renderiza con `Text` y el layout con `Container`/`Col`, aunque `impeccable`
  proponga markup propio.

Si una recomendación de `impeccable` es lo bastante buena como para justificar romper una
regla del contrato, **primero se escribe el ADR que cambia el contrato**, y después se
aplica. Nunca al revés.

**3. La ruta del script se documenta corregida.** En este repo:

```bash
node ~/.claude/skills/impeccable/scripts/context.mjs
```

## Consecuencias

**Mejora:** el harness pasa a tener una puerta de calidad de diseño, no solo de
implementación. Las tres fases quedan cubiertas por herramientas hechas para cada una,
en vez de por criterio improvisado. Y `impeccable` ya lee `product.md` y `design.md`, así
que arranca con las anti-referencias y los principios de marca cargados — no diseña en el
vacío.

**Empeora:** cada fase con superficie visual se hace más larga y más cara en tokens.
`craft` itera en navegador, lo que suma tiempo real. Para un cambio de UI pequeño el
proceso queda claramente sobredimensionado — por eso siguen valiendo las excepciones del
flujo SDD (typo, copy, valor de token, cambio mecánico): si no hace falta spec, tampoco
hace falta `impeccable`.

**Riesgo:** `impeccable` se actualiza por fuera de este repo. Una versión futura puede
introducir guía nueva que choque con el contrato sin que nadie lo note, porque el hook
solo detecta lo que sabe detectar — `clamp()` y hex sí; "compón una paleta OKLCH" no.
La regla de precedencia mitiga pero no elimina esto. Al actualizar la skill conviene
releer este ADR.

## Alternativas consideradas

- **Obligatorio solo en BUILD.** Descartada: el peor error de diseño no se comete
  escribiendo el componente, sino decidiendo la estructura. `shape` en PLAN es justo el
  momento en que corregir sale barato.
- **Relajar el hook para que `impeccable` pueda escribir `clamp()` en SCSS de página.**
  Descartada: reabre la escala tipográfica en dos sitios, que es exactamente lo que
  [ADR-0001](0001-contrato-fuente-unica.md) cerró. La fuente única vale más que la
  comodidad de una skill externa.
- **Precedencia caso por caso.** Descartada: reintroduce la improvisación que el harness
  existe para eliminar. Una regla que se decide cada vez no es una regla.
- **Dejarlo como recomendación.** Descartada: ya era técnicamente posible usar
  `impeccable` y no se usaba. Una recomendación que nadie ejecuta no es una puerta.
