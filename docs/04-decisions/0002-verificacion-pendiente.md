# ADR-0002 — Verificación automática: estado y deuda

- **Estado:** Aceptada
- **Fecha:** 2026-08-01 · **Actualizada:** 2026-08-01 (typecheck en verde — ver
  [Estado actual](#estado-actual-2026-08-01))

## Contexto

El flujo SDD depende de una Definition of Done ejecutable. Al montar el harness se
auditó qué se podía verificar. El resultado inicial era flaco, y **una de las
suposiciones era falsa**.

### La puerta que no existía

La primera versión de este ADR decía que `npm run build` era la única verificación de
tipos. **Es falso.** `next.config.js` desactiva las dos puertas:

```js
eslint:     { ignoreDuringBuilds: true },
typescript: { ignoreBuildErrors: true },   // "solo temporalmente mientras Supabase no está conectado"
```

`npm run build` **no verificaba nada**: ni tipos ni lint. El repo llevaba tiempo sin
ninguna puerta automática, y el comentario que lo justificaba describe una condición
temporal que ya no aplica.

### Lo que apareció al medir

> Las cifras de esta sección son las del momento de instrumentar y quedan como registro
> histórico. Para el estado vigente salta a [Estado actual](#estado-actual-2026-08-01).

Al agregar `tsc --noEmit`: **25 errores de tipos** invisibles hasta entonces.
Entre ellos un import roto real —
`shared/components/organisms/sidebar.tsx` importaba `../../../types/sidebar`
(que resuelve a la raíz del repo) en vez de `../../types/sidebar`. Al ser `import type`
se borraba al compilar, así que no rompía en runtime; solo dejaba `SidebarProps` y
`MenuItem` sin tipar, y eso cascadeaba a 3 errores más en el mismo archivo.

Corregido en el acto (una línea, causa evidente): **25 → 21 errores**, `sidebar.tsx`
limpio. Los 21 restantes son 20 × TS7006 (`implicit any` en callbacks de hooks de datos)
y 1 × TS2345 en `useStudioBooking.ts:121`.

### Violaciones del contrato

Medidas con `npm run contract` (excluye comentarios, a diferencia de un grep crudo):

| Regla | Violaciones |
|---|---|
| `hex-en-tsx` | 68 |
| `clamp-en-scss-de-pagina` | 1 |
| `hex-en-scss-de-pagina` · `alias-intermedio` · `font-family-hardcodeada` · `icon-prop-incorrecta` | 0 |

Concentración: `organisms/header.tsx` (18), `organisms/sidebar.tsx` (12),
`weekly-schedule-manager.tsx` (5), `organisms/navbar.tsx` (5). Casi todos son
`<Icon color="#FFFFFF">` — props de color pasadas como literal en vez de token, en
organismos heredados de la base, no en la superficie ImPulso nueva.

## Estado actual (2026-08-01)

Los números de arriba son los del momento de instrumentar. Hoy:

| Puerta | Al instrumentar | Ahora |
|---|---|---|
| `npm run typecheck` | 21 | **0** |
| `npm run lint:check` | 9 errores | 8 errores |
| `npm run contract` | 69 | 36 |

**Tipos → cero.** Los 21 errores tenían una sola causa: `lib/supabase.ts` exporta un
`SupabaseClient` sin el genérico `Database`, así que todo `data` que vuelve de una query
es `any` y cada callback sobre esos datos cae en `implicit any`. No se pudieron generar
los tipos reales del esquema — los proyectos Supabase accesibles (RestorApp,
RestorApp-QA) son de otro producto y el repo no tiene `.env*` que indique el suyo. Se
cerró anotando los callbacks con las interfaces que **ya existían** en esos mismos
archivos (`AdminBooking`, `Customer`, `StudioAvailability`, `Booking`), usando `Pick<>`
donde el `select()` trae solo algunas columnas, más el borrado de
`app/hooks/useStudioBooking.ts` — un hook marcado `LEGACY - YA NO SE USA` por su autor y
sin un solo importador, que cargaba 6 de los 21.

> **La causa raíz sigue viva.** El cliente continúa sin tipar: cada query nueva
> necesitará anotar su callback. El arreglo de fondo es parametrizar `SupabaseClient`
> con un `Database` generado, y para eso hace falta acceso al proyecto real.

**Contrato 69 → 39.** Se borraron `organisms/header.tsx` (18 violaciones) y
`organisms/sidebar.tsx` (12): dos organismos sin consumidores, reemplazados por el
`Header` y el `Sidebar` de `citrica-ui-toolkit`. El `Sidebar` del toolkit es agnóstico
del router, así que se añadió `organisms/sidebar-nav.tsx` como envoltorio de cliente
(navegación, item activo, filtrado por rol).

Con el typecheck en cero, la puerta A deja de ser "no empeorar un baseline sucio" y pasa
a ser binaria.

## Decisión

**Se instrumenta la verificación y se acota el crecimiento de la deuda**, en vez de
bloquear el harness hasta limpiarla.

1. **`npm run typecheck`** (`tsc --noEmit`) es la puerta de tipos. `npm run build` **no
   lo es** y no debe citarse como tal mientras `ignoreBuildErrors` siga en `true`.
2. **`npm run lint:check`** (sin `--fix`) para inspeccionar sin reformatear el repo.
   `npm run lint` sigue existiendo pero reescribe decenas de archivos.
3. **`npm run contract`** reporta el estado completo del contrato de implementación.
4. **Hook `PostToolUse`** (`.claude/hooks/contract-check.mjs`) sobre Edit/Write: compara
   el archivo editado contra su versión en `git HEAD` y **solo falla si el cambio añadió
   violaciones**. Tocar un archivo con deuda preexistente no molesta; introducir deuda
   nueva sí. Esto convierte "ninguna spec empeora el baseline" en algo mecánico.
5. La puerta B de la DoD sigue aplicando a **los archivos que toca cada spec**. La
   limpieza avanza por contacto.

## Consecuencias

**Mejora:** la regla que antes dependía de disciplina ahora la impone un hook. Los tipos
tienen puerta real por primera vez. La deuda está cuantificada por herramienta, no por
grep a ojo.

**Empeora:** el hook añade latencia por edición (~100ms) y puede dar falso positivo si
alguien mueve código con violaciones entre archivos — el archivo destino lo lee como
"nuevo". El repo sigue en rojo global un buen tiempo.

**Riesgo:** `npm run typecheck` no corre en CI (no hay CI). Depende de que alguien lo
ejecute o de que la DoD se cumpla.

## Trabajo pendiente

En orden de rendimiento sobre esfuerzo:

- [ ] **Quitar `ignoreBuildErrors` de `next.config.js`.** Ya no hay excusa: `typecheck`
      está en verde. Es el desbloqueo de mayor impacto que queda.
- [ ] Parametrizar `SupabaseClient` con un `Database` generado. Elimina la causa raíz
      de los 21 errores en vez de anotarlos uno a uno. Necesita acceso al proyecto real.
- [x] ~~Tipar los 20 `implicit any` (`app/hooks/*`) y el TS2345~~ — hecho: typecheck en 0
- [x] ~~Limpiar `header.tsx` y `sidebar.tsx` (30 de los 68 hex)~~ — hecho: se borraron,
      reemplazados por el toolkit
- [ ] Limpiar los 36 hex restantes, empezando por `weekly-schedule-manager.tsx` (5) y
      `organisms/navbar.tsx` (5)
- [ ] Montar `<AvailabilityProvider>` en `app/layout.tsx` (está comentado) o dejar de
      llamar `useAvailability()` en `unified-availability-manager.tsx` — hoy ese panel
      lanza `useAvailability must be used within an AvailabilityProvider` en runtime
- [ ] Evaluar Vitest + Testing Library para los hooks de `app/hooks/`
- [ ] CI que corra `typecheck` + `lint:check` + `contract` en cada PR

## Alternativas consideradas

- **Bloquear hasta limpiar todo.** Descartada: son cambios en organismos heredados con
  riesgo visual real; no se detiene el flujo de trabajo por deuda preexistente.
- **Hook que falle ante cualquier violación en el archivo.** Descartada: editar
  `header.tsx` dispararía 18 alertas en cada guardado y el equipo desactivaría el hook.
  Comparar contra `HEAD` da la misma garantía sin el ruido.
- **Bajar la regla a "recomendada".** Descartada: convierte el contrato en sugerencia.
