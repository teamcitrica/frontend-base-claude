#!/usr/bin/env node
/**
 * Verificación visual — capturas + mediciones reales del navegador.
 *
 * Existe porque el punto D de la Definition of Done (responsive, sin scroll
 * horizontal) no se puede comprobar leyendo HTML. Antes se reportaba como
 * "no comprobado"; ahora se comprueba. Ver ADR-0004.
 *
 *   npm run shot                      # / en los tres breakpoints
 *   npm run shot -- /admin            # otra ruta
 *   npm run shot -- / --cta "#agenda" # además, comprueba que el CTA
 *                                     # esté en el primer viewport
 *
 * Requisitos: el dev server corriendo, Chrome instalado, y playwright.
 * Usa el Chrome del sistema (`channel: "chrome"`), así que NO descarga
 * navegadores.
 */

const OUT_DIR = process.env.SHOT_DIR || ".shots";
const BASE = process.env.SHOT_BASE || "http://localhost:3000";

const VIEWPORTS = [
  { name: "sm", width: 390, height: 844 },
  { name: "md", width: 768, height: 1024 },
  { name: "lg", width: 1440, height: 900 },
];

let chromium;

try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    [
      "",
      "  Falta playwright. Instálalo una vez:",
      "",
      "      yarn add -D playwright        (o: npm i -D playwright)",
      "",
      "  No hace falta descargar navegadores: este script usa el Chrome",
      "  que ya tienes instalado.",
      "",
    ].join("\n"),
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const route = args.find((a) => a.startsWith("/")) || "/";
const ctaIdx = args.indexOf("--cta");
const ctaSelector = ctaIdx !== -1 ? args[ctaIdx + 1] : null;

const { mkdir } = await import("node:fs/promises");

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const findings = [];
let failed = false;

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
  });
  const consoleErrors = [];

  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message}`));

  await page.goto(`${BASE}${route}`, {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.waitForTimeout(800);

  // Above the fold, antes de hacer scroll.
  const fold = await page.evaluate((sel) => {
    const doc = document.documentElement;
    const out = {
      scrollW: doc.scrollWidth,
      innerW: window.innerWidth,
      vh: window.innerHeight,
      ctaBottom: null,
    };

    if (sel) {
      const el = document.querySelector(sel);

      if (el) out.ctaBottom = Math.round(el.getBoundingClientRect().bottom);
    }

    return out;
  }, ctaSelector);

  if (fold.scrollW > fold.innerW) {
    findings.push(
      `${vp.name}: SCROLL HORIZONTAL — scrollWidth ${fold.scrollW} > viewport ${fold.innerW}`,
    );
    failed = true;
  }

  if (ctaSelector && fold.ctaBottom !== null && fold.ctaBottom > fold.vh) {
    findings.push(
      `${vp.name}: el CTA "${ctaSelector}" cae fuera del primer viewport (${fold.ctaBottom}px > ${fold.vh}px)`,
    );
    failed = true;
  }

  // Recorre la página entera: dispara las imágenes lazy antes de auditarlas.
  // Sin esto, todo lo que está bajo el fold parece roto y no lo está.
  await page.evaluate(async () => {
    const step = window.innerHeight;

    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);

  const broken = await page.evaluate(() =>
    Array.from(document.images)
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src || "(sin src)"),
  );

  for (const src of broken) {
    findings.push(`${vp.name}: IMAGEN ROTA — ${src.slice(0, 110)}`);
    failed = true;
  }

  for (const err of consoleErrors) {
    findings.push(`${vp.name}: consola — ${err.slice(0, 140)}`);
    failed = true;
  }

  const slug = route === "/" ? "home" : route.replace(/\W+/g, "-").slice(1);

  await page.screenshot({
    path: `${OUT_DIR}/${slug}-${vp.name}.png`,
    fullPage: true,
  });
  await page.screenshot({ path: `${OUT_DIR}/${slug}-${vp.name}-fold.png` });
  await page.close();
}

await browser.close();

console.log(`\nCapturas en ${OUT_DIR}/ — ${VIEWPORTS.length} breakpoints × 2`);
console.log("Ábrelas. Una captura que no miraste no cuenta como revisada.\n");

if (findings.length) {
  console.log("Hallazgos:");
  for (const f of findings) console.log(`  · ${f}`);
  console.log("");
} else {
  console.log("Sin scroll horizontal, sin imágenes rotas, sin errores de consola.\n");
}

process.exit(failed ? 1 : 0);
