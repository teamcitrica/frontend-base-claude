COLOCAR AQUÍ EL BRAND TOOLKIT DE LA NUEVA MARCA

# ImPulso — Brand Toolkit

**Growth & Content Agency para el sector gastronómico**
Versión 1.0 · Julio 2026

---

## 1. Esencia de marca

### 1.1 Quiénes somos

ImPulso es una agencia de marketing y contenidos especializada en el sector gastronómico: restaurantes, cafeterías, dark kitchens, food trucks, marcas de alimentos y bebidas, y emprendimientos culinarios que quieren crecer con estrategia, no con suerte.

### 1.2 Propuesta de valor

> **"Le damos impulso a tu marca gastronómica: del plato a la pantalla, de la pantalla a la mesa llena."**

### 1.3 Pilares de marca

| Pilar | Qué significa | Cómo se manifiesta |
|---|---|---|
| **Energía** | Movimiento, aceleración, resultados | Naranja dominante, tipografía condensada y contundente |
| **Apetito** | Todo comunica sabor y deseo | Fotografía gastronómica protagonista, copy sensorial |
| **Precisión** | Estrategia con datos, no intuición | Layout limpio, jerarquía clara, métricas visibles |
| **Cercanía** | Hablamos como el dueño del restaurante, no como consultores | Tono directo, español peruano/latino natural |

### 1.4 Personalidad

- **Es**: enérgica, directa, apasionada por la comida, orientada a resultados, moderna.
- **No es**: corporativa fría, pretenciosa, técnica en exceso, genérica.
- **Arquetipo**: El Motivador con hambre de resultados — mezcla de *coach* y *foodie*.

---

## 2. Paleta de color

Basada en la identidad visual original de ImPulso. La paleta se estructura en colores primarios, de soporte y neutrales, con variantes tonales para garantizar consistencia en UI.

### 2.1 Colores primarios

| Color | Nombre | Hex | Uso principal |
|---|---|---|---|
| 🟧 | **Impulso Orange** | `#E8622C` | Color de marca. CTAs, acentos, avatar, elementos de acción |
| ⬛ | **Carbón** | `#111111` | Titulares, texto principal, fondos de alto impacto |
| ⬜ | **Blanco Plato** | `#FFFFFF` | Fondos principales, texto sobre oscuro |
| 🟨 | **Amarillo Sazón** | `#F5DE4B` | Acento secundario. Highlights, badges, hover states |

### 2.2 Variantes tonales (escala funcional)

**Naranja (marca / acción)**
```
orange-50:  #FDEFE8   → fondos suaves, backgrounds de secciones
orange-100: #F9D5C2   → hover de fondos claros, borders sutiles
orange-300: #F09A6B   → estados disabled de botones primarios
orange-500: #E8622C   → COLOR BASE — botones, links, acentos
orange-600: #CE4F1D   → hover de botones primarios
orange-700: #A83E15   → active/pressed, texto naranja sobre claro (AA)
```

**Amarillo (energía / highlight)**
```
yellow-100: #FCF6D4   → fondos de callouts, avisos suaves
yellow-500: #F5DE4B   → COLOR BASE — subrayados, badges, marcadores
yellow-600: #D9BF28   → hover, borders de badges
```

**Neutrales (estructura)**
```
neutral-0:    #FFFFFF   → fondo principal
neutral-50:   #F7F6F4   → fondo alterno de secciones (blanco cálido)
neutral-200:  #E2E0DC   → borders, dividers
neutral-400:  #8C8C8C   → texto secundario, captions (gris del brandboard)
neutral-600:  #4A4A4A   → texto de párrafo largo sobre claro
neutral-900:  #111111   → titulares, fondos dark
```

### 2.3 Colores semánticos (UI)

```
success: #2E9E5B   → confirmaciones, métricas positivas
warning: #D9BF28   → alertas (derivado del amarillo de marca)
error:   #C63A2B   → errores (rojo cálido, familia del naranja)
info:    #2D6FA8   → información neutral (uso mínimo)
```

### 2.4 Reglas de proporción (60-30-10)

- **60%** — Blanco / neutrales claros (respiración, legibilidad)
- **30%** — Carbón `#111111` (titulares, secciones dark de contraste)
- **10%** — Impulso Orange (solo en acciones y acentos; el naranja pierde fuerza si se usa en todo)
- **Amarillo Sazón**: condimento, no ingrediente principal. Máximo un elemento amarillo por viewport.

### 2.5 Accesibilidad de contraste (WCAG)

| Combinación | Ratio | Uso permitido |
|---|---|---|
| `#111111` sobre `#FFFFFF` | 18.9:1 | ✅ Texto de cualquier tamaño |
| `#FFFFFF` sobre `#E8622C` | 3.4:1 | ✅ Solo texto grande (18px+ bold / 24px+) y botones |
| `#A83E15` sobre `#FFFFFF` | 7.0:1 | ✅ Texto naranja pequeño (usar esta variante, no la 500) |
| `#111111` sobre `#F5DE4B` | 14.5:1 | ✅ Texto sobre amarillo |
| `#8C8C8C` sobre `#FFFFFF` | 3.5:1 | ⚠️ Solo captions y texto grande, nunca párrafos clave |

**Regla de oro**: texto blanco sobre naranja solo en botones y titulares grandes. Para links y texto naranja pequeño, usar `orange-700`.

---

## 3. Tipografía

### 3.1 Familias

| Rol | Fuente | Fallback | Fuente |
|---|---|---|---|
| **Display / Titulares** | Anton | `Impact, 'Arial Narrow Bold', sans-serif` | Google Fonts |
| **Texto / UI** | Lato | `'Helvetica Neue', Arial, sans-serif` | Google Fonts |

**Anton** es la voz de la marca: condensada, contundente, con presencia de cartel de mercado y titular deportivo. Se usa **solo en mayúsculas o capitalización de marca** ("ImPulso"), nunca para párrafos.

**Lato** hace todo el trabajo de lectura: párrafos, navegación, formularios, captions.

### 3.2 Escala tipográfica (base 16px, ratio ~1.25)

| Token | Tamaño / línea | Fuente y peso | Uso |
|---|---|---|---|
| `display-xl` | 72px / 1.0 | Anton 400 | Hero principal |
| `display-lg` | 56px / 1.05 | Anton 400 | Titulares de sección |
| `h1` | 44px / 1.1 | Anton 400 | Título de página interna |
| `h2` | 32px / 1.15 | Anton 400 | Subtítulos de sección |
| `h3` | 24px / 1.25 | Lato 700 | Títulos de cards |
| `h4` | 20px / 1.3 | Lato 700 | Subtítulos menores |
| `body-lg` | 18px / 1.6 | Lato 400 | Intro de secciones |
| `body` | 16px / 1.6 | Lato 400 | Párrafo estándar |
| `body-sm` | 14px / 1.5 | Lato 400 | Texto secundario |
| `caption` | 12px / 1.4 | Lato 400, letter-spacing 0.08em, uppercase | Etiquetas, eyebrows |

### 3.3 Reglas tipográficas

1. Anton **nunca** en tamaños menores a 24px (pierde legibilidad).
2. Titulares en Anton con `letter-spacing: 0.01em` (compensar la condensación).
3. El juego de la marca — **Im** en negro + **Pulso** en blanco/naranja — puede replicarse en titulares clave usando dos colores en una misma palabra. Es el gesto tipográfico distintivo de la marca (ver §6.4).
4. Párrafos: máximo 65–72 caracteres por línea.
5. Eyebrows (etiqueta sobre el titular): Lato 700, uppercase, 12–13px, en `orange-700` sobre claro o `yellow-500` sobre oscuro.

---

## 4. Logo y avatar

### 4.1 Versiones

| Versión | Composición | Uso |
|---|---|---|
| **Principal** | "Im" negro + "Pulso" blanco + tagline | Sobre fondos medios/oscuros |
| **Invertida** | "Im" negro + "Pulso" naranja | Sobre fondo blanco |
| **Monocromo negro** | Todo en `#111111` | Documentos, sellos, grabados |
| **Monocromo blanco** | Todo en `#FFFFFF` | Sobre fotografía oscura o fondo carbón |
| **Avatar** | Círculo naranja `#E8622C` con "ImPulso" (Im negro, Pulso blanco) | Redes sociales, favicon, firma |

### 4.2 Reglas de uso

- **Área de protección**: mínimo la altura de la "I" de ImPulso alrededor del logo.
- **Tamaño mínimo**: 120px de ancho (digital) / 30mm (impreso). Avatar: 32px mínimo.
- **Nunca**: distorsionar, rotar, aplicar sombras o degradados, cambiar la relación de color Im/Pulso, colocar sobre fotografías sin capa de contraste.
- El tagline "Growth & Content Agency" se omite en tamaños menores a 200px de ancho.

---

## 5. Fotografía e imagen

### 5.1 Estilo fotográfico

La comida es la protagonista; ImPulso es el amplificador.

- **Luz**: natural o cálida, contrastada. Nada de flash plano ni luz fría de laboratorio.
- **Ángulos**: cenital (flat lay) para composiciones, 45° para platos con altura, macro para texturas (queso derretido, vapor, salsas).
- **Movimiento**: se valora el instante — salsa cayendo, humo, manos cocinando, fuego. La marca se llama ImPulso: las fotos deben tener energía cinética.
- **Personas**: manos de cocineros, clientes disfrutando, equipos en acción. Reales, no stock genérico.
- **Color grading**: cálido, saturación media-alta, negros profundos que conecten con el `#111111` de marca.

### 5.2 Tratamientos gráficos sobre foto

- **Duotono naranja/carbón** para fondos de secciones donde el texto es protagonista.
- **Overlay carbón al 40–60%** cuando hay texto blanco sobre fotografía.
- **Recortes en círculo** (eco del avatar) para destacar platos o retratos de clientes.

### 5.3 Qué evitar

- Stock genérico de "gente de negocios dándose la mano".
- Fotos de comida con luz fría, desaturada o borrosa.
- Ilustraciones 3D genéricas tipo corporate-memphis.

---

## 6. Sistema de diseño web

### 6.1 Concepto de dirección de arte

**"La carta del mercado moderno"**: la contundencia de un cartel de mercado (Anton, negro, naranja) con la disciplina de una agencia de growth (grillas limpias, métricas, blanco generoso). Alto contraste entre secciones claras y secciones carbón. El naranja siempre indica acción.

### 6.2 Layout

- **Grid**: 12 columnas, max-width 1200–1280px, gutter 24px.
- **Espaciado**: escala de 8px (8, 16, 24, 32, 48, 64, 96, 128).
- **Secciones**: alternar fondo blanco / `neutral-50` / carbón para crear ritmo. Al menos una sección carbón por página (es el momento "cartel" de la marca).
- **Bordes**: radio 8px en cards e inputs, 999px (pill) en botones y badges. El círculo del avatar es la única forma completamente redonda destacada.

### 6.3 Componentes clave

**Botón primario**
```
Fondo: #E8622C · Texto: #FFFFFF · Lato 700, 16px
Padding: 14px 32px · Radio: 999px (pill)
Hover: #CE4F1D · Active: #A83E15
Focus: outline 2px #111111 offset 2px
```

**Botón secundario**
```
Fondo: transparente · Border: 2px #111111 · Texto: #111111
Hover: fondo #111111, texto #FFFFFF
(Sobre fondo carbón: border y texto blancos; hover invierte)
```

**Botón terciario / link**
```
Texto: #A83E15 · Lato 700 · Subrayado en hover con #F5DE4B (marcador amarillo)
```

**Card de servicio**
```
Fondo: #FFFFFF · Border: 1px #E2E0DC · Radio: 8px · Padding: 32px
Hover: border #E8622C + elevación sutil (0 8px 24px rgba(17,17,17,0.08))
Icono en círculo naranja 48px (eco del avatar)
```

**Badge / etiqueta**
```
Fondo: #F5DE4B · Texto: #111111 · Lato 700, 12px uppercase
Padding: 4px 12px · Radio: 999px
```

**Métrica destacada**
```
Número: Anton, 56–72px, #E8622C (sobre claro) o #F5DE4B (sobre carbón)
Label: Lato 400, 14px, neutral-400/600
Ej: "+180%" / "reservas en 3 meses"
```

### 6.4 Firma visual: el "pulso bicolor"

Elemento distintivo y repetible: en titulares clave, la palabra de acción se parte en dos colores imitando el logo.

```
Sobre blanco:  Im[negro]Pulsa[naranja] tu restaurante
Sobre carbón:  Más [blanco]mesas llenas[naranja]
```

Usar una vez por página como máximo en el hero o CTA final. Es la rúbrica de la marca, no un recurso decorativo constante.

Segundo recurso de firma: el **subrayado marcador amarillo** (`#F5DE4B`, trazo grueso ligeramente irregular tipo highlighter) bajo 1–3 palabras clave del hero.

### 6.5 Estructura recomendada del website

1. **Hero** — Titular Anton con pulso bicolor + subrayado amarillo, foto gastronómica con energía, CTA naranja. Eyebrow: "AGENCIA DE MARKETING GASTRONÓMICO".
2. **Prueba social inmediata** — Logos de clientes o 3 métricas grandes (Anton naranja).
3. **Servicios** — Cards con iconos en círculo naranja: contenido, pauta, redes, branding, fotografía gastronómica, growth.
4. **Sección carbón "El método ImPulso"** — Fondo `#111111`, proceso en 3–4 pasos, acentos amarillo/naranja.
5. **Casos de éxito** — Foto del plato/local + métrica destacada + testimonio corto.
6. **Sobre nosotros** — Equipo, tono cercano.
7. **CTA final** — Sección naranja o carbón: "¿Listo para llenar mesas?" + botón contrastado.
8. **Footer** — Carbón, logo monocromo blanco, links en Lato, avatar como favicon/firma.

### 6.6 Iconografía

- Librería: **Lucide** (trazo consistente, 1.5–2px).
- Tamaño estándar: 24px; en círculos de card: 24px dentro de círculo de 48px.
- Color: `#111111` sobre claro, `#FFFFFF` sobre naranja/carbón. Nunca iconos multicolor.

### 6.7 Motion

- Transiciones: 200–250ms `ease-out` en hovers.
- Un solo momento orquestado: reveal del hero (titular entra con leve slide-up escalonado, el subrayado amarillo se "dibuja" de izquierda a derecha en 400ms).
- Respetar `prefers-reduced-motion`.

---

## 7. Tono de voz y copy

### 7.1 Principios

| Principio | Mal ❌ | Bien ✅ |
|---|---|---|
| **Directo** | "Ofrecemos soluciones integrales de comunicación" | "Llenamos tus mesas" |
| **Sensorial** | "Contenido de calidad para tu negocio" | "Contenido que se antoja antes del primer bite" |
| **Con datos** | "Grandes resultados" | "+180% de reservas en 3 meses" |
| **Cercano** | "Nuestros stakeholders del rubro F&B" | "Si tienes un restaurante, esto es para ti" |

### 7.2 Vocabulario de marca

- **Usar**: impulso, impulsar, acelerar, llenar mesas, antojar, sazón, crecer, del plato a la pantalla.
- **Evitar**: sinergia, holístico, disruptivo, soluciones 360°, ecosistema (salvo contexto técnico real).
- CTAs siempre en verbo de acción: "Impulsa tu marca", "Agenda una llamada", "Quiero llenar mesas".

### 7.3 Ejemplos de copy listos

**Hero**: 
> IM**PULSA** TU RESTAURANTE
> Marketing y contenido para marcas gastronómicas que quieren mesas llenas, no solo likes.
> [Agenda una llamada gratis]

**CTA final**:
> ¿TU COMIDA ES BUENA PERO NADIE LO SABE?
> Eso se arregla. Hablemos.
> [Quiero mi diagnóstico gratis]

---

## 8. Tokens CSS de referencia

> ### ⚠️ Estos nombres NO existen en el código
>
> El bloque de abajo es **nomenclatura conceptual del brand book**, no la API real del
> repo. Se verificó contra `styles/` el 2026-08-01: **ninguna** de estas variables
> (`--color-orange-500`, `--color-neutral-900`, `--font-display`, `--space-2`,
> `--radius-pill`, `--shadow-card`) está definida. Usarlas produce CSS que no resuelve.
>
> **Los nombres reales** salen de `styles/10-tokens/web/colors/_palette.scss` y tienen
> forma `var(--color-primary)`, `var(--color-text-black)`, `var(--color-surface)`,
> `var(--color-tertiary)`. Las fuentes son `var(--font-family-a)` (Anton) y
> `var(--font-family-b/c/d)` (Lato).
>
> Para escribir código, la referencia correcta es
> **[implementation-contract.md](implementation-contract.md)**. Lee el bloque de abajo
> como paleta de marca (qué hex es qué), nunca como nombres a copiar.

```css
:root {
  /* Marca */
  --color-orange-50:  #FDEFE8;
  --color-orange-100: #F9D5C2;
  --color-orange-300: #F09A6B;
  --color-orange-500: #E8622C;
  --color-orange-600: #CE4F1D;
  --color-orange-700: #A83E15;

  --color-yellow-100: #FCF6D4;
  --color-yellow-500: #F5DE4B;
  --color-yellow-600: #D9BF28;

  /* Neutrales */
  --color-neutral-0:   #FFFFFF;
  --color-neutral-50:  #F7F6F4;
  --color-neutral-200: #E2E0DC;
  --color-neutral-400: #8C8C8C;
  --color-neutral-600: #4A4A4A;
  --color-neutral-900: #111111;

  /* Semánticos */
  --color-success: #2E9E5B;
  --color-warning: #D9BF28;
  --color-error:   #C63A2B;
  --color-info:    #2D6FA8;

  /* Tipografía */
  --font-display: 'Anton', Impact, 'Arial Narrow Bold', sans-serif;
  --font-body:    'Lato', 'Helvetica Neue', Arial, sans-serif;

  /* Espaciado (escala 8px) */
  --space-1: 8px;  --space-2: 16px; --space-3: 24px; --space-4: 32px;
  --space-6: 48px; --space-8: 64px; --space-12: 96px; --space-16: 128px;

  /* Radios */
  --radius-card: 8px;
  --radius-pill: 999px;

  /* Sombra */
  --shadow-card: 0 8px 24px rgba(17, 17, 17, 0.08);
}
```

---

## 9. Checklist de coherencia

Antes de publicar cualquier pieza o página, verificar:

- [ ] El naranja aparece solo en acciones y acentos (≤10% del viewport)
- [ ] Máximo un elemento amarillo destacado por pantalla
- [ ] Anton solo en titulares ≥24px, nunca en párrafos
- [ ] Texto naranja pequeño usa `#A83E15`, no `#E8622C`
- [ ] Toda foto con texto encima tiene overlay de contraste
- [ ] El pulso bicolor aparece máximo una vez por página
- [ ] CTAs con verbos de acción, sin jerga corporativa
- [ ] Al menos una métrica real y verificable visible
- [ ] Focus visible en todos los elementos interactivos
- [ ] `prefers-reduced-motion` respetado

---

Landing page ImPulso (Estructura de Landing)


Sección 1 — Titular principal
Deja de adivinar si tu marketing funciona. Empieza a llenar mesas con datos, no con suerte.

Sección 2 — Subtítulo
Para restaurantes de ticket medio y alto que quieren crecer de forma constante y por fin saber qué campaña les trae comensales.

Sección 3 — El problema
¿Tu marketing es una caja negra?
Metes plata y no sabes si vuelve. Inviertes en fotos, videos y pauta digital, y a fin de mes solo puedes decir "creo que funcionó."
Te escriben y respondes cuando puedes. Cada mensaje de WhatsApp sin responder a tiempo es una reserva que se va a otro restaurante, sin que tú te enteres.
No sabes qué cortar ni qué duplicar. Sin visibilidad real del retorno, cada decisión de inversión es una apuesta a ciegas.

Sección 4 — Por qué no has podido solucionarlo hasta ahora
No es falta de esfuerzo. Es falta de sistema.
Has probado meter presupuesto en pauta, contratar a alguien para redes, o confiar en un proveedor que prometía mucho.
El problema es que la mayoría de agencias venden la idea perfecta... y después desaparecen. Te ponen un ejecutivo de cuenta cuyo trabajo es venderte más, no cuidar que tu inversión rinda.
Y sin un diagnóstico real de por dónde te encuentran hoy tus comensales, cualquier campaña es un tiro al aire.

Sección 5 — La solución
El marketing no es "presencia". Es flujo de comensales.
Cada campaña tiene que responder una sola pregunta: ¿cuánta gente nueva trajo a tu local? Si no lo puedes responder, no es marketing — es gasto.
Por eso no empezamos metiendo plata en anuncios. Empezamos auditando cómo te encuentra hoy un comensal nuevo, y dónde estás perdiendo reservas sin darte cuenta.

Sección 6 — Cómo funciona
El Sistema Mesa Activa, en 4 pasos
1. Diagnóstico de visibilidad — Analizamos cómo te encuentra hoy un comensal nuevo en Google y detectamos exactamente dónde se te están escapando reservas.
2. Posicionamiento local estratégico — Optimizamos tu perfil para que aparezcas primero cuando alguien busca dónde comer en tu zona, justo cuando tiene hambre y está decidiendo.
3. Adquisición de comensales — Campañas en Meta y Google Ads enfocadas en conversión real, más colaboraciones con perfiles gastronómicos que generan confianza.
4. Seguimiento y optimización semanal — Medimos cada 7 días. Si algo no rinde, lo ajustamos de inmediato. Transparencia total sobre dónde está tu inversión.

Sección 7 — Qué vas a conseguir
En 90 días, un restaurante con flujo constante
Un sistema que atrae y fideliza comensales de forma predecible, mes a mes — no por suerte.
Claridad total: sabrás exactamente cuánto te genera cada peso invertido, sin suposiciones.
Un equipo que te avisa y ajusta las campañas antes de que tú tengas que preguntar.

Sección 8 — Por qué confiar en nosotros
Entendemos tu negocio porque lo vivimos
Somos dueños de restaurante. Probamos cada estrategia en nuestro propio negocio antes de aplicarla con nuestros clientes.
Venimos de agencias de primer nivel. Sabemos distinguir lo que genera ventas reales de lo que es simple humo.
"No te vendemos teoría, te vendemos lo que ya nos funcionó a nosotros. Sabemos lo que es tener mesas vacías un martes por la noche."

Sección 9 — Garantía
Nuestro compromiso contigo
Si en los primeros 90 días no hay una mejora clara en tu visibilidad y rendimiento publicitario, seguimos trabajando contigo un mes adicional sin costo, hasta que los resultados sean visibles.
Sin letras pequeñas.

Sección 10 — CTA final
¿Hablamos esta semana?
Recupera el control de tu marketing y llena tus mesas.
Rellena el formulario y agendamos tu estudio gratuito. Sin compromiso. Solo una conversación honesta sobre tu situación y qué hacer para mejorarla.
[Agendar mi estudio gratuito]
