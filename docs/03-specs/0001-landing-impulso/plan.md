# PLAN — SPEC-0001

> El *cómo*. Escrito tras `/impeccable shape` (brief confirmado 2026-08-01).

## Enfoque

Diez secciones ancladas, una por archivo en `app/home/components/`, compuestas desde
`app/page.tsx`. Todo el color y la tipografía salen de tokens y del componente `Text`; el
único SCSS propio es `home.scss`, y solo para ritmo de sección y el gesto de marca del
hero. Construcción en dos pasadas: mid-fi cierra AC-1…AC-10, polish cierra AC-11.

## Dirección de diseño (salida de `shape`)

Lo que se adopta del brief confirmado:

- **Estrategia Restrained con un momento Drenched.** Naranja ≤10 %, solo acción. El hero
  es el único bloque carbón de la página — un segundo le restaría fuerza al primero.
- **Escena que fija el tema:** el dueño revisando el móvil un martes a las 11 pm con el
  local vacío. Por eso el hero es oscuro: no es un tema, es el momento del visitante.
- **Anclas de referencia:** cartel de mercado a dos tintas, scoreboard de estadio,
  disciplina de grid de agencia de growth. Explícitamente *no* la revista.
- **Numeración solo en `#metodo`.** `brand.md` prohíbe numerar por reflejo; los 4 pasos
  del Sistema Mesa Activa son una secuencia real, así que ahí sí informa.
- **Un solo eyebrow**, el del hero. Repetirlo sobre cada sección es gramática de IA.
- **La prueba social no son cards.** Tres métricas en Anton naranja sobre claro.

Lo que se **descartó** de `impeccable` por chocar con el contrato
([ADR-0003](../../04-decisions/0003-impeccable-obligatorio.md)):

| `impeccable` proponía | Por qué no |
|---|---|
| `clamp()` fluido para el titular del hero | La escala vive en `_text.scss`; el hook bloquea `clamp()` en SCSS de página |
| Componer paleta / OKLCH | Hay colores de marca comprometidos en `_palette.scss`; su propia regla dice que gana la preservación de identidad |
| Procedimiento de selección de fuente | Anton + Lato ya están en tokens. Misma regla |

## Archivos que se tocan

| Archivo | Qué cambia |
|---|---|
| `app/page.tsx` | Composición de las 10 secciones + `Header` + footer. Hoy es un stub de 9 líneas |
| `app/home/components/hero.tsx` `[nuevo]` | Sección carbón a sangre, foto + overlay, CTA |
| `app/home/components/prueba-social.tsx` `[nuevo]` | Tira de 3 métricas |
| `app/home/components/problema.tsx` `[nuevo]` | Tres dolores concretos |
| `app/home/components/sistema.tsx` `[nuevo]` | "No es falta de esfuerzo, es falta de sistema" |
| `app/home/components/solucion.tsx` `[nuevo]` | "El marketing no es presencia, es flujo" |
| `app/home/components/metodo.tsx` `[nuevo]` | Sistema Mesa Activa, 4 pasos numerados |
| `app/home/components/resultados.tsx` `[nuevo]` | "En 90 días…" — métricas `ILUSTRATIVO` |
| `app/home/components/confianza.tsx` `[nuevo]` | Credibilidad de operador |
| `app/home/components/garantia.tsx` `[nuevo]` | 90 días, sin letras pequeñas |
| `app/home/components/agenda.tsx` `[nuevo]` | CTA final + formulario sin persistencia |
| `app/home/components/site-footer.tsx` `[nuevo]` | Footer carbón + línea de créditos Unsplash |
| `styles/webpages-styles/home.scss` | Ritmo de sección y gesto del hero. Hoy 0 líneas, ya importado |
| `styles/10-tokens/web/components/_text.scss` | **Un valor:** `title` sm 22px → 24px. Ver riesgos |

`config/site.ts` **no se toca**: `impulsoNavLinks` ya tiene las cuatro anclas correctas.
`styles/custom.scss` **no se toca**: `home.scss` ya está importado.

## Componentes y tokens

| Necesidad | Componente del toolkit | Tokens que consume |
|---|---|---|
| Nav superior con scroll a anclas | `Header variant="basic"` + `navItems={siteConfig.impulsoNavLinks}` | los del toolkit |
| Titular de hero | `Text variant="display" as="h1"` | `textColor="color-text-white"` |
| Título de sección | `Text variant="headline" as="h2"` | `textColor="color-text-black"` |
| Título de card / paso / garantía | `Text variant="title" as="h3"` | `textColor="color-text-black"` |
| Bajada | `Text variant="subtitle"` | `textColor="color-on-surface-var"` |
| Párrafo | `Text variant="body" as="p"` | `textColor="color-on-surface-var"` |
| CTA | `Button variant="primary"` | `--color-primary-btn`, `--form-radius-btn` |
| Campos del formulario | `Input`, `Textarea`, `Select` | los del toolkit |
| Iconos de paso y de dolor | `Icon name="…"` | `color="var(--color-primary)"` |
| Rejilla completa | `Container` + `Col` | — |
| Foto | `next/image` | — |

**Lo que no cubre el toolkit y justifica SCSS propio en `home.scss`:**

- **Hero a sangre con overlay.** El toolkit no tiene sección full-bleed con capa de
  contraste sobre foto. Va como `.home__hero`, con el overlay derivado con `color-mix()`
  sobre `--color-text-black` — sin `rgba()` literal, que el hook bloquea.
- **Ritmo vertical entre secciones.** `Container`/`Col` resuelven el eje horizontal, no el
  espaciado vertical. Se apoya en `.sections-paddings` de `sections.scss` (24/30/60 px) y
  solo se añade lo que falte.
- **El subrayado amarillo del titular.** Gesto de marca de `design.md`; no existe como
  componente. `.home__underline` con `--color-tertiary`.

**`Footer` del toolkit: descartado.** Sus props están cableadas a otra marca (`logoSrc`
por defecto `/img/home/Logo-galiz.png`, `companyName` `'Gáliz Perú'`) y su API es de
logos + redes sociales, no de créditos de fotografía. Sale más limpio uno propio que
pelear con esas props.

## Riesgos

| Riesgo | Qué se rompe | Mitigación |
|---|---|---|
| **`text-title` mide 22 px en `sm` y usa Anton** (`--font-family-a`). La constitución exige Anton ≥24 px en cuatro sitios: `product.md`, `design.md`, el contrato y la DoD §E | **AC-11 falla en móvil** en cuanto se use `variant="title"`, que es justo su propósito declarado ("títulos de card/step/garantía") | Subir `$title-responsive.sm` de 22 a 24 px en `_text.scss`. Cambio de **un valor de token**, en el archivo que el contrato designa como fuente de la escala. Blast radius acotado: el panel admin tiene su propio `_text.scss` y en web hay 6 usos de `variant="title"` |
| IDs de Unsplash inventados → 404 y placeholders rotos. `brand.md` lo marca como defecto | La landing envía huecos donde va la foto, y `brand.md` dice que cero imagen es un bug | **Verificado: `images.unsplash.com` responde 200 desde este entorno.** Cada URL se comprueba con `curl -o /dev/null -w "%{http_code}"` antes de dejarla en código. Pocas fotos confirmadas antes que muchas adivinadas |
| Overlay del hero escrito con `rgba()` | El hook `PostToolUse` bloquea el Edit en `styles/webpages-styles/` | `color-mix(in srgb, var(--color-text-black) 55%, transparent)` |
| El reveal del hero condiciona la visibilidad del contenido | En headless y pestañas ocultas la transición no dispara y la sección envía en blanco | El contenido es visible por defecto; el motion solo lo *mejora*. Regla explícita del `SKILL.md` de impeccable |
| Mid-fi en la pasada 1 deja AC-11 y motion sin cerrar | VERIFY fallaría si se corriera al final de la pasada 1 | Registrado en la spec: **VERIFY corre al final de la pasada 2**, con tabla de qué cierra cada pasada |
| El copy es texto a validar, no final | Se publica copy sin revisión humana | Anotado en la spec como pendiente bloqueante para publicar, junto con las métricas `ILUSTRATIVO` |
| `Text` con token pelado en `color` no pinta y no rompe nada | Colores silenciosamente heredados; el hook no lo detecta | Usar siempre `textColor="<token-sin-->"`. Trampa 5 de `CLAUDE.md` |

## Alternativas descartadas

- **Recuperar la landing de 962 líneas de `git HEAD`** — descartada por decisión explícita
  en la fase SPEC: se diseña desde cero.
- **Segundo bloque carbón en `#metodo`** — descartada en `shape`: dos momentos cartel se
  anulan entre sí y tensionan el 60-30-10.
- **Cards para la prueba social** — descartada: las rejillas de cards idénticas están en
  las prohibiciones absolutas de `impeccable`.
- **Bajar AC-11 para que la pasada mid-fi pase la DoD** — descartada: el piso de
  accesibilidad no se negocia. Se mueve *cuándo* se verifica, no *qué* se exige.
- **`Footer` del toolkit** — descartada arriba: props cableadas a otra marca.
- **Persistir el lead** — fuera de alcance por decisión de la fase SPEC.

## Impacto en la constitución

- [x] **Ninguno — el plan cabe dentro de las reglas actuales.**

El cambio de `title` sm 22→24 px **no** requiere ADR: el contrato designa `_text.scss`
como fuente única de la escala, y ajustar un valor ahí es exactamente el mecanismo
previsto. El flujo SDD lista además "valor de token" entre las excepciones que ni
siquiera necesitan spec. No se relaja ninguna regla — se corrige un token que hoy
**contradice** la regla de Anton ≥24 px.
