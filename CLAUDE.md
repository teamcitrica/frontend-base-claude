# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
frontend-base-admin-cteam is a Next.js 15 base administration application built with HeroUI components. The app features a responsive design with light/dark theme support and a complete admin panel for managing bookings (reservas), clients (clientes), tasks (tareas), and app configuration.

## Essential Commands
- **Development**: `npm run dev` (with Turbo mode enabled)  
- **Build**: `npm run build`
- **Linting**: `npm run lint` (ESLint with TypeScript support and auto-fix)
- **Start production**: `npm start`

## Architecture & Key Technologies
- **Framework**: Next.js 15 with App Router architecture
- **UI Library**: HeroUI v2 + citrica-ui-toolkit v0.0.10 (custom component library)
- **Styling**: SCSS with Citrica Design System + Tailwind CSS 3.4
- **Database**: Supabase (with React hooks integration)
- **State Management**: React Context for auth/cart, custom hooks for data fetching
- **Theme**: next-themes for light/dark mode with HeroUI provider
- **Icons**: Lucide React icons

## Component Architecture
The app uses a structured atomic design pattern:

### Project Organisms (`/shared/components/organisms/`)
Project-specific organism components that consume `citrica-ui-toolkit` internally:
- `header.tsx`, `footer.tsx`, `navbar.tsx`, `sidebar.tsx`
- `login-container.tsx`, `forgot-password.tsx`, `new-password.tsx`
- `drop-citrica.tsx`, `video.tsx`, `animated-content.tsx`

Note: Atoms and molecules (Button, Input, Select, Text, Icon, Card, etc.) come from `citrica-ui-toolkit` package.

#### Header Component (`header.tsx`)
Multi-variant header component with optional button functionality:

**Variants:**
- `travel`: Dark overlay style with centered navigation and white CTA button
- `team`: Clean white background with split navigation and black rounded CTA button  
- `minimal`: Simple layout with only logo and optional button (no navigation)

**Props:**
- `logo?: React.ReactNode` - Custom logo component
- `variant?: 'travel' | 'team' | 'minimal'` - Header style variant (default: 'travel')
- `className?: string` - Additional CSS classes
- `showButton?: boolean` - Controls button visibility (default: false)
- `buttonText?: string` - Custom button text (default: 'GET STARTED')
- `onButtonClick?: () => void` - Custom button click handler

**Features:**
- Responsive design with mobile hamburger menu
- Scroll-based background transitions
- Auto-adapts button text for each variant (respects custom text)
- Uses siteConfig.navLinks for navigation items
- Smooth scroll to sections functionality

### Citrica UI Toolkit (citrica-ui-toolkit v0.0.18)
Custom component library built on top of HeroUI with Citrica design tokens.

**Available Components:**
- **Button**: Customizable button with variants (primary, secondary, flat, success, warning, danger) and admin mode support
- **Input**: Text input with icon support, multiple variants (primary, secondary), and form validation
- **Select**: Dropdown select with custom styling, icon support, and option rendering
- **Text**: Typography component with responsive variants (display, headline, title, subtitle, body, label)
- **Icon**: Lucide icon wrapper with size and color props
- **Card**: Card component with header/footer support
- **Textarea**: Multi-line text input with character limits
- **Modal**: Modal dialog with customizable size and placement
- **Carousel**: Swiper-based carousel with autoplay and pagination

**Usage Example:**
```tsx
import { Button, Input, Select, Text } from 'citrica-ui-toolkit';

<Button variant="primary" label="Save" onPress={handleSave} />
<Input variant="primary" label="Email" type="email" startIcon="Mail" />
<Select variant="primary" label="Country" options={countries} />
<Text variant="headline" weight="bold">Welcome</Text>
```

### Citrica Design System (Styles Architecture)
SCSS files organized in numbered folders following ITCSS methodology:

1. **01-settings**: Global variables, fonts, mixins
   - `settings.scss` - Grid system, typography, responsive variables
   - `mixins.scss` - Responsive mixins and utilities

2. **02-tools**: SCSS functions and tools
3. **03-external**: External library overrides
4. **04-generic**: Reset and normalize styles (applies theme mixins in `:root`)
5. **05-tags**: HTML tag defaults
6. **06-keyframes**: Animation keyframes
7. **07-objects**: Layout objects (grid, containers)
8. **08-components**: Component-specific styles
9. **09-utilities**: Utility classes
10. **10-tokens**: Centralized design tokens (colors + components)
    - `web/colors/` - Web color palette (`_palette.scss`) + theme mixins (`_light-theme.scss`, `_dark-theme.scss`)
    - `web/components/` - Web component tokens (`_button.scss`, `_input.scss`, `_select.scss`, `_textarea.scss`, `_text.scss`, `_calendar.scss`, `_form.scss`, `_login.scss`)
    - `admin/colors/` - Admin color palette + theme mixins
    - `admin/components/` - Admin component tokens (same structure as web)
    - `tokens.scss` - Main file that imports all tokens
11. **11-atomic-design**: Atomic design components
12. **custom.scss**: Project-specific custom styles

**Design Token System:**
- Supports both web and admin variants for all components
- CSS variables for dynamic theming
- Responsive typography and spacing scales
- Color tokens following Material Design naming (primary, secondary, tertiary, etc.)

## ImPulso Design-System Rules (tokens-first, component-first)

The public web surface is the **ImPulso** landing (`app/page.tsx` + `styles/webpages-styles/impulso.scss`). When building or editing it — including via the `impeccable` skill — these rules are non-negotiable so the system stays single-sourced. Full spec: **DESIGN.md §10**.

**1. Color — one source of truth.** All brand hex live in `styles/10-tokens/web/colors/_palette.scss`; edit color values only there. Everything else consumes the emitted variables: `var(--color-primary)` (orange), `var(--color-text-black)` (carbón), `var(--color-surface)` (neutral-50), `var(--color-tertiary)` (yellow), `var(--color-on-surface-var)`, etc. **Never** hardcode hex/rgba in `.tsx` or `styles/webpages-styles/*.scss`, and **never** add intermediate aliases (e.g. `--im-orange`). For a carbón tone with no token, derive it inline with `color-mix()` over tokens.

**2. Typography — Text component + variants.** Render text with the toolkit `Text` component and pick a `variant`; don't hardcode `font-family`/`clamp()` in the page. Scale lives in `styles/10-tokens/web/components/_text.scss`; fonts in `styles/01-settings/settings.scss` (`--font-family-a` = Anton, `--font-family-b/c/d` = Lato). Variant → role: `display` = hero, `headline` = section titles, `title` = card/step titles (all **Anton**, uppercase); `subtitle`/`body`/`label` = **Lato**.

**3. Buttons & forms — token-driven.** Use `<Button variant="primary|secondary|flat">`. Colors from `--color-*-btn` (`_palette.scss`), render from `_button.scss`, pill radius from `--form-radius-btn` in `_form.scss`. Don't restyle buttons in landing SCSS.

**4. Components — prioritize `citrica-ui-toolkit`.** Reach for the toolkit before hand-rolling markup: `Button`, `Input`, `Select`, `Textarea`, `Text`, `Icon`, `Card`, `Modal`, `Carousel`, `Header`, and the `Container`/`Col` grid. Reserve custom `.impulso__*` SCSS for layout / section rhythm / signature gestures the toolkit doesn't cover — and even there, colors are tokens.

| Concern | File |
|---|---|
| Brand colors (hex) | `styles/10-tokens/web/colors/_palette.scss` |
| Type scale / variants | `styles/10-tokens/web/components/_text.scss` |
| Fonts (Anton/Lato) | `styles/01-settings/settings.scss` |
| Button render | `styles/10-tokens/web/components/_button.scss` |
| Button/form radius | `styles/10-tokens/web/components/_form.scss` |
| Landing layout only | `styles/webpages-styles/impulso.scss` |

## SEO / Open Graph
Social card metadata is centralized so a cloned project only edits one block.

- `config/site.ts` → `siteConfig.seo` is the single source of truth (url, siteName, title, description, tagline, imageAlt, locale, keywords, twitter handles, colors, ogFont, indexable).
- `lib/seo.ts` exports `buildMetadata(page?)` and `viewport`. `SITE_URL` resolves from `NEXT_PUBLIC_SITE_URL` → `seo.url` → Vercel env → localhost, and feeds `metadataBase`, canonical and `og:url`.
- `app/layout.tsx` applies `buildMetadata()` site-wide with the `%s | Marca` title template.
- `app/opengraph-image.tsx` generates the 1200×630 image with `next/og` from `seo.colors` and the brand font in `/fonts` (`next.config.js` traces that folder). `app/twitter-image.tsx` re-exports it.
- Per-route metadata: `export const metadata = buildMetadata({ title, description, path, image, type, noIndex })` from a server `page.tsx` or `layout.tsx`.
- Never hardcode metadata in a page — go through `buildMetadata`. Keep `seo.colors` in sync with `styles/10-tokens/web/colors/_palette.scss`.

Full guide and checklist: `docs/opengraph.md`.

## Documentation
Detailed documentation is available in the `docs/` folder:
- `docs/opengraph.md` - Open Graph / SEO metadata structure
- `docs/styles-overview.md` - Complete styles system overview
- `docs/tokens-system.md` - Design tokens architecture
- `docs/tokens-examples.md` - Token usage examples
- `docs/citrica-ui-toolkit.md` - Component documentation
- `docs/layout-system.md` - Grid system documentation
- `docs/layout-examples.md` - Layout code examples
- `docs/layout-visual-guide.md` - Visual grid diagrams

## Key Features & Patterns
- **Responsive Navbar**: Auto-changing colors on scroll, mobile drawer menu
- **Admin Panel**: Sidebar navigation with nested sub-items using URL search params
  - `/admin/reservas` - Booking management with calendar, weekly, and availability views
  - `/admin/clientes` - Client management
  - `/admin/tareas` - Task management
  - `/admin/config-app` - Application configuration
- **Form Management**: Custom hooks for data management with Supabase integration
- **Authentication**: Supabase auth context with login, forgot password, and new password pages
- **Toast System**: HeroUI toast provider with top-right placement

## Database Integration
- Supabase client with custom hooks in `/app/hooks/`

## File Structure Notes  
- App pages follow Next.js App Router convention
- Shared utilities in `/shared/` with TypeScript types
- Site configuration centralized in `/config/site.ts`
- Custom fonts in `/fonts/` directory
- Static assets in `/public/img/`

## Development Notes
- Uses ES modules and TypeScript strict mode
- Custom icon system with Lucide React icons
- Locale set to Spanish (es-ES) in HeroUI provider
- Environment supports both development and production builds with Turbo mode