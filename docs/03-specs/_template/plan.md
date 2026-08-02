# PLAN — SPEC-NNNN

> El *cómo*. Se escribe después de que la spec está `approved`, y se aprueba antes
> de escribir código.

## Enfoque

Dos o tres frases: la estrategia elegida. No el detalle — la forma.

## Archivos que se tocan

Rutas reales, verificadas contra el repo. Si un archivo no existe todavía, marcarlo `[nuevo]`.

| Archivo | Qué cambia |
|---|---|
| `app/…` | … |
| `styles/…` | … |

## Componentes y tokens

Qué se reutiliza antes de escribir nada nuevo:

| Necesidad | Componente del toolkit | Tokens que consume |
|---|---|---|
| … | `Text variant="headline"` | `--color-text-black` |
| … | `Button variant="primary"` | `--color-primary-btn`, `--form-radius-btn` |

Si algo **no** existe en el toolkit, justificarlo aquí antes de escribir SCSS propio:

- …

## Riesgos

| Riesgo | Qué se rompe | Mitigación |
|---|---|---|
| … | … | … |

## Alternativas descartadas

- **<alternativa>** — descartada porque …

## Impacto en la constitución

- [ ] Ninguno — el plan cabe dentro de las reglas actuales
- [ ] Requiere ADR: … *(escribirlo **antes** de construir)*
