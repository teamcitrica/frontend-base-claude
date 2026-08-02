# Documentación

Índice maestro. La documentación está en dos capas: la **constitución** (verdades
estables del repo) y las **specs** (unidades de trabajo).

## Ruta rápida

| Si vas a… | Lee, en este orden |
|---|---|
| **Escribir código de UI** | [contrato de implementación](01-design/implementation-contract.md) → [convenciones](00-harness/conventions.md) |
| **Empezar una feature** | [flujo SDD](00-harness/sdd-workflow.md) → [plantilla de spec](03-specs/_template/spec.md) |
| **Cerrar una feature** | [Definition of Done](00-harness/definition-of-done.md) |
| **Entender el repo** | [arquitectura](02-architecture/overview.md) |
| **Entender el porqué** | [producto](product.md) → [marca](01-design/brand.md) |
| **Crear una web nueva** | [playbook](01-design/reference/new-web-playbook.md) |
| **Levantar una marca nueva** | [rebranding](rebranding.md) |

## Estructura

```
docs/
├── 00-harness/       Cómo se trabaja (proceso)
├── rebranding.md     Cómo levantar una marca nueva
├── product.md        Para quién y por qué          ┐  ← canónico (impeccable)
├── design.md         Cómo se ve                    │  ← canónico (impeccable)
├── 01-design/        Cómo se construye             ├─ Constitución
├── 02-architecture/  Qué hay y dónde está          ┘
├── 03-specs/         Qué se está construyendo      ─ Specs
└── 04-decisions/     Qué cambió la constitución    ─ ADRs
```

---

### 00 · Harness — el proceso

| Documento | Para qué |
|---|---|
| [sdd-workflow.md](00-harness/sdd-workflow.md) | El ciclo spec → plan → build → verify, y cuándo *no* hace falta spec |
| [conventions.md](00-harness/conventions.md) | Idioma, nombres, dónde va cada archivo, formato de commits |
| [definition-of-done.md](00-harness/definition-of-done.md) | La lista verificable que cierra cualquier tarea |

### Canónicos — leídos por `impeccable`

| Documento | Para qué |
|---|---|
| [product.md](product.md) | Usuarios, job-to-be-done, personalidad de marca, anti-referencias, principios de diseño |
| [design.md](design.md) | Color, tipografía, gestos de marca, layout, componentes, motion |
| [rebranding.md](rebranding.md) | Orden exacto para levantar una marca nueva sobre esta base |

> ⚠️ `product.md` y `design.md` deben quedarse en `docs/` con **esos nombres exactos**.
> La skill `impeccable` los busca ahí; si los mueves o renombras, reporta
> `NO_PRODUCT_MD` y arranca su flujo de init. Detalle en [rebranding.md](rebranding.md#compatibilidad-con-impeccable).

### 02 · Diseño — el cómo se ve y se construye

| Documento | Para qué |
|---|---|
| **[implementation-contract.md](01-design/implementation-contract.md)** | ⭐ **Las 4 reglas innegociables.** Fuente única. Empieza aquí |
| [design.md](design.md) | Color, tipografía, gestos de marca, layout, componentes, motion |
| [brand.md](01-design/brand.md) | Brand book ImPulso: esencia, paleta, logo, fotografía, tono de voz |

**Referencia** (`01-design/reference/`) — consulta, no lectura de corrido:

| Documento | Para qué |
|---|---|
| [web-guide.md](01-design/reference/web-guide.md) | Reglas de oro con ejemplos largos: layout, colores, toolkit, `Icon`, `Text` |
| [new-web-playbook.md](01-design/reference/new-web-playbook.md) | Paso a paso para levantar una web nueva |
| [citrica-ui-toolkit.md](01-design/reference/citrica-ui-toolkit.md) | Props de cada componente del toolkit |
| [layout-system.md](01-design/reference/layout-system.md) | Grid responsivo: `Container`, `Col`, breakpoints |
| [layout-visual-guide.md](01-design/reference/layout-visual-guide.md) | Diagramas del grid |
| [layout-examples.md](01-design/reference/layout-examples.md) | Ejemplos completos de página |
| [tokens-system.md](01-design/reference/tokens-system.md) | Arquitectura de tokens (web / admin) |
| [tokens-examples.md](01-design/reference/tokens-examples.md) | Uso de tokens |
| [styles-overview.md](01-design/reference/styles-overview.md) | Panorama del sistema ITCSS |

### 03 · Arquitectura — qué hay

| Documento | Para qué |
|---|---|
| [overview.md](02-architecture/overview.md) | Stack, estructura de directorios, datos y auth, comandos |

### 04 · Specs — qué se construye

[Índice de specs](03-specs/README.md) · [Plantilla](03-specs/_template/)

### 05 · Decisiones — qué cambió

[Índice de ADRs](04-decisions/README.md)

- [ADR-0001](04-decisions/0001-contrato-fuente-unica.md) — el contrato tiene una sola fuente
- [ADR-0002](04-decisions/0002-verificacion-pendiente.md) — verificación automática pendiente

---

## Reglas de esta documentación

1. **Una verdad, un lugar.** Si algo aparece en dos documentos, uno de los dos está
   mal. La regla vive en su documento dueño; el resto enlaza. Ver [ADR-0001](04-decisions/0001-contrato-fuente-unica.md).
2. **Las specs nunca contradicen la constitución.** Para contradecirla, primero un ADR.
3. **Regla que no se puede verificar, no es regla.** Si entra al contrato, entra con
   su comando en la [DoD](00-harness/definition-of-done.md).
4. **Documentación en español, código en inglés.** Ver [convenciones](00-harness/conventions.md).
