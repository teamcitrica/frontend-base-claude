---
name: Citrica Web Base
description: Orange-led, warm-neutral design system for the Citrica web (public) surface
colors:
  citrica-orange: "#FF5B00"
  orange-hover: "#D44E00"
  orange-container: "#FFE0D0"
  on-orange-container: "#4A1A00"
  ink: "#2A2521"
  taupe: "#8A8079"
  white: "#FFFFFF"
  black: "#16141F"
  surface: "#F2F2F2"
  surface-bright: "#F7F7F7"
  surface-lowest: "#FFFFFF"
  on-surface: "#242424"
  on-surface-var: "#333333"
  outline: "#B0ABA4"
  outline-variant: "#E4E0DB"
  input-border: "#C9C5BF"
  placeholder: "#6E6E6E"
  error: "#D40F36"
  warning: "#FAAC0F"
  success: "#2F7D12"
rounded:
  accordion: "8px"
  input: "10px"
  btn: "20px"
components:
  button-primary:
    backgroundColor: "{colors.citrica-orange}"
    textColor: "{colors.white}"
    rounded: "{rounded.btn}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.orange-hover}"
    textColor: "{colors.white}"
  button-secondary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.btn}"
    padding: "10px 20px"
  button-flat:
    backgroundColor: "transparent"
    textColor: "{colors.citrica-orange}"
    rounded: "{rounded.btn}"
    padding: "10px 20px"
  input-primary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.input}"
  select-primary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.input}"
  textarea-primary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.input}"
  accordion-item:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.accordion}"
---

# Design System: Citrica Web Base

> **Scope.** This document covers **color** and **shape (form/radius)** tokens for the **web (public) surface only** (`styles/10-tokens/web`). Typography and elevation are summarized for completeness but were not the focus of this pass; the admin surface (`styles/10-tokens/admin`) is documented separately. Re-run `$impeccable document` to extend.

## 1. Overview

**Creative North Star: "The Engineered Orange"**

One color does the talking. The Citrica web base is a warm-neutral canvas with a single, unmistakable voice — brand orange `#FF5B00` — applied with the precision of an engineered tool, not the exuberance of a marketing splash. The reference is Linear: sharp, restrained, confident. Surfaces are clean grays; type is near-black ink; and orange appears exactly where attention should go — the primary CTA, the focused field, today's date on the calendar — and almost nowhere else.

This system explicitly rejects two things named in PRODUCT.md. It is **not a generic Bootstrap admin** (no default-blue, no boxy gray card grids, no stock-template chrome), and it is **not an unstyled HeroUI demo** (no purple/violet defaults, no Material leftover palette). The previous token set had drifted into exactly that failure mode — gold buttons, purple secondaries, cyan tertiaries, blue focus rings, acid-lime calendars — and this pass removed every one of them. If a color isn't orange, a warm neutral, or a semantic signal, it does not belong here.

Restraint is the whole point. Orange is loud precisely because everything around it is quiet. Spend it sparingly and it reads as brand; spread it everywhere and it reads as noise.

**Key Characteristics:**
- Single chromatic accent (brand orange); secondary and tertiary are deliberately neutral.
- Warm-neutral grays for every surface, outline, and field — never cool, never default-Material.
- Interactive focus is **always** orange, across inputs, selects, textareas, and calendars.
- Tactile but tight shape language: 20px pill buttons, 10px fields, 8px accordions, crisp 2px field borders.
- Accessibility-first contrast on text and placeholders; no decorative light-gray.

## 2. Colors

A warm-neutral system anchored by one saturated orange. Every accent role resolves to that orange or to a neutral; nothing competes with it.

### Primary
- **Citrica Orange** (`#FF5B00`): The brand. Primary CTA fill, focused-field border, selected calendar cell, today indicator, flat-button text, accordion open state. The single chromatic voice of the system.
- **Orange Hover** (`#D44E00`): The pressed/hover deepening of every orange surface. Never a different hue — just darker.
- **Orange Container** (`#FFE0D0`) / **On Orange Container** (`#4A1A00`): Soft orange tint for low-emphasis fills and the text that sits on them.
- *Dark theme* lifts primary to **`#FF7A33`** so it reads on dark surfaces; hover deepens to `#E04E00`.

### Secondary
- **Ink** (`#2A2521`): A warm near-black. The secondary button, the neutral calendar header, any "second" emphasis that must not borrow the orange. Pairs with white text at ~16:1.

### Tertiary
- **Taupe** (`#8A8079`): A warm neutral, intentionally not a third color. Reserved for rare low-emphasis accents. The system is single-accent by design; if you reach for tertiary as a color, reconsider.

### Neutral
- **Surface** (`#F2F2F2`), **Surface Bright** (`#F7F7F7`), **Surface Lowest** (`#FFFFFF`): The clean gray canvas, lightest to base. Cards and fields sit on white; the page sits on the grays.
- **On Surface** (`#242424`) / **On Surface Variant** (`#333333`): Primary and secondary text. Near-black ink — readable, not "elegant gray".
- **Outline** (`#B0ABA4`) / **Outline Variant** (`#E4E0DB`): Warm-gray borders and dividers (a hair of brand-hue warmth, never olive or cool).
- **Input Border** (`#C9C5BF`): Resting field stroke. **Placeholder** (`#6E6E6E`): field placeholder at ≥5:1 on white — never lighter.

### Semantic
- **Error** (`#D40F36`, white text), **Warning** (`#FAAC0F`, **dark** text `#3A2A00`), **Success** (`#2F7D12`, white text). Warning carries dark text and success was deepened from the old acid lime specifically so badge text clears contrast.

### Named Rules
**The One-Accent Rule.** Orange is the only chromatic color in the system. Secondary is ink, tertiary is taupe, semantics are functional signals — none of them is a "brand color #2". If a screen has two competing accents, one of them is wrong.

**The Orange-Focus Rule.** Every interactive focus/hover border — input, select, textarea, calendar cell — is orange. Focus is brand expression, not a neutral state. Blue focus rings are forbidden.

**The No-Material-Leftover Rule.** Purple (`#6B3FA0`, `#4F378B`), gold (`#D4AF37`), cyan (`#00FFFF`), and acid lime (`#E1FF00`) are banned on sight. They are the HeroUI/Material defaults this system exists to replace.

## 3. Typography

> Not the focus of this pass — captured at a glance for completeness; see `styles/10-tokens/web/components/_text.scss` and re-run `$impeccable document` for a full type spec.

**Body / UI Font:** the project's configured sans (see `/fonts`), applied through the toolkit `Text` component's responsive variants (display, headline, title, subtitle, body, label).

**Character:** Clean and engineered, matching the Linear north star. Hierarchy is carried by weight and size contrast on a single family, not by decorative pairing.

### Named Rules
**The Ink-Body Rule.** Body copy is `#242424` on light surfaces, not a light gray. Legibility over "elegance".

## 4. Elevation

Largely flat. Depth comes from the tonal surface ramp (`surface` → `surface-bright` → white), warm outlines, and field borders — not from heavy shadows. The accordion is the one component with optional elevation variants: a hairline `0 1px 2px rgba(0,0,0,0.04)` (splitted) up to `0 2px 8px rgba(0,0,0,0.08)` (shadow). Nothing exceeds 8px blur.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Separation is a border or a tonal step, not a drop shadow. Shadows appear only where a component genuinely lifts (an open elevated accordion), and never above 8px blur.

## 5. Components

Shape is consistent and deliberate. Buttons are pill-rounded; fields are gently rounded with a crisp 2px stroke; accordions are softly rounded with a 1px stroke. All radii live in `styles/10-tokens/web/components/_form.scss`.

### Buttons
- **Shape:** Pill (`20px` radius, `--form-radius-btn`), `min-width: 140px`. Padding `10px 20px` (sm/md), `20px 50px` (lg). Border width `2px` (`--form-border-size-btn`).
- **Primary:** Orange fill (`#FF5B00`) + white text. Hover deepens to `#D44E00`. The page's single highest-emphasis action.
- **Secondary:** Ink fill (`#2A2521`) + white text. Hover → black. The clean "other" action — never purple.
- **Flat:** Transparent + orange text (`#FF5B00`). Hover lays a 8%-orange wash and deepens text to `#D44E00`.

### Inputs / Fields
- **Shape:** `10px` radius (`--form-radius-input`), `2px` border (`--form-border-size-input`).
- **Resting:** White background, `#C9C5BF` border, `#242424` text, `#6E6E6E` placeholder.
- **Focus / Hover:** Border turns **orange** (`#FF5B00`). This is the system's signature interaction.

### Select / Textarea
- Inherit the field shape (`10px`, `2px`) and the orange-focus rule. Select **items**: white background, 8%-orange hover wash, **orange** selected fill with white text. The dropdown list speaks the same orange as everything else.

### Calendar
- **Primary:** Orange header, orange selected cell (white text), orange today indicator, orange focus. The reference implementation of the brand — it was the one component that never drifted.
- **Secondary:** Ink header / ink selected cell — the neutral alternative when orange would clash with surrounding content.

### Accordion
- **Shape:** `8px` radius (`--form-radius-accordion`), `1px` border (`--form-border-size-accordion`).
- **States:** Resting border `outline-variant`; hover `outline`; **open border orange** with an orange indicator. Variants: `splitted`, `shadow`, `bordered`, `light`.

## 6. Do's and Don'ts

### Do:
- **Do** spend orange (`#FF5B00`) on one thing per view — the primary action or the focused element. Its rarity is what makes it read as brand.
- **Do** make every focus and hover border orange, across inputs, selects, textareas, and calendars.
- **Do** use ink (`#2A2521`) for the secondary button and any "second emphasis"; keep secondary/tertiary neutral.
- **Do** keep body text at `#242424` and placeholders at `#6E6E6E` or darker — verified-contrast, never decorative light gray.
- **Do** hold the shape scale: `20px` pill buttons, `10px` fields, `8px` accordions. Don't invent new radii.
- **Do** deepen orange to `#D44E00` for hover/pressed — same hue, darker, never a new color.

### Don't:
- **Don't** reintroduce the Material/HeroUI leftovers this pass removed: **purple** `#6B3FA0` / `#4F378B`, **gold** `#D4AF37`, **cyan** `#00FFFF`, **acid lime** `#E1FF00`, **blue focus** `#265197`. These are the "unstyled HeroUI default look" PRODUCT.md bans.
- **Don't** let the surface read as a **generic Bootstrap admin** — no default-blue, no boxy gray card grids, no stock chrome.
- **Don't** put white text on orange at body-copy size; white on `#FF5B00` is ~3:1, fine only for button/large/bold text. Below that, use ink on a tint.
- **Don't** use a second chromatic accent. One screen, one orange.
- **Don't** round cards past `16px` or fields past their `10px` token; pill is for buttons and tags only.
- **Don't** pair a 1px border with a soft wide drop shadow as decoration, or push any shadow past 8px blur.
