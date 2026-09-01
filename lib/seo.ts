import type { Metadata, Viewport } from "next";

import { siteConfig } from "@/config/site";

const { seo } = siteConfig;

const first = (...values: (string | undefined)[]) =>
  values.find((value) => Boolean(value && value.trim()))?.trim() ?? "";

const withProtocol = (value: string) =>
  /^https?:\/\//.test(value) ? value : `https://${value}`;

export const SITE_URL = withProtocol(
  first(
    process.env.NEXT_PUBLIC_SITE_URL,
    seo.url,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
  ) || `http://localhost:${process.env.PORT ?? 3000}`,
).replace(/\/+$/, "");

export const SITE_NAME = first(seo.siteName, siteConfig.name);
export const SITE_TITLE = first(seo.title, siteConfig.name);
export const SITE_DESCRIPTION = first(seo.description, siteConfig.description);
export const OG_TAGLINE = first(seo.tagline, SITE_DESCRIPTION);
export const OG_IMAGE_ALT = first(
  seo.imageAlt,
  `${SITE_TITLE} — ${SITE_DESCRIPTION}`,
);

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//.test(path)) return path;

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export type PageMetadata = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function buildMetadata(page: PageMetadata = {}): Metadata {
  const title = first(page.title);
  const description = first(page.description, SITE_DESCRIPTION);
  const url = absoluteUrl(page.path ?? "/");
  const keywords = page.keywords ?? seo.keywords;
  const noIndex = page.noIndex ?? !seo.indexable;
  const socialTitle = title ? `${title} | ${SITE_NAME}` : SITE_TITLE;

  const images = page.image
    ? [
        {
          url: absoluteUrl(page.image),
          width: 1200,
          height: 630,
          alt: first(page.imageAlt, OG_IMAGE_ALT),
        },
      ]
    : undefined;

  const shared = {
    siteName: SITE_NAME,
    locale: seo.locale,
    url,
    title: socialTitle,
    description,
    ...(images ? { images } : {}),
  };

  const openGraph: Metadata["openGraph"] =
    page.type === "article"
      ? {
          ...shared,
          type: "article",
          publishedTime: page.publishedTime,
          modifiedTime: page.modifiedTime,
          authors: page.authors,
        }
      : { ...shared, type: "website" };

  return {
    metadataBase: new URL(SITE_URL),
    title: title || { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
    description,
    applicationName: SITE_NAME,
    ...(keywords.length ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      ...(seo.twitter.site ? { site: seo.twitter.site } : {}),
      ...(seo.twitter.creator ? { creator: seo.twitter.creator } : {}),
      ...(images ? { images } : {}),
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: seo.colors.brand,
  colorScheme: "light dark",
};
