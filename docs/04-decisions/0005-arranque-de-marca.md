# ADR-0005 — Arranque de marca: se borra la anterior, y la paleta cambia valores, nunca nombres

- **Estado:** Aceptada
- **Fecha:** 2026-08-01

## Contexto

Este repo es una **base para proyectos**: la misma plantilla levanta marcas distintas.
Hasta ahora eso estaba documentado como un rebranding *incremental*
([docs/rebranding.md](../rebranding.md)) — cambiar tokens, fuentes, copy — y no como lo
que de verdad es: **empezar de cero sobre una base usada**.

Esa diferencia importa. Al terminar la SPEC-0001 el repo quedó con una landing completa,
sus once componentes de sección, su SCSS, sus assets y su spec. Nada de eso sirve para la
marca siguiente, y todo estorba: el agente que llega lo lee como contexto vigente y
arrastra decisiones de una marca que ya no existe.

### El fallo que este ADR previene

Hay un error concreto que el rebranding incremental invita a cometer, y que rompe el
sistema en silencio: **tocar los nombres de las variables de la paleta**.

`styles/10-tokens/web/colors/_palette.scss` tiene **167 variables `$color-light-*`** y
otras 167 `$color-dark-*`; la paleta admin, otras 338. Esos nombres no son etiquetas: son
el **contrato** que consumen los mixins de tema, los tokens de componente, el toolkit y
todo el SCSS del repo. Cambiar `$color-light-primary` por `$color-light-brand` no
"renombra un color": deja sin definir `--color-primary`, y lo que se rompe no es el
archivo editado sino sitios que nadie está mirando.

La tentación es real cuando la marca nueva llama a sus colores de otra forma. Y el hook
existente no lo detectaba: sus seis reglas son línea a línea, y esto solo se ve
comparando el archivo entero contra `HEAD`.

## Decisión

**1. Existe `/brand-new <marca>`: un arranque de marca, no un rebranding incremental.**

Borra la superficie de la marca anterior —`app/home/components`, `app/home/hooks`,
`app/page.tsx`, el SCSS de página— y **todas las specs**, conservando `_template/` y
`README.md`.

Es destructivo, así que **confirma antes**, mostrando `git status --short` y advirtiendo
en concreto de lo que aparece como `??`: eso no se recupera con git.

**2. La numeración de specs vuelve a `0001` en un arranque de marca.** Es la única
excepción sancionada a "los números no se reutilizan": no se reutilizan *dentro* de un
proyecto, y un arranque de marca empieza un proyecto nuevo.

**Los ADR no se borran.** Son la historia del harness, no del producto: sobreviven a
todas las marcas que pasen por esta base.

**3. En la paleta se cambian los VALORES, nunca los nombres.**

- Prohibido añadir, renombrar o eliminar variables.
- Se reasigna el hex de cada variable existente.
- **Se recalculan las derivadas**: cambiar `$color-light-primary` no basta. Cada rol
  tiene su familia —`on-*`, `*-container`, `on-*-container`, `*-fixed`, `*-fixed-dim`,
  `on-*-fixed-variant`, más `-btn` / `-input` / `-select` / `-textarea` / `-calendar`— y
  todas salen del nuevo color base. Una familia a medias deja la marca nueva mezclada con
  la vieja en superficies que solo aparecen en estados concretos.
- Si de verdad falta un rol de color, va con ADR. No con una variable suelta.

**4. La regla la impone el hook, no la disciplina.** `contract-check.mjs` gana un tipo de
regla nuevo —**de archivo**, no de línea— y la primera es
`variables-de-paleta-alteradas`: extrae el set de nombres `$color-*` del archivo y de su
versión en `HEAD`, y **sale con código 2** si difieren. `npm run contract` reporta la
deriva.

A diferencia de las seis reglas de línea, esta **no tolera baseline**: el set coincide
con `HEAD` o no coincide. No hay deuda que heredar.

## Consecuencias

**Mejora:** arrancar una marca deja de ser un ejercicio de memoria. Lo destructivo se
confirma en vez de ocurrir; lo que se conserva está decidido; y el error más caro —romper
el contrato de nombres de la paleta— ya no depende de que alguien se acuerde: lo bloquea
un hook con un mensaje que dice exactamente qué variable sobra o falta.

**Empeora:** recalcular las familias completas de cada rol es trabajo real, mucho más que
cambiar cuatro hex. Es el precio de que la marca nueva no aparezca mezclada con la
anterior en un hover o en un estado de error.

**Riesgo:** el hook compara contra `HEAD`. Si alguien commitea una paleta con nombres ya
alterados, ese estado se vuelve el nuevo baseline y la regla deja de protegerlo. La
defensa es revisar el diff de `_palette.scss` en el PR — el hook avisa durante la edición,
no después del commit.

**Riesgo (2):** la regla detecta nombres, no valores. Una paleta con todas las variables
correctas pero solo cuatro actualizadas pasa el hook y se ve mal. Eso lo atrapa
`npm run shot` y el ojo, no un grep.

## Alternativas consideradas

- **Dejarlo como documentación en `rebranding.md`.** Descartada: ya estaba documentado y
  el harness entero existe porque la documentación sola no se cumple. Una regla sin
  mecanismo es una sugerencia.
- **Permitir variables nuevas con prefijo reservado.** Descartada: es exactamente el alias
  intermedio que el contrato ya prohíbe (`--im-*`, `--brand-*`). Reabrirlo por la puerta
  de atrás anula [ADR-0001](0001-contrato-fuente-unica.md).
- **Mantener la numeración de specs entre marcas.** Descartada: `0007-landing-marca-b`
  como primera spec de un proyecto sugiere una historia que no existe. La continuidad que
  importa es la de los ADR, y esa se conserva.
- **Borrar también los ADR al arrancar marca.** Descartada: son aprendizajes del harness
  —cómo se verifica, qué trampas tiene el toolkit— y valen igual para la marca siguiente.
