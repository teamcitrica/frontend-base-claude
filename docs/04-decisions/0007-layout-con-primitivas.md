# ADR-0007 — Layout con primitivas

- **Estado:** Aceptada
- **Fecha:** 2026-10-20

## Contexto

La regla 4 del [contrato](../01-design/implementation-contract.md) decía: "Nunca `<div>` crudo
para layout: siempre `Container` + `Col`", y a la vez "`Container`/`Col` más utilidades de
Tailwind alcanzan".

Las dos frases no se sostenían:

- `Container`/`Col` solo resuelven columnas. Apilar, poner en fila, fijar una proporción o
  superponer exigía un `<div>` con clase propia. La landing ImPulso tenía 24 `<div>` y 15 usos de
  `home__stack*`: la regla era imposible de cumplir, y una regla imposible le enseña a la IA a
  ignorar las reglas.
- Los patrones genéricos vivían con nombre de página (`home__stack`, `home__media`,
  `home__form-row`). Cada página nueva los copiaba o los reinventaba.
- Tailwind y el SCSS de página convivían para lo mismo (`mb-4` junto a `home__stack`). Con dos
  formas válidas, cada persona y cada agente elegía una distinta.
- Un diseño audaz (superposición, salida a sangre, asimetría) obligaba a salirse del grid: el
  hero se montó con capas `absolute`.

## Decisión

1. **En la web, el layout se compone solo con `Container`/`Col` y las primitivas de
   `shared/components/layout/`:**
   - `Section`: banda de página con ritmo vertical y tono;
   - `Stack`: pila vertical;
   - `Cluster`: fila que se envuelve;
   - `Media`: marco con proporción;
   - `AutoGrid`: columnas que se reparten solas;
   - `Grid` + `Cell`: retícula de 12/6/4 columnas con superposición y salida a sangre.
2. **Tailwind no se usa para layout** (`flex`, `grid`, `gap-*`, márgenes y paddings de
   composición). Queda para ajustes que ninguna primitiva cubre (`sr-only`, `w-full`,
   `object-cover` en una imagen).
3. **Un `<div>` crudo solo existe para un gesto de página**, con su clase `.<pagina>__*` y su
   motivo en el SCSS de página.
4. **Las primitivas solo aceptan valores del sistema.** El espaciado se expresa como pasos de
   `--space-N` ([ADR-0006](0006-documentacion-refleja-render.md)), tipados en TypeScript. Una
   prop o un valor de prop solo existe si tiene un consumidor real.
5. **Las primitivas viven en el repo** hasta probarse en proyectos reales. Pasarlas a
   `citrica-ui-toolkit` será una decisión posterior.
6. **Alcance: la web.** El admin y el panel no cambian con esta decisión.

## Consecuencias

**Mejora:**
- Hay una sola forma de componer cada cosa, y TypeScript rechaza los valores inventados.
- La regla vuelve a ser cumplible y verificable con un grep.
- Las composiciones audaces se hacen con `Grid` sin abandonar la retícula.
- `/dev/layout` documenta cada primitiva con ejemplos vivos, para personas y para la IA.

**Empeora:**
- Hay un vocabulario más que aprender.
- La escala vive en dos sitios (lista Sass y tipo TS) hasta que exista un chequeo automático.
- Las primitivas no están en el toolkit, así que otro repo no las hereda todavía.

**Riesgo:** que las primitivas crezcan a fuerza de props "por si acaso" hasta ser un `<div>`
con otro nombre. La regla de consumidores (punto 4) es la defensa.

## Alternativas consideradas

- **Mantener `Container`/`Col` + Tailwind.** Descartada: deja dos formas de componer y no
  resuelve superposición ni salida a sangre.
- **Clases CSS `o-*` sin componentes.** Descartada: sin tipos ni autocompletado, nada impide
  escribir una clase que no existe.
- **Una primitiva genérica `Box` con props de flex y grid.** Descartada: reconstruye el `<div>`
  con props y no comunica intención.
