# Product

## Register

brand

## Users

**Who builds on it:** The Citrica team. This is an internal base template — a curated starting point the team forks to spin up new client projects, not a finished product itself.

**Who uses the end result:** The client staff who operate each fork — managing data through the admin panel (clientes, tareas, reservas, config-app), and the client's own audience visiting the marketing surfaces (home, login flows).

**Context:** Two surfaces ship in one repo. A brand/marketing layer (multi-variant header, home page, auth screens) and a product/admin layer (Supabase-backed dashboard with sidebar nav and role gating). The brand layer is the primary surface this document defaults to, because first impressions and identity are set there; the admin layer serves the operator's workflow. Both must look like deliberate Citrica work the moment a fork boots.

**Job to be done:** Give the Citrica team a base they can fork and ship from immediately — defaults good enough to go live, identity strong enough that no fork reads as a generic template, and structure clear enough that the next developer extends it without fighting it.

## Product Purpose

A reusable Next.js 15 foundation (HeroUI + `citrica-ui-toolkit` + the Citrica SCSS design system + Supabase) that encodes Citrica's visual identity and engineering conventions once, so every client project starts from a polished, on-brand, accessible-by-default baseline instead of from scratch.

**Success looks like:** a forked project that can go to a client demo on day one without a design cleanup pass — brand-forward, clean, and obviously not a stock admin template.

## Brand Personality

**Three words:** Clean, efficient, engineered.

**Voice & tone:** Confident and precise without shouting. The orange (`#FF5B00`) is the brand's signature and leads as a deliberate accent, not a wash. Restraint is the default; flourish is earned. The feel to anchor to is **Linear** — sharp typography, generous structure, subtle intentional motion, an engineered rather than decorated surface.

**Emotional goal:** The user (operator or visitor) should feel the product is competent and cared-for. Calm in the admin, confident on the brand pages. Never busy, never generic.

## Anti-references

- **Generic Bootstrap admin.** No boxy gray card grids, no default-blue, no cramped dense tables as the reflex layout. This is the single most important thing to avoid.
- **Unstyled HeroUI default look.** It must never read as a HeroUI demo — no purple/violet defaults, no component-library-out-of-the-box feel. The Citrica identity (orange, precision, spacing) must be legible immediately.
- Loud, over-animated, gradient-everything, glassmorphism-by-default styling. Clean & efficient is the brief, not maximalism.

## Design Principles

1. **Base, not boilerplate.** Every default must be good enough to ship as-is. Forks should inherit quality, not a cleanup backlog. If a default would need fixing before a client demo, it's not done.
2. **Identity over template.** The work must read as Citrica at a glance and never as a stock admin or a HeroUI demo. Brand presence (the orange, the type, the spacing rhythm) is non-negotiable, even in utilitarian admin screens.
3. **Earn every element.** Clean & efficient means restraint. Remove before adding. Whitespace and hierarchy do the work; decoration is the exception that has to justify itself.
4. **Engineered, not decorated.** Polish comes from precision and consistency — aligned grids, consistent tokens, deliberate motion — the Linear way. Not from flourish layered on top.
5. **Forkable clarity.** Because this seeds many projects, structure and tokens must be obvious to the next developer. Conventions over cleverness; a pattern used once should be a pattern named and reusable.

## Accessibility & Inclusion

Best-effort, with sensible defaults that propagate to every fork rather than a formal certification commitment:

- Aim for readable contrast on body and interactive text (the toolkit and tokens should not ship low-contrast defaults).
- Preserve visible focus states and keyboard operability for forms, nav, and the sidebar.
- Honor `prefers-reduced-motion` for any motion added (the repo already includes GSAP/Framer Motion).
- No hard WCAG level is mandated at the base layer; individual client forks can raise the bar to AA/AAA when their context (gov, health, education) requires it.
