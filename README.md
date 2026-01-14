# Next.js & NextUI Template

This is a template for creating applications using Next.js 14 (app directory) and NextUI (v2).

[Try it on CodeSandbox](https://githubbox.com/nextui-org/next-app-template)

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use 

### Use the template with create-next-app

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/nextui-org/next-app-template
```

### Install dependencies to be

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install 
```

### Run the development server

```bash
npm run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## 📚 Documentation

### Styles System Documentation

This project includes a comprehensive styles and layout system. Check out the documentation:

- **[styles/README.md](styles/README.md)** - Main styles documentation hub
- **[styles/CITRICA-UI-TOOLKIT_README.md](styles/CITRICA-UI-TOOLKIT_README.md)** - UI Library "citrica-ui-toolkit"
- **[styles/LAYOUT-SYSTEM.md](styles/LAYOUT-SYSTEM.md)** - Complete responsive grid system
- **[styles/LAYOUT-VISUAL-GUIDE.md](styles/LAYOUT-VISUAL-GUIDE.md)** - Visual diagrams and examples
- **[styles/LAYOUT-EXAMPLES.md](styles/LAYOUT-EXAMPLES.md)** - Complete code examples
- **[styles/10-tokens/README.md](styles/10-tokens/README.md)** - Design tokens system (Client & Admin)
- **[styles/10-tokens/EXAMPLES.md](styles/10-tokens/EXAMPLES.md)** - Token usage examples

### Quick Start - Responsive Layout

```tsx
import { Container, Col } from 'citrica-ui-toolkit';

<Container>
  <Col cols={{ sm: 4, md: 3, lg: 6 }}>
    {/* Mobile: 100%, Tablet: 50%, Desktop: 50% */}
    Your content here
  </Col>
</Container>
```

### Quick Start - Component Tokens

**For Client/Public App:**
```tsx
<Button className="btn-citrica-ui btn-primary" />
<Input className="input-citrica-ui input-primary" />
```

**For Admin Panel:**
```tsx
<Button className="btn-citrica-ui-admin btn-primary-admin" />
<Input className="input-citrica-ui-admin input-primary-admin" />
```

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
