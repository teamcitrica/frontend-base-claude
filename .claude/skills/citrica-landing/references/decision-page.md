# Página de decisión: elegir viendo

Las opciones se eligen **mirando imágenes en el navegador**, nunca leyendo tarjetas de
texto. El mecanismo es `impeccable serve-question` de impeccable: sirve una página local con una
tarjeta por opción, cada una con su imagen, y devuelve la elegida.

```bash
IMP=~/.claude/skills/impeccable/scripts
$IMP/impeccable serve-question --payload <payload.json> --timeout 900
```

- Abre el navegador solo. Espera la respuesta y la imprime por stdout:
  `ANSWER: {"optionId":"08-y2k","steer":"…"}`.
- **Exit 2** = no hay navegador (sin `DISPLAY`, SSH, CI, sandbox sin puerto). Fallback:
  mostrar cada PNG en el chat con `Read` y preguntar con `AskUserQuestion`.
- **Exit 4** = cerró la página sin elegir. Preguntar en el chat si repite o para.
- Si el shell con sandbox no deja abrir el puerto, repetir el comando fuera del sandbox.
- El payload se escribe en el scratchpad de la sesión, no en el repo. Rutas de imagen
  relativas al cwd (raíz del repo) o absolutas; el servidor las sirve él mismo.

## Ronda 1 — el catálogo (10 tarjetas)

Una tarjeta por estilo con su PNG en `comp` (imagen principal, grande). La décima deja que
impeccable proponga. `steer: true` da un campo de texto para un ajuste ("más oscuro",
"sin figuras 3D"). Sin `reroll`, sin `canon`, sin `buildPath`: la ruta la fija la skill.

```json
{
  "title": "Elige el mundo visual de <marca>",
  "question": "La landing se construirá fiel a la imagen que elijas: misma composición, mismos gestos, con la paleta y las fotos de la marca.",
  "steer": true,
  "options": [
    { "id": "01-clean-saas", "label": "Minimalismo funcional", "thesis": "La interfaz desaparece y el producto se ve.", "palette": ["#FFFFFF", "#0F172A", "#4F46E5"], "materials": ["bordes finos", "captura del producto", "un solo acento"], "viewport": "Titular a la izquierda, captura del producto a la derecha.", "comp": ".claude/skills/citrica-landing/references/styles/01-clean-saas.png" },
    { "id": "02-neo-brutalism", "label": "Neo-brutalismo", "thesis": "Bloques planos, bordes negros, sombras sólidas. Ruidoso a propósito.", "palette": ["#FACC15", "#EC4899", "#06B6D4", "#000000"], "materials": ["borde 4px", "sombra desplazada", "mono"], "viewport": "Dos mitades de color con el titular encajonado.", "comp": ".claude/skills/citrica-landing/references/styles/02-neo-brutalism.png" },
    { "id": "03-glassmorphism", "label": "Glassmorphism", "thesis": "Paneles de vidrio flotando sobre luz de color.", "palette": ["#1E293B", "#8B5CF6", "#22D3EE"], "materials": ["vidrio", "blur", "halo"], "viewport": "Paneles apilados centrados, mocks de app a la derecha.", "comp": ".claude/skills/citrica-landing/references/styles/03-glassmorphism.png" },
    { "id": "04-swiss", "label": "Estilo suizo", "thesis": "Retícula visible, tipografía enorme, cero decoración.", "palette": ["#F8F9FA", "#111111", "#0038FF"], "materials": ["líneas de retícula", "grotesca", "un bloque geométrico"], "viewport": "Titular a todo el ancho; columnas de texto debajo.", "comp": ".claude/skills/citrica-landing/references/styles/04-swiss.png" },
    { "id": "05-bento", "label": "Bento grid", "thesis": "Rejilla asimétrica de tarjetas, cada una una pieza del producto.", "palette": ["#09090B", "#18181B", "#FFFFFF"], "materials": ["tarjetas 24px", "borde 10 %", "micro-etiquetas"], "viewport": "Celda hero grande a la izquierda, métricas a la derecha.", "comp": ".claude/skills/citrica-landing/references/styles/05-bento.png" },
    { "id": "06-cyberpunk", "label": "Cyberpunk / dark tech", "thesis": "Interfaz HUD: marcos, esquinas, datos, neón sobre negro.", "palette": ["#05050A", "#00F0FF", "#FFE600", "#FF0055"], "materials": ["clip-path", "brillo neón", "mono"], "viewport": "Marco HUD con panel de datos a la derecha.", "comp": ".claude/skills/citrica-landing/references/styles/06-cyberpunk.png" },
    { "id": "07-luxury-editorial", "label": "Lujo editorial", "thesis": "Serif, aire y una foto grande. Lento y caro.", "palette": ["#FBF9F5", "#1A1817", "#8A9A86"], "materials": ["hairlines", "serif alta", "foto retrato"], "viewport": "Foto vertical a la izquierda, texto entre dos hairlines.", "comp": ".claude/skills/citrica-landing/references/styles/07-luxury-editorial.png" },
    { "id": "08-y2k", "label": "Y2K / Cyberpop", "thesis": "Cromo, iridiscencia, píldoras y estrellas. Maximalista.", "palette": ["#E2E8F0", "#FF69B4", "#A855F7", "#84CC16"], "materials": ["cromo", "fondo holográfico", "badges rotados"], "viewport": "Titular cromado sobre iridiscencia; figuras cromadas a los lados.", "comp": ".claude/skills/citrica-landing/references/styles/08-y2k.png" },
    { "id": "09-aurora", "label": "Aurora", "thesis": "Luz que fluye sobre un lienzo oscuro; las secciones son zonas de luz.", "palette": ["#0A0A12", "#4F46E5", "#C026D3", "#14B8A6"], "materials": ["malla de gradiente", "panel translúcido", "borde brillante"], "viewport": "Titular blanco a la izquierda, panel de código a la derecha.", "comp": ".claude/skills/citrica-landing/references/styles/09-aurora.png" },
    { "id": "impeccable", "label": "Que impeccable proponga", "thesis": "Tres estructuras propias para esta marca, sin catálogo.", "materials": ["ronda de estructuras", "fotos buscadas"], "viewport": "Siguiente página: tres esquemas con su foto de inspiración.", "wireframe": { "cols": 12, "rows": 10, "regions": [ { "label": "?", "x": 0, "y": 0, "w": 12, "h": 10 } ] } }
  ]
}
```

Los `#hex` del payload son los de "Paleta de entrada" de cada estilo: viven solo aquí y
en los archivos de estilo, nunca en el código.

**Catálogo elegido → la imagen es el comp aprobado.** No hay segunda ronda: la
composición, los gestos y el primer viewport los dicta la imagen. El `steer` del usuario
se anota en el Direction contract como ajuste puntual. Seguir con
[comp-led.md](comp-led.md).

## Ronda 2 — solo si eligió "Que impeccable proponga"

1. `$IMP/impeccable concept-seed --scope surface --mode persuade` (necesita
   `docs/product.md` con la sección de la marca ya escrita, aunque sea provisional).
2. Listar 5–7 estructuras propias a partir del brief; el script indica qué tres índices
   se reparten y cuál lidera (`kicker: "THE ROLL"`).
3. Para cada una, buscar **una foto de stock real** que la ilustre (Unsplash; verificar con
   `curl -I`) y ponerla en `hero`. Dibujar la estructura en `wireframe`
   (`cols: 12`, `rows: 10`, regiones con `label`, `x`, `y`, `w`, `h`, `accent`).
4. Si existe `OPENAI_API_KEY`: avisar el coste (≈ $0.05–0.25 por imagen) y generar un comp
   por tarjeta con `generate-impeccable image --out .impeccable/mocks/decision/<id>.png`,
   pasando `--ref` con la foto buscada. Sin key, **no** se generan imágenes.
5. Payload con las tres tarjetas, `reroll: true` y `steer: true`. Servir, leer `ANSWER`.
6. Con comp generado → comp aprobado, [comp-led.md](comp-led.md). Con wireframe → build
   code-led: la ambición va en el Direction contract (FIRST VIEWPORT literal) y el
   esqueleto en [landing-structures.md](landing-structures.md).

## Si el navegador no abre (exit 2)

Mostrar las imágenes en el chat, en orden, con `Read` sobre cada PNG, y una
`AskUserQuestion` de una sola pregunta con los 9 estilos + impeccable (máx. 4 opciones
por pregunta: agrupar en "Claros", "Oscuros", "Expresivos", "impeccable", y una segunda
pregunta solo dentro del grupo elegido). Es el único caso con dos preguntas.
