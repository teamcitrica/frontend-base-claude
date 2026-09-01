# Open Graph & SEO

Estructura lista para que cualquier proyecto clonado del base tenga tarjeta social
correcta en WhatsApp, Facebook, LinkedIn, X, Slack, Telegram e iMessage sin escribir
metadatos a mano.

## Archivos

| Archivo | Rol |
|---|---|
| `config/site.ts` → `siteConfig.seo` | Único bloque a editar al clonar |
| `lib/seo.ts` | Construye `metadata` y `viewport` a partir de `siteConfig.seo` |
| `app/opengraph-image.tsx` | Genera la imagen 1200×630 |
| `app/twitter-image.tsx` | Reusa la misma imagen para X |
| `app/layout.tsx` | Aplica `buildMetadata()` al sitio entero |
| `.env.example` | `NEXT_PUBLIC_SITE_URL` y demás variables |

## Checklist al clonar

1. `cp .env.example .env.local` y poner el dominio real en `NEXT_PUBLIC_SITE_URL`.
2. En Vercel: **Settings → Environment Variables → `NEXT_PUBLIC_SITE_URL`** con el
   dominio de producción.
3. En `config/site.ts` editar `name`, `description` y el bloque `seo`.
4. Ajustar `seo.colors` a la paleta del proyecto
   (`styles/10-tokens/web/colors/_palette.scss`).
5. Reemplazar `public/favicon.ico` y `public/favicon-16x16.png`.
6. Añadir `public/apple-touch-icon.png` (180×180): está referenciado en
   `lib/seo.ts` y hoy devuelve 404 en el base.
7. Verificar en https://www.opengraph.xyz o https://cards-dev.twitter.com/validator.

## `siteConfig.seo`

| Campo | Vacío ⇒ | Notas |
|---|---|---|
| `url` | — | Dominio canónico sin barra final. `NEXT_PUBLIC_SITE_URL` gana |
| `siteName` | `siteConfig.name` | Marca bajo el título de la tarjeta |
| `title` | `siteConfig.name` | ≤ 60 caracteres |
| `description` | `siteConfig.description` | 110–160 caracteres |
| `tagline` | descripción social | Texto dentro de la imagen, ≤ 90 caracteres |
| `imageAlt` | `título — descripción` | Alt de la imagen |
| `locale` | — | `es_ES`, `es_PE`, `en_US`… |
| `keywords` | omite la etiqueta | `string[]` |
| `twitter.site` / `.creator` | omite la etiqueta | Con arroba |
| `colors.brand` | — | `theme-color` + acento de la imagen |
| `colors.background` / `.foreground` | — | Fondo y texto de la imagen |
| `ogFont` | fuente por defecto | Archivo dentro de `/fonts` |
| `indexable` | — | `false` ⇒ `noindex` global (staging) |

## Resolución de la URL base

`lib/seo.ts` toma la primera disponible:

1. `NEXT_PUBLIC_SITE_URL`
2. `siteConfig.seo.url`
3. `NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL` (Vercel)
4. `NEXT_PUBLIC_VERCEL_URL` (Vercel)
5. `http://localhost:3000`

Sin URL absoluta los crawlers descartan la imagen: por eso `metadataBase` nunca
queda vacío.

## Metadatos por página

Cualquier `page.tsx` de servidor puede sobreescribir los suyos:

```tsx
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Servicios",
  description: "Lo que hacemos y cómo lo cobramos.",
  path: "/servicios",
});
```

El `<title>` sale como `Servicios | Marca` por la plantilla del layout raíz, y la
tarjeta social usa el mismo texto completo.

Rutas privadas fuera de buscadores:

```tsx
export const metadata = buildMetadata({ title: "Login", path: "/login", noIndex: true });
```

Artículo con imagen propia:

```tsx
export const metadata = buildMetadata({
  title: post.title,
  description: post.excerpt,
  path: `/blog/${post.slug}`,
  image: post.cover,
  type: "article",
  publishedTime: post.publishedAt,
  authors: [post.author],
});
```

`page.tsx` con `"use client"` no puede exportar `metadata`. Mover el export a un
`layout.tsx` de esa carpeta o dividir la ruta en server + client.

## La imagen

`app/opengraph-image.tsx` dibuja 1200×630 con `next/og` usando `seo.colors`,
`SITE_NAME`, `SITE_TITLE` y `OG_TAGLINE`. Next expone la ruta en
`/opengraph-image` y añade `og:image`, `og:image:width`, `og:image:height` y
`og:image:alt` sin configuración extra.

La fuente sale de `/fonts` según `seo.ogFont`; `next.config.js` incluye esa carpeta
en `outputFileTracingIncludes` para que exista en el bundle de Vercel. Si el archivo
falta, la imagen se genera igual con la tipografía por defecto.

### Usar una imagen diseñada

Borrar `app/opengraph-image.tsx` y `app/twitter-image.tsx`, y dejar
`app/opengraph-image.png` (1200×630, < 8 MB). Next la detecta por convención de
nombre. Alternativa por ruta: `buildMetadata({ image: "/img/og-home.jpg" })`.

### Imagen distinta por sección

Un `opengraph-image.tsx` o `.png` dentro de la carpeta de la ruta
(`app/servicios/opengraph-image.png`) sustituye a la raíz solo en ese segmento.

## Verificar

```bash
npm run build && npm start
curl -s http://localhost:3000 | grep -o '<meta property="og:[^>]*>'
```

En local la imagen se sirve en `http://localhost:3000/opengraph-image`.

Los scrapers cachean: tras cambiar la imagen hay que forzar refresco en
[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) y
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/). WhatsApp
cachea por URL durante días; probar con un query string (`?v=2`).
