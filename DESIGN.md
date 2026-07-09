---
name: ImPulso — Growth & Content Agency (Gastronomía)
description: High-contrast, market-poster brand system — Impulso Orange + Carbón + Amarillo Sazón, Anton display over Lato body, for the ImPulso gastronomic marketing landing
fonts:
  display: "Anton"
  body: "Lato"
colors:
  # Marca
  impulso-orange: "#E8622C"   # orange-500 — brand base: CTAs, accents, avatar, action
  orange-hover: "#CE4F1D"     # orange-600 — primary button hover
  orange-active: "#A83E15"    # orange-700 — active/pressed, small orange text on light (AA 7:1)
  orange-50: "#FDEFE8"        # soft section backgrounds
  orange-100: "#F9D5C2"       # hover of light fills, subtle borders
  orange-300: "#F09A6B"       # disabled primary button
  amarillo-sazon: "#F5DE4B"   # yellow-500 — highlighter underline, badges, markers
  yellow-100: "#FCF6D4"       # callout / soft-notice backgrounds
  yellow-600: "#D9BF28"       # yellow hover, badge borders (== warning)
  # Neutrales
  carbon: "#111111"           # neutral-900 — headlines, primary text, dark sections
  blanco-plato: "#FFFFFF"     # neutral-0 — primary background, text on dark
  neutral-50: "#F7F6F4"       # warm off-white — alternating section background
  neutral-200: "#E2E0DC"      # borders, dividers
  neutral-400: "#8C8C8C"      # secondary text / captions (large text only, 3.5:1)
  neutral-600: "#4A4A4A"      # long-form paragraph text on light
  # Semánticos
  success: "#2E9E5B"
  warning: "#D9BF28"
  error: "#C63A2B"
  info: "#2D6FA8"
rounded:
  card: "8px"
  input: "8px"
  pill: "999px"     # buttons, badges
spacing:
  scale: "8px base — 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128"
grid:
  columns: 12
  maxWidth: "1200–1280px"
  gutter: "24px"
components:
  button-primary:
    backgroundColor: "{colors.impulso-orange}"
    textColor: "{colors.blanco-plato}"
    font: "Lato 700, 16px"
    padding: "14px 32px"
    rounded: "{rounded.pill}"
    hover: "{colors.orange-hover}"
    active: "{colors.orange-active}"
    focus: "outline 2px {colors.carbon} offset 2px"
  button-secondary:
    backgroundColor: "transparent"
    border: "2px {colors.carbon}"
    textColor: "{colors.carbon}"
    rounded: "{rounded.pill}"
    hover: "fill {colors.carbon}, text {colors.blanco-plato}"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.orange-active}"
    font: "Lato 700"
    hover: "underline with {colors.amarillo-sazon} marker"
  card-servicio:
    backgroundColor: "{colors.blanco-plato}"
    border: "1px {colors.neutral-200}"
    rounded: "{rounded.card}"
    padding: "32px"
    hover: "border {colors.impulso-orange} + shadow 0 8px 24px rgba(17,17,17,0.08)"
    icon: "24px Lucide in 48px orange circle (avatar echo)"
  badge:
    backgroundColor: "{colors.amarillo-sazon}"
    textColor: "{colors.carbon}"
    font: "Lato 700, 12px uppercase"
    padding: "4px 12px"
    rounded: "{rounded.pill}"
  metric:
    number: "Anton 56–72px, {colors.impulso-orange} on light / {colors.amarillo-sazon} on carbón"
    label: "Lato 400, 14px, {colors.neutral-600}"
---

# Design System: ImPulso — La carta del mercado moderno

> **Source of truth.** This document is derived from `NEW_BRAND.md` (ImPulso Brand Toolkit v1.0, Julio 2026). Where they differ, the toolkit wins — update it there and re-derive.
>
> **Implementation status — migrated & live.** The ImPulso values are already in code: the palette (`_palette.scss`), the type scale (`_text.scss`), the fonts (`settings.scss`), and the button/form tokens (`_button.scss` / `_form.scss`); the landing (`app/page.tsx` + `styles/webpages-styles/impulso.scss`) is built on `citrica-ui-toolkit`. There is no legacy `#FF5B00` and no hardcoded hex. **When extending this surface, follow §10 to keep it single-sourced** — that section is the build contract, not the aspiration.

## 1. Overview

**Creative North Star: "La carta del mercado moderno."**

The bluntness of a market poster — Anton in caps, carbón black, a single decisive orange — disciplined by a growth agency's structure: clean 12-column grids, visible metrics, generous white space. The page moves in high contrast: bright, airy sections give way to at least one **carbón `#111111`** section per page — the "poster moment" where the brand shouts. Orange never decorates; **orange always means action.**

This is a *results scoreboard*, not an editorial magazine. Anton is a concert-poster / sports-headline voice, the opposite of a display-serif specimen page. The energy is kinetic (the name is *ImPulso*), the register is warm and Peruvian, and every visual claim is backed by a real number.

**Key characteristics:**
- One decisive orange (`#E8622C`) reserved for action & accent — the 10% in a 60-30-10 discipline.
- Carbón (`#111111`) as a full structural color, not just ink: entire sections invert to it for rhythm.
- Amarillo Sazón (`#F5DE4B`) as *condiment* — a highlighter underline or a badge, max one per viewport.
- Anton (display, caps only, ≥24px) over Lato (all reading). A hard poster/body split.
- Food photography as protagonist; warm, contrasted, kinetic. Never cold or desaturated.
- Two signature gestures: the **pulso bicolor** (a word split into two colors, echoing the Im/Pulso logo) and the **yellow highlighter underline**.

## 2. Colors

A high-contrast system on three brand pillars — orange (action), carbón (impact/structure), yellow (highlight) — over warm neutrals. Proportion is a rule, not a suggestion: **60% neutral / 30% carbón / 10% orange.**

### Primary — Impulso Orange
- **Impulso Orange** (`#E8622C`, `orange-500`): the brand. CTAs, links, accents, the avatar circle, action icons. The 10%.
- **Orange hover** (`#CE4F1D`, `orange-600`) / **Active** (`#A83E15`, `orange-700`): same hue, deeper. `orange-700` doubles as the **only** orange allowed for small text/links on light (7.0:1 AA).
- **Tints:** `orange-50 #FDEFE8` (soft section bg), `orange-100 #F9D5C2` (subtle hover/border), `orange-300 #F09A6B` (disabled primary).

### Structure — Carbón
- **Carbón** (`#111111`, `neutral-900`): headlines, primary text, and **whole high-impact sections**. Not merely "ink" — it's a surface color. At least one carbón section per page. White text on carbón is 18.9:1.

### Highlight — Amarillo Sazón
- **Amarillo Sazón** (`#F5DE4B`, `yellow-500`): the highlighter underline, badges, markers. **Condiment, not ingredient — max one yellow element per viewport.** `yellow-100 #FCF6D4` for soft callouts; `yellow-600 #D9BF28` for hover/badge borders.

### Neutral
- **Blanco Plato** (`#FFFFFF`) primary bg; **neutral-50** (`#F7F6F4`, warm off-white) for alternating sections; **neutral-200** (`#E2E0DC`) borders/dividers.
- **Text on light:** `neutral-600 #4A4A4A` for long paragraphs, `carbón #111111` for headings. **neutral-400 `#8C8C8C` is captions/large-text only (3.5:1)** — never key paragraphs.

### Semantic
- **Success** `#2E9E5B` · **Warning** `#D9BF28` (derived from brand yellow) · **Error** `#C63A2B` (warm red, orange family) · **Info** `#2D6FA8` (minimal use).

### Named rules
- **The 60-30-10 rule.** Neutral 60%, carbón 30%, orange 10%. If orange exceeds ~10% of a viewport, it stops reading as brand and starts reading as noise.
- **The small-orange-text rule.** Any orange text below large/bold uses `#A83E15` (`orange-700`), never `#E8622C`. White-on-orange (3.4:1) is for buttons and large/bold headings only.
- **The one-yellow rule.** Maximum one Amarillo Sazón element per viewport. It's a condiment.
- **The overlay rule.** Any text over photography gets a carbón overlay at 40–60% first.

## 3. Typography

A hard two-family split: a poster voice and a reading voice, paired on a strong contrast axis (condensed display vs. humanist body).

**Display — Anton** (`Impact, 'Arial Narrow Bold', sans-serif` fallback). Condensed, blunt, market-poster presence. **Caps or brand capitalization ("ImPulso") only. Never below 24px. Never paragraphs.** Titles carry `letter-spacing: 0.01em` to offset the condensation.

**Body — Lato** (`'Helvetica Neue', Arial, sans-serif` fallback). All reading: paragraphs, nav, forms, captions. Body lines cap at 65–72 characters.

> **Identity-preservation note.** Both families come straight from the committed ImPulso brand book, so the reflex-reject lists don't apply — Anton is a deliberate, distinctive poster choice, and Lato is the brand's specified reading face. Don't second-guess them on this surface.

### Scale (base 16px, ratio ~1.25)

| Token | Size / line | Face & weight | Use |
|---|---|---|---|
| `display-xl` | 72px / 1.0 | Anton 400 | Hero |
| `display-lg` | 56px / 1.05 | Anton 400 | Section titles |
| `h1` | 44px / 1.1 | Anton 400 | Inner page title |
| `h2` | 32px / 1.15 | Anton 400 | Section subtitles |
| `h3` | 24px / 1.25 | Lato 700 | Card titles |
| `h4` | 20px / 1.3 | Lato 700 | Minor subtitles |
| `body-lg` | 18px / 1.6 | Lato 400 | Section intros |
| `body` | 16px / 1.6 | Lato 400 | Standard paragraph |
| `body-sm` | 14px / 1.5 | Lato 400 | Secondary text |
| `caption` | 12px / 1.4, +0.08em, uppercase | Lato 400 | Eyebrows, labels |

Fluid `clamp()` the two display steps for responsive heroes; keep display letter-spacing ≥ -0.02em (Anton is condensed, don't tighten further). Use `text-wrap: balance` on h1–h2, `text-wrap: pretty` on prose.

### Named rules
- **The Anton-title rule.** Anton is titles-only, ≥24px, caps. Any Anton paragraph or sub-24px Anton is a defect.
- **The eyebrow rule.** Section eyebrows are Lato 700, uppercase, 12–13px, `orange-700` on light / `yellow-500` on carbón — a deliberate, sparing device, not a per-section reflex.

## 4. Signature gestures

Two repeatable rúbricas that make a page unmistakably ImPulso. Each is used **sparingly** — presence, not pattern.

### The pulso bicolor
In one key headline per page (hero or final CTA), the action word splits into two colors, echoing the Im/Pulso logo:
- On white: `Im`(carbón) `Pulsa`(orange) tu restaurante
- On carbón: `Más`(white) `mesas llenas`(orange)

**Max once per page.** It's the brand signature, not a decorative reflex.

### The yellow highlighter underline
A thick, slightly irregular highlighter stroke (`#F5DE4B`) under 1–3 key words of the hero. On the orchestrated hero reveal it "draws" left-to-right over ~400ms. Counts as the viewport's one yellow element.

## 5. Layout

- **Grid:** 12 columns, max-width 1200–1280px, 24px gutter.
- **Spacing:** 8px scale (8 / 16 / 24 / 32 / 48 / 64 / 96 / 128). Vary for rhythm — generous between sections, tight within groups.
- **Section rhythm:** alternate white / `neutral-50` / carbón. At least one carbón section per page (the poster moment).
- **Shape:** `8px` on cards and inputs; `999px` pill on buttons and badges. The orange avatar circle is the one fully-round hero shape. **Do not** round cards past 16px.
- **Imagery:** food photography leads — warm, contrasted, kinetic (falling sauce, steam, fire, hands cooking). Duotone orange/carbón for text-over-photo sections; carbón overlay 40–60% behind white text; circular crops (avatar echo) for featured dishes/portraits. Zero imagery on this food brief is a bug — ship real photography, never colored placeholder blocks.

## 6. Components

### Buttons
- **Primary:** orange fill `#E8622C`, white text, Lato 700 16px, `14px 32px`, pill. Hover `#CE4F1D`, active `#A83E15`, focus outline 2px carbón offset 2px.
- **Secondary:** transparent, 2px carbón border, carbón text; hover inverts to carbón fill / white text. (On carbón: white border+text, hover inverts.)
- **Tertiary / link:** `#A83E15` text, Lato 700, hover adds a yellow (`#F5DE4B`) highlighter underline.

### Card de servicio
White fill, 1px `#E2E0DC` border, `8px` radius, 32px padding. Hover: border → orange + subtle lift `0 8px 24px rgba(17,17,17,0.08)`. Icon: 24px Lucide inside a 48px orange circle (avatar echo). **Never** pair the 1px border with a wide shadow at rest — the lift is a hover-only affordance.

### Badge
Amarillo Sazón fill, carbón text, Lato 700 12px uppercase, `4px 12px`, pill. One per viewport.

### Métrica destacada
Number in Anton 56–72px (`#E8622C` on light / `#F5DE4B` on carbón); label Lato 400 14px `neutral-600`. e.g. **"+180%"** / "reservas en 3 meses". At least one real, verifiable metric visible per page.

### Iconography
Lucide, 1.5–2px stroke, 24px standard. Carbón on light, white on orange/carbón. Never multicolor.

## 7. Motion

- Hovers: 200–250ms `ease-out`.
- **One orchestrated moment:** the hero reveal — title slides up in a light stagger while the yellow underline draws left-to-right over ~400ms.
- Every animation ships a `prefers-reduced-motion` alternative (crossfade / instant). The underline draw becomes a static underline.
- Ease-out with exponential curves; no bounce, no elastic. Don't animate layout properties.

## 8. Recommended page structure

The conversion long-scroll (from `NEW_BRAND.md` §6.5 and the landing copy):

1. **Hero** — Anton headline with pulso bicolor + yellow underline, kinetic food photo, orange CTA. Eyebrow: "AGENCIA DE MARKETING GASTRONÓMICO". Headline: *"Deja de adivinar si tu marketing funciona. Empieza a llenar mesas con datos, no con suerte."*
2. **Prueba social** — client logos or 3 large Anton-orange metrics.
3. **El problema** — "¿Tu marketing es una caja negra?" — three concrete pains.
4. **Por qué no lo has resuelto** — "No es falta de esfuerzo. Es falta de sistema."
5. **La solución** — "El marketing no es presencia. Es flujo de comensales."
6. **Cómo funciona — El Sistema Mesa Activa** (carbón section): 4 steps — diagnóstico de visibilidad → posicionamiento local → adquisición de comensales → optimización semanal.
7. **Qué vas a conseguir** — "En 90 días, un restaurante con flujo constante."
8. **Por qué confiar** — "Entendemos tu negocio porque lo vivimos" (operator credibility + testimonial).
9. **Garantía** — 90-day commitment, "sin letras pequeñas."
10. **CTA final** — orange or carbón section: "¿Hablamos esta semana?" → **[Agendar mi estudio gratuito]**.
11. **Footer** — carbón, white monochrome logo, Lato links, avatar as favicon.

## 9. Do's and Don'ts

### Do
- **Do** build on `citrica-ui-toolkit` and keep every color a `_palette.scss` token — pick a `Text` variant and a `Button` variant instead of restyling (see §10).
- **Do** hold 60-30-10; spend orange only on action and one accent per view.
- **Do** invert at least one full section to carbón per page — that's the brand's poster moment.
- **Do** use `#A83E15` for any small orange text/link; reserve white-on-orange for buttons and large headings.
- **Do** keep Anton to caps titles ≥24px; let Lato do all the reading.
- **Do** lead with warm, kinetic, real food photography; overlay carbón 40–60% behind text.
- **Do** deploy the pulso bicolor once and the yellow underline once per page — signatures, not patterns.

### Don't
- **Don't** exceed 10% orange or more than one yellow element per viewport.
- **Don't** set Anton below 24px or in paragraphs; don't tighten display tracking past -0.02em.
- **Don't** drift into the editorial-magazine lane (display serif + italic + drop caps + ruled columns) — this is a market-poster / scoreboard brand.
- **Don't** ship colored placeholder blocks where food photography belongs; zero imagery on this brief is a defect.
- **Don't** round cards past 16px, or pair a 1px border with a wide resting shadow.
- **Don't** reach for corporate-cold jargon in on-screen copy ("sinergia," "holístico," "360°") — direct, sensory, data-backed only.
- **Don't** hardcode a hex/rgba, add `--im-*`-style aliases, or hand-roll a component the toolkit already ships — colors come from `_palette.scss` tokens and UI from `citrica-ui-toolkit` (see §10).

## 10. Implementation contract (tokens-first, component-first)

How this spec is realized in code. **Hard rules for anyone building or editing the ImPulso surface — hand edits and automated design passes alike.**

### Color — single source of truth
- Every brand hex lives in `styles/10-tokens/web/colors/_palette.scss`. Change colors **only** there; the theme mixins emit `--color-*` at `:root`.
- Consume tokens everywhere else: `var(--color-primary)` (orange), `var(--color-text-black)` (carbón), `var(--color-surface)` (neutral-50), `var(--color-tertiary)` (yellow), `var(--color-on-surface-var)` (neutral-600), `var(--color-outline)` / `var(--color-outline-variant)` (borders), etc.
- **No hardcoded hex/rgba** in `.tsx` or `styles/webpages-styles/*.scss`, and **no intermediate aliases** (`--im-*`). For a carbón-section tone with no token, derive it inline with `color-mix()` over tokens — e.g. `color-mix(in srgb, var(--color-text-black) 92%, var(--color-primary))` for a raised carbón surface.

### Typography — Text component + variants
- Use the toolkit `Text` component and choose a **variant** — never hardcode `font-family` or `clamp()` sizes in the page.
- Values live in `styles/10-tokens/web/components/_text.scss`; fonts are loaded/named in `styles/01-settings/settings.scss` (`--font-family-a` = Anton, `--font-family-b/c/d` = Lato).
- Variant → role: `display` = hero, `headline` = section titles, `title` = card/step/guarantee titles (**all Anton, uppercase**); `subtitle` / `body` / `label` = **Lato** reading text.

### Buttons & forms — token-driven
- `<Button variant="primary|secondary|flat">`. Colors from `--color-*-btn` (`_palette.scss`), render behavior from `_button.scss`, pill radius from `--form-radius-btn` in `_form.scss`. The secondary button is a carbón outline that inverts on hover — defined once in the tokens, never per-page.

### Components — prioritize `citrica-ui-toolkit`
- Build with the toolkit before writing markup: `Button`, `Input`, `Select`, `Textarea`, `Text`, `Icon`, `Card`, `Modal`, `Carousel`, `Header`, and the `Container` / `Col` grid.
- Reserve custom `.impulso__*` SCSS for **layout, section rhythm, and the signature gestures** (hero composition, carbón sections, pulso bicolor, yellow underline) — the parts the toolkit doesn't cover. Colors there are still tokens.

### File map
| Concern | File |
|---|---|
| Brand colors (hex) | `styles/10-tokens/web/colors/_palette.scss` |
| Type scale / variants | `styles/10-tokens/web/components/_text.scss` |
| Fonts (Anton / Lato) | `styles/01-settings/settings.scss` |
| Button render | `styles/10-tokens/web/components/_button.scss` |
| Button / form radius | `styles/10-tokens/web/components/_form.scss` |
| Landing layout only | `styles/webpages-styles/impulso.scss` |
