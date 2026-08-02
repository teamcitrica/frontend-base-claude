# ADR-0004 — La verificación visual es obligatoria, y ningún placeholder ajeno se envía

- **Estado:** Aceptada
- **Fecha:** 2026-08-01

## Contexto

Durante el build de [SPEC-0001](../03-specs/0001-landing-impulso/spec.md) aparecieron
cuatro fallos del harness que no eran del código, sino de **cómo se estaba verificando**.
Los cuatro los detectó el usuario, no el proceso.

### 1. Se declaró "no puedo ver" cuando sí se podía

La pasada 1 de la landing se cerró reportando que tres criterios quedaban **sin
comprobar** —CTA dentro del primer viewport, ausencia de scroll horizontal y la revisión
visual entera— con el argumento de que el entorno no tenía navegador.

Era falso. Bastaba con:

```bash
npx playwright   # se instala solo
```

más el Chrome que ya estaba en el sistema. Con eso se pueden tomar capturas, leerlas y
—más importante— **medir el DOM real**: `scrollWidth` contra `innerWidth`,
`getBoundingClientRect()` del CTA contra `window.innerHeight`, errores de consola,
imágenes con `naturalWidth === 0`.

El coste de esa declaración no fue teórico. Al mirar por fin las capturas aparecieron
**cuatro defectos** que ninguna lectura de HTML habría encontrado:

- El nav de escritorio no se renderizaba a 1440 px: siempre salía la hamburguesa.
- El titular del hero se partía en seis líneas y empujaba el CTA fuera del fold.
- El footer decía `New Project`.
- El botón secundario del hero era ilegible sobre la foto.

Los cuatro estaban a la vista. Ninguno era detectable con `curl` y `grep`.

### 2. Se envió el placeholder de otra marca

El `Header` de `citrica-ui-toolkit`, cuando no recibe la prop `logo`, pinta un
placeholder que dice **"Matour"** en texto blanco. Sobre el header blanco de la variante
`basic` se ve como un logo roto. Se envió así en la pasada 1 y lo detectó el usuario, no
el proceso.

El fallo de fondo no fue olvidar el logo: fue **no tratar la ausencia de un asset como
una decisión que hay que tomar**. Un asset que falta tiene exactamente tres salidas
legítimas, y ninguna es dejar el placeholder de otro proyecto.

### 3. Una lección menor sobre falsos positivos

La primera auditoría de imágenes marcó una foto como rota. No lo estaba: era
`loading="lazy"` y nunca había entrado en viewport. Cualquier comprobación automática de
imágenes **tiene que recorrer la página antes de auditar**, o reporta como defecto el
comportamiento correcto.

### 4. Se "arregló" un estilo que el sistema ya resolvía

En la pasada de polish se auditó el foco visible midiendo `outline` y `box-shadow`. Los
campos de formulario devolvían `outline-style: none`, y de ahí se concluyó que no tenían
indicador de foco. **Falso.** El sistema ya lo define en `_input.scss`:

```scss
&[data-focus="true"] { border-color: var(--color-primary-input-border-hover); }
```

Medido después, reposo contra foco: `0px rgb(229,231,235)` → **`2px rgb(232,98,44)`**, el
naranja de marca, que además cumple el 3:1 que WCAG pide a un componente de UI. El
indicador existía y estaba bien.

Sobre eso se aplicó `outline: 2px solid negro !important` a todo lo tabulable. Resultado:
un rectángulo negro ajeno al sistema tapando un foco correcto y on-brand. Lo detectó el
usuario.

Dos errores encadenados, y el segundo solo es posible por el primero:

1. **Medir un mecanismo y concluir sobre todos.** Un indicador de foco puede ser
   `outline`, `border-color`, `box-shadow` o un cambio de fondo. Comprobar uno y declarar
   ausencia es un falso negativo.
2. **`!important` en una regla amplia.** Convierte un diagnóstico equivocado en una
   regresión que pisa trabajo ajeno en toda la superficie.

Hay además una trampa de medición concreta: **`element.focus()` desde JS no dispara
`:focus-visible`**. La primera medición pareció confirmar el diagnóstico porque estaba
leyendo estilos que no se estaban aplicando. Hay que tabular de verdad.

## Decisión

**1. La verificación visual es un punto ejecutable de la Definition of Done, no una
inspección opcional.**

```bash
npm run shot                        # / en sm(390) · md(768) · lg(1440)
npm run shot -- /admin              # otra ruta
npm run shot -- / --cta "#agenda"   # además, CTA dentro del primer viewport
```

`scripts/visual-check.mjs` toma dos capturas por breakpoint (fold y página completa) y
**falla con código 1** si encuentra scroll horizontal, imágenes rotas, errores de consola,
o un CTA fuera del primer viewport. Antes de auditar imágenes recorre la página entera,
para no confundir *lazy* con *roto*.

Usa `channel: "chrome"`, o sea el Chrome ya instalado: **no descarga navegadores**.
Playwright no se añade a `package.json` para no tocar el lockfile; el script dice la
línea exacta a ejecutar la primera vez.

**2. Una captura que no se miró no cuenta como revisada.** El script las genera; hay que
abrirlas. Que salga en verde solo significa que no hay defectos *medibles*, no que la
jerarquía, el ritmo o el contraste estén bien.

**3. Nunca se envía el placeholder de otra marca.** Cuando falte un asset —logo,
fotografía, icono— hay tres salidas, en este orden:

| # | Salida | Cuándo |
|---|---|---|
| 1 | **Pedirlo.** Preguntar por el archivo o la URL | Por defecto. Es lo barato |
| 2 | **Sustituto propio, marcado como temporal.** Para un logo: wordmark de texto con la tipografía y el color de la marca, con un comentario `TEMPORAL` en el código y una entrada en los pendientes de la spec | Cuando el trabajo no puede parar |
| 3 | **Omitirlo** dejando el hueco resuelto en composición | Cuando el elemento no es imprescindible |

Lo que **no** es una salida: dejar el default del toolkit o de la librería. Un
placeholder que nombra otra marca no es un hueco, es un defecto que se ve como si
estuviera terminado.

**4. Antes de escribir un estilo, comprobar si el sistema ya lo resuelve.** El SCSS de
página es el último recurso, no el primero. `styles/10-tokens/web/components/` cubre
botones, campos, calendario, acordeón y texto — incluidos sus estados de foco y hover.
Escribir encima duplica el indicador en el mejor caso y lo tapa en el peor.

**5. Al auditar un estado visual, medir todos sus mecanismos posibles.** Para el foco:
`outline`, `border-color`, `box-shadow` y `background-color`. Declarar "no hay indicador"
tras comprobar solo uno es un falso negativo, y el arreglo que provoca es una regresión.

Corolarios operativos:

- **`element.focus()` no dispara `:focus-visible`.** Para auditar foco hay que navegar con
  `Tab` de verdad. Con `focus()` se leen estilos que no se están aplicando.
- **`!important` en una regla amplia es un olor.** Si hace falta para ganar a la librería,
  acota el selector a lo que de verdad falla — nunca a toda la superficie.
- El componente de HeroUI que envuelve el toolkit marca el foco con `data-focus` /
  `data-focus-visible`, no con `:focus-visible`. Los dos selectores conviven.

## Consecuencias

**Mejora:** el punto D de la DoD deja de ser una casilla de confianza y pasa a tener un
comando. Tres clases de defecto —scroll horizontal, imágenes rotas, errores de consola—
quedan cubiertas por una comprobación automática que devuelve código de salida. Y queda
escrito que "no puedo ver" era falso, para que ninguna sesión futura lo repita.

**Empeora:** hace falta instalar playwright una vez por clon, y las capturas cuestan
segundos por breakpoint. Con `channel: "chrome"` no se descargan navegadores, pero en un
CI sin Chrome habría que ajustarlo.

**Empeora (2):** comprobar cuatro propiedades en vez de una alarga la auditoría, y
obliga a conocer qué mecanismo usa cada componente del sistema. Es el precio de no
introducir regresiones.

**Riesgo:** el verde del script puede leerse como "la pantalla está bien". No lo es. Solo
cubre lo medible; la jerarquía, el ritmo y la coherencia de marca siguen necesitando ojos
—los del agente y los del usuario— y `/impeccable audit` (punto G, [ADR-0003](0003-impeccable-obligatorio.md)).

## Alternativas consideradas

- **Dejar la revisión visual como "pedirle al usuario que mire".** Descartada: convierte
  al usuario en el detector de defectos que el proceso debería atrapar. Se usó en la
  pasada 1 y los cuatro defectos los encontró él.
- **Añadir playwright a `devDependencies`.** Descartada por ahora: el repo tiene
  `yarn.lock` y mezclar gestores crea ruido. El script indica la línea exacta; promoverlo
  a dependencia es un cambio de una línea cuando se decida.
- **Comparación visual contra referencia (visual regression).** Descartada: útil contra
  regresiones, inútil para una superficie nueva, que es el caso aquí.
- **Prohibir por hook los defaults del toolkit.** Descartada: el hook mira texto de
  archivos, y "no pasar la prop `logo`" es una ausencia. No hay grep para eso.
