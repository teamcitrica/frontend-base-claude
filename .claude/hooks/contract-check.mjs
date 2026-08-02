#!/usr/bin/env node
/**
 * Guardián del contrato de implementación.
 * docs/01-design/implementation-contract.md
 *
 * Dos modos:
 *
 *   1. Hook (por defecto). Lee el JSON del PostToolUse por stdin, saca el
 *      archivo editado y compara sus violaciones contra la versión en git HEAD.
 *      Solo falla si el cambio **añadió** violaciones — que es la regla del
 *      ADR-0002: ninguna spec empeora el baseline. Editar un archivo con deuda
 *      preexistente no molesta; introducir deuda nueva sí.
 *
 *   2. Reporte (`--report`). Recorre el repo y lista el estado completo.
 *      Usado por `npm run contract`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = process.env.CLAUDE_PROJECT_DIR || process.cwd();

// ── Reglas ────────────────────────────────────────────────────────────────
// Cada regla: dónde aplica, cómo detecta, y qué decirle a quien la rompe.

const RULES = [
  {
    id: 'hex-en-tsx',
    applies: (f) => /\.(tsx|jsx)$/.test(f) && /^(app|shared)\//.test(f),
    test: (line) => /#[0-9a-fA-F]{3,8}\b/.test(line),
    msg: 'Hex hardcodeado. Usa un token: color="primary", var(--color-primary), o color-mix() sobre tokens.',
  },
  {
    id: 'hex-en-scss-de-pagina',
    applies: (f) => f.startsWith('styles/webpages-styles/'),
    test: (line) => /#[0-9a-fA-F]{3,8}\b|rgba?\(/.test(line),
    msg: 'Hex/rgba en SCSS de página. El color vive en styles/10-tokens/web/colors/_palette.scss.',
  },
  {
    id: 'alias-intermedio',
    applies: (f) => /^(app|shared|styles)\//.test(f),
    test: (line) => /--im-|--brand-/.test(line),
    msg: 'Alias de color intermedio. Consume los tokens --color-* directamente.',
  },
  {
    id: 'font-family-hardcodeada',
    applies: (f) => /^(app|shared)\//.test(f) || f.startsWith('styles/webpages-styles/'),
    test: (line) => /font-family/.test(line) && !/var\(--font-family/.test(line),
    msg: 'font-family fuera de token. Usa var(--font-family-a|b|c|d), o el componente <Text variant="…">.',
  },
  {
    id: 'clamp-en-scss-de-pagina',
    applies: (f) => f.startsWith('styles/webpages-styles/'),
    test: (line) => /clamp\(/.test(line),
    msg: 'clamp() en SCSS de página. La escala tipográfica vive en _text.scss.',
  },
  {
    id: 'icon-prop-incorrecta',
    applies: (f) => /\.(tsx|jsx)$/.test(f),
    test: (line) => /iconName/.test(line),
    msg: 'La prop del componente Icon es `name`, no `iconName`.',
  },
];

// ── Reglas de archivo ─────────────────────────────────────────────────────
// Algunas cosas no se ven línea a línea: hay que comparar el archivo entero
// contra su versión en HEAD.

const PALETTE_RE = /^styles\/10-tokens\/(web|admin)\/colors\/_palette\.scss$/;

const varNames = (src) => new Set(src.match(/^\$color-[a-zA-Z0-9-]+/gm) || []);

const FILE_RULES = [
  {
    id: 'variables-de-paleta-alteradas',
    applies: (f) => PALETTE_RE.test(f),
    // Rebrandear = cambiar VALORES. El set de nombres es el contrato que el
    // resto del sistema consume; si se toca, se rompe en silencio en sitios
    // que nadie está mirando.
    test: (current, head) => {
      if (head == null) return []; // archivo nuevo: no hay contra qué comparar
      const before = varNames(head);
      const now = varNames(current);
      const añadidas = [...now].filter((n) => !before.has(n));
      const quitadas = [...before].filter((n) => !now.has(n));
      const out = [];
      for (const n of quitadas) {
        out.push({
          detalle: `falta \`${n}\``,
          msg: 'Variable de paleta eliminada o renombrada. Al rebrandear se cambian los VALORES, nunca los nombres: el resto del sistema los consume.',
        });
      }
      for (const n of añadidas) {
        out.push({
          detalle: `sobra \`${n}\``,
          msg: 'Variable de paleta nueva. Reasigna el valor de una existente en vez de inventar nombres; si de verdad falta un rol, va con ADR.',
        });
      }
      return out;
    },
  },
];

function scanFile(current, head, file) {
  const out = [];
  for (const r of FILE_RULES) {
    if (!r.applies(file)) continue;
    for (const hit of r.test(current, head)) out.push({ rule: r.id, ...hit });
  }
  return out;
}

// Comentarios de línea no cuentan como violación.
const isComment = (line) => /^\s*(\/\/|\*|\/\*|#(?!\w))/.test(line);

function scan(source, file) {
  if (!source) return [];
  const rules = RULES.filter((r) => r.applies(file));
  if (!rules.length) return [];
  const out = [];
  source.split('\n').forEach((line, i) => {
    if (isComment(line)) return;
    for (const r of rules) {
      if (r.test(line)) out.push({ rule: r.id, line: i + 1, text: line.trim().slice(0, 100), msg: r.msg });
    }
  });
  return out;
}

function headVersion(relPath) {
  try {
    return execFileSync('git', ['show', `HEAD:${relPath}`], {
      cwd: ROOT, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return null; // archivo nuevo: baseline vacío
  }
}

function readStdin() {
  try {
    return fs.readFileSync(0, 'utf-8');
  } catch {
    return '';
  }
}

// ── Modo reporte ──────────────────────────────────────────────────────────

function walk(dir, acc = []) {
  let entries;
  try { entries = fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }); }
  catch { return acc; }
  for (const e of entries) {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.git', '.next', 'dist'].includes(e.name)) continue;
      walk(rel, acc);
    } else acc.push(rel);
  }
  return acc;
}

function report() {
  // Deriva de nombres en las paletas: comparado contra HEAD, no contra líneas.
  const paletas = ['styles/10-tokens/web/colors/_palette.scss',
                   'styles/10-tokens/admin/colors/_palette.scss'];
  const derivas = [];
  for (const f of paletas) {
    let src;
    try { src = fs.readFileSync(path.join(ROOT, f), 'utf-8'); } catch { continue; }
    for (const h of scanFile(src, headVersion(f), f)) derivas.push({ f, ...h });
  }

  const files = [...walk('app'), ...walk('shared'), ...walk('styles/webpages-styles')];
  const byRule = new Map();
  const byFile = new Map();
  let total = 0;
  for (const f of files) {
    let src;
    try { src = fs.readFileSync(path.join(ROOT, f), 'utf-8'); } catch { continue; }
    const hits = scan(src, f);
    if (!hits.length) continue;
    total += hits.length;
    byFile.set(f, hits.length);
    for (const h of hits) byRule.set(h.rule, (byRule.get(h.rule) || 0) + 1);
  }

  if (derivas.length) {
    console.log(`⚠️  Paleta: ${derivas.length} variable(s) añadida(s) o eliminada(s) respecto a HEAD.`);
    for (const d of derivas.slice(0, 10)) console.log(`      ${d.f} — ${d.detalle}`);
    console.log('      Rebrandear cambia valores, no nombres. Ver ADR-0005.\n');
  }

  if (!total) {
    console.log('Contrato de implementación: sin violaciones.');
    return derivas.length ? 1 : 0;
  }
  console.log(`Contrato de implementación: ${total} violaciones en ${byFile.size} archivos.\n`);
  console.log('Por regla:');
  for (const [r, n] of [...byRule].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(4)}  ${r}`);
  }
  console.log('\nArchivos más afectados:');
  for (const [f, n] of [...byFile].sort((a, b) => b[1] - a[1]).slice(0, 12)) {
    console.log(`  ${String(n).padStart(4)}  ${f}`);
  }
  console.log('\nDeuda conocida y su plan: docs/04-decisions/0002-verificacion-pendiente.md');
  console.log('La regla vigente es no AÑADIR violaciones; el hook lo verifica por archivo.');
  return 0; // informativo: no rompe el build
}

// ── Modo hook ─────────────────────────────────────────────────────────────

function hook() {
  let payload;
  try { payload = JSON.parse(readStdin() || '{}'); } catch { return 0; }

  const raw = payload?.tool_input?.file_path;
  if (!raw) return 0;

  const rel = path.relative(ROOT, path.resolve(ROOT, raw));
  if (rel.startsWith('..')) return 0;
  const aplicaLinea = RULES.some((r) => r.applies(rel));
  const aplicaArchivo = FILE_RULES.some((r) => r.applies(rel));
  if (!aplicaLinea && !aplicaArchivo) return 0;

  let current;
  try { current = fs.readFileSync(path.join(ROOT, rel), 'utf-8'); } catch { return 0; }

  const head = headVersion(rel);

  // Reglas de archivo: cualquier hallazgo es una violación, no hay baseline
  // que tolerar — el set de nombres o coincide con HEAD o no.
  const deArchivo = scanFile(current, head, rel);
  if (deArchivo.length) {
    const l = [
      `Contrato de implementación: ${deArchivo.length} problema(s) en ${rel}`,
      '',
    ];
    for (const h of deArchivo) {
      l.push(`  ${rel}  [${h.rule}]  ${h.detalle}`);
      l.push(`    → ${h.msg}`);
    }
    l.push('');
    l.push('Rebrandear cambia valores, no nombres. Ver docs/rebranding.md y ADR-0005.');
    process.stderr.write(l.join('\n') + '\n');
    return 2;
  }

  const now = scan(current, rel);
  if (!now.length) return 0;

  const before = scan(head, rel);

  // Solo lo que este cambio agregó, contado por regla.
  const beforeByRule = new Map();
  for (const h of before) beforeByRule.set(h.rule, (beforeByRule.get(h.rule) || 0) + 1);

  const added = [];
  const seen = new Map();
  for (const h of now) {
    const used = seen.get(h.rule) || 0;
    if (used < (beforeByRule.get(h.rule) || 0)) { seen.set(h.rule, used + 1); continue; }
    added.push(h);
  }

  if (!added.length) return 0;

  const lines = [
    `Contrato de implementación: este cambio añadió ${added.length} violación(es) en ${rel}`,
    '',
  ];
  for (const h of added) {
    lines.push(`  ${rel}:${h.line}  [${h.rule}]`);
    lines.push(`    ${h.text}`);
    lines.push(`    → ${h.msg}`);
  }
  lines.push('');
  lines.push('Contrato: docs/01-design/implementation-contract.md');
  lines.push('Corrígelo antes de seguir. Si el valor es intencional y no hay token, crea el token en _palette.scss.');

  process.stderr.write(lines.join('\n') + '\n');
  return 2; // exit 2 → el detalle vuelve al agente para que lo arregle
}

process.exit(process.argv.includes('--report') ? report() : hook());
