# CLAUDE.md

Guía para Claude Code en este repositorio.

## Qué es esto

Base Next.js 15 (App Router) de Citrica, hoy en uso como **ImPulso** — una landing
de marketing gastronómico en español. Sobre la misma base convive un panel
administrativo con Supabase (reservas, clientes, tareas, configuración).

En la landing, **el diseño es el producto**.

## Cómo se trabaja aquí: SDD

Este repo usa **Spec-Driven Development**. Nada no trivial se implementa sin una spec
aprobada.

```
/spec-new <slug>  →  /spec-plan <slug>  →  /spec-build <slug>  →  /spec-verify <slug>
    qué y porqué        cómo                   código                 DoD
```

- Flujo completo y sus puertas: **[docs/00-harness/sdd-workflow.md](docs/00-harness/sdd-workflow.md)**
- Specs vivas: **[docs/03-specs/README.md](docs/03-specs/README.md)**

**La skill `impeccable` es obligatoria** en las fases con superficie visual (`landing`,
`admin`, `panel`, `auth`): `/impeccable shape` en PLAN, `/impeccable craft` en BUILD,
`/impeccable audit` en VERIFY. Exenta en `api` e `infra`.
**Donde choque con el contrato, gana el contrato** — sin `clamp()` en SCSS de página, sin
paletas nuevas. Ver [ADR-0003](docs/04-decisions/0003-impeccable-obligatorio.md).

**Excepciones** (no requieren spec): typo, copy, valor de token, bug de una línea con
causa evidente, cambio puramente mecánico. Todo lo demás sí.

**Regla de desvío:** si a mitad del build aparece algo que la spec no contempla, se
para, se anota en la bitácora de `tasks.md` y se actualiza la spec. No se improvisa.

## Antes de escribir código de UI

Lectura obligatoria, en este orden:

1. **[docs/01-design/implementation-contract.md](docs/01-design/implementation-contract.md)** — las 4 reglas innegociables
2. **[docs/00-harness/conventions.md](docs/00-harness/conventions.md)** — dónde va cada archivo

El contrato en una línea: **color solo desde tokens, texto solo con `Text`, layout solo
con `Container`/`Col`, componente del toolkit antes que markup propio.**
El detalle, el mapa de archivos y los comandos de verificación están en ese documento
y en ningún otro — ver [ADR-0001](docs/04-decisions/0001-contrato-fuente-unica.md).

## Antes de cerrar

**[docs/00-harness/definition-of-done.md](docs/00-harness/definition-of-done.md).**
Se recorre completa y se registra el resultado real en la spec. Un punto no comprobado
se reporta como no comprobado — nunca se asume verde.

## Comandos

```bash
npm run dev          # desarrollo (Turbopack)
npm run typecheck    # tsc --noEmit — LA puerta de tipos
npm run lint:check   # ESLint sin --fix (inspecciona)
npm run contract     # reporte del contrato de implementación
npm run shot         # capturas + mediciones reales del navegador
npm run build        # build de producción
```

**Sí puedes ver.** `npm run shot` levanta el Chrome del sistema vía Playwright, toma
capturas en `sm`/`md`/`lg` y mide el DOM: scroll horizontal, CTA dentro del fold,
imágenes rotas, errores de consola. Falla con código 1. **No declares que no puedes
inspeccionar visualmente** — se declaró una vez y costó cuatro defectos que el usuario
tuvo que encontrar. Ver [ADR-0004](docs/04-decisions/0004-verificacion-visual-y-assets.md).
Requiere `yarn add -D playwright` una vez; no descarga navegadores.

⚠️ **`npm run build` no verifica nada.** `next.config.js` trae `ignoreBuildErrors` e
`ignoreDuringBuilds` en `true`: el build pasa con errores de tipos y de lint. Usa
`npm run typecheck`.

⚠️ **`npm run lint` corre con `--fix`** y reformatea decenas de archivos. Para
verificar, `npm run lint:check`.

Baseline (2026-08-01): **0 errores de tipos**, 8 de lint, 36 violaciones de contrato. La
regla es **no añadir** — el hook `PostToolUse` lo verifica solo en cada edición,
comparando contra `git HEAD`. Ver
[ADR-0002](docs/04-decisions/0002-verificacion-pendiente.md).

⚠️ **`npm run typecheck` está en cero y debe seguir en cero.** Dejó de ser una deuda
tolerada para pasar a ser una puerta dura: cualquier error de tipos que aparezca es
tuyo. No hay margen contra el que compararse.

## Marca nueva sobre esta base

Este repo es una base para proyectos.

**¿Marca nueva sobre una base ya usada?** `/brand-new <marca>` — borra la superficie
anterior y todas las specs, y rebrandea de cero. Es destructivo y confirma antes.
El orden completo está en **[docs/rebranding.md](docs/rebranding.md)**.

⚠️ **En `_palette.scss` se cambian los VALORES, nunca los nombres.** Los 167
`$color-light-*` son el contrato que consume todo el sistema. No añadas, no renombres, no
borres — reasigna el hex y **recalcula las derivadas de cada familia**. El hook lo bloquea
(`variables-de-paleta-alteradas`). Ver
[ADR-0005](docs/04-decisions/0005-arranque-de-marca.md).

Lo esencial: `docs/product.md` y `docs/design.md` son la **intención** (y lo que lee la
skill `impeccable`); `styles/10-tokens/web/colors/_palette.scss` y
`styles/01-settings/settings.scss` son el **render**. Cambiar solo la documentación no
cambia la pantalla.

## Mapa de documentación

Índice completo: **[docs/README.md](docs/README.md)**

| Carpeta | Qué contiene |
|---|---|
| [docs/00-harness/](docs/00-harness/) | Proceso: flujo SDD, convenciones, Definition of Done |
| [docs/](docs/) | Usuarios, JTBD, personalidad de marca, anti-referencias |
| [docs/01-design/](docs/01-design/) | Contrato, design system, brand book, y `reference/` (toolkit, grid, tokens) |
| [docs/02-architecture/](docs/02-architecture/) | Stack, directorios, datos y auth |
| [docs/03-specs/](docs/03-specs/) | Specs por feature + plantilla |
| [docs/04-decisions/](docs/04-decisions/) | ADRs |

## Trampas conocidas

Verificadas contra el código el 2026-08-01:

1. **`docs/01-design/brand.md` §8 lista variables CSS que no existen**
   (`--color-orange-500`, `--font-display`, `--space-2`, `--radius-pill`…). Los nombres
   reales son `var(--color-primary)`, `var(--color-text-black)`,
   `var(--font-family-a/b)`. El documento lleva la advertencia; no copies de ahí.
2. **El color vive en `styles/10-tokens/web/colors/_palette.scss`.** Documentación
   antigua apuntaba a `styles/01-settings/colors/colors.scss`, que **no existe**.
3. **36 hex hardcodeados en `.tsx`** (sobre todo
   `disponibilidad/weekly-schedule-manager.tsx`, `organisms/navbar.tsx`,
   `app/admin/page.tsx`, `organisms/drop-citrica.tsx`). Es deuda conocida: no la
   repliques, y si tocas uno de esos archivos, déjalo limpio.
4. **`Icon` usa la prop `name`, no `iconName`.**
5. **`Text` tiene `color` y `textColor`, y no son intercambiables.** `textColor` recibe
   el nombre del token **sin `--`** y lo envuelve en `var(--…)`. `color` recibe un valor
   CSS crudo. `color="color-primary"` **no pinta nada** — produce
   `style={{color:"color-primary"}}`, que el navegador descarta, y el texto hereda.
   Lo mismo con `<Icon color="primary">`, que va a parar a `stroke`. El hook no lo
   detecta porque no hay hex: es una **violación silenciosa**. Ya hay 72 en el repo
   (`app/admin/reservas/`, `shared/project-components/quote-form.tsx`).
   Usa `textColor="color-primary"` o `color="var(--color-primary)"`.
6. En zsh, `grep --include=*.tsx` necesita comillas: `--include='*.tsx'`. Ojo también
   con el word-splitting: `eslint $FILES` pasa la variable como **un solo argumento**;
   usa `${=FILES}` o un array.
7. **`docs/product.md` y `docs/design.md` no se mueven ni se renombran.** La skill
   `impeccable` los busca con esos nombres en `docs/`; si no los encuentra reporta
   `NO_PRODUCT_MD` y arranca un init que sobrescribe el brief. Comprobar con
   `node ~/.claude/skills/impeccable/scripts/context.mjs`.
8. **El cliente de Supabase no está tipado.** `lib/supabase.ts` exporta un
   `SupabaseClient` sin el genérico `Database`, así que todo `data` de una query es
   `any`. Al escribir una query nueva, **anota el callback** o reintroduces un
   `implicit any` — y el typecheck ya está en cero. Las interfaces útiles
   (`AdminBooking`, `Customer`, `StudioAvailability`, `Booking`) ya existen en
   `app/hooks/*`; usa `Pick<>` cuando el `select()` traiga solo algunas columnas.
9. **El `Header` del toolkit sin prop `logo` pinta "Matour".** Es el placeholder de
   otra marca, en blanco sobre header blanco: parece un logo roto y se ve como si
   estuviera terminado. Pásale siempre `logo`. Y si falta el asset, hay tres salidas —
   pedirlo, un sustituto propio marcado `TEMPORAL`, u omitirlo resolviendo el hueco en
   composición. Nunca el default de la librería.
   Ver [ADR-0004](docs/04-decisions/0004-verificacion-visual-y-assets.md).
10. **`tailwind.config.js` debe escanear el toolkit.** Sin
   `./node_modules/citrica-ui-toolkit/dist/**/*.{js,mjs}` en `content`, Tailwind no
   genera las clases responsive que usan sus componentes y el nav del `Header` queda
   oculto a cualquier ancho. Si añades otra librería de UI con clases de Tailwind, va
   igual al `content`.
11. **Auditar imágenes sin hacer scroll da falsos positivos.** `next/image` es `lazy`
   bajo el fold: `naturalWidth === 0` no significa rota, significa que no ha entrado en
   viewport. `npm run shot` recorre la página antes de auditar; si lo haces a mano,
   hazlo tú.
12. **El foco de los campos ya lo define el sistema.** `_input.scss` (y sus hermanos)
   marcan el foco con `[data-focus="true"]` cambiando `border-color` al naranja de marca,
   **no** con `outline`. Si auditas foco midiendo solo `outline` vas a leer "no hay
   indicador" y a taparlo con uno peor — ya pasó. Mide `outline`, `border-color`,
   `box-shadow` y `background-color`, y tabula con teclado: `element.focus()` no dispara
   `:focus-visible`. Ver [ADR-0004](docs/04-decisions/0004-verificacion-visual-y-assets.md).
13. **`<AvailabilityProvider>` está comentado en `app/layout.tsx`** pero
   `disponibilidad/unified-availability-manager.tsx` llama a `useAvailability()`. Ese
   panel lanza `useAvailability must be used within an AvailabilityProvider` en runtime.
   Bug preexistente, anotado en [ADR-0002](docs/04-decisions/0002-verificacion-pendiente.md).

## Convención de idioma

Documentación, specs y comentarios en **español**. Código, nombres de archivo, ramas y
commits en **inglés**. Copy de la UI en español (registro peruano/latino).
