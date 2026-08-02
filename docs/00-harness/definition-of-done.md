# Definition of Done

Una tarea está terminada cuando **todos** estos puntos pasan y el resultado real quedó
registrado en la sección *Verificación* de la spec. Un punto no comprobado se reporta
como no comprobado; no se asume verde.

---

## A. Tipos y lint

```bash
npm run typecheck     # tsc --noEmit — LA puerta de tipos
npm run lint:check    # ESLint sin --fix (inspecciona, no reescribe)
npm run build         # que compile
```

> ⚠️ **`npm run build` no verifica nada.** `next.config.js` trae
> `typescript.ignoreBuildErrors: true` y `eslint.ignoreDuringBuilds: true`, así que el
> build pasa con errores de tipos y de lint. La puerta real es `npm run typecheck`.
> Detalle en [ADR-0002](../04-decisions/0002-verificacion-pendiente.md).
>
> ⚠️ **`npm run lint` corre con `--fix`** y reformatea decenas de archivos (comillas,
> orden de imports). Para verificar usa `npm run lint:check`.
>
> **Baseline (2026-08-01):** **0 errores de tipos** y 8 errores de lint. La regla es
> **no añadir**: tu spec deja el conteo igual o menor.
>
> ⚠️ El typecheck está en cero, así que ya no hay deuda contra la que compararse:
> cualquier error que aparezca lo introdujo tu cambio. Los 21 errores anteriores (20 ×
> `implicit any` en `app/hooks/*`, 1 × TS2345) tenían una sola causa — el cliente de
> Supabase sin el genérico `Database`, que devuelve todo `data` como `any` — y se
> cerraron anotando los callbacks con las interfaces que ya existían en esos archivos
> (`AdminBooking`, `Customer`, `StudioAvailability`) más el borrado del hook muerto
> `useStudioBooking.ts`. Si añades una query nueva, anota el callback: el cliente sigue
> sin tipar.

## B. Contrato de implementación

Un solo comando, y el hook lo aplica solo en cada edición:

```bash
npm run contract      # reporte completo del repo
```

El hook `PostToolUse` (`.claude/hooks/contract-check.mjs`) corre en cada Edit/Write y
compara el archivo contra su versión en `git HEAD`: **solo falla si tu cambio añadió
violaciones.** Tocar un archivo con deuda preexistente no molesta.

Las siete reglas que verifica — seis de línea y una de archivo:

| Regla | Dónde |
|---|---|
| `hex-en-tsx` | `app/`, `shared/` — sin hex literal |
| `hex-en-scss-de-pagina` | `styles/webpages-styles/` — sin hex ni `rgba()` |
| `alias-intermedio` | sin `--im-*` ni `--brand-*` |
| `font-family-hardcodeada` | solo `var(--font-family-*)` |
| `clamp-en-scss-de-pagina` | la escala vive en `_text.scss` |
| `icon-prop-incorrecta` | `Icon` usa `name`, no `iconName` |
| `variables-de-paleta-alteradas` | `_palette.scss` — el set de nombres `$color-*` coincide con `HEAD`. **No tolera baseline** ([ADR-0005](../04-decisions/0005-arranque-de-marca.md)) |

> **Baseline (2026-08-01):** 36 `hex-en-tsx`, concentrados en
> `disponibilidad/weekly-schedule-manager.tsx` (5), `organisms/navbar.tsx` (5),
> `app/admin/page.tsx` (4) y `organisms/drop-citrica.tsx` (4). Las otras **cinco** reglas
> están en cero. La spec que toca uno de esos archivos lo deja limpio al salir; la
> limpieza avanza por contacto.
>
> Bajó de 69 al borrar `organisms/header.tsx` (18) y `organisms/sidebar.tsx` (12), dos
> organismos sin consumidores que se reemplazaron por los del toolkit, 2 al vaciarse
> `app/page.tsx` y 1 al retirarse el SCSS de página de la landing. **Subirá cuando se construya la landing** — el número que
> vale es el del `git HEAD` contra el que compara el hook, no este texto.

Y a revisión visual:

- [ ] Texto renderizado con `<Text variant="…">`, no con `<h1>`/`<p>` crudos
- [ ] Layout con `Container` + `Col`, no con `<div>` + flex/grid a mano
- [ ] Componentes del toolkit usados antes que markup propio
- [ ] `Icon` usa la prop `name` (no `iconName`)

## C. Criterios de aceptación

- [ ] Cada criterio `Dado/Cuando/Entonces` de la spec fue ejercitado y su resultado anotado
- [ ] Lo declarado **fuera de alcance** sigue fuera: no se coló trabajo extra

## D. Responsive y verificación visual

Este punto **se ejecuta**, no se estima ([ADR-0004](../04-decisions/0004-verificacion-visual-y-assets.md)):

```bash
npm run dev                          # en otra terminal
npm run shot                         # / en sm(390) · md(768) · lg(1440)
npm run shot -- / --cta "#agenda"    # además, CTA dentro del primer viewport
```

Sale con código **1** si encuentra scroll horizontal, imagen rota, error de consola o un
CTA fuera del primer viewport. Recorre la página antes de auditar imágenes, para no
confundir `loading="lazy"` con roto.

- [ ] `npm run shot` pasa en los tres breakpoints
- [ ] **Las capturas se abrieron y se miraron.** Una captura que no miraste no cuenta
- [ ] Light y dark mode revisados si la superficie participa del tema

> El verde del script significa "sin defectos medibles", no "la pantalla está bien".
> Jerarquía, ritmo, contraste y coherencia de marca siguen necesitando ojos y el punto G.

### Assets: ningún placeholder ajeno se envía

Cuando falte un logo, una foto o un icono, hay tres salidas — y dejar el default de la
librería no es ninguna. El `Header` del toolkit sin prop `logo` pinta **"Matour"**.

- [ ] Ningún placeholder de otra marca llegó al render
- [ ] Los sustitutos temporales están marcados `TEMPORAL` en código y listados en los
      pendientes de la spec

## E. Accesibilidad (piso, no techo)

Según [product.md](../product.md) y el design system:

- [ ] Texto de cuerpo y UI pequeña ≥ 4.5:1
- [ ] Naranja pequeño usa `#A83E15` (7.0:1), nunca el `#E8622C` base
- [ ] Blanco sobre naranja solo en texto grande/bold y botones
- [ ] Anton nunca por debajo de 24px
- [ ] Foto con texto encima lleva overlay carbón 40–60%
- [ ] Foco visible en todo elemento interactivo, **comprobado tabulando con teclado**

> ⚠️ **Antes de escribir foco propio, mira si el sistema ya lo resuelve.**
> `styles/10-tokens/web/components/` define el foco de campos, botones, calendario y
> acordeón — los campos lo marcan con `[data-focus="true"]` cambiando `border-color`, no
> con `outline`. Escribir encima lo tapa.
>
> Al auditarlo, mide **los cuatro mecanismos**: `outline`, `border-color`, `box-shadow` y
> `background-color`. Comprobar solo uno y declarar "no hay foco" es un falso negativo —
> ya provocó una regresión. Y `element.focus()` **no** dispara `:focus-visible`: hay que
> pulsar `Tab` de verdad.
> Ver [ADR-0004](../04-decisions/0004-verificacion-visual-y-assets.md).
- [ ] `prefers-reduced-motion` respetado

## G. Diseño — `/impeccable audit`

Obligatorio si la superficie es `landing`, `admin`, `panel` o `auth`
([ADR-0003](../04-decisions/0003-impeccable-obligatorio.md)). Exento en `api` e `infra`.

- [ ] Se corrió `/impeccable audit` sobre la superficie construida
- [ ] Sus hallazgos quedaron registrados en la sección *Verificación* de la spec
- [ ] Los hallazgos que se decidió no atender están anotados como pendientes, no borrados

El contrato (punto B) responde "¿está bien implementado?". Este punto responde "¿está
bien diseñado?". Son puertas distintas y ninguna sustituye a la otra.

## F. Documentación

- [ ] Si cambió una verdad del repo → se actualizó la constitución y se escribió un [ADR](../04-decisions/)
- [ ] Si cambió una ruta o un comando → se actualizó [arquitectura](../02-architecture/overview.md)
- [ ] El estado de la spec se movió a `done` en [el índice](../03-specs/README.md)

---

## Bloque de reporte

Al cerrar, se pega en la spec algo con esta forma — con salidas reales, no con checks
optimistas:

```markdown
## Verificación — <fecha>

| Punto | Resultado |
|---|---|
| A. typecheck | ✅ 0 (igual al baseline) |
| A. lint:check | ✅ 8 (igual al baseline) |
| A. build | ✅ compiló |
| B. npm run contract | ✅ 36 (igual al baseline, 0 añadidas) |
| B. revisión visual | ✅ |
| C. criterios | 3/3 ✅ |
| D. responsive | ✅ `npm run shot` sin hallazgos, capturas revisadas |
| E. a11y | ⚠️ foco pendiente en el card de precio |
| F. docs | ✅ |
| G. impeccable audit | ✅ 3 hallazgos, 2 atendidos, 1 pendiente |

Pendiente: <lo que quedó abierto, o "nada">
```
