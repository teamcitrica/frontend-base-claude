import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { OG_IMAGE_ALT, OG_TAGLINE, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/seo";

export const alt = OG_IMAGE_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const { colors, ogFont } = siteConfig.seo;

async function loadBrandFont() {
  if (!ogFont) return [];

  try {
    const data = await readFile(join(process.cwd(), "fonts", ogFont));

    return [{ name: "Brand", data, style: "normal" as const, weight: 800 as const }];
  } catch {
    return [];
  }
}

export default async function OpengraphImage() {
  const fonts = await loadBrandFont();
  const fontFamily = fonts.length ? "Brand" : "sans-serif";
  const domain = SITE_URL.replace(/^https?:\/\//, "");
  const tagline = OG_TAGLINE.length > 120 ? `${OG_TAGLINE.slice(0, 117)}…` : OG_TAGLINE;
  const titleSize = SITE_TITLE.length > 34 ? 76 : SITE_TITLE.length > 20 ? 96 : 116;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          padding: "72px 80px",
          background: colors.background,
          color: colors.foreground,
          fontFamily,
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: -280,
            right: -200,
            width: 760,
            height: 760,
            borderRadius: 760,
            background: colors.brand,
            opacity: 0.16,
          }}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 10,
              borderRadius: 999,
              background: colors.brand,
              marginRight: 24,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 8,
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              lineHeight: 1.04,
              textTransform: "uppercase",
            }}
          >
            {SITE_TITLE}
          </div>
          {tagline ? (
            <div
              style={{
                display: "flex",
                marginTop: 28,
                maxWidth: 880,
                fontSize: 32,
                lineHeight: 1.35,
                opacity: 0.68,
              }}
            >
              {tagline}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", opacity: 0.55 }}>{domain}</div>
          <div
            style={{
              display: "flex",
              width: 120,
              height: 6,
              borderRadius: 999,
              background: colors.brand,
            }}
          />
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
